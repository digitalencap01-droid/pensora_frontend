import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface BusinessDetailsStepProps {
  initialIndustry: string;
  initialStage: 'new' | 'active' | 'growing' | 'established' | '';
  onContinue: (data: { industry: string; stage: 'new' | 'active' | 'growing' | 'established' }) => void;
  onBack: () => void;
}

export const BusinessDetailsStep: React.FC<BusinessDetailsStepProps> = ({
  initialIndustry,
  initialStage,
  onContinue,
  onBack
}) => {
  const [industry, setIndustry] = useState(initialIndustry || '');
  const [stage, setStage] = useState<'new' | 'active' | 'growing' | 'established' | ''>(initialStage || '');
  const [error, setError] = useState('');

  const industries = [
    { label: 'Sustainable Fashion', emoji: '👗' },
    { label: 'Food & Beverage', emoji: '🍔' },
    { label: 'Retail & E-commerce', emoji: '🛍️' },
    { label: 'SaaS & Software', emoji: '💻' },
    { label: 'Professional Services', emoji: '💼' },
    { label: 'Health & Wellness', emoji: '🌿' },
    { label: 'Education & Training', emoji: '🎓' }
  ];

  const stages = [
    { id: 'new', title: 'New', desc: 'Pre-revenue or startup idea.' },
    { id: 'active', title: 'Active', desc: 'Operational with routine sales.' },
    { id: 'growing', title: 'Growing', desc: 'Scaling customer volume.' },
    { id: 'established', title: 'Established', desc: 'Stable, predictable recurring base.' }
  ] as const;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!industry.trim()) {
      setError('Please select or enter an industry category');
      return;
    }
    if (!stage) {
      setError('Please select your business stage');
      return;
    }
    setError('');
    onContinue({ industry, stage });
  };

  return (
    <div className="space-y-6 max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="text-center space-y-1.5">
        <h2 className="text-2.5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Tell us about your <span className="font-serif italic text-brand-650">business</span>
        </h2>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">This helps Aura configure content templates and default settings.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Industry / Category Field */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Industry / Category</label>
          <div className="grid grid-cols-2 gap-2">
            {industries.map((ind) => {
              const isSelected = industry === ind.label;
              return (
                <button
                  type="button"
                  key={ind.label}
                  onClick={() => { setIndustry(ind.label); setError(''); }}
                  className={`px-3.5 py-2.5 rounded-2xl border text-xs font-semibold text-left transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'border-brand-500 bg-brand-50/15 text-brand-700 shadow-xs'
                      : 'border-slate-150 bg-white text-slate-650 hover:border-slate-300 hover:bg-slate-50/45'
                  }`}
                >
                  <span className="text-sm">{ind.emoji}</span>
                  <span className="truncate">{ind.label}</span>
                </button>
              );
            })}
          </div>
          
          <div className="pt-1">
            <input
              type="text"
              placeholder="Or write custom category..."
              value={industries.some(i => i.label === industry) ? '' : industry}
              onChange={(e) => { setIndustry(e.target.value); setError(''); }}
              className="w-full border border-slate-200/80 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 bg-white text-slate-800 font-medium transition-all duration-200"
            />
          </div>
        </div>

        {/* Business Stage Field */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Business Stage</label>
          <div className="grid grid-cols-2 gap-2.5">
            {stages.map((stg) => {
              const isSelected = stage === stg.id;
              return (
                <Card
                  key={stg.id}
                  hoverable
                  onClick={() => { setStage(stg.id); setError(''); }}
                  className={`flex flex-col text-left p-3.5 border transition-all duration-300 cursor-pointer rounded-2xl hover:shadow-md justify-between h-20 ${
                    isSelected
                      ? 'border-brand-500 bg-brand-50/10 shadow-xs'
                      : 'border-slate-150 bg-white hover:border-slate-250'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <h4 className="text-xs font-bold text-slate-850 leading-tight">{stg.title}</h4>
                    <input
                      type="radio"
                      name="stage"
                      checked={isSelected}
                      onChange={() => { setStage(stg.id); setError(''); }}
                      className="h-3.5 w-3.5 rounded-full border-slate-300 text-brand-650 focus:ring-brand-500 cursor-pointer shrink-0"
                    />
                  </div>
                  <p className="text-[9px] text-slate-450 mt-1 font-semibold leading-normal">{stg.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {error && <p className="text-xs text-red-500 text-center font-bold">{error}</p>}

      {/* Mockup Bottom Navigation Bar */}
      <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-6">
        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2 border border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 rounded-full text-xs font-bold text-slate-555 transition-all duration-200 cursor-pointer"
        >
          Back
        </button>

        {/* Center Progress Bar */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-slate-450 font-bold">Step 1 of 4</span>
          <div className="w-[100px] bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#5C4DF7] h-full rounded-full transition-all duration-500" style={{ width: '25%' }} />
          </div>
        </div>

        {/* Continue Button */}
        <button
          type="submit"
          className="inline-flex items-center gap-1 px-5 py-2.5 bg-[#5C4DF7] hover:bg-[#4b3ce3] text-white font-extrabold text-xs rounded-full transition-all duration-200 hover:-translate-y-[1.5px] cursor-pointer shadow-xs active:translate-y-0"
        >
          <span>Continue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
      </form>
    </div>
  );
};
export default BusinessDetailsStep;
