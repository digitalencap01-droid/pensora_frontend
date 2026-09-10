import React, { createContext, useContext, useState, useEffect } from 'react';
import { Business, MarketingGoal, Connection, AIAction, Recommendation, ContentItem, WebsiteIssue, AdCampaign } from '../types';
import { apiService } from '../services/api';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

interface MarketingContextType {
  // Onboarding & Setup
  isOnboarded: boolean;
  onboardingStep: number;
  websiteUrl: string;
  business: Business | null;
  selectedGoals: MarketingGoal[];
  connections: Connection[];
  isAnalyzing: boolean;
  analysisProgress: number;
  initialPlanApproved: boolean;

  // Multi-Workspace state
  workspaces: Business[];
  activeWorkspaceId: string | null;
  activeWorkspace: Business | null;

  // Active App Data
  insights: any[];
  actions: AIAction[];
  recommendations: Recommendation[];
  contentSuggestions: ContentItem[];
  websiteIssues: WebsiteIssue[];
  adCampaigns: AdCampaign[];
  growthData: any | null;
  isLoading: boolean;

  // Chat/Assistant Data
  chatMessages: Message[];
  isAssistantOpen: boolean;

  // Methods
  setOnboardingStep: (step: number) => void;
  setWebsiteUrl: (url: string) => void;
  setBusiness: (business: Business) => void;
  setSelectedGoals: (goals: MarketingGoal[]) => void;
  toggleConnection: (id: string) => void;
  startAnalysis: () => Promise<void>;
  approveInitialPlan: () => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;

  // Workspace Switcher & Editor methods
  createWorkspace: (data: Partial<Business>) => string;
  switchWorkspace: (id: string) => void;
  updateWorkspace: (id: string, updated: Partial<Business>) => void;
  deleteWorkspace: (id: string) => void;

  // Action methods
  approveAction: (id: string) => Promise<void>;
  dismissAction: (id: string) => void;
  applyRecommendation: (id: string) => Promise<void>;
  fixWebsiteIssue: (id: string) => Promise<void>;
  createContentItem: (title: string, type: ContentItem['type']) => Promise<void>;
  toggleAdCampaign: (id: string) => void;

  // Chat methods
  setAssistantOpen: (open: boolean) => void;
  sendMessageToAssistant: (text: string) => Promise<void>;
}

const MarketingContext = createContext<MarketingContextType | undefined>(undefined);

// Dynamic scoring functions
const calculateProfileCompletion = (b: Partial<Business>): number => {
  const fields: (keyof Business)[] = [
    'name',
    'website',
    'description',
    'industry',
    'stage',
    'location',
    'targetMarket',
    'growthGoal',
    'productsServices',
    'targetAudienceType',
    'targetAudienceDesc',
    'channels',
    'toneOfVoice'
  ];
  let filled = 0;
  fields.forEach(field => {
    const val = b[field];
    if (val !== undefined && val !== null && val !== '') {
      if (Array.isArray(val)) {
        if (val.length > 0) filled++;
      } else {
        filled++;
      }
    }
  });
  return Math.round((filled / fields.length) * 100);
};

const calculateReadinessScore = (b: Partial<Business>): number => {
  let score = 50; // base score
  if (b.stage === 'established') score += 20;
  else if (b.stage === 'growing') score += 15;
  else if (b.stage === 'active') score += 10;
  if (b.website) score += 10;
  if (b.channels && b.channels.length > 0) {
    score += Math.min(b.channels.length * 4, 15);
  }
  const comp = calculateProfileCompletion(b);
  score += Math.round(comp * 0.1);
  return Math.min(score, 100);
};

export const MarketingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & onboarding state
  const [isOnboarded, setIsOnboarded] = useState<boolean>(true);
  const [onboardingStep, setOnboardingStep] = useState<number>(1);
  const [websiteUrl, setWebsiteUrl] = useState<string>('');
  const [selectedGoals, setSelectedGoals] = useState<MarketingGoal[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const [initialPlanApproved, setInitialPlanApproved] = useState<boolean>(false);

  // Multi-Workspace state with seed data
  const [workspaces, setWorkspaces] = useState<Business[]>([
    {
      id: 'w_bloom',
      name: 'Bloom Boutique',
      website: 'https://bloomboutique.shop',
      description: 'Handcrafted eco-friendly clothing for minimalist wardrobes.',
      industry: 'Sustainable Fashion',
      stage: 'growing',
      location: 'California, USA',
      targetMarket: 'Eco-conscious millennial women',
      growthGoal: 'sales',
      services: ['Linen dresses', 'Organic cotton tops', 'Handmade jewelry'],
      productsServices: ['Linen dresses', 'Organic cotton tops', 'Handmade jewelry'],
      targetAudienceType: 'B2C',
      targetAudienceDesc: 'Millennial women looking for timeless, sustainable, and minimal apparel.',
      channels: ['blog', 'linkedin', 'email', 'whatsapp', 'seo', 'social'],
      toneOfVoice: 'friendly',
      monthlyBudget: '$500 - $2,000',
      consentGranted: true,
      profileCompletion: 100,
      readinessScore: 85,
      aiSummary: 'Bloom Boutique is a sustainable, eco-friendly apparel brand focused on direct-to-consumer B2C e-commerce sales. They utilize AI Blog Writer, LinkedIn, and Email as primary acquisition channels.',
      recommendedFirstAction: 'Launch AI Blog article for the new Summer Linen Dress collection.'
    },
    {
      id: 'w_greenhouse',
      name: 'Greenhouse Coffee',
      website: 'https://greenhousecoffee.com',
      description: 'Specialty organic coffee beans, directly sourced and micro-roasted.',
      industry: 'Food & Beverage',
      stage: 'established',
      location: 'Portland, OR',
      targetMarket: 'Local coffee enthusiasts & cafes',
      growthGoal: 'retention',
      services: ['Micro-roasted beans', 'Cold brew kegs', 'Drip coffee filters'],
      productsServices: ['Micro-roasted beans', 'Cold brew kegs', 'Drip coffee filters'],
      targetAudienceType: 'Both',
      targetAudienceDesc: 'Daily coffee drinkers seeking single-origin beans and local coffee shops needing wholesale keg supply.',
      channels: ['blog', 'email', 'sem', 'seo'],
      toneOfVoice: 'casual',
      monthlyBudget: '$2,000+',
      consentGranted: true,
      profileCompletion: 100,
      readinessScore: 92,
      aiSummary: 'Greenhouse Coffee is a micro-roastery offering specialty B2C/B2B coffee products. They focus on customer retention through email newsletters and local search visibility.',
      recommendedFirstAction: 'Optimize email automated welcome flows to offer a 15% subscriber retention discount.'
    }
  ]);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string | null>('w_bloom');

  // Computed state
  const activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId) || null;
  const business = activeWorkspace;

  const setBusiness = (newBusiness: Business) => {
    updateWorkspace(newBusiness.id || activeWorkspaceId || '', newBusiness);
  };

  // Connected accounts
  const [connections, setConnections] = useState<Connection[]>([
    { id: 'google_analytics', name: 'Google Analytics', description: 'Analyze visitor counts and user behaviors.', icon: 'BarChart2', connected: false },
    { id: 'search_console', name: 'Google Search Console', description: 'Monitor Google search organic impressions.', icon: 'Search', connected: false },
    { id: 'instagram', name: 'Instagram', description: 'Publish and monitor visual posts.', icon: 'Instagram', connected: false },
    { id: 'facebook', name: 'Facebook', description: 'Reach local audiences with social pages.', icon: 'Facebook', connected: false },
    { id: 'google_ads', name: 'Google Ads', description: 'Drive immediate search intent customers.', icon: 'TrendingUp', connected: false }
  ]);

  // Main marketing app data
  const [insights, setInsights] = useState<any[]>([]);
  const [actions, setActions] = useState<AIAction[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [contentSuggestions, setContentSuggestions] = useState<ContentItem[]>([]);
  const [websiteIssues, setWebsiteIssues] = useState<WebsiteIssue[]>([]);
  const [adCampaigns, setAdCampaigns] = useState<AdCampaign[]>([]);
  const [growthData, setGrowthData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // AI Assistant chat state
  const [isAssistantOpen, setAssistantOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { id: 'm_init', sender: 'ai', text: "Hello! I'm your AI Marketing Manager. I've finished compiling your business profile. What would you like to build or check today?", timestamp: new Date() }
  ]);

  // Load initial app data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [ins, acts, recs, content, web, ads, growth] = await Promise.all([
          apiService.getInsights(),
          apiService.getActions(),
          apiService.getRecommendations(),
          apiService.getContentSuggestions(),
          apiService.getWebsiteIssues(),
          apiService.getAdCampaigns(),
          apiService.getGrowthData()
        ]);
        setInsights(ins);
        setActions(acts);
        setRecommendations(recs);
        setContentSuggestions(content);
        setWebsiteIssues(web);
        setAdCampaigns(ads);
        setGrowthData(growth);
      } catch (err) {
        console.error('Failed to mock dashboard data', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const toggleConnection = (id: string) => {
    setConnections(prev => prev.map(c => c.id === id ? { ...c, connected: !c.connected } : c));
  };

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    for (let p = 10; p <= 100; p += 15) {
      await new Promise(r => setTimeout(r, 450));
      setAnalysisProgress(Math.min(p, 100));
    }
    
    const scrapedBusiness = await apiService.scrapeBusinessFromWebsite(websiteUrl);
    // Merge scraped data into active onboarding draft workspace
    if (activeWorkspaceId) {
      updateWorkspace(activeWorkspaceId, {
        name: scrapedBusiness.name,
        website: scrapedBusiness.website,
        description: scrapedBusiness.description,
        services: scrapedBusiness.services,
        location: scrapedBusiness.location,
        socials: scrapedBusiness.socials,
        productsServices: scrapedBusiness.services
      });
    }
    setIsAnalyzing(false);
  };

  const approveInitialPlan = () => {
    setInitialPlanApproved(true);
  };

  const createWorkspace = (data: Partial<Business>) => {
    const newId = `w_${Date.now()}`;
    const newWorkspace: Business = {
      id: newId,
      name: data.name || 'New Workspace',
      website: data.website || '',
      description: data.description || '',
      services: data.productsServices || data.services || [],
      location: data.location || '',
      socials: data.socials || {},
      toneOfVoice: data.toneOfVoice || 'friendly',
      consentGranted: data.consentGranted || false,
      monthlyBudget: data.monthlyBudget || '$0 - $500',
      
      industry: data.industry || 'General',
      stage: data.stage || 'new',
      targetMarket: data.targetMarket || '',
      growthGoal: data.growthGoal || 'awareness',
      productsServices: data.productsServices || [],
      targetAudienceType: data.targetAudienceType || 'B2C',
      targetAudienceDesc: data.targetAudienceDesc || '',
      channels: data.channels || [],
      profileCompletion: calculateProfileCompletion(data),
      readinessScore: calculateReadinessScore(data),
      aiSummary: data.aiSummary || 'Profile generated. Ready to configure strategy.',
      recommendedFirstAction: data.recommendedFirstAction || 'Complete your setup to see AI recommendations.'
    };
    setWorkspaces(prev => [...prev, newWorkspace]);
    setActiveWorkspaceId(newId);
    return newId;
  };

  const switchWorkspace = (id: string) => {
    setActiveWorkspaceId(id);
  };

  const updateWorkspace = (id: string, updated: Partial<Business>) => {
    setWorkspaces(prev => prev.map(w => {
      if (w.id === id) {
        const merged = { ...w, ...updated };
        merged.profileCompletion = calculateProfileCompletion(merged);
        merged.readinessScore = calculateReadinessScore(merged);
        return merged;
      }
      return w;
    }));
  };

  const deleteWorkspace = (id: string) => {
    setWorkspaces(prev => {
      const filtered = prev.filter(w => w.id !== id);
      if (activeWorkspaceId === id && filtered.length > 0) {
        setActiveWorkspaceId(filtered[0].id);
      }
      return filtered;
    });
  };

  const completeOnboarding = () => {
    // Finalize any w_temp draft IDs to real workspaces
    if (activeWorkspaceId && activeWorkspaceId.startsWith('w_temp')) {
      const realId = `w_${Date.now()}`;
      setWorkspaces(prev => prev.map(w => {
        if (w.id === activeWorkspaceId) {
          const comp = calculateProfileCompletion(w);
          const read = calculateReadinessScore(w);
          return {
            ...w,
            id: realId,
            profileCompletion: comp,
            readinessScore: read,
            aiSummary: `${w.name} is a ${w.industry} brand in the ${w.stage} stage. They sell ${w.productsServices?.join(', ')} in the ${w.targetMarket} market.`,
            recommendedFirstAction: `Optimize marketing setup on ${w.channels?.slice(0, 2).join(' and ') || 'primary acquisition channels'}.`
          };
        }
        return w;
      }));
      setActiveWorkspaceId(realId);
    }
    setIsOnboarded(true);
  };

  const resetOnboarding = () => {
    setIsOnboarded(false);
    setOnboardingStep(1);
    setWebsiteUrl('');
    setSelectedGoals([]);
    setConnections(c => c.map(item => ({ ...item, connected: false })));
    setInitialPlanApproved(false);

    // Seed a blank temporary workspace for form bindings during onboarding
    const tempId = `w_temp_${Date.now()}`;
    const draft: Business = {
      id: tempId,
      name: '',
      website: '',
      description: '',
      services: [],
      location: '',
      socials: {},
      profileCompletion: 0,
      readinessScore: 0,
      productsServices: [],
      channels: []
    };
    setWorkspaces(prev => [...prev.filter(w => !w.id.startsWith('w_temp')), draft]);
    setActiveWorkspaceId(tempId);
  };

  // Actions
  const approveAction = async (id: string) => {
    await apiService.updateActionStatus(id, 'completed');
    setActions(prev => prev.map(act => act.id === id ? { ...act, status: 'completed' } : act));
    
    // Check if it's the website CTA issue and update the website issue state too!
    const act = actions.find(a => a.id === id);
    if (act?.category === 'website') {
      // Find matching detected website issue and resolve it
      setWebsiteIssues(prev => prev.map(w => w.status === 'detected' ? { ...w, status: 'resolved' } : w));
    }
  };

  const dismissAction = (id: string) => {
    setActions(prev => prev.filter(act => act.id !== id));
  };

  const applyRecommendation = async (id: string) => {
    await new Promise(r => setTimeout(r, 800));
    setRecommendations(prev => prev.map(rec => rec.id === id ? { ...rec, applied: true } : rec));
    
    // Add a corresponding AI Action as "working" or "needs_approval"
    const rec = recommendations.find(r => r.id === id);
    if (rec) {
      const newAction: AIAction = {
        id: `act_rec_${Date.now()}`,
        title: `Implementing: ${rec.title}`,
        description: `AI is carrying out optimization steps: ${rec.action}`,
        whyMatters: rec.why,
        whatNext: 'AI will notify you once completed.',
        status: 'working',
        autonomy: 'automatic',
        category: 'seo',
        createdAt: new Date().toISOString()
      };
      setActions(prev => [newAction, ...prev]);
    }
  };

  // Website Issues
  const fixWebsiteIssue = async (id: string) => {
    setWebsiteIssues(prev => prev.map(w => w.id === id ? { ...w, status: 'fixing' } : w));
    
    // Create background action
    const issue = websiteIssues.find(w => w.id === id);
    const newAction: AIAction = {
      id: `act_web_${Date.now()}`,
      title: `Fixing website issue: ${issue?.problem}`,
      description: `AI is applying styling fixes to code templates: ${issue?.solution}`,
      whyMatters: issue?.whyMatters || '',
      whatNext: 'AI will deploy stylesheet changes once completed.',
      status: 'working',
      autonomy: 'automatic',
      category: 'website',
      createdAt: new Date().toISOString()
    };
    setActions(prev => [newAction, ...prev]);

    await apiService.fixWebsiteIssue(id);
    
    setWebsiteIssues(prev => prev.map(w => w.id === id ? { ...w, status: 'resolved' } : w));
    setActions(prev => prev.map(act => act.id === newAction.id ? { ...act, status: 'completed' } : act));
  };

  // Content Suggestions
  const createContentItem = async (title: string, type: ContentItem['type']) => {
    const newItem = await apiService.createContentWithAI(title, type);
    setContentSuggestions(prev => [newItem, ...prev]);
    
    // Sync action into context
    const latestActions = await apiService.getActions();
    setActions(latestActions);
  };

  // Ads
  const toggleAdCampaign = (id: string) => {
    setAdCampaigns(prev => prev.map(ad => {
      if (ad.id === id) {
        const nextStatus = ad.status === 'active' ? 'paused' : 'active';
        return { 
          ...ad, 
          status: nextStatus,
          // Clear warnings if we are addressing them
          issue: nextStatus === 'active' ? undefined : ad.issue,
          recommendation: nextStatus === 'active' ? undefined : ad.recommendation
        };
      }
      return ad;
    }));
  };

  // Chat / Assistant Messages
  const sendMessageToAssistant = async (text: string) => {
    const userMsg: Message = { id: `m_user_${Date.now()}`, sender: 'user', text, timestamp: new Date() };
    setChatMessages(prev => [...prev, userMsg]);

    await new Promise(r => setTimeout(r, 1200));

    // Dynamic responses based on context data or question intent
    let aiResponse = "I'm analyzing your request. Let me check your marketing stats.";
    const businessName = business?.name || 'your business';
    
    const lowercaseText = text.toLowerCase();
    if (lowercaseText.includes('traffic') || lowercaseText.includes('drop') || lowercaseText.includes('visitors')) {
      aiResponse = `Regarding search visitor levels: our Google organic traffic has grown 24% following SEO adjustments. However, Google Search Ads competition has raised cost-per-click, causing search traffic acquisitions to cost 18% more. I recommend shift-allocating some ad budget to Retargeting.`;
    } else if (lowercaseText.includes('do today') || lowercaseText.includes('task') || lowercaseText.includes('opportunity')) {
      aiResponse = `Your absolute next best action is: **Get more traffic from Google**. Competitors are ranking for sustainable fashion queries. I've prepared a content draft and metadata adjustments for you. Would you like me to begin creating the care guide article?`;
    } else if (lowercaseText.includes('social') || lowercaseText.includes('post') || lowercaseText.includes('content')) {
      aiResponse = `I have drafted an Instagram post showcasing our handcrafted jewelry artisans. I can also schedule a blog draft titled "10-Item Sustainable Capsule Wardrobe". Check out the **Content** tab to view schedules and review drafts!`;
    } else if (lowercaseText.includes('leads') || lowercaseText.includes('customers')) {
      aiResponse = `To grow lead capture rates, I've detected that the email registration signup rate fell slightly to 2.8%. We can introduce a welcome popup discount. I've placed this in your **Actions** dashboard for approval!`;
    } else {
      aiResponse = `Based on ${businessName}'s goal of increasing ${selectedGoals.join(', ') || 'customers'}, I've created a queue of recommended steps. We are currently: 1. Optimizing jewelry organic metadata (Done), 2. Creating linen clothing content (Working), 3. Fine-tuning Google search ad keyword targeting. Let me know if you want me to automate any of these!`;
    }

    const aiMsg: Message = { id: `m_ai_${Date.now()}`, sender: 'ai', text: aiResponse, timestamp: new Date() };
    setChatMessages(prev => [...prev, aiMsg]);
  };

  return (
    <MarketingContext.Provider value={{
      isOnboarded,
      onboardingStep,
      websiteUrl,
      business,
      selectedGoals,
      connections,
      isAnalyzing,
      analysisProgress,
      initialPlanApproved,

      // Multi-Workspace state
      workspaces,
      activeWorkspaceId,
      activeWorkspace,

      insights,
      actions,
      recommendations,
      contentSuggestions,
      websiteIssues,
      adCampaigns,
      growthData,
      isLoading,

      chatMessages,
      isAssistantOpen,

      setOnboardingStep,
      setWebsiteUrl,
      setBusiness,
      setSelectedGoals,
      toggleConnection,
      startAnalysis,
      approveInitialPlan,
      completeOnboarding,
      resetOnboarding,

      // Workspace Switcher & Editor methods
      createWorkspace,
      switchWorkspace,
      updateWorkspace,
      deleteWorkspace,

      approveAction,
      dismissAction,
      applyRecommendation,
      fixWebsiteIssue,
      createContentItem,
      toggleAdCampaign,

      setAssistantOpen,
      sendMessageToAssistant
    }}>
      {children}
    </MarketingContext.Provider>
  );
};

export const useMarketing = () => {
  const context = useContext(MarketingContext);
  if (context === undefined) {
    throw new Error('useMarketing must be used within a MarketingProvider');
  }
  return context;
};
