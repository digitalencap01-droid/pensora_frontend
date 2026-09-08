import React, { useState } from 'react';
import { TrendingUp, ArrowRight, Check } from 'lucide-react';
import { Recommendation } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useMarketing } from '../../context/MarketingContext';

interface AIRecommendationProps {
  recommendation: Recommendation;
}

export const AIRecommendation: React.FC<AIRecommendationProps> = ({ recommendation }) => {
  const { applyRecommendation } = useMarketing();
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    setLoading(true);
    await applyRecommendation(recommendation.id);
    setLoading(false);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'success';
      case 'Medium': return 'warning';
      default: return 'neutral';
    }
  };

  return (
    <Card hoverable className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-[#F3DEC8] bg-white">
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant={getImpactColor(recommendation.impact)}>
            {recommendation.impact} Impact
          </Badge>
          <span className="text-[10.5px] text-[#6B5E77] font-semibold">Recommended Setup</span>
        </div>
        
        <div>
          <h4 className="text-base font-black text-[#1E122C] flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#D94A2A] shrink-0" />
            {recommendation.title}
          </h4>
          <p className="text-xs sm:text-sm text-[#6B5E77] mt-1 leading-relaxed font-medium">
            {recommendation.why}
          </p>
        </div>

        <div className="bg-[#FFF8F5] rounded-2xl p-3.5 text-xs text-[#1E122C] flex items-start gap-2 border border-[#F3DEC8]">
          <span className="font-black text-[#D94A2A] uppercase tracking-wider text-[9.5px] mt-0.5 shrink-0">ACTION:</span>
          <span className="font-semibold">{recommendation.action}</span>
        </div>
      </div>

      <div className="shrink-0 flex items-center md:self-center">
        {recommendation.applied ? (
          <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-[#F4FDF8] border border-emerald-200 rounded-xl px-4 py-2.5 font-black">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Applied by AI</span>
          </div>
        ) : (
          <Button
            variant="primary"
            onClick={handleApply}
            isLoading={loading}
            className="w-full md:w-auto text-xs py-2.5 px-4"
          >
            <span>Do this with AI</span>
            <ArrowRight className="w-4 h-4 ml-1.5 shrink-0" />
          </Button>
        )}
      </div>
    </Card>
  );
};
export default AIRecommendation;
