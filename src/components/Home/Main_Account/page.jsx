import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import MainHeader from "../../Layout/HF_Layout_Main/MainHeader";
import MainFooter from "../../Layout/HF_Layout_Main/MainFooter";

const AccountPage = () => {
  const [profilePicture, setProfilePicture] = useState(
    "https://via.placeholder.com/150?text=Profile+Picture"
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false); // State for logout confirmation
  const [userInfo, setUserInfo] = useState({
    accountId: "SW-2024-00123",
    username: "johnpaul123",
    firstName: "John Paul",
    lastName: "Mahilom",
    email: "johnpaul@example.com",
    phone: "+63 912 345 6789",
    address: "Cebu City, Philippines",
    joinedDate: "January 15, 2024",
  });

  const navigate = useNavigate(); // Use navigate to redirect
  const [purchaseHistory, setPurchaseHistory] = useState([]); // Array to store purchase history

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditDetails = (e) => {
    e.preventDefault();
    setIsEditModalOpen(false); // Close the modal after saving
  };

  const handleLogoutConfirm = (confirm) => {
    if (confirm) {
      navigate("/"); // Redirect to homepage
    }
    setIsLogoutConfirmOpen(false); // Close the logout confirmation popup
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
            Manage your account details and profile picture.
          </p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-6">
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-32 h-32">
            <img
              src={profilePicture}
              alt="Profile"
              className="w-full h-full object-cover rounded-full border border-gray-300"
            />
            <label
              htmlFor="profilePictureUpload"
              className="absolute bottom-0 right-0 text-white hover:bg-green-700 hover:scale-105 bg-green-900 rounded-full w-8 h-8 flex items-center justify-center duration-300 cursor-pointer"
            >
              +
            </label>
            <input
              id="profilePictureUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePictureChange}
            />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Account Details
        </h2>
        <div className="space-y-4">
          {/* Account details */}
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
            className="px-6 py-2 border-2 border-green-800 duration-300 ease-in-out transform hover:border-white hover:bg-green-700 hover:text-white hover:scale-95 bg-green-800 text-white font-semibold rounded-lg m-2"
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit Details
          </button>
          <button
            className="px-6 py-2 border-2 border-red-700 duration-300 ease-in-out transform hover:border-white hover:bg-red-700 hover:text-white hover:scale-95 bg-red-700 text-white font-semibold rounded-lg m-2"
            onClick={() => setIsLogoutConfirmOpen(true)} // Open logout confirmation popup
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

      {/* Edit Details Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 ">Edit Details</h2>
            <form onSubmit={handleEditDetails} className="space-y-4">
              {/* Edit form fields */}
              {Object.entries(userInfo).map(([key, value]) => (
                key !== "accountId" && (
                  <div key={key}>
                    <label className="block text-sm font-medium">
                      {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                    </label>
                    <input
                      type={key === "email" ? "email" : "text"}
                      className="w-full border rounded-lg p-2"
                      defaultValue={value}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, [key]: e.target.value })
                      }
                    />
                  </div>
                )
              ))}
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
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

export default AccountPage
