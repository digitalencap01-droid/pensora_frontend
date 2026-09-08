import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  isLoading?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
  isLoading = false
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-dashed border-[#F3DEC8] rounded-[24px] sm:rounded-[28px] bg-white/70 shadow-xs my-4 min-h-[300px]">
      <div className="p-3.5 bg-[#FFF1EB] rounded-2xl text-[#D94A2A] border border-[#FAD8C7] mb-4">
        {icon}
      </div>
      <h3 className="text-base sm:text-lg font-black text-[#1E122C] mb-1.5">{title}</h3>
      <p className="text-xs sm:text-sm text-[#6B5E77] font-medium max-w-sm mb-6 leading-relaxed">{description}</p>
      {actionText && onAction && (
        <Button variant="primary" onClick={onAction} isLoading={isLoading}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
export default EmptyState;
