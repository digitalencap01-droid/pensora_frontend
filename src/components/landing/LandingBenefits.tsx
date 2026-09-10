import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, FileBadge, Globe } from 'lucide-react';

export const LandingBenefits: React.FC = () => {
  const benefits = [
    {
      title: 'Customized Strategies',
      description: 'Ut aliquet consequat nostra lacinia litora. Sagittis a nisi adipiscing nec ipsum ullamcorper arcu eros.',
      icon: <Wrench className="w-6 h-6 text-[#C8FF55]" />
    },
    {
      title: 'Experienced Team',
      description: 'Ut aliquet consequat nostra lacinia litora. Sagittis a nisi adipiscing nec ipsum ullamcorper arcu eros.',
      icon: <FileBadge className="w-6 h-6 text-[#C8FF55]" />
    },
    {
      title: 'Client-Centric Approach',
      description: 'Ut aliquet consequat nostra lacinia litora. Sagittis a nisi adipiscing nec ipsum ullamcorper arcu eros.',
      icon: <Globe className="w-6 h-6 text-[#C8FF55]" />
    }
  ];

  // Framer motion variants for column cards
  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: (idx: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: idx * 0.12
      }
    })
  };

  return (
    <section className="pb-24 pt-2 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {benefits.map((benefit, idx) => (
            <motion.div 
              key={idx}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className="flex items-start gap-3"
            >
              {/* Solid blue-purple icon tile on the left */}
              <div className="w-14 h-14 rounded-2xl bg-[#5C4DF7] flex items-center justify-center shrink-0 shadow-sm border border-[#5C4DF7]/5">
                {benefit.icon}
              </div>
              
              {/* Text content on the right */}
              <div className="space-y-1.5 text-left pt-0.5">
                <h3 className="text-base font-extrabold text-[#151A1F] leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-[11.5px] text-slate-500 font-medium leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingBenefits;
