import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // // Check if the user is already logged in when the component mounts
  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     setIsLoggedIn(true); // If token exists in localStorage, user is logged in
  //     navigate("/home"); // Redirect if the user is already logged in
  //   }
  // }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/register/authenticate", {
        email, 
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("Response:", response.data);
  
      // Check for successful login and token
      if (response.data.token) {
        // Store the JWT token in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId); // Optionally store userId
  
        // Navigate to the home page after successful login
        navigate("/home");
  
      } else {
        setMessage("Invalid login credentials.");
      }
  
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response);
        setMessage(`Error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        console.error("Error request:", error.request);
        setMessage("No response from server. Please try again later.");
      } else {
        console.error("Error message:", error.message);
        setMessage("An error occurred. Please try again.");
      }
    }    
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white relative">
      <div className="absolute inset-0">
        <img
          src="landing_assets/bg.svg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-900 bg-opacity-20"></div>
      </div>

      <div className="relative z-10 container mx-5 my-5  flex flex-col bg-gray-800 bg-opacity-90 shadow-lg rounded-lg overflow-hidden w-full md:w-3/4 lg:w-2/3 max-w-md p-8">
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

        <div className="flex justify-center mb-8">
          <img
            src="landing_assets/logo_1.png"
            alt="StockWise Logo"
            className="h-16"
          />
        </div>

        <h2 className="text-2xl font-semibold mb-6 text-green-300 text-center">Login Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-1 text-center">Verification</label>
            <input
              type="text"

              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}

              className="w-full p-2 bg-gray-900 text-gray-300 rounded-lg border border-gray-700 focus:ring focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"

              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}

              className="w-full p-2 bg-gray-900 text-gray-300 rounded-lg border border-gray-700 focus:ring focus:ring-green-500"
            />
          </div>

          {/* Display error message */}
          {message && <p className="text-red-500 text-center">{message}</p>}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full btn flex items-center justify-center bg-green-800 text-white font-semibold rounded-lg border-2 border-green-800 px-6 py-3 h-14 transition-all duration-300 ease-in-out transform hover:border-white hover:bg-green-700 hover:text-white hover:scale-105"
            >
              Log-in Now!
            </button>
          </div>
        </form>

        <div className="mt-4 text-center text-gray-400">
          Don't have an account? {" "}
          <a href="/signup" className="text-green-400 hover:underline">
            Create one
          </a>
        </div>
        <div className="mt-4 text-center text-gray-400">
          Testing Phase: {" "}
          <a href="/admin_inventory" className="text-red-400 hover:underline">
            Admin Mode
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;



// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       const response = await axios.post("http://localhost:8080/api/auth/login", {
//         email,
//         password,
//       });
//       if (response.data.status === "success") {
//         navigate("/Home"); // NAVIGATE TO HOME PAGE
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//       setMessage("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white relative">
//       <div className="absolute inset-0">
//         <img
//           src="landing_assets/bg.svg"
//           alt="Background"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-green-900 bg-opacity-20"></div>
//       </div>

//       <div className="relative z-10 container mx-5 my-5  flex flex-col bg-gray-800 bg-opacity-90 shadow-lg rounded-lg overflow-hidden w-full md:w-3/4 lg:w-2/3 max-w-md p-8">
//         <div className="mb-4 flex justify-start">
//           <a
//             href="/"
//             className="flex items-center justify-center w-12 h-12 bg-green-700 rounded-full hover:bg-green-600 transition duration-200 hover:scale-105"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6 text-white"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M15 19l-7-7 7-7"
//               />
//             </svg>
//           </a>
//         </div>

//         <div className="flex justify-center mb-8">
//           <img
//             src="landing_assets/logo_1.png"
//             alt="StockWise Logo"
//             className="h-16"
//           />
//         </div>

//         <h2 className="text-2xl font-semibold mb-6 text-green-300 text-center">Login Account</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-400 mb-1 text-center">Verification</label>
//             <input
//               type="text"

//               id="email"
//               placeholder="Enter Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}

//               className="w-full p-2 bg-gray-900 text-gray-300 rounded-lg border border-gray-700 focus:ring focus:ring-green-500"
//             />
//           </div>

//           <div className="mb-4">
//             <input
//               type="password"

//               id="password"
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}

//               className="w-full p-2 bg-gray-900 text-gray-300 rounded-lg border border-gray-700 focus:ring focus:ring-green-500"
//             />
//           </div>

//                 <div className="flex items-center justify-between">
//         <Link to="/home" className="w-full">
//           <button
//             type="button"  // Change from "submit" to "button"
//             className="w-full btn flex items-center justify-center bg-green-800 text-white font-semibold rounded-lg border-2 border-green-800 px-6 py-3 h-14 transition-all duration-300 ease-in-out transform hover:border-white hover:bg-green-700 hover:text-white hover:scale-105"
//           >
//             Log-in Now!
//           </button>
//         </Link>
//       </div>
//         </form>

//         <div className="mt-4 text-center text-gray-400">
//           Don't have an account? {" "}
//           <a href="/signup" className="text-green-400 hover:underline">
//             Create one
//           </a>
//         </div>
//         <div className="mt-4 text-center text-gray-400">
//           Testing Phase: {" "}
//           <a href="/admin_inventory" className="text-red-400 hover:underline">
//             Admin Mode
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
