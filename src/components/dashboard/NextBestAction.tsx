import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useMarketing } from '../../context/MarketingContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const NextBestAction: React.FC = () => {
  const { recommendations, applyRecommendation } = useMarketing();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Find first unapplied high-impact recommendation
  const targetRec = recommendations.find(r => !r.applied) || recommendations[0];

  if (!targetRec) {
    return (
      <Card className="bg-[#FFF8F5] border-[#F3DEC8]">
        <div className="flex flex-col items-center text-center p-4">
          <Sparkles className="w-8 h-8 text-[#D94A2A] mb-2" />
          <h3 className="text-sm font-black text-[#1E122C]">All recommendations applied!</h3>
          <p className="text-xs text-[#6B5E77] mt-1 max-w-sm">
            Your AI manager has completed all scheduled optimization tasks. We are continuously monitoring your accounts.
          </p>
        </div>
      </Card>
    );
  }

  const handleLetAIDoIt = async () => {
    setLoading(true);
    await applyRecommendation(targetRec.id);
    setLoading(false);
    navigate('/actions');
  };

  return (
    <Card className="border-[#F3DEC8] relative overflow-hidden bg-gradient-to-br from-white to-[#FFF8F5]">
      {/* Sparkles background effect */}
      <div className="absolute right-0 top-0 p-4 opacity-10">
        <Sparkles className="w-24 h-24 text-[#4B1D6B]" />
      </div>

      <div className="space-y-4 relative z-10 text-left">
        {/* Header Title */}
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D94A2A] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D94A2A]"></span>
          </span>
          <h3 className="text-[10px] font-black uppercase tracking-wider text-[#D94A2A]">Your Next Best Action</h3>
        </div>

        {/* Content details */}
        <div>
          <h4 className="text-lg font-black text-[#1E122C] leading-tight">
            {targetRec.title}
          </h4>
          <p className="text-xs font-medium text-[#6B5E77] mt-2 leading-relaxed">
            {targetRec.why}
          </p>
        </div>

        {/* Action / Value Box */}
        <div className="bg-[#FAF5F0] border border-[#F3DEC8] rounded-2xl p-4 shadow-3xs">
          <h5 className="text-[10px] font-black text-[#6B5E77] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D94A2A]" />
            Why this matters
          </h5>
          <p className="text-xs font-semibold text-[#1E122C] leading-relaxed">
            Addressing this now is the fastest way to get more visitors and customer sign-ups. Your competitors are currently capturing 12 critical searches related to your products.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
          <Button
            variant="primary"
            onClick={handleLetAIDoIt}
            isLoading={loading}
            className="flex-1 sm:flex-none justify-center"
          >
            <span>Let AI do it</span>
            <ArrowRight className="w-4 h-4 ml-1.5 shrink-0" />
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate('/discover')}
            disabled={loading}
            className="flex-1 sm:flex-none justify-center"
          >
            View opportunity
          </Button>
        </div>
      </div>
    </Card>
  );
};
export default NextBestAction;
