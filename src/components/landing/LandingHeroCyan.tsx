import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, FileText, Target, Layers, BarChart3 } from 'lucide-react';

export const LandingHero: React.FC = () => {
  const navigate = useNavigate();

  const cubicEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

  const features = [
    {
      icon: FileText,
      title: 'AI CONTENT CREATION',
      desc: 'High-quality content ready for your brand, in minutes.',
      iconBg: 'bg-[#118AB2]/10',
      iconColor: 'text-[#118AB2]',
    },
    {
      icon: Target,
      title: 'SMART TARGETING',
      desc: 'Reach the right audience with data-driven insights.',
      iconBg: 'bg-[#7CD5C7]/25',
      iconColor: 'text-[#118AB2]',
    },
    {
      icon: Layers,
      title: 'CAMPAIGN AUTOMATION',
      desc: 'Launch, manage & optimize campaigns effortlessly.',
      iconBg: 'bg-[#118AB2]/10',
      iconColor: 'text-[#118AB2]',
    },
    {
      icon: BarChart3,
      title: 'PERFORMANCE ANALYTICS',
      desc: 'Real-time insights that drive real growth.',
      iconBg: 'bg-[#7CD5C7]/25',
      iconColor: 'text-[#118AB2]',
    },
  ];

  return (
    <section className="relative bg-[#F2F2ED] overflow-hidden pt-[115px] sm:pt-[130px] lg:pt-[140px] pb-16 lg:pb-20 text-left">
      
      {/* Ambient background soft glowing blobs */}
      <div className="absolute top-[10%] right-[12%] w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#7CD5C7]/15 to-[#118AB2]/10 filter blur-3xl pointer-events-none select-none z-0" />
      <div className="absolute top-[40%] left-[5%] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#118AB2]/8 to-[#7CD5C7]/10 filter blur-3xl pointer-events-none select-none z-0" />

      {/* Main Hero Container */}
      <div className="max-w-[1440px] w-[calc(100%-48px)] sm:w-[calc(100%-80px)] mx-auto relative z-10">
        
        {/* Top Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Content Column */}
          <motion.div 
            className="lg:col-span-6 xl:col-span-5 flex flex-col items-start"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: cubicEase }}
          >
            {/* Pill Tag */}
            <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5ECEC]/80 border border-[#7CD5C7]/40 text-[#464B71] text-[11px] font-bold uppercase tracking-wider shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#7CD5C7] inline-block animate-pulse" />
              <span>DIGITAL MARKETING, AUTOMATED</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] xl:text-[64px] font-black text-[#1E2538] leading-[1.08] tracking-tight">
              From Invisible<br />
              to{' '}
              <span className="relative inline-block text-[#118AB2]">
                Unstoppable.
                {/* Decorative underline brush */}
                <svg className="absolute -bottom-1.5 left-0 w-full h-3.5 text-[#7CD5C7]" viewBox="0 0 200 12" fill="none">
                  <path d="M3 9C60 2 140 2 197 8" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-[#464B71]/85 text-[15px] sm:text-[16.5px] leading-relaxed max-w-lg">
              AI-powered digital marketing that creates, optimizes and grows your online presence while you focus on your business.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate('/signup')}
                className="px-7 py-3.5 bg-[#118AB2] hover:bg-[#0e7597] text-white font-bold text-xs sm:text-sm rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shrink-0"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <a
                href="#demo"
                className="px-6 py-3.5 bg-white/90 hover:bg-white border border-[#464B71]/20 text-[#1E2538] font-bold text-xs sm:text-sm rounded-full transition-all duration-200 flex items-center gap-2.5 shadow-xs hover:-translate-y-0.5 active:translate-y-0 shrink-0"
              >
                <div className="w-6 h-6 rounded-full bg-[#118AB2] text-white flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>Watch Demo</span>
              </a>
            </div>

            {/* Trusted by Growing Brands */}
            <div className="mt-8 pt-2 flex items-center gap-4">
              <div className="flex -space-x-2.5">
                <img 
                  className="w-9 h-9 rounded-full border-2 border-[#F2F2ED] object-cover shadow-xs" 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" 
                  alt="Avatar 1" 
                />
                <img 
                  className="w-9 h-9 rounded-full border-2 border-[#F2F2ED] object-cover shadow-xs" 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" 
                  alt="Avatar 2" 
                />
                <img 
                  className="w-9 h-9 rounded-full border-2 border-[#F2F2ED] object-cover shadow-xs" 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
                  alt="Avatar 3" 
                />
                <div className="w-9 h-9 rounded-full border-2 border-[#F2F2ED] bg-[#7CD5C7] text-[#1E2538] text-[11px] font-black flex items-center justify-center shadow-xs">
                  +120
                </div>
              </div>
              <div>
                <span className="block text-[11px] font-black uppercase tracking-wider text-[#1E2538]">
                  TRUSTED BY GROWING BRANDS
                </span>
                <span className="block text-xs text-[#464B71]/70 font-medium">
                  120+ Brands Growing with GrowWise AI
                </span>
              </div>
            </div>

          </motion.div>

          {/* Right Visual Column - 3D Stair Artwork */}
          <motion.div 
            className="lg:col-span-6 xl:col-span-7 flex justify-center lg:justify-end relative"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, ease: cubicEase, delay: 0.15 }}
          >
            <div className="relative w-full max-w-[640px] xl:max-w-[700px] flex items-center justify-center">
              
              {/* Ultra-Soft, Light & Subtle Bluish / Mint Ambient Glow */}
              <div className="absolute -inset-6 sm:-inset-12 bg-gradient-to-tr from-[#118AB2]/10 via-[#7CD5C7]/15 to-[#118AB2]/8 rounded-full filter blur-3xl pointer-events-none -z-10" />
              <div className="absolute top-[12%] right-[5%] w-[80%] h-[75%] bg-[#7CD5C7]/12 rounded-full filter blur-3xl pointer-events-none -z-10" />
              
              <img 
                src="/hero-stairs.png" 
                alt="GrowWise AI Growth Staircase" 
                className="w-full h-auto object-contain select-none pointer-events-none relative z-10 drop-shadow-[0_10px_25px_rgba(17,138,178,0.07)]"
              />
            </div>
          </motion.div>

        </div>

        {/* Bottom Floating Feature Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: cubicEase }}
          className="w-full mt-12 lg:mt-16 bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-7 shadow-[0_15px_45px_rgba(70,75,113,0.07)] border border-slate-100"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-slate-200/60">
            {features.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div key={idx} className="flex items-center gap-4 px-2 lg:px-6 first:pl-2">
                  <div className={`w-12 h-12 rounded-2xl ${feat.iconBg} ${feat.iconColor} flex items-center justify-center shrink-0`}>
                    <IconComp className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#1E2538]">
                      {feat.title}
                    </h4>
                    <p className="text-[11.5px] text-[#464B71]/70 font-medium mt-0.5 leading-snug">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>

    </section>
  );
};

export default LandingHero;
