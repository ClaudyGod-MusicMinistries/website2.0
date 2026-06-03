'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

export type ToastType = 'error' | 'success' | 'info';

interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

function Toast({ id, type, title, message, duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose(id), 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, id, onClose]);

  const bgColor = {
    error: 'bg-red-50 border-red-200',
    success: 'bg-green-50 border-green-200',
    info: 'bg-blue-50 border-blue-200',
  }[type];

  const textColor = {
    error: 'text-red-900',
    success: 'text-green-900',
    info: 'text-blue-900',
  }[type];

  const Icon = {
    error: AlertCircle,
    success: CheckCircle2,
    info: Info,
  }[type];

  const iconColor = {
    error: 'text-red-600',
    success: 'text-green-600',
    info: 'text-blue-600',
  }[type];

  return (
    <div
      className={`transform transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className={`${bgColor} border rounded-lg shadow-lg p-4 flex items-start gap-3 min-w-80`}>
        <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <h3 className={`font-raleway font-semibold text-sm ${textColor}`}>{title}</h3>
          {message && <p className={`font-raleway text-xs ${textColor} opacity-90 mt-1`}>{message}</p>}
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onClose(id), 300);
          }}
          className={`flex-shrink-0 p-1 hover:bg-black/5 rounded transition-colors`}
        >
          <X className={`w-4 h-4 ${textColor}`} />
        </button>
      </div>
    </div>
  );
}

interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextProps {
  toasts: ToastItem[];
  showToast: (type: ToastType, title: string, message?: string, duration?: number) => void;
  removeToast: (id: string) => void;
}

let toastIdCounter = 0;

export const useToast = (): Omit<ToastContextProps, 'toasts'> & { toasts: ToastItem[] } => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (type: ToastType, title: string, message?: string, duration?: number) => {
    const id = `toast-${++toastIdCounter}`;
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, showToast, removeToast };
};

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast
            id={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
            duration={toast.duration}
            onClose={removeToast}
          />
        </div>
      ))}
    </div>
  );
}
