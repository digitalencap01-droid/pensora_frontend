import React from 'react';
import { Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import { useMarketing } from '../context/MarketingContext';
import { AIRecommendation } from '../components/ai/AIRecommendation';
import { EmptyState } from '../components/ui/EmptyState';

export const Recommendations: React.FC = () => {
  const { recommendations, isLoading } = useMarketing();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-[#1E122C] tracking-tight flex items-center gap-2">
          AI Recommendations
          <Sparkles className="w-5 h-5 text-[#D94A2A] animate-pulse" />
        </h1>
        <p className="text-xs sm:text-sm text-[#6B5E77] font-medium">
          Aura continually audits your connected accounts and searches to find shortcuts to get customers.
        </p>
      </div>

      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 rounded-full border-4 border-[#4B1D6B] border-t-transparent animate-spin" />
          <p className="text-xs text-[#6B5E77] font-semibold">Generating recommendations...</p>
        </div>
      ) : recommendations.length === 0 ? (
        <EmptyState
          icon={<Compass className="w-8 h-8" />}
          title="No recommendations yet"
          description="Your AI is scanning keywords. Connect more ad and search accounts to find options."
          actionText="Connect accounts"
          onAction={() => {}}
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 max-w-3xl">
          {recommendations.map((rec) => (
            <AIRecommendation key={rec.id} recommendation={rec} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Recommendations;
