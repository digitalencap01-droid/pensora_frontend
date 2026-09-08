import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyle = 'inline-flex items-center justify-center font-black rounded-xl sm:rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';
  
  const variants = {
    primary: 'bg-gradient-to-r from-[#2B0847] via-[#48115B] to-[#801B48] hover:from-[#360B5A] hover:via-[#591671] hover:to-[#962055] active:scale-[0.98] text-white shadow-[0_4px_16px_rgba(75,29,107,0.2)]',
    secondary: 'bg-[#FFF1EB] hover:bg-[#FFE5DC] active:bg-[#FCD2C4] text-[#D94A2A] border border-[#FAD8C7]',
    outline: 'border border-[#F3DEC8] hover:border-[#D94A2A]/50 bg-white hover:bg-[#FFF8F5] text-[#1E122C]',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm shadow-rose-200',
    ghost: 'hover:bg-[#FAF5F0] text-[#6B5E77] hover:text-[#1E122C]'
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs tracking-tight',
    md: 'px-5 py-2.5 text-xs sm:text-sm tracking-tight',
    lg: 'px-6 py-3.5 text-sm sm:text-base tracking-tight'
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </>
      ) : children}
    </button>
  );
};
