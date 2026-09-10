import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PenTool,
  BookOpen,
  LayoutDashboard,
  Sparkles,
  Globe,
  FileText,
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  Settings,
  ChevronDown,
  ChevronUp,
  Check,
  Search,
  Eye,
  Trash2,
  Copy,
  Download,
  Share2,
  Calendar,
  Clock,
  BarChart3,
  TrendingUp,
  ArrowRight,
  RefreshCw,
  ExternalLink,
  Tag,
  CheckCircle2,
  AlertCircle,
  X,
  Code,
  Sliders,
  Layers,
  Zap,
  Plus,
  HelpCircle,
  FolderPlus,
  SlidersHorizontal,
  Wand2,
  CheckSquare,
  Compass,
  FileCheck2,
  ArrowUpRight,
  Target,
  Sparkle,
  Bookmark,
  Share,
  PieChart,
  ShoppingBag,
  Activity
} from 'lucide-react';
import { useMarketing } from '../context/MarketingContext';

// Blog Article Item Interface (Scheduled option commented out as requested)
export interface BlogArticle {
  id: string;
  title: string;
  topic: string;
  excerpt: string;
  contentHtml: string;
  contentMarkdown: string;
  slug: string;
  status: 'published' | 'draft' | 'review'; // Note: 'scheduled' option disabled/commented out
  // scheduledFor?: string; // Commented out: no scheduling option
  wordCount: number;
  readingTime: string;
  seoScore: number;
  featuredImage: string;
  thumbnailImage: string;
  author: string;
  category: string;
  tone: string;
  contentGoal: string;
  targetKeywords: string[];
  createdAt: string;
  views?: number;
  shares?: number;
}

// Initial Mock Blog Post History Data (No scheduled posts)
const INITIAL_BLOG_POSTS: BlogArticle[] = [
  {
    id: 'b-101',
    title: 'How Small Businesses Can Use AI for Autonomous Customer Support',
    topic: 'How small businesses can use AI for customer support',
    excerpt: 'Discover how modern AI agents and LLM chatbots streamline 24/7 client inquiries, cut response times by 80%, and boost customer satisfaction.',
    contentMarkdown: `# How Small Businesses Can Use AI for Autonomous Customer Support

Small businesses often struggle with maintaining 24/7 customer support while keeping operational costs manageable. With the emergence of specialized AI agents, smaller teams can now deliver enterprise-level responsiveness.

## Why Autonomous AI Support Matters
- **Zero Latency**: Customers receive instant answers within 2 seconds.
- **Omnichannel Coverage**: Works across WhatsApp, Email, and Live Web Chat.
- **Continuous Learning**: Agents refine their answers based on your knowledge base.

## 3 Steps to Implementation
1. **Curate Your Knowledge Base**: Collect your FAQ and return policies.
2. **Set Human Escalation Guardrails**: Allow the bot to hand off complex tickets to human experts.
3. **Analyze Weekly Resolution Rates**: Review unanswered queries to update documentation.

## Conclusion
Adopting AI support is no longer a luxury for big enterprises; it is the fundamental baseline for high-converting small businesses.`,
    contentHtml: `<h1>How Small Businesses Can Use AI for Autonomous Customer Support</h1><p>Small businesses often struggle with maintaining 24/7 customer support while keeping operational costs manageable. With the emergence of specialized AI agents, smaller teams can now deliver enterprise-level responsiveness.</p><h2>Why Autonomous AI Support Matters</h2><ul><li><strong>Zero Latency</strong>: Customers receive instant answers within 2 seconds.</li><li><strong>Omnichannel Coverage</strong>: Works across WhatsApp, Email, and Live Web Chat.</li><li><strong>Continuous Learning</strong>: Agents refine their answers based on your knowledge base.</li></ul><h2>3 Steps to Implementation</h2><ol><li><strong>Curate Your Knowledge Base</strong>: Collect your FAQ and return policies.</li><li><strong>Set Human Escalation Guardrails</strong>: Allow the bot to hand off complex tickets to human experts.</li><li><strong>Analyze Weekly Resolution Rates</strong>: Review unanswered queries to update documentation.</li></ol><h2>Conclusion</h2><p>Adopting AI support is no longer a luxury for big enterprises; it is the fundamental baseline for high-converting small businesses.</p>`,
    slug: 'how-small-businesses-can-use-ai-for-customer-support',
    status: 'published',
    wordCount: 1840,
    readingTime: '7 min read',
    seoScore: 94,
    featuredImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=60',
    thumbnailImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&auto=format&fit=crop&q=60',
    author: 'AI Editorial Agent',
    category: 'AI & Automation',
    tone: 'Professional & Authoritative',
    contentGoal: 'Lead Generation',
    targetKeywords: ['ai customer support', 'small business automation', 'customer service bot'],
    createdAt: '2026-09-08T10:30:00Z',
    views: 3420,
    shares: 184
  },
  {
    id: 'b-102',
    title: 'The Ultimate Guide to Sustainable Fashion Marketing in 2026',
    topic: 'Sustainable fashion marketing trends and consumer retention',
    excerpt: 'How eco-conscious brands are using transparency storytelling and ethical lifecycle positioning to dominate direct-to-consumer search results.',
    contentMarkdown: `# The Ultimate Guide to Sustainable Fashion Marketing in 2026

Modern consumers demand total transparency in garment production and supply chain sustainability.

## Key Pillars of Sustainable Marketing
1. **Supply Chain Traceability**: Highlight organic material origins.
2. **Circular Lifecycle Campaigns**: Offer trade-in and recycling credits.
3. **SEO Storytelling**: Capture organic searches for eco-friendly fabrics.`,
    contentHtml: `<h1>The Ultimate Guide to Sustainable Fashion Marketing in 2026</h1><p>Modern consumers demand total transparency in garment production and supply chain sustainability.</p><h2>Key Pillars of Sustainable Marketing</h2><ol><li><strong>Supply Chain Traceability</strong>: Highlight organic material origins.</li><li><strong>Circular Lifecycle Campaigns</strong>: Offer trade-in and recycling credits.</li><li><strong>SEO Storytelling</strong>: Capture organic searches for eco-friendly fabrics.</li></ol>`,
    slug: 'ultimate-guide-sustainable-fashion-marketing-2026',
    status: 'published',
    wordCount: 2210,
    readingTime: '9 min read',
    seoScore: 96,
    featuredImage: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop&q=60',
    thumbnailImage: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&auto=format&fit=crop&q=60',
    author: 'Sarah Jenkins',
    category: 'E-commerce Trends',
    tone: 'Friendly & Inspiring',
    contentGoal: 'Organic Traffic',
    targetKeywords: ['sustainable fashion marketing', 'eco clothing branding', 'ethical apparel'],
    createdAt: '2026-09-05T14:15:00Z',
    views: 5890,
    shares: 312
  },
  {
    id: 'b-103',
    title: '10 High-Converting Email Sequences for B2B Product Launches',
    topic: 'B2B email sequences for new product release',
    excerpt: 'Detailed breakdown of the 5-part pre-launch tease and 5-part post-launch activation sequence that achieved a 42% open rate.',
    contentMarkdown: `# 10 High-Converting Email Sequences for B2B Product Launches

Email remains the highest-converting digital channel for B2B enterprise software announcements.

## The 5-Phase Sequence
- **Teaser Announcement**: 14 days before release.
- **VIP Early Access**: 7 days before release.
- **Launch Day Spotlight**: Full feature breakdown.
- **Customer Social Proof**: 3 days post launch.
- **Final Extended Offer**: 7 days post launch.`,
    contentHtml: `<h1>10 High-Converting Email Sequences for B2B Product Launches</h1><p>Email remains the highest-converting digital channel for B2B enterprise software announcements.</p><h2>The 5-Phase Sequence</h2><ul><li><strong>Teaser Announcement</strong>: 14 days before release.</li><li><strong>VIP Early Access</strong>: 7 days before release.</li><li><strong>Launch Day Spotlight</strong>: Full feature breakdown.</li><li><strong>Customer Social Proof</strong>: 3 days post launch.</li><li><strong>Final Extended Offer</strong>: 7 days post launch.</li></ul>`,
    slug: '10-high-converting-b2b-email-sequences',
    status: 'draft',
    wordCount: 1450,
    readingTime: '6 min read',
    seoScore: 88,
    featuredImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=60',
    thumbnailImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&auto=format&fit=crop&q=60',
    author: 'AI Editorial Agent',
    category: 'Email Marketing',
    tone: 'Professional & Actionable',
    contentGoal: 'Lead Generation',
    targetKeywords: ['b2b email sequences', 'product launch emails', 'email conversion rates'],
    createdAt: '2026-09-09T09:00:00Z'
  },
  {
    id: 'b-104',
    title: 'LinkedIn Algorithm Secrets: How to 10x Inbound Founder DMs',
    topic: 'LinkedIn founder personal branding and inbound pipeline',
    excerpt: 'A tactical blueprint for crafting polarizing thought leadership posts that spark engagement and drive high-intent prospect messages.',
    contentMarkdown: `# LinkedIn Algorithm Secrets: How to 10x Inbound Founder DMs

Founder-led marketing delivers up to 8x more engagement than company pages on LinkedIn. Here is how to structure your weekly publishing schedule.`,
    contentHtml: `<h1>LinkedIn Algorithm Secrets: How to 10x Inbound Founder DMs</h1><p>Founder-led marketing delivers up to 8x more engagement than company pages on LinkedIn. Here is how to structure your weekly publishing schedule.</p>`,
    slug: 'linkedin-algorithm-secrets-inbound-founder-dms',
    status: 'published', // Updated from scheduled to published
    wordCount: 1620,
    readingTime: '6 min read',
    seoScore: 91,
    featuredImage: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?w=800&auto=format&fit=crop&q=60',
    thumbnailImage: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?w=400&auto=format&fit=crop&q=60',
    author: 'Alex Rivera',
    category: 'LinkedIn & Social',
    tone: 'Conversational & Bold',
    contentGoal: 'Brand Awareness',
    targetKeywords: ['linkedin marketing', 'founder branding', 'b2b inbound sales'],
    createdAt: '2026-09-09T12:00:00Z'
  }
];

// 4 Strategic Content Presets for instant 1-click loading
const CONTENT_PRESETS = [
  {
    id: 'seo_pillar',
    title: 'SEO Power Pillar',
    badge: 'Organic Traffic #1',
    description: 'Comprehensive 2,500-word authority pillar page targeting high-volume keywords with deep subheadings.',
    icon: Zap,
    topic: 'How small businesses can use AI for autonomous customer support',
    targetWordCount: 2500,
    tone: 'authoritative',
    contentGoal: 'organic traffic',
    country: 'IN',
    searchQueriesCount: 6,
    featuredImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'thought_leadership',
    title: 'Founder Thought Leadership',
    badge: 'Viral & Bold',
    description: 'Polarizing, insightful commentary designed to spark shares and inbound founder inquiries on LinkedIn & Blog.',
    icon: Sparkles,
    topic: 'Why traditional SaaS sales SDRs will be obsolete by 2027',
    targetWordCount: 1500,
    tone: 'conversational',
    contentGoal: 'brand awareness',
    country: 'US',
    searchQueriesCount: 4,
    featuredImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'howto_tutorial',
    title: 'Actionable How-To Guide',
    badge: 'Product Lead Gen',
    description: 'Step-by-step practical implementation tutorial with numbered walkthroughs and measurable milestones.',
    icon: Wand2,
    topic: 'Step-by-step framework to launch an automated email nurture sequence',
    targetWordCount: 2000,
    tone: 'friendly',
    contentGoal: 'lead generation',
    country: 'GLOBAL',
    searchQueriesCount: 5,
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'industry_trends',
    title: 'Industry Trends & Benchmark',
    badge: 'Data-Driven',
    description: 'Data-backed industry analysis examining consumer trends, retention shifts, and 2026 market projections.',
    icon: BarChart3,
    topic: 'Sustainable e-commerce marketing trends & consumer loyalty benchmarks',
    targetWordCount: 3000,
    tone: 'professional',
    contentGoal: 'organic traffic',
    country: 'US',
    searchQueriesCount: 8,
    featuredImage: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop&q=60'
  }
];

// Content Pillars Data Structure for the Graph
const CONTENT_PILLARS_DATA = [
  {
    id: 'ai_marketing',
    title: 'AI & Marketing Automation',
    percentage: 45,
    color: '#8C1F3D',
    bgColor: 'bg-[#8C1F3D]',
    lightBg: 'bg-[#8C1F3D]/10',
    borderColor: 'border-[#8C1F3D]/25',
    articlesCount: 6,
    searchVolume: '28.4K/mo',
    avgSeoScore: 95,
    trafficShare: '52%',
    growth: '+38% MoM',
    icon: Zap
  },
  {
    id: 'ecommerce_fashion',
    title: 'E-commerce & Fashion Growth',
    percentage: 30,
    color: '#EA580C',
    bgColor: 'bg-[#EA580C]',
    lightBg: 'bg-[#EA580C]/10',
    borderColor: 'border-[#EA580C]/25',
    articlesCount: 4,
    searchVolume: '14.2K/mo',
    avgSeoScore: 96,
    trafficShare: '28%',
    growth: '+22% MoM',
    icon: ShoppingBag
  },
  {
    id: 'b2b_growth',
    title: 'B2B LinkedIn & Email Systems',
    percentage: 25,
    color: '#4B1D6B',
    bgColor: 'bg-[#4B1D6B]',
    lightBg: 'bg-[#4B1D6B]/10',
    borderColor: 'border-[#4B1D6B]/25',
    articlesCount: 3,
    searchVolume: '9.8K/mo',
    avgSeoScore: 92,
    trafficShare: '20%',
    growth: '+15% MoM',
    icon: Share2
  }
];

export const Blog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { activeWorkspace } = useMarketing();

  // Active Studio Mode: 'write' | 'library' | 'overview'
  const activeTab = searchParams.get('tab') || 'write';

  const setTab = (tab: string) => {
    setSearchParams({ tab });
  };

  // Studio Step Switcher: 1 (Topic & Intel) | 2 (Knowledge & Media) | 3 (Strategy & Publishing)
  const [activeStep, setActiveStep] = useState<number>(1);

  // Target Destination
  const [targetPlatform, setTargetPlatform] = useState<'blog' | 'linkedin' | 'webflow'>('blog');

  // Selected Preset ID
  const [selectedPreset, setSelectedPreset] = useState<string>('seo_pillar');

  // Active selected pillar on graph
  const [activePillarHover, setActivePillarHover] = useState<string | null>(null);
  const [pillarChartMode, setPillarChartMode] = useState<'donut' | 'bars'>('donut');

  // =========================================================================
  // CORE FORM STATE
  // =========================================================================
  const [topic, setTopic] = useState<string>('How small businesses can use AI for autonomous customer support');
  const [country, setCountry] = useState<string>('IN');
  const [language, setLanguage] = useState<string>('English');
  const [freshness, setFreshness] = useState<string>('30d');
  const [searchQueriesCount, setSearchQueriesCount] = useState<number>(5);

  // Grounding
  const [groundingMode, setGroundingMode] = useState<'web' | 'doc' | 'images'>('web');
  const [uploadedDocName, setUploadedDocName] = useState<string>('');
  const [uploadedImageName, setUploadedImageName] = useState<string>('');

  // Media
  const [mainImage, setMainImage] = useState<string>('https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=60');
  const [thumbnailImage, setThumbnailImage] = useState<string>('https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&auto=format&fit=crop&q=60');

  // Strategy & Specs
  const [siteName, setSiteName] = useState<string>(activeWorkspace?.name || 'GrowWise Marketing');
  const [siteUrl, setSiteUrl] = useState<string>(activeWorkspace?.website || 'https://growwise.ai');
  const [articleType, setArticleType] = useState<string>('blog');
  const [tone, setTone] = useState<string>('authoritative');
  const [contentGoal, setContentGoal] = useState<string>('organic traffic');
  const [targetWordCount, setTargetWordCount] = useState<number>(2500);
  const [targetAudience, setTargetAudience] = useState<string>('Mid-to-senior business executives, founders, and marketing leads');
  const [callToAction, setCallToAction] = useState<string>('Start scaling with GrowWise AI free trial');
  const [additionalInstructions, setAdditionalInstructions] = useState<string>('');

  // Advanced publishing
  const [articlePathPrefix, setArticlePathPrefix] = useState<string>('/blog');
  const [brandName, setBrandName] = useState<string>(activeWorkspace?.name || 'GrowWise AI');
  const [authorName, setAuthorName] = useState<string>('AI Marketing Specialist');
  const [slugOverride, setSlugOverride] = useState<string>('');
  const [isIndexable, setIsIndexable] = useState<boolean>(true);
  const [includeSources, setIncludeSources] = useState<boolean>(true);

  // Generation & Pipeline Simulation State
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStage, setGenerationStage] = useState<number>(0);
  const [generationLog, setGenerationLog] = useState<string>('');
  const [generatedArticle, setGeneratedArticle] = useState<BlogArticle | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
  const [previewTab, setPreviewTab] = useState<'rendered' | 'markdown' | 'seo' | 'html'>('rendered');

  // Blog Posts Library State (Only 'all', 'published', 'draft' - Scheduled removed)
  const [postsList, setPostsList] = useState<BlogArticle[]>(INITIAL_BLOG_POSTS);
  const [libraryFilter, setLibraryFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [librarySearch, setLibrarySearch] = useState<string>('');
  const [activeReadingArticle, setActiveReadingArticle] = useState<BlogArticle | null>(null);

  // Apply a strategic preset
  const handleApplyPreset = (preset: typeof CONTENT_PRESETS[0]) => {
    setSelectedPreset(preset.id);
    setTopic(preset.topic);
    setTargetWordCount(preset.targetWordCount);
    setTone(preset.tone);
    setContentGoal(preset.contentGoal);
    setCountry(preset.country);
    setSearchQueriesCount(preset.searchQueriesCount);
    setMainImage(preset.featuredImage);
    setThumbnailImage(preset.featuredImage);
  };

  // Handle generation
  const handleGenerateArticle = () => {
    if (topic.trim().length < 3) return;

    setIsGenerating(true);
    setGenerationStage(1);
    setGenerationLog('Connecting to live search engine & extracting ranking keywords...');

    const stages = [
      { stage: 1, log: `Researched ${searchQueriesCount} live search queries in ${country} (${language})` },
      { stage: 2, log: 'Synthesizing keyword intent, search volume & competitor outlines...' },
      { stage: 3, log: 'Structuring comprehensive 6-chapter article outline...' },
      { stage: 4, log: `Writing ${targetWordCount}-word article in ${tone} tone with custom CTA...` },
      { stage: 5, log: 'Injecting SEO meta-tags, JSON-LD schema & anchor internal links...' },
      { stage: 6, log: 'Article generated and validated successfully!' }
    ];

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < stages.length) {
        setGenerationStage(stages[current].stage);
        setGenerationLog(stages[current].log);
      } else {
        clearInterval(interval);
        setIsGenerating(false);

        const slug = slugOverride.trim() || topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        const newArticle: BlogArticle = {
          id: `b-${Date.now()}`,
          title: topic.replace(/\b\w/g, l => l.toUpperCase()),
          topic,
          excerpt: `Comprehensive guide exploring ${topic}. Actionable frameworks, metrics, and best practices tailored for ${targetAudience}.`,
          contentMarkdown: `# ${topic.replace(/\b\w/g, l => l.toUpperCase())}

*Published by ${authorName} • ${new Date().toLocaleDateString()}*

## Executive Summary
In today's fast-moving market, mastering **${topic}** is critical for sustainable growth. This breakdown explores key strategies, technical implementation, and metrics that matter.

## 1. Industry Trends & Landscape Analysis
Recent industry benchmarks reveal that organizations adopting structured AI workflows experience up to **3x higher conversion efficiency**.

- **Intent-Driven Strategy**: Aligning content directly with customer search queries.
- **Automated Omnichannel Touchpoints**: Scaling output without compromising editorial quality.
- **Continuous Performance Feedback**: Iterating weekly based on visitor time-on-page.

## 2. Step-by-Step Implementation Framework
1. **Define Core Goals**: Center your editorial direction around ${contentGoal}.
2. **Implement Guardrails**: Maintain brand consistency with a ${tone} tone.
3. **Measure & Iterate**: Track keyword movement and organic impressions.

## 3. Common Pitfalls & How to Avoid Them
Avoid overly generic AI copy by grounding your content in proprietary data, first-hand interviews, and verified search data.

## 4. Key Takeaways & Next Steps
Ready to take your business to the next level? **${callToAction}**.

---
*Sources & Research: Verified against ${searchQueriesCount} active search benchmarks in ${country}.*`,
          contentHtml: `<h1>${topic.replace(/\b\w/g, l => l.toUpperCase())}</h1><p><em>Published by ${authorName} • ${new Date().toLocaleDateString()}</em></p><h2>Executive Summary</h2><p>In today's fast-moving market, mastering <strong>${topic}</strong> is critical for sustainable growth. This breakdown explores key strategies, technical implementation, and metrics that matter.</p><h2>1. Industry Trends & Landscape Analysis</h2><p>Recent industry benchmarks reveal that organizations adopting structured AI workflows experience up to <strong>3x higher conversion efficiency</strong>.</p><ul><li><strong>Intent-Driven Strategy</strong>: Aligning content directly with customer search queries.</li><li><strong>Automated Omnichannel Touchpoints</strong>: Scaling output without compromising editorial quality.</li><li><strong>Continuous Performance Feedback</strong>: Iterating weekly based on visitor time-on-page.</li></ul><h2>2. Step-by-Step Implementation Framework</h2><ol><li><strong>Define Core Goals</strong>: Center your editorial direction around ${contentGoal}.</li><li><strong>Implement Guardrails</strong>: Maintain brand consistency with a ${tone} tone.</li><li><strong>Measure & Iterate</strong>: Track keyword movement and organic impressions.</li></ol><h2>3. Common Pitfalls & How to Avoid Them</h2><p>Avoid overly generic AI copy by grounding your content in proprietary data, first-hand interviews, and verified search data.</p><h2>4. Key Takeaways & Next Steps</h2><p>Ready to take your business to the next level? <strong>${callToAction}</strong>.</p><hr/><p><small>Sources & Research: Verified against ${searchQueriesCount} active search benchmarks in ${country}.</small></p>`,
          slug,
          status: 'draft',
          wordCount: targetWordCount,
          readingTime: `${Math.ceil(targetWordCount / 250)} min read`,
          seoScore: 96,
          featuredImage: mainImage,
          thumbnailImage: thumbnailImage || mainImage,
          author: authorName,
          category: articleType === 'blog' ? 'Blog Article' : articleType.toUpperCase(),
          tone,
          contentGoal,
          targetKeywords: [topic.toLowerCase(), `${topic.toLowerCase()} guide`, 'ai marketing strategy'],
          createdAt: new Date().toISOString()
        };

        setGeneratedArticle(newArticle);
        setPostsList(prev => [newArticle, ...prev]);
        setIsPreviewModalOpen(true);
      }
    }, 550);
  };

  const filteredPosts = postsList.filter(p => {
    const matchesStatus = libraryFilter === 'all' || p.status === libraryFilter;
    const matchesSearch = librarySearch === '' || 
      p.title.toLowerCase().includes(librarySearch.toLowerCase()) || 
      p.topic.toLowerCase().includes(librarySearch.toLowerCase()) ||
      p.category.toLowerCase().includes(librarySearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 text-left font-sans animate-in fade-in duration-300 pb-20 relative w-full max-w-full min-w-0">
      
      {/* =========================================================================
          1. HEADER WITH STUDIO MODE TOGGLE
          ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#F3DEC8]/70">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2B0847] to-[#8C1F3D] text-[#FFD188] flex items-center justify-center shadow-[0_4px_16px_rgba(75,29,107,0.15)]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-[#1E122C] tracking-tight">
                  AI Blog Studio
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-[#8C1F3D]/10 border border-[#8C1F3D]/20 text-[#8C1F3D] text-[10px] font-black uppercase tracking-wider">
                  PRO CANVAS
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#6B5E77] font-medium mt-0.5">
                Multi-channel intelligence, live outline blueprints, and autonomous SEO publication.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Core Studio Mode Buttons */}
        <div className="flex items-center gap-1.5 p-1.5 bg-white/90 backdrop-blur-xs border border-[#F3DEC8] rounded-2xl shadow-3xs">
          <button
            type="button"
            onClick={() => setTab('write')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'write'
                ? 'bg-gradient-to-r from-[#2B0847] to-[#48115B] text-white shadow-xs'
                : 'text-[#6B5E77] hover:text-[#1E122C] hover:bg-[#FAF5F0]'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Studio Workspace</span>
          </button>

          <button
            type="button"
            onClick={() => setTab('library')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'library'
                ? 'bg-gradient-to-r from-[#2B0847] to-[#48115B] text-white shadow-xs'
                : 'text-[#6B5E77] hover:text-[#1E122C] hover:bg-[#FAF5F0]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Post History</span>
            <span className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] ${
              activeTab === 'library' ? 'bg-white/20 text-white' : 'bg-[#FAF5F0] text-[#8C1F3D] border border-[#F3DEC8]'
            }`}>
              {postsList.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setTab('overview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-[#2B0847] to-[#48115B] text-white shadow-xs'
                : 'text-[#6B5E77] hover:text-[#1E122C] hover:bg-[#FAF5F0]'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: STUDIO WORKSPACE (SPLIT-SCREEN INTERACTIVE CANVAS)
          ========================================================================= */}
      {activeTab === 'write' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Top Preset Template Fast-Track Bar */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#8C1F3D] flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5 text-[#EA580C]" />
                Select Strategic Blueprint Template
              </span>
              <span className="text-[11px] font-semibold text-[#6B5E77]">1-click auto-configuration</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {CONTENT_PRESETS.map((preset) => {
                const Icon = preset.icon;
                const isSelected = selectedPreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleApplyPreset(preset)}
                    className={`p-4 rounded-3xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-br from-[#2B0847] to-[#48115B] text-white border-[#2B0847] shadow-[0_8px_20px_rgba(43,8,71,0.2)] scale-[1.02]'
                        : 'bg-white border-[#F3DEC8] text-[#1E122C] hover:border-[#8C1F3D]/50 hover:bg-[#FCFAF8] shadow-3xs'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-white/15 text-[#FFD188]' : 'bg-[#FAF5F0] text-[#8C1F3D]'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-[#FAF5F0] text-[#EA580C] border border-[#F3DEC8]'
                        }`}>
                          {preset.badge}
                        </span>
                      </div>

                      <h3 className={`text-xs font-black tracking-tight ${isSelected ? 'text-white' : 'text-[#1E122C]'}`}>
                        {preset.title}
                      </h3>
                      <p className={`text-[11px] line-clamp-2 leading-relaxed ${isSelected ? 'text-white/80' : 'text-[#6B5E77]'}`}>
                        {preset.description}
                      </p>
                    </div>

                    <div className={`mt-3 pt-2.5 border-t text-[10px] font-bold flex items-center justify-between ${
                      isSelected ? 'border-white/15 text-white/90' : 'border-[#F3DEC8]/60 text-[#6B5E77]'
                    }`}>
                      <span>{preset.targetWordCount} words</span>
                      <span className="capitalize">{preset.tone}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2-Column Split Studio Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* =========================================================================
                LEFT PANEL (7 Cols): STUDIO COCKPIT & CONFIGURATOR
                ========================================================================= */}
            <div className="lg:col-span-7 bg-white border border-[#F3DEC8] rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(75,29,107,0.03)] space-y-6">
              
              {/* Studio Step Navigation Tabs */}
              <div className="flex items-center justify-between gap-2 p-1.5 bg-[#FAF7F2] rounded-2xl border border-[#EADDCF]">
                {[
                  { num: 1, label: 'Topic & Intel', icon: Search },
                  { num: 2, label: 'Research & Media', icon: Layers },
                  { num: 3, label: 'Strategy & Publishing', icon: SlidersHorizontal }
                ].map(step => (
                  <button
                    key={step.num}
                    type="button"
                    onClick={() => setActiveStep(step.num)}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      activeStep === step.num
                        ? 'bg-gradient-to-r from-[#2B0847] to-[#48115B] text-white shadow-xs'
                        : 'text-[#6B5E77] hover:text-[#1E122C] hover:bg-white/60'
                    }`}
                  >
                    <step.icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{step.label}</span>
                    <span className="sm:hidden">{step.num}</span>
                  </button>
                ))}
              </div>

              {/* STEP 1: TOPIC & SEARCH INTEL */}
              {activeStep === 1 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  {/* Topic Prompt */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-black text-[#1E122C] uppercase tracking-wide flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" />
                        Article Core Topic / Keyword Focus <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[11px] font-bold text-[#8C1F3D]">Live AI Web Crawler Active</span>
                    </div>

                    <textarea
                      rows={3}
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g. How small businesses can use AI for autonomous customer support"
                      className="w-full bg-[#FAF7F2]/60 border border-[#EADDCF] rounded-2xl p-4 text-xs sm:text-sm font-bold text-[#1E122C] placeholder-[#9E92A6] outline-none focus:border-[#8C1F3D] focus:bg-white focus:ring-4 focus:ring-[#8C1F3D]/8 transition-all resize-none shadow-3xs"
                    />

                    {/* Fast Topic Ideas */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {[
                        'AI Agents in B2B Customer Support',
                        'Direct-to-Consumer Retention Playbook',
                        'B2B Email Outbound Copy Hacks',
                        'Founder Personal Brand on LinkedIn'
                      ].map((chip) => (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => setTopic(chip)}
                          className="px-3 py-1 rounded-xl bg-[#FAF5F0] hover:bg-[#F5EEFB] border border-[#F3DEC8] hover:border-[#8C1F3D]/40 text-[11px] font-bold text-[#5C4D6B] hover:text-[#8C1F3D] transition-all cursor-pointer"
                        >
                          + {chip}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Destination Switcher */}
                  <div className="space-y-2 pt-2 border-t border-[#F3DEC8]/60">
                    <label className="text-[11px] font-black text-[#5C4D6B] uppercase tracking-wide">
                      Target Channel Output
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setTargetPlatform('blog')}
                        className={`p-3 rounded-2xl border text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          targetPlatform === 'blog'
                            ? 'bg-[#2B0847] text-white border-[#2B0847] shadow-xs'
                            : 'bg-white border-[#EADDCF] text-[#6B5E77] hover:border-[#8C1F3D]'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#FFD188]" />
                        <span>Blog Article</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setTargetPlatform('linkedin')}
                        className={`p-3 rounded-2xl border text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          targetPlatform === 'linkedin'
                            ? 'bg-[#0A66C2] text-white border-[#0A66C2] shadow-xs'
                            : 'bg-white border-[#EADDCF] text-[#6B5E77] hover:border-[#0A66C2]'
                        }`}
                      >
                        <span className="font-serif italic font-bold">in</span>
                        <span>LinkedIn Post</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setTargetPlatform('webflow')}
                        className={`p-3 rounded-2xl border text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          targetPlatform === 'webflow'
                            ? 'bg-[#146EF5] text-white border-[#146EF5] shadow-xs'
                            : 'bg-white border-[#EADDCF] text-[#6B5E77] hover:border-[#146EF5]'
                        }`}
                      >
                        <span className="font-black">W</span>
                        <span>Webflow CMS</span>
                      </button>
                    </div>
                  </div>

                  {/* Search Queries & Country Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-[#5C4D6B] block">Target Country</label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-[#FAF7F2]/60 border border-[#EADDCF] rounded-xl px-3 py-2.5 text-xs font-bold text-[#1E122C] outline-none focus:border-[#8C1F3D] cursor-pointer"
                      >
                        <option value="IN">🇮🇳 India (IN)</option>
                        <option value="US">🇺🇸 United States (US)</option>
                        <option value="UK">🇬🇧 United Kingdom (UK)</option>
                        <option value="CA">🇨🇦 Canada (CA)</option>
                        <option value="GLOBAL">🌐 Global Worldwide</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-[#5C4D6B] block">Language</label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full bg-[#FAF7F2]/60 border border-[#EADDCF] rounded-xl px-3 py-2.5 text-xs font-bold text-[#1E122C] outline-none focus:border-[#8C1F3D] cursor-pointer"
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Hindi">Hindi</option>
                      </select>
                    </div>

                    <div className="space-y-1.5 col-span-2 sm:col-span-1">
                      <label className="text-[11px] font-bold text-[#5C4D6B] block">Freshness</label>
                      <select
                        value={freshness}
                        onChange={(e) => setFreshness(e.target.value)}
                        className="w-full bg-[#FAF7F2]/60 border border-[#EADDCF] rounded-xl px-3 py-2.5 text-xs font-bold text-[#1E122C] outline-none focus:border-[#8C1F3D] cursor-pointer"
                      >
                        <option value="24h">Last 24 hours</option>
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days (Default)</option>
                        <option value="all">All time</option>
                      </select>
                    </div>
                  </div>

                  {/* Search Query Depth Slider */}
                  <div className="space-y-2 p-4 rounded-2xl bg-[#FCFAF8] border border-[#F3DEC8]/70">
                    <div className="flex items-center justify-between text-xs font-bold text-[#1E122C]">
                      <span>Live Search Query Depth</span>
                      <span className="text-[#8C1F3D] font-black">{searchQueriesCount} Live Queries Analyzed</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={searchQueriesCount}
                      onChange={(e) => setSearchQueriesCount(Number(e.target.value))}
                      className="w-full accent-[#8C1F3D] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-bold text-[#6B5E77]">
                      <span>Fast (1 query)</span>
                      <span>Deep Search Engine Crawl (10 queries)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: KNOWLEDGE GROUNDING & MEDIA DECK */}
              {activeStep === 2 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  {/* Grounding Mode 3-Card Selector */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-black text-[#1E122C] uppercase tracking-wide flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#4B1D6B]" />
                      Knowledge Grounding Source
                    </label>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'web', label: 'Web Only', desc: 'Real-time Google search crawls', icon: Globe },
                        { id: 'doc', label: 'Document Notes', desc: 'PDF, DOCX, TXT briefs', icon: FileText },
                        { id: 'images', label: 'Visual Diagrams', desc: 'Infographics & charts', icon: ImageIcon }
                      ].map(g => (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => setGroundingMode(g.id as any)}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            groundingMode === g.id
                              ? 'bg-[#F9F3FC] border-[#8C1F3D] text-[#8C1F3D] shadow-xs'
                              : 'bg-white border-[#EADDCF] text-[#6B5E77] hover:border-[#8C1F3D]/50'
                          }`}
                        >
                          <g.icon className="w-4 h-4 mb-2" />
                          <div>
                            <h4 className="text-xs font-black text-[#1E122C]">{g.label}</h4>
                            <p className="text-[10px] text-[#6B5E77] mt-0.5">{g.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* If Document Grounding is selected */}
                    {groundingMode === 'doc' && (
                      <div className="p-4 rounded-2xl bg-[#FCFAF8] border border-dashed border-[#F3DEC8] text-center space-y-2">
                        <Upload className="w-5 h-5 text-[#8C1F3D] mx-auto" />
                        <p className="text-xs font-black text-[#1E122C]">Attach reference notes or client interview transcripts</p>
                        <input
                          type="file"
                          id="doc-upload-dock"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) setUploadedDocName(e.target.files[0].name);
                          }}
                        />
                        <label
                          htmlFor="doc-upload-dock"
                          className="inline-block px-3.5 py-1.5 bg-white border border-[#EADDCF] text-xs font-bold rounded-xl cursor-pointer hover:bg-[#FAF5F0]"
                        >
                          Choose Document File
                        </label>
                        {uploadedDocName && (
                          <span className="block text-xs font-bold text-emerald-700">Attached: {uploadedDocName}</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Featured Banner Visual Deck */}
                  <div className="space-y-3 pt-2 border-t border-[#F3DEC8]/60">
                    <label className="text-xs font-black text-[#1E122C] uppercase tracking-wide flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-[#EA580C]" />
                      Featured Hero Image
                    </label>

                    {/* Visual Presets Selector */}
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=60',
                        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
                        'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=60'
                      ].map((imgUrl, i) => (
                        <div
                          key={i}
                          onClick={() => { setMainImage(imgUrl); setThumbnailImage(imgUrl); }}
                          className={`h-18 rounded-xl overflow-hidden border-2 cursor-pointer transition-all relative ${
                            mainImage === imgUrl ? 'border-[#8C1F3D] ring-2 ring-[#8C1F3D]/20' : 'border-[#EADDCF] opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={imgUrl} alt="Preset" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10.5px] font-bold text-[#5C4D6B]">Custom Image URL</label>
                      <input
                        type="url"
                        value={mainImage}
                        onChange={(e) => { setMainImage(e.target.value); setThumbnailImage(e.target.value); }}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full bg-[#FAF7F2]/60 border border-[#EADDCF] rounded-xl px-3 py-2 text-xs font-semibold text-[#1E122C] outline-none focus:border-[#8C1F3D]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: STRATEGY, SPECS & PUBLISHING */}
              {activeStep === 3 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  {/* Word Count Slider */}
                  <div className="space-y-2 p-4 rounded-2xl bg-[#FCFAF8] border border-[#F3DEC8]/70">
                    <div className="flex items-center justify-between text-xs font-bold text-[#1E122C]">
                      <span>Target Article Length</span>
                      <span className="text-[#8C1F3D] font-black">{targetWordCount} Words (~{Math.ceil(targetWordCount / 250)} min read)</span>
                    </div>
                    <input
                      type="range"
                      min={800}
                      max={4000}
                      step={200}
                      value={targetWordCount}
                      onChange={(e) => setTargetWordCount(Number(e.target.value))}
                      className="w-full accent-[#8C1F3D] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-bold text-[#6B5E77]">
                      <span>Short Post (800w)</span>
                      <span>Deep Pillar Guide (4000w)</span>
                    </div>
                  </div>

                  {/* Tone of Voice Selector */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-[#5C4D6B] uppercase tracking-wide">
                      Tone of Voice
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'authoritative', label: 'Authoritative' },
                        { id: 'professional', label: 'Professional' },
                        { id: 'conversational', label: 'Conversational' },
                        { id: 'friendly', label: 'Friendly' }
                      ].map(t => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTone(t.id)}
                          className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                            tone === t.id
                              ? 'bg-[#2B0847] text-white border-[#2B0847] shadow-xs'
                              : 'bg-white border-[#EADDCF] text-[#6B5E77] hover:border-[#8C1F3D]'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Audience & CTA */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-[10.5px] font-bold text-[#5C4D6B]">Target Audience</label>
                      <input
                        type="text"
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                        className="w-full bg-[#FAF7F2]/60 border border-[#EADDCF] rounded-xl px-3 py-2 text-xs font-bold text-[#1E122C] outline-none focus:border-[#8C1F3D]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10.5px] font-bold text-[#5C4D6B]">Custom Call to Action</label>
                      <input
                        type="text"
                        value={callToAction}
                        onChange={(e) => setCallToAction(e.target.value)}
                        className="w-full bg-[#FAF7F2]/60 border border-[#EADDCF] rounded-xl px-3 py-2 text-xs font-bold text-[#1E122C] outline-none focus:border-[#8C1F3D]"
                      />
                    </div>
                  </div>

                  {/* Publishing Meta Row */}
                  <div className="grid grid-cols-2 gap-3.5 pt-2 border-t border-[#F3DEC8]/60">
                    <div className="space-y-1">
                      <label className="text-[10.5px] font-bold text-[#5C4D6B]">Author</label>
                      <input
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="w-full bg-[#FAF7F2]/60 border border-[#EADDCF] rounded-xl px-3 py-2 text-xs font-bold text-[#1E122C] outline-none focus:border-[#8C1F3D]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10.5px] font-bold text-[#5C4D6B]">Path Prefix</label>
                      <input
                        type="text"
                        value={articlePathPrefix}
                        onChange={(e) => setArticlePathPrefix(e.target.value)}
                        className="w-full bg-[#FAF7F2]/60 border border-[#EADDCF] rounded-xl px-3 py-2 text-xs font-bold text-[#1E122C] outline-none focus:border-[#8C1F3D]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step Forward / Backward Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-[#F3DEC8]/60">
                <div className="flex items-center gap-2">
                  {activeStep > 1 && (
                    <button
                      type="button"
                      onClick={() => setActiveStep(prev => prev - 1)}
                      className="px-4 py-2 bg-[#FAF5F0] hover:bg-[#FAF7F2] border border-[#EADDCF] text-xs font-black text-[#6B5E77] rounded-xl cursor-pointer"
                    >
                      ← Back
                    </button>
                  )}
                  {activeStep < 3 && (
                    <button
                      type="button"
                      onClick={() => setActiveStep(prev => prev + 1)}
                      className="px-4 py-2 bg-white hover:bg-[#FFF8F5] border border-[#EADDCF] hover:border-[#8C1F3D] text-xs font-black text-[#1E122C] rounded-xl cursor-pointer"
                    >
                      Next Step →
                    </button>
                  )}
                </div>

                <span className="text-[11px] font-bold text-[#6B5E77]">
                  Step {activeStep} of 3
                </span>
              </div>

            </div>

            {/* =========================================================================
                RIGHT PANEL (5 Cols): REAL-TIME ARTICLE BLUEPRINT & SEO GAUGE
                ========================================================================= */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Live Blueprint Canvas Card */}
              <div className="bg-white border-2 border-[#F3DEC8] rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(75,29,107,0.06)] sticky top-6">
                
                {/* Hero Banner Preview */}
                <div className="h-44 w-full relative bg-slate-100 overflow-hidden">
                  <img src={mainImage} alt="Hero Banner" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-between p-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[10px] font-black text-[#1E122C] shadow-sm uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#EA580C]" />
                        {targetPlatform.toUpperCase()}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-black shadow-sm">
                        96/100 SEO READY
                      </span>
                    </div>

                    <div className="text-white space-y-0.5">
                      <span className="text-[10px] font-bold text-[#FFD188] uppercase tracking-wider">Blueprint Preview</span>
                      <h3 className="text-sm font-black line-clamp-1 leading-snug">
                        {topic || 'Your Target Article Headline'}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Blueprint Specs & Gauge */}
                <div className="p-5 sm:p-6 space-y-4">
                  {/* Live Meta Spec Badges */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#EADDCF]">
                      <span className="text-[9.5px] font-black uppercase text-[#6B5E77] block">Length</span>
                      <span className="text-xs font-black text-[#1E122C]">{targetWordCount}w</span>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#EADDCF]">
                      <span className="text-[9.5px] font-black uppercase text-[#6B5E77] block">Read Time</span>
                      <span className="text-xs font-black text-[#1E122C]">~{Math.ceil(targetWordCount / 250)} min</span>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#EADDCF]">
                      <span className="text-[9.5px] font-black uppercase text-[#6B5E77] block">Tone</span>
                      <span className="text-xs font-black text-[#8C1F3D] capitalize">{tone}</span>
                    </div>
                  </div>

                  {/* 5-Chapter Outline Architecture */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10.5px] font-black uppercase tracking-wider text-[#6B5E77]">
                        AI Outline Structure (5 Chapters)
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Auto-Optimized
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs font-bold text-[#1E122C]">
                      {[
                        '1. Executive Summary & Intent Hook',
                        '2. Industry Benchmarks & Landscape Analysis',
                        '3. Tactical Step-by-Step Implementation Framework',
                        '4. Common Pitfalls & High-Converting Solutions',
                        '5. Conclusion & Action Plan'
                      ].map((chap, idx) => (
                        <div key={idx} className="p-2 rounded-xl bg-[#FAF7F2]/60 border border-[#EADDCF] flex items-center justify-between">
                          <span className="truncate pr-2">{chap}</span>
                          <span className="text-[10px] text-[#8C1F3D] font-mono">H2</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Big Glowing Launch Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      disabled={topic.trim().length < 3 || isGenerating}
                      onClick={handleGenerateArticle}
                      className={`w-full py-4 rounded-2xl font-black text-xs text-white shadow-lg flex items-center justify-center gap-2.5 transition-all ${
                        topic.trim().length >= 3 && !isGenerating
                          ? 'bg-gradient-to-r from-[#2B0847] via-[#5C164E] to-[#8C1F3D] hover:shadow-[0_8px_25px_rgba(140,31,61,0.35)] hover:scale-102 active:scale-98 cursor-pointer'
                          : 'bg-slate-300 opacity-60 cursor-not-allowed shadow-none'
                      }`}
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Generating 6-Stage Article Pipeline...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-[#FFD188]" />
                          <span>Generate Complete Article</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* AI Generation Live Simulation */}
                  {isGenerating && (
                    <div className="p-4 rounded-2xl bg-[#FFF9F5] border border-[#F5E4D5] space-y-2.5 animate-in fade-in">
                      <div className="flex items-center justify-between text-xs font-black text-[#1E122C]">
                        <span>Stage {generationStage} of 6</span>
                        <span className="text-[#EA580C]">{(generationStage / 6 * 100).toFixed(0)}% Complete</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#EA580C] to-[#8C1F3D] rounded-full"
                          animate={{ width: `${(generationStage / 6) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <p className="text-[11px] font-bold text-[#6B5E77] italic">{generationLog}</p>
                    </div>
                  )}

                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* =========================================================================
          TAB 2: BLOG POST HISTORY / LIBRARY (NO SCHEDULED POSTS)
          ========================================================================= */}
      {activeTab === 'library' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#F3DEC8] p-4 rounded-3xl shadow-[0_2px_12px_rgba(75,29,107,0.03)]">
            
            {/* Status Filter Tabs (Scheduled tab removed as requested) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {[
                { id: 'all', label: 'All Articles', count: postsList.length },
                { id: 'published', label: 'Published', count: postsList.filter(p => p.status === 'published').length },
                { id: 'draft', label: 'Drafts', count: postsList.filter(p => p.status === 'draft').length }
                // Scheduled option commented out
              ].map(st => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setLibraryFilter(st.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    libraryFilter === st.id
                      ? 'bg-gradient-to-r from-[#2B0847] to-[#48115B] text-white shadow-xs'
                      : 'bg-[#FAF5F0] text-[#6B5E77] hover:text-[#1E122C]'
                  }`}
                >
                  <span>{st.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[9px] ${
                    libraryFilter === st.id ? 'bg-white/20 text-white' : 'bg-white border border-[#F3DEC8] text-[#1E122C]'
                  }`}>
                    {st.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6B5E77]" />
              <input
                type="text"
                value={librarySearch}
                onChange={(e) => setLibrarySearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-9 pr-3.5 py-2 bg-[#FAF7F2]/60 border border-[#EADDCF] rounded-xl text-xs font-bold text-[#1E122C] outline-none focus:border-[#8C1F3D] focus:bg-white"
              />
            </div>
          </div>

          {/* Posts Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredPosts.map(post => (
              <div
                key={post.id}
                className="bg-white border border-[#F3DEC8]/80 rounded-3xl overflow-hidden shadow-[0_2px_12px_rgba(75,29,107,0.03)] hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Card Thumbnail Image Banner */}
                  <div className="h-48 w-full overflow-hidden relative bg-slate-100">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                    />
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                      <span className={`px-2.5 py-0.8 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${
                        post.status === 'published'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-700 text-white'
                      }`}>
                        {post.status}
                      </span>
                      <span className="px-2.5 py-0.8 rounded-full text-[10px] font-bold bg-white/95 backdrop-blur-xs text-[#1E122C] shadow-sm">
                        {post.category}
                      </span>
                    </div>

                    <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-xl shadow-sm flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-[#D94A2A]" />
                      <span className="text-[10px] font-black text-[#1E122C]">
                        {post.seoScore}/100 SEO
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-black text-[#1E122C] leading-snug line-clamp-2 group-hover:text-[#8C1F3D] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[#6B5E77] font-medium line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Metadata Pill Row */}
                    <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold text-[#6B5E77] pt-2 border-t border-[#F3DEC8]/60">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#EA580C]" />
                        {post.readingTime}
                      </span>
                      <span>•</span>
                      <span>{post.wordCount} words</span>
                      <span>•</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons Footer */}
                <div className="px-5 py-3.5 bg-[#FAF7F2]/60 border-t border-[#F3DEC8]/70 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveReadingArticle(post)}
                    className="flex-1 py-2 bg-white hover:bg-[#FFF8F5] border border-[#EADDCF] hover:border-[#8C1F3D] text-xs font-black text-[#1E122C] rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-3xs cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#8C1F3D]" />
                    <span>Read Article</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const dup: BlogArticle = {
                        ...post,
                        id: `b-${Date.now()}`,
                        title: `${post.title} (Copy)`,
                        status: 'draft',
                        createdAt: new Date().toISOString()
                      };
                      setPostsList(prev => [dup, ...prev]);
                    }}
                    className="p-2 bg-white hover:bg-[#FAF5F0] border border-[#EADDCF] text-[#6B5E77] hover:text-[#1E122C] rounded-xl transition-colors cursor-pointer"
                    title="Duplicate Post"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setPostsList(prev => prev.filter(p => p.id !== post.id))}
                    className="p-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 rounded-xl transition-colors cursor-pointer"
                    title="Delete Post"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: BLOG OVERVIEW & ANALYTICS DASHBOARD (WITH RICH GRAPH FOR CONTENT PILLARS)
          ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Top 4 KPI Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-[#F3DEC8]/80 p-5 rounded-3xl shadow-[0_2px_12px_rgba(75,29,107,0.03)] space-y-1">
              <span className="text-[10px] font-black text-[#6B5E77] uppercase tracking-wider block">Total Articles</span>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-[#1E122C]">{postsList.length} Posts</span>
                <div className="w-8 h-8 rounded-xl bg-[#FAF5F0] text-[#8C1F3D] flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
              </div>
              <span className="text-[10.5px] font-bold text-emerald-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" /> +4 this week
              </span>
            </div>

            <div className="bg-white border border-[#F3DEC8]/80 p-5 rounded-3xl shadow-[0_2px_12px_rgba(75,29,107,0.03)] space-y-1">
              <span className="text-[10px] font-black text-[#6B5E77] uppercase tracking-wider block">Organic Impressions</span>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-[#1E122C]">42.8K</span>
                <div className="w-8 h-8 rounded-xl bg-[#FFF0E6] text-[#EA580C] flex items-center justify-center font-bold">
                  <Globe className="w-4 h-4" />
                </div>
              </div>
              <span className="text-[10.5px] font-bold text-emerald-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" /> +18.4% MoM
              </span>
            </div>

            <div className="bg-white border border-[#F3DEC8]/80 p-5 rounded-3xl shadow-[0_2px_12px_rgba(75,29,107,0.03)] space-y-1">
              <span className="text-[10px] font-black text-[#6B5E77] uppercase tracking-wider block">Avg. SEO Quality</span>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-[#1E122C]">94 / 100</span>
                <div className="w-8 h-8 rounded-xl bg-[#E6F8F0] text-[#059669] flex items-center justify-center font-bold">
                  <Zap className="w-4 h-4" />
                </div>
              </div>
              <span className="text-[10.5px] font-bold text-emerald-600 flex items-center gap-1 mt-1">
                Top 5% search readiness
              </span>
            </div>

            <div className="bg-white border border-[#F3DEC8]/80 p-5 rounded-3xl shadow-[0_2px_12px_rgba(75,29,107,0.03)] space-y-1">
              <span className="text-[10px] font-black text-[#6B5E77] uppercase tracking-wider block">Avg. Time on Page</span>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-[#1E122C]">4m 12s</span>
                <div className="w-8 h-8 rounded-xl bg-[#F5EEFB] text-[#7E22CE] flex items-center justify-center font-bold">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <span className="text-[10.5px] font-bold text-emerald-600 flex items-center gap-1 mt-1">
                High reader engagement
              </span>
            </div>
          </div>

          {/* 2-Column Overview Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Top Performing Articles (5 Cols) */}
            <div className="lg:col-span-5 bg-white border border-[#F3DEC8]/80 rounded-3xl p-6 shadow-[0_2px_12px_rgba(75,29,107,0.03)] space-y-4">
              <div className="flex items-center justify-between border-b border-[#F3DEC8]/60 pb-3">
                <h3 className="text-xs font-black text-[#1E122C] uppercase tracking-wider flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#D94A2A]" />
                  Top Ranking Articles
                </h3>
                <span className="text-[10px] font-bold text-[#6B5E77]">By Organic Readers</span>
              </div>

              <div className="space-y-3">
                {postsList.slice(0, 3).map((p, idx) => (
                  <div key={p.id} className="p-3.5 rounded-2xl bg-[#FCFAF8] border border-[#F3DEC8]/70 flex items-center justify-between gap-3 hover:bg-white transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-7 h-7 rounded-xl bg-white border border-[#F3DEC8] text-xs font-black text-[#8C1F3D] flex items-center justify-center shrink-0">
                        0{idx + 1}
                      </span>
                      <div className="min-w-0">
                        <h4 className="text-xs font-black text-[#1E122C] truncate">{p.title}</h4>
                        <span className="text-[10.5px] text-[#6B5E77] font-semibold">{p.category} • {p.readingTime}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white border border-[#F3DEC8] text-xs font-black text-[#D94A2A] shrink-0">
                      {p.views ? `${p.views.toLocaleString()} views` : 'Draft'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* =========================================================================
                CONTENT PILLARS COVERAGE — RICH GRAPH & VISUALIZATION HUB (7 Cols)
                ========================================================================= */}
            <div className="lg:col-span-7 bg-white border border-[#F3DEC8]/80 rounded-3xl p-6 shadow-[0_4px_20px_rgba(75,29,107,0.04)] space-y-5">
              
              {/* Card Header & Chart Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F3DEC8]/60 pb-3">
                <div>
                  <h3 className="text-xs font-black text-[#1E122C] uppercase tracking-wider flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-[#FAF5F0] border border-[#F3DEC8] text-[#7E22CE] flex items-center justify-center">
                      <PieChart className="w-3.5 h-3.5 text-[#8C1F3D]" />
                    </div>
                    <span>Content Pillars Distribution Graph</span>
                  </h3>
                  <p className="text-[11px] text-[#6B5E77] font-medium mt-0.5">
                    Strategic coverage and organic keyword share across core brand topics
                  </p>
                </div>

                {/* Graph View Mode Toggle */}
                <div className="flex items-center gap-1 bg-[#FAF7F2] p-1 rounded-xl border border-[#EADDCF] shrink-0 self-start sm:self-center">
                  <button
                    type="button"
                    onClick={() => setPillarChartMode('donut')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      pillarChartMode === 'donut'
                        ? 'bg-[#2B0847] text-white shadow-xs'
                        : 'text-[#6B5E77] hover:text-[#1E122C]'
                    }`}
                  >
                    <PieChart className="w-3.5 h-3.5" />
                    <span>Donut Chart</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPillarChartMode('bars')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      pillarChartMode === 'bars'
                        ? 'bg-[#2B0847] text-white shadow-xs'
                        : 'text-[#6B5E77] hover:text-[#1E122C]'
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>Bar Metrics</span>
                  </button>
                </div>
              </div>

              {/* 1. DONUT GRAPH VIEW */}
              {pillarChartMode === 'donut' && (
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center pt-1 animate-in fade-in">
                  
                  {/* Interactive SVG Circular Donut Chart (5 Cols) */}
                  <div className="sm:col-span-5 flex flex-col items-center justify-center relative">
                    <div className="relative w-44 h-44 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        {/* Background Ring */}
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          fill="transparent"
                          stroke="#FAF5F0"
                          strokeWidth="14"
                        />
                        {/* Segment 1: AI & Marketing (45%) -> circumference = 2 * PI * 38 ≈ 238.76 -> 45% is ~107.4 */}
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          fill="transparent"
                          stroke="#8C1F3D"
                          strokeWidth="14"
                          strokeDasharray="107.4 238.8"
                          strokeDashoffset="0"
                          className="transition-all duration-500 cursor-pointer hover:stroke-width-16"
                          onMouseEnter={() => setActivePillarHover('ai_marketing')}
                          onMouseLeave={() => setActivePillarHover(null)}
                        />
                        {/* Segment 2: E-commerce (30%) -> 30% is ~71.6 */}
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          fill="transparent"
                          stroke="#EA580C"
                          strokeWidth="14"
                          strokeDasharray="71.6 238.8"
                          strokeDashoffset="-109"
                          className="transition-all duration-500 cursor-pointer hover:stroke-width-16"
                          onMouseEnter={() => setActivePillarHover('ecommerce_fashion')}
                          onMouseLeave={() => setActivePillarHover(null)}
                        />
                        {/* Segment 3: B2B LinkedIn (25%) -> 25% is ~59.7 */}
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          fill="transparent"
                          stroke="#4B1D6B"
                          strokeWidth="14"
                          strokeDasharray="59.7 238.8"
                          strokeDashoffset="-182"
                          className="transition-all duration-500 cursor-pointer hover:stroke-width-16"
                          onMouseEnter={() => setActivePillarHover('b2b_growth')}
                          onMouseLeave={() => setActivePillarHover(null)}
                        />
                      </svg>

                      {/* Donut Center Metrics */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                        <span className="text-xl font-black text-[#1E122C] leading-none">100%</span>
                        <span className="text-[9.5px] font-black uppercase tracking-wider text-[#8C1F3D] mt-0.5">3 Pillars</span>
                        <span className="text-[8.5px] font-bold text-[#6B5E77]">Active Content</span>
                      </div>
                    </div>

                    <span className="text-[10px] text-[#6B5E77] font-semibold mt-2">
                      Hover on slices for pillar stats
                    </span>
                  </div>

                  {/* Interactive Pillar Stat Badges List (7 Cols) */}
                  <div className="sm:col-span-7 space-y-2.5">
                    {CONTENT_PILLARS_DATA.map((p) => {
                      const Icon = p.icon;
                      const isHovered = activePillarHover === p.id;
                      return (
                        <div
                          key={p.id}
                          onMouseEnter={() => setActivePillarHover(p.id)}
                          onMouseLeave={() => setActivePillarHover(null)}
                          className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isHovered
                              ? `${p.lightBg} ${p.borderColor} shadow-xs scale-102`
                              : 'bg-[#FCFAF8] border-[#F3DEC8]/70 hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className="w-7 h-7 rounded-xl flex items-center justify-center text-white shrink-0 shadow-3xs"
                              style={{ backgroundColor: p.color }}
                            >
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs font-black text-[#1E122C] truncate">{p.title}</h4>
                              <span className="text-[10px] text-[#6B5E77] font-semibold block">
                                {p.articlesCount} Articles • {p.searchVolume}
                              </span>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span
                              className="text-xs font-black px-2.5 py-0.5 rounded-full text-white inline-block shadow-3xs"
                              style={{ backgroundColor: p.color }}
                            >
                              {p.percentage}%
                            </span>
                            <span className="text-[9px] font-bold text-emerald-600 block mt-0.5">
                              {p.growth}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 2. BAR METRICS & TRAFFIC COMPARISON VIEW */}
              {pillarChartMode === 'bars' && (
                <div className="space-y-4 pt-1 animate-in fade-in">
                  {CONTENT_PILLARS_DATA.map((p) => {
                    const Icon = p.icon;
                    return (
                      <div key={p.id} className="p-3.5 rounded-2xl bg-[#FCFAF8] border border-[#F3DEC8]/70 space-y-2">
                        <div className="flex items-center justify-between text-xs font-black text-[#1E122C]">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-6 h-6 rounded-lg flex items-center justify-center text-white shadow-3xs"
                              style={{ backgroundColor: p.color }}
                            >
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <span>{p.title}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[10.5px] font-bold text-[#6B5E77]">{p.searchVolume} search vol.</span>
                            <span
                              className="px-2 py-0.5 rounded-full text-white text-[10px] font-black"
                              style={{ backgroundColor: p.color }}
                            >
                              {p.percentage}%
                            </span>
                          </div>
                        </div>

                        {/* Visual Progress Bar */}
                        <div className="h-3 w-full bg-[#FAF5F0] rounded-full overflow-hidden p-0.5 border border-[#F3DEC8]/50">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${p.percentage}%` }}
                            transition={{ duration: 0.5 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: p.color }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[10px] font-bold text-[#6B5E77] pt-0.5">
                          <span>{p.articlesCount} Articles Published</span>
                          <span>SEO Readiness: {p.avgSeoScore}/100</span>
                          <span className="text-emerald-600 font-black">{p.trafficShare} Traffic Share</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* AI Strategic Recommendation Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#2B0847] to-[#48115B] text-white text-xs font-medium space-y-1.5 shadow-sm">
                <div className="flex items-center gap-1.5 font-black text-[#FFD188]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Pillar Recommendation</span>
                </div>
                <p className="text-[11px] text-white/90 leading-relaxed">
                  Publishing 2 more articles under <strong>'E-commerce & Fashion Growth'</strong> will bring its coverage to 40% and unlock #1 rankings for high-intent buyer keywords.
                </p>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          FULL ARTICLE PREVIEW / READER MODAL
          ========================================================================= */}
      {(isPreviewModalOpen || activeReadingArticle) && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-5">
          <div
            className="fixed inset-0 bg-[#1E122C]/50 backdrop-blur-xs"
            onClick={() => { setIsPreviewModalOpen(false); setActiveReadingArticle(null); }}
          />

          <div className="relative bg-white rounded-[32px] max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-[#F3DEC8] z-10 space-y-5 max-h-[90vh] flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-[#F3DEC8] pb-3 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0 pr-4">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <h3 className="text-sm sm:text-base font-black text-[#1E122C] truncate">
                  {(activeReadingArticle || generatedArticle)?.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    const text = (activeReadingArticle || generatedArticle)?.contentMarkdown || '';
                    navigator.clipboard.writeText(text);
                    alert('Copied Markdown to clipboard!');
                  }}
                  className="px-3.5 py-1.8 bg-[#FAF5F0] hover:bg-[#F5EEFB] border border-[#F3DEC8] text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-[#8C1F3D]"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setIsPreviewModalOpen(false); setActiveReadingArticle(null); }}
                  className="p-2 hover:bg-[#FAF5F0] rounded-xl text-[#6B5E77] hover:text-[#1E122C] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 border-b border-[#F3DEC8]/60 pb-2.5 shrink-0 overflow-x-auto">
              {[
                { id: 'rendered', label: 'Article Reader', icon: Eye },
                { id: 'markdown', label: 'Markdown Source', icon: FileText },
                { id: 'html', label: 'HTML Code', icon: Code },
                { id: 'seo', label: 'SEO Metadata', icon: Zap }
              ].map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setPreviewTab(t.id as any)}
                  className={`px-3.5 py-1.8 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    previewTab === t.id
                      ? 'bg-[#2B0847] text-white shadow-xs'
                      : 'bg-[#FAF5F0] text-[#6B5E77] hover:text-[#1E122C]'
                  }`}
                >
                  <t.icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 text-left custom-scrollbar">
              {previewTab === 'rendered' && (
                <div className="space-y-5">
                  {(activeReadingArticle || generatedArticle)?.featuredImage && (
                    <img
                      src={(activeReadingArticle || generatedArticle)?.featuredImage}
                      alt="Featured banner"
                      className="w-full h-60 object-cover rounded-2xl border border-[#F3DEC8]"
                    />
                  )}
                  <div
                    className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-[#1E122C]"
                    dangerouslySetInnerHTML={{ __html: (activeReadingArticle || generatedArticle)?.contentHtml || '' }}
                  />
                </div>
              )}

              {previewTab === 'markdown' && (
                <pre className="p-5 bg-slate-900 text-slate-100 rounded-2xl text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {(activeReadingArticle || generatedArticle)?.contentMarkdown}
                </pre>
              )}

              {previewTab === 'html' && (
                <pre className="p-5 bg-slate-900 text-emerald-400 rounded-2xl text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {(activeReadingArticle || generatedArticle)?.contentHtml}
                </pre>
              )}

              {previewTab === 'seo' && (
                <div className="space-y-4 bg-[#FAF7F2]/80 p-5 rounded-2xl border border-[#F3DEC8]">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-[#6B5E77]">Meta Title</span>
                    <p className="text-xs font-bold text-[#1E122C]">{(activeReadingArticle || generatedArticle)?.title} | {siteName}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-[#6B5E77]">Meta Description</span>
                    <p className="text-xs font-medium text-[#1E122C]">{(activeReadingArticle || generatedArticle)?.excerpt}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-[#6B5E77]">Canonical Slug</span>
                    <code className="text-xs font-mono text-[#8C1F3D] bg-white px-2 py-0.5 rounded-lg border border-[#F3DEC8] inline-block">
                      {articlePathPrefix}/{(activeReadingArticle || generatedArticle)?.slug}
                    </code>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#F3DEC8] flex items-center justify-between gap-3 shrink-0">
              <span className="text-xs font-bold text-[#6B5E77]">
                {(activeReadingArticle || generatedArticle)?.wordCount} words • {(activeReadingArticle || generatedArticle)?.seoScore}/100 SEO Score
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => { setIsPreviewModalOpen(false); setActiveReadingArticle(null); }}
                  className="px-4 py-2 border border-[#EADDCF] hover:bg-[#FAF5F0] text-xs font-bold rounded-xl cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert('Article published to live website & synced to CMS!');
                    setIsPreviewModalOpen(false);
                    setActiveReadingArticle(null);
                  }}
                  className="px-5 py-2 bg-gradient-to-r from-[#2B0847] via-[#5C164E] to-[#8C1F3D] text-white text-xs font-black rounded-xl shadow-xs cursor-pointer hover:shadow-md"
                >
                  Publish to Live Blog
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Blog;



