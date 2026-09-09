import React, { useState } from 'react';
import { TrendingUp, AlertTriangle, Play, Pause, ChevronDown, ChevronUp, BarChart2 } from 'lucide-react';
import { useMarketing } from '../context/MarketingContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const Ads: React.FC = () => {
  const { adCampaigns, toggleAdCampaign } = useMarketing();
  const [showAdvanced, setShowAdvanced] = useState<Record<string, boolean>>({});
  
  const toggleAdvanced = (id: string) => {
    setShowAdvanced(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const activeCampaigns = adCampaigns.filter(ad => ad.status === 'active');
  const warningCampaigns = adCampaigns.filter(ad => ad.status === 'needs_attention');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-[#1E122C] tracking-tight">Your advertising</h1>
        <p className="text-xs sm:text-sm text-[#6B5E77] font-medium">
          GrowWise AI monitors your paid search and social campaigns, optimizing budgets automatically to save you money.
        </p>
      </div>

      {/* Campaigns list */}
      <div className="space-y-6 max-w-3xl">
        {adCampaigns.map((camp) => {
          const isWarning = camp.status === 'needs_attention';
          const isActive = camp.status === 'active';
          const isPaused = camp.status === 'paused';
          const isAdvancedOpen = showAdvanced[camp.id];

          return (
            <Card key={camp.id} hoverable className={`border-[#F3DEC8] transition-all ${
              isWarning ? 'border-amber-300 bg-[#FFFDF9]' : isPaused ? 'bg-[#FAF5F0]/60' : 'bg-white'
            }`}>
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#F3DEC8]/70 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      isWarning ? 'bg-amber-500 animate-pulse' : isActive ? 'bg-emerald-600' : 'bg-[#6B5E77]/40'
                    }`} />
                    <h3 className="text-xs sm:text-sm font-black text-[#1E122C]">{camp.name}</h3>
                  </div>
                  <Badge variant={isWarning ? 'warning' : isActive ? 'success' : 'neutral'}>
                    {camp.status.replace('_', ' ')}
                  </Badge>
                </div>

                {/* AI Warning Analysis box */}
                {isWarning && camp.issue && (
                  <div className="bg-[#FFF8EB] border border-amber-200 rounded-2xl p-4 space-y-2 text-xs">
                    <h4 className="font-black text-amber-900 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                      Attention Required
                    </h4>
                    <p className="text-[#1E122C] font-semibold">{camp.issue}</p>
                    <p className="text-[#6B5E77] leading-relaxed"><span className="font-black text-[#D94A2A] uppercase tracking-wider text-[9.5px] mr-1.5">Recommendation:</span>{camp.recommendation}</p>
                  </div>
                )}

                {/* Simple Human Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="block text-[#6B5E77] font-black uppercase tracking-wider text-[9.5px] mb-1">Spent</span>
                    <span className="font-black text-xs sm:text-sm text-[#1E122C]">${camp.metrics.spent.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="block text-[#6B5E77] font-black uppercase tracking-wider text-[9.5px] mb-1">Clicks</span>
                    <span className="font-black text-xs sm:text-sm text-[#1E122C]">{camp.metrics.clicks}</span>
                  </div>
                  <div>
                    <span className="block text-[#6B5E77] font-black uppercase tracking-wider text-[9.5px] mb-1">Estimated Sales</span>
                    <span className="font-black text-xs sm:text-sm text-[#1E122C]">{camp.metrics.conversions} orders</span>
                  </div>
                  <div>
                    <span className="block text-[#6B5E77] font-black uppercase tracking-wider text-[9.5px] mb-1">Returns (ROAS)</span>
                    <span className="font-black text-xs text-[#4B1D6B] bg-[#F5EEFB] px-2.5 py-1 rounded-full border border-[#E9D5F7] w-fit inline-block">
                      {camp.metrics.roas.toFixed(1)}x return
                    </span>
                  </div>
                </div>

                {/* Advanced Technical metrics collapsible */}
                <div className="border-t border-[#F3DEC8]/70 pt-3">
                  <button
                    onClick={() => toggleAdvanced(camp.id)}
                    className="flex items-center gap-1 text-[10px] font-black text-[#6B5E77] hover:text-[#1E122C] uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>Advanced details</span>
                    {isAdvancedOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isAdvancedOpen && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3 p-4 bg-[#FFF8F5] border border-[#F3DEC8] rounded-2xl text-xs font-bold text-[#1E122C]">
                      <div>
                        <span className="block text-[#6B5E77] font-black uppercase tracking-wider text-[9.5px] mb-1">CTR (Click rate)</span>
                        <span>{(camp.metrics.ctr * 100).toFixed(2)}%</span>
                      </div>
                      <div>
                        <span className="block text-[#6B5E77] font-black uppercase tracking-wider text-[9.5px] mb-1">CPC (Click cost)</span>
                        <span>${camp.metrics.cpc.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="block text-[#6B5E77] font-black uppercase tracking-wider text-[9.5px] mb-1">CPA (Purchase cost)</span>
                        <span>${camp.metrics.cpa.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="block text-[#6B5E77] font-black uppercase tracking-wider text-[9.5px] mb-1">Impressions</span>
                        <span>{camp.metrics.impressions.toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Pause/Activate Action buttons */}
                <div className="flex justify-end pt-1 border-t border-[#F3DEC8]/70">
                  <Button
                    variant={isPaused ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => toggleAdCampaign(camp.id)}
                    className="text-[11px] px-4 py-2"
                  >
                    {isPaused ? (
                      <>
                        <Play className="w-3.5 h-3.5 mr-1" /> Activate campaign
                      </>
                    ) : (
                      <>
                        <Pause className="w-3.5 h-3.5 mr-1" /> Pause campaign
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
export default Ads;
