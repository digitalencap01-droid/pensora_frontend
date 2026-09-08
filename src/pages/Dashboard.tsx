import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMarketing } from '../context/MarketingContext';
import { 
  Sparkles, 
  ArrowRight, 
  Plus, 
  Calendar, 
  MessageSquare, 
  ChevronRight, 
  Smartphone, 
  ShoppingBag, 
  Search, 
  Activity, 
  Check, 
  Target, 
  Users, 
  BarChart2, 
  AlertTriangle, 
  Lightbulb, 
  MoreVertical, 
  TrendingUp, 
  TrendingDown,
  Building2,
  Globe,
  Tag,
  ChevronDown,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
  RefreshCw,
  FileText
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { 
    activeWorkspace, 
    setAssistantOpen,
    fixWebsiteIssue,
    actions,
    recommendations,
    approveAction,
    dismissAction,
    applyRecommendation,
    websiteIssues
  } = useMarketing();

  const navigate = useNavigate();
  const [showMetricsHover, setShowMetricsHover] = useState(false);
  const [fixingIssueId, setFixingIssueId] = useState<string | null>(null);
  const [approvingActionId, setApprovingActionId] = useState<string | null>(null);
  const [applyingRecId, setApplyingRecId] = useState<string | null>(null);

  const brandName = activeWorkspace?.name || 'Bloom Boutique';
  const brandFirstWord = brandName.split(' ')[0] || 'Bloom';
  const brandRest = brandName.split(' ').slice(1).join(' ') || 'Boutique';
  const websiteDomain = activeWorkspace?.website 
    ? activeWorkspace.website.replace(/https?:\/\/(www\.)?/, '') 
    : 'bloomboutique.shop';
  const categoryName = activeWorkspace?.industry || 'Sustainable Fashion';
  const stageName = activeWorkspace?.stage || 'Growing';
  const readinessScore = activeWorkspace?.readinessScore || 85;
  const profileCompletion = activeWorkspace?.profileCompletion || 100;

  // Marketing Journey stages
  const journeyStages = [
    { name: 'Understand', status: 'done', desc: 'Scraped business profile' },
    { name: 'Research', status: 'done', desc: 'Competitors & keywords' },
    { name: 'Plan', status: 'done', desc: 'Growth roadmap ready' },
    { name: 'Create', status: 'active', desc: 'Generating ad copy & assets' },
    { name: 'Launch', status: 'upcoming', desc: 'Publishing campaigns' },
    { name: 'Improve', status: 'upcoming', desc: 'Optimizing conversions' }
  ];

  const handleFixIssue = async (id: string) => {
    setFixingIssueId(id);
    await fixWebsiteIssue(id);
    setFixingIssueId(null);
  };

  const handleApproveAction = async (id: string) => {
    setApprovingActionId(id);
    await approveAction(id);
    setApprovingActionId(null);
  };

  const handleApplyRec = async (id: string) => {
    setApplyingRecId(id);
    await applyRecommendation(id);
    setApplyingRecId(null);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-300 pb-12 text-left font-sans select-none">
      
      {/* ========================================================
          1. COMPACT UNIFIED HERO BANNER
          ======================================================== */}
      <div className="rounded-[28px] sm:rounded-[32px] border border-[#F3DEC8] bg-[#FFF8F5] p-5 sm:p-6 relative overflow-hidden shadow-[0_6px_24px_rgba(75,29,107,0.03)]">
        
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6 relative z-10 min-h-[220px]">
          
          {/* Left Hero Content: Headline, Description & 4 Pills */}
          <div className="flex-1 flex flex-col justify-between space-y-3 z-10 max-w-xl">
            
            {/* Top Text Block */}
            <div className="space-y-1.5">
              {/* Greeting */}
              <div className="text-xs font-bold text-[#6B5E77] flex items-center gap-1.5">
                <span>Good Afternoon,</span>
                <span className="text-sm">☀️</span>
              </div>

              {/* Main Brand Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#1E122C] tracking-tight leading-tight flex items-baseline gap-2 flex-wrap">
                <span>{brandFirstWord}</span>
                <span className="font-serif italic font-normal text-[#D94A2A]">
                  {brandRest}
                </span>
                <span className="text-[#D94A2A] text-xl">🍂</span>
              </h1>

              {/* Subtitle Description */}
              <p className="text-xs text-[#6B5E77] font-medium leading-relaxed max-w-md">
                Your AI digital marketing platform is active. We are currently auditing competitor search budgets and generating high-converting templates.
              </p>
            </div>

            {/* 4 Metadata Badges: Single Row with Clean Spacing */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {/* Pill 1: Workspace */}
              <div className="flex items-center gap-2 bg-white border border-[#F3DEC8] px-3 py-1.5 rounded-xl shadow-2xs">
                <div className="w-6 h-6 rounded-lg bg-[#F3E8FF] text-[#4B1D6B] flex items-center justify-center shrink-0">
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <div className="leading-tight text-left">
                  <span className="text-[8.5px] font-bold text-[#6B5E77] block">Workspace</span>
                  <strong className="text-[11px] font-black text-[#1E122C] block whitespace-nowrap">{brandName}</strong>
                </div>
              </div>

              {/* Pill 2: Website */}
              <a
                href={activeWorkspace?.website || 'https://bloomboutique.shop'}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-white border border-[#F3DEC8] px-3 py-1.5 rounded-xl shadow-2xs hover:border-[#D94A2A] transition-colors"
              >
                <div className="w-6 h-6 rounded-lg bg-[#F3E8FF] text-[#4B1D6B] flex items-center justify-center shrink-0">
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <div className="leading-tight text-left">
                  <span className="text-[8.5px] font-bold text-[#6B5E77] block">Website</span>
                  <span className="text-[11px] font-black text-[#4B1D6B] flex items-center gap-0.5 whitespace-nowrap">
                    <strong>{websiteDomain}</strong>
                    <span className="text-[9px]">↗</span>
                  </span>
                </div>
              </a>

              {/* Pill 3: Category */}
              <div className="flex items-center gap-2 bg-white border border-[#F3DEC8] px-3 py-1.5 rounded-xl shadow-2xs">
                <div className="w-6 h-6 rounded-lg bg-[#F3E8FF] text-[#4B1D6B] flex items-center justify-center shrink-0">
                  <Tag className="w-3.5 h-3.5" />
                </div>
                <div className="leading-tight text-left">
                  <span className="text-[8.5px] font-bold text-[#6B5E77] block">Category</span>
                  <strong className="text-[11px] font-black text-[#1E122C] block whitespace-nowrap">{categoryName}</strong>
                </div>
              </div>

              {/* Pill 4: Stage */}
              <div className="flex items-center gap-2 bg-[#F4FDF8] border border-emerald-200 px-3 py-1.5 rounded-xl shadow-2xs">
                <div className="w-6 h-6 rounded-lg bg-[#ECFDF5] text-emerald-600 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <div className="leading-tight text-left">
                  <span className="text-[8.5px] font-bold text-emerald-600 block">Stage</span>
                  <strong className="text-[11px] font-black text-emerald-700 block whitespace-nowrap">{stageName}</strong>
                </div>
              </div>
            </div>

          </div>

          {/* Center-Right Floating 3D Robot Mascot (Hand touches the right card) */}
          <div className="hidden xl:flex flex-col items-center justify-end absolute right-[350px] 2xl:right-[390px] bottom-[46px] z-20 pointer-events-none select-none">
            <img
              src="/dashboard-mascot-full.png"
              alt="Great progress! Let's grow bigger together"
              className="w-40 lg:w-44 2xl:w-48 h-auto object-contain drop-shadow-md pointer-events-none translate-x-2"
            />
          </div>

          {/* Right Workspace Health Floating White Card */}
          <div 
            onMouseEnter={() => setShowMetricsHover(true)}
            onMouseLeave={() => setShowMetricsHover(false)}
            className="bg-white rounded-[24px] sm:rounded-[28px] border border-[#F3DEC8] p-4.5 sm:p-5 shadow-[0_4px_20px_rgba(75,29,107,0.04)] w-full lg:w-[350px] xl:w-[370px] 2xl:w-[390px] shrink-0 z-10 flex flex-col justify-between space-y-2 relative transition-all duration-300 hover:shadow-[0_8px_30px_rgba(75,29,107,0.08)]"
          >
            
            {/* Top Row: Workspace Health Title + Profile Setup Card */}
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-5.5 h-5.5 rounded-lg bg-[#4B1D6B]/10 flex items-center justify-center text-[#4B1D6B]">
                    <Activity className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <h3 className="text-xs font-black text-[#1E122C] tracking-tight">
                    Workspace Health
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-[#6B5E77] pl-0.5">
                  <span>Updated just now</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>

              {/* Profile Setup Badge Card */}
              <div className="flex items-center gap-2 bg-white border border-[#F3DEC8] px-2.5 py-1.5 rounded-xl shadow-2xs">
                <div className="w-6.5 h-6.5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="text-left leading-tight">
                  <span className="text-[8.5px] font-bold text-[#6B5E77] block">Profile Setup</span>
                  <strong className="text-xs font-black text-[#1E122C] block leading-none">100%</strong>
                  <span className="text-[8px] font-bold text-[#6B5E77] block">Complete</span>
                </div>
              </div>
            </div>

            {/* Semi-Circle Radial Speedometer Gauge (Clean Bar) */}
            <div className="relative flex flex-col items-center justify-center py-1 cursor-pointer">
              <div className="relative w-44 sm:w-48 h-24 sm:h-26 flex items-end justify-center">
                <svg viewBox="0 0 200 110" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="gaugeGradientVivid" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FF5B37" />
                      <stop offset="50%" stopColor="#C026D3" />
                      <stop offset="100%" stopColor="#4A044E" />
                    </linearGradient>
                  </defs>
                  {/* Background Track Arc */}
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#FDEEE4"
                    strokeWidth="18"
                    strokeLinecap="round"
                  />
                  {/* Active Gradient Arc (85% value) */}
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="url(#gaugeGradientVivid)"
                    strokeWidth="18"
                    strokeLinecap="round"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 * (1 - 0.85)}
                  />
                </svg>

                {/* Gauge Center Text */}
                <div className="absolute inset-x-0 bottom-0.5 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-black text-[#1E122C] tracking-tight leading-none">
                    85
                  </span>
                  <span className="text-[10.5px] font-black text-[#1E122C] pt-0.5 flex items-center gap-1">
                    Ready to Grow 🚀
                  </span>
                </div>
              </div>

              {/* Gauge Bottom Scale Markers */}
              <div className="w-44 sm:w-48 flex justify-between text-[9px] font-black text-[#6B5E77] px-2 -mt-0.5">
                <span>0</span>
                <span>100</span>
              </div>
            </div>

            {/* Mini Prompt to Hover / Interactive 4 Stat Cards Drawer */}
            <div className="relative min-h-[44px]">
              <AnimatePresence initial={false} mode="wait">
                {showMetricsHover ? (
                  <motion.div
                    key="metrics-hover"
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-4 gap-1.5 pt-1 border-t border-[#F3DEC8]/70 text-center"
                  >
                    {/* Metric 1 */}
                    <div className="bg-[#FEF9F5] border border-[#F3DEC8] rounded-lg p-1.5 flex flex-col items-center justify-between space-y-0.5">
                      <Target className="w-3 h-3 text-[#D94A2A]" />
                      <p className="text-[7.5px] text-[#6B5E77] font-bold leading-none">Campaigns</p>
                      <h4 className="text-[10px] font-black text-[#1E122C] leading-none">12</h4>
                    </div>

                    {/* Metric 2 */}
                    <div className="bg-[#FEF9F5] border border-[#F3DEC8] rounded-lg p-1.5 flex flex-col items-center justify-between space-y-0.5">
                      <Users className="w-3 h-3 text-[#8C1F3D]" />
                      <p className="text-[7.5px] text-[#6B5E77] font-bold leading-none">Audience</p>
                      <h4 className="text-[10px] font-black text-emerald-600 leading-none">+24%</h4>
                    </div>

                    {/* Metric 3 */}
                    <div className="bg-[#FEF9F5] border border-[#F3DEC8] rounded-lg p-1.5 flex flex-col items-center justify-between space-y-0.5">
                      <BarChart2 className="w-3 h-3 text-[#4B1D6B]" />
                      <p className="text-[7.5px] text-[#6B5E77] font-bold leading-none">Performance</p>
                      <h4 className="text-[10px] font-black text-[#1E122C] leading-none">+18%</h4>
                    </div>

                    {/* Metric 4 */}
                    <div className="bg-[#FEF9F5] border border-[#F3DEC8] rounded-lg p-1.5 flex flex-col items-center justify-between space-y-0.5">
                      <Sparkles className="w-3 h-3 text-[#D94A2A]" />
                      <p className="text-[7.5px] text-[#6B5E77] font-bold leading-none">Ready</p>
                      <h4 className="text-[10px] font-black text-[#D94A2A] leading-none">5 new</h4>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="metrics-hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-center gap-1.5 pt-1.5 text-[9.5px] font-bold text-[#6B5E77] border-t border-[#F3DEC8]/50"
                  >
                    <Sparkles className="w-3 h-3 text-[#D94A2A]" />
                    <span>Hover to inspect active health metrics</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>

      {/* ========================================================
          2. QUICK ACTION BUTTONS (CREATE CAMPAIGN, CALENDAR, ASK AI)
          ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* Button 1: Create Campaign (Dark Plum/Wine Gradient) */}
        <button
          onClick={() => navigate('/ads')}
          className="flex items-center justify-between px-4 py-3 rounded-2xl bg-gradient-to-r from-[#2B0847] via-[#48115B] to-[#801B48] text-white shadow-[0_4px_16px_rgba(43,8,71,0.18)] hover:shadow-[0_6px_20px_rgba(43,8,71,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer border border-white/10 text-left group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/15 flex items-center justify-center text-white shrink-0">
              <Plus className="w-4.5 h-4.5 stroke-[2.5]" />
            </div>
            <div className="truncate">
              <h4 className="text-xs font-black tracking-tight text-white leading-tight truncate">Create Campaign</h4>
              <p className="text-[10px] text-white/75 font-medium pt-0.5 leading-none truncate">Launch a new campaign</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
        </button>

        {/* Button 2: Generate Content Calendar (Light Card) */}
        <button
          onClick={() => navigate('/content')}
          className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white border border-[#F3DEC8] text-[#1E122C] shadow-[0_2px_12px_rgba(75,29,107,0.03)] hover:border-[#D94A2A]/50 hover:shadow-[0_4px_16px_rgba(217,74,42,0.08)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer text-left group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#FFF1EB] border border-[#FAD8C7] flex items-center justify-center text-[#D94A2A] shrink-0">
              <Calendar className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="truncate">
              <h4 className="text-xs font-black tracking-tight text-[#1E122C] leading-tight truncate">Generate Content Calendar</h4>
              <p className="text-[10px] text-[#6B5E77] font-medium pt-0.5 leading-none truncate">Plan your content</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#6B5E77] group-hover:text-[#D94A2A] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
        </button>

        {/* Button 3: Ask AI Assistant (Light Card) */}
        <button
          onClick={() => setAssistantOpen(true)}
          className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white border border-[#F3DEC8] text-[#1E122C] shadow-[0_2px_12px_rgba(75,29,107,0.03)] hover:border-[#4B1D6B]/50 hover:shadow-[0_4px_16px_rgba(75,29,107,0.08)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer text-left group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#F5EEFB] border border-[#E9D5F7] flex items-center justify-center text-[#4B1D6B] shrink-0">
              <MessageSquare className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="truncate">
              <h4 className="text-xs font-black tracking-tight text-[#1E122C] leading-tight truncate">Ask AI Assistant</h4>
              <p className="text-[10px] text-[#6B5E77] font-medium pt-0.5 leading-none truncate">Get AI recommendations</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#4B1D6B] group-hover:translate-x-1 transition-all shrink-0 ml-2 stroke-[2.5]" />
        </button>
      </div>

      {/* ========================================================
          3. AI MARKETING JOURNEY ROADMAP (TRACKER)
          ======================================================== */}
      <div className="bg-white rounded-[28px] border border-[#F3DEC8] p-5 sm:p-6 shadow-[0_6px_20px_rgba(75,29,107,0.02)] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#4B1D6B]/10 flex items-center justify-center text-[#4B1D6B]">
              <Zap className="w-3.5 h-3.5 fill-[#4B1D6B]" />
            </div>
            <h3 className="text-xs font-black text-[#1E122C] tracking-tight uppercase">
              AI Marketing Journey Roadmap
            </h3>
          </div>
          <span className="text-[10px] font-bold text-[#6B5E77] bg-[#FAF5F0] px-3 py-1 rounded-full border border-[#F3DEC8]">
            Phase 4 of 6 Active
          </span>
        </div>

        {/* Responsive Horizontal Step Journey Tracker */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative pt-1">
          {journeyStages.map((stg, i) => {
            const isDone = stg.status === 'done';
            const isActive = stg.status === 'active';

            return (
              <div 
                key={stg.name}
                className={`p-3 rounded-2xl border transition-all text-left flex flex-col justify-between space-y-2 ${
                  isActive
                    ? 'bg-[#FFF8F5] border-[#D94A2A] shadow-xs ring-1 ring-[#D94A2A]/30'
                    : isDone
                    ? 'bg-[#F4FDF8] border-emerald-200'
                    : 'bg-[#FAF5F0]/60 border-[#F3DEC8]/70 opacity-75'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div 
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${
                      isDone 
                        ? 'bg-emerald-600 text-white' 
                        : isActive 
                        ? 'bg-[#D94A2A] text-white animate-pulse' 
                        : 'bg-[#EBDDCF] text-[#6B5E77]'
                    }`}
                  >
                    {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : i + 1}
                  </div>
                  <span className={`text-[8.5px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md ${
                    isDone 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : isActive 
                      ? 'bg-orange-100 text-orange-700 font-extrabold' 
                      : 'bg-stone-100 text-[#6B5E77]'
                  }`}>
                    {stg.status}
                  </span>
                </div>

                <div>
                  <h4 className={`text-xs font-black ${isActive ? 'text-[#D94A2A]' : isDone ? 'text-emerald-900' : 'text-[#6B5E77]'}`}>
                    {stg.name}
                  </h4>
                  <p className="text-[10px] text-[#6B5E77] font-medium leading-tight pt-0.5">
                    {stg.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          4. MAIN CONTENT GRID: ALERTS & ACTIONS (LEFT) + METRICS & ACTIVITY (RIGHT)
          ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 8 Columns */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section A: Active Alerts & Anomalies Table Card */}
          <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-[#F3DEC8] p-5 sm:p-6 shadow-[0_8px_24px_rgba(75,29,107,0.03)] space-y-4">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-rose-50 flex items-center justify-center text-rose-500">
                  <AlertTriangle className="w-4 h-4 stroke-[2.5]" />
                </div>
                <h3 className="text-xs sm:text-sm font-black text-[#1E122C] tracking-tight">
                  Active Alerts & Anomalies
                </h3>
              </div>

              <button 
                onClick={() => navigate('/discover')}
                className="text-xs font-black text-[#8C1F3D] hover:text-[#D94A2A] transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-0"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Table Header Row */}
            <div className="hidden sm:grid grid-cols-12 text-[10px] font-black uppercase tracking-wider text-[#6B5E77] pb-1 border-b border-[#F3DEC8]/60">
              <span className="col-span-7">Issue & Diagnosis</span>
              <span className="col-span-2 text-center">Impact</span>
              <span className="col-span-3 text-right pr-4">Action</span>
            </div>

            {/* Table Rows */}
            <div className="space-y-3">
              
              {/* Row 1: Mobile Button Issue */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF5F0] border border-[#F3DEC8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 transition-all hover:border-[#D94A2A]/40">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shrink-0 shadow-3xs">
                    <Smartphone className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <h4 className="text-xs font-extrabold text-[#1E122C] leading-snug">
                      Homepage &quot;Shop Now&quot; button is difficult to see on mobile devices.
                    </h4>
                    <p className="text-[10.5px] text-[#6B5E77] font-semibold leading-relaxed">
                      Over 72% of your visitors browse on mobile. Fixing this boosts checkout starts.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  <span className="text-xs font-black text-rose-600 sm:w-16 text-center">
                    High
                  </span>

                  <button
                    onClick={() => handleFixIssue('1')}
                    disabled={fixingIssueId === '1'}
                    className="px-3.5 py-1.5 sm:py-2 bg-gradient-to-r from-[#E94E83] to-[#D83B70] hover:from-[#D83B70] hover:to-[#B32454] text-white text-[11px] font-black rounded-xl shadow-[0_4px_12px_rgba(233,78,131,0.25)] flex items-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer border-0 disabled:opacity-50"
                  >
                    <Sparkles className="w-3 h-3 text-white fill-white" />
                    <span>{fixingIssueId === '1' ? 'Fixing...' : 'Auto-Fix Now'}</span>
                  </button>
                </div>
              </div>

              {/* Row 2: Free Shipping Banner */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF5F0] border border-[#F3DEC8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 transition-all hover:border-[#D94A2A]/40">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 shrink-0 shadow-3xs">
                    <ShoppingBag className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <h4 className="text-xs font-extrabold text-[#1E122C] leading-snug">
                      The homepage doesn&apos;t clearly state you offer &quot;free shipping on orders over $100&quot;.
                    </h4>
                    <p className="text-[10.5px] text-[#6B5E77] font-semibold leading-relaxed">
                      May be causing cart abandonment from price-sensitive shoppers.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  <span className="text-xs font-black text-amber-600 sm:w-16 text-center">
                    Medium
                  </span>

                  <button
                    onClick={() => handleFixIssue('2')}
                    disabled={fixingIssueId === '2'}
                    className="px-3.5 py-1.5 sm:py-2 bg-gradient-to-r from-[#E94E83] to-[#D83B70] hover:from-[#D83B70] hover:to-[#B32454] text-white text-[11px] font-black rounded-xl shadow-[0_4px_12px_rgba(233,78,131,0.25)] flex items-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer border-0 disabled:opacity-50"
                  >
                    <Sparkles className="w-3 h-3 text-white fill-white" />
                    <span>{fixingIssueId === '2' ? 'Fixing...' : 'Auto-Fix Now'}</span>
                  </button>
                </div>
              </div>

              {/* Row 3: Campaign Anomaly */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF5F0] border border-[#F3DEC8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 transition-all hover:border-[#D94A2A]/40">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0 shadow-3xs">
                    <Search className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <h4 className="text-xs font-extrabold text-[#1E122C] leading-snug">
                      Campaign Anomaly: Artisan Brass Jewelry – Google Search Ads
                    </h4>
                    <p className="text-[10.5px] text-[#6B5E77] font-semibold leading-relaxed">
                      Clicks are higher but conversions dropped. Recommend negative keyword filters.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  <span className="text-xs font-black text-amber-600 sm:w-16 text-center">
                    Medium
                  </span>

                  <button
                    onClick={() => navigate('/ads')}
                    className="px-3.5 py-1.5 sm:py-2 bg-white hover:bg-[#FFF0EB] border border-[#F3DEC8] text-[#D94A2A] text-[11px] font-black rounded-xl shadow-2xs transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Manage Campaign</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Section B: Live AI Action Queue & Approvals */}
          <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-[#F3DEC8] p-5 sm:p-6 shadow-[0_8px_24px_rgba(75,29,107,0.03)] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#4B1D6B]/10 flex items-center justify-center text-[#4B1D6B]">
                  <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                </div>
                <h3 className="text-xs sm:text-sm font-black text-[#1E122C] tracking-tight">
                  AI Action Queue & Autonomous Execution
                </h3>
              </div>

              <button 
                onClick={() => navigate('/actions')}
                className="text-xs font-black text-[#8C1F3D] hover:text-[#D94A2A] transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-0"
              >
                <span>View all actions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Action Item 1: Needs Approval */}
              <div className="p-4 rounded-2xl bg-[#FFFDFB] border border-[#F3DEC8] space-y-3 transition-all hover:shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200">
                      Needs Approval
                    </span>
                    <span className="text-[10px] text-[#6B5E77] font-semibold">
                      Created 15m ago
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#D94A2A] bg-[#FFF0EB] px-2 py-0.5 rounded-lg border border-[#F3DEC8]">
                    Meta Ads Campaign
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-black text-[#1E122C]">
                    Launch Abandoned Cart Retargeting Ads on Instagram
                  </h4>
                  <p className="text-[11px] text-[#6B5E77] font-medium leading-relaxed pt-0.5">
                    Target visitors who added items to cart in the last 14 days with an automatic 10% coupon copy.
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-1 border-t border-[#F3DEC8]/50">
                  <button
                    onClick={() => dismissAction('act_1')}
                    className="px-3 py-1.5 text-[11px] font-bold text-[#6B5E77] hover:text-rose-600 transition-colors bg-transparent border-0 cursor-pointer"
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={() => handleApproveAction('act_1')}
                    disabled={approvingActionId === 'act_1'}
                    className="px-3.5 py-1.5 bg-[#4B1D6B] hover:bg-[#381352] text-white text-[11px] font-black rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer border-0"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{approvingActionId === 'act_1' ? 'Deploying...' : 'Approve & Publish'}</span>
                  </button>
                </div>
              </div>

              {/* Action Item 2: Running Automatic Task */}
              <div className="p-4 rounded-2xl bg-[#F4FDF8] border border-emerald-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-black text-emerald-950 truncate">
                      AI is auto-generating 3 SEO blog drafts for Summer Linen styling
                    </h4>
                    <p className="text-[10.5px] text-emerald-700 font-medium leading-tight pt-0.5">
                      Targeting keywords: &quot;eco-friendly fashion guide&quot;, &quot;capsule wardrobe care&quot;
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0">
                  Running
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right 4 Columns */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Card 1: Performance Snapshot */}
          <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-[#F3DEC8] p-5 sm:p-6 shadow-[0_8px_24px_rgba(75,29,107,0.03)] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#D94A2A]/10 flex items-center justify-center text-[#D94A2A]">
                  <BarChart2 className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-black text-[#1E122C] tracking-tight">
                  Performance Snapshot
                </h3>
              </div>

              <div className="flex items-center gap-1 text-[10px] font-bold text-[#6B5E77] bg-[#FAF5F0] px-2 py-1 rounded-lg border border-[#F3DEC8] cursor-pointer">
                <span>This Month</span>
                <ChevronDown className="w-3 h-3" />
              </div>
            </div>

            {/* Metric 1: Website Visitors (with orange sparkline) */}
            <div className="space-y-1 pt-1">
              <span className="text-[10px] font-bold text-[#6B5E77] block">Website Visitors</span>
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#1E122C]">12.4K</span>
                  <span className="text-[11px] font-black text-emerald-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-0.5" /> 12%
                  </span>
                </div>
                {/* Sparkline Curve */}
                <svg className="w-24 h-7 text-[#D94A2A]" viewBox="0 0 100 30" fill="none">
                  <path d="M0 25 Q 25 15, 50 18 T 75 8 T 100 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="75" cy="8" r="3.5" fill="#D94A2A" />
                </svg>
              </div>
            </div>

            {/* Metric 2: Campaign Clicks (with purple sparkline) */}
            <div className="space-y-1 pt-2 border-t border-[#F3DEC8]/60">
              <span className="text-[10px] font-bold text-[#6B5E77] block">Campaign Clicks</span>
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#1E122C]">2.8K</span>
                  <span className="text-[11px] font-black text-rose-500 flex items-center">
                    <TrendingDown className="w-3 h-3 mr-0.5" /> 6%
                  </span>
                </div>
                {/* Sparkline Curve */}
                <svg className="w-24 h-7 text-[#4B1D6B]" viewBox="0 0 100 30" fill="none">
                  <path d="M0 10 Q 25 22, 50 14 T 75 18 T 100 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Mini Summary Stats */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#F3DEC8]/60 text-left">
              <div className="bg-[#FAF5F0] p-2.5 rounded-xl border border-[#F3DEC8]">
                <span className="text-[9px] font-bold text-[#6B5E77] block">Conv. Rate</span>
                <strong className="text-xs font-black text-[#1E122C]">3.4%</strong>
                <span className="text-[9px] font-bold text-emerald-600 block">+0.8%</span>
              </div>
              <div className="bg-[#FAF5F0] p-2.5 rounded-xl border border-[#F3DEC8]">
                <span className="text-[9px] font-bold text-[#6B5E77] block">Avg. ROAS</span>
                <strong className="text-xs font-black text-[#1E122C]">4.2x</strong>
                <span className="text-[9px] font-bold text-emerald-600 block">+18%</span>
              </div>
            </div>
          </div>

          {/* Card 2: Connected Channels & Health */}
          <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-[#F3DEC8] p-5 sm:p-6 shadow-[0_8px_24px_rgba(75,29,107,0.03)] space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#4B1D6B]/10 flex items-center justify-center text-[#4B1D6B]">
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-black text-[#1E122C] tracking-tight">
                  Connected Channels
                </h3>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-[#FAF5F0] border border-[#F3DEC8]">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-[#F3E8FF] text-[#4B1D6B] flex items-center justify-center text-[10px] font-black">
                    G
                  </div>
                  <span className="font-bold text-[#1E122C] text-[11px]">Google Ads</span>
                </div>
                <span className="text-[9px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                  Active • 98%
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-[#FAF5F0] border border-[#F3DEC8]">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-[#FFF0EB] text-[#D94A2A] flex items-center justify-center text-[10px] font-black">
                    IG
                  </div>
                  <span className="font-bold text-[#1E122C] text-[11px]">Instagram Business</span>
                </div>
                <span className="text-[9px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                  Active • 100%
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-[#FAF5F0] border border-[#F3DEC8]">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-purple-50 text-purple-700 flex items-center justify-center text-[10px] font-black">
                    EM
                  </div>
                  <span className="font-bold text-[#1E122C] text-[11px]">Email Automations</span>
                </div>
                <span className="text-[9px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                  Active • 95%
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Recent AI Activity Stream */}
          <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-[#F3DEC8] p-5 sm:p-6 shadow-[0_8px_24px_rgba(75,29,107,0.03)] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#4B1D6B]/10 flex items-center justify-center text-[#4B1D6B]">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-black text-[#1E122C] tracking-tight">
                  Recent Activity Stream
                </h3>
              </div>

              <button 
                onClick={() => navigate('/results')}
                className="text-xs font-black text-[#8C1F3D] hover:text-[#D94A2A] transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-0"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Activity List */}
            <div className="space-y-3 pt-1 text-xs">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-[#4B1D6B] mt-1 shrink-0" />
                  <span className="text-[#1E122C] font-semibold leading-tight truncate">Campaign &quot;Summer Collection&quot; created</span>
                </div>
                <span className="text-[10px] text-[#6B5E77] font-medium shrink-0">2h ago</span>
              </div>

              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-[#D94A2A] mt-1 shrink-0" />
                  <span className="text-[#1E122C] font-semibold leading-tight truncate">Content calendar generated</span>
                </div>
                <span className="text-[10px] text-[#6B5E77] font-medium shrink-0">4h ago</span>
              </div>

              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-[#8C1F3D] mt-1 shrink-0" />
                  <span className="text-[#1E122C] font-semibold leading-tight truncate">AI analysis completed for your website</span>
                </div>
                <span className="text-[10px] text-[#6B5E77] font-medium shrink-0">6h ago</span>
              </div>

              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-[#4B1D6B] mt-1 shrink-0" />
                  <span className="text-[#1E122C] font-semibold leading-tight truncate">New audience segment identified</span>
                </div>
                <span className="text-[10px] text-[#6B5E77] font-medium shrink-0">1d ago</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================
          5. RECOMMENDED FOR YOU (FULL WIDTH 3 CARDS)
          ======================================================== */}
      <div className="space-y-3.5 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
              <Lightbulb className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h3 className="text-xs sm:text-sm font-black text-[#1E122C] tracking-tight">
              Recommended for You
            </h3>
          </div>

          <button 
            onClick={() => navigate('/recommendations')}
            className="text-xs font-black text-[#8C1F3D] hover:text-[#D94A2A] transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-0"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Improve Mobile CTA */}
          <div 
            onClick={() => navigate('/onboarding')}
            className="p-5 rounded-[24px] bg-white border border-[#F3DEC8] shadow-2xs flex items-center justify-between gap-4 cursor-pointer hover:border-[#D94A2A]/50 hover:-translate-y-0.5 transition-all group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-[#F5EEFB] border border-[#E9D5F7] flex items-center justify-center text-[#4B1D6B] shrink-0">
                <Smartphone className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <h4 className="text-xs font-black text-[#1E122C] leading-snug truncate">Improve Mobile CTA</h4>
                <p className="text-[11px] text-[#6B5E77] font-semibold leading-relaxed">
                  Make your key button more visible on mobile.
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#D94A2A] group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
          </div>

          {/* Card 2: Boost Organic Reach */}
          <div 
            onClick={() => navigate('/content')}
            className="p-5 rounded-[24px] bg-white border border-[#F3DEC8] shadow-2xs flex items-center justify-between gap-4 cursor-pointer hover:border-[#D94A2A]/50 hover:-translate-y-0.5 transition-all group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-[#F5EEFB] border border-[#E9D5F7] flex items-center justify-center text-[#4B1D6B] shrink-0">
                <BarChart2 className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <h4 className="text-xs font-black text-[#1E122C] leading-snug truncate">Boost Organic Reach</h4>
                <p className="text-[11px] text-[#6B5E77] font-semibold leading-relaxed">
                  Try content ideas based on trending topics.
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#D94A2A] group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
          </div>

          {/* Card 3: Optimize Ad Spend */}
          <div 
            onClick={() => navigate('/ads')}
            className="p-5 rounded-[24px] bg-white border border-[#F3DEC8] shadow-2xs flex items-center justify-between gap-4 cursor-pointer hover:border-[#D94A2A]/50 hover:-translate-y-0.5 transition-all group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-[#FFF1EB] border border-[#FAD8C7] flex items-center justify-center text-[#D94A2A] shrink-0">
                <Target className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <h4 className="text-xs font-black text-[#1E122C] leading-snug truncate">Optimize Ad Spend</h4>
                <p className="text-[11px] text-[#6B5E77] font-semibold leading-relaxed">
                  Refine keywords to reduce CPC.
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#D94A2A] group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
