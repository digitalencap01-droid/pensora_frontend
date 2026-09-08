import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  Users,
  Star,
  Sparkles,
  TrendingUp,
  Target,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const growthPillars = [
  {
    id: 'presence',
    title: 'Stronger Brand Presence',
    icon: TrendingUp,
    iconColor: 'text-[#8C1F3D]',
    iconBg: 'bg-[#8C1F3D]/10',
    delay: 0.1,
    offsetClass: 'ml-auto mr-12 sm:mr-24 lg:mr-32'
  },
  {
    id: 'audience',
    title: 'Engaged Right Audience',
    icon: Users,
    iconColor: 'text-[#4B1D6B]',
    iconBg: 'bg-[#4B1D6B]/10',
    delay: 0.2,
    offsetClass: 'ml-auto mr-24 sm:mr-40 lg:mr-52'
  },
  {
    id: 'performance',
    title: 'Optimized Performance',
    icon: Target,
    iconColor: 'text-[#D94A2A]',
    iconBg: 'bg-[#D94A2A]/10',
    delay: 0.3,
    offsetClass: 'ml-auto mr-36 sm:mr-56 lg:mr-72'
  },
  {
    id: 'growth',
    title: 'Consistent Growth',
    icon: BarChart3,
    iconColor: 'text-[#8C1F3D]',
    iconBg: 'bg-[#8C1F3D]/10',
    delay: 0.4,
    offsetClass: 'ml-auto mr-48 sm:mr-72 lg:mr-[360px]'
  }
];

export const LandingFinalCTA: React.FC = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="py-16 sm:py-20 lg:py-24 min-h-[540px] sm:min-h-[600px] lg:min-h-[660px] flex items-center bg-[#FEF9F5] border-t border-[#F3DEC8]/70 relative overflow-hidden z-10 select-none"
    >
      {/* ========================================================
          BACKGROUND GRAPHIC (FULL 2:1 RATIO - COMPLETE ARROW & TARGET)
          ======================================================== */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
        <img
          src="/supercharge-cta-bg.png"
          alt="Marketing Growth Arrow"
          className="w-full h-full object-cover object-center pointer-events-none"
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* ========================================================
              LEFT COLUMN: HERO HEADLINE, SUBTITLE, CTAS & TRUST BADGES
              ======================================================== */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-4 sm:space-y-5 text-left"
          >
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#D94A2A]/30 bg-[#D94A2A]/8 text-[#D94A2A] text-[9.5px] font-black uppercase tracking-[0.18em] shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#D94A2A]" />
              <span>AI-POWERED DIGITAL MARKETING</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1.5">
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1E122C] tracking-tight leading-[1.12]">
                We Turn Marketing <br />
                Into Measurable <br />
                <span className="font-serif italic font-normal text-[#8C1F3D]">
                  Brand Growth.
                </span>
              </h2>

              {/* Decorative Accent Dash */}
              <div className="flex items-center gap-1.5 pt-1">
                <div className="w-8 h-1 rounded-full bg-[#D94A2A]" />
                <div className="w-3 h-1 rounded-full bg-[#8C1F3D]" />
                <div className="w-1.5 h-1 rounded-full bg-[#F2A65A]" />
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-xs sm:text-[13px] text-[#554E60] font-medium leading-relaxed max-w-md">
              Data, creativity, and AI working together to build your brand, attract the right audience, and drive real business results.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              {/* Primary CTA */}
              <button
                onClick={() => navigate('/signup')}
                className="px-6 sm:px-7 py-3 sm:py-3.5 bg-gradient-to-r from-[#D94A2A] via-[#C93B1E] to-[#B32D14] hover:from-[#B32D14] hover:to-[#8C1F3D] text-white text-[11px] sm:text-xs font-black uppercase tracking-wider rounded-xl shadow-[0_8px_20px_rgba(217,74,42,0.32)] flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 border-0 cursor-pointer"
              >
                <span>GET STARTED NOW</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={() => navigate('/signup')}
                className="px-5 sm:px-6 py-3 sm:py-3.5 bg-white/80 hover:bg-white text-[#1E122C] border border-[#8C1F3D]/25 hover:border-[#8C1F3D]/40 text-[11px] sm:text-xs font-black uppercase tracking-wider rounded-xl shadow-[0_4px_12px_rgba(75,29,107,0.04)] flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>TALK TO EXPERT</span>
                <MessageSquare className="w-3.5 h-3.5 text-[#8C1F3D] stroke-[2.2]" />
              </button>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-2 sm:pt-3">
              <div className="inline-flex flex-wrap items-center gap-3 sm:gap-5 bg-white/85 backdrop-blur-md border border-[#F3DEC8] rounded-2xl px-4 py-2.5 shadow-[0_4px_14px_rgba(75,29,107,0.04)]">
                {/* Badge 1 */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#D94A2A]/12 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D94A2A] stroke-[2.2]" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-black text-[#1E122C] leading-tight">
                    Enterprise Grade <br />
                    <span className="text-slate-500 font-semibold">Security</span>
                  </span>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px h-5 bg-[#F3DEC8]" />

                {/* Badge 2 */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#4B1D6B]/12 flex items-center justify-center shrink-0">
                    <Users className="w-3.5 h-3.5 text-[#4B1D6B] stroke-[2.2]" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-black text-[#1E122C] leading-tight">
                    Trusted by <br />
                    <span className="text-slate-500 font-semibold">120+ Brands</span>
                  </span>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px h-5 bg-[#F3DEC8]" />

                {/* Badge 3 */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#8C1F3D]/12 flex items-center justify-center shrink-0">
                    <Star className="w-3.5 h-3.5 text-[#8C1F3D] fill-[#8C1F3D]/20 stroke-[2.2]" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-black text-[#1E122C] leading-tight">
                    Proven Results <br />
                    <span className="text-slate-500 font-semibold">That Drive ROI</span>
                  </span>
                </div>
              </div>
            </div>

          </motion.div>

          {/* ========================================================
              RIGHT COLUMN: FLOATING GROWTH PILLAR NODES ALONG CURVE
              ======================================================== */}
          <div className="lg:col-span-6 relative flex flex-col justify-center gap-3.5 sm:gap-5 py-4 lg:py-0">
            {growthPillars.map((pillar) => {
              const PillarIcon = pillar.icon;

              return (
                <motion.div
                  key={pillar.id}
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: pillar.delay, ease: [0.10, 1, 0.3, 1] }}
                  className={`flex items-center ${pillar.offsetClass}`}
                >
                  <motion.div
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="bg-white/95 backdrop-blur-md border border-[#F3DEC8] rounded-2xl py-2 px-3.5 sm:px-4 shadow-[0_8px_20px_rgba(75,29,107,0.06)] flex items-center gap-2.5 transition-all duration-300 hover:border-[#D94A2A]/40 hover:shadow-[0_12px_28px_rgba(75,29,107,0.1)] cursor-pointer"
                  >
                    {/* Circle Icon */}
                    <div
                      className={`w-6.5 h-6.5 sm:w-7.5 sm:h-7.5 rounded-full ${pillar.iconBg} ${pillar.iconColor} flex items-center justify-center shrink-0 shadow-2xs border border-[#F3DEC8]/60`}
                    >
                      <PillarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.3]" />
                    </div>

                    {/* Title */}
                    <span className="text-[11px] sm:text-xs font-black text-[#1E122C] tracking-tight leading-snug whitespace-nowrap">
                      {pillar.title}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default LandingFinalCTA;
