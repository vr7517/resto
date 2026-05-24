import { Outlet, Link, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function CustomerLayout() {
  const location = useLocation();
  const { user,logout } = useAuth();

  // Helper to highlight active links
  const isActive = (path) => location.pathname === path ? "text-orange-600 font-semibold" : "text-gray-600 hover:text-orange-500 transition-colors";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

      {/* Navbar - Sticky for better UX */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          
          <div className="flex items-center gap-2">
            {/* Simple Logo Placeholder */}
            <div className="bg-orange-500 h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold">R</div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
              Resto<span className="text-orange-500">App</span>
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/customer/dashboard" className={isActive("/customer/dashboard")}>
              Menu
            </Link>
            <Link to="/orders" className={isActive("/orders")}>
              My Orders
            </Link>
            <Link to="/profile" className={isActive("/profile")}>
              Profile
            </Link>
            
            <div className="h-6 w-px bg-gray-200"></div> {/* Divider */}

            <button onClick={logout} className="text-gray-500 hover:text-red-600 font-medium px-2 py-1">
              Logout
            </button>
          </nav>

          {/* Mobile Menu Icon (Visual Only) */}
          <div className="md:hidden">
             <button className="p-2 text-gray-600">☰</button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Added a subtle entry animation container */}
        <div className="animate-in fade-in duration-500">
          <Outlet />
        </div>
      </main>

      {/* Simple Footer for a complete feel */}
      <footer className="bg-white border-t py-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Resto App. All rights reserved.
      </footer>
    </div>
  );
}