import React, { useState } from "react";
import MainHeader from "../../Layout/HF_Layout_Main/MainHeader";
import MainFooter from "../../Layout/HF_Layout_Main/MainFooter";

const categories = ["ALL", "DAIRY", "BEVERAGE", "PRODUCE", "MEAT", "MISC."];

const products = {
  DAIRY: [
    {
      img: "https://via.placeholder.com/300?text=Milk",
      title: "Milk",
      description: "Fresh, full-cream milk for a nutritious breakfast.",
      price: 5.0,
      remaining: 40,
    },
    {
      img: "https://via.placeholder.com/300?text=Cheese",
      title: "Cheese",
      description: "Delicious, creamy cheese perfect for any recipe.",
      price: 10.0,
      remaining: 25,
    },
    {
      img: "https://via.placeholder.com/300?text=Yogurt",
      title: "Yogurt",
      description: "Healthy and creamy yogurt in a variety of flavors.",
      price: 7.0,
      remaining: 30,
    },
  ],
  BEVERAGE: [
    {
      img: "https://via.placeholder.com/300?text=Orange+Juice",
      title: "Orange Juice",
      description: "Freshly squeezed orange juice for a refreshing drink.",
      price: 8.0,
      remaining: 20,
    },
    {
      img: "https://via.placeholder.com/300?text=Coffee",
      title: "Coffee",
      description: "Rich and aromatic coffee to start your day.",
      price: 12.0,
      remaining: 35,
    },
    {
      img: "https://via.placeholder.com/300?text=Green+Tea",
      title: "Green Tea",
      description: "Soothing and calming green tea for relaxation.",
      price: 6.0,
      remaining: 50,
    },
  ],
  PRODUCE: [
    {
      img: "https://via.placeholder.com/300?text=Apples",
      title: "Apples",
      description: "Crisp and juicy apples, perfect for snacking.",
      price: 3.0,
      remaining: 60,
    },
    {
      img: "https://via.placeholder.com/300?text=Carrots",
      title: "Carrots",
      description: "Fresh and crunchy carrots, full of vitamins.",
      price: 2.0,
      remaining: 80,
    },
    {
      img: "https://via.placeholder.com/300?text=Spinach",
      title: "Spinach",
      description: "Healthy and fresh spinach for salads or cooking.",
      price: 4.0,
      remaining: 40,
    },
  ],
  MEAT: [
    {
      img: "https://via.placeholder.com/300?text=Beef+Steak",
      title: "Beef Steak",
      description: "Premium quality beef steak, perfect for grilling and cooking.",
      price: 25.0,
      remaining: 15,
    },
    {
      img: "https://via.placeholder.com/300?text=Chicken+Breast",
      title: "Chicken Breast",
      description: "Fresh, boneless chicken breast. A healthy protein choice.",
      price: 10.0,
      remaining: 30,
    },
    {
      img: "https://via.placeholder.com/300?text=Pork+Chops",
      title: "Pork Chops",
      description: "Juicy pork chops with just the right amount of fat for flavor.",
      price: 18.0,
      remaining: 20,
    },
  ],
  "MISC.": [
    {
      img: "https://via.placeholder.com/300?text=Salt",
      title: "Salt",
      description: "High-quality table salt for all your cooking needs.",
      price: 2.0,
      remaining: 150,
    },
    {
      img: "https://via.placeholder.com/300?text=Pepper",
      title: "Pepper",
      description: "Freshly ground black pepper to enhance your dishes.",
      price: 3.0,
      remaining: 100,
    },
    {
      img: "https://via.placeholder.com/300?text=Cinnamon",
      title: "Cinnamon",
      description: "Fragrant ground cinnamon for baking and beverages.",
      price: 5.0,
      remaining: 80,
    },
    {
      img: "https://via.placeholder.com/300?text=Flour",
      title: "Flour",
      description: "All-purpose flour, perfect for baking and cooking.",
      price: 4.0,
      remaining: 200,
    },
    {
      img: "https://via.placeholder.com/300?text=Oil",
      title: "Oil",
      description: "Pure cooking oil for frying, sautéing, and baking.",
      price: 6.0,
      remaining: 120,
    },
    {
      img: "https://via.placeholder.com/300?text=Sugar",
      title: "Sugar",
      description: "Fine granulated sugar for sweetening and baking.",
      price: 3.0,
      remaining: 150,
    },
    {
      img: "https://via.placeholder.com/300?text=Vinegar",
      title: "Vinegar",
      description: "Versatile white vinegar for cooking and cleaning.",
      price: 2.5,
      remaining: 100,
    },
    {
      img: "https://via.placeholder.com/300?text=Honey",
      title: "Honey",
      description: "Pure and natural honey for a healthy sweetener.",
      price: 10.0,
      remaining: 60,
    },
  ],
};

const StockwiseHomepage = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const allProducts = Object.values(products).flat();

  const handleSearch = () => {
    const results = allProducts.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const filteredProducts = searchTerm
    ? searchResults
    : selectedCategory === "ALL"
    ? allProducts
    : products[selectedCategory];

  const handleIncrease = () => {
    if (selectedProduct && quantity < selectedProduct.remaining) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (selectedProduct && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setQuantity(1);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <MainHeader />
      {/* Hero Section */}
      <div
        className="bg-green-700 text-white py-24 text-center bg-cover bg-center"
        style={{ backgroundImage: "url('landing_assets/info_bg1.svg')" }}
      >
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">WELCOME TO STOCKWISE</h1>
          <p className="text-lg max-w-3xl mx-auto">HELLO JOHNPAUL !</p>
        </div>
      </div>
      <div className="max-w-8xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="container mx-auto py-10 px-5">
          {/* Search Bar */}
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search products..."
              className="border border-gray-300 p-2 rounded-l-md w-2/3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-green-700 text-white px-4 rounded-r-md"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {/* Categories */}
          <div className="flex justify-center gap-3 mb-6 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                className={`flex items-center justify-center w-auto px-4 py-1 btn bg-green-800 text-white font-semibold h-8 transition-all border-2 border-green-800 duration-300 ease-in-out transform hover:border-white hover:bg-green-700 hover:text-white hover:scale-95 rounded-full text-xs ${
                  selectedCategory === category
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-green-700 text-white"
                }`}
                onClick={() => {
                  setSelectedCategory(category);
                  setSearchTerm("");
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Product Listing */}
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            {selectedCategory} Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-300 rounded-lg text-center p-1 cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="w-full aspect-w-1 aspect-h-1 mb-1">
                    <img
                      src={product.img}
                      alt={product.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-800">
                    {product.title}
                  </h4>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No products found.
              </p>
            )}
          </div>
        </div>
      </div>
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-full max-w-96 bg-white border border-gray-300 rounded-lg p-2 m-5 relative flex flex-col items-center">
            <button
              className="absolute top-3 right-3 text-white hover:bg-green-700 hover:scale-105 bg-green-900 rounded-full w-8 h-8 flex items-center justify-center"
              onClick={closeModal}
            >
              ✕
            </button>
            <img
              src={selectedProduct.img}
              alt={selectedProduct.title}
              className="w-full rounded-lg mb-4"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
              {selectedProduct.title}
            </h3>
            <p className="text-gray-600 text-sm mb-5 text-center">
              {selectedProduct.description}
            </p>
            <p className="text-green-700 font-semibold text-sm mb-1">
              Price: ${selectedProduct.price.toFixed(2)}
            </p>
            <p className="text-gray-700 font-semibold text-sm mb-1">
              Remaining: {selectedProduct.remaining}
            </p>
            <p className="text-gray-700 font-semibold text-sm mb-5">
              Category: {selectedCategory}
            </p>
            <div className="flex items-center justify-center gap-6 mb-4">
              <button
                className="bg-green-700 text-white w-8 h-8 rounded-full"
                onClick={handleDecrease}
              >
                -
              </button>
              <span className="text-gray-800 font-semibold">{quantity}</span>
              <button
                className="bg-green-700 text-white w-8 h-8 rounded-full"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>
            <button
              className="btn flex items-center justify-center bg-green-800 text-white font-semibold rounded-lg px-6 py-3 w-full h-14 transition-all border-2 border-green-800 duration-300 ease-in-out transform hover:border-white hover:bg-green-700 hover:text-white hover:scale-95"
              onClick={closeModal}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
      <MainFooter />
    </div>
  );
};

export default StockwiseHomepage;
