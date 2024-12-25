import React from 'react';

const Header = () => {
  return (
    <header className="bg-green-900 text-white text-sm font-thin">
      <div className="container mx-auto flex justify-between items-center py-2 px-5">
        <a href="/">
        <img src="/landing_assets/icon_logo.svg" alt="STOCKWISE_ICON" className='pl-5 duration-300 transform hover:scale-110' />
        </a>
        <nav className="flex space-x-2">
          <a 
            href="/info" 
            className="hover:bg-green-700 px-4 py-2 rounded transition duration-300 transform hover:scale-105"
          >
            INFO
          </a>
          <a 
            href="/team" 
            className="hover:bg-green-700 px-4 py-2 rounded transition duration-300 transform hover:scale-105"
          >
            TEAM
          </a>
          <a 
            href="/contact" 
            className="hover:bg-green-700 px-4 py-2 rounded transition duration-300 transform hover:scale-105"
          >
            CONTACT
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
