import React from 'react';
import { Check } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { useNavigate } from 'react-router-dom';

export const LandingPricing: React.FC = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Starter',
      price: '$49',
      billing: 'per month',
      desc: 'Perfect for local small businesses starting with digital marketing.',
      features: [
        'AI website audit & fixes',
        '10 monthly social post drafts',
        'Basic competitor keyword log',
        'Weekly email strategy newsletter',
        'Co-Pilot mode only'
      ],
      highlight: false,
      btnStyle: 'bg-theme-lightBg border border-theme-border text-theme-textDark hover:bg-slate-100'
    },
    {
      name: 'Growth',
      price: '$99',
      billing: 'per month',
      desc: 'Ideal for e-commerce shops and scaling digital products.',
      features: [
        'Everything in Starter',
        'Unlimited AI content studio posts',
        'Full competitor tracking audits',
        'Automatic ad budget shifts',
        'Auto-Pilot publishing access',
        'Integrations (Google Ads, Meta, IG)'
      ],
      highlight: true,
      btnStyle: 'bg-[#102B2D] text-white hover:bg-[#1a4447] shadow-md shadow-[#102B2D]/20'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      billing: 'yearly billing',
      desc: 'For creative agencies and large multi-brand marketing operations.',
      features: [
        'Everything in Growth',
        'Dedicated custom AI model tuning',
        'Multi-domain tracking dashboard',
        'API read/write integrations',
        '24/7 custom account support',
        'Tailored team workspace'
      ],
      highlight: false,
      btnStyle: 'bg-theme-lightBg border border-theme-border text-theme-textDark hover:bg-slate-100'
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-theme-lightBg border-b border-theme-border">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 max-w-lg mx-auto">
          <span className="text-xs font-bold text-theme-purple tracking-widest uppercase">
            PLANS & PRICING
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-theme-textDark leading-tight tracking-tight">
            Simple Plans. Powerful AI.
          </h2>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-6">
          {plans.map((plan, idx) => (
            <AnimatedSection
              key={idx}
              delay={idx * 0.08}
              className={`relative rounded-[18px] bg-white border p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.highlight
                  ? 'border-theme-purple lg:-translate-y-3 shadow-xl'
                  : 'border-theme-border shadow-md hover:-translate-y-1'
              }`}
              style={{
                boxShadow: plan.highlight 
                  ? '0 20px 40px rgba(112, 101, 245, 0.06)' 
                  : '0 10px 35px rgba(20, 30, 40, 0.04)'
              }}
            >
              {/* Top highlight gradient tag */}
              {plan.highlight && (
                <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-[18px] bg-gradient-to-r from-theme-lime via-theme-mint to-theme-purple" />
              )}

              {/* Header */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className={`text-xs font-bold tracking-wider uppercase ${
                    plan.highlight ? 'text-theme-purple' : 'text-theme-textMuted'
                  }`}>
                    {plan.name}
                  </span>
                  {plan.highlight && (
                    <span className="bg-theme-purple/10 border border-theme-purple/20 text-theme-purple text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Recommended
                    </span>
                  )}
                </div>
                
                <div className="flex items-baseline gap-1.5">
                  <h3 className="text-3xl font-black text-theme-textDark tracking-tight">{plan.price}</h3>
                  <span className="text-xs text-theme-textMuted font-medium">{plan.billing}</span>
                </div>
                <p className="text-xs text-theme-textMuted leading-relaxed">{plan.desc}</p>
                
                {/* Features divider line */}
                <div className="border-t border-theme-border pt-6" />

                {/* Features List */}
                <ul className="space-y-3">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-theme-textDark/85">
                      <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="leading-normal">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing CTA */}
              <div className="pt-8 mt-8 border-t border-theme-border">
                <button
                  onClick={() => navigate('/signup')}
                  className={`w-full py-3 text-xs font-bold rounded-full transition-all duration-200 hover:-translate-y-[2px] cursor-pointer ${plan.btnStyle}`}
                >
                  Get Started
                </button>
              </div>

            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
};

export default LandingPricing;
