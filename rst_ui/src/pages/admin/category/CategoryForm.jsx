import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "../../../validations/category/category.schema";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutGrid, Upload, Image as ImageIcon, X, Save, ArrowLeft } from "lucide-react";

const CategoryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(categorySchema),
  });

  // Fetch data in edit mode
  useEffect(() => {
    if (isEdit) {
      axios.get(`http://localhost:8000/api/categories/${id}`)
        .then(res => {
          const data = res.data.data;
          setValue("name", data.name);
          if (data.image) {
            setPreview(`http://localhost:8000/storage/${data.image}`);
          }
        })
        .catch(() => toast.error("Failed to load category"));
    }
  }, [id, isEdit, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.image?.[0]) formData.append("image", data.image[0]);

      const url = isEdit 
        ? `http://localhost:8000/api/categories/${id}?_method=PUT` 
        : "http://localhost:8000/api/categories";
      
      await axios.post(url, formData);
      toast.success(isEdit ? "Category updated!" : "Category created!");
      navigate("/admin/categories");
    } catch (error) {
      const resData = error.response?.data;
      if (error.response?.status === 422 && resData.errors) {
        Object.values(resData.errors).forEach((err) => toast.error(err[0]));
      } else {
        toast.error(resData?.message || "Something went wrong!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4">
      <div className="max-w-xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate("/admin/categories")}
          className="flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors mb-6 font-medium text-sm"
        >
          <ArrowLeft size={16} />
          Back to Categories
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 px-8 py-10 text-white">
            <div className="bg-orange-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <LayoutGrid className="text-orange-500" size={24} />
            </div>
            <h2 className="text-2xl font-bold">
              {isEdit ? "Update Category" : "New Category"}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Organize your products by creating descriptive categories.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
            
            {/* Category Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Category Name
              </label>
              <div className="relative">
                <input
                  {...register("name")}
                  type="text"
                  placeholder="e.g. Electronics, Home Decor..."
                  className={`w-full pl-4 pr-4 py-3 bg-gray-50 border ${errors.name ? 'border-red-300' : 'border-gray-100'} rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium`}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-500 mt-1 ml-1 flex items-center gap-1">
                  <X size={12} /> {errors.name.message}
                </p>
              )}
            </div>

            {/* Image Upload Area */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Category Icon / Image
              </label>
              <div className="group relative">
                <div className={`
                  relative border-2 border-dashed rounded-3xl p-8 transition-all flex flex-col items-center justify-center gap-3
                  ${preview ? 'border-orange-500 bg-orange-50/30' : 'border-gray-200 hover:border-orange-300 hover:bg-gray-50'}
                `}>
                  {preview ? (
                    <div className="relative">
                      <img
                        src={preview}
                        alt="preview"
                        className="w-32 h-32 object-cover rounded-2xl shadow-md border-4 border-white"
                      />
                      <button 
                        type="button"
                        onClick={() => { setPreview(null); setValue("image", null); }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:scale-110 transition-transform"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                        <Upload className="text-gray-400 group-hover:text-orange-500" size={28} />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-gray-700">Click to upload image</p>
                        <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG (max. 2MB)</p>
                      </div>
                    </>
                  )}
                  <input
                    type="file"
                    {...register("image")}
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-4 rounded-2xl text-base font-bold shadow-lg shadow-orange-200 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Save size={20} />
                    {isEdit ? "Save Changes" : "Create Category"}
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

        <p className="text-center text-gray-400 text-xs mt-8">
          Tip: Use high-quality icons with transparent backgrounds for a cleaner look.
        </p>
      </div>
    </div>
  );
};

export default CategoryForm;