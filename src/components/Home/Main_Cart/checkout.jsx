import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Page = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setFirstname(value);
        break;
      case "lastName":
        setLastname(value);
        break;
      case "companyName":
        setCompanyName(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "street":
        setStreet(value);
        break;
      case "city":
        setCity(value);
        break;
      case "state":
        setState(value);
        break;
      case "zip":
        setZip(value);
        break;
      case "email":
        setEmail(value);
        break;
      default:
        break;
    }
  };

  const handlePlaceOrder = async () => {
    const requiredFields = [
      firstName,
      lastName,
      email,
      companyName,
      phone,
      street,
      city,
      state,
      zip,
    ];

    const emptyField = requiredFields.find((field) => !field);
    if (emptyField) {
      setError("Please fill in all the required fields.");
      return;
    }

    setError("");

    const orderId = localStorage.getItem("orderId");
    if (!orderId) {
      setError("Order ID is not available.");
      return;
    }

    try {
      const orderData = {
        orderId,
        firstName,
        lastName,
        email,
        companyName,
        phone,
        street,
        city,
        state,
        zip,
      };

      const response = await fetch("http://localhost:8080/api/orders/finalize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Unknown error");
      }

      setTimeout(() => {
        setOrderPlaced(false);
        navigate("/success");
      }, 3000);

    } catch (error) {
      setError(`Order finalization failed: ${error.message}`);
    }
  };

  return (
    <div className="bg-black px-40 min-h-screen">
      <div className="bg-gray-900 min-h-screen flex items-center justify-center relative py-4">
        <h1 className="absolute top-0 left-20 text-4xl font-bold text-green-500 p-4">Checkout</h1>
        <div className="flex flex-col items-center pt-10 bg-gray-800 w-auto rounded-lg pb-10">
          <h2 className="text-green-500 text-3xl font-semibold mb-10 border-b-2 border-green-500 w-11/12 text-center pb-2">
            Delivery Address
          </h2>
          <form className="grid grid-cols-2 gap-4 px-6 mb-8">
            <div className="mb-4">
              <label className="block text-gray-300 mb-1 text-center">First Name</label>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleInputChange}
                placeholder="Enter First Name"
                className="w-full p-2 bg-black text-green-500 rounded-lg border border-green-700 focus:ring focus:ring-green-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1 text-center">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleInputChange}
                placeholder="Enter Last Name"
                className="w-full p-2 bg-black text-green-500 rounded-lg border border-green-700 focus:ring focus:ring-green-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1 text-center">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={companyName}
                onChange={handleInputChange}
                placeholder="Enter Company Name"
                className="w-full p-2 bg-black text-green-500 rounded-lg border border-green-700 focus:ring focus:ring-green-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1 text-center">Phone</label>
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={handleInputChange}
                placeholder="Enter Phone Number"
                className="w-full p-2 bg-black text-green-500 rounded-lg border border-green-700 focus:ring focus:ring-green-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1 text-center">Street Address</label>
              <input
                type="text"
                name="street"
                value={street}
                onChange={handleInputChange}
                placeholder="Enter Street Address"
                className="w-full p-2 bg-black text-green-500 rounded-lg border border-green-700 focus:ring focus:ring-green-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1 text-center">City</label>
              <input
                type="text"
                name="city"
                value={city}
                onChange={handleInputChange}
                placeholder="Enter City"
                className="w-full p-2 bg-black text-green-500 rounded-lg border border-green-700 focus:ring focus:ring-green-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1 text-center">State</label>
              <input
                type="text"
                name="state"
                value={state}
                onChange={handleInputChange}
                placeholder="Enter State"
                className="w-full p-2 bg-black text-green-500 rounded-lg border border-green-700 focus:ring focus:ring-green-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1 text-center">Zip Code</label>
              <input
                type="text"
                name="zip"
                value={zip}
                onChange={handleInputChange}
                placeholder="Enter Zip Code"
                className="w-full p-2 bg-black text-green-500 rounded-lg border border-green-700 focus:ring focus:ring-green-500 text-sm"
              />
            </div>
          </form>
          {error && <p className="text-red-500">{error}</p>}
          <button
            className="px-4 py-2 mt-1 rounded-lg bg-green-500 text-black hover:bg-green-700"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
        {orderPlaced && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <span className="text-green-500 text-4xl">✔️</span>
              <h2 className="text-green-500 text-2xl font-semibold mt-2">Order Placed!</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
