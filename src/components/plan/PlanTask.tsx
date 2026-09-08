import React, { useState } from 'react';
import { CheckCircle2, Circle, Sparkles, HelpCircle } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface PlanTaskProps {
  title: string;
  category: 'content' | 'website' | 'ads' | 'seo';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  onExecute: () => Promise<void>;
  status: 'pending' | 'running' | 'done';
}

export const PlanTask: React.FC<PlanTaskProps> = ({
  title,
  category,
  difficulty,
  onExecute,
  status
}) => {
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    await onExecute();
    setLoading(false);
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'success';
      case 'Medium': return 'warning';
      default: return 'brand';
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3.5 px-4 bg-[#FFF8F5] hover:bg-[#FAF5F0] border border-[#F3DEC8] rounded-2xl transition-all">
      <div className="flex items-center gap-3 min-w-0">
        {status === 'done' ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
        ) : status === 'running' ? (
          <div className="w-5 h-5 rounded-full border-2 border-[#4B1D6B] border-t-transparent animate-spin shrink-0" />
        ) : (
          <Circle className="w-5 h-5 text-[#D94A2A]/40 shrink-0" />
        )}
        
        <div className="min-w-0">
          <h4 className={`text-xs font-black text-[#1E122C] truncate ${status === 'done' ? 'line-through text-[#6B5E77]' : ''}`}>
            {title}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[9.5px] text-[#6B5E77] font-black uppercase tracking-wider">{category}</span>
            <span className="text-[9.5px] text-[#6B5E77]/40">•</span>
            <Badge variant={getDifficultyColor(difficulty)} className="text-[9px] px-2 py-0.5">
              {difficulty} Setup
            </Badge>
          </div>
        </div>
      </div>

      <div className="shrink-0 self-end sm:self-center">
        {status === 'done' ? (
          <span className="text-[10.5px] text-emerald-800 bg-[#F4FDF8] px-3 py-1.5 rounded-xl border border-emerald-200 font-black">
            Active in Queue
          </span>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={handleRun}
            isLoading={loading || status === 'running'}
            className="text-[11px] py-1.5 px-3.5"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1 shrink-0 text-[#D94A2A]" />
            Start with AI
          </Button>
        )}
      </div>
    </div>
  );
};
export default PlanTask;
