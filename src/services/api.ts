import { Business, AIAction, Recommendation, ContentItem, WebsiteIssue, AdCampaign } from '../types';
import { mockBusinessPresets, defaultBusiness } from '../data/mockBusiness';
import { mockInsights, mockContentSuggestions, mockWebsiteIssues, mockAdCampaigns, mockGrowthData } from '../data/mockMarketingData';
import { mockActions } from '../data/mockActions';
import { mockRecommendations } from '../data/mockRecommendations';

// Simulated latency to mimic a real backend API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  // Business APIs
  async getBusinessInfo(): Promise<Business> {
    await delay(300);
    return { ...defaultBusiness };
  },

  async scrapeBusinessFromWebsite(url: string): Promise<Business> {
    await delay(1800); // Mimic AI parsing the site
    const cleanUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '').toLowerCase();
    const preset = mockBusinessPresets[cleanUrl];
    if (preset) {
      return { ...preset };
    }
    // Default fallback if website not pre-coded
    const domainPart = cleanUrl.split('.')[0] || 'My Shop';
    const capitalized = domainPart.charAt(0).toUpperCase() + domainPart.slice(1);
    return {
      id: `b_${Date.now()}`,
      name: capitalized,
      website: url,
      description: `A growing boutique retail business providing unique products in the ${capitalized} space, dedicated to quality and customer service.`,
      services: ['Core Product Catalog', 'Online Customer Portal', 'Home Standard Shipping'],
      location: 'Local Region',
      socials: {
        instagram: `instagram.com/${domainPart}`,
        facebook: `facebook.com/${domainPart}`
      }
    };
  },

  // Insights APIs
  async getInsights(): Promise<typeof mockInsights> {
    await delay(300);
    return [...mockInsights];
  },

  // Actions APIs
  async getActions(): Promise<AIAction[]> {
    await delay(300);
    return [...mockActions];
  },

  async updateActionStatus(id: string, status: AIAction['status']): Promise<void> {
    await delay(200);
    const actionIndex = mockActions.findIndex(a => a.id === id);
    if (actionIndex !== -1) {
      mockActions[actionIndex].status = status;
    }
  },

  async approveAction(id: string): Promise<void> {
    await delay(200);
    const actionIndex = mockActions.findIndex(a => a.id === id);
    if (actionIndex !== -1) {
      mockActions[actionIndex].status = 'completed';
    }
  },

  // Recommendations APIs
  async getRecommendations(): Promise<Recommendation[]> {
    await delay(300);
    return [...mockRecommendations];
  },

  async applyRecommendation(id: string): Promise<void> {
    await delay(300);
    const recIndex = mockRecommendations.findIndex(r => r.id === id);
    if (recIndex !== -1) {
      mockRecommendations[recIndex].applied = true;
    }
  },

  // Content Suggestions APIs
  async getContentSuggestions(): Promise<ContentItem[]> {
    await delay(300);
    return [...mockContentSuggestions];
  },

  async createContentWithAI(title: string, type: ContentItem['type']): Promise<ContentItem> {
    await delay(1000);
    const newItem: ContentItem = {
      id: `c_${Date.now()}`,
      title,
      reason: 'Created on demand by your AI marketing assistant.',
      type,
      status: 'ready_for_review'
    };
    mockContentSuggestions.unshift(newItem);
    // Also push to working actions
    const newAction: AIAction = {
      id: `act_${Date.now()}`,
      title: `Drafting content: "${title}"`,
      description: `AI generated draft for ${type}. Currently ready for your edits and final approval.`,
      whyMatters: 'Created at user request to target organic search interest.',
      whatNext: 'Review and approve draft to publish.',
      status: 'needs_approval',
      autonomy: 'approval_required',
      category: 'content',
      createdAt: new Date().toISOString()
    };
    mockActions.unshift(newAction);
    return newItem;
  },

  // Website Issues APIs
  async getWebsiteIssues(): Promise<WebsiteIssue[]> {
    await delay(300);
    return [...mockWebsiteIssues];
  },

  async fixWebsiteIssue(id: string): Promise<void> {
    await delay(1200); // Simulated fix time
    const issue = mockWebsiteIssues.find(w => w.id === id);
    if (issue) {
      issue.status = 'resolved';
    }
  },

  // Ad Campaigns APIs
  async getAdCampaigns(): Promise<AdCampaign[]> {
    await delay(300);
    return [...mockAdCampaigns];
  },

  // Growth Analytics APIs
  async getGrowthData(): Promise<typeof mockGrowthData> {
    await delay(300);
    return { ...mockGrowthData };
  }
};
