import React, { useState } from 'react';
import Footer from '../../Layout/HF_Layout/Footer';
import Header from '../../Layout/HF_Layout/Header';

const Landing_Info = () => {
  // State to manage the popup
  const [popupContent, setPopupContent] = useState(null);

  // Card data
  const cards = [
    {
      id: 1,
      title: "Inventory Management",
      image: "/landing_assets/info/p1.png",
      description:
        "Keep track of your stock levels in real time. Optimize storage and prevent shortages with ease.",
    },
    {
      id: 2,
      title: "Analytics Dashboard",
      image: "/landing_assets/info/p2.png",
      description:
        "Gain insights into your business performance with our detailed analytics and visual reports.",
    },
    {
      id: 3,
      title: "Supplier Integration",
      image: "/landing_assets/info/p3.png",
      description:
        "Connect with suppliers seamlessly and manage orders directly within the platform.",
    },
    {
      id: 4,
      title: "User-Friendly Interface",
      image: "/landing_assets/info/p4.png",
      description:
        "Navigate through our intuitive design for a seamless stock management experience.",
    },
    {
      id: 5,
      title: "Real-Time Notifications",
      image: "/landing_assets/info/p6.png",
      description:
        "Stay updated with instant alerts for critical stock changes and order statuses.",
    },
    {
      id: 6,
      title: "Multi-Device Support",
      image: "/landing_assets/info/p5.png",
      description:
        "Access STOCKWISE on any device, whether it's your desktop, tablet, or smartphone.",
    },
  ];

  return (
    <>
      <Header />
      <div className="bg-gray-200 min-h-screen">
        {/* Hero Section */}
        <div
          className="bg-green-700 text-white py-24 text-center bg-cover bg-center"
          style={{ backgroundImage: "url('landing_assets/info_bg1.svg')" }}
        >
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">About Stockwise</h1>
            <p className="text-lg max-w-3xl mx-auto">
              Your go-to platform for efficient stock management, insightful analytics, and smart business decisions.
            </p>
          </div>
        </div>

        {/* Cards Section */}
        <div className="max-w-8xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <div className="container mx-auto px-6 py-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="bg-green-700 shadow-lg rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => setPopupContent(card)}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Popup for Details */}
        {popupContent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/3 p-6">
              <button
                className="text-gray-500 hover:text-red-600 float-right text-lg font-bold"
                onClick={() => setPopupContent(null)}
              >
                &times;
              </button>
              <img
                src={popupContent.image}
                alt={popupContent.title}
                className="w-full h-auto object-cover mb-4"
              />
              <h2 className="text-2xl font-bold mb-4">{popupContent.title}</h2>
              <p className="text-gray-700">{popupContent.description}</p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Landing_Info;
