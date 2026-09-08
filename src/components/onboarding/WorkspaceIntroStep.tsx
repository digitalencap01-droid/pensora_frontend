import React, { useState } from 'react';
import { ArrowRight, ShoppingBag, Coffee, ChevronDown } from 'lucide-react';

interface WorkspaceIntroStepProps {
  initialName: string;
  initialWebsite: string;
  initialDescription: string;
  onContinue: (
    name: string, 
    url: string, 
    description: string, 
    category: string, 
    teamSize: string
  ) => void;
}

export const WorkspaceIntroStep: React.FC<WorkspaceIntroStepProps> = ({
  initialName,
  initialWebsite,
  initialDescription,
  onContinue
}) => {
  const [name, setName] = useState(initialName || '');
  const [url, setUrl] = useState(initialWebsite || '');
  const [description, setDescription] = useState(initialDescription || '');
  const [category, setCategory] = useState('E-commerce / Retail');
  const [teamSize, setTeamSize] = useState('2 - 10 Members');
  const [selectedTemplate, setSelectedTemplate] = useState<'bloom' | 'coffee' | ''>('');
  const [error, setError] = useState('');

  const selectPreset = (
    type: 'bloom' | 'coffee',
    businessName: string,
    domain: string,
    desc: string,
    cat: string,
    team: string
  ) => {
    setSelectedTemplate(type);
    setName(businessName);
    setUrl(`https://${domain}`);
    setDescription(desc);
    setCategory(cat);
    setTeamSize(team);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter a business or workspace name');
      return;
    }
    
    if (url.trim()) {
      const hasPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i.test(url);
      if (!hasPattern) {
        setError('Please enter a valid website URL (e.g., myshop.com)');
        return;
      }
    }

    setError('');
    onContinue(name, url, description, category, teamSize);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left animate-in fade-in slide-in-from-bottom-2 duration-300">
      
      {/* Title block */}
      <div className="space-y-1.5">
        <h2 className="text-2xl font-extrabold text-[#151A1F] tracking-tight leading-tight">
          Great! Let's get started
        </h2>
        <p className="text-[12px] text-slate-500 font-semibold leading-relaxed">
          Enter your business details to personalize your experience.
        </p>
      </div>

      <div className="space-y-5">
        
        {/* Row 1: Workspace Name & Website */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Business / Workspace Name
            </label>
            <input
              type="text"
              placeholder="e.g. Bloom Boutique"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-[#5C4DF7] bg-white text-slate-800 font-semibold transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Website URL (Optional)
            </label>
            <input
              type="text"
              placeholder="https://bloomboutique.shop"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setError(''); }}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-[#5C4DF7] bg-white text-slate-800 font-semibold transition-all"
            />
          </div>
        </div>

        {/* Row 2: Category & Team Size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Business Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-xs focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-[#5C4DF7] bg-white text-slate-800 font-semibold transition-all appearance-none cursor-pointer"
              >
                <option value="E-commerce / Retail">E-commerce / Retail</option>
                <option value="Tech / SaaS">Tech / SaaS</option>
                <option value="Professional Services">Professional Services</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Hospitality / Food">Hospitality / Food</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Creative / Agency">Creative / Agency</option>
                <option value="Other">Other</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Team Size
            </label>
            <div className="relative">
              <select
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-xs focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-[#5C4DF7] bg-white text-slate-800 font-semibold transition-all appearance-none cursor-pointer"
              >
                <option value="1 Member (Solo)">1 Member (Solo)</option>
                <option value="2 - 10 Members">2 - 10 Members</option>
                <option value="11 - 50 Members">11 - 50 Members</option>
                <option value="50+ Members">50+ Members</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Short Description */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
            Short Description
          </label>
          <textarea
            placeholder="Handcrafted eco-friendly clothing for minimalist wardrobes."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2.5}
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-[#5C4DF7] bg-white text-slate-800 font-semibold transition-all resize-none leading-relaxed"
          />
        </div>

        {/* Starter Presets */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Choose a Starter Template (Optional)
            </span>
            <span className="text-[10px] font-bold text-[#5C4DF7] cursor-pointer hover:underline">
              View all templates →
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Bloom Boutique Card */}
            <div
              onClick={() => selectPreset(
                'bloom',
                'Bloom Boutique',
                'bloomboutique.shop',
                'Handcrafted eco-friendly clothing for minimalist wardrobes.',
                'E-commerce / Retail',
                '2 - 10 Members'
              )}
              className={`p-4 border rounded-2xl flex items-start gap-3 cursor-pointer transition-all duration-300 hover:shadow-xs ${
                selectedTemplate === 'bloom'
                  ? 'border-[#5C4DF7] bg-[#5C4DF7]/3 shadow-[0_2px_12px_rgba(92,77,247,0.04)]'
                  : 'border-slate-150 bg-white hover:border-slate-250'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 text-slate-700">
                <ShoppingBag className="w-4.5 h-4.5" />
              </div>
              <div className="text-left space-y-0.5 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h4 className="text-[11px] font-extrabold text-slate-800 leading-tight">Bloom Boutique</h4>
                  <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-[#5C4DF7] uppercase tracking-wider shrink-0">
                    Recommended
                  </span>
                </div>
                <p className="text-[9px] text-slate-400 font-semibold leading-normal">
                  Perfect for sustainable fashion and lifestyle brands.
                </p>
              </div>
            </div>

            {/* Greenhouse Coffee Card */}
            <div
              onClick={() => selectPreset(
                'coffee',
                'Greenhouse Coffee',
                'greenhousecoffee.com',
                'Specialty organic coffee beans, directly sourced and micro-roasted.',
                'Hospitality / Food',
                '2 - 10 Members'
              )}
              className={`p-4 border rounded-2xl flex items-start gap-3 cursor-pointer transition-all duration-300 hover:shadow-xs ${
                selectedTemplate === 'coffee'
                  ? 'border-[#5C4DF7] bg-[#5C4DF7]/3 shadow-[0_2px_12px_rgba(92,77,247,0.04)]'
                  : 'border-slate-150 bg-white hover:border-slate-250'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 text-slate-700">
                <Coffee className="w-4.5 h-4.5" />
              </div>
              <div className="text-left space-y-0.5 min-w-0">
                <h4 className="text-[11px] font-extrabold text-slate-800 leading-tight">Greenhouse Coffee</h4>
                <p className="text-[9px] text-slate-400 font-semibold leading-normal">
                  Ideal for cafés and specialty coffee businesses.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {error && (
        <p className="text-xs text-red-500 font-bold text-center mt-2">{error}</p>
      )}

      {/* Mockup Bottom Navigation Bar */}
      <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-6 mb-6">
        {/* Back Button (Disabled on step 1) */}
        <button
          type="button"
          disabled
          className="px-5 py-2 border border-slate-200 rounded-full text-xs font-bold text-slate-450 bg-slate-50 cursor-not-allowed transition-all duration-200"
        >
          Back
        </button>

        {/* Center Progress Bar */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-slate-450 font-bold">Step 1 of 5</span>
          <div className="w-[100px] bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#5C4DF7] h-full rounded-full transition-all duration-500" style={{ width: '20%' }} />
          </div>
        </div>

        {/* Continue Button */}
        <button
          type="submit"
          className="inline-flex items-center gap-1 px-5 py-2.5 bg-[#5C4DF7] hover:bg-[#4b3ce3] text-white font-extrabold text-xs rounded-full transition-all duration-200 hover:-translate-y-[1.5px] cursor-pointer shadow-xs active:translate-y-0"
        >
          <span>Continue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </form>
  );
};

export default WorkspaceIntroStep;
