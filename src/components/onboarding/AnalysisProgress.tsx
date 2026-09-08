import React, { useEffect, useState } from 'react';
import { Sparkles, Check, Globe, FileText, Compass, AlertCircle, ArrowRight, Cpu, Target, Zap } from 'lucide-react';
import { Progress } from '../ui/Progress';
import { Card } from '../ui/Card';

interface AnalysisProgressProps {
  progress: number;
  businessName: string;
  websiteUrl: string;
  industry: string;
  description: string;
  onContinue: () => void;
  onBack: () => void;
}

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({
  progress,
  businessName,
  websiteUrl,
  industry,
  description,
  onContinue,
  onBack
}) => {
  const [activeMessage, setActiveMessage] = useState('Analyzing target domain structure...');

  const steps = [
    { label: 'Understanding your business', minVal: 0 },
    { label: 'Checking your website', minVal: 20 },
    { label: 'Finding competitors', minVal: 45 },
    { label: 'Finding opportunities', minVal: 65 },
    { label: 'Creating your marketing plan', minVal: 85 }
  ];

  const insights = [
    'Scraped website homepage metadata',
    'Analyzing brand content structure',
    'Found 14 high-value SEO search opportunities',
    'Found 3 primary local market competitors',
    'Detected mobile layout optimization paths',
    'Drafting automated content calendars...',
    'Creating first marketing optimization blueprint'
  ];

  useEffect(() => {
    const index = Math.min(
      Math.floor((progress / 100) * insights.length),
      insights.length - 1
    );
    setActiveMessage(insights[index]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  // When loading is finished (progress === 100), display the fetched data results dashboard
  if (progress === 100) {
    return (
      <div className="space-y-5 text-left animate-in fade-in duration-400">
        
        {/* Title block */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Website Analysis Complete</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#151A1F] tracking-tight leading-tight pt-1">
            Here's what Aura found
          </h2>
          <p className="text-[12px] text-slate-500 font-semibold leading-relaxed">
            Verify the details fetched from your website before continuing.
          </p>
        </div>

        {/* Results grid */}
        <div className="space-y-3.5">
          
          {/* Main Info Card */}
          <Card className="border-slate-150 bg-white p-4.5 rounded-2xl shadow-xs space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Business Name */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Business Name</span>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100/50 flex items-center justify-center text-[#5C4DF7]">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">{businessName || 'Bloom Boutique'}</span>
                </div>
              </div>

              {/* Website URL */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Website URL</span>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100/50 flex items-center justify-center text-[#5C4DF7]">
                    <Globe className="w-4 h-4" />
                  </div>
                  <a href={websiteUrl} target="_blank" rel="noreferrer" className="text-xs font-bold text-[#5C4DF7] hover:underline truncate">
                    {websiteUrl || 'https://bloomboutique.shop'}
                  </a>
                </div>
              </div>

            </div>

            <div className="border-t border-slate-100 pt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Detected Industry */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Detected Category</span>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100/50 flex items-center justify-center text-[#5C4DF7]">
                    <Compass className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">{industry || 'E-commerce / Retail'}</span>
                </div>
              </div>

              {/* Competitors & Opportunities counts (Clean vector icons instead of raw emojis) */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Scraped Insight Data</span>
                <div className="flex items-center gap-3 pt-0.5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-slate-700 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded shadow-2xs">
                    <Target className="w-3.5 h-3.5 text-[#5C4DF7]" />
                    <span>3 Competitors</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-slate-700 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded shadow-2xs">
                    <Zap className="w-3.5 h-3.5 text-[#5C4DF7]" />
                    <span>14 Opportunities</span>
                  </span>
                </div>
              </div>

            </div>
          </Card>

          {/* Scraped Description Card */}
          <Card className="border-slate-150 bg-white p-4.5 rounded-2xl shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Scraped Brand Description</span>
            <div className="flex gap-2.5 items-start">
              <FileText className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-650 font-semibold leading-relaxed">
                {description || 'Handcrafted eco-friendly clothing for minimalist wardrobes. Focuses on premium organic threads and sustainable sourcing.'}
              </p>
            </div>
          </Card>

          {/* Key Recommendation banner */}
          <div className="p-3 bg-[#5C4DF7]/3 border border-[#5C4DF7]/10 rounded-2xl flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#5C4DF7] shrink-0 mt-0.5" />
            <div className="text-left space-y-0.5">
              <h5 className="text-[10.5px] font-bold text-slate-800">Primary AI Recommendation</h5>
              <p className="text-[9.5px] text-slate-500 font-semibold leading-normal">
                Optimize organic SEO keywords and enhance product category call-to-actions on mobile views to maximize visitor-to-customer conversion.
              </p>
            </div>
          </div>

        </div>

        {/* Stepper Progress Navigation Bar */}
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
            <span className="text-[10px] text-slate-450 font-bold">Step 2 of 5</span>
            <div className="w-[100px] bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#5C4DF7] h-full rounded-full transition-all duration-500" style={{ width: '40%' }} />
            </div>
          </div>

          {/* Continue Button */}
          <button
            type="button"
            onClick={onContinue}
            className="inline-flex items-center gap-1 px-5 py-2.5 bg-[#5C4DF7] hover:bg-[#4b3ce3] text-white font-extrabold text-xs rounded-full transition-all duration-200 hover:-translate-y-[1.5px] cursor-pointer shadow-xs active:translate-y-0"
          >
            <span>Continue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    );
  }

  // Loading phase view
  return (
    <div className="space-y-6 max-w-md mx-auto text-center py-6 animate-in fade-in duration-300">
      <div className="space-y-3">
        {/* Glow Sparkle circle */}
        <div className="w-16 h-16 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 mx-auto shadow-md shadow-brand-100/50 relative">
          <Sparkles className="w-8 h-8 animate-spin text-brand-500" style={{ animationDuration: '3.5s' }} />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-500"></span>
          </span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight leading-tight">
          Analyzing your <span className="font-serif italic text-brand-650">brand...</span>
        </h2>
        <p className="text-xs text-slate-500 font-medium">This takes just a moment. I'm exploring your digital footprint.</p>
      </div>

      {/* Checklist box */}
      <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 text-left space-y-4 max-w-sm mx-auto">
        {steps.map((step, idx) => {
          const isDone = progress > step.minVal + 15 || progress === 100;
          const isActive = progress >= step.minVal && progress <= step.minVal + 15 && progress < 100;
          
          return (
            <div key={idx} className="flex items-center gap-3 text-xs">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                isDone 
                  ? 'bg-[#5C4DF7] border-[#5C4DF7] text-white' 
                  : isActive 
                    ? 'bg-indigo-50 border-indigo-300 text-[#5C4DF7] font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-350'
              }`}>
                {isDone ? (
                  <Check className="w-3 h-3 text-white" />
                ) : isActive ? (
                  <span className="w-1.5 h-1.5 bg-[#5C4DF7] rounded-full animate-ping" />
                ) : (
                  <span className="text-[10px]">{idx + 1}</span>
                )}
              </div>
              <span className={`font-semibold ${
                isDone ? 'text-slate-700' : isActive ? 'text-[#5C4DF7]' : 'text-slate-400'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress Bar & dynamic insights */}
      <div className="space-y-4">
        <Progress value={progress} />
        
        {/* Insight message container (Lucide Sparkles instead of raw emoji) */}
        <div className="h-12 flex items-center justify-center">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#5C4DF7] font-bold bg-indigo-50/50 border border-indigo-100/50 px-4 py-2.5 rounded-2xl animate-pulse">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>{activeMessage}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisProgress;
