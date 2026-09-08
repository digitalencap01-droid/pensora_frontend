import React from 'react';
import { NavLink } from 'react-router-dom';
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
  ChevronRight
} from 'lucide-react';
import { useMarketing } from '../../context/MarketingContext';

export const Sidebar: React.FC = () => {
  const { setAssistantOpen, activeWorkspace } = useMarketing();

  const navItems = [
    { to: '/dashboard', label: 'Home', icon: Home },
    { to: '/contacts', label: 'Contacts', icon: Users },
    { to: '/settings', label: 'My Business', icon: Briefcase },
    { to: '/discover', label: 'Discover', icon: Compass },
    { to: '/plan', label: 'Plan', icon: Calendar },
    { to: '/actions', label: 'Actions', icon: Zap },
    { to: '/results', label: 'Results', icon: BarChart3 },
  ];

  const brandName = activeWorkspace?.name || 'Bloom Boutique';

  return (
    <aside 
      className="hidden lg:flex flex-col w-64 border-r border-[#F3DEC8]/70 bg-[#FEF9F5] h-screen fixed left-0 top-0 z-30 select-none overflow-hidden"
    >
      {/* Background Decorative Wave in Lower-Left Corner */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden opacity-90">
        <img
          src="/dashboard-sidebar-wave.png"
          alt=""
          className="w-full h-full object-cover object-bottom pointer-events-none"
        />
      </div>

      {/* 1. Brand Header */}
      <div className="flex items-center gap-3 px-6 h-20 border-b border-[#F3DEC8]/60 relative z-10">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D94A2A] via-[#8C1F3D] to-[#4B1D6B] flex items-center justify-center text-white shadow-xs shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div className="min-w-0">
          <h2 className="font-black text-[#1E122C] text-sm sm:text-[15px] tracking-tight truncate leading-tight">
            {brandName}
          </h2>
          <span className="text-[10px] text-[#6B5E77] font-semibold block leading-none pt-0.5">
            AI for Modern Brands
          </span>
        </div>
      </div>

      {/* 2. Navigation Links */}
      <nav className="flex-1 px-4 py-5 space-y-1 overflow-y-auto relative z-10">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200
              ${isActive 
                ? 'bg-[#FFEFEA] text-[#D94A2A] font-black border-l-4 border-[#D94A2A] rounded-l-none shadow-2xs' 
                : 'text-[#6B5E77] hover:text-[#1E122C] hover:bg-white/60'
              }
            `}
          >
            <item.icon className="w-4 h-4 shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* 3. Mid-Lower Motto / Ambient Typography */}
      <div className="px-6 py-4 relative z-10">
        <h3 className="text-lg font-serif font-black text-[#1E122C] leading-tight">
          Ideas <br />
          Strategy <br />
          Growth
        </h3>
        <p className="text-[10.5px] text-[#6B5E77] font-semibold pt-1">
          All in one place.
        </p>
      </div>

      {/* 4. Footer Nav & Profile Card */}
      <div className="p-4 border-t border-[#F3DEC8]/70 space-y-2 relative z-10 bg-white/40 backdrop-blur-xs">
        <button
          onClick={() => setAssistantOpen(true)}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold text-[#1E122C] hover:bg-white/90 transition-all border border-transparent hover:border-[#F3DEC8]/70 cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 text-[#8C1F3D] shrink-0" />
          <span>Ask AI Manager</span>
        </button>

        <NavLink
          to="/settings"
          className={({ isActive }) => `
            flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all
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
        <div className="pt-1">
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
