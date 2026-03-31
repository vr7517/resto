import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Package, 
  ExternalLink, 
  Search,
  Filter,
  MoreVertical,
  ChevronRight
} from "lucide-react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/products");
      setProducts(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
      toast.success("Product removed from catalog");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Package className="text-orange-500" size={32} />
              Inventory
            </h1>
            <p className="text-gray-500 mt-1">Manage your store products and stock levels</p>
          </div>
          
          <Link
            to="/admin/products/create"
            className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-orange-200 transition-all transform active:scale-95"
          >
            <Plus size={20} />
            Add New Product
          </Link>
        </div>

        {/* --- Stats/Search Bar --- */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products..."
              className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
             <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
                <Filter size={18} />
                Filters
             </button>
          </div>
        </div>

        {/* --- Table Container --- */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-orange-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-100">
                          {product.image ? (
                            <img 
                              src={`http://localhost:8000/storage/${product.image}`} 
                              alt={product.name} 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-400">
                              <Package size={20} />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                            {product.name}
                          </div>
                          <div className="text-xs text-gray-400 capitalize">
                             ID: #{product.id.toString().padStart(4, '0')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900">₹{product.selling_price || product.price}</span>
                        {product.discount > 0 && (
                          <span className="text-xs text-green-500 font-medium">-{product.discount}% OFF</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {product.is_available ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                          Out of Stock
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/products/${product.id}/edit`}
                          className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all"
                          title="Edit Product"
                        >
                          <Pencil size={18} />
                        </Link>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete Product"
                        >
                          <Trash2 size={18} />
                        </button>
                        <Link to={`/admin/products/${product.id}`} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all">
                          <ExternalLink size={18} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-20 text-center">
                      <div className="flex flex-col items-center">
                        <div className="bg-gray-50 p-4 rounded-full mb-4">
                           <Package className="text-gray-300" size={48} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                        <p className="text-gray-500 max-w-xs mx-auto">
                          Try adjusting your search or add a new product to get started.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* --- Pagination Footer (Placeholder) --- */}
          <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-900">{filteredProducts.length}</span> products
            </p>
            <div className="flex gap-2">
               <button disabled className="px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed">Previous</button>
               <button className="px-4 py-2 text-sm font-medium text-gray-900 hover:bg-white rounded-lg transition-colors shadow-sm border border-gray-200">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;