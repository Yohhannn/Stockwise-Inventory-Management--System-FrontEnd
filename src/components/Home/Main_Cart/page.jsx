import React, { useState, useEffect } from "react";
import MainHeader from "../../Layout/HF_Layout_Main/MainHeader";
import MainFooter from "../../Layout/HF_Layout_Main/MainFooter";
import { useNavigate } from "react-router-dom";
import axios from "axios";


// Format price as PHP currency
const formatCurrency = (value) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(value);

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedItems, setSelectedItems] = useState([]); // For handling selected items
  const [totalPrice, setTotalPrice] = useState(0); // Calculate total price
  const navigate = useNavigate();
  

  // Get user ID from the localStorage token
  const getUserIdFromLocalStorage = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setErrorMessage("User ID not found in localStorage.");
      alert("User ID not found in localStorage.");
      return null;
    }
    return userId; // Return the User ID
  };

  // Fetch cart items
  const fetchCartItems = async () => {
    const userId = getUserIdFromLocalStorage();
    if (!userId) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/api/carts/user/${userId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const contentType = response.headers.get("Content-Type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setCartItems(data);
      } else {
        setErrorMessage("Unexpected response format.");
      }
    } catch (error) {
      setErrorMessage("Failed to fetch cart items.");
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const updateQuantity = async (cartId, delta) => {
    const updatedQuantity = cartItems.find(item => item.cartId === cartId).quantity + delta;
  
    // Update frontend cart items state
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartId === cartId
          ? {
              ...item,
              quantity: updatedQuantity,
              price: item.product.price * updatedQuantity,
            }
          : item
      )
    );
  
    // Call the backend to update the quantity
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch(`http://localhost:8080/api/carts/${cartId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: updatedQuantity }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }
  
      const updatedCart = await response.json();
      console.log("Updated cart item:", updatedCart);
    } catch (error) {
      setErrorMessage("Failed to update quantity.");
      console.error("Update error:", error);
    }
  };
  

  // Remove item from cart
  const removeItem = async (cartId) => {
    // Remove item from frontend cart items state
    setCartItems((prevItems) => prevItems.filter((item) => item.cartId !== cartId));
  
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch(`http://localhost:8080/api/carts/${cartId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to remove item");
      }
  
      console.log(`Product with cartId ${cartId} removed successfully from cart.`);
    } catch (error) {
      setErrorMessage("Failed to remove item.");
      console.error("Remove error:", error);
    }
  };
  



  // Select all items or none
  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      setSelectedItems(cartItems.map((item) => item.product.name)); // Select all items by their names
    } else {
      setSelectedItems([]); // Clear selections
    }
  };
  

  // Calculate total price
  useEffect(() => {
    const total = cartItems
      .filter((item) => selectedItems.includes(item.product.name))
      .reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total);
  }, [selectedItems, cartItems]);





  const handleCheckOut = async () => {
    const userId = getUserIdFromLocalStorage();
    if (!userId) {
      setErrorMessage("User not authenticated.");
      return;
    }
  
    if (selectedItems.length === 0) {
      setErrorMessage("Please select at least one item to checkout.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      const cartItemIds = cartItems
        .filter((item) => selectedItems.includes(item.product.name))
        .map((item) => item.cartId);
  
      const response = await fetch(`http://localhost:8080/api/carts/checkout?userId=${userId}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItemIds),
      });
  
      // Log the response details
      console.log("Response Status:", response.status);
      console.log("Response Headers:", response.headers);
  
      const contentType = response.headers.get("Content-Type");
      
      // Check for content type to ensure we're getting JSON
      if (contentType && contentType.includes("application/json")) {
        const responseData = await response.json(); // Parse the JSON response
        console.log("Response Data:", responseData);
        
        if (response.ok) {
          if (responseData && responseData.order_id) {
            const orderId = responseData.order_id;
  
            // Store the orderId in localStorage
            localStorage.setItem("orderId", orderId);
            alert(`Order placed successfully!`);
  
            // Reset state
            setSelectedItems([]);
            setCartItems(cartItems.filter((item) => !selectedItems.includes(item.product.name)));
            setErrorMessage("");
  
            // Navigate to the checkout page after success
            navigate("/checkout");
          } else {
            console.error("Order ID not found in response data:", responseData); // Log to show error
            setErrorMessage("Failed to retrieve order ID.");
          }
        } else {
          // Handle non-ok status responses
          const errorData = await response.json();
          console.error("Error response body:", errorData);
          setErrorMessage(errorData || "Checkout failed.");
        }
      } else {
        const textResponse = await response.text();
        console.error("Invalid response format. Expected JSON but got:", textResponse);
        setErrorMessage("Invalid response format received.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setErrorMessage("Checkout failed.");
    }
  };
  
  
  
  
  
  
  
  
  

  return (
    <>
      <MainHeader />

      {/* Hero Section */}
      <div
        className="bg-green-700 text-white py-24 text-center bg-cover bg-center"
        style={{ backgroundImage: "url('landing_assets/info_bg1.svg')" }}
      >
        <div className="container mx-auto px-1">
          <h1 className="text-4xl font-bold mb-4">YOUR CART</h1>
          <p className="text-lg max-w-3xl mx-auto">LIST OF ALL ITEMS YOU'VE PICKED</p>
        </div>
      </div>

      <div className="bg-gray-200 px-2 flex justify-center">
        <div className="container bg-white min-h-screen shadow-lg p-4 pt-20 max-w-3xl">
          <h1 className="text-4xl font-bold mb-4 text-center text-green-700 pb-10">ITEMS</h1>
          {cartItems.length === 0 ? (
            <div className="text-center">
              <p className="text-lg">Your shopping cart is empty</p>
              <a href="/home">
                <button className="bg-green-700 text-white px-4 py-2 rounded mt-2 hover:scale-95 duration-300 hover:bg-green-600">
                  Go Purchase
                </button>
              </a>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-6 items-center p-2 text-sm font-bold border-b">
                <span className="justify-self-start">Select</span>
                <span className="text-left col-span-2">Product Name</span>
                <span className="text-center">Unit Price</span>
                <span className="text-center">QTY</span>
                <span className="text-center">Action</span>
              </div>

              {cartItems.map((item, index) => (
                <div key={index} className="grid grid-cols-6 items-center p-2 border-b">
                  <input
                    type="checkbox"
                    className="justify-self-start ml-3"
                    checked={selectedItems.includes(item.product.name)}
                    onChange={() => {
                      if (selectedItems.includes(item.product.name)) {
                        setSelectedItems(selectedItems.filter((name) => name !== item.product.name));
                      } else {
                        setSelectedItems([...selectedItems, item.product.name]);
                      }
                    }}
                  />
                  <span className="text-start col-span-2 text-sm">{item.product.name}</span>
                  <span className="text-center text-sm">{formatCurrency(item.product.price)}</span>





<div className="flex items-center justify-center">
  <button
    className="bg-gray-300 text-black px-2 py-1 rounded-full pl-2 ml-2"
    onClick={() => updateQuantity(item.cartId, -10)}
  >
    -
  </button>
  <span className="px-2">{item.quantity}</span>
  <button
    className="bg-gray-300 text-black px-2 py-1 rounded-full pr-2"
    onClick={() => updateQuantity(item.cartId, 10)}
  >
    +
  </button>
</div>




<button
  className="bg-red-500 text-white px-3 py-1 rounded-full justify-self-center hover:scale-90 duration-300"
  onClick={() => removeItem(item.cartId)}  // Pass the cartId instead of name
>
  X
</button>



                </div>
              ))}

<div className="cart-summary sticky bottom-0 left-0 right-0 bg-white p-4 shadow-lg flex items-center">
  <input
    type="checkbox"
    onChange={handleSelectAllChange}
    checked={selectedItems.length === cartItems.length}
  />
  <span className="ml-2">Select All</span>

  <div className="ml-auto text-right">
    <p>
      Total: <span id="total-price">{formatCurrency(totalPrice)}</span> ({selectedItems.length} items selected)
    </p>
    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    <button
      className="bg-green-600 text-white px-4 py-2 rounded mt-2 hover:scale-105 duration-300"
      onClick={handleCheckOut}
    >
      Check Out
    </button>
  </div>
</div>



            </>
          )}
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default ShoppingCart;
  