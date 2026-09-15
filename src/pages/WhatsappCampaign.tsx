import React, { useState } from 'react';
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
  CheckCheck,
  QrCode,
  Smartphone,
  Check,
  X,
  AlertTriangle,
  RefreshCw,
  Bell,
  PowerOff,
  Lock,
  Image as ImageIcon,
  Film,
  FileText
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useMarketing } from '../context/MarketingContext';

export const WhatsAppBrandIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <img src="/brand-icons/whatsapp.png" alt="WhatsApp" className={`${className} object-contain shrink-0`} />
);

export const WhatsappCampaign: React.FC = () => {
  const { activeWorkspace, updateWorkspace } = useMarketing();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = searchParams.get('tab') || 'broadcast';

  const brandName = activeWorkspace?.name || 'Bloom Boutique';
  const wsId = activeWorkspace?.id || 'w_bloom';
  const storageKey = `wa_connected_${wsId}`;
  const numberKey = `wa_number_${wsId}`;
  const answeredKey = `wa_answered_${wsId}`;

  // =========================================================================
  // 1. CONNECTION STATE (Sabse pehle check)
  // =========================================================================
  const [hasAnswered, setHasAnswered] = useState<boolean>(() => {
    if (activeWorkspace?.whatsapp?.isConnected !== undefined) return true;
    return localStorage.getItem(answeredKey) === 'true';
  });

  const [isConnected, setIsConnected] = useState<boolean>(() => {
    if (activeWorkspace?.whatsapp?.isConnected !== undefined) {
      return activeWorkspace.whatsapp.isConnected;
    }
    const val = localStorage.getItem(storageKey);
    return val !== null ? val === 'true' : true;
  });

  const [connectedNumber, setConnectedNumber] = useState<string>(() => {
    return localStorage.getItem(numberKey) || activeWorkspace?.whatsapp?.whatsappNumber || '+1 (555) 349-2890';
  });

  // UI Flow States
  const [showConnectModal, setShowConnectModal] = useState<boolean>(false);
  const [connectMethod, setConnectMethod] = useState<'qr' | 'cloud_api'>('qr');
  const [phoneInput, setPhoneInput] = useState<string>(connectedNumber);
  const [wabaIdInput, setWabaIdInput] = useState<string>('waba_94810294820');
  const [apiTokenInput, setApiTokenInput] = useState<string>('EAABwz_meta_cloud_active_token_9x');
  const [isPairing, setIsPairing] = useState<boolean>(false);
  const [pairingStageText, setPairingStageText] = useState<string>('');
  const [pingNotification, setPingNotification] = useState<{ title: string; body: string } | null>(null);
  const [broadcastSentBanner, setBroadcastSentBanner] = useState<boolean>(false);

  // =========================================================================
  // CONTROLLED BROADCAST FORM STATE (Starts completely blank / unselected!)
  // =========================================================================
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [selectedAudience, setSelectedAudience] = useState<string>('');
  const [headerMedia, setHeaderMedia] = useState<string>('');
  const [headerCaption, setHeaderCaption] = useState<string>('');
  const [messageBody, setMessageBody] = useState<string>('');
  const [customerNameVar, setCustomerNameVar] = useState<string>('');
  const [offerDiscountVar, setOfferDiscountVar] = useState<string>('');
  const [cta1Label, setCta1Label] = useState<string>('');
  const [cta2Label, setCta2Label] = useState<string>('');

  // Meta Approved Broadcast Templates
  const broadcastTemplates = [
    {
      id: 'summer_flash_sale_v2',
      name: 'summer_flash_sale_v2 (Marketing • Approved)',
      displayName: 'Summer Flash Sale & VIP 20% Off',
      category: 'Marketing',
      defaultHeaderMedia: 'Image Banner',
      defaultHeaderCaption: 'Summer Capsule Lookbook 2026',
      defaultMessage: 'Hi {{1}}! 🌸\n\nOur highly anticipated French Linen Summer Collection is officially here. As a valued VIP member, enjoy an exclusive {{2}} today.',
      defaultCustomerVar: 'Priya',
      defaultOfferVar: '20% discount',
      cta1: '🛍️ Shop 20% Off Now',
      cta2: '💬 Chat with Stylist',
    },
    {
      id: 'cart_recovery_reminder',
      name: 'cart_recovery_reminder (Marketing • Approved)',
      displayName: 'Abandoned Cart 2-Hour Recovery Alert',
      category: 'Marketing',
      defaultHeaderMedia: 'Image Banner',
      defaultHeaderCaption: 'Items Saved In Your Cart',
      defaultMessage: 'Hey {{1}}! 🛒 You left items in your shopping bag. We saved them for you with {{2}} today only! Tap below to claim your reserved items.',
      defaultCustomerVar: 'Alex',
      defaultOfferVar: 'Free Expedited Shipping',
      cta1: '⚡ Checkout Saved Cart',
      cta2: '💬 Need Sizing Help?',
    },
    {
      id: 'order_delivery_tracking',
      name: 'order_delivery_tracking (Utility • Approved)',
      displayName: 'Order Dispatch & Live Courier Tracking',
      category: 'Utility',
      defaultHeaderMedia: 'None',
      defaultHeaderCaption: '',
      defaultMessage: 'Hello {{1}}! 📦 Great news! Your order {{2}} has been packed and is out for delivery. Tap below to track courier status in real-time.',
      defaultCustomerVar: 'Michael',
      defaultOfferVar: '#BB-94021',
      cta1: '📍 Track Live Delivery',
      cta2: '📞 Contact Support',
    },
    {
      id: 'festive_new_arrival',
      name: 'promotional_festive_drop (Marketing • Approved)',
      displayName: 'New Season Capsule & Early Access Lookbook',
      category: 'Marketing',
      defaultHeaderMedia: 'PDF Brochure',
      defaultHeaderCaption: 'Summer_Lookbook_Catalog.pdf',
      defaultMessage: 'Hello {{1}}! ✨ Discover our newly dropped seasonal designs with handcrafted fabrics. Use promo code {{2}} on your order today.',
      defaultCustomerVar: 'Sarah',
      defaultOfferVar: 'WELCOME15',
      cta1: '📖 View Full Catalog',
      cta2: '💬 Chat with Stylist',
    },
    {
      id: 'custom_broadcast',
      name: 'custom_broadcast_draft (Marketing • Custom)',
      displayName: 'Custom Marketing Broadcast (Empty Canvas)',
      category: 'Marketing',
      defaultHeaderMedia: 'None',
      defaultHeaderCaption: '',
      defaultMessage: 'Hi {{1}}! We have an exciting update for you: {{2}}.',
      defaultCustomerVar: 'Customer',
      defaultOfferVar: 'Special Offer',
      cta1: '✨ Learn More',
      cta2: '💬 Reply on WhatsApp',
    }
  ];

  // Recipient Audiences
  const audienceOptions = [
    { id: 'all_optins', label: 'All WhatsApp Opt-ins (3,240)', count: 3240 },
    { id: 'vip_shoppers', label: 'VIP Repeat Shoppers (840)', count: 840 },
    { id: 'recent_inquirers', label: 'Recent Inquirers (310)', count: 310 },
    { id: 'cart_abandoners', label: 'Abandoned Cart Leads (145)', count: 145 },
  ];

  // Dynamic template selection handler (Updates all fields when chosen)
  const handleTemplateChange = (tmplId: string) => {
    setSelectedTemplateId(tmplId);
    if (!tmplId) {
      setHeaderMedia('');
      setHeaderCaption('');
      setMessageBody('');
      setCustomerNameVar('');
      setOfferDiscountVar('');
      setCta1Label('');
      setCta2Label('');
      return;
    }
    const t = broadcastTemplates.find(x => x.id === tmplId);
    if (t) {
      setHeaderMedia(t.defaultHeaderMedia);
      setHeaderCaption(t.defaultHeaderCaption);
      setMessageBody(t.defaultMessage);
      setCustomerNameVar(t.defaultCustomerVar);
      setOfferDiscountVar(t.defaultOfferVar);
      setCta1Label(t.cta1);
      setCta2Label(t.cta2);
    }
  };

  // Sync state changes with context & localStorage
  const saveConnectionState = (connected: boolean, number: string, answered: boolean = true) => {
    setIsConnected(connected);
    setConnectedNumber(number);
    setHasAnswered(answered);
    localStorage.setItem(storageKey, connected ? 'true' : 'false');
    localStorage.setItem(numberKey, number);
    localStorage.setItem(answeredKey, answered ? 'true' : 'false');

    if (activeWorkspace?.id) {
      updateWorkspace(activeWorkspace.id, {
        whatsapp: {
          whatsappNumber: number,
          businessType: activeWorkspace.whatsapp?.businessType || 'promotional_broadcasts',
          subscriberOptInCount: activeWorkspace.whatsapp?.subscriberOptInCount || '500 - 2,500 contacts',
          preferredLanguage: activeWorkspace.whatsapp?.preferredLanguage || 'English / Hinglish',
          isConnected: connected,
          connectedAt: connected ? new Date().toISOString() : undefined,
          connectionMethod: connectMethod
        }
      });
    }
  };

  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId });
  };

  // Disconnect handler
  const handleDisconnect = () => {
    saveConnectionState(false, connectedNumber, true);
    setShowConnectModal(false);
  };

  // Pair via QR Code Simulation
  const handlePairQrCode = async () => {
    setIsPairing(true);
    setPairingStageText('1/3: Reading WhatsApp QR encryption token...');
    await new Promise(r => setTimeout(r, 900));
    setPairingStageText('2/3: Handshaking with WhatsApp Multi-Device socket...');
    await new Promise(r => setTimeout(r, 900));
    setPairingStageText('3/3: Pairing WhatsApp Business session (+1 555 349-2890)...');
    await new Promise(r => setTimeout(r, 900));
    
    saveConnectionState(true, phoneInput || '+1 (555) 349-2890', true);
    setIsPairing(false);
    setShowConnectModal(false);
    triggerPing('WhatsApp Connected via QR Code! 📱', `Linked device session authenticated successfully for ${brandName}.`);
  };

  // Pair via Meta Cloud API
  const handleConnectCloudApi = async () => {
    setIsPairing(true);
    setPairingStageText('Validating Meta Business Manager credentials...');
    await new Promise(r => setTimeout(r, 1200));
    
    saveConnectionState(true, phoneInput || '+1 (555) 349-2890', true);
    setIsPairing(false);
    setShowConnectModal(false);
    triggerPing('Meta Cloud API Verified! ⚡', `WABA ID ${wabaIdInput} successfully connected with High Quality Rating.`);
  };

  // Floating simulated WhatsApp push notification
  const triggerPing = (title: string, body: string) => {
    setPingNotification({ title, body });
    setTimeout(() => {
      setPingNotification(null);
    }, 4500);
  };

  // Target audience count lookup
  const selectedAudienceObj = audienceOptions.find(a => a.id === selectedAudience);
  const targetAudienceCount = selectedAudienceObj ? selectedAudienceObj.count : 0;

  // Send broadcast handler
  const handleSendBroadcast = () => {
    if (!isConnected) {
      setShowConnectModal(true);
      return;
    }
    if (!selectedTemplateId && !messageBody) {
      triggerPing('Select Template ⚠️', 'Please select a Meta approved template or write a message before broadcasting.');
      return;
    }
    if (!selectedAudience) {
      triggerPing('Select Audience ⚠️', 'Please choose a target recipient audience before sending.');
      return;
    }
    setBroadcastSentBanner(true);
    triggerPing('Broadcast Dispatched 🚀', `Broadcast sent to ${targetAudienceCount.toLocaleString()} verified WhatsApp contacts.`);
    setTimeout(() => setBroadcastSentBanner(false), 5000);
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
      id: 'summer_flash_sale_v2',
      name: 'summer_flash_sale_v2',
      category: 'Marketing',
      language: 'English (US)',
      status: 'APPROVED by Meta',
      header: 'Image Banner',
      bodySnippet: 'Hi {{1}}! 🌸 Our highly anticipated French Linen Summer Collection is officially here. As a valued VIP member, enjoy an exclusive {{2}} today.'
    },
    {
      id: 'cart_recovery_reminder',
      name: 'cart_recovery_reminder',
      category: 'Marketing',
      language: 'English (US)',
      status: 'APPROVED by Meta',
      header: 'Image Banner',
      bodySnippet: 'Hey {{1}}! 🛒 You left items in your shopping bag. We saved them for you with {{2}} today only! Tap below to claim your reserved items.'
    },
    {
      id: 'order_delivery_tracking',
      name: 'order_delivery_tracking',
      category: 'Utility',
      language: 'English (US)',
      status: 'APPROVED by Meta',
      header: 'None',
      bodySnippet: 'Hello {{1}}! 📦 Great news! Your order {{2}} has been packed and is out for delivery. Tap below to track courier status in real-time.'
    },
    {
      id: 'festive_new_arrival',
      name: 'promotional_festive_drop',
      category: 'Marketing',
      language: 'English (US)',
      status: 'APPROVED by Meta',
      header: 'PDF Brochure',
      bodySnippet: 'Hello {{1}}! ✨ Discover our newly dropped seasonal designs with handcrafted fabrics. Use promo code {{2}} on your order today.'
    }
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300 relative">

      {/* Floating WhatsApp Test Notification Popover */}
      {pingNotification && (
        <div className="fixed top-5 right-5 z-50 max-w-sm w-full bg-[#1E122C] text-white p-4 rounded-2xl shadow-2xl border border-emerald-500/30 animate-in slide-in-from-top-4 duration-300 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#25D366] flex items-center justify-center shrink-0 shadow-md">
            <WhatsAppBrandIcon className="w-5 h-5 brightness-0 invert" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
              <span>WHATSAPP BUSINESS • NOW</span>
              <button 
                onClick={() => setPingNotification(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <h4 className="text-xs font-black text-white mt-0.5 truncate">{pingNotification.title}</h4>
            <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">{pingNotification.body}</p>
          </div>
        </div>
      )}


      {/* Broadcast Sent Toast */}
      {broadcastSentBanner && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCheck className="w-4 h-4 text-emerald-600" />
            <span>Broadcast Dispatched Successfully to 3,240 verified WhatsApp subscribers!</span>
          </div>
          <button onClick={() => setBroadcastSentBanner(false)} className="text-emerald-700 hover:text-emerald-950 font-black cursor-pointer">
            ✕
          </button>
        </div>
      )}

      {/* 1. Header Banner */}
      <div className="bg-[#FAF5F0] border border-[#F3DEC8] rounded-2xl p-5 md:p-6 shadow-xs relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wide uppercase bg-[#16A34A] text-white flex items-center gap-1">
                <WhatsAppBrandIcon className="w-3 h-3 brightness-0 invert" />
                WhatsApp Business API
              </span>

              {/* Dynamic Connection Status Badge */}
              {isConnected ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0] flex items-center gap-1.5 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                  <ShieldCheck className="w-3 h-3 text-[#16A34A]" />
                  Connected: {connectedNumber}
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <AlertTriangle className="w-3 h-3 text-amber-600" />
                  Not Connected (Setup Required)
                </span>
              )}

              {isConnected && (
                <span className="text-[10px] font-bold text-slate-500 bg-white/80 px-2 py-0.5 rounded-md border border-slate-200">
                  Quality: High (Green)
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-[#1E122C] tracking-tight flex items-center gap-2.5">
              <MessageSquare className="w-7 h-7 text-[#16A34A]" />
              WhatsApp Campaign Hub
            </h1>
            <p className="text-xs md:text-sm text-[#6B5E77] font-medium mt-1 max-w-2xl">
              Launch high-converting WhatsApp promotional broadcasts, approved Meta templates, automated 24/7 cart recovery alerts, and 1-on-1 CRM replies.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {isConnected ? (
              <>
                <button
                  onClick={() => triggerPing('WhatsApp Test Ping Delivered 🔔', `Test message successfully received by ${connectedNumber} with latency 42ms.`)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-[#1E122C] border border-[#F3DEC8] rounded-xl text-xs font-bold shadow-2xs cursor-pointer"
                  title="Send simulated test message"
                >
                  <Bell className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span>Test Ping</span>
                </button>

                <button
                  onClick={handleDisconnect}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 rounded-xl text-xs font-bold shadow-2xs cursor-pointer"
                  title="Disconnect WhatsApp Business"
                >
                  <PowerOff className="w-3.5 h-3.5" />
                  <span>Disconnect</span>
                </button>

                <button
                  onClick={() => handleTabChange('broadcast')}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:from-[#15803D] hover:to-[#166534] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>New WhatsApp Broadcast</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowConnectModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:from-[#15803D] hover:to-[#166534] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer animate-pulse"
              >
                <Zap className="w-4 h-4" />
                <span>Connect WhatsApp Now</span>
              </button>
            )}
          </div>
        </div>

        {/* Top KPI Metrics Pill Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-[#F3DEC8]/80">
          <div className="bg-white/90 p-3 rounded-xl border border-[#F3DEC8] shadow-3xs">
            <span className="text-[10px] font-bold text-[#6B5E77] uppercase tracking-wider block">Opt-in Contacts</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-lg font-black text-[#1E122C]">
                {isConnected ? '3,240' : '0 (Paused)'}
              </span>
              {isConnected && <span className="text-[10px] font-bold text-[#16A34A]">+24% MoM</span>}
            </div>
          </div>

          <div className="bg-white/90 p-3 rounded-xl border border-[#F3DEC8] shadow-3xs">
            <span className="text-[10px] font-bold text-[#6B5E77] uppercase tracking-wider block">Avg. Read Rate</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-lg font-black text-[#16A34A]">
                {isConnected ? '96.8%' : '--'}
              </span>
              {isConnected && <span className="text-[10px] font-bold text-[#16A34A]">Instant open</span>}
            </div>
          </div>

          <div className="bg-white/90 p-3 rounded-xl border border-[#F3DEC8] shadow-3xs">
            <span className="text-[10px] font-bold text-[#6B5E77] uppercase tracking-wider block">Reply / Chat Rate</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-lg font-black text-[#EA580C]">
                {isConnected ? '34.6%' : '--'}
              </span>
              {isConnected && <span className="text-[10px] font-bold text-[#10B981]">High conversion</span>}
            </div>
          </div>

          <div className="bg-white/90 p-3 rounded-xl border border-[#F3DEC8] shadow-3xs">
            <span className="text-[10px] font-bold text-[#6B5E77] uppercase tracking-wider block">Direct Sales</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-lg font-black text-[#10B981]">
                {isConnected ? '$11,820' : '$0'}
              </span>
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
                  <select 
                    value={selectedTemplateId}
                    onChange={(e) => handleTemplateChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF5F0] border border-[#F3DEC8] text-[#1E122C] font-semibold focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20"
                  >
                    <option value="">-- Select Meta Approved Template --</option>
                    {broadcastTemplates.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black text-[#1E122C] mb-1">
                      Recipient Audience
                    </label>
                    <select 
                      value={selectedAudience}
                      onChange={(e) => setSelectedAudience(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF5F0] border border-[#F3DEC8] text-[#1E122C] font-semibold focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20"
                    >
                      <option value="">-- Select Recipient Audience --</option>
                      {audienceOptions.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-[#1E122C] mb-1">
                      Header Media Asset
                    </label>
                    <select 
                      value={headerMedia}
                      onChange={(e) => setHeaderMedia(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF5F0] border border-[#F3DEC8] text-[#1E122C] font-semibold focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20"
                    >
                      <option value="">-- Select Header Media --</option>
                      <option value="None">None (Text Only)</option>
                      <option value="Image Banner">Attached Image Banner</option>
                      <option value="Product Video">Product Video Clip</option>
                      <option value="PDF Brochure">Catalog PDF Brochure</option>
                    </select>
                  </div>
                </div>

                {/* Conditional Header Caption/Filename */}
                {headerMedia && headerMedia !== 'None' && (
                  <div>
                    <label className="block text-[11px] font-bold text-[#6B5E77] mb-1">
                      Header Media Caption / File Label
                    </label>
                    <input
                      type="text"
                      value={headerCaption}
                      onChange={(e) => setHeaderCaption(e.target.value)}
                      placeholder="e.g. Summer Capsule Lookbook 2026"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF5F0] border border-[#F3DEC8] text-[#1E122C] font-medium focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20"
                    />
                  </div>
                )}

                {/* Personalization Variables Tag {{1}} and {{2}} */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black text-[#1E122C] mb-1 flex items-center justify-between">
                      <span>Customer Name Tag {'{{1}}'}</span>
                      <span className="text-[10px] text-[#16A34A] font-bold">Dynamic Variable</span>
                    </label>
                    <input
                      type="text"
                      value={customerNameVar}
                      onChange={(e) => setCustomerNameVar(e.target.value)}
                      placeholder="e.g. Priya"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF5F0] border border-[#F3DEC8] text-[#1E122C] font-medium focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-[#1E122C] mb-1 flex items-center justify-between">
                      <span>Offer / Detail Tag {'{{2}}'}</span>
                      <span className="text-[10px] text-[#16A34A] font-bold">Dynamic Variable</span>
                    </label>
                    <input
                      type="text"
                      value={offerDiscountVar}
                      onChange={(e) => setOfferDiscountVar(e.target.value)}
                      placeholder="e.g. 20% discount"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF5F0] border border-[#F3DEC8] text-[#1E122C] font-medium focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20"
                    />
                  </div>
                </div>

                {/* Message Body */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-black text-[#1E122C]">
                      Message Body (Live WhatsApp Formatting)
                    </label>
                    <span className="text-[10px] text-[#6B5E77]">Supports {'{{1}}'} &amp; {'{{2}}'}</span>
                  </div>
                  <textarea
                    rows={4}
                    value={messageBody}
                    onChange={(e) => setMessageBody(e.target.value)}
                    placeholder="Choose a template above or write your broadcast message. Use {{1}} for customer name and {{2}} for offer/tracking code..."
                    className="w-full p-3 text-xs rounded-xl bg-[#FAF5F0] border border-[#F3DEC8] text-[#1E122C] font-medium focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 resize-none leading-relaxed"
                  />
                </div>

                {/* Interactive CTA Buttons */}
                <div>
                  <label className="block text-xs font-black text-[#1E122C] mb-1">
                    Interactive CTA Buttons
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-[#6B5E77] mb-0.5 block">Button 1 (URL / Action)</span>
                      <input
                        type="text"
                        value={cta1Label}
                        onChange={(e) => setCta1Label(e.target.value)}
                        placeholder="e.g. 🛍️ Shop 20% Off Now"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF5F0] border border-[#F3DEC8] text-[#1E122C] font-semibold focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#6B5E77] mb-0.5 block">Button 2 (Quick Reply / Bot)</span>
                      <input
                        type="text"
                        value={cta2Label}
                        onChange={(e) => setCta2Label(e.target.value)}
                        placeholder="e.g. 💬 Chat with Stylist"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF5F0] border border-[#F3DEC8] text-[#1E122C] font-semibold focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Broadcast Action Card */}
            <Card className="p-4 border-[#F3DEC8] bg-[#FAF5F0]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#16A34A]/10 border border-[#16A34A]/30 flex items-center justify-center text-[#16A34A]">
                  <CheckCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#1E122C]">
                    {isConnected ? 'Meta Quality Rating: Green (High)' : 'Connection Status: Disconnected'}
                  </h4>
                  <p className="text-[11px] text-[#6B5E77]">
                    {isConnected 
                      ? (targetAudienceCount > 0 
                         ? `Ready to dispatch to ${targetAudienceCount.toLocaleString()} verified subscribers.` 
                         : 'Select a recipient audience and template to send broadcast.')
                      : 'Connect WhatsApp Business account to enable broadcast dispatch.'}
                  </p>
                </div>
              </div>

              {isConnected ? (
                <button 
                  onClick={handleSendBroadcast}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {targetAudienceCount > 0 
                      ? `Send Broadcast (${targetAudienceCount.toLocaleString()} Contacts)` 
                      : 'Send Broadcast'}
                  </span>
                </button>
              ) : (
                <button 
                  onClick={() => setShowConnectModal(true)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Connect WhatsApp to Send</span>
                </button>
              )}
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
                  {isConnected ? 'Official WhatsApp Business' : 'Preview Mode'}
                </span>
              </div>

              {/* Phone Bubble Frame */}
              <div className="mt-4 rounded-2xl border-2 border-[#1E122C] bg-[#EFEAE2] p-3 shadow-md max-w-sm mx-auto overflow-hidden">
                {/* Chat Top bar */}
                <div className="bg-[#075E54] text-white p-2.5 rounded-t-xl flex items-center gap-2.5 shadow-xs">
                  <div className="w-7 h-7 rounded-full bg-white/20 border border-white/40 flex items-center justify-center font-bold text-xs">
                    {brandName.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs font-bold truncate leading-tight flex items-center gap-1">
                      {brandName}
                      <ShieldCheck className="w-3 h-3 text-[#25D366]" />
                    </h5>
                    <span className="text-[9px] text-white/80 block leading-none">
                      {isConnected ? `Official Account • ${connectedNumber}` : 'Official Business Account'}
                    </span>
                  </div>
                </div>

                {/* Message Bubble Container */}
                <div className="py-4 px-1 space-y-3 min-h-[320px] flex flex-col justify-start">
                  {!selectedTemplateId && !messageBody ? (
                    <div className="p-6 rounded-2xl bg-white/85 border-2 border-dashed border-slate-300 text-center space-y-2.5 my-auto">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-[#16A34A]">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <h5 className="text-xs font-bold text-[#1E122C]">Live WhatsApp Preview</h5>
                      <p className="text-[11px] text-[#6B5E77] leading-relaxed">
                        Select an approved template or write a message on the left. The live phone preview will update instantly here.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-xs border border-[#000000]/5 max-w-[95%] space-y-2.5 animate-in fade-in duration-200">
                        {/* Header Media */}
                        {headerMedia === 'Image Banner' && (
                          <div className="h-28 rounded-lg bg-gradient-to-br from-amber-50 to-orange-100 border border-[#F3DEC8] flex flex-col items-center justify-center text-center p-2 text-[10px] font-bold text-[#8C1F3D] relative overflow-hidden">
                            <ImageIcon className="w-6 h-6 text-[#8C1F3D]/70 mb-1" />
                            <span>[Image: {headerCaption || 'Lookbook Header'}]</span>
                          </div>
                        )}
                        {headerMedia === 'Product Video' && (
                          <div className="h-28 rounded-lg bg-slate-900 border border-slate-700 flex flex-col items-center justify-center text-center p-2 text-[10px] font-bold text-white relative overflow-hidden">
                            <Film className="w-6 h-6 text-emerald-400 mb-1" />
                            <span>[Video: {headerCaption || '15s Product Reel'}]</span>
                          </div>
                        )}
                        {headerMedia === 'PDF Brochure' && (
                          <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 flex items-center gap-2 text-rose-800">
                            <FileText className="w-5 h-5 text-rose-600 shrink-0" />
                            <div className="min-w-0 text-left">
                              <p className="text-[10px] font-bold truncate">{headerCaption || 'Lookbook_Brochure.pdf'}</p>
                              <p className="text-[9px] text-rose-600/70">Document • PDF</p>
                            </div>
                          </div>
                        )}

                        {/* Rendered Text */}
                        <p className="text-xs text-[#1E122C] leading-relaxed whitespace-pre-line">
                          {messageBody
                            .replace(/\{\{1\}\}/g, customerNameVar || '{{Customer Name}}')
                            .replace(/\{\{2\}\}/g, offerDiscountVar || '{{Offer / Code}}')}
                        </p>

                        <div className="flex items-center justify-end gap-1 text-[9px] text-[#6B5E77]">
                          <span>Just now</span>
                          <CheckCheck className="w-3 h-3 text-[#34B7F1]" />
                        </div>
                      </div>

                      {/* Interactive CTA Buttons */}
                      {(cta1Label || cta2Label) && (
                        <div className="space-y-1.5 max-w-[95%]">
                          {cta1Label && (
                            <button className="w-full py-2 bg-white hover:bg-slate-50 border border-[#000000]/10 rounded-xl text-xs font-bold text-[#00A884] shadow-xs text-center flex items-center justify-center gap-1.5 transition-colors">
                              <span>{cta1Label}</span>
                            </button>
                          )}
                          {cta2Label && (
                            <button className="w-full py-2 bg-white hover:bg-slate-50 border border-[#000000]/10 rounded-xl text-xs font-bold text-[#00A884] shadow-xs text-center flex items-center justify-center gap-1.5 transition-colors">
                              <span>{cta2Label}</span>
                            </button>
                          )}
                        </div>
                      )}
                    </>
                  )}
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
                  <button
                    onClick={() => {
                      handleTemplateChange(tpl.id);
                      handleTabChange('broadcast');
                    }}
                    className="text-[#16A34A] hover:text-[#15803D] font-bold cursor-pointer flex items-center gap-1 hover:underline"
                  >
                    Use in Composer →
                  </button>
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
          {!isConnected && (
            <div className="pt-2">
              <button
                onClick={() => setShowConnectModal(true)}
                className="px-4 py-2 bg-[#16A34A] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
              >
                Connect WhatsApp to Activate Bot
              </button>
            </div>
          )}
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

      {/* =========================================================================
          CONNECT WHATSAPP MODAL / HUB (If not connected or clicked Connect)
          ========================================================================= */}
      {showConnectModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#F3DEC8] shadow-2xl max-w-xl w-full p-6 space-y-5 animate-in zoom-in-95 duration-200 relative">
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#DCFCE7] border border-[#BBF7D0] flex items-center justify-center text-[#16A34A]">
                  <WhatsAppBrandIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#1E122C]">Connect WhatsApp Business</h3>
                  <p className="text-xs text-[#6B5E77]">Link your account to send broadcasts and activate autonomous replies</p>
                </div>
              </div>

              <button
                onClick={() => setShowConnectModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Connection Method Tabs */}
            <div className="flex p-1 bg-slate-100 rounded-xl">
              <button
                onClick={() => setConnectMethod('qr')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  connectMethod === 'qr'
                    ? 'bg-white text-[#16A34A] shadow-xs'
                    : 'text-[#6B5E77] hover:text-slate-900'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Method 1: Scan QR Code (Fast)</span>
              </button>

              <button
                onClick={() => setConnectMethod('cloud_api')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  connectMethod === 'cloud_api'
                    ? 'bg-white text-[#16A34A] shadow-xs'
                    : 'text-[#6B5E77] hover:text-slate-900'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Method 2: Meta Cloud API</span>
              </button>
            </div>

            {/* Pairing Progress State */}
            {isPairing ? (
              <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border-2 border-emerald-300 flex items-center justify-center text-emerald-600 animate-spin">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#1E122C]">Connecting WhatsApp...</h4>
                  <p className="text-xs text-emerald-700 font-semibold mt-1 animate-pulse">
                    {pairingStageText}
                  </p>
                </div>
              </div>
            ) : connectMethod === 'qr' ? (
              /* Method 1: QR Code View */
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  {/* Visual QR Code Box with Laser Scan Effect */}
                  <div className="p-4 rounded-2xl bg-[#EFEAE2] border border-[#D1D7DB] flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
                    <div className="relative p-2 bg-white rounded-xl shadow-xs border border-slate-200">
                      {/* Laser scanner line animation */}
                      <div className="absolute inset-x-2 h-0.5 bg-[#25D366] shadow-[0_0_8px_#25D366] animate-pulse" style={{ top: '45%' }} />
                      
                      {/* SVG QR representation */}
                      <svg className="w-36 h-36" viewBox="0 0 100 100" fill="none">
                        <rect width="100" height="100" fill="white" />
                        {/* Corner Targets */}
                        <rect x="10" y="10" width="24" height="24" rx="4" fill="#075E54" />
                        <rect x="14" y="14" width="16" height="16" rx="2" fill="white" />
                        <rect x="17" y="17" width="10" height="10" fill="#075E54" />

                        <rect x="66" y="10" width="24" height="24" rx="4" fill="#075E54" />
                        <rect x="70" y="14" width="16" height="16" rx="2" fill="white" />
                        <rect x="73" y="17" width="10" height="10" fill="#075E54" />

                        <rect x="10" y="66" width="24" height="24" rx="4" fill="#075E54" />
                        <rect x="14" y="70" width="16" height="16" rx="2" fill="white" />
                        <rect x="17" y="73" width="10" height="10" fill="#075E54" />

                        {/* Data matrix dots */}
                        <rect x="42" y="12" width="6" height="6" fill="#1E122C" />
                        <rect x="52" y="18" width="6" height="6" fill="#1E122C" />
                        <rect x="42" y="28" width="6" height="6" fill="#1E122C" />
                        <rect x="52" y="38" width="6" height="6" fill="#1E122C" />
                        <rect x="22" y="46" width="6" height="6" fill="#1E122C" />
                        <rect x="34" y="46" width="6" height="6" fill="#1E122C" />
                        <rect x="46" y="46" width="8" height="8" rx="2" fill="#25D366" />
                        <rect x="62" y="46" width="6" height="6" fill="#1E122C" />
                        <rect x="74" y="46" width="6" height="6" fill="#1E122C" />
                        <rect x="42" y="58" width="6" height="6" fill="#1E122C" />
                        <rect x="52" y="68" width="6" height="6" fill="#1E122C" />
                        <rect x="66" y="66" width="6" height="6" fill="#1E122C" />
                        <rect x="78" y="72" width="6" height="6" fill="#1E122C" />
                        <rect x="66" y="82" width="6" height="6" fill="#1E122C" />
                        <rect x="80" y="82" width="6" height="6" fill="#1E122C" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold text-[#075E54] mt-2 flex items-center gap-1">
                      <Smartphone className="w-3 h-3" /> Point phone camera here
                    </span>
                  </div>

                  {/* 3 Steps Instructions */}
                  <div className="space-y-2.5 text-xs text-[#1E122C]">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-[10px] font-black shrink-0">1</span>
                      <div>
                        <strong>Open WhatsApp</strong> on your phone.
                        <span className="text-[10px] text-slate-500 block">Android: 3 dots | iPhone: Settings</span>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-[10px] font-black shrink-0">2</span>
                      <div>
                        Tap <strong>Linked Devices</strong> &rarr; <strong>Link a Device</strong>.
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-[10px] font-black shrink-0">3</span>
                      <div>
                        Scan this QR code to authenticate GrowWise AI.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Target Phone: <strong>{connectedNumber}</strong>
                  </span>
                  <button
                    onClick={handlePairQrCode}
                    className="px-5 py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Scan &amp; Pair Device Now</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Method 2: Meta Cloud API View */
              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#1E122C] mb-1">
                    WhatsApp Business Phone Number
                  </label>
                  <input
                    type="text"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="+1 (555) 349-2890"
                    className="w-full px-3.5 py-2 text-xs font-medium rounded-xl border border-slate-300 focus:outline-none focus:border-[#16A34A] bg-[#FAF5F0]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1E122C] mb-1">
                      Meta Phone Number ID
                    </label>
                    <input
                      type="text"
                      value={wabaIdInput}
                      onChange={(e) => setWabaIdInput(e.target.value)}
                      placeholder="104829104829104"
                      className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-300 focus:outline-none focus:border-[#16A34A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E122C] mb-1">
                      System User Token (Permanent)
                    </label>
                    <input
                      type="password"
                      value={apiTokenInput}
                      onChange={(e) => setApiTokenInput(e.target.value)}
                      placeholder="EAABwz..."
                      className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-300 focus:outline-none focus:border-[#16A34A]"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#DCFCE7]/60 border border-[#BBF7D0] text-[11px] text-[#15803D]">
                  ✓ Official Meta Graph API v20.0 ready. Automatically provisions webhook endpoints for real-time delivery and read receipts.
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setShowConnectModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConnectCloudApi}
                    className="px-5 py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Verify &amp; Connect Meta API</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default WhatsappCampaign;
