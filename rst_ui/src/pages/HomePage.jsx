import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Utensils, Star, Clock } from 'lucide-react';
import { useNavigate, Link } from "react-router-dom";


const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f1113] text-white overflow-x-hidden">
      {/* 1. Hero Section */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image/Video */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80" 
            className="h-full w-full object-cover opacity-60 scale-105"
            alt="Signature Dish"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0f1113]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-orange-400 tracking-[0.3em] uppercase text-sm font-semibold mb-4 block"
          >
            Exquisite Dining Experience
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-serif italic leading-tight"
          >
            Culinary Art <br /> at Your Table.
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-col md:flex-row gap-4 justify-center"
          >
            <button className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              Start Your Order <ChevronRight size={20} />
            </button>
            <button className="border border-white/30 backdrop-blur-md px-8 py-4 rounded-full font-bold hover:bg-white hover:text-black transition-all">
              Book a Table
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. Floating Stats (The Glass Card) */}
      <section className="relative z-20 -mt-16 px-4 max-w-5xl mx-auto">
        <div className="grid grid-cols-3 gap-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <div className="text-center border-r border-white/10">
            <h4 className="text-2xl font-bold">4.9</h4>
            <p className="text-xs text-slate-400 uppercase tracking-widest">Rating</p>
          </div>
          <div className="text-center border-r border-white/10">
            <h4 className="text-2xl font-bold">20m</h4>
            <p className="text-xs text-slate-400 uppercase tracking-widest">Avg Time</p>
          </div>
          <div className="text-center">
            <h4 className="text-2xl font-bold">100%</h4>
            <p className="text-xs text-slate-400 uppercase tracking-widest">Fresh</p>
          </div>
        </div>
      </section>

      {/* 3. Featured Categories (Visual Cards) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-serif italic">Our Specialties</h2>
            <p className="text-slate-400 mt-2">Handcrafted dishes made with seasonal ingredients.</p>
          </div>
          <button onClick={() => navigate("/menu")} className="text-orange-400 font-semibold border-b border-orange-400/30 pb-1">View Full Menu</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Gourmet Pizza', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400', color: 'from-red-500/20' },
            { name: 'Signature Pasta', img: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=400', color: 'from-green-500/20' },
            { name: 'Artisan Desserts', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400', color: 'from-amber-500/20' },
          ].map((item, i) => (
            <motion.div 
              whileHover={{ y: -10 }}
              key={i} 
              className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer"
            >
              <img src={item.img} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.name} />
              <div className={`absolute inset-0 bg-gradient-to-t ${item.color} via-transparent to-transparent`} />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-sm text-slate-300 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">Explore Options</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;