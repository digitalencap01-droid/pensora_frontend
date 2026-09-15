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
  Activity,
  Send,
  Linkedin
} from 'lucide-react';
import { useMarketing } from '../context/MarketingContext';
import {
  useGenerateContentMutation,
  useProjectArtifactsQuery,
  useProjectsQuery,
  useUsageSummaryQuery,
} from '../hooks/useBlogQueries';
import { blogApi, BlogApiError } from '../services/blogApi';
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

const COUNTRY_LABEL_MAP: Record<string, string> = {
  IN: '🇮🇳 India',
  US: '🇺🇸 United States',
  GB: '🇬🇧 United Kingdom',
  CA: '🇨🇦 Canada',
  AU: '🇦🇺 Australia'
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


export type PublishingPlatformId = 'webflow' | 'linkedin';

export interface PlatformConnection {
  id: PublishingPlatformId;
  name: string;
  category: string;
  description: string;
  connected: boolean;
  siteUrl?: string;
  username?: string;
  apiKey?: string;
  collectionId?: string;
  statusMode?: 'draft' | 'live';
  lastSynced?: string;
}

const DEFAULT_CONNECTIONS: PlatformConnection[] = [
  {
    id: 'webflow',
    name: 'Webflow CMS',
    category: 'Visual CMS',
    description: 'Direct live sync to Webflow collections via API',
    connected: true,
    siteUrl: 'Encaptechno (Blogs)',
    statusMode: 'live'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    category: 'Professional Network',
    description: 'Publish articles & insights directly to your LinkedIn profile/page',
    connected: false,
    siteUrl: '',
    statusMode: 'live'
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

  // Studio Step Switcher: 1 (Topic & Intel) | 2 (Audience & Voice) | 3 (Cover & Grounding) | 4 (Publish & Integrations)
  const [activeStep, setActiveStep] = useState<number>(1);
  const [maxStepReached, setMaxStepReached] = useState<number>(1);

  useEffect(() => {
    if (activeStep > maxStepReached) {
      setMaxStepReached(activeStep);
    }
  }, [activeStep, maxStepReached]);

  // Target Destination Platform
  const [targetPlatform, setTargetPlatform] = useState<PublishingPlatformId>('webflow');

  // Platform Connections state with localStorage persistence
  const [platformConnections, setPlatformConnections] = useState<PlatformConnection[]>(() => {
    try {
      const stored = localStorage.getItem('growwise_blog_platform_connections_v2');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.every(p => p.id === 'webflow' || p.id === 'linkedin')) {
          return parsed;
        }
      }
    } catch {}
    return DEFAULT_CONNECTIONS;
  });

  const [configuringPlatform, setConfiguringPlatform] = useState<PlatformConnection | null>(null);
  const [configForm, setConfigForm] = useState<{
    siteUrl: string;
    username: string;
    apiKey: string;
    collectionId: string;
    statusMode: 'draft' | 'live';
  }>({
    siteUrl: '',
    username: '',
    apiKey: '',
    collectionId: '',
    statusMode: 'draft'
  });

  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [publishSuccessMsg, setPublishSuccessMsg] = useState<string | null>(null);

  // Sync Webflow and LinkedIn backend connection status on mount
  useEffect(() => {
    Promise.allSettled([
      blogApi.getWebflowStatus(),
      blogApi.getLinkedInStatus()
    ]).then(([webflowRes, linkedinRes]) => {
      setPlatformConnections(prev => {
        const updated = prev.map(p => {
          if (p.id === 'webflow' && webflowRes.status === 'fulfilled') {
            const status = webflowRes.value;
            return {
              ...p,
              connected: status.connected,
              siteUrl: status.site_name ? `${status.site_name} (${status.collection_name || 'Blogs'})` : p.siteUrl
            };
          }
          if (p.id === 'linkedin' && linkedinRes.status === 'fulfilled') {
            const status = linkedinRes.value;
            return {
              ...p,
              connected: status.connected,
              siteUrl: status.linkedin_name ? `@${status.linkedin_name}` : p.siteUrl
            };
          }
          return p;
        });
        try {
          localStorage.setItem('growwise_blog_platform_connections_v2', JSON.stringify(updated));
        } catch {}
        return updated;
      });
    }).catch(() => {});
  }, []);

  const saveConnections = (updated: PlatformConnection[]) => {
    setPlatformConnections(updated);
    try {
      localStorage.setItem('growwise_blog_platform_connections_v2', JSON.stringify(updated));
    } catch {}
  };

  const openPlatformConfig = (platform: PlatformConnection) => {
    setConfiguringPlatform(platform);
    setConfigForm({
      siteUrl: platform.siteUrl || '',
      username: platform.username || '',
      apiKey: platform.apiKey || '',
      collectionId: platform.collectionId || '',
      statusMode: platform.statusMode || 'draft'
    });
  };

  const handleSavePlatformConfig = () => {
    if (!configuringPlatform) return;
    const updated = platformConnections.map(p => {
      if (p.id === configuringPlatform.id) {
        return {
          ...p,
          connected: true,
          siteUrl: configForm.siteUrl,
          username: configForm.username,
          apiKey: configForm.apiKey,
          collectionId: configForm.collectionId,
          statusMode: configForm.statusMode,
          lastSynced: new Date().toLocaleDateString()
        };
      }
      return p;
    });
    saveConnections(updated);
    setConfiguringPlatform(null);
  };

  const handleDisconnectPlatform = async (id: PublishingPlatformId) => {
    if (id === 'linkedin') {
      try {
        await blogApi.disconnectLinkedIn();
      } catch (err) {
        console.error('Failed to disconnect LinkedIn on backend', err);
      }
    }
    const updated = platformConnections.map(p => {
      if (p.id === id) {
        return {
          ...p,
          connected: false,
          apiKey: '',
          siteUrl: '',
          lastSynced: undefined
        };
      }
      return p;
    });
    saveConnections(updated);
    if (configuringPlatform?.id === id) {
      setConfiguringPlatform(null);
    }
  };

  const handleConnectLinkedIn = async () => {
    try {
      const res = await blogApi.getLinkedInConnectUrl('/blog');
      if (res.authorize_url) {
        window.location.href = res.authorize_url;
      }
    } catch (err: any) {
      alert(`Could not initiate LinkedIn connection: ${err.message || 'Error'}`);
    }
  };

  const handlePublishToPlatform = async (article: BlogArticle, platformId: PublishingPlatformId) => {
    setIsPublishing(true);
    setPublishSuccessMsg(null);
    try {
      if (platformId === 'webflow') {
        const res = await blogApi.publishToWebflow(article.id);
        setPublishSuccessMsg(`Published to Webflow CMS (${res.status})! Item ID: ${res.item_id}`);
      } else if (platformId === 'linkedin') {
        // Have the model write real LinkedIn-native commentary from the
        // article's topic/tone.
        const generated = await blogApi.generateLinkedInContent({
          content_type: 'article',
          topic: article.topic || article.title,
          tone: article.tone
        });
        const hashtagLine = generated.hashtags.length ? `\n\n${generated.hashtags.join(' ')}` : '';
        const commentary = `${generated.text}${hashtagLine}`;

        // publish-post (not publish) — plain text only, no link/article
        // preview card underneath. That card only appears when you send
        // article_url via /linkedin/publish.
        const res = await blogApi.publishLinkedInPost(commentary);
        setPublishSuccessMsg(`Published to LinkedIn! Post ID: ${res.post_urn}`);
      }
    } catch (err: any) {
      alert(`Publishing failed: ${err.message || 'Unknown error'}`);
    } finally {
      setIsPublishing(false);
    }
  };

  // =========================================================================
  // CORE FORM STATE (Defaults set to empty so inputs are not pre-filled)
  // =========================================================================
  const [topic, setTopic] = useState<string>('');
  const [country, setCountry] = useState<string>('IN');
  const [language, setLanguage] = useState<string>('English');
  const [freshness, setFreshness] = useState<string>('30d');
  const [searchQueriesCount, setSearchQueriesCount] = useState<number>(5);

  // Grounding
  const [groundingMode, setGroundingMode] = useState<'web' | 'doc' | 'images'>('web');
  const [uploadedDocName, setUploadedDocName] = useState<string>('');
  const [uploadedImageName, setUploadedImageName] = useState<string>('');

  // Media
  const [mainImage, setMainImage] = useState<string>('');
  const [thumbnailImage, setThumbnailImage] = useState<string>('');

  // Strategy & Specs
  const [siteName, setSiteName] = useState<string>('');
  const [siteUrl, setSiteUrl] = useState<string>('');
  const [articleType, setArticleType] = useState<ArticleType>('blog');
  const [tone, setTone] = useState<ToneType>('authoritative');
  const [contentGoal, setContentGoal] = useState<ContentGoal>('organic_traffic');
  const [targetWordCount, setTargetWordCount] = useState<number>(2500);
  const [targetAudience, setTargetAudience] = useState<string>('');
  const [callToAction, setCallToAction] = useState<string>('');
  const [additionalInstructions, setAdditionalInstructions] = useState<string>('');

  // Advanced publishing (From Reference Screenshot)
  const [articlePathPrefix, setArticlePathPrefix] = useState<string>('');
  const [brandName, setBrandName] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('');
  const [slugOverride, setSlugOverride] = useState<string>('');
  const [publisherName, setPublisherName] = useState<string>('');
  const [publisherUrl, setPublisherUrl] = useState<string>('');
  const [publisherLogoUrl, setPublisherLogoUrl] = useState<string>('');
  const [isIndexable, setIsIndexable] = useState<boolean>(true);
  const [includeSources, setIncludeSources] = useState<boolean>(true);

  // =========================================================================
  // FORM VALIDATION SYSTEM
  // =========================================================================
  interface FormErrors {
    topic?: string;
    country?: string;
    language?: string;
    targetAudience?: string;
    callToAction?: string;
    additionalInstructions?: string;
    mainImage?: string;
    thumbnailImage?: string;
    articlePathPrefix?: string;
    slugOverride?: string;
    brandName?: string;
    authorName?: string;
    publisherName?: string;
    publisherUrl?: string;
    publisherLogoUrl?: string;
  }

  const [errors, setErrors] = useState<FormErrors>({});
  const [validationBanner, setValidationBanner] = useState<string | null>(null);

  const isValidHttpUrl = (str: string): boolean => {
    if (!str.trim()) return true;
    try {
      const url = new URL(str.trim());
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const isValidSlug = (str: string): boolean => {
    if (!str.trim()) return true;
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(str.trim());
  };

  const validateStep = (step: number): FormErrors => {
    const stepErrors: FormErrors = {};

    if (step === 1) {
      const trimmed = topic.trim();
      if (!trimmed) {
        stepErrors.topic = 'Article topic is required.';
      } else if (trimmed.length < 3) {
        stepErrors.topic = 'Topic must be at least 3 characters long.';
      } else if (trimmed.length > 500) {
        stepErrors.topic = 'Topic cannot exceed 500 characters.';
      }
      if (!country) {
        stepErrors.country = 'Please select a target country.';
      }
      if (!language) {
        stepErrors.language = 'Please select a language.';
      }
    } else if (step === 2) {
      if (targetAudience.length > 500) {
        stepErrors.targetAudience = 'Target audience cannot exceed 500 characters.';
      }
      if (callToAction.length > 500) {
        stepErrors.callToAction = 'Call to action cannot exceed 500 characters.';
      }
      if (additionalInstructions.length > 1500) {
        stepErrors.additionalInstructions = 'Additional instructions cannot exceed 1,500 characters.';
      }
    } else if (step === 3) {
      if (mainImage.trim() && !isValidHttpUrl(mainImage)) {
        stepErrors.mainImage = 'Please enter a valid HTTP or HTTPS URL (e.g. https://images.unsplash.com/...)';
      }
      if (thumbnailImage.trim() && !isValidHttpUrl(thumbnailImage)) {
        stepErrors.thumbnailImage = 'Please enter a valid HTTP or HTTPS URL for the thumbnail.';
      }
    } else if (step === 4) {
      if (articlePathPrefix.trim()) {
        if (!articlePathPrefix.trim().startsWith('/')) {
          stepErrors.articlePathPrefix = "Article path prefix must start with '/' (e.g. /blog or /insights).";
        } else if (/\s/.test(articlePathPrefix.trim())) {
          stepErrors.articlePathPrefix = 'Article path prefix cannot contain spaces.';
        } else if (articlePathPrefix.trim().length > 100) {
          stepErrors.articlePathPrefix = 'Article path prefix cannot exceed 100 characters.';
        }
      }
      if (slugOverride.trim()) {
        if (!isValidSlug(slugOverride)) {
          stepErrors.slugOverride = 'Slug must only contain lowercase letters, numbers, and hyphens (e.g. my-first-post).';
        } else if (slugOverride.trim().length > 150) {
          stepErrors.slugOverride = 'Slug override cannot exceed 150 characters.';
        }
      }
      if (brandName.length > 200) {
        stepErrors.brandName = 'Brand name cannot exceed 200 characters.';
      }
      if (authorName.trim()) {
        if (authorName.trim().length < 2) {
          stepErrors.authorName = 'Author name must be at least 2 characters long.';
        } else if (authorName.trim().length > 200) {
          stepErrors.authorName = 'Author name cannot exceed 200 characters.';
        }
      }
      if (publisherName.length > 200) {
        stepErrors.publisherName = 'Publisher name cannot exceed 200 characters.';
      }
      if (publisherUrl.trim() && !isValidHttpUrl(publisherUrl)) {
        stepErrors.publisherUrl = 'Please enter a valid URL (e.g. https://yourcompany.com).';
      }
      if (publisherLogoUrl.trim() && !isValidHttpUrl(publisherLogoUrl)) {
        stepErrors.publisherLogoUrl = 'Please enter a valid logo URL (e.g. https://yourcompany.com/logo.png).';
      }
    }

    return stepErrors;
  };

  const validateAll = (): { isValid: boolean; errors: FormErrors; firstErrorStep: number | null } => {
    let allErrors: FormErrors = {};
    let firstErrorStep: number | null = null;

    for (let s = 1; s <= 4; s++) {
      const sErrors = validateStep(s);
      if (Object.keys(sErrors).length > 0) {
        allErrors = { ...allErrors, ...sErrors };
        if (firstErrorStep === null) {
          firstErrorStep = s;
        }
      }
    }

    return {
      isValid: Object.keys(allErrors).length === 0,
      errors: allErrors,
      firstErrorStep
    };
  };

  const handleNextStep = () => {
    const stepErrors = validateStep(activeStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(prev => ({ ...prev, ...stepErrors }));
      setValidationBanner(`Please fix the errors in Step ${activeStep} before continuing.`);
      return;
    }
    setValidationBanner(null);
    if (activeStep < 4) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleStepClick = (targetStep: number) => {
    if (targetStep <= activeStep) {
      setValidationBanner(null);
      setActiveStep(targetStep);
      return;
    }

    // Moving forward: validate all intermediate steps
    for (let s = 1; s < targetStep; s++) {
      const sErrors = validateStep(s);
      if (Object.keys(sErrors).length > 0) {
        setErrors(prev => ({ ...prev, ...sErrors }));
        setValidationBanner(`Please fix the errors in Step ${s} before proceeding to Step ${targetStep}.`);
        setActiveStep(s);
        return;
      }
    }

    setValidationBanner(null);
    setActiveStep(targetStep);
  };

  const stepHasError = (stepNum: number): boolean => {
    if (stepNum === 1) return !!(errors.topic || errors.country || errors.language);
    if (stepNum === 2) return !!(errors.targetAudience || errors.callToAction || errors.additionalInstructions);
    if (stepNum === 3) return !!(errors.mainImage || errors.thumbnailImage);
    if (stepNum === 4) return !!(errors.articlePathPrefix || errors.slugOverride || errors.brandName || errors.authorName || errors.publisherName || errors.publisherUrl || errors.publisherLogoUrl);
    return false;
  };

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
    const rawSiteUrl = siteUrl.trim() || activeWorkspace?.website || '';
    const normalizedSiteUrl = rawSiteUrl ? (/^https?:\/\//i.test(rawSiteUrl) ? rawSiteUrl : `https://${rawSiteUrl}`) : undefined;
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
      site_name: siteName.trim() || activeWorkspace?.name || undefined,
      site_url: normalizedSiteUrl,
      article_path_prefix: articlePathPrefix.trim() || '/blog',
      authors: authorName.trim().length >= 2 ? [{ name: authorName.trim() }] : [],
      featured_image_urls: isValidImageUrl(mainImage) ? [mainImage.trim()] : [],
      thumbnail_image_url: isValidImageUrl(thumbnailImage) ? thumbnailImage.trim() : (isValidImageUrl(mainImage) ? mainImage.trim() : undefined),
      slug_override: slugOverride.trim() || undefined,
      indexable: isIndexable,
      include_sources: includeSources,
      publisher_name: publisherName.trim() || undefined,
      publisher_url: publisherUrl.trim() || undefined,
      publisher_logo_url: publisherLogoUrl.trim() || undefined
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
    const { isValid, errors: allErrors, firstErrorStep } = validateAll();
    if (!isValid) {
      setErrors(allErrors);
      setValidationBanner('Please fix the highlighted form errors before generating.');
      if (firstErrorStep) {
        setActiveStep(firstErrorStep);
      }
      return;
    }

    if (isGenerating) return;

    setValidationBanner(null);
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
              
              {/* Studio Step Navigation Tabs (4 Clear Interactive Stages) */}
              <div className="flex items-center justify-between gap-2 p-1.5 bg-[#FAF8FE] rounded-2xl border border-[#EDE8F8]">
                {[
                  { num: 1, label: 'Topic & Intel', icon: Search },
                  { num: 2, label: 'Audience & Voice', icon: SlidersHorizontal },
                  { num: 3, label: 'Cover & Media', icon: ImageIcon },
                  { num: 4, label: 'Publish & Integrations', icon: Share2 }
                ].map(step => {
                  const hasErr = stepHasError(step.num);
                  return (
                    <button
                      key={step.num}
                      type="button"
                      onClick={() => handleStepClick(step.num)}
                      className={`flex-1 py-2.5 px-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 relative ${
                        activeStep === step.num
                          ? 'bg-gradient-to-r from-[#BE185D] via-[#DB2777] to-[#EC4899] text-white shadow-xs'
                          : hasErr
                          ? 'text-rose-600 bg-rose-50/70 border border-rose-200 hover:bg-rose-100/50'
                          : 'text-[#6B5E77] hover:text-[#1E122C] hover:bg-white'
                      }`}
                    >
                      <step.icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="hidden md:inline">{step.label}</span>
                      <span className="md:hidden">Step {step.num}</span>
                      {hasErr && (
                        <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" title="Validation error in this step" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Validation Warning Alert Banner */}
              {validationBanner && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700 flex items-center justify-between gap-2 animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{validationBanner}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setValidationBanner(null)}
                    className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* =========================================================================
                  STEP 1: TOPIC & LIVE SEARCH INTEL
                  ========================================================================= */}
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
                      onChange={(e) => {
                        const val = e.target.value;
                        setTopic(val);
                        if (errors.topic && val.trim().length >= 3 && val.trim().length <= 500) {
                          setErrors(prev => ({ ...prev, topic: undefined }));
                        }
                      }}
                      placeholder="e.g. How small businesses can use AI for autonomous customer support"
                      className={`w-full rounded-2xl p-4 text-xs sm:text-sm font-bold placeholder-[#9E92A6] outline-none transition-all resize-none shadow-3xs ${
                        errors.topic
                          ? 'bg-rose-50/40 border-2 border-rose-400 text-rose-900 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                          : 'bg-[#FAF8FE]/60 border border-[#EDE8F8] text-[#1E122C] focus:border-[#DB2777] focus:bg-white focus:ring-4 focus:ring-[#DB2777]/10'
                      }`}
                    />
                    {errors.topic && (
                      <p className="text-[11px] font-bold text-rose-600 flex items-center gap-1.5 animate-in fade-in">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.topic}</span>
                      </p>
                    )}

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
                          onClick={() => {
                            setTopic(chip);
                            setErrors(prev => ({ ...prev, topic: undefined }));
                          }}
                          className="px-3 py-1 rounded-xl bg-[#FAF8FE] hover:bg-[#FDF2F8] border border-[#EDE8F8] hover:border-[#DB2777]/40 text-[11px] font-bold text-[#6B5E77] hover:text-[#DB2777] transition-all cursor-pointer"
                        >
                          + {chip}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Destination Channel Selector */}
                  <div className="space-y-2 pt-2 border-t border-[#EDE8F8]">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-black text-[#6B5E77] uppercase tracking-wide">
                        Target Publishing Channel
                      </label>
                      <button
                        type="button"
                        onClick={() => handleStepClick(4)}
                        className="text-[11px] font-bold text-[#DB2777] hover:underline cursor-pointer flex items-center gap-1"
                      >
                        Manage Connections →
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { id: 'webflow' as const, label: 'Webflow CMS', tag: 'Visual CMS' },
                        { id: 'linkedin' as const, label: 'LinkedIn', tag: 'Social Network' }
                      ].map(item => {
                        const conn = platformConnections.find(p => p.id === item.id);
                        const isSelected = targetPlatform === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setTargetPlatform(item.id)}
                            className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#BE185D] to-[#DB2777] text-white border-[#DB2777] shadow-xs'
                                : 'bg-white border-[#EDE8F8] text-[#6B5E77] hover:border-[#DB2777]'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-black uppercase opacity-75">{item.tag}</span>
                              {conn?.connected && (
                                <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-emerald-500'}`} />
                              )}
                            </div>
                            <span className="text-xs font-black truncate mt-1">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Search Queries & Country Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-[#6B5E77] block">Target Country</label>
                      <select
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value);
                          if (errors.country) setErrors(prev => ({ ...prev, country: undefined }));
                        }}
                        className={`w-full rounded-xl px-3 py-2.5 text-xs font-bold text-[#1E122C] outline-none cursor-pointer ${
                          errors.country
                            ? 'border-2 border-rose-400 bg-rose-50/40'
                            : 'bg-[#FAF8FE]/60 border border-[#EDE8F8] focus:border-[#DB2777]'
                        }`}
                      >
                        <option value="IN">🇮🇳 India (IN)</option>
                        <option value="US">🇺🇸 United States (US)</option>
                        <option value="GB">🇬🇧 United Kingdom (GB)</option>
                        <option value="CA">🇨🇦 Canada (CA)</option>
                        <option value="AU">🇦🇺 Australia (AU)</option>
                      </select>
                      {errors.country && (
                        <p className="text-[10px] font-bold text-rose-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.country}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-[#6B5E77] block">Language</label>
                      <select
                        value={language}
                        onChange={(e) => {
                          setLanguage(e.target.value);
                          if (errors.language) setErrors(prev => ({ ...prev, language: undefined }));
                        }}
                        className={`w-full rounded-xl px-3 py-2.5 text-xs font-bold text-[#1E122C] outline-none cursor-pointer ${
                          errors.language
                            ? 'border-2 border-rose-400 bg-rose-50/40'
                            : 'bg-[#FAF8FE]/60 border border-[#EDE8F8] focus:border-[#DB2777]'
                        }`}
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Hindi">Hindi</option>
                      </select>
                      {errors.language && (
                        <p className="text-[10px] font-bold text-rose-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.language}</span>
                        </p>
                      )}
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

              {/* =========================================================================
                  STEP 2: AUDIENCE & VOICE STRATEGY
                  ========================================================================= */}
              {activeStep === 2 && (
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
                      <div className="flex items-center justify-between">
                        <label className="text-[10.5px] font-bold text-[#6B5E77]">Target Audience (Optional)</label>
                        <span className="text-[10px] text-[#9E92A6]">{targetAudience.length}/500</span>
                      </div>
                      <input
                        type="text"
                        value={targetAudience}
                        onChange={(e) => {
                          const val = e.target.value;
                          setTargetAudience(val);
                          if (errors.targetAudience && val.length <= 500) {
                            setErrors(prev => ({ ...prev, targetAudience: undefined }));
                          }
                        }}
                        placeholder="e.g. Founders, marketers, technical buyers"
                        className={`w-full rounded-xl px-3 py-2 text-xs font-bold text-[#1E122C] outline-none transition-all ${
                          errors.targetAudience
                            ? 'border-2 border-rose-400 bg-rose-50/40 focus:border-rose-500'
                            : 'bg-[#FAF8FE]/60 border border-[#EDE8F8] focus:border-[#DB2777]'
                        }`}
                      />
                      {errors.targetAudience && (
                        <p className="text-[10.5px] font-bold text-rose-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.targetAudience}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-[10.5px] font-bold text-[#6B5E77]">Custom Call to Action (Optional)</label>
                        <span className="text-[10px] text-[#9E92A6]">{callToAction.length}/500</span>
                      </div>
                      <input
                        type="text"
                        value={callToAction}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCallToAction(val);
                          if (errors.callToAction && val.length <= 500) {
                            setErrors(prev => ({ ...prev, callToAction: undefined }));
                          }
                        }}
                        placeholder="e.g. Book a live demo or start free trial"
                        className={`w-full rounded-xl px-3 py-2 text-xs font-bold text-[#1E122C] outline-none transition-all ${
                          errors.callToAction
                            ? 'border-2 border-rose-400 bg-rose-50/40 focus:border-rose-500'
                            : 'bg-[#FAF8FE]/60 border border-[#EDE8F8] focus:border-[#DB2777]'
                        }`}
                      />
                      {errors.callToAction && (
                        <p className="text-[10.5px] font-bold text-rose-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.callToAction}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Additional Instructions */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[10.5px] font-bold text-[#6B5E77]">Additional Editorial Instructions (Optional)</label>
                      <span className="text-[10px] text-[#9E92A6]">{additionalInstructions.length}/1500</span>
                    </div>
                    <textarea
                      rows={2}
                      value={additionalInstructions}
                      onChange={(e) => {
                        const val = e.target.value;
                        setAdditionalInstructions(val);
                        if (errors.additionalInstructions && val.length <= 1500) {
                          setErrors(prev => ({ ...prev, additionalInstructions: undefined }));
                        }
                      }}
                      placeholder="e.g. Include specific case studies, avoid buzzwords, emphasize ROI..."
                      className={`w-full rounded-xl p-3 text-xs font-bold text-[#1E122C] outline-none resize-none transition-all ${
                        errors.additionalInstructions
                          ? 'border-2 border-rose-400 bg-rose-50/40 focus:border-rose-500'
                          : 'bg-[#FAF8FE]/60 border border-[#EDE8F8] focus:border-[#DB2777]'
                      }`}
                    />
                    {errors.additionalInstructions && (
                      <p className="text-[10.5px] font-bold text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.additionalInstructions}</span>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* =========================================================================
                  STEP 3: COVER IMAGE & KNOWLEDGE GROUNDING
                  ========================================================================= */}
              {activeStep === 3 && (
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
                          onClick={() => {
                            setMainImage(imgUrl);
                            setThumbnailImage(imgUrl);
                            setErrors(prev => ({ ...prev, mainImage: undefined, thumbnailImage: undefined }));
                          }}
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
                        onChange={(e) => {
                          const val = e.target.value;
                          setMainImage(val);
                          setThumbnailImage(val);
                          if (errors.mainImage && (!val.trim() || isValidHttpUrl(val))) {
                            setErrors(prev => ({ ...prev, mainImage: undefined, thumbnailImage: undefined }));
                          }
                        }}
                        placeholder="https://images.unsplash.com/photo-..."
                        className={`w-full rounded-xl px-3 py-2 text-xs font-semibold text-[#1E122C] outline-none transition-all ${
                          errors.mainImage
                            ? 'border-2 border-rose-400 bg-rose-50/40 focus:border-rose-500'
                            : 'bg-[#FAF8FE]/60 border border-[#EDE8F8] focus:border-[#DB2777]'
                        }`}
                      />
                      {errors.mainImage && (
                        <p className="text-[10.5px] font-bold text-rose-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.mainImage}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  STEP 4: PUBLISHING DESTINATION & ADVANCED SETTINGS
                  ========================================================================= */}
              {activeStep === 4 && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  {/* Section 1: Connected Platforms & Destination Selector */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xs font-black text-[#1E122C] uppercase tracking-wide flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-[#DB2777]" />
                          Publishing Destination & Platform Integrations
                        </h3>
                        <p className="text-[11px] text-[#6B5E77] font-medium mt-0.5">
                          Select where your generated blog posts will be published or syndicated.
                        </p>
                      </div>
                    </div>

                    {/* Platforms Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {platformConnections.map(platform => {
                        const isSelected = targetPlatform === platform.id;
                        return (
                          <div
                            key={platform.id}
                            onClick={() => setTargetPlatform(platform.id)}
                            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? 'bg-[#FDF2F8] border-[#DB2777] ring-2 ring-[#DB2777]/20 shadow-xs'
                                : 'bg-white border-[#EDE8F8] hover:border-[#DB2777]/40'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                                  isSelected ? 'bg-[#DB2777] text-white' : 'bg-[#FAF8FE] text-[#1E122C] border border-[#EDE8F8]'
                                }`}>
                                  {platform.id === 'webflow' && 'W'}
                                  {platform.id === 'linkedin' && <Linkedin className="w-4 h-4" />}
                                </div>
                                <div>
                                  <h4 className="text-xs font-black text-[#1E122C] flex items-center gap-1.5">
                                    {platform.name}
                                    {isSelected && (
                                      <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full bg-[#DB2777] text-white">
                                        Active
                                      </span>
                                    )}
                                  </h4>
                                  <span className="text-[10px] text-[#6B5E77] block font-semibold">{platform.category}</span>
                                </div>
                              </div>

                              <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-black ${
                                platform.connected
                                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                                  : 'bg-slate-100 text-slate-500'
                              }`}>
                                {platform.connected ? 'Connected' : 'Not Connected'}
                              </span>
                            </div>

                            <p className="text-[10.5px] text-[#6B5E77] mt-2 line-clamp-1">
                              {platform.connected && platform.siteUrl ? platform.siteUrl : platform.description}
                            </p>

                            <div className="mt-3 pt-2 border-t border-[#EDE8F8]/70 flex items-center justify-between">
                              <span className="text-[10px] font-bold text-[#6B5E77]">
                                Mode: {platform.statusMode === 'live' ? 'Published' : 'Draft Post'}
                              </span>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openPlatformConfig(platform);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#FAF8FE] border border-[#EDE8F8] hover:border-[#DB2777] text-[10.5px] font-bold text-[#DB2777] transition-all cursor-pointer"
                              >
                                {platform.connected ? 'Configure' : 'Connect +'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* =========================================================================
                      Section 2: Publishing & advanced settings (EXACT UI FROM USER REFERENCE IMAGE)
                      ========================================================================= */}
                  <div className="bg-white border border-[#EDE8F8] rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(219,39,119,0.04)] space-y-5">
                    {/* Header with rounded slider icon */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#FAF8FE] border border-[#EDE8F8] text-[#7C3AED] flex items-center justify-center shrink-0">
                        <SlidersHorizontal className="w-4 h-4 text-[#7C3AED]" />
                      </div>
                      <h3 className="text-xs sm:text-sm font-black text-[#1E122C]">
                        Publishing & advanced settings
                      </h3>
                    </div>

                    {/* 2-Column Inputs Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Left 1: Article path prefix */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#1E122C] block">Article path prefix</label>
                        <input
                          type="text"
                          value={articlePathPrefix}
                          onChange={(e) => {
                            const val = e.target.value;
                            setArticlePathPrefix(val);
                            if (errors.articlePathPrefix && (!val.trim() || (val.trim().startsWith('/') && !/\s/.test(val.trim()) && val.trim().length <= 100))) {
                              setErrors(prev => ({ ...prev, articlePathPrefix: undefined }));
                            }
                          }}
                          placeholder="/blog"
                          className={`w-full rounded-2xl px-3.5 py-2.5 text-xs font-semibold text-[#1E122C] outline-none transition-all shadow-3xs ${
                            errors.articlePathPrefix
                              ? 'border-2 border-rose-400 bg-rose-50/40 focus:border-rose-500'
                              : 'bg-white border border-[#EDE8F8] focus:border-[#DB2777] focus:ring-2 focus:ring-[#DB2777]/10'
                          }`}
                        />
                        {errors.articlePathPrefix && (
                          <p className="text-[10.5px] font-bold text-rose-600 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{errors.articlePathPrefix}</span>
                          </p>
                        )}
                      </div>

                      {/* Right 1: Brand name (optional) */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#1E122C] block">Brand name (optional)</label>
                        <input
                          type="text"
                          value={brandName}
                          onChange={(e) => {
                            const val = e.target.value;
                            setBrandName(val);
                            if (errors.brandName && val.length <= 200) {
                              setErrors(prev => ({ ...prev, brandName: undefined }));
                            }
                          }}
                          placeholder=""
                          className={`w-full rounded-2xl px-3.5 py-2.5 text-xs font-semibold text-[#1E122C] outline-none transition-all shadow-3xs ${
                            errors.brandName
                              ? 'border-2 border-rose-400 bg-rose-50/40 focus:border-rose-500'
                              : 'bg-white border border-[#EDE8F8] focus:border-[#DB2777] focus:ring-2 focus:ring-[#DB2777]/10'
                          }`}
                        />
                        {errors.brandName && (
                          <p className="text-[10.5px] font-bold text-rose-600 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{errors.brandName}</span>
                          </p>
                        )}
                      </div>

                      {/* Left 2: Author name (optional) */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#1E122C] block">Author name (optional)</label>
                        <input
                          type="text"
                          value={authorName}
                          onChange={(e) => {
                            const val = e.target.value;
                            setAuthorName(val);
                            if (errors.authorName && (!val.trim() || (val.trim().length >= 2 && val.trim().length <= 200))) {
                              setErrors(prev => ({ ...prev, authorName: undefined }));
                            }
                          }}
                          placeholder=""
                          className={`w-full rounded-2xl px-3.5 py-2.5 text-xs font-semibold text-[#1E122C] outline-none transition-all shadow-3xs ${
                            errors.authorName
                              ? 'border-2 border-rose-400 bg-rose-50/40 focus:border-rose-500'
                              : 'bg-white border border-[#EDE8F8] focus:border-[#DB2777] focus:ring-2 focus:ring-[#DB2777]/10'
                          }`}
                        />
                        {errors.authorName && (
                          <p className="text-[10.5px] font-bold text-rose-600 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{errors.authorName}</span>
                          </p>
                        )}
                      </div>

                      {/* Right 2: Slug override (optional) */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#1E122C] block">Slug override (optional)</label>
                        <input
                          type="text"
                          value={slugOverride}
                          onChange={(e) => {
                            const val = e.target.value;
                            setSlugOverride(val);
                            if (errors.slugOverride && (!val.trim() || isValidSlug(val))) {
                              setErrors(prev => ({ ...prev, slugOverride: undefined }));
                            }
                          }}
                          placeholder=""
                          className={`w-full rounded-2xl px-3.5 py-2.5 text-xs font-semibold text-[#1E122C] outline-none transition-all shadow-3xs ${
                            errors.slugOverride
                              ? 'border-2 border-rose-400 bg-rose-50/40 focus:border-rose-500'
                              : 'bg-white border border-[#EDE8F8] focus:border-[#DB2777] focus:ring-2 focus:ring-[#DB2777]/10'
                          }`}
                        />
                        {errors.slugOverride && (
                          <p className="text-[10.5px] font-bold text-rose-600 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{errors.slugOverride}</span>
                          </p>
                        )}
                      </div>

                      {/* Left 3: Publisher name (optional) */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#1E122C] block">Publisher name (optional)</label>
                        <input
                          type="text"
                          value={publisherName}
                          onChange={(e) => {
                            const val = e.target.value;
                            setPublisherName(val);
                            if (errors.publisherName && val.length <= 200) {
                              setErrors(prev => ({ ...prev, publisherName: undefined }));
                            }
                          }}
                          placeholder=""
                          className={`w-full rounded-2xl px-3.5 py-2.5 text-xs font-semibold text-[#1E122C] outline-none transition-all shadow-3xs ${
                            errors.publisherName
                              ? 'border-2 border-rose-400 bg-rose-50/40 focus:border-rose-500'
                              : 'bg-white border border-[#EDE8F8] focus:border-[#DB2777] focus:ring-2 focus:ring-[#DB2777]/10'
                          }`}
                        />
                        {errors.publisherName && (
                          <p className="text-[10.5px] font-bold text-rose-600 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{errors.publisherName}</span>
                          </p>
                        )}
                      </div>

                      {/* Right 3: Publisher URL (optional) */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#1E122C] block">Publisher URL (optional)</label>
                        <input
                          type="url"
                          value={publisherUrl}
                          onChange={(e) => {
                            const val = e.target.value;
                            setPublisherUrl(val);
                            if (errors.publisherUrl && (!val.trim() || isValidHttpUrl(val))) {
                              setErrors(prev => ({ ...prev, publisherUrl: undefined }));
                            }
                          }}
                          placeholder=""
                          className={`w-full rounded-2xl px-3.5 py-2.5 text-xs font-semibold text-[#1E122C] outline-none transition-all shadow-3xs ${
                            errors.publisherUrl
                              ? 'border-2 border-rose-400 bg-rose-50/40 focus:border-rose-500'
                              : 'bg-white border border-[#EDE8F8] focus:border-[#DB2777] focus:ring-2 focus:ring-[#DB2777]/10'
                          }`}
                        />
                        {errors.publisherUrl && (
                          <p className="text-[10.5px] font-bold text-rose-600 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{errors.publisherUrl}</span>
                          </p>
                        )}
                      </div>

                      {/* Left 4: Publisher logo URL (optional) */}
                      <div className="space-y-1.5 sm:col-span-1">
                        <label className="text-xs font-bold text-[#1E122C] block">Publisher logo URL (optional)</label>
                        <input
                          type="url"
                          value={publisherLogoUrl}
                          onChange={(e) => {
                            const val = e.target.value;
                            setPublisherLogoUrl(val);
                            if (errors.publisherLogoUrl && (!val.trim() || isValidHttpUrl(val))) {
                              setErrors(prev => ({ ...prev, publisherLogoUrl: undefined }));
                            }
                          }}
                          placeholder=""
                          className={`w-full rounded-2xl px-3.5 py-2.5 text-xs font-semibold text-[#1E122C] outline-none transition-all shadow-3xs ${
                            errors.publisherLogoUrl
                              ? 'border-2 border-rose-400 bg-rose-50/40 focus:border-rose-500'
                              : 'bg-white border border-[#EDE8F8] focus:border-[#DB2777] focus:ring-2 focus:ring-[#DB2777]/10'
                          }`}
                        />
                        {errors.publisherLogoUrl && (
                          <p className="text-[10.5px] font-bold text-rose-600 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{errors.publisherLogoUrl}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Checkboxes Row */}
                    <div className="flex flex-wrap items-center gap-6 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isIndexable}
                          onChange={(e) => setIsIndexable(e.target.checked)}
                          className="w-4 h-4 rounded text-[#7C3AED] focus:ring-[#7C3AED] accent-[#7C3AED] cursor-pointer"
                        />
                        <span className="text-xs font-semibold text-[#1E122C]">Indexable (allow search engines)</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={includeSources}
                          onChange={(e) => setIncludeSources(e.target.checked)}
                          className="w-4 h-4 rounded text-[#7C3AED] focus:ring-[#7C3AED] accent-[#7C3AED] cursor-pointer"
                        />
                        <span className="text-xs font-semibold text-[#1E122C]">Include sources section</span>
                      </label>
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
                      onClick={() => {
                        setValidationBanner(null);
                        setActiveStep(prev => prev - 1);
                      }}
                      className="px-4 py-2 bg-[#FAF8FE] hover:bg-slate-50 border border-[#EDE8F8] text-xs font-black text-[#6B5E77] rounded-xl cursor-pointer transition-colors"
                    >
                      ← Back
                    </button>
                  )}
                  {activeStep < 4 && (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-4 py-2 bg-white hover:bg-[#FDF4F8] border border-[#EDE8F8] hover:border-[#DB2777] text-xs font-black text-[#1E122C] rounded-xl cursor-pointer transition-colors"
                    >
                      Next Step →
                    </button>
                  )}
                </div>

                <span className="text-[11px] font-bold text-[#6B5E77]">
                  Step {activeStep} of 4
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
                <div className="h-44 w-full relative bg-slate-900 overflow-hidden">
                  {mainImage ? (
                    <img src={mainImage} alt={topic || 'Cover Banner'} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1E122C] via-[#351433] to-[#1E122C] flex items-center justify-center relative overflow-hidden">
                      <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#DB2777]/20 rounded-full blur-2xl" />
                      <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-[#7C3AED]/20 rounded-full blur-2xl" />
                      <div className="flex items-center gap-2 text-white/50 text-xs font-semibold z-10">
                        <ImageIcon className="w-4 h-4 text-pink-300" />
                        <span>{activeStep >= 3 ? 'No cover image selected' : 'Cover image selected in Step 3'}</span>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 flex flex-col justify-between p-4 z-20">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[10px] font-black text-[#1E122C] shadow-sm uppercase tracking-wider flex items-center gap-1.5">
                        {targetPlatform === 'webflow' ? (
                          <span className="w-2 h-2 rounded-full bg-[#DB2777]" />
                        ) : (
                          <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />
                        )}
                        {platformConnections.find(p => p.id === targetPlatform)?.name.toUpperCase() || targetPlatform.toUpperCase()}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-white text-[10px] font-black shadow-sm ${
                        platformConnections.find(p => p.id === targetPlatform)?.connected ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}>
                        {platformConnections.find(p => p.id === targetPlatform)?.connected ? '● READY TO PUBLISH' : '○ SETUP NEEDED'}
                      </span>
                    </div>

                    <div className="text-white space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-pink-200 uppercase tracking-wider">Blueprint Preview</span>
                        <span className="text-[10px] font-bold text-white/70">Stage {activeStep} of 4</span>
                      </div>
                      <h3 className="text-sm font-black line-clamp-2 leading-snug">
                        {topic.trim() ? topic.trim() : <span className="text-white/50 italic font-medium">Your Target Article Headline</span>}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Blueprint Specs & Progressive Steps */}
                <div className="p-5 sm:p-6 space-y-3.5">
                  <div className="flex items-center justify-between border-b border-[#EDE8F8] pb-2.5">
                    <span className="text-[10.5px] font-black uppercase tracking-wider text-[#6B5E77]">
                      Live Selections Summary
                    </span>
                    <span className="text-[10.5px] font-bold text-[#DB2777]">
                      {activeStep === 1 && 'Step 1: Topic & Intel'}
                      {activeStep === 2 && 'Step 2: Voice & Audience'}
                      {activeStep === 3 && 'Step 3: Cover & Media'}
                      {activeStep === 4 && 'Step 4: Publishing & Integrations'}
                    </span>
                  </div>

                  {/* 1. Topic & Search Intel (Step 1) */}
                  <div className={`p-3 rounded-2xl border transition-all ${
                    activeStep === 1 ? 'bg-[#FDF2F8]/70 border-[#DB2777]/30 ring-1 ring-[#DB2777]/20' : 'bg-[#FAF8FE] border-[#EDE8F8]'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                          topic.trim() ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-[#6B5E77]'
                        }`}>
                          {topic.trim() ? '✓' : '1'}
                        </span>
                        <span className="text-[11px] font-black text-[#1E122C] uppercase tracking-wide">
                          1. Topic & Research Intel
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleStepClick(1)}
                        className="text-[10.5px] font-bold text-[#DB2777] hover:underline cursor-pointer"
                      >
                        {activeStep === 1 ? 'Active' : 'Edit →'}
                      </button>
                    </div>

                    {topic.trim() ? (
                      <div className="mt-2 pl-7 space-y-1.5">
                        <p className="text-xs font-black text-[#1E122C] leading-snug line-clamp-2">
                          "{topic}"
                        </p>
                        <div className="flex flex-wrap gap-1.5 text-[10px] font-bold">
                          <span className="px-2 py-0.5 rounded-md bg-white border border-[#EDE8F8] text-[#6B5E77]">
                            {COUNTRY_LABEL_MAP[country] || country}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-white border border-[#EDE8F8] text-[#6B5E77]">
                            {language}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-white border border-[#EDE8F8] text-[#6B5E77]">
                            {searchQueriesCount} Live Queries
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-white border border-[#EDE8F8] text-[#6B5E77]">
                            Freshness: {freshness}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p className="mt-1.5 pl-7 text-[11px] text-[#9E92A6] italic">
                        Enter an article topic on the left to activate research crawl.
                      </p>
                    )}
                  </div>

                  {/* 2. Audience & Voice (Step 2) */}
                  <div className={`p-3 rounded-2xl border transition-all ${
                    activeStep === 2 ? 'bg-[#FDF2F8]/70 border-[#DB2777]/30 ring-1 ring-[#DB2777]/20' : 'bg-[#FAF8FE] border-[#EDE8F8]'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                          activeStep >= 2 || maxStepReached >= 2 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-[#6B5E77]'
                        }`}>
                          {activeStep >= 2 || maxStepReached >= 2 ? '✓' : '2'}
                        </span>
                        <span className="text-[11px] font-black text-[#1E122C] uppercase tracking-wide">
                          2. Audience & Voice
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleStepClick(2)}
                        className="text-[10.5px] font-bold text-[#DB2777] hover:underline cursor-pointer"
                      >
                        {activeStep === 2 ? 'Active' : (activeStep > 2 || maxStepReached >= 2) ? 'Edit →' : 'Next Step →'}
                      </button>
                    </div>

                    {(activeStep >= 2 || maxStepReached >= 2) ? (
                      <div className="mt-2 pl-7 space-y-2">
                        <div className="grid grid-cols-3 gap-1.5 text-center">
                          <div className="p-1.5 rounded-xl bg-white border border-[#EDE8F8]">
                            <span className="text-[9px] font-bold text-[#6B5E77] block uppercase">Length</span>
                            <span className="text-xs font-black text-[#1E122C]">{targetWordCount}w</span>
                          </div>
                          <div className="p-1.5 rounded-xl bg-white border border-[#EDE8F8]">
                            <span className="text-[9px] font-bold text-[#6B5E77] block uppercase">Read Time</span>
                            <span className="text-xs font-black text-[#1E122C]">~{Math.ceil(targetWordCount / 250)} min</span>
                          </div>
                          <div className="p-1.5 rounded-xl bg-white border border-[#EDE8F8]">
                            <span className="text-[9px] font-bold text-[#6B5E77] block uppercase">Tone</span>
                            <span className="text-xs font-black text-[#DB2777] capitalize">{tone}</span>
                          </div>
                        </div>

                        {targetAudience.trim() && (
                          <p className="text-[11px] text-[#6B5E77] truncate">
                            <span className="font-bold text-[#1E122C]">Audience:</span> {targetAudience}
                          </p>
                        )}
                        {callToAction.trim() && (
                          <p className="text-[11px] text-[#6B5E77] truncate">
                            <span className="font-bold text-[#1E122C]">CTA:</span> {callToAction}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="mt-1.5 pl-7 text-[11px] text-[#9E92A6] italic">
                        Length, tone, and audience will be selected in Step 2.
                      </p>
                    )}
                  </div>

                  {/* 3. Cover & Knowledge Grounding (Step 3) */}
                  <div className={`p-3 rounded-2xl border transition-all ${
                    activeStep === 3 ? 'bg-[#FDF2F8]/70 border-[#DB2777]/30 ring-1 ring-[#DB2777]/20' : 'bg-[#FAF8FE] border-[#EDE8F8]'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                          activeStep >= 3 || maxStepReached >= 3 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-[#6B5E77]'
                        }`}>
                          {activeStep >= 3 || maxStepReached >= 3 ? '✓' : '3'}
                        </span>
                        <span className="text-[11px] font-black text-[#1E122C] uppercase tracking-wide">
                          3. Cover & Grounding
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleStepClick(3)}
                        className="text-[10.5px] font-bold text-[#DB2777] hover:underline cursor-pointer"
                      >
                        {activeStep === 3 ? 'Active' : (activeStep > 3 || maxStepReached >= 3) ? 'Edit →' : 'Step 3 →'}
                      </button>
                    </div>

                    {(activeStep >= 3 || maxStepReached >= 3) ? (
                      <div className="mt-2 pl-7 space-y-1 text-[11px]">
                        <div className="flex items-center justify-between">
                          <span className="text-[#6B5E77]">Grounding Source:</span>
                          <span className="font-bold text-[#1E122C] capitalize">
                            {groundingMode === 'web' ? 'Live Web Crawl' : groundingMode === 'doc' ? `Document (${uploadedDocName || 'File'})` : 'Visual Diagrams'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#6B5E77]">Featured Cover:</span>
                          <span className="font-bold text-[#1E122C]">
                            {mainImage ? 'Custom Banner Selected' : 'AI generated cover'}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p className="mt-1.5 pl-7 text-[11px] text-[#9E92A6] italic">
                        Cover image & grounding sources will be set in Step 3.
                      </p>
                    )}
                  </div>

                  {/* 4. Publishing & Integrations (Step 4) */}
                  <div className={`p-3 rounded-2xl border transition-all ${
                    activeStep === 4 ? 'bg-[#FDF2F8]/70 border-[#DB2777]/30 ring-1 ring-[#DB2777]/20' : 'bg-[#FAF8FE] border-[#EDE8F8]'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                          activeStep >= 4 || maxStepReached >= 4 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-[#6B5E77]'
                        }`}>
                          {activeStep >= 4 || maxStepReached >= 4 ? '✓' : '4'}
                        </span>
                        <span className="text-[11px] font-black text-[#1E122C] uppercase tracking-wide">
                          4. Destination & Publishing
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleStepClick(4)}
                        className="text-[10.5px] font-bold text-[#DB2777] hover:underline cursor-pointer"
                      >
                        {activeStep === 4 ? 'Active' : (activeStep > 4 || maxStepReached >= 4) ? 'Edit →' : 'Step 4 →'}
                      </button>
                    </div>

                    {(activeStep >= 4 || maxStepReached >= 4) ? (
                      <div className="mt-2 pl-7 space-y-1 text-[11px]">
                        <div className="flex items-center justify-between">
                          <span className="text-[#6B5E77]">Target Channel:</span>
                          <span className="font-bold text-[#1E122C]">
                            {platformConnections.find(p => p.id === targetPlatform)?.name}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#6B5E77]">URL Path:</span>
                          <span className="font-mono text-[10.5px] font-bold text-[#1E122C]">
                            /{articlePathPrefix || 'blog'}/{slugOverride || 'auto-slug'}
                          </span>
                        </div>
                        {authorName.trim() && (
                          <div className="flex items-center justify-between">
                            <span className="text-[#6B5E77]">Author:</span>
                            <span className="font-bold text-[#1E122C]">{authorName}</span>
                          </div>
                        )}
                        {brandName.trim() && (
                          <div className="flex items-center justify-between">
                            <span className="text-[#6B5E77]">Brand:</span>
                            <span className="font-bold text-[#1E122C]">{brandName}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="mt-1.5 pl-7 text-[11px] text-[#9E92A6] italic">
                        Destination ({platformConnections.find(p => p.id === targetPlatform)?.name}) & advanced settings in Step 4.
                      </p>
                    )}
                  </div>


                  {/* Big Glowing Launch Button */}
                  <div className="pt-2 space-y-2">
                    <button
                      type="button"
                      disabled={isGenerating}
                      onClick={handleGenerateArticle}
                      className={`w-full py-4 rounded-2xl font-black text-xs text-white shadow-lg flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
                        isGenerating
                          ? 'bg-slate-300 opacity-60 cursor-not-allowed shadow-none'
                          : 'bg-gradient-to-r from-[#BE185D] via-[#DB2777] to-[#EC4899] hover:shadow-[0_8px_25px_rgba(219,39,119,0.35)] hover:scale-102 active:scale-98'
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
                    {Object.keys(errors).length > 0 && !isGenerating && (
                      <p className="text-center text-[10.5px] font-bold text-rose-600 flex items-center justify-center gap-1 animate-in fade-in">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>Please fix {Object.keys(errors).length} invalid field{Object.keys(errors).length > 1 ? 's' : ''} to proceed</span>
                      </p>
                    )}
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

                  {/* Publication Success Toast Banner */}
                  {publishSuccessMsg && (
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-start gap-2.5 animate-in fade-in">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <p className="font-black text-emerald-900">Publication Successful!</p>
                        <p className="text-[11px] font-medium text-emerald-800">{publishSuccessMsg}</p>
                      </div>
                    </div>
                  )}

                  {/* Active Generated Article Card */}
                  {generatedArticle && !isGenerating && (
                    <div className="p-4 rounded-2xl bg-[#FDF2F8] border border-[#FCE7F3] space-y-3 animate-in fade-in">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wide text-[#BE185D] flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#DB2777]" />
                          Latest Article Ready
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-white border border-[#FCE7F3] text-[10px] font-black text-[#DB2777]">
                          {generatedArticle.wordCount}w • {generatedArticle.seoScore}/100 SEO
                        </span>
                      </div>

                      <h4 className="text-xs font-black text-[#1E122C] line-clamp-2">
                        {generatedArticle.title}
                      </h4>

                      <div className="space-y-2 pt-1">
                        <button
                          type="button"
                          disabled={isPublishing}
                          onClick={() => handlePublishToPlatform(generatedArticle, targetPlatform)}
                          className="w-full py-2.5 bg-gradient-to-r from-[#BE185D] via-[#DB2777] to-[#EC4899] hover:opacity-95 text-white text-xs font-black rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                        >
                          {isPublishing ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Publishing to {platformConnections.find(p => p.id === targetPlatform)?.name || 'Platform'}...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>Publish to {platformConnections.find(p => p.id === targetPlatform)?.name || 'Platform'}</span>
                            </>
                          )}
                        </button>

                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setIsPreviewModalOpen(true)}
                            className="flex-1 py-2 bg-white hover:bg-[#FAF8FE] border border-[#EDE8F8] text-xs font-bold text-[#1E122C] rounded-xl cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#DB2777]" />
                            <span>Preview Full Article</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(generatedArticle.contentHtml || '');
                              alert('HTML code copied to clipboard!');
                            }}
                            className="px-3 py-2 bg-white hover:bg-[#FAF8FE] border border-[#EDE8F8] text-xs font-bold text-[#6B5E77] rounded-xl cursor-pointer"
                            title="Copy HTML"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
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

                  <div className="pt-4 border-t border-[#EDE8F8] flex flex-wrap items-center justify-between gap-3 shrink-0">
                    <span className="text-xs font-bold text-[#6B5E77]">
                      {activeDoc.isEnriched ? `${activeDoc.wordCount} words • ${activeDoc.seoScore}/100 SEO Score` : PROJECT_STATUS_LABEL[activeDoc.status]}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(activeDoc.contentHtml || '');
                          alert('HTML code copied to clipboard!');
                        }}
                        className="px-3 py-2 border border-[#EDE8F8] hover:bg-[#FAF8FE] text-xs font-bold text-[#6B5E77] rounded-xl cursor-pointer transition-colors"
                      >
                        Copy HTML
                      </button>

                      <button
                        type="button"
                        disabled={isPublishing}
                        onClick={() => handlePublishToPlatform(activeDoc, targetPlatform)}
                        className="px-4 py-2 bg-gradient-to-r from-[#BE185D] via-[#DB2777] to-[#EC4899] hover:opacity-95 text-white text-xs font-black rounded-xl shadow-xs hover:shadow-md cursor-pointer flex items-center gap-1.5 transition-all disabled:opacity-50"
                      >
                        {isPublishing ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Publishing...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Publish to {platformConnections.find(p => p.id === targetPlatform)?.name || 'Platform'}</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 border border-[#EDE8F8] hover:bg-[#FAF8FE] text-xs font-bold rounded-xl cursor-pointer transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })()}

      {/* =========================================================================
          PLATFORM CONNECTION CONFIGURATION MODAL
          ========================================================================= */}
      {configuringPlatform && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#1E122C]/50 backdrop-blur-xs" onClick={() => setConfiguringPlatform(null)} />

          <div className="relative bg-white rounded-[32px] max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[#EDE8F8] z-10 space-y-5 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#EDE8F8] pb-3.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FAF8FE] border border-[#EDE8F8] text-[#DB2777] flex items-center justify-center font-black text-sm">
                  {configuringPlatform.id === 'webflow' && 'W'}
                  {configuringPlatform.id === 'linkedin' && <Linkedin className="w-5 h-5 text-[#0077B5]" />}
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#1E122C] flex items-center gap-2">
                    Connect {configuringPlatform.name}
                    {configuringPlatform.connected && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-black">
                        Active Connection
                      </span>
                    )}
                  </h3>
                  <p className="text-[11px] text-[#6B5E77] font-medium">{configuringPlatform.category} • {configuringPlatform.description}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setConfiguringPlatform(null)}
                className="p-2 hover:bg-[#FAF8FE] rounded-xl text-[#6B5E77] hover:text-[#1E122C] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Platform Specific Form */}
            <div className="space-y-4 text-left">
              {configuringPlatform.id === 'webflow' && (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1E122C]">Webflow Site Name / ID</label>
                    <input
                      type="text"
                      value={configForm.siteUrl}
                      onChange={(e) => setConfigForm(prev => ({ ...prev, siteUrl: e.target.value }))}
                      placeholder="Encaptechno"
                      className="w-full bg-white border border-[#EDE8F8] rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#1E122C] outline-none focus:border-[#DB2777]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1E122C]">Collection ID / Name</label>
                    <input
                      type="text"
                      value={configForm.collectionId}
                      onChange={(e) => setConfigForm(prev => ({ ...prev, collectionId: e.target.value }))}
                      placeholder="Blogs"
                      className="w-full bg-white border border-[#EDE8F8] rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#1E122C] outline-none focus:border-[#DB2777]"
                    />
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] font-bold text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Backend integration active with Webflow API server (Encaptechno).</span>
                  </div>
                </>
              )}

              {configuringPlatform.id === 'linkedin' && (
                <div className="space-y-3">
                  {configuringPlatform.connected ? (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Connected to LinkedIn</span>
                      </div>
                      <p className="text-[11px] text-emerald-700 font-medium">
                        Account: <span className="font-bold">{configuringPlatform.siteUrl || 'LinkedIn Profile'}</span>
                      </p>
                      <p className="text-[10.5px] text-[#6B5E77]">
                        Articles and posts will be published directly to your LinkedIn account using official OAuth credentials.
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 bg-[#FAF8FE] border border-[#EDE8F8] rounded-2xl space-y-3">
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-[#1E122C]">Authorize via LinkedIn OAuth 2.0</h4>
                        <p className="text-[11px] text-[#6B5E77] leading-relaxed">
                          Connect your LinkedIn profile to publish blog articles and thought leadership posts directly to your network.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleConnectLinkedIn}
                        className="w-full py-2.5 px-4 bg-[#0077B5] hover:bg-[#006097] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                      >
                        <Linkedin className="w-4 h-4" />
                        <span>Sign in with LinkedIn</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Default Status Mode */}
              <div className="space-y-1.5 pt-2 border-t border-[#EDE8F8]">
                <label className="text-xs font-bold text-[#1E122C]">Default Publication Mode</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setConfigForm(prev => ({ ...prev, statusMode: 'draft' }))}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      configForm.statusMode === 'draft'
                        ? 'bg-gradient-to-r from-[#BE185D] to-[#DB2777] text-white border-[#DB2777]'
                        : 'bg-white border-[#EDE8F8] text-[#6B5E77]'
                    }`}
                  >
                    Draft Post (Review First)
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfigForm(prev => ({ ...prev, statusMode: 'live' }))}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      configForm.statusMode === 'live'
                        ? 'bg-gradient-to-r from-[#BE185D] to-[#DB2777] text-white border-[#DB2777]'
                        : 'bg-white border-[#EDE8F8] text-[#6B5E77]'
                    }`}
                  >
                    Publish Live Directly
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-[#EDE8F8]">
              {configuringPlatform.connected ? (
                <button
                  type="button"
                  onClick={() => handleDisconnectPlatform(configuringPlatform.id)}
                  className="px-3.5 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl cursor-pointer"
                >
                  Disconnect Platform
                </button>
              ) : (
                <span />
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setConfiguringPlatform(null)}
                  className="px-4 py-2 border border-[#EDE8F8] hover:bg-[#FAF8FE] text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSavePlatformConfig}
                  className="px-5 py-2 bg-gradient-to-r from-[#BE185D] via-[#DB2777] to-[#EC4899] text-white text-xs font-black rounded-xl shadow-xs hover:shadow-md cursor-pointer"
                >
                  Save Connection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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



