import React from 'react';
import { AnimatedSection } from './AnimatedSection';

export const LandingMetrics: React.FC = () => {
  const metrics = [
    { value: '10K+', description: 'Campaign Ideas Generated' },
    { value: '3.2M+', description: 'Audience Signals Analysed' },
    { value: '42%', description: 'Average Engagement Lift' },
    { value: '24/7', description: 'AI Performance Intelligence' }
  ];

  return (
    <section className="py-24 bg-white border-t border-theme-border">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 space-y-16">
        
        {/* Section Heading */}
        <AnimatedSection className="max-w-2xl space-y-3">
          <span className="text-xs font-bold text-theme-purple tracking-widest uppercase">
            IMPACT IN NUMBERS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-theme-textDark leading-tight tracking-tight">
            AI Marketing.<br />
            Proven by Performance.
          </h2>
        </AnimatedSection>

        {/* 4 Large Metrics Horizontal Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16">
          {metrics.map((metric, idx) => (
            <AnimatedSection
              key={idx}
              delay={idx * 0.08}
              className="space-y-2 border-l-2 border-theme-border pl-6"
            >
              <h3 className="text-4xl md:text-5xl font-black text-theme-purple tracking-tight leading-none">
                {metric.value}
              </h3>
              <p className="text-xs font-semibold text-theme-textMuted leading-relaxed max-w-[180px]">
                {metric.description}
              </p>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
};

export default LandingMetrics;
