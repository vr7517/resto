import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import { ca } from "zod/v4/locales";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/categories");

      // Add "All" as first category
      setCategories([
        { id: 0, name: "All" },
        ...res.data.data,
      ]);
    } catch (error) {
      console.error(error);
      toast.error("Could not load categories");
    }
  };

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/products");
      setProducts(res.data.data);
      let pro=res.data.data;
      pro.filter((item) => {
          console.log(item.category);
      });
    } catch (error) {
      console.error(error);
      toast.error("Could not load products");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Filter products by selected category
  const filteredItems =
    activeCategory === "All"
      ? products
      : products.filter(
          (item) => item.category?.name === activeCategory
        );

  return (
    <div className="px-6 sm:px-8 md:px-12 lg:px-16 flex flex-col lg:flex-row gap-8">
      {/* Left Side */}
      <div className="flex-1 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Explore Menu
          </h2>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                  activeCategory === cat.name
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "bg-white border-gray-200 text-gray-600 hover:border-orange-300"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex gap-4"
            >
              {/* Product Image */}
              <div className="h-24 w-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                {item.image ? (
                  <img
                    src={`http://localhost:8000/storage/${item.image}`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center p-2">
                    No Image
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    {/* Veg/Non-Veg Indicator */}
                    <span
                      className={`w-3 h-3 border-2 flex items-center justify-center ${
                        item.type === "veg"
                          ? "border-green-600"
                          : "border-red-600"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.type === "veg"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                      ></span>
                    </span>

                    <h3 className="font-bold text-gray-800">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-1 mt-1">
                    {item.description}
                  </p>

                  <p className="text-xs text-orange-500 mt-1">
                    {item.category?.name}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-orange-600">
                    ₹{item.price}
                  </span>

                  <button className="bg-white border border-orange-500 text-orange-500 px-4 py-1 rounded-lg text-sm font-bold hover:bg-orange-500 hover:text-white transition-colors">
                    ADD
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Products */}
        {filteredItems.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No products found.
          </div>
        )}
      </div>

      {/* Right Side Cart */}
      {<div className="hidden lg:block w-80">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
            Your Order
          </h3>

          <div className="py-8 text-center">
            <div className="text-4xl mb-2">🛒</div>
            <p className="text-gray-400 text-sm">
              Your cart is empty.
              <br />
              Add some yummy food!
            </p>
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹0</span>
            </div>

            <button className="w-full mt-4 bg-gray-200 text-gray-500 py-3 rounded-xl font-bold cursor-not-allowed">
              Checkout
            </button>
          </div>
        </div>
      </div> }
    </div>
  );
}