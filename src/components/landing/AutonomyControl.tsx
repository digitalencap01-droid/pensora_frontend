import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Lightbulb,
  Clock,
  CheckCircle2,
  Check,
  Megaphone,
  ChevronRight,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';

export const AutonomyControl: React.FC = () => {
  const [count, setCount] = useState(0);

  // Smooth score count-up on scroll
  useEffect(() => {
    let start = 0;
    const end = 68;
    const duration = 1200;
    const stepTime = 15;
    const increment = end / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="workspace" className="py-20 md:py-28 bg-[#F6EDE4] relative overflow-hidden z-10 select-none">
      
      {/* Ambient Warm Radiant Breathing Glow */}
      <motion.div
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.12, 0.18, 0.12],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[650px] bg-gradient-to-br from-[#F2A65A]/25 via-[#E11D48]/10 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-[1080px] mx-auto px-6 relative z-10">
        
        {/* ========================================================
            TOP HEADER AREA: TITLE (LEFT) & DONUT GAUGE (RIGHT)
            ======================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-14">
          
          {/* Left Column: Pill Badge, Bold Headline, Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-left space-y-3 max-w-xl"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0E6] border border-[#F2A65A]/40 text-[#EA580C] text-[10.5px] font-black uppercase tracking-wider shadow-2xs">
              <Shield className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>AI AUTONOMY CONTROL</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#1E122C] tracking-tight leading-[1.04]">
              You Decide.<br />
              <span className="text-[#EA580C]">AI</span> <span className="text-[#4A154B]">Executes.</span>
            </h2>

            {/* Subtitle */}
            <p className="text-[#5A5265] font-medium text-sm sm:text-[15px] leading-relaxed max-w-md pt-1">
              Stay in control of what AI can recommend, prepare, or execute automatically.
            </p>
          </motion.div>

          {/* Right Column: Donut Gauge + 3-Item Legend */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="flex items-center justify-start lg:justify-end gap-6 sm:gap-8"
          >
            
            {/* Donut Gauge Ring */}
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center shrink-0">
              
              {/* Inner White Disc with Soft Shadow */}
              <div className="absolute inset-3 rounded-full bg-white shadow-[0_10px_30px_rgba(217,74,42,0.08)] -z-10" />

              <svg className="w-full h-full -rotate-90 drop-shadow-xs" viewBox="0 0 100 100">
                {/* Background Ring Track */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#F6ECE3"
                  strokeWidth="8.5"
                />

                {/* Orange Segment (High Autonomy Arc) */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#EA580C"
                  strokeWidth="8.5"
                  strokeDasharray="125 238.7"
                  initial={{ strokeDashoffset: 238.7 }}
                  whileInView={{ strokeDashoffset: 35 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                  strokeLinecap="round"
                />

                {/* Crimson / Magenta Segment */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#BE185D"
                  strokeWidth="8.5"
                  strokeDasharray="50 238.7"
                  initial={{ strokeDashoffset: 238.7 }}
                  whileInView={{ strokeDashoffset: -90 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
                  strokeLinecap="round"
                />

                {/* Deep Purple Segment */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#4B1D6B"
                  strokeWidth="8.5"
                  strokeDasharray="40 238.7"
                  initial={{ strokeDashoffset: 238.7 }}
                  whileInView={{ strokeDashoffset: -140 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
                  strokeLinecap="round"
                />
              </svg>

              {/* Gauge Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[9.5px] font-black text-slate-400 tracking-widest uppercase leading-none">
                  AUTONOMY LEVEL
                </span>
                <span className="text-3xl sm:text-[40px] font-black bg-gradient-to-r from-[#EA580C] via-[#BE185D] to-[#4B1D6B] bg-clip-text text-transparent leading-tight my-0.5 tabular-nums">
                  {count}%
                </span>
                <span className="text-[11.5px] font-bold text-slate-600 leading-none">
                  Human Controlled
                </span>
              </div>
            </div>

            {/* Legend Column with indicator connectors */}
            <div className="flex flex-col gap-4 text-left">
              
              {/* Legend Item 1 - Automatic */}
              <div className="flex items-center gap-3 group cursor-default">
                <div className="relative flex items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4B1D6B] group-hover:scale-125 transition-transform" />
                  <div className="w-4 h-[1.5px] bg-[#4B1D6B]/50 -ml-1 -z-10" />
                </div>
                <div>
                  <h4 className="text-[13px] font-black text-[#1E122C] leading-none">Automatic</h4>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">High autonomy</p>
                </div>
              </div>

              {/* Legend Item 2 - Approval */}
              <div className="flex items-center gap-3 group cursor-default">
                <div className="relative flex items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#BE185D] group-hover:scale-125 transition-transform" />
                  <div className="w-4 h-[1.5px] bg-[#BE185D]/50 -ml-1 -z-10" />
                </div>
                <div>
                  <h4 className="text-[13px] font-black text-[#1E122C] leading-none">Approval</h4>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">Requires review</p>
                </div>
              </div>

              {/* Legend Item 3 - Recommend */}
              <div className="flex items-center gap-3 group cursor-default">
                <div className="relative flex items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#EA580C] group-hover:scale-125 transition-transform" />
                  <div className="w-4 h-[1.5px] bg-[#EA580C]/50 -ml-1 -z-10" />
                </div>
                <div>
                  <h4 className="text-[13px] font-black text-[#1E122C] leading-none">Recommend</h4>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">AI suggests only</p>
                </div>
              </div>

            </div>

          </motion.div>

        </div>

        {/* ========================================================
            MIDDLE AREA: CASCADE CARDS WITH ANIMATED SCHEMATIC CIRCUIT
            ======================================================== */}
        <div className="relative w-full max-w-[1040px] mx-auto min-h-[300px]">
          
          {/* ========================================================
              DESKTOP SCHEMATIC CIRCUIT OVERLAY WITH MOVING PULSE
              ======================================================== */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none select-none z-0">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 1040 310" fill="none">
              
              {/* Left Schematic: Node 1 (X:45, Y:45) */}
              <circle cx="45" cy="45" r="9" fill="#EA580C" fillOpacity="0.2" className="animate-ping" />
              <circle cx="45" cy="45" r="6" fill="#EA580C" stroke="#F6EDE4" strokeWidth="2.5" />
              
              {/* Line from Node 1 into Card 1 */}
              <path d="M 45,45 L 115,45" stroke="#EA580C" strokeWidth="2" strokeDasharray="3 3" />
              <path d="M 45,45 C 70,30 95,35 115,35" stroke="#EA580C" strokeWidth="1.5" strokeOpacity="0.45" fill="none" />

              {/* Vertical Drop from Node 1 -> Down -> Turn into Node 2 (X:95, Y:145) */}
              <path
                d="M 45,45 L 45,115 Q 45,145 95,145"
                stroke="#EA580C"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Node 2 Circle (Crimson) with Pulse Ring */}
              <circle cx="95" cy="145" r="8.5" fill="#BE185D" fillOpacity="0.2" className="animate-ping" style={{ animationDelay: '1s' }} />
              <circle cx="95" cy="145" r="5.5" fill="#BE185D" stroke="#F6EDE4" strokeWidth="2.5" />
              {/* Line from Node 2 into Card 2 */}
              <path d="M 95,145 L 155,145" stroke="#BE185D" strokeWidth="2" />

              {/* Vertical Drop from Node 2 -> Down -> Turn into Node 3 (X:145, Y:245) */}
              <path
                d="M 95,145 L 95,215 Q 95,245 145,245"
                stroke="url(#leftBusGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Node 3 Circle (Purple) with Pulse Ring */}
              <circle cx="145" cy="245" r="8.5" fill="#831843" fillOpacity="0.2" className="animate-ping" style={{ animationDelay: '2s' }} />
              <circle cx="145" cy="245" r="5.5" fill="#831843" stroke="#F6EDE4" strokeWidth="2.5" />
              {/* Line from Node 3 into Card 3 */}
              <path d="M 145,245 L 195,245" stroke="#831843" strokeWidth="2" />

              {/* Right Side: Circuit Arc connecting Card 1 Right (X:873, Y:45) to Card 2 Right (X:921, Y:145) */}
              <path
                d="M 873,45 Q 945,45 945,95 L 945,115 Q 945,145 921,145"
                stroke="#EA580C"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeOpacity="0.8"
                fill="none"
              />
              <circle cx="921" cy="145" r="4.5" fill="#BE185D" />

              {/* Right Side of Card 3: Horizontal Dotted Stem from Card 3 Right (X:969, Y:245) */}
              <path d="M 969,245 L 1010,245" stroke="#831843" strokeWidth="2.5" strokeDasharray="3 3" />
              <circle cx="1016" cy="245" r="5.5" fill="#831843" />
              
              {/* Teal Accent Ring above Purple Node with Gentle Pulse */}
              <circle cx="1008" cy="215" r="7.5" stroke="#0D9488" strokeWidth="2.5" fill="none" opacity="0.85" />
              <circle cx="1008" cy="215" r="11" stroke="#0D9488" strokeWidth="1" fill="none" opacity="0.4" className="animate-pulse" />

              <defs>
                <linearGradient id="leftBusGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#BE185D" />
                  <stop offset="100%" stopColor="#831843" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Cards Container with Cascading Stagger */}
          <div className="space-y-4 sm:space-y-5 relative z-10">
            
            {/* ========================================================
                CARD 1: SOCIAL MEDIA CONTENT (Automatic is Active)
                ======================================================== */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="w-full lg:w-[825px] lg:ml-12 lg:mr-auto group"
            >
              <div className="bg-white rounded-[22px] sm:rounded-[26px] border border-white shadow-[0_10px_35px_rgba(45,18,58,0.05)] p-3.5 sm:p-4 group-hover:shadow-[0_16px_44px_rgba(45,18,58,0.09)] group-hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
                  
                  {/* Left Column: Icon Plate + Title & Desc */}
                  <div className="flex items-center gap-3.5 text-left min-w-[260px]">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#FFF7ED] border border-[#FDBA74]/50 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                      <div className="relative">
                        <svg className="w-6 h-6 text-[#EA580C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
                          <path d="M12 18h.01"/>
                        </svg>
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#EA580C] text-white flex items-center justify-center text-[7px] font-bold">♥</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-[15px] font-black text-[#1E122C] leading-tight">
                        Social Media Content
                      </h3>
                      <p className="text-[12px] text-slate-500 font-medium leading-snug mt-0.5 max-w-[230px]">
                        Draft Instagram posts, captions and content variants.
                      </p>
                    </div>
                  </div>

                  {/* Middle Column: 3-Option Static Display Box */}
                  <div className="bg-[#FAFAFA] border border-slate-200/90 rounded-2xl p-1 flex items-center self-stretch sm:self-auto justify-between sm:justify-start divide-x divide-slate-150/70 pointer-events-none">
                    
                    {/* Option 1: Recommend (Inactive) */}
                    <div className="px-4 py-2 rounded-xl text-left flex items-center gap-2.5 text-xs text-slate-600 font-medium">
                      <Lightbulb className="w-4 h-4 shrink-0 text-[#EA580C]" />
                      <div className="leading-none text-left">
                        <span className="block font-bold text-[12px]">Recommend</span>
                        <span className="block text-[9.5px] mt-0.5 text-slate-400">
                          AI suggests
                        </span>
                      </div>
                    </div>

                    {/* Option 2: Approval (Inactive) */}
                    <div className="px-3.5 sm:px-4 py-2 rounded-xl text-left flex items-center gap-2.5 text-xs text-slate-600 font-medium">
                      <Clock className="w-4 h-4 shrink-0 text-[#EA580C]" />
                      <div className="leading-none text-left">
                        <span className="block font-bold text-[12px]">Approval</span>
                        <span className="block text-[9.5px] mt-0.5 text-slate-400">
                          Review first
                        </span>
                      </div>
                    </div>

                    {/* Option 3: Automatic (Active - Orange) */}
                    <div className="px-4 py-2 rounded-xl text-left flex items-center gap-2.5 text-xs bg-[#EA580C] text-white font-bold shadow-xs">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-white" />
                      <div className="leading-none text-left">
                        <span className="block font-bold text-[12px]">Automatic</span>
                        <span className="block text-[9.5px] mt-0.5 text-white/85">
                          Auto execute
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Status Pill Badge with live green pulse */}
                  <div className="flex items-center justify-end min-w-[75px]">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] text-[11.5px] font-bold shadow-3xs">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#059669]"></span>
                      </span>
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Active</span>
                    </span>
                  </div>

                </div>
              </div>
            </motion.div>

            {/* ========================================================
                CARD 2: PAID CAMPAIGNS (Approval is Active)
                ======================================================== */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              className="w-full lg:w-[825px] lg:ml-24 lg:mr-auto group"
            >
              <div className="bg-white rounded-[22px] sm:rounded-[26px] border border-white shadow-[0_10px_35px_rgba(45,18,58,0.05)] p-3.5 sm:p-4 group-hover:shadow-[0_16px_44px_rgba(45,18,58,0.09)] group-hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
                  
                  {/* Left Column: Icon Plate + Title & Desc */}
                  <div className="flex items-center gap-3.5 text-left min-w-[260px]">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#FFF1F2] border border-[#FDA4AF]/50 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                      <Megaphone className="w-6 h-6 text-[#E11D48] stroke-[1.8]" />
                    </div>

                    <div>
                      <h3 className="text-[15px] font-black text-[#1E122C] leading-tight">
                        Paid Campaigns
                      </h3>
                      <p className="text-[12px] text-slate-500 font-medium leading-snug mt-0.5 max-w-[230px]">
                        Increase budgets, optimize bids and placements.
                      </p>
                    </div>
                  </div>

                  {/* Middle Column: 3-Option Static Display Box */}
                  <div className="bg-[#FAFAFA] border border-slate-200/90 rounded-2xl p-1 flex items-center self-stretch sm:self-auto justify-between sm:justify-start divide-x divide-slate-150/70 pointer-events-none">
                    
                    {/* Option 1: Recommend (Inactive) */}
                    <div className="px-4 py-2 rounded-xl text-left flex items-center gap-2.5 text-xs text-slate-600 font-medium">
                      <Lightbulb className="w-4 h-4 shrink-0 text-[#EA580C]" />
                      <div className="leading-none text-left">
                        <span className="block font-bold text-[12px]">Recommend</span>
                        <span className="block text-[9.5px] mt-0.5 text-slate-400">
                          AI suggests
                        </span>
                      </div>
                    </div>

                    {/* Option 2: Approval (Active - Crimson) */}
                    <div className="px-4 py-2 rounded-xl text-left flex items-center gap-2.5 text-xs bg-[#E11D48] text-white font-bold shadow-xs">
                      <Clock className="w-4 h-4 shrink-0 text-white" />
                      <div className="leading-none text-left">
                        <span className="block font-bold text-[12px]">Approval</span>
                        <span className="block text-[9.5px] mt-0.5 text-white/85">
                          Review first
                        </span>
                      </div>
                    </div>

                    {/* Option 3: Automatic (Inactive) */}
                    <div className="px-4 py-2 rounded-xl text-left flex items-center gap-2.5 text-xs text-slate-600 font-medium">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-[#EA580C]" />
                      <div className="leading-none text-left">
                        <span className="block font-bold text-[12px]">Automatic</span>
                        <span className="block text-[9.5px] mt-0.5 text-slate-400">
                          Auto execute
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Status Pill Badge */}
                  <div className="flex items-center justify-end min-w-[75px]">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF7ED] text-[#EA580C] border border-[#FFEDD5] text-[11.5px] font-bold shadow-3xs">
                      <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Review</span>
                    </span>
                  </div>

                </div>
              </div>
            </motion.div>

            {/* ========================================================
                CARD 3: SEO CONTENT (Approval is Active - Plum/Purple)
                ======================================================== */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="w-full lg:w-[825px] lg:ml-36 lg:mr-auto group"
            >
              <div className="bg-white rounded-[22px] sm:rounded-[26px] border border-white shadow-[0_10px_35px_rgba(45,18,58,0.05)] p-3.5 sm:p-4 group-hover:shadow-[0_16px_44px_rgba(45,18,58,0.09)] group-hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
                  
                  {/* Left Column: Icon Plate + Title & Desc */}
                  <div className="flex items-center gap-3.5 text-left min-w-[260px]">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#FAF5FF] border border-[#E9D5FF]/60 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                      <div className="relative">
                        <svg className="w-6 h-6 text-[#831843]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                          <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                          <circle cx="11.5" cy="14.5" r="2.5"/>
                          <path d="m13.5 16.5 2 2"/>
                        </svg>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-[15px] font-black text-[#1E122C] leading-tight">
                        SEO Content
                      </h3>
                      <p className="text-[12px] text-slate-500 font-medium leading-snug mt-0.5 max-w-[230px]">
                        Generate and publish optimized articles to your website.
                      </p>
                    </div>
                  </div>

                  {/* Middle Column: 3-Option Static Display Box */}
                  <div className="bg-[#FAFAFA] border border-slate-200/90 rounded-2xl p-1 flex items-center self-stretch sm:self-auto justify-between sm:justify-start divide-x divide-slate-150/70 pointer-events-none">
                    
                    {/* Option 1: Recommend (Inactive) */}
                    <div className="px-4 py-2 rounded-xl text-left flex items-center gap-2.5 text-xs text-slate-600 font-medium">
                      <Lightbulb className="w-4 h-4 shrink-0 text-[#EA580C]" />
                      <div className="leading-none text-left">
                        <span className="block font-bold text-[12px]">Recommend</span>
                        <span className="block text-[9.5px] mt-0.5 text-slate-400">
                          AI suggests
                        </span>
                      </div>
                    </div>

                    {/* Option 2: Approval (Active - Plum/Purple) */}
                    <div className="px-4 py-2 rounded-xl text-left flex items-center gap-2.5 text-xs bg-[#831843] text-white font-bold shadow-xs">
                      <Clock className="w-4 h-4 shrink-0 text-white" />
                      <div className="leading-none text-left">
                        <span className="block font-bold text-[12px]">Approval</span>
                        <span className="block text-[9.5px] mt-0.5 text-white/85">
                          Review first
                        </span>
                      </div>
                    </div>

                    {/* Option 3: Automatic (Inactive) */}
                    <div className="px-4 py-2 rounded-xl text-left flex items-center gap-2.5 text-xs text-slate-600 font-medium">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-[#EA580C]" />
                      <div className="leading-none text-left">
                        <span className="block font-bold text-[12px]">Automatic</span>
                        <span className="block text-[9.5px] mt-0.5 text-slate-400">
                          Auto execute
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Status Pill Badge */}
                  <div className="flex items-center justify-end min-w-[75px]">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF1F2] text-[#E11D48] border border-[#FFE4E6] text-[11.5px] font-bold shadow-3xs">
                      <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Pending</span>
                    </span>
                  </div>

                </div>
              </div>
            </motion.div>

          </div>

        </div>

        {/* ========================================================
            BOTTOM AREA: FULL TRANSPARENCY & ACTIVITY LOG BAR
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
          className="border border-[#F5D8C3]/50 bg-transparent rounded-2xl sm:rounded-[22px] px-5 sm:px-6 py-3.5 max-w-[1040px] mx-auto mt-8 relative z-10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Left: White Squircle Shield Icon + Text */}
            <div className="flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/80 text-[#1E122C] flex items-center justify-center shrink-0 shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-[#1E122C]" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                <span className="text-[13.5px] font-black text-[#1E122C]">
                  Full transparency. Total control.
                </span>
                <span className="hidden sm:inline text-slate-300">|</span>
                <span className="text-[12px] text-[#6B6375] font-medium">
                  Every action is logged. You're always in charge.
                </span>
              </div>
            </div>

            {/* Right: White View Activity Log Action Button */}
            <a
              href="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#EA580C]/40 hover:border-[#EA580C] text-[#EA580C] hover:bg-[#FFF7ED] text-[11.5px] font-bold tracking-wide transition-all duration-200 shadow-2xs hover:-translate-y-0.5 group shrink-0"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>View Activity Log</span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AutonomyControl;
