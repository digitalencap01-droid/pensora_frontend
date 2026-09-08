import React, { useState } from 'react';
import { Zap, HelpCircle, Loader2 } from 'lucide-react';
import { useMarketing } from '../context/MarketingContext';
import { AIAction } from '../components/ai/AIAction';
import { EmptyState } from '../components/ui/EmptyState';

export const Actions: React.FC = () => {
  const { actions, isLoading } = useMarketing();
  const [activeTab, setActiveTab] = useState<'working' | 'completed' | 'needs_approval'>('needs_approval');

  // Filter actions based on active tab
  const filteredActions = actions.filter(action => action.status === activeTab);

  const tabs = [
    { id: 'needs_approval' as const, label: 'Needs Approval', count: actions.filter(a => a.status === 'needs_approval').length },
    { id: 'working' as const, label: 'Working', count: actions.filter(a => a.status === 'working').length },
    { id: 'completed' as const, label: 'Completed', count: actions.filter(a => a.status === 'completed').length }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-[#1E122C] tracking-tight">AI Actions</h1>
        <p className="text-xs sm:text-sm text-[#6B5E77] font-medium">
          Monitor actions Aura is executing automatically, or review drafts awaiting your approval.
        </p>
      </div>

      {/* Tabs list */}
      <div className="flex border-b border-[#F3DEC8] gap-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                pb-3 text-xs font-black tracking-wide border-b-2 transition-all relative cursor-pointer
                ${isActive 
                  ? 'border-[#4B1D6B] text-[#4B1D6B]' 
                  : 'border-transparent text-[#6B5E77] hover:text-[#1E122C]'
                }
              `}
            >
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className={`
                  ml-1.5 px-2 py-0.5 rounded-full text-[9.5px] font-black border
                  ${isActive 
                    ? 'bg-[#4B1D6B] text-white border-[#4B1D6B] shadow-xs' 
                    : 'bg-[#FAF5F0] text-[#6B5E77] border-[#F3DEC8]'
                  }
                `}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Action Content Grid */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-8 h-8 text-[#4B1D6B] animate-spin" />
          <p className="text-xs text-[#6B5E77] font-semibold">Loading action history...</p>
        </div>
      ) : filteredActions.length === 0 ? (
        <EmptyState
          icon={<Zap className="w-8 h-8" />}
          title={`No tasks in "${tabs.find(t => t.id === activeTab)?.label}"`}
          description={
            activeTab === 'needs_approval'
              ? 'Aura is busy preparing optimizations. Check back shortly for new action items.'
              : activeTab === 'working'
              ? 'Aura is currently idle. She automatically runs audits when data syncs.'
              : 'Completed actions will list here once you approve drafts.'
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 max-w-3xl">
          {filteredActions.map((action) => (
            <AIAction key={action.id} action={action} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Actions;
