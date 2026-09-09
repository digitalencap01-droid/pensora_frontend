import React, { useState } from 'react';
import { Briefcase, Settings as SettingsIcon, Link, ShieldCheck, Check, Sparkles, RefreshCw } from 'lucide-react';
import { useMarketing } from '../context/MarketingContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const Settings: React.FC = () => {
  const { 
    business, 
    setBusiness, 
    connections, 
    toggleConnection,
    resetOnboarding
  } = useMarketing();

  const [name, setName] = useState(business?.name || '');
  const [desc, setDesc] = useState(business?.description || '');
  const [location, setLocation] = useState(business?.location || '');
  const [website, setWebsite] = useState(business?.website || '');
  const [industry, setIndustry] = useState(business?.industry || '');
  const [stage, setStage] = useState(business?.stage || '');
  const [goal, setGoal] = useState(business?.growthGoal || '');
  const [tone, setTone] = useState(business?.toneOfVoice || 'friendly');
  const [targetMarket, setTargetMarket] = useState(business?.targetMarket || '');
  const [productsServices, setProductsServices] = useState(business?.productsServices?.join(', ') || business?.services?.join(', ') || '');
  const [targetAudienceType, setTargetAudienceType] = useState(business?.targetAudienceType || 'B2C');
  const [targetAudienceDesc, setTargetAudienceDesc] = useState(business?.targetAudienceDesc || '');
  const [channels, setChannels] = useState<string[]>(business?.channels || []);
  const [aiSummary, setAiSummary] = useState(business?.aiSummary || '');
  const [recommendedFirstAction, setRecommendedFirstAction] = useState(business?.recommendedFirstAction || '');
  
  const [saved, setSaved] = useState(false);

  // Sync state reactively when workspace switches
  React.useEffect(() => {
    setName(business?.name || '');
    setDesc(business?.description || '');
    setLocation(business?.location || '');
    setWebsite(business?.website || '');
    setIndustry(business?.industry || '');
    setStage(business?.stage || '');
    setGoal(business?.growthGoal || '');
    setTone(business?.toneOfVoice || 'friendly');
    setTargetMarket(business?.targetMarket || '');
    setProductsServices(business?.productsServices?.join(', ') || business?.services?.join(', ') || '');
    setTargetAudienceType(business?.targetAudienceType || 'B2C');
    setTargetAudienceDesc(business?.targetAudienceDesc || '');
    setChannels(business?.channels || []);
    setAiSummary(business?.aiSummary || '');
    setRecommendedFirstAction(business?.recommendedFirstAction || '');
  }, [business]);

  // AI Autonomy States mapping
  const [autonomy, setAutonomy] = useState<Record<string, 'recommend' | 'approval_required' | 'automatic'>>({
    social: 'automatic',
    blog: 'approval_required',
    budget: 'approval_required'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (business) {
      const splitProducts = productsServices.split(',').map(s => s.trim()).filter(s => s !== '');
      setBusiness({
        ...business,
        name,
        description: desc,
        location,
        website,
        industry,
        stage: stage as any,
        growthGoal: goal as any,
        toneOfVoice: tone as any,
        targetMarket,
        productsServices: splitProducts,
        services: splitProducts,
        targetAudienceType: targetAudienceType as any,
        targetAudienceDesc,
        channels,
        aiSummary,
        recommendedFirstAction
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleAutonomyChange = (task: string, state: 'recommend' | 'approval_required' | 'automatic') => {
    setAutonomy(prev => ({ ...prev, [task]: state }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-[#1E122C] tracking-tight">Settings</h1>
        <p className="text-xs sm:text-sm text-[#6B5E77] font-medium">Manage your business profile, connected platforms, and AI manager permissions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Profile & Autonomy (takes 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Business Profile card */}
          <Card className="border-[#F3DEC8] bg-white">
            <h3 className="text-xs font-black text-[#1E122C] uppercase tracking-wider mb-5 flex items-center gap-2">
              <Briefcase className="w-4.5 h-4.5 text-[#D94A2A]" />
              Business Profile
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-medium text-[#6B5E77]">
              {saved && (
                <div className="p-3 bg-[#F4FDF8] border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-2 font-black animate-pulse">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              {/* Profile Scores visual widgets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FFF8F5] border border-[#F3DEC8] rounded-2xl p-4 mb-4 text-left">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-black text-[#6B5E77] uppercase tracking-wider">
                    <span>Profile Completion</span>
                    <span className="text-[#4B1D6B] font-black">{business?.profileCompletion || 100}%</span>
                  </div>
                  <div className="w-full bg-[#FAF5F0] border border-[#F3DEC8]/60 rounded-full h-2 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#4B1D6B] to-[#D94A2A]" style={{ width: `${business?.profileCompletion || 100}%` }} />
                  </div>
                  <p className="text-[9.5px] text-[#6B5E77] font-semibold">Measures required profile setup completeness</p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-black text-[#6B5E77] uppercase tracking-wider">
                    <span>Business Readiness Score</span>
                    <span className="text-emerald-700 font-black">{business?.readinessScore || 85}%</span>
                  </div>
                  <div className="w-full bg-[#FAF5F0] border border-[#F3DEC8]/60 rounded-full h-2 overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-600" style={{ width: `${business?.readinessScore || 85}%` }} />
                  </div>
                  <p className="text-[9.5px] text-[#6B5E77] font-semibold">Measures overall readiness to launch campaigns</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div>
                  <label className="block text-[10px] font-black text-[#6B5E77] uppercase tracking-wider mb-1.5">Business Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-[#F3DEC8] rounded-2xl px-4 py-3 text-xs font-bold text-[#1E122C] focus:outline-none focus:border-[#D94A2A] focus:ring-2 focus:ring-[#D94A2A]/10 shadow-2xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#6B5E77] uppercase tracking-wider mb-1.5">Website URL</label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full border border-[#F3DEC8] rounded-2xl px-4 py-3 text-xs font-bold text-[#1E122C] focus:outline-none focus:border-[#D94A2A] focus:ring-2 focus:ring-[#D94A2A]/10 shadow-2xs"
                  />
                </div>
              </div>

              <div className="text-left">
                <label className="block text-[10px] font-black text-[#6B5E77] uppercase tracking-wider mb-1.5">Business Description</label>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  rows={3}
                  className="w-full border border-[#F3DEC8] rounded-2xl px-4 py-3 text-xs font-bold text-[#1E122C] focus:outline-none focus:border-[#D94A2A] focus:ring-2 focus:ring-[#D94A2A]/10 leading-relaxed resize-none shadow-2xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div>
                  <label className="block text-[10px] font-black text-[#6B5E77] uppercase tracking-wider mb-1.5">Business Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full border border-[#F3DEC8] rounded-2xl px-4 py-3 text-xs font-bold text-[#1E122C] focus:outline-none focus:border-[#D94A2A] focus:ring-2 focus:ring-[#D94A2A]/10 shadow-2xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#6B5E77] uppercase tracking-wider mb-1.5">Industry / Category</label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full border border-[#F3DEC8] rounded-2xl px-4 py-3 text-xs font-bold text-[#1E122C] focus:outline-none focus:border-[#D94A2A] focus:ring-2 focus:ring-[#D94A2A]/10 shadow-2xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <div>
                  <label className="block text-[10px] font-black text-[#6B5E77] uppercase tracking-wider mb-1.5">Business Stage</label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className="w-full border border-[#F3DEC8] rounded-2xl px-4 py-3 text-xs font-bold text-[#1E122C] focus:outline-none focus:border-[#D94A2A] focus:ring-2 focus:ring-[#D94A2A]/10 bg-white cursor-pointer shadow-2xs"
                  >
                    <option value="new">New / Launching</option>
                    <option value="active">Active</option>
                    <option value="growing">Growing</option>
                    <option value="established">Established</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#6B5E77] uppercase tracking-wider mb-1.5">Growth Goal</label>
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full border border-[#F3DEC8] rounded-2xl px-4 py-3 text-xs font-bold text-[#1E122C] focus:outline-none focus:border-[#D94A2A] focus:ring-2 focus:ring-[#D94A2A]/10 bg-white cursor-pointer shadow-2xs"
                  >
                    <option value="leads">Get leads</option>
                    <option value="sales">Increase sales</option>
                    <option value="awareness">Brand awareness</option>
                    <option value="retention">Retention</option>
                    <option value="re-engagement">Re-engagement</option>
                    <option value="launch">New Launch</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#6B5E77] uppercase tracking-wider mb-1.5">Brand Tone</label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value as any)}
                    className="w-full border border-[#F3DEC8] rounded-2xl px-4 py-3 text-xs font-bold text-[#1E122C] focus:outline-none focus:border-[#D94A2A] focus:ring-2 focus:ring-[#D94A2A]/10 bg-white cursor-pointer shadow-2xs"
                  >
                    <option value="friendly">Friendly & Warm</option>
                    <option value="professional">Professional</option>
                    <option value="casual">Casual & Relatable</option>
                    <option value="premium">Premium & Lux</option>
                    <option value="trustworthy">Trustworthy</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div>
                  <label className="block text-[10px] font-black text-[#6B5E77] uppercase tracking-wider mb-1.5">Target Market / Geography</label>
                  <input
                    type="text"
                    value={targetMarket}
                    onChange={(e) => setTargetMarket(e.target.value)}
                    className="w-full border border-[#F3DEC8] rounded-2xl px-4 py-3 text-xs font-bold text-[#1E122C] focus:outline-none focus:border-[#D94A2A] focus:ring-2 focus:ring-[#D94A2A]/10 shadow-2xs"
                    placeholder="e.g. California, USA or Local"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#6B5E77] uppercase tracking-wider mb-1.5">Core Products / Services</label>
                  <input
                    type="text"
                    value={productsServices}
                    onChange={(e) => setProductsServices(e.target.value)}
                    className="w-full border border-[#F3DEC8] rounded-2xl px-4 py-3 text-xs font-bold text-[#1E122C] focus:outline-none focus:border-[#D94A2A] focus:ring-2 focus:ring-[#D94A2A]/10 shadow-2xs"
                    placeholder="e.g. Linen dresses, Cotton tops"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <div className="sm:col-span-1">
                  <label className="block text-[10px] font-black text-[#6B5E77] uppercase tracking-wider mb-1.5">Target Audience Type</label>
                  <select
                    value={targetAudienceType}
                    onChange={(e) => setTargetAudienceType(e.target.value as any)}
                    className="w-full border border-[#F3DEC8] rounded-2xl px-4 py-3 text-xs font-bold text-[#1E122C] focus:outline-none focus:border-[#D94A2A] focus:ring-2 focus:ring-[#D94A2A]/10 bg-white cursor-pointer shadow-2xs"
                  >
                    <option value="B2C">B2C (Consumers)</option>
                    <option value="B2B">B2B (Businesses)</option>
                    <option value="Both">Both B2B & B2C</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-black text-[#6B5E77] uppercase tracking-wider mb-1.5">Target Audience Description</label>
                  <input
                    type="text"
                    value={targetAudienceDesc}
                    onChange={(e) => setTargetAudienceDesc(e.target.value)}
                    className="w-full border border-[#F3DEC8] rounded-2xl px-4 py-3 text-xs font-bold text-[#1E122C] focus:outline-none focus:border-[#D94A2A] focus:ring-2 focus:ring-[#D94A2A]/10 shadow-2xs"
                    placeholder="e.g. Millennial women looking for minimal apparel"
                  />
                </div>
              </div>

              {/* Preferred Marketing Channels Checkboxes */}
              <div className="text-left space-y-2">
                <label className="block text-[10px] font-black text-[#6B5E77] uppercase tracking-wider">Preferred Marketing Channels</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border border-[#F3DEC8] rounded-2xl p-3.5 bg-[#FFF8F5]">
                  {[
                    { id: 'email', label: 'Email Newsletters' },
                    { id: 'whatsapp', label: 'WhatsApp Marketing' },
                    { id: 'instagram', label: 'Instagram Organic' },
                    { id: 'facebook', label: 'Facebook Pages' },
                    { id: 'google_ads', label: 'Google Search Ads' },
                    { id: 'search_console', label: 'Google SEO Console' }
                  ].map((ch) => {
                    const isChecked = channels.includes(ch.id);
                    return (
                      <label key={ch.id} className="flex items-center gap-2 text-xs text-[#1E122C] cursor-pointer select-none font-bold">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            setChannels(prev => prev.includes(ch.id) ? prev.filter(item => item !== ch.id) : [...prev, ch.id]);
                          }}
                          className="h-4 w-4 rounded border-[#F3DEC8] text-[#4B1D6B] focus:ring-[#4B1D6B]/50 cursor-pointer accent-[#4B1D6B]"
                        />
                        <span>{ch.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* AI Understanding and Summary */}
              <div className="text-left space-y-4 pt-4 border-t border-[#F3DEC8]/70">
                <h4 className="text-[10px] font-black text-[#4B1D6B] uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D94A2A]" />
                  AI Onboarding Summary & Actions
                </h4>
                
                <div>
                  <label className="block text-[10px] font-black text-[#6B5E77] uppercase tracking-wider mb-1.5">AI-Generated Business Summary</label>
                  <textarea
                    value={aiSummary}
                    onChange={(e) => setAiSummary(e.target.value)}
                    rows={3}
                    className="w-full border border-[#F3DEC8] rounded-2xl px-4 py-3 text-xs font-semibold text-[#1E122C] focus:outline-none focus:border-[#D94A2A] focus:ring-2 focus:ring-[#D94A2A]/10 leading-relaxed bg-[#FFF8F5] resize-none shadow-2xs"
                    placeholder="Summary of business built by website audit scrape..."
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-[#6B5E77] uppercase tracking-wider mb-1.5">Recommended First Marketing Action</label>
                  <input
                    type="text"
                    value={recommendedFirstAction}
                    onChange={(e) => setRecommendedFirstAction(e.target.value)}
                    className="w-full border border-[#F3DEC8] rounded-2xl px-4 py-3 text-xs font-semibold text-[#1E122C] focus:outline-none focus:border-[#D94A2A] focus:ring-2 focus:ring-[#D94A2A]/10 bg-[#FFF8F5] shadow-2xs"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2 text-left">
                <Button variant="primary" type="submit">Save Changes</Button>
              </div>
            </form>
          </Card>

          {/* AI Autonomy & Permissions */}
          <Card className="border-[#F3DEC8] bg-white">
            <div className="space-y-1 mb-5">
              <h3 className="text-xs font-black text-[#1E122C] uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4.5 h-4.5 text-[#4B1D6B]" />
                AI Manager Autonomy
              </h3>
              <p className="text-[10px] text-[#6B5E77] font-semibold">Configure what actions GrowWise AI can execute automatically vs what requires your sign-off.</p>
            </div>

            <div className="space-y-4 divide-y divide-[#F3DEC8]/70">
              {/* Task 1 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 first:pt-0">
                <div>
                  <h4 className="text-xs font-black text-[#1E122C]">Create social posts</h4>
                  <p className="text-[10px] text-[#6B5E77] font-medium">Generate image template posts and post captions.</p>
                </div>
                <div className="flex bg-[#FAF5F0] border border-[#F3DEC8] rounded-2xl p-1 text-[10px] font-black">
                  {(['recommend', 'approval_required', 'automatic'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => handleAutonomyChange('social', mode)}
                      className={`px-3 py-1.5 rounded-xl capitalize transition-all cursor-pointer ${
                        autonomy.social === mode
                          ? 'bg-[#4B1D6B] text-white shadow-2xs'
                          : 'text-[#6B5E77] hover:text-[#1E122C]'
                      }`}
                    >
                      {mode.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Task 2 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
                <div>
                  <h4 className="text-xs font-black text-[#1E122C]">Prepare blog articles</h4>
                  <p className="text-[10px] text-[#6B5E77] font-medium">Draft full articles and metadata files.</p>
                </div>
                <div className="flex bg-[#FAF5F0] border border-[#F3DEC8] rounded-2xl p-1 text-[10px] font-black">
                  {(['recommend', 'approval_required', 'automatic'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => handleAutonomyChange('blog', mode)}
                      className={`px-3 py-1.5 rounded-xl capitalize transition-all cursor-pointer ${
                        autonomy.blog === mode
                          ? 'bg-[#4B1D6B] text-white shadow-2xs'
                          : 'text-[#6B5E77] hover:text-[#1E122C]'
                      }`}
                    >
                      {mode.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Task 3 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
                <div>
                  <h4 className="text-xs font-black text-[#1E122C]">Change advertising budget</h4>
                  <p className="text-[10px] text-[#6B5E77] font-medium">Shift ad spends between underperforming keywords.</p>
                </div>
                <div className="flex bg-[#FAF5F0] border border-[#F3DEC8] rounded-2xl p-1 text-[10px] font-black">
                  {(['recommend', 'approval_required', 'automatic'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => handleAutonomyChange('budget', mode)}
                      className={`px-3 py-1.5 rounded-xl capitalize transition-all cursor-pointer ${
                        autonomy.budget === mode
                          ? 'bg-[#4B1D6B] text-white shadow-2xs'
                          : 'text-[#6B5E77] hover:text-[#1E122C]'
                      }`}
                    >
                      {mode.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

        </div>

        {/* Connections Panel (takes 1 col) */}
        <div className="space-y-6">
          <Card className="border-[#F3DEC8] bg-white">
            <h3 className="text-xs font-black text-[#1E122C] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Link className="w-4.5 h-4.5 text-[#D94A2A]" />
              Connected Platforms
            </h3>

            <div className="space-y-3.5">
              {connections.map((conn) => (
                <div key={conn.id} className="flex items-center justify-between text-xs border-b border-[#F3DEC8]/70 pb-3 last:border-0 last:pb-0">
                  <div>
                    <h4 className="font-black text-[#1E122C]">{conn.name}</h4>
                    <span className="text-[9.5px] text-[#6B5E77] font-semibold">
                      {conn.connected ? 'Active Sync' : 'Not Syncing'}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleConnection(conn.id)}
                    className={`text-[10px] font-black border rounded-xl px-3 py-1.5 transition-all cursor-pointer ${
                      conn.connected
                        ? 'bg-[#F4FDF8] text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                        : 'bg-white text-[#6B5E77] border-[#F3DEC8] hover:bg-[#FFF8F5] hover:text-[#1E122C]'
                    }`}
                  >
                    {conn.connected ? 'Connected' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Reset Demo Card */}
          <Card className="border-rose-200/80 bg-[#FFF1F2]/40 space-y-4">
            <div>
              <h3 className="text-xs font-black text-[#1E122C]">Demo Controls</h3>
              <p className="text-[10px] text-[#6B5E77] font-semibold mt-0.5">Want to test the onboarding experience from the beginning?</p>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={resetOnboarding}
              className="w-full text-xs"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1 shrink-0" />
              Reset Demo Onboarding
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Settings;
