'use client';
import React, { useState } from 'react';
import Footer from '../../Layout/HF_Layout/Footer';
import Header from '../../Layout/HF_Layout/Header';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all the fields!');
      return;
    }

    // Assuming successful submission
    alert('Your message has been sent successfully!');
    // Reset form data after successful submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <>
    <Header></Header>
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section
        className="bg-gradient-to-t from-green-700 to-green-800 text-white py-24 text-center bg-cover bg-center animate__animated animate__fadeIn"
        style={{ backgroundImage: "url('landing_assets/contact_bg.svg')" }}
      >
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Contact STOCKWISE</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Have any questions or need assistance? Get in touch with us to enhance your stock management experience.
          </p>
        </div>
      </section>

      <div className="max-w-8xl mx-auto 2xl:max-w-7xl bg-white shadow-lg rounded-lg p-6">
        {/* Contact Section */}
        <section className="py-12 px-6 bg-white animate__animated animate__fadeIn">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div className="animate__animated animate__fadeIn">
              <h2 className="text-3xl font-bold mb-6 text-green-800 opacity-85">Get in Touch with STOCKWISE</h2>
              <p className="text-gray-600 mb-6">
                Our team is ready to assist you with any queries or feedback related to our stock management platform.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <img
                    src="landing_assets/contact/phone_icon.svg"
                    alt="Phone"
                    className="w-6 h-6 mr-4"
                  />
                  <span className="text-gray-800 font-medium">+63 123 456 7890</span>
                </li>
                <li className="flex items-center">
                  <img
                    src="landing_assets/contact/email_icon.svg"
                    alt="Email"
                    className="w-6 h-6 mr-4"
                  />
                  <span className="text-gray-800 font-medium">support@stockwise.com</span>
                </li>
              </ul>
            </div>

            {/* Contact Form */}
            <div className="animate__animated animate__fadeIn">
              <form
                className="space-y-6 bg-gray-800 bg-opacity-90 p-6 rounded-lg shadow-lg"
                onSubmit={handleSubmit}
              >
                <h2 className="text-3xl font-bold mb-6 text-white text-center">Form</h2>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-100 font-medium mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-700"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-100 font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-700"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-gray-100 font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-700"
                    placeholder="Write your message here"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn flex w-full items-center justify-center bg-green-700 text-white font-semibold rounded-lg border-2 border-green-700 px-6 py-3 h-14 transition-all duration-300 ease-in-out transform hover:border-white hover:bg-green-600 hover:text-white hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default ContactUs;
