import React from 'react';

const AdminHeader = () => {
  return (
    <header className="bg-green-900 text-white text-sm font-thin">
      <div className="container mx-auto flex justify-between items-center py-2 px-5">
        <a href="/">
          <img 
            src="/landing_assets/logo_2.svg" 
            alt="STOCKWISE_ICON" 
            className="pl-5 h-auto w-auto duration-300 transform hover:scale-110 p-2"
          />
        </a>
        <nav className="flex space-x-2">
          <a 
            href="/admin_inventory" 
            className="hover:bg-green-700 px-4 py-2 rounded transition duration-300 transform hover:scale-105"
          >
            INVENTORY
          </a>
          <a 
            href="/admin_overview" 
            className="hover:bg-green-700 px-4 py-2 rounded transition duration-300 transform hover:scale-105"
          >
            OVERVIEW
          </a>
          <a 
            href="/admin_memberlist" 
            className="hover:bg-green-700 px-4 py-2 rounded transition duration-300 transform hover:scale-105"
          >
            MEMBERS
          </a>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
