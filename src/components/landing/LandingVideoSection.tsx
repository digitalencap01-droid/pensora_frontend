import React from 'react';
import { Play } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { useNavigate } from 'react-router-dom';

export const LandingVideoSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 space-y-12">
        
        {/* Cinematic Video placeholder banner */}
        <AnimatedSection className="relative rounded-[28px] overflow-hidden min-h-[420px] flex flex-col items-center justify-center text-center p-8 shadow-md">
          {/* Background image & dark overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=1200"
              alt="Aura AI product video preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" />
          </div>

          {/* Text & Play Button */}
          <div className="relative z-10 space-y-6 max-w-md text-white">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
              See Your AI Marketing<br />Team in Action.
            </h3>
            
            {/* Play Button with hover scaling */}
            <div className="flex items-center justify-center">
              <button className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-full bg-white text-theme-textDark flex items-center justify-center shadow-lg border border-white/40 transition-transform duration-300 hover:scale-108 hover:shadow-white/20 hover:shadow-xl cursor-pointer">
                <Play className="w-6 h-6 fill-current translate-x-0.5" />
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Gradient CTA bar below the video */}
        <AnimatedSection delay={0.1} className="relative rounded-[20px] bg-gradient-to-r from-theme-lime via-theme-mint to-theme-purple p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-white/20">
          <div>
            <h4 className="text-lg md:text-xl font-extrabold text-theme-textDark tracking-tight">
              Ready to Transform Your Marketing with AI?
            </h4>
            <p className="text-xs text-theme-textDark/65 font-medium mt-0.5">
              Get setup in less than 3 minutes. Scraping website is completely automated.
            </p>
          </div>

          <button
            onClick={() => navigate('/signup')}
            className="px-8 py-3 bg-[#102B2D] hover:bg-[#1a4447] text-white font-bold text-xs rounded-full shadow-md transition-all duration-200 hover:-translate-y-[2px] shrink-0"
          >
            Start Free
          </button>
        </AnimatedSection>

      </div>
    </section>
  );
};

export default LandingVideoSection;
