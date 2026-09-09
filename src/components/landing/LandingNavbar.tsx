import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

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
    { label: 'SERVICES', href: '#services' },
    { label: 'STRATEGY', href: '#strategy' },
    { label: 'AUDITS', href: '#audits' },
    { label: 'WORKSPACE', href: '#workspace' },
    { label: 'BLOGS', href: '#insights' },
    { label: 'ABOUT US', href: '#about' },
    { label: 'CONTACT US', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 h-[76px] z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF5F0]/95 backdrop-blur-md border-b border-[#F3DEC8] shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] h-full mx-auto px-6 md:px-10 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center cursor-pointer select-none group" onClick={() => navigate('/')}>
          <img 
            src="/growwise-logo.png" 
            alt="GrowWise AI" 
            className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-7 xl:gap-8 text-[11px] font-black uppercase tracking-widest text-[#1E122C]/75">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative py-1 transition-colors hover:text-[#4B1D6B] group"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D94A2A] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right CTA Button: LOGIN */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/signup')}
            className="px-6 py-2.5 bg-gradient-to-r from-[#2B0847] via-[#48115B] to-[#801B48] hover:opacity-95 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-200 shadow-xs flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>LOGIN</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
