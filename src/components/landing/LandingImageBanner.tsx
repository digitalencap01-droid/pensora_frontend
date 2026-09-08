import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

export const LandingImageBanner: React.FC = () => {
  const logos = [
    { name: 'Google Ads', icon: 'Google' },
    { name: 'Meta', icon: 'Meta' },
    { name: 'LinkedIn', icon: 'LinkedIn' },
    { name: 'HubSpot', icon: 'HubSpot' },
    { name: 'Salesforce', icon: 'Salesforce' },
    { name: 'Instagram', icon: 'Instagram' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <AnimatedSection className="relative rounded-[28px] overflow-hidden min-h-[520px] flex flex-col justify-between p-8 md:p-12 shadow-md">
          {/* Photographic Banner background with Dark Teal Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=1200"
              alt="Marketing Agency Operations Hub"
              className="w-full h-full object-cover"
            />
            {/* Dark teal overlay */}
            <div className="absolute inset-0 bg-[#102B2D]/85 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#102B2D]/60 to-transparent" />
          </div>

          {/* Left Glass Card */}
          <div className="relative z-10 w-full max-w-[420px] bg-[#7065F5]/80 backdrop-blur-md border border-white/20 p-8 rounded-[20px] text-white shadow-xl space-y-4 my-auto">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-theme-lime" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-theme-lime">AUTOPILOT INTEGRATIONS</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold leading-tight tracking-tight">
              AI That Works Like<br />Your Marketing Team
            </h3>
            <p className="text-xs text-white/80 leading-relaxed">
              Aura doesn't just give suggestions. She logs into your channels, sets budgets, publishes optimized content copies, and manages tags natively.
            </p>
            <button className="px-5 py-2.5 bg-theme-lime hover:bg-[#bceb4c] text-theme-textDark font-bold text-xs rounded-full flex items-center gap-1.5 transition-all duration-200 hover:-translate-y-[2px]">
              <span>Explore AI</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Logos */}
          <div className="relative z-10 border-t border-white/10 pt-6 mt-8 flex flex-wrap items-center justify-between gap-6">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">CONNECTS WITH YOUR STACK:</span>
            <div className="flex flex-wrap items-center gap-6 md:gap-8">
              {logos.map((logo) => (
                <div key={logo.name} className="flex items-center gap-2 text-white/50 hover:text-theme-lime transition-colors cursor-default">
                  <span className="text-[11px] font-bold tracking-wide">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>

        </AnimatedSection>
      </div>
    </section>
  );
};

export default LandingImageBanner;
