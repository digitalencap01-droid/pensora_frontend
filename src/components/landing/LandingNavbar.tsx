import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';

export const LandingNavbar: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '/#services' },
    { label: 'Strategy', href: '/#strategy' },
    { label: 'Audits', href: '/#audits' },
    { label: 'Workspace', href: '/#workspace' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'About Us', href: '/#about' },
    { label: 'Contact Us', href: '/#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 h-[78px] z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F7F4FA]/95 backdrop-blur-md border-b border-[#3D126F]/10 shadow-xs'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] h-full mx-auto px-6 sm:px-10 md:px-12 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center cursor-pointer select-none group" onClick={() => navigate('/')}>
          <img 
            src="/growwise-logo.png" 
            alt="GrowWise AI" 
            className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-7 xl:gap-8 text-[13.5px] font-semibold text-[#3D126F]">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative py-1 transition-colors hover:text-[#7042D9] group"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#7042D9] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          {/* Search Button */}
          <button 
            type="button"
            aria-label="Search"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#3D126F] hover:text-[#7042D9] hover:bg-black/5 transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Login Pill Button */}
          <button
            onClick={() => navigate('/signup')}
            className="px-5 py-2 rounded-full border border-[#3D126F]/20 bg-white text-[#3D126F] hover:text-[#7042D9] hover:border-[#7042D9] font-semibold text-xs transition-all shadow-xs flex items-center gap-1.5 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Login</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Get Started Pill Button */}
          <button
            onClick={() => navigate('/signup')}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-[#3D126F] via-[#7042D9] to-[#E93E91] hover:opacity-95 text-white font-semibold text-xs transition-all shadow-sm flex items-center gap-1.5 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
