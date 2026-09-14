// Types mirroring the Pensora backend's Pydantic schemas
// (pensora_backend/app/schemas/{content,article,seo,html,keywords,project_management}.py).
// Keep these in sync with the backend if those schemas change.

export type ArticleType =
  | 'blog'
  | 'guide'
  | 'news'
  | 'tutorial'
  | 'comparison'
  | 'listicle'
  | 'thought_leadership'
  | 'case_study';

export type ToneType =
  | 'professional'
  | 'conversational'
  | 'technical'
  | 'educational'
  | 'authoritative';

export type ContentGoal =
  | 'organic_traffic'
  | 'education'
  | 'thought_leadership'
  | 'lead_generation'
  | 'product_discovery';

export type Freshness = '24h' | '7d' | '30d' | '90d' | '1y' | 'any';

export interface ContentGenerateRequest {
  topic: string;
  country_code: string;
  language: string;
  language_code: string;
  freshness: Freshness;
  max_research_queries: number;
  article_type: ArticleType;
  tone: ToneType;
  target_audience?: string;
  content_goal: ContentGoal;
  target_word_count: number;
  call_to_action?: string;
  additional_instructions?: string;
  brand_name?: string;
  site_name?: string;
  site_url?: string;
  article_path_prefix: string;
  authors: { name: string }[];
  featured_image_urls: string[];
  thumbnail_image_url?: string;
  slug_override?: string;
  indexable: boolean;
  include_sources: boolean;
  publisher_name?: string;
  publisher_url?: string;
  publisher_logo_url?: string;
}

export interface ArticleSource {
  source_id: string;
  title: string | null;
  url: string;
  domain: string;
}

export interface ArticleResult {
  topic: string;
  title: string;
  h1: string;
  language: string;
  sources: ArticleSource[];
  total_word_count: number;
  article_markdown: string;
}

export interface SEOCheck {
  check_id: string;
  status: 'pass' | 'warning' | 'fail';
  message: string;
  weight: number;
}

export interface SEOResult {
  seo_title: string;
  meta_description: string;
  slug: string;
  canonical_url: string;
  thumbnail_url: string | null;
  schema_type: string;
  checks: SEOCheck[];
  readiness_score: number;
}

export interface HTMLRenderResult {
  filename: string;
  full_html: string;
  article_html: string;
  saved: boolean;
  relative_path: string | null;
}

export interface KeywordItem {
  keyword: string;
  intent: string;
  rationale: string;
}

export interface KeywordResult {
  topic: string;
  primary_keyword: KeywordItem;
  secondary_keywords: KeywordItem[];
}

export interface ContentGenerateResult {
  project_id: string;
  article_id: string;
  article_version: number;
  keywords: KeywordResult;
  article: ArticleResult;
  seo: SEOResult;
  html: HTMLRenderResult;
}

export type ProjectStatus = 'generating' | 'completed' | 'failed';

export interface ProjectSummary {
  id: string;
  topic: string;
  status: ProjectStatus;
  current_stage: string | null;
  article_type: ArticleType;
  tone: ToneType;
  language: string;
  country_code: string;
  error_stage: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectListResult {
  items: ProjectSummary[];
  total: number;
  limit: number;
  offset: number;
}

export interface ProjectArtifactsResult {
  project_id: string;
  keywords: KeywordResult | null;
  article: ArticleResult | null;
  seo: SEOResult | null;
  html: HTMLRenderResult | null;
}

export interface UsageSummary {
  total_projects: number;
  completed_projects: number;
  failed_projects: number;
  total_words_written: number;
}

export interface WebflowStatusResponse {
  connected: boolean;
  site_id?: string | null;
  site_name?: string | null;
  collection_id?: string | null;
  collection_name?: string | null;
  title_field?: string | null;
  slug_field?: string | null;
  body_field?: string | null;
  summary_field?: string | null;
}

export interface WebflowPublishResponse {
  item_id: string;
  status: 'draft' | 'live';
  dashboard_url?: string | null;
}

export interface ApiErrorPayload {
  stage?: string;
  message?: string;
}
