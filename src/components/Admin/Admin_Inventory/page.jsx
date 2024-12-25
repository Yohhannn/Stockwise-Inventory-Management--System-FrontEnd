import React, { useState } from "react";
import AdminHeader from "../../Layout/HF_Layout_Admin/AdminHeader";

const AdminInventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isRemoveProductModalOpen, setIsRemoveProductModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    category: "DAIRY",
  });
  const [editProductId, setEditProductId] = useState(null);
  const [editProductDetails, setEditProductDetails] = useState({});
  const [removeProductId, setRemoveProductId] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.quantity ||
      !newProduct.category
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    setProducts((prev) => [...prev, { ...newProduct, id: Date.now() }]);
    setNewProduct({
      name: "",
      price: "",
      quantity: "",
      description: "",
      category: "DAIRY",
    });
    setIsAddProductModalOpen(false);
    alert("Product added successfully.");
  };

  const handleRemoveProduct = (e) => {
    e.preventDefault();
    const productIndex = products.findIndex(
      (product) => product.id === Number(removeProductId)
    );
    if (productIndex === -1) {
      alert("Product not found.");
    } else {
      const updatedProducts = products.filter(
        (product) => product.id !== Number(removeProductId)
      );
      setProducts(updatedProducts);
      alert("Product removed successfully.");
    }
    setRemoveProductId("");
    setIsRemoveProductModalOpen(false);
  };

  const handleEditProductSearch = (e) => {
    e.preventDefault();
    const product = products.find((product) => product.id === Number(editProductId));
    if (!product) {
      alert("Product not found.");
      setIsEditProductModalOpen(false);
    } else {
      setEditProductDetails(product);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditProductDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEditProduct = (e) => {
    e.preventDefault();
    setProducts((prev) =>
      prev.map((product) =>
        product.id === editProductDetails.id ? editProductDetails : product
      )
    );
    setEditProductId(null);
    setEditProductDetails({});
    setIsEditProductModalOpen(false);
    alert("Product updated successfully.");
  };

  return (
    <>
      <AdminHeader></AdminHeader>
      <div className="bg-gray-100 min-h-screen">
        {/* Hero Section */}
        <div
          className="bg-green-700 text-white py-24 text-center bg-cover bg-center"
          style={{ backgroundImage: "url('landing_assets/info_bg1.svg')" }}
        >
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">SYSTEM INVENTORY</h1>
            <p className="text-lg max-w-3xl mx-auto">WELCOME ADMIN!</p>
          </div>
        </div>

        {/* Centered Buttons */}
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
          <button
            className="px-6 py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700"
            onClick={() => setIsEditProductModalOpen(true)}
          >
            Edit Product Info
          </button>
        </div>

        {/* Inventory Table */}
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
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <tr
                      key={product.id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      }`}
                    >
                      <td className="py-2 px-4 text-center">{index + 1}</td>
                      <td className="py-2 px-4">{product.name}</td>
                      <td className="py-2 px-4">₱{product.price}</td>
                      <td className="py-2 px-4">{product.quantity}</td>
                      <td className="py-2 px-4">{product.category}</td>
                      <td className="py-2 px-4">{product.description}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
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
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => setIsAddProductModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-700 text-white px-4 py-2 rounded-lg"
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
                <input
                  type="number"
                  placeholder="Enter Product ID"
                  value={removeProductId}
                  onChange={(e) => setRemoveProductId(e.target.value)}
                  className="w-full border rounded-lg p-2"
                  required
                />
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => setIsRemoveProductModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Product Modal */}
        {isEditProductModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Edit Product</h2>
              {!editProductDetails.id ? (
                <form onSubmit={handleEditProductSearch} className="space-y-4">
                  <input
                    type="number"
                    placeholder="Enter Product ID"
                    value={editProductId || ""}
                    onChange={(e) => setEditProductId(e.target.value)}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                      onClick={() => setIsEditProductModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-yellow-600 text-white px-4 py-2 rounded-lg"
                    >
                      Search
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSaveEditProduct} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Product Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editProductDetails.name}
                      onChange={handleEditInputChange}
                      className="w-full border rounded-lg p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Price (₱)</label>
                    <input
                      type="number"
                      name="price"
                      value={editProductDetails.price}
                      onChange={handleEditInputChange}
                      className="w-full border rounded-lg p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      value={editProductDetails.quantity}
                      onChange={handleEditInputChange}
                      className="w-full border rounded-lg p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Category</label>
                    <select
                      name="category"
                      value={editProductDetails.category}
                      onChange={handleEditInputChange}
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
                      value={editProductDetails.description}
                      onChange={handleEditInputChange}
                      className="w-full border rounded-lg p-2"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                      onClick={() => setIsEditProductModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminInventoryPage;
