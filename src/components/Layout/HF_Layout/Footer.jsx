import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        {/* Logo and Description */}
        <div className="flex flex-col items-center md:items-start">
          <p className="text-sm text-gray-200">
            <b className="hover:text-green-200">BLACK MAVERICKS</b>
          </p>
          <p className="text-sm text-gray-300 mt-2 hidden sm:block">
            Empowering businesses with tools to make smart stock management decisions. 
          </p>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-row gap-4 mt-4 md:mt-0">
          <a href="https://www.facebook.com/lgumoalboal" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">
            <img src="landing_assets/facebook.svg" alt="Facebook" className="w-5 h-5" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">
            <img src="landing_assets/twitter.svg" alt="Twitter" className="w-5 h-5" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">
            <img src="landing_assets/instagram.svg" alt="Instagram" className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-sm text-green-200 opacity-70 mt-4">
        © 2024 STOCKWISE. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
