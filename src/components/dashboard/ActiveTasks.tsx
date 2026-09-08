import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Eye, RefreshCw, ChevronRight, Zap } from 'lucide-react';
import { useMarketing } from '../../context/MarketingContext';
import { Card } from '../ui/Card';

export const ActiveTasks: React.FC = () => {
  const { actions } = useMarketing();
  const navigate = useNavigate();

  // Show only 3 active or recently completed tasks
  const displayTasks = actions.slice(0, 3);

  const getIcon = (category: string) => {
    switch (category) {
      case 'content': return <FileText className="w-4 h-4 text-[#D94A2A]" />;
      case 'website': return <Eye className="w-4 h-4 text-[#4B1D6B]" />;
      case 'ads': return <Zap className="w-4 h-4 text-[#8C1F3D]" />;
      default: return <RefreshCw className="w-4 h-4 text-[#6B5E77]" />;
    }
  };

  const getIconBg = (category: string) => {
    switch (category) {
      case 'content': return 'bg-[#FFF1EB] border-[#FAD8C7]';
      case 'website': return 'bg-[#F5EEFB] border-[#E8D4F8]';
      case 'ads': return 'bg-[#FFF0F3] border-[#FCD4DF]';
      default: return 'bg-[#FAF5F0] border-[#F3DEC8]';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'working': return 'In progress';
      case 'needs_approval': return 'Approval required';
      case 'completed': return 'Completed';
      default: return 'Pending';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'working': return 'text-[#4B1D6B] bg-[#F5EEFB] border-[#E8D4F8]';
      case 'needs_approval': return 'text-[#D94A2A] bg-[#FFF1EB] border-[#FAD8C7]';
      case 'completed': return 'text-emerald-800 bg-[#F4FDF8] border-emerald-200';
      default: return 'text-[#6B5E77] bg-[#FAF5F0] border-[#F3DEC8]';
    }
  };

  return (
    <Card className="border-[#F3DEC8]">
      <div className="flex items-center justify-between mb-4 border-b border-[#F3DEC8] pb-3">
        <h3 className="text-sm font-black text-[#1E122C]">AI is working on</h3>
        <button 
          onClick={() => navigate('/actions')}
          className="text-xs font-black text-[#D94A2A] hover:underline transition-colors cursor-pointer"
        >
          View all
        </button>
      </div>

      <div className="divide-y divide-[#F3DEC8]/70">
        {displayTasks.length === 0 ? (
          <p className="text-xs text-[#6B5E77] py-3 text-center">No active tasks at the moment.</p>
        ) : (
          displayTasks.map((task) => (
            <div 
              key={task.id}
              onClick={() => navigate('/actions')}
              className="flex items-center justify-between py-3 hover:bg-[#FAF5F0]/60 rounded-xl px-2 -mx-2 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`p-2 rounded-xl shrink-0 border transition-all ${getIconBg(task.category)}`}>
                  {getIcon(task.category)}
                </div>
                <div className="min-w-0 text-left">
                  <h4 className="text-xs font-bold text-[#1E122C] truncate max-w-[250px] sm:max-w-md">
                    {task.title}
                  </h4>
                  <span className="text-[10px] text-[#6B5E77] font-semibold">
                    Started {new Date(task.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className={`text-[10px] font-black uppercase tracking-wider border px-2.5 py-0.5 rounded-lg ${getStatusColor(task.status)}`}>
                  {getStatusText(task.status)}
                </span>
                <ChevronRight className="w-4 h-4 text-[#6B5E77] group-hover:text-[#1E122C] transition-colors" />
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
export default ActiveTasks;
