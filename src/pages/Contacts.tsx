import React, { useState, useMemo } from 'react';
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
  Target
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Contact } from '../types';

// Helper to generate seed data
const generateSeedContacts = (): Contact[] => {
  const sources = ['Website Form', 'WhatsApp Chat', 'CSV Import', 'Email Campaign', 'Direct Referral'];
  const stages: Contact['lifecycleStage'][] = ['lead', 'mql', 'sql', 'customer'];
  const statuses: Contact['leadStatus'][] = ['new', 'contacted', 'qualified', 'lost'];
  const priorities: Contact['priority'][] = ['high', 'medium', 'low'];
  const segments = ['D2C Shoppers', 'Premium Leads', 'Wholesale Inquiries', 'Subscribers', 'High Value'];
  const owners = ['AI Agent', 'Shristy Ranjan', 'Sales Bot', 'Self'];
  const cities = ['New Delhi', 'Mumbai', 'Bangalore', 'California', 'New York', 'London', 'Berlin'];
  
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

  const seed: Contact[] = [];

  // Generate 62 contacts to showcase pagination (50 per page, page 2 has 12)
  for (let i = 1; i <= 62; i++) {
    const isIndian = i % 2 === 0;
    const nameList = isIndian ? IndianNames : GlobalNames;
    const name = nameList[i % nameList.length] + ' ' + (isIndian ? `(${i})` : `[${i}]`);
    const email = name.toLowerCase().replace(/[^a-z0-9]/g, '') + `@example.com`;
    
    // Format Indian phones +91, Global as +1
    const phone = isIndian 
      ? `+91 98765 ${String(10000 + i).substring(1)}` 
      : `+1 555-01${String(100 + i).substring(1)}`;
      
    const company = i % 3 === 0 ? 'Bloom Boutique' : i % 5 === 0 ? 'Greenhouse Coffee' : `Company ${i}`;
    const jobTitle = i % 4 === 0 ? 'Marketing Director' : i % 7 === 0 ? 'Founder' : 'Purchasing Manager';
    const location = cities[i % cities.length];
    const source = sources[i % sources.length];
    const lifecycleStage = stages[i % stages.length];
    const leadStatus = statuses[i % statuses.length];
    const leadScore = Math.min(100, Math.max(10, Math.round(15 + (i * 1.35) % 85)));
    const priority = priorities[i % priorities.length];
    const segment = segments[i % segments.length];
    
    const tags = ['Delhi', 'minimalist', 'active'];
    if (leadScore > 75) tags.push('premium');
    if (lifecycleStage === 'customer') tags.push('buyer');
    if (i % 8 === 0) tags.push('demo completed');
    
    const owner = owners[i % owners.length];
    const consent = i % 5 !== 0; // 80% consent rate
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
  // Core contact list state
  const [contacts, setContacts] = useState<Contact[]>(() => generateSeedContacts());
  
  // Search, Filter, Sort, Pagination states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [selectedScoreRange, setSelectedScoreRange] = useState<string>('all');
  
  const [sortBy, setSortBy] = useState<'score' | 'date' | 'name'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // Selection states
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Modal & Drawer states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const [contactDetailOpen, setContactDetailOpen] = useState(false);

  // Form states for Add/Edit
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formJobTitle, setFormJobTitle] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formSource, setFormSource] = useState('Website Form');
  const [formStage, setFormStage] = useState<Contact['lifecycleStage']>('lead');
  const [formStatus, setFormStatus] = useState<Contact['leadStatus']>('new');
  const [formScore, setFormScore] = useState(50);
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
  // FILTERING, SORTING, PAGINATION LOGIC
  // ----------------------------------------------------
  
  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      // 1. Search Query
      const query = searchQuery.toLowerCase().trim();
      const matchSearch = !query || 
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.phone.replace(/\s+/g, '').includes(query);

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

      return matchSearch && matchStage && matchPriority && matchSource && matchScore;
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
  }, [contacts, searchQuery, selectedStage, selectedPriority, selectedSource, selectedScoreRange, sortBy, sortOrder]);

  const paginatedContacts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredContacts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredContacts, currentPage]);

  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage) || 1;

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedStage, selectedPriority, selectedSource, selectedScoreRange, itemsPerPage]);

  // ----------------------------------------------------
  // ACTION HANDLERS
  // ----------------------------------------------------

  const handleRowSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllOnPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pageIds = paginatedContacts.map(c => c.id);
    if (e.target.checked) {
      // Add all page IDs
      setSelectedIds(prev => Array.from(new Set([...prev, ...pageIds])));
    } else {
      // Remove all page IDs
      setSelectedIds(prev => prev.filter(id => !pageIds.includes(id)));
    }
  };

  const isAllSelectedOnPage = useMemo(() => {
    const pageIds = paginatedContacts.map(c => c.id);
    return pageIds.length > 0 && pageIds.every(id => selectedIds.includes(id));
  }, [paginatedContacts, selectedIds]);

  // Add Contact Form Submit
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) return;

    // Normalizations
    const normalizedEmail = formEmail.toLowerCase().trim();
    let formattedPhone = formPhone.trim();
    // Prepend +91 if length is 10 digits
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
      tags: formTags.split(',').map(t => t.trim()).filter(t => t !== ''),
      owner: formOwner.trim() || undefined,
      consent: formConsent,
      createdAt: new Date().toISOString()
    };

    setContacts(prev => [newContact, ...prev]);
    setIsAddModalOpen(false);
    resetForm();
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
      tags: formTags.split(',').map(t => t.trim()).filter(t => t !== ''),
      owner: formOwner.trim() || undefined,
      consent: formConsent
    };

    setContacts(prev => prev.map(c => c.id === activeContact.id ? updatedContact : c));
    
    // Sync active contact details drawer
    if (activeContact.id === activeContact?.id) {
      setActiveContact(updatedContact);
    }

    setIsEditModalOpen(false);
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
    }
  };

  const handleArchiveContact = (id: string) => {
    // Archives contact by moving its stage to inactive or updating tags
    setContacts(prev => prev.map(c => c.id === id ? { ...c, tags: Array.from(new Set([...c.tags, 'archived'])) } : c));
    alert('Contact marked as archived successfully!');
    if (activeContact?.id === id) {
      setContactDetailOpen(false);
    }
  };

  // ----------------------------------------------------
  // BULK ACTION HANDLERS
  // ----------------------------------------------------

  const handleBulkAddTags = () => {
    if (!bulkTagInput.trim() || selectedIds.length === 0) return;
    const newTags = bulkTagInput.split(',').map(t => t.trim()).filter(t => t !== '');
    
    setContacts(prev => prev.map(c => 
      selectedIds.includes(c.id) ? { ...c, tags: Array.from(new Set([...c.tags, ...newTags])) } : c
    ));
    setBulkTagInput('');
    alert(`Added tags to ${selectedIds.length} contacts!`);
  };

  const handleBulkAddSegment = () => {
    if (!bulkSegmentInput.trim() || selectedIds.length === 0) return;
    setContacts(prev => prev.map(c => 
      selectedIds.includes(c.id) ? { ...c, segment: bulkSegmentInput.trim() } : c
    ));
    setBulkSegmentInput('');
    alert(`Assigned segment to ${selectedIds.length} contacts!`);
  };

  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to delete the ${selectedIds.length} selected contacts?`)) {
      setContacts(prev => prev.filter(c => !selectedIds.includes(c.id)));
      setSelectedIds([]);
    }
  };

  const handleBulkArchive = () => {
    setContacts(prev => prev.map(c => 
      selectedIds.includes(c.id) ? { ...c, tags: Array.from(new Set([...c.tags, 'archived'])) } : c
    ));
    alert(`Archived ${selectedIds.length} contacts!`);
    setSelectedIds([]);
  };

  // ----------------------------------------------------
  // IMPORT & EXPORT HANDLERS
  // ----------------------------------------------------

  // Trigger export of currently filtered contacts list
  const handleExportCSV = () => {
    const headers = [
      'Name', 'Email', 'Phone', 'Company', 'Job Title', 'Location', 'Source', 
      'Lifecycle Stage', 'Lead Status', 'Lead Score', 'Priority', 'Segment', 'Tags', 'Owner', 'Consent', 'Created At'
    ];

    const rows = filteredContacts.map(c => [
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
    link.setAttribute('download', `contacts_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Simple CSV Import Parser
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

      // Parse headers
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/"/g, ''));
      const parsedContacts: Contact[] = [];

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Naive split by comma, respecting quotes
        const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
        const cells = matches ? matches.map(c => c.trim().replace(/^"|"$/g, '')) : line.split(',');

        if (cells.length < 2) continue;

        // Build data map
        const rowMap: Record<string, string> = {};
        headers.forEach((h, idx) => {
          if (idx < cells.length) {
            rowMap[h] = cells[idx];
          }
        });

        const name = rowMap['name'] || rowMap['first name'] || 'Imported Contact';
        const email = (rowMap['email'] || 'imported@example.com').toLowerCase().trim();
        let phone = rowMap['phone'] || '';
        if (/^\d{10}$/.test(phone)) {
          phone = `+91 ${phone.substring(0, 5)} ${phone.substring(5)}`;
        }

        const score = Number(rowMap['lead score'] || rowMap['score'] || 50);
        const stage = (rowMap['lifecycle stage'] || rowMap['stage'] || 'lead').toLowerCase();
        const status = (rowMap['lead status'] || rowMap['status'] || 'new').toLowerCase();
        const priority = (rowMap['priority'] || 'medium').toLowerCase();
        const tags = rowMap['tags'] ? rowMap['tags'].split(';').map(t => t.trim()) : ['imported'];

        parsedContacts.push({
          id: `c_csv_${Date.now()}_${i}`,
          name,
          email,
          phone,
          company: rowMap['company'] || undefined,
          jobTitle: rowMap['job title'] || rowMap['role'] || undefined,
          location: rowMap['location'] || rowMap['city'] || undefined,
          source: 'CSV Import',
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
      alert(`Successfully imported ${parsedContacts.length} contacts!`);
    } catch (err) {
      setCsvParseError('Failed parsing CSV format. Please verify column dividers.');
    }
  };

  const handleLoadImportTemplate = () => {
    const template = `Name,Email,Phone,Company,Job Title,Location,Lifecycle Stage,Lead Score,Priority,Consent,Tags\n"Vikram Sharma","vikram@example.com","9876543210","Alpha Tech","CEO","Mumbai","mql",85,"high","yes","premium;mumbai"\n"Sophia Loren","sophia@example.com","9999988888","GrowWise Retail","Designer","London","customer",90,"medium","yes","london;buyer"`;
    setCsvText(template);
  };

  const resetForm = () => {
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormCompany('');
    setFormJobTitle('');
    setFormLocation('');
    setFormSource('Website Form');
    setFormStage('lead');
    setFormStatus('new');
    setFormScore(50);
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

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12 text-left font-sans relative w-full max-w-full min-w-0">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#F3DEC8]/70 pb-5">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1E122C] tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-[#D94A2A]" />
            Contacts Database
          </h2>
          <p className="text-xs sm:text-sm text-[#6B5E77] font-medium mt-1">Manage leads, segment groups, and review AI customer scores</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2.5">
          <button 
            onClick={() => setIsImportModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2.5 border border-[#F3DEC8] rounded-2xl bg-white text-xs font-black text-[#1E122C] hover:bg-[#FFF8F5] transition-all cursor-pointer shadow-2xs"
          >
            <Upload className="w-3.5 h-3.5 text-[#D94A2A]" />
            <span>Import CSV</span>
          </button>
          
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3.5 py-2.5 border border-[#F3DEC8] rounded-2xl bg-white text-xs font-black text-[#1E122C] hover:bg-[#FFF8F5] transition-all cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-[#4B1D6B]" />
            <span>Export CSV</span>
          </button>

          <button 
            onClick={() => { resetForm(); setIsAddModalOpen(true); }}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#2B0847] via-[#48115B] to-[#801B48] hover:from-[#360B5A] hover:via-[#591671] hover:to-[#962055] text-white text-xs font-black rounded-2xl transition-all cursor-pointer shadow-md hover:-translate-y-[1px]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Contact</span>
          </button>
        </div>
      </div>

      {/* FILTER & SEARCH PANEL */}
      <Card className="p-4 border border-[#F3DEC8] bg-white rounded-[24px] shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B5E77]" />
            <input 
              type="text"
              placeholder="Search by name, email, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-[#F3DEC8] rounded-2xl text-xs font-bold text-[#1E122C] placeholder-[#6B5E77]/60 bg-[#FAF5F0]/50 focus:outline-none focus:border-[#D94A2A] focus:ring-2 focus:ring-[#D94A2A]/10"
            />
          </div>

          {/* Action Filters Toggle */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Stage Filter */}
            <div className="flex items-center gap-1.5 border border-[#F3DEC8] bg-white rounded-2xl px-3 py-2 shadow-2xs">
              <span className="text-[9.5px] font-black text-[#6B5E77] uppercase tracking-widest leading-none">Stage:</span>
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
            <div className="flex items-center gap-1.5 border border-[#F3DEC8] bg-white rounded-2xl px-3 py-2 shadow-2xs">
              <span className="text-[9.5px] font-black text-[#6B5E77] uppercase tracking-widest leading-none">Priority:</span>
              <select 
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="text-xs font-black text-[#1E122C] bg-transparent border-0 focus:outline-none cursor-pointer"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Score Range Filter */}
            <div className="flex items-center gap-1.5 border border-[#F3DEC8] bg-white rounded-2xl px-3 py-2 shadow-2xs">
              <span className="text-[9.5px] font-black text-[#6B5E77] uppercase tracking-widest leading-none">Score:</span>
              <select 
                value={selectedScoreRange}
                onChange={(e) => setSelectedScoreRange(e.target.value)}
                className="text-xs font-black text-[#1E122C] bg-transparent border-0 focus:outline-none cursor-pointer"
              >
                <option value="all">All Scores</option>
                <option value="high">High (80+)</option>
                <option value="medium">Medium (40-79)</option>
                <option value="low">Low (&lt;40)</option>
              </select>
            </div>

            {/* Source Filter */}
            <div className="flex items-center gap-1.5 border border-[#F3DEC8] bg-white rounded-2xl px-3 py-2 shadow-2xs">
              <span className="text-[9.5px] font-black text-[#6B5E77] uppercase tracking-widest leading-none">Source:</span>
              <select 
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="text-xs font-black text-[#1E122C] bg-transparent border-0 focus:outline-none cursor-pointer"
              >
                <option value="all">All Sources</option>
                <option value="Website Form">Website Form</option>
                <option value="WhatsApp Chat">WhatsApp Chat</option>
                <option value="CSV Import">CSV Import</option>
                <option value="Email Campaign">Email Campaign</option>
                <option value="Direct Referral">Direct Referral</option>
              </select>
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-1.5 border border-[#F3DEC8] bg-white rounded-2xl px-3 py-2 shadow-2xs">
              <span className="text-[9.5px] font-black text-[#6B5E77] uppercase tracking-widest leading-none">Sort:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-black text-[#1E122C] bg-transparent border-0 focus:outline-none cursor-pointer mr-1"
              >
                <option value="score">Lead Score</option>
                <option value="date">Date Created</option>
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
      </Card>

      {/* CONTACTS LIST TABLE */}
      <Card className="border border-[#F3DEC8] bg-white rounded-[28px] shadow-sm overflow-hidden p-0 w-full max-w-full min-w-0">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[960px] border-collapse text-left text-xs font-bold">
            <thead>
              <tr className="bg-[#FFF8F5] border-b border-[#F3DEC8] text-[10px] font-black text-[#6B5E77] uppercase tracking-wider">
                <th className="px-5 py-4 w-12 text-center">
                  <input 
                    type="checkbox"
                    checked={isAllSelectedOnPage}
                    onChange={handleSelectAllOnPage}
                    className="h-4 w-4 rounded border-[#F3DEC8] text-[#4B1D6B] focus:ring-[#4B1D6B]/50 cursor-pointer accent-[#4B1D6B]" 
                  />
                </th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Company & Role</th>
                <th className="px-6 py-4">Lifecycle / Status</th>
                <th className="px-6 py-4">Score & Priority</th>
                <th className="px-6 py-4">Tags & Segment</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-[#F3DEC8]/70">
              {paginatedContacts.length > 0 ? (
                paginatedContacts.map((c) => {
                  const initials = c.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                  
                  return (
                    <tr 
                      key={c.id} 
                      className={`hover:bg-[#FFF8F5]/60 transition-colors cursor-pointer group ${
                        selectedIds.includes(c.id) ? 'bg-[#F5EEFB]/50' : ''
                      }`}
                      onClick={() => { setActiveContact(c); setContactDetailOpen(true); }}
                    >
                      {/* Checkbox select */}
                      <td className="px-5 py-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                        <input 
                          type="checkbox"
                          checked={selectedIds.includes(c.id)}
                          onChange={() => handleRowSelect(c.id)}
                          className="h-4 w-4 rounded border-[#F3DEC8] text-[#4B1D6B] focus:ring-[#4B1D6B]/50 cursor-pointer accent-[#4B1D6B]"
                        />
                      </td>

                      {/* Name Avatar */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#F5EEFB] border border-[#E9D5F7] flex items-center justify-center text-[10px] font-black text-[#4B1D6B] shrink-0 shadow-3xs">
                            {initials}
                          </div>
                          <div>
                            <span className="font-black text-[#1E122C] text-sm leading-tight block group-hover:text-[#4B1D6B] transition-colors">{c.name}</span>
                            <span className="text-[10px] text-[#6B5E77] font-semibold leading-none block mt-1">{c.source}</span>
                          </div>
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="px-5 py-3.5 font-semibold text-[#6B5E77]">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <Mail className="w-3 h-3 text-[#6B5E77]" />
                            <span className="text-[#1E122C]">{c.email}</span>
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
                            <span className="font-black text-[#1E122C] text-xs block leading-tight">{c.jobTitle || 'No Title'}</span>
                            <span className="text-[10px] text-[#6B5E77] font-semibold block mt-1 flex items-center gap-1">
                              <Briefcase className="w-3 h-3" />
                              {c.company || 'D2C Retailer'}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[#6B5E77] text-[10px] font-semibold">D2C Shopper</span>
                        )}
                      </td>

                      {/* Lifecycle & Status */}
                      <td className="px-5 py-3.5">
                        <div className="flex flex-col gap-1.5 items-start">
                          <span className={`px-2.5 py-0.5 text-[9.5px] font-black uppercase tracking-wider rounded-full border ${getStageColor(c.lifecycleStage)}`}>
                            {c.lifecycleStage}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-black leading-none capitalize ${getStatusColor(c.leadStatus)}`}>
                            {c.leadStatus}
                          </span>
                        </div>
                      </td>

                      {/* Score & Priority */}
                      <td className="px-5 py-3.5">
                        <div className="space-y-1.5 w-32">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-[#FAF5F0] border border-[#F3DEC8]/60 rounded-full h-1.5 overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-300 ${c.leadScore >= 80 ? 'bg-emerald-500' : c.leadScore >= 40 ? 'bg-gradient-to-r from-[#4B1D6B] to-[#D94A2A]' : 'bg-rose-500'}`}
                                style={{ width: `${c.leadScore}%` }}
                              />
                            </div>
                            <span className={`text-[11px] font-black shrink-0 ${c.leadScore >= 80 ? 'text-emerald-700' : c.leadScore >= 40 ? 'text-[#4B1D6B]' : 'text-rose-600'}`}>
                              {c.leadScore}
                            </span>
                          </div>
                          <span className={`inline-block px-2 py-0.5 rounded-full border text-[8.5px] font-black uppercase tracking-wider leading-none ${getPriorityColor(c.priority)}`}>
                            {c.priority}
                          </span>
                        </div>
                      </td>

                      {/* Tags & Segment */}
                      <td className="px-5 py-3.5">
                        <div className="flex flex-col gap-1.5 min-w-[170px] max-w-[210px]">
                          {c.segment && (
                            <div className="flex items-center gap-1.5">
                              <span className="inline-flex items-center gap-1 bg-[#FFF4EE] border border-[#FAD8C7] text-[#D94A2A] text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-3xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D94A2A] shrink-0" />
                                <span>{c.segment}</span>
                              </span>
                            </div>
                          )}
                          <div className="flex items-center gap-1 flex-wrap">
                            {c.tags.slice(0, 2).map((tag, idx) => (
                              <span key={idx} className="bg-[#F5EEFB] border border-[#E9D5F7] text-[9.5px] font-semibold text-[#4B1D6B] px-1.5 py-0.5 rounded-md whitespace-nowrap">
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

                      {/* Row Action buttons */}
                      <td className="px-5 py-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1">
                          <button 
                            onClick={() => triggerEdit(c)}
                            className="p-1.5 hover:bg-[#FAF5F0] rounded-xl text-[#6B5E77] hover:text-[#1E122C] cursor-pointer"
                            title="Edit Contact"
                          >
                            <UserPlus className="w-3.5 h-3.5" />
                          </button>
                          
                          <button 
                            onClick={() => handleArchiveContact(c.id)}
                            className="p-1.5 hover:bg-[#FAF5F0] rounded-xl text-[#6B5E77] hover:text-amber-700 cursor-pointer"
                            title="Archive"
                          >
                            <Archive className="w-3.5 h-3.5" />
                          </button>

                          <button 
                            onClick={() => handleDeleteContact(c.id)}
                            className="p-1.5 hover:bg-rose-50 rounded-xl text-[#6B5E77] hover:text-rose-600 cursor-pointer"
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
                    No contacts found matching active filter specifications.
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
              className="p-2 border border-[#F3DEC8] rounded-xl bg-white text-[#6B5E77] hover:bg-[#FFF8F5] hover:text-[#D94A2A] hover:border-[#D94A2A]/40 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#6B5E77] disabled:hover:border-[#F3DEC8] shadow-3xs flex items-center justify-center"
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
              className="p-2 border border-[#F3DEC8] rounded-xl bg-white text-[#6B5E77] hover:bg-[#FFF8F5] hover:text-[#D94A2A] hover:border-[#D94A2A]/40 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#6B5E77] disabled:hover:border-[#F3DEC8] shadow-3xs flex items-center justify-center"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>

      {/* FLOATING BULK ACTIONS BAR */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 bg-[#1E122C] text-white rounded-2xl px-6 py-4 shadow-2xl flex flex-wrap items-center gap-6 border border-[#3D2556] animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#D94A2A] flex items-center justify-center text-[10px] font-black text-white">
              {selectedIds.length}
            </div>
            <span className="text-xs font-bold text-white/90">Contacts Selected</span>
          </div>

          <div className="h-6 w-px bg-white/10" />

          {/* Bulk Tag Inputs */}
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Tag (e.g. Delhi, VIP)"
              value={bulkTagInput}
              onChange={(e) => setBulkTagInput(e.target.value)}
              className="bg-[#2B1B3E] border border-[#4B2F68] text-xs font-bold px-3 py-1.5 rounded-xl text-white placeholder-white/40 w-36 focus:outline-none focus:border-[#D94A2A]"
            />
            <button 
              onClick={handleBulkAddTags}
              className="bg-[#D94A2A] hover:bg-[#C23B1D] text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-xl cursor-pointer transition-colors shadow-xs"
            >
              Apply Tag
            </button>
          </div>

          {/* Bulk Segment Input */}
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Assign Segment"
              value={bulkSegmentInput}
              onChange={(e) => setBulkSegmentInput(e.target.value)}
              className="bg-[#2B1B3E] border border-[#4B2F68] text-xs font-bold px-3 py-1.5 rounded-xl text-white placeholder-white/40 w-36 focus:outline-none focus:border-[#D94A2A]"
            />
            <button 
              onClick={handleBulkAddSegment}
              className="bg-[#D94A2A] hover:bg-[#C23B1D] text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-xl cursor-pointer transition-colors shadow-xs"
            >
              Assign
            </button>
          </div>

          <div className="h-6 w-px bg-white/10" />

          <div className="flex items-center gap-2">
            <button 
              onClick={handleBulkArchive}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-white/15 hover:border-white/30 bg-[#2B1B3E] rounded-xl text-xs font-bold text-white/80 hover:text-white cursor-pointer transition-colors"
            >
              <Archive className="w-3.5 h-3.5" />
              <span>Archive</span>
            </button>

            <button 
              onClick={handleBulkDelete}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
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

      {/* 1. SLIDING PROFILE DETAILS DRAWER */}
      {contactDetailOpen && activeContact && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-[#1E122C]/40 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
            onClick={() => setContactDetailOpen(false)}
          />
          
          {/* Drawer container rigidly pinned to right edge from top to bottom */}
          <div className="fixed right-0 top-0 bottom-0 h-full max-h-screen w-full sm:w-[480px] max-w-[100vw] bg-[#FAF5F0] shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300 border-l border-[#F3DEC8] overflow-hidden">
            
            {/* 1. Sticky Header */}
            <div className="h-16 px-5 sm:px-6 border-b border-[#F3DEC8] flex items-center justify-between bg-white shrink-0 shadow-2xs z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D94A2A] animate-pulse" />
                <span className="text-xs font-black text-[#1E122C] uppercase tracking-wider">
                  Contact Profile Detail
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

            {/* 2. Scrollable Body */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-4">
              
              {/* Avatar Summary Header Card */}
              <div className="bg-white border border-[#F3DEC8] p-5 rounded-2xl text-center space-y-2.5 shadow-2xs">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#2B0847] via-[#48115B] to-[#801B48] text-white flex items-center justify-center text-xl font-black mx-auto shadow-md ring-4 ring-[#FAF5F0]">
                  {activeContact.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#1E122C] leading-tight">{activeContact.name}</h3>
                  <p className="text-xs font-bold text-[#6B5E77] mt-0.5">
                    {activeContact.jobTitle || 'Customer'} {activeContact.company ? `• ${activeContact.company}` : ''}
                  </p>
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
                  Contact Attributes
                </span>

                <div className="grid grid-cols-2 gap-2.5">
                  
                  {/* Lead Score Card */}
                  <div className="bg-white border border-[#F3DEC8] rounded-xl p-3 shadow-3xs">
                    <span className="text-[8.5px] font-black text-[#6B5E77] uppercase block">Lead score (0-100)</span>
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
                    <span className="text-[8.5px] font-black text-[#6B5E77] uppercase block">Source channel</span>
                    <span className="text-xs font-bold text-[#1E122C] block mt-1 truncate">{activeContact.source}</span>
                  </div>

                  {/* Lead Status Card */}
                  <div className="bg-white border border-[#F3DEC8] rounded-xl p-3 shadow-3xs">
                    <span className="text-[8.5px] font-black text-[#6B5E77] uppercase block">Lead Status</span>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-black capitalize mt-1 ${getStatusColor(activeContact.leadStatus)}`}>
                      {activeContact.leadStatus}
                    </span>
                  </div>

                  {/* Assigned Owner Card */}
                  <div className="bg-white border border-[#F3DEC8] rounded-xl p-3 shadow-3xs">
                    <span className="text-[8.5px] font-black text-[#6B5E77] uppercase block">Assigned Owner</span>
                    <span className="text-xs font-bold text-[#1E122C] block mt-1 truncate">{activeContact.owner || 'AI Agent'}</span>
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
                        <span className="text-[9px] text-[#6B5E77] font-semibold block mt-0.5">Permission to send SMS/WhatsApp</span>
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

            {/* 3. Sticky Bottom Footer Controls */}
            <div className="p-4 sm:px-5 sm:py-4 border-t border-[#F3DEC8] bg-white flex items-center gap-2.5 shrink-0 shadow-[0_-4px_20px_rgba(75,29,107,0.08)] z-20">
              <button 
                onClick={() => { setContactDetailOpen(false); triggerEdit(activeContact); }}
                className="flex-1 h-11 bg-gradient-to-r from-[#2B0847] via-[#48115B] to-[#801B48] hover:opacity-95 text-white text-xs font-black rounded-xl shadow-xs cursor-pointer border-0 transition-opacity flex items-center justify-center gap-2 px-4"
              >
                <span>Edit Details</span>
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

      {/* 2. ADD CONTACT MODAL FORM */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#1E122C]/40 backdrop-blur-xs" onClick={() => setIsAddModalOpen(false)} />
          
          <Card className="relative bg-white rounded-[28px] max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[#F3DEC8] z-10 space-y-4">
            <div className="flex items-center justify-between border-b border-[#F3DEC8] pb-3.5">
              <h3 className="text-base font-black text-[#1E122C] flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#FFF1EB] text-[#D94A2A] flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                Manually Add New Contact
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 hover:bg-[#FAF5F0] rounded-xl text-[#6B5E77] cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-left">
              
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
                    placeholder="e.g. John Doe"
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
                    placeholder="e.g. john@example.com"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Phone (e.g. +91 9876543210)</label>
                  <input 
                    type="text" 
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full px-3.5 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A] transition-all"
                    placeholder="e.g. 9876543210"
                  />
                </div>

                {/* Location */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Location (City, State)</label>
                  <input 
                    type="text" 
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    className="w-full px-3.5 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A] transition-all"
                    placeholder="e.g. New Delhi"
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
                    placeholder="e.g. Acme Corp"
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
                    placeholder="e.g. Purchasing Lead"
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

                {/* Source Selection */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Acquisition Source</label>
                  <select 
                    value={formSource}
                    onChange={(e) => setFormSource(e.target.value)}
                    className="w-full px-3 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A] cursor-pointer"
                  >
                    <option value="Website Form">Website Form</option>
                    <option value="WhatsApp Chat">WhatsApp Chat</option>
                    <option value="CSV Import">CSV Import</option>
                    <option value="Email Campaign">Email Campaign</option>
                    <option value="Direct Referral">Direct Referral</option>
                  </select>
                </div>

                {/* Assigned Owner */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Assigned Lead Owner</label>
                  <input 
                    type="text" 
                    value={formOwner}
                    onChange={(e) => setFormOwner(e.target.value)}
                    className="w-full px-3.5 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A]"
                  />
                </div>

                {/* Segment Name */}
                <div className="col-span-1 sm:col-span-2 space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Segment Group</label>
                  <input 
                    type="text" 
                    value={formSegment}
                    onChange={(e) => setFormSegment(e.target.value)}
                    className="w-full px-3.5 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A]"
                    placeholder="e.g. VIP Buyers, Wholesale Clients"
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
                    placeholder="e.g. Delhi, newsletter, premium"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="col-span-1 sm:col-span-2 flex items-start gap-2.5 pt-2">
                  <input 
                    type="checkbox" 
                    id="add_consent"
                    checked={formConsent}
                    onChange={(e) => setFormConsent(e.target.checked)}
                    className="h-4 w-4 rounded border-[#F3DEC8] text-[#D94A2A] focus:ring-[#D94A2A]/30 mt-0.5 cursor-pointer"
                  />
                  <label htmlFor="add_consent" className="text-xs font-bold text-[#1E122C] cursor-pointer select-none">
                    Consent Granted (Permission to send SMS, WhatsApp & Email updates)
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

      {/* 3. EDIT CONTACT MODAL FORM */}
      {isEditModalOpen && activeContact && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#1E122C]/40 backdrop-blur-xs" onClick={() => setIsEditModalOpen(false)} />
          
          <Card className="relative bg-white rounded-[28px] max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[#F3DEC8] z-10 space-y-4">
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

            <form onSubmit={handleEditSubmit} className="space-y-4 text-left">
              
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

                {/* Source Selection */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Acquisition Source</label>
                  <select 
                    value={formSource}
                    onChange={(e) => setFormSource(e.target.value)}
                    className="w-full px-3 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A] cursor-pointer"
                  >
                    <option value="Website Form">Website Form</option>
                    <option value="WhatsApp Chat">WhatsApp Chat</option>
                    <option value="CSV Import">CSV Import</option>
                    <option value="Email Campaign">Email Campaign</option>
                    <option value="Direct Referral">Direct Referral</option>
                  </select>
                </div>

                {/* Assigned Owner */}
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Assigned Lead Owner</label>
                  <input 
                    type="text" 
                    value={formOwner}
                    onChange={(e) => setFormOwner(e.target.value)}
                    className="w-full px-3.5 py-2 border border-[#F3DEC8] rounded-xl text-xs font-bold text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A]"
                  />
                </div>

                {/* Segment Name */}
                <div className="col-span-1 sm:col-span-2 space-y-1">
                  <label className="text-[9px] font-black text-[#6B5E77] uppercase tracking-widest block">Segment Group</label>
                  <input 
                    type="text" 
                    value={formSegment}
                    onChange={(e) => setFormSegment(e.target.value)}
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
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="col-span-1 sm:col-span-2 flex items-start gap-2.5 pt-2">
                  <input 
                    type="checkbox" 
                    id="edit_consent"
                    checked={formConsent}
                    onChange={(e) => setFormConsent(e.target.checked)}
                    className="h-4 w-4 rounded border-[#F3DEC8] text-[#D94A2A] focus:ring-[#D94A2A]/30 mt-0.5 cursor-pointer"
                  />
                  <label htmlFor="edit_consent" className="text-xs font-bold text-[#1E122C] cursor-pointer select-none">
                    Consent Granted (Permission to send SMS, WhatsApp & Email updates)
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

      {/* 4. CSV IMPORT DRAG-DROP SIMULATION MODAL */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#1E122C]/40 backdrop-blur-xs" onClick={() => setIsImportModalOpen(false)} />
          
          <Card className="relative bg-white rounded-[28px] max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[#F3DEC8] z-10 space-y-4">
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

            <form onSubmit={handleImportCSV} className="space-y-4 text-left">
              
              {/* Drag and Drop Zone Simulator */}
              <div className="border-2 border-dashed border-[#F3DEC8] rounded-2xl p-6 text-center hover:bg-[#FFF8F5] transition-colors cursor-pointer bg-[#FAF5F0]/50" onClick={handleLoadImportTemplate}>
                <div className="w-12 h-12 rounded-2xl bg-[#FFF1EB] text-[#D94A2A] flex items-center justify-center mx-auto mb-2.5 shadow-2xs">
                  <Upload className="w-6 h-6" />
                </div>
                <span className="text-xs font-black text-[#1E122C] block">Click here to paste / load template CSV</span>
                <span className="text-[10px] text-[#6B5E77] font-bold block mt-1">Accepts Name, Email, Phone, Company, Role, Lifecycle, Score, Priority, Consent, Tags</span>
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
                  rows={6}
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  className="w-full px-3.5 py-2 border border-[#F3DEC8] rounded-xl text-xs font-mono text-[#1E122C] bg-[#FAF5F0]/40 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A]"
                  placeholder='Name,Email,Phone,Lifecycle Stage,Lead Score&#10;"Amit Kumar","amit@gmail.com","9988776655","lead",80&#10;"Priya Patel","priya@gmail.com","9876543210","customer",95'
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-[#F3DEC8] flex justify-between items-center">
                <button 
                  type="button" 
                  onClick={handleLoadImportTemplate}
                  className="text-xs font-black text-[#D94A2A] hover:underline bg-transparent border-0 cursor-pointer"
                >
                  Load Sample Data Template
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
