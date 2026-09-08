import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface MarketAudienceStepProps {
  initialLocation: string;
  initialAudienceType: 'B2B' | 'B2C' | 'Both' | '';
  initialAudienceDesc: string;
  onContinue: (data: { location: string; targetAudienceType: 'B2B' | 'B2C' | 'Both'; targetAudienceDesc: string }) => void;
  onBack: () => void;
}

export const MarketAudienceStep: React.FC<MarketAudienceStepProps> = ({
  initialLocation,
  initialAudienceType,
  initialAudienceDesc,
  onContinue,
  onBack
}) => {
  const [location, setLocation] = useState(initialLocation || '');
  const [audienceType, setAudienceType] = useState<'B2B' | 'B2C' | 'Both' | ''>(initialAudienceType || '');
  const [audienceDesc, setAudienceDesc] = useState(initialAudienceDesc || '');
  const [error, setError] = useState('');

  const types = [
    { id: 'B2C', label: 'B2C', desc: 'Direct to Consumer' },
    { id: 'B2B', label: 'B2B', desc: 'Business to Business' },
    { id: 'Both', label: 'Both', desc: 'Hybrid Model' }
  ] as const;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) {
      setError('Please specify your target market location');
      return;
    }
    if (!audienceType) {
      setError('Please select your target audience type');
      return;
    }
    if (!audienceDesc.trim()) {
      setError('Please describe your target audience profile');
      return;
    }
    setError('');
    onContinue({ location, targetAudienceType: audienceType, targetAudienceDesc: audienceDesc });
  };

  return (
    <div className="space-y-6 max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="text-center space-y-1.5">
        <h2 className="text-2.5xl font-extrabold text-slate-800 tracking-tight leading-tight">
          Who is your target <span className="font-serif italic text-brand-650">audience?</span>
        </h2>
        <p className="text-xs text-slate-500 font-medium leading-relaxed font-medium">Define your customer location and segments for tailored AI generation.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Location & Target Market */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Location & Target Market</label>
          <input
            type="text"
            placeholder="e.g. New York, USA or Worldwide, Remote"
            value={location}
            onChange={(e) => { setLocation(e.target.value); setError(''); }}
            className="w-full border border-slate-200/80 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 bg-white text-slate-800 font-medium transition-all duration-200"
          />
        </div>

        {/* Target Audience Type Selection */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Audience Segment</label>
          <div className="grid grid-cols-3 gap-2.5">
            {types.map((t) => {
              const isSelected = audienceType === t.id;
              return (
                <Card
                  key={t.id}
                  hoverable
                  onClick={() => { setAudienceType(t.id); setError(''); }}
                  className={`flex flex-col text-left p-3.5 border transition-all duration-300 cursor-pointer rounded-2xl justify-between h-20 hover:shadow-md ${
                    isSelected
                      ? 'border-brand-500 bg-brand-50/10 shadow-xs'
                      : 'border-slate-150 bg-white hover:border-slate-250'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <h4 className="text-xs font-extrabold text-slate-850 leading-tight">{t.label}</h4>
                    <input
                      type="radio"
                      name="audienceType"
                      checked={isSelected}
                      onChange={() => { setAudienceType(t.id); setError(''); }}
                      className="h-3.5 w-3.5 rounded-full border-slate-300 text-brand-650 focus:ring-brand-500 cursor-pointer shrink-0"
                    />
                  </div>
                  <p className="text-[9px] text-slate-450 font-bold uppercase tracking-wide leading-tight mt-1">{t.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Target Audience Description */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Ideal Customer Profile</label>
          <textarea
            rows={3}
            placeholder="e.g. Eco-conscious homeowners looking to reduce energy bills with sustainable smart gadgets."
            value={audienceDesc}
            onChange={(e) => { setAudienceDesc(e.target.value); setError(''); }}
            className="w-full border border-slate-200/80 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 bg-white text-slate-800 leading-relaxed font-medium transition-all duration-200"
          />
        </div>

        {error && <p className="text-xs text-red-500 text-center font-bold">{error}</p>}

      {/* Mockup Bottom Navigation Bar */}
      <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-6 mb-6">
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
          <span className="text-[10px] text-slate-450 font-bold">Step 4 of 5</span>
          <div className="w-[100px] bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#5C4DF7] h-full rounded-full transition-all duration-500" style={{ width: '80%' }} />
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
export default MarketAudienceStep;
