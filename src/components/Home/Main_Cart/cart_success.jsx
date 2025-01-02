import React from "react";
import { useNavigate } from "react-router-dom";

const PurchaseSuccess = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/home"); // Redirect to the homepage
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-700">
      <div className="text-center bg-green-700 p-8">
        {/* Centered Image */}
        <div className="flex justify-center">
          <img src="/home_assets/check.svg" alt="Success" className="w-32 h-32" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4 mt-5">Purchased Successfully!</h1>
        <button
          onClick={handleReturnHome}
          className="px-6 py-2 border-2 border-green-600 duration-300 ease-in-out transform hover:border-white hover:bg-green-700 hover:text-white hover:scale-95 bg-green-600 text-white font-semibold rounded-lg m-2"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default PurchaseSuccess;
