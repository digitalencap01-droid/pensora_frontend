import React from 'react';
import { Compass, HelpCircle } from 'lucide-react';
import { useMarketing } from '../context/MarketingContext';
import { InsightCard } from '../components/discover/InsightCard';
import { EmptyState } from '../components/ui/EmptyState';

export const Discover: React.FC = () => {
  const { insights, isLoading } = useMarketing();

  const customerInsights = insights.filter(i => i.category === 'audience');
  const competitorInsights = insights.filter(i => i.category === 'competitors');
  const growthInsights = insights.filter(i => i.category === 'growth');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-[#1E122C] tracking-tight">Discover</h1>
        <p className="text-xs sm:text-sm text-[#6B5E77] font-medium">Here is what GrowWise AI found about your active market and target audience.</p>
      </div>

      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 rounded-full border-4 border-[#4B1D6B] border-t-transparent animate-spin" />
          <p className="text-xs text-[#6B5E77] font-semibold">Gathering market trends...</p>
        </div>
      ) : insights.length === 0 ? (
        <EmptyState
          icon={<Compass className="w-8 h-8" />}
          title="No insights detected yet"
          description="Your AI is currently crawling search volumes. Connect your search console to accelerate this."
          actionText="Connect Search Console"
          onAction={() => {}}
        />
      ) : (
        <div className="space-y-8">
          {/* Section 1: Customer Demand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D94A2A]"></span>
              <h3 className="text-xs font-black text-[#1E122C] uppercase tracking-wider">1. What customers want</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {customerInsights.map((insight) => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </div>
          </div>

          {/* Section 2: Competitor Intel */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4B1D6B]"></span>
              <h3 className="text-xs font-black text-[#1E122C] uppercase tracking-wider">2. What competitors are doing</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {competitorInsights.map((insight) => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </div>
          </div>

          {/* Section 3: Growth Shortcuts */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <h3 className="text-xs font-black text-[#1E122C] uppercase tracking-wider">3. Where you can grow</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {growthInsights.map((insight) => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Discover;
