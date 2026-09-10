import React from 'react';
import { motion } from 'framer-motion';
import { Globe, MessageSquare, Target, Palette, Lightbulb, Share2, ChevronRight } from 'lucide-react';

export const LandingServices: React.FC = () => {
  const cards = [
    {
      title: 'Web & App Development',
      description: 'Etiam vitae justo risus tellus suspendisse vel commodo luctus quam volutpat. Risus fusce nunc vulputate urna eu.',
      icon: <Globe className="w-5.5 h-5.5 text-[#C8FF55]" />,
      isWhite: true,
      gridColor: 'rgba(0,0,0,0.04)',
      style: 'bg-gradient-to-br from-[#C8FF55] to-[#75F2AF] text-[#151A1F] border-[#E2E8F0]',
      btnStyle: 'bg-[#5C4DF7] text-white hover:bg-[#4b3ce3]'
    },
    {
      title: 'Social Media Marketing',
      description: 'Etiam vitae justo risus tellus suspendisse vel commodo luctus quam volutpat. Risus fusce nunc vulputate urna eu.',
      icon: <MessageSquare className="w-5.5 h-5.5 text-[#C8FF55]" />,
      isWhite: false,
      gridColor: 'rgba(255,255,255,0.03)',
      style: 'bg-[#102B2D] text-white border-[#E2E8F0]',
      btnStyle: 'bg-[#C8FF55] text-[#151A1F] hover:bg-[#bceb4c]'
    },
    {
      title: 'SEO Consult & Optimization',
      description: 'Etiam vitae justo risus tellus suspendisse vel commodo luctus quam volutpat. Risus fusce nunc vulputate urna eu.',
      icon: <Target className="w-5.5 h-5.5 text-[#C8FF55]" />,
      isWhite: false,
      gridColor: 'rgba(255,255,255,0.03)',
      style: 'bg-[#102B2D] text-white border-[#E2E8F0]',
      btnStyle: 'bg-[#C8FF55] text-[#151A1F] hover:bg-[#bceb4c]'
    },
    {
      title: 'Graphic Design & Branding',
      description: 'Etiam vitae justo risus tellus suspendisse vel commodo luctus quam volutpat. Risus fusce nunc vulputate urna eu.',
      icon: <Palette className="w-5.5 h-5.5 text-[#C8FF55]" />,
      isWhite: false,
      gridColor: 'rgba(255,255,255,0.03)',
      style: 'bg-[#102B2D] text-white border-[#E2E8F0]',
      btnStyle: 'bg-[#C8FF55] text-[#151A1F] hover:bg-[#bceb4c]'
    },
    {
      title: 'Creative Content & Idea',
      description: 'Etiam vitae justo risus tellus suspendisse vel commodo luctus quam volutpat. Risus fusce nunc vulputate urna eu.',
      icon: <Lightbulb className="w-5.5 h-5.5 text-[#C8FF55]" />,
      isWhite: false,
      gridColor: 'rgba(255,255,255,0.03)',
      style: 'bg-[#102B2D] text-white border-[#E2E8F0]',
      btnStyle: 'bg-[#C8FF55] text-[#151A1F] hover:bg-[#bceb4c]'
    },
    {
      title: 'Digital Advertising & PPC',
      description: 'Etiam vitae justo risus tellus suspendisse vel commodo luctus quam volutpat. Risus fusce nunc vulputate urna eu.',
      icon: <Share2 className="w-5.5 h-5.5 text-[#C8FF55]" />,
      isWhite: false,
      gridColor: 'rgba(255,255,255,0.03)',
      style: 'bg-[#102B2D] text-white border-[#E2E8F0]',
      btnStyle: 'bg-[#C8FF55] text-[#151A1F] hover:bg-[#bceb4c]'
    }
  ];

  // Card slide-up & fade staggered variants
  const cardVariants = {
    hidden: { opacity: 0, y: 45 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: custom * 0.08
      }
    })
  };

  return (
    <section id="services" className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 space-y-16">
        
        {/* Section Heading (Centered) */}
        <div className="max-w-2xl mx-auto space-y-3 text-center">
          {/* Subtitle with blue-purple bullet icon */}
          <div className="flex items-center gap-2 justify-center">
            <span className="w-2.5 h-2.5 rounded-full border-[2.5px] border-[#5C4DF7] flex items-center justify-center shrink-0">
              <span className="w-1 h-1 rounded-full bg-[#5C4DF7]" />
            </span>
            <span className="text-xs font-bold text-slate-500 tracking-widest uppercase">
              What We Offer
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#151A1F] leading-tight tracking-tight">
            Innovative Digital Solutions for <br className="hidden sm:inline" />
            Business Growth
          </h2>
        </div>

        {/* 6-Card Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={cardVariants}
              className={`relative rounded-[24px] overflow-hidden border p-8 min-h-[220px] flex flex-col justify-between transition-all duration-350 hover:-translate-y-2 hover:shadow-lg ${card.style} group`}
              style={{
                backgroundImage: `
                  linear-gradient(${card.gridColor} 1px, transparent 1px), 
                  linear-gradient(90deg, ${card.gridColor} 1px, transparent 1px),
                  ${card.isWhite 
                    ? 'linear-gradient(to bottom right, #C8FF55, #75F2AF)' 
                    : 'linear-gradient(#102B2D, #102B2D)'
                  }
                `,
                backgroundSize: '24px 24px, 24px 24px, 100% 100%'
              }}
            >
              
              {/* Custom top-right smooth concave cutout notch for the circular icon badge */}
              <div className="absolute top-0 right-0 w-[72px] h-[72px] z-10 pointer-events-none">
                {/* Concave cutout filled with white */}
                <svg 
                  className="absolute inset-0 w-full h-full text-white fill-current" 
                  viewBox="0 0 72 72"
                >
                  <path d="M 0 0 H 72 V 72 C 72 60 62 52 50 52 H 22 C 10 52 0 42 0 30 Z" />
                </svg>
                {/* Outline stroke separating the white notch from the card body */}
                <svg 
                  className="absolute inset-0 w-full h-full text-slate-200 fill-none" 
                  viewBox="0 0 72 72"
                >
                  {/* Inner curve stroke */}
                  <path 
                    d="M 0 30 C 0 42, 10 52, 22 52 H 50 C 62 52, 72 60, 72 72" 
                    stroke="currentColor" 
                    strokeWidth="1.2" 
                  />
                  {/* Outer edge stroke */}
                  <path 
                    d="M 0 0 H 72 V 72" 
                    stroke="currentColor" 
                    strokeWidth="1.2" 
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center pl-2 pb-2">
                  <div className="w-11 h-11 rounded-full bg-[#5C4DF7] flex items-center justify-center shadow-xs">
                    {card.icon}
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-4 pr-6 text-left">
                <h4 className="text-[17px] font-extrabold tracking-tight pr-6">{card.title}</h4>
                <p className={`text-xs leading-relaxed font-medium ${
                  card.isWhite ? 'text-[#151A1F]/70' : 'text-white/70'
                }`}>
                  {card.description}
                </p>
              </div>

              {/* Bottom Learn More pill button */}
              <div className="pt-6 text-left">
                <a
                  href="#contact"
                  className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 hover:-translate-y-[1px] shadow-xs ${card.btnStyle}`}
                >
                  <span>Learn More</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default LandingServices;
