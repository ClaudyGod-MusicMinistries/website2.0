import { useState } from 'react';
import { BackendError } from '@/utils/apiClient';
import { getUserFriendlyError } from '@/utils/errorMessages';

interface ErrorState {
  isOpen: boolean;
  title: string;
  message: string;
  fieldErrors?: Record<string, string>;
}

export function useErrorHandler() {
  const [error, setError] = useState<ErrorState | null>(null);

  const showError = (
    title: string,
    message: string,
    fieldErrors?: Record<string, string>,
  ) => {
    setError({ isOpen: true, title, message, fieldErrors });
  };

  const handleApiError = (err: unknown, context: string = 'Operation') => {
    if (err instanceof BackendError) {
      // Backend validation errors
      if (Object.keys(err.fieldErrors).length > 0) {
        const fieldList = Object.entries(err.fieldErrors)
          .map(([field, errors]) => `${field}: ${errors[0]}`)
          .join('\n');

        showError(
          `${context} — Please Review`,
          `Please check the following:\n${fieldList}`,
          err.fieldErrors,
        );
      } else {
        showError(context, err.message || 'Something went wrong. Please try again.');
      }
    } else if (err instanceof Error) {
      showError(context, getUserFriendlyError(err));
    } else {
      showError(context, getUserFriendlyError(null));
    }
  };

  const closeError = () => {
    setError(null);
  };

  return {
    error,
    showError,
    handleApiError,
    closeError,
    hasError: error?.isOpen ?? false,
    fieldErrors: error?.fieldErrors ?? {},
  };
}
