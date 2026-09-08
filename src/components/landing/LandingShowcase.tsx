import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';

export const LandingShowcase: React.FC = () => {
  const items = [
    {
      title: 'AI Social Campaign',
      category: 'Instagram / Meta',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=600',
      size: 'col-span-1 lg:col-span-4 h-[380px]'
    },
    {
      title: 'Creative Generation',
      category: 'Visual Studio',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
      size: 'col-span-1 lg:col-span-8 h-[380px]'
    },
    {
      title: 'Market Intelligence',
      category: 'SEO Audits',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      size: 'col-span-1 lg:col-span-7 h-[420px]'
    },
    {
      title: 'Content Automation',
      category: 'Blog Creator',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600',
      size: 'col-span-1 lg:col-span-5 h-[420px]'
    }
  ];

  return (
    <section className="py-24 bg-theme-lightBg border-y border-theme-border">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 space-y-16">
        
        {/* Section Heading */}
        <AnimatedSection className="max-w-2xl space-y-3">
          <span className="text-xs font-bold text-theme-purple tracking-widest uppercase">
            AI IN ACTION
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-theme-textDark leading-tight tracking-tight">
            Turning Marketing Ideas<br />
            Into High-Performing Campaigns.
          </h2>
        </AnimatedSection>

        {/* Editorial Case Study Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {items.map((item, idx) => (
            <AnimatedSection
              key={idx}
              delay={idx * 0.08}
              className={`relative rounded-[24px] overflow-hidden group shadow-sm ${item.size}`}
            >
              {/* Category Pill top right */}
              <div className="absolute top-4 right-4 z-20 bg-theme-lime text-theme-textDark text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                {item.category}
              </div>

              {/* Background Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                />
                {/* Dark teal gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#102B2D]/90 via-[#102B2D]/20 to-transparent" />
              </div>

              {/* Bottom Text */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10 text-white space-y-1.5">
                <h4 className="text-lg font-bold tracking-tight">{item.title}</h4>
                <p className="text-[10px] text-white/60 font-semibold tracking-wider uppercase">Case Study Outline</p>
              </div>

            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
};

export default LandingShowcase;
