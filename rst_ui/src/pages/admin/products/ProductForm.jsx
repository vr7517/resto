import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../../../validations/product/product.schema";
import { useNavigate, useParams } from "react-router-dom";
import { Package, Upload, IndianRupee, Tag, Info, CheckCircle2 } from "lucide-react";

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      is_available: true,
    }
  });

  // Watch for image changes to update preview
  const imageFile = watch("image");

  useEffect(() => {
    axios.get("http://localhost:8000/api/categories")
      .then(res => setCategories(res.data.data))
      .catch(() => toast.error("Failed to load categories"));
  }, []);

  useEffect(() => {
    if (isEdit) {
      axios.get(`http://localhost:8000/api/products/${id}`)
        .then(res => {
          const p = res.data.data;
          Object.keys(p).forEach(key => {
            if (key === 'category_id') setValue(key, String(p[key]));
            else setValue(key, p[key]);
          });
          if (p.image) setPreview(`http://localhost:8000/storage/${p.image}`);
        })
        .catch(() => toast.error("Failed to load product"));
    }
  }, [id, setValue, isEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (key === "image") {
          if (data.image?.[0]) formData.append("image", data.image[0]);
        } else {
          formData.append(key, data[key] ?? "");
        }
      });

      const url = isEdit ? `http://localhost:8000/api/products/${id}?_method=PUT` : "http://localhost:8000/api/products";
      const response = await axios.post(url, formData);
      
      toast.success(response.data.message);
      navigate("/admin/products");
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg);
    }
  };

  // Reusable Input Component for cleaner code
  const FormInput = ({ label, icon: Icon, ...props }) => (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        {Icon && <Icon size={16} className="text-gray-400" />}
        {label}
      </label>
      <input
        {...props}
        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-rose-500 px-8 py-10 text-white">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Package size={32} />
              {isEdit ? "Update Product" : "Add New Product"}
            </h2>
            <p className="mt-2 text-orange-50/80">Fill in the details below to {isEdit ? 'update your existing' : 'publish a new'} product to your catalog.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Column: Basic Info */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
                  <Info size={18} className="text-orange-500" /> General Information
                </h3>
                
                <FormInput 
                  label="Product Name" 
                  icon={Package}
                  placeholder="e.g. Premium Wireless Headphones"
                  {...register("name")}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <select 
                    {...register("category_id")} 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none appearance-none"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    {...register("description")}
                    rows="4"
                    placeholder="Describe the product features..."
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                  />
                </div>
              </div>

              {/* Right Column: Pricing & Media */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
                  <IndianRupee size={18} className="text-orange-500" /> Pricing & Availability
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <FormInput label="Base Price" placeholder="0.00" {...register("price")} />
                  <FormInput label="Selling Price" placeholder="0.00" {...register("selling_price")} />
                </div>

                <FormInput label="Discount (%)" icon={Tag} placeholder="0" {...register("discount")} />

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Product Image</label>
                  <div className="relative group">
                    <div className={`border-2 border-dashed rounded-2xl p-4 transition-all flex flex-col items-center justify-center min-h-[160px] ${preview ? 'border-orange-500 bg-orange-50' : 'border-gray-300 hover:border-orange-400'}`}>
                      {preview ? (
                        <div className="relative group">
                          <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-xl shadow-md" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity flex items-center justify-center">
                            <Upload className="text-white" size={24} />
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                          <p className="text-xs text-gray-500">Click to upload or drag and drop</p>
                        </div>
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

                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors">
                  <input 
                    type="checkbox" 
                    {...register("is_available")}
                    className="w-5 h-5 rounded text-orange-500 focus:ring-orange-500 border-gray-300" 
                  />
                  <span className="text-sm font-semibold text-gray-700">Make product available for sale</span>
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-6 border-t flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate("/admin/products")}
                className="px-6 py-3 text-gray-600 font-medium hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-10 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold rounded-2xl shadow-lg shadow-orange-200 transition-all transform active:scale-95 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>
                    <CheckCircle2 size={20} />
                    {isEdit ? "Save Changes" : "Create Product"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;