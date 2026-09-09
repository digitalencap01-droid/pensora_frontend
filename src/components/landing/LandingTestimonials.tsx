import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

export const LandingTestimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote: "GrowWise AI felt like having a senior marketing expert working in our dashboard 24/7. It identified layout problems on our checkout page and redrafted our Google Ad campaigns, helping us grow sales by 38% in less than 3 weeks.",
      author: "Sarah Jenkins",
      role: "Founder, Bloom Boutique",
      stat: "+38% ROAS",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100"
    },
    {
      quote: "Before GrowWise AI, we spent 15 hours a week coordinating blogs, Instagram templates, and search tags. Now, the AI researches active Portland search trends, writes drafts, and queues drafts automatically. A huge relief.",
      author: "Marcus Chen",
      role: "Operations Lead, Greenhouse Coffee",
      stat: "2.4× Engagement",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
    },
    {
      quote: "We connected our Search Console and within 10 minutes GrowWise AI identified 14 high-value organic search queries that we weren't ranking for. The content draft it created ranking on Google in days.",
      author: "Elena Rostova",
      role: "Marketing Manager, Acme Digital",
      stat: "42 hrs Saved Monthly",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100"
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-white border-b border-theme-border">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column (Rounded Image Showcase) */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-start">
          <AnimatedSection className="relative w-full max-w-[400px] lg:max-w-none">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=600"
              alt="Marketing manager review testimonial"
              className="w-full aspect-[4/5] object-cover rounded-[30px] border border-theme-border shadow-sm relative z-10"
              loading="lazy"
            />
            {/* Soft decorative accent underlay */}
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-theme-lime/25 rounded-3xl blur-xl z-0" />
          </AnimatedSection>
        </div>

        {/* Right Column (Intake Testimonials Slider) */}
        <div className="lg:col-span-7 space-y-8">
          <AnimatedSection className="space-y-4">
            <span className="text-xs font-bold text-theme-purple tracking-widest uppercase">
              CLIENT TESTIMONIALS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-theme-textDark leading-tight tracking-tight">
              What Marketing Teams<br />Are Saying.
            </h2>
          </AnimatedSection>

          {/* Testimonial Active Slide */}
          <AnimatedSection delay={0.08} className="space-y-6">
            <div className="relative bg-theme-lightBg border border-theme-border rounded-[20px] p-8 space-y-6">
              
              {/* Quote Icon */}
              <div className="w-10 h-10 rounded-xl bg-white border border-theme-border flex items-center justify-center text-theme-purple">
                <Quote className="w-5 h-5 fill-current" />
              </div>

              {/* Quote Text */}
              <p className="text-sm md:text-base text-theme-textDark leading-relaxed font-medium italic">
                "{testimonials[activeIndex].quote}"
              </p>

              {/* User profile & metrics details */}
              <div className="flex flex-wrap justify-between items-center gap-4 pt-4 border-t border-theme-border/60">
                <div className="flex items-center gap-3">
                  <img
                    src={testimonials[activeIndex].avatar}
                    alt={testimonials[activeIndex].author}
                    className="w-11 h-11 rounded-full object-cover border border-theme-border"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-theme-textDark">{testimonials[activeIndex].author}</h4>
                    <p className="text-[10px] text-theme-textMuted font-medium">{testimonials[activeIndex].role}</p>
                  </div>
                </div>

                {/* Highlight metric badge */}
                <div className="flex items-center gap-1.5 bg-theme-purple/10 border border-theme-purple/20 px-3 py-1.5 rounded-full text-[10px] font-bold text-theme-purple">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{testimonials[activeIndex].stat}</span>
                </div>
              </div>

            </div>

            {/* Slider Navigation arrows */}
            <div className="flex justify-between items-center">
              {/* Dot Indicators */}
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      idx === activeIndex ? 'bg-theme-purple w-6' : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-theme-border hover:bg-slate-50 flex items-center justify-center text-theme-textDark transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-theme-border hover:bg-slate-50 flex items-center justify-center text-theme-textDark transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>

      </div>
    </section>
  );
};

export default LandingTestimonials;
