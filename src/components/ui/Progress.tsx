import React from 'react';

interface ProgressProps {
  value: number; // 0 to 100
  className?: string;
  showText?: boolean;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  className = '',
  showText = false
}) => {
  const percentage = Math.min(Math.max(value, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      {showText && (
        <div className="flex justify-between mb-1.5 text-xs font-semibold text-slate-500">
          <span>Processing</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-brand-500 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
