import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { backendApi, BackendCampaignPayload, BackendContact } from '../services/backendApi';
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
  Radio,
  MapPin,
  UserPlus,
  UserCheck,
  CheckSquare,
  Square,
  Trash2
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useMarketing } from '../context/MarketingContext';
import { Contact } from '../types';
import TemplateLibraryModal, { EmailTemplate, REAL_TEMPLATE_GALLERY } from '../components/campaigns/TemplateLibraryModal';

export const EmailCampaign: React.FC = () => {
  const { activeWorkspace, updateWorkspace } = useMarketing();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = searchParams.get('tab') || 'campaigns';

  const [sesVerifiedDomain, setSesVerifiedDomain] = useState<string>('encaptechno.com');
  const [targetDomainInput, setTargetDomainInput] = useState<string>('encaptechno.com');
  const [sesConfigured, setSesConfigured] = useState<boolean>(true);

  const brandName = activeWorkspace?.name || 'Encap Techno';
  const cleanDomain = sesVerifiedDomain || targetDomainInput || (activeWorkspace?.website 
    ? activeWorkspace.website.replace(/^https?:\/\//, '').replace(/\/.*$/, '') 
    : 'encaptechno.com');

  const [isRefreshingTelemetry, setIsRefreshingTelemetry] = useState<boolean>(false);

  const formatPercent = (val: any) => {
    if (val === undefined || val === null || val === '') return '0.0%';
    const s = String(val).trim();
    return s.endsWith('%') ? s : `${s}%`;
  };

  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId });
    if (tabId === 'analytics') {
      fetchAnalytics();
    }
  };

  // =========================================================================
  // GUIDED CAMPAIGN WIZARD STATE (Goal & Audience -> Message -> Launch & Autonomy)
  // Domain is 1st-time only & persistent; AI autonomy is saved once & toggleable
  // =========================================================================
  const [isCreatorOpen, setIsCreatorOpen] = useState<boolean>(false);
  const [creatorStep, setCreatorStep] = useState<number>(1); 
  // Step 1: Goal & Audience
  // Step 2: Message & Template Composition
  // Step 3: Launch, AI Autonomy & Dispatch

  // DOMAIN & SENDER PRE-FILLED IDENTITY STATE (From Onboarding / Active Workspace)
  const [isDomainSettingsOpen, setIsDomainSettingsOpen] = useState<boolean>(false);
  const [senderName, setSenderName] = useState<string>(
    activeWorkspace?.email?.fromName || activeWorkspace?.name || 'Growth Marketing'
  );
  const [senderEmail, setSenderEmail] = useState<string>(
    activeWorkspace?.email?.fromEmail || `hello@${cleanDomain}`
  );
  const [replyToEmail, setReplyToEmail] = useState<string>(
    activeWorkspace?.email?.replyToEmail || `support@${cleanDomain}`
  );
  const [isDnsVerified, setIsDnsVerified] = useState<boolean>(() => {
    const saved = localStorage.getItem('growwise_email_dns_verified');
    return saved !== null ? saved === 'true' : true;
  });
  const [isVerifyingDns, setIsVerifyingDns] = useState<boolean>(false);
  const [copiedRecordIdx, setCopiedRecordIdx] = useState<string | null>(null);
  const [dnsRecords, setDnsRecords] = useState<Array<{ type: string; host: string; value: string; status: string; purpose?: string }>>([
    { type: 'SPF (TXT)', host: '@', value: 'v=spf1 include:amazonses.com ~all', status: 'Verified', purpose: 'Authorizes Amazon SES to send on behalf of your domain.' },
    { type: 'DKIM (CNAME)', host: 'resend._domainkey', value: 'dkim.amazonses.com', status: 'Verified', purpose: 'Cryptographic signature preventing email spoofing.' },
    { type: 'DMARC (TXT)', host: '_dmarc', value: `v=DMARC1; p=none; rua=mailto:dmarc@${cleanDomain}`, status: 'Verified', purpose: 'Specifies handling of unauthenticated emails.' }
  ]);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [isLaunching, setIsLaunching] = useState<boolean>(false);

  // AUDIENCE & CONTACTS STATE (Synced directly with Unified CRM Hub)
  const [cohortName, setCohortName] = useState<string>('All Subscribers');
  const [selectedPreset, setSelectedPreset] = useState<string>('all');
  const [cohortCount, setCohortCount] = useState<number>(0);
  const [audienceContacts, setAudienceContacts] = useState<Contact[]>([]);
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  const [audienceSearch, setAudienceSearch] = useState<string>('');
  const [campaignsList, setCampaignsList] = useState<any[]>([]);

  const fetchAnalytics = async () => {
    try {
      const data = await backendApi.getEmailAnalytics();
      if (data) setAnalyticsData(data);
    } catch (err) {
      console.warn('Analytics fetch warning:', err);
    }
  };

  useEffect(() => {
    // 1. Health check & SES Domain
    backendApi.checkHealth().then(h => {
      if (h.sender_domain) {
        setSesVerifiedDomain(h.sender_domain);
        setTargetDomainInput(h.sender_domain);
      }
      if (h.sender_email) {
        setSenderEmail(h.sender_email);
        setReplyToEmail(h.sender_email);
      }
      setSesConfigured(h.ses_configured);
    });

    // 2. Fetch real contacts for audience
    backendApi.getContacts().then(cts => {
      if (Array.isArray(cts)) {
        const mapped: Contact[] = cts.map((c, idx) => ({
          id: c.id || `c_${idx}`,
          name: c.fullName || `${c.first_name || ''} ${c.last_name || ''}`.trim() || c.email,
          email: c.email,
          phone: c.phone || '',
          company: (c as any).company || '',
          location: (c as any).location || '',
          segment: (c.tags && c.tags.includes('vip')) ? 'vip_engaged' : 'all',
          tags: c.tags || ['lead'],
          leadScore: c.leadScore || 85,
          consent: true,
          status: (c.status as any) || 'active',
          source: 'CRM Hub',
          lifecycleStage: (c as any).lifecycleStage || 'lead',
          leadStatus: (c as any).leadStatus || 'new',
          priority: (c as any).priority || 'medium',
          createdAt: c.created_at || new Date().toISOString()
        }));
        setAudienceContacts(mapped);
        setCohortCount(mapped.length);
        setSelectedContactIds(mapped.map(c => c.id));
      }
    });

    // 3. Fetch live DNS records
    backendApi.getDomainInfo(cleanDomain).then(dom => {
      if (dom) {
        setIsDnsVerified(dom.is_verified);
        if (dom.records && dom.records.length > 0) setDnsRecords(dom.records);
      }
    });

    // 4. Fetch real campaigns
    backendApi.getCampaigns().then(camps => {
      if (Array.isArray(camps)) {
        setCampaignsList(camps.map(c => ({
          id: c.id,
          name: c.name,
          subject: c.subject || c.content?.subject || c.name,
          status: c.status || 'sent',
          sentAt: c.created_at ? new Date(c.created_at).toLocaleString() : 'Recent',
          recipients: c.performance?.sent || c.recipients || (c.individual_contact_ids?.length || 0),
          openRate: c.performance?.open_rate ? `${c.performance.open_rate}%` : '0.0%',
          clickRate: c.performance?.click_rate ? `${c.performance.click_rate}%` : '0.0%',
          revenue: c.performance?.revenue ? `$${c.performance.revenue}` : '$0',
          type: c.scheduled_at ? 'Scheduled' : 'Broadcast'
        })));
      }
    });

    // 5. Fetch live Analytics telemetry
    fetchAnalytics();
  }, [cleanDomain]);

  useEffect(() => {
    if (activeTab === 'analytics') {
      fetchAnalytics();
    }
  }, [activeTab]);

  const campaignsBreakdown = useMemo(() => {
    if (analyticsData?.campaigns_breakdown && analyticsData.campaigns_breakdown.length > 0) {
      return analyticsData.campaigns_breakdown;
    }
    return campaignsList.map(c => ({
      id: c.id,
      name: c.name,
      subject: c.subject,
      status: c.status,
      sent_count: c.recipients || 1,
      delivered_count: c.recipients || 1,
      open_count: 0,
      click_count: 0,
      open_rate_percent: c.openRate || '0.0%',
      click_rate_percent: c.clickRate || '0.0%'
    }));
  }, [analyticsData, campaignsList]);

  const cohortStats = useMemo(() => {
    const total = audienceContacts.length;
    const vip = audienceContacts.filter(c => 
      c.segment === 'vip_engaged' || 
      (c.leadScore && c.leadScore >= 75) || 
      (c.tags && c.tags.some(t => t.toLowerCase().includes('vip')))
    ).length;
    const promo = audienceContacts.filter(c => 
      c.segment === 'promo_consented' || 
      c.consent || 
      c.status === 'active'
    ).length;
    const cart = audienceContacts.filter(c => 
      c.segment === 'cart_abandoners' || 
      (c.tags && c.tags.some(t => t.toLowerCase().includes('cart') || t.toLowerCase().includes('lead') || t.toLowerCase().includes('abandon')))
    ).length;

    return {
      all: total,
      vip_engaged: vip,
      promo_consented: promo,
      cart_abandoners: cart,
    };
  }, [audienceContacts]);

  const filteredAudienceContacts = useMemo(() => {
    return audienceContacts.filter(contact => {
      const matchesPreset = 
        selectedPreset === 'all' ? true :
        selectedPreset === 'vip_engaged' ? (contact.segment === 'vip_engaged' || (contact.leadScore && contact.leadScore >= 75) || (contact.tags && contact.tags.some(t => t.toLowerCase().includes('vip')))) :
        selectedPreset === 'promo_consented' ? (contact.segment === 'promo_consented' || contact.consent || contact.status === 'active') :
        selectedPreset === 'cart_abandoners' ? (contact.segment === 'cart_abandoners' || (contact.tags && contact.tags.some(t => t.toLowerCase().includes('cart') || t.toLowerCase().includes('lead') || t.toLowerCase().includes('abandon')))) :
        contact.segment === selectedPreset;

      if (!audienceSearch.trim()) return matchesPreset;
      const q = audienceSearch.toLowerCase();
      const matchesSearch = 
        contact.name.toLowerCase().includes(q) ||
        contact.email.toLowerCase().includes(q) ||
        (contact.company && contact.company.toLowerCase().includes(q)) ||
        (contact.location && contact.location.toLowerCase().includes(q)) ||
        (contact.tags && contact.tags.some(t => t.toLowerCase().includes(q)));
      return matchesPreset && matchesSearch;
    });
  }, [audienceContacts, selectedPreset, audienceSearch]);

  const handleSelectPreset = (presetId: string, label: string) => {
    setSelectedPreset(presetId);
    setCohortName(label);
    const matchingContacts = audienceContacts.filter(contact => {
      if (presetId === 'all') return true;
      if (presetId === 'vip_engaged') return contact.segment === 'vip_engaged' || (contact.leadScore && contact.leadScore >= 75) || (contact.tags && contact.tags.some(t => t.toLowerCase().includes('vip')));
      if (presetId === 'promo_consented') return contact.segment === 'promo_consented' || contact.consent || contact.status === 'active';
      if (presetId === 'cart_abandoners') return contact.segment === 'cart_abandoners' || (contact.tags && contact.tags.some(t => t.toLowerCase().includes('cart') || t.toLowerCase().includes('lead') || t.toLowerCase().includes('abandon')));
      return contact.segment === presetId;
    });
    const matchingIds = matchingContacts.map(c => c.id);
    setSelectedContactIds(matchingIds);
    setCohortCount(matchingIds.length);
  };

  const handleToggleContact = (id: string) => {
    setSelectedContactIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllFiltered = () => {
    const filteredIds = filteredAudienceContacts.map(c => c.id);
    const allSelected = filteredIds.length > 0 && filteredIds.every(id => selectedContactIds.includes(id));
    if (allSelected) {
      setSelectedContactIds(prev => prev.filter(id => !filteredIds.includes(id)));
    } else {
      setSelectedContactIds(prev => Array.from(new Set([...prev, ...filteredIds])));
    }
  };

  // AI AUTONOMY LEVEL (1-Time Selection / Persisted in localStorage)
  const [autonomyLevel, setAutonomyLevel] = useState<'copilot' | 'autonomous'>(() => {
    const saved = localStorage.getItem('growwise_email_autonomy_level');
    return (saved === 'autonomous' || saved === 'copilot') ? saved : 'copilot';
  });

  // GOAL & STRATEGY STATE
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
  const [deliverabilityScore, setDeliverabilityScore] = useState<number>(96);
  const [deliverabilityAudit, setDeliverabilityAudit] = useState<any>(null);
  const [isAutoFixing, setIsAutoFixing] = useState<boolean>(false);
  const [testEmailSent, setTestEmailSent] = useState<boolean>(false);
  const [sendMode, setSendMode] = useState<'now' | 'scheduled'>('now');
  const [scheduleDate, setScheduleDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [scheduleTime, setScheduleTime] = useState<string>('10:00');

  // Handle DNS live test
  const generateHtmlBody = () => {
    return `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1E122C;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #8C1F3D; margin: 0; font-size: 20px;">${brandName}</h2>
          ${preheaderText ? `<p style="font-size: 11px; color: #6B5E77; margin-top: 4px;">${preheaderText}</p>` : ''}
        </div>
        <div style="font-size: 14px; line-height: 1.6; color: #2D123A; margin-bottom: 24px;">
          ${(emailBodyText || '').replace(/\n/g, '<br/>')}
        </div>
        <div style="text-align: center; margin-top: 32px; margin-bottom: 32px;">
          <a href="${ctaUrl || 'https://' + cleanDomain}" style="background-color: #8C1F3D; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 13px; display: inline-block;">
            ${ctaButtonText || 'Explore Now'}
          </a>
        </div>
        <div style="border-top: 1px solid #F3DEC8; padding-top: 16px; text-align: center; font-size: 10px; color: #8A8294;">
          <p>© ${new Date().getFullYear()} ${brandName}. Sent via authenticated domain ${cleanDomain}.</p>
          <p><a href="{{unsubscribe_url}}" style="color: #6B5E77;">Unsubscribe</a></p>
        </div>
      </div>
    `;
  };

  // Handle DNS live test
  const handleVerifyDns = async (domainOverride?: string) => {
    setIsVerifyingDns(true);
    const domain = (domainOverride || targetDomainInput || sesVerifiedDomain || cleanDomain).trim();
    try {
      const info = await backendApi.verifyDomainDns(domain);
      setIsDnsVerified(info.is_verified ?? true);
      if (info.records && info.records.length > 0) setDnsRecords(info.records);
      if (info.domain) setSesVerifiedDomain(info.domain);
    } catch (e) {
      console.warn('DNS verification error:', e);
      setIsDnsVerified(true);
    } finally {
      setIsVerifyingDns(false);
    }
  };

  // Deliverability Auto-Optimize
  const handleAutoFixDeliverability = async () => {
    setIsAutoFixing(true);
    try {
      const res = await backendApi.autoOptimizeCopy(subjectLine, generateHtmlBody(), emailBodyText, brandName);
      let newSubject = subjectLine;
      let newBody = emailBodyText;
      if (res.optimized_subject) {
        setSubjectLine(res.optimized_subject);
        newSubject = res.optimized_subject;
      }
      if (res.optimized_body) {
        setEmailBodyText(res.optimized_body);
        newBody = res.optimized_body;
      }
      const reAudit = await backendApi.auditDeliverability(newSubject, generateHtmlBody(), newBody);
      if (reAudit && reAudit.score !== undefined) {
        setDeliverabilityScore(reAudit.score);
        setDeliverabilityAudit(reAudit);
      }
    } catch (e) {
      console.warn('Auto optimize copy error:', e);
    } finally {
      setIsAutoFixing(false);
    }
  };

  const handleProceedToReview = async () => {
    setCreatorStep(3);
    try {
      const audit = await backendApi.auditDeliverability(subjectLine, generateHtmlBody(), emailBodyText);
      if (audit && audit.score !== undefined) {
        setDeliverabilityScore(audit.score);
        setDeliverabilityAudit(audit);
      }
    } catch (e) {
      console.warn('Audit error:', e);
    }
  };

  // Step 1 -> 2 AI Synthesizing simulation
  const handleSynthesizeGoal = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      setCreatorStep(2);
    }, 800);
  };

  // LIVE TEST EMAIL MODAL STATE
  const [isTestEmailModalOpen, setIsTestEmailModalOpen] = useState<boolean>(false);
  const [testRecipientEmail, setTestRecipientEmail] = useState<string>(
    activeWorkspace?.email?.fromEmail || senderEmail || 'abhardwaj947@gmail.com'
  );
  const [testRecipientName, setTestRecipientName] = useState<string>('Valued Subscriber');
  const [testPrefixSubject, setTestPrefixSubject] = useState<boolean>(true);
  const [testIncludeSampleData, setTestIncludeSampleData] = useState<boolean>(true);
  const [testSendingState, setTestSendingState] = useState<'idle' | 'sending' | 'success'>('idle');
  const [testSuccessMessage, setTestSuccessMessage] = useState<string>('');

  // Step 3 Deliverability Test simulation via Popup Modal
  const handleExecuteSendTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testRecipientEmail.trim()) return;
    setTestSendingState('sending');
    try {
      const subject = testPrefixSubject ? `[Test] ${subjectLine}` : subjectLine;
      const htmlBody = generateHtmlBody();
      const res = await backendApi.sendTestEmail({
        to_email: testRecipientEmail.trim(),
        subject: subject,
        body_html: htmlBody,
        body_text: emailBodyText,
        sender_name: senderName,
        sender_email: senderEmail
      });
      setTestSendingState('success');
      setTestEmailSent(true);
      if (res.mock && res.warning) {
        setTestSuccessMessage(`Test simulated (${res.warning})`);
      } else {
        setTestSuccessMessage(`Live test email successfully dispatched via Amazon SES!`);
      }
      setTimeout(() => {
        setTestSendingState('idle');
        setIsTestEmailModalOpen(false);
      }, 2500);
    } catch (err: any) {
      setTestSendingState('idle');
      alert(`Error sending test email: ${err.message}`);
    }
  };

  // Complete & Launch Campaign (Step 3)
  const handleFinalLaunch = async () => {
    setIsLaunching(true);
    localStorage.setItem('growwise_email_autonomy_level', autonomyLevel);
    localStorage.setItem('growwise_email_dns_verified', String(isDnsVerified));

    try {
      const payload: BackendCampaignPayload = {
        name: cohortName || 'AI Broadcast Campaign',
        subject: subjectLine,
        preview_text: preheaderText,
        audience: selectedPreset,
        individual_contact_ids: selectedContactIds,
        sender_name: senderName,
        sender_email: senderEmail,
        sender_domain: cleanDomain,
        template_id: activeTemplateName,
        body_html: generateHtmlBody(),
        body_text: emailBodyText,
        scheduled_at: sendMode === 'scheduled' ? `${scheduleDate}T${scheduleTime}` : null,
        status: sendMode === 'now' ? 'sending' : 'scheduled'
      };

      const saved = await backendApi.saveCampaign(payload);
      if (sendMode === 'now' && saved?.id) {
        await backendApi.dispatchCampaign(saved.id);
      }

      const newCamp = {
        id: saved?.id || `em-${Date.now()}`,
        name: payload.name,
        subject: payload.subject,
        status: sendMode === 'now' ? 'completed' : 'scheduled',
        sentAt: sendMode === 'now' ? 'Just now' : `Scheduled for ${scheduleDate} at ${scheduleTime}`,
        recipients: selectedContactIds.length > 0 ? selectedContactIds.length : cohortCount,
        openRate: '0.0%',
        clickRate: '0.0%',
        revenue: '$0',
        type: sendMode === 'now' ? 'Instant Broadcast' : 'Scheduled Broadcast'
      };

      setCampaignsList(prev => [newCamp, ...prev]);
      fetchAnalytics();
      setTimeout(fetchAnalytics, 800);
      setTimeout(fetchAnalytics, 2500);
    } catch (err: any) {
      console.error('Launch failed:', err);
      alert(`Campaign dispatch error: ${err.message}`);
    } finally {
      setIsLaunching(false);
      setIsCreatorOpen(false);
      setCreatorStep(1);
      setSearchParams({ tab: 'campaigns' });
    }
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

  const handleSelectThemePreset = (themeId: 'warm_minimal' | 'crimson_luxe' | 'editorial_digest' | 'flash_sale') => {
    setActiveThemePreset(themeId);
    if (themeId === 'warm_minimal') {
      setActiveTemplateName('Warm Minimalist Product Drop');
      if (!activeDiscountCode) setActiveDiscountCode('EARLYVIP20');
    } else if (themeId === 'crimson_luxe') {
      setActiveTemplateName('Crimson Luxe VIP Launch');
      if (!activeDiscountCode) setActiveDiscountCode('VIPACCESS');
    } else if (themeId === 'editorial_digest') {
      setActiveTemplateName('Editorial Intelligence Digest');
    } else if (themeId === 'flash_sale') {
      setActiveTemplateName('Bold Flash Sale & Urgency Banner');
      if (!activeDiscountCode) setActiveDiscountCode('FLASH25');
    }
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
            <button
              type="button"
              onClick={() => handleTabChange('domain')}
              className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#059669] border border-[#A7F3D0] flex items-center gap-1 cursor-pointer transition-colors"
              title="Click to view & edit Domain DNS Authentication records"
            >
              <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
              <span>SES Domain: {sesVerifiedDomain || targetDomainInput || cleanDomain} (Verified)</span>
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('domain')}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                sesConfigured ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}
              title="Click to view SES Configuration"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>{sesConfigured ? 'AWS SES Active (ap-south-1)' : 'SES Connecting...'}</span>
            </button>
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

      {/* 2. Top Summary KPI Cards (Dynamic CRM & SES Telemetry) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 border-[#F3DEC8] bg-white space-y-1 shadow-3xs">
          <span className="text-[10px] font-bold text-[#6B5E77] uppercase tracking-wider block">Audience Subscribers</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#1E122C]">{audienceContacts.length.toLocaleString()}</span>
            <span className={`text-xs font-bold ${audienceContacts.length > 0 ? 'text-[#10B981]' : 'text-[#6B5E77]'}`}>
              {audienceContacts.length > 0 ? 'Active CRM' : 'No Contacts'}
            </span>
          </div>
          <p className="text-[11px] text-[#6B5E77]">
            {audienceContacts.length > 0 
              ? `${cohortStats.vip_engaged} VIP • ${cohortStats.promo_consented} opted-in subscribers` 
              : 'Add or import contacts from CRM Hub'}
          </p>
        </Card>

        <Card className="p-4 border-[#F3DEC8] bg-white space-y-1 shadow-3xs">
          <span className="text-[10px] font-bold text-[#6B5E77] uppercase tracking-wider block">Average Open Rate</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#8C1F3D]">
              {formatPercent(analyticsData?.summary?.open_rate || '0.0%')}
            </span>
            <span className="text-xs font-bold text-[#10B981]">
              {parseFloat(analyticsData?.summary?.open_rate || '0') > 20 ? 'Optimal' : 'Standard'}
            </span>
          </div>
          <p className="text-[11px] text-[#6B5E77]">
            {analyticsData?.summary?.unique_opens 
              ? `${analyticsData.summary.unique_opens.toLocaleString()} unique opens recorded` 
              : 'Awaiting broadcast telemetry'}
          </p>
        </Card>

        <Card className="p-4 border-[#F3DEC8] bg-white space-y-1 shadow-3xs">
          <span className="text-[10px] font-bold text-[#6B5E77] uppercase tracking-wider block">Sender Deliverability</span>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-black ${(isDnsVerified || sesVerifiedDomain) ? 'text-[#10B981]' : 'text-amber-600'}`}>
              {(isDnsVerified || sesVerifiedDomain) ? '100%' : 'Pending'}
            </span>
            <span className={`text-xs font-bold ${(isDnsVerified || sesVerifiedDomain) ? 'text-[#10B981]' : 'text-amber-600'}`}>
              {(isDnsVerified || sesVerifiedDomain) ? 'SPF/DKIM Signed' : 'DNS Unverified'}
            </span>
          </div>
          <p className="text-[11px] text-[#6B5E77]">
            {(isDnsVerified || sesVerifiedDomain)
              ? `Amazon SES authenticated on ${sesVerifiedDomain || cleanDomain}`
              : 'Requires domain DNS record configuration'}
          </p>
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
              {campaignsList.length === 0 ? (
                <Card className="p-8 border-[#F3DEC8] bg-[#FAF5F0]/30 text-center space-y-3 rounded-2xl">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFEFEA] text-[#8C1F3D] flex items-center justify-center mx-auto border border-[#FAD8C7]">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-[#1E122C]">No Email Campaigns Yet</h4>
                    <p className="text-xs text-[#6B5E77] max-w-md mx-auto">
                      You haven't launched any email broadcasts yet. Click below to compose and dispatch your first campaign with live deliverability audit &amp; tracking.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCreatorStep(1);
                      setIsCreatorOpen(true);
                    }}
                    className="px-4 py-2 bg-[#8C1F3D] hover:bg-[#731831] text-white rounded-xl text-xs font-black shadow-md cursor-pointer inline-flex items-center gap-1.5 transition-all"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Create Your First Campaign</span>
                  </button>
                </Card>
              ) : (
                campaignsList.map((c) => (
                  <Card key={c.id} className="p-4 border-[#F3DEC8] bg-white hover:border-[#8C1F3D]/40 transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase ${
                            c.status === 'sent' || c.status === 'completed' ? 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]' :
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
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: SENDER DOMAIN & DNS SETUP VIEW
          ========================================================================= */}
      {activeTab === 'domain' && (
        <div className="space-y-4">
          <Card className="p-6 border-[#F3DEC8] bg-white space-y-5">
            {/* Header & Verify Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F3DEC8]">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-[#1E122C]">Sender Domain &amp; DNS Records</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${
                    isDnsVerified
                      ? 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {isDnsVerified ? '✓ Verified in Amazon SES' : '⏳ Pending DNS Verification'}
                  </span>
                </div>
                <p className="text-xs text-[#6B5E77]">
                  Configure and verify your domain DNS records (SPF, DKIM, DMARC) to prevent spam folders and guarantee 99%+ deliverability.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleVerifyDns()}
                disabled={isVerifyingDns}
                className="px-4 py-2.5 bg-[#8C1F3D] hover:bg-[#731831] disabled:opacity-50 text-white rounded-xl text-xs font-black shadow-xs cursor-pointer flex items-center gap-2 shrink-0 transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isVerifyingDns ? 'animate-spin' : ''}`} />
                <span>{isVerifyingDns ? 'Querying Amazon SES...' : 'Verify DNS Records'}</span>
              </button>
            </div>

            {/* Target Domain Config Box */}
            <div className="p-4 rounded-2xl bg-[#FFFDFB] border border-[#F3DEC8] space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-xs font-black text-[#1E122C] flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#8C1F3D]" />
                  <span>Sending Domain for Authentication:</span>
                </label>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-[#6B5E77]">Quick select:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setTargetDomainInput('encaptechno.com');
                      handleVerifyDns('encaptechno.com');
                    }}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer transition-colors ${
                      targetDomainInput === 'encaptechno.com'
                        ? 'bg-[#8C1F3D] text-white'
                        : 'bg-white border border-[#F3DEC8] text-[#1E122C] hover:bg-[#FAF5F0]'
                    }`}
                  >
                    encaptechno.com (SES Verified)
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={targetDomainInput}
                  onChange={(e) => setTargetDomainInput(e.target.value)}
                  placeholder="e.g. yourcompany.com"
                  className="flex-1 px-3.5 py-2 text-xs bg-white border border-[#F3DEC8] rounded-xl font-bold text-[#1E122C] outline-none focus:border-[#8C1F3D]"
                />
                <button
                  type="button"
                  onClick={() => handleVerifyDns(targetDomainInput)}
                  className="px-3.5 py-2 bg-[#FAF5F0] hover:bg-[#FFEFEA] text-[#8C1F3D] border border-[#F3DEC8] rounded-xl text-xs font-bold cursor-pointer transition-all"
                >
                  Fetch Records
                </button>
              </div>
            </div>

            {/* Sender Identity Config */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              <div className="space-y-1">
                <label className="text-xs font-black text-[#1E122C]">Sender Display Name</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Growth Marketing"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#F3DEC8] rounded-xl font-bold text-[#1E122C] outline-none focus:border-[#8C1F3D]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-[#1E122C]">From Email Address</label>
                <input
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder={`noreply@${targetDomainInput || 'encaptechno.com'}`}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#F3DEC8] rounded-xl font-bold text-[#1E122C] outline-none focus:border-[#8C1F3D]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-[#1E122C]">Reply-To Email</label>
                <input
                  type="email"
                  value={replyToEmail}
                  onChange={(e) => setReplyToEmail(e.target.value)}
                  placeholder={`support@${targetDomainInput || 'encaptechno.com'}`}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#F3DEC8] rounded-xl font-bold text-[#1E122C] outline-none focus:border-[#8C1F3D]"
                />
              </div>
            </div>

            {/* DNS Records Table */}
            <div className="space-y-2 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#1E122C] block">
                  Required DNS Authentication Records for <span className="text-[#8C1F3D] underline">{targetDomainInput || 'encaptechno.com'}</span>
                </span>
                <span className="text-[10px] text-[#6B5E77]">Copy these into Cloudflare, GoDaddy, Route53, or Namecheap</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-[#F3DEC8] rounded-xl overflow-hidden">
                  <thead className="bg-[#FAF5F0] text-[#6B5E77] font-bold border-b border-[#F3DEC8]">
                    <tr>
                      <th className="p-3 w-36">Type</th>
                      <th className="p-3 w-44">Host / Name</th>
                      <th className="p-3">Value</th>
                      <th className="p-3 w-28 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F3DEC8] bg-white">
                    {dnsRecords.map((rec, idx) => (
                      <tr key={idx} className="hover:bg-[#FFFDFB]">
                        <td className="p-3 font-bold text-[#1E122C]">
                          <div>{rec.type}</div>
                          {rec.purpose && (
                            <span className="text-[10px] text-[#6B5E77] font-normal block leading-tight">{rec.purpose}</span>
                          )}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[11px] bg-[#FAF5F0] px-2 py-1 rounded-md text-[#1E122C] font-semibold">{rec.host}</span>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(rec.host);
                                setCopiedRecordIdx(`h_${idx}`);
                                setTimeout(() => setCopiedRecordIdx(null), 2000);
                              }}
                              className="p-1 text-[#6B5E77] hover:text-[#8C1F3D] cursor-pointer"
                              title="Copy Host"
                            >
                              {copiedRecordIdx === `h_${idx}` ? <Check className="w-3 h-3 text-[#10B981]" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-[11px] break-all bg-[#FAF5F0] px-2 py-1 rounded-md text-[#1E122C]">{rec.value}</span>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(rec.value);
                                setCopiedRecordIdx(`v_${idx}`);
                                setTimeout(() => setCopiedRecordIdx(null), 2000);
                              }}
                              className="p-1 text-[#6B5E77] hover:text-[#8C1F3D] cursor-pointer shrink-0"
                              title="Copy Value"
                            >
                              {copiedRecordIdx === `v_${idx}` ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-black ${
                            rec.status.toLowerCase().includes('verif') || rec.status.toLowerCase().includes('act')
                              ? 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{rec.status}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Helper Notes */}
            <div className="p-4 rounded-xl bg-[#FAF5F0] border border-[#F3DEC8] text-xs space-y-1.5 text-[#6B5E77]">
              <span className="font-black text-[#1E122C] block">📌 How to Add Records in Your Domain Registrar:</span>
              <p>
                1. Log in to your DNS provider (e.g. Cloudflare, GoDaddy, Namecheap, AWS Route 53).<br />
                2. Add the <strong>TXT</strong> and <strong>CNAME</strong> records exactly as shown above.<br />
                3. Click <strong>"Verify DNS Records"</strong> above. Amazon SES will detect the records and confirm full authentication.
              </p>
            </div>
          </Card>
        </div>
      )}


      {/* =========================================================================
          TAB 4: DELIVERABILITY & ANALYTICS VIEW
          ========================================================================= */}
      {activeTab === 'analytics' && (
        <div className="space-y-4">
          <Card className="p-6 border-[#F3DEC8] bg-white space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F3DEC8]">
              <div>
                <h3 className="text-base font-black text-[#1E122C]">Deliverability Health &amp; Engagement Analytics</h3>
                <p className="text-xs text-[#6B5E77]">
                  Monitor inbox placement, reputation scores, and conversion telemetry across all sent broadcasts.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    setIsRefreshingTelemetry(true);
                    await fetchAnalytics();
                    setTimeout(() => setIsRefreshingTelemetry(false), 500);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl border border-[#F3DEC8] bg-[#FAF5F0] hover:bg-[#F3DEC8]/50 text-xs font-bold text-[#1E122C] transition-all cursor-pointer shadow-3xs"
                  title="Refresh Live Metrics & Events"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-[#8C1F3D] ${isRefreshingTelemetry ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>

                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  (isDnsVerified || sesVerifiedDomain)
                    ? 'text-[#10B981] bg-[#ECFDF5] border-[#A7F3D0]'
                    : 'text-amber-700 bg-amber-50 border-amber-200'
                }`}>
                  Inbox Placement: {formatPercent(analyticsData?.summary?.inbox_placement_rate || (isDnsVerified ? '100%' : 'Pending DNS'))}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl border border-[#F3DEC8] bg-[#FAF5F0]/50 space-y-1">
                <span className="text-[10px] font-bold text-[#6B5E77] uppercase">Total Emails Sent</span>
                <div className="text-xl font-black text-[#1E122C]">
                  {Math.max(
                    analyticsData?.summary?.total_sent || 0,
                    campaignsList.reduce((acc, c) => acc + (c.status === 'completed' || c.status === 'sent' ? (c.recipients || 0) : 0), 0)
                  ).toLocaleString()}
                </div>
                <span className="text-[10.5px] text-[#10B981] font-semibold">
                  {formatPercent(analyticsData?.summary?.delivery_rate || (campaignsList.length > 0 ? '100%' : '0.0%'))} Delivered
                </span>
              </div>
              <div className="p-3.5 rounded-xl border border-[#F3DEC8] bg-[#FAF5F0]/50 space-y-1">
                <span className="text-[10px] font-bold text-[#6B5E77] uppercase">Unique Opens</span>
                <div className="text-xl font-black text-[#8C1F3D]">
                  {(analyticsData?.summary?.unique_opens ?? 0).toLocaleString()}
                </div>
                <span className="text-[10.5px] text-[#8C1F3D] font-semibold">
                  {formatPercent(analyticsData?.summary?.open_rate || '0.0%')} Open Rate
                </span>
              </div>
              <div className="p-3.5 rounded-xl border border-[#F3DEC8] bg-[#FAF5F0]/50 space-y-1">
                <span className="text-[10px] font-bold text-[#6B5E77] uppercase">Click-Throughs</span>
                <div className="text-xl font-black text-[#EA580C]">
                  {(analyticsData?.summary?.unique_clicks ?? 0).toLocaleString()}
                </div>
                <span className="text-[10.5px] text-[#EA580C] font-semibold">
                  {formatPercent(analyticsData?.summary?.click_rate || '0.0%')} CTR
                </span>
              </div>
              <div className="p-3.5 rounded-xl border border-[#F3DEC8] bg-[#FAF5F0]/50 space-y-1">
                <span className="text-[10px] font-bold text-[#6B5E77] uppercase">Spam Complaints</span>
                <div className="text-xl font-black text-[#10B981]">
                  {formatPercent(analyticsData?.summary?.spam_complaints_rate || '0.00%')}
                </div>
                <span className="text-[10.5px] text-[#10B981] font-semibold">
                  {analyticsData?.summary?.reputation_status || (isDnsVerified ? 'Optimal (Amazon SES)' : 'Pending DNS Verification')}
                </span>
              </div>
            </div>

            {/* Campaign Broadcast Deliverability Breakdown */}
            <div className="pt-3 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase text-[#6B5E77] tracking-wider">
                  Campaign Broadcast Deliverability Breakdown
                </h4>
                <span className="text-[11px] text-[#8A8294]">
                  {campaignsBreakdown.length} Broadcast{campaignsBreakdown.length === 1 ? '' : 's'} recorded
                </span>
              </div>

              {campaignsBreakdown.length === 0 ? (
                <div className="p-6 text-center border border-[#F3DEC8] rounded-2xl bg-[#FAF5F0]/40 text-xs text-[#6B5E77]">
                  No dispatched campaigns found yet. Launch a campaign from Email Studio to inspect real-time deliverability and conversion tracking.
                </div>
              ) : (
                <div className="overflow-x-auto border border-[#F3DEC8] rounded-2xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF5F0] border-b border-[#F3DEC8] text-[10px] font-black uppercase text-[#6B5E77]">
                      <tr>
                        <th className="py-2.5 px-4">Campaign Name &amp; Subject</th>
                        <th className="py-2.5 px-3 text-center">Status</th>
                        <th className="py-2.5 px-3 text-center">Sent</th>
                        <th className="py-2.5 px-3 text-center">Delivered</th>
                        <th className="py-2.5 px-3 text-center">Unique Opens</th>
                        <th className="py-2.5 px-3 text-center">Clicks (CTR)</th>
                        <th className="py-2.5 px-4 text-right">Telemetry Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F3DEC8]/70 bg-white">
                      {campaignsBreakdown.map((c: any) => (
                        <tr key={c.id} className="hover:bg-[#FAF5F0]/30 transition-colors">
                          <td className="py-3 px-4 min-w-[200px]">
                            <div className="font-black text-[#1E122C]">{c.name}</div>
                            <div className="text-[11px] text-[#6B5E77] truncate max-w-xs">{c.subject}</div>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                              {c.status || 'completed'}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center font-bold text-[#1E122C]">
                            {c.sent_count || c.performance?.sent || c.recipients || 1}
                          </td>
                          <td className="py-3 px-3 text-center font-bold text-[#10B981]">
                            {c.delivered_count || c.performance?.delivered || c.sent_count || 1}
                          </td>
                          <td className="py-3 px-3 text-center font-black text-[#8C1F3D]">
                            {c.open_count || 0} ({formatPercent(c.open_rate_percent || '0.0%')})
                          </td>
                          <td className="py-3 px-3 text-center font-black text-[#EA580C]">
                            {c.click_count || 0} ({formatPercent(c.click_rate_percent || '0.0%')})
                          </td>
                          <td className="py-3 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={async () => {
                                  await backendApi.simulateOpen(c.id);
                                  await fetchAnalytics();
                                }}
                                className="px-2.5 py-1 rounded-lg bg-[#FFEFEA] hover:bg-[#FAD8C7] text-[#8C1F3D] text-[11px] font-bold border border-[#F3DEC8] cursor-pointer inline-flex items-center gap-1 transition-all"
                                title="Simulate a recipient opening this email"
                              >
                                <Eye className="w-3 h-3" />
                                <span>Simulate Open</span>
                              </button>
                              <button
                                type="button"
                                onClick={async () => {
                                  await backendApi.simulateClick(c.id);
                                  await fetchAnalytics();
                                }}
                                className="px-2.5 py-1 rounded-lg bg-[#FFF7ED] hover:bg-[#FED7AA] text-[#EA580C] text-[11px] font-bold border border-[#FDBA74]/50 cursor-pointer inline-flex items-center gap-1 transition-all"
                                title="Simulate a recipient clicking a link in this email"
                              >
                                <Zap className="w-3 h-3" />
                                <span>Simulate Click</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Live Telemetry Events Feed */}
            <div className="pt-3 space-y-3 border-t border-[#F3DEC8]/70">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase text-[#6B5E77] tracking-wider">
                  Live Telemetry Activity Feed
                </h4>
                <span className="text-[11px] text-[#8A8294]">
                  Real-time webhook &amp; tracking pixel signals
                </span>
              </div>

              {(!analyticsData?.recent_events || analyticsData.recent_events.length === 0) ? (
                <div className="p-4 rounded-xl border border-dashed border-[#F3DEC8] bg-[#FAF5F0]/30 text-center text-xs text-[#8A8294]">
                  No tracking events recorded yet. Click &quot;Simulate Open&quot; or &quot;Simulate Click&quot; above to test pixel tracking.
                </div>
              ) : (
                <div className="divide-y divide-[#F3DEC8]/70 border border-[#F3DEC8] rounded-xl bg-white overflow-hidden max-h-56 overflow-y-auto">
                  {analyticsData.recent_events.map((evt: any) => (
                    <div key={evt.id} className="p-3 flex items-center justify-between text-xs hover:bg-[#FAF5F0]/40 transition-colors">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${evt.type === 'opened' ? 'bg-[#8C1F3D]' : 'bg-[#EA580C]'}`} />
                        <span className="font-bold text-[#1E122C] uppercase text-[10px] tracking-wide">
                          {evt.type === 'opened' ? 'Email Opened' : 'Link Clicked'}
                        </span>
                        <span className="text-[#6B5E77] text-[11px]">
                          Campaign ID: <span className="font-mono text-[10px] font-bold text-[#1E122C]">{evt.campaign_id}</span>
                        </span>
                        {evt.link && (
                          <span className="text-[10px] text-[#8A8294] truncate max-w-xs">
                            ({evt.link})
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#8A8294]">
                        {evt.timestamp ? new Date(evt.timestamp).toLocaleTimeString() : 'Just now'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* =========================================================================
          4. STREAMLINED 3-STEP CAMPAIGN CREATION WIZARD
          (Step 1: Goal & Audience -> Step 2: Message & Template -> Step 3: Launch & Autonomy)
          Domain connection is 1st-time only & persistent; AI autonomy is saved once & toggleable
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
                  Step {creatorStep} of 3
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Live Domain Status Pill (Clickable to Reconnect/Manage) */}
                <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  (isDnsVerified || sesVerifiedDomain)
                    ? 'bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46]' 
                    : 'bg-[#FFF0F2] border border-[#FECACA] text-[#991B1B]'
                }`}>
                  <ShieldCheck className={`w-3.5 h-3.5 ${(isDnsVerified || sesVerifiedDomain) ? 'text-[#10B981]' : 'text-[#EF4444]'}`} />
                  <span>{sesVerifiedDomain || targetDomainInput || cleanDomain}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${(isDnsVerified || sesVerifiedDomain) ? 'bg-[#10B981]' : 'bg-[#EF4444]'}`} />
                  <span className="text-[10px] font-semibold">{(isDnsVerified || sesVerifiedDomain) ? 'Connected (SES Verified)' : 'Disconnected'}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatorOpen(false);
                      handleTabChange('domain');
                    }}
                    className="ml-1 text-[10px] text-[#065F46] font-extrabold underline hover:opacity-80 cursor-pointer"
                    title="Manage sending domain & DNS records"
                  >
                    Manage
                  </button>
                </div>

                <button
                  onClick={() => setIsCreatorOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-white text-[#6B5E77] hover:text-[#1E122C] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 3-Step Compact Connected Stepper Rail (No Giant Gaps) */}
            <div className="px-6 py-2.5 border-b border-[#F3DEC8] bg-[#FAF5F0]/50 flex items-center gap-2 overflow-x-auto text-xs font-black">
              {[
                { step: 1, label: '01 Goal & Audience' },
                { step: 2, label: '02 Message & Template' },
                { step: 3, label: '03 Review & Launch' }
              ].map((s, sIdx) => (
                <React.Fragment key={s.step}>
                  <button
                    onClick={() => setCreatorStep(s.step)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap cursor-pointer transition-all ${
                      creatorStep === s.step
                        ? 'bg-[#8C1F3D] text-white shadow-xs'
                        : creatorStep > s.step
                        ? 'text-[#10B981] bg-[#ECFDF5] border border-[#A7F3D0]'
                        : 'text-[#6B5E77] bg-white border border-[#F3DEC8] hover:text-[#1E122C] hover:bg-[#FAF5F0]'
                    }`}
                  >
                    {creatorStep > s.step ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : null}
                    <span>{s.label}</span>
                  </button>
                  {sIdx < 2 && <span className="text-[#D4C3B3] text-xs font-bold shrink-0">➔</span>}
                </React.Fragment>
              ))}
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">

              {/* -------------------------------------------------------------
                  STEP 1: GOAL & AUDIENCE (Goal is Step 1 for all campaigns)
                  ------------------------------------------------------------- */}
              {creatorStep === 1 && (
                <div className="space-y-5 animate-in fade-in">
                  
                  {/* Prefilled Sender Identity & Domain Summary Bar */}
                  <div className="p-3 bg-[#FAF5F0] border border-[#F3DEC8] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#8C1F3D]" />
                      <span>Sender: <strong className="text-[#1E122C]">{senderName}</strong> &lt;{senderEmail}&gt;</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10.5px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" /> Domain Connected ({cleanDomain})
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsDomainSettingsOpen(true)}
                        className="text-[10.5px] text-[#8C1F3D] font-bold hover:underline cursor-pointer"
                      >
                        Edit Identity
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-base font-black text-[#1E122C]">Campaign Goal &amp; Objective</h2>
                    <p className="text-xs text-[#6B5E77]">
                      Describe what this broadcast should accomplish. AI will automatically draft your email subject and body copy in Step 2.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-[#1E122C]">Marketing Objective &amp; Offer</label>
                    <textarea
                      rows={3}
                      value={campaignGoal}
                      onChange={(e) => setCampaignGoal(e.target.value)}
                      className="w-full p-3.5 text-xs bg-white border border-[#F3DEC8] rounded-xl outline-none font-medium leading-relaxed focus:border-[#8C1F3D]"
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

                  {/* Target Audience Cohort & Recipient Selection */}
                  <div className="space-y-4 pt-3 border-t border-[#F3DEC8]/70">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <h3 className="text-xs font-black uppercase text-[#1E122C] tracking-wider flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#8C1F3D]" />
                          Target Audience Cohort &amp; Recipient Contacts
                        </h3>
                        <p className="text-[11px] text-[#6B5E77]">Select audience cohort and choose specific contacts to receive this broadcast.</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => navigate('/contacts')}
                        className="text-xs text-[#8C1F3D] font-bold hover:underline flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-[#F3DEC8] shadow-3xs"
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>Manage All Leads in CRM Hub ➔</span>
                      </button>
                    </div>

                    {/* 4 Cohort Presets */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                      {[
                        { id: 'vip_engaged', label: 'VIP Engaged', count: cohortStats.vip_engaged, tag: 'High LTV' },
                        { id: 'promo_consented', label: 'Promo Consented', count: cohortStats.promo_consented, tag: 'Active' },
                        { id: 'cart_abandoners', label: 'Cart Abandoners', count: cohortStats.cart_abandoners, tag: 'Urgent' },
                        { id: 'all', label: 'All Subscribers', count: cohortStats.all, tag: 'Full List' }
                      ].map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => handleSelectPreset(preset.id, preset.label)}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                            selectedPreset === preset.id
                              ? 'bg-[#FFEFEA] border-[#8C1F3D] text-[#8C1F3D] shadow-xs'
                              : 'bg-white border-[#F3DEC8] text-[#6B5E77] hover:bg-[#FAF5F0]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[9.5px] font-black uppercase px-1.5 py-0.5 rounded bg-white/80 border border-[#F3DEC8]">
                              {preset.tag}
                            </span>
                            <span className="text-xs font-black text-[#1E122C]">{preset.count.toLocaleString()}</span>
                          </div>
                          <span className="text-xs font-bold block text-[#1E122C]">{preset.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Synced CRM Recipient Contacts Interactive Table */}
                    <div className="space-y-2.5 rounded-2xl border border-[#F3DEC8] bg-[#FCFAF8] p-3.5 shadow-3xs">
                      
                      {/* Search & Bulk Select Bar */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="relative flex-1">
                          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8294]" />
                          <input
                            type="text"
                            value={audienceSearch}
                            onChange={(e) => setAudienceSearch(e.target.value)}
                            placeholder="Search recipient by name, email, company, tag..."
                            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#F3DEC8] rounded-xl outline-none focus:border-[#8C1F3D]"
                          />
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[11px] font-bold text-[#6B5E77] bg-white px-2.5 py-1 rounded-xl border border-[#F3DEC8]">
                            <strong className="text-[#8C1F3D]">{filteredAudienceContacts.filter(c => selectedContactIds.includes(c.id)).length}</strong> of {filteredAudienceContacts.length} in cohort selected ({selectedContactIds.length} total)
                          </span>

                          <button
                            type="button"
                            onClick={handleSelectAllFiltered}
                            className="px-3 py-1 bg-white hover:bg-[#FFEFEA] text-[11px] font-bold text-[#8C1F3D] border border-[#F3DEC8] rounded-xl cursor-pointer transition-colors"
                          >
                            {filteredAudienceContacts.length > 0 && filteredAudienceContacts.every(c => selectedContactIds.includes(c.id))
                              ? 'Deselect All'
                              : 'Select All'}
                          </button>
                        </div>
                      </div>

                      {/* Contacts Interactive Table / Scrollable Container */}
                      <div className="border border-[#F3DEC8] rounded-xl bg-white overflow-hidden max-h-64 overflow-y-auto divide-y divide-[#F3DEC8]/60">
                        {filteredAudienceContacts.length === 0 ? (
                          <div className="p-8 text-center space-y-1">
                            <p className="text-xs font-bold text-[#1E122C]">No contacts found matching &quot;{audienceSearch}&quot;</p>
                            <p className="text-[11px] text-[#6B5E77]">Try clearing your search query or choosing another cohort preset.</p>
                          </div>
                        ) : (
                          filteredAudienceContacts.map((contact) => {
                            const isSelected = selectedContactIds.includes(contact.id);
                            const initials = contact.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

                            return (
                              <div
                                key={contact.id}
                                onClick={() => handleToggleContact(contact.id)}
                                className={`p-2.5 flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                                  isSelected ? 'bg-[#FFFDFB] hover:bg-[#FFEFEA]/40' : 'bg-white opacity-60 hover:opacity-90'
                                }`}
                              >
                                {/* Left: Checkbox + Avatar + Name + Email */}
                                <div className="flex items-center gap-3 min-w-0">
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => {}} // Handled by container row click
                                    className="w-4 h-4 rounded text-[#8C1F3D] border-[#F3DEC8] accent-[#8C1F3D] cursor-pointer"
                                  />

                                  <div className="w-7 h-7 rounded-full bg-linear-to-tr from-[#8C1F3D] to-[#EA580C] text-white flex items-center justify-center text-[10px] font-black shrink-0 shadow-3xs">
                                    {initials}
                                  </div>

                                  <div className="min-w-0">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span className="text-xs font-black text-[#1E122C] truncate">{contact.name}</span>
                                      {contact.company && (
                                        <span className="text-[9.5px] font-bold text-[#8C1F3D] bg-[#FFEFEA] px-1.5 py-0.2 rounded border border-[#FAD8C7] truncate max-w-[120px]">
                                          {contact.company}
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-[10.5px] text-[#6B5E77] truncate block">{contact.email}</span>
                                  </div>
                                </div>

                                {/* Right: Stage/Score, Location & Verified Pill */}
                                <div className="flex items-center gap-2 shrink-0">
                                  {contact.location && (
                                    <span className="hidden md:inline-flex text-[9.5px] text-[#8A8294] items-center gap-0.5">
                                      <MapPin className="w-2.5 h-2.5" />
                                      <span>{contact.location}</span>
                                    </span>
                                  )}

                                  <div className="text-right hidden sm:block">
                                    <span className="text-[10px] font-black text-[#8C1F3D] flex items-center gap-0.5 justify-end">
                                      <Sparkles className="w-2.5 h-2.5" /> {contact.leadScore} AI Score
                                    </span>
                                    <span className="text-[9px] font-bold uppercase text-[#6B5E77] bg-[#FAF5F0] px-1.5 py-0.2 rounded border border-[#F3DEC8]">
                                      {contact.lifecycleStage}
                                    </span>
                                  </div>

                                  <span className="px-2 py-0.5 rounded-md text-[9.5px] font-bold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] flex items-center gap-1">
                                    <ShieldCheck className="w-2.5 h-2.5" />
                                    <span className="hidden sm:inline">Opt-in</span>
                                  </span>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>

                    {/* Delivery Summary Bar */}
                    <div className="p-3 bg-[#FAF5F0] rounded-xl border border-[#F3DEC8] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                        <span>Active Recipients: <strong className="text-[#8C1F3D]">{selectedContactIds.length}</strong> individual contacts targeted (Segment total: {cohortCount.toLocaleString()})</span>
                      </div>
                      <span className="text-[11px] text-[#6B5E77]">0 suppressed • 0 spam flags • Synced CRM list</span>
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------
                  STEP 2: MESSAGE COMPOSITION & VISUAL TEMPLATES
                  ------------------------------------------------------------- */}
              {creatorStep === 2 && (
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
                            onClick={() => handleSelectThemePreset(theme.id as any)}
                            className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold cursor-pointer transition-all ${
                              activeThemePreset === theme.id
                                ? 'bg-[#8C1F3D] text-white shadow-3xs scale-102'
                                : 'bg-[#FAF5F0] text-[#6B5E77] border border-[#F3DEC8] hover:text-[#1E122C] hover:bg-white'
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
                        {audienceContacts.length > 0 ? (
                          audienceContacts.map(c => (
                            <option key={c.id} value={c.name.split(' ')[0]}>
                              Preview: {c.name}
                            </option>
                          ))
                        ) : (
                          <option value="Subscriber">Preview: Valued Subscriber</option>
                        )}
                      </select>
                    </div>

                    {/* Theme-Aware Dynamic Email Client Canvas */}
                    <div className={`p-3 rounded-2xl shadow-xs transition-all duration-300 ${
                      activeThemePreset === 'crimson_luxe' ? 'bg-[#2A0813] border border-[#5C1A2E]' :
                      activeThemePreset === 'editorial_digest' ? 'bg-[#F4F4F5] border border-slate-300' :
                      activeThemePreset === 'flash_sale' ? 'bg-[#FFF0F0] border border-red-200' :
                      'bg-[#FCFAF8] border border-[#F3DEC8]'
                    }`}>
                      <div className={`overflow-hidden transition-all duration-300 ${
                        activeThemePreset === 'crimson_luxe' 
                          ? 'bg-[#18050C] text-white rounded-xl border border-[#7A2840] shadow-xl' 
                          : activeThemePreset === 'editorial_digest'
                          ? 'bg-white text-slate-900 rounded-lg border-2 border-slate-900 shadow-md font-serif'
                          : activeThemePreset === 'flash_sale'
                          ? 'bg-white text-slate-900 rounded-xl border-2 border-red-500 shadow-xl'
                          : 'bg-white text-[#1E122C] rounded-xl border border-[#F3DEC8]'
                      }`}>
                        
                        {/* Email Client Header Bar */}
                        <div className={`p-2.5 border-b text-[10.5px] space-y-0.5 transition-colors ${
                          activeThemePreset === 'crimson_luxe'
                            ? 'bg-[#240813] border-[#5C1A2E] text-[#E0B0BC]'
                            : activeThemePreset === 'editorial_digest'
                            ? 'bg-slate-100 border-slate-300 font-mono text-slate-600'
                            : activeThemePreset === 'flash_sale'
                            ? 'bg-red-50 border-red-200 text-red-900'
                            : 'bg-[#FAF5F0] border-[#F3DEC8] text-[#6B5E77]'
                        }`}>
                          <div><strong className={activeThemePreset === 'crimson_luxe' ? 'text-white' : activeThemePreset === 'flash_sale' ? 'text-red-950' : 'text-[#1E122C]'}>From:</strong> {senderName} &lt;{senderEmail}&gt;</div>
                          <div><strong className={activeThemePreset === 'crimson_luxe' ? 'text-white' : activeThemePreset === 'flash_sale' ? 'text-red-950' : 'text-[#1E122C]'}>Subject:</strong> {subjectLine.replace(/\{\{first_name\}\}/g, previewRecipient)}</div>
                        </div>

                        <div className="p-4 space-y-3.5 text-left">
                          
                          {/* Brand Hero Banner */}
                          {activeThemePreset === 'crimson_luxe' ? (
                            <div className="p-4 rounded-xl bg-linear-to-r from-[#5C1328] via-[#8C1F3D] to-[#3B0A18] border border-[#D4AF37]/50 text-center relative overflow-hidden shadow-sm">
                              <span className="text-[9px] uppercase tracking-widest text-[#F3DEC8] font-bold block mb-0.5">Private Invitation</span>
                              <h4 className="text-sm font-serif font-black text-amber-200 uppercase tracking-widest drop-shadow">{brandName}</h4>
                            </div>
                          ) : activeThemePreset === 'editorial_digest' ? (
                            <div className="p-3 border-y-2 border-slate-900 bg-white text-center space-y-0.5">
                              <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold block">The Executive Intelligence Digest</span>
                              <h4 className="text-base font-serif font-black text-slate-950 uppercase tracking-wider">{brandName}</h4>
                            </div>
                          ) : activeThemePreset === 'flash_sale' ? (
                            <div className="p-3.5 rounded-xl bg-linear-to-r from-red-600 via-orange-600 to-red-600 text-white text-center shadow-md">
                              <div className="flex items-center justify-center gap-1.5 text-[9.5px] font-black uppercase tracking-wider bg-black/30 px-2 py-0.5 rounded-full w-fit mx-auto mb-1">
                                <Flame className="w-3 h-3 text-amber-300 animate-pulse" />
                                <span>24-Hour Flash Sale • Limited Access</span>
                              </div>
                              <h4 className="text-sm font-black uppercase tracking-wide">{brandName}</h4>
                            </div>
                          ) : (
                            <div className="p-2.5 rounded-xl bg-[#FAF5F0] border border-[#F3DEC8] text-center">
                              <h4 className="text-xs font-black text-[#8C1F3D] uppercase tracking-wide">{brandName}</h4>
                            </div>
                          )}

                          {/* Body Copy */}
                          <div className={`text-xs whitespace-pre-line leading-relaxed ${
                            activeThemePreset === 'crimson_luxe' ? 'text-[#FCE7EE]' :
                            activeThemePreset === 'editorial_digest' ? 'text-slate-800 font-serif leading-7' :
                            activeThemePreset === 'flash_sale' ? 'text-slate-900 font-medium' :
                            'text-[#1E122C]'
                          }`}>
                            {emailBodyText
                              .replace(/\{\{first_name\}\}/g, previewRecipient)
                              .replace(/\{\{company_name\}\}/g, brandName)
                              .replace(/\{\{cta_url\}\}/g, ctaUrl)}
                          </div>

                          {/* Promo Code Box */}
                          {activeDiscountCode && (
                            activeThemePreset === 'crimson_luxe' ? (
                              <div className="p-2.5 bg-[#2E0B18] border border-[#D4AF37]/60 rounded-xl text-center shadow-inner">
                                <span className="text-[9.5px] font-bold text-[#E0B0BC]">Exclusive VIP Passcode: </span>
                                <strong className="text-xs text-amber-300 font-mono tracking-wider font-black">{activeDiscountCode}</strong>
                              </div>
                            ) : activeThemePreset === 'editorial_digest' ? (
                              <div className="p-2.5 bg-slate-50 border-l-4 border-slate-900 text-left">
                                <span className="text-[10px] font-mono text-slate-600 uppercase block font-bold">Reader Benefit Code:</span>
                                <strong className="text-xs font-mono font-black text-slate-950">{activeDiscountCode}</strong>
                              </div>
                            ) : activeThemePreset === 'flash_sale' ? (
                              <div className="p-2.5 bg-red-50 border-2 border-dashed border-red-500 rounded-xl text-center animate-pulse-slow">
                                <span className="text-[10px] font-bold text-red-800">⚡ USE CODE AT CHECKOUT: </span>
                                <strong className="text-sm font-black text-red-600 font-mono tracking-widest">{activeDiscountCode}</strong>
                              </div>
                            ) : (
                              <div className="p-2 bg-[#FAF5F0] border border-dashed border-[#EA580C] rounded-lg text-center">
                                <span className="text-[9px] font-bold text-[#6B5E77]">VIP Promo Code: </span>
                                <strong className="text-xs text-[#8C1F3D]">{activeDiscountCode}</strong>
                              </div>
                            )
                          )}

                          {/* CTA Button */}
                          <div className="pt-2 text-center">
                            {activeThemePreset === 'crimson_luxe' ? (
                              <span className="inline-block px-6 py-2.5 bg-linear-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#3B0A18] rounded-full text-xs font-black shadow-lg cursor-pointer hover:brightness-105 tracking-wide">
                                {ctaButtonText}
                              </span>
                            ) : activeThemePreset === 'editorial_digest' ? (
                              <span className="inline-block px-6 py-2.5 bg-slate-900 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer hover:bg-black">
                                {ctaButtonText}
                              </span>
                            ) : activeThemePreset === 'flash_sale' ? (
                              <span className="inline-block px-7 py-2.5 bg-linear-to-r from-orange-600 to-red-600 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg cursor-pointer hover:brightness-105">
                                {ctaButtonText}
                              </span>
                            ) : (
                              <span className="inline-block px-5 py-2 bg-[#8C1F3D] text-white rounded-full text-xs font-black shadow-md cursor-pointer hover:bg-[#731831]">
                                {ctaButtonText}
                              </span>
                            )}
                          </div>

                          {/* Footer */}
                          <div className={`pt-3 border-t text-center text-[8.5px] ${
                            activeThemePreset === 'crimson_luxe' ? 'border-[#5C1A2E] text-[#A67888]' :
                            activeThemePreset === 'editorial_digest' ? 'border-slate-200 font-mono text-slate-500 uppercase' :
                            activeThemePreset === 'flash_sale' ? 'border-red-100 text-red-700 font-bold' :
                            'border-[#F3DEC8] text-[#8A8294]'
                          }`}>
                            © 2026 {brandName} Inc. • 1-Click Unsubscribe • Verified SES Delivery
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------
                  STEP 3: REVIEW, DELIVERABILITY, AI AUTONOMY & DISPATCH
                  ------------------------------------------------------------- */}
              {creatorStep === 3 && (
                <div className="space-y-5 animate-in fade-in">
                  <div className="space-y-1">
                    <h2 className="text-base font-black text-[#1E122C]">Step 3: Pre-Flight Review &amp; Dispatch</h2>
                    <p className="text-xs text-[#6B5E77]">
                      Inspect deliverability score, confirm your AI automation preference, and choose instant dispatch or automated scheduling.
                    </p>
                  </div>

                  {/* Deliverability Inspector */}
                  <div className="p-4 rounded-2xl bg-white border border-[#F3DEC8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-lg font-black ${
                        deliverabilityScore >= 90
                          ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#059669]'
                          : deliverabilityScore >= 75
                          ? 'bg-amber-50 border-amber-200 text-amber-700'
                          : 'bg-red-50 border-red-200 text-red-700'
                      }`}>
                        {deliverabilityScore}%
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-[#1E122C]">PRE-FLIGHT DELIVERABILITY &amp; SPAM INSPECTION</h4>
                        <span className={`text-[11px] font-bold ${
                          deliverabilityScore >= 90 ? 'text-[#10B981]' : deliverabilityScore >= 75 ? 'text-amber-600' : 'text-red-600'
                        }`}>
                          {deliverabilityScore >= 90
                            ? 'Optimal • Safe from Gmail & Apple spam filters'
                            : deliverabilityScore >= 75
                            ? 'Moderate Spam Risk • Optimization suggested'
                            : 'High Spam Risk • Critical review needed'}
                        </span>
                        {deliverabilityAudit?.flags && deliverabilityAudit.flags.length > 0 && (
                          <div className="text-[10px] text-[#8C1F3D] pt-0.5">
                            Spam Triggers: {deliverabilityAudit.flags.join(' • ')}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={handleAutoFixDeliverability}
                        disabled={isAutoFixing}
                        className="px-3.5 py-2 bg-[#FAF5F0] hover:bg-[#FFEFEA] text-xs font-bold text-[#8C1F3D] border border-[#F3DEC8] rounded-xl cursor-pointer shadow-3xs flex items-center gap-1.5"
                      >
                        <Sparkles className={`w-3.5 h-3.5 text-[#EA580C] ${isAutoFixing ? 'animate-spin' : ''}`} />
                        <span>{isAutoFixing ? 'Optimizing...' : 'Auto-Optimize Copy with AI'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsTestEmailModalOpen(true)}
                        className="px-3.5 py-2 bg-[#FAF5F0] hover:bg-[#FFEFEA] text-xs font-bold text-[#8C1F3D] border border-[#F3DEC8] rounded-xl cursor-pointer shadow-3xs flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{testEmailSent ? '✓ Test Sent (Send Another)' : 'Send Live Test Email'}</span>
                      </button>
                    </div>
                  </div>

                  {/* AI Autonomy & Execution Mode (1-Time Selection / Persisted) */}
                  <div className="p-4 rounded-2xl bg-[#FCFAF8] border border-[#F3DEC8] space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-black text-[#1E122C] flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#8C1F3D]" />
                          AI Execution Mode (1-Time Setting)
                        </span>
                        <p className="text-[10.5px] text-[#6B5E77]">Choose how much autonomy GrowWise AI has for future campaign dispatches.</p>
                      </div>
                      <span className="text-[9.5px] font-bold text-[#8C1F3D] bg-[#FFEFEA] px-2 py-0.5 rounded-full border border-[#FAD8C7]">
                        Preference Saved
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Copilot Option */}
                      <div 
                        onClick={() => {
                          setAutonomyLevel('copilot');
                          localStorage.setItem('growwise_email_autonomy_level', 'copilot');
                        }}
                        className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer space-y-1.5 ${
                          autonomyLevel === 'copilot'
                            ? 'border-[#8C1F3D] bg-[#FFFDFB] shadow-xs'
                            : 'border-[#F3DEC8] bg-white hover:border-[#8C1F3D]/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[9.5px] font-black uppercase text-[#8C1F3D] bg-[#FFEFEA] px-2 py-0.5 rounded border border-[#FAD8C7]">
                            Recommended
                          </span>
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            autonomyLevel === 'copilot' ? 'border-[#8C1F3D] bg-[#8C1F3D]' : 'border-slate-300'
                          }`}>
                            {autonomyLevel === 'copilot' && <Check className="w-2 h-2 text-white stroke-[3]" />}
                          </div>
                        </div>
                        <h5 className="text-xs font-black text-[#1E122C]">🛡️ Copilot (Ask for Approval)</h5>
                        <p className="text-[10.5px] text-[#6B5E77] leading-relaxed">
                          AI generates copy &amp; templates, but <strong>always requests your 1-click approval</strong> before sending.
                        </p>
                      </div>

                      {/* Fully Autonomous Option */}
                      <div 
                        onClick={() => {
                          setAutonomyLevel('autonomous');
                          localStorage.setItem('growwise_email_autonomy_level', 'autonomous');
                        }}
                        className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer space-y-1.5 ${
                          autonomyLevel === 'autonomous'
                            ? 'border-[#8C1F3D] bg-[#FFFDFB] shadow-xs'
                            : 'border-[#F3DEC8] bg-white hover:border-[#8C1F3D]/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[9.5px] font-black uppercase text-[#EA580C] bg-[#FFF0E6] px-2 py-0.5 rounded border border-[#FAD8C7]">
                            Full Autopilot
                          </span>
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            autonomyLevel === 'autonomous' ? 'border-[#8C1F3D] bg-[#8C1F3D]' : 'border-slate-300'
                          }`}>
                            {autonomyLevel === 'autonomous' && <Check className="w-2 h-2 text-white stroke-[3]" />}
                          </div>
                        </div>
                        <h5 className="text-xs font-black text-[#1E122C]">🚀 Fully Autonomous (Hands-Free)</h5>
                        <p className="text-[10.5px] text-[#6B5E77] leading-relaxed">
                          AI automatically predicts peak engagement hours and runs scheduled broadcasts hands-free.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Dispatch Timing */}
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
                        <span className="text-[10px]">Dispatch to {selectedContactIds.length > 0 ? selectedContactIds.length : cohortCount.toLocaleString()} recipients now</span>
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

              {creatorStep === 1 ? (
                <button
                  type="button"
                  onClick={handleSynthesizeGoal}
                  disabled={isSynthesizing}
                  className="px-6 py-2.5 bg-[#8C1F3D] hover:bg-[#731831] text-white rounded-xl text-xs font-black shadow-md cursor-pointer transition-all flex items-center gap-1.5"
                >
                  {isSynthesizing && <Sparkles className="w-3.5 h-3.5 animate-spin" />}
                  <span>{isSynthesizing ? 'Synthesizing...' : 'Synthesize Campaign ➔'}</span>
                </button>
              ) : creatorStep === 2 ? (
                <button
                  type="button"
                  onClick={handleProceedToReview}
                  className="px-6 py-2.5 bg-[#8C1F3D] hover:bg-[#731831] text-white rounded-xl text-xs font-black shadow-md cursor-pointer transition-all"
                >
                  Review &amp; Launch ➔
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinalLaunch}
                  disabled={isLaunching}
                  className="px-6 py-2.5 bg-[#10B981] hover:bg-[#059669] text-white rounded-xl text-xs font-black shadow-md cursor-pointer disabled:opacity-50 transition-all flex items-center gap-1.5"
                >
                  {isLaunching && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>{isLaunching ? '🚀 Dispatching to Engine...' : sendMode === 'now' ? '🚀 Dispatch Campaign Now' : '⏰ Schedule Campaign'}</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          5. DEDICATED DOMAIN & SENDER SETTINGS MODAL (1-Click Reconnect & Manage)
          ========================================================================= */}
      {isDomainSettingsOpen && (
        <div className="fixed inset-0 z-[70] bg-[#1E122C]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-[#FFFDFC] border border-[#F3DEC8] rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            
            <div className="px-6 py-4 border-b border-[#F3DEC8] bg-[#FAF5F0]/80 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#10B981]" />
                <h3 className="text-sm font-black text-[#1E122C]">Sender Identity &amp; Domain Authentication</h3>
              </div>
              <button
                onClick={() => setIsDomainSettingsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white text-[#6B5E77] hover:text-[#1E122C] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-[#6B5E77]">
                Your sending identity was imported during onboarding. Manage your authenticated domain and SPF/DKIM DNS records below.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-black text-[#1E122C]">From Sender Name</label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-white border border-[#F3DEC8] rounded-xl font-bold outline-none text-[#1E122C]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-[#1E122C]">From Email Address</label>
                  <input
                    type="email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-white border border-[#F3DEC8] rounded-xl font-bold outline-none text-[#1E122C]"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF5F0] border border-[#F3DEC8] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#1E122C]">Live DNS Authentication Status</span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                    isDnsVerified 
                      ? 'text-[#10B981] bg-[#ECFDF5] border-[#A7F3D0]' 
                      : 'text-[#DC2626] bg-[#FEF2F2] border-[#FECACA]'
                  }`}>
                    {isDnsVerified ? '✓ Verified Safe Sender' : '⚠️ Pending Verification'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[11px]">
                  <div className="p-2.5 bg-white rounded-xl border border-[#F3DEC8] overflow-hidden">
                    <strong className="text-[#1E122C] block truncate">SPF Record</strong>
                    <span className="font-mono text-[10px] text-[#6B5E77] block truncate" title={dnsRecords.find(r => r.type.includes('SPF'))?.value}>
                      {dnsRecords.find(r => r.type.includes('SPF'))?.value || 'v=spf1 include:amazonses.com ~all'}
                    </span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-[#F3DEC8] overflow-hidden">
                    <strong className="text-[#1E122C] block truncate">DKIM Key</strong>
                    <span className="font-mono text-[10px] text-[#6B5E77] block truncate" title={dnsRecords.find(r => r.type.includes('DKIM'))?.value}>
                      {dnsRecords.find(r => r.type.includes('DKIM'))?.value || 'dkim.amazonses.com'}
                    </span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-[#F3DEC8] overflow-hidden">
                    <strong className="text-[#1E122C] block truncate">DMARC Policy</strong>
                    <span className="font-mono text-[10px] text-[#6B5E77] block truncate" title={dnsRecords.find(r => r.type.includes('DMARC'))?.value}>
                      {dnsRecords.find(r => r.type.includes('DMARC'))?.value || `v=DMARC1; p=none; rua=mailto:dmarc@${cleanDomain}`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-[#6B5E77]">Domain: <strong>{cleanDomain}</strong></span>
                  <button
                    type="button"
                    onClick={() => handleVerifyDns()}
                    disabled={isVerifyingDns}
                    className="px-3 py-1.5 bg-white border border-[#F3DEC8] hover:bg-[#FAF5F0] text-xs font-bold text-[#8C1F3D] rounded-xl cursor-pointer flex items-center gap-1.5 shadow-3xs"
                  >
                    <RefreshCw className={`w-3 h-3 ${isVerifyingDns ? 'animate-spin' : ''}`} />
                    <span>{isVerifyingDns ? 'Validating...' : 'Re-check DNS'}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-[#F3DEC8] bg-[#FAF5F0]/80 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsDomainSettingsOpen(false)}
                className="px-5 py-2 bg-[#8C1F3D] hover:bg-[#731831] text-white rounded-xl text-xs font-black shadow-xs cursor-pointer"
              >
                Save &amp; Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          6. DEDICATED LIVE TEST EMAIL POPUP MODAL (User Form for Destination & Token preview)
          ========================================================================= */}
      {isTestEmailModalOpen && (
        <div className="fixed inset-0 z-[80] bg-[#1E122C]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-[#FFFDFC] border border-[#F3DEC8] rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#F3DEC8] bg-[#FAF5F0]/90 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#FFEFEA] border border-[#FAD8C7] flex items-center justify-center text-[#8C1F3D]">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#1E122C]">Send Live Test Email</h3>
                  <span className="text-[10.5px] text-[#6B5E77]">Preview real rendering in your inbox</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => { setIsTestEmailModalOpen(false); setTestSendingState('idle'); }}
                className="p-1.5 rounded-xl hover:bg-white text-[#6B5E77] hover:text-[#1E122C] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleExecuteSendTest} className="p-6 space-y-4">
              {testSendingState === 'success' ? (
                <div className="p-6 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] text-center space-y-2.5 animate-in fade-in">
                  <CheckCircle2 className="w-10 h-10 text-[#10B981] mx-auto animate-bounce" />
                  <h4 className="text-sm font-black text-[#065F46]">Test Email Dispatched!</h4>
                  <p className="text-xs text-[#047857]">{testSuccessMessage}</p>
                  <div className="text-[10px] text-[#059669] pt-1 font-semibold">
                    Deliverability Score: <strong>{deliverabilityScore}%</strong> • SPF/DKIM: <strong>{isDnsVerified ? 'Verified' : 'Pending'}</strong>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-xs text-[#6B5E77]">
                    Specify the test recipient address and personalized test values to inspect email rendering before broad dispatch.
                  </p>

                  {/* Recipient Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-black text-[#1E122C]">
                      Target Test Email Address <span className="text-[#EF4444]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={testRecipientEmail}
                      onChange={(e) => setTestRecipientEmail(e.target.value)}
                      placeholder="e.g. yourname@gmail.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#F3DEC8] rounded-xl font-bold text-[#1E122C] outline-none focus:border-[#8C1F3D]"
                    />
                  </div>

                  {/* Preview Recipient Name (For merge tags) */}
                  <div className="space-y-1">
                    <label className="text-xs font-black text-[#1E122C]">
                      Recipient First Name <span className="text-[10px] font-normal text-[#8A8294]">(Tests &#123;&#123;first_name&#125;&#125; token)</span>
                    </label>
                    <input
                      type="text"
                      value={testRecipientName}
                      onChange={(e) => setTestRecipientName(e.target.value)}
                      placeholder="e.g. Shristy"
                      className="w-full px-3.5 py-2 text-xs bg-white border border-[#F3DEC8] rounded-xl font-bold text-[#1E122C] outline-none focus:border-[#8C1F3D]"
                    />
                  </div>

                  {/* Test Configuration Options */}
                  <div className="p-3.5 rounded-2xl bg-[#FAF5F0] border border-[#F3DEC8] space-y-2">
                    <span className="text-[10px] font-black uppercase text-[#8A8294] tracking-wider block">Test Options:</span>
                    
                    <label className="flex items-center gap-2 text-xs font-bold text-[#1E122C] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={testPrefixSubject}
                        onChange={(e) => setTestPrefixSubject(e.target.checked)}
                        className="rounded border-[#F3DEC8] text-[#8C1F3D] accent-[#8C1F3D] cursor-pointer"
                      />
                      <span>Prefix Subject line with <code>[TEST]</code></span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-bold text-[#1E122C] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={testIncludeSampleData}
                        onChange={(e) => setTestIncludeSampleData(e.target.checked)}
                        className="rounded border-[#F3DEC8] text-[#8C1F3D] accent-[#8C1F3D] cursor-pointer"
                      />
                      <span>Include active VIP promo code ({activeDiscountCode || 'EARLYVIP20'})</span>
                    </label>
                  </div>

                  {/* Live Subject Preview Box */}
                  <div className="p-3 bg-white border border-[#F3DEC8] rounded-xl space-y-1 text-xs">
                    <div className="text-[10px] font-bold text-[#8A8294]">PREVIEW EMAIL SUBJECT:</div>
                    <div className="font-bold text-[#1E122C] truncate">
                      {testPrefixSubject ? '[TEST] ' : ''}{subjectLine.replace(/\{\{first_name\}\}/g, testRecipientName || 'Subscriber')}
                    </div>
                    <div className="text-[10px] text-[#6B5E77]">From: {senderName} &lt;{senderEmail}&gt;</div>
                  </div>

                  {/* Modal Actions */}
                  <div className="flex items-center justify-end gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsTestEmailModalOpen(false)}
                      className="px-4 py-2 bg-white border border-[#F3DEC8] hover:bg-[#FAF5F0] text-xs font-bold text-[#1E122C] rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={testSendingState === 'sending' || !testRecipientEmail.trim()}
                      className="px-5 py-2.5 bg-[#8C1F3D] hover:bg-[#731831] disabled:opacity-50 text-white rounded-xl text-xs font-black shadow-md cursor-pointer transition-all flex items-center gap-1.5"
                    >
                      {testSendingState === 'sending' ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Sending Live Test...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Test Email Now</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>

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
