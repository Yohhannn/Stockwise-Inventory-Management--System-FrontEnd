import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/Landing/Login/page';
import Register from './components/Landing/Register/page';
import Landing from './components/Landing/Landing_Panel/page';

import Home from './components/Home/Main_Home/page';
import AccountPage from './components/Home/Main_Account/page';
import ShoppingCart from './components/Home/Main_Cart/page';
import PurchaseSuccess from './components/Home/Main_Cart/cart_success';
import Checkout from './components/Home/Main_Cart/checkout';

import Landing_Info from './components/Landing/Landing_Info/page';
import Landing_Team from './components/Landing/Landing_Team/page';
import Landing_Contact from './components/Landing/Landing_Contact/page';

import AdminInventoryPage from './components/Admin/Admin_Inventory/page';
import AdminOverviewPage from './components/Admin/Admin_Overview/page';
import CustomerAccountManagement from './components/Admin/Admin_Members/page';

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
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/success" element={<PurchaseSuccess />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/admin_inventory" element={<AdminInventoryPage />} />
        <Route path="/admin_overview" element={<AdminOverviewPage />} />
        <Route path="/admin_memberlist" element={<CustomerAccountManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import Login from './components/Landing/Login/page';
// import Register from './components/Landing/Register/page';
// import Landing from './components/Landing/Landing_Panel/page';

// import Home from './components/Home/Main_Home/page';
// import AccountPage from './components/Home/Main_Account/page';
// import ShoppingCart from './components/Home/Main_Cart/page';
// import PurchaseSuccess from './components/Home/Main_Cart/cart_success';
// import Checkout from './components/Home/Main_Cart/checkout';


// import Landing_Info from './components/Landing/Landing_Info/page';
// import Landing_Team from './components/Landing/Landing_Team/page';
// import Landing_Contact from './components/Landing/Landing_Contact/page';

// import AdminInventoryPage from './components/Admin/Admin_Inventory/page';
// import AdminOverviewPage from './components/Admin/Admin_Overview/page';
// import CustomerAccountManagement from './components/Admin/Admin_Members/page';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//       <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Register />} />
//         <Route path="/info" element={<Landing_Info />} />
//         <Route path="/team" element={<Landing_Team />} />
//         <Route path="/contact" element={<Landing_Contact />} />

//         <Route path="/home" element={<Home />} />
//         <Route path="/account" element={<AccountPage />} />
//         <Route path="/cart" element={<ShoppingCart />} />
//         <Route path="/success" element={<PurchaseSuccess />} />
//         <Route path="/checkout" element={<Checkout />} />


//         <Route path="/admin_inventory" element={<AdminInventoryPage />} />
//         <Route path="/admin_overview" element={<AdminOverviewPage />} />
//         <Route path="/admin_memberlist" element={<CustomerAccountManagement />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
