import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Search,
  UserCheck,
  TrendingUp,
  GitFork,
  Layers,
  Tags,
  FileSpreadsheet,
  MessageSquareQuote,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface FeatureItem {
  id: string;
  number: string;
  title: string;
  tag: string;
  desc: string;
  icon: React.ElementType;
  primaryColor: string;
  glowColor: string;
  bgGradient: string;
  badgeBg: string;
  badgeText: string;
  ringColor: string;
  orbitDuration: number;
  floatDuration: number;
}

const featuresData: FeatureItem[] = [
  {
    id: 'audit',
    number: '01',
    title: 'Auto Website Audit',
    tag: '⚡ Instant 360° Audit',
    desc: 'Scans site speed, technical SEO, copy tone, and conversion bottlenecks in under 30 seconds.',
    icon: Search,
    primaryColor: '#4B1D6B',
    glowColor: 'rgba(75, 29, 107, 0.4)',
    bgGradient: 'from-[#6B2494] via-[#4B1D6B] to-[#300E48]',
    badgeBg: 'bg-[#4B1D6B]/12',
    badgeText: 'text-[#4B1D6B]',
    ringColor: 'border-[#4B1D6B]/40',
    orbitDuration: 22,
    floatDuration: 4.6
  },
  {
    id: 'persona',
    number: '02',
    title: 'AI Brand Persona Summary',
    tag: '🎯 ICP Synthesis',
    desc: 'Synthesizes ideal customer profiles, pain points, and high-converting messaging angles.',
    icon: UserCheck,
    primaryColor: '#8C1F3D',
    glowColor: 'rgba(140, 31, 61, 0.4)',
    bgGradient: 'from-[#B82260] via-[#8C1F3D] to-[#600F26]',
    badgeBg: 'bg-[#8C1F3D]/12',
    badgeText: 'text-[#8C1F3D]',
    ringColor: 'border-[#8C1F3D]/40',
    orbitDuration: 25,
    floatDuration: 5.1
  },
  {
    id: 'lead-scoring',
    number: '03',
    title: 'Lead Scoring Analytics',
    tag: '📈 Predictive Intent',
    desc: 'Scores and ranks leads in real-time based on high-intent engagement signals and behavior.',
    icon: TrendingUp,
    primaryColor: '#D94A2A',
    glowColor: 'rgba(217, 74, 42, 0.4)',
    bgGradient: 'from-[#EA580C] via-[#D94A2A] to-[#A83218]',
    badgeBg: 'bg-[#D94A2A]/12',
    badgeText: 'text-[#D94A2A]',
    ringColor: 'border-[#D94A2A]/40',
    orbitDuration: 20,
    floatDuration: 4.4
  },
  {
    id: 'channels',
    number: '04',
    title: 'Preferred Channels Router',
    tag: '🔀 Smart Router',
    desc: 'Dynamically routes campaign creatives to your highest-performing acquisition channels.',
    icon: GitFork,
    primaryColor: '#8C1F3D',
    glowColor: 'rgba(140, 31, 61, 0.4)',
    bgGradient: 'from-[#B01E4E] via-[#8C1F3D] to-[#5C0D26]',
    badgeBg: 'bg-[#8C1F3D]/12',
    badgeText: 'text-[#8C1F3D]',
    ringColor: 'border-[#8C1F3D]/40',
    orbitDuration: 24,
    floatDuration: 4.9
  },
  {
    id: 'workspace',
    number: '05',
    title: 'Workspace Switcher Widget',
    tag: '🏢 Multi-Brand Hub',
    desc: 'Instantly switch between brands, client accounts, and sub-workspaces in one single click.',
    icon: Layers,
    primaryColor: '#4B1D6B',
    glowColor: 'rgba(75, 29, 107, 0.4)',
    bgGradient: 'from-[#65208B] via-[#4B1D6B] to-[#2E0B44]',
    badgeBg: 'bg-[#4B1D6B]/12',
    badgeText: 'text-[#4B1D6B]',
    ringColor: 'border-[#4B1D6B]/40',
    orbitDuration: 21,
    floatDuration: 5.3
  },
  {
    id: 'tags',
    number: '06',
    title: 'Bulk Tags Action Panel',
    tag: '🏷️ Batch Operations',
    desc: 'Mass-tag, segment, and organize customer lists and marketing assets effortlessly.',
    icon: Tags,
    primaryColor: '#D94A2A',
    glowColor: 'rgba(217, 74, 42, 0.4)',
    bgGradient: 'from-[#E05A2B] via-[#D94A2A] to-[#9C2E12]',
    badgeBg: 'bg-[#D94A2A]/12',
    badgeText: 'text-[#D94A2A]',
    ringColor: 'border-[#D94A2A]/40',
    orbitDuration: 26,
    floatDuration: 4.7
  },
  {
    id: 'csv',
    number: '07',
    title: 'CSV Exporter Utility',
    tag: '📊 1-Click Export',
    desc: 'Download clean, structured customer data and campaign analytics straight into CSV/Excel.',
    icon: FileSpreadsheet,
    primaryColor: '#8C1F3D',
    glowColor: 'rgba(140, 31, 61, 0.4)',
    bgGradient: 'from-[#A81D45] via-[#8C1F3D] to-[#5A0C22]',
    badgeBg: 'bg-[#8C1F3D]/12',
    badgeText: 'text-[#8C1F3D]',
    ringColor: 'border-[#8C1F3D]/40',
    orbitDuration: 23,
    floatDuration: 5.0
  },
  {
    id: 'consent',
    number: '08',
    title: 'Messaging Consent Tracker',
    tag: '🔒 TCPA & GDPR Ready',
    desc: 'Tracks communication consent and opt-in preferences automatically across SMS and Email.',
    icon: MessageSquareQuote,
    primaryColor: '#4B1D6B',
    glowColor: 'rgba(75, 29, 107, 0.4)',
    bgGradient: 'from-[#601D7F] via-[#4B1D6B] to-[#2B0A3E]',
    badgeBg: 'bg-[#4B1D6B]/12',
    badgeText: 'text-[#4B1D6B]',
    ringColor: 'border-[#4B1D6B]/40',
    orbitDuration: 19,
    floatDuration: 4.5
  }
];

export const CoPilotFeatures: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Master container staggered orchestration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.08
      }
    }
  };

  // Main feature item bloom variants
  const itemVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 1, scale: 1, y: 0 }
      : {
          opacity: 0,
          scale: 0.25,
          y: 30,
          filter: 'blur(10px)'
        },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1]
          }
    }
  };

  // Outer decorative orbit ring animation
  const ringVariants = {
    hidden: shouldReduceMotion
      ? { scale: 1, opacity: 1, rotate: 0 }
      : { scale: 0.65, opacity: 0, rotate: -30 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1]
          }
    }
  };

  // Inner icon reveal animation (delayed 100-150ms after the circle blooms)
  const iconVariants = {
    hidden: shouldReduceMotion
      ? { scale: 1, opacity: 1 }
      : { scale: 0.45, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            duration: 0.5,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1]
          }
    }
  };

  // Label card fade-in upward animation
  const labelVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            duration: 0.55,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1]
          }
    }
  };

  return (
    <section className="py-10 sm:py-14 bg-[#FEF9F5] border-y border-[#F3DEC8]/70 overflow-visible relative z-10 select-none">
      
      {/* ========================================================
          DECORATIVE AMBIENT BACKDROP (CLEAN CSS BRAND PALETTE)
          ======================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Radial Ambient Glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#F2A65A]/15 blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-[450px] h-[450px] rounded-full bg-[#8C1F3D]/10 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 w-[500px] h-[500px] rounded-full bg-[#4B1D6B]/08 blur-3xl" />

        {/* Ambient Drifting 3D Spheres */}
        {!shouldReduceMotion && (
          <>
            {/* Top-left Warm Orange Orb */}
            <motion.div
              animate={{ y: [0, -10, 0], x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
              className="absolute top-8 left-8 sm:left-16 w-5 h-5 rounded-full bg-gradient-to-tr from-[#D94A2A] to-[#F2A65A] shadow-[0_4px_12px_rgba(217,74,42,0.35)] opacity-80"
            />
            {/* Mid-left Deep Purple Orb */}
            <motion.div
              animate={{ y: [0, 12, 0], x: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 8.5, ease: "easeInOut", delay: 1 }}
              className="absolute top-1/2 left-6 sm:left-12 w-6.5 h-6.5 rounded-full bg-gradient-to-tr from-[#4B1D6B] to-[#8C1F3D] shadow-[0_4px_14px_rgba(75,29,107,0.4)] opacity-85"
            />
            {/* Top-right Warm Peach Orb */}
            <motion.div
              animate={{ y: [0, -8, 0], x: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-10 right-8 sm:right-20 w-4.5 h-4.5 rounded-full bg-gradient-to-tr from-[#F2A65A] to-[#D94A2A] shadow-[0_4px_10px_rgba(242,166,90,0.4)] opacity-80"
            />
            {/* Mid-right Deep Purple Orb */}
            <motion.div
              animate={{ y: [0, 10, 0], x: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 1.5 }}
              className="absolute top-2/3 right-6 sm:right-14 w-6 h-6 rounded-full bg-gradient-to-tr from-[#4B1D6B] to-[#2D0B42] shadow-[0_4px_14px_rgba(75,29,107,0.35)] opacity-85"
            />
          </>
        )}

        {/* Subtle Dot Matrix Accents */}
        <div className="absolute right-4 top-1/3 w-32 h-32 opacity-25 bg-[radial-gradient(#D94A2A_1.5px,transparent_1.5px)] [background-size:12px_12px]" />
        <div className="absolute left-6 top-8 w-24 h-24 opacity-20 bg-[radial-gradient(#8C1F3D_1.5px,transparent_1.5px)] [background-size:12px_12px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 relative z-10 overflow-visible">
        
        {/* ========================================================
            HEADER: BADGE, HEADLINE & EDITORIAL SUBTITLE
            ======================================================== */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-3 max-w-2xl mx-auto"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D94A2A]/10 border border-[#D94A2A]/25 text-[#D94A2A] text-[9.5px] font-black uppercase tracking-[0.16em] shadow-2xs">
            <Sparkles className="w-3 h-3 text-[#D94A2A]" />
            <span>POWERFUL TOOLS • SMART AUTOMATION</span>
          </div>

          {/* Section Headline */}
          <h2 className="text-3xl sm:text-5xl font-black text-[#1E122C] tracking-tight leading-tight">
            Co-Pilot <span className="font-serif italic font-normal bg-gradient-to-r from-[#D94A2A] via-[#8C1F3D] to-[#4B1D6B] bg-clip-text text-transparent">Features</span> Snapshot
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm font-semibold text-[#6B5E77] max-w-lg mx-auto">
            Everything your marketing team needs, working together seamlessly.
          </p>

          {/* Tiny Decorative Star Indicator */}
          <div className="pt-1 flex items-center justify-center">
            <span className="text-xs text-[#D94A2A] opacity-70">✦</span>
          </div>
        </motion.div>

        {/* ========================================================
            8 INDEPENDENT FEATURE CIRCLES (BLOOM INTO VIEW)
            Clean negative space, NO connecting lines
            ======================================================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 sm:gap-y-16 gap-x-6 sm:gap-x-8 max-w-6xl mx-auto overflow-visible"
        >
          {featuresData.map((feature) => {
            const Icon = feature.icon;
            const isHovered = activeTooltip === feature.id;

            return (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                onMouseEnter={() => setActiveTooltip(feature.id)}
                onMouseLeave={() => setActiveTooltip(null)}
                style={{ zIndex: isHovered ? 999 : 1 }}
                className="flex flex-col items-center group cursor-pointer relative"
              >
                {/* ----------------------------------------------------
                    AMBIENT VERTICAL FLOATING CONTAINER (IDLE MOTION)
                    ---------------------------------------------------- */}
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: [0, -5, 0]
                        }
                  }
                  transition={{
                    repeat: Infinity,
                    duration: feature.floatDuration,
                    ease: "easeInOut"
                  }}
                  style={{ zIndex: isHovered ? 999 : 1 }}
                  className="relative flex flex-col items-center"
                >
                  
                  {/* Circular Interactive Node */}
                  <motion.div
                    whileHover={
                      shouldReduceMotion
                        ? {}
                        : {
                            scale: 1.06,
                            transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                          }
                    }
                    className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center"
                  >
                    
                    {/* 1. Subtle Luminous Warm Glow Behind Circle */}
                    <motion.div
                      animate={
                        shouldReduceMotion
                          ? {}
                          : {
                              scale: [0.95, 1.08, 0.95],
                              opacity: [0.55, 0.8, 0.55]
                            }
                      }
                      transition={{
                        repeat: Infinity,
                        duration: 5,
                        ease: "easeInOut"
                      }}
                      style={{
                        backgroundColor: feature.primaryColor,
                        boxShadow: `0 0 35px 12px ${feature.glowColor}`
                      }}
                      className="absolute inset-2 rounded-full blur-xl opacity-70 pointer-events-none transition-all duration-300 group-hover:opacity-95 group-hover:scale-115"
                    />

                    {/* 2. Independent Orbit / Decorative Ring with Subtle Continuous Rotation */}
                    <motion.div
                      variants={ringVariants}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <motion.div
                        animate={
                          shouldReduceMotion
                            ? {}
                            : {
                                rotate: 360
                              }
                        }
                        transition={{
                          repeat: Infinity,
                          duration: feature.orbitDuration,
                          ease: "linear"
                        }}
                        className={`w-full h-full rounded-full border border-dashed ${feature.ringColor} relative transition-transform duration-300 group-hover:scale-108`}
                      >
                        {/* Decorative Accent Orbit Dot 1 */}
                        <div
                          className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full shadow-xs"
                          style={{ backgroundColor: feature.primaryColor }}
                        />
                        {/* Decorative Accent Orbit Dot 2 */}
                        <div
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white border border-[#F3DEC8]"
                        />
                      </motion.div>
                    </motion.div>

                    {/* 3. Main 3D Spherical Feature Circle (Rich, Balanced Tone) */}
                    <div
                      className={`relative w-20 h-20 sm:w-23 sm:h-23 rounded-full bg-gradient-to-tr ${feature.bgGradient} p-0.5 shadow-[0_12px_28px_rgba(75,29,107,0.22)] flex items-center justify-center border border-white/40 backdrop-blur-xs transition-transform duration-300 group-hover:shadow-[0_16px_34px_rgba(75,29,107,0.28)]`}
                    >
                      {/* Subtle Glass Reflection & Centered Icon */}
                      <div className="w-full h-full rounded-full bg-gradient-to-b from-white/18 via-transparent to-black/15 flex items-center justify-center relative overflow-hidden">
                        
                        {/* Soft Top Gloss Curve */}
                        <div className="absolute top-1 inset-x-3 h-4 rounded-full bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />

                        {/* 4. Center Crisp Icon */}
                        <motion.div
                          variants={iconVariants}
                          whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="relative z-10 text-white flex items-center justify-center drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]"
                        >
                          <Icon className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.2]" />
                        </motion.div>
                      </div>
                    </div>

                  </motion.div>

                  {/* --------------------------------------------------
                      5. FEATURE NUMBER & TITLE PILL CARD
                      -------------------------------------------------- */}
                  <motion.div
                    variants={labelVariants}
                    whileHover={shouldReduceMotion ? {} : { y: -2 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="mt-3.5 bg-white border border-[#F3DEC8] shadow-[0_4px_14px_rgba(75,29,107,0.05)] rounded-2xl py-2 px-3.5 sm:px-4 flex items-center gap-2.5 w-auto max-w-[230px] justify-center transition-all duration-300 group-hover:border-[#D94A2A]/40 group-hover:shadow-[0_8px_20px_rgba(75,29,107,0.08)] relative"
                  >
                    {/* Number Badge */}
                    <div
                      className={`w-5.5 h-5.5 rounded-lg ${feature.badgeBg} ${feature.badgeText} flex items-center justify-center text-[10.5px] font-black shrink-0 shadow-2xs`}
                    >
                      {feature.number}
                    </div>

                    {/* Title (Full readable text without awkward ellipsis) */}
                    <span className="text-[11.5px] sm:text-[12px] font-black text-[#1E122C] tracking-tight text-center leading-snug group-hover:text-[#8C1F3D] transition-colors whitespace-nowrap">
                      {feature.title}
                    </span>
                  </motion.div>

                  {/* --------------------------------------------------
                      6. HOVER DETAIL TOOLTIP CARD (POP-IN ON HOVER)
                      -------------------------------------------------- */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full mt-3 z-[999] left-1/2 -translate-x-1/2 w-64 p-3.5 bg-white border border-[#F3DEC8] rounded-2xl shadow-[0_20px_45px_rgba(75,29,107,0.25)] pointer-events-none"
                      >
                        {/* Top Indicator Triangle Arrow */}
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-[#F3DEC8] rotate-45" />

                        <div className="space-y-2 relative z-10 text-left">
                          {/* Card Header: Icon + Title + Pill */}
                          <div className="flex items-center justify-between gap-2 border-b border-[#F3DEC8]/50 pb-2">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-6 h-6 rounded-lg ${feature.badgeBg} flex items-center justify-center`}
                              >
                                <Icon className={`w-3.5 h-3.5 ${feature.badgeText}`} />
                              </div>
                              <span className="text-xs font-black text-[#1E122C] leading-tight">
                                {feature.title}
                              </span>
                            </div>
                            <span className="text-[9.5px] font-black text-[#8C1F3D] shrink-0">
                              #{feature.number}
                            </span>
                          </div>

                          {/* Detail Description */}
                          <p className="text-[11.5px] text-[#554E60] font-medium leading-relaxed">
                            {feature.desc}
                          </p>

                          {/* Quick Tag Pill */}
                          <div className="pt-0.5 flex items-center justify-between text-[10px] font-bold text-[#8C1F3D]">
                            <span className="px-2 py-0.5 rounded-full bg-[#FEF9F5] border border-[#F3DEC8] text-[#8C1F3D]">
                              {feature.tag}
                            </span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#D94A2A] opacity-80" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>

              </motion.div>
            );
          })}
        </motion.div>

        {/* ========================================================
            BOTTOM BANNER PILL: BUILT TO STREAMLINE. DESIGNED TO SCALE.
            ======================================================== */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mx-auto"
        >
          <div className="rounded-full bg-white/90 backdrop-blur-md border border-[#F3DEC8] shadow-[0_8px_24px_rgba(75,29,107,0.04)] py-3 px-6 sm:px-8 flex items-center justify-between text-center">
            <span className="text-xs text-[#8C1F3D] font-black">✦</span>
            
            <div className="space-y-0.5">
              <h4 className="text-xs sm:text-[13px] font-black text-[#1E122C] tracking-tight">
                Built to streamline. Designed to scale.
              </h4>
              <p className="text-[10.5px] font-bold text-[#8C1F3D]">
                One platform. Infinite possibilities.
              </p>
            </div>

            <div className="flex items-center gap-1 text-xs text-[#D94A2A] font-black">
              <span>•</span>
              <span>✦</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CoPilotFeatures;
