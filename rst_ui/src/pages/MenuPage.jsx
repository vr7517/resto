import React, { useState } from 'react';
import { ShoppingBag, Search, Plus } from 'lucide-react';

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-800">Resto Menu</h1>
          <div className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-600">
            Table #08
          </div>
        </div>
        
        {/* Search */}
        <div className="mt-4 flex items-center rounded-xl bg-slate-100 px-3 py-2">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search for delicious food..." 
            className="ml-2 w-full bg-transparent outline-none text-sm"
          />
        </div>
      </header>

      {/* Category Ribbon */}
      <div className="flex gap-3 overflow-x-auto p-4 no-scrollbar">
        {['All', 'Main Course', 'Appetizers', 'Drinks', 'Desserts'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              activeCategory === cat ? 'bg-orange-500 text-white' : 'bg-white text-slate-600 border'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-4 px-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex gap-4 rounded-2xl bg-white p-3 shadow-sm border border-slate-100">
            <div className="h-24 w-24 flex-shrink-0 rounded-xl bg-slate-200 object-cover" />
            <div className="flex flex-1 flex-col justify-between py-1">
              <div>
                <h3 className="font-bold text-slate-800">Classic Cheese Burger</h3>
                <p className="text-xs text-slate-500 line-clamp-2">Double patty with cheddar cheese and special Resto sauce.</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-orange-600">₹249</span>
                <button className="rounded-lg bg-orange-500 p-1.5 text-white hover:bg-orange-600">
                  <Plus size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cart Button */}
      <div className="fixed bottom-6 left-0 right-0 px-4">
        <button className="flex w-full items-center justify-between rounded-2xl bg-slate-900 p-4 text-white shadow-xl transition-transform active:scale-95">
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingBag size={24} />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold">3</span>
            </div>
            <span className="font-medium">3 Items Added</span>
          </div>
          <span className="text-lg font-bold uppercase tracking-wide">View Cart →</span>
        </button>
      </div>
    </div>
  );
};

export default MenuPage;