import { Recommendation } from '../types';

export const mockRecommendations: Recommendation[] = [
  {
    id: 'rec_1',
    title: 'Get more organic traffic from Google searches',
    impact: 'High',
    why: 'Competitor stores are ranking on page 1 for keywords like "sustainable accessories" and "minimal linen capsule", driving thousands of organic buyers.',
    action: 'Create a care guide blog post, optimize dress keywords, and set up metadata.',
    applied: false
  },
  {
    id: 'rec_2',
    title: 'Increase website visitor conversions',
    impact: 'High',
    why: 'Your site gets hundreds of visitors a week, but many drop off at the cart page due to unstated shipping costs and hard-to-find buttons.',
    action: 'Implement a free-shipping banner and style the primary call-to-action button for mobile visibility.',
    applied: false
  },
  {
    id: 'rec_3',
    title: 'Launch search retargeting campaigns',
    impact: 'Medium',
    why: 'Visitors who leave your shop without buying are highly likely to convert when reminded of your sustainability values on social media.',
    action: 'Configure a Meta retargeting pixel and launch an ad campaign for cart-abandoners.',
    applied: false
  },
  {
    id: 'rec_4',
    title: 'Build consistent customer content schedule',
    impact: 'Medium',
    why: 'Active customers are searching for sustainability clothing ideas. Writing on these topics builds loyalty and email list signups.',
    action: 'Establish a weekly social media and blog content calendar.',
    applied: false
  }
];
