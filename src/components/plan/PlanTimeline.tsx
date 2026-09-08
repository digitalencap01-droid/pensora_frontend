import React, { useState } from 'react';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { PlanTask } from './PlanTask';
import { Card } from '../ui/Card';
import { useMarketing } from '../../context/MarketingContext';

export const PlanTimeline: React.FC = () => {
  const { createContentItem, fixWebsiteIssue } = useMarketing();
  
  // Track status of tasks inside the plan timeline
  const [taskStates, setTaskStates] = useState<Record<string, 'pending' | 'running' | 'done'>>({
    't_1': 'pending',
    't_2': 'pending',
    't_3': 'pending',
    't_4': 'pending',
    't_5': 'pending',
    't_6': 'pending',
  });

  const runTask = async (id: string, name: string, category: 'content' | 'website' | 'ads' | 'seo') => {
    setTaskStates(prev => ({ ...prev, [id]: 'running' }));
    
    try {
      if (category === 'content') {
        await createContentItem(name, 'blog');
      } else if (category === 'website') {
        await fixWebsiteIssue('w_1'); // Shop button fix
      } else {
        // Simulated SEO metadata or ad tweak
        await new Promise(r => setTimeout(r, 1200));
      }
      setTaskStates(prev => ({ ...prev, [id]: 'done' }));
    } catch (err) {
      setTaskStates(prev => ({ ...prev, [id]: 'pending' }));
    }
  };

  const timeline = [
    {
      title: 'This Week',
      description: 'Critical tasks focusing on high impact search and conversion fixes',
      tasks: [
        { id: 't_1', title: 'Create SEO optimized jewelry catalog page', category: 'seo' as const, difficulty: 'Easy' as const },
        { id: 't_2', title: 'Improve homepage mobile layout call-to-action button', category: 'website' as const, difficulty: 'Easy' as const },
        { id: 't_3', title: 'Write organic linen capsule wardrobe care blog post', category: 'content' as const, difficulty: 'Medium' as const }
      ]
    },
    {
      title: 'Next Week',
      description: 'Brand building and traffic expansion opportunities',
      tasks: [
        { id: 't_4', title: 'Launch cart abandonment Facebook retargeting campaign', category: 'ads' as const, difficulty: 'Medium' as const },
        { id: 't_5', title: 'Publish behind-the-scenes handcrafting social post', category: 'content' as const, difficulty: 'Easy' as const }
      ]
    },
    {
      title: 'This Month',
      description: 'Deeper structural adjustments',
      tasks: [
        { id: 't_6', title: 'Compress and optimize website catalog image loading speed', category: 'website' as const, difficulty: 'Hard' as const }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {timeline.map((section) => (
        <div key={section.title} className="relative pl-6 sm:pl-8 border-l border-slate-250/60 last:border-0 pb-6 last:pb-0">
          {/* Calendar marker indicator */}
          <div className="absolute left-[-9px] top-1 bg-white border-2 border-brand-500 rounded-full p-0.5 z-10">
            <div className="w-2.5 h-2.5 bg-brand-500 rounded-full" />
          </div>

          <div className="space-y-4">
            {/* Header info */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-500 shrink-0" />
                {section.title}
              </h3>
              <p className="text-[11px] text-slate-450 mt-0.5">{section.description}</p>
            </div>

            {/* List of Tasks */}
            <div className="grid grid-cols-1 gap-3">
              {section.tasks.map((task) => (
                <PlanTask
                  key={task.id}
                  title={task.title}
                  category={task.category}
                  difficulty={task.difficulty}
                  status={taskStates[task.id]}
                  onExecute={() => runTask(task.id, task.title, task.category)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default PlanTimeline;
