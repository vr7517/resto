import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUser, FaLock, FaPhone } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validations/auth/register.schema";


const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
  try {
    axios.defaults.withCredentials = true; // Sanctum support

    console.log(" Sending register data:", data);

    const response = await axios.post(
      // "http://rst_backend.test/api/register",
      "http://localhost:8000/api/register",
      {
        name: data.name,
        phone: data.mobile,
        email: data.email,
        password: data.password,
        password_confirmation: data.password, 
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Register success response:", response.data);

    if (response.data.message) {
      toast.success(response.data.message);
    }

  } catch (error) {
    console.error("❌ Register API error:", error);

    if (error.response) {
      const resData = error.response.data;

      console.log("📥 Error response data:", resData);
      console.log("📥 Status code:", error.response.status);

      // Validation errors
      if (error.response.status === 422 && resData.errors) {
        Object.values(resData.errors).forEach((err) => {
          toast.error(err[0]);
          console.log("⚠️ Validation error:", err[0]);
        });

      // Custom backend message
      } else if (resData.message) {
        toast.error(resData.message);
        console.log("⚠️ Backend message:", resData.message);

      } else {
        toast.error("Something went wrong!");
        console.log("⚠️ Unknown error structure");
      }

    } else {
      toast.error("Network error. Please try again.");
      console.log("🌐 Network / CORS error");
    }
  }
};

  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      {/* LEFT FORM */}
      <div className="w-full max-w-[420px] bg-white px-10 py-12 flex flex-col justify-center shadow-xl rounded-r-3xl">
        {/* Logo */}
        <div className="mb-6 flex items-center gap-2">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="#FF6A00" />
            <path
              d="M7 12c3-4 7-4 10 0"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-lg font-semibold text-gray-800">Brand</span>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900">Register</h2>

        <p className="text-sm text-gray-500 mt-2 mb-8 leading-relaxed">
          Create your account by filling the information below.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* NAME */}
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              {...register("name")}
              type="text"
              placeholder="Enter full name"
              className="w-full pl-11 pr-4 py-3 text-sm border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
            />
          </div>
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
          )}

          {/* MOBILE */}
          <div className="relative mt-5">
            <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              {...register("mobile")}
              type="text"
              placeholder="Enter mobile number"
              className="w-full pl-11 pr-4 py-3 text-sm border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
            />
          </div>
          {errors.mobile && (
            <p className="text-xs text-red-500 mt-1">{errors.mobile.message}</p>
          )}

          {/* EMAIL */}
          <div className="relative mt-5">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              {...register("email")}
              type="email"
              placeholder="Enter email"
              className="w-full pl-11 pr-4 py-3 text-sm border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}

          {/* PASSWORD */}
          <div className="relative mt-5">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="password"
              {...register("password")}
              placeholder="Enter password"
              className="w-full pl-11 pr-4 py-3 text-sm border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
            />
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white py-3 rounded-xl text-sm font-medium transition"
          >
            {isSubmitting ? "Please wait..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-xs text-gray-400 text-center">
          By registering you agree to our terms.
        </p>
      </div>

      {/* RIGHT IMAGE */}
      <div
        className="hidden md:flex flex-1 relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1546069901-ba9599a7e63c)",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
    </div>
  );
};

export default Register;
