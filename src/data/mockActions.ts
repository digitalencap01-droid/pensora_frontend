import { AIAction } from '../types';

export const mockActions: AIAction[] = [
  {
    id: 'act_1',
    title: 'Writing your first blog post: "How to Build a 10-Item Sustainable Capsule Wardrobe"',
    description: 'AI is drafting a 1,200-word SEO-optimized blog article complete with layout structure, headings, and internal linking to dress products.',
    whyMatters: 'Sustainable minimal wardrobe search query volumes have grown 35% this quarter. Publishing this will help capture organic search traffic.',
    whatNext: 'AI will present the completed draft in the Content section for your review and edits.',
    status: 'working',
    autonomy: 'approval_required',
    category: 'content',
    createdAt: '2026-08-24T10:00:00Z'
  },
  {
    id: 'act_2',
    title: 'Creating this week\'s social media image posts',
    description: 'AI is generating five promotional social templates highlighting sustainable linen clothes, scheduling them in your social queue.',
    whyMatters: 'Consistent posting maintains audience engagement and increases referral shop visits by 22%.',
    whatNext: 'These will be queued automatically once the designs and copy are generated.',
    status: 'working',
    autonomy: 'automatic',
    category: 'content',
    createdAt: '2026-08-24T11:30:00Z'
  },
  {
    id: 'act_3',
    title: 'Optimizing product metadata for Sustainable Linen Dresses',
    description: 'Updated meta-titles, description tags, and alt tags for 12 core dress products to match "minimalist linen apparel" searches.',
    whyMatters: 'Improves Search Console impressions and ranks your pages higher on search results pages.',
    whatNext: 'Optimizations have been pushed live. Google will re-index these listings within 7-10 days.',
    status: 'completed',
    autonomy: 'automatic',
    category: 'seo',
    createdAt: '2026-08-23T15:20:00Z'
  },
  {
    id: 'act_4',
    title: 'Homepage mobile call-to-action layout ready for review',
    description: 'Redesigned the homepage hero layout to enlarge the mobile "Shop Now" button, changing it to violet and centering it.',
    whyMatters: 'Will decrease mobile abandonment rates and is projected to raise clicks by 18-25%.',
    whatNext: 'Review the design change and click "Approve" to publish the live style update.',
    status: 'needs_approval',
    autonomy: 'approval_required',
    category: 'website',
    createdAt: '2026-08-24T09:15:00Z'
  },
  {
    id: 'act_5',
    title: 'Ad Budget Allocation Adjustment',
    description: 'Preparing to transfer $50/week from the underperforming Google Search campaign (brass rings) to the high-performing Meta retargeting campaign (conversions).',
    whyMatters: 'Google campaign returns 1.8x ROAS, while Meta returns 6.5x. Shift will yield more customer purchases for the same budget.',
    whatNext: 'Requires your final sign-off to push the budget update to Google and Meta ad accounts.',
    status: 'needs_approval',
    autonomy: 'approval_required',
    category: 'ads',
    createdAt: '2026-08-24T12:05:00Z'
  }
];
