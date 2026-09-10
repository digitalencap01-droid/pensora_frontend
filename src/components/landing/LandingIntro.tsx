import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';

export const LandingIntro: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
  // Count-up state for number 28
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = 28;
      const totalMilliseconds = 1400;
      const stepTime = Math.floor(totalMilliseconds / end);
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, stepTime);
      
      return () => clearInterval(timer);
    }
  }, [isInView]);

  // Heading slowly pop-up/slide-up transition variants
  const headingVariants = {
    hidden: { opacity: 0, y: 45 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1] as const // smooth springy ease-out
      }
    }
  };

  return (
    <section ref={containerRef} className="pt-24 pb-8 bg-white border-t border-slate-100">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column (Rounded Image & circular rotating badge on top-left) */}
        <div className="lg:col-span-6 relative flex justify-center lg:justify-start">
          <AnimatedSection className="relative w-full max-w-[480px] lg:max-w-none">
            
            {/* Team collaborative swatch design image */}
            <img
              src="https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&q=80&w=1000"
              alt="Solutions Designed to Grow Your Business"
              className="w-full aspect-[4/3] object-cover rounded-[30px] border border-slate-100 shadow-sm relative z-10"
              loading="lazy"
            />
            
            {/* Circular badge overlapping the top-left of the image */}
            <div className="absolute -top-7 -left-7 z-20 w-[130px] h-[130px] rounded-full bg-[#5C4DF7] shadow-xl flex items-center justify-center text-white select-none">
              
              {/* Rotating text around the circle using SVG textPath */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-spin-slow">
                <defs>
                  <path id="circlePath" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
                </defs>
                <text className="text-[7.2px] font-black fill-white/80 uppercase tracking-[1.8px]">
                  <textPath href="#circlePath" startOffset="0%">
                    YEARS OF EXPERIENCE • YEARS OF EXPERIENCE •
                  </textPath>
                </text>
              </svg>

              {/* Centered running/counting up number 28+ */}
              <div className="relative z-10 flex flex-col items-center justify-center leading-none">
                <span className="text-3xl font-black text-[#C8FF55] tracking-tight">{count}+</span>
              </div>
            </div>

          </AnimatedSection>
        </div>

        {/* Right Column (Text Content & Slowly popping up heading) */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="space-y-4">
            
            {/* Subtitle with small blue-purple target/bullet icon */}
            <div className="flex items-center gap-2 justify-start">
              <span className="w-2.5 h-2.5 rounded-full border-[2.5px] border-[#5C4DF7] flex items-center justify-center shrink-0">
                <span className="w-1 h-1 rounded-full bg-[#5C4DF7]" />
              </span>
              <span className="text-xs font-bold text-slate-500 tracking-widest uppercase">
                Who We Are
              </span>
            </div>

            {/* Heading: Slowly popup transition when scrolling into view */}
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={headingVariants}
              className="text-3xl md:text-4xl font-extrabold text-[#151A1F] leading-tight tracking-tight"
            >
              Solutions Designed to Grow <br />
              Your Business
            </motion.h2>

            {/* Mockup body paragraphs */}
            <div className="space-y-4 pt-1 text-sm text-slate-550 leading-relaxed font-medium">
              <p>
                Ex sagittis letius volutpat hac maximus aptent senectus laoreet cursus porttitor fringilla. Cubilia conubia adipiscing natoque iaculis senectus vehicula. Lorem vel quis dui pretium vitae netus augue.
              </p>
              <p>
                Orci posuere diam rhoncus ornare tristique. Venenatis at maximus adipiscing a ex ornare tempor laoreet neque taciti porta.
              </p>
            </div>

          </div>

          {/* Lime Green Button */}
          <div className="pt-2">
            <a
              href="#services"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-[#C8FF55] hover:bg-[#bceb4c] text-[#151A1F] font-bold text-xs rounded-full transition-all duration-200 hover:-translate-y-[2px] cursor-pointer shadow-xs"
            >
              <span>More About Us</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LandingIntro;
