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
  X,
  Sparkles,
  MessageSquare,
  Users
} from 'lucide-react';
import { useMarketing } from '../../context/MarketingContext';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#1E122C]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed left-0 top-0 bottom-0 w-72 bg-[#FEF9F5] flex flex-col z-50 animate-in slide-in-from-left duration-200 border-r border-[#F3DEC8]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-[#F3DEC8]/70 bg-white/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D94A2A] via-[#8C1F3D] to-[#4B1D6B] flex items-center justify-center text-white shadow-xs shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <span className="font-black text-[#1E122C] text-sm truncate block leading-tight">{brandName}</span>
              <span className="text-[10px] text-[#6B5E77] font-semibold block leading-none pt-0.5">AI for Modern Brands</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#6B5E77] hover:bg-white hover:text-[#1E122C] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200
                ${isActive 
                  ? 'bg-[#FFEFEA] text-[#D94A2A] font-black border-l-4 border-[#D94A2A] rounded-l-none shadow-2xs' 
                  : 'text-[#6B5E77] hover:text-[#1E122C] hover:bg-white/60'
                }
              `}
            >
              <item.icon className="w-4.5 h-4.5 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#F3DEC8] space-y-2 bg-white/40">
          <button
            onClick={() => { onClose(); setAssistantOpen(true); }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#1E122C] hover:bg-white/90 border border-[#F3DEC8] shadow-3xs transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#8C1F3D] shrink-0" />
            <span>Ask AI Manager</span>
          </button>

          <NavLink
            to="/settings"
            onClick={onClose}
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
        </div>
      </div>
    </div>
  );
};
export default MobileNav;
