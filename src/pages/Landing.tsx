import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Star, 
  Compass, 
  Activity, 
  Send, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsRight,
  Play, 
  Layers, 
  Cpu, 
  Globe, 
  Award, 
  Clock, 
  Search, 
  Lightbulb, 
  Users,
  Phone,
  Target,
  FileEdit,
  Folder,
  TrendingUp
} from 'lucide-react';
import SmoothScroll from '../components/landing/SmoothScroll';
import AutomationProcess from '../components/landing/AutomationProcess';
import AutonomyControl from '../components/landing/AutonomyControl';
import AuditScopes from '../components/landing/AuditScopes';
import CoPilotFeatures from '../components/landing/CoPilotFeatures';
import LandingFinalCTA from '../components/landing/LandingFinalCTA';
import LandingInsights from '../components/landing/LandingInsights';
import LandingFooter from '../components/landing/LandingFooter';

// ========================================================
// REUSABLE DECORATIVE GRAPHICS
// ========================================================

const Sparkle: React.FC<{ className?: string; color?: string }> = ({ className = 'w-4 h-4', color = '#D94A2A' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" fill={color} />
  </svg>
);

const TinyStar: React.FC<{ className?: string; color?: string }> = ({ className = 'w-3 h-3', color = '#F2A65A' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill={color} />
  </svg>
);

const DotCluster: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`grid grid-cols-4 gap-1.5 opacity-20 ${className}`}>
    {Array.from({ length: 16 }).map((_, i) => (
      <div key={i} className="w-1 h-1 rounded-full bg-[#4B1D6B]" />
    ))}
  </div>
);

// ========================================================
// ANIMATED COUNTER COMPONENT
// ========================================================

const AnimatedCounter: React.FC<{ value: number; suffix?: string; prefix?: string; className?: string }> = ({ 
  value, 
  suffix = '', 
  prefix = '',
  className = ''
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView && ref.current) {
      let start = 0;
      const end = value;
      const duration = 1500; // ms
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease-out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(start + (end - start) * easeProgress);
        
        if (ref.current) {
          ref.current.textContent = `${prefix}${currentVal.toLocaleString()}${suffix}`;
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value, suffix, prefix]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
};

// ========================================================
// NEW CREATIVE LANDING PAGE
// ========================================================

export const Landing: React.FC = () => {
  // Custom Cursor state (Desktop only)
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'arrow'>('default');

  // Hero container ref & coordinate state for interactive mouse-glow background illumination
  const heroRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setGlowPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Cursor Parallax positioning state (for desktop only)
  const [parallaxPos, setParallaxPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleParallax = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      setParallaxPos({ x, y });
    };
    window.addEventListener('mousemove', handleParallax);
    return () => window.removeEventListener('mousemove', handleParallax);
  }, []);

  // Sticky Navbar state on scroll
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax section scroll mapping
  const darkSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: darkScrollY } = useScroll({
    target: darkSectionRef,
    offset: ["start end", "end start"]
  });
  const darkBlobY1 = useTransform(darkScrollY, [0, 1], [-60, 60]);
  const darkBlobY2 = useTransform(darkScrollY, [0, 1], [60, -60]);

  // Horizontal Movement section scroll mapping
  const horizontalRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: horizontalScroll } = useScroll({
    target: horizontalRef,
    offset: ["start end", "end start"]
  });
  const slideLeft = useTransform(horizontalScroll, [0, 1], [-120, 120]);
  const slideRight = useTransform(horizontalScroll, [0, 1], [120, -120]);

  // Testimonials Slider state
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const testimonials = [
    {
      quote: "Aura replaced our fragmented dashboards with a unified visual co-pilot. In three months, our organic campaigns generated 42% more leads while cutting ad spends.",
      author: "Priya Sharma",
      role: "Creative Director, Bloom Boutique",
      avatar: "PS",
      color: "#4B1D6B"
    },
    {
      quote: "The scroll animation visual tools and auto-marketing suggestions allowed our local shop to compete globally. Aura is not just a platform; it is our marketing partner.",
      author: "Vikram Malhotra",
      role: "Founder, Greenhouse Coffee",
      avatar: "VM",
      color: "#8C1F3D"
    },
    {
      quote: "We loved the multi-workspace management. We audit multiple client sites, draft social media tags, and review lead score values, all within a beautiful dark theme settings panel.",
      author: "Sarah Jenkins",
      role: "Digital Specialist, Aura Retail",
      avatar: "SJ",
      color: "#D94A2A"
    }
  ];

  // Sync state reactively when workspace switches
  const cubicEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

  // Bottom Feature Strip capabilities list configuration
  const features = [
    {
      icon: Sparkles,
      title: "AI Content Creation",
      desc: "High quality content made for your brand",
      color: "#D94A2A"
    },
    {
      icon: Compass,
      title: "Smart Targeting",
      desc: "Reach the right audience at the right time",
      color: "#8C1F3D"
    },
    {
      icon: Layers,
      title: "Campaign Automation",
      desc: "Launch, manage & optimize campaigns 24/7",
      color: "#4B1D6B"
    },
    {
      icon: Activity,
      title: "Performance Analytics",
      desc: "Real-time insights that drive real growth",
      color: "#D94A2A"
    },
    {
      icon: Users,
      title: "Lead Generation",
      desc: "Attract, capture & convert high-quality leads",
      color: "#8C1F3D"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFDFC] text-[#181516] selection:bg-[#D94A2A] selection:text-white antialiased overflow-x-hidden relative">
      
      {/* Smooth scroll engine */}
      <SmoothScroll />

      {/* Desktop Custom Cursor */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-[#D94A2A] pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: cursorVariant === 'hover' ? 2 : cursorVariant === 'arrow' ? 1.5 : 1,
          backgroundColor: cursorVariant === 'hover' ? '#D94A2A' : 'transparent',
          borderColor: cursorVariant === 'hover' ? 'transparent' : '#D94A2A'
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 350, mass: 0.4 }}
      />

      {/* Thin scroll progress indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8C1F3D] via-[#D94A2A] to-[#F2A65A] z-50 origin-left"
        style={{ scaleX: useScroll().scrollYProgress }}
      />

      {/* ========================================================
          1. NAVIGATION
          ======================================================== */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 flex items-center ${
          isScrolled 
            ? 'h-[76px] bg-[#F7E6D5]/90 backdrop-blur-md border-b border-[#ebdcd0] shadow-sm' 
            : 'h-[86px] bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] w-[calc(100%-100px)] mx-auto px-12 flex items-center justify-between">
          
          {/* Logo */}
          <a 
            href="/" 
            className="flex items-center gap-2 group cursor-pointer"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#4B1D6B] to-[#8C1F3D] flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5 text-[#F7E6D5] animate-pulse" />
            </div>
            <span className="text-xl font-black tracking-tight text-[#2D123A]">
              webo<span className="font-semibold text-[#8C1F3D]">buzz</span>
            </span>
          </a>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-9 text-[11px] font-black uppercase tracking-widest text-[#2D123A]/70">
            {['Services', 'Strategy', 'Audits', 'Workspace', 'Insights', 'About Us'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="relative py-1 transition-colors hover:text-[#4B1D6B] group"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <span>{item}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D94A2A] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Action CTA */}
          <div className="flex items-center gap-4">
            <a 
              href="/signup"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="px-6 py-3 bg-[#4B1D6B] hover:bg-[#8C1F3D] text-[#FFFDFC] text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-200 shadow-xs flex items-center gap-2 hover:-translate-y-0.5"
            >
              <span>Launch App</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </nav>

      {/* ========================================================
          2. HERO SECTION (HIGH-FIDELITY CREATIVE ARTWORK HERO)
          ======================================================== */}
      <section ref={heroRef} className="relative bg-[#F7E6D5] overflow-hidden text-left flex flex-col justify-between" style={{ minHeight: 'clamp(760px, 50vw, 850px)' }}>
        
        {/* Subtle dot-grid pattern using #8C1F3D at 3.5% opacity */}
        <div 
          className="absolute inset-0 pointer-events-none select-none opacity-[0.035] z-30"
          style={{
            backgroundImage: 'radial-gradient(#8C1F3D 1.5px, transparent 1.5px)',
            backgroundSize: '32px 32px'
          }}
        />

        {/* Ambient background soft static glow blob */}
        <div className="absolute top-[15%] right-[5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#8C1F3D]/3 to-[#F2A65A]/3 filter blur-3xl pointer-events-none select-none z-0" />

        {/* Interactive ambient cursor glow tracker blob (Unique mouse follow effect) */}
        <motion.div 
          className="absolute pointer-events-none select-none w-[450px] h-[450px] rounded-full bg-gradient-to-r from-[#F2A65A]/8 to-[#D94A2A]/4 filter blur-3xl z-0 hidden lg:block"
          animate={{
            x: glowPos.x - 225,
            y: glowPos.y - 225
          }}
          transition={{ type: 'spring', damping: 55, stiffness: 220, mass: 0.55 }}
        />

        {/* Wide Container: max-width 1440px to 1500px, width: calc(100% - 100px), margin: 0 auto */}
        <div className="max-w-[1440px] w-[calc(100%-100px)] mx-auto px-12 pt-[140px] pb-[100px] flex flex-col lg:flex-row items-center justify-between relative z-10 w-full flex-1 gap-12">
          
          {/* Left Content column: Enters from the Left after Right Image begins */}
          <motion.div 
            className="w-full lg:w-[44%] flex flex-col items-start relative z-10"
            initial={{ opacity: 0, x: -70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: cubicEase, delay: 0.35 }}
          >
            
            {/* Badge: Place above heading with margin-bottom: 28px-34px. Align exactly to headline left edge. No curves interfering. */}
            <div className="mb-[32px] inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFF8F1] border border-[#F2A65A]/25 text-[#8C1F3D] text-[10px] font-black uppercase tracking-wider shadow-3xs">
              <Sparkles className="w-3.5 h-3.5 fill-[#8C1F3D]/10" />
              <span>✦ Digital Marketing, Automated</span>
            </div>

            {/* Headline: max-width 600px, font-size clamp(48px, 3.8vw, 62px), line-height 1.02, letter-spacing -0.035em, font-weight 700-800 */}
            <h1 
              className="font-extrabold text-[#2D123A] tracking-[-0.035em] text-left w-full max-w-[600px]"
              style={{ 
                fontSize: 'clamp(48px, 3.8vw, 62px)', 
                lineHeight: '1.02'
              }}
            >
              Rank Your Website<br />
              On the First Page of<br />
              <span className="relative inline-block bg-gradient-to-r from-[#D94A2A] to-[#8C1F3D] bg-clip-text text-transparent">
                Search Results.
                {/* Decorative animated underline brush flourish */}
                <svg className="absolute left-0 bottom-[-2px] w-full h-2 text-[#D94A2A]/50 overflow-visible" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <motion.path 
                    d="M 0,5 C 25,2 75,8 100,5" 
                    stroke="currentColor" 
                    strokeWidth="3.5" 
                    fill="none" 
                    strokeLinecap="round" 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, ease: "easeInOut", delay: 1.1 }}
                  />
                </svg>
              </span>
            </h1>

            {/* Supporting Paragraph: width 470px-540px, font-size 16px, line-height 1.6, muted warm gray/plum, gap between heading and paragraph: 26-32px */}
            <p className="mt-[26px] text-[#2D123A]/70 font-medium text-[16px] leading-[1.6] max-w-[500px] text-left">
              AI-powered digital marketing that creates, optimizes and grows your online presence while you focus on your business.
            </p>

            {/* CTA Buttons: Place directly below paragraph. margin-top: 30px, gap: 16px, primary button height 54px-58px. Do not stretch full width. */}
            <div className="mt-[30px] flex flex-wrap items-center gap-4">
              <motion.a 
                href="#services"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className="h-[56px] px-8 bg-[#4B1D6B] hover:bg-[#3b1754] text-[#FFFDFC] text-xs font-black uppercase tracking-widest rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 group border-0 shrink-0"
                whileHover={{ y: -2 }}
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.a>
              
              <motion.a 
                href="#demo"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className="h-[56px] px-8 bg-transparent border border-[#F2A65A]/40 text-[#2D123A] hover:bg-[#FFF8F1]/40 text-xs font-black uppercase tracking-widest rounded-2xl transition-all duration-200 flex items-center gap-2 group shrink-0"
                whileHover={{ y: -2 }}
              >
                <div className="w-5 h-5 rounded-full bg-[#8C1F3D]/10 flex items-center justify-center text-[#8C1F3D]">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>Watch Demo</span>
              </motion.a>
            </div>

            {/* Mobile illustration layout block */}
            <motion.div 
              className="block lg:hidden w-[115%] ml-[-7.5%] my-8 relative overflow-hidden pointer-events-none select-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="/hero-artwork.png" 
                alt="AI Campaign Growth Monitor" 
                className="w-full h-auto object-contain"
              />
            </motion.div>

            {/* Trust block: Below CTAs. margin-top: 42px-50px. Overlapping avatars, short trust label, small supporting text. Do not dominate. */}
            <div className="mt-[46px] flex flex-col sm:flex-row items-start sm:items-center gap-4 text-left relative z-10">
              <div className="flex -space-x-3.5">
                {[0, 1, 2, 3].map((idx) => (
                  <div 
                    key={idx} 
                    className="w-10 h-10 rounded-full border-2 border-[#F7E6D5] bg-slate-350 overflow-hidden shrink-0 shadow-xs"
                  >
                    <img 
                      src={`https://images.unsplash.com/photo-${
                        idx === 0 ? '1534528741775-53994a69daeb' : 
                        idx === 1 ? '1507003211169-0a1dd7228f2d' : 
                        idx === 2 ? '1494790108377-be9c29b29330' : 
                        '1500648767791-00dcc994a43e'
                      }?w=100&h=100&fit=crop`} 
                      alt="Review User" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-[#F7E6D5] bg-[#8C1F3D] flex items-center justify-center text-white text-[11px] font-black shrink-0 shadow-xs">
                  +120
                </div>
              </div>
              <div className="text-xs">
                <span className="block font-black text-[#2D123A] uppercase tracking-wider">Trusted by growing brands</span>
                <span className="block text-slate-500 font-bold mt-0.5">120+ Brands Growing with Webobuzz</span>
              </div>
            </div>

          </motion.div>

          {/* Right Visual column: Absolute positioned to align flush to screen right edge */}
          <div className="absolute right-[-4.5%] top-[100px] w-[59vw] max-w-[950px] h-[580px] pointer-events-none select-none hidden lg:block z-0">
            
            {/* Navbar is at top-0. To ensure at least 70px-90px breathing gap below navbar: the image container is offset top-[100px]! */}
            <motion.div 
              className="w-full h-full"
              initial={{ opacity: 0, x: 90 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, ease: cubicEase, delay: 0.05 }}
              style={{
                x: parallaxPos.x * 5,
                y: parallaxPos.y * 4
              }}
            >
              <img 
                src="/hero-artwork.png" 
                alt="AI Marketing Growth Flow" 
                className="w-full h-full object-contain object-right"
              />
            </motion.div>

            {/* 4-6 Layered Floating Micro Elements with Parallax offsets */}
            {/* Floater 1: Sparkle (Top Left) */}
            <motion.div 
              className="absolute left-[8%] top-[10%] z-25 pointer-events-none"
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ x: parallaxPos.x * 8, y: parallaxPos.y * 6 }}
            >
              <Sparkle className="w-7 h-7" color="#D94A2A" />
            </motion.div>

            {/* Floater 2: Dot (Bottom Left) */}
            <motion.div 
              className="absolute left-[12%] bottom-[15%] z-25 pointer-events-none"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ x: parallaxPos.x * 6, y: parallaxPos.y * 5 }}
            >
              <div className="w-3.5 h-3.5 rounded-full bg-[#8C1F3D]" />
            </motion.div>

            {/* Floater 3: Orange Star (Top Right) */}
            <motion.div 
              className="absolute right-[8%] top-[5%] z-25 pointer-events-none"
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ x: parallaxPos.x * 7, y: parallaxPos.y * 5.5 }}
            >
              <TinyStar className="w-6 h-6" color="#F2A65A" />
            </motion.div>

            {/* Floater 4: Small Ring (Middle Right) */}
            <motion.div 
              className="absolute right-[5%] top-[40%] z-25 pointer-events-none"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ x: parallaxPos.x * 8, y: parallaxPos.y * 6 }}
            >
              <div className="w-5 h-5 rounded-full border-2 border-dashed border-[#4B1D6B]/40" />
            </motion.div>

            {/* Floater 5: Sparkle (Center Bottom) */}
            <motion.div 
              className="absolute left-[50%] bottom-[8%] z-25 pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              style={{ x: parallaxPos.x * 2, y: parallaxPos.y * 2 }}
            >
              <TinyStar className="w-4 h-4" color="#D94A2A" />
            </motion.div>

          </div>

        </div>

        {/* Bottom Capabilities Feature Strip: visually overlaps the bottom of the hero slightly. 
            Width 88-92%, warm white, border-radius 20px-24px, soft warm shadow, padding 28px-38px. */}
        <div className="w-full max-w-[1440px] mx-auto px-12 relative z-25 translate-y-[36px]">
          <motion.div 
            className="w-[90%] mx-auto bg-[#FFFDFC] border border-[#F2A65A]/15 rounded-[24px] p-8 shadow-[0_16px_45px_rgba(75,29,107,0.05)] text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: cubicEase, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {features.map((feat, idx) => {
                const IconComponent = feat.icon;
                return (
                  <motion.div 
                    key={idx}
                    className="space-y-2 group cursor-pointer"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.35 + idx * 0.08, ease: cubicEase }}
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-9 h-9 rounded-xl flex items-center justify-center shadow-3xs transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundColor: `${feat.color}15`, color: feat.color }}
                      >
                        <IconComponent className="w-4.5 h-4.5 stroke-[2]" />
                      </div>
                      <h4 className="text-xs font-black text-[#2D123A] uppercase tracking-wider group-hover:text-[#4B1D6B] transition-colors">{feat.title}</h4>
                    </div>
                    <p className="text-[11px] text-slate-400 font-bold leading-relaxed pr-2">{feat.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

      </section>

      {/* ========================================================
          4. SERVICES / CAPABILITIES
          ======================================================== */}
      <section id="services" className="pt-16 pb-6 bg-[#FFFDFC] relative z-10">
        
        {/* Subtle dot-grid pattern overlaying background */}
        <div 
          className="absolute inset-0 pointer-events-none select-none opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(#8C1F3D 1.5px, transparent 1.5px)',
            backgroundSize: '32px 32px'
          }}
        />

        <div className="max-w-[1440px] w-[calc(100%-100px)] mx-auto px-12 space-y-8 relative z-10 text-left">
          
          {/* Header */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#8C1F3D]/10 border border-[#8C1F3D]/20 text-[#8C1F3D] text-[9px] font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>✦ AI Marketing Capabilities</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#2D123A] tracking-tight leading-[1.1]">
              Everything Your Marketing Needs.<br />
              <span className="text-[#D94A2A]">Working Together.</span>
            </h2>
            
            <p className="text-[#2D123A]/60 font-medium text-[15px] sm:text-[16px] leading-[1.6] max-w-2xl">
              From content and campaigns to audiences, analytics and leads—one connected system keeps your marketing moving.
            </p>
          </div>

          {/* Asymmetric Card Grid matching Image 1 exactly */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Card 1 - AI Content Studio (Large Card - 6 cols) */}
            <motion.div 
              initial={{ opacity: 0, x: -80, y: -40, rotate: -8 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: cubicEase }}
              whileHover={{ y: -6 }}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="md:col-span-6 bg-[#FFF0E4] border border-[#F2A65A]/15 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 min-h-[350px] relative overflow-hidden group cursor-pointer shadow-3xs"
            >
              <div className="space-y-1.5 max-w-[280px] text-left z-10">
                <h3 className="text-xl font-extrabold text-[#2D123A] whitespace-nowrap">AI Content Studio</h3>
                <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                  Generate social posts, captions, blogs and campaign content.
                </p>
                <div className="flex items-center gap-1.5 text-[#8C1F3D] text-[10px] font-black uppercase tracking-widest pt-2 group-hover:underline whitespace-nowrap">
                  <span>Explore Content</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              <div className="w-[380px] h-auto object-contain shrink-0 z-10">
                <img src="/cap-content-v5.png" alt="AI Content Studio illustration" className="w-full h-auto" />
              </div>
            </motion.div>

            {/* Card 2 - Smart Campaigns (Medium Card - 3 cols) */}
            <motion.div 
              initial={{ opacity: 0, x: 0, y: -90, rotate: 6 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.08, ease: cubicEase }}
              whileHover={{ y: -6 }}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="md:col-span-3 bg-[#FFF9F3] border border-[#F2A65A]/15 rounded-3xl p-8 flex flex-col justify-between min-h-[350px] relative overflow-hidden group cursor-pointer shadow-3xs"
            >
              <div className="space-y-1.5 text-left z-10">
                <h3 className="text-xl font-extrabold text-[#2D123A] whitespace-nowrap">Smart Campaigns</h3>
                <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                  Launch, manage and optimize campaigns automatically.
                </p>
              </div>
              <div className="w-full flex justify-center my-3 shrink-0 z-10">
                <img src="/cap-campaigns-v5.png" alt="Smart Campaigns illustration" className="w-[250px] h-auto object-contain" />
              </div>
              <div className="flex items-center gap-1.5 text-[#8C1F3D] text-[10px] font-black uppercase tracking-widest group-hover:underline z-10 whitespace-nowrap">
                <span>Manage Campaigns</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>

            {/* Card 3 - Audience Intelligence (Medium Card - 3 cols) */}
            <motion.div 
              initial={{ opacity: 0, x: 80, y: -40, rotate: 8 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.16, ease: cubicEase }}
              whileHover={{ y: -6 }}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="md:col-span-3 bg-[#2D123A] rounded-3xl p-8 flex flex-col justify-between min-h-[350px] relative overflow-hidden group cursor-pointer shadow-sm text-white"
            >
              <div className="space-y-1.5 text-left z-10">
                <h3 className="text-xl font-extrabold text-white whitespace-nowrap">Audience Intelligence</h3>
                <p className="text-[13px] text-slate-300/80 font-medium leading-relaxed">
                  Discover high-intent audiences and understand what matters most.
                </p>
              </div>
              <div className="w-full flex justify-center my-3 shrink-0 z-10">
                <img src="/cap-audiences-v5.png" alt="Audience Intelligence illustration" className="w-[260px] h-auto object-contain" />
              </div>
              <div className="flex items-center gap-1.5 text-[#F2A65A] text-[10px] font-black uppercase tracking-widest group-hover:underline z-10 whitespace-nowrap">
                <span>Explore Audiences</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>

            {/* Card 4 - Performance Analytics (Row 2 - 4 cols) */}
            <motion.div 
              initial={{ opacity: 0, x: -80, y: 60, rotate: -6 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.05, ease: cubicEase }}
              whileHover={{ y: -6 }}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="md:col-span-4 bg-white border border-[#F2A65A]/15 rounded-3xl pl-8 pr-4 py-8 min-h-[260px] flex flex-col justify-between relative overflow-hidden group cursor-pointer shadow-3xs"
            >
              <div className="space-y-1.5 text-left w-[52%] z-10">
                <h3 className="text-lg font-extrabold text-[#2D123A] whitespace-nowrap">Performance Analytics</h3>
                <p className="text-[12px] text-slate-500 font-medium leading-relaxed">
                  Understand what's working and where your growth is coming from.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[#8C1F3D] text-[10px] font-black uppercase tracking-widest group-hover:underline whitespace-nowrap z-10">
                <span>View Analytics</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[180px] h-auto pointer-events-none select-none z-0">
                <img src="/cap-analytics-v5.png" alt="Performance Analytics illustration" className="w-full h-auto" />
              </div>
            </motion.div>

            {/* Card 5 - Lead Generation (Row 2 - 4 cols) */}
            <motion.div 
              initial={{ opacity: 0, x: 0, y: 90, rotate: 4 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.12, ease: cubicEase }}
              whileHover={{ y: -6 }}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="md:col-span-4 bg-[#FFF0F2] border border-[#F2A65A]/15 rounded-3xl p-8 flex flex-col justify-between min-h-[260px] relative overflow-hidden group cursor-pointer shadow-3xs"
            >
              <div className="space-y-1.5 text-left z-10">
                <h3 className="text-lg font-extrabold text-[#2D123A] whitespace-nowrap">Lead Generation</h3>
                <p className="text-[12px] text-slate-500 font-medium leading-relaxed">
                  Turn engagement into qualified opportunities.
                </p>
              </div>
              <div className="w-full flex justify-center my-2 shrink-0 z-10">
                <img src="/cap-leads-v5.png" alt="Lead Generation illustration" className="w-[160px] h-auto object-contain" />
              </div>
              <div className="flex items-center gap-1.5 text-[#8C1F3D] text-[10px] font-black uppercase tracking-widest group-hover:underline whitespace-nowrap z-10">
                <span>Manage Leads</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>

            {/* Card 6 - Social Automation (Row 2 - 4 cols) */}
            <motion.div 
              initial={{ opacity: 0, x: 80, y: 60, rotate: 6 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.18, ease: cubicEase }}
              whileHover={{ y: -6 }}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="md:col-span-4 bg-[#FFF0E4] border border-[#F2A65A]/15 rounded-3xl pl-8 pr-4 py-8 min-h-[260px] flex flex-col justify-between relative overflow-hidden group cursor-pointer shadow-3xs"
            >
              <div className="space-y-1.5 text-left w-[50%] z-10">
                <h3 className="text-lg font-extrabold text-[#2D123A] whitespace-nowrap">Social Automation</h3>
                <p className="text-[12px] text-slate-500 font-medium leading-relaxed">
                  Automate posting, engagement and community interactions.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[#8C1F3D] text-[10px] font-black uppercase tracking-widest group-hover:underline whitespace-nowrap z-10">
                <span>Automate Now</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
              <div className="absolute -right-[4px] top-1/2 -translate-y-1/2 w-[220px] h-auto pointer-events-none select-none z-0">
                <img src="/cap-social-v7.png" alt="Social Automation illustration" className="w-full h-auto" />
              </div>
            </motion.div>

          </div>

          {/* Bottom Caption strip matching Image 1 exactly */}
          <div className="text-center pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs font-black text-[#2D123A]/80 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#D94A2A] animate-pulse" />
            <span>All capabilities work together in one intelligent system.</span>
          </div>

        </div>
      </section>

      {/* ========================================================
          5. PROCESS / HOW WE WORK (THE PATH TO AUTOMATION)
          ======================================================== */}
      <section 
        id="strategy" 
        className="py-20 md:py-24 bg-[#FFF8F0] relative overflow-hidden z-10 bg-cover bg-bottom"
        style={{ backgroundImage: "url('/automation-bg-v2.png')" }}
      >
        <div className="max-w-6xl mx-auto px-6 space-y-4 sm:space-y-5 relative z-10">
          
          {/* Header */}
          <div className="text-center space-y-2.5 max-w-xl mx-auto">
            <div className="inline-flex items-center px-4 py-1 rounded-full bg-[#FFF0E6] border border-[#F2A65A]/30 text-[#D94A2A] text-[10px] font-black uppercase tracking-widest shadow-2xs">
              EXECUTION STRATEGY
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1E122C] tracking-tight leading-tight">
              The Path to <span className="bg-gradient-to-r from-[#B81D46] via-[#E04838] to-[#F97316] bg-clip-text text-transparent">Automation</span>
            </h2>
            <p className="text-slate-600 font-medium text-xs sm:text-[13.5px] leading-relaxed max-w-lg mx-auto">
              Our 5-step process crawls site data, organizes calendars, launches ads, and maintains full client consent dashboards automatically.
            </p>
          </div>

          {/* Automation Process (Exact Custom Replicated UI) */}
          <AutomationProcess />

          {/* Frosted Glass Stats Card (Matching Reference Design) */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: cubicEase }}
            className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl shadow-[0_15px_45px_rgba(217,74,42,0.06)] p-6 sm:p-8 max-w-5xl mx-auto mt-2 sm:mt-4 relative z-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100/90">
              
              {/* Stat 1 - Completed Projects */}
              <div className="flex flex-col items-center text-center px-4 first:pt-0 sm:first:pt-0">
                <div className="w-10 h-10 rounded-xl bg-[#FFF0E6] text-[#D94A2A] flex items-center justify-center mb-3 shadow-2xs">
                  <Folder className="w-5 h-5 stroke-[2]" />
                </div>
                <div className="leading-none">
                  <AnimatedCounter value={250} suffix="+" className="text-3xl sm:text-[38px] font-bold text-[#D94A2A] tracking-tight" />
                </div>
                <h4 className="text-[10.5px] font-bold text-[#2D123A] uppercase tracking-wider mt-2.5">Completed Projects</h4>
                <p className="text-[11.5px] text-slate-500 font-normal mt-1 leading-snug whitespace-pre-line">Brand strategies executed&#10;successfully.</p>
              </div>

              {/* Stat 2 - Success Index */}
              <div className="flex flex-col items-center text-center px-4 pt-6 sm:pt-0">
                <div className="w-10 h-10 rounded-xl bg-[#FFE4E6] text-[#BE185D] flex items-center justify-center mb-3 shadow-2xs">
                  <TrendingUp className="w-5 h-5 stroke-[2]" />
                </div>
                <div className="leading-none">
                  <AnimatedCounter value={98} suffix="%" className="text-3xl sm:text-[38px] font-bold text-[#BE185D] tracking-tight" />
                </div>
                <h4 className="text-[10.5px] font-bold text-[#2D123A] uppercase tracking-wider mt-2.5">Success Index</h4>
                <p className="text-[11.5px] text-slate-500 font-normal mt-1 leading-snug whitespace-pre-line">Campaign targets achieved&#10;consistently.</p>
              </div>

              {/* Stat 3 - Agency Clients */}
              <div className="flex flex-col items-center text-center px-4 pt-6 sm:pt-0">
                <div className="w-10 h-10 rounded-xl bg-[#F3E8FF] text-[#4B1D6B] flex items-center justify-center mb-3 shadow-2xs">
                  <Users className="w-5 h-5 stroke-[2]" />
                </div>
                <div className="leading-none">
                  <AnimatedCounter value={120} suffix="+" className="text-3xl sm:text-[38px] font-bold text-[#4B1D6B] tracking-tight" />
                </div>
                <h4 className="text-[10.5px] font-bold text-[#2D123A] uppercase tracking-wider mt-2.5">Agency Clients</h4>
                <p className="text-[11.5px] text-slate-500 font-normal mt-1 leading-snug whitespace-pre-line">Retained marketing buyers&#10;worldwide.</p>
              </div>

              {/* Stat 4 - Global Markets */}
              <div className="flex flex-col items-center text-center px-4 pt-6 sm:pt-0">
                <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center mb-3 shadow-2xs">
                  <Globe className="w-5 h-5 stroke-[2]" />
                </div>
                <div className="leading-none">
                  <AnimatedCounter value={15} suffix="+" className="text-3xl sm:text-[38px] font-bold text-[#EA580C] tracking-tight" />
                </div>
                <h4 className="text-[10.5px] font-bold text-[#2D123A] uppercase tracking-wider mt-2.5">Global Markets</h4>
                <p className="text-[11.5px] text-slate-500 font-normal mt-1 leading-snug whitespace-pre-line">Active campaigns running&#10;across regions.</p>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* ========================================================
          7. AI AUTONOMY CONTROL (EXACT REPLICATED UI)
          ======================================================== */}
      <AutonomyControl />

      {/* ========================================================
          8. AUDIT SCOPES WE EXCEL IN (EXACT REPLICATED UI)
          ======================================================== */}
      <AuditScopes />

      {/* ========================================================
          9. CO-PILOT FEATURES SNAPSHOT (BLOOM REVEAL & AMBIENT MOTION)
          ======================================================== */}
      <CoPilotFeatures />

      {/* ========================================================
          10. INTERACTIVE TESTIMONIALS
          ======================================================== */}
     

      {/* ========================================================
          11. BLOG / INSIGHTS & INSPIRATION EDITORIAL SECTION
          ======================================================== */}
      <LandingInsights />

      {/* ========================================================
          12. FINAL CTA SECTION (WE TURN MARKETING INTO MEASURABLE BRAND GROWTH)
          ======================================================== */}
      <LandingFinalCTA />

      {/* ========================================================
          13. FOOTER
          ======================================================== */}
      <LandingFooter />

    </div>
  );
};
export default Landing;
