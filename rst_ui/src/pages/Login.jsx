import React from "react";
import axios from "axios";

import { FaUser, FaLock } from "react-icons/fa";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validations/auth/login.schema";
import { useNavigate } from "react-router-dom";


const Login = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      console.log("LOGIN PAYLOAD →", data);

      // For Laravel API with Sanctum/session auth
      axios.defaults.withCredentials = true;

      const response = await axios.post(
        // "http://rst_backend.test/api/login",
        "http://localhost:8000/api/login",
        {
          email: data.email,
          password: data.password,
        }
      );
      if (response.data.message) {
        toast.success(response.data.message);
      }
      console.log("Login Success →", response.data);

      // TODO: redirect user or store token
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      if (response.data.user.role === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/customer/dashboard");
      }

    }

    catch (error) {
      if (error.response) {
        const resData = error.response.data;

        // Validation errors (422)
        if (error.response.status === 422 && resData.errors) {
          Object.values(resData.errors).forEach((err) => {
            toast.error(err[0]); // show each field error
          });
        } else if (resData.message) {
          // Any other backend error (like Invalid credentials)
          toast.error(resData.message);
        } else {
          toast.error("Something went wrong!");
        }
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };
  ;


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
          <span className="text-lg font-semibold text-gray-800">
            Brand
          </span>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900">
          {isEdit ? "Edit Profile" : "Login form"}
        </h2>

        <p className="text-sm text-gray-500 mt-2 mb-8 leading-relaxed">
          Lorem Ipsum has been the industry's standard dummy text ever since.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* EMAIL */}
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              {...register("email")}
              type="email"
              placeholder="Enter email"
              className="w-full pl-11 pr-4 py-3 text-sm border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">
              {errors.email.message}
            </p>
          )}

          {/* PASSWORD */}
          {!isEdit && (
            <>
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
                <p className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white py-3 rounded-xl text-sm font-medium transition"
          >
            {isSubmitting ? "Please wait..." : "Login"}
          </button>
        </form>


        <p className="mt-6 text-xs text-gray-400 text-center">
          End user agreement
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
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Optional text like image */}
        {/* <div className="relative z-10 flex items-center justify-center w-full">
      <h1 className="text-white text-4xl font-bold tracking-wide">
        Welcome Back
      </h1>
    </div> */}
      </div>
    </div>

  );
};

export default Login;
