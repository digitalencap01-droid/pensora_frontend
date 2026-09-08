import React from 'react';
import { ArrowLeft, Sparkles, Check, ListTodo, Lightbulb } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface AISummaryStepProps {
  businessData: {
    name: string;
    industry: string;
    stage: string;
    productsServices: string[];
    targetAudienceDesc: string;
    channels: string[];
    growthGoal: string;
  };
  onConfirm: (data: { aiSummary: string; recommendedFirstAction: string }) => void;
  onBack: () => void;
}

export const AISummaryStep: React.FC<AISummaryStepProps> = ({
  businessData,
  onConfirm,
  onBack
}) => {
  // Generate the AI summary dynamically based on onboarding choices
  const generateSummary = () => {
    const { name, industry, stage, productsServices, targetAudienceDesc, channels } = businessData;
    const channelsText = channels?.length > 0 
      ? channels.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(' and ') 
      : 'digital marketing channels';
    const productsText = productsServices?.length > 0 
      ? productsServices.slice(0, 2).join(' and ') 
      : 'products';

    return `${name} is an active, ${stage} brand operating in the ${industry} industry. The business offers ${productsText} tailored for ${targetAudienceDesc || 'online consumers'}, primarily leveraging ${channelsText} to reach target audiences and drive strategic engagement.`;
  };

  // Generate the first recommended action dynamically
  const generateFirstAction = () => {
    const { growthGoal, productsServices } = businessData;
    const item = productsServices?.[0] || 'your core services';
    switch (growthGoal) {
      case 'sales':
        return `Launch a targeted product conversion campaign focusing on your best-selling offering: "${item}".`;
      case 'leads':
        return `Create a high-converting lead magnet popup (e.g., a newsletter sign-up discount) on your homepage to capture customer emails.`;
      case 'awareness':
        return `Initiate organic content search indexing on Google Ads for key terms matching "${item}".`;
      case 'retention':
        return `Configure an automated email post-purchase re-engagement flow for customers who bought "${item}".`;
      case 're-engagement':
        return `Send a "We Miss You" newsletter offering a 10% coupon to cold subscribers.`;
      default:
        return `Verify search engine index status on Google Search Console to uncover organic visibility opportunities.`;
    }
  };

  const summary = generateSummary();
  const firstAction = generateFirstAction();

  const handleConfirm = () => {
    onConfirm({ aiSummary: summary, recommendedFirstAction: firstAction });
  };

  return (
    <div className="space-y-6 max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-3 duration-300">
      <div className="text-center space-y-2">
        <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center mx-auto text-brand-650 mb-1.5 shadow-sm shadow-brand-100">
          <Sparkles className="w-5 h-5 text-brand-500 animate-pulse" />
        </div>
        <h2 className="text-2.5xl font-extrabold text-slate-800 tracking-tight leading-tight">
          AI Profile <span className="font-serif italic text-brand-650">Summary</span>
        </h2>
        <p className="text-xs text-slate-500 font-medium">Aura has compiled your inputs into a strategic profile. Review the initial understanding below.</p>
      </div>

      <div className="space-y-4">
        {/* Generated Summary Card */}
        <Card className="border-brand-200 bg-brand-50/5 p-5 relative overflow-hidden rounded-2xl shadow-xs">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-100/10 rounded-full -mr-8 -mt-8 pointer-events-none" />
          <div className="flex gap-3">
            <Sparkles className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
            <div className="space-y-1 text-left">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Generated Business Summary</h4>
              <p className="text-xs text-slate-650 leading-relaxed font-semibold pt-1">
                "{summary}"
              </p>
            </div>
          </div>
        </Card>

        {/* Dynamic First Recommended Action */}
        <Card className="border-slate-100 bg-white p-5 rounded-2xl shadow-xs">
          <div className="flex gap-3">
            <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1.5 text-left w-full">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recommended First Action</h4>
              <div className="bg-amber-50/20 border border-amber-100/60 rounded-2xl p-4 mt-2 flex gap-3 items-start">
                <div className="p-1.5 rounded-lg bg-amber-500 text-white shrink-0 mt-0.5">
                  <ListTodo className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-800 leading-tight">Priority Task</h5>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1 font-semibold">
                    {firstAction}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

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
          <span className="text-[10px] text-slate-450 font-bold">Step 5 of 5</span>
          <div className="w-[100px] bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#5C4DF7] h-full rounded-full transition-all duration-500" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Confirm & Launch Button */}
        <button
          type="button"
          onClick={handleConfirm}
          className="inline-flex items-center gap-1 px-5 py-2.5 bg-[#5C4DF7] hover:bg-[#4b3ce3] text-white font-extrabold text-xs rounded-full transition-all duration-200 hover:-translate-y-[1.5px] cursor-pointer shadow-xs active:translate-y-0"
        >
          <span>Confirm & Launch</span>
          <Check className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
export default AISummaryStep;
