import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { useNavigate } from 'react-router-dom';

export const LandingDataBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <AnimatedSection className="relative rounded-[28px] overflow-hidden min-h-[460px] flex items-center justify-end p-8 md:p-16 shadow-md">
          {/* Photographic Background and Dark Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
              alt="Creative workspace board"
              className="w-full h-full object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-[#102B2D]/85 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-l from-[#102B2D]/80 to-transparent" />
          </div>

          {/* Right Sided Content */}
          <div className="relative z-10 w-full max-w-[500px] text-white space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-theme-lime" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-theme-lime">GROWTH SYSTEMS</span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold leading-[1.08] tracking-tight">
              Where Data,<br />
              <span className="text-theme-lime font-extrabold">Creativity and AI</span><br />
              Drive Growth.
            </h3>

            <p className="text-xs text-white/80 leading-relaxed max-w-sm">
              Combine search console analytics with creative copywriting drafts. GrowWise AI matches what your audience actively searches for with content generated in seconds.
            </p>

            <button
              onClick={() => navigate('/signup')}
              className="px-6 py-3 bg-theme-lime hover:bg-[#bceb4c] text-theme-textDark font-bold text-xs rounded-full flex items-center gap-2 transition-all duration-200 hover:-translate-y-[2px]"
            >
              <span>Explore Intelligence</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
          </div>

        </AnimatedSection>
      </div>
    </section>
  );
};

export default LandingDataBanner;
