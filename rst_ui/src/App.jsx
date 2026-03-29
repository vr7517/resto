import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import Login from './pages/Login'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import CustomerLayout from "./layouts/CustomerLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import CustomerDashboard from "./pages/customer/Dashboard";
import Navbar from './pages/Navbar'
import Footer from './pages/Footer'
import MenuPage from './pages/MenuPage'
import HomePage from './pages/HomePage'
const App = () => {
   const location = useLocation();
     const hideNavbar = location.pathname.startsWith("/admin");
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />

        </Route>
        

        {/* Customer Routes */}
        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <CustomerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<CustomerDashboard />} />
        </Route>
      </Routes>
      

    </>
  )
}

export default App
