import React, { useState } from 'react';
import { ArrowRight, UserPlus, DollarSign, Megaphone, RefreshCw, MessageSquare, Rocket } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface ProductsGoalStepProps {
  initialProducts: string[];
  initialGoal: 'leads' | 'sales' | 'awareness' | 'retention' | 're-engagement' | 'launch' | '';
  onContinue: (data: { productsServices: string[]; growthGoal: 'leads' | 'sales' | 'awareness' | 'retention' | 're-engagement' | 'launch' }) => void;
  onBack: () => void;
}

export const ProductsGoalStep: React.FC<ProductsGoalStepProps> = ({
  initialProducts,
  initialGoal,
  onContinue,
  onBack
}) => {
  const [productsInput, setProductsInput] = useState(initialProducts?.join(', ') || '');
  const [goal, setGoal] = useState<'leads' | 'sales' | 'awareness' | 'retention' | 're-engagement' | 'launch' | ''>(initialGoal || '');
  const [error, setError] = useState('');

  const goalsList = [
    { id: 'leads', title: 'Get more leads', icon: UserPlus, desc: 'Collect contact details & inquiry signups.' },
    { id: 'sales', title: 'Increase sales', icon: DollarSign, desc: 'Boost checkout purchases & checkouts.' },
    { id: 'awareness', title: 'Grow brand reach', icon: Megaphone, desc: 'Expand social media & search discovery.' },
    { id: 'retention', title: 'Customer retention', icon: RefreshCw, desc: 'Encourage repeat purchases & brand loyalty.' },
    { id: 're-engagement', title: 'Re-engage contacts', icon: MessageSquare, desc: 'Wake up inactive list subscribers.' },
    { id: 'launch', title: 'Launch offering', icon: Rocket, desc: 'Drive buzz to a brand new offering.' }
  ] as const;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productsInput.trim()) {
      setError('Please list at least one core product or service');
      return;
    }
    if (!goal) {
      setError('Please select your primary growth goal');
      return;
    }
    setError('');
    
    const parsedProducts = productsInput
      .split(',')
      .map(p => p.trim())
      .filter(Boolean);

    onContinue({ productsServices: parsedProducts, growthGoal: goal });
  };

  return (
    <div className="space-y-6 max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="text-center space-y-1.5">
        <h2 className="text-2.5xl font-extrabold text-slate-805 tracking-tight leading-tight">
          What are you <span className="font-serif italic text-brand-650">selling & seeking?</span>
        </h2>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">List what you offer and what marketing goal you want to focus on first.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Core Products / Services */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Core Products / Services</label>
          <input
            type="text"
            placeholder="e.g. Specialty micro-roasted beans, Cold brew filters (comma separated)"
            value={productsInput}
            onChange={(e) => { setProductsInput(e.target.value); setError(''); }}
            className="w-full border border-slate-200/80 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 bg-white text-slate-800 font-medium transition-all duration-200"
          />
          <p className="text-[10px] text-slate-400 mt-1 pl-1">Separate multiple items with commas so AI can understand them individually.</p>
        </div>

        {/* Primary Growth Goal */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Main Growth Goal</label>
          <div className="grid grid-cols-2 gap-2.5">
            {goalsList.map((g) => {
              const isSelected = goal === g.id;
              const IconComponent = g.icon;
              return (
                <Card
                  key={g.id}
                  hoverable
                  onClick={() => { setGoal(g.id); setError(''); }}
                  className={`flex flex-col text-left p-3.5 border transition-all duration-300 cursor-pointer rounded-2xl justify-between h-24 hover:shadow-md ${
                    isSelected
                      ? 'border-brand-500 bg-brand-50/10 shadow-xs'
                      : 'border-slate-150 bg-white hover:border-slate-250'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1.5">
                      <IconComponent className="w-4 h-4 text-[#5C4DF7] shrink-0" />
                      <h4 className="text-xs font-extrabold text-slate-800 leading-tight">{g.title}</h4>
                    </div>
                    <input
                      type="radio"
                      name="growthGoal"
                      checked={isSelected}
                      onChange={() => { setGoal(g.id); setError(''); }}
                      className="h-3.5 w-3.5 rounded-full border-slate-300 text-brand-650 focus:ring-brand-500 cursor-pointer shrink-0"
                    />
                  </div>
                  <p className="text-[9.5px] text-slate-450 mt-1 leading-normal font-semibold">{g.desc}</p>
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
          className="px-5 py-2 border border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 rounded-full text-xs font-bold text-slate-550 transition-all duration-200 cursor-pointer"
        >
          Back
        </button>

        {/* Center Progress Bar */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-slate-450 font-bold">Step 3 of 5</span>
          <div className="w-[100px] bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#5C4DF7] h-full rounded-full transition-all duration-500" style={{ width: '60%' }} />
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
export default ProductsGoalStep;
