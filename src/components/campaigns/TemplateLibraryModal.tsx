import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Code2, 
  Layout, 
  Upload, 
  Check, 
  Eye, 
  Copy, 
  Search, 
  Zap, 
  Palette, 
  FileText,
  ShoppingBag,
  Send,
  RefreshCw,
  Bot,
  Sliders,
  CheckCircle2,
  Gift,
  ArrowRight,
  Mail,
  Flame,
  Star
} from 'lucide-react';
import { Card } from '../ui/Card';

export interface EmailTemplate {
  id: string;
  name: string;
  category: 'ecommerce' | 'newsletter' | 'promotional' | 'b2b' | 'announcement' | 'retention';
  previewText: string;
  badge: string;
  badgeColor?: string;
  subjectDefault: string;
  preheaderDefault: string;
  bodyTextDefault: string;
  ctaTextDefault: string;
  designStyle: string;
  themePreset: 'warm_minimal' | 'crimson_luxe' | 'editorial_digest' | 'flash_sale' | 'executive_plain' | 'vip_black';
  discountCode?: string;
  htmlContent?: string;
}

interface TemplateLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: EmailTemplate) => void;
  brandName: string;
}

export const REAL_TEMPLATE_GALLERY: EmailTemplate[] = [
  {
    id: 'tpl-minimal-ecommerce',
    name: 'Warm Minimalist Product Drop',
    category: 'ecommerce',
    badge: 'Popular',
    badgeColor: 'bg-[#FFEFEA] text-[#8C1F3D] border-[#FAD8C7]',
    previewText: 'Clean luxury layout with hero callout, discount coupon card, and responsive CTA button.',
    subjectDefault: '🌿 Introducing our newest collection + 20% VIP early access',
    preheaderDefault: 'Handcrafted luxury designed to elevate your everyday routine.',
    bodyTextDefault: `Hi {{first_name}},

We are thrilled to unveil our new limited-run capsule collection. Handcrafted from premium materials designed to elevate your everyday routine with unmatched elegance.

As a valued subscriber, use your exclusive VIP code at checkout for 20% off during the next 48 hours.

Thanks,
{{company_name}}`,
    ctaTextDefault: 'Explore Capsule Collection →',
    designStyle: 'Warm Peach & Minimalist',
    themePreset: 'warm_minimal',
    discountCode: 'EARLYVIP20'
  },
  {
    id: 'tpl-curated-newsletter',
    name: 'Weekly Curated Intelligence Digest',
    category: 'newsletter',
    badge: 'High CTR',
    badgeColor: 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]',
    previewText: 'Editorial 3-story digest layout with numbered insight blocks, author commentary, and deep-dive links.',
    subjectDefault: '☕ Sunday Edition: 3 Growth strategies reshaping consumer brands in 2026',
    preheaderDefault: 'Your weekly executive briefing on AI-driven retention and scaling.',
    bodyTextDefault: `Hi {{first_name}},

Here is your weekly intelligence briefing from the {{company_name}} team.

1. The Death of 10-Step Onboarding — Why leading brands are condensing setup to 3 concise steps.
2. Automated A/B Copy Testing — How real-time AI models synthesize variants to maximize open rates.
3. Zero-Party Data Retention — Strategies generating 52% higher customer lifetime value.

Read our complete breakdown in the weekly digest.

Best regards,
The {{company_name}} Team`,
    ctaTextDefault: 'Read Full Issue #42 →',
    designStyle: 'Editorial Digest',
    themePreset: 'editorial_digest'
  },
  {
    id: 'tpl-flash-sale',
    name: 'Bold Flash Sale & Urgency Banner',
    category: 'promotional',
    badge: 'Conversions',
    badgeColor: 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]',
    previewText: 'High-contrast countdown header with urgency badge, highlighted coupon code, and conversion button.',
    subjectDefault: '⚡ FLASH SALE: 25% Off Everything ends tonight at midnight!',
    preheaderDefault: 'Exclusive 24-hour subscriber pricing. Claim your discount before it expires.',
    bodyTextDefault: `Hi {{first_name}},

Our biggest flash sale of the season is officially live for the next 24 hours only!

Take 25% off storewide on all orders with no minimum purchase required. Use coupon code FLASH25 at checkout before the timer hits zero tonight.

Happy Shopping,
{{company_name}}`,
    ctaTextDefault: 'Shop 25% Off Flash Sale Now →',
    designStyle: 'High Urgency Promo',
    themePreset: 'flash_sale',
    discountCode: 'FLASH25'
  },
  {
    id: 'tpl-b2b-executive',
    name: 'Executive B2B Personal Outreach',
    category: 'b2b',
    badge: 'High Reply Rate',
    badgeColor: 'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]',
    previewText: 'Clean plain-text look engineered for maximum deliverability, zero spam flags, and 1-on-1 replies.',
    subjectDefault: 'Quick question regarding marketing operations at {{company_name}}',
    preheaderDefault: 'How peer growth teams are automating their multi-channel campaigns.',
    bodyTextDefault: `Hi {{first_name}},

I noticed you are leading acquisition and growth at {{company_name}} and wanted to share how similar teams are automating their multi-channel campaigns.

We recently helped a partner in your space achieve a 52% increase in open rates while reducing campaign drafting time to under 2 minutes.

Would you be open to a quick 10-minute walkthrough this Thursday or Friday?

Best regards,
The {{company_name}} Growth Team`,
    ctaTextDefault: 'Schedule 10-Min Walkthrough →',
    designStyle: 'Executive Letter',
    themePreset: 'executive_plain'
  },
  {
    id: 'tpl-vip-announcement',
    name: 'Crimson Luxe VIP Launch & Event',
    category: 'announcement',
    badge: 'New Release',
    badgeColor: 'bg-[#FAF5F0] text-[#8C1F3D] border-[#F3DEC8]',
    previewText: 'Rich plum and gold accented invitation template with RSVP card and attendee benefits.',
    subjectDefault: '🎟️ You are invited: Exclusive VIP Launch & Product Reveal',
    preheaderDefault: 'Private access passes for top community members and partners.',
    bodyTextDefault: `Hi {{first_name}},

You have been selected for exclusive early access to our private new product reveal.

Join our executive team for a live interactive walkthrough, exclusive feature access, and special launch bonuses reserved only for attendees.

Reserve your VIP pass below before registration closes.

Warmly,
{{company_name}}`,
    ctaTextDefault: 'Claim Your VIP Pass →',
    designStyle: 'Crimson Luxe',
    themePreset: 'crimson_luxe'
  },
  {
    id: 'tpl-retention-winback',
    name: 'Customer Re-engagement & Gift Offer',
    category: 'retention',
    badge: 'Retention',
    badgeColor: 'bg-[#FFF7ED] text-[#C2410C] border-[#FFEDD5]',
    previewText: 'Warm personal check-in layout with gift voucher box and curated recommendations.',
    subjectDefault: '🎁 We miss you, {{first_name}} — here is $15 towards your next order',
    preheaderDefault: 'A special treat waiting in your account.',
    bodyTextDefault: `Hi {{first_name}},

It has been a while since your last visit! A lot of exciting new arrivals have landed at {{company_name}} and we would love to welcome you back.

We have credited $15 directly to your account. Use code COMEBACK15 at checkout to enjoy your gift.

Warm regards,
{{company_name}}`,
    ctaTextDefault: 'Claim Your $15 Credit →',
    designStyle: 'Warm Retention Gift',
    themePreset: 'warm_minimal',
    discountCode: 'COMEBACK15'
  }
];

export const TemplateLibraryModal: React.FC<TemplateLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
  brandName
}) => {
  const [activeMode, setActiveMode] = useState<'gallery' | 'ai' | 'code' | 'upload'>('gallery');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPreviewTemplate, setSelectedPreviewTemplate] = useState<EmailTemplate | null>(null);

  // AI Generation State
  const [aiPrompt, setAiPrompt] = useState<string>(
    `Design a sleek, high-converting product launch email for ${brandName} with a 20% early bird coupon and warm minimalist aesthetic.`
  );
  const [aiCategory, setAiCategory] = useState<'ecommerce' | 'promotional' | 'newsletter' | 'b2b'>('ecommerce');
  const [isAiGenerating, setIsAiGenerating] = useState<boolean>(false);
  const [generatedTemplate, setGeneratedTemplate] = useState<EmailTemplate | null>(null);

  // Custom HTML Code State
  const [customSubject, setCustomSubject] = useState<string>('Custom HTML Email Campaign');
  const [customBody, setCustomBody] = useState<string>(`Hi {{first_name}},\n\nHere is a custom formatted message from ${brandName}.\n\nThanks,\n${brandName}`);
  const [customCta, setCustomCta] = useState<string>('Visit Website →');

  if (!isOpen) return null;

  // Filter gallery
  const filteredTemplates = REAL_TEMPLATE_GALLERY.filter(tpl => {
    const matchesCategory = selectedCategory === 'all' || tpl.category === selectedCategory;
    const matchesSearch = tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tpl.previewText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tpl.subjectDefault.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle AI Template Generation Simulation
  const handleGenerateAiTemplate = () => {
    setIsAiGenerating(true);
    setTimeout(() => {
      const newTpl: EmailTemplate = {
        id: `ai-tpl-${Date.now()}`,
        name: `AI Tailored: ${aiPrompt.slice(0, 30)}...`,
        category: aiCategory,
        badge: 'AI Crafted',
        badgeColor: 'bg-[#FFEFEA] text-[#8C1F3D] border-[#FAD8C7]',
        previewText: `AI synthesized template engineered for ${aiCategory} campaigns based on your prompt.`,
        designStyle: 'AI Optimized Responsive Template',
        themePreset: aiCategory === 'promotional' ? 'flash_sale' : aiCategory === 'newsletter' ? 'editorial_digest' : 'warm_minimal',
        subjectDefault: `✨ Exclusive for you: ${aiPrompt.slice(0, 45)}...`,
        preheaderDefault: `Special personalized announcement from ${brandName}.`,
        bodyTextDefault: `Hi {{first_name}},\n\n${aiPrompt}\n\nOur team engineered this exclusive offering specifically for our core community members.\n\nUse your exclusive discount code AUTOGROW20 at checkout.\n\nBest regards,\nThe ${brandName} Team`,
        ctaTextDefault: 'Claim Special Offer →',
        discountCode: 'AUTOGROW20'
      };
      setGeneratedTemplate(newTpl);
      setIsAiGenerating(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[75] bg-[#1E122C]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#FFFDFC] border border-[#F3DEC8] rounded-3xl max-w-5xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-[#F3DEC8] bg-[#FAF5F0]/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FFEFEA] border border-[#FAD8C7] flex items-center justify-center text-[#8C1F3D]">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-[#1E122C]">Real Email Template Studio &amp; Library</h3>
                <span className="text-[10px] text-[#8C1F3D] font-black uppercase tracking-wider bg-[#FFEFEA] px-2 py-0.5 rounded-md border border-[#FAD8C7]">
                  Visual Designs
                </span>
              </div>
              <p className="text-xs text-[#6B5E77]">
                Choose from realistic pre-designed layouts, generate custom templates with AI, or build with raw HTML.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white text-[#6B5E77] hover:text-[#1E122C] transition-colors cursor-pointer border border-transparent hover:border-[#F3DEC8]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Navigation Tabs */}
        <div className="px-6 border-b border-[#F3DEC8] bg-white flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveMode('gallery')}
            className={`flex items-center gap-2 py-3 px-3.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeMode === 'gallery'
                ? 'border-[#8C1F3D] text-[#8C1F3D]'
                : 'border-transparent text-[#6B5E77] hover:text-[#1E122C]'
            }`}
          >
            <Layout className="w-4 h-4" />
            <span>Visual Template Gallery ({REAL_TEMPLATE_GALLERY.length})</span>
          </button>

          <button
            onClick={() => setActiveMode('ai')}
            className={`flex items-center gap-2 py-3 px-3.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeMode === 'ai'
                ? 'border-[#8C1F3D] text-[#8C1F3D]'
                : 'border-transparent text-[#6B5E77] hover:text-[#1E122C]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#EA580C]" />
            <span>AI Template Generator</span>
          </button>

          <button
            onClick={() => setActiveMode('code')}
            className={`flex items-center gap-2 py-3 px-3.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeMode === 'code'
                ? 'border-[#8C1F3D] text-[#8C1F3D]'
                : 'border-transparent text-[#6B5E77] hover:text-[#1E122C]'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Custom Editor &amp; Code</span>
          </button>

          <button
            onClick={() => setActiveMode('upload')}
            className={`flex items-center gap-2 py-3 px-3.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeMode === 'upload'
                ? 'border-[#8C1F3D] text-[#8C1F3D]'
                : 'border-transparent text-[#6B5E77] hover:text-[#1E122C]'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Import Template File</span>
          </button>
        </div>

        {/* Modal Main Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* =========================================================================
              MODE 1: REAL VISUAL TEMPLATE GALLERY
              ========================================================================= */}
          {activeMode === 'gallery' && (
            <div className="space-y-5">
              
              {/* Filter Bar & Search */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {[
                    { id: 'all', label: 'All Templates' },
                    { id: 'ecommerce', label: 'E-Commerce & Drops' },
                    { id: 'newsletter', label: 'Newsletters' },
                    { id: 'promotional', label: 'Flash Sales' },
                    { id: 'b2b', label: 'B2B Outreach' },
                    { id: 'announcement', label: 'VIP Events' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                        selectedCategory === cat.id
                          ? 'bg-[#8C1F3D] text-white shadow-xs'
                          : 'bg-[#FAF5F0] text-[#1E122C] border border-[#F3DEC8] hover:bg-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="relative min-w-[220px]">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8294]" />
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#F3DEC8] rounded-xl outline-none font-medium placeholder-[#8A8294]"
                  />
                </div>
              </div>

              {/* Visual Templates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredTemplates.map((template) => (
                  <div 
                    key={template.id}
                    className="group rounded-2xl border border-[#F3DEC8] bg-white overflow-hidden shadow-xs hover:shadow-md hover:border-[#8C1F3D]/50 transition-all flex flex-col"
                  >
                    {/* Visual Miniature Email Preview Frame */}
                    <div className="p-3 bg-[#FCFAF8] border-b border-[#F3DEC8]">
                      <div className="rounded-xl border border-[#F3DEC8] bg-white p-3 shadow-3xs space-y-2.5 text-left pointer-events-none select-none">
                        
                        {/* Mini Header */}
                        <div className={`p-2 rounded-lg flex items-center justify-between ${
                          template.themePreset === 'flash_sale' ? 'bg-[#1E122C] text-white' :
                          template.themePreset === 'crimson_luxe' ? 'bg-[#8C1F3D] text-white' :
                          'bg-[#FAF5F0] text-[#1E122C] border border-[#F3DEC8]'
                        }`}>
                          <span className="text-[10px] font-black uppercase tracking-wider">
                            {brandName}
                          </span>
                          <span className="text-[8px] font-bold opacity-80 uppercase">
                            {template.category}
                          </span>
                        </div>

                        {/* Mini Subject & Headline */}
                        <div className="space-y-0.5">
                          <div className="text-[10px] font-black text-[#1E122C] line-clamp-1">
                            {template.subjectDefault}
                          </div>
                          <div className="text-[9px] text-[#6B5E77] line-clamp-2 leading-relaxed">
                            Hi Abhishek, {template.previewText}
                          </div>
                        </div>

                        {/* Discount Box (if promo) */}
                        {template.discountCode && (
                          <div className="p-1.5 rounded-md bg-[#FAF5F0] border border-dashed border-[#EA580C] text-center">
                            <span className="text-[8px] font-bold text-[#6B5E77] block">Use Promo Code:</span>
                            <span className="text-[10px] font-black text-[#8C1F3D] tracking-widest">{template.discountCode}</span>
                          </div>
                        )}

                        {/* Mini CTA Button */}
                        <div className="pt-1 text-center">
                          <span className={`inline-block text-[9px] font-black px-3 py-1 rounded-full shadow-3xs ${
                            template.themePreset === 'flash_sale' ? 'bg-[#EA580C] text-white' :
                            template.themePreset === 'editorial_digest' ? 'bg-[#1E122C] text-white' :
                            'bg-[#8C1F3D] text-white'
                          }`}>
                            {template.ctaTextDefault}
                          </span>
                        </div>

                        {/* Mini Footer */}
                        <div className="text-[7.5px] text-[#8A8294] text-center pt-1 border-t border-[#F3DEC8]/60">
                          © 2026 {brandName} • 1-Click Unsubscribe
                        </div>
                      </div>
                    </div>

                    {/* Template Card Meta & Actions */}
                    <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md border ${template.badgeColor || 'bg-[#FAF5F0] text-[#8C1F3D] border-[#F3DEC8]'}`}>
                            {template.badge}
                          </span>
                          <span className="text-[9px] font-bold text-[#8A8294]">{template.designStyle}</span>
                        </div>

                        <h4 className="text-xs font-black text-[#1E122C] mt-1.5 leading-snug">
                          {template.name}
                        </h4>
                      </div>

                      <div className="pt-2 border-t border-[#F3DEC8]/70 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedPreviewTemplate(template)}
                          className="px-2.5 py-1.5 text-[11px] font-bold text-[#6B5E77] hover:text-[#1E122C] bg-[#FAF5F0] hover:bg-white border border-[#F3DEC8] rounded-xl cursor-pointer flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Preview</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            onSelectTemplate(template);
                            onClose();
                          }}
                          className="flex-1 px-3 py-1.5 bg-[#8C1F3D] hover:bg-[#731831] text-white rounded-xl text-[11px] font-black shadow-3xs cursor-pointer flex items-center justify-center gap-1 transition-all"
                        >
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>Use Template</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              MODE 2: AI TEMPLATE GENERATOR
              ========================================================================= */}
          {activeMode === 'ai' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#EA580C]" />
                    <h3 className="text-sm font-black text-[#1E122C]">AI Email Template Synthesizer</h3>
                  </div>
                  <p className="text-xs text-[#6B5E77]">
                    Describe your marketing goal, brand aesthetic, or discount structure. AI will synthesize ready-to-use email copy and structure.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black text-[#1E122C]">Campaign Category</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'ecommerce', label: 'E-Commerce Product Drop' },
                      { id: 'promotional', label: 'Seasonal Flash Sale' },
                      { id: 'newsletter', label: 'Curated Newsletter' },
                      { id: 'b2b', label: 'B2B Discovery Outreach' }
                    ].map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setAiCategory(c.id as any)}
                        className={`p-2 rounded-xl text-xs font-bold text-left border transition-all cursor-pointer ${
                          aiCategory === c.id
                            ? 'bg-[#FFEFEA] text-[#8C1F3D] border-[#8C1F3D]'
                            : 'bg-white text-[#6B5E77] border-[#F3DEC8] hover:bg-[#FAF5F0]'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black text-[#1E122C]">AI Generation Instructions &amp; Offer</label>
                  <textarea
                    rows={4}
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="w-full p-3 text-xs bg-white border border-[#F3DEC8] rounded-xl outline-none font-medium leading-relaxed"
                    placeholder="E.g., Announce our 3-day anniversary discount with 25% off and a free gift for the first 100 orders..."
                  />
                </div>

                {/* Quick Preset Prompts */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#8A8294] uppercase tracking-wider block">Quick AI Prompt Presets:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'Weekend 30% Flash Sale with countdown badge',
                      'VIP Product Capsule Drop with organic fabrics',
                      'Curated Weekly Newsletter with 3 industry case studies',
                      '10-Minute Executive discovery meeting invite'
                    ].map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setAiPrompt(preset)}
                        className="text-[10px] font-bold text-[#6B5E77] hover:text-[#8C1F3D] bg-[#FAF5F0] hover:bg-[#FFEFEA] px-2.5 py-1 rounded-lg border border-[#F3DEC8] cursor-pointer transition-colors"
                      >
                        + {preset}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGenerateAiTemplate}
                  disabled={isAiGenerating}
                  className="w-full py-2.5 bg-[#8C1F3D] hover:bg-[#731831] disabled:opacity-50 text-white rounded-xl text-xs font-black shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  {isAiGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Synthesizing Custom Template...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Real AI Template</span>
                    </>
                  )}
                </button>
              </div>

              {/* AI Generation Preview Column */}
              <div className="lg:col-span-6 space-y-3">
                <span className="text-xs font-black text-[#1E122C] block">Generated Template Preview</span>
                {generatedTemplate ? (
                  <div className="rounded-2xl border border-[#F3DEC8] bg-[#FCFAF8] p-4 space-y-3 shadow-sm">
                    <div className="bg-white p-4 rounded-xl border border-[#F3DEC8] space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#F3DEC8]">
                        <span className="text-xs font-black text-[#8C1F3D] uppercase">{brandName}</span>
                        <span className="text-[9px] font-bold text-[#EA580C] bg-[#FFEFEA] px-2 py-0.5 rounded-full border border-[#FAD8C7]">
                          AI Synthesized
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#8A8294] uppercase block">Subject Line</span>
                        <h4 className="text-xs font-black text-[#1E122C]">{generatedTemplate.subjectDefault}</h4>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#8A8294] uppercase block">Message Body</span>
                        <p className="text-xs text-[#6B5E77] whitespace-pre-line leading-relaxed mt-1">
                          {generatedTemplate.bodyTextDefault.replace(/\{\{first_name\}\}/g, 'Abhishek').replace(/\{\{company_name\}\}/g, brandName)}
                        </p>
                      </div>
                      <div className="pt-2 text-center">
                        <span className="inline-block px-4 py-1.5 bg-[#8C1F3D] text-white rounded-full text-xs font-black">
                          {generatedTemplate.ctaTextDefault}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onSelectTemplate(generatedTemplate);
                        onClose();
                      }}
                      className="w-full py-2 bg-[#10B981] hover:bg-[#059669] text-white rounded-xl text-xs font-black shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Apply AI Generated Template</span>
                    </button>
                  </div>
                ) : (
                  <div className="h-64 rounded-2xl border-2 border-dashed border-[#F3DEC8] bg-[#FAF5F0]/40 flex flex-col items-center justify-center text-center p-6 space-y-2">
                    <Bot className="w-8 h-8 text-[#8C1F3D]" />
                    <span className="text-xs font-bold text-[#1E122C]">No AI template generated yet</span>
                    <p className="text-[11px] text-[#6B5E77] max-w-xs">
                      Enter your campaign requirements on the left and click Generate Real AI Template.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =========================================================================
              MODE 3: CUSTOM HTML & CSS CODE EDITOR
              ========================================================================= */}
          {activeMode === 'code' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-black text-[#1E122C]">Default Subject Line</label>
                  <input
                    type="text"
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#F3DEC8] rounded-xl outline-none font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-[#1E122C]">Message Body Copy (with Tokens)</label>
                  <textarea
                    rows={8}
                    value={customBody}
                    onChange={(e) => setCustomBody(e.target.value)}
                    className="w-full p-3 text-xs bg-white border border-[#F3DEC8] rounded-xl font-sans outline-none leading-relaxed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-[#1E122C]">CTA Button Label</label>
                  <input
                    type="text"
                    value={customCta}
                    onChange={(e) => setCustomCta(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#F3DEC8] rounded-xl outline-none font-semibold"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const customTpl: EmailTemplate = {
                      id: `custom-tpl-${Date.now()}`,
                      name: 'Custom User Template',
                      category: 'ecommerce',
                      badge: 'Custom',
                      previewText: 'Custom built message layout',
                      subjectDefault: customSubject,
                      preheaderDefault: '',
                      bodyTextDefault: customBody,
                      ctaTextDefault: customCta,
                      designStyle: 'Custom Minimalist',
                      themePreset: 'warm_minimal'
                    };
                    onSelectTemplate(customTpl);
                    onClose();
                  }}
                  className="w-full py-2.5 bg-[#8C1F3D] hover:bg-[#731831] text-white rounded-xl text-xs font-black shadow-md cursor-pointer"
                >
                  Use Custom Template
                </button>
              </div>

              <div className="lg:col-span-6 space-y-2">
                <span className="text-xs font-black text-[#1E122C] block">Live Render Preview</span>
                <div className="p-4 bg-[#FAF5F0] rounded-2xl border border-[#F3DEC8] space-y-3">
                  <div className="bg-white p-4 rounded-xl border border-[#F3DEC8] space-y-2.5">
                    <h4 className="text-xs font-black text-[#1E122C]">{customSubject}</h4>
                    <p className="text-xs text-[#6B5E77] whitespace-pre-line leading-relaxed">
                      {customBody.replace(/\{\{first_name\}\}/g, 'Abhishek').replace(/\{\{company_name\}\}/g, brandName)}
                    </p>
                    <div className="pt-2 text-center">
                      <span className="inline-block px-4 py-1.5 bg-[#8C1F3D] text-white rounded-full text-xs font-black">
                        {customCta}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              MODE 4: IMPORT TEMPLATE FILE
              ========================================================================= */}
          {activeMode === 'upload' && (
            <div className="p-8 border-2 border-dashed border-[#F3DEC8] rounded-3xl bg-[#FAF5F0]/40 text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-[#FFEFEA] border border-[#FAD8C7] flex items-center justify-center text-[#8C1F3D]">
                <Upload className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-[#1E122C]">Import HTML or MJML Template File</h4>
                <p className="text-xs text-[#6B5E77] max-w-sm mx-auto">
                  Drag and drop your template file here or click to browse. Supports .html, .htm, and .mjml.
                </p>
              </div>
              <div>
                <button
                  type="button"
                  className="px-5 py-2 bg-white border border-[#F3DEC8] hover:bg-[#FAF5F0] text-xs font-bold text-[#1E122C] rounded-xl cursor-pointer shadow-3xs"
                >
                  Browse Files from Computer
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Fullscreen Preview Sub-Modal (if clicked preview) */}
        {selectedPreviewTemplate && (
          <div className="fixed inset-0 z-[85] bg-[#1E122C]/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white border border-[#F3DEC8] rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-[#F3DEC8]">
                <div>
                  <h3 className="text-sm font-black text-[#1E122C]">{selectedPreviewTemplate.name}</h3>
                  <span className="text-[10px] text-[#6B5E77]">{selectedPreviewTemplate.designStyle}</span>
                </div>
                <button
                  onClick={() => setSelectedPreviewTemplate(null)}
                  className="p-1 rounded-lg hover:bg-[#FAF5F0] text-[#6B5E77]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Full Rendered Preview */}
              <div className="p-4 rounded-2xl bg-[#FCFAF8] border border-[#F3DEC8] space-y-3 text-left">
                <div className="p-2.5 bg-[#FAF5F0] rounded-xl border border-[#F3DEC8] text-[11px] text-[#6B5E77] space-y-1">
                  <div><strong>From:</strong> {brandName} &lt;noreply@encaptechno.com&gt;</div>
                  <div><strong>Subject:</strong> {selectedPreviewTemplate.subjectDefault}</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#F3DEC8] space-y-3">
                  <h4 className="text-xs font-black text-[#1E122C]">Message from {brandName}</h4>
                  <p className="text-xs text-[#6B5E77] whitespace-pre-line leading-relaxed">
                    {selectedPreviewTemplate.bodyTextDefault.replace(/\{\{first_name\}\}/g, 'Abhishek').replace(/\{\{company_name\}\}/g, brandName)}
                  </p>
                  {selectedPreviewTemplate.discountCode && (
                    <div className="p-2 bg-[#FAF5F0] border border-dashed border-[#EA580C] rounded-lg text-center">
                      <span className="text-[10px] font-bold text-[#6B5E77]">Use Code: </span>
                      <strong className="text-xs text-[#8C1F3D]">{selectedPreviewTemplate.discountCode}</strong>
                    </div>
                  )}
                  <div className="text-center pt-2">
                    <span className="inline-block px-5 py-2 bg-[#8C1F3D] text-white rounded-full text-xs font-black">
                      {selectedPreviewTemplate.ctaTextDefault}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedPreviewTemplate(null)}
                  className="px-4 py-2 bg-[#FAF5F0] text-xs font-bold text-[#6B5E77] rounded-xl cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSelectTemplate(selectedPreviewTemplate);
                    setSelectedPreviewTemplate(null);
                    onClose();
                  }}
                  className="px-5 py-2 bg-[#8C1F3D] text-white rounded-xl text-xs font-black shadow-md cursor-pointer"
                >
                  Apply This Template
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Bottom Footer */}
        <div className="px-6 py-3 border-t border-[#F3DEC8] bg-[#FAF5F0]/80 flex items-center justify-between text-xs text-[#6B5E77]">
          <span>
            Dynamic tags like <code className="text-[#8C1F3D] font-bold font-mono">&#123;&#123;first_name&#125;&#125;</code> and <code className="text-[#8C1F3D] font-bold font-mono">&#123;&#123;company_name&#125;&#125;</code> are automatically replaced with recipient data.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-[#F3DEC8] hover:bg-[#FAF5F0] text-xs font-bold text-[#1E122C] rounded-xl cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default TemplateLibraryModal;
