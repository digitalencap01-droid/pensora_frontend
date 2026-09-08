import React, { useState } from 'react';
import { Play, Check, Eye, Trash2, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { AIAction as AIActionType } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useMarketing } from '../../context/MarketingContext';

interface AIActionProps {
  action: AIActionType;
}

export const AIAction: React.FC<AIActionProps> = ({ action }) => {
  const { approveAction, dismissAction } = useMarketing();
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    setLoading(true);
    await approveAction(action.id);
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'working':
        return <Badge variant="brand" className="animate-pulse">AI Working</Badge>;
      case 'needs_approval':
        return <Badge variant="warning">Needs Approval</Badge>;
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      default:
        return <Badge variant="neutral">Pending</Badge>;
    }
  };

  const getAutonomyBadge = (autonomy: string) => {
    switch (autonomy) {
      case 'automatic':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-[#F4FDF8] px-2.5 py-1 rounded-full border border-emerald-200/80">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            Automatic
          </span>
        );
      case 'approval_required':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-amber-800 bg-[#FFF8EB] px-2.5 py-1 rounded-full border border-amber-200/80">
            <ShieldCheck className="w-3 h-3 text-amber-600" />
            Needs Approval
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-[#6B5E77] bg-[#FAF5F0] px-2.5 py-1 rounded-full border border-[#F3DEC8]">
            Recommend
          </span>
        );
    }
  };

  return (
    <Card hoverable className="border-[#F3DEC8]">
      <div className="flex flex-col gap-4">
        {/* Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F3DEC8]/70 pb-3">
          <div className="flex items-center gap-2.5">
            {getStatusBadge(action.status)}
            {getAutonomyBadge(action.autonomy)}
          </div>
          <span className="text-xs text-[#6B5E77] font-semibold">
            {new Date(action.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* Title & Description */}
        <div>
          <h4 className="text-base font-black text-[#1E122C] leading-snug">{action.title}</h4>
          <p className="text-xs sm:text-sm text-[#6B5E77] mt-1.5 leading-relaxed font-medium">{action.description}</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#FFF8F5] rounded-2xl p-4 border border-[#F3DEC8] text-xs">
          <div>
            <h5 className="font-black text-[#6B5E77] uppercase tracking-wider text-[9.5px] mb-1">Why this matters</h5>
            <p className="text-[#1E122C] font-semibold leading-relaxed">{action.whyMatters}</p>
          </div>
          <div>
            <h5 className="font-black text-[#6B5E77] uppercase tracking-wider text-[9.5px] mb-1">What happens next</h5>
            <p className="text-[#1E122C] font-semibold leading-relaxed">{action.whatNext}</p>
          </div>
        </div>

        {/* Actions Row */}
        {action.status === 'needs_approval' && (
          <div className="flex items-center justify-end gap-3 pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => dismissAction(action.id)}
              disabled={loading}
              className="text-[#6B5E77] border-transparent hover:text-rose-700 hover:bg-rose-50"
            >
              <Trash2 className="w-4 h-4 mr-1 shrink-0" />
              Discard
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleApprove}
              isLoading={loading}
            >
              <Check className="w-4 h-4 mr-1.5 shrink-0" />
              Approve & Publish
            </Button>
          </div>
        )}

        {action.status === 'working' && (
          <div className="flex items-center justify-end pt-1">
            <div className="text-xs text-[#4B1D6B] bg-[#F5EEFB] border border-[#E9D5F7] rounded-xl px-3.5 py-1.5 flex items-center gap-1.5 font-black">
              <span className="w-1.5 h-1.5 bg-[#4B1D6B] rounded-full animate-ping" />
              <span>AI is executing automatically...</span>
            </div>
          </div>
        )}

        {action.status === 'completed' && (
          <div className="flex items-center justify-end pt-1">
            <div className="text-xs text-emerald-800 bg-[#F4FDF8] border border-emerald-200 rounded-xl px-3.5 py-1.5 flex items-center gap-1.5 font-black">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Completed & Deployed</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
export default AIAction;
