import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, Compass, ShieldAlert, Award } from 'lucide-react';
import { Insight } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useMarketing } from '../../context/MarketingContext';

interface InsightCardProps {
  insight: Insight;
  onActionComplete?: () => void;
}

export const InsightCard: React.FC<InsightCardProps> = ({ insight, onActionComplete }) => {
  const { createContentItem, fixWebsiteIssue } = useMarketing();
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);

  const getCategoryDetails = (category: string) => {
    switch (category) {
      case 'audience':
        return { label: 'Customer Demand', icon: <Compass className="w-4.5 h-4.5 text-[#D94A2A]" />, badge: 'brand' as const };
      case 'competitors':
        return { label: 'Competitor Intel', icon: <ShieldAlert className="w-4.5 h-4.5 text-[#4B1D6B]" />, badge: 'warning' as const };
      default:
        return { label: 'Growth Opportunity', icon: <Award className="w-4.5 h-4.5 text-emerald-600" />, badge: 'success' as const };
    }
  };

  const handleAction = async () => {
    setLoading(true);
    try {
      if (insight.category === 'audience') {
        await createContentItem('Sustainable Capsule Wardrobe care guide', 'blog');
      } else if (insight.category === 'competitors') {
        await createContentItem('Artisan Handmade Brass Jewelry Process', 'social');
      } else {
        await fixWebsiteIssue('w_2');
      }
      setApplied(true);
      if (onActionComplete) onActionComplete();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const details = getCategoryDetails(insight.category);

  return (
    <Card hoverable className="border-[#F3DEC8]">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#F3DEC8]/70 pb-3">
          <div className="flex items-center gap-2">
            {details.icon}
            <span className="text-xs font-black text-[#1E122C]">{details.label}</span>
          </div>
          <Badge variant={details.badge}>Active Insight</Badge>
        </div>

        {/* Insight content breakdown: What, Why, Action */}
        <div className="space-y-3.5 text-xs text-[#6B5E77]">
          <div>
            <h5 className="font-black text-[#6B5E77] uppercase tracking-wider text-[9.5px] mb-1">What we found</h5>
            <p className="leading-relaxed font-black text-[#1E122C]">{insight.what}</p>
          </div>

          <div>
            <h5 className="font-black text-[#6B5E77] uppercase tracking-wider text-[9.5px] mb-1">Why this matters</h5>
            <p className="leading-relaxed text-[#6B5E77] font-medium">{insight.why}</p>
          </div>

          <div className="bg-[#FFF8F5] border border-[#F3DEC8] rounded-2xl p-3.5">
            <h5 className="font-black text-[#D94A2A] uppercase tracking-wider text-[9.5px] mb-1">AI Action Recommendation</h5>
            <p className="leading-relaxed text-[#1E122C] font-semibold">{insight.action}</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-1 flex justify-end">
          {applied ? (
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-[#F4FDF8] border border-emerald-200 rounded-xl px-4 py-2 font-black">
              <Check className="w-3.5 h-3.5" />
              <span>Added to Actions</span>
            </div>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={handleAction}
              isLoading={loading}
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 shrink-0" />
              <span>Create with AI</span>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
export default InsightCard;
