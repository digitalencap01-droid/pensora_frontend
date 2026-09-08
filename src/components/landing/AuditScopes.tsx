import React from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Megaphone
} from 'lucide-react';

const DotMatrix: React.FC<{ color?: string }> = ({ color = '#EA580C' }) => (
  <div className="grid grid-cols-4 gap-1.5 opacity-40">
    {Array.from({ length: 12 }).map((_, i) => (
      <div
        key={i}
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
    ))}
  </div>
);

export const AuditScopes: React.FC = () => {
  return (
    <section id="audits" className="py-20 md:py-28 bg-[#FFFDFC] relative z-10 overflow-hidden select-none">
      
      {/* Corner Background Dot Matrix Accents */}
      <div className="absolute top-8 right-8 hidden lg:block opacity-25 pointer-events-none">
        <div className="grid grid-cols-6 gap-2.5">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#E5B8C0]" />
          ))}
        </div>
      </div>
      <div className="absolute bottom-8 left-8 hidden lg:block opacity-25 pointer-events-none">
        <div className="grid grid-cols-6 gap-2.5">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#D1C4E9]" />
          ))}
        </div>
      </div>

      <div className="max-w-[1160px] mx-auto px-6 relative z-10">
        
        {/* ========================================================
            HEADER: AUDIT SCOPES WE EXCEL IN
            ======================================================== */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-14 sm:mb-18">
          <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-black text-[#15111E] tracking-tight leading-[1.04]">
            Audit Scopes <span className="text-[#8E2C43]">We Excel</span> <span className="text-[#3B184B]">In</span>
          </h2>
          <p className="text-[#5A5265] font-semibold text-xs sm:text-[14px] leading-relaxed max-w-xl mx-auto">
            We design specialized layout checkers for multiple industries, ensuring high-conversions on landing pages, search engines, and social media feeds.
          </p>

          {/* Central Divider: — ○ — */}
          <div className="flex items-center justify-center gap-2.5 pt-1">
            <div className="w-8 h-[1.5px] bg-[#E5B8C0]" />
            <div className="w-3.5 h-3.5 rounded-full border-2 border-[#8E2C43] bg-white shadow-2xs" />
            <div className="w-8 h-[1.5px] bg-[#E5B8C0]" />
          </div>
        </div>

        {/* ========================================================
            2x2 BALANCED GRID WITH ENLARGED IMAGE BOXES
            ======================================================== */}
        <div className="relative">
          
          {/* Desktop SVG Circuit Connector Pipelines */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none select-none z-0">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 1140 560" fill="none">
              
              {/* Connector 01: From Card 1 Badge -> Down -> Right under Card 1 text -> Down to Burgundy Dot */}
              <path
                d="M 285,185 L 285,245 Q 285,268 310,268 L 420,268 Q 445,268 445,285 L 445,310"
                stroke="#8E2C43"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="445" cy="310" r="5.5" fill="#8E2C43" />

              {/* Connector 02: From Card 2 Badge -> Down -> Left under Card 2 text -> Down to Orange Dot */}
              <path
                d="M 855,185 L 855,245 Q 855,268 830,268 L 720,268 Q 695,268 695,285 L 695,310"
                stroke="#EA580C"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="695" cy="310" r="5.5" fill="#EA580C" />

              {/* Connector 03-04: Purple Pipeline under Card 03 -> Curves 90° Up -> Terminates at Purple Node Dot */}
              <path
                d="M 330,515 L 545,515 Q 570,515 570,490 L 570,440"
                stroke="#4A2066"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="570" cy="440" r="5.5" fill="#4A2066" />

            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-y-16 gap-x-8 lg:gap-x-12 relative z-10">
            
            {/* ========================================================
                CARD 01: DIRECT-TO-CONSUMER CONVERSION PATHS (TOP-LEFT)
                ======================================================== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-left group"
            >
              {/* Enlarged Photo Frame + Floating Badge */}
              <div className="relative shrink-0">
                {/* Photo Card with Maroon Tint */}
                <div className="w-[280px] h-[195px] sm:w-[305px] sm:h-[210px] rounded-tl-[48px] rounded-bl-[48px] rounded-br-[48px] rounded-tr-[12px] overflow-hidden shadow-[0_14px_35px_rgba(142,44,67,0.18)] border border-[#8E2C43]/20 bg-white relative">
                  <img
                    src="/audit-01-ecommerce-3d.jpg"
                    alt="Direct-to-Consumer e-commerce conversion audit"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#8E2C43]/15 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Crescent Outer Highlight Ring */}
                <div className="absolute top-1/2 -right-6 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-[#8E2C43] pointer-events-none" />

                {/* Pure White Circular Floating Badge */}
                <div className="absolute top-1/2 -right-6 -translate-y-1/2 w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full bg-white shadow-[0_10px_28px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-10">
                  <ShoppingCart className="w-7.5 h-7.5 text-[#8E2C43] stroke-[2.2]" />
                </div>
              </div>

              {/* Content Block */}
              <div className="space-y-1.5 pt-1 pl-3 sm:pl-4 max-w-[250px]">
                <div>
                  <span className="text-2.5xl sm:text-3xl font-black text-[#8E2C43] block leading-none">
                    01
                  </span>
                  <div className="w-6 h-[2.5px] bg-[#8E2C43] rounded-full mt-1.5 mb-2" />
                </div>
                <h3 className="text-[17px] sm:text-[18px] font-black text-[#15111E] leading-snug">
                  Direct-to-Consumer Conversion Paths
                </h3>
                <p className="text-[12px] text-[#554E60] font-normal leading-relaxed">
                  Analyze shop navigation layout, cart funnel leak points, and metadata tags automatically. Used by sustainable apparel and micro-roasted coffee retailers.
                </p>
                <div className="pt-2">
                  <DotMatrix color="#E5B8C0" />
                </div>
              </div>
            </motion.div>

            {/* ========================================================
                CARD 02: MAP PACK RANKINGS (TOP-RIGHT)
                ======================================================== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col-reverse sm:flex-row items-center sm:items-start justify-end gap-5 sm:gap-6 text-left group"
            >
              {/* Content Block */}
              <div className="space-y-1.5 pt-1 pr-3 sm:pr-4 max-w-[250px] text-left">
                <div>
                  <span className="text-2.5xl sm:text-3xl font-black text-[#EA580C] block leading-none">
                    02
                  </span>
                  <div className="w-6 h-[2.5px] bg-[#EA580C] rounded-full mt-1.5 mb-2" />
                </div>
                <h3 className="text-[17px] sm:text-[18px] font-black text-[#15111E] leading-snug">
                  Map Pack Rankings
                </h3>
                <p className="text-[12px] text-[#554E60] font-normal leading-relaxed">
                  Monitor local search organic visibility and Google Business tags to stay ahead of competitors.
                </p>
                <div className="pt-2">
                  <DotMatrix color="#FDBA74" />
                </div>
              </div>

              {/* Enlarged Photo Frame + Floating Badge */}
              <div className="relative shrink-0">
                {/* Crescent Outer Highlight Ring */}
                <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-[#EA580C] pointer-events-none" />

                {/* Pure White Circular Floating Badge */}
                <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full bg-white shadow-[0_10px_28px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-10">
                  <TrendingUp className="w-7.5 h-7.5 text-[#EA580C] stroke-[2.2]" />
                </div>

                {/* Photo Card with Orange Tint */}
                <div className="w-[280px] h-[195px] sm:w-[305px] sm:h-[210px] rounded-tr-[48px] rounded-br-[48px] rounded-tl-[48px] rounded-bl-[12px] overflow-hidden shadow-[0_14px_35px_rgba(234,88,12,0.18)] border border-[#EA580C]/20 bg-white relative">
                  <img
                    src="/audit-02-seo.jpg"
                    alt="Map Pack local search ranking audit"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tl from-[#EA580C]/15 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>

            {/* ========================================================
                CARD 03: AD COST SHIFTERS (BOTTOM-LEFT)
                ======================================================== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-left group"
            >
              {/* Enlarged Photo Frame + Floating Badge */}
              <div className="relative shrink-0">
                {/* Photo Card with Amber Tint */}
                <div className="w-[280px] h-[195px] sm:w-[305px] sm:h-[210px] rounded-tl-[48px] rounded-bl-[48px] rounded-tr-[48px] rounded-br-[12px] overflow-hidden shadow-[0_14px_35px_rgba(217,119,6,0.18)] border border-[#D97706]/20 bg-white relative">
                  <img
                    src="/audit-03-adspend-3d.jpg"
                    alt="Ad Cost Shifters financial optimization audit"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#D97706]/15 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Crescent Outer Highlight Ring */}
                <div className="absolute top-1/2 -right-6 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-[#D97706] pointer-events-none" />

                {/* Pure White Circular Floating Badge */}
                <div className="absolute top-1/2 -right-6 -translate-y-1/2 w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full bg-white shadow-[0_10px_28px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-10">
                  <DollarSign className="w-7.5 h-7.5 text-[#D97706] stroke-[2.5]" />
                </div>
              </div>

              {/* Content Block */}
              <div className="space-y-1.5 pt-1 pl-3 sm:pl-4 max-w-[250px]">
                <div>
                  <span className="text-2.5xl sm:text-3xl font-black text-[#D97706] block leading-none">
                    03
                  </span>
                  <div className="w-6 h-[2.5px] bg-[#D97706] rounded-full mt-1.5 mb-2" />
                </div>
                <h3 className="text-[17px] sm:text-[18px] font-black text-[#15111E] leading-snug">
                  Ad Cost Shifters
                </h3>
                <p className="text-[12px] text-[#554E60] font-normal leading-relaxed">
                  Track spend vs. performance across channels and uncover high-intent audience opportunities.
                </p>
                <div className="pt-2">
                  <DotMatrix color="#FDE68A" />
                </div>
              </div>
            </motion.div>

            {/* ========================================================
                CARD 04: SOCIAL ENGAGEMENT BOOSTERS (BOTTOM-RIGHT)
                ======================================================== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col-reverse sm:flex-row items-center sm:items-start justify-end gap-5 sm:gap-6 text-left group"
            >
              {/* Content Block */}
              <div className="space-y-1.5 pt-1 pr-3 sm:pr-4 max-w-[250px] text-left">
                <div>
                  <span className="text-2.5xl sm:text-3xl font-black text-[#4A2066] block leading-none">
                    04
                  </span>
                  <div className="w-6 h-[2.5px] bg-[#4A2066] rounded-full mt-1.5 mb-2" />
                </div>
                <h3 className="text-[17px] sm:text-[18px] font-black text-[#15111E] leading-snug">
                  Social Engagement Boosters
                </h3>
                <p className="text-[12px] text-[#554E60] font-normal leading-relaxed">
                  Audit content formats, posting cadence, and engagement signals to maximize reach and conversions.
                </p>
                <div className="pt-2">
                  <DotMatrix color="#DDD6FE" />
                </div>
              </div>

              {/* Enlarged Photo Frame + Floating Badge */}
              <div className="relative shrink-0">
                {/* Crescent Outer Highlight Ring */}
                <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-[#4A2066] pointer-events-none" />

                {/* Pure White Circular Floating Badge */}
                <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full bg-white shadow-[0_10px_28px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-10">
                  <Megaphone className="w-7.5 h-7.5 text-[#4A2066] stroke-[2.2]" />
                </div>

                {/* Photo Card with Purple Tint */}
                <div className="w-[280px] h-[195px] sm:w-[305px] sm:h-[210px] rounded-tr-[48px] rounded-br-[48px] rounded-tl-[12px] rounded-bl-[48px] overflow-hidden shadow-[0_14px_35px_rgba(74,32,102,0.2)] border border-[#4A2066]/20 bg-white relative">
                  <img
                    src="/audit-04-marketing.jpg"
                    alt="Social Engagement Boosters audit"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tl from-[#4A2066]/15 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AuditScopes;
