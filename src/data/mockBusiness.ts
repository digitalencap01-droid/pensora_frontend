import { Business } from '../types';

export const mockBusinessPresets: Record<string, Business> = {
  'acmedigital.com': {
    name: 'Acme Digital',
    website: 'https://acmedigital.com',
    description: 'A boutique creative digital agency helping local small businesses grow their online presence through modern design and branding.',
    services: [
      'Custom Website Design',
      'Local SEO Optimization',
      'Social Media Branding',
      'Google Profile Setup'
    ],
    location: 'Austin, Texas',
    socials: {
      instagram: 'instagram.com/acmedigital',
      facebook: 'facebook.com/acmedigital'
    },
    targetAudience: 'Local small businesses, medical practices, law firms, and home services looking for custom digital design.',
    competitors: ['Austin Creative Designs', 'Capital Web Solutions', 'Boutique SEO Agency'],
    toneOfVoice: 'professional',
    monthlyBudget: '$500 - $2,000',
    consentGranted: true
  },
  'greenhousecoffee.com': {
    name: 'Greenhouse Coffee & Roasters',
    website: 'https://greenhousecoffee.com',
    description: 'An eco-friendly, specialty coffee roastery and community café offering organic, fair-trade single-origin coffees and homemade pastries.',
    services: [
      'Specialty Coffee Beans',
      'Subscription Coffee Box',
      'Community Workshops',
      'Café Event Catering'
    ],
    location: 'Portland, Oregon',
    socials: {
      instagram: 'instagram.com/greenhousecoffee',
      twitter: 'twitter.com/greenhousecafe'
    },
    targetAudience: 'Specialty coffee enthusiasts, organic food consumers, eco-conscious buyers, and Portland cafe locals.',
    competitors: ['Blue Bottle Coffee', 'Stumptown Coffee Roasters', 'Coava Roasters'],
    toneOfVoice: 'friendly',
    monthlyBudget: '$0 - $500',
    consentGranted: true
  },
  'bloomboutique.shop': {
    name: 'Bloom Boutique',
    website: 'https://bloomboutique.shop',
    description: 'An online boutique curated with sustainable, ethically sourced women\'s clothing, jewelry, and lifestyle accessories for the modern minimalist.',
    services: [
      'Sustainable Linen Dresses',
      'Handmade Brass Jewelry',
      'Curated Capsule Wardrobes',
      'Organic Skincare Items'
    ],
    location: 'San Francisco, California (E-commerce)',
    socials: {
      instagram: 'instagram.com/bloomboutique',
      facebook: 'facebook.com/bloomboutique.shop'
    },
    targetAudience: 'Eco-conscious shoppers, sustainable apparel followers, and minimalist women interested in capsule styling.',
    competitors: ['Everlane', 'Reformation', 'Organic Basics', 'Cuyana'],
    toneOfVoice: 'luxurious',
    monthlyBudget: '$2,000+',
    consentGranted: true
  }
};

export const defaultBusiness: Business = {
  name: 'My Business',
  website: '',
  description: 'A local business seeking growth through digital channels.',
  services: ['Product Sales', 'Customer Support', 'Local Deliveries'],
  location: 'United States',
  socials: {},
  targetAudience: 'General consumers interested in our products and local services.',
  competitors: ['Local competitor A', 'Local competitor B'],
  toneOfVoice: 'friendly',
  monthlyBudget: '$0 - $500',
  consentGranted: false
};
