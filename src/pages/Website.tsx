import React, { useState } from 'react';
import { ShieldCheck, HelpCircle, Check, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { useMarketing } from '../context/MarketingContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const Website: React.FC = () => {
  const { websiteIssues, fixWebsiteIssue } = useMarketing();
  const [fixingId, setFixingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleFix = async (id: string) => {
    setFixingId(id);
    await fixWebsiteIssue(id);
    setFixingId(null);
  };

  const toggleTechnical = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-[#1E122C] tracking-tight">Improve your website</h1>
        <p className="text-xs sm:text-sm text-[#6B5E77] font-medium">
          GrowWise AI audits your website's layout and code templates to make it easier for visitors to buy.
        </p>
      </div>

      {/* Website Issues list */}
      <div className="space-y-6 max-w-3xl">
        {websiteIssues.map((issue) => {
          const isDetected = issue.status === 'detected';
          const isFixing = issue.status === 'fixing';
          const isResolved = issue.status === 'resolved';
          const isExpanded = expandedId === issue.id;

          return (
            <Card key={issue.id} hoverable className={`border-[#F3DEC8] transition-all ${
              isResolved ? 'bg-[#FAF5F0]/60' : 'bg-white'
            }`}>
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#F3DEC8]/70 pb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      isResolved ? 'bg-emerald-600' : isFixing ? 'bg-[#4B1D6B] animate-ping' : 'bg-rose-500'
                    }`} />
                    <span className="text-xs font-black text-[#1E122C]">
                      {isResolved ? 'Issue Resolved' : isFixing ? 'Applying fix...' : 'Action Required'}
                    </span>
                  </div>
                  <Badge variant={isResolved ? 'success' : isFixing ? 'brand' : 'error'}>
                    {issue.status}
                  </Badge>
                </div>

                {/* Problem, Why, Solution details */}
                <div className="space-y-3.5 text-xs text-[#6B5E77]">
                  <div>
                    <h4 className="font-black text-[#6B5E77] uppercase tracking-wider text-[9.5px] mb-1">Problem</h4>
                    <p className={`leading-relaxed font-black text-[#1E122C] ${isResolved ? 'line-through text-[#6B5E77]/70' : ''}`}>
                      {issue.problem}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-black text-[#6B5E77] uppercase tracking-wider text-[9.5px] mb-1">Why this matters</h4>
                    <p className="leading-relaxed text-[#6B5E77] font-medium">{issue.whyMatters}</p>
                  </div>

                  <div className="bg-[#FFF8F5] border border-[#F3DEC8] rounded-2xl p-3.5">
                    <h4 className="font-black text-[#D94A2A] uppercase tracking-wider text-[9.5px] mb-1">AI Fix Solution</h4>
                    <p className="leading-relaxed text-[#1E122C] font-semibold">{issue.solution}</p>
                  </div>
                </div>

                {/* Technical Details Toggle */}
                {issue.technicalDetails && (
                  <div className="border-t border-[#F3DEC8]/70 pt-3">
                    <button
                      onClick={() => toggleTechnical(issue.id)}
                      className="flex items-center gap-1 text-[10px] font-black text-[#6B5E77] hover:text-[#1E122C] uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <span>Technical details</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {isExpanded && (
                      <pre className="mt-2.5 p-4 bg-[#1E122C] text-[#FAF5F0] border border-[#360B5A] rounded-2xl text-[10px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap shadow-inner">
                        {issue.technicalDetails}
                      </pre>
                    )}
                  </div>
                )}

                {/* Action CTAs */}
                <div className="flex justify-end pt-1 border-t border-[#F3DEC8]/70">
                  {isResolved ? (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-[#F4FDF8] border border-emerald-200 rounded-xl px-4 py-2 font-black">
                      <Check className="w-3.5 h-3.5" />
                      <span>Changes deployed live</span>
                    </div>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleFix(issue.id)}
                      isLoading={fixingId === issue.id || isFixing}
                    >
                      <ShieldCheck className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                      <span>Fix with AI</span>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
export default Website;
