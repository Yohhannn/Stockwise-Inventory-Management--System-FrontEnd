import React from "react";
import AdminHeader from "../../Layout/HF_Layout_Admin/AdminHeader";

const AdminOverviewPage = () => {
  const revenue = 50000; // Example total revenue
  const bestSellingProduct = "Milk"; // Example best-selling product
  const totalSales = 250; // Example total sales
  const totalUsers = 120; // Example total registered users

  const StatCard = ({ title, value, color, children }) => (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center relative">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      {children}
    </div>
  );

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
            <h1 className="text-4xl font-bold mb-4">ADMIN OVERVIEW</h1>
            <p className="text-lg max-w-3xl mx-auto">WELCOME BACK, ADMIN!</p>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="container mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Revenue" value={`₱${revenue.toLocaleString()}`} color="text-green-700" />
          <StatCard title="Best-Selling Product" value={bestSellingProduct} color="text-blue-700" />
          <StatCard title="Total Sales" value={totalSales} color="text-purple-700" />
          <StatCard title="Total Users" value={totalUsers} color="text-orange-700">
            <button
              className="absolute top-4 right-4 p-2 bg-orange-600 text-white rounded-full hover:bg-orange-700"
              onClick={() => (window.location.href = "/admin_memberlist")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21h9a2.25 2.25 0 002.25-2.25V15M16.5 8.25L21 12m0 0l-4.5 3.75M21 12H9" />
              </svg>
            </button>
          </StatCard>
        </div>

        {/* Statistics Section */}
        <div className="container mx-auto px-6 py-6">
          <h2 className="text-2xl font-bold mb-4">Detailed Statistics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Breakdown */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-semibold">Revenue Breakdown</h3>
              <p className="text-sm text-gray-600 mb-4">Analyze revenue trends and sources.</p>
              <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center">
                <span className="text-gray-500">[Revenue Chart Placeholder]</span>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-semibold">Top Products</h3>
              <p className="text-sm text-gray-600 mb-4">Discover the most purchased products.</p>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Product A - 120 units</li>
                <li>Product B - 98 units</li>
                <li>Product C - 85 units</li>
                <li>Product D - 60 units</li>
                <li>Product E - 45 units</li>
              </ul>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-semibold">New Users</h3>
              <p className="text-sm text-gray-600 mb-4">Number of users registered this month.</p>
              <div className="text-2xl font-bold text-teal-700">30</div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-semibold">Active Users</h3>
              <p className="text-sm text-gray-600 mb-4">Users active in the last 7 days.</p>
              <div className="text-2xl font-bold text-indigo-700">85</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOverviewPage;
