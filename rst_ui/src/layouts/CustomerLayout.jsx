import { Outlet, Link } from "react-router-dom";

export default function CustomerLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Navbar */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">
            Resto App
          </h1>

          <nav className="space-x-6">
            <Link to="/customer/dashboard" className="text-gray-600 hover:text-black">
              Dashboard
            </Link>
            <Link to="/orders" className="text-gray-600 hover:text-black">
              My Orders
            </Link>
            <Link to="/profile" className="text-gray-600 hover:text-black">
              Profile
            </Link>
            <button className="bg-red-500 text-white px-4 py-2 rounded">
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6">
        <Outlet />
      </main>
    </div>
  );
}
