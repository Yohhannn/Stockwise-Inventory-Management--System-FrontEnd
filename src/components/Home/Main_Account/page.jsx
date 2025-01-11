import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainHeader from "../../Layout/HF_Layout_Main/MainHeader";
import MainFooter from "../../Layout/HF_Layout_Main/MainFooter";

const AccountPage = () => {
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [userInfo] = useState({
    accountId: "SW-2024-001244",
    username: "Joe",
    firstName: "Joehanes",
    lastName: "Lauglaug",
    email: "joehaneslauglaug@gmail.com",
    phone: "+63 922 523 5231",
    address: "Lapu-Lapu City, Philippines",
    joinedDate: "January 5, 2024",

    // accountId: "SW-2024-001243",
    // username: "johnpaul123",
    // firstName: "John Paul",
    // lastName: "Mahilom",
    // email: "johnpaul@example.com",
    // phone: "+63 912 345 6789",
    // address: "Cebu City, Philippines",
    // joinedDate: "January 9, 2024",
  });



  const navigate = useNavigate();
  const [purchaseHistory] = useState([]);

  const handleLogoutConfirm = (confirm) => {
    if (confirm) {
      navigate("/"); // Redirect to homepage
    }
    setIsLogoutConfirmOpen(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <MainHeader />
      <div
        className="bg-green-700 text-white py-24 text-center bg-cover bg-center"
        style={{ backgroundImage: "url('landing_assets/info_bg1.svg')" }}
      >
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">MY ACCOUNT</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Manage your account details and view purchase history.
          </p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Account Details
        </h2>
        <div className="space-y-4">
          {Object.entries(userInfo).map(([key, value]) => (
            <div className="flex justify-between items-center" key={key}>
              <span className="font-medium text-gray-600">
                {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:
              </span>
              <span className="text-gray-800">{value}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button
            className="px-6 py-2 border-2 border-red-700 duration-300 ease-in-out transform hover:border-white hover:bg-red-700 hover:text-white hover:scale-95 bg-red-700 text-white font-semibold rounded-lg m-2"
            onClick={() => setIsLogoutConfirmOpen(true)}
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Logout Confirmation Popup */}
      {isLogoutConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
            <p className="text-gray-700 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-between">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                onClick={() => handleLogoutConfirm(false)}
              >
                No
              </button>
              <button
                className="bg-red-700 text-white px-4 py-2 rounded-lg"
                onClick={() => handleLogoutConfirm(true)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Purchase History Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Purchase History</h2>
        {purchaseHistory.length > 0 ? (
          <ul className="space-y-4">
            {purchaseHistory.map((item, index) => (
              <li key={index} className="border-b pb-2">
                <span className="font-medium text-gray-800">{item.name}</span> -
                <span className="text-gray-600"> {item.date}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No purchase history yet.</p>
        )}
      </div>

      <MainFooter />
    </div>
  );
};

export default AccountPage;
