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
  X,
  Sparkles,
  MessageSquare,
  Users,
  ChevronDown,
  ChevronRight,
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

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

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
  subItems: SubMenuItem[];
}

const ALL_CHANNEL_CONFIGS: Record<string, ChannelNavConfig> = {
  blog: {
    id: 'blog',
    title: 'AI Blog Writer',
    icon: FileText,
    primaryRoute: '/blog?tab=write',
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
    subItems: [
      { to: '/website', label: 'SEO Audit & Health', icon: Globe },
      { to: '/discover', label: 'Keyword & Competitors', icon: Compass },
      { to: '/results', label: 'Organic Rankings', icon: BarChart3 }
    ]
  },
  sem: {
    id: 'sem',
    title: 'Paid Ads',
    icon: Zap,
    primaryRoute: '/ads',
    subItems: [
      { to: '/ads', label: 'Ad Manager & Funnels', icon: Target },
      { to: '/content', label: 'Creative Studio', icon: Sparkles },
      { to: '/results', label: 'ROAS & Conversions', icon: BarChart3 }
    ]
  },
  email: {
    id: 'email',
    title: 'Email',
    icon: Mail,
    primaryRoute: '/email?tab=builder',
    subItems: [
      { to: '/email?tab=builder', label: 'Email Studio', icon: Sparkles },
      { to: '/email?tab=domain', label: 'Domain Setup', icon: Globe },
      { to: '/email?tab=subscribers', label: 'Audience', icon: Users },
      { to: '/email?tab=analytics', label: 'Analytics', icon: BarChart3 }
    ]
  },
  whatsapp: {
    id: 'whatsapp',
    title: 'WhatsApp',
    icon: MessageSquare,
    primaryRoute: '/whatsapp?tab=broadcast',
    subItems: [
      { to: '/whatsapp?tab=broadcast', label: 'Broadcast Studio', icon: Sparkles },
      { to: '/whatsapp?tab=templates', label: 'Message Templates', icon: BookOpen },
      { to: '/whatsapp?tab=automation', label: 'Automated Bot & Alerts', icon: Zap },
      { to: '/whatsapp?tab=analytics', label: 'Delivery & Read Rates', icon: BarChart3 }
    ]
  },
  social: {
    id: 'social',
    title: 'Social Media',
    icon: Share2,
    primaryRoute: '/content',
    subItems: [
      { to: '/content', label: 'Reels & Post Studio', icon: Sparkles },
      { to: '/plan', label: 'Publishing Calendar', icon: Calendar },
      { to: '/results', label: 'Reach & Engagement', icon: BarChart3 }
    ]
  }
};

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { setAssistantOpen, activeWorkspace, actions } = useMarketing();
  const location = useLocation();
  const navigate = useNavigate();

  const brandName = activeWorkspace?.name || 'Bloom Boutique';
  const userChannels = activeWorkspace?.channels || [];

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

  const getActiveChannelForRoute = (pathname: string): string | null => {
    if (pathname.startsWith('/email')) return 'email';
    if (pathname.startsWith('/whatsapp')) return 'whatsapp';
    if (pathname.startsWith('/blog')) return 'blog';
    if (pathname.startsWith('/ads')) return 'sem';
    if (pathname.startsWith('/website')) return 'seo';
    return null;
  };

  const [expandedChannels, setExpandedChannels] = useState<Record<string, boolean>>({});

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
    onClose();
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
      <div key={channelKey} className={`rounded-2xl overflow-hidden transition-all bg-white border border-[#EDE8F8] shadow-3xs hover:border-[#DDD6FE] ${
        isChannelActiveOnRoute ? 'ring-1 ring-[#DDD6FE]' : ''
      }`}>
        <div
          onClick={() => handleChannelClick(channelKey, config.primaryRoute)}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold transition-colors cursor-pointer group ${
            isChannelActiveOnRoute ? 'text-[#7C3AED] font-black' : 'text-[#334155] hover:text-[#7C3AED]'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`w-7 h-7 rounded-xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
              isChannelActiveOnRoute ? 'bg-[#EDE8FD] border-[#DDD6FE] text-[#7C3AED]' : 'bg-[#F5F0FF] border-[#E9DDFE] text-[#7C3AED]'
            }`}>
              <ChannelIcon className="w-3.5 h-3.5" />
            </div>
            <span className="truncate text-left font-extrabold text-[#1E122C] group-hover:text-[#7C3AED] text-xs">{config.title}</span>
          </div>

          <button
            type="button"
            onClick={(e) => handleChevronToggle(e, channelKey)}
            className="p-1 hover:bg-[#F0EBFC] rounded-md transition-colors shrink-0"
          >
            {isExpanded ? (
              <ChevronDown className="w-3.5 h-3.5 text-[#8B7F9E]" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-[#8B7F9E]" />
            )}
          </button>
        </div>

        {isExpanded && (
          <div className="px-2 pb-2 pt-0.5 space-y-0.5 border-t border-[#EDE8F8] bg-[#FAF8FE] animate-in fade-in duration-200">
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
                  onClick={onClose}
                  className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all
                    ${isSubActive 
                      ? 'bg-white text-[#7C3AED] font-black shadow-3xs border border-[#DDD6FE]' 
                      : 'text-[#64748B] hover:text-[#7C3AED] hover:bg-white'
                    }
                  `}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isSubActive ? 'bg-[#7C3AED]' : 'bg-[#7C3AED]/30'}`} />
                  <SubIcon className={`w-3 h-3 shrink-0 ${isSubActive ? 'text-[#7C3AED]' : 'text-[#8B7F9E]'}`} />
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#1E122C]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed left-0 top-0 bottom-0 w-72 bg-[#FAF8FE] flex flex-col z-50 animate-in slide-in-from-left duration-200 border-r border-[#EDE8F8]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-20 border-b border-[#EDE8F8] bg-[#FAF8FE] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white border border-[#EDE8F8] flex items-center justify-center shadow-xs shrink-0 overflow-hidden p-1">
              <img src="/growwise-icon.png" alt="GrowWise AI" className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0">
              <span className="font-black text-[#1E122C] text-sm truncate block leading-tight">{brandName}</span>
              <span className="text-[10px] text-[#7C3AED] font-bold block leading-none pt-0.5">GrowWise AI</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#8B7F9E] hover:bg-[#F0EBFC] hover:text-[#1E122C] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Area */}
        <nav className="flex-1 px-3.5 py-4 space-y-4 overflow-y-auto custom-scrollbar">
          {/* Top Pinned: Home & Leads CRM */}
          <div className="space-y-1">
            <NavLink
              to="/dashboard"
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200
                ${isActive 
                  ? 'bg-[#F3EAFF] text-[#7C3AED] font-black border-l-4 border-[#7C3AED] rounded-l-none shadow-xs' 
                  : 'text-[#475569] hover:text-[#7C3AED] hover:bg-white'
                }
              `}
            >
              <Home className="w-4 h-4 shrink-0 text-[#7C3AED]" />
              <span>Home Overview</span>
            </NavLink>

            <NavLink
              to="/contacts"
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200
                ${isActive 
                  ? 'bg-[#F3EAFF] text-[#7C3AED] font-black border-l-4 border-[#7C3AED] rounded-l-none shadow-xs' 
                  : 'text-[#475569] hover:text-[#7C3AED] hover:bg-white'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 shrink-0 text-[#7C3AED]" />
                <span>Leads &amp; Audience</span>
              </div>
            </NavLink>
          </div>

          {/* 1. Campaigns Group */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 px-3 pt-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#8B7F9E]">
                Campaigns
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899] animate-pulse" />
            </div>

            <div className="space-y-1.5">
              {campaignChannels.map((channelKey) => renderChannelItem(channelKey))}
            </div>
          </div>

          {/* 2. Marketing Channels & Content Group */}
          {otherChannels.length > 0 && (
            <div className="space-y-2 pt-1 border-t border-[#EDE8F8]">
              <div className="flex items-center px-3 pt-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#8B7F9E]">
                  Content &amp; Channels
                </span>
              </div>

              <div className="space-y-1.5">
                {otherChannels.map((channelKey) => renderChannelItem(channelKey))}
              </div>
            </div>
          )}

          {/* Workspace Tools */}
          <div className="space-y-1 pt-1 border-t border-[#EDE8F8]">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#8B7F9E] px-3 block">
              Workspace Tools
            </span>

            <NavLink
              to="/actions"
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200
                ${isActive 
                  ? 'bg-[#F3EAFF] text-[#7C3AED] font-black border-l-4 border-[#7C3AED] rounded-l-none shadow-xs' 
                  : 'text-[#475569] hover:text-[#7C3AED] hover:bg-white'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-[#7C3AED] shrink-0" />
                <span>AI Actions</span>
              </div>
              {pendingActionsCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-md bg-[#EC4899] text-white text-[9px] font-black leading-none">
                  {pendingActionsCount}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/plan"
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200
                ${isActive 
                  ? 'bg-[#F3EAFF] text-[#7C3AED] font-black border-l-4 border-[#7C3AED] rounded-l-none shadow-xs' 
                  : 'text-[#475569] hover:text-[#7C3AED] hover:bg-white'
                }
              `}
            >
              <Calendar className="w-4 h-4 text-[#7C3AED] shrink-0" />
              <span>Strategy Calendar</span>
            </NavLink>

            <NavLink
              to="/results"
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200
                ${isActive 
                  ? 'bg-[#F3EAFF] text-[#7C3AED] font-black border-l-4 border-[#7C3AED] rounded-l-none shadow-xs' 
                  : 'text-[#475569] hover:text-[#7C3AED] hover:bg-white'
                }
              `}
            >
              <BarChart3 className="w-4 h-4 text-[#7C3AED] shrink-0" />
              <span>ROI &amp; Analytics</span>
            </NavLink>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-3.5 border-t border-[#EDE8F8] space-y-2 bg-[#FAF8FE] shrink-0">
          <button
            onClick={() => { onClose(); setAssistantOpen(true); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#1E122C] bg-white hover:bg-[#F3EAFF] border border-[#EDE8F8] shadow-3xs transition-all cursor-pointer group"
          >
            <div className="w-5 h-5 rounded-lg bg-[#F5F0FF] border border-[#E0D4FA] flex items-center justify-center shrink-0 overflow-hidden p-0.5 group-hover:scale-105 transition-transform">
              <img src="/growwise-icon.png" alt="GrowWise AI" className="w-full h-full object-contain" />
            </div>
            <span className="group-hover:text-[#7C3AED] transition-colors">Ask GrowWise AI</span>
          </button>

          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) => `
              flex items-center gap-3 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all
              ${isActive 
                ? 'bg-[#F3EAFF] text-[#7C3AED] font-black' 
                : 'text-[#475569] hover:text-[#7C3AED] hover:bg-white'
              }
            `}
          >
            <Settings className="w-4 h-4 text-[#7C3AED] shrink-0" />
            <span>Settings</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
