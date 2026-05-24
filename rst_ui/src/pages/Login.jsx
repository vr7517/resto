import React from "react";
import { FaEnvelope, FaLock, FaArrowRight, FaUtensils, FaPizzaSlice } from "react-icons/fa";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validations/auth/login.schema";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await login({
        email: data.email,
        password: data.password,
      });

      toast.success(`Welcome to BistroMaster, ${res.user.name}!`);

      // 🚦 Universal Role-Based Routing
      if (res.user.role === "Admin") {
        navigate("/admin/dashboard");
      } else if (res.user.role === "Staff") {
        navigate("/staff/dashboard");
      } else {
        navigate("/customer/dashboard");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FDFCFB] p-4 relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-orange-100 rounded-full blur-[100px] opacity-60" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-yellow-100 rounded-full blur-[100px] opacity-60" />

      <div className="w-full max-w-[1100px] h-auto md:h-[650px] flex flex-col md:flex-row bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-orange-50 overflow-hidden">
        
        {/* --- LEFT: VISUAL (HIDDEN ON MOBILE) --- */}
        <div className="hidden md:block w-1/2 relative">
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070" 
            className="absolute inset-0 w-full h-full object-cover"
            alt="Restaurant Atmosphere"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 via-transparent to-transparent" />
          
          <div className="absolute bottom-10 left-10 right-10">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
               <p className="text-white text-lg font-medium italic mb-2">
                 "Great food is the foundation of genuine happiness."
               </p>
               <div className="h-1 w-12 bg-orange-500 rounded-full" />
            </div>
          </div>
        </div>

        {/* --- RIGHT: THE UNIVERSAL FORM --- */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          
          {/* Universal Branding */}
          <div className="mb-10 flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-600/20">
              <FaUtensils className="text-white text-xl" />
            </div>
            <h1 className="text-2xl font-serif font-black text-slate-800 tracking-tight">
              Bistro<span className="text-orange-600">Master</span>
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome Back</h2>
            <p className="text-slate-500 text-sm mt-2">
              Sign in to manage your kitchen or view your favorites.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* EMAIL */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Email / Username</label>
              <div className="relative group">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-600 transition-colors" />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="hello@bistromaster.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium text-slate-800"
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            {/* PASSWORD */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Password</label>
                 <Link to="#" className="text-[10px] font-bold text-orange-600 hover:underline">Forgot Access Key?</Link>
              </div>
              <div className="relative group">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-600 transition-colors" />
                <input
                  type="password"
                  {...register("password")}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium text-slate-800"
                />
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white py-4 rounded-2xl text-sm font-bold transition-all shadow-xl shadow-slate-200 mt-4 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Enter Bistro <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footnote for Guests/Staff */}
          <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
             <Link to="/register" className="text-[10px] text-slate-400 font-medium">New guest? <span className="text-orange-600 font-bold cursor-pointer">Register Here</span></Link>
             <FaPizzaSlice className="text-orange-50/50 text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;