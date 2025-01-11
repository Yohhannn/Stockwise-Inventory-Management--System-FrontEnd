'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../../Layout/HF_Layout_Admin/AdminHeader";

const CustomerAccountManagement = () => {
  const [members, setMembers] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [newMember, setNewMember] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    status: '',
    password: '',  // Added password field
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/accounts/users");
        setMembers(response.data); // Ensure the data contains `id` and `status` fields
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newMemberData = {
      username: formData.get("username"),
      first_name: formData.get("firstName"),
      last_name: formData.get("lastName"),
      email: formData.get("email"),
      status: formData.get("status"),
      password: formData.get("password"), 
      
      // Capture password from form
      joinedDate: new Date().toLocaleDateString(),
      
    };

    try {
      const response = await axios.get("http://localhost:8080/register/check-username", {
        params: { username: newMemberData.username }
      });

      if (response.data.usernameExists) {
        setMessage("Username is already taken.");
        setMessageType("error");
        return;
      }

      const registrationResponse = await axios.post("http://localhost:8080/register/add", newMemberData);

      // Add the new member to the state to update the table
      setMembers([...members, { ...newMemberData, id: members.length + 1, createdAt: new Date().toLocaleDateString() }]);
      setMessage("Account created successfully!");
      setMessageType("success");

      // Close the modal
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error creating account:", error);
      setMessage("Error creating account.");
      setMessageType("error");
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    try {
      // Send DELETE request to the backend to delete the user
      await axios.delete(`http://localhost:8080/api/accounts/${deleteId}`);

      // Remove the deleted user from the frontend state
      setMembers(members.filter((member) => member.id !== parseInt(deleteId)));

      // Reset the deleteId and close the modal
      setDeleteId("");
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
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
                    <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
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
                      <td className="border border-gray-300 px-4 py-2">{member.status}</td>
                      <td className="border border-gray-300 px-4 py-2">{member.joinedDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Create Account Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Create New Account</h3>
            <form onSubmit={handleCreateAccount} className="mt-4">
              <div>
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={newMember.username}
                  onChange={(e) => setNewMember({ ...newMember, username: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mt-4">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={newMember.firstName}
                  onChange={(e) => setNewMember({ ...newMember, firstName: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mt-4">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={newMember.lastName}
                  onChange={(e) => setNewMember({ ...newMember, lastName: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mt-4">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mt-4">
                <label>Status</label>
                <select
                  name="status"
                  value={newMember.status}
                  onChange={(e) => setNewMember({ ...newMember, status: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="mt-4">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={newMember.password}
                  onChange={(e) => setNewMember({ ...newMember, password: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  type="submit"
                  className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
                >
                  Create Account
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Delete Account</h3>
            <form onSubmit={handleDeleteAccount} className="mt-4">
              <div>
                <label>Enter Account ID to Delete</label>
                <input
                  type="number"
                  value={deleteId}
                  onChange={(e) => setDeleteId(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  type="submit"
                  className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded"
                >
                  Delete Account
                </button>
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerAccountManagement;
