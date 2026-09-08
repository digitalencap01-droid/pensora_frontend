import React from 'react';
import { BarChart3, TrendingUp, AlertTriangle, ArrowRight, Eye, Users, DollarSign, Target } from 'lucide-react';
import { useMarketing } from '../context/MarketingContext';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export const Results: React.FC = () => {
  const { growthData, isLoading } = useMarketing();

  if (isLoading || !growthData) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-4 border-[#4B1D6B] border-t-transparent animate-spin" />
        <p className="text-xs text-[#6B5E77] font-semibold">Compiling performance reports...</p>
      </div>
    );
  }

  const { summary, details } = growthData;

  const statCards = [
    { label: 'Visitors', value: summary.visitors.value, change: summary.visitors.change, icon: <Eye className="w-4 h-4 text-[#4B1D6B]" />, iconBg: 'bg-[#F5EEFB] border-[#E9D5F7]' },
    { label: 'Leads', value: summary.leads.value, change: summary.leads.change, icon: <Target className="w-4 h-4 text-[#D94A2A]" />, iconBg: 'bg-[#FFF1EB] border-[#FAD8C7]' },
    { label: 'Customers', value: summary.customers.value, change: summary.customers.change, icon: <Users className="w-4 h-4 text-emerald-700" />, iconBg: 'bg-[#F4FDF8] border-emerald-200' },
    { label: 'Revenue', value: `$${summary.revenue.value.toLocaleString()}`, change: summary.revenue.change, icon: <DollarSign className="w-4 h-4 text-[#8C1F3D]" />, iconBg: 'bg-[#FFF1F2] border-[#FCE7F3]' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-[#1E122C] tracking-tight">Your growth</h1>
        <p className="text-xs sm:text-sm text-[#6B5E77] font-medium">Simple summary answering the question: "Is my marketing working?"</p>
      </div>

      {/* 4 Core Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Card key={card.label} hoverable className="border-[#F3DEC8] bg-white">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] text-[#6B5E77] font-black uppercase tracking-wider">{card.label}</span>
              <div className={`p-2 rounded-xl border shrink-0 ${card.iconBg}`}>
                {card.icon}
              </div>
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-black text-[#1E122C] tracking-tight">{card.value}</h3>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-emerald-800 bg-[#F4FDF8] border border-emerald-200 px-2 py-0.5 rounded-full font-black">
                  +{card.change}%
                </span>
                <span className="text-[9.5px] text-[#6B5E77] font-medium">vs last week</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Qualitative analysis grids */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* What improved */}
        <Card className="border-emerald-200/80 bg-[#F4FDF8]/40">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-emerald-200/50 pb-3">
              <div className="p-1.5 bg-white text-emerald-700 rounded-xl border border-emerald-200 shadow-2xs">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-black text-[#1E122C] uppercase tracking-wider">What improved?</h4>
            </div>

            <ul className="space-y-3">
              {details.whatImproved.map((item: string, idx: number) => (
                <li key={idx} className="flex gap-2 text-xs leading-relaxed text-[#1E122C] font-semibold">
                  <span className="text-emerald-700 font-black mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Needs attention */}
        <Card className="border-amber-200/80 bg-[#FFF8EB]/40">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-amber-200/50 pb-3">
              <div className="p-1.5 bg-white text-amber-700 rounded-xl border border-amber-200 shadow-2xs">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-black text-[#1E122C] uppercase tracking-wider">Needs attention?</h4>
            </div>

            <ul className="space-y-3">
              {details.needsAttention.map((item: string, idx: number) => (
                <li key={idx} className="flex gap-2 text-xs leading-relaxed text-[#1E122C] font-semibold">
                  <span className="text-amber-700 font-black mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* What should we do next */}
        <Card className="border-[#F3DEC8] bg-[#FFF8F5]">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#F3DEC8]/70 pb-3">
              <div className="p-1.5 bg-white text-[#D94A2A] rounded-xl border border-[#F3DEC8] shadow-2xs">
                <ArrowRight className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-black text-[#1E122C] uppercase tracking-wider">What's next?</h4>
            </div>

            <ul className="space-y-3">
              {details.nextSteps.map((item: string, idx: number) => (
                <li key={idx} className="flex gap-2 text-xs leading-relaxed text-[#1E122C] font-black">
                  <span className="text-[#D94A2A] font-black mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default Results;
