import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Clock, 
  Tag, 
  User, 
  Share2, 
  X, 
  Check, 
  TrendingUp,
  Zap,
  ArrowUpRight,
  Bookmark
} from 'lucide-react';
import LandingNavbar from '../components/landing/LandingNavbar';
import LandingFooter from '../components/landing/LandingFooter';
import SmoothScroll from '../components/landing/SmoothScroll';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  image: string;
  excerpt: string;
  content: string;
  featured?: boolean;
  tags: string[];
}

const BLOG_ARTICLES: BlogPost[] = [
  {
    id: 'post-1',
    title: 'How Small Businesses Can Use AI for Autonomous Customer Support',
    category: 'AI & Automation',
    categoryColor: '#118AB2',
    readTime: '6 min read',
    date: 'Sep 10, 2026',
    author: 'Alex Rivera',
    authorRole: 'Head of Growth',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=60',
    featured: true,
    tags: ['AI Agents', 'Automation', 'Customer Support', 'SEO'],
    excerpt: 'Discover how modern AI agents and LLM chatbots streamline 24/7 client inquiries, cut response times by 80%, and boost overall customer conversion rates.',
    content: `### Why Autonomous AI Support is Essential
Small businesses often struggle with maintaining 24/7 customer support while keeping operational costs manageable. With the emergence of specialized AI agents, smaller teams can now deliver enterprise-level responsiveness.

#### Key Advantages:
- **Zero Latency**: Customers receive verified, context-aware answers within 2 seconds.
- **Omnichannel Coverage**: Seamless support across WhatsApp, Email campaigns, and live website chat.
- **Continuous Learning**: AI models dynamically adapt based on resolution feedback and customer intent data.

#### Step-by-Step Implementation:
1. **Curate Your Brand Knowledge Base**: Consolidate product FAQs, pricing matrices, and return policies.
2. **Set Human Escalation Guardrails**: Enable the bot to cleanly hand off sensitive edge cases to human specialists.
3. **Analyze Weekly Query Volumes**: Iterate content pillars based on recurring client questions.`
  },
  {
    id: 'post-2',
    title: 'Designing High-Converting E-commerce Marketing Funnels in 2026',
    category: 'E-Commerce & Ads',
    categoryColor: '#7CD5C7',
    readTime: '8 min read',
    date: 'Sep 08, 2026',
    author: 'Priya Sharma',
    authorRole: 'E-commerce Specialist',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop&q=60',
    tags: ['E-commerce', 'Meta Ads', 'Conversion Rate', 'Funnels'],
    excerpt: 'Locate shopping navigation leaks, track checkout abandonment, and optimize full-funnel conversion metrics automatically.',
    content: `### Transforming Browsers into Repeat Buyers
E-commerce conversion rates hover around 2.5% globally. By building multi-stage personalized ad funnels, modern D2C brands are unlocking 2-3x higher ROAS.

#### Strategic Pillars:
1. **Top-of-Funnel Meta Ads**: Video storytelling targeting high-intent lookalike audiences.
2. **Mid-Funnel Retargeting**: Dynamic product ads tailored to abandoned cart items.
3. **Post-Purchase WhatsApp Retention**: Automated follow-up reviews and loyalty incentives.`
  },
  {
    id: 'post-3',
    title: 'The Growth Power of AI Marketing Co-Pilots',
    category: 'SEO & Strategy',
    categoryColor: '#464B71',
    readTime: '5 min read',
    date: 'Sep 05, 2026',
    author: 'Vikram Malhotra',
    authorRole: 'AI Strategist',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    tags: ['Co-Pilot', 'SEO', 'Strategy', 'Analytics'],
    excerpt: 'Merging website audit intelligence, automated copy drafting, and autonomous budget allocations into one unified system.',
    content: `### From Fragmented Tools to Unified Co-Pilots
Marketing teams waste up to 40% of their time jumping between ad managers, analytics dashboards, and email tools. An AI Co-pilot aggregates live performance signals to deliver actionable growth steps every morning.

#### Key Capabilities:
- Automated ranking audits on high-value organic search terms.
- Cross-platform ad spend rebalancing based on real-time CPA benchmarks.
- Automated email trigger sequences reacting to user behaviour.`
  },
  {
    id: 'post-4',
    title: '10 High-Converting Email Sequences for B2B Product Launches',
    category: 'Content & Social',
    categoryColor: '#118AB2',
    readTime: '7 min read',
    date: 'Sep 02, 2026',
    author: 'Sarah Jenkins',
    authorRole: 'Content Director',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=60',
    tags: ['Email Marketing', 'B2B', 'Lead Gen', 'Sequencing'],
    excerpt: 'A comprehensive breakdown of pre-launch teasers and post-launch activation sequences that achieved a 42% verified open rate.',
    content: `### Engineering the Perfect Product Announcement
Email remains the highest ROI channel for B2B software and service rollouts. Here is the exact 5-part email framework:

1. **The Teaser (14 Days Prior)**: Build curiosity without revealing the full product details.
2. **VIP Early Access (7 Days Prior)**: Reward high-value customers with beta invites.
3. **Launch Day Spotlight**: Clear value proposition, social proof, and a single high-impact CTA.`
  },
  {
    id: 'post-5',
    title: 'Examine Database Lead Scores & Prospect Intent Correctly',
    category: 'AI & Automation',
    categoryColor: '#7CD5C7',
    readTime: '5 min read',
    date: 'Aug 29, 2026',
    author: 'Alex Rivera',
    authorRole: 'Head of Growth',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
    tags: ['Lead Scoring', 'CRM', 'Prospecting', 'Data'],
    excerpt: 'Learn to define hot versus warm lead score thresholds and trigger targeted multi-touch email and WhatsApp outreach.',
    content: `### Prioritizing High-Intent Buyers
Not all leads are created equal. Lead scoring models rank prospects based on page visit frequency, email click behavior, and company firmographics.

#### Optimization Tactics:
- Assign weighted scores for high-intent pages (Pricing, Demo request, Case studies).
- Auto-sync hot leads directly with your sales reps via instant notifications.
- Nurture colder leads with educational blog roundups.`
  },
  {
    id: 'post-6',
    title: 'LinkedIn Algorithm Secrets: How to 10x Inbound Founder DMs',
    category: 'Content & Social',
    categoryColor: '#464B71',
    readTime: '6 min read',
    date: 'Aug 25, 2026',
    author: 'Sarah Jenkins',
    authorRole: 'Content Director',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    image: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?w=800&auto=format&fit=crop&q=60',
    tags: ['LinkedIn', 'Personal Brand', 'Inbound', 'Founder-led'],
    excerpt: 'A tactical blueprint for crafting engaging thought leadership posts that spark industry conversation and drive inbound pipeline.',
    content: `### Founder-Led Growth Playbook
Founder content consistently outperforms company page posts by 8x on LinkedIn. 

#### Rules for High Reach:
1. **Strong Hooks**: Capture attention within the first 2 lines.
2. **Data & Contrarian Take**: Share real experiment numbers and unique industry perspectives.
3. **Engage in the First Hour**: Respond to all comments within 60 minutes of publishing.`
  }
];

const CATEGORIES = [
  'All Articles',
  'AI & Automation',
  'SEO & Strategy',
  'E-Commerce & Ads',
  'Content & Social'
];

export const BlogsPublic: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Articles');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredArticles = BLOG_ARTICLES.filter((article) => {
    const matchesCategory =
      selectedCategory === 'All Articles' || article.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = BLOG_ARTICLES.find((a) => a.featured) || BLOG_ARTICLES[0];

  const handleCopyLink = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.href);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FFFDFC] text-[#1E2538] selection:bg-[#118AB2] selection:text-white antialiased overflow-x-hidden relative">
      <SmoothScroll />

      {/* Navigation */}
      <LandingNavbar />

      {/* ========================================================
          PUBLIC BLOGS & EDITORIAL CONTENT SECTION
          ======================================================== */}
      <section className="pt-[115px] sm:pt-[130px] pb-16 sm:pb-24 bg-[#FFFDFC] relative z-10 text-left">
        <div className="max-w-[1440px] w-[calc(100%-48px)] sm:w-[calc(100%-80px)] mx-auto space-y-12">
          
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5ECEC] border border-[#7CD5C7]/40 text-[#464B71] text-[11px] font-bold uppercase tracking-wider shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#118AB2]" />
                <span>GROWWISE EDITORIAL & KNOWLEDGE BASE</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#1E2538] tracking-tight leading-[1.12]">
                Insights, Guides &{' '}
                <span className="text-[#118AB2]">AI Marketing Playbooks</span>
              </h2>
              
              <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
                Proven strategies, algorithm breakdowns, and step-by-step guides to help you build an unstoppable online presence.
              </p>
            </div>

            {/* Live Search Bar */}
            <div className="w-full lg:w-[360px] relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, tags, guides..."
                className="w-full bg-[#F2F2ED]/70 border border-slate-200 focus:border-[#118AB2] focus:bg-white rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm font-semibold text-[#1E2538] outline-none transition-all placeholder-slate-400 shadow-xs"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#118AB2] text-white shadow-md shadow-[#118AB2]/20 scale-[1.02]'
                    : 'bg-white border border-slate-200 text-[#464B71] hover:border-[#118AB2] hover:text-[#118AB2] shadow-xs'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Hero Article Banner */}
          {selectedCategory === 'All Articles' && searchQuery === '' && featuredArticle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              onClick={() => setActiveArticle(featuredArticle)}
              className="bg-gradient-to-br from-[#1E2538] to-[#2B354F] rounded-3xl p-6 sm:p-10 text-white shadow-xl cursor-pointer group relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Background ambient light */}
              <div className="absolute -right-16 -top-16 w-80 h-80 bg-[#118AB2]/20 rounded-full filter blur-3xl pointer-events-none" />
              <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-[#7CD5C7]/15 rounded-full filter blur-3xl pointer-events-none" />

              {/* Left Column Text */}
              <div className="lg:col-span-7 space-y-4 relative z-10">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-[#118AB2] text-white text-[10px] font-black uppercase tracking-wider">
                    FEATURED PLAYBOOK
                  </span>
                  <span className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredArticle.readTime}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white group-hover:text-[#7CD5C7] transition-colors leading-tight">
                  {featuredArticle.title}
                </h3>

                <p className="text-sm text-slate-300 font-medium leading-relaxed max-w-xl">
                  {featuredArticle.excerpt}
                </p>

                {/* Author Info */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <img 
                      src={featuredArticle.authorAvatar} 
                      alt={featuredArticle.author} 
                      className="w-10 h-10 rounded-full border-2 border-[#118AB2] object-cover"
                    />
                    <div>
                      <span className="block text-xs font-bold text-white">{featuredArticle.author}</span>
                      <span className="block text-[11px] text-slate-400 font-medium">{featuredArticle.authorRole} • {featuredArticle.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-[#7CD5C7] group-hover:translate-x-1 transition-transform">
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Right Column Image */}
              <div className="lg:col-span-5 relative z-10">
                <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[16/10] bg-slate-800">
                  <img 
                    src={featuredArticle.image} 
                    alt={featuredArticle.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Grid of Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, idx) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => setActiveArticle(article)}
                className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1"
              >
                <div>
                  {/* Card Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1E2538] text-[10px] font-black uppercase tracking-wider shadow-xs">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime}
                      </span>
                      <span>{article.date}</span>
                    </div>

                    <h3 className="text-lg font-bold text-[#1E2538] group-hover:text-[#118AB2] transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6 pt-2 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={article.authorAvatar} 
                      alt={article.author} 
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="text-xs font-bold text-slate-700">{article.author}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#118AB2] group-hover:underline">
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8 space-y-4">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-700">No articles found</h3>
              <p className="text-xs text-slate-500">Try adjusting your search query or choosing a different category.</p>
              <button 
                onClick={() => { setSelectedCategory('All Articles'); setSearchQuery(''); }}
                className="px-5 py-2 bg-[#118AB2] text-white text-xs font-bold rounded-full"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Newsletter Subscription Banner */}
          <div className="mt-16 bg-gradient-to-r from-[#118AB2]/10 via-[#7CD5C7]/15 to-[#118AB2]/10 border border-[#7CD5C7]/30 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#118AB2] uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5" />
                <span>WEEKLY AI GROWTH DIGEST</span>
              </div>
              <h3 className="text-2xl font-black text-[#1E2538]">Get latest marketing playbooks in your inbox</h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg">
                Join 10,000+ marketers and founders receiving our curated breakdown of what algorithms and tactics are working right now.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
              <input 
                type="email" 
                placeholder="Enter your work email"
                className="px-5 py-3 rounded-full bg-white border border-slate-200 text-xs sm:text-sm text-[#1E2538] font-semibold outline-none focus:border-[#118AB2] min-w-[260px] shadow-xs"
              />
              <button className="px-6 py-3 bg-[#118AB2] hover:bg-[#0e7597] text-white font-bold text-xs sm:text-sm rounded-full transition-all shadow-md shrink-0 cursor-pointer">
                Subscribe Free
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          ARTICLE READER MODAL
          ======================================================== */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArticle(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-y-auto z-10 flex flex-col text-left"
            >
              {/* Modal Top Header Image */}
              <div className="relative h-64 sm:h-72 w-full bg-slate-900 shrink-0">
                <img 
                  src={activeArticle.image} 
                  alt={activeArticle.title} 
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => setActiveArticle(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#1E2538] flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-105"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#118AB2] text-white text-[11px] font-black uppercase tracking-wider shadow-sm">
                    {activeArticle.category}
                  </span>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-10 space-y-6">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={activeArticle.authorAvatar} 
                      alt={activeArticle.author} 
                      className="w-9 h-9 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <span className="block text-xs font-black text-[#1E2538]">{activeArticle.author}</span>
                      <span className="block text-[11px] text-slate-400">{activeArticle.authorRole} • {activeArticle.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => handleCopyLink(activeArticle.id, e)}
                      className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                    >
                      {copiedId === activeArticle.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                      <span>{copiedId === activeArticle.id ? 'Copied!' : 'Share'}</span>
                    </button>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-[#1E2538] leading-tight">
                  {activeArticle.title}
                </h1>

                <p className="text-sm font-semibold text-slate-600 leading-relaxed bg-[#F2F2ED]/60 p-4 rounded-2xl border border-slate-100">
                  {activeArticle.excerpt}
                </p>

                {/* Main Markdown / Text Content */}
                <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed space-y-4 text-slate-700 whitespace-pre-line">
                  {activeArticle.content}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-100">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  {activeArticle.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-[#F2F2ED] text-[#464B71] text-[11px] font-bold">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Modal CTA */}
                <div className="bg-[#118AB2]/10 border border-[#118AB2]/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-black text-[#1E2538]">Ready to automate your marketing?</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Let GrowWise AI create and manage your campaigns 24/7.</p>
                  </div>
                  <a
                    href="/signup"
                    className="px-6 py-2.5 bg-[#118AB2] text-white text-xs font-black rounded-full uppercase tracking-wider shrink-0 hover:bg-[#0e7597] shadow-sm"
                  >
                    Start Free Trial
                  </a>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
};

export default BlogsPublic;
