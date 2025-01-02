"use client";
import React, { useState, useMemo } from "react";
import { Link } from 'react-router-dom';
import MainHeader from "../../Layout/HF_Layout_Main/MainHeader";
import MainFooter from "../../Layout/HF_Layout_Main/MainFooter";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(value);

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    { name: "Milk", price: 50, quantity: 1 },
    { name: "Water", price: 25, quantity: 1 },
    { name: "Tuna", price: 70, quantity: 1 },
    { name: "Test", price: 19, quantity: 1 },
  ]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCheckboxChange = (name) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(name)
        ? prevSelectedItems.filter((item) => item !== name)
        : [...prevSelectedItems, name]
    );
  };

  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      setSelectedItems(cartItems.map((item) => item.name));
    } else {
      setSelectedItems([]);
    }
  };

  const removeItem = (name) => {
    setCartItems(cartItems.filter((item) => item.name !== name));
    setSelectedItems(selectedItems.filter((item) => item !== name));
  };

  const updateQuantity = (name, amount) => {
    setCartItems(
      cartItems.map((item) =>
        item.name === name
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const totalPrice = useMemo(
    () =>
      selectedItems.reduce((total, name) => {
        const item = cartItems.find((item) => item.name === name);
        return total + (item ? item.price * item.quantity : 0);
      }, 0),
    [selectedItems, cartItems]
  );

  const handleCheckOut = () => {
    if (selectedItems.length === 0) {
      setErrorMessage("No item selected");
    } else {
      setErrorMessage("");
      window.location.href = "/success"; 
    }
  };
  return (
    <>
    <MainHeader/>

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
            <a href='/home'>
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
              <div
                key={index}
                className="grid grid-cols-6 items-center p-2 border-b"
              >
                <input
                  type="checkbox"
                  className="justify-self-start ml-3"
                  checked={selectedItems.includes(item.name)}
                  onChange={() => handleCheckboxChange(item.name)}
                />
                <span className="text-start col-span-2 text-sm">{item.name}</span>
                <span className="text-center text-sm">
                  {formatCurrency(item.price)}
                </span>
                <div className="flex items-center justify-center">
                  <button
                    className="bg-gray-300 text-black px-2 py-1 rounded-full pl-2 ml-2"
                    onClick={() => updateQuantity(item.name, -1)}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    className="bg-gray-300 text-black px-2 py-1 rounded-full pr-2"
                    onClick={() => updateQuantity(item.name, 1)}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                </div>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-full justify-self-center hover:scale-90 duration-300"
                  onClick={() => removeItem(item.name)}
                  aria-label={`Remove ${item.name} from cart`}
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
                  Total:{" "}
                  <span id="total-price">
                    {formatCurrency(totalPrice)}
                  </span>{" "}
                  ({selectedItems.length} items selected)
                </p>
                {errorMessage && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}
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
    <MainFooter/>
    </>
  );
};

export default ShoppingCart;