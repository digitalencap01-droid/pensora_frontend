import React, { useEffect, useMemo, useState } from 'react';
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
import {
  useGenerateContentMutation,
  useProjectArtifactsQuery,
  useProjectsQuery,
  useUsageSummaryQuery,
} from '../hooks/useBlogQueries';
import { BlogApiError } from '../services/blogApi';
import {
  ArticleResult,
  ArticleType,
  ContentGenerateRequest,
  ContentGenerateResult,
  ContentGoal,
  Freshness,
  KeywordResult,
  ProjectArtifactsResult,
  ProjectStatus,
  ProjectSummary,
  SEOResult,
  ToneType,
} from '../types/blogApi';

// Real backend project status (app/schemas/project_management.py: ProjectSummary.status)
const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
  completed: 'Completed',
  generating: 'Generating',
  failed: 'Failed',
};

// Article Item Interface. For a freshly generated article (write tab) every field
// is populated from the real ContentGenerateResult. For a library card, fields are
// filled progressively: cheap ones come from ProjectSummary immediately, the rest
// (excerpt/content/SEO score/word count) only after the user opens it and its full
// artifacts (article/seo/html) are fetched — see isEnriched.
export interface BlogArticle {
  id: string; // backend project_id
  title: string;
  topic: string;
  excerpt: string;
  contentHtml: string;
  contentMarkdown: string;
  slug: string;
  status: ProjectStatus;
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
  isEnriched: boolean;
}

const TONE_OPTIONS: { id: ToneType; label: string }[] = [
  { id: 'authoritative', label: 'Authoritative' },
  { id: 'professional', label: 'Professional' },
  { id: 'conversational', label: 'Conversational' },
  { id: 'technical', label: 'Technical' },
  { id: 'educational', label: 'Educational' }
];

const LANGUAGE_CODE_MAP: Record<string, string> = {
  English: 'en',
  Spanish: 'es',
  French: 'fr',
  German: 'de',
  Hindi: 'hi'
};

function summaryToArticle(p: ProjectSummary): BlogArticle {
  const excerptByStatus: Record<ProjectStatus, string> = {
    generating: 'The AI pipeline is still researching and writing this article…',
    failed: `Generation failed${p.error_stage ? ` at the ${p.error_stage} stage` : ''}. Try generating this topic again.`,
    completed: 'Open this article to load its full content, SEO score and metadata.'
  };
  return {
    id: p.id,
    title: p.topic,
    topic: p.topic,
    excerpt: excerptByStatus[p.status],
    contentHtml: '',
    contentMarkdown: '',
    slug: '',
    status: p.status,
    wordCount: 0,
    readingTime: '—',
    seoScore: 0,
    featuredImage: '',
    thumbnailImage: '',
    author: '—',
    category: p.article_type,
    tone: p.tone,
    contentGoal: '',
    targetKeywords: [],
    createdAt: p.created_at,
    isEnriched: false
  };
}

function extractKeywords(keywords: KeywordResult | null): string[] {
  if (!keywords) return [];
  return [keywords.primary_keyword.keyword, ...keywords.secondary_keywords.map(k => k.keyword)].slice(0, 6);
}

function artifactsToArticle(
  base: { id: string; status: ProjectStatus; createdAt: string; articleType: string; tone: string },
  article: ArticleResult,
  seo: SEOResult,
  keywords: KeywordResult | null,
  htmlBody: string
): BlogArticle {
  return {
    id: base.id,
    title: article.title,
    topic: article.topic,
    excerpt: seo.meta_description,
    contentHtml: htmlBody,
    contentMarkdown: article.article_markdown,
    slug: seo.slug,
    status: base.status,
    wordCount: article.total_word_count,
    readingTime: `${Math.max(1, Math.ceil(article.total_word_count / 250))} min read`,
    seoScore: seo.readiness_score,
    featuredImage: seo.thumbnail_url || '',
    thumbnailImage: seo.thumbnail_url || '',
    author: '—',
    category: base.articleType,
    tone: base.tone,
    contentGoal: '',
    targetKeywords: extractKeywords(keywords),
    createdAt: base.createdAt,
    isEnriched: true
  };
}


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
  const [articleType, setArticleType] = useState<ArticleType>('blog');
  const [tone, setTone] = useState<ToneType>('authoritative');
  const [contentGoal, setContentGoal] = useState<ContentGoal>('organic_traffic');
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

  // Generation & Pipeline State
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStage, setGenerationStage] = useState<number>(0);
  const [generationLog, setGenerationLog] = useState<string>('');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [generatedArticle, setGeneratedArticle] = useState<BlogArticle | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
  const [previewTab, setPreviewTab] = useState<'rendered' | 'markdown' | 'seo' | 'html'>('rendered');

  const generateMutation = useGenerateContentMutation();

  // Blog Post History / Library — backed by real GET /api/v1/projects data
  const { data: projectsData, isLoading: projectsLoading, error: projectsError } = useProjectsQuery();
  const projects = useMemo(() => projectsData?.items || [], [projectsData]);
  const [libraryFilter, setLibraryFilter] = useState<'all' | ProjectStatus>('all');
  const [librarySearch, setLibrarySearch] = useState<string>('');

  // Full article/seo/html for a project, fetched lazily on "Read Article" and cached
  // so a library card upgrades from summary-only to fully enriched once opened.
  const [artifactsCache, setArtifactsCache] = useState<Record<string, ProjectArtifactsResult>>({});
  const [activeReadingProjectId, setActiveReadingProjectId] = useState<string | null>(null);
  const {
    data: activeArtifacts,
    isLoading: activeArtifactsLoading,
    error: activeArtifactsError
  } = useProjectArtifactsQuery(activeReadingProjectId);

  useEffect(() => {
    if (activeReadingProjectId && activeArtifacts) {
      setArtifactsCache(prev => ({ ...prev, [activeReadingProjectId]: activeArtifacts }));
    }
  }, [activeReadingProjectId, activeArtifacts]);

  const projectToArticle = (p: ProjectSummary): BlogArticle => {
    const cached = artifactsCache[p.id];
    if (cached?.article && cached.seo) {
      return artifactsToArticle(
        { id: p.id, status: p.status, createdAt: p.created_at, articleType: p.article_type, tone: p.tone },
        cached.article,
        cached.seo,
        cached.keywords,
        cached.html?.article_html || ''
      );
    }
    return summaryToArticle(p);
  };

  const activeReadingSummary = projects.find(p => p.id === activeReadingProjectId) || null;
  const activeReadingArticle = activeReadingSummary ? projectToArticle(activeReadingSummary) : null;

  const buildGenerateRequest = (): ContentGenerateRequest => {
    const normalizedSiteUrl = /^https?:\/\//i.test(siteUrl.trim()) ? siteUrl.trim() : `https://${siteUrl.trim()}`;
    const isValidImageUrl = (url: string) => /^https?:\/\//i.test(url.trim());

    return {
      topic: topic.trim(),
      country_code: country,
      language,
      language_code: LANGUAGE_CODE_MAP[language] || 'en',
      freshness: freshness as Freshness,
      max_research_queries: Math.min(6, Math.max(2, searchQueriesCount)),
      article_type: articleType,
      tone,
      target_audience: targetAudience.trim() || undefined,
      content_goal: contentGoal,
      target_word_count: targetWordCount,
      call_to_action: callToAction.trim() || undefined,
      additional_instructions: additionalInstructions.trim() || undefined,
      brand_name: brandName.trim() || undefined,
      site_name: siteName.trim() || undefined,
      site_url: normalizedSiteUrl,
      article_path_prefix: articlePathPrefix.trim() || '/blog',
      authors: authorName.trim().length >= 2 ? [{ name: authorName.trim() }] : [],
      featured_image_urls: isValidImageUrl(mainImage) ? [mainImage.trim()] : [],
      thumbnail_image_url: isValidImageUrl(thumbnailImage) ? thumbnailImage.trim() : (isValidImageUrl(mainImage) ? mainImage.trim() : undefined),
      slug_override: slugOverride.trim() || undefined,
      indexable: isIndexable,
      include_sources: includeSources
    };
  };

  const mapGenerateResult = (result: ContentGenerateResult): BlogArticle =>
    artifactsToArticle(
      { id: result.project_id, status: 'completed', createdAt: new Date().toISOString(), articleType, tone },
      result.article,
      result.seo,
      result.keywords,
      result.html.article_html
    );

  // Handle generation — runs the real backend pipeline (research -> keywords ->
  // brief -> article -> SEO -> HTML) via POST /api/v1/content/generate. The
  // backend call is a single blocking request (it doesn't stream progress), so
  // the staged log below is a cosmetic ticker to reassure the user during the
  // real wait; the final result always comes from the actual API response.
  const handleGenerateArticle = async () => {
    if (topic.trim().length < 3 || isGenerating) return;

    setGenerationError(null);
    setIsGenerating(true);
    setGenerationStage(1);
    setGenerationLog(`Researching ${Math.min(6, Math.max(2, searchQueriesCount))} live queries in ${country} (${language})...`);

    const stageMessages = [
      'Synthesizing keyword intent & competitor outlines...',
      'Structuring the article outline...',
      `Writing the ${targetWordCount}-word article in a ${tone} tone...`,
      'Generating SEO metadata, JSON-LD schema & HTML...'
    ];
    let stageIdx = 0;
    const stageInterval = setInterval(() => {
      setGenerationStage(prev => Math.min(prev + 1, 5));
      setGenerationLog(stageMessages[Math.min(stageIdx, stageMessages.length - 1)]);
      stageIdx++;
    }, 6000);

    try {
      const payload = buildGenerateRequest();
      const result = await generateMutation.mutateAsync(payload);
      setGenerationStage(6);
      setGenerationLog('Article generated and validated successfully!');
      const newArticle = mapGenerateResult(result);
      setGeneratedArticle(newArticle);
      setIsPreviewModalOpen(true);
    } catch (err) {
      const message = err instanceof BlogApiError ? err.message : 'Failed to generate the article. Please try again.';
      setGenerationError(message);
    } finally {
      clearInterval(stageInterval);
      setIsGenerating(false);
    }
  };

  const filteredPosts = useMemo(() => {
    return projects
      .filter(p => libraryFilter === 'all' || p.status === libraryFilter)
      .filter(p => {
        if (librarySearch === '') return true;
        const needle = librarySearch.toLowerCase();
        return p.topic.toLowerCase().includes(needle) || p.article_type.toLowerCase().includes(needle);
      })
      .map(projectToArticle);
  }, [projects, libraryFilter, librarySearch, artifactsCache]);

  return (
    <div className="space-y-6 text-left font-sans animate-in fade-in duration-300 pb-20 relative w-full max-w-full min-w-0">
      
      {/* =========================================================================
          1. HEADER WITH STUDIO MODE TOGGLE
          ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#EDE8F8]">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-[#BE185D] via-[#DB2777] to-[#EC4899] text-white flex items-center justify-center shadow-[0_4px_16px_rgba(219,39,119,0.2)]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-[#1E122C] tracking-tight">
                  AI Blog Studio
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-pink-50 border border-pink-200 text-[#DB2777] text-[10px] font-black uppercase tracking-wider">
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
        <div className="flex items-center gap-1.5 p-1.5 bg-white/90 backdrop-blur-xs border border-[#EDE8F8] rounded-2xl shadow-3xs">
          <button
            type="button"
            onClick={() => setTab('write')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'write'
                ? 'bg-gradient-to-r from-[#BE185D] via-[#DB2777] to-[#EC4899] text-white shadow-xs'
                : 'text-[#6B5E77] hover:text-[#1E122C] hover:bg-[#FAF8FE]'
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
                ? 'bg-gradient-to-r from-[#BE185D] via-[#DB2777] to-[#EC4899] text-white shadow-xs'
                : 'text-[#6B5E77] hover:text-[#1E122C] hover:bg-[#FAF8FE]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Post History</span>
            <span className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] ${
              activeTab === 'library' ? 'bg-white/20 text-white' : 'bg-[#FAF8FE] text-[#DB2777] border border-[#EDE8F8]'
            }`}>
              {projectsData?.total ?? projects.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setTab('overview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-[#BE185D] via-[#DB2777] to-[#EC4899] text-white shadow-xs'
                : 'text-[#6B5E77] hover:text-[#1E122C] hover:bg-[#FAF8FE]'
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
          
          {/* 2-Column Split Studio Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* =========================================================================
                LEFT PANEL (7 Cols): STUDIO COCKPIT & CONFIGURATOR
                ========================================================================= */}
            <div className="lg:col-span-7 bg-white border border-[#EDE8F8] rounded-3xl p-6 sm:p-7 shadow-[0_8px_30px_-6px_rgba(219,39,119,0.06)] space-y-6">
              
              {/* Studio Step Navigation Tabs */}
              <div className="flex items-center justify-between gap-2 p-1.5 bg-[#FAF8FE] rounded-2xl border border-[#EDE8F8]">
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
                        ? 'bg-gradient-to-r from-[#BE185D] via-[#DB2777] to-[#EC4899] text-white shadow-xs'
                        : 'text-[#6B5E77] hover:text-[#1E122C] hover:bg-white'
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
                        <Sparkles className="w-3.5 h-3.5 text-[#DB2777]" />
                        Article Core Topic / Keyword Focus <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[11px] font-bold text-[#DB2777]">Live AI Web Crawler Active</span>
                    </div>

                    <textarea
                      rows={3}
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g. How small businesses can use AI for autonomous customer support"
                      className="w-full bg-[#FAF8FE]/60 border border-[#EDE8F8] rounded-2xl p-4 text-xs sm:text-sm font-bold text-[#1E122C] placeholder-[#9E92A6] outline-none focus:border-[#DB2777] focus:bg-white focus:ring-4 focus:ring-[#DB2777]/10 transition-all resize-none shadow-3xs"
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
                          className="px-3 py-1 rounded-xl bg-[#FAF8FE] hover:bg-[#FDF2F8] border border-[#EDE8F8] hover:border-[#DB2777]/40 text-[11px] font-bold text-[#6B5E77] hover:text-[#DB2777] transition-all cursor-pointer"
                        >
                          + {chip}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Destination Switcher */}
                  <div className="space-y-2 pt-2 border-t border-[#EDE8F8]">
                    <label className="text-[11px] font-black text-[#6B5E77] uppercase tracking-wide">
                      Target Channel Output
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setTargetPlatform('blog')}
                        className={`p-3 rounded-2xl border text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          targetPlatform === 'blog'
                            ? 'bg-gradient-to-r from-[#BE185D] to-[#DB2777] text-white border-[#DB2777] shadow-xs'
                            : 'bg-white border-[#EDE8F8] text-[#6B5E77] hover:border-[#DB2777]'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-pink-200" />
                        <span>Blog Article</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setTargetPlatform('linkedin')}
                        className={`p-3 rounded-2xl border text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          targetPlatform === 'linkedin'
                            ? 'bg-[#0A66C2] text-white border-[#0A66C2] shadow-xs'
                            : 'bg-white border-[#EDE8F8] text-[#6B5E77] hover:border-[#0A66C2]'
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
                            : 'bg-white border-[#EDE8F8] text-[#6B5E77] hover:border-[#146EF5]'
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
                      <label className="text-[11px] font-bold text-[#6B5E77] block">Target Country</label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-[#FAF8FE]/60 border border-[#EDE8F8] rounded-xl px-3 py-2.5 text-xs font-bold text-[#1E122C] outline-none focus:border-[#DB2777] cursor-pointer"
                      >
                        <option value="IN">🇮🇳 India (IN)</option>
                        <option value="US">🇺🇸 United States (US)</option>
                        <option value="GB">🇬🇧 United Kingdom (GB)</option>
                        <option value="CA">🇨🇦 Canada (CA)</option>
                        <option value="AU">🇦🇺 Australia (AU)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-[#6B5E77] block">Language</label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full bg-[#FAF8FE]/60 border border-[#EDE8F8] rounded-xl px-3 py-2.5 text-xs font-bold text-[#1E122C] outline-none focus:border-[#DB2777] cursor-pointer"
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Hindi">Hindi</option>
                      </select>
                    </div>

                    <div className="space-y-1.5 col-span-2 sm:col-span-1">
                      <label className="text-[11px] font-bold text-[#6B5E77] block">Freshness</label>
                      <select
                        value={freshness}
                        onChange={(e) => setFreshness(e.target.value)}
                        className="w-full bg-[#FAF8FE]/60 border border-[#EDE8F8] rounded-xl px-3 py-2.5 text-xs font-bold text-[#1E122C] outline-none focus:border-[#DB2777] cursor-pointer"
                      >
                        <option value="24h">Last 24 hours</option>
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days (Default)</option>
                        <option value="90d">Last 90 days</option>
                        <option value="1y">Last year</option>
                        <option value="any">All time</option>
                      </select>
                    </div>
                  </div>

                  {/* Search Query Depth Slider */}
                  <div className="space-y-2 p-4 rounded-2xl bg-[#FAF8FE] border border-[#EDE8F8]">
                    <div className="flex items-center justify-between text-xs font-bold text-[#1E122C]">
                      <span>Live Search Query Depth</span>
                      <span className="text-[#DB2777] font-black">{searchQueriesCount} Live Queries Analyzed</span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={6}
                      value={searchQueriesCount}
                      onChange={(e) => setSearchQueriesCount(Number(e.target.value))}
                      className="w-full accent-[#DB2777] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-bold text-[#6B5E77]">
                      <span>Fast (2 queries)</span>
                      <span>Deep Search Engine Crawl (6 queries)</span>
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
                      <FileText className="w-3.5 h-3.5 text-[#7C3AED]" />
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
                              ? 'bg-[#FDF2F8] border-[#DB2777] text-[#DB2777] shadow-xs'
                              : 'bg-white border-[#EDE8F8] text-[#6B5E77] hover:border-[#DB2777]/50'
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
                      <div className="p-4 rounded-2xl bg-[#FAF8FE] border border-dashed border-[#EDE8F8] text-center space-y-2">
                        <Upload className="w-5 h-5 text-[#DB2777] mx-auto" />
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
                          className="inline-block px-3.5 py-1.5 bg-white border border-[#EDE8F8] text-xs font-bold rounded-xl cursor-pointer hover:bg-[#FAF8FE]"
                        >
                          Choose Document File
                        </label>
                        {uploadedDocName && (
                          <span className="block text-xs font-bold text-emerald-700">Attached: {uploadedDocName}</span>
                        )}
                      </div>
                    )}

                    {groundingMode !== 'web' && (
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] font-bold text-amber-800 flex items-start gap-2">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>Document/image upload grounding isn't wired to the backend yet in this build — generation will run with live web research only.</span>
                      </div>
                    )}
                  </div>

                  {/* Featured Banner Visual Deck */}
                  <div className="space-y-3 pt-2 border-t border-[#EDE8F8]">
                    <label className="text-xs font-black text-[#1E122C] uppercase tracking-wide flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-[#DB2777]" />
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
                            mainImage === imgUrl ? 'border-[#DB2777] ring-2 ring-[#DB2777]/20' : 'border-[#EDE8F8] opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={imgUrl} alt="Preset" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10.5px] font-bold text-[#6B5E77]">Custom Image URL</label>
                      <input
                        type="url"
                        value={mainImage}
                        onChange={(e) => { setMainImage(e.target.value); setThumbnailImage(e.target.value); }}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full bg-[#FAF8FE]/60 border border-[#EDE8F8] rounded-xl px-3 py-2 text-xs font-semibold text-[#1E122C] outline-none focus:border-[#DB2777]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: STRATEGY, SPECS & PUBLISHING */}
              {activeStep === 3 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  {/* Word Count Slider */}
                  <div className="space-y-2 p-4 rounded-2xl bg-[#FAF8FE] border border-[#EDE8F8]">
                    <div className="flex items-center justify-between text-xs font-bold text-[#1E122C]">
                      <span>Target Article Length</span>
                      <span className="text-[#DB2777] font-black">{targetWordCount} Words (~{Math.ceil(targetWordCount / 250)} min read)</span>
                    </div>
                    <input
                      type="range"
                      min={800}
                      max={4000}
                      step={200}
                      value={targetWordCount}
                      onChange={(e) => setTargetWordCount(Number(e.target.value))}
                      className="w-full accent-[#DB2777] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-bold text-[#6B5E77]">
                      <span>Short Post (800w)</span>
                      <span>Deep Pillar Guide (4000w)</span>
                    </div>
                  </div>

                  {/* Tone of Voice Selector */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-[#6B5E77] uppercase tracking-wide">
                      Tone of Voice
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {TONE_OPTIONS.map(t => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTone(t.id)}
                          className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                            tone === t.id
                              ? 'bg-gradient-to-r from-[#BE185D] to-[#DB2777] text-white border-[#DB2777] shadow-xs'
                              : 'bg-white border-[#EDE8F8] text-[#6B5E77] hover:border-[#DB2777]'
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
                      <label className="text-[10.5px] font-bold text-[#6B5E77]">Target Audience</label>
                      <input
                        type="text"
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                        className="w-full bg-[#FAF8FE]/60 border border-[#EDE8F8] rounded-xl px-3 py-2 text-xs font-bold text-[#1E122C] outline-none focus:border-[#DB2777]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10.5px] font-bold text-[#6B5E77]">Custom Call to Action</label>
                      <input
                        type="text"
                        value={callToAction}
                        onChange={(e) => setCallToAction(e.target.value)}
                        className="w-full bg-[#FAF8FE]/60 border border-[#EDE8F8] rounded-xl px-3 py-2 text-xs font-bold text-[#1E122C] outline-none focus:border-[#DB2777]"
                      />
                    </div>
                  </div>

                  {/* Publishing Meta Row */}
                  <div className="grid grid-cols-2 gap-3.5 pt-2 border-t border-[#EDE8F8]">
                    <div className="space-y-1">
                      <label className="text-[10.5px] font-bold text-[#6B5E77]">Author</label>
                      <input
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="w-full bg-[#FAF8FE]/60 border border-[#EDE8F8] rounded-xl px-3 py-2 text-xs font-bold text-[#1E122C] outline-none focus:border-[#DB2777]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10.5px] font-bold text-[#6B5E77]">Path Prefix</label>
                      <input
                        type="text"
                        value={articlePathPrefix}
                        onChange={(e) => setArticlePathPrefix(e.target.value)}
                        className="w-full bg-[#FAF8FE]/60 border border-[#EDE8F8] rounded-xl px-3 py-2 text-xs font-bold text-[#1E122C] outline-none focus:border-[#DB2777]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step Forward / Backward Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-[#EDE8F8]">
                <div className="flex items-center gap-2">
                  {activeStep > 1 && (
                    <button
                      type="button"
                      onClick={() => setActiveStep(prev => prev - 1)}
                      className="px-4 py-2 bg-[#FAF8FE] hover:bg-slate-50 border border-[#EDE8F8] text-xs font-black text-[#6B5E77] rounded-xl cursor-pointer"
                    >
                      ← Back
                    </button>
                  )}
                  {activeStep < 3 && (
                    <button
                      type="button"
                      onClick={() => setActiveStep(prev => prev + 1)}
                      className="px-4 py-2 bg-white hover:bg-[#FDF4F8] border border-[#EDE8F8] hover:border-[#DB2777] text-xs font-black text-[#1E122C] rounded-xl cursor-pointer"
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
              <div className="bg-white border border-[#EDE8F8] rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(219,39,119,0.08)] sticky top-6">
                
                {/* Hero Banner Preview */}
                <div className="h-44 w-full relative bg-slate-100 overflow-hidden">
                  <img src={mainImage} alt="Hero Banner" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-between p-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[10px] font-black text-[#1E122C] shadow-sm uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#DB2777]" />
                        {targetPlatform.toUpperCase()}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-black shadow-sm">
                        LIVE AI PIPELINE
                      </span>
                    </div>

                    <div className="text-white space-y-0.5">
                      <span className="text-[10px] font-bold text-pink-200 uppercase tracking-wider">Blueprint Preview</span>
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
                    <div className="p-2.5 rounded-2xl bg-[#FAF8FE] border border-[#EDE8F8]">
                      <span className="text-[9.5px] font-black uppercase text-[#6B5E77] block">Length</span>
                      <span className="text-xs font-black text-[#1E122C]">{targetWordCount}w</span>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-[#FAF8FE] border border-[#EDE8F8]">
                      <span className="text-[9.5px] font-black uppercase text-[#6B5E77] block">Read Time</span>
                      <span className="text-xs font-black text-[#1E122C]">~{Math.ceil(targetWordCount / 250)} min</span>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-[#FAF8FE] border border-[#EDE8F8]">
                      <span className="text-[9.5px] font-black uppercase text-[#6B5E77] block">Tone</span>
                      <span className="text-xs font-black text-[#DB2777] capitalize">{tone}</span>
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
                        <div key={idx} className="p-2 rounded-xl bg-[#FAF8FE]/80 border border-[#EDE8F8] flex items-center justify-between">
                          <span className="truncate pr-2">{chap}</span>
                          <span className="text-[10px] text-[#DB2777] font-mono">H2</span>
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
                          ? 'bg-gradient-to-r from-[#BE185D] via-[#DB2777] to-[#EC4899] hover:shadow-[0_8px_25px_rgba(219,39,119,0.35)] hover:scale-102 active:scale-98 cursor-pointer'
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
                          <Sparkles className="w-4 h-4 text-pink-100" />
                          <span>Generate Complete Article</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* AI Generation Live Simulation */}
                  {isGenerating && (
                    <div className="p-4 rounded-2xl bg-[#FDF4F8] border border-[#FCE7F3] space-y-2.5 animate-in fade-in">
                      <div className="flex items-center justify-between text-xs font-black text-[#1E122C]">
                        <span>Stage {generationStage} of 6</span>
                        <span className="text-[#DB2777]">{(generationStage / 6 * 100).toFixed(0)}% Complete</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#BE185D] via-[#DB2777] to-[#EC4899] rounded-full"
                          animate={{ width: `${(generationStage / 6) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <p className="text-[11px] font-bold text-[#6B5E77] italic">{generationLog}</p>
                    </div>
                  )}

                  {generationError && !isGenerating && (
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1 animate-in fade-in">
                      <div className="flex items-center gap-2 text-xs font-black text-rose-700">
                        <AlertCircle className="w-4 h-4" />
                        <span>Generation failed</span>
                      </div>
                      <p className="text-[11px] font-bold text-rose-600">{generationError}</p>
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#EDE8F8] p-4 rounded-3xl shadow-xs">

            {/* Status Filter Tabs — real backend project statuses */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {[
                { id: 'all' as const, label: 'All Projects', count: projects.length },
                { id: 'completed' as const, label: 'Completed', count: projects.filter(p => p.status === 'completed').length },
                { id: 'generating' as const, label: 'Generating', count: projects.filter(p => p.status === 'generating').length },
                { id: 'failed' as const, label: 'Failed', count: projects.filter(p => p.status === 'failed').length }
              ].map(st => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setLibraryFilter(st.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    libraryFilter === st.id
                      ? 'bg-gradient-to-r from-[#BE185D] via-[#DB2777] to-[#EC4899] text-white shadow-xs'
                      : 'bg-[#FAF8FE] text-[#6B5E77] hover:text-[#1E122C]'
                  }`}
                >
                  <span>{st.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[9px] ${
                    libraryFilter === st.id ? 'bg-white/20 text-white' : 'bg-white border border-[#EDE8F8] text-[#1E122C]'
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
                placeholder="Search by topic or type..."
                className="w-full pl-9 pr-3.5 py-2 bg-[#FAF8FE]/60 border border-[#EDE8F8] rounded-xl text-xs font-bold text-[#1E122C] outline-none focus:border-[#DB2777] focus:bg-white"
              />
            </div>
          </div>

          {projectsLoading && (
            <div className="p-8 text-center bg-white border border-[#EDE8F8] rounded-3xl text-sm font-bold text-[#6B5E77]">
              Loading your projects from the backend...
            </div>
          )}

          {!projectsLoading && projectsError && (
            <div className="p-6 bg-rose-50 border border-rose-200 rounded-3xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-black text-rose-700">Could not load your projects</p>
                <p className="text-xs font-bold text-rose-600 mt-1">
                  {projectsError instanceof BlogApiError ? projectsError.message : 'Is the Pensora backend running on the expected port?'}
                </p>
              </div>
            </div>
          )}

          {!projectsLoading && !projectsError && filteredPosts.length === 0 && (
            <div className="p-10 text-center bg-white border border-dashed border-[#EDE8F8] rounded-3xl">
              <p className="text-sm font-black text-[#1E122C]">No articles yet</p>
              <p className="text-xs font-bold text-[#6B5E77] mt-1">Generate your first article from the Studio Workspace tab.</p>
            </div>
          )}

          {/* Posts Cards Grid */}
          {!projectsLoading && !projectsError && filteredPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredPosts.map(post => (
                <div
                  key={post.id}
                  className="bg-white border border-[#EDE8F8] rounded-3xl overflow-hidden shadow-xs hover:border-[#DDD6FE] hover:shadow-[0_8px_25px_rgba(219,39,119,0.08)] transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Card Thumbnail Image Banner */}
                    <div className="h-48 w-full overflow-hidden relative bg-gradient-to-br from-[#FAF8FE] to-[#F3EAFF] flex items-center justify-center">
                      {post.featuredImage ? (
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                        />
                      ) : (
                        <FileText className="w-8 h-8 text-[#DB2777]/40" />
                      )}
                      <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                        <span className={`px-2.5 py-0.8 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${
                          post.status === 'completed'
                            ? 'bg-emerald-600 text-white'
                            : post.status === 'failed'
                              ? 'bg-rose-600 text-white'
                              : 'bg-amber-500 text-white'
                        }`}>
                          {PROJECT_STATUS_LABEL[post.status]}
                        </span>
                        <span className="px-2.5 py-0.8 rounded-full text-[10px] font-bold bg-white/95 backdrop-blur-xs text-[#1E122C] shadow-sm">
                          {post.category}
                        </span>
                      </div>

                      {post.isEnriched && (
                        <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-xl shadow-sm flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 text-[#DB2777]" />
                          <span className="text-[10px] font-black text-[#1E122C]">
                            {post.seoScore}/100 SEO
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-5 space-y-3">
                      <h3 className="text-base font-black text-[#1E122C] leading-snug line-clamp-2 group-hover:text-[#DB2777] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-xs text-[#6B5E77] font-medium line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>

                      {/* Metadata Pill Row */}
                      <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold text-[#6B5E77] pt-2 border-t border-[#EDE8F8]">
                        {post.isEnriched ? (
                          <>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#DB2777]" />
                              {post.readingTime}
                            </span>
                            <span>•</span>
                            <span>{post.wordCount} words</span>
                          </>
                        ) : (
                          <span className="capitalize">{post.tone} tone</span>
                        )}
                        <span>•</span>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="px-5 py-3.5 bg-[#FAF8FE]/80 border-t border-[#EDE8F8]">
                    <button
                      type="button"
                      disabled={post.status === 'generating'}
                      onClick={() => setActiveReadingProjectId(post.id)}
                      className="w-full py-2 bg-white hover:bg-[#FDF4F8] border border-[#EDE8F8] hover:border-[#DB2777] disabled:opacity-50 disabled:cursor-not-allowed text-xs font-black text-[#1E122C] rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-3xs cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#DB2777]" />
                      <span>{post.status === 'generating' ? 'Still Generating...' : 'Read Article'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 3: BLOG OVERVIEW & ANALYTICS DASHBOARD (WITH RICH GRAPH FOR CONTENT PILLARS)
          ========================================================================= */}
      {activeTab === 'overview' && (
        <OverviewTab projects={projects} projectsLoading={projectsLoading} />
      )}

      {/* =========================================================================
          FULL ARTICLE PREVIEW / READER MODAL
          ========================================================================= */}
      {(isPreviewModalOpen || activeReadingProjectId) && (() => {
        const activeDoc = activeReadingArticle || generatedArticle;
        const closeModal = () => { setIsPreviewModalOpen(false); setActiveReadingProjectId(null); };
        const stillLoading = !!activeReadingProjectId && activeArtifactsLoading && !activeDoc?.isEnriched;

        return (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-5">
            <div className="fixed inset-0 bg-[#1E122C]/50 backdrop-blur-xs" onClick={closeModal} />

            <div className="relative bg-white rounded-[32px] max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-[#EDE8F8] z-10 space-y-5 max-h-[90vh] flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-[#EDE8F8] pb-3 shrink-0">
                <div className="flex items-center gap-2.5 min-w-0 pr-4">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <h3 className="text-sm sm:text-base font-black text-[#1E122C] truncate">
                    {activeDoc?.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(activeDoc?.contentMarkdown || '');
                    }}
                    className="px-3.5 py-1.8 bg-[#FAF8FE] hover:bg-[#FDF2F8] border border-[#EDE8F8] text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-[#DB2777]"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Markdown</span>
                  </button>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="p-2 hover:bg-[#FAF8FE] rounded-xl text-[#6B5E77] hover:text-[#1E122C] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {stillLoading && (
                <div className="flex items-center gap-2 text-xs font-bold text-[#6B5E77] py-8 justify-center">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Loading full article content...</span>
                </div>
              )}

              {!stillLoading && activeArtifactsError && !activeDoc?.isEnriched && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{activeArtifactsError instanceof BlogApiError ? activeArtifactsError.message : 'Could not load this article.'}</span>
                </div>
              )}

              {!stillLoading && activeDoc && (
                <>
                  <div className="flex items-center gap-2 border-b border-[#EDE8F8] pb-2.5 shrink-0 overflow-x-auto">
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
                            ? 'bg-gradient-to-r from-[#BE185D] to-[#DB2777] text-white shadow-xs'
                            : 'bg-[#FAF8FE] text-[#6B5E77] hover:text-[#1E122C]'
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
                        {activeDoc.featuredImage && (
                          <img
                            src={activeDoc.featuredImage}
                            alt="Featured banner"
                            className="w-full h-60 object-cover rounded-2xl border border-[#EDE8F8]"
                          />
                        )}
                        <div
                          className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-[#1E122C]"
                          dangerouslySetInnerHTML={{ __html: activeDoc.contentHtml || '' }}
                        />
                      </div>
                    )}

                    {previewTab === 'markdown' && (
                      <pre className="p-5 bg-slate-900 text-slate-100 rounded-2xl text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
                        {activeDoc.contentMarkdown}
                      </pre>
                    )}

                    {previewTab === 'html' && (
                      <pre className="p-5 bg-slate-900 text-emerald-400 rounded-2xl text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
                        {activeDoc.contentHtml}
                      </pre>
                    )}

                    {previewTab === 'seo' && (
                      <div className="space-y-4 bg-[#FAF8FE]/80 p-5 rounded-2xl border border-[#EDE8F8]">
                        <div className="space-y-1">
                          <span className="text-[10px] font-black uppercase text-[#6B5E77]">Meta Title</span>
                          <p className="text-xs font-bold text-[#1E122C]">{activeDoc.title} | {siteName}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-black uppercase text-[#6B5E77]">Meta Description</span>
                          <p className="text-xs font-medium text-[#1E122C]">{activeDoc.excerpt}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-black uppercase text-[#6B5E77]">Canonical Slug</span>
                          <code className="text-xs font-mono text-[#DB2777] bg-white px-2 py-0.5 rounded-lg border border-[#EDE8F8] inline-block">
                            {articlePathPrefix}/{activeDoc.slug}
                          </code>
                        </div>
                        {activeDoc.targetKeywords.length > 0 && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-black uppercase text-[#6B5E77]">Target Keywords</span>
                            <div className="flex flex-wrap gap-1.5">
                              {activeDoc.targetKeywords.map(k => (
                                <span key={k} className="px-2 py-0.5 rounded-lg bg-white border border-[#EDE8F8] text-[11px] font-bold text-[#DB2777]">
                                  {k}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[#EDE8F8] flex items-center justify-between gap-3 shrink-0">
                    <span className="text-xs font-bold text-[#6B5E77]">
                      {activeDoc.isEnriched ? `${activeDoc.wordCount} words • ${activeDoc.seoScore}/100 SEO Score` : PROJECT_STATUS_LABEL[activeDoc.status]}
                    </span>

                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 border border-[#EDE8F8] hover:bg-[#FAF8FE] text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })()}

    </div>
  );
};

// Overview tab: real usage stats (GET /api/v1/projects/usage-summary) + a
// status breakdown and recent-projects list derived from the already-loaded
// project list. No fabricated traffic/engagement numbers — the backend has
// no analytics pipeline, so we only surface what it actually tracks.
const OverviewTab: React.FC<{ projects: ProjectSummary[]; projectsLoading: boolean }> = ({ projects, projectsLoading }) => {
  const { data: usage, isLoading: usageLoading, error: usageError } = useUsageSummaryQuery();

  const statusCounts = useMemo(() => {
    const counts: Record<ProjectStatus, number> = { completed: 0, generating: 0, failed: 0 };
    projects.forEach(p => { counts[p.status]++; });
    return counts;
  }, [projects]);

  const total = projects.length || 1;
  const statusBars: { status: ProjectStatus; color: string }[] = [
    { status: 'completed', color: '#059669' },
    { status: 'generating', color: '#D97706' },
    { status: 'failed', color: '#DC2626' }
  ];

  const recentProjects = useMemo(
    () => [...projects].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5),
    [projects]
  );

  return (
    <div className="space-y-6 animate-in fade-in">
      {usageError && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>Could not load usage summary — is the backend running?</span>
        </div>
      )}

      {/* Top 4 KPI Metrics — from GET /api/v1/projects/usage-summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#EDE8F8] p-5 rounded-3xl shadow-xs space-y-1">
          <span className="text-[10px] font-black text-[#6B5E77] uppercase tracking-wider block">Total Projects</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-[#1E122C]">{usageLoading ? '—' : usage?.total_projects ?? 0}</span>
            <div className="w-8 h-8 rounded-xl bg-pink-50 text-[#DB2777] flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#EDE8F8] p-5 rounded-3xl shadow-xs space-y-1">
          <span className="text-[10px] font-black text-[#6B5E77] uppercase tracking-wider block">Completed</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-[#1E122C]">{usageLoading ? '—' : usage?.completed_projects ?? 0}</span>
            <div className="w-8 h-8 rounded-xl bg-[#E6F8F0] text-[#059669] flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#EDE8F8] p-5 rounded-3xl shadow-xs space-y-1">
          <span className="text-[10px] font-black text-[#6B5E77] uppercase tracking-wider block">Failed</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-[#1E122C]">{usageLoading ? '—' : usage?.failed_projects ?? 0}</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#EDE8F8] p-5 rounded-3xl shadow-xs space-y-1">
          <span className="text-[10px] font-black text-[#6B5E77] uppercase tracking-wider block">Total Words Written</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-[#1E122C]">{usageLoading ? '—' : (usage?.total_words_written ?? 0).toLocaleString()}</span>
            <div className="w-8 h-8 rounded-xl bg-[#F3EAFF] text-[#7C3AED] flex items-center justify-center font-bold">
              <Zap className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Overview Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Recent Projects (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-[#EDE8F8] rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#EDE8F8] pb-3">
            <h3 className="text-xs font-black text-[#1E122C] uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#DB2777]" />
              Recent Projects
            </h3>
            <span className="text-[10px] font-bold text-[#6B5E77]">Most Recently Created</span>
          </div>

          <div className="space-y-3">
            {projectsLoading && <p className="text-xs font-bold text-[#6B5E77]">Loading...</p>}
            {!projectsLoading && recentProjects.length === 0 && (
              <p className="text-xs font-bold text-[#6B5E77]">No projects yet — generate your first article.</p>
            )}
            {recentProjects.map((p, idx) => (
              <div key={p.id} className="p-3.5 rounded-2xl bg-[#FAF8FE] border border-[#EDE8F8] flex items-center justify-between gap-3 hover:bg-white transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-7 h-7 rounded-xl bg-white border border-[#EDE8F8] text-xs font-black text-[#DB2777] flex items-center justify-center shrink-0">
                    0{idx + 1}
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-xs font-black text-[#1E122C] truncate">{p.topic}</h4>
                    <span className="text-[10.5px] text-[#6B5E77] font-semibold">{p.article_type} • {p.tone}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-black shrink-0 ${
                  p.status === 'completed' ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                    : p.status === 'failed' ? 'bg-rose-50 border border-rose-200 text-rose-700'
                    : 'bg-amber-50 border border-amber-200 text-amber-700'
                }`}>
                  {PROJECT_STATUS_LABEL[p.status]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Status Breakdown (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-[#EDE8F8] rounded-3xl p-6 shadow-xs space-y-5">
          <div className="border-b border-[#EDE8F8] pb-3">
            <h3 className="text-xs font-black text-[#1E122C] uppercase tracking-wider flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#7C3AED]" />
              <span>Project Status Breakdown</span>
            </h3>
            <p className="text-[11px] text-[#6B5E77] font-medium mt-0.5">
              Across all {projects.length} project{projects.length === 1 ? '' : 's'} generated so far
            </p>
          </div>

          <div className="space-y-4">
            {statusBars.map(({ status, color }) => {
              const count = statusCounts[status];
              const pct = Math.round((count / total) * 100);
              return (
                <div key={status} className="p-3.5 rounded-2xl bg-[#FAF8FE] border border-[#EDE8F8] space-y-2">
                  <div className="flex items-center justify-between text-xs font-black text-[#1E122C]">
                    <span>{PROJECT_STATUS_LABEL[status]}</span>
                    <span className="px-2 py-0.5 rounded-full text-white text-[10px] font-black" style={{ backgroundColor: color }}>
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="h-3 w-full bg-white rounded-full overflow-hidden p-0.5 border border-[#EDE8F8]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Blog;



