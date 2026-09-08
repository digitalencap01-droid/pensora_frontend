import React from 'react';
import { Check } from 'lucide-react';

interface Stage {
  name: string;
  status: 'done' | 'active' | 'upcoming';
  description: string;
}

export const MarketingJourney: React.FC = () => {
  const stages: Stage[] = [
    { name: 'Understand', status: 'done', description: 'Scraped business info' },
    { name: 'Research', status: 'done', description: 'Competitors & Keywords' },
    { name: 'Plan', status: 'done', description: 'Selected goals & tasks' },
    { name: 'Create', status: 'active', description: 'Drafting content & code' },
    { name: 'Launch', status: 'upcoming', description: 'Publishing pages & ads' },
    { name: 'Improve', status: 'upcoming', description: 'Refining and optimizing' }
  ];

  return (
    <div className="w-full bg-white border border-[#F3DEC8] rounded-[24px] sm:rounded-[28px] p-6 shadow-3xs">
      <h3 className="text-sm font-black text-[#1E122C] mb-5 text-left">Your AI Marketing Journey</h3>
      
      {/* Responsive timeline grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 relative">
        {stages.map((stage, idx) => {
          const isDone = stage.status === 'done';
          const isActive = stage.status === 'active';
          
          return (
            <div key={stage.name} className="flex flex-col items-center text-center relative group">
              {/* Connector line for large screens */}
              {idx < stages.length - 1 && (
                <div className="hidden lg:block absolute top-5 left-[60%] right-[-40%] h-[2px] bg-[#F3DEC8] z-0">
                  <div 
                    className={`h-full bg-[#4B1D6B] transition-all duration-500 ${isDone ? 'w-full' : 'w-0'}`} 
                  />
                </div>
              )}

              {/* Step indicator */}
              <div 
                className={`
                  w-10 
                  h-10 
                  rounded-full 
                  flex 
                  items-center 
                  justify-center 
                  z-10 
                  transition-all 
                  duration-300
                  border
                  ${isDone ? 'bg-[#4B1D6B] border-[#4B1D6B] text-white shadow-xs' : ''}
                  ${isActive ? 'bg-[#FFF1EB] border-[#FAD8C7] text-[#D94A2A] font-black animate-pulse shadow-xs' : ''}
                  ${stage.status === 'upcoming' ? 'bg-[#FAF5F0] border-[#F3DEC8] text-[#6B5E77]' : ''}
                `}
              >
                {isDone ? (
                  <Check className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <span className="text-xs font-black">{idx + 1}</span>
                )}
              </div>

              {/* Title & description */}
              <div className="mt-3">
                <span 
                  className={`
                    text-xs 
                    font-black 
                    block
                    ${isDone ? 'text-[#1E122C]' : ''}
                    ${isActive ? 'text-[#D94A2A]' : ''}
                    ${stage.status === 'upcoming' ? 'text-[#6B5E77]' : ''}
                  `}
                >
                  {stage.name}
                </span>
                <span className="text-[10px] text-[#6B5E77] mt-0.5 block leading-normal max-w-[100px] font-medium">
                  {stage.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MarketingJourney;
