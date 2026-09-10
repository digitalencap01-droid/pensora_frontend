import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  Compass, 
  Calendar, 
  Zap, 
  BarChart3, 
  Settings, 
  Sparkles,
  MessageSquare,
  Users,
  ChevronRight,
  ChevronDown,
  Globe,
  DollarSign,
  FileText,
  Mail,
  Share2,
  Search,
  Target,
  BookOpen
} from 'lucide-react';
import { useMarketing } from '../../context/MarketingContext';

interface SubMenuItem {
  to: string;
  label: string;
  icon: React.ElementType;
}

interface ChannelNavConfig {
  id: string;
  title: string;
  icon: React.ElementType;
  primaryRoute: string;
  badge?: string;
  subItems: SubMenuItem[];
}

const ALL_CHANNEL_CONFIGS: Record<string, ChannelNavConfig> = {
  blog: {
    id: 'blog',
    title: 'AI Blog Writer',
    icon: FileText,
    primaryRoute: '/blog?tab=write',
    badge: 'Articles',
    subItems: [
      { to: '/blog?tab=write', label: 'Write New Article', icon: Sparkles },
      { to: '/blog?tab=library', label: 'Post History & Drafts', icon: BookOpen },
      { to: '/blog?tab=overview', label: 'Blog Overview', icon: BarChart3 }
    ]
  },
  linkedin: {
    id: 'linkedin',
    title: 'LinkedIn',
    icon: Briefcase,
    primaryRoute: '/content',
    badge: 'B2B',
    subItems: [
      { to: '/content', label: 'Post Creator & Studio', icon: Sparkles },
      { to: '/contacts?source=LinkedIn', label: 'LinkedIn Leads & Prospects', icon: Users },
      { to: '/discover', label: 'Audience & Network Insights', icon: Compass }
    ]
  },
  seo: {
    id: 'seo',
    title: 'SEO Optimization',
    icon: Search,
    primaryRoute: '/website',
    badge: 'Organic',
    subItems: [
      { to: '/website', label: 'SEO Audit & Health', icon: Globe },
      { to: '/discover', label: 'Keyword & Competitors', icon: Compass },
      { to: '/results', label: 'Organic Rankings', icon: BarChart3 }
    ]
  },
  sem: {
    id: 'sem',
    title: 'SEM & Paid Ads',
    icon: DollarSign,
    primaryRoute: '/ads',
    badge: 'Paid',
    subItems: [
      { to: '/ads', label: 'Ad Campaigns & Funnels', icon: Target },
      { to: '/content', label: 'Ad Creative Studio', icon: Sparkles },
      { to: '/results', label: 'ROAS & Conversions', icon: BarChart3 }
    ]
  },
  email: {
    id: 'email',
    title: 'Email Campaign',
    icon: Mail,
    primaryRoute: '/email?tab=builder',
    badge: 'Email',
    subItems: [
      { to: '/email?tab=builder', label: 'Email Studio & Campaigns', icon: Sparkles },
      { to: '/email?tab=domain', label: 'Sender Domain & DNS', icon: Globe },
      { to: '/email?tab=subscribers', label: 'Audience & Contacts', icon: Users },
      { to: '/email?tab=analytics', label: 'Deliverability & Analytics', icon: BarChart3 }
    ]
  },
  whatsapp: {
    id: 'whatsapp',
    title: 'WhatsApp Campaign',
    icon: MessageSquare,
    primaryRoute: '/whatsapp?tab=broadcast',
    badge: 'Direct',
    subItems: [
      { to: '/whatsapp?tab=broadcast', label: 'Broadcast Studio', icon: Sparkles },
      { to: '/whatsapp?tab=templates', label: 'Message Templates', icon: BookOpen },
      { to: '/whatsapp?tab=audiences', label: 'Audience Lists & Opt-ins', icon: Users },
      { to: '/whatsapp?tab=automation', label: 'Automated Bot & Alerts', icon: Zap },
      { to: '/whatsapp?tab=analytics', label: 'Delivery & Read Rates', icon: BarChart3 }
    ]
  },
  social: {
    id: 'social',
    title: 'Social Media',
    icon: Share2,
    primaryRoute: '/content',
    badge: 'Viral',
    subItems: [
      { to: '/content', label: 'Reels & Post Studio', icon: Sparkles },
      { to: '/plan', label: 'Publishing Calendar', icon: Calendar },
      { to: '/results', label: 'Reach & Engagement', icon: BarChart3 }
    ]
  }
};

export const Sidebar: React.FC = () => {
  const { setAssistantOpen, activeWorkspace, actions } = useMarketing();
  const location = useLocation();
  const navigate = useNavigate();

  const brandName = activeWorkspace?.name || 'Bloom Boutique';
  const userChannels = activeWorkspace?.channels || [];

  // Normalize channel keys
  const activeChannelKeys = Array.from(new Set(
    userChannels.map(ch => {
      const lower = ch.toLowerCase();
      if (lower === 'search_console' || lower === 'google') return 'seo';
      if (lower === 'google_ads' || lower === 'ads') return 'sem';
      if (lower === 'instagram' || lower === 'facebook' || lower === 'tiktok' || lower === 'twitter') return 'social';
      return lower;
    })
  )).filter(key => ALL_CHANNEL_CONFIGS[key]);

  // Campaign channels (Email & WhatsApp)
  const campaignChannels = ['email', 'whatsapp'];

  // Other channels (Blog, LinkedIn, SEO, SEM, Social, etc.)
  const otherChannels = activeChannelKeys.length > 0 
    ? activeChannelKeys.filter(k => !campaignChannels.includes(k))
    : ['blog', 'linkedin', 'seo', 'social'];

  // Helper to determine which channel matches the current route
  const getActiveChannelForRoute = (pathname: string): string | null => {
    if (pathname.startsWith('/email')) return 'email';
    if (pathname.startsWith('/whatsapp')) return 'whatsapp';
    if (pathname.startsWith('/blog')) return 'blog';
    if (pathname.startsWith('/ads')) return 'sem';
    if (pathname.startsWith('/website')) return 'seo';
    return null;
  };

  // State to track manually toggled or active channel dropdowns
  const [expandedChannels, setExpandedChannels] = useState<Record<string, boolean>>({});

  // Auto-expand the channel if currently on its active route
  useEffect(() => {
    const routeChannel = getActiveChannelForRoute(location.pathname);
    if (routeChannel) {
      setExpandedChannels(prev => ({
        ...prev,
        [routeChannel]: true
      }));
    }
  }, [location.pathname]);

  const handleChannelClick = (channelKey: string, primaryRoute: string) => {
    setExpandedChannels(prev => ({
      ...prev,
      [channelKey]: !prev[channelKey]
    }));
    navigate(primaryRoute);
  };

  const handleChevronToggle = (e: React.MouseEvent, channelKey: string) => {
    e.stopPropagation();
    setExpandedChannels(prev => ({
      ...prev,
      [channelKey]: !prev[channelKey]
    }));
  };

  const renderChannelItem = (channelKey: string) => {
    const config = ALL_CHANNEL_CONFIGS[channelKey];
    if (!config) return null;

    const isChannelActiveOnRoute = 
      (channelKey === 'email' && location.pathname.startsWith('/email')) ||
      (channelKey === 'whatsapp' && location.pathname.startsWith('/whatsapp')) ||
      (channelKey === 'blog' && location.pathname.startsWith('/blog')) ||
      (channelKey === 'sem' && location.pathname.startsWith('/ads')) ||
      (channelKey === 'seo' && location.pathname.startsWith('/website'));

    const isExpanded = !!expandedChannels[channelKey];
    const ChannelIcon = config.icon;

    return (
      <div key={channelKey} className={`rounded-xl overflow-hidden transition-all ${
        isChannelActiveOnRoute ? 'bg-white/90 border border-[#D94A2A]/40 shadow-3xs' : 'bg-white/40 border border-[#F3DEC8]/50 hover:bg-white/70'
      }`}>
        {/* Top-Level Channel Header */}
        <div
          onClick={() => handleChannelClick(channelKey, config.primaryRoute)}
          className={`w-full flex items-center justify-between px-3 py-2 text-xs font-black transition-colors cursor-pointer group ${
            isChannelActiveOnRoute ? 'text-[#D94A2A]' : 'text-[#1E122C]'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
              isChannelActiveOnRoute ? 'bg-[#FFEFEA] border-[#FAD8C7] text-[#D94A2A]' : 'bg-[#FAF5F0] border-[#F3DEC8] text-[#8C1F3D]'
            }`}>
              <ChannelIcon className="w-3.5 h-3.5" />
            </div>
            <span className="truncate text-left">{config.title}</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {config.badge && (
              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-md bg-[#FAF5F0] text-[#8C1F3D] border border-[#F3DEC8]/80">
                {config.badge}
              </span>
            )}
            <button
              type="button"
              onClick={(e) => handleChevronToggle(e, channelKey)}
              className="p-1 hover:bg-[#FAF5F0] rounded-md transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="w-3.5 h-3.5 text-[#6B5E77]" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-[#6B5E77]" />
              )}
            </button>
          </div>
        </div>

        {/* Channel Submenus (Only shown when expanded) */}
        {isExpanded && (
          <div className="px-2 pb-2 pt-0.5 space-y-0.5 border-t border-[#F3DEC8]/40 bg-[#FAF5F0]/30 animate-in fade-in duration-200">
            {config.subItems.map((subItem) => {
              const SubIcon = subItem.icon;
              const currentFull = location.pathname + location.search;
              const isSubActive = currentFull === subItem.to || 
                (subItem.to.includes('?tab=') && location.pathname === subItem.to.split('?')[0] && (
                  location.search === subItem.to.slice(subItem.to.indexOf('?')) || 
                  (!location.search && (subItem.to.includes('tab=builder') || subItem.to.includes('tab=broadcast') || subItem.to.includes('tab=write')))
                ));

              return (
                <NavLink
                  key={`${channelKey}-${subItem.to}-${subItem.label}`}
                  to={subItem.to}
                  className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all
                    ${isSubActive 
                      ? 'bg-white text-[#D94A2A] font-black shadow-3xs border border-[#F3DEC8]' 
                      : 'text-[#6B5E77] hover:text-[#1E122C] hover:bg-white/60'
                    }
                  `}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isSubActive ? 'bg-[#D94A2A]' : 'bg-[#D94A2A]/40'}`} />
                  <SubIcon className={`w-3 h-3 shrink-0 ${isSubActive ? 'text-[#D94A2A]' : 'text-[#6B5E77]'}`} />
                  <span className="truncate">{subItem.label}</span>
                </NavLink>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const pendingActionsCount = actions.filter(a => a.status === 'needs_approval' || a.status === 'working').length;

  return (
    <aside 
      className="hidden lg:flex flex-col w-64 border-r border-[#F3DEC8]/70 bg-[#FEF9F5] h-screen fixed left-0 top-0 z-30 select-none overflow-hidden"
    >
      {/* 1. Brand Header */}
      <div className="flex items-center gap-3 px-5 h-20 border-b border-[#F3DEC8]/60 relative z-10 bg-white/40 shrink-0">
        <div className="w-10 h-10 rounded-2xl bg-white border border-[#F3DEC8] flex items-center justify-center shadow-xs shrink-0 overflow-hidden p-1">
          <img src="/growwise-icon.png" alt="GrowWise AI" className="w-full h-full object-contain" />
        </div>
        <div className="min-w-0">
          <h2 className="font-black text-[#1E122C] text-sm tracking-tight truncate leading-tight">
            {brandName}
          </h2>
          <span className="text-[10px] text-[#D94A2A] font-bold block leading-none pt-0.5">
            GrowWise AI
          </span>
        </div>
      </div>

      {/* 2. Scrollable Navigation Menu Area */}
      <nav className="flex-1 px-3.5 py-4 space-y-4 overflow-y-auto relative z-10 custom-scrollbar">
        
        {/* Top Pinned: Home / Overview & Leads CRM */}
        <div className="space-y-1">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `
              flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200
              ${isActive 
                ? 'bg-[#FFEFEA] text-[#D94A2A] font-black border-l-4 border-[#D94A2A] rounded-l-none shadow-2xs' 
                : 'text-[#6B5E77] hover:text-[#1E122C] hover:bg-white/70'
              }
            `}
          >
            <Home className="w-4 h-4 shrink-0 text-[#D94A2A]" />
            <span>Home Overview</span>
          </NavLink>

          <NavLink
            to="/contacts"
            className={({ isActive }) => `
              flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200
              ${isActive 
                ? 'bg-[#FFEFEA] text-[#8C1F3D] font-black border-l-4 border-[#8C1F3D] rounded-l-none shadow-2xs' 
                : 'text-[#6B5E77] hover:text-[#1E122C] hover:bg-white/70'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 shrink-0 text-[#8C1F3D]" />
              <span>Leads &amp; Audience CRM</span>
            </div>
            <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded-md bg-[#FAF5F0] text-[#8C1F3D] border border-[#F3DEC8]">
              All Leads
            </span>
          </NavLink>
        </div>

        {/* 1. Campaigns Group */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-3 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[9.5px] font-black uppercase tracking-wider text-[#8C1F3D]">
                Campaigns
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse" />
            </div>
            <span className="text-[8.5px] font-bold text-[#EA580C] bg-[#FFF0E6] border border-[#FAD8C7] px-1.5 py-0.5 rounded-md">
              {campaignChannels.length} Channels
            </span>
          </div>

          <div className="space-y-1.5">
            {campaignChannels.map((channelKey) => renderChannelItem(channelKey))}
          </div>
        </div>

        {/* 2. Marketing Channels & Content Group */}
        {otherChannels.length > 0 && (
          <div className="space-y-2 pt-1 border-t border-[#F3DEC8]/50">
            <div className="flex items-center justify-between px-3 pt-1">
              <span className="text-[9.5px] font-black uppercase tracking-wider text-[#8A8294]">
                Channels &amp; Content
              </span>
              <span className="text-[8.5px] font-bold text-[#6B5E77] bg-[#FAF5F0] border border-[#F3DEC8] px-1.5 py-0.5 rounded-md">
                {otherChannels.length} Active
              </span>
            </div>

            <div className="space-y-1.5">
              {otherChannels.map((channelKey) => renderChannelItem(channelKey))}
            </div>
          </div>
        )}

        {/* General Management Tools */}
        <div className="space-y-1 pt-1">
          <span className="text-[9.5px] font-black uppercase tracking-wider text-[#8A8294] px-3 block">
            Workspace Tools
          </span>

          <NavLink
            to="/actions"
            className={({ isActive }) => `
              flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200
              ${isActive 
                ? 'bg-[#FFEFEA] text-[#D94A2A] font-black border-l-4 border-[#D94A2A] rounded-l-none shadow-2xs' 
                : 'text-[#6B5E77] hover:text-[#1E122C] hover:bg-white/70'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <Zap className="w-4 h-4 text-[#D94A2A] shrink-0" />
              <span>AI Actions</span>
            </div>
            {pendingActionsCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-md bg-[#D94A2A] text-white text-[9px] font-black leading-none">
                {pendingActionsCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/plan"
            className={({ isActive }) => `
              flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200
              ${isActive 
                ? 'bg-[#FFEFEA] text-[#D94A2A] font-black border-l-4 border-[#D94A2A] rounded-l-none shadow-2xs' 
                : 'text-[#6B5E77] hover:text-[#1E122C] hover:bg-white/70'
              }
            `}
          >
            <Calendar className="w-4 h-4 text-[#7E22CE] shrink-0" />
            <span>Strategy Calendar</span>
          </NavLink>

          <NavLink
            to="/results"
            className={({ isActive }) => `
              flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200
              ${isActive 
                ? 'bg-[#FFEFEA] text-[#D94A2A] font-black border-l-4 border-[#D94A2A] rounded-l-none shadow-2xs' 
                : 'text-[#6B5E77] hover:text-[#1E122C] hover:bg-white/70'
              }
            `}
          >
            <BarChart3 className="w-4 h-4 text-[#10B981] shrink-0" />
            <span>ROI & Analytics</span>
          </NavLink>
        </div>

      </nav>

      {/* 3. Footer Nav & Profile Card */}
      <div className="p-3.5 border-t border-[#F3DEC8]/70 space-y-2 relative z-10 bg-white/60 backdrop-blur-xs shrink-0">
        {/* Ask GrowWise AI Pill Button */}
        <button
          onClick={() => setAssistantOpen(true)}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#1E122C] bg-white hover:bg-[#FFF8F5] transition-all border border-[#F3DEC8] hover:border-[#D94A2A]/40 shadow-3xs hover:shadow-2xs cursor-pointer group"
        >
          <div className="w-5 h-5 rounded-lg bg-[#FFF8F5] border border-[#F3DEC8] flex items-center justify-center shrink-0 overflow-hidden p-0.5 group-hover:scale-105 transition-transform">
            <img src="/growwise-icon.png" alt="GrowWise AI" className="w-full h-full object-contain" />
          </div>
          <span className="group-hover:text-[#D94A2A] transition-colors">Ask GrowWise AI</span>
        </button>

        <NavLink
          to="/settings"
          className={({ isActive }) => `
            flex items-center gap-3 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all
            ${isActive 
              ? 'bg-[#FFEFEA] text-[#D94A2A]' 
              : 'text-[#6B5E77] hover:text-[#1E122C] hover:bg-white/90'
            }
          `}
        >
          <Settings className="w-4 h-4 text-[#4B1D6B] shrink-0" />
          <span>Settings</span>
        </NavLink>

        {/* User Workspace Profile Pill */}
        <div className="pt-0.5">
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/90 border border-[#F3DEC8] shadow-2xs cursor-pointer hover:border-[#D94A2A]/40 transition-all">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-[#2D0B3F] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                {brandName.charAt(0)}
              </div>
              <div className="min-w-0 text-left">
                <h5 className="text-[11px] font-black text-[#1E122C] truncate leading-tight">
                  {brandName}
                </h5>
                <span className="text-[9px] text-[#6B5E77] font-semibold block leading-none">
                  Owner
                </span>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#6B5E77] shrink-0" />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
