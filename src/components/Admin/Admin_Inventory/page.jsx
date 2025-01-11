import React, { useState, useEffect } from "react";
import AdminHeader from "../../Layout/HF_Layout_Admin/AdminHeader";
import UploadImageFunction from "./upload";
import axios from "axios";

const AdminInventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isRemoveProductModalOpen, setIsRemoveProductModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    image: "",
    category: "DAIRY",
  });
  const [removeProductId, setRemoveProductId] = useState("");

  // Fetch products from the database when the component loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        setProducts(response.data); // Populate the products state with fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Failed to fetch products.");
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run only once when the component mounts

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.quantity || !newProduct.category) {
      alert("Please fill in all required fields.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:8080/api/products", {
        name: newProduct.name,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        availableQuantity: parseInt(newProduct.quantity, 10),
        category: newProduct.category,
        image: newProduct.image,
      });
  
      setProducts((prev) => [...prev, response.data]);
      setNewProduct({
        name: "",
        price: "",
        quantity: "",
        description: "",
        image: "",
        category: "DAIRY",
      });
      setIsAddProductModalOpen(false);
      alert("Product added successfully.");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  const handleRemoveProduct = async (e) => {
    e.preventDefault();

    // Check if ID is valid
    if (!removeProductId) {
      alert("Please enter a valid product ID.");
      return;
    }

    try {
      // Send DELETE request to backend
      const response = await axios.delete(`http://localhost:8080/api/products/${removeProductId}`);
      
      // If successful, remove the product from the local state
      if (response.status === 204) { // 204 is returned for successful deletion (no content)
        setProducts((prev) => prev.filter((product) => product.id !== Number(removeProductId)));
        setRemoveProductId(""); // Clear the ID field
        setIsRemoveProductModalOpen(false); // Close the modal
        alert("Product removed successfully.");
      } else {
        alert("Failed to remove product.");
      }
    } catch (error) {
      console.error("Error removing product:", error);
      alert("Failed to remove product.");
    }
  };

  const handleImageUpload = (url) => {
    setNewProduct((prev) => ({
      ...prev,
      image: url,
    }));
  };

  return (
    <>
      <AdminHeader />
      <div className="bg-gray-100 min-h-screen">
        <div
          className="bg-green-700 text-white py-24 text-center bg-cover bg-center"
          style={{ backgroundImage: "url('landing_assets/info_bg1.svg')" }}
        >
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">SYSTEM INVENTORY</h1>
            <p className="text-lg max-w-3xl mx-auto">WELCOME ADMIN!</p>
          </div>
        </div>

        <div className="container mx-auto px-6 py-6 flex justify-center space-x-4">
          <button
            className="px-6 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800"
            onClick={() => setIsAddProductModalOpen(true)}
          >
            + Add New Product
          </button>
          <button
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
            onClick={() => setIsRemoveProductModalOpen(true)}
          >
            Remove Product (by ID)
          </button>
        </div>

        <div className="container mx-auto px-6 py-6">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-lg rounded-lg">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="py-2 px-4">#</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Price</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4">Category</th>
                  <th className="py-2 px-4">Description</th>
                  <th className="py-2 px-4">Image</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <tr
                      key={product.id}
                      className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                        }`}
                    >
                      <td className="py-2 px-4 text-center">{index + 1}</td>
                      <td className="py-2 px-4 text-center">{product.name}</td>
                      <td className="py-2 px-4 text-center">₱{product.price}</td>
                      <td className="py-2 px-4 text-center">{product.quantity}</td>
                      <td className="py-2 px-4 text-center">{product.category}</td>
                      <td className="py-2 px-4 text-center">{product.description}</td>
                      <td>
                        {product.image && (
                          <a href={product.image} target="_blank" rel="noreferrer">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 object-cover text-center"
                            />
                          </a>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-4 text-center text-gray-500 italic"
                    >
                      No products in inventory.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Product Modal */}
        {isAddProductModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Add New Product</h2>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Price (₱)</label>
                  <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={newProduct.quantity}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Category</label>
                  <select
                    name="category"
                    value={newProduct.category}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                    required
                  >
                    <option value="DAIRY">DAIRY</option>
                    <option value="BEVERAGE">BEVERAGE</option>
                    <option value="PRODUCE">PRODUCE</option>
                    <option value="MEAT">MEAT</option>
                    <option value="MISC.">MISC.</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">Description</label>
                  <textarea
                    name="description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                  />
                </div>

                {/* UPLOAD IMAGE TO CLOUDINARY */}
                <div>
                  <UploadImageFunction onImageUpload={handleImageUpload} />
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsAddProductModalOpen(false)}
                    className="px-4 py-2 rounded bg-gray-300 text-gray-800 font-medium hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-green-500 text-white font-medium hover:bg-green-600"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Remove Product Modal */}
        {isRemoveProductModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Remove Product</h2>
              <form onSubmit={handleRemoveProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Product ID</label>
                  <input
                    type="number"
                    value={removeProductId}
                    onChange={(e) => setRemoveProductId(e.target.value)}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsRemoveProductModalOpen(false)}
                    className="px-4 py-2 rounded bg-gray-300 text-gray-800 font-medium hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-red-500 text-white font-medium hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminInventoryPage;
