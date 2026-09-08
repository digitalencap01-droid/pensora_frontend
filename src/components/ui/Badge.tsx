import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'info' | 'error' | 'neutral' | 'brand';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = ''
}) => {
  const base = 'inline-flex items-center px-2.5 py-1 rounded-full text-[10.5px] font-black uppercase tracking-wider';
  
  const colors = {
    success: 'bg-[#F4FDF8] text-emerald-800 border border-emerald-200/80',
    warning: 'bg-[#FFF8EB] text-amber-800 border border-amber-200/80',
    info: 'bg-[#F0F9FF] text-sky-800 border border-sky-200/80',
    error: 'bg-[#FFF1F2] text-rose-800 border border-rose-200/80',
    neutral: 'bg-[#FAF5F0] text-[#6B5E77] border border-[#F3DEC8]',
    brand: 'bg-[#F5EEFB] text-[#4B1D6B] border border-[#E9D5F7]'
  };

  return (
    <span className={`${base} ${colors[variant]} ${className}`}>
      {children}
    </span>
  );
};
