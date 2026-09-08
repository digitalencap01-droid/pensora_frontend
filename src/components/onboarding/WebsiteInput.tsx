import React, { useState } from 'react';
import { Globe, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface WebsiteInputProps {
  initialValue: string;
  onContinue: (url: string) => void;
  onSkip: () => void;
}

export const WebsiteInput: React.FC<WebsiteInputProps> = ({
  initialValue,
  onContinue,
  onSkip
}) => {
  const [url, setUrl] = useState(initialValue);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Please enter a website URL');
      return;
    }
    
    // Quick regex validation
    const hasPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i.test(url);
    if (!hasPattern) {
      setError('Please enter a valid website URL (e.g., myshop.com)');
      return;
    }

    setError('');
    onContinue(url);
  };

  const selectPreset = (domain: string) => {
    setUrl(`https://${domain}`);
    setError('');
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">What's your website?</h2>
        <p className="text-sm text-slate-500">I'll use it to understand your business, products, and services.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="website" className="sr-only">Website URL</label>
          <div className="relative rounded-xl shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Globe className="w-5 h-5" />
            </div>
            <input
              type="text"
              name="website"
              id="website"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setError(''); }}
              className={`block w-full pl-11 pr-4 py-3.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all ${
                error ? 'border-red-300 focus:ring-red-400 focus:border-red-400' : 'border-slate-200'
              }`}
              placeholder="https://yourwebsite.com"
            />
          </div>
          {error && <p className="text-xs text-red-500 mt-1.5 ml-1">{error}</p>}
        </div>

        {/* Presets to speed up onboarding user testing */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-2">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Or select a demo website:</h4>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => selectPreset('bloomboutique.shop')}
              className="w-full text-left px-3 py-2 bg-white hover:bg-brand-50 hover:border-brand-200 border border-slate-200/60 rounded-xl text-xs font-medium text-slate-600 transition-all flex items-center justify-between"
            >
              <span>Bloom Boutique (Sustainable Clothing)</span>
              <span className="text-[10px] text-brand-600 font-semibold">bloomboutique.shop</span>
            </button>
            <button
              type="button"
              onClick={() => selectPreset('greenhousecoffee.com')}
              className="w-full text-left px-3 py-2 bg-white hover:bg-brand-50 hover:border-brand-200 border border-slate-200/60 rounded-xl text-xs font-medium text-slate-600 transition-all flex items-center justify-between"
            >
              <span>Greenhouse Coffee (Specialty Roastery)</span>
              <span className="text-[10px] text-brand-600 font-semibold">greenhousecoffee.com</span>
            </button>
            <button
              type="button"
              onClick={() => selectPreset('acmedigital.com')}
              className="w-full text-left px-3 py-2 bg-white hover:bg-brand-50 hover:border-brand-200 border border-slate-200/60 rounded-xl text-xs font-medium text-slate-600 transition-all flex items-center justify-between"
            >
              <span>Acme Digital (Design & SEO Agency)</span>
              <span className="text-[10px] text-brand-600 font-semibold">acmedigital.com</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <Button type="submit" size="lg">
            <span>Continue</span>
            <ArrowRight className="w-5 h-5 ml-1.5 shrink-0" />
          </Button>

          <button
            type="button"
            onClick={onSkip}
            className="text-xs font-semibold text-slate-400 hover:text-slate-600 py-2 transition-colors text-center"
          >
            I don't have a website
          </button>
        </div>
      </form>
    </div>
  );
};
export default WebsiteInput;
