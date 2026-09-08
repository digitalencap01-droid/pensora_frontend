import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md'
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className={`relative bg-white w-full ${sizeClasses[size]} rounded-[28px] shadow-2xl border border-[#F3DEC8] flex flex-col z-10 animate-in fade-in zoom-in-95 duration-200 overflow-hidden`}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#F3DEC8]/70 bg-gradient-to-b from-[#FFF8F5] to-white">
          <h3 className="text-base sm:text-lg font-black text-[#1E122C]">{title}</h3>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#6B5E77] hover:bg-[#FAF5F0] hover:text-[#1E122C] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-7 overflow-y-auto max-h-[70vh] text-xs sm:text-sm text-[#6B5E77] leading-relaxed">
          {children}
        </div>

        {/* Footer */}
        {footer !== undefined ? (
          <div className="p-5 sm:p-6 border-t border-[#F3DEC8]/70 flex justify-end gap-3 bg-[#FFF8F5]">
            {footer}
          </div>
        ) : (
          <div className="p-5 sm:p-6 border-t border-[#F3DEC8]/70 flex justify-end gap-3 bg-[#FFF8F5]">
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>
        )}
      </div>
    </div>
  );
};
