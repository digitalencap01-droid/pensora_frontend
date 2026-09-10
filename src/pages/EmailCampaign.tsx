import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Sparkles, 
  Users, 
  BarChart3, 
  Send, 
  CheckCircle2, 
  Plus, 
  Eye, 
  Search, 
  ShieldCheck, 
  RefreshCw, 
  Copy, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  Upload, 
  Bot, 
  Zap, 
  Lock, 
  Globe, 
  HelpCircle, 
  FileText, 
  Calendar, 
  Clock, 
  Sliders, 
  Filter, 
  Layers, 
  CheckCheck, 
  Layout, 
  Palette, 
  Flame, 
  Wand2, 
  Tag,
  AlertCircle,
  Settings,
  Shield,
  Radio
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useMarketing } from '../context/MarketingContext';
import TemplateLibraryModal, { EmailTemplate, REAL_TEMPLATE_GALLERY } from '../components/campaigns/TemplateLibraryModal';

export const EmailCampaign: React.FC = () => {
  const { activeWorkspace, updateWorkspace } = useMarketing();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = searchParams.get('tab') || 'campaigns';

  const brandName = activeWorkspace?.name || 'Bloom Boutique';
  const cleanDomain = activeWorkspace?.website 
    ? activeWorkspace.website.replace(/^https?:\/\//, '').replace(/\/.*$/, '') 
    : 'bloomboutique.shop';

  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId });
  };

  // =========================================================================
  // GUIDED CAMPAIGN WIZARD STATE (Domain Setup -> Audience -> AI Autonomy -> Goal -> Message -> Review)
  // =========================================================================
  const [isCreatorOpen, setIsCreatorOpen] = useState<boolean>(false);
  const [creatorStep, setCreatorStep] = useState<number>(1); 
  // Step 1: Domain & Sender Setup
  // Step 2: Audience & Contact Import
  // Step 3: AI Autonomy Level (Autonomous vs Copilot)
  // Step 4: Campaign Goal & Objective
  // Step 5: Message Composition & Visual Templates
  // Step 6: Review, Deliverability & Schedule/Send

  // STEP 1: DOMAIN & SENDER SETUP STATE
  const [senderName, setSenderName] = useState<string>(brandName);
  const [senderEmail, setSenderEmail] = useState<string>(`hello@${cleanDomain}`);
  const [replyToEmail, setReplyToEmail] = useState<string>(`support@${cleanDomain}`);
  const [isDnsVerified, setIsDnsVerified] = useState<boolean>(true);
  const [isVerifyingDns, setIsVerifyingDns] = useState<boolean>(false);

  // STEP 2: AUDIENCE & CONTACTS STATE
  const [importMethod, setImportMethod] = useState<'synced' | 'csv' | 'paste'>('synced');
  const [cohortName, setCohortName] = useState<string>('All Active Customers');
  const [selectedPreset, setSelectedPreset] = useState<string>('vip_engaged');
  const [cohortCount, setCohortCount] = useState<number>(2450);

  // STEP 3: AI AUTONOMY LEVEL STATE
  const [autonomyLevel, setAutonomyLevel] = useState<'copilot' | 'autonomous'>('copilot');

  // STEP 4: GOAL & STRATEGY STATE
  const [campaignGoal, setCampaignGoal] = useState<string>(
    'Announce seasonal new collection with a 20% early access VIP coupon'
  );
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);

  // STEP 5: MESSAGE & TEMPLATE STATE
  const [subjectLine, setSubjectLine] = useState<string>(
    '🌿 Introducing our newest capsule collection + 20% VIP early access'
  );
  const [preheaderText, setPreheaderText] = useState<string>(
    'Handcrafted luxury designed to elevate your everyday routine.'
  );
  const [emailBodyText, setEmailBodyText] = useState<string>(
`Hi {{first_name}},

We are thrilled to unveil our new limited-run capsule collection. Handcrafted from premium materials designed to elevate your everyday routine with timeless comfort.

As a valued subscriber, use your exclusive VIP code at checkout for 20% off during the next 48 hours.

Thanks,
{{company_name}}`
  );
  const [ctaButtonText, setCtaButtonText] = useState<string>('Explore Capsule Collection →');
  const [ctaUrl, setCtaUrl] = useState<string>(`https://${cleanDomain}/collection`);
  const [isAbTestingEnabled, setIsAbTestingEnabled] = useState<boolean>(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [previewRecipient, setPreviewRecipient] = useState<string>('Abhishek');
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState<boolean>(false);
  const [activeTemplateName, setActiveTemplateName] = useState<string>('Warm Minimalist Product Drop');
  const [activeThemePreset, setActiveThemePreset] = useState<'warm_minimal' | 'crimson_luxe' | 'editorial_digest' | 'flash_sale' | 'executive_plain' | 'vip_black'>('warm_minimal');
  const [activeDiscountCode, setActiveDiscountCode] = useState<string>('EARLYVIP20');
  const [isAiModifying, setIsAiModifying] = useState<boolean>(false);
  const [aiInstructionPrompt, setAiInstructionPrompt] = useState<string>('');

  // STEP 6: REVIEW & DELIVERABILITY STATE
  const [deliverabilityScore, setDeliverabilityScore] = useState<number>(94);
  const [isAutoFixing, setIsAutoFixing] = useState<boolean>(false);
  const [testEmailSent, setTestEmailSent] = useState<boolean>(false);
  const [sendMode, setSendMode] = useState<'now' | 'scheduled'>('now');
  const [scheduleDate, setScheduleDate] = useState<string>('2026-09-12');
  const [scheduleTime, setScheduleTime] = useState<string>('10:15');

  // Broadcast History list
  const [campaignsList, setCampaignsList] = useState([
    {
      id: 'em-101',
      name: 'Summer Linen Capsule Launch',
      subject: '✨ Introducing our Summer 2026 Eco-Linen Collection',
      status: 'sent',
      sentAt: 'Yesterday, 10:30 AM',
      recipients: 4250,
      openRate: '48.6%',
      clickRate: '14.2%',
      revenue: '$6,420',
      type: 'Broadcast'
    },
    {
      id: 'em-102',
      name: 'Welcome Drip: Brand Story & First Order Gift',
      subject: 'Welcome to sustainable living + 15% off your first order',
      status: 'active',
      sentAt: 'Automated Drip (Trigger: Sign up)',
      recipients: 1840,
      openRate: '62.4%',
      clickRate: '28.1%',
      revenue: '$3,890',
      type: 'Automated Flow'
    },
    {
      id: 'em-103',
      name: 'Cart Recovery Sequence: Did you leave something behind?',
      subject: 'Your basket misses you! Complete your order with free shipping 📦',
      status: 'active',
      sentAt: 'Automated Trigger (1 hr after abandonment)',
      recipients: 612,
      openRate: '54.1%',
      clickRate: '21.5%',
      revenue: '$4,150',
      type: 'Automated Flow'
    }
  ]);

  // Handle DNS live test
  const handleVerifyDns = () => {
    setIsVerifyingDns(true);
    setTimeout(() => {
      setIsVerifyingDns(false);
      setIsDnsVerified(true);
    }, 900);
  };

  // Step 4 AI Synthesizing simulation
  const handleSynthesizeGoal = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      setCreatorStep(5);
    }, 800);
  };

  // Step 6 AI Auto-fix deliverability
  const handleAutoFixDeliverability = () => {
    setIsAutoFixing(true);
    setTimeout(() => {
      setDeliverabilityScore(98);
      setIsAutoFixing(false);
    }, 700);
  };

  // Step 6 Test email simulation
  const handleSendTestEmail = () => {
    setTestEmailSent(true);
    setTimeout(() => setTestEmailSent(false), 3000);
  };

  // Complete & Launch Campaign
  const handleFinalLaunch = () => {
    const newCamp = {
      id: `em-${Date.now()}`,
      name: cohortName || 'AI Synthesized Broadcast',
      subject: subjectLine,
      status: sendMode === 'now' ? 'sent' : 'active',
      sentAt: sendMode === 'now' ? 'Just now' : `Scheduled for ${scheduleDate} at ${scheduleTime}`,
      recipients: cohortCount,
      openRate: '0.0%',
      clickRate: '0.0%',
      revenue: '$0',
      type: sendMode === 'now' ? 'Instant Broadcast' : 'Scheduled Broadcast'
    };

    setCampaignsList([newCamp, ...campaignsList]);
    setIsCreatorOpen(false);
    setCreatorStep(1);
    setSearchParams({ tab: 'campaigns' });
  };

  // Handle template selection from TemplateLibraryModal
  const handleTemplateSelected = (tpl: EmailTemplate) => {
    setActiveTemplateName(tpl.name);
    setSubjectLine(tpl.subjectDefault);
    if (tpl.preheaderDefault) setPreheaderText(tpl.preheaderDefault);
    setEmailBodyText(tpl.bodyTextDefault);
    if (tpl.ctaTextDefault) setCtaButtonText(tpl.ctaTextDefault);
    if (tpl.themePreset) setActiveThemePreset(tpl.themePreset);
    if (tpl.discountCode) setActiveDiscountCode(tpl.discountCode);
  };

  // Insert dynamic token tag at cursor / text end
  const handleInsertToken = (token: string) => {
    setEmailBodyText(prev => `${prev} ${token}`);
  };

  // AI Tone & Style Modifiers
  const handleApplyAiTone = (tone: 'urgent' | 'b2b' | 'punchy' | 'discount' | 'social_proof') => {
    setIsAiModifying(true);
    setTimeout(() => {
      if (tone === 'urgent') {
        setSubjectLine(`⚡ URGENT: Only 12 hours left to renew with ${brandName}`);
        setPreheaderText('Last chance to secure exclusive loyalty pricing before rates reset.');
        setEmailBodyText(`Hi {{first_name}},\n\nTime is running out! Your exclusive loyalty benefits with {{company_name}} expire at midnight tonight.\n\nAct now to lock in your special renewal rate and maintain seamless services.\n\nThanks,\n{{company_name}}`);
        setCtaButtonText('Claim Urgent Rate Now →');
        setActiveThemePreset('flash_sale');
      } else if (tone === 'b2b') {
        setSubjectLine(`Quick question regarding growth operations at {{company_name}}`);
        setPreheaderText('Sharing a 2-minute walkthrough on automated pipeline performance.');
        setEmailBodyText(`Hi {{first_name}},\n\nI noticed you are leading acquisition and growth at {{company_name}} and wanted to share how similar teams are automating their multi-channel campaigns.\n\nWe recently helped a partner achieve a 52% higher open rate while reducing campaign drafting time to under 2 minutes.\n\nWould you be open to a quick 10-minute discovery check-in this Thursday or Friday?\n\nBest regards,\nThe {{company_name}} Growth Team`);
        setCtaButtonText('Schedule 10-Min Meeting →');
        setActiveThemePreset('executive_plain');
      } else if (tone === 'punchy') {
        setSubjectLine(`⚡ Quick update from {{company_name}}`);
        setPreheaderText('Your personalized perk is ready to claim.');
        setEmailBodyText(`Hi {{first_name}},\n\nYour exclusive account upgrade is ready. Tap below to activate your perks in 10 seconds.\n\nThanks,\n{{company_name}}`);
        setCtaButtonText('Activate Account Perks →');
        setActiveThemePreset('warm_minimal');
      } else if (tone === 'discount') {
        setSubjectLine(`🎁 Special 20% Discount unlocked for {{first_name}}`);
        setPreheaderText('Enjoy 20% off your next transaction.');
        setEmailBodyText(`Hi {{first_name}},\n\nWe have unlocked an exclusive 20% discount for your account with {{company_name}}.\n\nUse promo code AUTOGROW20 at checkout before the voucher expires.\n\nWarmly,\n{{company_name}}`);
        setActiveDiscountCode('AUTOGROW20');
        setCtaButtonText('Redeem 20% Discount →');
        setActiveThemePreset('warm_minimal');
      } else if (tone === 'social_proof') {
        setSubjectLine(`⭐ Why top growth leaders choose {{company_name}}`);
        setPreheaderText('See how peer teams are scaling with autonomous AI campaigns.');
        setEmailBodyText(`Hi {{first_name}},\n\n"GrowWise AI helped us reduce email campaign drafting time to under 2 minutes while increasing our click rates by 40%." — Verified Customer Review\n\nJoin hundreds of fast-scaling brands optimizing their conversion engine today.\n\nBest regards,\n{{company_name}}`);
        setCtaButtonText('Explore Verified Results →');
        setActiveThemePreset('editorial_digest');
      }
      setIsAiModifying(false);
    }, 700);
  };

  // Custom AI Modification with user instruction prompt
  const handleCustomAiModify = () => {
    if (!aiInstructionPrompt.trim()) return;
    setIsAiModifying(true);
    setTimeout(() => {
      setSubjectLine(`✨ ${aiInstructionPrompt.slice(0, 40)} — from ${brandName}`);
      setEmailBodyText(`Hi {{first_name}},\n\n${aiInstructionPrompt}.\n\nWe tailored this update specifically for your account at {{company_name}} to give you the highest possible value.\n\nThanks,\n{{company_name}}`);
      setIsAiModifying(false);
      setAiInstructionPrompt('');
    }, 900);
  };

  // Regenerate with AI (based on Step 4 goal)
  const handleRegenerateAiCopy = () => {
    setIsAiModifying(true);
    setTimeout(() => {
      setSubjectLine(`🚀 Special Opportunity: ${campaignGoal.slice(0, 42)}...`);
      setPreheaderText(`Tailored strategic update from ${brandName}.`);
      setEmailBodyText(`Hi {{first_name}},\n\nWe are reaching out with an exclusive opportunity tailored to your preferences at {{company_name}}.\n\nOur team is rolling out high-impact enhancements designed to help you achieve: "${campaignGoal}".\n\nTake advantage of this limited window today.\n\nBest regards,\nThe {{company_name}} Team`);
      setCtaButtonText('Unlock Exclusive Benefits →');
      setIsAiModifying(false);
    }, 900);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* 1. Clean Top Header */}
      <div className="bg-[#FAF5F0] border border-[#F3DEC8] rounded-2xl p-5 md:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide bg-[#8C1F3D] text-white">
              Email Channel
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
              <span>SES Domain Verified: {cleanDomain}</span>
            </span>
          </div>

          <h1 className="text-xl md:text-2xl font-black text-[#1E122C] tracking-tight">
            Email Marketing &amp; Campaigns
          </h1>
          <p className="text-xs text-[#6B5E77] max-w-xl">
            Design high-converting responsive email campaigns, manage domain authentication, and configure autonomous AI broadcast schedules.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              setCreatorStep(1);
              setIsCreatorOpen(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#8C1F3D] hover:bg-[#731831] text-white rounded-xl text-xs font-black shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            <span>Start Campaign Wizard</span>
          </button>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards (Clean & Simple) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 border-[#F3DEC8] bg-white space-y-1 shadow-3xs">
          <span className="text-[10px] font-bold text-[#6B5E77] uppercase tracking-wider block">Audience Subscribers</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#1E122C]">8,420</span>
            <span className="text-xs font-bold text-[#10B981]">Clean List</span>
          </div>
          <p className="text-[11px] text-[#6B5E77]">0% hard bounce rate across last 3 sends</p>
        </Card>

        <Card className="p-4 border-[#F3DEC8] bg-white space-y-1 shadow-3xs">
          <span className="text-[10px] font-bold text-[#6B5E77] uppercase tracking-wider block">Average Open Rate</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#8C1F3D]">52.8%</span>
            <span className="text-xs font-bold text-[#10B981]">Grade A+</span>
          </div>
          <p className="text-[11px] text-[#6B5E77]">3.2x higher than industry average</p>
        </Card>

        <Card className="p-4 border-[#F3DEC8] bg-white space-y-1 shadow-3xs">
          <span className="text-[10px] font-bold text-[#6B5E77] uppercase tracking-wider block">Sender Deliverability</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#10B981]">98%</span>
            <span className="text-xs font-bold text-[#10B981]">SPF/DKIM Signed</span>
          </div>
          <p className="text-[11px] text-[#6B5E77]">Dedicated Amazon SES infrastructure</p>
        </Card>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="flex items-center gap-1.5 border-b border-[#F3DEC8] pb-1 overflow-x-auto">
        <button
          onClick={() => handleTabChange('builder')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'builder' || activeTab === 'campaigns' || !['domain', 'subscribers', 'analytics'].includes(activeTab)
              ? 'bg-[#FFEFEA] text-[#8C1F3D] border-b-2 border-[#8C1F3D] font-black shadow-3xs'
              : 'text-[#6B5E77] hover:text-[#1E122C] hover:bg-white/60'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Email Studio &amp; Campaigns ({campaignsList.length})</span>
        </button>

        <button
          onClick={() => handleTabChange('domain')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'domain'
              ? 'bg-[#FFEFEA] text-[#8C1F3D] border-b-2 border-[#8C1F3D] font-black shadow-3xs'
              : 'text-[#6B5E77] hover:text-[#1E122C] hover:bg-white/60'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Sender Domain &amp; DNS Setup</span>
        </button>

        <button
          onClick={() => handleTabChange('subscribers')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'subscribers'
              ? 'bg-[#FFEFEA] text-[#8C1F3D] border-b-2 border-[#8C1F3D] font-black shadow-3xs'
              : 'text-[#6B5E77] hover:text-[#1E122C] hover:bg-white/60'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Audience &amp; Contacts</span>
        </button>

        <button
          onClick={() => handleTabChange('analytics')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'analytics'
              ? 'bg-[#FFEFEA] text-[#8C1F3D] border-b-2 border-[#8C1F3D] font-black shadow-3xs'
              : 'text-[#6B5E77] hover:text-[#1E122C] hover:bg-white/60'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Deliverability &amp; Analytics</span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: EMAIL STUDIO & CAMPAIGNS (Default / Fallback View)
          ========================================================================= */}
      {(activeTab === 'builder' || activeTab === 'campaigns' || !['domain', 'subscribers', 'analytics'].includes(activeTab)) && (
        <div className="space-y-4">
          
          {/* Quick Launch Action Banner */}
          <Card className="p-5 border-[#F3DEC8] bg-linear-to-r from-[#FFFDFB] via-[#FAF5F0] to-[#FFEFEA] shadow-xs relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 max-w-xl">
                <span className="text-[9.5px] font-black uppercase tracking-wider text-[#8C1F3D] bg-[#FFEFEA] px-2 py-0.5 rounded-md border border-[#FAD8C7]">
                  Autonomous Email Engine
                </span>
                <h3 className="text-base font-black text-[#1E122C]">Create &amp; Dispatch High-Converting Campaigns</h3>
                <p className="text-xs text-[#6B5E77]">
                  Launch 6-step guided broadcasts: verify sender domain, filter audience, choose from visual templates, and inspect spam deliverability.
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => setIsTemplateModalOpen(true)}
                  className="px-4 py-2 bg-white border border-[#F3DEC8] hover:bg-[#FAF5F0] text-xs font-bold text-[#1E122C] rounded-xl cursor-pointer shadow-3xs flex items-center gap-1.5"
                >
                  <Palette className="w-3.5 h-3.5 text-[#8C1F3D]" />
                  <span>Browse Templates</span>
                </button>
                <button
                  onClick={() => {
                    setCreatorStep(1);
                    setIsCreatorOpen(true);
                  }}
                  className="px-4 py-2 bg-[#8C1F3D] hover:bg-[#731831] text-white rounded-xl text-xs font-black shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Start Campaign Wizard</span>
                </button>
              </div>
            </div>
          </Card>

          {/* Broadcasts History List */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-[#1E122C]">Recent Email Broadcasts &amp; Automated Flows</h3>
              <button
                onClick={() => {
                  setCreatorStep(1);
                  setIsCreatorOpen(true);
                }}
                className="text-xs font-bold text-[#8C1F3D] hover:underline cursor-pointer"
              >
                + Create New Campaign
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {campaignsList.map((c) => (
                <Card key={c.id} className="p-4 border-[#F3DEC8] bg-white hover:border-[#8C1F3D]/40 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase ${
                          c.status === 'sent' ? 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]' :
                          'bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]'
                        }`}>
                          {c.status}
                        </span>
                        <span className="text-[10px] font-bold text-[#8C1F3D] bg-[#FAF5F0] px-2 py-0.5 rounded-md border border-[#F3DEC8]">
                          {c.type}
                        </span>
                        <span className="text-[10px] text-[#8A8294]">{c.sentAt}</span>
                      </div>
                      <h4 className="text-sm font-black text-[#1E122C] truncate">{c.name}</h4>
                      <p className="text-xs text-[#6B5E77] font-medium truncate">{c.subject}</p>
                    </div>

                    <div className="grid grid-cols-4 gap-4 text-center shrink-0 border-t md:border-t-0 md:border-l border-[#F3DEC8]/70 pt-2 md:pt-0 md:pl-4">
                      <div>
                        <span className="text-[9.5px] font-bold text-[#6B5E77] uppercase block">Recipients</span>
                        <span className="text-xs font-black text-[#1E122C]">{c.recipients.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-[9.5px] font-bold text-[#6B5E77] uppercase block">Open Rate</span>
                        <span className="text-xs font-black text-[#8C1F3D]">{c.openRate}</span>
                      </div>
                      <div>
                        <span className="text-[9.5px] font-bold text-[#6B5E77] uppercase block">Click Rate</span>
                        <span className="text-xs font-black text-[#EA580C]">{c.clickRate}</span>
                      </div>
                      <div>
                        <span className="text-[9.5px] font-bold text-[#6B5E77] uppercase block">Revenue</span>
                        <span className="text-xs font-black text-[#10B981]">{c.revenue}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: SENDER DOMAIN & DNS SETUP VIEW
          ========================================================================= */}
      {activeTab === 'domain' && (
        <div className="space-y-4">
          <Card className="p-6 border-[#F3DEC8] bg-white space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F3DEC8]">
              <div>
                <h3 className="text-base font-black text-[#1E122C]">Sender Domain &amp; DNS Records</h3>
                <p className="text-xs text-[#6B5E77]">
                  Configure your sending domain authentication to prevent spam filters and achieve 99%+ deliverability.
                </p>
              </div>

              <button
                type="button"
                onClick={handleVerifyDns}
                disabled={isVerifyingDns}
                className="px-4 py-2 bg-[#8C1F3D] hover:bg-[#731831] text-white rounded-xl text-xs font-black shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isVerifyingDns ? 'animate-spin' : ''}`} />
                <span>{isVerifyingDns ? 'Checking DNS...' : 'Verify DNS Records'}</span>
              </button>
            </div>

            {/* Sender Identity Config */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-black text-[#1E122C]">Sender From Name</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF5F0] border border-[#F3DEC8] rounded-xl font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-[#1E122C]">From Email Address</label>
                <input
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF5F0] border border-[#F3DEC8] rounded-xl font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-[#1E122C]">Reply-To Email</label>
                <input
                  type="email"
                  value={replyToEmail}
                  onChange={(e) => setReplyToEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF5F0] border border-[#F3DEC8] rounded-xl font-bold"
                />
              </div>
            </div>

            {/* DNS Records Table */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-black text-[#1E122C] block">Required DNS Authentication Records</span>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-[#F3DEC8] rounded-xl overflow-hidden">
                  <thead className="bg-[#FAF5F0] text-[#6B5E77] font-bold">
                    <tr>
                      <th className="p-2.5">Type</th>
                      <th className="p-2.5">Host / Name</th>
                      <th className="p-2.5">Value</th>
                      <th className="p-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F3DEC8]">
                    <tr>
                      <td className="p-2.5 font-bold">SPF (TXT)</td>
                      <td className="p-2.5 font-mono text-[11px]">@</td>
                      <td className="p-2.5 font-mono text-[11px]">v=spf1 include:amazonses.com ~all</td>
                      <td className="p-2.5"><span className="text-[#10B981] font-bold">✓ Verified</span></td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">DKIM (CNAME)</td>
                      <td className="p-2.5 font-mono text-[11px]">resend._domainkey</td>
                      <td className="p-2.5 font-mono text-[11px]">dkim.amazonses.com</td>
                      <td className="p-2.5"><span className="text-[#10B981] font-bold">✓ Verified</span></td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">DMARC (TXT)</td>
                      <td className="p-2.5 font-mono text-[11px]">_dmarc</td>
                      <td className="p-2.5 font-mono text-[11px]">v=DMARC1; p=none; rua=mailto:dmarc@{cleanDomain}</td>
                      <td className="p-2.5"><span className="text-[#10B981] font-bold">✓ Active</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* =========================================================================
          TAB 3: AUDIENCE & CONTACTS VIEW
          ========================================================================= */}
      {activeTab === 'subscribers' && (
        <Card className="p-6 border-[#F3DEC8] bg-white space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F3DEC8]">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-[#1E122C]">Email Audience &amp; Subscribers</h3>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Synced with CRM
                </span>
              </div>
              <p className="text-xs text-[#6B5E77] mt-0.5">
                Manage your synced email subscribers, custom segment cohorts, and opt-in consents.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate('/contacts?source=Email Campaign')}
                className="px-3.5 py-2 bg-[#FFF4EE] border border-[#FAD8C7] text-[#D94A2A] rounded-xl text-xs font-black hover:bg-[#FFE9DE] cursor-pointer flex items-center gap-1.5 transition-all shadow-3xs"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Open Unified CRM Hub</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCreatorStep(2);
                  setIsCreatorOpen(true);
                }}
                className="px-4 py-2 bg-[#8C1F3D] text-white rounded-xl text-xs font-black shadow-xs cursor-pointer flex items-center gap-1.5 hover:bg-[#751932] transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Import Contacts</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {[
              { name: 'VIP Engaged (High LTV)', count: '2,450 contacts', tag: 'High Value', segment: 'hot_leads' },
              { name: 'Recent Cart Abandoners', count: '612 contacts', tag: 'Urgent Retention', segment: 'cart_abandoners' },
              { name: 'Newsletter Subscribers', count: '5,358 contacts', tag: 'Active Digest', segment: 'email_optins' }
            ].map((cohort, i) => (
              <div 
                key={i} 
                onClick={() => navigate(`/contacts?segment=${cohort.segment}`)}
                className="p-4 rounded-2xl border border-[#F3DEC8] bg-[#FAF5F0]/50 hover:bg-white hover:border-[#D94A2A]/40 transition-all cursor-pointer space-y-2 group shadow-3xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9.5px] font-bold text-[#8C1F3D] bg-white px-2 py-0.5 rounded-md border border-[#F3DEC8]">
                    {cohort.tag}
                  </span>
                  <span className="text-[10px] text-[#D94A2A] font-bold group-hover:underline">View in CRM →</span>
                </div>
                <h4 className="text-xs font-black text-[#1E122C] group-hover:text-[#4B1D6B] transition-colors">{cohort.name}</h4>
                <p className="text-xs font-bold text-[#6B5E77]">{cohort.count}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* =========================================================================
          TAB 4: DELIVERABILITY & ANALYTICS VIEW
          ========================================================================= */}
      {activeTab === 'analytics' && (
        <div className="space-y-4">
          <Card className="p-6 border-[#F3DEC8] bg-white space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F3DEC8]">
              <div>
                <h3 className="text-base font-black text-[#1E122C]">Deliverability Health &amp; Engagement Analytics</h3>
                <p className="text-xs text-[#6B5E77]">
                  Monitor inbox placement, reputation scores, and conversion telemetry across all sent broadcasts.
                </p>
              </div>

              <span className="text-xs font-bold text-[#10B981] bg-[#ECFDF5] px-3 py-1 rounded-full border border-[#A7F3D0]">
                Inbox Placement: 99.4%
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl border border-[#F3DEC8] bg-[#FAF5F0]/50 space-y-1">
                <span className="text-[10px] font-bold text-[#6B5E77] uppercase">Total Emails Sent</span>
                <div className="text-xl font-black text-[#1E122C]">24,850</div>
                <span className="text-[10.5px] text-[#10B981] font-semibold">99.8% Delivered</span>
              </div>
              <div className="p-3.5 rounded-xl border border-[#F3DEC8] bg-[#FAF5F0]/50 space-y-1">
                <span className="text-[10px] font-bold text-[#6B5E77] uppercase">Unique Opens</span>
                <div className="text-xl font-black text-[#8C1F3D]">13,120</div>
                <span className="text-[10.5px] text-[#8C1F3D] font-semibold">52.8% Open Rate</span>
              </div>
              <div className="p-3.5 rounded-xl border border-[#F3DEC8] bg-[#FAF5F0]/50 space-y-1">
                <span className="text-[10px] font-bold text-[#6B5E77] uppercase">Click-Throughs</span>
                <div className="text-xl font-black text-[#EA580C]">4,820</div>
                <span className="text-[10.5px] text-[#EA580C] font-semibold">19.4% CTR</span>
              </div>
              <div className="p-3.5 rounded-xl border border-[#F3DEC8] bg-[#FAF5F0]/50 space-y-1">
                <span className="text-[10px] font-bold text-[#6B5E77] uppercase">Spam Complaints</span>
                <div className="text-xl font-black text-[#10B981]">0.01%</div>
                <span className="text-[10.5px] text-[#10B981] font-semibold">Clean SES Score</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* =========================================================================
          4. GUIDED CAMPAIGN CREATION WIZARD (All Steps: Domain -> Audience -> Autonomy -> Goal -> Message -> Review)
          ========================================================================= */}
      {isCreatorOpen && (
        <div className="fixed inset-0 z-50 bg-[#1E122C]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-[#FFFDFC] border border-[#F3DEC8] rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
            
            {/* Modal Top Bar */}
            <div className="px-6 py-4 border-b border-[#F3DEC8] bg-[#FAF5F0]/80 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C] animate-pulse" />
                <h3 className="text-sm font-black text-[#1E122C]">Email Marketing &amp; Campaign Wizard</h3>
                <span className="text-[10px] text-[#8C1F3D] font-bold bg-white px-2 py-0.5 rounded-md border border-[#F3DEC8]">
                  Step {creatorStep} of 6
                </span>
              </div>

              <button
                onClick={() => setIsCreatorOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white text-[#6B5E77] hover:text-[#1E122C] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 6-Step Stepper Rail */}
            <div className="px-6 py-2.5 border-b border-[#F3DEC8] bg-white flex items-center justify-between overflow-x-auto text-xs font-black">
              {[
                { step: 1, label: '01 Domain & Sender' },
                { step: 2, label: '02 Audience' },
                { step: 3, label: '03 AI Autonomy' },
                { step: 4, label: '04 Goal' },
                { step: 5, label: '05 Message' },
                { step: 6, label: '06 Launch' }
              ].map((s) => (
                <button
                  key={s.step}
                  onClick={() => setCreatorStep(s.step)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-all ${
                    creatorStep === s.step
                      ? 'bg-[#8C1F3D] text-white shadow-xs'
                      : creatorStep > s.step
                      ? 'text-[#10B981] bg-[#ECFDF5]'
                      : 'text-[#6B5E77] hover:text-[#1E122C]'
                  }`}
                >
                  {creatorStep > s.step ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : null}
                  <span>{s.label}</span>
                </button>
              ))}
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">

              {/* -------------------------------------------------------------
                  STEP 1: SENDER DOMAIN & IDENTITY SETUP (Asked here as requested)
                  ------------------------------------------------------------- */}
              {creatorStep === 1 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="space-y-1">
                    <h2 className="text-base font-black text-[#1E122C]">Step 1: Sender Identity &amp; Domain Authentication</h2>
                    <p className="text-xs text-[#6B5E77]">
                      Configure the email address your subscribers will see in their inboxes. We verify SPF and DKIM records to prevent spam filters.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-[#1E122C]">From Sender Name</label>
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="e.g. Bloom Boutique"
                        className="w-full px-3.5 py-2 text-xs bg-white border border-[#F3DEC8] rounded-xl font-bold outline-none text-[#1E122C]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-[#1E122C]">Sender Email Address</label>
                      <input
                        type="email"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="e.g. hello@bloomboutique.shop"
                        className="w-full px-3.5 py-2 text-xs bg-white border border-[#F3DEC8] rounded-xl font-bold outline-none text-[#1E122C]"
                      />
                    </div>
                  </div>

                  {/* Live DNS Authentication Box */}
                  <div className="p-4 rounded-2xl bg-[#FAF5F0] border border-[#F3DEC8] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                        <span className="text-xs font-black text-[#1E122C]">DNS Deliverability &amp; SPF/DKIM Authentication</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#10B981] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#A7F3D0]">
                        Verified Safe Sender
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-[11px] text-[#6B5E77]">
                      <div className="p-2.5 bg-white rounded-xl border border-[#F3DEC8]">
                        <strong className="text-[#1E122C] block">SPF Record</strong>
                        <span className="font-mono text-[10px]">v=spf1 include:amazonses.com</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-[#F3DEC8]">
                        <strong className="text-[#1E122C] block">DKIM Key</strong>
                        <span className="font-mono text-[10px]">resend._domainkey 2048-bit</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-[#F3DEC8]">
                        <strong className="text-[#1E122C] block">DMARC Policy</strong>
                        <span className="font-mono text-[10px]">p=none; rua=mailto:...</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-[#6B5E77]">Connected domain: <strong>{cleanDomain}</strong></span>
                      <button
                        type="button"
                        onClick={handleVerifyDns}
                        disabled={isVerifyingDns}
                        className="px-3 py-1.5 bg-white border border-[#F3DEC8] hover:bg-[#FAF5F0] text-xs font-bold text-[#8C1F3D] rounded-xl cursor-pointer flex items-center gap-1 shadow-3xs"
                      >
                        <RefreshCw className={`w-3 h-3 ${isVerifyingDns ? 'animate-spin' : ''}`} />
                        <span>{isVerifyingDns ? 'Validating...' : 'Re-check DNS'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------
                  STEP 2: AUDIENCE & CONTACT IMPORT
                  ------------------------------------------------------------- */}
              {creatorStep === 2 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="space-y-1">
                    <h2 className="text-base font-black text-[#1E122C]">Step 2: Audience Cohort &amp; Contacts</h2>
                    <p className="text-xs text-[#6B5E77]">
                      Choose who will receive this email broadcast. Filter active customer segments or upload fresh lists.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'synced', label: '👥 Store Customers', desc: '2,450 Synced & Cleaned' },
                      { id: 'csv', label: '📄 Upload CSV / Sheet', desc: 'Import external leads' },
                      { id: 'paste', label: '✍️ Paste Emails', desc: 'Quick batch entry' }
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setImportMethod(m.id as any)}
                        className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                          importMethod === m.id
                            ? 'bg-[#FFEFEA] border-[#8C1F3D] text-[#8C1F3D]'
                            : 'bg-white border-[#F3DEC8] text-[#6B5E77] hover:bg-[#FAF5F0]'
                        }`}
                      >
                        <span className="text-xs font-black block text-[#1E122C]">{m.label}</span>
                        <span className="text-[10.5px] opacity-80">{m.desc}</span>
                      </button>
                    ))}
                  </div>

                  {/* Target Segment Presets */}
                  <div className="space-y-2 p-4 rounded-2xl bg-[#FCFAF8] border border-[#F3DEC8]">
                    <span className="text-xs font-black text-[#1E122C] block">Target Segment Preset</span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: 'vip_engaged', label: 'VIP Engaged (High LTV)', count: 2450 },
                        { id: 'promo_consented', label: 'Promo Consented Only', count: 1890 },
                        { id: 'cart_abandoners', label: 'Recent Cart Abandoners', count: 612 },
                        { id: 'all', label: 'All Verified Subscribers', count: 8420 }
                      ].map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => {
                            setSelectedPreset(preset.id);
                            setCohortCount(preset.count);
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            selectedPreset === preset.id
                              ? 'bg-[#8C1F3D] text-white shadow-xs'
                              : 'bg-white text-[#1E122C] border border-[#F3DEC8] hover:bg-[#FAF5F0]'
                          }`}
                        >
                          {preset.label} ({preset.count.toLocaleString()})
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-[#FAF5F0] rounded-xl border border-[#F3DEC8] flex items-center justify-between text-xs">
                    <span>Verified Safe Recipients: <strong className="text-[#10B981]">{cohortCount.toLocaleString()}</strong></span>
                    <span className="text-[#6B5E77]">0 suppressed • 0 invalid</span>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------
                  STEP 3: AI AUTONOMY & CONTROL LEVEL (As requested by user!)
                  ------------------------------------------------------------- */}
              {creatorStep === 3 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="space-y-1">
                    <h2 className="text-base font-black text-[#1E122C]">Step 3: AI Autonomy &amp; Decision Control</h2>
                    <p className="text-xs text-[#6B5E77]">
                      Decide how much independent authority you want to delegate to GrowWise AI for this marketing channel.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Copilot Option */}
                    <div 
                      onClick={() => setAutonomyLevel('copilot')}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer space-y-2.5 ${
                        autonomyLevel === 'copilot'
                          ? 'border-[#8C1F3D] bg-[#FFFDFB] shadow-md'
                          : 'border-[#F3DEC8] bg-white hover:border-[#8C1F3D]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-wider text-[#8C1F3D] bg-[#FFEFEA] px-2.5 py-0.5 rounded-md border border-[#FAD8C7]">
                          Recommended
                        </span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          autonomyLevel === 'copilot' ? 'border-[#8C1F3D] bg-[#8C1F3D]' : 'border-slate-300'
                        }`}>
                          {autonomyLevel === 'copilot' && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                        </div>
                      </div>

                      <h3 className="text-sm font-black text-[#1E122C]">🛡️ Copilot (Ask Every Time)</h3>
                      <p className="text-xs text-[#6B5E77] leading-relaxed">
                        AI analyzes recipient activity, generates subject lines, and drafts templates, but <strong>always requests your 1-click approval</strong> before any email is dispatched.
                      </p>
                    </div>

                    {/* Fully Autonomous Option */}
                    <div 
                      onClick={() => setAutonomyLevel('autonomous')}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer space-y-2.5 ${
                        autonomyLevel === 'autonomous'
                          ? 'border-[#8C1F3D] bg-[#FFFDFB] shadow-md'
                          : 'border-[#F3DEC8] bg-white hover:border-[#8C1F3D]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-wider text-[#EA580C] bg-[#FFF0E6] px-2.5 py-0.5 rounded-md border border-[#FAD8C7]">
                          Full Autopilot
                        </span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          autonomyLevel === 'autonomous' ? 'border-[#8C1F3D] bg-[#8C1F3D]' : 'border-slate-300'
                        }`}>
                          {autonomyLevel === 'autonomous' && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                        </div>
                      </div>

                      <h3 className="text-sm font-black text-[#1E122C]">🚀 Fully Autonomous (Hands-Free)</h3>
                      <p className="text-xs text-[#6B5E77] leading-relaxed">
                        AI automatically schedules broadcasts at the subscriber's predicted peak engagement hour and executes A/B test rollouts without requiring manual review.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------
                  STEP 4: CAMPAIGN OBJECTIVE & GOAL
                  ------------------------------------------------------------- */}
              {creatorStep === 4 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="space-y-1">
                    <h2 className="text-base font-black text-[#1E122C]">Step 4: Campaign Objective &amp; Goal</h2>
                    <p className="text-xs text-[#6B5E77]">
                      Describe what this campaign aims to achieve. AI will use this to synthesize the subject line and body copy.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-[#1E122C]">Marketing Objective</label>
                    <textarea
                      rows={3}
                      value={campaignGoal}
                      onChange={(e) => setCampaignGoal(e.target.value)}
                      className="w-full p-3.5 text-xs bg-white border border-[#F3DEC8] rounded-xl outline-none font-medium leading-relaxed"
                      placeholder="e.g., Promote 48-hour flash sale for summer organic linen collection with 20% discount..."
                    />
                  </div>

                  {/* Quick Goal Presets */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-[#8A8294] tracking-wider block">Quick Objective Presets:</span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        '⚡ 48-Hour Seasonal Flash Sale with 20% coupon',
                        '🌿 New Capsule Product Drop announcement',
                        '☕ Weekly Intelligence Digest Issue #42',
                        '🎁 Re-engagement win-back with $15 gift voucher'
                      ].map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setCampaignGoal(preset)}
                          className="px-3 py-1.5 bg-[#FAF5F0] hover:bg-[#FFEFEA] text-xs font-bold text-[#6B5E77] hover:text-[#8C1F3D] border border-[#F3DEC8] rounded-xl cursor-pointer transition-colors"
                        >
                          + {preset}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------
                  STEP 5: MESSAGE COMPOSITION & VISUAL TEMPLATES
                  ------------------------------------------------------------- */}
              {creatorStep === 5 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in">
                  
                  {/* Left Column: Copy Synthesis & AI Refiner */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-black text-[#1E122C]">Email Copy Synthesis</h3>
                        <span className="text-[10px] text-[#8C1F3D] font-bold">OpenAI GPT-4o Powered</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsTemplateModalOpen(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#8C1F3D] text-white rounded-xl text-xs font-black shadow-xs hover:bg-[#731831] cursor-pointer"
                      >
                        <Layout className="w-3.5 h-3.5" />
                        <span>Change Template</span>
                      </button>
                    </div>

                    {/* AI Modification Toolbar */}
                    <div className="p-3.5 rounded-2xl bg-linear-to-r from-[#FAF5F0] via-[#FFFDFB] to-[#FFEFEA] border border-[#F3DEC8] space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-[#1E122C] flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" />
                          AI Copy Refiner &amp; Tone Tuning
                        </span>
                        <button
                          type="button"
                          onClick={handleRegenerateAiCopy}
                          disabled={isAiModifying}
                          className="px-2 py-0.5 bg-white border border-[#F3DEC8] text-[10.5px] font-bold text-[#8C1F3D] rounded-lg cursor-pointer"
                        >
                          Regenerate with AI
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { id: 'urgent', label: '⚡ Urgent FOMO' },
                          { id: 'b2b', label: '💼 Executive B2B' },
                          { id: 'punchy', label: '✂️ Short & Punchy' },
                          { id: 'discount', label: '🎁 20% Discount' },
                          { id: 'social_proof', label: '⭐ Social Proof' }
                        ].map((tone) => (
                          <button
                            key={tone.id}
                            type="button"
                            onClick={() => handleApplyAiTone(tone.id as any)}
                            disabled={isAiModifying}
                            className="px-2 py-1 bg-white hover:bg-[#FFEFEA] border border-[#F3DEC8] text-[10.5px] font-bold text-[#1E122C] rounded-lg cursor-pointer shadow-3xs"
                          >
                            {tone.label}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5 pt-1">
                        <input
                          type="text"
                          placeholder="Modify with AI prompt (e.g., Make it friendlier, add 2-day delivery)..."
                          value={aiInstructionPrompt}
                          onChange={(e) => setAiInstructionPrompt(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleCustomAiModify();
                            }
                          }}
                          className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#F3DEC8] rounded-xl outline-none font-medium placeholder-[#8A8294]"
                        />
                        <button
                          type="button"
                          onClick={handleCustomAiModify}
                          disabled={isAiModifying || !aiInstructionPrompt.trim()}
                          className="px-3 py-1.5 bg-[#8C1F3D] text-white rounded-xl text-xs font-black cursor-pointer shadow-3xs"
                        >
                          Apply Edit
                        </button>
                      </div>
                    </div>

                    {/* Subject Line */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-[#8A8294] tracking-wider block">
                        SUBJECT LINE
                      </label>
                      <input
                        type="text"
                        value={subjectLine}
                        onChange={(e) => setSubjectLine(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-white border border-[#F3DEC8] rounded-xl font-bold text-[#1E122C] outline-none"
                      />
                    </div>

                    {/* Preheader Text */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-[#8A8294] tracking-wider block">
                        PREHEADER TEXT
                      </label>
                      <input
                        type="text"
                        value={preheaderText}
                        onChange={(e) => setPreheaderText(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-white border border-[#F3DEC8] rounded-xl font-medium text-[#6B5E77] outline-none"
                      />
                    </div>

                    {/* Email Body */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-black uppercase text-[#8A8294] tracking-wider">
                          EMAIL BODY COPY
                        </label>
                        <span className="text-[10px] text-[#8C1F3D] font-bold">
                          Active: {activeTemplateName}
                        </span>
                      </div>
                      <textarea
                        rows={6}
                        value={emailBodyText}
                        onChange={(e) => setEmailBodyText(e.target.value)}
                        className="w-full p-3 text-xs bg-white border border-[#F3DEC8] rounded-xl font-sans outline-none leading-relaxed text-[#1E122C]"
                      />
                    </div>

                    {/* Dynamic Token Insert Tags */}
                    <div className="space-y-1 p-2 rounded-xl bg-[#FAF5F0] border border-[#F3DEC8]">
                      <span className="text-[9px] font-black uppercase text-[#8A8294] tracking-wider block">
                        INSERT DYNAMIC TOKENS:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {['{{first_name}}', '{{company_name}}', '{{cta_url}}'].map((tok) => (
                          <button
                            key={tok}
                            type="button"
                            onClick={() => handleInsertToken(tok)}
                            className="px-2 py-0.5 bg-white text-[#8C1F3D] border border-[#F3DEC8] rounded-md text-[10px] font-mono font-bold cursor-pointer shadow-3xs"
                          >
                            + {tok}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Live Responsive Real Email Preview */}
                  <div className="lg:col-span-6 space-y-3">
                    <div className="flex items-center justify-between">
                      {/* Theme Switcher */}
                      <div className="flex items-center gap-1">
                        {[
                          { id: 'warm_minimal', label: 'Warm Minimal' },
                          { id: 'crimson_luxe', label: 'Crimson' },
                          { id: 'editorial_digest', label: 'Editorial' },
                          { id: 'flash_sale', label: 'Flash' }
                        ].map((theme) => (
                          <button
                            key={theme.id}
                            type="button"
                            onClick={() => setActiveThemePreset(theme.id as any)}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                              activeThemePreset === theme.id
                                ? 'bg-[#8C1F3D] text-white'
                                : 'bg-[#FAF5F0] text-[#6B5E77] border border-[#F3DEC8]'
                            }`}
                          >
                            {theme.label}
                          </button>
                        ))}
                      </div>

                      {/* Recipient switcher */}
                      <select
                        value={previewRecipient}
                        onChange={(e) => setPreviewRecipient(e.target.value)}
                        className="px-2 py-1 text-[10px] bg-[#FAF5F0] border border-[#F3DEC8] rounded-lg font-bold text-[#1E122C]"
                      >
                        <option value="Abhishek">Preview: Abhishek</option>
                        <option value="Priya Sharma">Preview: Priya Sharma</option>
                        <option value="Rahul Verma">Preview: Rahul Verma</option>
                      </select>
                    </div>

                    {/* Email Client Canvas */}
                    <div className="border border-[#F3DEC8] rounded-2xl bg-[#FCFAF8] p-3 shadow-xs">
                      <div className="bg-white rounded-xl border border-[#F3DEC8] overflow-hidden">
                        <div className="p-2.5 bg-[#FAF5F0] border-b border-[#F3DEC8] text-[10.5px] text-[#6B5E77] space-y-0.5">
                          <div><strong className="text-[#1E122C]">From:</strong> {senderName} &lt;{senderEmail}&gt;</div>
                          <div><strong className="text-[#1E122C]">Subject:</strong> {subjectLine.replace(/\{\{first_name\}\}/g, previewRecipient)}</div>
                        </div>

                        <div className="p-4 space-y-3 text-left">
                          <div className="p-2.5 rounded-xl bg-[#FAF5F0] border border-[#F3DEC8] text-center">
                            <h4 className="text-xs font-black text-[#8C1F3D] uppercase">{brandName}</h4>
                          </div>

                          <div className="text-xs text-[#1E122C] whitespace-pre-line leading-relaxed">
                            {emailBodyText
                              .replace(/\{\{first_name\}\}/g, previewRecipient)
                              .replace(/\{\{company_name\}\}/g, brandName)
                              .replace(/\{\{cta_url\}\}/g, ctaUrl)}
                          </div>

                          {activeDiscountCode && (
                            <div className="p-2 bg-[#FAF5F0] border border-dashed border-[#EA580C] rounded-lg text-center">
                              <span className="text-[9px] font-bold text-[#6B5E77]">VIP Promo Code: </span>
                              <strong className="text-xs text-[#8C1F3D]">{activeDiscountCode}</strong>
                            </div>
                          )}

                          <div className="pt-2 text-center">
                            <span className="inline-block px-5 py-2 bg-[#8C1F3D] text-white rounded-full text-xs font-black shadow-md">
                              {ctaButtonText}
                            </span>
                          </div>

                          <div className="pt-3 border-t border-[#F3DEC8] text-center text-[8.5px] text-[#8A8294]">
                            © 2026 {brandName} Inc. • 1-Click Unsubscribe • Verified SES
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------
                  STEP 6: REVIEW, DELIVERABILITY & SCHEDULE / SEND
                  ------------------------------------------------------------- */}
              {creatorStep === 6 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="space-y-1">
                    <h2 className="text-base font-black text-[#1E122C]">Step 6: Pre-Flight Review &amp; Dispatch</h2>
                    <p className="text-xs text-[#6B5E77]">
                      Review compliance safeguards, inspect deliverability grade, and choose instant dispatch or automated scheduling.
                    </p>
                  </div>

                  {/* Deliverability Inspector */}
                  <div className="p-4 rounded-2xl bg-white border border-[#F3DEC8] flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-lg font-black text-[#059669]">
                        {deliverabilityScore}%
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-[#1E122C]">PRE-FLIGHT DELIVERABILITY &amp; SPAM INSPECTION</h4>
                        <span className="text-[11px] text-[#10B981] font-bold">Grade A+ • Safe from Gmail &amp; Apple spam filters</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleSendTestEmail}
                      className="px-3 py-1.5 bg-[#FAF5F0] hover:bg-[#FFEFEA] text-xs font-bold text-[#8C1F3D] border border-[#F3DEC8] rounded-xl cursor-pointer"
                    >
                      {testEmailSent ? '✓ Test Sent to You!' : 'Send Live Test Email'}
                    </button>
                  </div>

                  {/* Send Options */}
                  <div className="p-4 rounded-2xl bg-[#FCFAF8] border border-[#F3DEC8] space-y-3">
                    <span className="text-xs font-black text-[#1E122C] block">Dispatch Timing</span>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setSendMode('now')}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          sendMode === 'now'
                            ? 'bg-[#FFEFEA] border-[#8C1F3D] text-[#8C1F3D]'
                            : 'bg-white border-[#F3DEC8] text-[#6B5E77]'
                        }`}
                      >
                        <span className="text-xs font-black block text-[#1E122C]">🚀 Send Immediately</span>
                        <span className="text-[10px]">Dispatch to {cohortCount.toLocaleString()} recipients now</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSendMode('scheduled')}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          sendMode === 'scheduled'
                            ? 'bg-[#FFEFEA] border-[#8C1F3D] text-[#8C1F3D]'
                            : 'bg-white border-[#F3DEC8] text-[#6B5E77]'
                        }`}
                      >
                        <span className="text-xs font-black block text-[#1E122C]">⏰ Schedule for Later</span>
                        <span className="text-[10px]">AI optimal send window</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Navigation Footer */}
            <div className="px-6 py-4 border-t border-[#F3DEC8] bg-[#FAF5F0]/80 flex items-center justify-between shrink-0">
              {creatorStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCreatorStep(creatorStep - 1)}
                  className="px-4 py-2 bg-white border border-[#F3DEC8] hover:bg-[#FAF5F0] text-xs font-bold text-[#1E122C] rounded-xl cursor-pointer"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}

              {creatorStep < 6 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (creatorStep === 4) handleSynthesizeGoal();
                    else setCreatorStep(creatorStep + 1);
                  }}
                  className="px-6 py-2.5 bg-[#8C1F3D] hover:bg-[#731831] text-white rounded-xl text-xs font-black shadow-md cursor-pointer transition-all"
                >
                  {creatorStep === 4 ? (isSynthesizing ? 'Synthesizing...' : 'Synthesize Campaign ➔') : 'Continue ➔'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinalLaunch}
                  className="px-6 py-2.5 bg-[#10B981] hover:bg-[#059669] text-white rounded-xl text-xs font-black shadow-md cursor-pointer"
                >
                  {sendMode === 'now' ? '🚀 Dispatch Campaign Now' : '⏰ Schedule Campaign'}
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Visual Template Library Modal */}
      <TemplateLibraryModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onSelectTemplate={handleTemplateSelected}
        brandName={brandName}
      />

    </div>
  );
};

export default EmailCampaign;
