import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Edit3, Grid, Image as ImageIcon, Calendar } from "lucide-react";

const CategoryShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/categories/${id}`)
      .then(res => setCategory(res.data.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-10 text-center animate-pulse text-slate-400 text-lg font-bold">Fetching Category...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between mb-10">
         <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow text-slate-600">
           <ArrowLeft size={20} />
         </button>
         <Link to={`/admin/categories/${id}/edit`} className="bg-slate-900 text-white px-6 py-2.5 rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all flex items-center gap-2">
            <Edit3 size={18} /> Edit Category
         </Link>
      </div>

      <div className="relative bg-white rounded-[3rem] shadow-sm border border-slate-100 p-2 overflow-hidden">
        {/* Banner Area */}
        <div className="h-48 bg-gradient-to-r from-orange-400 to-rose-400 rounded-[2.5rem] relative overflow-hidden">
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* Content Area */}
        <div className="px-10 pb-12 -mt-16 relative">
          <div className="flex flex-col md:flex-row items-end gap-6 mb-8">
            <div className="w-40 h-40 bg-white p-3 rounded-[2rem] shadow-2xl border border-slate-50">
              {category.image ? (
                <img 
                  src={`http://localhost:8000/storage/${category.image}`} 
                  className="w-full h-full object-cover rounded-[1.5rem]" 
                  alt={category.name} 
                />
              ) : (
                <div className="w-full h-full bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-slate-300">
                  <ImageIcon size={48} />
                </div>
              )}
            </div>
            <div className="pb-4">
              <h1 className="text-5xl font-black text-slate-900 tracking-tighter">{category.name}</h1>
              <p className="text-slate-500 font-medium flex items-center gap-2 mt-2">
                <Grid size={16} className="text-orange-500" /> Collection Group #{category.id}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-50">
             <div className="bg-slate-50 p-6 rounded-[2rem]">
                <Calendar className="text-orange-500 mb-3" size={24} />
                <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Visibility</h4>
                <p className="text-slate-800 font-bold text-lg">Publicly Listed</p>
             </div>
             <div className="bg-slate-50 p-6 rounded-[2rem] md:col-span-2">
                <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-3">Management Note</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                   This category contains all items related to <span className="font-bold text-slate-900">{category.name}</span>. 
                   Deleting this will remove the grouping from associated products.
                </p>
             </div>
          </div>
        </div>
      </div>

      {/* Quick Footer Stats */}
      <div className="mt-8 flex justify-center gap-12 text-slate-400">
          <div className="text-center">
            <p className="text-2xl font-black text-slate-900">Live</p>
            <p className="text-[10px] uppercase font-bold tracking-widest">Status</p>
          </div>
          <div className="w-[1px] h-10 bg-slate-200"></div>
          <div className="text-center">
            <p className="text-2xl font-black text-slate-900">Global</p>
            <p className="text-[10px] uppercase font-bold tracking-widest">Scope</p>
          </div>
      </div>
    </div>
  );
};
export default CategoryShow;