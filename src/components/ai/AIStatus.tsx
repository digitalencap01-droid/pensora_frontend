import React from 'react';
import { Sparkles } from 'lucide-react';
import { useMarketing } from '../../context/MarketingContext';

export const AIStatus: React.FC = () => {
  const { actions } = useMarketing();
  
  // Find currently running tasks
  const workingActions = actions.filter(a => a.status === 'working');
  const activeTask = workingActions[0];

  if (!activeTask) {
    return (
      <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#F4FDF8] border border-emerald-200/80 text-emerald-800 text-xs font-bold shadow-3xs">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shrink-0" />
        <span>Your AI is monitoring your marketing. Everything is running smoothly.</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#FFF8F5] border border-[#F3DEC8] text-[#1E122C] text-xs font-bold max-w-lg shadow-3xs transition-all duration-300">
      <Sparkles className="w-4 h-4 text-[#D94A2A] animate-spin shrink-0" style={{ animationDuration: '3s' }} />
      <div className="truncate flex-1">
        <span className="font-black text-[#4B1D6B]">AI is working:</span> {activeTask.title}
      </div>
      <span className="text-[10px] bg-[#F5EEFB] border border-[#E8D4F8] text-[#4B1D6B] px-2.5 py-0.5 rounded-lg font-black uppercase tracking-wider shrink-0">
        In Progress
      </span>
    </div>
  );
};
export default AIStatus;
