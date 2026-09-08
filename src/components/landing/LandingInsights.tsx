import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Zap,
  BarChart3,
  Lightbulb
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ArticleItem {
  id: string;
  category: string;
  date: string;
  title: string;
  desc: string;
  isDark?: boolean;
  illusSrc: string;
  illusAlt: string;
  btnStyle: 'orange-fill' | 'orange-outline';
}

const articles: ArticleItem[] = [
  {
    id: 'funnels',
    category: 'E-COMMERCE',
    date: 'AUG 30',
    title: 'Designing High-Converting Product Funnels',
    desc: 'Locate shop navigation leaks, track cart checkout spillage, and optimize conversion metrics.',
    isDark: true,
    illusSrc: '/blog-illus-funnel.png',
    illusAlt: '3D Conversion Funnel Illustration',
    btnStyle: 'orange-fill'
  },
  {
    id: 'copilots',
    category: 'PRODUCTIVITY',
    date: 'AUG 24',
    title: 'The Growth Power of Marketing Co-Pilots',
    desc: 'Merging web analysis data presets, copy drafts, and autonomous advertising budget shifts.',
    isDark: false,
    illusSrc: '/blog-illus-chart.png',
    illusAlt: '3D Growth Power Analytics Chart',
    btnStyle: 'orange-outline'
  },
  {
    id: 'leadscores',
    category: 'ANALYTICS',
    date: 'AUG 18',
    title: 'Examine Database Lead Scores Correctly',
    desc: 'Determine hot vs cold lead score parameters, and schedule targeted newsletter campaigns.',
    isDark: false,
    illusSrc: '/blog-illus-magnifier.png',
    illusAlt: '3D Database Lead Score Inspection',
    btnStyle: 'orange-fill'
  }
];

const featureHighlights = [
  {
    icon: BookOpen,
    iconColor: 'text-[#8C1F3D]',
    title: 'Expert Insights',
    desc: 'Learn from industry professionals.'
  },
  {
    icon: Zap,
    iconColor: 'text-[#D94A2A]',
    title: 'Actionable Tips',
    desc: 'Practical strategies you can apply today.'
  },
  {
    icon: BarChart3,
    iconColor: 'text-[#4B1D6B]',
    title: 'Data-Backed',
    desc: 'Insights backed by research & real data.'
  },
  {
    icon: Lightbulb,
    iconColor: 'text-[#D94A2A]',
    title: 'Stay Ahead',
    desc: 'Fresh perspectives to keep you ahead of the curve.'
  }
];

export const LandingInsights: React.FC = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="insights"
      className="py-16 sm:py-20 lg:py-24 bg-[#FEF9F5] border-t border-[#F3DEC8]/70 relative overflow-hidden select-none"
    >
      {/* ========================================================
          AMBIENT DECORATIVE GRAPHICS (DOT GRID & AMBIENT SPHERES)
          ======================================================== */}
      {/* Top Right Dot Grid Matrix */}
      <div className="absolute top-12 right-8 sm:right-16 pointer-events-none select-none opacity-45 hidden md:block">
        <div className="grid grid-cols-6 gap-2.5">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#D94A2A]" />
          ))}
        </div>
      </div>

      {/* Left Ambient Concentric Halo */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full border border-[#D94A2A]/15 pointer-events-none select-none opacity-40 hidden lg:block" />
      <div className="absolute top-1/4 -left-10 w-52 h-52 rounded-full border border-[#D94A2A]/20 pointer-events-none select-none opacity-50 hidden lg:block" />
      <div className="absolute top-[32%] left-10 w-3.5 h-3.5 rounded-full bg-[#D94A2A] shadow-[0_4px_10px_rgba(217,74,42,0.4)] pointer-events-none select-none hidden lg:block" />

      {/* Right Ambient Floating Sphere */}
      <div className="absolute top-[28%] right-10 w-3 h-3 rounded-full bg-[#4B1D6B] shadow-[0_4px_8px_rgba(75,29,107,0.3)] pointer-events-none select-none hidden lg:block" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* ========================================================
            1. SECTION HEADER (TITLE, SUBTITLE & ACTION BUTTON)
            ======================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 sm:pb-12 text-left">
          
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#F3DEC8] bg-[#FFF5EE] text-[#D94A2A] text-[10.5px] font-black uppercase tracking-[0.16em] shadow-2xs">
              INSIGHTS & BLOGS
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight leading-[1.12]">
              <span className="text-[#1E122C]">Ideas, Insights &</span> <br />
              <span className="text-[#D94A2A]">Inspiration</span>
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-[#6B5E77] font-medium leading-relaxed max-w-lg">
              Actionable perspectives to help you grow smarter, market better, and stay ahead.
            </p>
          </motion.div>

          {/* Right Action Button: VIEW ALL ARTICLES */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0"
          >
            <button
              onClick={() => navigate('/signup')}
              className="px-5 py-2.5 bg-white/95 hover:bg-white border border-[#F3DEC8] shadow-[0_4px_16px_rgba(75,29,107,0.05)] rounded-full flex items-center gap-3 text-xs font-black uppercase tracking-wider text-[#1E122C] hover:border-[#D94A2A]/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer"
            >
              <span>VIEW ALL ARTICLES</span>
              <div className="w-7 h-7 rounded-full bg-[#D94A2A] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </button>
          </motion.div>

        </div>

        {/* ========================================================
            2. 3 FEATURED BLOG CARDS GRID
            ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => navigate('/signup')}
              className={`rounded-[32px] sm:rounded-[36px] p-7 sm:p-8 flex flex-col justify-between min-h-[440px] relative overflow-hidden text-left group cursor-pointer transition-all duration-300 hover:-translate-y-1.5 ${
                article.isDark
                  ? 'bg-gradient-to-b from-[#3E044F] via-[#2A0538] to-[#1A0224] border border-[#520967] shadow-[0_18px_45px_rgba(45,11,63,0.22)]'
                  : 'bg-white/95 backdrop-blur-md border border-[#F3DEC8] shadow-[0_12px_36px_rgba(75,29,107,0.04)] hover:border-[#D94A2A]/40 hover:shadow-[0_18px_40px_rgba(75,29,107,0.08)]'
              }`}
            >
              {/* Upper Details Block */}
              <div className="space-y-3 relative z-10">
                {/* Header Row: Category Pill & Date */}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-[9.5px] font-black uppercase tracking-wider ${
                      article.isDark
                        ? 'border border-white/20 bg-white/10 text-white shadow-2xs'
                        : 'border border-[#D94A2A]/25 bg-[#D94A2A]/8 text-[#D94A2A]'
                    }`}
                  >
                    {article.category}
                  </span>

                  <span
                    className={`text-[10.5px] font-black uppercase tracking-wider ${
                      article.isDark ? 'text-white/70' : 'text-[#6B5E77]'
                    }`}
                  >
                    {article.date}
                  </span>
                </div>

                {/* Article Title */}
                <h3
                  className={`text-xl sm:text-[22px] font-bold leading-snug pt-2 ${
                    article.isDark
                      ? 'text-white group-hover:text-[#F2A65A] transition-colors'
                      : 'text-[#1E122C] group-hover:text-[#D94A2A] transition-colors'
                  }`}
                >
                  {article.title}
                </h3>

                {/* Orange Underline Accent Bar */}
                <div className="w-8 h-0.5 bg-[#D94A2A] rounded-full mt-1 mb-2" />

                {/* Article Description */}
                <p
                  className={`text-xs sm:text-[12.5px] font-medium leading-relaxed max-w-[250px] ${
                    article.isDark ? 'text-white/75' : 'text-[#6B5E77]'
                  }`}
                >
                  {article.desc}
                </p>
              </div>

              {/* Bottom Action Row */}
              <div className="flex items-center justify-between pt-6 relative z-10">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-black uppercase tracking-wider transition-colors ${
                      article.isDark
                        ? 'text-white group-hover:text-[#F2A65A]'
                        : 'text-[#1E122C] group-hover:text-[#D94A2A]'
                    }`}
                  >
                    READ ARTICLE
                  </span>

                  {article.btnStyle === 'orange-fill' ? (
                    <div className="w-6 h-6 rounded-full bg-[#D94A2A] text-white flex items-center justify-center shadow-2xs group-hover:scale-110 group-hover:translate-x-0.5 transition-all">
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#FFF0EB] text-[#D94A2A] border border-[#D94A2A]/25 flex items-center justify-center group-hover:bg-[#D94A2A] group-hover:text-white group-hover:scale-110 group-hover:translate-x-0.5 transition-all">
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  )}
                </div>
              </div>

              {/* 3D Decorative Illustration (Embedded at Bottom Right) */}
              <div
                className={`absolute bottom-0 right-0 pointer-events-none select-none z-0 ${
                  article.id === 'funnels'
                    ? 'w-[200px] sm:w-[225px] -bottom-1 -right-1'
                    : article.id === 'copilots'
                    ? 'w-[190px] sm:w-[215px] -bottom-1 -right-1'
                    : 'w-[195px] sm:w-[220px] -bottom-1 -right-1'
                }`}
              >
                <img
                  src={article.illusSrc}
                  alt={article.illusAlt}
                  className="w-full h-auto object-contain object-right-bottom block drop-shadow-xl group-hover:scale-105 group-hover:-translate-y-1 transition-transform duration-500 ease-out"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* ========================================================
            3. BOTTOM 4-FEATURE HIGHLIGHTS BAR (ROUNDED CAPSULE)
            ======================================================== */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/90 backdrop-blur-md border border-[#F3DEC8] rounded-[28px] sm:rounded-[34px] p-6 sm:p-7 shadow-[0_10px_30px_rgba(75,29,107,0.03)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-10 sm:mt-12 text-left"
        >
          {featureHighlights.map((feat, i) => {
            const IconComponent = feat.icon;

            return (
              <div key={i} className="flex items-center gap-3.5">
                {/* Circular Icon Capsule */}
                <div className="w-11 h-11 rounded-full bg-[#FFF0EB] border border-[#F3DEC8] flex items-center justify-center shrink-0 shadow-2xs">
                  <IconComponent className={`w-5 h-5 ${feat.iconColor} stroke-[2.2]`} />
                </div>

                {/* Text Block */}
                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-[13px] font-black text-[#1E122C] tracking-tight">
                    {feat.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#6B5E77] font-medium leading-snug">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default LandingInsights;
