/**
 * Centralized Query Keys Factory for TanStack Query
 * Organizes cache keys for all AI Digital Marketing domains.
 */
export const queryKeys = {
  // Workspaces & Business Profiles
  workspaces: {
    all: ['workspaces'] as const,
    detail: (id: string | null) => ['workspaces', id] as const,
  },

  // AI Autonomous Actions & Tasks
  actions: {
    all: (workspaceId?: string | null) => ['actions', workspaceId] as const,
    detail: (actionId: string) => ['actions', 'detail', actionId] as const,
    active: (workspaceId?: string | null) => ['actions', 'active', workspaceId] as const,
  },

  // Strategic AI Recommendations
  recommendations: {
    all: (workspaceId?: string | null) => ['recommendations', workspaceId] as const,
    detail: (recId: string) => ['recommendations', 'detail', recId] as const,
  },

  // Competitor & Market Discovery Insights
  insights: {
    all: (workspaceId?: string | null) => ['insights', workspaceId] as const,
  },

  // Growth Roadmap & Tasks
  plan: {
    tasks: (workspaceId?: string | null) => ['plan', 'tasks', workspaceId] as const,
  },

  // AI Content Studio
  content: {
    all: (workspaceId?: string | null) => ['content', workspaceId] as const,
    templates: ['content', 'templates'] as const,
  },

  // Website Health & Technical SEO
  website: {
    audit: (workspaceId?: string | null) => ['website', 'audit', workspaceId] as const,
    issues: (workspaceId?: string | null) => ['website', 'issues', workspaceId] as const,
  },

  // Paid Ads Campaigns (Meta, Google, TikTok)
  ads: {
    all: (workspaceId?: string | null) => ['ads', workspaceId] as const,
    campaign: (campaignId: string) => ['ads', 'detail', campaignId] as const,
  },

  // CRM Contacts & Leads
  contacts: {
    all: (workspaceId?: string | null, filters?: Record<string, any>) => ['contacts', workspaceId, filters] as const,
    detail: (contactId: string) => ['contacts', 'detail', contactId] as const,
  },

  // Growth Analytics & Attribution Funnel
  analytics: {
    funnel: (workspaceId?: string | null) => ['analytics', 'funnel', workspaceId] as const,
    performance: (workspaceId?: string | null, timeRange?: string) => ['analytics', 'performance', workspaceId, timeRange] as const,
  },

  // Long-Running Background AI Task Polling (Scraping, Generation, Audits)
  aiTask: {
    status: (taskId: string | null) => ['ai-task', taskId] as const,
  },

  // AI Blog Studio (real Pensora backend — /api/v1/content, /api/v1/projects)
  blog: {
    projects: (limit: number, offset: number) => ['blog', 'projects', limit, offset] as const,
    artifacts: (projectId: string | null) => ['blog', 'artifacts', projectId] as const,
    usageSummary: ['blog', 'usage-summary'] as const,
  },
};
