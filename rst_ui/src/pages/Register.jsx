import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUser, FaLock, FaPhone, FaEnvelope, FaArrowRight, FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validations/auth/register.schema";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        "http://localhost:8000/api/register",
        {
          name: data.name,
          phone: data.mobile,
          email: data.email,
          password: data.password,
          password_confirmation: data.password, 
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.message) {
        toast.success("Welcome to the family! Account created.");
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response?.status === 422 && error.response.data.errors) {
        Object.values(error.response.data.errors).forEach((err) => toast.error(err[0]));
      } else {
        toast.error(error.response?.data?.message || "Registration failed");
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FDFCFB] p-4 relative overflow-hidden font-sans">
      
      {/* Culinary Background Accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-yellow-100/50 rounded-full blur-3xl" />

      <div className="w-full max-w-[1100px] bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-orange-50 overflow-hidden flex flex-col md:flex-row shadow-2xl">
        
        {/* --- LEFT SECTION: BRANDING & QUOTE --- */}
        <div className="hidden md:block w-[45%] relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1550966841-3ee3ad349086?q=80&w=2070" 
            className="absolute inset-0 w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-700"
            alt="Fine Dining"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-orange-950/90 via-orange-900/20 to-transparent" />
          
          <div className="absolute bottom-12 left-10 right-10">
            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20">
               <h3 className="text-3xl font-serif font-bold text-white italic leading-tight mb-4">
                 "Every flavor tells a story. Start yours with us."
               </h3>
               <div className="flex items-center gap-3">
                  <div className="w-10 h-1 bg-orange-500 rounded-full" />
                  <p className="text-orange-100 text-xs font-bold uppercase tracking-widest">Join the Table</p>
               </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT SECTION: REGISTER FORM --- */}
        <div className="w-full md:w-[55%] p-8 md:p-14 flex flex-col justify-center">
          
          {/* Logo */}
          <div className="mb-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/30">
              <FaUtensils className="text-white text-lg" />
            </div>
            <span className="text-xl font-serif font-black text-slate-800">
              Bistro<span className="text-orange-600">Master</span>
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Create Account</h2>
            <p className="text-slate-500 text-sm mt-2">
              Join our community of food lovers and professionals.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* NAME */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-600 transition-colors" />
                <input
                  {...register("name")}
                  type="text"
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium text-slate-800"
                />
              </div>
              {errors.name && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.name.message}</p>}
            </div>

            {/* MOBILE */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile No.</label>
              <div className="relative group">
                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-600 transition-colors" />
                <input
                  {...register("mobile")}
                  type="text"
                  placeholder="+91 98765 43210"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium text-slate-800"
                />
              </div>
              {errors.mobile && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.mobile.message}</p>}
            </div>

            {/* EMAIL (Full width on small, half on large if you want, but full is safer for email) */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-600 transition-colors" />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="john@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium text-slate-800"
                />
              </div>
              {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.email.message}</p>}
            </div>

            {/* PASSWORD */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-600 transition-colors" />
                <input
                  type="password"
                  {...register("password")}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium text-slate-800"
                />
              </div>
              {errors.password && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.password.message}</p>}
            </div>

            {/* REGISTER BUTTON */}
            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full bg-orange-600 hover:bg-orange-700 disabled:bg-slate-300 text-white py-4 rounded-2xl text-sm font-bold transition-all shadow-xl shadow-orange-200 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Create My Account <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-600 font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;