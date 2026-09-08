import React, { useState } from 'react';
import { Users, Eye, Target, DollarSign, Award, ArrowRight } from 'lucide-react';
import { MarketingGoal, MarketingGoalOption } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface GoalSelectorProps {
  initialValues: MarketingGoal[];
  onContinue: (goals: MarketingGoal[]) => void;
}

export const GoalSelector: React.FC<GoalSelectorProps> = ({
  initialValues,
  onContinue
}) => {
  const [selected, setSelected] = useState<MarketingGoal[]>(initialValues);

  const goals: MarketingGoalOption[] = [
    { id: 'customers', title: 'Get more customers', description: 'Acquire new long-term buyers for your business.', icon: 'Users' },
    { id: 'visitors', title: 'Get more website visitors', description: 'Drive high-volume organic and search traffic to your pages.', icon: 'Eye' },
    { id: 'leads', title: 'Get more leads', description: 'Collect email sign-ups, inquiry forms, and contact cards.', icon: 'Target' },
    { id: 'sales', title: 'Increase sales', description: 'Boost checkout completions and product checkout orders.', icon: 'DollarSign' },
    { id: 'brand', title: 'Grow my brand', description: 'Expand social media audience and community awareness.', icon: 'Award' }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <Users className="w-5 h-5" />;
      case 'Eye': return <Eye className="w-5 h-5" />;
      case 'Target': return <Target className="w-5 h-5" />;
      case 'DollarSign': return <DollarSign className="w-5 h-5" />;
      default: return <Award className="w-5 h-5" />;
    }
  };

  const handleToggle = (id: MarketingGoal) => {
    if (selected.includes(id)) {
      setSelected(prev => prev.filter(item => item !== id));
    } else {
      setSelected(prev => [...prev, id]);
    }
  };

  const handleContinue = () => {
    if (selected.length > 0) {
      onContinue(selected);
    }
  };

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">What would you like to improve first?</h2>
        <p className="text-sm text-slate-500">Select all that apply. We can change or add others later.</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {goals.map((goal) => {
          const isSelected = selected.includes(goal.id);
          return (
            <Card
              key={goal.id}
              hoverable
              onClick={() => handleToggle(goal.id)}
              className={`flex items-start gap-4 border transition-all ${
                isSelected 
                  ? 'border-brand-500 bg-brand-50/10 shadow-sm shadow-brand-100' 
                  : 'border-slate-100 hover:border-slate-200 bg-white'
              }`}
            >
              <div className={`p-2.5 rounded-xl border shrink-0 ${
                isSelected 
                  ? 'bg-brand-500 border-brand-400 text-white shadow-sm shadow-brand-200' 
                  : 'bg-slate-50 border-slate-100 text-slate-500'
              }`}>
                {getIcon(goal.icon)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-800">{goal.title}</h4>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleToggle(goal.id)}
                    className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-normal">{goal.description}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="pt-2 flex justify-end">
        <Button
          onClick={handleContinue}
          disabled={selected.length === 0}
          size="lg"
          className="w-full sm:w-auto"
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5 ml-1.5 shrink-0" />
        </Button>
      </div>
    </div>
  );
};
export default GoalSelector;
