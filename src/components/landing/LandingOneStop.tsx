import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const LandingOneStop: React.FC = () => {
  const navigate = useNavigate();

  // Scroll animations for the text blocks
  const textContainerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
        staggerChildren: 0.12
      }
    }
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  // Card slide-in-from-left animation variants (with custom delay offset)
  const cardLeftVariants = {
    hidden: { opacity: 0, x: -160 },
    visible: (custom: number) => ({
      opacity: 1, 
      x: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const, delay: custom }
    })
  };

  // Card slide-in-from-right animation variants (with custom delay offset)
  const cardRightVariants = {
    hidden: { opacity: 0, x: 160 },
    visible: (custom: number) => ({
      opacity: 1, 
      x: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const, delay: custom }
    })
  };

  return (
    <section className="py-24 bg-[#F8F9FB] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column (Content & CTA) */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={textContainerVariants}
          className="lg:col-span-5 space-y-6 text-left"
        >
          <div className="space-y-4">
            
            {/* Subtitle with blue-purple bullet icon */}
            <motion.div variants={textItemVariants} className="flex items-center gap-2 justify-start">
              <span className="w-2.5 h-2.5 rounded-full border-[2.5px] border-[#5C4DF7] flex items-center justify-center shrink-0">
                <span className="w-1 h-1 rounded-full bg-[#5C4DF7]" />
              </span>
              <span className="text-xs font-bold text-slate-500 tracking-widest uppercase">
                Why Choose Us
              </span>
            </motion.div>

            {/* Main Header - Slow popup entry */}
            <motion.h2 
              variants={textItemVariants}
              className="text-3xl md:text-4xl font-extrabold text-[#151A1F] leading-tight tracking-tight"
            >
              We are your one-stop<br />
              solutions for building<br />
              big brands
            </motion.h2>

            {/* Description */}
            <motion.p 
              variants={textItemVariants}
              className="text-sm text-slate-500 leading-relaxed font-medium pt-1"
            >
              Eu nisl quam parturient platea pulvinar viverra massa litora. Turpis lacinia dictum dolor consectetuer elit est dis lorem tincidunt potenti consequat.
            </motion.p>
          </div>

          {/* Lime Green Button */}
          <motion.div variants={textItemVariants} className="pt-2">
            <button
              onClick={() => navigate('/signup')}
              className="px-6 py-3.5 bg-[#C8FF55] hover:bg-[#bceb4c] text-[#151A1F] font-bold text-xs rounded-full transition-all duration-200 hover:-translate-y-[2px] cursor-pointer shadow-xs"
            >
              Discover More
            </button>
          </motion.div>
        </motion.div>

        {/* Right Column (2 Asymmetric Vertical Flex Columns for Perfect Masonry Grid) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          
          {/* Left Column - Card 01 & Card 03 (slide in from Left) */}
          <div className="flex flex-col gap-6 w-full">
            {/* Card 01 (Top-Left) - Solid Lime Green Card */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              custom={0.1}
              variants={cardLeftVariants}
              className="bg-[#C8FF55] border border-[#C8FF55]/10 rounded-[24px] p-6 h-[200px] flex flex-col justify-between shadow-xs hover:-translate-y-2 hover:shadow-md transition-all duration-300 ease-out cursor-pointer"
            >
              <span className="text-sm font-extrabold text-[#5C4DF7] text-left">01</span>
              <div className="text-left">
                <h4 className="text-[17px] font-extrabold text-[#151A1F] tracking-tight">Performance-First</h4>
                <p className="text-xs text-[#2D3748] mt-1.5 leading-relaxed font-medium">
                  Nullam non litora ornare facilisis viverra sit vel sodales. Pede maecenas nunc lacus mattis vulputate.
                </p>
              </div>
            </motion.div>

            {/* Card 03 (Bottom-Left) - Photo Card with Workspace Overlay */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              custom={0.25}
              variants={cardLeftVariants}
              className="relative rounded-[24px] overflow-hidden h-[220px] flex flex-col justify-between p-6 shadow-xs group hover:-translate-y-2 hover:shadow-md transition-all duration-300 ease-out cursor-pointer"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80&w=600"
                  alt="Transparen Report"
                  className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/55" />
              </div>
              <span className="text-sm font-extrabold text-[#75F2AF] relative z-10 text-left">03</span>
              <div className="relative z-10 text-left">
                <h4 className="text-[17px] font-extrabold text-white tracking-tight">Transparen Report</h4>
                <p className="text-xs text-white/80 mt-1.5 leading-relaxed font-medium">
                  Nullam non litora ornare facilisis viverra sit vel sodales. Pede maecenas nunc lacus mattis vulputate.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Card 02 & Card 04 (slide in from Right) */}
          <div className="flex flex-col gap-6 w-full sm:pt-10">
            {/* Card 02 (Top-Right) - Photo Card with Analytics Monitor Overlay */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              custom={0.1}
              variants={cardRightVariants}
              className="relative rounded-[24px] overflow-hidden h-[240px] flex flex-col justify-between p-6 shadow-xs group hover:-translate-y-2 hover:shadow-md transition-all duration-300 ease-out cursor-pointer"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600"
                  alt="Tailored Strategies"
                  className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/55" />
              </div>
              <span className="text-sm font-extrabold text-[#75F2AF] relative z-10 text-left">02</span>
              <div className="relative z-10 text-left">
                <h4 className="text-[17px] font-extrabold text-white tracking-tight">Tailored Strategies</h4>
                <p className="text-xs text-white/80 mt-1.5 leading-relaxed font-medium">
                  Nullam non litora ornare facilisis viverra sit vel sodales. Pede maecenas nunc lacus mattis vulputate.
                </p>
              </div>
            </motion.div>

            {/* Card 04 (Bottom-Right) - Solid Blue-Purple Card */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              custom={0.25}
              variants={cardRightVariants}
              className="bg-[#5C4DF7] border border-[#5C4DF7]/10 rounded-[24px] p-6 h-[180px] flex flex-col justify-between shadow-xs hover:-translate-y-2 hover:shadow-md transition-all duration-300 ease-out cursor-pointer text-white"
            >
              <span className="text-sm font-extrabold text-[#C8FF55] text-left">04</span>
              <div className="text-left">
                <h4 className="text-[17px] font-extrabold text-white tracking-tight">24/7 Premium Support</h4>
                <p className="text-xs text-white/80 mt-1.5 leading-relaxed font-medium">
                  Nullam non litora ornare facilisis viverra sit vel sodales. Pede maecenas nunc lacus mattis vulputate.
                </p>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default LandingOneStop;
