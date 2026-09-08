import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  padded?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = false,
  padded = true,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`
        bg-white 
        border border-[#F3DEC8] 
        rounded-[24px] sm:rounded-[28px] 
        shadow-[0_4px_20px_rgba(75,29,107,0.03)] 
        transition-all duration-200 
        ${padded ? 'p-5 sm:p-6' : ''} 
        ${hoverable ? 'hover:border-[#D94A2A]/40 hover:shadow-[0_8px_30px_rgba(75,29,107,0.06)] hover:-translate-y-[2px] cursor-pointer' : ''} 
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};
