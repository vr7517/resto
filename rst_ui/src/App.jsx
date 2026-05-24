import React from 'react'
import { Routes, Route } from 'react-router-dom'
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
import ProductList from './pages/admin/products/ProductList';
import CategoryList from './pages/admin/category/CategoryList';
import CategoryForm from './pages/admin/category/CategoryForm';
import ProductForm from './pages/admin/products/ProductForm';
import ProductShow from './pages/admin/products/ProductShow';
import CategoryShow from './pages/admin/category/CategoryShow';
import NormalLayout from './layouts/NormalLayout';
const App = () => {
   const location = useLocation();
     const hideNavbar = location.pathname.startsWith("/admin");
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {!hideNavbar && <Navbar />}
      <Routes>
        
        <Route path="/" element={<NormalLayout />}>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<MenuPage />} />
        </Route>


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
          {/* <Route path="users" element={<Users />} /> */}
          <Route path="categories" element={<CategoryList />} />
          <Route path="/admin/categories/create" element={<CategoryForm />} />
          <Route path="/admin/categories/:id/edit" element={<CategoryForm />} />
          <Route path="/admin/categories/:id" element={<CategoryShow/>} />  

          <Route path="products" element={<ProductList />} />
          <Route path="/admin/products/create" element={<ProductForm />} />
          <Route path="/admin/products/:id/edit" element={<ProductForm />} />

          <Route path="/admin/products/:id" element={<ProductShow/>} />  
          

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
