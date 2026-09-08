import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMarketing } from '../context/MarketingContext';
import { 
  Calendar, 
  Target, 
  Sparkles, 
  ArrowRight, 
  User, 
  TrendingUp, 
  PieChart, 
  AlertCircle,
  Megaphone,
  Briefcase,
  Users,
  Compass
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

type GoalType = 'leads' | 'awareness' | 'sales' | 'retention' | 're-engagement' | 'launch';

interface MonthlyTarget {
  period: string;
  targetValue: number;
  description: string;
}

export const Plan: React.FC = () => {
  const { activeWorkspace, updateWorkspace } = useMarketing();
  const navigate = useNavigate();

  // Goal Setup Form State
  const [goalType, setGoalType] = useState<GoalType>('leads');
  const [targetKPI, setTargetKPI] = useState<string>('Leads');
  const [targetValue, setTargetValue] = useState<number>(500);
  const [targetDate, setTargetDate] = useState<string>('2026-12-15');
  const [owner, setOwner] = useState<string>('Me');
  const [targetAudience, setTargetAudience] = useState<string>('');
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [campaignPriority, setCampaignPriority] = useState<string>('organic_first');
  
  // Progress tracker calculations
  const [currentProgress, setCurrentProgress] = useState<number>(380);
  const progressPercent = Math.min(Math.round((currentProgress / targetValue) * 100), 100);

  // Load initial settings from context
  useEffect(() => {
    if (activeWorkspace) {
      // Map context growthGoal to GoalType
      const goalMap: Record<string, GoalType> = {
        'leads': 'leads',
        'sales': 'sales',
        'awareness': 'awareness',
        'retention': 'retention',
        're-engagement': 're-engagement',
        'launch': 'launch'
      };
      setGoalType(goalMap[activeWorkspace.growthGoal || ''] || 'leads');
      setTargetAudience(activeWorkspace.targetAudienceDesc || '');
      setSelectedChannels(activeWorkspace.channels || []);
      
      // Dynamic fallback metrics depending on business size
      const isEstablished = activeWorkspace.stage === 'established';
      setTargetValue(isEstablished ? 2500 : 500);
      setCurrentProgress(isEstablished ? 1850 : 380);
    }
  }, [activeWorkspace]);

  // Handle Form Submission
  const handleUpdateStrategy = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeWorkspace) {
      updateWorkspace(activeWorkspace.id, {
        growthGoal: goalType,
        targetAudienceDesc: targetAudience,
        channels: selectedChannels
      });
    }
  };

  // Generate calculated monthly targets milestone breakdown
  const getMonthlyBreakdown = (): MonthlyTarget[] => {
    const step = Math.round(targetValue / 3);
    return [
      { period: 'Month 1 Target', targetValue: step, description: 'Focus on baseline reach and initial asset setup.' },
      { period: 'Month 2 Target', targetValue: step * 2, description: 'Scale organic templates and optimize paid search bid ratios.' },
      { period: 'Month 3 Target', targetValue: targetValue, description: 'Achieve terminal conversion volume objectives.' }
    ];
  };

  // Dynamic AI Strategy suggestions based on selected goal type
  const getAISuggestions = () => {
    switch (goalType) {
      case 'leads':
        return {
          strategy: 'Deploy landing page schema optimizations and target competitor keyword gaps to capture organic search traffic.',
          mix: [
            { name: 'Google Search Ads', share: 45, color: '#4B1D6B' },
            { name: 'SEO / Organic Landing Page', share: 35, color: '#10B981' },
            { name: 'Instagram Forms', share: 20, color: '#D94A2A' }
          ],
          audience: 'High-intent search query traffic looking for instant service resolutions.',
          themes: 'Direct case studies, problem-solving check-lists, and free diagnostic tool downloads.',
          nextStep: 'Complete GMB Google Maps keyword optimization check.'
        };
      case 'sales':
        return {
          strategy: 'Integrate automated abandoned cart recovery email series and deploy catalog retargeting campaigns.',
          mix: [
            { name: 'Meta Catalog Ads', share: 50, color: '#4B1D6B' },
            { name: 'Email Retargeting', share: 30, color: '#D94A2A' },
            { name: 'Google Shopping Feed', share: 20, color: '#10B981' }
          ],
          audience: 'Previous site visitors who viewed collections or added items to shopping carts.',
          themes: 'First-time customer promo codes, customer video product reviews, and free shipping triggers.',
          nextStep: 'Enable abandoned cart email automation flow.'
        };
      case 'awareness':
        return {
          strategy: 'Launch creative video campaign storytelling focusing on brand values, sustainability, and team origins.',
          mix: [
            { name: 'Instagram & TikTok Reels', share: 60, color: '#4B1D6B' },
            { name: 'YouTube Video Ads', share: 25, color: '#D94A2A' },
            { name: 'PR / Influencer Collabs', share: 15, color: '#8C1F3D' }
          ],
          audience: 'Broad interest groups matching niche affinity topics (e.g. eco-friendly wardrobes, gourmet roasting).',
          themes: 'Behind-the-scenes production, product styling tips, and interactive quizzes.',
          nextStep: 'Generate 3 TikTok video concept drafts.'
        };
      case 'retention':
        return {
          strategy: 'Build customer loyalty tier campaigns and launch customized email monthly replenishment newsletter flows.',
          mix: [
            { name: 'Email Newsletters', share: 55, color: '#4B1D6B' },
            { name: 'SMS VIP Promotions', share: 25, color: '#D94A2A' },
            { name: 'Social Retargeting VIP', share: 20, color: '#10B981' }
          ],
          audience: 'Existing customers who have purchased at least once in the past 180 days.',
          themes: 'Early access to new product drops, loyalty point milestones, and repeat customer refill notifications.',
          nextStep: 'Draft monthly loyalty campaign newsletter copy.'
        };
      case 're-engagement':
        return {
          strategy: 'Run "We Miss You" reactivation email sweepstakes and target win-back discount offers.',
          mix: [
            { name: 'Win-back Email Series', share: 60, color: '#4B1D6B' },
            { name: 'Social Custom Audience Ads', share: 30, color: '#D94A2A' },
            { name: 'Direct Mail / Postcard Promo', share: 10, color: '#8C1F3D' }
          ],
          audience: 'Subscribed users who have not opened emails or purchased in the last 120 days.',
          themes: 'Exclusive win-back discounts, product formulation upgrades, and brand feedback requests.',
          nextStep: 'Create inactive subscriber list segments.'
        };
      case 'launch':
        return {
          strategy: 'Establish a VIP pre-launch sign-up landing page and drive traffic through targeted teaser ads.',
          mix: [
            { name: 'Teaser Video Ads', share: 45, color: '#4B1D6B' },
            { name: 'Pre-launch Email Signups', share: 35, color: '#D94A2A' },
            { name: 'Influencer Seeding', share: 20, color: '#10B981' }
          ],
          audience: 'Core brand advocates, early adopters, and waitlist signups.',
          themes: 'Product release countdown timers, exclusive reservation access, and early-bird discounts.',
          nextStep: 'Setup waiting list subscription landing page.'
        };
    }
  };

  const aiGuidance = getAISuggestions();

  // Preset KPIs based on selected goal
  useEffect(() => {
    const kpiMap: Record<GoalType, string> = {
      leads: 'Leads',
      sales: 'Revenue ($)',
      awareness: 'Reach (Impressions)',
      retention: 'Repeat Purchase Rate (%)',
      're-engagement': 'Re-opened subscribers',
      launch: 'Pre-orders / Sign-ups'
    };
    setTargetKPI(kpiMap[goalType]);
  }, [goalType]);

  const channelsList = [
    'Instagram Business',
    'Facebook Ads Manager',
    'Google Search Network',
    'Email Newsletter Lists',
    'YouTube Campaigns',
    'TikTok Advertising'
  ];

  const handleChannelToggle = (ch: string) => {
    if (selectedChannels.includes(ch)) {
      setSelectedChannels(selectedChannels.filter(c => c !== ch));
    } else {
      setSelectedChannels([...selectedChannels, ch]);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-left font-sans pb-12">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-[#1E122C] tracking-tight">Strategy & Goals</h1>
        <p className="text-xs sm:text-sm text-[#6B5E77] font-medium">
          Setup, customize, and automatically track measurable target milestones with real-time AI strategic guidance.
        </p>
      </div>

      {/* Goal Progress Tracking Banner */}
      <Card className="border-[#F3DEC8] bg-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#4B1D6B] bg-[#F5EEFB] px-2.5 py-1 rounded-full border border-[#E9D5F7] w-fit block">
              Active Growth Goal Progress
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#1E122C]">
              Target: <span className="capitalize">{goalType}</span> &bull; {targetValue.toLocaleString()} {targetKPI}
            </h2>
            <p className="text-xs text-[#6B5E77] font-medium">
              Deadline: <strong className="text-[#1E122C]">{new Date(targetDate).toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}</strong> &bull; Assigned to: <strong className="text-[#1E122C]">{owner}</strong>
            </p>
          </div>

          {/* Goal progress bars */}
          <div className="w-full md:w-80 space-y-2">
            <div className="flex justify-between text-xs font-black text-[#1E122C]">
              <span>Current: {currentProgress.toLocaleString()} / {targetValue.toLocaleString()}</span>
              <span className="text-[#D94A2A]">{progressPercent}%</span>
            </div>
            <div className="w-full bg-[#FAF5F0] border border-[#F3DEC8] rounded-full h-3.5 p-0.5">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-[#4B1D6B] via-[#D94A2A] to-[#E59866] transition-all duration-1000 shadow-2xs"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[9.5px] font-bold text-[#6B5E77] block text-right">Automatic progress tracking synced</span>
          </div>
        </div>
      </Card>

      {/* Main Grid System */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column (takes 2/3 width) - Goal Setup Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-[#F3DEC8] bg-white text-left">
            <h3 className="text-xs font-black text-[#1E122C] uppercase tracking-wider pb-3 border-b border-[#F3DEC8]/70 flex items-center gap-2">
              <Target className="w-4.5 h-4.5 text-[#D94A2A]" />
              Interactive Goal Setup Form
            </h3>

            <form onSubmit={handleUpdateStrategy} className="space-y-6 pt-4">
              
              {/* Goal Type selection (6 types: Leads, Awareness, Sales, Retention, Re-engagement, Launch) */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#6B5E77] uppercase tracking-widest block">Goal Type Selection</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {(['leads', 'awareness', 'sales', 'retention', 're-engagement', 'launch'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setGoalType(t)}
                      className={`px-4 py-3 rounded-2xl border text-xs font-black tracking-wide text-center transition-all cursor-pointer ${
                        goalType === t 
                          ? 'border-[#4B1D6B] bg-[#F5EEFB] text-[#4B1D6B] shadow-2xs' 
                          : 'border-[#F3DEC8] bg-white text-[#6B5E77] hover:bg-[#FFF8F5]'
                      }`}
                    >
                      <span className="capitalize">{t === 're-engagement' ? 'Re-engagement' : t}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Target KPI selection */}
                <div className="space-y-1.5">
                  <label htmlFor="target-kpi" className="text-[10px] font-black text-[#6B5E77] uppercase tracking-widest block pl-1">
                    Target KPI Metric
                  </label>
                  <select
                    id="target-kpi"
                    value={targetKPI}
                    onChange={(e) => setTargetKPI(e.target.value)}
                    className="w-full border border-[#F3DEC8] rounded-2xl px-4 py-3.5 text-xs bg-white font-bold text-[#1E122C] focus:outline-none focus:border-[#D94A2A] focus:ring-2 focus:ring-[#D94A2A]/10 shadow-2xs"
                  >
                    <option value="Leads">Leads count</option>
                    <option value="Revenue ($)">Revenue ($)</option>
                    <option value="Reach (Impressions)">Reach (Impressions)</option>
                    <option value="Conversion rate (%)">Conversion rate (%)</option>
                    <option value="Repeat Purchase Rate (%)">Repeat Purchase Rate (%)</option>
                    <option value="Pre-orders / Sign-ups">Pre-orders / Sign-ups</option>
                  </select>
                </div>

                {/* Target value input */}
                <div className="space-y-1.5">
                  <label htmlFor="target-value" className="text-[10px] font-black text-[#6B5E77] uppercase tracking-widest block pl-1">
                    Target Value Goal
                  </label>
                  <input
                    type="number"
                    id="target-value"
                    value={targetValue}
                    onChange={(e) => setTargetValue(Number(e.target.value))}
                    className="w-full border border-[#F3DEC8] rounded-2xl px-4 py-3 text-xs bg-white font-bold text-[#1E122C] focus:outline-none focus:border-[#D94A2A] focus:ring-2 focus:ring-[#D94A2A]/10 shadow-2xs"
                    placeholder="e.g. 500"
                  />
                </div>

                {/* Target Date Picker */}
                <div className="space-y-1.5">
                  <label htmlFor="target-date" className="text-[10px] font-black text-[#6B5E77] uppercase tracking-widest block pl-1">
                    Goal Target Date
                  </label>
                  <input
                    type="date"
                    id="target-date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full border border-[#F3DEC8] rounded-2xl px-4 py-3 text-xs bg-white font-bold text-[#1E122C] focus:outline-none focus:border-[#D94A2A] focus:ring-2 focus:ring-[#D94A2A]/10 shadow-2xs"
                  />
                </div>

                {/* Assign Owner input */}
                <div className="space-y-1.5">
                  <label htmlFor="owner" className="text-[10px] font-black text-[#6B5E77] uppercase tracking-widest block pl-1">
                    Assign Responsibility (Owner)
                  </label>
                  <input
                    type="text"
                    id="owner"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    className="w-full border border-[#F3DEC8] rounded-2xl px-4 py-3.5 text-xs bg-white font-bold text-[#1E122C] focus:outline-none focus:border-[#D94A2A] focus:ring-2 focus:ring-[#D94A2A]/10 shadow-2xs"
                    placeholder="e.g. Marketing Lead"
                  />
                </div>
              </div>

              {/* Select target audience details */}
              <div className="space-y-1.5">
                <label htmlFor="audience" className="text-[10px] font-black text-[#6B5E77] uppercase tracking-widest block pl-1">
                  Target Customer Focus
                </label>
                <textarea
                  id="audience"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  rows={2}
                  className="w-full border border-[#F3DEC8] rounded-2xl px-4 py-3 text-xs bg-white font-bold text-[#1E122C] focus:outline-none focus:border-[#D94A2A] focus:ring-2 focus:ring-[#D94A2A]/10 resize-none shadow-2xs"
                  placeholder="Summarize the core persona this campaign focuses on..."
                />
              </div>

              {/* Select Priority Channels */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#6B5E77] uppercase tracking-widest block">Select Priority Channels</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {channelsList.map((ch) => (
                    <div 
                      key={ch}
                      onClick={() => handleChannelToggle(ch)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl border text-xs font-black cursor-pointer select-none transition-all ${
                        selectedChannels.includes(ch)
                          ? 'border-[#4B1D6B] bg-[#F5EEFB] text-[#4B1D6B]'
                          : 'border-[#F3DEC8] bg-white text-[#6B5E77] hover:bg-[#FFF8F5]'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        checked={selectedChannels.includes(ch)}
                        onChange={() => {}} // toggled on container click
                        className="h-4 w-4 rounded border-[#F3DEC8] text-[#4B1D6B] focus:ring-[#4B1D6B] pointer-events-none accent-[#4B1D6B]"
                      />
                      <span>{ch}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Campaign priority ordering dropdown */}
              <div className="space-y-1.5">
                <label htmlFor="priority" className="text-[10px] font-black text-[#6B5E77] uppercase tracking-widest block pl-1">
                  Define Campaign Execution Priority
                </label>
                <select
                  id="priority"
                  value={campaignPriority}
                  onChange={(e) => setCampaignPriority(e.target.value)}
                  className="w-full border border-[#F3DEC8] rounded-2xl px-4 py-3.5 text-xs bg-white font-bold text-[#1E122C] focus:outline-none focus:border-[#D94A2A] focus:ring-2 focus:ring-[#D94A2A]/10 shadow-2xs"
                >
                  <option value="organic_first">Organic SEO & content distribution first</option>
                  <option value="paid_first">Targeted search ads campaigns first</option>
                  <option value="email_first">Customer email retention flows first</option>
                  <option value="viral_first">Social video templates and seeding first</option>
                </select>
              </div>

              {/* Submit update action button */}
              <div className="pt-2">
                <Button 
                  type="submit" 
                  variant="primary"
                  className="w-full sm:w-auto"
                >
                  <span>Update Strategy & Target Milestones</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 shrink-0" />
                </Button>
              </div>

            </form>
          </Card>

          {/* Monthly / Quarterly milestones targets breakdown */}
          <Card className="border-[#F3DEC8] bg-white space-y-4">
            <div>
              <h3 className="text-xs font-black text-[#1E122C] uppercase tracking-wider">Monthly & Quarterly Targets</h3>
              <p className="text-[10px] text-[#6B5E77] font-semibold">Sub-milestones representing goal breakdowns</p>
            </div>

            <div className="space-y-3.5 pt-2">
              {getMonthlyBreakdown().map((milestone, idx) => (
                <div key={idx} className="flex gap-4 items-start bg-[#FFF8F5] border border-[#F3DEC8] rounded-2xl p-4">
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center border border-[#F3DEC8] shrink-0 text-xs font-black text-[#4B1D6B] shadow-2xs">
                    M{idx + 1}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-[#1E122C] flex items-center gap-1.5">
                      {milestone.period}: <span className="text-[#D94A2A] font-black">{milestone.targetValue.toLocaleString()} {targetKPI}</span>
                    </h4>
                    <p className="text-[11px] text-[#6B5E77] font-semibold leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column (takes 1/3 width) - AI Strategic Guidance Panel */}
        <div className="space-y-6">
          <Card className="border-[#F3DEC8] bg-gradient-to-br from-white via-white to-[#FFF8F5] space-y-6 text-left relative overflow-hidden">
            {/* sparkles effect */}
            <div className="absolute right-0 top-0 p-4 opacity-5 pointer-events-none">
              <Sparkles className="w-24 h-24 text-[#D94A2A]" />
            </div>

            <div className="relative z-10 space-y-6">
              
              {/* Header */}
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D94A2A] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D94A2A]"></span>
                </span>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-[#D94A2A]">AI Strategic Guidance</h3>
              </div>

              {/* 1. AI strategy suggestions */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-black text-[#1E122C] flex items-center gap-1.5">
                  🧠 AI Strategy Suggestions
                </h4>
                <p className="text-[11px] text-[#6B5E77] font-semibold leading-relaxed">
                  {aiGuidance?.strategy}
                </p>
              </div>

              {/* 2. Recommended Channel Mix */}
              <div className="space-y-2 border-t border-[#F3DEC8]/70 pt-4">
                <h4 className="text-xs font-black text-[#1E122C] flex items-center gap-1.5">
                  <PieChart className="w-4 h-4 text-[#4B1D6B]" />
                  Recommended Channel Mix
                </h4>
                <div className="space-y-2 pt-1">
                  {aiGuidance?.mix.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[10px] font-black text-[#1E122C]">
                        <span>{item.name}</span>
                        <span className="text-[#6B5E77]">{item.share}%</span>
                      </div>
                      <div className="w-full bg-[#FAF5F0] border border-[#F3DEC8]/50 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full rounded-full"
                          style={{ width: `${item.share}%`, backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Recommended Audience */}
              <div className="space-y-1.5 border-t border-[#F3DEC8]/70 pt-4">
                <h4 className="text-xs font-black text-[#1E122C] flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#D94A2A]" />
                  Recommended Audience Focus
                </h4>
                <p className="text-[11px] text-[#6B5E77] font-semibold leading-relaxed">
                  {aiGuidance?.audience}
                </p>
              </div>

              {/* 4. Recommended Campaign Themes */}
              <div className="space-y-1.5 border-t border-[#F3DEC8]/70 pt-4">
                <h4 className="text-xs font-black text-[#1E122C] flex items-center gap-1.5">
                  <Megaphone className="w-4 h-4 text-[#4B1D6B]" />
                  Recommended Campaign Themes
                </h4>
                <p className="text-[11px] text-[#6B5E77] font-semibold leading-relaxed">
                  {aiGuidance?.themes}
                </p>
              </div>

              {/* 5. Recommended Next Step */}
              <div className="border-t border-[#F3DEC8]/70 pt-4">
                <div className="bg-[#FFF8F5] border border-[#F3DEC8] rounded-2xl p-4 space-y-2.5">
                  <h4 className="text-xs font-black text-[#D94A2A] uppercase tracking-wider flex items-center gap-1.5">
                    🎯 Recommended Next Step
                  </h4>
                  <p className="text-xs text-[#1E122C] font-bold leading-normal">
                    {aiGuidance?.nextStep}
                  </p>
                  <button 
                    onClick={() => navigate('/discover')}
                    className="text-[11px] font-black text-[#4B1D6B] hover:text-[#D94A2A] flex items-center gap-1 mt-1 cursor-pointer transition-colors"
                  >
                    <span>Execute check now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </Card>
        </div>

      </div>

    </div>
  );
};
export default Plan;
