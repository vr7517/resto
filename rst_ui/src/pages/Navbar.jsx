import React, { useState, useEffect, use, useContext } from 'react';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
 import { Link } from "react-router-dom";



const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user=localStorage.getItem("user");
  

  // Scroll karne par navbar ka background change hoga
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Reservations', href: '/book' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      isScrolled ? 'py-4 bg-black/60 backdrop-blur-xl border-b border-white/10' : 'py-8 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* I. Logo Section */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center font-bold text-2xl rotate-3">
            R
          </div>
          <span className="text-2xl font-serif italic tracking-tighter font-bold">Resto</span>
        </div>

        {/* II. Desktop Navigation (Roman Menu) */}

<div className="hidden md:flex items-center gap-8">
  {navLinks.map((link) => (
    <Link
      key={link.name}
      to={link.href}
      className="text-sm font-medium tracking-widest uppercase hover:text-orange-400 transition-colors"
    >
      {link.name}
    </Link>
  ))}
</div>


        {/* III. Actions (Cart & Profile) */}
        <div className="flex items-center gap-6">
          <button className="relative p-2 hover:bg-white/10 rounded-full transition-all">
            <ShoppingCart size={22} />
            <span className="absolute top-0 right-0 w-4 h-4 bg-orange-500 text-[10px] flex items-center justify-center rounded-full font-bold">
              0
            </span>
          </button>
          
          <button className="hidden md:block p-2 hover:bg-white/10 rounded-full">
           {
            user?(<User size={22} />):(<Link to="/login" className="text-sm font-medium tracking-widest uppercase hover:text-orange-400 transition-colors">Login</Link>)
          }
            
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* IV. Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0f1113] border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-xl font-serif italic">
                  {link.name}
                </a>
              ))}
              <button className="bg-orange-500 py-4 rounded-2xl font-bold">Order Now</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;