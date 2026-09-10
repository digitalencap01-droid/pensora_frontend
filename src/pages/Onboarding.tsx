import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Globe,
  Target,
  Sliders,
  Rocket,
  ShieldCheck,
  Package,
  Link as LinkIcon,
  Tag,
  Users,
  Pencil,
  Check,
  Store,
  Coffee,
  Palette,
  Briefcase,
  TrendingUp,
  Megaphone,
  Mail,
  MessageSquare,
  FileText,
  Share2,
  CheckCircle2,
  Layers,
  Search,
  DollarSign,
  Plus,
  X,
  Phone,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Flame,
  Award,
  BarChart3,
  Bot
} from 'lucide-react';
import { useMarketing } from '../context/MarketingContext';
import { ChannelStrategyDetails } from '../types';

// Categories list
const CATEGORIES = [
  'E-commerce / Retail (D2C)',
  'B2B SaaS & Software',
  'Digital Marketing Agency',
  'Consulting & Professional Services',
  'Health, Wellness & Fitness',
  'Food, Beverage & Hospitality',
  'EdTech, Coaching & Education',
  'Real Estate & Construction',
  'Local Business & Services'
];

// Team Sizes list
const TEAM_SIZES = [
  'Just me (Solo Founder)',
  '2 - 10 Members',
  '11 - 50 Members',
  '51 - 200 Members',
  '200+ Enterprise'
];

// Workspace Styles list
const WORKSPACE_STYLES = [
  {
    id: 'bloom',
    name: 'Bloom Boutique',
    icon: Store,
    badge: 'Recommended',
    bgColor: 'bg-[#2A0E2A]',
    textColor: 'text-white',
    accentColor: '#8C1F3D',
    iconColor: 'text-[#F3DEC8]'
  },
  {
    id: 'coffee',
    name: 'Greenhouse Coffee',
    icon: Coffee,
    bgColor: 'bg-[#FFF4EC]',
    textColor: 'text-[#2D123A]',
    accentColor: '#EA580C',
    iconColor: 'text-[#EA580C]'
  },
  {
    id: 'studio',
    name: 'Creative Studio',
    icon: Palette,
    bgColor: 'bg-[#F7EEFA]',
    textColor: 'text-[#2D123A]',
    accentColor: '#7E22CE',
    iconColor: 'text-[#7E22CE]'
  },
  {
    id: 'agency',
    name: 'Digital Agency',
    icon: Briefcase,
    bgColor: 'bg-[#FFF8F0]',
    textColor: 'text-[#2D123A]',
    accentColor: '#D97706',
    iconColor: 'text-[#D97706]'
  }
];

// Available Digital Marketing Channels
interface MarketingChannelOption {
  id: string;
  title: string;
  badge: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  accent: string;
}

const MARKETING_CHANNELS: MarketingChannelOption[] = [
  {
    id: 'linkedin',
    title: 'LinkedIn Marketing',
    badge: 'B2B Lead Gen',
    description: 'Target decision-makers, company page growth & founder thought leadership.',
    icon: Briefcase,
    gradient: 'from-[#0A66C2]/15 to-[#004182]/5',
    accent: '#0A66C2'
  },
  {
    id: 'email',
    title: 'Email Campaigns',
    badge: 'High Retention',
    description: 'Automated welcome drips, weekly newsletters, and subscriber sales flows.',
    icon: Mail,
    gradient: 'from-[#D94A2A]/15 to-[#8C1F3D]/5',
    accent: '#D94A2A'
  },
  {
    id: 'seo',
    title: 'SEO (Search Optimization)',
    badge: 'Organic Inbound',
    description: 'Rank #1 on Google, capture high-intent keyword searches & build domain authority.',
    icon: Search,
    gradient: 'from-[#10B981]/15 to-[#059669]/5',
    accent: '#10B981'
  },
  {
    id: 'sem',
    title: 'SEM & Paid Ads (Google/Meta)',
    badge: 'Instant Traffic',
    description: 'High-converting Google Search, Performance Max & Meta paid ad funnels.',
    icon: DollarSign,
    gradient: 'from-[#F59E0B]/15 to-[#D97706]/5',
    accent: '#F59E0B'
  },
  {
    id: 'blog',
    title: 'Blog & Content Marketing',
    badge: 'Thought Leadership',
    description: 'Educational articles, buyer guides, and organic thought leadership.',
    icon: FileText,
    gradient: 'from-[#8B5CF6]/15 to-[#6D28D9]/5',
    accent: '#8B5CF6'
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp Marketing',
    badge: '98% Open Rate',
    description: 'Direct broadcast campaigns, abandoned cart recovery, and instant deals.',
    icon: MessageSquare,
    gradient: 'from-[#25D366]/15 to-[#128C7E]/5',
    accent: '#25D366'
  },
  {
    id: 'social',
    title: 'Social Media (Instagram/X)',
    badge: 'Brand & Viral',
    description: 'Reels, visual carousels, viral stories, and community engagement.',
    icon: Share2,
    gradient: 'from-[#EC4899]/15 to-[#BE185D]/5',
    accent: '#EC4899'
  }
];

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const {
    business,
    updateWorkspace,
    completeOnboarding
  } = useMarketing();

  // Active step (1 to 5)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // =========================================================================
  // STEP 1: WORKSPACE & BUSINESS BASICS
  // =========================================================================
  const [workspaceName, setWorkspaceName] = useState<string>(business?.name || 'Encaptechno');
  const [websiteUrl, setWebsiteUrl] = useState<string>(business?.website || 'https://encaptechno.com');
  const [category, setCategory] = useState<string>(business?.industry || 'E-commerce / Retail (D2C)');
  const [country, setCountry] = useState<string>(business?.country || 'India');
  const [timezone, setTimezone] = useState<string>(business?.timezone || 'Asia/Kolkata');
  const [marketingFamiliarity, setMarketingFamiliarity] = useState<'new' | 'basics' | 'experienced'>(
    business?.marketingFamiliarity || 'new'
  );
  const [teamSize, setTeamSize] = useState<string>('2 - 10 Members');
  const [description, setDescription] = useState<string>(
    business?.description || 'Premium modern brand helping businesses scale customer acquisition with AI.'
  );
  const [selectedStyle, setSelectedStyle] = useState<string>('bloom');

  // =========================================================================
  // STEP 2: MULTI-CHANNEL SELECTION
  // =========================================================================
  const [selectedChannels, setSelectedChannels] = useState<string[]>(
    business?.channels?.length ? business.channels : ['linkedin', 'email', 'seo']
  );

  // Active tab in Step 3 for multi-channel questionnaire
  const [activeChannelTab, setActiveChannelTab] = useState<string>('linkedin');

  // Sync activeChannelTab whenever selectedChannels changes
  useEffect(() => {
    if (selectedChannels.length > 0 && !selectedChannels.includes(activeChannelTab)) {
      setActiveChannelTab(selectedChannels[0]);
    }
  }, [selectedChannels, activeChannelTab]);

  // =========================================================================
  // STEP 3: CHANNEL-SPECIFIC STRATEGY DATA
  // =========================================================================
  
  // 1. LinkedIn Strategy State
  const [linkedinProfileUrl, setLinkedinProfileUrl] = useState<string>('https://linkedin.com/company/apexstudio');
  const [linkedinRoles, setLinkedinRoles] = useState<string[]>(['CEOs & Founders', 'CMOs & Marketing VPs', 'Procurement Heads']);
  const [newLinkedinRole, setNewLinkedinRole] = useState<string>('');
  const [linkedinIndustries, setLinkedinIndustries] = useState<string[]>(['SaaS & Tech', 'E-commerce', 'Consulting']);
  const [newLinkedinIndustry, setNewLinkedinIndustry] = useState<string>('');
  const [linkedinCompanySize, setLinkedinCompanySize] = useState<string>('11-50 Employees');
  const [linkedinGoal, setLinkedinGoal] = useState<'b2b_lead_generation' | 'inbound_branding' | 'executive_presence'>('b2b_lead_generation');
  const [linkedinContentStyle, setLinkedinContentStyle] = useState<'thought_leadership' | 'case_studies' | 'hiring_culture' | 'product_launches'>('thought_leadership');

  // 2. Email Strategy State
  const [emailFromName, setEmailFromName] = useState<string>(business?.email?.fromName || 'Encap');
  const [emailFromAddress, setEmailFromAddress] = useState<string>(business?.email?.fromEmail || 'noreply@encaptechno.com');
  const [emailReplyTo, setEmailReplyTo] = useState<string>(business?.email?.replyToEmail || 'hello@encaptechno.com');
  const [emailListSize, setEmailListSize] = useState<string>(business?.email?.currentListSize || '2,500 - 10,000 subscribers');
  const [emailCampaignType, setEmailCampaignType] = useState<'weekly_newsletter' | 'drip_nurture' | 'cold_outreach' | 'ecommerce_promos'>('weekly_newsletter');
  const [emailESP, setEmailESP] = useState<string>('Klaviyo / Mailchimp');
  const [emailCadence, setEmailCadence] = useState<'daily' | 'weekly' | 'biweekly' | 'monthly'>('weekly');

  // 3. SEO Strategy State
  const [seoKeywords, setSeoKeywords] = useState<string[]>(['b2b marketing automation', 'ai customer acquisition', 'growth agency']);
  const [newSeoKeyword, setNewSeoKeyword] = useState<string>('');
  const [seoGeography, setSeoGeography] = useState<string>('Global (US, UK, India, Europe)');
  const [seoCompetitors, setSeoCompetitors] = useState<string[]>(['competitorbrand.com', 'growthlab.io']);
  const [newSeoCompetitor, setNewSeoCompetitor] = useState<string>('');
  const [seoGoal, setSeoGoal] = useState<'ranking' | 'organic_traffic' | 'local_seo' | 'technical_fix'>('ranking');

  // 4. SEM / Paid Ads State
  const [semBudget, setSemBudget] = useState<string>('$1,000 - $5,000 / month');
  const [semNetworks, setSemNetworks] = useState<string[]>(['google_search', 'meta_ads']);
  const [semGoal, setSemGoal] = useState<'roas_sales' | 'lead_form' | 'app_installs' | 'traffic'>('lead_form');
  const [semTargetCPA, setSemTargetCPA] = useState<string>('$25 / qualified lead');

  // 5. Blog & Content Strategy State
  const [blogPillars, setBlogPillars] = useState<string[]>(['Growth Playbooks', 'AI Automation Guides', 'Customer Case Studies']);
  const [newBlogPillar, setNewBlogPillar] = useState<string>('');
  const [blogCadence, setBlogCadence] = useState<'daily' | 'weekly_2_3' | 'weekly_1' | 'bi_weekly' | 'monthly'>('weekly_2_3');
  const [blogContentType, setBlogContentType] = useState<'how_to_guides' | 'industry_insights' | 'case_studies' | 'product_updates' | 'thought_leadership'>('how_to_guides');

  // 6. WhatsApp Strategy State
  const [whatsappNumber, setWhatsappNumber] = useState<string>('+1 (555) 349-2890');
  const [whatsappOptInCount, setWhatsappOptInCount] = useState<string>('500 - 2,500 contacts');
  const [whatsappType, setWhatsappType] = useState<'promotional_broadcasts' | 'abandoned_cart_recovery' | 'order_updates' | 'support_crm'>('promotional_broadcasts');
  const [whatsappLanguage, setWhatsappLanguage] = useState<string>('English / Hinglish');

  // 7. Social Media Strategy State
  const [socialPlatforms, setSocialPlatforms] = useState<string[]>(['instagram', 'twitter_x', 'facebook']);
  const [socialAesthetic, setSocialAesthetic] = useState<'minimalist_clean' | 'vibrant_bold' | 'corporate_sleek' | 'warm_lifestyle'>('minimalist_clean');
  const [socialFocus, setSocialFocus] = useState<'reels_short_video' | 'visual_carousels' | 'stories_community' | 'influencer_collab'>('reels_short_video');
  const [socialCadence, setSocialCadence] = useState<'daily' | '3_times_week' | 'weekly'>('3_times_week');

  // =========================================================================
  // STEP 4: AUDIENCE, GROWTH GOAL & TONE OF VOICE
  // =========================================================================
  const [targetAudienceType, setTargetAudienceType] = useState<'B2C' | 'B2B' | 'Both'>(
    business?.targetAudienceType || 'B2B'
  );
  const [growthGoal, setGrowthGoal] = useState<'sales' | 'leads' | 'awareness' | 'retention' | 'launch'>(
    (business?.growthGoal as any) || 'leads'
  );
  const [location, setLocation] = useState<string>(business?.location || 'Global / North America & India');
  const [targetAudienceDesc, setTargetAudienceDesc] = useState<string>(
    business?.targetAudienceDesc || 'Mid-to-senior business executives and brand owners seeking measurable marketing ROI.'
  );
  const [selectedTone, setSelectedTone] = useState<string>(business?.toneOfVoice || 'professional');

  // Sync initial values from business if present
  useEffect(() => {
    if (business?.name && !workspaceName) setWorkspaceName(business.name);
    if (business?.website && !websiteUrl) setWebsiteUrl(business.website);
  }, [business, workspaceName, websiteUrl]);

  // Handle Channel Selection Toggle
  const toggleChannel = (channelId: string) => {
    if (selectedChannels.includes(channelId)) {
      if (selectedChannels.length === 1) {
        // Prevent deselecting all channels
        return;
      }
      setSelectedChannels(selectedChannels.filter(id => id !== channelId));
    } else {
      setSelectedChannels([...selectedChannels, channelId]);
    }
  };

  // Tag helper functions
  const addTag = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const trimmed = input.trim();
    if (trimmed && !list.includes(trimmed)) {
      setList([...list, trimmed]);
      setInput('');
    }
  };

  const removeTag = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    item: string
  ) => {
    setList(list.filter(t => t !== item));
  };

  // =========================================================================
  // COMPOSE CHANNEL STRATEGY OBJECT
  // =========================================================================
  const buildChannelStrategies = (): ChannelStrategyDetails => {
    const details: ChannelStrategyDetails = {};

    if (selectedChannels.includes('seo')) {
      details.seo = {
        focusKeywords: seoKeywords,
        targetGeography: seoGeography,
        competitorDomains: seoCompetitors,
        primaryGoal: seoGoal
      };
    }

    if (selectedChannels.includes('sem')) {
      details.sem = {
        monthlyBudget: semBudget,
        platforms: semNetworks,
        conversionGoal: semGoal,
        targetCPA: semTargetCPA
      };
    }

    if (selectedChannels.includes('blog')) {
      details.blog = {
        topicsAndPillars: blogPillars,
        publishingCadence: blogCadence,
        contentType: blogContentType
      };
    }

    if (selectedChannels.includes('linkedin')) {
      details.linkedin = {
        profileOrCompanyUrl: linkedinProfileUrl,
        targetJobTitles: linkedinRoles,
        targetIndustries: linkedinIndustries,
        targetCompanySize: linkedinCompanySize,
        contentStyle: linkedinContentStyle,
        outreachGoal: linkedinGoal
      };
    }

    if (selectedChannels.includes('email')) {
      details.email = {
        fromName: emailFromName,
        fromEmail: emailFromAddress,
        replyToEmail: emailReplyTo,
        currentListSize: emailListSize,
        primaryCampaignType: emailCampaignType,
        currentESP: emailESP,
        sendingCadence: emailCadence,
        spfVerified: true,
        dkimVerified: true,
        autonomyLevel: 'ask_every_time'
      };
    }

    if (selectedChannels.includes('whatsapp')) {
      details.whatsapp = {
        whatsappNumber,
        businessType: whatsappType,
        subscriberOptInCount: whatsappOptInCount,
        preferredLanguage: whatsappLanguage
      };
    }

    if (selectedChannels.includes('social')) {
      details.social = {
        platforms: socialPlatforms,
        primaryFocus: socialFocus,
        postingFrequency: socialCadence,
        aestheticStyle: socialAesthetic
      };
    }

    return details;
  };

  const handleNextStep = () => {
    const channelStrategies = buildChannelStrategies();

    // Save state at each transition
    if (business?.id) {
      updateWorkspace(business.id, {
        name: workspaceName,
        website: websiteUrl,
        industry: category,
        description: description,
        country: country,
        timezone: timezone,
        marketingFamiliarity: marketingFamiliarity,
        growthGoal: growthGoal,
        location: location,
        targetMarket: location,
        targetAudienceType: targetAudienceType,
        targetAudienceDesc: targetAudienceDesc,
        channels: selectedChannels,
        toneOfVoice: selectedTone as any,
        channelStrategies,
        email: channelStrategies.email,
        whatsapp: channelStrategies.whatsapp
      });
    }

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
      navigate('/dashboard');
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    navigate('/dashboard');
  };

  return (
    <div
      className="min-h-screen bg-[#FEF7F1] py-4 sm:py-6 px-2 sm:px-6 lg:px-8 flex items-center justify-center font-sans antialiased text-[#15111E] select-none relative overflow-hidden"
      style={{
        backgroundImage: "url('/onboarding-main-bg-crisp.jpg')",
        backgroundPosition: 'center bottom',
        backgroundSize: '100% auto',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Master Framed Onboarding Canvas */}
      <div className="max-w-[1180px] w-full bg-[#FFFDFC]/95 backdrop-blur-sm rounded-[32px] sm:rounded-[38px] border border-[#F3DEC8] shadow-[0_25px_70px_rgba(75,29,107,0.12)] overflow-hidden flex flex-col justify-between min-h-[660px] relative">
        
        {/* ========================================================
            TOP & MID CONTENT: 2-PANEL UNIFIED FLEX LAYOUT
            ======================================================== */}
        <div className="flex flex-col lg:flex-row items-stretch relative z-10 flex-1">
          
          {/* ========================================================
              PANEL 1: LEFT FULL-BLEED 3D ARTWORK PANEL
              ======================================================== */}
          <div className="w-full lg:w-[350px] xl:w-[360px] shrink-0 min-h-[560px] p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden bg-white">
            
            {/* Full Master Artwork Background */}
            <img
              src="/onboarding-left-tight.jpg"
              alt="AI Workspace Artwork"
              className="absolute inset-0 w-full h-full object-cover object-left-top pointer-events-none select-none"
            />

            {/* Top Content: Logo, Tag & Headline */}
            <div className="relative z-10">
              <div className="flex items-center">
                <img 
                  src="/growwise-logo.png" 
                  alt="GrowWise AI" 
                  className="h-10 sm:h-11 w-auto object-contain"
                />
              </div>

              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#EA580C] mt-5 block">
                MULTI-CHANNEL AI SETUP
              </span>
              <h1 className="text-3xl sm:text-[32px] font-black text-[#15111E] tracking-tight leading-[1.08] mt-1.5">
                Tailor your <br />
                <span className="text-[#8C1F3D]">Omnichannel</span> <br />
                AI Growth Engine
              </h1>
              <p className="text-[11px] text-[#6B6375] font-medium mt-2 leading-relaxed">
                Configure your tailored marketing avenues for maximum revenue and targeted lead conversion.
              </p>
            </div>

            {/* Bottom Content: Floating Channels Active Pill */}
            <div className="relative z-10 mt-auto pt-6">
              <div className="rounded-2xl bg-white/90 backdrop-blur-md border border-[#F3DEC8]/90 p-3.5 space-y-2 shadow-[0_6px_16px_rgba(75,29,107,0.06)] max-w-[300px]">
                <div className="flex items-center justify-between">
                  <span className="text-[9.5px] font-black uppercase tracking-wider text-[#8C1F3D] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#EA580C]" />
                    Active Avenues
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#EA580C]/10 text-[#EA580C] text-[9.5px] font-black">
                    {selectedChannels.length} Selected
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedChannels.map(ch => (
                    <span key={ch} className="px-2 py-0.5 rounded-md bg-[#FAF5F0] border border-[#F3DEC8] text-[9.5px] font-bold text-[#15111E] capitalize">
                      {ch}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              PANEL 2: CENTER INTERACTIVE ONBOARDING FORM
              ======================================================== */}
          <div className="flex-1 min-w-0 p-5 sm:p-7 flex flex-col justify-start space-y-4 bg-white z-10">
            
            {/* 5-Step Horizontal Breadcrumb Header Bar */}
            <div className="flex items-center justify-between relative pt-1 pb-1 overflow-x-auto w-full select-none">
              {[
                { step: 1, label: 'Discover', icon: Sparkles },
                { step: 2, label: 'Channels', icon: Layers },
                { step: 3, label: 'Strategy', icon: Sliders },
                { step: 4, label: 'Audience & Tone', icon: Users },
                { step: 5, label: 'AI Blueprint', icon: Rocket }
              ].map((item, idx) => {
                const isActive = currentStep === item.step;
                const isPassed = currentStep > item.step;
                const Icon = item.icon;

                return (
                  <React.Fragment key={item.step}>
                    <motion.button
                      type="button"
                      onClick={() => setCurrentStep(item.step)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center group cursor-pointer shrink-0 relative transition-all"
                    >
                      {/* Step Circle Badge */}
                      <div className="relative">
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-xs ${
                            isActive
                              ? 'bg-[#220B28] text-white ring-4 ring-[#8C1F3D]/20 shadow-md scale-105'
                              : isPassed
                              ? 'bg-[#EA580C] text-white shadow-xs'
                              : 'bg-white border border-[#EADBCC] text-[#7A7285] group-hover:border-[#EA580C] group-hover:text-[#EA580C]'
                          }`}
                        >
                          {isPassed ? (
                            <Check className="w-4 h-4 stroke-[3]" />
                          ) : (
                            <Icon className="w-4 h-4" />
                          )}
                        </div>
                      </div>

                      {/* Number & Label */}
                      <span
                        className={`text-[9.5px] font-black mt-1 transition-colors ${
                          isActive
                            ? 'text-[#8C1F3D]'
                            : isPassed
                            ? 'text-[#EA580C]'
                            : 'text-[#7A7285]'
                        }`}
                      >
                        0{item.step}
                      </span>

                      <div className="relative flex flex-col items-center">
                        <span
                          className={`text-[10.5px] sm:text-[11px] tracking-tight transition-colors ${
                            isActive
                              ? 'text-[#15111E] font-black'
                              : isPassed
                              ? 'text-[#15111E] font-bold'
                              : 'text-[#7A7285] font-semibold group-hover:text-[#15111E]'
                          }`}
                        >
                          {item.label}
                        </span>

                        {/* Active Underline Indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="activeStepUnderline"
                            className="h-[2px] w-full bg-[#EA580C] rounded-full mt-0.5"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                      </div>
                    </motion.button>

                    {/* Dotted Connecting Line between circles */}
                    {idx < 4 && (
                      <div className="flex-1 max-w-[24px] sm:max-w-[40px] border-t-2 border-dotted border-[#D8C7B5] mx-1 sm:mx-1.5 mt-[-16px]" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Step Dynamic Content Switching */}
            <AnimatePresence mode="wait">
              
              {/* =========================================================================
                  STEP 1: DISCOVER / TELL US ABOUT YOUR BUSINESS
                  ========================================================================= */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3.5 w-full text-left"
                >
                  <div>
                    <span className="text-[10.5px] font-black text-[#EA580C] block">
                      Step 1 • Workspace Setup
                    </span>
                    <h2 className="text-xl sm:text-[22px] font-black text-[#15111E] tracking-tight mt-0.5">
                      Tell us about your business
                    </h2>
                  </div>

                  {/* 2-Column Floating Input Field Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    
                    {/* Field 1: Business / Workspace Name */}
                    <div className="bg-[#FFFDFB] border border-[#F5E4D5] rounded-xl p-2.5 sm:p-3 flex items-center gap-2.5 shadow-[0_2px_6px_rgba(0,0,0,0.02)] focus-within:border-[#EA580C] transition-all">
                      <div className="w-8 h-8 rounded-lg bg-[#FFF0E5] text-[#EA580C] flex items-center justify-center shrink-0">
                        <Package className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                          Business / Workspace Name
                        </label>
                        <input
                          type="text"
                          value={workspaceName}
                          onChange={(e) => setWorkspaceName(e.target.value)}
                          placeholder="e.g. Encaptechno"
                          className="w-full bg-transparent text-xs font-bold text-[#15111E] outline-none placeholder:text-slate-400 mt-0.5"
                        />
                      </div>
                    </div>

                    {/* Field 2: Website URL */}
                    <div className="bg-[#FFFDFB] border border-[#F5E4D5] rounded-xl p-2.5 sm:p-3 flex items-center gap-2.5 shadow-[0_2px_6px_rgba(0,0,0,0.02)] focus-within:border-[#D94A6B] transition-all">
                      <div className="w-8 h-8 rounded-lg bg-[#FDF0F3] text-[#D94A6B] flex items-center justify-center shrink-0">
                        <LinkIcon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                          Website URL
                        </label>
                        <input
                          type="url"
                          value={websiteUrl}
                          onChange={(e) => setWebsiteUrl(e.target.value)}
                          placeholder="https://encaptechno.com"
                          className="w-full bg-transparent text-xs font-bold text-[#15111E] outline-none placeholder:text-slate-400 mt-0.5"
                        />
                      </div>
                    </div>

                    {/* Field 3: Business Category */}
                    <div className="bg-[#FFFDFB] border border-[#F5E4D5] rounded-xl p-2.5 sm:p-3 flex items-center gap-2.5 shadow-[0_2px_6px_rgba(0,0,0,0.02)] focus-within:border-[#7E22CE] transition-all">
                      <div className="w-8 h-8 rounded-lg bg-[#F5EDF8] text-[#7E22CE] flex items-center justify-center shrink-0">
                        <Tag className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                          Industry / Category
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full bg-transparent text-xs font-bold text-[#15111E] outline-none cursor-pointer mt-0.5"
                        >
                          {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Field 4: Country & Timezone */}
                    <div className="grid grid-cols-2 gap-2 bg-[#FFFDFB] border border-[#F5E4D5] rounded-xl p-2.5 sm:p-3 shadow-[0_2px_6px_rgba(0,0,0,0.02)] focus-within:border-[#EA580C] transition-all">
                      <div className="min-w-0">
                        <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                          Country
                        </label>
                        <input
                          type="text"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          placeholder="e.g. India"
                          className="w-full bg-transparent text-xs font-bold text-[#15111E] outline-none placeholder:text-slate-400 mt-0.5"
                        />
                      </div>
                      <div className="min-w-0 border-l border-[#F5E4D5] pl-2">
                        <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                          Timezone
                        </label>
                        <input
                          type="text"
                          value={timezone}
                          onChange={(e) => setTimezone(e.target.value)}
                          placeholder="e.g. Asia/Kolkata"
                          className="w-full bg-transparent text-xs font-bold text-[#15111E] outline-none placeholder:text-slate-400 mt-0.5"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Marketing Familiarity Selection */}
                  <div className="space-y-1.5 pt-1">
                    <div>
                      <h3 className="text-xs font-black text-[#15111E]">How familiar are you with marketing?</h3>
                      <p className="text-[10px] text-[#6B6375]">This helps us tailor the experience. You can change it later.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-0.5">
                      {[
                        {
                          id: 'new',
                          emoji: '🌿',
                          title: "I'm new to marketing",
                          desc: 'Show me explanations and guide me through each step. Recommend the best options for me.'
                        },
                        {
                          id: 'basics',
                          emoji: '📊',
                          title: 'I know the basics',
                          desc: 'Some guidance is helpful, but I can handle the details when needed.'
                        },
                        {
                          id: 'experienced',
                          emoji: '🚀',
                          title: "I'm experienced",
                          desc: 'Give me advanced controls and less hand-holding. I know what I want.'
                        }
                      ].map((lvl) => {
                        const isSelected = marketingFamiliarity === lvl.id;
                        return (
                          <div
                            key={lvl.id}
                            onClick={() => setMarketingFamiliarity(lvl.id as any)}
                            className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected 
                                ? 'bg-[#FFF8F4] border-[#EA580C] ring-2 ring-[#EA580C]/20 shadow-xs' 
                                : 'bg-[#FFFDFB] border-[#F5E4D5] hover:border-[#EA580C]/50 hover:bg-[#FFFDFC]'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="text-lg">{lvl.emoji}</span>
                                <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                  isSelected ? 'border-[#EA580C] bg-[#EA580C]' : 'border-slate-300'
                                }`}>
                                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                </div>
                              </div>
                              <h4 className="text-[11.5px] font-black text-[#15111E] mt-1.5">{lvl.title}</h4>
                              <p className="text-[10px] text-[#6B6375] font-medium leading-relaxed mt-0.5">{lvl.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Field 5: Short Description */}
                  <div className="bg-[#FFFDFB] border border-[#F5E4D5] rounded-xl p-2.5 sm:p-3 shadow-[0_2px_6px_rgba(0,0,0,0.02)] focus-within:border-[#EA580C] transition-all">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5.5 h-5.5 rounded-md bg-[#FFF0E5] text-[#EA580C] flex items-center justify-center">
                          <Pencil className="w-3 h-3" />
                        </div>
                        <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider">
                          Short Description & Core Offering
                        </label>
                      </div>
                      <span className="text-[8.5px] font-bold text-[#8A8294]">
                        {description.length}/250
                      </span>
                    </div>
                    <textarea
                      rows={2}
                      maxLength={250}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your products, unique value proposition, or core market offering..."
                      className="w-full bg-transparent text-xs font-medium text-[#15111E] outline-none placeholder:text-slate-400 resize-none leading-relaxed mt-0.5"
                    />
                  </div>

                  {/* Workspace Style Picker */}
                  <div className="space-y-1.5 pt-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-[#15111E]">
                        Choose Workspace Theme (Optional)
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {WORKSPACE_STYLES.map((style) => {
                        const isSelected = selectedStyle === style.id;
                        const StyleIcon = style.icon;

                        return (
                          <button
                            key={style.id}
                            type="button"
                            onClick={() => setSelectedStyle(style.id)}
                            className={`p-2 sm:p-2.5 rounded-xl border text-left transition-all duration-300 relative flex flex-col justify-between h-17 sm:h-18 cursor-pointer ${
                              isSelected
                                ? `${style.bgColor} ${style.textColor} border-transparent shadow-md scale-102`
                                : `${style.bgColor} ${style.textColor} border-[#F3DEC8] hover:border-[#EA580C]`
                            }`}
                          >
                            {isSelected && (
                              <div className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-white text-[#2A0E2A] flex items-center justify-center shadow-md">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                            )}

                            <div className={`w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center ${style.iconColor}`}>
                              <StyleIcon className="w-3.5 h-3.5" />
                            </div>

                            <div>
                              <span className="text-[10px] sm:text-[10.5px] font-black block leading-tight truncate">
                                {style.name}
                              </span>
                              {style.badge && (
                                <span className="text-[7.5px] font-bold text-[#F3DEC8] opacity-90 block mt-0.5">
                                  {style.badge}
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </motion.div>
              )}

              {/* =========================================================================
                  STEP 2: MARKETING CHANNELS MULTI-SELECTION
                  ========================================================================= */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3.5 w-full text-left"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <span className="text-[10.5px] font-black text-[#EA580C] block">
                        Step 2 • Channel Strategy
                      </span>
                      <h2 className="text-xl sm:text-[22px] font-black text-[#15111E] tracking-tight mt-0.5">
                        Which marketing avenues do you want to manage?
                      </h2>
                    </div>
                    <span className="text-[11px] font-bold text-[#8C1F3D] bg-[#F8EEF8] border border-[#E9D5F7] px-3 py-1 rounded-full w-fit">
                      {selectedChannels.length} avenues selected
                    </span>
                  </div>

                  <p className="text-xs text-[#6B6375] font-medium">
                    Select all channels you want to utilize. GrowWise AI will adapt its setup questionnaires and campaign automations to your exact mix.
                  </p>

                  {/* Channel Grid Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
                    {MARKETING_CHANNELS.map((ch) => {
                      const isSelected = selectedChannels.includes(ch.id);
                      const Icon = ch.icon;

                      return (
                        <div
                          key={ch.id}
                          onClick={() => toggleChannel(ch.id)}
                          className={`p-3 rounded-2xl border transition-all duration-200 cursor-pointer relative flex flex-col justify-between space-y-2 group ${
                            isSelected
                              ? 'bg-gradient-to-br from-[#FFF8F4] to-[#FFF0E6] border-[#EA580C] shadow-sm ring-2 ring-[#EA580C]/20 scale-101'
                              : 'bg-[#FFFDFB] border-[#F5E4D5] hover:border-[#EA580C]/60 hover:bg-[#FFFDFC]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div 
                                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                                  isSelected ? 'bg-[#EA580C] text-white shadow-xs' : 'bg-[#FAF5F0] text-[#15111E] border border-[#F3DEC8]'
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-white/90 border border-[#F3DEC8] text-[#8C1F3D]">
                                {ch.badge}
                              </span>
                            </div>

                            {/* Checkbox Icon */}
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                              isSelected ? 'bg-[#EA580C] border-[#EA580C] text-white shadow-xs' : 'border-slate-300 bg-white'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-xs font-black text-[#15111E] group-hover:text-[#EA580C] transition-colors">
                              {ch.title}
                            </h4>
                            <p className="text-[10px] text-[#7A7285] leading-snug mt-0.5 font-medium">
                              {ch.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#FAF5F0] border border-[#F3DEC8] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#EA580C] shrink-0" />
                    <p className="text-[10.5px] text-[#6B5E77] font-semibold">
                      In the next step, you will be prompted for specific strategy details tailored to each chosen channel.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* =========================================================================
                  STEP 3: TAILORED DYNAMIC CHANNEL DEEP-DIVE
                  ========================================================================= */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3.5 w-full text-left"
                >
                  {/* Step Header & Channel Progress Counter */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10.5px] font-black text-[#EA580C]">
                          Step 3 • Custom Channel Strategy
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-[#FFEFEA] text-[#EA580C] border border-[#FAD8C7]">
                          Channel {Math.max(0, selectedChannels.indexOf(activeChannelTab)) + 1} of {selectedChannels.length}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-[22px] font-black text-[#15111E] tracking-tight mt-0.5">
                        Configure your channel requirements
                      </h2>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#6B5E77]">
                      <span>Progress:</span>
                      <span className="font-black text-[#8C1F3D]">
                        {Math.round(((Math.max(0, selectedChannels.indexOf(activeChannelTab)) + 1) / selectedChannels.length) * 100)}%
                      </span>
                    </div>
                  </div>

                  {/* Visual Step Progress Bar */}
                  <div className="w-full h-1.5 bg-[#FAF5F0] rounded-full overflow-hidden border border-[#F3DEC8]/70">
                    <div 
                      className="h-full bg-gradient-to-r from-[#8C1F3D] to-[#EA580C] transition-all duration-300 rounded-full"
                      style={{
                        width: `${((Math.max(0, selectedChannels.indexOf(activeChannelTab)) + 1) / selectedChannels.length) * 100}%`
                      }}
                    />
                  </div>

                  {/* Guided Sequential Stepper Rail */}
                  {selectedChannels.length > 1 && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 custom-scrollbar">
                        {selectedChannels.map((chId, idx) => {
                          const chMeta = MARKETING_CHANNELS.find(c => c.id === chId);
                          const activeIdx = Math.max(0, selectedChannels.indexOf(activeChannelTab));
                          const isTabActive = activeChannelTab === chId;
                          const isCompleted = idx < activeIdx;
                          const TabIcon = chMeta?.icon || Megaphone;

                          return (
                            <button
                              key={chId}
                              type="button"
                              onClick={() => setActiveChannelTab(chId)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all shrink-0 cursor-pointer border ${
                                isTabActive
                                  ? 'bg-[#2A0E2A] text-white border-[#2A0E2A] shadow-xs scale-102 ring-2 ring-[#EA580C]/30'
                                  : isCompleted
                                  ? 'bg-[#E6F8F0] border-[#A7F3D0] text-[#059669]'
                                  : 'bg-[#FFFDFB] border-[#F3DEC8] text-[#6B5E77] hover:border-[#EA580C] hover:text-[#15111E]'
                              }`}
                            >
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black ${
                                isTabActive ? 'bg-[#EA580C] text-white' : isCompleted ? 'bg-[#10B981] text-white' : 'bg-[#FAF5F0] text-[#6B5E77]'
                              }`}>
                                {isCompleted ? '✓' : idx + 1}
                              </div>
                              <TabIcon className="w-3.5 h-3.5" />
                              <span>{chMeta?.title.split(' ')[0] || chId}</span>
                              {isTabActive && (
                                <span className="text-[8.5px] px-1.5 py-0.2 rounded bg-white/20 text-white font-bold">
                                  Current
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                      <span className="text-[10px] text-[#8A8294] font-medium block">
                        Complete each channel below or click "Next Channel" to proceed sequentially.
                      </span>
                    </div>
                  )}

                  {/* DYNAMIC SUB-FORM BY ACTIVE CHANNEL */}
                  <div className="bg-[#FFFDFB] border border-[#F5E4D5] rounded-2xl p-4 shadow-2xs space-y-3 max-h-[320px] overflow-y-auto pr-1">

                    {/* -------------------------------------------------------------
                        1. LINKEDIN MARKETING SUB-FORM
                        ------------------------------------------------------------- */}
                    {activeChannelTab === 'linkedin' && (
                      <div className="space-y-3 animate-in fade-in">
                        <div className="flex items-center justify-between border-b border-[#F5E4D5] pb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-[#0A66C2]/15 text-[#0A66C2] flex items-center justify-center font-bold">
                              <Briefcase className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-black text-[#15111E]">LinkedIn B2B Strategy Details</h4>
                              <p className="text-[10px] text-[#6B6375]">Target decision-makers and high-value corporate deals</p>
                            </div>
                          </div>
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-[#0A66C2]/10 text-[#0A66C2]">
                            B2B Pipeline
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {/* Profile / Company Page URL */}
                          <div className="space-y-1">
                            <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                              LinkedIn Profile or Company Page URL
                            </label>
                            <input
                              type="url"
                              value={linkedinProfileUrl}
                              onChange={(e) => setLinkedinProfileUrl(e.target.value)}
                              placeholder="https://linkedin.com/company/yourbrand"
                              className="w-full bg-[#FAF5F0]/60 border border-[#F3DEC8] rounded-xl px-3 py-1.5 text-xs font-bold text-[#15111E] outline-none focus:border-[#0A66C2]"
                            />
                          </div>

                          {/* Target Company Size */}
                          <div className="space-y-1">
                            <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                              Target Company Size
                            </label>
                            <select
                              value={linkedinCompanySize}
                              onChange={(e) => setLinkedinCompanySize(e.target.value)}
                              className="w-full bg-[#FAF5F0]/60 border border-[#F3DEC8] rounded-xl px-3 py-1.5 text-xs font-bold text-[#15111E] outline-none cursor-pointer"
                            >
                              <option value="1-10 Employees">1-10 Employees (Startups & Solopreneurs)</option>
                              <option value="11-50 Employees">11-50 Employees (Growing SMBs)</option>
                              <option value="51-200 Employees">51-200 Employees (Mid-Market)</option>
                              <option value="200+ Enterprise">200+ Enterprise</option>
                            </select>
                          </div>
                        </div>

                        {/* Target Job Titles / Decision Makers */}
                        <div className="space-y-1.5">
                          <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                            Target Decision-Maker Roles (e.g. Founders, CMOs)
                          </label>
                          <div className="flex flex-wrap gap-1.5">
                            {linkedinRoles.map((role) => (
                              <span key={role} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#EBF4FA] border border-[#BCE0FD] text-[10.5px] font-bold text-[#0A66C2]">
                                {role}
                                <button type="button" onClick={() => removeTag(linkedinRoles, setLinkedinRoles, role)} className="hover:text-rose-600">×</button>
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-2 pt-0.5">
                            <input
                              type="text"
                              value={newLinkedinRole}
                              onChange={(e) => setNewLinkedinRole(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(linkedinRoles, setLinkedinRoles, newLinkedinRole, setNewLinkedinRole))}
                              placeholder="Add role (e.g. VP Marketing) and hit enter..."
                              className="flex-1 bg-[#FAF5F0]/60 border border-[#F3DEC8] rounded-xl px-3 py-1.5 text-xs font-medium text-[#15111E] outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => addTag(linkedinRoles, setLinkedinRoles, newLinkedinRole, setNewLinkedinRole)}
                              className="px-3 py-1.5 bg-[#0A66C2] text-white text-xs font-bold rounded-xl"
                            >
                              Add
                            </button>
                          </div>
                        </div>

                        {/* Target B2B Industries */}
                        <div className="space-y-1.5">
                          <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                            Target Industries
                          </label>
                          <div className="flex flex-wrap gap-1.5">
                            {linkedinIndustries.map((ind) => (
                              <span key={ind} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#FAF5F0] border border-[#F3DEC8] text-[10.5px] font-bold text-[#15111E]">
                                {ind}
                                <button type="button" onClick={() => removeTag(linkedinIndustries, setLinkedinIndustries, ind)} className="hover:text-rose-600">×</button>
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-2 pt-0.5">
                            <input
                              type="text"
                              value={newLinkedinIndustry}
                              onChange={(e) => setNewLinkedinIndustry(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(linkedinIndustries, setLinkedinIndustries, newLinkedinIndustry, setNewLinkedinIndustry))}
                              placeholder="Add industry (e.g. Fintech, Logistics)..."
                              className="flex-1 bg-[#FAF5F0]/60 border border-[#F3DEC8] rounded-xl px-3 py-1.5 text-xs font-medium text-[#15111E] outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => addTag(linkedinIndustries, setLinkedinIndustries, newLinkedinIndustry, setNewLinkedinIndustry)}
                              className="px-3 py-1.5 bg-[#2A0E2A] text-white text-xs font-bold rounded-xl"
                            >
                              Add
                            </button>
                          </div>
                        </div>

                        {/* LinkedIn Focus Objective */}
                        <div className="space-y-1 pt-1">
                          <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                            Primary LinkedIn Growth Goal
                          </label>
                          <div className="grid grid-cols-3 gap-1.5">
                            {[
                              { id: 'b2b_lead_generation', label: 'B2B Inbound Leads' },
                              { id: 'thought_leadership', label: 'Executive Thought Leadership' },
                              { id: 'inbound_branding', label: 'Brand Authority & Talent' }
                            ].map(item => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setLinkedinGoal(item.id as any)}
                                className={`p-2 rounded-xl text-[10.5px] font-bold transition-all ${
                                  linkedinGoal === item.id ? 'bg-[#0A66C2] text-white shadow-xs' : 'bg-white border border-[#F3DEC8] text-[#15111E] hover:border-[#0A66C2]'
                                }`}
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* -------------------------------------------------------------
                        2. EMAIL CAMPAIGNS SUB-FORM
                        ------------------------------------------------------------- */}
                    {activeChannelTab === 'email' && (
                      <div className="space-y-3 animate-in fade-in">
                        <div className="flex items-center justify-between border-b border-[#F5E4D5] pb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-[#D94A2A]/15 text-[#D94A2A] flex items-center justify-center font-bold">
                              <Mail className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-black text-[#15111E]">Email Campaign Setup &amp; Sender Identity</h4>
                              <p className="text-[10px] text-[#6B6375]">Configure how your emails appear to clients in their inbox</p>
                            </div>
                          </div>
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-[#D94A2A]/10 text-[#D94A2A]">
                            High ROI
                          </span>
                        </div>

                        {/* From Name & From Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div className="space-y-1">
                            <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                              From Name (Sender Display Name)
                            </label>
                            <input
                              type="text"
                              value={emailFromName}
                              onChange={(e) => setEmailFromName(e.target.value)}
                              placeholder="e.g. Encap / Bloom Studio"
                              className="w-full bg-[#FAF5F0]/60 border border-[#F3DEC8] rounded-xl px-3 py-1.5 text-xs font-bold text-[#15111E] outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                              From Email Address
                            </label>
                            <input
                              type="email"
                              value={emailFromAddress}
                              onChange={(e) => setEmailFromAddress(e.target.value)}
                              placeholder="noreply@encaptechno.com"
                              className="w-full bg-[#FAF5F0]/60 border border-[#F3DEC8] rounded-xl px-3 py-1.5 text-xs font-bold text-[#15111E] outline-none"
                            />
                          </div>
                        </div>

                        {/* Reply To & List Size */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div className="space-y-1">
                            <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                              Reply-To Email Address (Optional)
                            </label>
                            <input
                              type="email"
                              value={emailReplyTo}
                              onChange={(e) => setEmailReplyTo(e.target.value)}
                              placeholder="founder@encaptechno.com"
                              className="w-full bg-[#FAF5F0]/60 border border-[#F3DEC8] rounded-xl px-3 py-1.5 text-xs font-bold text-[#15111E] outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                              Active Subscriber List Size
                            </label>
                            <select
                              value={emailListSize}
                              onChange={(e) => setEmailListSize(e.target.value)}
                              className="w-full bg-[#FAF5F0]/60 border border-[#F3DEC8] rounded-xl px-3 py-1.5 text-xs font-bold text-[#15111E] outline-none cursor-pointer"
                            >
                              <option value="Just starting (< 500)">Just starting (&lt; 500 contacts)</option>
                              <option value="500 - 2,500 subscribers">500 - 2,500 subscribers</option>
                              <option value="2,500 - 10,000 subscribers">2,500 - 10,000 subscribers</option>
                              <option value="10,000+ subscribers">10,000+ Enterprise list</option>
                            </select>
                          </div>
                        </div>

                        {/* Primary Campaign Strategy */}
                        <div className="space-y-1 pt-1">
                          <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                            Primary Email Campaign Strategy
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                            {[
                              { id: 'weekly_newsletter', label: 'Curated Newsletter' },
                              { id: 'drip_nurture', label: 'Welcome Drip Flows' },
                              { id: 'ecommerce_promos', label: 'Flash Sales & Drops' },
                              { id: 'cold_outreach', label: 'Outbound Prospecting' }
                            ].map(item => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setEmailCampaignType(item.id as any)}
                                className={`p-2 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${
                                  emailCampaignType === item.id ? 'bg-[#D94A2A] text-white shadow-xs' : 'bg-white border border-[#F3DEC8] text-[#15111E] hover:border-[#D94A2A]'
                                }`}
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Fast Setup Notice */}
                        <div className="p-2.5 rounded-xl bg-[#FFF8F4] border border-[#FAD8C7] flex items-center justify-between text-[10.5px]">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
                            <span className="text-[#6B6375] font-medium">
                              Live DNS (SPF/DKIM) records and Contact CSV import are ready when you launch your campaign.
                            </span>
                          </div>
                          <span className="text-[9.5px] font-bold text-[#EA580C] shrink-0">Fast Onboarding</span>
                        </div>
                      </div>
                    )}

                    {/* -------------------------------------------------------------
                        3. SEO SEARCH ENGINE OPTIMIZATION SUB-FORM
                        ------------------------------------------------------------- */}
                    {activeChannelTab === 'seo' && (
                      <div className="space-y-3 animate-in fade-in">
                        <div className="flex items-center justify-between border-b border-[#F5E4D5] pb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-[#10B981]/15 text-[#10B981] flex items-center justify-center font-bold">
                              <Search className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-black text-[#15111E]">SEO & Organic Keyword Optimization</h4>
                              <p className="text-[10px] text-[#6B6375]">Rank #1 for high-intent search terms and capture organic search</p>
                            </div>
                          </div>
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-[#10B981]/10 text-[#10B981]">
                            Zero Ad Spend
                          </span>
                        </div>

                        {/* Keywords Tag Box */}
                        <div className="space-y-1.5">
                          <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                            Target Buyer Keywords & Search Queries
                          </label>
                          <div className="flex flex-wrap gap-1.5">
                            {seoKeywords.map((kw) => (
                              <span key={kw} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#E6F8F0] border border-[#A7F3D0] text-[10.5px] font-bold text-[#059669]">
                                {kw}
                                <button type="button" onClick={() => removeTag(seoKeywords, setSeoKeywords, kw)} className="hover:text-rose-600">×</button>
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-2 pt-0.5">
                            <input
                              type="text"
                              value={newSeoKeyword}
                              onChange={(e) => setNewSeoKeyword(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(seoKeywords, setSeoKeywords, newSeoKeyword, setNewSeoKeyword))}
                              placeholder="Add keyword (e.g. organic cotton shirts) and hit enter..."
                              className="flex-1 bg-[#FAF5F0]/60 border border-[#F3DEC8] rounded-xl px-3 py-1.5 text-xs font-medium text-[#15111E] outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => addTag(seoKeywords, setSeoKeywords, newSeoKeyword, setNewSeoKeyword)}
                              className="px-3 py-1.5 bg-[#10B981] text-white text-xs font-bold rounded-xl"
                            >
                              Add
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {/* Target Geography */}
                          <div className="space-y-1">
                            <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                              Target Search Geography
                            </label>
                            <input
                              type="text"
                              value={seoGeography}
                              onChange={(e) => setSeoGeography(e.target.value)}
                              placeholder="e.g. United States, India, Global"
                              className="w-full bg-[#FAF5F0]/60 border border-[#F3DEC8] rounded-xl px-3 py-1.5 text-xs font-bold text-[#15111E] outline-none"
                            />
                          </div>

                          {/* SEO Primary Goal */}
                          <div className="space-y-1">
                            <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                              Primary SEO Objective
                            </label>
                            <select
                              value={seoGoal}
                              onChange={(e) => setSeoGoal(e.target.value as any)}
                              className="w-full bg-[#FAF5F0]/60 border border-[#F3DEC8] rounded-xl px-3 py-1.5 text-xs font-bold text-[#15111E] outline-none cursor-pointer"
                            >
                              <option value="ranking">Rank #1 on Google for Buyer Keywords</option>
                              <option value="organic_traffic">Scale General Organic Search Traffic</option>
                              <option value="local_seo">Local Google Maps & Business Profile</option>
                              <option value="technical_fix">Fix Site Speed & Technical Crawl Errors</option>
                            </select>
                          </div>
                        </div>

                        {/* Top Competitor Domains */}
                        <div className="space-y-1.5">
                          <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                            Top 2-3 Search Competitors
                          </label>
                          <div className="flex flex-wrap gap-1.5">
                            {seoCompetitors.map((comp) => (
                              <span key={comp} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#FAF5F0] border border-[#F3DEC8] text-[10.5px] font-bold text-[#15111E]">
                                {comp}
                                <button type="button" onClick={() => removeTag(seoCompetitors, setSeoCompetitors, comp)} className="hover:text-rose-600">×</button>
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-2 pt-0.5">
                            <input
                              type="text"
                              value={newSeoCompetitor}
                              onChange={(e) => setNewSeoCompetitor(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(seoCompetitors, setSeoCompetitors, newSeoCompetitor, setNewSeoCompetitor))}
                              placeholder="Add competitor URL (e.g. competitor.com)..."
                              className="flex-1 bg-[#FAF5F0]/60 border border-[#F3DEC8] rounded-xl px-3 py-1.5 text-xs font-medium text-[#15111E] outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => addTag(seoCompetitors, setSeoCompetitors, newSeoCompetitor, setNewSeoCompetitor)}
                              className="px-3 py-1.5 bg-[#2A0E2A] text-white text-xs font-bold rounded-xl"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* -------------------------------------------------------------
                        4. SEM / PAID ADS SUB-FORM
                        ------------------------------------------------------------- */}
                    {activeChannelTab === 'sem' && (
                      <div className="space-y-3 animate-in fade-in">
                        <div className="flex items-center justify-between border-b border-[#F5E4D5] pb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-[#F59E0B]/15 text-[#D97706] flex items-center justify-center font-bold">
                              <DollarSign className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-black text-[#15111E]">SEM & Paid Ads Funnel Setup</h4>
                              <p className="text-[10px] text-[#6B6375]">Scale high-intent paid campaigns across Google Search and Meta Ads</p>
                            </div>
                          </div>
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-[#F59E0B]/10 text-[#D97706]">
                            Fast Conversions
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {/* Monthly Budget */}
                          <div className="space-y-1">
                            <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                              Estimated Monthly Ad Budget
                            </label>
                            <select
                              value={semBudget}
                              onChange={(e) => setSemBudget(e.target.value)}
                              className="w-full bg-[#FAF5F0]/60 border border-[#F3DEC8] rounded-xl px-3 py-1.5 text-xs font-bold text-[#15111E] outline-none cursor-pointer"
                            >
                              <option value="Testing (< $500/mo)">Testing (&lt; $500 / month)</option>
                              <option value="$500 - $2,000 / month">$500 - $2,000 / month</option>
                              <option value="$2,000 - $10,000 / month">$2,000 - $10,000 / month</option>
                              <option value="$10,000+ Scaling">$10,000+ Scaling</option>
                            </select>
                          </div>

                          {/* Target CPA */}
                          <div className="space-y-1">
                            <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                              Target Cost Per Acquisition / Lead
                            </label>
                            <input
                              type="text"
                              value={semTargetCPA}
                              onChange={(e) => setSemTargetCPA(e.target.value)}
                              placeholder="e.g. $20/lead or 3.5x ROAS"
                              className="w-full bg-[#FAF5F0]/60 border border-[#F3DEC8] rounded-xl px-3 py-1.5 text-xs font-bold text-[#15111E] outline-none"
                            />
                          </div>
                        </div>

                        {/* Conversion Goal */}
                        <div className="space-y-1">
                          <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                            Primary Ad Conversion Goal
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                            {[
                              { id: 'lead_form', label: 'Lead Form Inquiries' },
                              { id: 'roas_sales', label: 'E-commerce ROAS' },
                              { id: 'traffic', label: 'Targeted Website Traffic' },
                              { id: 'app_installs', label: 'Mobile App Installs' }
                            ].map(item => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setSemGoal(item.id as any)}
                                className={`p-2 rounded-xl text-[10px] font-bold transition-all ${
                                  semGoal === item.id ? 'bg-[#D97706] text-white shadow-xs' : 'bg-white border border-[#F3DEC8] text-[#15111E] hover:border-[#D97706]'
                                }`}
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* -------------------------------------------------------------
                        5. BLOG & CONTENT MARKETING SUB-FORM
                        ------------------------------------------------------------- */}
                    {activeChannelTab === 'blog' && (
                      <div className="space-y-3 animate-in fade-in">
                        <div className="flex items-center justify-between border-b border-[#F5E4D5] pb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-[#8B5CF6]/15 text-[#7C3AED] flex items-center justify-center font-bold">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-black text-[#15111E]">Blog & Editorial Content Engine</h4>
                              <p className="text-[10px] text-[#6B6375]">Generate SEO-optimized articles, tutorials, and pillar guides</p>
                            </div>
                          </div>
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-[#8B5CF6]/10 text-[#7C3AED]">
                            Authority Engine
                          </span>
                        </div>

                        {/* Content Pillars */}
                        <div className="space-y-1.5">
                          <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                            Core Content Pillars & Article Topics
                          </label>
                          <div className="flex flex-wrap gap-1.5">
                            {blogPillars.map((p) => (
                              <span key={p} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#F3E8FF] border border-[#DDD6FE] text-[10.5px] font-bold text-[#7C3AED]">
                                {p}
                                <button type="button" onClick={() => removeTag(blogPillars, setBlogPillars, p)} className="hover:text-rose-600">×</button>
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-2 pt-0.5">
                            <input
                              type="text"
                              value={newBlogPillar}
                              onChange={(e) => setNewBlogPillar(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(blogPillars, setBlogPillars, newBlogPillar, setNewBlogPillar))}
                              placeholder="Add pillar (e.g. Industry Trends, Beginner Tutorials)..."
                              className="flex-1 bg-[#FAF5F0]/60 border border-[#F3DEC8] rounded-xl px-3 py-1.5 text-xs font-medium text-[#15111E] outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => addTag(blogPillars, setBlogPillars, newBlogPillar, setNewBlogPillar)}
                              className="px-3 py-1.5 bg-[#7C3AED] text-white text-xs font-bold rounded-xl"
                            >
                              Add
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {/* Publishing Cadence */}
                          <div className="space-y-1">
                            <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                              Publishing Cadence
                            </label>
                            <select
                              value={blogCadence}
                              onChange={(e) => setBlogCadence(e.target.value as any)}
                              className="w-full bg-[#FAF5F0]/60 border border-[#F3DEC8] rounded-xl px-3 py-1.5 text-xs font-bold text-[#15111E] outline-none cursor-pointer"
                            >
                              <option value="weekly_2_3">2 - 3 Articles per week (Recommended)</option>
                              <option value="weekly_1">1 Comprehensive Article per week</option>
                              <option value="daily">Daily Publishing (High Output)</option>
                              <option value="bi_weekly">Bi-weekly (2 per month)</option>
                            </select>
                          </div>

                          {/* Content Format */}
                          <div className="space-y-1">
                            <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                              Primary Article Style
                            </label>
                            <select
                              value={blogContentType}
                              onChange={(e) => setBlogContentType(e.target.value as any)}
                              className="w-full bg-[#FAF5F0]/60 border border-[#F3DEC8] rounded-xl px-3 py-1.5 text-xs font-bold text-[#15111E] outline-none cursor-pointer"
                            >
                              <option value="how_to_guides">Actionable How-To & Implementation Guides</option>
                              <option value="industry_insights">Deep Industry Analysis & Market Trends</option>
                              <option value="case_studies">Customer Case Studies & ROI Breakdowns</option>
                              <option value="thought_leadership">Founder Opinions & Vision Pieces</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* -------------------------------------------------------------
                        6. WHATSAPP MARKETING SUB-FORM
                        ------------------------------------------------------------- */}
                    {activeChannelTab === 'whatsapp' && (
                      <div className="space-y-3 animate-in fade-in">
                        <div className="flex items-center justify-between border-b border-[#F5E4D5] pb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-[#25D366]/15 text-[#16A34A] flex items-center justify-center font-bold">
                              <MessageSquare className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-black text-[#15111E]">WhatsApp Direct Marketing & Alerts</h4>
                              <p className="text-[10px] text-[#6B6375]">Reach customers with 98% open rates for flash deals and alerts</p>
                            </div>
                          </div>
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-[#25D366]/10 text-[#16A34A]">
                            Direct Chat
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {/* Business Number */}
                          <div className="space-y-1">
                            <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                              WhatsApp Business Number / Sender
                            </label>
                            <input
                              type="text"
                              value={whatsappNumber}
                              onChange={(e) => setWhatsappNumber(e.target.value)}
                              placeholder="+91 98765 43210"
                              className="w-full bg-[#FAF5F0]/60 border border-[#F3DEC8] rounded-xl px-3 py-1.5 text-xs font-bold text-[#15111E] outline-none"
                            />
                          </div>

                          {/* Opt-In Base */}
                          <div className="space-y-1">
                            <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                              Opt-In Contact List Size
                            </label>
                            <select
                              value={whatsappOptInCount}
                              onChange={(e) => setWhatsappOptInCount(e.target.value)}
                              className="w-full bg-[#FAF5F0]/60 border border-[#F3DEC8] rounded-xl px-3 py-1.5 text-xs font-bold text-[#15111E] outline-none cursor-pointer"
                            >
                              <option value="< 500 contacts">&lt; 500 Opt-in contacts</option>
                              <option value="500 - 2,500 contacts">500 - 2,500 contacts</option>
                              <option value="2,500 - 10,000 contacts">2,500 - 10,000 contacts</option>
                              <option value="10,000+ Enterprise">10,000+ Enterprise</option>
                            </select>
                          </div>
                        </div>

                        {/* WhatsApp Campaign Type */}
                        <div className="space-y-1">
                          <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                            Primary WhatsApp Use Case
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                            {[
                              { id: 'promotional_broadcasts', label: 'Flash Deals Broadcast' },
                              { id: 'abandoned_cart_recovery', label: 'Abandoned Cart Ping' },
                              { id: 'order_updates', label: 'Order & Shipping Alerts' },
                              { id: 'support_crm', label: '24/7 AI Support Bot' }
                            ].map(item => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setWhatsappType(item.id as any)}
                                className={`p-2 rounded-xl text-[10px] font-bold transition-all ${
                                  whatsappType === item.id ? 'bg-[#16A34A] text-white shadow-xs' : 'bg-white border border-[#F3DEC8] text-[#15111E] hover:border-[#16A34A]'
                                }`}
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* -------------------------------------------------------------
                        7. SOCIAL MEDIA (INSTAGRAM/X) SUB-FORM
                        ------------------------------------------------------------- */}
                    {activeChannelTab === 'social' && (
                      <div className="space-y-3 animate-in fade-in">
                        <div className="flex items-center justify-between border-b border-[#F5E4D5] pb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-[#EC4899]/15 text-[#DB2777] flex items-center justify-center font-bold">
                              <Share2 className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-black text-[#15111E]">Social Media (Instagram, Meta, X)</h4>
                              <p className="text-[10px] text-[#6B6375]">Short-form Reels, visual carousels, and viral audience reach</p>
                            </div>
                          </div>
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-[#EC4899]/10 text-[#DB2777]">
                            Viral Growth
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {/* Visual Aesthetic */}
                          <div className="space-y-1">
                            <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                              Visual Aesthetic & Vibe
                            </label>
                            <select
                              value={socialAesthetic}
                              onChange={(e) => setSocialAesthetic(e.target.value as any)}
                              className="w-full bg-[#FAF5F0]/60 border border-[#F3DEC8] rounded-xl px-3 py-1.5 text-xs font-bold text-[#15111E] outline-none cursor-pointer"
                            >
                              <option value="minimalist_clean">Minimalist, Editorial & Clean</option>
                              <option value="vibrant_bold">Vibrant, Punchy & High-Contrast</option>
                              <option value="corporate_sleek">Corporate, Trustworthy & Sleek</option>
                              <option value="warm_lifestyle">Warm, Organic & Lifestyle</option>
                            </select>
                          </div>

                          {/* Content Format Focus */}
                          <div className="space-y-1">
                            <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                              Primary Format Focus
                            </label>
                            <select
                              value={socialFocus}
                              onChange={(e) => setSocialFocus(e.target.value as any)}
                              className="w-full bg-[#FAF5F0]/60 border border-[#F3DEC8] rounded-xl px-3 py-1.5 text-xs font-bold text-[#15111E] outline-none cursor-pointer"
                            >
                              <option value="reels_short_video">Short-Form Video (Reels & Shorts)</option>
                              <option value="visual_carousels">Multi-Slide Educational Carousels</option>
                              <option value="stories_community">Interactive Story Polls & Community</option>
                              <option value="influencer_collab">Influencer & Creator Collaborations</option>
                            </select>
                          </div>
                        </div>

                        {/* Posting Cadence */}
                        <div className="space-y-1">
                          <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                            Posting Frequency
                          </label>
                          <div className="grid grid-cols-3 gap-1.5">
                            {[
                              { id: 'daily', label: 'Daily (7 posts/wk)' },
                              { id: '3_times_week', label: '3 - 4 posts / week' },
                              { id: 'weekly', label: 'Weekly Roundup' }
                            ].map(item => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setSocialCadence(item.id as any)}
                                className={`p-2 rounded-xl text-[10px] font-bold transition-all ${
                                  socialCadence === item.id ? 'bg-[#DB2777] text-white shadow-xs' : 'bg-white border border-[#F3DEC8] text-[#15111E] hover:border-[#DB2777]'
                                }`}
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3 Sub-Navigation Controls */}
                    {selectedChannels.length > 1 && (
                      <div className="flex items-center justify-between pt-2 border-t border-[#F5E4D5]/80">
                        {(() => {
                          const activeIdx = Math.max(0, selectedChannels.indexOf(activeChannelTab));
                          const prevChId = activeIdx > 0 ? selectedChannels[activeIdx - 1] : null;
                          const nextChId = activeIdx < selectedChannels.length - 1 ? selectedChannels[activeIdx + 1] : null;
                          const prevMeta = prevChId ? MARKETING_CHANNELS.find(c => c.id === prevChId) : null;
                          const nextMeta = nextChId ? MARKETING_CHANNELS.find(c => c.id === nextChId) : null;

                          return (
                            <>
                              {prevChId ? (
                                <button
                                  type="button"
                                  onClick={() => setActiveChannelTab(prevChId)}
                                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-[#F3DEC8] hover:bg-[#FAF5F0] text-xs font-bold text-[#6B5E77] hover:text-[#15111E] cursor-pointer transition-all"
                                >
                                  <ArrowLeft className="w-3.5 h-3.5" />
                                  <span>Previous: {prevMeta?.title.split(' ')[0] || prevChId}</span>
                                </button>
                              ) : (
                                <div />
                              )}

                              {nextChId ? (
                                <button
                                  type="button"
                                  onClick={() => setActiveChannelTab(nextChId)}
                                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#8C1F3D] to-[#EA580C] hover:from-[#731831] hover:to-[#C03B1E] text-white text-xs font-black shadow-sm hover:shadow-md cursor-pointer transition-all"
                                >
                                  <span>Next Channel: {nextMeta?.title.split(' ')[0] || nextChId}</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={handleNextStep}
                                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-xs font-black shadow-sm cursor-pointer transition-all"
                                >
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  <span>All Channels Set • Next Step</span>
                                </button>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    )}

                  </div>

                </motion.div>
              )}

              {/* =========================================================================
                  STEP 4: TARGET AUDIENCE, GROWTH GOAL & BRAND TONE
                  ========================================================================= */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3.5 w-full text-left"
                >
                  <div>
                    <span className="text-[10.5px] font-black text-[#EA580C] block">
                      Step 4 • Audience & Persona
                    </span>
                    <h2 className="text-xl sm:text-[22px] font-black text-[#15111E] tracking-tight mt-0.5">
                      Target Audience & Brand Voice
                    </h2>
                  </div>

                  {/* 2-Column: Audience Type & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Audience Type */}
                    <div className="bg-[#FFFDFB] border border-[#F5E4D5] rounded-xl p-2.5">
                      <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block mb-1">
                        Audience Model
                      </label>
                      <div className="grid grid-cols-3 gap-1">
                        {(['B2B', 'B2C', 'Both'] as const).map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setTargetAudienceType(type)}
                            className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              targetAudienceType === type
                                ? 'bg-[#EA580C] text-white shadow-xs'
                                : 'bg-white border border-[#E8D8CA] text-[#554E60] hover:border-[#EA580C]'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Primary Growth Goal */}
                    <div className="bg-[#FFFDFB] border border-[#F5E4D5] rounded-xl p-2.5">
                      <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block mb-1">
                        Primary Growth Goal
                      </label>
                      <select
                        value={growthGoal}
                        onChange={(e) => setGrowthGoal(e.target.value as any)}
                        className="w-full bg-transparent text-xs font-bold text-[#15111E] outline-none cursor-pointer mt-0.5"
                      >
                        <option value="leads">Generate Qualified B2B / Sales Leads</option>
                        <option value="sales">Drive Direct Online E-commerce Sales</option>
                        <option value="awareness">Build Wide Brand Awareness & Reach</option>
                        <option value="retention">Customer Retention & Repeat Orders</option>
                        <option value="launch">New Product / Service Launch</option>
                      </select>
                    </div>
                  </div>

                  {/* Target Market Location */}
                  <div className="bg-[#FFFDFB] border border-[#F5E4D5] rounded-xl p-2.5">
                    <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block mb-0.5">
                      Target Market Geography & Language
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Global / North America & India"
                      className="w-full bg-transparent text-xs font-bold text-[#15111E] outline-none"
                    />
                  </div>

                  {/* Target Audience Persona Description */}
                  <div className="bg-[#FFFDFB] border border-[#F5E4D5] rounded-xl p-2.5">
                    <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block mb-0.5">
                      Audience Persona & Pain Points
                    </label>
                    <input
                      type="text"
                      value={targetAudienceDesc}
                      onChange={(e) => setTargetAudienceDesc(e.target.value)}
                      placeholder="e.g. Mid-to-senior business executives and brand owners seeking high ROI..."
                      className="w-full bg-transparent text-xs font-medium text-[#15111E] outline-none placeholder:text-slate-400"
                    />
                  </div>

                  {/* Tone of Voice */}
                  <div className="space-y-1">
                    <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                      Brand Tone of Voice
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                      {[
                        { id: 'professional', label: 'Professional & Authoritative' },
                        { id: 'friendly', label: 'Warm & Approachable' },
                        { id: 'premium', label: 'Luxurious & Exclusive' },
                        { id: 'casual', label: 'Casual & Conversational' }
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setSelectedTone(t.id)}
                          className={`p-2 rounded-xl text-[10.5px] font-bold transition-all cursor-pointer ${
                            selectedTone === t.id
                              ? 'bg-[#8C1F3D] text-white shadow-xs'
                              : 'bg-[#FFFDFB] border border-[#F5E4D5] text-[#15111E] hover:border-[#8C1F3D]'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* =========================================================================
                  STEP 5: AI CUSTOMIZED BLUEPRINT & LAUNCH
                  ========================================================================= */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3.5 w-full text-left"
                >
                  <div className="text-center space-y-1">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#EA580C] to-[#8C1F3D] text-white flex items-center justify-center mx-auto shadow-md">
                      <Rocket className="w-5 h-5" />
                    </div>
                    <span className="text-[10.5px] font-black text-[#EA580C] block">
                      Step 5 • AI Blueprint Ready
                    </span>
                    <h2 className="text-xl sm:text-[22px] font-black text-[#15111E] tracking-tight">
                      Your Omnichannel Strategy Blueprint is Ready!
                    </h2>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-[#FFF9F5] border border-[#F5E4D5] rounded-2xl p-3.5 space-y-2.5 max-h-[310px] overflow-y-auto pr-1">
                    <div className="flex items-center justify-between border-b border-[#F5E4D5] pb-2">
                      <div>
                        <span className="text-[8.5px] font-black text-[#8A8294] uppercase">Workspace</span>
                        <h4 className="text-xs font-black text-[#15111E]">{workspaceName}</h4>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#EA580C]/10 text-[#EA580C] text-[9.5px] font-black uppercase">
                        {growthGoal.toUpperCase()} FOCUS
                      </span>
                    </div>

                    {/* Channel Specific Tactical Action Cards */}
                    <div className="space-y-2">
                      <span className="text-[9px] font-black uppercase tracking-wider text-[#6B5E77] block">
                        Tailored 30-Day Tactical Playbooks ({selectedChannels.length} Channels)
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedChannels.map(ch => {
                          const chMeta = MARKETING_CHANNELS.find(c => c.id === ch);
                          const Icon = chMeta?.icon || Megaphone;

                          let summaryDetail = '';
                          if (ch === 'linkedin') {
                            summaryDetail = `Targeting ${linkedinRoles.slice(0, 2).join(' & ')} across ${linkedinIndustries[0] || 'tech'} with ${linkedinGoal.replace(/_/g, ' ')}.`;
                          } else if (ch === 'email') {
                            summaryDetail = `Automated ${emailCampaignType.replace(/_/g, ' ')} sent ${emailCadence} to ${emailListSize}.`;
                          } else if (ch === 'seo') {
                            summaryDetail = `Optimizing ${seoKeywords.length} focus keywords (${seoKeywords.slice(0, 2).join(', ')}) targeting ${seoGeography}.`;
                          } else if (ch === 'sem') {
                            summaryDetail = `${semBudget} ad budget allocated towards ${semGoal.replace(/_/g, ' ')} across Google & Meta.`;
                          } else if (ch === 'blog') {
                            summaryDetail = `${blogCadence.replace(/_/g, ' ')} articles covering ${blogPillars.slice(0, 2).join(' & ')}.`;
                          } else if (ch === 'whatsapp') {
                            summaryDetail = `Broadcast automation for ${whatsappType.replace(/_/g, ' ')} reaching ${whatsappOptInCount}.`;
                          } else if (ch === 'social') {
                            summaryDetail = `${socialCadence.replace(/_/g, ' ')} ${socialFocus.replace(/_/g, ' ')} in ${socialAesthetic.replace(/_/g, ' ')} style.`;
                          }

                          return (
                            <div key={ch} className="p-2.5 rounded-xl bg-white border border-[#F3DEC8] flex items-start gap-2 shadow-3xs">
                              <div className="w-6 h-6 rounded-lg bg-[#FAF5F0] text-[#8C1F3D] border border-[#F3DEC8] flex items-center justify-center shrink-0 mt-0.5">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <div className="min-w-0">
                                <h5 className="text-[11px] font-black text-[#15111E] capitalize">{chMeta?.title || ch}</h5>
                                <p className="text-[9.5px] text-[#6B6375] font-medium leading-snug mt-0.5 line-clamp-2">
                                  {summaryDetail}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Recommended First AI Action */}
                    <div className="p-2.5 rounded-xl bg-gradient-to-r from-[#2A0E2A] to-[#45143C] text-white space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#FFD188]" />
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#FFD188]">
                          1st Autonomous Action Scheduled
                        </span>
                      </div>
                      <p className="text-[10.5px] text-white/90 leading-snug font-medium">
                        Launch automated {selectedChannels.slice(0, 2).map(c => c.toUpperCase()).join(' & ')} campaign series to capture immediate {growthGoal} boost.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

          </div>

        </div>

        {/* ========================================================
            FULL-WIDTH CANVAS FOOTER (ACROSS ENTIRE BOTTOM)
            ======================================================== */}
        <div className="w-full px-6 sm:px-8 py-3.5 border-t border-[#F3DEC8] bg-[#FFFDFC] flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold italic text-[#8C1F3D]">
              {currentStep === 5 ? 'Ready for takeoff!' : 'Step ' + currentStep + ' of 5'}
            </span>
            <span className="text-xs font-bold text-[#8C1F3D]">➔</span>
          </div>

          {/* Progress Slider Track */}
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-[11px] font-black text-[#15111E]">
              Step {currentStep} of 5
            </span>
            <div className="w-32 h-2 bg-[#F5E4D5] rounded-full overflow-hidden p-0.5">
              <motion.div
                className="h-full bg-gradient-to-r from-[#EA580C] to-[#8C1F3D] rounded-full"
                animate={{ width: `${(currentStep / 5) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
            <span className="text-[11px] font-black text-[#EA580C]">
              {Math.round((currentStep / 5) * 100)}%
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="text-xs font-bold text-[#7A7285] hover:text-[#15111E] cursor-pointer px-2 py-1.5 transition-colors"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handleSkip}
              className="text-xs font-bold text-[#7A7285] hover:text-[#15111E] cursor-pointer px-2 py-1.5 transition-colors"
            >
              Skip for now
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 sm:px-7 py-2.5 rounded-full bg-gradient-to-r from-[#EA580C] to-[#8C1F3D] text-white text-xs font-black shadow-md hover:shadow-lg hover:scale-102 active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{currentStep === 5 ? 'Launch AI Hub' : 'Continue'}</span>
              <span>➔</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Onboarding;
