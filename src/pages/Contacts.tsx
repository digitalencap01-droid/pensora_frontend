import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Search, 
  Plus, 
  Download, 
  Upload, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  X, 
  Check, 
  Trash2, 
  Archive, 
  UserPlus, 
  Sparkles, 
  Phone, 
  Mail, 
  Briefcase, 
  MapPin, 
  ShieldAlert, 
  HeartHandshake,
  Target,
  MessageSquare,
  Globe,
  Send,
  Filter,
  Layers,
  SlidersHorizontal,
  Flame,
  CheckCircle2,
  Bookmark,
  RotateCcw,
  BarChart2,
  Flag,
  LayoutList,
  LayoutGrid,
  MoreVertical,
  Star
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Contact } from '../types';
import { backendApi } from '../services/backendApi';

const API_BASE = backendApi.getBaseUrl();

// ==========================================
// BRAND ICONS (Official user-uploaded assets & crisp SVGs)
// ==========================================
export const LinkedInBrandIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <img src="/brand-icons/linkedin.png" alt="LinkedIn" className={`${className} object-contain rounded-[2px] shrink-0`} />
);

export const WhatsAppBrandIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <img src="/brand-icons/whatsapp.png" alt="WhatsApp" className={`${className} object-contain shrink-0`} />
);

export const InstagramBrandIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <img src="/brand-icons/instagram.png" alt="Instagram" className={`${className} object-contain shrink-0`} />
);

export const FacebookBrandIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <img src="/brand-icons/facebook.png" alt="Facebook" className={`${className} object-contain shrink-0`} />
);

export const EmailBrandIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#EA4335" />
    <path d="M5 7.5L12 13L19 7.5M5 7.5H19V17.5H5V7.5Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const StoreBrandIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#9333EA" />
    <path d="M6 9V18C6 18.55 6.45 19 7 19H17C17.55 19 18 18.55 18 18V9M4 9L6 5H18L20 9M4 9H20" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="14" r="1.5" fill="white" />
  </svg>
);

export const FlameBrandIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 2C10.5 4.5 10 7.5 10.5 9.5C9.5 8 9 6.5 9 5C6 7.5 5 11 5 14C5 17.9 8.1 21 12 21C15.9 21 19 17.9 19 14C19 9.5 15.5 5.5 12 2ZM12 18.5C10.1 18.5 8.5 16.9 8.5 15C8.5 13.5 9.5 11.5 12 9.5C14.5 11.5 15.5 13.5 15.5 15C15.5 16.9 13.9 18.5 12 18.5Z" fill="#E25C37" />
  </svg>
);

export const VipStarBrandIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1" strokeLinejoin="round" />
  </svg>
);

export const ChannelGridIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="7" height="7" rx="1.5" fill="#3B82F6" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" fill="#10B981" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" fill="#F59E0B" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" fill="#8B5CF6" />
  </svg>
);

export const MetaBrandIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <img src="/brand-icons/facebook.png" alt="Meta" className={`${className} object-contain shrink-0`} />
);

export const getSegmentIcon = (seg: { id: string; sourceFilter?: string; priorityFilter?: string }) => {
  if (seg.id === 'hot_leads') return <FlameBrandIcon className="w-3.5 h-3.5" />;
  if (seg.id === 'linkedin_decision_makers' || seg.sourceFilter === 'LinkedIn') return <LinkedInBrandIcon className="w-3.5 h-3.5" />;
  if (seg.id === 'whatsapp_leads' || seg.sourceFilter === 'WhatsApp Chat') return <WhatsAppBrandIcon className="w-3.5 h-3.5" />;
  if (seg.id === 'email_optins' || seg.sourceFilter === 'Email Campaign') return <EmailBrandIcon className="w-3.5 h-3.5" />;
  if (seg.id === 'cart_abandoners' || seg.sourceFilter === 'Website Form') return <StoreBrandIcon className="w-3.5 h-3.5" />;
  if (seg.sourceFilter === 'Instagram') return <InstagramBrandIcon className="w-3.5 h-3.5" />;
  if (seg.sourceFilter === 'Meta Ads' || seg.sourceFilter === 'Facebook') return <FacebookBrandIcon className="w-3.5 h-3.5" />;
  if (seg.id === 'high_prio_vip' || seg.priorityFilter === 'high') return <VipStarBrandIcon className="w-3.5 h-3.5" />;
  return <Users className="w-3.5 h-3.5 text-[#6B7280]" />;
};

export interface CustomSegment {
  id: string;
  name: string;
  description?: string;
  sourceFilter: string;
  minScore: number;
  stageFilter: string;
  priorityFilter: string;
  tagFilter?: string;
  consentOnly: boolean;
  isBuiltIn?: boolean;
}

const BUILT_IN_SEGMENTS: CustomSegment[] = [
  { id: 'all', name: 'All Leads', description: 'Complete database of all leads and customers', sourceFilter: 'all', minScore: 0, stageFilter: 'all', priorityFilter: 'all', consentOnly: false, isBuiltIn: true },
  { id: 'hot_leads', name: 'Hot Leads', description: 'High-intent leads (Score 80+) ready for sales outreach', sourceFilter: 'all', minScore: 80, stageFilter: 'all', priorityFilter: 'all', consentOnly: false, isBuiltIn: true },
  { id: 'linkedin_decision_makers', name: 'LinkedIn', description: 'B2B Leads sourced from LinkedIn outreach', sourceFilter: 'LinkedIn', minScore: 0, stageFilter: 'all', priorityFilter: 'all', consentOnly: false, isBuiltIn: true },
  { id: 'whatsapp_leads', name: 'WhatsApp', description: 'WhatsApp chats and customer inquiries', sourceFilter: 'WhatsApp Chat', minScore: 0, stageFilter: 'all', priorityFilter: 'all', consentOnly: false, isBuiltIn: true },
  { id: 'email_optins', name: 'Email List', description: 'Active email newsletter and campaign subscribers', sourceFilter: 'Email Campaign', minScore: 0, stageFilter: 'all', priorityFilter: 'all', consentOnly: false, isBuiltIn: true },
  { id: 'cart_abandoners', name: 'Store & D2C', description: 'Store visitors and prospective buyers from website', sourceFilter: 'Website Form', minScore: 0, stageFilter: 'all', priorityFilter: 'all', consentOnly: false, isBuiltIn: true },
  { id: 'high_prio_vip', name: 'VIPs', description: 'High value priority accounts requiring dedicated attention', sourceFilter: 'all', minScore: 0, stageFilter: 'all', priorityFilter: 'high', consentOnly: false, isBuiltIn: true }
];

const CHANNELS = [
  { id: 'all', label: 'All Channels', icon: Users, badgeColor: 'bg-[#FAF5F0] text-[#4B1D6B] border-[#F3DEC8]' },
  { id: 'LinkedIn', label: 'LinkedIn B2B', icon: Briefcase, badgeColor: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'Email Campaign', label: 'Email Leads', icon: Mail, badgeColor: 'bg-[#FFF1EB] text-[#D94A2A] border-[#FAD8C7]' },
  { id: 'WhatsApp Chat', label: 'WhatsApp Chats', icon: MessageSquare, badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'Meta Ads', label: 'Meta & Paid Ads', icon: Target, badgeColor: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'Website Form', label: 'Website & Store', icon: Globe, badgeColor: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'CSV Import', label: 'CSV Imports', icon: Upload, badgeColor: 'bg-slate-50 text-slate-700 border-slate-200' }
];

// Helper to generate seed data
const generateSeedContacts = (): Contact[] => {
  const sources = ['LinkedIn', 'Email Campaign', 'WhatsApp Chat', 'Meta Ads', 'Website Form', 'CSV Import', 'Direct Referral'];
  const stages: Contact['lifecycleStage'][] = ['lead', 'mql', 'sql', 'customer'];
  const statuses: Contact['leadStatus'][] = ['new', 'contacted', 'qualified', 'lost'];
  const priorities: Contact['priority'][] = ['high', 'medium', 'low'];
  const segments = ['B2B Tech Founders', 'D2C Shoppers', 'Premium Wholesale', 'Newsletter Opt-in', 'VIP Enterprise'];
  const owners = ['AI Agent', 'Growth Team', 'Sales Bot', 'Self'];
  const cities = ['New Delhi', 'Mumbai', 'Bangalore', 'San Francisco', 'New York', 'London', 'Dubai'];
  
  const IndianNames = [
    'Aarav Sharma', 'Priya Patel', 'Amit Verma', 'Sunita Rao', 'Rohan Gupta', 
    'Anjali Singh', 'Vikram Mehta', 'Divya Nair', 'Sanjay Joshi', 'Neha Reddy',
    'Arjun Kapoor', 'Kiran Bhat', 'Rahul Saxena', 'Pooja Trivedi', 'Aditya Sen',
    'Sneha Deshmukh', 'Vijay Malhotra', 'Shruti Choudhury', 'Rajesh Kulkarni', 'Meera Iyer',
    'Abhishek Prasad', 'Deepika Goyal', 'Harish Mishra', 'Kavita Joshi', 'Manish Pandey'
  ];

  const GlobalNames = [
    'John Doe', 'Jane Smith', 'Sarah Jenkins', 'Michael Chang', 'Emily Watson', 
    'David Miller', 'Jessica Taylor', 'Robert Brown', 'Lisa Anderson', 'James Wilson',
    'Emma Martinez', 'Daniel Thomas', 'Olivia Garcia', 'William Jackson', 'Sophia White',
    'Lucas Harris', 'Mia Martin', 'Alexander Clark', 'Charlotte Rodriguez', 'Henry Lewis'
  ];

  const b2bRoles = ['Founder & CEO', 'VP of Marketing', 'Head of Growth', 'Procurement Director', 'E-commerce Lead', 'Operations Head', 'Managing Partner'];
  const b2bCompanies = ['CloudScale Systems', 'FinPulse Tech', 'Apex Retail Group', 'Zenith Logistics', 'Bloom Lifestyle', 'Nexus Commerce', 'OmniPay Global'];

  const seed: Contact[] = [];

  // Generate 65 realistic contacts
  for (let i = 1; i <= 65; i++) {
    const isIndian = i % 2 === 0;
    const nameList = isIndian ? IndianNames : GlobalNames;
    const rawName = nameList[i % nameList.length];
    const name = `${rawName} ${isIndian ? `(${i})` : `[${i}]`}`;
    const cleanEmailName = rawName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const email = `${cleanEmailName}.${i}@example.com`;
    
    const phone = isIndian 
      ? `+91 98765 ${String(10000 + i).substring(1)}` 
      : `+1 555-01${String(100 + i).substring(1)}`;
      
    const source = sources[i % sources.length];
    const isLinkedIn = source === 'LinkedIn';
    const company = isLinkedIn ? b2bCompanies[i % b2bCompanies.length] : (i % 3 === 0 ? 'Bloom Boutique' : i % 5 === 0 ? 'Greenhouse Coffee' : `Store Customer`);
    const jobTitle = isLinkedIn ? b2bRoles[i % b2bRoles.length] : (i % 4 === 0 ? 'Marketing Director' : i % 7 === 0 ? 'Founder' : 'Retail Shopper');
    const location = cities[i % cities.length];
    const lifecycleStage = stages[i % stages.length];
    const leadStatus = statuses[i % statuses.length];
    const leadScore = isLinkedIn ? Math.min(98, Math.max(55, Math.round(50 + (i * 2.1) % 48))) : Math.min(100, Math.max(15, Math.round(15 + (i * 1.35) % 85)));
    const priority = leadScore >= 75 ? 'high' : priorities[i % priorities.length];
    const segment = isLinkedIn ? 'B2B Tech Founders' : segments[i % segments.length];
    
    const tags = [isLinkedIn ? 'linkedin-prospect' : 'd2c', location.toLowerCase().replace(/\s+/g, '-')];
    if (leadScore >= 80) tags.push('hot-lead');
    if (lifecycleStage === 'customer') tags.push('converted');
    if (source === 'Email Campaign') tags.push('newsletter');
    if (source === 'WhatsApp Chat') tags.push('whatsapp-optin');
    
    const owner = owners[i % owners.length];
    const consent = i % 6 !== 0; // ~85% consent rate
    const dateOffsetDays = i * 2;
    const createdAt = new Date(Date.now() - dateOffsetDays * 24 * 60 * 60 * 1000).toISOString();

    seed.push({
      id: `c_${i}`,
      name,
      email,
      phone,
      company,
      jobTitle,
      location,
      source,
      lifecycleStage,
      leadStatus,
      leadScore,
      priority,
      segment,
      tags,
      owner,
      consent,
      createdAt
    });
  }

  return seed;
};

const getApiBase = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  return backendApi.getBaseUrl();
};

export const Contacts: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Core contact list state
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchLeads = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${getApiBase()}/api/v1/leads?page_size=250`);
      if (res.ok) {
        const data = await res.json();
        if (data.items) {
          const mapped: Contact[] = data.items.map((item: any) => {
            const custom = item.custom_fields_json || item.custom_fields || {};
            const tagList = Array.isArray(item.tags) && item.tags.length > 0 
              ? item.tags 
              : (custom.Tags ? custom.Tags.split(',').map((t: string) => t.trim()) : []);

            return {
              id: item.id,
              name: item.full_name || `${item.first_name || ''} ${item.last_name || ''}`.trim() || item.first_name || item.last_name || (item.email ? item.email.split('@')[0] : 'Unnamed Lead'),
              email: item.email || '',
              phone: item.phone || '',
              company: item.company_name || 'Direct Lead',
              jobTitle: item.job_title || 'Lead',
              location: custom.Location || 'India',
              source: item.source || 'CSV Import',
              lifecycleStage: 'lead',
              leadStatus: item.status || 'new',
              leadScore: item.lead_score || 50,
              priority: custom.Priority ? custom.Priority.toLowerCase() : (item.lead_score >= 80 ? 'high' : item.lead_score >= 50 ? 'medium' : 'low'),
              tags: tagList,
              consent: custom.Consent ? custom.Consent === 'yes' : (item.is_subscribed_email ?? true),
              createdAt: item.created_at ? new Date(item.created_at).toLocaleDateString() : new Date().toLocaleDateString(),
            };
          });
          setContacts(mapped);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend leads API connection error:', err);
    } finally {
      setIsLoading(false);
    }
    setContacts([]);
  }, []);

  React.useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);
  
  // Custom Segments state (Built-in + User created)
  const [segments, setSegments] = useState<CustomSegment[]>(() => {
    const saved = localStorage.getItem('growwise_custom_segments');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...BUILT_IN_SEGMENTS, ...parsed];
      } catch (e) {
        return BUILT_IN_SEGMENTS;
      }
    }
    return BUILT_IN_SEGMENTS;
  });

  // Active Segment selection
  const [activeSegmentId, setActiveSegmentId] = useState<string>('all');

  // Search, Filter, Sort, Pagination states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [selectedScoreRange, setSelectedScoreRange] = useState<string>('all');
  const [selectedConsentOnly, setSelectedConsentOnly] = useState<boolean>(false);
  
  const [sortBy, setSortBy] = useState<'score' | 'date' | 'name'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Selection states for campaign actions & bulk operations
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Modal & Drawer states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isSegmentModalOpen, setIsSegmentModalOpen] = useState(false);
  const [isMoreViewsOpen, setIsMoreViewsOpen] = useState(false);
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const [contactDetailOpen, setContactDetailOpen] = useState(false);
  const [actionNotification, setActionNotification] = useState<string | null>(null);

  // Segment Builder Form state
  const [segmentName, setSegmentName] = useState('');
  const [segmentDesc, setSegmentDesc] = useState('');
  const [segmentSource, setSegmentSource] = useState('all');
  const [segmentMinScore, setSegmentMinScore] = useState<number>(60);
  const [segmentStage, setSegmentStage] = useState('all');
  const [segmentPriority, setSegmentPriority] = useState('all');
  const [segmentTag, setSegmentTag] = useState('');
  const [segmentConsentOnly, setSegmentConsentOnly] = useState(false);

  // Form states for Add/Edit
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formJobTitle, setFormJobTitle] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formSource, setFormSource] = useState('LinkedIn');
  const [formStage, setFormStage] = useState<Contact['lifecycleStage']>('lead');
  const [formStatus, setFormStatus] = useState<Contact['leadStatus']>('new');
  const [formScore, setFormScore] = useState(65);
  const [formPriority, setFormPriority] = useState<Contact['priority']>('medium');
  const [formSegment, setFormSegment] = useState('');
  const [formTags, setFormTags] = useState('');
  const [formOwner, setFormOwner] = useState('AI Agent');
  const [formConsent, setFormConsent] = useState(true);

  // Bulk tag/segment states
  const [bulkTagInput, setBulkTagInput] = useState('');
  const [bulkSegmentInput, setBulkSegmentInput] = useState('');
  
  // CSV Import States
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploadingFile, setIsUploadingFile] = useState<boolean>(false);
  const [csvText, setCsvText] = useState('');
  const [csvParseError, setCsvParseError] = useState('');

  const handleFileSelected = async (file: File) => {
    setSelectedFile(file);
    setCsvParseError('');

    // If CSV or TXT, extract text for live preview and frontend parser fallback
    if (file.name.endsWith('.csv') || file.name.endsWith('.txt') || file.type.includes('csv') || file.type.includes('text')) {
      try {
        const text = await file.text();
        setCsvText(text);
      } catch (err) {
        console.warn('Could not read file text:', err);
      }
    } else {
      setCsvText(`[Selected File: ${file.name}]`);
    }
  };

  // ----------------------------------------------------
  // SYNC WITH URL SEARCH PARAMS (?source=LinkedIn etc.)
  // ----------------------------------------------------
  useEffect(() => {
    const sourceParam = searchParams.get('source');
    const segmentParam = searchParams.get('segment');

    if (sourceParam) {
      setSelectedSource(sourceParam);
    }
    if (segmentParam) {
      const match = segments.find(s => s.id === segmentParam || s.name.toLowerCase().includes(segmentParam.toLowerCase()));
      if (match) {
        setActiveSegmentId(match.id);
        applySegmentFilters(match);
      }
    }
  }, [searchParams, segments]);

  // Apply a segment's criteria to active filters
  const applySegmentFilters = (seg: CustomSegment) => {
    setActiveSegmentId(seg.id);
    setSelectedSource(seg.sourceFilter);
    setSelectedStage(seg.stageFilter);
    setSelectedPriority(seg.priorityFilter);
    setSelectedConsentOnly(seg.consentOnly);
    if (seg.minScore > 0) {
      setSelectedScoreRange(seg.minScore >= 80 ? 'high' : seg.minScore >= 40 ? 'medium' : 'all');
    } else {
      setSelectedScoreRange('all');
    }
    setCurrentPage(1);
  };

  // Helper to show momentary success banner
  const triggerNotification = (msg: string) => {
    setActionNotification(msg);
    setTimeout(() => {
      setActionNotification(null);
    }, 4500);
  };

  // ----------------------------------------------------
  // CRM STATS COMPUTATION
  // ----------------------------------------------------
  const stats = useMemo(() => {
    const total = contacts.length;
    const hotLeads = contacts.filter(c => c.leadScore >= 80).length;
    const linkedInLeads = contacts.filter(c => c.source === 'LinkedIn').length;
    const consented = contacts.filter(c => c.consent).length;
    const customers = contacts.filter(c => c.lifecycleStage === 'customer').length;
    return { total, hotLeads, linkedInLeads, consented, customers };
  }, [contacts]);

  // Source channel count map
  const sourceCountMap = useMemo(() => {
    const map: Record<string, number> = { all: contacts.length };
    CHANNELS.forEach(ch => {
      if (ch.id !== 'all') {
        map[ch.id] = contacts.filter(c => c.source === ch.id).length;
      }
    });
    return map;
  }, [contacts]);

  // Live matching preview count for Segment Builder modal
  const segmentPreviewCount = useMemo(() => {
    return contacts.filter(c => {
      if (segmentSource !== 'all' && c.source !== segmentSource) return false;
      if (c.leadScore < segmentMinScore) return false;
      if (segmentStage !== 'all' && c.lifecycleStage !== segmentStage) return false;
      if (segmentPriority !== 'all' && c.priority !== segmentPriority) return false;
      if (segmentConsentOnly && !c.consent) return false;
      if (segmentTag.trim()) {
        const requiredTags = segmentTag.toLowerCase().split(',').map(t => t.trim()).filter(Boolean);
        const hasTags = requiredTags.every(rt => c.tags.some(t => t.toLowerCase().includes(rt)));
        if (!hasTags) return false;
      }
      return true;
    }).length;
  }, [contacts, segmentSource, segmentMinScore, segmentStage, segmentPriority, segmentConsentOnly, segmentTag]);

  // ----------------------------------------------------
  // FILTERING, SORTING, PAGINATION LOGIC
  // ----------------------------------------------------
  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      // 1. Search Query
      const query = searchQuery.toLowerCase().trim();
      const matchSearch = !query || 
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.phone.replace(/\s+/g, '').includes(query) ||
        (contact.company && contact.company.toLowerCase().includes(query)) ||
        (contact.jobTitle && contact.jobTitle.toLowerCase().includes(query)) ||
        contact.tags.some(t => t.toLowerCase().includes(query));

      // 2. Lifecycle Stage
      const matchStage = selectedStage === 'all' || contact.lifecycleStage === selectedStage;

      // 3. Priority
      const matchPriority = selectedPriority === 'all' || contact.priority === selectedPriority;

      // 4. Source
      const matchSource = selectedSource === 'all' || contact.source === selectedSource;

      // 5. Score Range
      let matchScore = true;
      if (selectedScoreRange === 'high') matchScore = contact.leadScore >= 80;
      else if (selectedScoreRange === 'medium') matchScore = contact.leadScore >= 40 && contact.leadScore < 80;
      else if (selectedScoreRange === 'low') matchScore = contact.leadScore < 40;

      // 6. Consent Only
      const matchConsent = !selectedConsentOnly || contact.consent;

      return matchSearch && matchStage && matchPriority && matchSource && matchScore && matchConsent;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'score') {
        comparison = a.leadScore - b.leadScore;
      } else if (sortBy === 'date') {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else {
        comparison = a.name.localeCompare(b.name);
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });
  }, [contacts, searchQuery, selectedStage, selectedPriority, selectedSource, selectedScoreRange, selectedConsentOnly, sortBy, sortOrder]);

  const paginatedContacts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredContacts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredContacts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage) || 1;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedStage, selectedPriority, selectedSource, selectedScoreRange, selectedConsentOnly, itemsPerPage]);

  // Helper to calculate matching leads count for any segment tab
  const getSegmentCount = (seg: CustomSegment): number => {
    if (seg.id === 'all') return contacts.length;
    return contacts.filter(c => {
      if (seg.sourceFilter !== 'all' && c.source !== seg.sourceFilter) return false;
      if (seg.minScore > 0 && c.leadScore < seg.minScore) return false;
      if (seg.stageFilter !== 'all' && c.lifecycleStage !== seg.stageFilter) return false;
      if (seg.priorityFilter !== 'all' && c.priority !== seg.priorityFilter) return false;
      if (seg.consentOnly && !c.consent) return false;
      if (seg.tagFilter && seg.tagFilter.trim()) {
        const requiredTags = seg.tagFilter.toLowerCase().split(',').map(t => t.trim()).filter(Boolean);
        const hasTags = requiredTags.every(rt => c.tags.some(t => t.toLowerCase().includes(rt)));
        if (!hasTags) return false;
      }
      return true;
    }).length;
  };

  // Count active non-default filters for the Reset button
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (selectedSource !== 'all') count++;
    if (selectedStage !== 'all') count++;
    if (selectedPriority !== 'all') count++;
    if (selectedScoreRange !== 'all') count++;
    if (selectedConsentOnly) count++;
    return count;
  }, [searchQuery, selectedSource, selectedStage, selectedPriority, selectedScoreRange, selectedConsentOnly]);

  const handleResetAllFilters = () => {
    setSearchQuery('');
    setSelectedSource('all');
    setSelectedStage('all');
    setSelectedPriority('all');
    setSelectedScoreRange('all');
    setSelectedConsentOnly(false);
    setActiveSegmentId('all');
    setCurrentPage(1);
  };

  // ----------------------------------------------------
  // 1-CLICK CAMPAIGN LAUNCH ACTIONS
  // ----------------------------------------------------
  const handleLaunchEmailCampaign = (specificIds?: string[]) => {
    const targetCount = specificIds && specificIds.length > 0 ? specificIds.length : filteredContacts.length;
    triggerNotification(`⚡ Transferring ${targetCount} selected audience leads to Email Campaign Studio...`);
    setTimeout(() => {
      navigate('/email?tab=builder');
    }, 600);
  };

  const handleLaunchWhatsAppBroadcast = (specificIds?: string[]) => {
    const targetCount = specificIds && specificIds.length > 0 ? specificIds.length : filteredContacts.length;
    triggerNotification(`💬 Loading ${targetCount} verified contacts into WhatsApp Broadcast Studio...`);
    setTimeout(() => {
      navigate('/whatsapp?tab=broadcast');
    }, 600);
  };

  // ----------------------------------------------------
  // ACTION & SELECTION HANDLERS
  // ----------------------------------------------------
  const handleRowSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllOnPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pageIds = paginatedContacts.map(c => c.id);
    if (e.target.checked) {
      setSelectedIds(prev => Array.from(new Set([...prev, ...pageIds])));
    } else {
      setSelectedIds(prev => prev.filter(id => !pageIds.includes(id)));
    }
  };

  const isAllSelectedOnPage = useMemo(() => {
    const pageIds = paginatedContacts.map(c => c.id);
    return pageIds.length > 0 && pageIds.every(id => selectedIds.includes(id));
  }, [paginatedContacts, selectedIds]);

  // Save New Custom Segment Handler
  const handleSaveSegment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!segmentName.trim()) return;

    const newSeg: CustomSegment = {
      id: `seg_${Date.now()}`,
      name: segmentName.trim(),
      description: segmentDesc.trim() || `Custom filtered segment matching ${segmentPreviewCount} leads`,
      sourceFilter: segmentSource,
      minScore: Number(segmentMinScore),
      stageFilter: segmentStage,
      priorityFilter: segmentPriority,
      tagFilter: segmentTag.trim() || undefined,
      consentOnly: segmentConsentOnly,
      isBuiltIn: false
    };

    const updatedCustom = [...segments.filter(s => !s.isBuiltIn), newSeg];
    localStorage.setItem('growwise_custom_segments', JSON.stringify(updatedCustom));
    setSegments([...BUILT_IN_SEGMENTS, ...updatedCustom]);

    // Activate this newly created segment
    applySegmentFilters(newSeg);
    setIsSegmentModalOpen(false);
    
    // Reset form
    setSegmentName('');
    setSegmentDesc('');
    setSegmentSource('all');
    setSegmentMinScore(60);
    setSegmentStage('all');
    setSegmentPriority('all');
    setSegmentTag('');
    setSegmentConsentOnly(false);

    triggerNotification(`✅ Saved segment "${newSeg.name}" with ${segmentPreviewCount} matching leads!`);
  };

  const handleDeleteCustomSegment = (segId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this custom saved segment?')) {
      const updatedCustom = segments.filter(s => !s.isBuiltIn && s.id !== segId);
      localStorage.setItem('growwise_custom_segments', JSON.stringify(updatedCustom));
      setSegments([...BUILT_IN_SEGMENTS, ...updatedCustom]);
      if (activeSegmentId === segId) {
        applySegmentFilters(BUILT_IN_SEGMENTS[0]);
      }
    }
  };

  // Add Contact Form Submit
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) return;

    const normalizedEmail = formEmail.toLowerCase().trim();
    let formattedPhone = formPhone.trim();
    if (/^\d{10}$/.test(formattedPhone)) {
      formattedPhone = `+91 ${formattedPhone.substring(0, 5)} ${formattedPhone.substring(5)}`;
    }

    const payload = {
      full_name: formName.trim(),
      first_name: formName.trim().split(' ')[0],
      last_name: formName.trim().split(' ').slice(1).join(' ') || null,
      email: normalizedEmail,
      phone: formattedPhone || null,
      company_name: formCompany.trim() || null,
      job_title: formJobTitle.trim() || null,
      status: formStatus || "new",
      source: formSource || "manual",
      lead_score: Number(formScore) || 50,
      tags: formTags.split(',').map(t => t.trim()).filter(Boolean),
      custom_fields_json: {
        Location: formLocation.trim() || null,
        Priority: formPriority || null,
        Segment: formSegment.trim() || null,
        Consent: formConsent ? "yes" : "no"
      }
    };

    try {
      const res = await fetch(`${getApiBase()}/api/v1/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        await fetchLeads();
        setIsAddModalOpen(false);
        resetForm();
        triggerNotification(`Added contact ${formName.trim()} to database!`);
        return;
      }
    } catch (err) {
      console.error('Failed saving contact to database:', err);
    }

    // Fallback in-memory
    const newContact: Contact = {
      id: `c_${Date.now()}`,
      name: formName.trim(),
      email: normalizedEmail,
      phone: formattedPhone,
      company: formCompany.trim() || undefined,
      jobTitle: formJobTitle.trim() || undefined,
      location: formLocation.trim() || undefined,
      source: formSource,
      lifecycleStage: formStage,
      leadStatus: formStatus,
      leadScore: Number(formScore),
      priority: formPriority,
      segment: formSegment.trim() || undefined,
      tags: formTags.split(',').map(t => t.trim()).filter(Boolean),
      owner: formOwner.trim() || undefined,
      consent: formConsent,
      createdAt: new Date().toISOString()
    };
    setContacts(prev => [newContact, ...prev]);
    setIsAddModalOpen(false);
    resetForm();
    triggerNotification(`Added contact ${newContact.name}!`);
  };

  // Edit Contact Form Submit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeContact || !formName.trim() || !formEmail.trim()) return;

    const normalizedEmail = formEmail.toLowerCase().trim();
    let formattedPhone = formPhone.trim();
    if (/^\d{10}$/.test(formattedPhone)) {
      formattedPhone = `+91 ${formattedPhone.substring(0, 5)} ${formattedPhone.substring(5)}`;
    }

    const payload = {
      full_name: formName.trim(),
      first_name: formName.trim().split(' ')[0],
      last_name: formName.trim().split(' ').slice(1).join(' ') || null,
      email: normalizedEmail,
      phone: formattedPhone || null,
      company_name: formCompany.trim() || null,
      job_title: formJobTitle.trim() || null,
      status: formStatus || "new",
      source: formSource || "manual",
      lead_score: Number(formScore) || 50,
      tags: formTags.split(',').map(t => t.trim()).filter(Boolean),
      custom_fields_json: {
        Location: formLocation.trim() || null,
        Priority: formPriority || null,
        Segment: formSegment.trim() || null,
        Consent: formConsent ? "yes" : "no"
      }
    };

    try {
      const res = await fetch(`${getApiBase()}/api/v1/leads/${activeContact.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        await fetchLeads();
      }
    } catch (err) {
      console.error('Failed editing contact in DB:', err);
    }
    setIsEditModalOpen(false);
    triggerNotification(`Updated profile for ${formName.trim()}`);
  };
  const triggerEdit = (contact: Contact) => {
    setActiveContact(contact);
    setFormName(contact.name);
    setFormEmail(contact.email);
    setFormPhone(contact.phone);
    setFormCompany(contact.company || '');
    setFormJobTitle(contact.jobTitle || '');
    setFormLocation(contact.location || '');
    setFormSource(contact.source);
    setFormStage(contact.lifecycleStage);
    setFormStatus(contact.leadStatus);
    setFormScore(contact.leadScore);
    setFormPriority(contact.priority);
    setFormSegment(contact.segment || '');
    setFormTags(contact.tags.join(', '));
    setFormOwner(contact.owner || 'AI Agent');
    setFormConsent(contact.consent);
    setIsEditModalOpen(true);
  };

  const handleDeleteContact = async (id: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      try {
        const res = await fetch(`${getApiBase()}/api/v1/leads/${id}`, {
          method: 'DELETE',
        });
        if (!res.ok) {
          console.error('Failed to delete lead from server:', res.statusText);
        }
      } catch (err) {
        console.error('Error deleting lead from backend/Supabase:', err);
      }
      setContacts(prev => prev.filter(c => c.id !== id));
      setSelectedIds(prev => prev.filter(item => item !== id));
      if (activeContact?.id === id) {
        setContactDetailOpen(false);
      }
      triggerNotification('Contact deleted from CRM and Database.');
      await fetchLeads();
    }
  };

  const handleArchiveContact = (id: string) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, tags: Array.from(new Set([...c.tags, 'archived'])) } : c));
    triggerNotification('Contact marked as archived.');
    if (activeContact?.id === id) {
      setContactDetailOpen(false);
    }
  };

  // ----------------------------------------------------
  // BULK ACTION HANDLERS
  // ----------------------------------------------------
  const handleBulkAddTags = () => {
    if (!bulkTagInput.trim() || selectedIds.length === 0) return;
    const newTags = bulkTagInput.split(',').map(t => t.trim()).filter(Boolean);
    
    setContacts(prev => prev.map(c => 
      selectedIds.includes(c.id) ? { ...c, tags: Array.from(new Set([...c.tags, ...newTags])) } : c
    ));
    setBulkTagInput('');
    triggerNotification(`Added tags to ${selectedIds.length} contacts!`);
  };

  const handleBulkAddSegment = () => {
    if (!bulkSegmentInput.trim() || selectedIds.length === 0) return;
    setContacts(prev => prev.map(c => 
      selectedIds.includes(c.id) ? { ...c, segment: bulkSegmentInput.trim() } : c
    ));
    setBulkSegmentInput('');
    triggerNotification(`Assigned segment to ${selectedIds.length} contacts!`);
  };

  const handleBulkDelete = async () => {
    if (confirm(`Are you sure you want to delete the ${selectedIds.length} selected contacts?`)) {
      const idsToDelete = [...selectedIds];
      try {
        await Promise.all(
          idsToDelete.map(id =>
            fetch(`${getApiBase()}/api/v1/leads/${id}`, {
              method: 'DELETE',
            })
          )
        );
      } catch (err) {
        console.error('Error deleting selected leads from backend/Supabase:', err);
      }
      setContacts(prev => prev.filter(c => !idsToDelete.includes(c.id)));
      setSelectedIds([]);
      triggerNotification('Selected contacts deleted from CRM and Database.');
      await fetchLeads();
    }
  };

  const handleBulkArchive = () => {
    setContacts(prev => prev.map(c => 
      selectedIds.includes(c.id) ? { ...c, tags: Array.from(new Set([...c.tags, 'archived'])) } : c
    ));
    triggerNotification(`Archived ${selectedIds.length} contacts!`);
    setSelectedIds([]);
  };

  // ----------------------------------------------------
  // IMPORT & EXPORT HANDLERS
  // ----------------------------------------------------
  const handleExportCSV = () => {
    const listToExport = selectedIds.length > 0 
      ? contacts.filter(c => selectedIds.includes(c.id))
      : filteredContacts;

    const headers = [
      'Name', 'Email', 'Phone', 'Company', 'Job Title', 'Location', 'Source', 
      'Lifecycle Stage', 'Lead Status', 'Lead Score', 'Priority', 'Segment', 'Tags', 'Owner', 'Consent', 'Created At'
    ];

    const rows = listToExport.map(c => [
      `"${c.name}"`,
      `"${c.email}"`,
      `"${c.phone}"`,
      c.company ? `"${c.company}"` : '""',
      c.jobTitle ? `"${c.jobTitle}"` : '""',
      c.location ? `"${c.location}"` : '""',
      `"${c.source}"`,
      `"${c.lifecycleStage}"`,
      `"${c.leadStatus}"`,
      c.leadScore,
      `"${c.priority}"`,
      c.segment ? `"${c.segment}"` : '""',
      `"${c.tags.join(', ')}"`,
      c.owner ? `"${c.owner}"` : '""',
      c.consent ? 'YES' : 'NO',
      `"${c.createdAt}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_crm_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerNotification(`Exported ${listToExport.length} contacts to CSV.`);
  };

  const handleImportCSV = async (e: React.FormEvent) => {
    e.preventDefault();
    setCsvParseError('');
    setIsUploadingFile(true);

    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append('file', selectedFile);
      } else if (csvText.trim()) {
        formData.append('csv_text', csvText.trim());
      } else {
        setCsvParseError('Please select a file or paste CSV content.');
        setIsUploadingFile(false);
        return;
      }

      const res = await fetch(`${getApiBase()}/api/v1/leads/import/direct`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        const count = data.successful_rows ?? 0;
        triggerNotification(`Successfully imported ${count} contacts directly into Database!`);
        setIsImportModalOpen(false);
        setSelectedFile(null);
        setCsvText('');
        await fetchLeads();
      } else {
        const errData = await res.json().catch(() => ({}));
        setCsvParseError(errData.detail || 'Failed to save leads to database.');
      }
    } catch (err) {
      console.error('Import failed:', err);
      setCsvParseError('Could not connect to backend server.');
    } finally {
      setIsUploadingFile(false);
    }
  };

    const handleLoadImportTemplate = () => {
    const template = `Name,Email,Phone,Company,Job Title,Location,Source,Lifecycle Stage,Lead Score,Priority,Consent,Tags\n"Rohit Khurana","rohit@fintechscale.com","9876543210","FinTech Scale","VP Growth","Mumbai","LinkedIn","mql",88,"high","yes","linkedin-prospect;growth"\n"Pooja Mehta","pooja@zenithretail.in","9988776655","Zenith Retail","CMO","New Delhi","Email Campaign","sql",92,"high","yes","newsletter;vip"`;
    setCsvText(template);
  };

  const resetForm = () => {
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormCompany('');
    setFormJobTitle('');
    setFormLocation('');
    setFormSource('LinkedIn');
    setFormStage('lead');
    setFormStatus('new');
    setFormScore(65);
    setFormPriority('medium');
    setFormSegment('');
    setFormTags('');
    setFormOwner('AI Agent');
    setFormConsent(true);
  };

  // Color helper functions
  const getStageColor = (stage: Contact['lifecycleStage']) => {
    switch (stage) {
      case 'lead': return 'bg-[#FAF5F0] text-[#6B5E77] border-[#F3DEC8]';
      case 'mql': return 'bg-[#F5EEFB] text-[#4B1D6B] border-[#E9D5F7]';
      case 'sql': return 'bg-[#FFF1EB] text-[#D94A2A] border-[#FAD8C7]';
      case 'customer': return 'bg-[#F4FDF8] text-emerald-800 border-emerald-200';
      default: return 'bg-[#FAF5F0] text-[#6B5E77] border-[#F3DEC8]';
    }
  };

  const getPriorityColor = (prio: Contact['priority']) => {
    switch (prio) {
      case 'high': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'medium': return 'bg-[#FFF8EB] text-amber-800 border-amber-200';
      case 'low': return 'bg-[#FAF5F0] text-[#6B5E77] border-[#F3DEC8]';
    }
  };

  const getStatusColor = (status: Contact['leadStatus']) => {
    switch (status) {
      case 'new': return 'bg-[#F5EEFB] text-[#4B1D6B]';
      case 'contacted': return 'bg-[#FFF1EB] text-[#D94A2A]';
      case 'qualified': return 'bg-[#F4FDF8] text-emerald-800';
      case 'lost': return 'bg-[#FAF5F0] text-[#6B5E77]';
    }
  };

  const getSourceIcon = (src: string) => {
    switch (src) {
      case 'LinkedIn': return <Briefcase className="w-3 h-3 text-blue-600" />;
      case 'Email Campaign': return <Mail className="w-3 h-3 text-[#D94A2A]" />;
      case 'WhatsApp Chat': return <MessageSquare className="w-3 h-3 text-emerald-600" />;
      case 'Meta Ads': return <Target className="w-3 h-3 text-purple-600" />;
      case 'Website Form': return <Globe className="w-3 h-3 text-amber-600" />;
      default: return <Users className="w-3 h-3 text-[#6B5E77]" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16 text-left font-sans relative w-full max-w-full min-w-0">
      
      {/* MOMENTARY SUCCESS / ACTION BANNER */}
      {actionNotification && (
        <div className="p-3.5 bg-gradient-to-r from-[#2B0847] via-[#48115B] to-[#801B48] text-white rounded-2xl shadow-lg border border-[#E9D5F7]/30 flex items-center justify-between gap-3 animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs font-bold">{actionNotification}</span>
          </div>
          <button 
            onClick={() => setActionNotification(null)}
            className="p-1 hover:bg-white/10 rounded-lg text-white/70 hover:text-white cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 1. HEADER SECTION & PRIMARY ACTION CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1E122C] tracking-tight flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#F5EEFB] text-[#4B1D6B] flex items-center justify-center">
              <Users className="w-5 h-5 text-[#8C1F3D]" />
            </div>
            Leads &amp; Audience CRM
          </h1>
          <p className="text-xs sm:text-sm text-[#6B5E77] font-medium mt-1">
            Manage and engage your audience across all channels in one place.
          </p>
        </div>

        {/* Buttons Group on Right */}
        <div className="flex flex-col sm:items-end gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => handleLaunchEmailCampaign()}
              className="flex items-center gap-1.5 px-3.5 py-2 border border-[#FAD8C7] rounded-xl bg-white text-xs font-bold text-[#D94A2A] hover:bg-[#FFF4EE] transition-all cursor-pointer shadow-3xs"
            >
              <Mail className="w-3.5 h-3.5 text-[#D94A2A]" />
              <span>Launch Email</span>
            </button>

            <button 
              onClick={() => handleLaunchWhatsAppBroadcast()}
              className="flex items-center gap-1.5 px-3.5 py-2 border border-emerald-200 rounded-xl bg-white text-xs font-bold text-emerald-700 hover:bg-[#F4FDF8] transition-all cursor-pointer shadow-3xs"
            >
              <WhatsAppBrandIcon className="w-3.5 h-3.5 rounded-full" />
              <span>WhatsApp Broadcast</span>
            </button>

            <button 
              onClick={() => { resetForm(); setIsAddModalOpen(true); }}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#2B0847] hover:bg-[#3D1160] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md hover:-translate-y-[1px]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Lead</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsImportModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#E5E7EB] rounded-xl bg-white text-xs font-semibold text-[#1E122C] hover:bg-[#FAF5F0] transition-all cursor-pointer shadow-3xs"
            >
              <Upload className="w-3.5 h-3.5 text-[#6B5E77]" />
              <span>Import</span>
            </button>
            
            <button 
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#E5E7EB] rounded-xl bg-white text-xs font-semibold text-[#1E122C] hover:bg-[#FAF5F0] transition-all cursor-pointer shadow-3xs"
            >
              <Download className="w-3.5 h-3.5 text-[#6B5E77]" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. AUDIENCE SEGMENT PILLS (4 MAIN + MORE VIEWS DROPDOWN) */}
      {(() => {
        const primarySegments = segments.slice(0, 4);
        const moreSegments = segments.slice(4);
        const activeMoreSegment = moreSegments.find(s => s.id === activeSegmentId);

        return (
          <div className="flex flex-wrap items-center gap-2 pb-1 relative z-20">
            {/* 4 Main View Pills */}
            {primarySegments.map(seg => {
              const isActive = activeSegmentId === seg.id;
              const count = getSegmentCount(seg);
              const icon = getSegmentIcon(seg);

              return (
                <button
                  key={seg.id}
                  onClick={() => {
                    applySegmentFilters(seg);
                    setIsMoreViewsOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shadow-3xs ${
                    isActive
                      ? 'bg-[#2B0847] text-white shadow-xs'
                      : 'bg-white text-[#1E122C] border border-[#E5E7EB] hover:bg-[#F9FAFB]'
                  }`}
                  title={seg.description}
                >
                  <span className="shrink-0">{icon}</span>
                  <span className="font-semibold">{seg.name.replace(/[🔥💼✉️💬🛒⚡⭐]\s*/g, '')}</span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-[#19042B] text-white' : 'bg-[#F3F4F6] text-[#4B5563]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}

            {/* More Views Dropdown */}
            {moreSegments.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setIsMoreViewsOpen(!isMoreViewsOpen)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all cursor-pointer shadow-3xs ${
                    activeMoreSegment
                      ? 'bg-[#2B0847] text-white shadow-xs'
                      : 'bg-white text-[#1E122C] border border-[#E5E7EB] hover:bg-[#F9FAFB]'
                  }`}
                >
                  {activeMoreSegment ? (
                    <>
                      <span className="shrink-0">{getSegmentIcon(activeMoreSegment)}</span>
                      <span className="font-semibold">{activeMoreSegment.name.replace(/[🔥💼✉️💬🛒⚡⭐]\s*/g, '')}</span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#19042B] text-white">
                        {getSegmentCount(activeMoreSegment)}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-white/80 ml-0.5" />
                    </>
                  ) : (
                    <>
                      <span className="font-semibold">More Views ({moreSegments.length})</span>
                      <ChevronDown className="w-3.5 h-3.5 text-[#6B7280] ml-0.5" />
                    </>
                  )}
                </button>

                {/* Dropdown Menu */}
                {isMoreViewsOpen && (
                  <div className="absolute left-0 mt-1.5 w-60 bg-white border border-[#E5E7EB] rounded-2xl shadow-xl p-1.5 z-30 space-y-0.5 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider border-b border-[#F3F4F6] mb-1">
                      Additional Views
                    </div>
                    {moreSegments.map(seg => {
                      const isActive = activeSegmentId === seg.id;
                      const count = getSegmentCount(seg);
                      const icon = getSegmentIcon(seg);

                      return (
                        <div
                          key={seg.id}
                          onClick={() => {
                            applySegmentFilters(seg);
                            setIsMoreViewsOpen(false);
                          }}
                          className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                            isActive ? 'bg-[#F5EEFB] text-[#2B0847] font-bold' : 'hover:bg-[#F9FAFB] text-[#1E122C]'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="shrink-0">{icon}</span>
                            <span className="truncate">{seg.name.replace(/[🔥💼✉️💬🛒⚡⭐]\s*/g, '')}</span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className={`text-[10.5px] font-bold px-1.5 py-0.2 rounded-full ${
                              isActive ? 'bg-[#2B0847] text-white' : 'bg-[#F3F4F6] text-[#6B7280]'
                            }`}>
                              {count}
                            </span>
                            {!seg.isBuiltIn && (
                              <span
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteCustomSegment(seg.id, e);
                                }}
                                className="p-1 hover:bg-rose-500 hover:text-white rounded text-gray-400 transition-colors"
                                title="Delete view"
                              >
                                <X className="w-3 h-3" />
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* New View Button */}
            <button
              onClick={() => setIsSegmentModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#D94A2A]/40 hover:border-[#D94A2A] text-[#D94A2A] hover:bg-[#FFF4EE] text-xs font-bold rounded-2xl transition-all cursor-pointer whitespace-nowrap shadow-3xs shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New View</span>
            </button>
          </div>
        );
      })()}

      {/* 3. FILTER LEADS CARD */}
      <Card className="p-4 sm:p-5 border border-[#E5E7EB] bg-white rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2 text-sm font-bold text-[#1E122C]">
            <Filter className="w-4 h-4 text-[#7C3AED]" />
            <span>Filter Leads</span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSegmentModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#374151] hover:bg-[#F9FAFB] transition-colors cursor-pointer shadow-3xs"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#6B7280]" />
              <span>Save Filter</span>
            </button>

            <button 
              onClick={handleResetAllFilters}
              className="flex items-center gap-1 text-xs font-semibold text-[#EF4444] hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#EF4444]" />
              <span>Clear All</span>
            </button>
          </div>
        </div>

        {/* 4 Dropdowns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Channel */}
          <div>
            <label className="text-xs font-medium text-[#4B5563] block mb-1.5">Channel</label>
            <div className="relative flex items-center border border-[#E5E7EB] bg-white rounded-xl px-3 py-2 shadow-2xs hover:border-[#D1D5DB] transition-colors">
              <div className="w-4 h-4 flex items-center justify-center shrink-0 mr-2">
                {selectedSource === 'LinkedIn' ? (
                  <LinkedInBrandIcon className="w-3.5 h-3.5 rounded-[2px]" />
                ) : selectedSource === 'WhatsApp Chat' ? (
                  <WhatsAppBrandIcon className="w-3.5 h-3.5 rounded-full" />
                ) : selectedSource === 'Email Campaign' ? (
                  <EmailBrandIcon className="w-3.5 h-3.5 rounded-[2px]" />
                ) : selectedSource === 'Website Form' ? (
                  <StoreBrandIcon className="w-3.5 h-3.5 rounded-[2px]" />
                ) : selectedSource === 'Instagram' ? (
                  <InstagramBrandIcon className="w-3.5 h-3.5" />
                ) : selectedSource === 'Meta Ads' ? (
                  <FacebookBrandIcon className="w-3.5 h-3.5" />
                ) : (
                  <ChannelGridIcon className="w-3.5 h-3.5" />
                )}
              </div>
              <select 
                value={selectedSource}
                onChange={(e) => { setSelectedSource(e.target.value); setActiveSegmentId('custom'); }}
                className="appearance-none text-xs font-medium text-[#1E122C] bg-transparent border-0 focus:outline-none cursor-pointer w-full pr-5"
              >
                <option value="all">All Channels</option>
                <option value="LinkedIn">LinkedIn B2B</option>
                <option value="WhatsApp Chat">WhatsApp Chats</option>
                <option value="Email Campaign">Email Leads</option>
                <option value="Instagram">Instagram Direct</option>
                <option value="Meta Ads">Meta &amp; Facebook Ads</option>
                <option value="Website Form">Website &amp; Store</option>
                <option value="CSV Import">CSV Imports</option>
                <option value="Direct Referral">Direct Referral</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF] absolute right-3 pointer-events-none" />
            </div>
          </div>

          {/* Stage */}
          <div>
            <label className="text-xs font-medium text-[#4B5563] block mb-1.5">Stage</label>
            <div className="relative flex items-center border border-[#E5E7EB] bg-white rounded-xl px-3 py-2 shadow-2xs hover:border-[#D1D5DB] transition-colors">
              <Layers className="w-3.5 h-3.5 text-[#6B21A8] shrink-0 mr-2" />
              <select 
                value={selectedStage}
                onChange={(e) => { setSelectedStage(e.target.value); setActiveSegmentId('custom'); }}
                className="appearance-none text-xs font-medium text-[#1E122C] bg-transparent border-0 focus:outline-none cursor-pointer w-full pr-5"
              >
                <option value="all">All Stages</option>
                <option value="lead">Initial Contact</option>
                <option value="mql">Nurturing</option>
                <option value="sql">Qualified</option>
                <option value="customer">Hot Prospect</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF] absolute right-3 pointer-events-none" />
            </div>
          </div>

          {/* Score */}
          <div>
            <label className="text-xs font-medium text-[#4B5563] block mb-1.5">Score</label>
            <div className="relative flex items-center border border-[#E5E7EB] bg-white rounded-xl px-3 py-2 shadow-2xs hover:border-[#D1D5DB] transition-colors">
              <BarChart2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mr-2" />
              <select 
                value={selectedScoreRange}
                onChange={(e) => { setSelectedScoreRange(e.target.value); setActiveSegmentId('custom'); }}
                className="appearance-none text-xs font-medium text-[#1E122C] bg-transparent border-0 focus:outline-none cursor-pointer w-full pr-5"
              >
                <option value="all">All Scores</option>
                <option value="high">Hot (80+)</option>
                <option value="medium">Warm (40-79)</option>
                <option value="low">Cold (&lt;40)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF] absolute right-3 pointer-events-none" />
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="text-xs font-medium text-[#4B5563] block mb-1.5">Priority</label>
            <div className="relative flex items-center border border-[#E5E7EB] bg-white rounded-xl px-3 py-2 shadow-2xs hover:border-[#D1D5DB] transition-colors">
              <Flag className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0 mr-2" />
              <select 
                value={selectedPriority}
                onChange={(e) => { setSelectedPriority(e.target.value); setActiveSegmentId('custom'); }}
                className="appearance-none text-xs font-medium text-[#1E122C] bg-transparent border-0 focus:outline-none cursor-pointer w-full pr-5"
              >
                <option value="all">All</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF] absolute right-3 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Search and Apply Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input 
              type="text"
              placeholder="Search leads by name, email or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#1E122C] placeholder-[#9CA3AF] bg-white focus:outline-none focus:border-[#2B0847] focus:ring-1 focus:ring-[#2B0847]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#9CA3AF] hover:text-[#1E122C] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => {
              setCurrentPage(1);
              triggerNotification(`Filtered ${filteredContacts.length} matching leads`);
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-[#2B0847] to-[#801B48] hover:opacity-95 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap text-center"
          >
            Apply Filters
          </button>
        </div>
      </Card>

      {/* 4. RESULTS BAR & SORT CONTROLS */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="text-base sm:text-lg font-black text-[#1E122C] flex items-center gap-1.5">
            <span className="text-lg font-black">{filteredContacts.length}</span>
            <span>Leads found</span>
          </div>
          
          {/* Active filter pills */}
          {selectedSource !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE9FE] border border-[#DDD6FE] text-xs font-semibold text-[#5B21B6]">
              <span>Channel: {selectedSource}</span>
              <button onClick={() => { setSelectedSource('all'); setActiveSegmentId('all'); }} className="hover:text-purple-900 cursor-pointer ml-0.5">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE9FE] border border-[#DDD6FE] text-xs font-semibold text-[#5B21B6]">
              <span>Search: "{searchQuery}"</span>
              <button onClick={() => setSearchQuery('')} className="hover:text-purple-900 cursor-pointer ml-0.5">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {(selectedSource !== 'all' || searchQuery || activeFilterCount > 0) && (
            <button 
              onClick={handleResetAllFilters}
              className="text-xs font-bold text-[#EF4444] hover:underline cursor-pointer ml-1"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 border border-[#E5E7EB] bg-white rounded-xl px-3 py-1.5 shadow-2xs text-xs font-semibold text-[#374151]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#6B7280]" />
            <span className="text-[#6B7280] font-normal">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent border-0 focus:outline-none cursor-pointer font-bold text-xs text-[#1E122C]"
            >
              <option value="score">Score (High to Low)</option>
              <option value="date">Date Added</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>

          {/* View Switcher: List vs Grid */}
          <div className="flex items-center border border-[#E5E7EB] bg-white rounded-xl p-0.5 shadow-2xs">
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-[#2B0847] text-white' : 'text-[#6B7280] hover:bg-[#F3F4F6]'
              }`}
              title="List View"
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-[#2B0847] text-white' : 'text-[#6B7280] hover:bg-[#F3F4F6]'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. MAIN CONTACTS LIST TABLE OR GRID */}
      {viewMode === 'list' ? (
        <Card className="border border-[#E5E7EB] bg-white rounded-2xl shadow-xs overflow-hidden p-0 w-full max-w-full min-w-0">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[960px] border-collapse text-left text-xs">
              <thead>
                <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-xs font-semibold text-[#6B7280]">
                  <th className="px-4 py-3.5 w-10 text-center">
                    <input 
                      type="checkbox" 
                      checked={isAllSelectedOnPage}
                      onChange={handleSelectAllOnPage}
                      className="h-4 w-4 rounded border-[#D1D5DB] text-[#4B1D6B] focus:ring-[#4B1D6B]/50 cursor-pointer accent-[#4B1D6B]" 
                    />
                  </th>
                  <th className="px-5 py-3.5 font-semibold text-xs text-[#6B7280]">
                    <div className="flex items-center gap-1">
                      <span>Lead / Contact</span>
                      <ArrowUpDown className="w-3 h-3 text-[#9CA3AF]" />
                    </div>
                  </th>
                  <th className="px-5 py-3.5 font-semibold text-xs text-[#6B7280]">Company &amp; Role</th>
                  <th className="px-4 py-3.5 font-semibold text-xs text-[#6B7280]">Channel</th>
                  <th className="px-4 py-3.5 font-semibold text-xs text-[#6B7280]">Score &amp; Stage</th>
                  <th className="px-4 py-3.5 font-semibold text-xs text-[#6B7280]">Location</th>
                  <th className="px-5 py-3.5 font-semibold text-xs text-[#6B7280]">Tags</th>
                  <th className="px-4 py-3.5 text-center font-semibold text-xs text-[#6B7280]">Actions</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-[#E5E7EB]/70">
                {paginatedContacts.length > 0 ? (
                  paginatedContacts.map((c, idx) => {
                    const initials = c.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                    const isChecked = selectedIds.includes(c.id);

                    // Stage display mapping matching the screenshot
                    let stageLabel = 'Nurturing';
                    let stageBadgeColor = 'bg-[#F5EEFB] text-[#4B1D6B] border-[#E9D5F7]';
                    if (c.leadScore >= 80) {
                      stageLabel = 'Hot Prospect';
                      stageBadgeColor = 'bg-[#FFF0F2] text-[#E02424] border-[#FCD9BD]';
                    } else if (c.lifecycleStage === 'lead') {
                      stageLabel = 'Initial Contact';
                      stageBadgeColor = 'bg-[#EBF5FF] text-[#1E429F] border-[#BFDBFE]';
                    } else if (c.lifecycleStage === 'sql' || c.lifecycleStage === 'customer') {
                      stageLabel = 'Qualified';
                      stageBadgeColor = 'bg-[#EDFDF5] text-[#03543F] border-[#BCF0DA]';
                    }

                    return (
                      <tr 
                        key={c.id} 
                        className={`hover:bg-[#FAF8F5]/60 transition-colors cursor-pointer group ${
                          isChecked ? 'bg-[#F5EEFB]/40' : ''
                        }`}
                        onClick={() => { setActiveContact(c); setContactDetailOpen(true); }}
                      >
                        {/* Checkbox select */}
                        <td className="px-4 py-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                          <input 
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleRowSelect(c.id)}
                            className="h-4 w-4 rounded border-[#D1D5DB] text-[#4B1D6B] focus:ring-[#4B1D6B]/50 cursor-pointer accent-[#4B1D6B]"
                          />
                        </td>

                        {/* Lead / Contact: Avatar + Name + Email */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                              initials === 'JS' || initials === 'PM' 
                                ? 'bg-purple-100 text-purple-800 border border-purple-200' 
                                : initials === 'RK' || initials === 'AS'
                                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                : 'bg-[#F3E8FF] text-[#6B21A8] border border-[#E9D5F7]'
                            }`}>
                              {initials}
                            </div>
                            <div>
                              <span className="font-bold text-[#1E122C] text-xs leading-tight block group-hover:text-[#4B1D6B] transition-colors">
                                {c.name.replace(/\s*\(\d+\)|\s*\[\d+\]/g, '')}
                              </span>
                              <span className="text-[11px] text-[#9CA3AF] block mt-0.5">
                                {c.email}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Company & Role */}
                        <td className="px-5 py-3.5">
                          <div>
                            <span className="font-bold text-[#1E122C] text-xs block leading-tight">
                              {c.company || 'TechCorp'}
                            </span>
                            <span className="text-[11px] text-[#9CA3AF] block mt-0.5">
                              {c.jobTitle || 'Executive'}
                            </span>
                          </div>
                        </td>

                        {/* Channel (Lead Source) */}
                        <td className="px-4 py-3.5">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB]">
                            {c.source === 'LinkedIn' ? (
                              <>
                                <LinkedInBrandIcon className="w-3.5 h-3.5 rounded-[2px]" />
                                <span className="text-xs font-semibold text-[#1E122C]">LinkedIn</span>
                              </>
                            ) : c.source === 'WhatsApp Chat' ? (
                              <>
                                <WhatsAppBrandIcon className="w-3.5 h-3.5 rounded-full" />
                                <span className="text-xs font-semibold text-emerald-800">WhatsApp</span>
                              </>
                            ) : c.source === 'Email Campaign' ? (
                              <>
                                <EmailBrandIcon className="w-3.5 h-3.5 rounded-[2px]" />
                                <span className="text-xs font-semibold text-[#D94A2A]">Email</span>
                              </>
                            ) : c.source === 'Instagram' ? (
                              <>
                                <InstagramBrandIcon className="w-3.5 h-3.5" />
                                <span className="text-xs font-semibold text-purple-700">Instagram</span>
                              </>
                            ) : c.source === 'Meta Ads' ? (
                              <>
                                <FacebookBrandIcon className="w-3.5 h-3.5" />
                                <span className="text-xs font-semibold text-blue-700">Meta Ads</span>
                              </>
                            ) : c.source === 'Website Form' ? (
                              <>
                                <StoreBrandIcon className="w-3.5 h-3.5 rounded-[2px]" />
                                <span className="text-xs font-semibold text-purple-700">Website</span>
                              </>
                            ) : (
                              <>
                                <ChannelGridIcon className="w-3.5 h-3.5" />
                                <span className="text-xs font-semibold text-[#6B7280]">{c.source}</span>
                              </>
                            )}
                          </div>
                        </td>

                        {/* Score & Stage (Stacked: Top=Number, Bottom=Prospect Stage) */}
                        <td className="px-4 py-3.5">
                          <div className="flex flex-col items-start gap-1">
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-black text-emerald-700 leading-none" title={`AI Score: ${c.leadScore}/100`}>
                              <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
                              {c.leadScore}
                            </span>
                            <span className={`inline-block px-2.5 py-0.5 text-[10.5px] font-semibold rounded-full border whitespace-nowrap leading-tight ${stageBadgeColor}`}>
                              {stageLabel}
                            </span>
                          </div>
                        </td>

                        {/* Location */}
                        <td className="px-4 py-3.5 text-xs whitespace-nowrap">
                          <div className="flex items-center gap-1 text-[#6B7280]">
                            <MapPin className="w-3 h-3 text-[#9CA3AF] shrink-0" />
                            <span className="font-medium text-xs text-[#374151]">{c.location || 'Mumbai, India'}</span>
                          </div>
                        </td>

                        {/* Tags */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1.5 flex-wrap max-w-[180px]">
                            {c.tags.slice(0, 2).map((tag, tIdx) => (
                              <span key={tIdx} className="bg-[#EBF5FF] text-[#1E429F] px-2.5 py-0.5 rounded-lg text-[10.5px] font-bold whitespace-nowrap">
                                {tag.toUpperCase()}
                              </span>
                            ))}
                            {c.tags.length > 2 && (
                              <span className="bg-[#FEF08A]/40 text-[#854D0E] text-[10px] font-bold px-2 py-0.5 rounded-lg border border-[#FEF08A]" title={c.tags.slice(2).join(', ')}>
                                +{c.tags.length - 2}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Actions (Three dots menu) */}
                        <td className="px-4 py-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-center">
                            <button 
                              onClick={() => triggerEdit(c)}
                              className="p-1.5 hover:bg-[#F3F4F6] rounded-lg text-[#9CA3AF] hover:text-[#1E122C] cursor-pointer transition-colors"
                              title="More actions"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-[#6B7280] font-bold">
                      <div className="max-w-sm mx-auto space-y-2">
                        <Users className="w-8 h-8 text-[#6B7280]/40 mx-auto" />
                        <p className="text-sm text-[#1E122C]">No contacts found matching current filter specifications.</p>
                        <button 
                          onClick={handleResetAllFilters}
                          className="text-xs text-[#D94A2A] font-black hover:underline cursor-pointer"
                        >
                          Reset all filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION FOOTER */}
          <div className="px-6 py-3.5 bg-white border-t border-[#F3DEC8]/70 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-bold text-[#6B5E77]">
              Showing <strong className="text-[#1E122C]">{filteredContacts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredContacts.length)}</strong> of <strong className="text-[#1E122C]">{filteredContacts.length}</strong> leads
            </span>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="w-7 h-7 border border-[#F3DEC8] rounded-lg bg-white text-[#6B5E77] hover:bg-[#FAF5F0] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center cursor-pointer transition-all ${
                      currentPage === idx + 1 
                        ? 'bg-[#2B0847] text-white shadow-xs' 
                        : 'border border-[#F3DEC8] bg-white text-[#6B5E77] hover:bg-[#FAF5F0]'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="w-7 h-7 border border-[#F3DEC8] rounded-lg bg-white text-[#6B5E77] hover:bg-[#FAF5F0] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Per Page Selector */}
              <div className="flex items-center border border-[#F3DEC8] bg-white rounded-xl px-2.5 py-1 text-xs font-bold text-[#1E122C] shadow-3xs">
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="bg-transparent border-0 focus:outline-none cursor-pointer font-bold text-xs"
                >
                  <option value={10}>10 per page</option>
                  <option value={25}>25 per page</option>
                  <option value={50}>50 per page</option>
                </select>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        /* GRID VIEW MODE */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedContacts.map((c, idx) => {
            const initials = c.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
            const isChecked = selectedIds.includes(c.id);
            const isHigh = c.priority === 'high' || c.leadScore >= 75;

            return (
              <Card 
                key={c.id}
                onClick={() => { setActiveContact(c); setContactDetailOpen(true); }}
                className={`p-4 border border-[#F3DEC8] bg-white rounded-2xl shadow-3xs hover:shadow-md transition-all cursor-pointer space-y-3 relative ${
                  isChecked ? 'border-[#4B1D6B] bg-[#F5EEFB]/20' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#F5EEFB] text-[#4B1D6B] flex items-center justify-center font-bold text-xs border border-[#E9D5F7]">
                      {initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#1E122C]">{c.name.replace(/\s*\(\d+\)|\s*\[\d+\]/g, '')}</h4>
                      <p className="text-[11px] text-[#6B5E77]">{c.email}</p>
                    </div>
                  </div>

                  <span className={`text-xs font-black ${c.leadScore >= 80 ? 'text-emerald-700' : 'text-amber-600'}`}>
                    {c.leadScore}
                  </span>
                </div>

                <div className="text-xs text-[#6B5E77] border-t border-[#F3DEC8]/40 pt-2 flex items-center justify-between">
                  <span>{c.company || 'Innovate Ltd.'} · {c.jobTitle || 'Executive'}</span>
                  <span className={`inline-flex items-center gap-1 font-bold text-[11px] ${isHigh ? 'text-rose-600' : 'text-amber-600'}`}>
                    <Flag className="w-3 h-3 fill-current" />
                    <span>{isHigh ? 'High' : 'Medium'}</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {c.tags.slice(0, 2).map((t, tIdx) => (
                    <span key={tIdx} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold">
                      {t.toUpperCase()}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* 7. FLOATING MULTI-SELECT CAMPAIGN ACTION BAR */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#1E122C] text-white rounded-2xl px-5 py-3.5 shadow-2xl flex flex-wrap items-center gap-4 border border-[#3D2556] animate-in slide-in-from-bottom duration-300 max-w-[95vw]">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-6 h-6 rounded-full bg-[#D94A2A] flex items-center justify-center text-xs font-black text-white">
              {selectedIds.length}
            </div>
            <span className="text-xs font-extrabold text-white">Leads Selected</span>
          </div>

          <div className="h-6 w-px bg-white/15 hidden sm:block" />

          {/* 1-Click Campaign Launch Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button 
              onClick={() => handleLaunchEmailCampaign(selectedIds)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D94A2A] hover:bg-[#C23B1D] text-white rounded-xl text-xs font-black cursor-pointer transition-colors shadow-xs"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Use in Email Campaign</span>
            </button>

            <button 
              onClick={() => handleLaunchWhatsAppBroadcast(selectedIds)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black cursor-pointer transition-colors shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Broadcast WhatsApp</span>
            </button>
          </div>

          <div className="h-6 w-px bg-white/15 hidden md:block" />

          {/* Bulk Tag Inputs */}
          <div className="flex items-center gap-1.5">
            <input 
              type="text" 
              placeholder="Add tag..."
              value={bulkTagInput}
              onChange={(e) => setBulkTagInput(e.target.value)}
              className="bg-[#2B1B3E] border border-[#4B2F68] text-xs font-bold px-2.5 py-1.5 rounded-xl text-white placeholder-white/40 w-28 focus:outline-none focus:border-[#D94A2A]"
            />
            <button 
              onClick={handleBulkAddTags}
              className="bg-white/15 hover:bg-white/25 text-white text-[10px] font-black uppercase px-2.5 py-1.5 rounded-xl cursor-pointer transition-colors"
            >
              Tag
            </button>
          </div>

          {/* Bulk Segment Input */}
          <div className="flex items-center gap-1.5">
            <input 
              type="text" 
              placeholder="Assign segment..."
              value={bulkSegmentInput}
              onChange={(e) => setBulkSegmentInput(e.target.value)}
              className="bg-[#2B1B3E] border border-[#4B2F68] text-xs font-bold px-2.5 py-1.5 rounded-xl text-white placeholder-white/40 w-32 focus:outline-none focus:border-[#D94A2A]"
            />
            <button 
              onClick={handleBulkAddSegment}
              className="bg-white/15 hover:bg-white/25 text-white text-[10px] font-black uppercase px-2.5 py-1.5 rounded-xl cursor-pointer transition-colors"
            >
              Assign
            </button>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button 
              onClick={handleBulkArchive}
              className="flex items-center gap-1 px-2.5 py-1.5 border border-white/15 hover:border-white/30 bg-[#2B1B3E] rounded-xl text-xs font-bold text-white/80 hover:text-white cursor-pointer transition-colors"
            >
              <Archive className="w-3 h-3" />
              <span>Archive</span>
            </button>

            <button 
              onClick={handleBulkDelete}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-xs"
            >
              <Trash2 className="w-3 h-3" />
              <span>Delete</span>
            </button>

            <button 
              onClick={() => setSelectedIds([])}
              className="p-1 hover:bg-white/10 rounded-lg text-white/50 hover:text-white cursor-pointer ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 8. DYNAMIC SEGMENT BUILDER MODAL */}
      {isSegmentModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#1E122C]/40 backdrop-blur-xs" onClick={() => setIsSegmentModalOpen(false)} />
          
          <Card className="relative bg-white rounded-[28px] max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[#F3DEC8] z-10 space-y-5 text-left">
            <div className="flex items-center justify-between border-b border-[#F3DEC8] pb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#F5EEFB] text-[#4B1D6B] flex items-center justify-center">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#1E122C]">Create Custom Audience Segment</h3>
                  <p className="text-[11px] text-[#6B5E77] font-semibold">Define rules to automatically filter and save this lead group</p>
                </div>
              </div>
              <button 
                onClick={() => setIsSegmentModalOpen(false)}
                className="p-1.5 hover:bg-[#FAF5F0] rounded-xl text-[#6B5E77] cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSegment} className="space-y-4">
              
              {/* Segment Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#6B5E77] uppercase tracking-wider block">Segment Name *</label>
                <input 
                  type="text" 
                  required
                  value={segmentName}
                  onChange={(e) => setSegmentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A]"
                  placeholder="e.g. High Intent Tech Founders, Cart Recoveries"
                />
              </div>

              {/* Segment Description */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#6B5E77] uppercase tracking-wider block">Description (Optional)</label>
                <input 
                  type="text" 
                  value={segmentDesc}
                  onChange={(e) => setSegmentDesc(e.target.value)}
                  className="w-full px-3.5 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A]"
                  placeholder="e.g. VIP B2B prospects for Q3 email outreach"
                />
              </div>

              {/* Rule Group Grid */}
              <div className="p-4 bg-[#FAF5F0]/60 rounded-2xl border border-[#F3DEC8] space-y-3">
                <span className="text-[10px] font-black text-[#4B1D6B] uppercase tracking-wider block">Filter Conditions</span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Source Channel */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-wider block">Acquisition Channel</label>
                    <select 
                      value={segmentSource}
                      onChange={(e) => setSegmentSource(e.target.value)}
                      className="w-full px-3 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-white cursor-pointer"
                    >
                      <option value="all">Any Channel</option>
                      <option value="LinkedIn">LinkedIn B2B</option>
                      <option value="Email Campaign">Email Campaign</option>
                      <option value="WhatsApp Chat">WhatsApp Chat</option>
                      <option value="Meta Ads">Meta &amp; Paid Ads</option>
                      <option value="Website Form">Website Form</option>
                      <option value="CSV Import">CSV Import</option>
                    </select>
                  </div>

                  {/* Lifecycle Stage */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-wider block">Lifecycle Stage</label>
                    <select 
                      value={segmentStage}
                      onChange={(e) => setSegmentStage(e.target.value)}
                      className="w-full px-3 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-white cursor-pointer"
                    >
                      <option value="all">Any Stage</option>
                      <option value="lead">Lead</option>
                      <option value="mql">MQL (Marketing Qualified)</option>
                      <option value="sql">SQL (Sales Qualified)</option>
                      <option value="customer">Customer</option>
                    </select>
                  </div>

                  {/* Minimum Lead Score */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-wider">Min Lead Score</label>
                      <span className="text-[10px] font-black text-[#D94A2A]">{segmentMinScore}+</span>
                    </div>
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={segmentMinScore}
                      onChange={(e) => setSegmentMinScore(Number(e.target.value))}
                      className="w-full accent-[#D94A2A] cursor-pointer"
                    />
                  </div>

                  {/* Priority */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-wider block">Priority Level</label>
                    <select 
                      value={segmentPriority}
                      onChange={(e) => setSegmentPriority(e.target.value)}
                      className="w-full px-3 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-white cursor-pointer"
                    >
                      <option value="all">Any Priority</option>
                      <option value="high">High Only</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>

                  {/* Tag Match */}
                  <div className="col-span-1 sm:col-span-2 space-y-1">
                    <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-wider block">Include Specific Tags</label>
                    <input 
                      type="text"
                      value={segmentTag}
                      onChange={(e) => setSegmentTag(e.target.value)}
                      placeholder="e.g. founder, premium, delhi"
                      className="w-full px-3 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-white"
                    />
                  </div>

                  {/* Consent Toggle */}
                  <div className="col-span-1 sm:col-span-2 flex items-center gap-2 pt-1">
                    <input 
                      type="checkbox"
                      id="seg_consent"
                      checked={segmentConsentOnly}
                      onChange={(e) => setSegmentConsentOnly(e.target.checked)}
                      className="h-4 w-4 rounded border-[#F3DEC8] text-[#D94A2A] cursor-pointer accent-[#D94A2A]"
                    />
                    <label htmlFor="seg_consent" className="text-xs font-bold text-[#1E122C] cursor-pointer select-none">
                      Require messaging consent (Only opt-in contacts)
                    </label>
                  </div>
                </div>
              </div>

              {/* Real-time Match Preview */}
              <div className="flex items-center justify-between p-3.5 bg-[#FFF4EE] border border-[#FAD8C7] rounded-2xl">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D94A2A]" />
                  <span className="text-xs font-bold text-[#1E122C]">Estimated Audience Size:</span>
                </div>
                <span className="text-sm font-black text-[#D94A2A]">
                  {segmentPreviewCount} Leads Match
                </span>
              </div>

              {/* Submit Controls */}
              <div className="pt-2 border-t border-[#F3DEC8] flex justify-end gap-2.5">
                <button 
                  type="button" 
                  onClick={() => setIsSegmentModalOpen(false)}
                  className="px-4 py-2 border border-[#F3DEC8] hover:bg-[#FAF5F0] text-[#6B5E77] text-xs font-extrabold rounded-xl cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-[#2B0847] via-[#48115B] to-[#801B48] hover:opacity-95 text-white text-xs font-black rounded-xl shadow-xs cursor-pointer border-0 transition-opacity"
                >
                  Save &amp; Apply Segment
                </button>
              </div>

            </form>
          </Card>
        </div>
      )}

      {/* 9. PROFILE DETAILS SLIDING DRAWER */}
      {contactDetailOpen && activeContact && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="fixed inset-0 bg-[#1E122C]/40 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
            onClick={() => setContactDetailOpen(false)}
          />
          
          <div className="fixed right-0 top-0 bottom-0 h-full max-h-screen w-full sm:w-[490px] max-w-[100vw] bg-[#FAF5F0] shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300 border-l border-[#F3DEC8] overflow-hidden text-left">
            
            {/* Header */}
            <div className="h-16 px-5 sm:px-6 border-b border-[#F3DEC8] flex items-center justify-between bg-white shrink-0 shadow-2xs z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D94A2A] animate-pulse" />
                <span className="text-xs font-black text-[#1E122C] uppercase tracking-wider">
                  Lead Profile &amp; CRM Card
                </span>
              </div>
              <button 
                onClick={() => setContactDetailOpen(false)}
                className="w-8 h-8 rounded-xl bg-[#FAF5F0] hover:bg-[#FFF8F5] text-[#6B5E77] hover:text-[#1E122C] border border-[#F3DEC8] flex items-center justify-center cursor-pointer transition-all shadow-3xs"
                title="Close Drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-4">
              
              {/* Avatar Summary Header Card */}
              <div className="bg-white border border-[#F3DEC8] p-5 rounded-2xl text-center space-y-2.5 shadow-2xs">
                <div className={`w-16 h-16 rounded-2xl text-white flex items-center justify-center text-xl font-black mx-auto shadow-md ring-4 ring-[#FAF5F0] ${
                  activeContact.source === 'LinkedIn' 
                    ? 'bg-gradient-to-tr from-blue-700 to-indigo-600' 
                    : activeContact.source === 'WhatsApp Chat'
                    ? 'bg-gradient-to-tr from-emerald-700 to-teal-600'
                    : 'bg-gradient-to-tr from-[#2B0847] via-[#48115B] to-[#801B48]'
                }`}>
                  {activeContact.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#1E122C] leading-tight">{activeContact.name}</h3>
                  <p className="text-xs font-bold text-[#6B5E77] mt-0.5">
                    {activeContact.jobTitle || 'Customer'} {activeContact.company ? `• ${activeContact.company}` : ''}
                  </p>
                  <div className="flex items-center justify-center gap-1.5 mt-2">
                    {getSourceIcon(activeContact.source)}
                    <span className="text-xs font-bold text-[#1E122C]">{activeContact.source}</span>
                  </div>
                </div>

                {/* Quick 1-Click Campaign Action Buttons Inside Drawer */}
                <div className="pt-3 border-t border-[#F3DEC8]/60 flex items-center justify-center gap-2">
                  <button 
                    onClick={() => {
                      setContactDetailOpen(false);
                      handleLaunchEmailCampaign([activeContact.id]);
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#FFF4EE] border border-[#FAD8C7] text-[#D94A2A] rounded-xl text-xs font-black hover:bg-[#FFE9DE] cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Lead</span>
                  </button>

                  <button 
                    onClick={() => {
                      setContactDetailOpen(false);
                      handleLaunchWhatsAppBroadcast([activeContact.id]);
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#F4FDF8] border border-emerald-200 text-emerald-700 rounded-xl text-xs font-black hover:bg-emerald-100/70 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Lifecycle Progress Tracker Card */}
              <div className="bg-white border border-[#F3DEC8] p-4 rounded-2xl space-y-3 shadow-2xs">
                <div className="flex items-center justify-between border-b border-[#F3DEC8]/60 pb-2">
                  <span className="text-[10px] font-black text-[#4B1D6B] uppercase tracking-wider">
                    Lifecycle Progress
                  </span>
                  <span className="text-[9.5px] font-bold text-[#D94A2A] capitalize bg-[#FFF4EE] border border-[#FAD8C7] px-2.5 py-0.5 rounded-full">
                    {activeContact.lifecycleStage}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  {(['lead', 'mql', 'sql', 'customer'] as const).map((stage, idx) => {
                    const stageIndex = ['lead', 'mql', 'sql', 'customer'].indexOf(activeContact.lifecycleStage);
                    const isPassed = idx <= stageIndex;
                    return (
                      <React.Fragment key={stage}>
                        <div className="flex flex-col items-center gap-1 flex-1 relative">
                          <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-[10px] font-black transition-all ${
                            isPassed 
                              ? 'bg-gradient-to-r from-[#2B0847] to-[#48115B] border-[#4B1D6B] text-white shadow-xs' 
                              : 'bg-[#FAF5F0] border-[#F3DEC8] text-[#6B5E77]/50'
                          }`}>
                            {isPassed ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : idx + 1}
                          </div>
                          <span className={`text-[9px] font-black uppercase tracking-wider ${isPassed ? 'text-[#1E122C]' : 'text-[#6B5E77]/60'}`}>
                            {stage}
                          </span>
                        </div>
                        {idx < 3 && (
                          <div className={`h-[2px] flex-1 -mt-4 transition-colors ${
                            idx < stageIndex ? 'bg-[#4B1D6B]' : 'bg-[#F3DEC8]'
                          }`} />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Attributes 2-Column Grid */}
              <div className="space-y-3">
                <span className="text-[10px] font-black text-[#6B5E77] uppercase tracking-widest block pl-1">
                  Contact Attributes &amp; CRM Data
                </span>

                <div className="grid grid-cols-2 gap-2.5">
                  
                  {/* Lead Score Card */}
                  <div className="bg-white border border-[#F3DEC8] rounded-xl p-3 shadow-3xs">
                    <span className="text-[8.5px] font-black text-[#6B5E77] uppercase block">AI Lead score (0-100)</span>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-lg font-black text-[#1E122C] leading-none">{activeContact.leadScore}</span>
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                        activeContact.leadScore >= 80 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : activeContact.leadScore >= 40 ? 'bg-[#FFF1EB] text-[#D94A2A] border border-[#FAD8C7]' : 'bg-rose-50 text-rose-600 border border-rose-200'
                      }`}>
                        {activeContact.leadScore >= 80 ? 'Hot' : activeContact.leadScore >= 40 ? 'Warm' : 'Cold'}
                      </span>
                    </div>
                  </div>

                  {/* Priority Card */}
                  <div className="bg-white border border-[#F3DEC8] rounded-xl p-3 shadow-3xs">
                    <span className="text-[8.5px] font-black text-[#6B5E77] uppercase block">Priority Level</span>
                    <div className="mt-1.5">
                      <span className={`inline-block px-2.5 py-0.5 text-[9px] font-black uppercase rounded-full border ${getPriorityColor(activeContact.priority)}`}>
                        {activeContact.priority}
                      </span>
                    </div>
                  </div>

                  {/* Email Card */}
                  <div className="col-span-2 bg-white border border-[#F3DEC8] rounded-xl p-3 space-y-1 shadow-3xs">
                    <span className="text-[8.5px] font-black text-[#6B5E77] uppercase flex items-center gap-1">
                      <Mail className="w-3 h-3 text-[#D94A2A]" />
                      Email Address
                    </span>
                    <span className="text-xs font-bold text-[#1E122C] select-all block break-all">{activeContact.email}</span>
                  </div>

                  {/* Phone Card */}
                  <div className="col-span-2 bg-white border border-[#F3DEC8] rounded-xl p-3 space-y-1 shadow-3xs">
                    <span className="text-[8.5px] font-black text-[#6B5E77] uppercase flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#D94A2A]" />
                      Phone Number
                    </span>
                    <span className="text-xs font-bold text-[#1E122C] select-all block">{activeContact.phone}</span>
                  </div>

                  {/* Location Card */}
                  <div className="bg-white border border-[#F3DEC8] rounded-xl p-3 shadow-3xs">
                    <span className="text-[8.5px] font-black text-[#6B5E77] uppercase flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#D94A2A]" />
                      Location
                    </span>
                    <span className="text-xs font-bold text-[#1E122C] block mt-1 truncate">{activeContact.location || 'Unknown'}</span>
                  </div>

                  {/* Source Channel Card */}
                  <div className="bg-white border border-[#F3DEC8] rounded-xl p-3 shadow-3xs">
                    <span className="text-[8.5px] font-black text-[#6B5E77] uppercase block">Acquisition Source</span>
                    <span className="text-xs font-bold text-[#1E122C] block mt-1 truncate">{activeContact.source}</span>
                  </div>

                  {/* Segment Card */}
                  <div className="col-span-2 bg-white border border-[#F3DEC8] rounded-xl p-3 shadow-3xs">
                    <span className="text-[8.5px] font-black text-[#6B5E77] uppercase block">Segment Group</span>
                    <span className="text-xs font-bold text-[#1E122C] block mt-1">{activeContact.segment || 'Unsegmented'}</span>
                  </div>

                  {/* Tags Card */}
                  <div className="col-span-2 bg-white border border-[#F3DEC8] rounded-xl p-3 shadow-3xs">
                    <span className="text-[8.5px] font-black text-[#6B5E77] uppercase block mb-1.5">Tags</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeContact.tags.map((t, idx) => (
                        <span key={idx} className="bg-[#FFF4EE] border border-[#FAD8C7] text-[10px] font-bold text-[#D94A2A] px-2 py-0.5 rounded-md">
                          {t}
                        </span>
                      ))}
                      {activeContact.tags.length === 0 && (
                        <span className="text-[#6B5E77]/60 text-xs italic">No tags attached.</span>
                      )}
                    </div>
                  </div>

                  {/* Messaging Consent Card */}
                  <div className="col-span-2 border border-[#F3DEC8] rounded-xl p-3.5 flex items-center justify-between gap-4 bg-white shadow-3xs">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                        activeContact.consent ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-500 border border-rose-100'
                      }`}>
                        {activeContact.consent ? <HeartHandshake className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <span className="text-xs font-black text-[#1E122C] block">Messaging Consent</span>
                        <span className="text-[9px] text-[#6B5E77] font-semibold block mt-0.5">Permission to send SMS, WhatsApp &amp; Email</span>
                      </div>
                    </div>
                    <span className={`text-[9.5px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      activeContact.consent ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {activeContact.consent ? 'Granted' : 'Denied'}
                    </span>
                  </div>

                </div>
              </div>

            </div>

            {/* Sticky Bottom Footer Controls */}
            <div className="p-4 sm:px-5 sm:py-4 border-t border-[#F3DEC8] bg-white flex items-center gap-2.5 shrink-0 shadow-[0_-4px_20px_rgba(75,29,107,0.08)] z-20">
              <button 
                onClick={() => { setContactDetailOpen(false); triggerEdit(activeContact); }}
                className="flex-1 h-11 bg-gradient-to-r from-[#2B0847] via-[#48115B] to-[#801B48] hover:opacity-95 text-white text-xs font-black rounded-xl shadow-xs cursor-pointer border-0 transition-opacity flex items-center justify-center gap-2 px-4"
              >
                <span>Edit Profile</span>
              </button>
              
              <button 
                onClick={() => handleArchiveContact(activeContact.id)}
                className="h-11 px-4 border border-[#F3DEC8] hover:border-[#D94A2A]/40 bg-[#FAF5F0] text-[#1E122C] hover:bg-white text-xs font-bold rounded-xl cursor-pointer transition-colors shadow-3xs flex items-center justify-center"
              >
                Archive
              </button>

              <button 
                onClick={() => handleDeleteContact(activeContact.id)}
                className="w-11 h-11 border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl cursor-pointer transition-colors shadow-3xs flex items-center justify-center shrink-0"
                title="Delete Contact"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 10. ADD CONTACT MODAL FORM */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#1E122C]/40 backdrop-blur-xs" onClick={() => setIsAddModalOpen(false)} />
          
          <Card className="relative bg-white rounded-[28px] max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[#F3DEC8] z-10 space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-[#F3DEC8] pb-3.5">
              <h3 className="text-base font-black text-[#1E122C] flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#FFF1EB] text-[#D94A2A] flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                Manually Add New Lead / Contact
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 hover:bg-[#FAF5F0] rounded-xl text-[#6B5E77] cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3.5 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A] transition-all"
                    placeholder="e.g. Rahul Saxena"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-3.5 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A] transition-all"
                    placeholder="e.g. rahul@example.com"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Phone Number</label>
                  <input 
                    type="text" 
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full px-3.5 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A] transition-all"
                    placeholder="e.g. +91 9876543210"
                  />
                </div>

                {/* Location */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">City / State</label>
                  <input 
                    type="text" 
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    className="w-full px-3.5 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A] transition-all"
                    placeholder="e.g. New Delhi, India"
                  />
                </div>

                {/* Company */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Company (B2B)</label>
                  <input 
                    type="text" 
                    value={formCompany}
                    onChange={(e) => setFormCompany(e.target.value)}
                    className="w-full px-3.5 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A] transition-all"
                    placeholder="e.g. GrowthScale Media"
                  />
                </div>

                {/* Job Title */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Job Title / Role</label>
                  <input 
                    type="text" 
                    value={formJobTitle}
                    onChange={(e) => setFormJobTitle(e.target.value)}
                    className="w-full px-3.5 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A] transition-all"
                    placeholder="e.g. Founder &amp; CEO"
                  />
                </div>

                {/* Channel Source */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Channel Source</label>
                  <select 
                    value={formSource}
                    onChange={(e) => setFormSource(e.target.value)}
                    className="w-full px-3 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A] cursor-pointer"
                  >
                    <option value="LinkedIn">LinkedIn B2B</option>
                    <option value="Email Campaign">Email Campaign</option>
                    <option value="WhatsApp Chat">WhatsApp Chat</option>
                    <option value="Meta Ads">Meta &amp; Paid Ads</option>
                    <option value="Website Form">Website Form</option>
                    <option value="CSV Import">CSV Import</option>
                  </select>
                </div>

                {/* Lifecycle Stage */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Lifecycle Stage</label>
                  <select 
                    value={formStage}
                    onChange={(e) => setFormStage(e.target.value as any)}
                    className="w-full px-3 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A] cursor-pointer"
                  >
                    <option value="lead">Lead</option>
                    <option value="mql">MQL</option>
                    <option value="sql">SQL</option>
                    <option value="customer">Customer</option>
                  </select>
                </div>

                {/* Priority */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Priority Level</label>
                  <select 
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as any)}
                    className="w-full px-3 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A] cursor-pointer"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                {/* Lead Score */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Lead Score (0-100)</label>
                  <input 
                    type="number" 
                    min="0"
                    max="100"
                    value={formScore}
                    onChange={(e) => setFormScore(Number(e.target.value))}
                    className="w-full px-3.5 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A]"
                  />
                </div>

                {/* Tags */}
                <div className="col-span-1 sm:col-span-2 space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Tags (comma-separated)</label>
                  <input 
                    type="text" 
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    className="w-full px-3.5 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A]"
                    placeholder="e.g. founder, linkedin, vip"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="col-span-1 sm:col-span-2 flex items-start gap-2.5 pt-2">
                  <input 
                    type="checkbox" 
                    id="add_consent"
                    checked={formConsent}
                    onChange={(e) => setFormConsent(e.target.checked)}
                    className="h-4 w-4 rounded border-[#F3DEC8] text-[#D94A2A] focus:ring-[#D94A2A]/30 mt-0.5 cursor-pointer accent-[#D94A2A]"
                  />
                  <label htmlFor="add_consent" className="text-xs font-bold text-[#1E122C] cursor-pointer select-none">
                    Consent Granted (Permission to send SMS, WhatsApp &amp; Email updates)
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-[#F3DEC8] flex justify-end gap-2.5">
                <button 
                  type="button" 
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-[#F3DEC8] hover:bg-[#FAF5F0] text-[#6B5E77] text-xs font-extrabold rounded-xl cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-[#2B0847] via-[#48115B] to-[#801B48] hover:opacity-95 text-white text-xs font-black rounded-xl shadow-xs cursor-pointer border-0 transition-opacity"
                >
                  Create Contact
                </button>
              </div>

            </form>
          </Card>
        </div>
      )}

      {/* 11. EDIT CONTACT MODAL FORM */}
      {isEditModalOpen && activeContact && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#1E122C]/40 backdrop-blur-xs" onClick={() => setIsEditModalOpen(false)} />
          
          <Card className="relative bg-white rounded-[28px] max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[#F3DEC8] z-10 space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-[#F3DEC8] pb-3.5">
              <h3 className="text-base font-black text-[#1E122C] flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#FFF1EB] text-[#D94A2A] flex items-center justify-center">
                  <UserPlus className="w-4 h-4" />
                </div>
                Edit Contact Details
              </h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 hover:bg-[#FAF5F0] rounded-xl text-[#6B5E77] cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3.5 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A]"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-3.5 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A]"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Phone</label>
                  <input 
                    type="text" 
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full px-3.5 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A]"
                  />
                </div>

                {/* Location */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Location</label>
                  <input 
                    type="text" 
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    className="w-full px-3.5 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A]"
                  />
                </div>

                {/* Company */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Company</label>
                  <input 
                    type="text" 
                    value={formCompany}
                    onChange={(e) => setFormCompany(e.target.value)}
                    className="w-full px-3.5 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A]"
                  />
                </div>

                {/* Job Title */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Job Title</label>
                  <input 
                    type="text" 
                    value={formJobTitle}
                    onChange={(e) => setFormJobTitle(e.target.value)}
                    className="w-full px-3.5 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A]"
                  />
                </div>

                {/* Lifecycle Stage */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Lifecycle Stage</label>
                  <select 
                    value={formStage}
                    onChange={(e) => setFormStage(e.target.value as any)}
                    className="w-full px-3 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A] cursor-pointer"
                  >
                    <option value="lead">Lead</option>
                    <option value="mql">MQL</option>
                    <option value="sql">SQL</option>
                    <option value="customer">Customer</option>
                  </select>
                </div>

                {/* Lead Status */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Lead Status</label>
                  <select 
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full px-3 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A] cursor-pointer"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>

                {/* Lead Score */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Lead Score (0-100)</label>
                  <input 
                    type="number" 
                    min="0"
                    max="100"
                    value={formScore}
                    onChange={(e) => setFormScore(Number(e.target.value))}
                    className="w-full px-3.5 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A]"
                  />
                </div>

                {/* Priority */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Priority Level</label>
                  <select 
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as any)}
                    className="w-full px-3 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A] cursor-pointer"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                {/* Channel Source */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Acquisition Source</label>
                  <select 
                    value={formSource}
                    onChange={(e) => setFormSource(e.target.value)}
                    className="w-full px-3 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A] cursor-pointer"
                  >
                    <option value="LinkedIn">LinkedIn B2B</option>
                    <option value="Email Campaign">Email Campaign</option>
                    <option value="WhatsApp Chat">WhatsApp Chat</option>
                    <option value="Meta Ads">Meta &amp; Paid Ads</option>
                    <option value="Website Form">Website Form</option>
                    <option value="CSV Import">CSV Import</option>
                  </select>
                </div>

                {/* Tags */}
                <div className="col-span-1 sm:col-span-2 space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Tags (comma-separated)</label>
                  <input 
                    type="text" 
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    className="w-full px-3.5 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A]"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="col-span-1 sm:col-span-2 flex items-start gap-2.5 pt-2">
                  <input 
                    type="checkbox" 
                    id="edit_consent"
                    checked={formConsent}
                    onChange={(e) => setFormConsent(e.target.checked)}
                    className="h-4 w-4 rounded border-[#F3DEC8] text-[#D94A2A] focus:ring-[#D94A2A]/30 mt-0.5 cursor-pointer accent-[#D94A2A]"
                  />
                  <label htmlFor="edit_consent" className="text-xs font-bold text-[#1E122C] cursor-pointer select-none">
                    Consent Granted (Permission to send SMS, WhatsApp &amp; Email updates)
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-[#F3DEC8] flex justify-end gap-2.5">
                <button 
                  type="button" 
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-[#F3DEC8] hover:bg-[#FAF5F0] text-[#6B5E77] text-xs font-extrabold rounded-xl cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-[#2B0847] via-[#48115B] to-[#801B48] hover:opacity-95 text-white text-xs font-black rounded-xl shadow-xs cursor-pointer border-0 transition-opacity"
                >
                  Save Changes
                </button>
              </div>

            </form>
          </Card>
        </div>
      )}

      {/* 12. CSV IMPORT DRAG-DROP MODAL */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#1E122C]/40 backdrop-blur-xs" onClick={() => setIsImportModalOpen(false)} />
          
          <Card className="relative bg-white rounded-[28px] max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[#F3DEC8] z-10 space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-[#F3DEC8] pb-3.5">
              <h3 className="text-base font-black text-[#1E122C] flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#FFF1EB] text-[#D94A2A] flex items-center justify-center">
                  <Upload className="w-4 h-4" />
                </div>
                Import Contacts from CSV / Excel
              </h3>
              <button 
                onClick={() => setIsImportModalOpen(false)}
                className="p-1.5 hover:bg-[#FAF5F0] rounded-xl text-[#6B5E77] cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleImportCSV} className="space-y-4">
              
              {/* Hidden File Input */}
              <input 
                type="file"
                ref={fileInputRef}
                accept=".csv, .xlsx, .xls, .txt"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelected(file);
                }}
              />

              {/* Drag and Drop Zone */}
              <div 
                className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
                  selectedFile 
                    ? 'border-[#D94A2A] bg-[#FFF8F5]' 
                    : 'border-[#F3DEC8] hover:border-[#D94A2A] hover:bg-[#FFF8F5] bg-[#FAF5F0]/50'
                }`} 
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleFileSelected(file);
                }}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FFF1EB] text-[#D94A2A] flex items-center justify-center mx-auto mb-2.5 shadow-2xs">
                  <Upload className="w-6 h-6" />
                </div>
                {selectedFile ? (
                  <div className="space-y-1">
                    <span className="text-xs font-black text-[#D94A2A] block truncate max-w-xs mx-auto">
                      📄 Selected File: {selectedFile.name}
                    </span>
                    <span className="text-[10px] text-[#6B5E77] font-bold block">
                      {(selectedFile.size / 1024).toFixed(1)} KB • Click or drag to change file
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        setCsvText('');
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="text-[10px] text-rose-600 underline font-bold mt-1 hover:text-rose-700 bg-transparent border-0 cursor-pointer"
                    >
                      Remove selected file
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="text-xs font-black text-[#1E122C] block">Click here to select CSV / Excel file from computer</span>
                    <span className="text-[10px] text-[#6B5E77] font-bold block mt-1">Accepts .csv, .xlsx, .xls (Name, Email, Phone, Company, Role, Score, Tags)</span>
                  </>
                )}
              </div>

              {/* CSV Parsing Error */}
              {csvParseError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-xs font-semibold leading-relaxed">
                  {csvParseError}
                </div>
              )}

              {/* Text Area for copy paste csv */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">File / CSV Content Preview</label>
                  <button 
                    type="button" 
                    onClick={handleLoadImportTemplate}
                    className="text-[10px] font-extrabold text-[#D94A2A] hover:underline bg-transparent border-0 cursor-pointer"
                  >
                    Load Sample Template
                  </button>
                </div>
                <textarea 
                  rows={4}
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  className="w-full px-3.5 py-2 border border-[#F3DEC8] rounded-xl text-xs font-mono text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A]"
                  placeholder='Name,Email,Phone,Company,Job Title,Source,Lifecycle Stage,Lead Score&#10;"Aarav Sharma","aarav@example.com","9876543210","FinPulse","VP","LinkedIn","mql",85'
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-[#F3DEC8] flex justify-between items-center">
                <div />
                
                <div className="flex gap-2.5">
                  <button 
                    type="button" 
                    onClick={() => {
                      setIsImportModalOpen(false);
                      setSelectedFile(null);
                      setCsvText('');
                      setCsvParseError('');
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="px-4 py-2 border border-[#F3DEC8] hover:bg-[#FAF5F0] text-[#6B5E77] text-xs font-extrabold rounded-xl cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isUploadingFile}
                    className="px-5 py-2 bg-gradient-to-r from-[#2B0847] via-[#48115B] to-[#801B48] hover:opacity-95 text-white text-xs font-black rounded-xl shadow-xs cursor-pointer border-0 transition-opacity disabled:opacity-50 flex items-center gap-2"
                  >
                    {isUploadingFile ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      'Import Contacts'
                    )}
                  </button>
                </div>
              </div>

            </form>
          </Card>
        </div>
      )}

    </div>
  );
};

export default Contacts;
