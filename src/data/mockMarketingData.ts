import { Insight, ContentItem, WebsiteIssue, AdCampaign } from '../types';

export const mockInsights: Insight[] = [
  {
    id: 'in_1',
    category: 'audience',
    what: 'People are actively searching for "sustainable minimal wardrobes" and "linen clothing care".',
    why: 'These search patterns represent high-intent buyers looking for durable, eco-friendly fashion options, which directly align with your products.',
    action: 'Create a care guide blog post and a dedicated "Minimalist Essentials" collection page.'
  },
  {
    id: 'in_2',
    category: 'competitors',
    what: 'Your closest competitor just launched an Instagram campaign highlighting "ethically sourced brass jewelry" and is ranking high on search queries for it.',
    why: 'Jewelry is one of your high-margin categories, and they are capturing search traffic that should be landing on your store.',
    action: 'Optimize your brass jewelry product description and launch an Instagram reel showing the handmade artisan process.'
  },
  {
    id: 'in_3',
    category: 'growth',
    what: 'Visitors who read your brand story page convert to customers at a 3x higher rate than those who go straight to the shop.',
    why: 'Story-driven branding builds trust and highlights the sustainability value proposition that premium buyers care about.',
    action: 'Add a small, prominent brand-story snippet to the homepage hero section and a clean link to read more.'
  }
];

export const mockContentSuggestions: ContentItem[] = [
  {
    id: 'c_1',
    title: 'How to Build a 10-Item Sustainable Capsule Wardrobe',
    reason: 'Your target audience is looking for advice on how to simplify their closets with ethical pieces.',
    type: 'blog',
    status: 'recommended'
  },
  {
    id: 'c_2',
    title: 'Behind the Scenes: How our Brass Jewelry is Handcrafted',
    reason: 'Authenticity content boosts engagement on Instagram by over 45% compared to product shots.',
    type: 'social',
    status: 'ready_for_review'
  },
  {
    id: 'c_3',
    title: '5 Tips for Caring for Organic Linen (So it Lasts a Lifetime)',
    reason: 'Answers frequent search questions and builds post-purchase trust with your active customers.',
    type: 'blog',
    status: 'recommended'
  },
  {
    id: 'c_4',
    title: 'Our Autumn Green Capsule Collection is Live 🍂',
    reason: 'Announces the new product drop to your existing email subscribers.',
    type: 'newsletter',
    status: 'scheduled',
    scheduledDate: 'This Thursday, 10:00 AM'
  },
  {
    id: 'c_5',
    title: 'Why choosing sustainable apparel matters more than you think',
    reason: 'Core brand value content to build community alignment.',
    type: 'social',
    status: 'published'
  }
];

export const mockWebsiteIssues: WebsiteIssue[] = [
  {
    id: 'w_1',
    problem: 'Your homepage primary "Shop Now" button is difficult to see on mobile devices.',
    whyMatters: 'Over 72% of your visitors browse on mobile. A hidden call-to-action drops purchase rates significantly.',
    solution: 'Enlarge the button, change it to your brand purple color, and center it under the hero heading.',
    status: 'detected',
    technicalDetails: 'CSS Selector: .hero-cta-btn. Current background is light grey (#f3f4f6) on a white background. Recommended change: add class bg-brand-500 text-white px-8 py-3 rounded-lg text-lg font-medium.'
  },
  {
    id: 'w_2',
    problem: 'The homepage doesn\'t clearly state that you offer "free shipping on orders over $100".',
    whyMatters: 'Shipping costs are the #1 reason for cart abandonment. Stating this policy early reduces checkout friction.',
    solution: 'Add a clean, thin announcement bar at the very top of your site displaying the policy.',
    status: 'detected',
    technicalDetails: 'Add a banner component before <header> using tailwind: w-full bg-brand-50 text-brand-700 py-1.5 text-center text-xs font-semibold tracking-wide.'
  },
  {
    id: 'w_3',
    problem: 'Images on the jewelry catalog page take more than 4 seconds to load on mobile connections.',
    whyMatters: 'Slow load times lead to a high bounce rate. Modern shoppers leave if a page doesn\'t load in under 2 seconds.',
    solution: 'Compress images to WebP format and enable lazy loading for off-screen jewelry items.',
    status: 'resolved',
    technicalDetails: 'Optimized 18 images from raw PNGs (avg 1.8MB) to WebP format (avg 142KB). Added loading="lazy" attribute.'
  }
];

export const mockAdCampaigns: AdCampaign[] = [
  {
    id: 'ad_1',
    name: 'Sustainable Dresses - Instagram Ads',
    status: 'active',
    metrics: {
      spent: 450.00,
      clicks: 820,
      impressions: 24000,
      conversions: 18,
      ctr: 0.034, // 3.4%
      cpc: 0.55,
      cpa: 25.00,
      roas: 3.2
    }
  },
  {
    id: 'ad_2',
    name: 'Artisan Brass Jewelry - Google Search Ads',
    status: 'needs_attention',
    issue: 'Your clicks are getting more expensive, and CTR has dropped.',
    recommendation: 'The search term "brass rings" has become very competitive. Test targeting "handcrafted brass necklaces" instead to lower costs.',
    metrics: {
      spent: 280.00,
      clicks: 310,
      impressions: 12000,
      conversions: 7,
      ctr: 0.025, // 2.5%
      cpc: 0.90,
      cpa: 40.00,
      roas: 1.8
    }
  },
  {
    id: 'ad_3',
    name: 'Cart Abandonment Retargeting - Meta Network',
    status: 'active',
    metrics: {
      spent: 150.00,
      clicks: 420,
      impressions: 8000,
      conversions: 22,
      ctr: 0.0525, // 5.25%
      cpc: 0.35,
      cpa: 6.81,
      roas: 6.5
    }
  }
];

export const mockGrowthData = {
  summary: {
    visitors: { value: 12450, change: 18 },
    leads: { value: 684, change: 12 },
    customers: { value: 142, change: 24 },
    revenue: { value: 11840, change: 29 }
  },
  details: {
    whatImproved: [
      'Google organic traffic increased 24% following the optimization of the jewelry metadata.',
      'Mobile sales rose 15% after improving the checkout form layout.',
      'Instagram referral traffic grew 35% because of the handcrafted reels launch.'
    ],
    needsAttention: [
      'Google Search Ad competition has raised cost-per-click (CPC) by 18% for primary jewelry keywords.',
      'The email sign-up rate has slowed down from 3.2% to 2.8% over the past two weeks.'
    ],
    nextSteps: [
      'Increase ad budget slightly on high-performing Meta retargeting campaigns.',
      'Create a welcome newsletter discount to improve email subscription conversions.'
    ]
  }
};
