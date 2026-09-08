import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 h-[76px] z-50 transition-all duration-300 pointer-events-none ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-theme-border shadow-xs'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] h-full mx-auto px-6 md:px-8 flex items-center justify-between pointer-events-none">
        
        {/* Left Logo and Menu Row - enable pointer events */}
        <div className="flex items-center gap-16 pointer-events-auto">
          {/* Brand Logo - Stacked WeboBuzz with custom split green-blue circle */}
          <div className="flex items-center gap-2.5 cursor-pointer select-none" onClick={() => navigate('/')}>
            {/* Custom split circle symbol: top-right green, bottom-left blue-purple (bulletproof CSS gradient) */}
            <div 
              className="w-9 h-9 rounded-full shrink-0 border border-slate-100 shadow-sm"
              style={{
                background: 'linear-gradient(135deg, #C8FF55 50%, #5C4DF7 50%)'
              }}
            />
            {/* Stacked wordmark */}
            <div className="flex flex-col leading-[1.0] text-left">
              <span className="font-extrabold text-[#151A1F] text-[13px] tracking-tight">webo</span>
              <span className="font-black text-[#151A1F] text-[13px] tracking-tight -mt-0.5">buzz</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-bold text-[#5C4DF7] hover:text-[#4b3ce3] transition-colors">Home</a>
            <a href="#" className="text-sm font-bold text-[#151A1F] hover:text-[#5C4DF7] transition-colors">About</a>
            <div className="flex items-center gap-1 cursor-pointer group">
              <span className="text-sm font-bold text-[#151A1F] group-hover:text-[#5C4DF7] transition-colors">Services</span>
              <ChevronDown className="w-4 h-4 text-[#151A1F] group-hover:text-[#5C4DF7] transition-transform group-hover:rotate-180" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer group">
              <span className="text-sm font-bold text-[#151A1F] group-hover:text-[#5C4DF7] transition-colors">Pages</span>
              <ChevronDown className="w-4 h-4 text-[#151A1F] group-hover:text-[#5C4DF7] transition-transform group-hover:rotate-180" />
            </div>
            <a href="#" className="text-sm font-bold text-[#151A1F] hover:text-[#5C4DF7] transition-colors">Contact</a>
          </div>
        </div>

        {/* Right CTA placeholder - Hidden on desktop to avoid duplicate CTA with image notch */}
        <div className="lg:hidden pointer-events-auto">
          <button
            onClick={() => navigate('/signup')}
            className="px-6 py-2.5 bg-[#C8FF55] hover:bg-[#bceb4c] text-[#151A1F] font-bold text-xs rounded-full transition-all duration-200 hover:-translate-y-[2px] active:translate-y-0 cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
