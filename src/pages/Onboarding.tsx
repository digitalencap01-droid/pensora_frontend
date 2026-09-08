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
  ArrowRight,
  Store,
  Coffee,
  Palette,
  Briefcase,
  TrendingUp,
  Megaphone,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { useMarketing } from '../context/MarketingContext';

// Categories list
const CATEGORIES = [
  'E-commerce / Retail',
  'SaaS & Software',
  'Digital Marketing Agency',
  'Consulting & Professional Services',
  'Health & Wellness',
  'Food & Beverage',
  'Education & Coaching',
  'Real Estate & Construction'
];

// Team Sizes list
const TEAM_SIZES = [
  'Just me (Solo)',
  '2 - 10 Members',
  '11 - 50 Members',
  '51 - 200 Members',
  '200+ Members'
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

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const {
    business,
    updateWorkspace,
    completeOnboarding
  } = useMarketing();

  // Active step (1 to 5)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Workspace Basics
  const [workspaceName, setWorkspaceName] = useState<string>(business?.name || 'Bloom Boutique');
  const [websiteUrl, setWebsiteUrl] = useState<string>(business?.website || 'https://bloomboutique.shop');
  const [category, setCategory] = useState<string>(business?.industry || 'E-commerce / Retail');
  const [teamSize, setTeamSize] = useState<string>('2 - 10 Members');
  const [description, setDescription] = useState<string>(
    business?.description || 'Handcrafted eco-friendly clothing for minimalist wardrobes.'
  );
  const [selectedStyle, setSelectedStyle] = useState<string>('bloom');

  // Step 2: Website Scan State
  const [scanProgress, setScanProgress] = useState<number>(0);

  // Step 3: Products & Goals State (from old onboarding)
  const [productsList, setProductsList] = useState<string[]>(
    business?.productsServices?.length ? business.productsServices : ['Organic Cotton Tees', 'Eco-friendly Hoodies', 'Linen Trousers', 'Sustainable Tote Bags']
  );
  const [newProductInput, setNewProductInput] = useState<string>('');
  const [growthGoal, setGrowthGoal] = useState<'sales' | 'leads' | 'awareness' | 'retention' | 'launch'>(
    (business?.growthGoal as any) || 'sales'
  );

  // Step 4: Market, Audience, Channels & Tone State (from old onboarding)
  const [targetAudienceType, setTargetAudienceType] = useState<'B2C' | 'B2B' | 'Both'>(
    business?.targetAudienceType || 'B2C'
  );
  const [location, setLocation] = useState<string>(business?.location || 'Global / North America & Europe');
  const [targetAudienceDesc, setTargetAudienceDesc] = useState<string>(
    business?.targetAudienceDesc || 'Eco-conscious urban professionals aged 24-42 looking for minimalist, sustainable fashion.'
  );
  const [selectedChannels, setSelectedChannels] = useState<string[]>(
    business?.channels?.length ? business.channels : ['instagram', 'facebook', 'google', 'email']
  );
  const [selectedTone, setSelectedTone] = useState<string>(business?.toneOfVoice || 'friendly');

  useEffect(() => {
    if (business?.name && !workspaceName) setWorkspaceName(business.name);
    if (business?.website && !websiteUrl) setWebsiteUrl(business.website);
  }, [business, workspaceName, websiteUrl]);

  // Handle adding product tag
  const handleAddProduct = () => {
    if (newProductInput.trim() && !productsList.includes(newProductInput.trim())) {
      setProductsList([...productsList, newProductInput.trim()]);
      setNewProductInput('');
    }
  };

  const handleRemoveProduct = (prod: string) => {
    setProductsList(productsList.filter((p) => p !== prod));
  };

  const handleNextStep = () => {
    // Save state at each transition
    if (business?.id) {
      updateWorkspace(business.id, {
        name: workspaceName,
        website: websiteUrl,
        industry: category,
        description: description,
        productsServices: productsList,
        growthGoal: growthGoal,
        location: location,
        targetMarket: location,
        targetAudienceType: targetAudienceType,
        targetAudienceDesc: targetAudienceDesc,
        channels: selectedChannels,
        toneOfVoice: selectedTone as any
      });
    }

    if (currentStep === 1) {
      setCurrentStep(2);
      // Trigger scan animation
      setScanProgress(0);
      let p = 0;
      const interval = setInterval(() => {
        p += 25;
        setScanProgress(p);
        if (p >= 100) {
          clearInterval(interval);
        }
      }, 250);
    } else if (currentStep < 5) {
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
      className="min-h-screen bg-[#FEF7F1] py-4 sm:py-8 px-2 sm:px-6 lg:px-8 flex items-center justify-center font-sans antialiased text-[#15111E] select-none relative overflow-hidden"
      style={{
        backgroundImage: "url('/onboarding-main-bg-crisp.jpg')",
        backgroundPosition: 'center bottom',
        backgroundSize: '100% auto',
        backgroundRepeat: 'no-repeat'
      }}
    >
      
      {/* Master Framed Onboarding Canvas */}
      <div className="max-w-[1140px] w-full bg-[#FFFDFC]/95 backdrop-blur-sm rounded-[32px] sm:rounded-[38px] border border-[#F3DEC8] shadow-[0_25px_70px_rgba(75,29,107,0.12)] overflow-hidden flex flex-col justify-between min-h-[640px] relative">
        
        {/* ========================================================
            TOP & MID CONTENT: 2-PANEL UNIFIED FLEX LAYOUT
            ======================================================== */}
        <div className="flex flex-col lg:flex-row items-stretch relative z-10 flex-1">
          
          {/* ========================================================
              PANEL 1: LEFT FULL-BLEED 3D ARTWORK PANEL
              ======================================================== */}
          <div className="w-full lg:w-[370px] xl:w-[380px] shrink-0 min-h-[560px] p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden bg-white">
            
            {/* Full Master Artwork Background */}
            <img
              src="/onboarding-left-tight.jpg"
              alt="AI Workspace Artwork"
              className="absolute inset-0 w-full h-full object-cover object-left-top pointer-events-none select-none"
            />

            {/* Top Content: Logo, Tag & Headline */}
            <div className="relative z-10">
              {/* Brand Logo Header */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#EA580C] to-[#8C1F3D] flex items-center justify-center text-white shadow-xs">
                  <span className="font-black text-base">✦</span>
                </div>
                <span className="font-black text-2xl tracking-tight text-[#15111E]">
                  webobuzz
                </span>
              </div>

              {/* Tag & Title */}
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#EA580C] mt-5 block">
                AURA SETUP
              </span>
              <h1 className="text-3xl sm:text-[34px] font-black text-[#15111E] tracking-tight leading-[1.06] mt-1.5">
                Let's build <br />
                your <span className="text-[#8C1F3D]">AI</span> <br />
                workspace
              </h1>
            </div>

            {/* Bottom Content: Enterprise Security Callout Floating Card */}
            <div className="relative z-10 mt-auto pt-10">
              <div className="rounded-2xl bg-white/85 backdrop-blur-md border border-[#F3DEC8]/90 p-3 sm:p-3.5 flex items-start gap-3 shadow-[0_6px_16px_rgba(75,29,107,0.05)] max-w-[300px]">
                <div className="w-8 h-8 rounded-xl bg-[#8C1F3D]/10 text-[#8C1F3D] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4.5 h-4.5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-black text-[#15111E]">
                    Enterprise-Grade Security
                  </h4>
                  <p className="text-[10px] text-[#7A7285] leading-snug font-medium">
                    Your data is safe with us. We use enterprise-grade security to protect your information.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              PANEL 2: CENTER INTERACTIVE ONBOARDING FORM
              ======================================================== */}
          <div className="flex-1 min-w-0 p-6 sm:p-8 flex flex-col justify-start space-y-4 bg-white z-10">
            
            {/* 5-Step Horizontal Breadcrumb Header Bar */}
            <div className="flex items-center justify-between relative pt-1 pb-1 overflow-x-auto w-full select-none">
              {[
                { step: 1, label: 'Discover', icon: Sparkles },
                { step: 2, label: 'Website', icon: Globe },
                { step: 3, label: 'Goals', icon: Target },
                { step: 4, label: 'Preferences', icon: Sliders },
                { step: 5, label: 'Ready to Launch', icon: Rocket }
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
                      <div className="flex-1 max-w-[28px] sm:max-w-[48px] border-t-2 border-dotted border-[#D8C7B5] mx-1 sm:mx-2 mt-[-16px]" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Step Dynamic Content Switching */}
            <AnimatePresence mode="wait">
              
              {/* STEP 1: DISCOVER / TELL US ABOUT YOUR BUSINESS */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3.5 w-full"
                >
                  {/* Step Title */}
                  <div>
                    <span className="text-[10.5px] font-black text-[#EA580C] block">
                      Step 1
                    </span>
                    <h2 className="text-xl sm:text-[23px] font-black text-[#15111E] tracking-tight mt-0.5">
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
                          placeholder="e.g. Bloom Boutique"
                          className="w-full bg-transparent text-xs font-bold text-[#15111E] outline-hidden placeholder:text-slate-400 mt-0.5"
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
                          Website URL (Optional)
                        </label>
                        <input
                          type="url"
                          value={websiteUrl}
                          onChange={(e) => setWebsiteUrl(e.target.value)}
                          placeholder="https://bloomboutique.shop"
                          className="w-full bg-transparent text-xs font-bold text-[#15111E] outline-hidden placeholder:text-slate-400 mt-0.5"
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
                          Business Category
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full bg-transparent text-xs font-bold text-[#15111E] outline-hidden cursor-pointer mt-0.5"
                        >
                          {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Field 4: Team Size */}
                    <div className="bg-[#FFFDFB] border border-[#F5E4D5] rounded-xl p-2.5 sm:p-3 flex items-center gap-2.5 shadow-[0_2px_6px_rgba(0,0,0,0.02)] focus-within:border-[#EA580C] transition-all">
                      <div className="w-8 h-8 rounded-lg bg-[#FFF0E5] text-[#EA580C] flex items-center justify-center shrink-0">
                        <Users className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                          Team Size
                        </label>
                        <select
                          value={teamSize}
                          onChange={(e) => setTeamSize(e.target.value)}
                          className="w-full bg-transparent text-xs font-bold text-[#15111E] outline-hidden cursor-pointer mt-0.5"
                        >
                          {TEAM_SIZES.map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                      </div>
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
                          Short Description
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
                      placeholder="Describe what your business does..."
                      className="w-full bg-transparent text-xs font-medium text-[#15111E] outline-hidden placeholder:text-slate-400 resize-none leading-relaxed mt-0.5"
                    />
                  </div>

                  {/* Workspace Style Picker */}
                  <div className="space-y-1.5 pt-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-[#15111E]">
                        Pick a workspace style (optional)
                      </span>
                      <span className="text-[10px] font-bold text-[#EA580C] hover:underline cursor-pointer flex items-center gap-1">
                        See all styles ➔
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
                            className={`p-2 sm:p-2.5 rounded-xl border text-left transition-all duration-300 relative flex flex-col justify-between h-18 sm:h-19 cursor-pointer ${
                              isSelected
                                ? `${style.bgColor} ${style.textColor} border-transparent shadow-md scale-102`
                                : `${style.bgColor} ${style.textColor} border-[#F3DEC8] hover:border-[#EA580C]`
                            }`}
                          >
                            {/* Selected Checkmark Badge */}
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

              {/* STEP 2: WEBSITE SCAN / ANALYSIS */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 py-1 w-full"
                >
                  <div>
                    <span className="text-[10.5px] font-black text-[#EA580C] block">Step 2</span>
                    <h2 className="text-xl sm:text-[23px] font-black text-[#15111E] tracking-tight mt-0.5">
                      Analyzing your website & footprint
                    </h2>
                  </div>

                  <div className="bg-[#FFF9F5] border border-[#F5E4D5] rounded-2xl p-5 text-center space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#EA580C] to-[#8C1F3D] text-white flex items-center justify-center mx-auto shadow-md animate-pulse">
                      <Globe className="w-6 h-6" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-black text-[#15111E]">
                        Scanning: {websiteUrl}
                      </h3>
                      <p className="text-[11px] text-[#6B6375] font-medium max-w-md mx-auto">
                        Extracting brand colors, product catalog structure, SEO meta-tags, and conversion leaks.
                      </p>
                    </div>

                    {/* Progress Fill Bar */}
                    <div className="space-y-1.5 max-w-xs mx-auto">
                      <div className="h-2.5 w-full bg-slate-200/80 rounded-full overflow-hidden p-0.5">
                        <div
                          className="h-full bg-gradient-to-r from-[#EA580C] to-[#8C1F3D] rounded-full transition-all duration-500"
                          style={{ width: `${scanProgress}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-black text-[#EA580C]">
                        {scanProgress}% Completed
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5 pt-1">
                      <div className="p-2.5 rounded-xl bg-white border border-[#F3DEC8] text-left">
                        <span className="text-[8.5px] font-black text-[#8A8294] block uppercase">Products Found</span>
                        <span className="text-sm font-black text-[#15111E]">48 Items</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-[#F3DEC8] text-left">
                        <span className="text-[8.5px] font-black text-[#8A8294] block uppercase">SEO Health</span>
                        <span className="text-sm font-black text-[#8C1F3D]">92 / 100</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-[#F3DEC8] text-left">
                        <span className="text-[8.5px] font-black text-[#8A8294] block uppercase">Speed Index</span>
                        <span className="text-sm font-black text-[#EA580C]">1.2s Fast</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: PRODUCTS & GOALS SELECTOR (FROM OLD ONBOARDING) */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 py-1 w-full"
                >
                  <div>
                    <span className="text-[10.5px] font-black text-[#EA580C] block">Step 3</span>
                    <h2 className="text-xl sm:text-[23px] font-black text-[#15111E] tracking-tight mt-0.5">
                      Products & Primary Growth Goal
                    </h2>
                  </div>

                  {/* Products / Services Tag Box */}
                  <div className="bg-[#FFFDFB] border border-[#F5E4D5] rounded-xl p-3 space-y-2">
                    <label className="text-[9px] font-black text-[#8A8294] uppercase tracking-wider block">
                      Products & Services Offered
                    </label>
                    
                    {/* Tags List */}
                    <div className="flex flex-wrap gap-1.5">
                      {productsList.map((prod) => (
                        <span
                          key={prod}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FFF0E5] border border-[#F3DEC8] text-xs font-bold text-[#EA580C]"
                        >
                          {prod}
                          <button
                            type="button"
                            onClick={() => handleRemoveProduct(prod)}
                            className="text-[#EA580C]/70 hover:text-[#EA580C] cursor-pointer"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>

                    {/* Add Product Input */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        value={newProductInput}
                        onChange={(e) => setNewProductInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddProduct())}
                        placeholder="Type product/service and press Enter..."
                        className="flex-1 bg-white border border-[#E8D8CA] rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#15111E] outline-hidden placeholder:text-slate-400"
                      />
                      <button
                        type="button"
                        onClick={handleAddProduct}
                        className="px-3 py-1.5 rounded-lg bg-[#EA580C] text-white text-xs font-bold hover:bg-[#D94A6B] transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Growth Goals Radio Cards */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-[#8A8294] uppercase tracking-wider block">
                      Select Primary Growth Goal
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        { id: 'sales', label: 'Drive Direct Online Sales', desc: 'Boost checkout rates and cart volume', icon: TrendingUp },
                        { id: 'leads', label: 'Generate High-Quality Leads', desc: 'Capture qualified buyers & inquiries', icon: Target },
                        { id: 'awareness', label: 'Build Brand Awareness', desc: 'Expand social reach and impressions', icon: Megaphone },
                        { id: 'retention', label: 'Customer Retention & Loyalty', desc: 'Re-engage past purchasers & reviews', icon: Users }
                      ].map((g) => {
                        const isSelected = growthGoal === g.id;
                        const GIcon = g.icon;

                        return (
                          <div
                            key={g.id}
                            onClick={() => setGrowthGoal(g.id as any)}
                            className={`p-2.5 rounded-xl border cursor-pointer transition-all duration-200 flex items-start gap-2.5 ${
                              isSelected
                                ? 'bg-[#FFF0E5] border-[#EA580C] ring-2 ring-[#EA580C]/15 shadow-xs'
                                : 'bg-[#FFFDFB] border-[#F5E4D5] hover:border-[#EA580C]'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-[#EA580C] text-white' : 'bg-white text-[#EA580C] border border-[#F3DEC8]'
                            }`}>
                              <GIcon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-black text-[#15111E]">{g.label}</h4>
                              <p className="text-[9.5px] text-[#7A7285] font-medium leading-tight mt-0.5">{g.desc}</p>
                            </div>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                              isSelected ? 'bg-[#EA580C] border-[#EA580C] text-white' : 'border-slate-300 bg-white'
                            }`}>
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: MARKET, AUDIENCE, CHANNELS & TONE (FROM OLD ONBOARDING) */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3.5 py-1 w-full"
                >
                  <div>
                    <span className="text-[10.5px] font-black text-[#EA580C] block">Step 4</span>
                    <h2 className="text-xl sm:text-[23px] font-black text-[#15111E] tracking-tight mt-0.5">
                      Target Audience, Channels & Tone
                    </h2>
                  </div>

                  {/* 2-Column: Audience Type & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Audience Type */}
                    <div className="bg-[#FFFDFB] border border-[#F5E4D5] rounded-xl p-2.5">
                      <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block mb-1.5">
                        Target Audience Type
                      </label>
                      <div className="grid grid-cols-3 gap-1">
                        {(['B2C', 'B2B', 'Both'] as const).map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setTargetAudienceType(type)}
                            className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
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

                    {/* Target Market Location */}
                    <div className="bg-[#FFFDFB] border border-[#F5E4D5] rounded-xl p-2.5">
                      <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block">
                        Target Market / Location
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Global / North America"
                        className="w-full bg-transparent text-xs font-bold text-[#15111E] outline-hidden mt-1"
                      />
                    </div>
                  </div>

                  {/* Target Audience Description */}
                  <div className="bg-[#FFFDFB] border border-[#F5E4D5] rounded-xl p-2.5">
                    <label className="text-[8.5px] font-black text-[#8A8294] uppercase tracking-wider block mb-0.5">
                      Target Audience Persona
                    </label>
                    <input
                      type="text"
                      value={targetAudienceDesc}
                      onChange={(e) => setTargetAudienceDesc(e.target.value)}
                      placeholder="e.g. Eco-conscious professionals looking for minimalist fashion"
                      className="w-full bg-transparent text-xs font-medium text-[#15111E] outline-hidden placeholder:text-slate-400"
                    />
                  </div>

                  {/* Channels Selection */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-[#8A8294] uppercase tracking-wider block">
                      Active Marketing Channels
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                      {['Instagram', 'Facebook', 'Google Search', 'TikTok', 'LinkedIn', 'Email', 'YouTube', 'Pinterest'].map((ch) => {
                        const isCh = selectedChannels.includes(ch.toLowerCase());
                        return (
                          <button
                            key={ch}
                            type="button"
                            onClick={() => {
                              setSelectedChannels((prev) =>
                                prev.includes(ch.toLowerCase())
                                  ? prev.filter((x) => x !== ch.toLowerCase())
                                  : [...prev, ch.toLowerCase()]
                              );
                            }}
                            className={`p-1.5 rounded-lg border text-[11px] font-bold transition-all cursor-pointer ${
                              isCh
                                ? 'bg-[#2A0E2A] text-white border-transparent shadow-xs'
                                : 'bg-[#FFFDFB] border-[#F5E4D5] text-[#15111E] hover:border-[#EA580C]'
                            }`}
                          >
                            {ch}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tone of Voice */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-[#8A8294] uppercase tracking-wider block">
                      Brand Tone of Voice
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'friendly', label: 'Friendly & Warm' },
                        { id: 'professional', label: 'Professional & Authority' },
                        { id: 'premium', label: 'Luxurious & Exclusive' }
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setSelectedTone(t.id)}
                          className={`p-1.5 rounded-lg border text-[11px] font-bold transition-all cursor-pointer ${
                            selectedTone === t.id
                              ? 'bg-[#8C1F3D] text-white border-transparent shadow-xs'
                              : 'bg-[#FFFDFB] border-[#F5E4D5] text-[#15111E] hover:border-[#8C1F3D]'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: READY TO LAUNCH & AI SUMMARY (FROM OLD ONBOARDING) */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3.5 py-1 w-full"
                >
                  <div className="text-center space-y-1">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#EA580C] to-[#8C1F3D] text-white flex items-center justify-center mx-auto shadow-md">
                      <Rocket className="w-6 h-6" />
                    </div>
                    <span className="text-[10.5px] font-black text-[#EA580C] block">Step 5</span>
                    <h2 className="text-xl sm:text-[23px] font-black text-[#15111E] tracking-tight">
                      Your AI Strategy Blueprint is Ready!
                    </h2>
                  </div>

                  {/* AI Strategy Summary Card */}
                  <div className="bg-[#FFF9F5] border border-[#F5E4D5] rounded-2xl p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between border-b border-[#F5E4D5] pb-2">
                      <div>
                        <span className="text-[9px] font-black text-[#8A8294] uppercase">Workspace</span>
                        <h4 className="text-sm font-black text-[#15111E]">{workspaceName}</h4>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#EA580C]/10 text-[#EA580C] text-[10px] font-black uppercase">
                        {growthGoal.toUpperCase()} FOCUS
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-left">
                      <div className="p-2 rounded-lg bg-white border border-[#F3DEC8]">
                        <span className="text-[8.5px] font-black text-[#8A8294] block uppercase">Audience Target</span>
                        <span className="text-xs font-bold text-[#15111E] truncate block">{targetAudienceType} • {location}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-[#F3DEC8]">
                        <span className="text-[8.5px] font-black text-[#8A8294] block uppercase">Tone of Voice</span>
                        <span className="text-xs font-bold text-[#8C1F3D] capitalize block">{selectedTone}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-gradient-to-r from-[#2A0E2A] to-[#45143C] text-white space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#FFD188]" />
                        <span className="text-[10.5px] font-black uppercase tracking-wider text-[#FFD188]">
                          Recommended 1st AI Campaign
                        </span>
                      </div>
                      <p className="text-[11px] text-white/90 leading-snug font-medium">
                        Launch automated multi-channel retargeting on {selectedChannels.slice(0, 2).join(' & ')} to drive immediate {growthGoal} boost.
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
              Just a few steps away!
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
                className="text-xs font-bold text-[#7A7285] hover:text-[#15111E] cursor-pointer px-2 py-1.5"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handleSkip}
              className="text-xs font-bold text-[#7A7285] hover:text-[#15111E] cursor-pointer px-2 py-1.5"
            >
              Skip for now
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 sm:px-7 py-2.5 rounded-full bg-gradient-to-r from-[#EA580C] to-[#8C1F3D] text-white text-xs font-black shadow-md hover:shadow-lg hover:scale-102 active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{currentStep === 5 ? 'Launch Workspace' : 'Continue'}</span>
              <span>➔</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Onboarding;
