import React from 'react';
import Footer from '../../Layout/HF_Layout/Footer';
import Header from '../../Layout/HF_Layout/Header';

const Landing = () => {
  return (
    <>
    <Header></Header>
        <div className="relative bg-gray-900 min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="landing_assets/bg.svg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-900 bg-opacity-20"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-left text-white px-6 lg:px-0 max-w-full">
        {/* Logo and Title */}
        <div className="mb-6 flex justify-center items-center mx-auto w-full max-w-[500px]">
          <img
            src="landing_assets/logo.svg"
            alt="StockWise Logo"
            className="w-full h-auto"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row items-center gap-4 mt-8">
          <a href="/login">
            <button className="btn flex items-center justify-center bg-green-800 text-white font-semibold rounded-lg border-2 border-green-800 px-6 py-3 w-64 h-14 transition-all duration-300 ease-in-out transform hover:border-white hover:bg-green-700 hover:text-white hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Login Account
            </button>
          </a>

          <a href="/signup">
            <button className="btn flex items-center justify-center bg-green-800 text-white font-semibold rounded-lg px-6 py-3 w-64 h-14 transition-all border-2 border-green-800 duration-300 ease-in-out transform hover:border-white hover:bg-green-700 hover:text-white hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Create Account
            </button>
          </a>
        </div>

        {/* Footer Section */}
        {/* Uncomment if needed */}
        {/* <footer className="mt-10 text-sm text-gray-400">
          <p>STOCKWISE © Black Mavericks 2024. All rights reserved.</p>
          <p>Inventory management for food supplies / food materials.</p>
        </footer> */}
      </div>
    </div>
    <Footer></Footer>
    </>

  );
};

export default Landing;
