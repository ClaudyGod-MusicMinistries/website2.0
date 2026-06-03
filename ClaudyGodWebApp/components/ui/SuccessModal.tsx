'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onClose: () => void;
  autoClose?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function SuccessModal({
  isOpen,
  title = 'Success!',
  message,
  onClose,
  autoClose = 5000,
  action,
}: SuccessModalProps) {
  const [display, setDisplay] = useState(isOpen);

  useEffect(() => {
    setDisplay(isOpen);
    if (isOpen && autoClose > 0) {
      const timer = setTimeout(() => {
        setDisplay(false);
        onClose();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, onClose]);

  if (!display) return null;

  const handleClose = () => {
    setDisplay(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 flex items-start justify-between border-b border-green-100">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <h2 className="font-bricolage font-bold text-lg text-neutral-900">{title}</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-neutral-400 hover:text-neutral-600 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          <p className="font-roboto text-sm text-neutral-700 leading-relaxed">{message}</p>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex gap-3">
          {action ? (
            <>
              <button
                onClick={handleClose}
                className="flex-1 px-4 py-2.5 bg-neutral-200 text-neutral-900 font-roboto font-semibold text-sm rounded-lg hover:bg-neutral-300 transition-colors"
              >
                Done
              </button>
              <button
                onClick={() => {
                  action.onClick();
                  handleClose();
                }}
                className="flex-1 px-4 py-2.5 bg-green-600 text-white font-roboto font-semibold text-sm rounded-lg hover:bg-green-700 transition-colors"
              >
                {action.label}
              </button>
            </>
          ) : (
            <button
              onClick={handleClose}
              className="w-full px-4 py-2.5 bg-green-600 text-white font-roboto font-semibold text-sm rounded-lg hover:bg-green-700 transition-colors"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
