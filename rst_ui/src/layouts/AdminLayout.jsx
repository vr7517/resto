import { Outlet, NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  UserCircle
} from "lucide-react";

export default function AdminLayout() {
  const location = useLocation();

  // Helper to format breadcrumbs based on URL
  const pathnames = location.pathname.split("/").filter((x) => x);

  const NavItem = ({ to, icon: Icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${
          isActive
            ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
            : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
        }`
      }
    >
      <Icon size={20} className="transition-transform group-hover:scale-110" />
      <span className="font-medium">{label}</span>
    </NavLink>
  );

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-72 bg-slate-950 text-white flex flex-col m-4 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-800">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Package className="text-white" size={24} />
            </div>
            <h2 className="text-xl font-bold tracking-tight">Vogue<span className="text-orange-500">Admin</span></h2>
          </div>

          <nav className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-4 ml-4">Main Menu</p>
            <NavItem to="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" />
            <NavItem to="/admin/products" icon={Package} label="Products" />
            <NavItem to="/admin/categories" icon={Layers} label="Categories" />
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-slate-900">
          <nav className="space-y-2">
            <NavItem to="/admin/settings" icon={Settings} label="Settings" />
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-2xl transition-all">
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-8 bg-transparent">
          {/* Breadcrumb replacement/Search */}
          <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 w-96">
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search analytics..." 
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-orange-500 transition-colors">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-[#F8FAFC]"></span>
            </button>
            
            <div className="h-10 w-[1px] bg-slate-200"></div>

            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-800">Admin User</p>
                <p className="text-[10px] text-slate-400 font-medium">Super Admin</p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 border border-orange-200 shadow-sm group-hover:shadow-md transition-all">
                <UserCircle size={28} />
              </div>
            </div>
          </div>
        </header>

        {/* Content Wrapper */}
        <main className="flex-1 overflow-y-auto px-8 pb-8 pt-2">
          
          {/* Enhanced Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-6 ml-1">
            <span className="hover:text-orange-500 cursor-pointer">Admin</span>
            {pathnames.map((name, index) => (
              <span key={index} className="flex items-center gap-2">
                <span>/</span>
                <span className="capitalize text-slate-800">{name}</span>
              </span>
            ))}
          </nav>

          {/* This is where your List and Form pages will render */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  );
}