import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  MessageSquare, 
  Sparkles, 
  Users, 
  BarChart3, 
  Send, 
  CheckCircle2, 
  Plus, 
  BookOpen, 
  Zap, 
  Phone, 
  Search, 
  ArrowRight,
  ShieldCheck,
  CheckCheck
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useMarketing } from '../context/MarketingContext';

export const WhatsappCampaign: React.FC = () => {
  const { activeWorkspace } = useMarketing();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = searchParams.get('tab') || 'broadcast';

  const brandName = activeWorkspace?.name || 'Bloom Boutique';
  const senderNumber = activeWorkspace?.whatsapp?.whatsappNumber || '+1 (555) 349-2890';

  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId });
  };

  // Mock WhatsApp Broadcasts & Templates Data
  const broadcastList = [
    {
      id: 'wa-201',
      title: 'Summer Flash Sale: VIP Exclusive 25% Off',
      templateName: 'summer_flash_sale_v2',
      sentAt: 'Today, 09:15 AM',
      delivered: 2450,
      readRate: '96.4%',
      replyRate: '34.2%',
      orders: 142,
      status: 'completed'
    },
    {
      id: 'wa-202',
      title: 'Abandoned Cart 2-Hour Recovery Alert',
      templateName: 'cart_recovery_discount',
      sentAt: 'Trigger: Automated (Live)',
      delivered: 380,
      readRate: '98.1%',
      replyRate: '41.5%',
      orders: 88,
      status: 'active'
    },
    {
      id: 'wa-203',
      title: 'Order Dispatch & Tracking Notification',
      templateName: 'order_status_update_en',
      sentAt: 'Trigger: Shopify Order Fulfillment',
      delivered: 890,
      readRate: '99.2%',
      replyRate: '12.8%',
      orders: 0,
      status: 'active'
    }
  ];

  const templateList = [
    {
      id: 'tpl-1',
      name: 'promotional_festive_drop',
      category: 'Marketing',
      language: 'English (US)',
      status: 'APPROVED by Meta',
      header: 'Image Banner',
      bodySnippet: 'Hi {{1}}, exclusive early access to our Summer Collection is now live for VIP customers. Tap below to claim your 20% code.'
    },
    {
      id: 'tpl-2',
      name: 'order_delivery_tracking',
      category: 'Utility',
      language: 'English (US)',
      status: 'APPROVED by Meta',
      header: 'None',
      bodySnippet: 'Hello {{1}}, great news! Your package #{{2}} has been shipped and is out for delivery with tracking link: {{3}}.'
    },
    {
      id: 'tpl-3',
      name: 'cart_recovery_reminder',
      category: 'Marketing',
      language: 'English (US)',
      status: 'APPROVED by Meta',
      header: 'Document / Image',
      bodySnippet: 'Hey {{1}}, you left {{2}} items in your cart. We saved them for you with free expedited shipping today only!'
    }
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* 1. Header Banner */}
      <div className="bg-[#FAF5F0] border border-[#F3DEC8] rounded-2xl p-5 md:p-6 shadow-xs relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wide uppercase bg-[#16A34A] text-white">
                WhatsApp Business API
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#16A34A]" />
                Meta Verified: {senderNumber}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-[#1E122C] tracking-tight flex items-center gap-2.5">
              <MessageSquare className="w-7 h-7 text-[#16A34A]" />
              WhatsApp Campaign Hub
            </h1>
            <p className="text-xs md:text-sm text-[#6B5E77] font-medium mt-1 max-w-2xl">
              Launch high-converting WhatsApp promotional broadcasts, approved Meta templates, automated 24/7 cart recovery alerts, and 1-on-1 CRM replies.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleTabChange('broadcast')}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:from-[#15803D] hover:to-[#166534] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New WhatsApp Broadcast</span>
            </button>
          </div>
        </div>

        {/* Top KPI Metrics Pill Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-[#F3DEC8]/80">
          <div className="bg-white/90 p-3 rounded-xl border border-[#F3DEC8] shadow-3xs">
            <span className="text-[10px] font-bold text-[#6B5E77] uppercase tracking-wider block">Opt-in Contacts</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-lg font-black text-[#1E122C]">3,240</span>
              <span className="text-[10px] font-bold text-[#16A34A]">+24% MoM</span>
            </div>
          </div>

          <div className="bg-white/90 p-3 rounded-xl border border-[#F3DEC8] shadow-3xs">
            <span className="text-[10px] font-bold text-[#6B5E77] uppercase tracking-wider block">Avg. Read Rate</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-lg font-black text-[#16A34A]">96.8%</span>
              <span className="text-[10px] font-bold text-[#16A34A]">Instant open</span>
            </div>
          </div>

          <div className="bg-white/90 p-3 rounded-xl border border-[#F3DEC8] shadow-3xs">
            <span className="text-[10px] font-bold text-[#6B5E77] uppercase tracking-wider block">Reply / Chat Rate</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-lg font-black text-[#EA580C]">34.6%</span>
              <span className="text-[10px] font-bold text-[#10B981]">High conversion</span>
            </div>
          </div>

          <div className="bg-white/90 p-3 rounded-xl border border-[#F3DEC8] shadow-3xs">
            <span className="text-[10px] font-bold text-[#6B5E77] uppercase tracking-wider block">Direct Sales</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-lg font-black text-[#10B981]">$11,820</span>
              <span className="text-[10px] font-bold text-[#6B5E77]">Last 30d</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex items-center gap-1.5 border-b border-[#F3DEC8] pb-1 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => handleTabChange('broadcast')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'broadcast'
              ? 'bg-[#E8F8EE] text-[#16A34A] border-b-2 border-[#16A34A] font-black shadow-3xs'
              : 'text-[#6B5E77] hover:text-[#1E122C] hover:bg-white/60'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Broadcast Studio</span>
        </button>

        <button
          onClick={() => handleTabChange('templates')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'templates'
              ? 'bg-[#E8F8EE] text-[#16A34A] border-b-2 border-[#16A34A] font-black shadow-3xs'
              : 'text-[#6B5E77] hover:text-[#1E122C] hover:bg-white/60'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Message Templates</span>
          <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-white border border-[#BBF7D0] text-[#16A34A]">
            {templateList.length}
          </span>
        </button>

        <button
          onClick={() => handleTabChange('automation')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'automation'
              ? 'bg-[#E8F8EE] text-[#16A34A] border-b-2 border-[#16A34A] font-black shadow-3xs'
              : 'text-[#6B5E77] hover:text-[#1E122C] hover:bg-white/60'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Automated Bot &amp; Alerts</span>
        </button>

        <button
          onClick={() => handleTabChange('analytics')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'analytics'
              ? 'bg-[#E8F8EE] text-[#16A34A] border-b-2 border-[#16A34A] font-black shadow-3xs'
              : 'text-[#6B5E77] hover:text-[#1E122C] hover:bg-white/60'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Delivery &amp; Read Rates</span>
        </button>
      </div>

      {/* 3. Tab Content View */}
      {activeTab === 'broadcast' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Form: Broadcast Creator */}
          <div className="lg:col-span-7 space-y-5">
            <Card className="p-5 border-[#F3DEC8] bg-white">
              <div className="flex items-center justify-between pb-4 border-b border-[#F3DEC8]/70">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#E8F8EE] border border-[#BBF7D0] flex items-center justify-center text-[#16A34A]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#1E122C]">AI WhatsApp Broadcast Composer</h3>
                    <p className="text-[11px] text-[#6B5E77]">Select approved Meta templates and personalize with customer tags</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]">
                  Meta Cloud API
                </span>
              </div>

              <div className="space-y-4 pt-4">
                <div>
                  <label className="block text-xs font-black text-[#1E122C] mb-1">
                    Select Meta Approved Template
                  </label>
                  <select className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF5F0] border border-[#F3DEC8] text-[#1E122C] font-semibold focus:outline-none">
                    <option>summer_flash_sale_v2 (Marketing • Approved)</option>
                    <option>cart_recovery_reminder (Marketing • Approved)</option>
                    <option>order_delivery_tracking (Utility • Approved)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black text-[#1E122C] mb-1">
                      Recipient Audience
                    </label>
                    <select className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF5F0] border border-[#F3DEC8] text-[#1E122C] font-semibold focus:outline-none">
                      <option>All WhatsApp Opt-ins (3,240)</option>
                      <option>VIP Repeat Shoppers (840)</option>
                      <option>Recent Inquirers (310)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-[#1E122C] mb-1">
                      Header Media Asset
                    </label>
                    <select className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF5F0] border border-[#F3DEC8] text-[#1E122C] font-semibold focus:outline-none">
                      <option>Attached Image (Summer_Lookbook.jpg)</option>
                      <option>Product Video Clip (15s)</option>
                      <option>Catalog PDF Brochure</option>
                      <option>None (Text Only)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-[#1E122C] mb-1">
                    Interactive CTA Buttons
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-xl bg-[#FAF5F0] border border-[#F3DEC8] text-xs font-bold text-[#1E122C] flex items-center justify-between">
                      <span>🛍️ Shop 20% Off Now</span>
                      <span className="text-[9px] text-[#16A34A] font-bold">Quick URL</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#FAF5F0] border border-[#F3DEC8] text-xs font-bold text-[#1E122C] flex items-center justify-between">
                      <span>💬 Chat with Stylist</span>
                      <span className="text-[9px] text-[#2563EB] font-bold">Bot Flow</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Broadcast Action Card */}
            <Card className="p-4 border-[#F3DEC8] bg-[#FAF5F0]/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#16A34A]/10 border border-[#16A34A]/30 flex items-center justify-center text-[#16A34A]">
                  <CheckCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#1E122C]">Meta Quality Rating: Green (High)</h4>
                  <p className="text-[11px] text-[#6B5E77]">Unlimited tier sending tier enabled. Zero rate limit blocks.</p>
                </div>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer">
                <Send className="w-3.5 h-3.5" />
                <span>Send Broadcast (3,240 Contacts)</span>
              </button>
            </Card>
          </div>

          {/* Right Panel: WhatsApp Phone Mockup */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="p-4 border-[#F3DEC8] bg-white shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#F3DEC8]/70">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#16A34A]" />
                  <span className="text-xs font-black text-[#1E122C]">Live WhatsApp Phone Preview</span>
                </div>
                <span className="text-[10px] font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded-md border border-[#BBF7D0]">
                  Official WhatsApp Business
                </span>
              </div>

              {/* Phone Bubble Frame */}
              <div className="mt-4 rounded-2xl border-2 border-[#1E122C] bg-[#EFEAE2] p-3 shadow-md max-w-sm mx-auto overflow-hidden">
                {/* Chat Top bar */}
                <div className="bg-[#075E54] text-white p-2.5 rounded-t-xl flex items-center gap-2.5 shadow-xs">
                  <div className="w-7 h-7 rounded-full bg-white/20 border border-white/40 flex items-center justify-center font-bold text-xs">
                    {brandName.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold truncate leading-tight flex items-center gap-1">
                      {brandName}
                      <ShieldCheck className="w-3 h-3 text-[#25D366]" />
                    </h5>
                    <span className="text-[9px] text-white/80 block leading-none">Official Business Account</span>
                  </div>
                </div>

                {/* Message Bubble Container */}
                <div className="py-4 px-1 space-y-3">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-xs border border-[#000000]/5 max-w-[90%] space-y-2">
                    <div className="h-28 rounded-lg bg-[#FAF5F0] border border-[#F3DEC8] flex items-center justify-center text-center p-2 text-[10px] font-bold text-[#8C1F3D]">
                      [Image: Summer 2026 Capsule Header]
                    </div>
                    <p className="text-xs text-[#1E122C] leading-relaxed">
                      Hi Priya! 🌸
                      <br /><br />
                      Our highly anticipated French Linen Summer Collection is officially here. As a valued VIP member, enjoy an exclusive <strong>20% discount</strong> today.
                    </p>
                    <div className="flex items-center justify-end gap-1 text-[9px] text-[#6B5E77]">
                      <span>09:15 AM</span>
                      <CheckCheck className="w-3 h-3 text-[#34B7F1]" />
                    </div>
                  </div>

                  {/* WhatsApp Interactive Buttons */}
                  <div className="space-y-1.5 max-w-[90%]">
                    <button className="w-full py-2 bg-white hover:bg-slate-50 border border-[#000000]/10 rounded-xl text-xs font-black text-[#00A884] shadow-xs text-center flex items-center justify-center gap-1.5">
                      <span>🛍️ Shop 20% Off Now</span>
                    </button>
                    <button className="w-full py-2 bg-white hover:bg-slate-50 border border-[#000000]/10 rounded-xl text-xs font-black text-[#00A884] shadow-xs text-center flex items-center justify-center gap-1.5">
                      <span>💬 Chat with Stylist</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Templates View */}
      {activeTab === 'templates' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-[#1E122C]">Meta Approved WhatsApp Templates</span>
              <span className="text-xs font-bold text-[#16A34A] bg-[#DCFCE7] border border-[#BBF7D0] px-2 py-0.5 rounded-full">
                {templateList.length} Active
              </span>
            </div>

            <button className="px-3.5 py-2 bg-[#16A34A] text-white rounded-xl text-xs font-bold shadow-xs">
              + Submit New Meta Template
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templateList.map((tpl) => (
              <Card key={tpl.id} className="p-4 border-[#F3DEC8] bg-white flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wide bg-[#FAF5F0] text-[#8C1F3D] px-2 py-0.5 rounded-md border border-[#F3DEC8]">
                      {tpl.category}
                    </span>
                    <span className="text-[9.5px] font-bold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded-md">
                      {tpl.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-black text-[#1E122C] font-mono">{tpl.name}</h4>
                  <p className="text-xs text-[#6B5E77] leading-relaxed bg-[#FAF5F0]/60 p-2.5 rounded-xl border border-[#F3DEC8]/70">
                    "{tpl.bodySnippet}"
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F3DEC8]/60 flex items-center justify-between text-[10px] text-[#6B5E77]">
                  <span>Lang: {tpl.language}</span>
                  <span className="text-[#16A34A] font-bold">Header: {tpl.header}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}


      {/* Automation View */}
      {activeTab === 'automation' && (
        <Card className="p-6 border-[#F3DEC8] bg-white text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#DCFCE7] border border-[#BBF7D0] flex items-center justify-center text-[#16A34A]">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-black text-[#1E122C]">Automated Chatbot Triggers &amp; Fast Replies</h3>
            <p className="text-xs text-[#6B5E77] max-w-md mx-auto mt-1">
              Configure autonomous AI replies for FAQs, shipping tracking, sizing advice, and abandoned cart nudges.
            </p>
          </div>
        </Card>
      )}

      {/* Analytics View */}
      {activeTab === 'analytics' && (
        <Card className="p-6 border-[#F3DEC8] bg-white text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#DCFCE7] border border-[#BBF7D0] flex items-center justify-center text-[#16A34A]">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-black text-[#1E122C]">WhatsApp Delivery, Read &amp; Order Attribution</h3>
            <p className="text-xs text-[#6B5E77] max-w-md mx-auto mt-1">
              Deep dive into delivery speeds, read rates across countries, button clicks, and direct Shopify revenue.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default WhatsappCampaign;
