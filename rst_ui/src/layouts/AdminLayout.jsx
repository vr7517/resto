import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <nav className="space-y-3">
          <a href="/admin/dashboard" className="block hover:text-gray-300">
            Dashboard
          </a>
          <a href="/admin/users" className="block hover:text-gray-300">
            Users
          </a>
        </nav>
      </aside>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <header className="bg-white shadow p-4">
          <h1 className="font-semibold text-lg">Admin Header</h1>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-2">
            Admin / Dashboard
          </div>

          {/* Page Content */}
          <Outlet />
        </main>
      </div>

    </div>
  );
}
