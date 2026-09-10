import React, { useState, useMemo, useEffect } from 'react';
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
  CheckCircle2
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Contact } from '../types';

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
  { id: 'all', name: 'All Audience', description: 'Complete database of all leads and customers', sourceFilter: 'all', minScore: 0, stageFilter: 'all', priorityFilter: 'all', consentOnly: false, isBuiltIn: true },
  { id: 'hot_leads', name: '🔥 Hot Leads (Score 80+)', description: 'High-intent leads ready for immediate sales or nurture outreach', sourceFilter: 'all', minScore: 80, stageFilter: 'all', priorityFilter: 'all', consentOnly: false, isBuiltIn: true },
  { id: 'linkedin_decision_makers', name: '💼 LinkedIn Prospects', description: 'B2B Leads sourced from LinkedIn outreach and networking', sourceFilter: 'LinkedIn', minScore: 0, stageFilter: 'all', priorityFilter: 'all', consentOnly: false, isBuiltIn: true },
  { id: 'cart_abandoners', name: '🛒 Cart & D2C Shoppers', description: 'Store visitors and prospective buyers from website', sourceFilter: 'Website Form', minScore: 0, stageFilter: 'all', priorityFilter: 'all', consentOnly: false, isBuiltIn: true },
  { id: 'email_optins', name: '✉️ Email Subscribers', description: 'Active email newsletter and drip campaign opt-ins', sourceFilter: 'Email Campaign', minScore: 0, stageFilter: 'all', priorityFilter: 'all', consentOnly: true, isBuiltIn: true },
  { id: 'whatsapp_leads', name: '💬 WhatsApp Inquiries', description: 'Direct WhatsApp chats and customer inquiry leads', sourceFilter: 'WhatsApp Chat', minScore: 0, stageFilter: 'all', priorityFilter: 'all', consentOnly: true, isBuiltIn: true },
  { id: 'high_prio_vip', name: '⚡ High Priority VIPs', description: 'High value priority accounts requiring dedicated attention', sourceFilter: 'all', minScore: 0, stageFilter: 'all', priorityFilter: 'high', consentOnly: false, isBuiltIn: true }
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

export const Contacts: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Core contact list state
  const [contacts, setContacts] = useState<Contact[]>(() => generateSeedContacts());
  
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

  // Selection states for campaign actions & bulk operations
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Modal & Drawer states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isSegmentModalOpen, setIsSegmentModalOpen] = useState(false);
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
  const [csvText, setCsvText] = useState('');
  const [csvParseError, setCsvParseError] = useState('');

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
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) return;

    const normalizedEmail = formEmail.toLowerCase().trim();
    let formattedPhone = formPhone.trim();
    if (/^\d{10}$/.test(formattedPhone)) {
      formattedPhone = `+91 ${formattedPhone.substring(0, 5)} ${formattedPhone.substring(5)}`;
    }

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
    triggerNotification(`Added contact ${newContact.name} successfully!`);
  };

  // Edit Contact Form Submit
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeContact || !formName.trim() || !formEmail.trim()) return;

    const normalizedEmail = formEmail.toLowerCase().trim();
    let formattedPhone = formPhone.trim();
    if (/^\d{10}$/.test(formattedPhone)) {
      formattedPhone = `+91 ${formattedPhone.substring(0, 5)} ${formattedPhone.substring(5)}`;
    }

    const updatedContact: Contact = {
      ...activeContact,
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
      consent: formConsent
    };

    setContacts(prev => prev.map(c => c.id === activeContact.id ? updatedContact : c));
    setActiveContact(updatedContact);
    setIsEditModalOpen(false);
    triggerNotification(`Updated profile for ${updatedContact.name}`);
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

  const handleDeleteContact = (id: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      setContacts(prev => prev.filter(c => c.id !== id));
      setSelectedIds(prev => prev.filter(item => item !== id));
      if (activeContact?.id === id) {
        setContactDetailOpen(false);
      }
      triggerNotification('Contact deleted from CRM.');
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

  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to delete the ${selectedIds.length} selected contacts?`)) {
      setContacts(prev => prev.filter(c => !selectedIds.includes(c.id)));
      setSelectedIds([]);
      triggerNotification('Selected contacts deleted.');
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

  const handleImportCSV = (e: React.FormEvent) => {
    e.preventDefault();
    setCsvParseError('');
    if (!csvText.trim()) return;

    try {
      const lines = csvText.split('\n');
      if (lines.length < 2) {
        setCsvParseError('CSV must contain a header row and at least one contact row.');
        return;
      }

      const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/"/g, ''));
      const parsedContacts: Contact[] = [];

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
        const cells = matches ? matches.map(c => c.trim().replace(/^"|"$/g, '')) : line.split(',');

        if (cells.length < 2) continue;

        const rowMap: Record<string, string> = {};
        headers.forEach((h, idx) => {
          if (idx < cells.length) {
            rowMap[h] = cells[idx];
          }
        });

        const name = rowMap['name'] || rowMap['first name'] || 'Imported Lead';
        const email = (rowMap['email'] || 'lead@example.com').toLowerCase().trim();
        let phone = rowMap['phone'] || '';
        if (/^\d{10}$/.test(phone)) {
          phone = `+91 ${phone.substring(0, 5)} ${phone.substring(5)}`;
        }

        const score = Number(rowMap['lead score'] || rowMap['score'] || 65);
        const stage = (rowMap['lifecycle stage'] || rowMap['stage'] || 'lead').toLowerCase();
        const status = (rowMap['lead status'] || rowMap['status'] || 'new').toLowerCase();
        const priority = (rowMap['priority'] || 'medium').toLowerCase();
        const source = rowMap['source'] || 'CSV Import';
        const tags = rowMap['tags'] ? rowMap['tags'].split(';').map(t => t.trim()) : ['imported'];

        parsedContacts.push({
          id: `c_csv_${Date.now()}_${i}`,
          name,
          email,
          phone,
          company: rowMap['company'] || undefined,
          jobTitle: rowMap['job title'] || rowMap['role'] || undefined,
          location: rowMap['location'] || rowMap['city'] || undefined,
          source,
          lifecycleStage: ['lead', 'mql', 'sql', 'customer'].includes(stage) ? stage as any : 'lead',
          leadStatus: ['new', 'contacted', 'qualified', 'lost'].includes(status) ? status as any : 'new',
          leadScore: isNaN(score) ? 50 : score,
          priority: ['high', 'medium', 'low'].includes(priority) ? priority as any : 'medium',
          segment: rowMap['segment'] || undefined,
          tags,
          owner: rowMap['owner'] || 'AI Agent',
          consent: (rowMap['consent'] || 'yes').toLowerCase() === 'yes',
          createdAt: new Date().toISOString()
        });
      }

      if (parsedContacts.length === 0) {
        setCsvParseError('No valid contact rows could be parsed.');
        return;
      }

      setContacts(prev => [...parsedContacts, ...prev]);
      setIsImportModalOpen(false);
      setCsvText('');
      triggerNotification(`Successfully imported ${parsedContacts.length} contacts!`);
    } catch (err) {
      setCsvParseError('Failed parsing CSV format. Please verify column dividers.');
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

      {/* 1. HEADER SECTION & CRM QUICK ACTIONS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#F3DEC8]/70 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FFF0E6] text-[#EA580C] border border-[#FAD8C7]">
              Unified Audience Hub
            </span>
            <span className="text-xs text-[#6B5E77] font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#EA580C]" /> Multi-Channel CRM
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1E122C] tracking-tight mt-1 flex items-center gap-2">
            <Users className="w-7 h-7 text-[#8C1F3D]" />
            Leads &amp; Audience CRM
          </h1>
          <p className="text-xs sm:text-sm text-[#6B5E77] font-medium mt-0.5">
            Unified contact hub across LinkedIn, Email Campaigns, WhatsApp chats, Meta Ads, and Website visitors.
          </p>
        </div>
        
        {/* Top Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* 1-Click Launch Campaign Buttons */}
          <button 
            onClick={() => handleLaunchEmailCampaign()}
            className="flex items-center gap-1.5 px-3.5 py-2.5 border border-[#FAD8C7] rounded-2xl bg-[#FFF4EE] text-xs font-black text-[#D94A2A] hover:bg-[#FFE9DE] transition-all cursor-pointer shadow-3xs"
            title="Create and send an email campaign to current filtered leads"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Launch Email</span>
          </button>

          <button 
            onClick={() => handleLaunchWhatsAppBroadcast()}
            className="flex items-center gap-1.5 px-3.5 py-2.5 border border-emerald-200 rounded-2xl bg-[#F4FDF8] text-xs font-black text-emerald-700 hover:bg-emerald-100/70 transition-all cursor-pointer shadow-3xs"
            title="Broadcast a WhatsApp template message to consented leads"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Broadcast</span>
          </button>

          <button 
            onClick={() => setIsImportModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2.5 border border-[#F3DEC8] rounded-2xl bg-white text-xs font-black text-[#1E122C] hover:bg-[#FFF8F5] transition-all cursor-pointer shadow-2xs"
          >
            <Upload className="w-3.5 h-3.5 text-[#D94A2A]" />
            <span>Import</span>
          </button>
          
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2.5 border border-[#F3DEC8] rounded-2xl bg-white text-xs font-black text-[#1E122C] hover:bg-[#FFF8F5] transition-all cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-[#4B1D6B]" />
            <span>Export CSV</span>
          </button>

          <button 
            onClick={() => { resetForm(); setIsAddModalOpen(true); }}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-[#2B0847] via-[#48115B] to-[#801B48] hover:from-[#360B5A] hover:via-[#591671] hover:to-[#962055] text-white text-xs font-black rounded-2xl transition-all cursor-pointer shadow-md hover:-translate-y-[1px]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* 2. CRM METRICS & INSIGHT STATS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <Card className="p-4 border border-[#F3DEC8] bg-white rounded-2xl shadow-3xs hover:border-[#D94A2A]/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-[#6B5E77] uppercase tracking-wider">Total CRM Leads</span>
            <div className="w-7 h-7 rounded-xl bg-[#FAF5F0] text-[#4B1D6B] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#1E122C]">{stats.total}</span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200">
              +{Math.round(stats.total * 0.14)} this wk
            </span>
          </div>
          <span className="text-[10px] text-[#6B5E77] font-semibold block mt-1">Across all connected channels</span>
        </Card>

        <Card className="p-4 border border-[#F3DEC8] bg-white rounded-2xl shadow-3xs hover:border-[#D94A2A]/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-[#6B5E77] uppercase tracking-wider">🔥 Hot Leads (80+)</span>
            <div className="w-7 h-7 rounded-xl bg-[#FFF1EB] text-[#D94A2A] flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#D94A2A]">{stats.hotLeads}</span>
            <span className="text-[10px] font-bold text-[#D94A2A] bg-[#FFF4EE] px-1.5 py-0.5 rounded-md border border-[#FAD8C7]">
              High Purchase Intent
            </span>
          </div>
          <span className="text-[10px] text-[#6B5E77] font-semibold block mt-1">Ready for direct nurture/sales outreach</span>
        </Card>

        <Card className="p-4 border border-[#F3DEC8] bg-white rounded-2xl shadow-3xs hover:border-[#D94A2A]/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-[#6B5E77] uppercase tracking-wider">💼 LinkedIn Prospects</span>
            <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-blue-700">{stats.linkedInLeads}</span>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded-md border border-blue-200">
              B2B Contacts
            </span>
          </div>
          <span className="text-[10px] text-[#6B5E77] font-semibold block mt-1">Founders, CEOs &amp; Decision Makers</span>
        </Card>

        <Card className="p-4 border border-[#F3DEC8] bg-white rounded-2xl shadow-3xs hover:border-[#D94A2A]/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-[#6B5E77] uppercase tracking-wider">⚡ Campaign Ready</span>
            <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <HeartHandshake className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-700">{stats.consented}</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200">
              {Math.round((stats.consented / (stats.total || 1)) * 100)}% Opt-in
            </span>
          </div>
          <span className="text-[10px] text-[#6B5E77] font-semibold block mt-1">Direct SMS, WhatsApp &amp; Email permission</span>
        </Card>
      </div>

      {/* 3. MULTI-SOURCE CHANNEL FILTER PILLS */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#6B5E77] flex items-center gap-1.5">
            <Filter className="w-3 h-3 text-[#D94A2A]" /> Filter by Acquisition Channel:
          </span>
          {selectedSource !== 'all' && (
            <button 
              onClick={() => setSelectedSource('all')}
              className="text-[10.5px] font-black text-[#D94A2A] hover:underline cursor-pointer"
            >
              Reset to All Channels
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
          {CHANNELS.map(ch => {
            const isSelected = selectedSource === ch.id;
            const Icon = ch.icon;
            const count = sourceCountMap[ch.id] || 0;

            return (
              <button
                key={ch.id}
                onClick={() => {
                  setSelectedSource(ch.id);
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap shadow-3xs ${
                  isSelected 
                    ? 'bg-gradient-to-r from-[#2B0847] via-[#48115B] to-[#801B48] text-white shadow-xs border border-[#4B1D6B]' 
                    : 'bg-white text-[#1E122C] border border-[#F3DEC8] hover:bg-[#FFF8F5] hover:border-[#D94A2A]/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#8C1F3D]'}`} />
                <span>{ch.label}</span>
                <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-[#FAF5F0] text-[#6B5E77] border border-[#F3DEC8]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. SAVED SEGMENTS BAR & SEGMENT BUILDER TRIGGER */}
      <Card className="p-4 border border-[#F3DEC8] bg-[#FFFDFB] rounded-[24px] shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F3DEC8]/60 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#F5EEFB] text-[#4B1D6B] flex items-center justify-center">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-black text-[#1E122C] tracking-tight">Audience Segments</span>
              <span className="text-[10px] text-[#6B5E77] font-semibold block">Target specific customer segments in campaigns</span>
            </div>
          </div>

          <button 
            onClick={() => setIsSegmentModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#D94A2A]/40 hover:border-[#D94A2A] text-[#D94A2A] text-xs font-black rounded-xl cursor-pointer hover:bg-[#FFF4EE] transition-all shadow-3xs self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Create Custom Segment</span>
          </button>
        </div>

        {/* Horizontal scrollable segment pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
          {segments.map(seg => {
            const isActive = activeSegmentId === seg.id;
            return (
              <div 
                key={seg.id}
                onClick={() => applySegmentFilters(seg)}
                className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold cursor-pointer transition-all whitespace-nowrap border ${
                  isActive 
                    ? 'bg-[#4B1D6B] text-white border-[#4B1D6B] shadow-xs' 
                    : 'bg-white text-[#6B5E77] border-[#F3DEC8] hover:text-[#1E122C] hover:border-[#4B1D6B]/40 hover:bg-[#FAF5F0]'
                }`}
                title={seg.description}
              >
                <span>{seg.name}</span>
                
                {!seg.isBuiltIn && (
                  <button 
                    onClick={(e) => handleDeleteCustomSegment(seg.id, e)}
                    className="p-0.5 hover:bg-rose-500 hover:text-white rounded text-white/70 ml-1 transition-colors"
                    title="Delete segment"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* 5. SEARCH & ADVANCED FILTER TOOLBAR */}
      <Card className="p-4 border border-[#F3DEC8] bg-white rounded-[24px] shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B5E77]" />
            <input 
              type="text"
              placeholder="Search leads by name, email, company, role, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-[#F3DEC8] rounded-2xl text-xs font-bold text-[#1E122C] placeholder-[#6B5E77]/60 bg-[#FAF5F0]/50 focus:outline-none focus:border-[#D94A2A] focus:ring-2 focus:ring-[#D94A2A]/10"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#6B5E77] hover:text-[#1E122C] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Action Filters Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Stage Filter */}
            <div className="flex items-center gap-1.5 border border-[#F3DEC8] bg-white rounded-2xl px-2.5 py-1.5 shadow-3xs">
              <span className="text-[9px] font-black text-[#6B5E77] uppercase tracking-wider leading-none">Stage:</span>
              <select 
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="text-xs font-black text-[#1E122C] bg-transparent border-0 focus:outline-none cursor-pointer"
              >
                <option value="all">All Stages</option>
                <option value="lead">Lead</option>
                <option value="mql">MQL</option>
                <option value="sql">SQL</option>
                <option value="customer">Customer</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div className="flex items-center gap-1.5 border border-[#F3DEC8] bg-white rounded-2xl px-2.5 py-1.5 shadow-3xs">
              <span className="text-[9px] font-black text-[#6B5E77] uppercase tracking-wider leading-none">Priority:</span>
              <select 
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="text-xs font-black text-[#1E122C] bg-transparent border-0 focus:outline-none cursor-pointer"
              >
                <option value="all">All Priorities</option>
                <option value="high">High (VIP)</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Score Range Filter */}
            <div className="flex items-center gap-1.5 border border-[#F3DEC8] bg-white rounded-2xl px-2.5 py-1.5 shadow-3xs">
              <span className="text-[9px] font-black text-[#6B5E77] uppercase tracking-wider leading-none">Score:</span>
              <select 
                value={selectedScoreRange}
                onChange={(e) => setSelectedScoreRange(e.target.value)}
                className="text-xs font-black text-[#1E122C] bg-transparent border-0 focus:outline-none cursor-pointer"
              >
                <option value="all">All Scores</option>
                <option value="high">Hot (80+)</option>
                <option value="medium">Warm (40-79)</option>
                <option value="low">Cold (&lt;40)</option>
              </select>
            </div>

            {/* Consent Toggle */}
            <button
              onClick={() => setSelectedConsentOnly(prev => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-extrabold border transition-all cursor-pointer shadow-3xs ${
                selectedConsentOnly 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                  : 'bg-white text-[#6B5E77] border-[#F3DEC8] hover:bg-[#FAF5F0]'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
              <span>Opt-in Only</span>
            </button>

            {/* Sorting */}
            <div className="flex items-center gap-1 border border-[#F3DEC8] bg-white rounded-2xl px-2.5 py-1.5 shadow-3xs">
              <span className="text-[9px] font-black text-[#6B5E77] uppercase tracking-wider leading-none">Sort:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-black text-[#1E122C] bg-transparent border-0 focus:outline-none cursor-pointer mr-0.5"
              >
                <option value="score">Lead Score</option>
                <option value="date">Date Added</option>
                <option value="name">Name</option>
              </select>
              <button 
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="p-1 hover:bg-[#FAF5F0] rounded-lg text-[#6B5E77] cursor-pointer"
                title={`Sort ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

        {/* Selected count info banner when results filtered */}
        <div className="flex flex-wrap items-center justify-between text-xs text-[#6B5E77] pt-1 border-t border-[#F3DEC8]/50">
          <div className="flex items-center gap-2">
            <span>Showing <strong className="text-[#1E122C]">{filteredContacts.length}</strong> matching contacts</span>
            {selectedIds.length > 0 && (
              <span className="font-bold text-[#D94A2A] bg-[#FFF4EE] border border-[#FAD8C7] px-2 py-0.5 rounded-full text-[10.5px]">
                {selectedIds.length} selected for campaign
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {selectedIds.length > 0 && (
              <button 
                onClick={() => setSelectedIds([])}
                className="text-[11px] font-bold text-[#6B5E77] hover:underline cursor-pointer"
              >
                Clear selection
              </button>
            )}
          </div>
        </div>
      </Card>

      {/* 6. MAIN CONTACTS LIST TABLE */}
      <Card className="border border-[#F3DEC8] bg-white rounded-[28px] shadow-sm overflow-hidden p-0 w-full max-w-full min-w-0">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse text-left text-xs font-bold">
            <thead>
              <tr className="bg-[#FFF8F5] border-b border-[#F3DEC8] text-[10px] font-black text-[#6B5E77] uppercase tracking-wider">
                <th className="px-4 py-4 w-12 text-center">
                  <input 
                    type="checkbox" 
                    checked={isAllSelectedOnPage}
                    onChange={handleSelectAllOnPage}
                    className="h-4 w-4 rounded border-[#F3DEC8] text-[#4B1D6B] focus:ring-[#4B1D6B]/50 cursor-pointer accent-[#4B1D6B]" 
                  />
                </th>
                <th className="px-5 py-4">Lead Profile &amp; Channel</th>
                <th className="px-5 py-4">Contact Coordinates</th>
                <th className="px-5 py-4">Company &amp; Role</th>
                <th className="px-5 py-4">Lifecycle Stage</th>
                <th className="px-5 py-4">AI Lead Score</th>
                <th className="px-5 py-4">Tags &amp; Segment</th>
                <th className="px-4 py-4 text-center">Campaign Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-[#F3DEC8]/70">
              {paginatedContacts.length > 0 ? (
                paginatedContacts.map((c) => {
                  const initials = c.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                  const isChecked = selectedIds.includes(c.id);

                  return (
                    <tr 
                      key={c.id} 
                      className={`hover:bg-[#FFF8F5]/60 transition-colors cursor-pointer group ${
                        isChecked ? 'bg-[#F5EEFB]/50' : ''
                      }`}
                      onClick={() => { setActiveContact(c); setContactDetailOpen(true); }}
                    >
                      {/* Checkbox select */}
                      <td className="px-4 py-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                        <input 
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleRowSelect(c.id)}
                          className="h-4 w-4 rounded border-[#F3DEC8] text-[#4B1D6B] focus:ring-[#4B1D6B]/50 cursor-pointer accent-[#4B1D6B]"
                        />
                      </td>

                      {/* Name Avatar + Source Badge */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-black shrink-0 shadow-3xs border ${
                            c.source === 'LinkedIn' 
                              ? 'bg-blue-50 border-blue-200 text-blue-700' 
                              : c.source === 'WhatsApp Chat'
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                              : 'bg-[#F5EEFB] border-[#E9D5F7] text-[#4B1D6B]'
                          }`}>
                            {initials}
                          </div>
                          <div>
                            <span className="font-black text-[#1E122C] text-sm leading-tight block group-hover:text-[#4B1D6B] transition-colors">
                              {c.name}
                            </span>
                            <div className="flex items-center gap-1 mt-1">
                              {getSourceIcon(c.source)}
                              <span className="text-[10px] text-[#6B5E77] font-bold leading-none">
                                {c.source}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Contact Info (Email + Phone) */}
                      <td className="px-5 py-3.5 font-semibold text-[#6B5E77]">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <Mail className="w-3 h-3 text-[#6B5E77]" />
                            <span className="text-[#1E122C] truncate max-w-[160px]">{c.email}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3 h-3 text-[#6B5E77]" />
                            <span className="text-[10.5px] font-black text-[#1E122C]">{c.phone}</span>
                          </div>
                        </div>
                      </td>

                      {/* Company & Role */}
                      <td className="px-5 py-3.5">
                        {c.company || c.jobTitle ? (
                          <div>
                            <span className="font-black text-[#1E122C] text-xs block leading-tight truncate max-w-[170px]">
                              {c.jobTitle || 'Executive'}
                            </span>
                            <span className="text-[10px] text-[#6B5E77] font-semibold block mt-1 flex items-center gap-1 truncate max-w-[170px]">
                              <Briefcase className="w-3 h-3 shrink-0" />
                              {c.company || 'Enterprise'}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[#6B5E77] text-[10px] font-semibold">D2C Customer</span>
                        )}
                      </td>

                      {/* Lifecycle & Status */}
                      <td className="px-5 py-3.5">
                        <div className="flex flex-col gap-1.5 items-start">
                          <span className={`px-2.5 py-0.5 text-[9.5px] font-black uppercase tracking-wider rounded-full border ${getStageColor(c.lifecycleStage)}`}>
                            {c.lifecycleStage}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black leading-none capitalize ${getStatusColor(c.leadStatus)}`}>
                            {c.leadStatus}
                          </span>
                        </div>
                      </td>

                      {/* AI Lead Score & Priority */}
                      <td className="px-5 py-3.5">
                        <div className="space-y-1.5 w-32">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-[#FAF5F0] border border-[#F3DEC8]/60 rounded-full h-1.5 overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-300 ${
                                  c.leadScore >= 80 
                                    ? 'bg-emerald-500' 
                                    : c.leadScore >= 40 
                                    ? 'bg-gradient-to-r from-[#4B1D6B] to-[#D94A2A]' 
                                    : 'bg-rose-500'
                                }`}
                                style={{ width: `${c.leadScore}%` }}
                              />
                            </div>
                            <span className={`text-[11px] font-black shrink-0 ${
                              c.leadScore >= 80 ? 'text-emerald-700' : c.leadScore >= 40 ? 'text-[#4B1D6B]' : 'text-rose-600'
                            }`}>
                              {c.leadScore}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1.5">
                            <span className={`inline-block px-2 py-0.5 rounded-full border text-[8.5px] font-black uppercase tracking-wider leading-none ${getPriorityColor(c.priority)}`}>
                              {c.priority}
                            </span>
                            {c.leadScore >= 80 && (
                              <span className="text-[8.5px] font-black text-[#D94A2A] bg-[#FFF4EE] px-1 py-0.5 rounded-md border border-[#FAD8C7] flex items-center gap-0.5">
                                <Flame className="w-2.5 h-2.5 text-[#D94A2A]" /> Hot
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Tags & Segment */}
                      <td className="px-5 py-3.5">
                        <div className="flex flex-col gap-1.5 min-w-[160px] max-w-[200px]">
                          {c.segment && (
                            <div className="flex items-center gap-1.5">
                              <span className="inline-flex items-center gap-1 bg-[#FFF4EE] border border-[#FAD8C7] text-[#D94A2A] text-[9.5px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-3xs truncate max-w-[160px]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D94A2A] shrink-0" />
                                <span>{c.segment}</span>
                              </span>
                            </div>
                          )}
                          <div className="flex items-center gap-1 flex-wrap">
                            {c.tags.slice(0, 2).map((tag, idx) => (
                              <span key={idx} className="bg-[#F5EEFB] border border-[#E9D5F7] text-[9px] font-semibold text-[#4B1D6B] px-1.5 py-0.5 rounded-md whitespace-nowrap">
                                {tag}
                              </span>
                            ))}
                            {c.tags.length > 2 && (
                              <span className="bg-white border border-[#F3DEC8] text-[#6B5E77] text-[8.5px] font-bold px-1.5 py-0.5 rounded-md shadow-3xs whitespace-nowrap" title={c.tags.slice(2).join(', ')}>
                                +{c.tags.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Row Campaign & Edit Action buttons */}
                      <td className="px-4 py-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1">
                          {/* Quick Email Launcher */}
                          <button 
                            onClick={() => handleLaunchEmailCampaign([c.id])}
                            className="p-1.5 hover:bg-[#FFF4EE] rounded-xl text-[#6B5E77] hover:text-[#D94A2A] cursor-pointer transition-colors"
                            title="Send Email Campaign to this contact"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </button>

                          {/* Quick WhatsApp Launcher */}
                          <button 
                            onClick={() => handleLaunchWhatsAppBroadcast([c.id])}
                            className="p-1.5 hover:bg-emerald-50 rounded-xl text-[#6B5E77] hover:text-emerald-700 cursor-pointer transition-colors"
                            title="Send WhatsApp Message"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>

                          {/* Edit Details */}
                          <button 
                            onClick={() => triggerEdit(c)}
                            className="p-1.5 hover:bg-[#FAF5F0] rounded-xl text-[#6B5E77] hover:text-[#1E122C] cursor-pointer transition-colors"
                            title="Edit Contact"
                          >
                            <UserPlus className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete */}
                          <button 
                            onClick={() => handleDeleteContact(c.id)}
                            className="p-1.5 hover:bg-rose-50 rounded-xl text-[#6B5E77] hover:text-rose-600 cursor-pointer transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-[#6B5E77] font-bold">
                    <div className="max-w-sm mx-auto space-y-2">
                      <Users className="w-8 h-8 text-[#6B5E77]/40 mx-auto" />
                      <p className="text-sm text-[#1E122C]">No contacts found matching current filter specifications.</p>
                      <button 
                        onClick={() => {
                          setSelectedSource('all');
                          setSelectedStage('all');
                          setSelectedPriority('all');
                          setSelectedScoreRange('all');
                          setSelectedConsentOnly(false);
                          setSearchQuery('');
                        }}
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

        {/* PAGINATION FOOTER PANEL */}
        <div className="px-6 py-4 bg-[#FAF5F0]/60 border-t border-[#F3DEC8] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3.5">
            <span className="text-xs font-bold text-[#6B5E77]">
              Showing <strong className="text-[#1E122C] font-black">{filteredContacts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</strong> to <strong className="text-[#1E122C] font-black">{Math.min(currentPage * itemsPerPage, filteredContacts.length)}</strong> of <strong className="text-[#1E122C] font-black">{filteredContacts.length}</strong> contacts
            </span>

            {/* Items Per Page Selector */}
            <div className="flex items-center gap-1.5 border border-[#F3DEC8] bg-white rounded-xl px-2.5 py-1 shadow-3xs">
              <span className="text-[10px] font-black text-[#6B5E77] uppercase tracking-wider">Per Page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="text-xs font-black text-[#1E122C] bg-transparent border-0 focus:outline-none cursor-pointer"
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Previous Page Button */}
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-[#F3DEC8] rounded-xl bg-white text-[#6B5E77] hover:bg-[#FFF8F5] hover:text-[#D94A2A] hover:border-[#D94A2A]/40 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-3xs flex items-center justify-center"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {/* Page Number Buttons */}
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`min-w-8 h-8 px-2.5 rounded-xl text-xs font-black border flex items-center justify-center cursor-pointer transition-all duration-200 ${
                  currentPage === idx + 1 
                    ? 'border-[#4B1D6B] bg-gradient-to-r from-[#2B0847] via-[#48115B] to-[#801B48] text-white shadow-xs' 
                    : 'border-[#F3DEC8] bg-white text-[#6B5E77] hover:bg-[#FFF8F5] hover:text-[#D94A2A] hover:border-[#D94A2A]/40'
                }`}
              >
                {idx + 1}
              </button>
            ))}

            {/* Next Page Button */}
            <button 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-[#F3DEC8] rounded-xl bg-white text-[#6B5E77] hover:bg-[#FFF8F5] hover:text-[#D94A2A] hover:border-[#D94A2A]/40 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-3xs flex items-center justify-center"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>

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
              
              {/* Drag and Drop Zone Simulator */}
              <div 
                className="border-2 border-dashed border-[#F3DEC8] rounded-2xl p-6 text-center hover:bg-[#FFF8F5] transition-colors cursor-pointer bg-[#FAF5F0]/50" 
                onClick={handleLoadImportTemplate}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FFF1EB] text-[#D94A2A] flex items-center justify-center mx-auto mb-2.5 shadow-2xs">
                  <Upload className="w-6 h-6" />
                </div>
                <span className="text-xs font-black text-[#1E122C] block">Click here to paste / load template CSV</span>
                <span className="text-[10px] text-[#6B5E77] font-bold block mt-1">Accepts Name, Email, Phone, Company, Role, Channel, Score, Consent, Tags</span>
              </div>

              {/* CSV Parsing Error */}
              {csvParseError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-xs font-semibold leading-relaxed">
                  {csvParseError}
                </div>
              )}

              {/* Text Area for copy paste csv */}
              <div className="space-y-1">
                <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Paste CSV Contents</label>
                <textarea 
                  rows={5}
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  className="w-full px-3.5 py-2 border border-[#F3DEC8] rounded-xl text-xs font-mono text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A]"
                  placeholder='Name,Email,Phone,Company,Job Title,Source,Lifecycle Stage,Lead Score&#10;"Aarav Sharma","aarav@example.com","9876543210","FinPulse","VP","LinkedIn","mql",85'
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-[#F3DEC8] flex justify-between items-center">
                <button 
                  type="button" 
                  onClick={handleLoadImportTemplate}
                  className="text-xs font-black text-[#D94A2A] hover:underline bg-transparent border-0 cursor-pointer"
                >
                  Load Sample Data
                </button>
                
                <div className="flex gap-2.5">
                  <button 
                    type="button" 
                    onClick={() => setIsImportModalOpen(false)}
                    className="px-4 py-2 border border-[#F3DEC8] hover:bg-[#FAF5F0] text-[#6B5E77] text-xs font-extrabold rounded-xl cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-[#2B0847] via-[#48115B] to-[#801B48] hover:opacity-95 text-white text-xs font-black rounded-xl shadow-xs cursor-pointer border-0 transition-opacity"
                  >
                    Import Contacts
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
