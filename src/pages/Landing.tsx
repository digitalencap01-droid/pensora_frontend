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
import LandingNavbar from '../components/landing/LandingNavbar';
import LandingHero from '../components/landing/LandingHero';

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
      quote: "GrowWise AI replaced our fragmented dashboards with a unified visual co-pilot. In three months, our organic campaigns generated 42% more leads while cutting ad spends.",
      author: "Priya Sharma",
      role: "Creative Director, Bloom Boutique",
      avatar: "PS",
      color: "#4B1D6B"
    },
    {
      quote: "The scroll animation visual tools and auto-marketing suggestions allowed our local shop to compete globally. GrowWise AI is not just a platform; it is our marketing partner.",
      author: "Vikram Malhotra",
      role: "Founder, Greenhouse Coffee",
      avatar: "VM",
      color: "#8C1F3D"
    },
    {
      quote: "We loved the multi-workspace management. We audit multiple client sites, draft social media tags, and review lead score values, all within a beautiful dark theme settings panel.",
      author: "Sarah Jenkins",
      role: "Digital Specialist, GrowWise Retail",
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
    <div className="min-h-screen bg-[#FFFDFC] text-[#181516] selection:bg-[#7042D9] selection:text-white antialiased overflow-x-hidden relative">
      
      {/* Smooth scroll engine */}
      <SmoothScroll />

      {/* Desktop Custom Cursor */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-[#7042D9] pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: cursorVariant === 'hover' ? 2 : cursorVariant === 'arrow' ? 1.5 : 1,
          backgroundColor: cursorVariant === 'hover' ? '#7042D9' : 'transparent',
          borderColor: cursorVariant === 'hover' ? 'transparent' : '#7042D9'
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 350, mass: 0.4 }}
      />

      {/* Thin scroll progress indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3D126F] via-[#7042D9] to-[#FF762D] z-50 origin-left"
        style={{ scaleX: useScroll().scrollYProgress }}
      />

      {/* ========================================================
          1. NAVIGATION
          ======================================================== */}
      <LandingNavbar />

      {/* ========================================================
          2. HERO SECTION
          ======================================================== */}
      <LandingHero />

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
