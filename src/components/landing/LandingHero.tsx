import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';

export const LandingHero: React.FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, x: -80 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="relative lg:h-[700px] xl:h-[740px] 2xl:h-[780px] min-h-[700px] flex items-center pt-20 lg:pt-0 pb-12 lg:pb-0 overflow-hidden bg-white">
      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20">
        
        {/* Left Column - Hero Content */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="lg:col-span-5 flex flex-col justify-between py-6 space-y-12 lg:pt-16"
        >
          {/* Main Heading & Description */}
          <div className="space-y-6 mt-8 lg:mt-0">
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-[54px] font-extrabold text-[#151A1F] leading-[1.08] tracking-[-0.03em] font-sans"
            >
              Smart <span className="text-[#7065F5] italic font-serif font-medium">Digital</span><br />
              <span className="text-[#7065F5] italic font-serif font-medium">Marketing</span> For Real<br />
              Business Growth
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xs md:text-sm text-[#747B84] max-w-sm leading-relaxed"
            >
              Using insights, technology, and creativity, we turn digital marketing efforts into real growth opportunities for your business.
            </motion.p>

            {/* Buttons Row */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 pt-2">
              <button
                onClick={() => navigate('/signup')}
                className="px-6 py-3.5 bg-[#C8FF55] hover:bg-[#bceb4c] text-[#151A1F] font-bold text-xs rounded-full transition-all duration-200 hover:-translate-y-[2px] active:translate-y-0 cursor-pointer animate-pulse-slow"
              >
                Discover More
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="px-6 py-3.5 bg-[#7065F5] hover:bg-[#5b50e3] text-white font-bold text-xs rounded-full transition-all duration-200 hover:-translate-y-[2px] active:translate-y-0 cursor-pointer"
              >
                Contact Us
              </button>
            </motion.div>
          </div>

          {/* Bottom Social Links & Follow Us indicator */}
          <motion.div variants={itemVariants} className="space-y-5 pt-4 text-left w-full">
            {/* Thin line with animated indicator square dot sliding from left to right */}
            <div className="w-full h-[1px] bg-slate-200/80 relative overflow-visible">
              <motion.div 
                initial={{ left: '0%' }}
                animate={{ left: '98%' }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                className="absolute -top-1 w-2.5 h-2.5 bg-[#5C4DF7] rounded-xs"
              />
            </div>

            {/* Follow Us Header on its own line */}
            <h4 className="text-base font-extrabold text-[#151A1F] tracking-tight">Follow Us:</h4>

            {/* Social row below header with larger brand blue-purple icons */}
            <div className="flex flex-wrap items-center gap-8 text-sm font-semibold text-slate-600">
              <a href="#" className="flex items-center gap-2 hover:text-[#5C4DF7] transition-colors group">
                <Facebook className="w-4.5 h-4.5 text-[#5C4DF7] group-hover:scale-110 transition-transform fill-[#5C4DF7]/10" />
                <span>Facebook</span>
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-[#5C4DF7] transition-colors group">
                <Instagram className="w-4.5 h-4.5 text-[#5C4DF7] group-hover:scale-110 transition-transform" />
                <span>Instagram</span>
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-[#5C4DF7] transition-colors group">
                <Youtube className="w-4.5 h-4.5 text-[#5C4DF7] group-hover:scale-110 transition-transform fill-[#5C4DF7]/10" />
                <span>Youtube</span>
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-[#5C4DF7] transition-colors group">
                <Linkedin className="w-4.5 h-4.5 text-[#5C4DF7] group-hover:scale-110 transition-transform fill-[#5C4DF7]/10" />
                <span>Linkedin</span>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column Spacer - reserves space for absolute desktop image overlay */}
        <div className="lg:col-span-7 hidden lg:block pointer-events-none" />

        {/* Right Column - Masked Hero Image for Mobile/Tablet */}
        <div className="block lg:hidden w-full relative mt-8">
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-[300px] sm:h-[360px] rounded-[36px] overflow-hidden bg-white"
          >
            {/* Unified AI marketing manager robot & dashboard illustration */}
            <img
              src="/robot-hero-full.jpg"
              alt="AI Marketing Manager Illustration"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              loading="eager"
            />
            
            {/* Custom Notch 1: Top-Left Cutout (Smooth SVG) */}
            <svg
              className="absolute top-0 left-0 w-16 h-16 text-white fill-current z-20 pointer-events-none"
              viewBox="0 0 64 64"
            >
              <path d="M0 0 H64 C48 0 48 48 0 48 Z" />
            </svg>

            {/* Custom Notch 2: Top-Right Hanging Container for "Get Started" (Smooth SVG) */}
            <div className="absolute top-0 right-6 sm:right-10 w-[200px] sm:w-[220px] h-[76px] z-20">
              <svg
                className="absolute inset-0 w-full h-full text-white fill-current pointer-events-none"
                viewBox="0 0 220 76"
              >
                <path d="M 0 0 L 220 0 C 212 0 204 8 204 16 L 204 52 C 204 64 196 72 188 72 L 32 72 C 24 72 16 64 16 52 L 16 16 C 16 8 8 0 0 0 Z" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center pb-1">
                <button
                  onClick={() => navigate('/signup')}
                  className="px-5 py-2 bg-[#C8FF55] hover:bg-[#bceb4c] text-[#151A1F] font-extrabold text-[11px] rounded-full transition-all duration-200 cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* Custom Notch 3: Bottom-Left Stats Overlay Container (Smooth SVG) */}
            <div className="absolute bottom-0 left-0 w-[300px] h-[140px] z-20">
              <svg
                className="absolute inset-0 w-full h-full text-white fill-current pointer-events-none"
                viewBox="0 0 326 151"
              >
                <path d="M 0 151 L 0 16 C 0 8 8 0 16 0 L 294 0 C 302 0 310 8 310 16 L 310 135 C 310 143 318 151 326 151 Z" />
              </svg>
              
              {/* Lime Green Client Card placed inside notch */}
              <div className="absolute bottom-0 left-0 w-[268px] h-[124px] bg-[#C8FF55] rounded-tr-[24px] p-4 flex flex-col justify-between text-[#151A1F] z-30">
                <h4 className="text-[11px] font-bold text-[#151A1F] leading-snug tracking-tight font-sans">
                  We Drive Sustainable Digital Growth for Ambitious Brands
                </h4>
                
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    <img className="w-6 h-6 rounded-full border border-[#C8FF55] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=60" alt="Avatar" />
                    <img className="w-6 h-6 rounded-full border border-[#C8FF55] object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=60" alt="Avatar" />
                  </div>
                  <div>
                    <p className="text-[9px] font-extrabold leading-none text-[#151A1F]">5,000+ Happy Clients</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Desktop Absolute Image Container (Flush with top to align Get Started notch in header) */}
      <div className="hidden lg:block absolute top-0 right-6 bottom-10 w-[49vw] xl:w-[50vw] 2xl:w-[51vw] max-w-[760px] z-10">
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-full rounded-[36px] overflow-hidden bg-white shadow-sm"
        >
          {/* Unified AI marketing manager robot & dashboard illustration - pushed down slightly to create notch overlap */}
          <img
            src="/robot-hero-full.jpg"
            alt="AI Marketing Manager Illustration"
            className="absolute top-4 inset-x-0 bottom-0 w-full h-[calc(100%-16px)] object-cover rounded-[36px] select-none pointer-events-none"
            loading="eager"
          />

          {/* Custom Notch 1: Top-Left Cutout (Smooth SVG aligning with Navbar height) */}
          <svg
            className="absolute top-0 left-0 w-[90px] h-[76px] text-white fill-current z-20 pointer-events-none"
            viewBox="0 0 90 76"
          >
            <path d="M 0 0 L 90 0 C 70 0 70 76 0 76 Z" />
          </svg>

          {/* Custom Notch 2: Top-Right Hanging Container for "Get Started" (Smooth SVG) */}
          <div className="absolute top-0 right-10 w-[220px] h-[76px] z-20">
            <svg
              className="absolute inset-0 w-full h-full text-white fill-current pointer-events-none"
              viewBox="0 0 220 76"
            >
              <path d="M 0 0 L 220 0 C 212 0 204 8 204 16 L 204 52 C 204 64 196 72 188 72 L 32 72 C 24 72 16 64 16 52 L 16 16 C 16 8 8 0 0 0 Z" />
            </svg>
            {/* Button placed inside the cup notch */}
            <div className="absolute inset-0 flex items-center justify-center pb-1">
              <button
                onClick={() => navigate('/signup')}
                className="px-6 py-2.5 bg-[#C8FF55] hover:bg-[#bceb4c] text-[#151A1F] font-extrabold text-xs rounded-full transition-all duration-200 hover:-translate-y-[2px] active:translate-y-0 shadow-xs cursor-pointer"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Custom Notch 3: Bottom-Left Stats Overlay Container (Smooth SVG) */}
          <div className="absolute bottom-0 left-0 w-[326px] h-[151px] z-20">
            <svg
              className="absolute inset-0 w-full h-full text-white fill-current pointer-events-none"
              viewBox="0 0 326 151"
            >
              <path d="M 0 151 L 0 16 C 0 8 8 0 16 0 L 294 0 C 302 0 310 8 310 16 L 310 135 C 310 143 318 151 326 151 Z" />
            </svg>
            
            {/* Lime Green Client Card placed inside notch */}
            <div className="absolute bottom-0 left-0 w-[294px] h-[135px] bg-[#C8FF55] rounded-tr-[28px] p-5 flex flex-col justify-between text-[#151A1F] z-30">
              <h4 className="text-[13px] font-bold text-[#151A1F] leading-snug tracking-tight font-sans">
                We Drive Sustainable Digital Growth for Ambitious Brands
              </h4>
              
              {/* Bottom stats row */}
              <div className="flex items-center gap-3">
                {/* Overlapping Avatars */}
                <div className="flex -space-x-2">
                  <img
                    className="w-8 h-8 rounded-full border-2 border-[#C8FF55] object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=60"
                    alt="Avatar"
                  />
                  <img
                    className="w-8 h-8 rounded-full border-2 border-[#C8FF55] object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=60"
                    alt="Avatar"
                  />
                  <img
                    className="w-8 h-8 rounded-full border-2 border-[#C8FF55] object-cover"
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=60"
                    alt="Avatar"
                  />
                </div>

                {/* Stat text */}
                <div>
                  <p className="text-[10px] font-extrabold leading-none text-[#151A1F]">More Than 5,000+</p>
                  <span className="text-[8px] text-[#151A1F]/70 font-semibold">Happy Clients Around the World</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default LandingHero;
