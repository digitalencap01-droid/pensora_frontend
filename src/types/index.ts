export interface Business {
  id: string;
  name: string;
  website: string;
  description: string;
  services: string[];
  location: string;
  socials: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  targetAudience?: string;
  competitors?: string[];
  toneOfVoice?: 'friendly' | 'professional' | 'casual' | 'premium' | 'trustworthy';
  monthlyBudget?: string;
  consentGranted?: boolean;
  
  // Expanded Onboarding checklist fields
  industry?: string;
  stage?: 'new' | 'active' | 'growing' | 'established';
  targetMarket?: string;
  growthGoal?: 'leads' | 'sales' | 'awareness' | 'retention' | 're-engagement' | 'launch';
  productsServices?: string[];
  targetAudienceType?: 'B2B' | 'B2C' | 'Both';
  targetAudienceDesc?: string;
  channels?: string[];
  profileCompletion?: number;
  readinessScore?: number;
  aiSummary?: string;
  recommendedFirstAction?: string;
}

export type MarketingGoal = 
  | 'customers' 
  | 'visitors' 
  | 'leads' 
  | 'sales' 
  | 'brand';

export interface MarketingGoalOption {
  id: MarketingGoal;
  title: string;
  description: string;
  icon: string;
}

export interface Connection {
  id: string;
  name: string;
  description: string;
  icon: string;
  connected: boolean;
}

export type ActionStatus = 'working' | 'completed' | 'needs_approval';
export type AutonomyState = 'recommend' | 'approval_required' | 'automatic';

export interface AIAction {
  id: string;
  title: string;
  description: string;
  whyMatters: string;
  whatNext: string;
  status: ActionStatus;
  autonomy: AutonomyState;
  category: 'content' | 'website' | 'ads' | 'seo';
  createdAt: string;
}

export interface Recommendation {
  id: string;
  title: string;
  impact: 'High' | 'Medium' | 'Low';
  why: string;
  action: string;
  applied: boolean;
}

export interface Insight {
  id: string;
  category: 'audience' | 'competitors' | 'growth';
  what: string;
  why: string;
  action: string;
}

export interface ContentItem {
  id: string;
  title: string;
  reason: string;
  type: 'blog' | 'social' | 'newsletter';
  status: 'recommended' | 'creating' | 'ready_for_review' | 'scheduled' | 'published';
  scheduledDate?: string;
}

export interface WebsiteIssue {
  id: string;
  problem: string;
  whyMatters: string;
  solution: string;
  status: 'detected' | 'fixing' | 'resolved';
  technicalDetails?: string;
}

export interface AdCampaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'needs_attention';
  issue?: string;
  recommendation?: string;
  metrics: {
    spent: number;
    clicks: number;
    impressions: number;
    conversions: number;
    ctr: number;
    cpc: number;
    cpa: number;
    roas: number;
  };
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  jobTitle?: string;
  location?: string;
  source: string;
  lifecycleStage: 'lead' | 'mql' | 'sql' | 'customer';
  leadStatus: 'new' | 'contacted' | 'qualified' | 'lost';
  leadScore: number;
  priority: 'high' | 'medium' | 'low';
  segment?: string;
  tags: string[];
  owner?: string;
  consent: boolean;
  createdAt: string;
}
