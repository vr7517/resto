import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { 
  ArrowLeft, Pencil, Trash2, Tag, 
  Layers, CircleCheck, CircleX, IndianRupee, Info 
} from "lucide-react";

const ProductShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}`)
      .then(res => setProduct(res.data.data))
      .catch(() => toast.error("Product not found"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-10 text-center animate-pulse text-slate-400">Loading Product Details...</div>;
  if (!product) return <div className="p-10 text-center text-red-500 font-bold">Product not found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-orange-500 transition-colors font-medium">
          <ArrowLeft size={18} /> Back to Inventory
        </button>
        <div className="flex gap-3">
          <Link to={`/admin/products/${id}/edit`} className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <Pencil size={16} /> Edit
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row">
        {/* Left: Image Section */}
        <div className="md:w-1/2 bg-slate-50 p-8 flex items-center justify-center border-r border-slate-100">
          <div className="relative group">
            <img 
              src={product.image ? `http://localhost:8000/storage/${product.image}` : "https://via.placeholder.com/400"} 
              alt={product.name}
              className="w-full max-w-sm aspect-square object-cover rounded-3xl shadow-2xl transition-transform group-hover:scale-105 duration-500"
            />
            {product.discount > 0 && (
              <span className="absolute top-4 left-4 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                {product.discount}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Right: Info Section */}
        <div className="md:w-1/2 p-10 flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-orange-500 font-bold text-xs uppercase tracking-widest mb-2">
              <Tag size={14} /> Product Details
            </div>
            <h1 className="text-4xl font-black text-slate-900 leading-tight">{product.name}</h1>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
              <p className="text-[10px] uppercase font-bold text-orange-400 mb-1">Selling Price</p>
              <p className="text-2xl font-black text-orange-600 flex items-center tracking-tighter">
                <IndianRupee size={20} />{product.selling_price}
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Status</p>
              <div className="flex items-center gap-2">
                {product.is_available ? (
                  <span className="text-green-600 font-bold flex items-center gap-1"><CircleCheck size={16}/> Active</span>
                ) : (
                  <span className="text-red-500 font-bold flex items-center gap-1"><CircleX size={16}/> Hidden</span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Info size={16} /> Description
              </h3>
              <p className="text-slate-600 leading-relaxed italic border-l-4 border-orange-200 pl-4">
                {product.description || "No description provided for this product."}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Layers size={16} /> Technical Info
              </h3>
              <ul className="text-sm space-y-2 text-slate-700 font-medium">
                <li className="flex justify-between border-b border-slate-50 pb-2">
                  <span>Category ID:</span> <span className="text-slate-900">#{product.category_id}</span>
                </li>
                <li className="flex justify-between border-b border-slate-50 pb-2">
                  <span>MRP Price:</span> <span className="text-slate-400 line-through">₹{product.price}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductShow;