import React, { useState, useEffect } from "react";
import axios from "axios";
import MainHeader from "../../Layout/HF_Layout_Main/MainHeader";
import MainFooter from "../../Layout/HF_Layout_Main/MainFooter";

const categories = ["ALL", "DAIRY", "BEVERAGE", "PRODUCE", "MEAT", "MISC."];

const StockwiseHomepage = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]); // To store products fetched from the database
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  // Function to get user ID from localStorage
  const getUserIdFromLocalStorage = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setErrorMessage("User ID not found in localStorage.");
      alert("User ID not found in localStorage.");
      return null;
    }
    return userId; // Return the User ID
  };

  useEffect(() => {
    // Fetch the products from your API or database
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products"); // Replace with your API endpoint
        setProducts(response.data); // Assuming your API returns an array of products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async () => {

    if (selectedProduct) {
      const userId = getUserIdFromLocalStorage();
      if (!userId) return;

      const cartData = {
        userId: userId, // Dynamically fetched user ID
        productId: selectedProduct.id, // Corrected to match the database column name
        quantity: quantity,
    //    price: selectedProduct.price,        
      };
        console.log(userId)
        console.log(selectedProduct.id)

      try {
        const response = await axios.post(
          "http://localhost:8080/api/carts", // Replace with your API endpoint
          cartData
        );
        if (response.status === 200) {
          alert("Product added to cart successfully!");
          closeModal(); // Close the modal after adding to the cart
        } else {
          alert("Failed to add product to cart. Please try again.");
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
        alert("An error occurred while adding the product to the cart.");
      }
    }
  };

  const handleSearch = () => {
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const filteredProducts = searchTerm
    ? searchResults
    : selectedCategory === "ALL"
    ? products
    : products.filter((product) => product.category === selectedCategory);

  const handleIncrease = () => {
    if (selectedProduct && quantity < selectedProduct.remaining) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (selectedProduct && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setQuantity(1);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <MainHeader />
      {/* Hero Section */}
      <div
        className="bg-green-700 text-white py-24 text-center bg-cover bg-center"
        style={{ backgroundImage: "url('landing_assets/info_bg1.svg')" }}
      >
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">WELCOME TO STOCKWISE</h1>
          <p className="text-lg max-w-3xl mx-auto">HELLO JOHNPAUL !</p>
        </div>
      </div>
      <div className="max-w-8xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="container mx-auto py-10 px-5">
          {/* Search Bar */}
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search products..."
              className="border border-gray-300 p-2 rounded-l-md w-2/3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-green-700 text-white px-4 rounded-r-md"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {/* Categories */}
          <div className="flex justify-center gap-3 mb-6 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                className={`flex items-center justify-center w-auto px-4 py-1 btn bg-green-800 text-white font-semibold h-8 transition-all border-2 border-green-800 duration-300 ease-in-out transform hover:border-white hover:bg-green-700 hover:text-white hover:scale-95 rounded-full text-xs ${
                  selectedCategory === category
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-green-700 text-white"
                }`}
                onClick={() => {
                  setSelectedCategory(category);
                  setSearchTerm("");
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Product Listing */}
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            {selectedCategory} Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-300 rounded-lg text-center p-1 cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="w-full aspect-w-1 aspect-h-1 mb-1">
                    <img
                      src={product.image} // Dynamic image URL from the database
                      alt={product.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-800">
                    {product.name}
                  </h4>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No products found.
              </p>
            )}
          </div>
        </div>
      </div>
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-full max-w-96 bg-white border border-gray-300 rounded-lg p-2 m-5 relative flex flex-col items-center">
            <button
              className="absolute top-3 right-3 text-white hover:bg-green-700 hover:scale-105 bg-green-900 rounded-full w-8 h-8 flex items-center justify-center"
              onClick={closeModal}
            >
              ✕
            </button>
            <img
              src={selectedProduct.image} // Dynamic image URL from the database
              alt={selectedProduct.title}
              className="w-full rounded-lg mb-4"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
              {selectedProduct.title}
            </h3>
            <p className="text-gray-600 text-sm mb-5 text-center">
              {selectedProduct.description}
            </p>
            <p className="text-green-700 font-semibold text-sm mb-1">
              Price: ${selectedProduct.price.toFixed(2)}
            </p>
            <p className="text-gray-700 font-semibold text-sm mb-1">
              Remaining: {selectedProduct.availableQuantity}
            </p>
            <p className="text-gray-700 font-semibold text-sm mb-5">
              Category: {selectedProduct.category}
            </p>
            <div className="flex items-center justify-center gap-6 mb-4">
              <button
                className="bg-green-700 text-white w-8 h-8 rounded-full"
                onClick={handleDecrease}
              >
                -
              </button>
              <span className="text-gray-800 font-semibold">{quantity}</span>
              <button
                className="bg-green-700 text-white w-8 h-8 rounded-full"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>
            <button
              className="btn flex items-center justify-center bg-green-800 text-white font-semibold rounded-lg px-6 py-3 w-full h-14 transition-all border-2 border-green-800 duration-300 ease-in-out transform hover:border-white hover:bg-green-700 hover:text-white hover:scale-95"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
      <MainFooter />
    </div>
  );
};

export default StockwiseHomepage;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import MainHeader from "../../Layout/HF_Layout_Main/MainHeader";
// import MainFooter from "../../Layout/HF_Layout_Main/MainFooter";

// const categories = ["ALL", "DAIRY", "BEVERAGE", "PRODUCE", "MEAT", "MISC."];

// const StockwiseHomepage = () => {
//   const [selectedCategory, setSelectedCategory] = useState("ALL");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [products, setProducts] = useState([]); // To store products fetched from the database
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     // Fetch the products from your API or database
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/api/products"); // Replace with your API endpoint
//         setProducts(response.data); // Assuming your API returns an array of products
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
    

//     fetchProducts();
//   }, []);
//   const handleAddToCart = async () => {
//     if (selectedProduct) {
//       const cartData = {
//         id: selectedProduct.id, // Corrected to match the database column name
//         user_id: 1,
//         quantity: quantity,
//         price: selectedProduct.price,
//     };
    
  
//       try {
//         const response = await axios.post(
//           "http://localhost:8080/api/carts", // Replace with your API endpoint
//           cartData
//         );
//         if (response.status === 200) {
//           alert("Product added to cart successfully!");
//           closeModal(); // Close the modal after adding to the cart
//         } else {
//           alert("Failed to add product to cart. Please try again.");
//         }
//       } catch (error) {
//         console.error("Error adding product to cart:", error  );
//         alert("An error occurred while adding the product to the cart.");
//       }
//     }
//   };

//   const handleSearch = () => {
//     const results = products.filter((product) =>
//       product.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setSearchResults(results);
//   };

//   const filteredProducts = searchTerm
//     ? searchResults
//     : selectedCategory === "ALL"
//     ? products
//     : products.filter((product) => product.category === selectedCategory);

//   const handleIncrease = () => {
//     if (selectedProduct && quantity < selectedProduct.remaining) {
//       setQuantity((prev) => prev + 1);
//     }
//   };

//   const handleDecrease = () => {
//     if (selectedProduct && quantity > 1) {
//       setQuantity((prev) => prev - 1);
//     }
//   };

//   const closeModal = () => {
//     setSelectedProduct(null);
//     setQuantity(1);
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <MainHeader />
//       {/* Hero Section */}
//       <div
//         className="bg-green-700 text-white py-24 text-center bg-cover bg-center"
//         style={{ backgroundImage: "url('landing_assets/info_bg1.svg')" }}
//       >
//         <div className="container mx-auto px-6">
//           <h1 className="text-4xl font-bold mb-4">WELCOME TO STOCKWISE</h1>
//           <p className="text-lg max-w-3xl mx-auto">HELLO JOHNPAUL !</p>
//         </div>
//       </div>
//       <div className="max-w-8xl mx-auto bg-white shadow-lg rounded-lg p-6">
//         <div className="container mx-auto py-10 px-5">
//           {/* Search Bar */}
//           <div className="flex justify-center mb-6">
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="border border-gray-300 p-2 rounded-l-md w-2/3"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button
//               className="bg-green-700 text-white px-4 rounded-r-md"
//               onClick={handleSearch}
//             >
//               Search
//             </button>
//           </div>

//           {/* Categories */}
//           <div className="flex justify-center gap-3 mb-6 flex-wrap">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 className={`flex items-center justify-center w-auto px-4 py-1 btn bg-green-800 text-white font-semibold h-8 transition-all border-2 border-green-800 duration-300 ease-in-out transform hover:border-white hover:bg-green-700 hover:text-white hover:scale-95 rounded-full text-xs ${
//                   selectedCategory === category
//                     ? "bg-green-600 text-white border-green-600"
//                     : "bg-green-700 text-white"
//                 }`}
//                 onClick={() => {
//                   setSelectedCategory(category);
//                   setSearchTerm("");
//                 }}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>

//           {/* Product Listing */}
//           <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
//             {selectedCategory} Products
//           </h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
//             {filteredProducts.length > 0 ? (
//               filteredProducts.map((product, index) => (
//                 <div
//                   key={index}
//                   className="bg-white border border-gray-300 rounded-lg text-center p-1 cursor-pointer"
//                   onClick={() => setSelectedProduct(product)}
//                 >
//                   <div className="w-full aspect-w-1 aspect-h-1 mb-1">
//                     <img
//                       src={product.image} // Dynamic image URL from the database
//                       alt={product.title}
//                       className="w-full h-full object-cover rounded-lg"
//                     />
//                   </div>
//                   <h4 className="text-sm font-semibold text-gray-800">
//                     {product.name}
//                   </h4>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 col-span-full text-center">
//                 No products found.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//       {selectedProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="w-full max-w-96 bg-white border border-gray-300 rounded-lg p-2 m-5 relative flex flex-col items-center">
//             <button
//               className="absolute top-3 right-3 text-white hover:bg-green-700 hover:scale-105 bg-green-900 rounded-full w-8 h-8 flex items-center justify-center"
//               onClick={closeModal}
//             >
//               ✕
//             </button>
//             <img
//               src={selectedProduct.image} // Dynamic image URL from the database
//               alt={selectedProduct.title}
//               className="w-full rounded-lg mb-4"
//             />
//             <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
//               {selectedProduct.title}
//             </h3>
//             <p className="text-gray-600 text-sm mb-5 text-center">
//               {selectedProduct.description}
//             </p>
//             <p className="text-green-700 font-semibold text-sm mb-1">
//               Price: ${selectedProduct.price.toFixed(2)}
//             </p>
//             <p className="text-gray-700 font-semibold text-sm mb-1">
//               Remaining: {selectedProduct.remaining}
//             </p>
//             <p className="text-gray-700 font-semibold text-sm mb-5">
//               Category: {selectedProduct.category}
//             </p>
//             <div className="flex items-center justify-center gap-6 mb-4">
//               <button
//                 className="bg-green-700 text-white w-8 h-8 rounded-full"
//                 onClick={handleDecrease}
//               >
//                 -
//               </button>
//               <span className="text-gray-800 font-semibold">{quantity}</span>
//               <button
//                 className="bg-green-700 text-white w-8 h-8 rounded-full"
//                 onClick={handleIncrease}
//               >
//                 +
//               </button>
//             </div>
//             <button
//               className="btn flex items-center justify-center bg-green-800 text-white font-semibold rounded-lg px-6 py-3 w-full h-14 transition-all border-2 border-green-800 duration-300 ease-in-out transform hover:border-white hover:bg-green-700 hover:text-white hover:scale-95"
//               onClick={handleAddToCart}
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       )}
//       <MainFooter />
//     </div>
//   );
// };

// export default StockwiseHomepage;
