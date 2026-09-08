import React from 'react';
import { Search, Monitor, FileText, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useMarketing } from '../../context/MarketingContext';

interface PlanPriority {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  icon: 'Search' | 'Monitor' | 'FileText';
}

interface PlanReadyProps {
  onStart: () => void;
}

export const PlanReady: React.FC<PlanReadyProps> = ({ onStart }) => {
  const { business } = useMarketing();
  const completion = business?.profileCompletion || 0;
  const readiness = business?.readinessScore || 0;

  const priorities: PlanPriority[] = [
    {
      id: 'p_1',
      title: 'Get more traffic from Google searches',
      description: `Target high-intent customer keywords for ${business?.industry || 'your industry'} searches.`,
      priority: 'High',
      icon: 'Search'
    },
    {
      id: 'p_2',
      title: 'Improve your mobile website layout',
      description: 'Your mobile homepage gets traffic, but converts very few visitors due to a hidden call-to-action.',
      priority: 'High',
      icon: 'Monitor'
    },
    {
      id: 'p_3',
      title: 'Create consistent community content',
      description: `Publish helpful guides targeting eco-conscious ${business?.targetMarket || 'your audience'} capsule wardrobe topics.`,
      priority: 'Medium',
      icon: 'FileText'
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search': return <Search className="w-5 h-5 text-brand-650" />;
      case 'Monitor': return <Monitor className="w-5 h-5 text-indigo-650" />;
      default: return <FileText className="w-5 h-5 text-purple-650" />;
    }
  };

  const getPriorityColor = (prio: string) => {
    switch (prio) {
      case 'High': return 'success';
      case 'Medium': return 'warning';
      default: return 'neutral';
    }
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto animate-in fade-in duration-300">
      <div className="text-center space-y-2">
        <h2 className="text-2.5xl font-extrabold text-slate-800 tracking-tight leading-tight">
          Your marketing plan is <span className="font-serif italic text-brand-650">ready</span>
        </h2>
        <p className="text-xs text-slate-500 font-medium">Aura has compiled your opportunities and calculated business health scores.</p>
      </div>

      {/* Completion & Readiness Meters */}
      <div className="grid grid-cols-2 gap-4">
        {/* Profile Completion Meter */}
        <Card className="border-slate-100 bg-white p-4.5 flex flex-col items-center text-center space-y-3 relative overflow-hidden rounded-2xl shadow-xs">
          <div className="space-y-1">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Profile Completion</h4>
            <span className="text-[9px] text-slate-500 font-medium leading-normal block">Quantity of details filled</span>
          </div>

          <div className="relative flex items-center justify-center">
            {/* SVG Circle */}
            <svg className="w-20 h-20 transform -rotate-90">
              <circle cx="40" cy="40" r="34" className="text-slate-100" strokeWidth="6" stroke="currentColor" fill="transparent" />
              <circle
                cx="40"
                cy="40"
                r="34"
                className="text-brand-500 transition-all duration-500 ease-out"
                strokeWidth="6"
                strokeDasharray={2 * Math.PI * 34}
                strokeDashoffset={2 * Math.PI * 34 * (1 - completion / 100)}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            <div className="absolute text-sm font-extrabold text-slate-805">{completion}%</div>
          </div>
          
          <div className="flex items-center gap-1 text-[9px] font-bold text-brand-600 bg-brand-50 border border-brand-100/50 px-2 py-0.5 rounded">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Setup Verified</span>
          </div>
        </Card>

        {/* Business Readiness Meter */}
        <Card className="border-slate-100 bg-white p-4.5 flex flex-col items-center text-center space-y-3 relative overflow-hidden rounded-2xl shadow-xs">
          <div className="space-y-1">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Business Readiness</h4>
            <span className="text-[9px] text-slate-500 font-medium leading-normal block">Campaign launch capability</span>
          </div>

          <div className="relative flex items-center justify-center">
            {/* SVG Circle */}
            <svg className="w-20 h-20 transform -rotate-90">
              <circle cx="40" cy="40" r="34" className="text-slate-100" strokeWidth="6" stroke="currentColor" fill="transparent" />
              <circle
                cx="40"
                cy="40"
                r="34"
                className="text-indigo-500 transition-all duration-500 ease-out"
                strokeWidth="6"
                strokeDasharray={2 * Math.PI * 34}
                strokeDashoffset={2 * Math.PI * 34 * (1 - readiness / 100)}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            <div className="absolute text-sm font-extrabold text-slate-850">{readiness}%</div>
          </div>

          <div className="flex items-center gap-1 text-[9px] font-bold text-indigo-650 bg-indigo-50 border border-indigo-100/50 px-2.5 py-0.5 rounded">
            <ShieldAlert className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
            <span>Ready for Ads</span>
          </div>
        </Card>
      </div>

      {/* Priorities List */}
      <div className="space-y-3.5">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1 text-left">Primary Growth Focus</h3>
        {priorities.map((item) => (
          <Card key={item.id} className="flex flex-col sm:flex-row items-start gap-4 border border-slate-100 bg-white p-4.5 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300">
            <div className="p-3 bg-brand-50 border border-brand-100/50 text-brand-500 rounded-2xl shrink-0">
              {getIcon(item.icon)}
            </div>

            <div className="space-y-1.5 flex-1 text-left">
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-slate-800 leading-tight">{item.title}</h4>
                <Badge variant={getPriorityColor(item.priority)}>
                  {item.priority} Priority
                </Badge>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">{item.description}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Mockup Bottom Navigation Bar */}
      <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-6 mb-6">
        <span className="text-[10px] text-slate-400 font-bold">Workspace Compiled</span>

        {/* Center Progress Bar */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-slate-450 font-bold">Step 5 of 5</span>
          <div className="w-[100px] bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#5C4DF7] h-full rounded-full" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Continue / Launch Button */}
        <button
          onClick={onStart}
          className="inline-flex items-center gap-1 px-5 py-2.5 bg-[#5C4DF7] hover:bg-[#4b3ce3] text-white font-extrabold text-xs rounded-full transition-all duration-200 hover:-translate-y-[1.5px] cursor-pointer shadow-xs active:translate-y-0"
        >
          <span>Launch Workspace</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
export default PlanReady;
