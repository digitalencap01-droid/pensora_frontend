import React from 'react';
import { Menu, Search, Bell, Calendar, ChevronDown } from 'lucide-react';
import { useMarketing } from '../../context/MarketingContext';

interface HeaderProps {
  onMenuOpen: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuOpen }) => {
  const { setAssistantOpen } = useMarketing();

  return (
    <header className="bg-[#FEF9F5]/90 backdrop-blur-md border-b border-[#F3DEC8]/60 h-20 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-20 w-full select-none">
      
      {/* Left: Mobile Menu Trigger + Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button
          onClick={onMenuOpen}
          className="lg:hidden p-2 rounded-xl text-[#1E122C] hover:bg-white transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Pill */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#6B5E77]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search campaigns, contacts, insights, or ask GrowWise AI..."
            onClick={() => setAssistantOpen(true)}
            className="w-full pl-10 pr-12 py-2.5 bg-white border border-[#F3DEC8] rounded-full text-xs font-semibold text-[#1E122C] placeholder-[#6B5E77]/70 shadow-2xs focus:outline-none focus:border-[#D94A2A] focus:ring-2 focus:ring-[#D94A2A]/10 transition-all cursor-pointer"
            readOnly
          />
          <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none">
            <kbd className="px-1.5 py-0.5 text-[9.5px] font-black text-[#6B5E77] bg-[#FEF9F5] border border-[#F3DEC8] rounded-md shadow-3xs">
              ⌘ K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right Controls: Notifications & Date Filter */}
      <div className="flex items-center gap-3.5 pl-4">
        {/* Notification Bell with Active Indicator */}
        <button className="relative w-10 h-10 rounded-full bg-white border border-[#F3DEC8] flex items-center justify-center text-[#1E122C] hover:text-[#D94A2A] hover:border-[#D94A2A]/40 transition-all shadow-2xs cursor-pointer">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#D94A2A] ring-2 ring-white" />
        </button>

        {/* Date Filter Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-white border border-[#F3DEC8] rounded-full text-xs font-bold text-[#1E122C] shadow-2xs cursor-pointer hover:border-[#D94A2A]/40 transition-all">
          <Calendar className="w-3.5 h-3.5 text-[#D94A2A]" />
          <span>This Month</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#6B5E77]" />
        </div>
      </div>

    </header>
  );
};

export default Header;
