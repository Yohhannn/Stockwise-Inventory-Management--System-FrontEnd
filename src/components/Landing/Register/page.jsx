import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        username,
        fname,
        lname,
        email,
        password,
        address,
      });
      if (response.data.status === "success") {
        setMessage("Registration successful!");
      } else {
        setMessage(response.data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white relative">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="landing_assets/bg.svg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-900 bg-opacity-20"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 container mx-5 my-5 flex flex-col bg-gray-800 bg-opacity-90 shadow-lg rounded-lg overflow-hidden w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-md p-6 md:p-8">
        {/* Return Button */}
        <div className="mb-4 flex justify-start">
          <a
            href="/"
            className="flex items-center justify-center w-12 h-12 bg-green-700 rounded-full hover:bg-green-600 transition duration-200 hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </a>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="landing_assets/logo_1.png"
            alt="StockWise Logo"
            className="h-16"
          />
        </div>

        <h2 className="text-2xl font-semibold mb-6 text-green-300 text-center">Create an Account</h2>
        <form>
          {/* Username Field */}
          <div className="mb-4">
            <label className="block text-gray-400 mb-1 text-center">Identification</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 bg-gray-900 text-gray-300 rounded-lg border border-gray-700 focus:ring focus:ring-green-500 text-sm"
            />
          </div>

          {/* First Name and Last Name Fields in One Row */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="First Name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                className="w-full p-2 bg-gray-900 text-gray-300 rounded-lg border border-gray-700 focus:ring focus:ring-green-500 text-sm"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                className="w-full p-2 bg-gray-900 text-gray-300 rounded-lg border border-gray-700 focus:ring focus:ring-green-500 text-sm"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-400 mb-1 text-center">Contact & Encryption</label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-gray-900 text-gray-300 rounded-lg border border-gray-700 focus:ring focus:ring-green-500 text-sm"
            />
          </div>

          {/* Address Field */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 bg-gray-900 text-gray-300 rounded-lg border border-gray-700 focus:ring focus:ring-green-500 text-sm"
            />
          </div>

          {/* Set Password Field */}
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-gray-900 text-gray-300 rounded-lg border border-gray-700 focus:ring focus:ring-green-500 text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-400 hover:text-green-300 focus:outline-none"
            >
              {showPassword ? (
                <img 
                src="/landing_assets/register/show.svg"
                className="w-5 h-5"
                />
              ) : (
                <img 
                src="/landing_assets/register/hide.svg"
                className="w-5 h-5"
                />
              )}
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4 relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 bg-gray-900 text-gray-300 rounded-lg border border-gray-700 focus:ring focus:ring-green-500 text-sm"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-2 text-gray-400 hover:text-green-300 focus:outline-none"
            >
              {showConfirmPassword ? (
                <img 
                src="/landing_assets/register/show.svg"
                className="w-5 h-5"
                />
              ) : (
                <img 
                src="/landing_assets/register/hide.svg"
                className="w-5 h-5"
                />
              )}
            </button>
          </div>


          <label className="flex cursor-pointer items-center justify-between p-1 text-slate-400 mb-4">
            Accept terms of use
            <div className="relative inline-block">
              <input
                className="peer h-6 w-12 cursor-pointer appearance-none rounded-full border border-gray-300 bg-gray-900 checked:border-green-800 checked:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                type="checkbox"
                checked={acceptTerms}
                onChange={() => setAcceptTerms(!acceptTerms)}
              />
              <span className="pointer-events-none absolute left-1 top-1 block h-4 w-4 rounded-full bg-slate-600 transition-all duration-200 peer-checked:left-7 peer-checked:bg-green-300"></span>
            </div>
          </label>

          {/* Submit Button */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="w-full btn flex items-center justify-center bg-green-800 text-white font-semibold rounded-lg border-2 border-green-800 px-6 py-3 h-14 transition-all duration-300 ease-in-out transform hover:border-white hover:bg-green-700 hover:text-white hover:scale-105"
            >
              Sign Up Now!
            </button>
          </div>
        </form>

        {/* Link to Login */}
        <div className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-green-400 hover:underline">
            Login here
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
