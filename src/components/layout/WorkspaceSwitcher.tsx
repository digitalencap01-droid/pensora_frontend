import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Plus, Briefcase, Check } from 'lucide-react';
import { useMarketing } from '../../context/MarketingContext';

export const WorkspaceSwitcher: React.FC = () => {
  const { 
    workspaces, 
    activeWorkspaceId, 
    switchWorkspace, 
    createWorkspace 
  } = useMarketing();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId) || workspaces[0];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSwitch = (id: string) => {
    switchWorkspace(id);
    setIsOpen(false);
  };

  const handleCreateNew = () => {
    const name = window.prompt("Enter new business / workspace name:");
    if (name && name.trim()) {
      createWorkspace({ name: name.trim(), services: [], productsServices: [], channels: [] });
      setIsOpen(false);
    }
  };

  if (!activeWorkspace) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 border border-[#F3DEC8] rounded-xl hover:border-[#D94A2A]/40 hover:bg-[#FFF8F5] transition-all text-left bg-white cursor-pointer shadow-2xs"
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-7 h-7 rounded-lg bg-[#F5EEFB] flex items-center justify-center text-[#4B1D6B] shrink-0 font-black text-xs border border-[#E9D5F7]">
            {activeWorkspace.name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-black text-[#1E122C] truncate leading-none mb-1">{activeWorkspace.name}</h4>
            <span className="text-[9.5px] text-[#6B5E77] font-semibold truncate leading-none block">
              {activeWorkspace.website ? activeWorkspace.website.replace(/^(https?:\/\/)?(www\.)?/, '') : 'No website'}
            </span>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-[#6B5E77] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#F3DEC8] shadow-xl shadow-[#4B1D6B]/5 rounded-2xl py-2 z-50 animate-in fade-in slide-in-from-top-1.5 duration-200">
          <div className="px-3.5 py-1 text-[9.5px] font-black text-[#6B5E77] uppercase tracking-wider">Switch Workspaces</div>
          
          <div className="max-h-48 overflow-y-auto mt-1 px-1">
            {workspaces.map((w) => {
              const isActive = w.id === activeWorkspaceId;
              return (
                <button
                  key={w.id}
                  onClick={() => handleSwitch(w.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    isActive 
                      ? 'bg-[#F5EEFB] text-[#4B1D6B]' 
                      : 'text-[#1E122C] hover:bg-[#FAF5F0] hover:text-[#4B1D6B]'
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Briefcase className="w-3.5 h-3.5 text-[#6B5E77] shrink-0" />
                    <span className="truncate">{w.name}</span>
                  </div>
                  {isActive && <Check className="w-3.5 h-3.5 text-[#4B1D6B] shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="border-t border-[#F3DEC8]/70 mt-2 pt-1.5 px-1">
            <button
              onClick={handleCreateNew}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-black text-[#D94A2A] hover:bg-[#FFF1EB] transition-colors text-left"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Workspace</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default WorkspaceSwitcher;
