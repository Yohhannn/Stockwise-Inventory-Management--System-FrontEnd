'use client';

import React, { useState } from "react";
import AdminHeader from "../../Layout/HF_Layout_Admin/AdminHeader";

const CustomerAccountManagement = () => {
  const [members, setMembers] = useState(
    Array(1).fill({
      id: "",
      username: "johnpaul123",
      firstName: "John",
      lastName: "Paul",
      email: "johnpaul@example.com",
      phone: "+63 912 345 6789",
      address: "123 Example St, Example City",
      joinedDate: "January 15, 2024",
    }).map((member, index) => ({ ...member, id: index + 1 }))
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const handleCreateAccount = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newMember = {
      id: members.length > 0 ? members[members.length - 1].id + 1 : 1,
      username: formData.get("username"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      joinedDate: new Date().toLocaleDateString(),
    };
    setMembers([...members, newMember]);
    setIsCreateModalOpen(false);
  };

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    setMembers(members.filter((member) => member.id !== parseInt(deleteId)));
    setDeleteId("");
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <AdminHeader />
      <div className="bg-gray-100 min-h-screen">
        {/* Hero Section */}
        <div
          className="bg-green-700 text-white py-24 text-center bg-cover bg-center"
          style={{ backgroundImage: "url('landing_assets/info_bg1.svg')" }}
        >
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">CUSTOMER ACCOUNT MANAGEMENT</h1>
            <p className="text-lg max-w-3xl mx-auto">
              Seamlessly manage your customers and their accounts with ease.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12">
          {/* Buttons */}
          <div className="flex justify-end mb-6 space-x-4">
            <button
              className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg"
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create Account +
            </button>
            <button
              className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete Account -
            </button>
          </div>

          {/* Members Table */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Members</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Username</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">First Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Last Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Contact</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Address</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Date Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
                      <td className="border border-gray-300 px-4 py-2">{member.id}</td>
                      <td className="border border-gray-300 px-4 py-2">{member.username}</td>
                      <td className="border border-gray-300 px-4 py-2">{member.firstName}</td>
                      <td className="border border-gray-300 px-4 py-2">{member.lastName}</td>
                      <td className="border border-gray-300 px-4 py-2">{member.email}</td>
                      <td className="border border-gray-300 px-4 py-2">{member.phone}</td>
                      <td className="border border-gray-300 px-4 py-2">{member.address}</td>
                      <td className="border border-gray-300 px-4 py-2">{member.joinedDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modals */}

          {/* Create Account Modal */}
          {isCreateModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Create Account</h2>
                <form onSubmit={handleCreateAccount} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Username</label>
                    <input
                      type="text"
                      name="username"
                      required
                      className="w-full border rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      className="w-full border rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      className="w-full border rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full border rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Contact</label>
                    <input
                      type="text"
                      name="phone"
                      required
                      className="w-full border rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      className="w-full border rounded-lg p-2"
                    />
                  </div>
                  <div className="flex justify-end space-x-4 mt-4">
                    <button
                      type="button"
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                      onClick={() => setIsCreateModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Delete Account Modal */}
          {isDeleteModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white w-full max-w-sm rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Delete Account</h2>
                <form onSubmit={handleDeleteAccount} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Account ID</label>
                    <input
                      type="number"
                      value={deleteId}
                      onChange={(e) => setDeleteId(e.target.value)}
                      required
                      className="w-full border rounded-lg p-2"
                    />
                  </div>
                  <div className="flex justify-end space-x-4 mt-4">
                    <button
                      type="button"
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                      onClick={() => setIsDeleteModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomerAccountManagement;
