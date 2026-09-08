import React, { useState } from 'react';
import { ArrowRight, Mail, MessageSquare, Smartphone, Search, FileText, Smile, Award, MessageCircle, Sparkles, Shield } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface ChannelsToneStepProps {
  initialChannels: string[];
  initialTone: 'friendly' | 'professional' | 'casual' | 'premium' | 'trustworthy' | '';
  onContinue: (data: { channels: string[]; toneOfVoice: 'friendly' | 'professional' | 'casual' | 'premium' | 'trustworthy' }) => void;
  onBack: () => void;
}

export const ChannelsToneStep: React.FC<ChannelsToneStepProps> = ({
  initialChannels,
  initialTone,
  onContinue,
  onBack
}) => {
  const [selectedChannels, setSelectedChannels] = useState<string[]>(initialChannels || []);
  const [tone, setTone] = useState<'friendly' | 'professional' | 'casual' | 'premium' | 'trustworthy' | ''>(initialTone || '');
  const [error, setError] = useState('');

  const channelsList = [
    { id: 'email', name: 'Email Outreach', icon: Mail, desc: 'Newsletters & flows' },
    { id: 'whatsapp', name: 'WhatsApp & SMS', icon: MessageSquare, desc: 'Direct chat campaigns' },
    { id: 'social', name: 'Social Media', icon: Smartphone, desc: 'Organic Instagram & FB' },
    { id: 'google_ads', name: 'Search Engine Ads', icon: Search, desc: 'Paid keywords targeting' },
    { id: 'seo', name: 'SEO & Blog Content', icon: FileText, desc: 'Google organic search' }
  ];

  const tonesList = [
    { id: 'friendly', name: 'Friendly & Warm', icon: Smile, desc: 'Warm & personal' },
    { id: 'professional', name: 'Professional', icon: Award, desc: 'Clear & reliable' },
    { id: 'casual', name: 'Casual & Relatable', icon: MessageCircle, desc: 'Easygoing & relatable' },
    { id: 'premium', name: 'Premium & Lux', icon: Sparkles, desc: 'Elegant & high status' },
    { id: 'trustworthy', name: 'Trustworthy', icon: Shield, desc: 'Secure & helpful' }
  ] as const;

  const handleToggleChannel = (id: string) => {
    if (selectedChannels.includes(id)) {
      setSelectedChannels(prev => prev.filter(c => c !== id));
    } else {
      setSelectedChannels(prev => [...prev, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedChannels.length === 0) {
      setError('Please select at least one preferred marketing channel');
      return;
    }
    if (!tone) {
      setError('Please select your brand tone of voice');
      return;
    }
    setError('');
    onContinue({ channels: selectedChannels, toneOfVoice: tone });
  };

  return (
    <div className="space-y-6 max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="text-center space-y-1.5">
        <h2 className="text-2.5xl font-extrabold text-slate-800 tracking-tight leading-tight">
          Channels & Brand <span className="font-serif italic text-brand-650">Voice</span>
        </h2>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">Select where you want to campaign and how your AI should sound.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Preferred Marketing Channels */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Preferred Marketing Channels</label>
          <div className="grid grid-cols-2 gap-2">
            {channelsList.map((ch) => {
              const isSelected = selectedChannels.includes(ch.id);
              const IconComponent = ch.icon;
              return (
                <Card
                  key={ch.id}
                  hoverable
                  onClick={() => handleToggleChannel(ch.id)}
                  className={`flex items-start gap-2.5 border p-3.5 transition-all duration-300 cursor-pointer rounded-2xl hover:shadow-md ${
                    isSelected
                      ? 'border-brand-500 bg-brand-50/10 shadow-xs'
                      : 'border-slate-150 bg-white hover:border-slate-250'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleToggleChannel(ch.id)}
                    className="h-3.5 w-3.5 rounded border-slate-350 text-brand-650 focus:ring-brand-500 mt-0.5 cursor-pointer shrink-0"
                  />
                  <div className="text-left overflow-hidden">
                    <div className="flex items-center gap-1.5">
                      <IconComponent className="w-3.5 h-3.5 text-[#5C4DF7] shrink-0" />
                      <h4 className="text-xs font-bold text-slate-800 truncate leading-none">{ch.name}</h4>
                    </div>
                    <p className="text-[9px] text-slate-450 mt-1 font-semibold leading-none">{ch.desc}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Brand Tone of Voice */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Brand Tone of Voice</label>
          <div className="grid grid-cols-2 gap-2">
            {tonesList.map((t) => {
              const isSelected = tone === t.id;
              const IconComponent = t.icon;
              return (
                <Card
                  key={t.id}
                  hoverable
                  onClick={() => { setTone(t.id); setError(''); }}
                  className={`flex items-start gap-2.5 border p-3.5 transition-all duration-300 cursor-pointer rounded-2xl hover:shadow-md ${
                    isSelected
                      ? 'border-brand-500 bg-brand-50/10 shadow-xs'
                      : 'border-slate-150 bg-white hover:border-slate-250'
                  }`}
                >
                  <input
                    type="radio"
                    name="tone"
                    checked={isSelected}
                    onChange={() => { setTone(t.id); setError(''); }}
                    className="h-3.5 w-3.5 rounded-full border-slate-300 text-brand-650 focus:ring-brand-500 mt-0.5 cursor-pointer shrink-0"
                  />
                  <div className="text-left overflow-hidden">
                    <div className="flex items-center gap-1.5">
                      <IconComponent className="w-3.5 h-3.5 text-[#5C4DF7] shrink-0" />
                      <h4 className="text-xs font-bold text-slate-800 truncate leading-none">{t.name}</h4>
                    </div>
                    <p className="text-[9px] text-slate-450 mt-1 font-semibold leading-none">{t.desc}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {error && <p className="text-xs text-red-500 text-center font-bold">{error}</p>}

      {/* Mockup Bottom Navigation Bar */}
      <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-6 mb-6">
        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2 border border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 rounded-full text-xs font-bold text-slate-555 transition-all duration-200 cursor-pointer"
        >
          Back
        </button>

        {/* Center Progress Bar */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-slate-450 font-bold">Step 4 of 5</span>
          <div className="w-[100px] bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#5C4DF7] h-full rounded-full transition-all duration-500" style={{ width: '80%' }} />
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
    </div>
  );
};
export default ChannelsToneStep;
