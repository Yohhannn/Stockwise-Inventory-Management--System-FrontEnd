import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/Landing/Login/page';
import Register from './components/Landing/Register/page';
import Landing from './components/Landing/Landing_Panel/page';

import Home from './components/Home/Main_Home/page';
import AccountPage from './components/Home/Main_Account/page';

import Landing_Info from './components/Landing/Landing_Info/page';
import Landing_Team from './components/Landing/Landing_Team/page';
import Landing_Contact from './components/Landing/Landing_Contact/page';

import AdminInventoryPage from './components/Admin/Admin_Inventory/page';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/info" element={<Landing_Info />} />
        <Route path="/team" element={<Landing_Team />} />
        <Route path="/contact" element={<Landing_Contact />} />
        <Route path="/home" element={<Home />} />
        <Route path="/account" element={<AccountPage />} />

        <Route path="/admin_inventory" element={<AdminInventoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
