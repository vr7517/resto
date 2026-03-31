import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  LayoutGrid, 
  Search, 
  Image as ImageIcon,
  MoreHorizontal,
    ExternalLink, 
} from "lucide-react";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/categories");
      setCategories(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Could not load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const deleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category? This might affect products linked to it.")) return;

    try {
      await axios.delete(`http://localhost:8000/api/categories/${id}`);
      setCategories(categories.filter((cat) => cat.id !== id));
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete category");
    }
  };

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <LayoutGrid className="text-orange-500" size={28} />
              Categories
            </h1>
            <p className="text-slate-500 mt-1">Manage your product groupings and store organization</p>
          </div>
          
          <Link
            to="/admin/categories/create"
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-slate-200 transition-all active:scale-95"
          >
            <Plus size={20} />
            Add Category
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by category name..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">#</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Visual</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Category Name</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {filteredCategories.map((cat, index) => (
                  <tr key={cat.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-400">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200/60 shadow-sm flex items-center justify-center">
                        {cat.image ? (
                          <img
                            src={`http://localhost:8000/storage/${cat.image}`}
                            alt={cat.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <ImageIcon className="text-slate-300" size={20} />
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800 text-lg">{cat.name}</div>
                      <div className="text-xs text-orange-500 font-medium">Active Category</div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/categories/${cat.id}/edit`}
                          className="p-2.5 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </Link>
                        <button
                          onClick={() => deleteCategory(cat.id)}
                          className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                         <Link to={`/admin/categories/${cat.id}`} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all">
                          <ExternalLink size={18} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredCategories.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-20 text-center">
                      <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <LayoutGrid className="text-slate-300" size={32} />
                      </div>
                      <h3 className="text-slate-900 font-bold">No categories found</h3>
                      <p className="text-slate-500 text-sm mt-1">Try a different search term or add a new category.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Footer Info */}
          <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400 font-medium">
             <span>Total Categories: {filteredCategories.length}</span>
             <span className="flex items-center gap-1 italic"><MoreHorizontal size={14}/> Scroll for more</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;