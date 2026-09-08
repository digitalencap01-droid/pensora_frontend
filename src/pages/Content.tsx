import React, { useState } from 'react';
import { FileText, Sparkles, Plus, Calendar, Check, Send } from 'lucide-react';
import { useMarketing } from '../context/MarketingContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';

export const Content: React.FC = () => {
  const { contentSuggestions, createContentItem } = useMarketing();
  
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customType, setCustomType] = useState<'blog' | 'social' | 'newsletter'>('blog');

  // Filter content items by status
  const recommendedItems = contentSuggestions.filter(item => item.status === 'recommended');
  const activeDrafts = contentSuggestions.filter(item => item.status === 'creating' || item.status === 'ready_for_review');
  const calendarItems = contentSuggestions.filter(item => item.status === 'scheduled' || item.status === 'published');

  const handleCreateAI = async (title: string, type: 'blog' | 'social' | 'newsletter', id?: string) => {
    if (id) setLoadingId(id);
    else setLoadingId('custom');
    
    await createContentItem(title, type);
    
    setLoadingId(null);
    setModalOpen(false);
    setCustomTitle('');
  };

  const getBadgeType = (type: string) => {
    switch (type) {
      case 'blog': return 'brand';
      case 'social': return 'success';
      default: return 'warning';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-[#1E122C] tracking-tight">Content</h1>
          <p className="text-xs sm:text-sm text-[#6B5E77] font-medium">AI creates articles and social posts based on what your customers search for.</p>
        </div>
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          <Plus className="w-4 h-4 mr-1.5 shrink-0" />
          <span>Write Custom Topic</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Recommended & In Progress (takes 2 cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* What should I publish? */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-[#1E122C] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D94A2A]" />
              What should I publish?
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              {recommendedItems.map((item) => (
                <Card key={item.id} hoverable className="border-[#F3DEC8]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={getBadgeType(item.type)} className="text-[9.5px]">
                          {item.type}
                        </Badge>
                        <h4 className="text-xs sm:text-sm font-black text-[#1E122C]">{item.title}</h4>
                      </div>
                      <p className="text-xs text-[#6B5E77] font-medium leading-relaxed">
                        <span className="font-black text-[#D94A2A] uppercase tracking-wider text-[9.5px] mr-1.5">Audience search:</span>
                        {item.reason}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCreateAI(item.title, item.type, item.id)}
                      isLoading={loadingId === item.id}
                    >
                      <Sparkles className="w-3.5 h-3.5 mr-1.5 shrink-0 text-[#D94A2A]" />
                      <span>Write with AI</span>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Being Created */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-[#1E122C] uppercase tracking-wider flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#4B1D6B]" />
              Drafts & Reviews
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {activeDrafts.length === 0 ? (
                <p className="text-xs text-[#6B5E77] font-medium py-5 bg-[#FFF8F5] border border-dashed border-[#F3DEC8] rounded-[24px] text-center">
                  No active drafts currently being written. Click "Write with AI" above!
                </p>
              ) : (
                activeDrafts.map((item) => (
                  <Card key={item.id} className="border-[#F3DEC8] bg-[#FFF8F5]">
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <Badge variant={getBadgeType(item.type)} className="text-[9px]">
                            {item.type}
                          </Badge>
                          <span className="text-[10px] font-black text-amber-800 bg-[#FFF8EB] border border-amber-200/80 rounded-full px-2.5 py-0.5">
                            {item.status === 'ready_for_review' ? 'Ready for Review' : 'Writing draft...'}
                          </span>
                        </div>
                        <h4 className="text-xs font-black text-[#1E122C] truncate">{item.title}</h4>
                      </div>
                      <div className="flex gap-2">
                        {item.status === 'ready_for_review' ? (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleCreateAI(item.title, item.type, item.id)}
                            className="text-[11px] py-1.5 px-3.5"
                          >
                            <Check className="w-3.5 h-3.5 mr-1" /> Approve Draft
                          </Button>
                        ) : (
                          <div className="flex items-center gap-1.5 text-xs text-[#4B1D6B] font-bold">
                            <span className="w-1.5 h-1.5 bg-[#4B1D6B] rounded-full animate-ping" />
                            <span>AI is drafting...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Content Calendar timeline */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-[#1E122C] uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#D94A2A]" />
            Content Calendar
          </h3>

          <Card className="space-y-4 border-[#F3DEC8] bg-white">
            {calendarItems.map((item) => (
              <div key={item.id} className="border-l-2 border-[#D94A2A] pl-4 py-1 space-y-1.5">
                <div className="flex items-center justify-between">
                  <Badge variant={getBadgeType(item.type)} className="text-[9px]">
                    {item.type}
                  </Badge>
                  <span className="text-[10px] font-bold text-[#6B5E77]">
                    {item.status === 'scheduled' ? item.scheduledDate : 'Published ✓'}
                  </span>
                </div>
                <h4 className="text-xs font-black text-[#1E122C]">{item.title}</h4>
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* Write Custom Topic Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Ask AI to write a custom topic"
        footer={
          <div className="flex gap-2.5 justify-end">
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button
              variant="primary"
              onClick={() => handleCreateAI(customTitle, customType)}
              isLoading={loadingId === 'custom'}
              disabled={!customTitle.trim()}
            >
              <Send className="w-4 h-4 mr-1.5 shrink-0" />
              Generate Draft
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-black text-[#1E122C] uppercase tracking-wider mb-2">What topic should AI cover?</label>
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              className="w-full border border-[#F3DEC8] rounded-2xl px-4 py-3 text-xs font-bold text-[#1E122C] placeholder-[#6B5E77]/60 focus:outline-none focus:border-[#D94A2A] focus:ring-2 focus:ring-[#D94A2A]/10 shadow-2xs"
              placeholder="e.g., 5 Sustainable accessories for winter styling"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-[#1E122C] uppercase tracking-wider mb-2">Content Format</label>
            <div className="flex gap-3">
              {(['blog', 'social', 'newsletter'] as const).map((format) => (
                <button
                  key={format}
                  type="button"
                  onClick={() => setCustomType(format)}
                  className={`flex-1 py-3 text-xs rounded-2xl border font-black capitalize transition-all cursor-pointer ${
                    customType === format
                      ? 'border-[#4B1D6B] bg-[#F5EEFB] text-[#4B1D6B] shadow-2xs'
                      : 'border-[#F3DEC8] text-[#6B5E77] bg-white hover:bg-[#FFF8F5]'
                  }`}
                >
                  {format}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default Content;
