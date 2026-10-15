import React, { forwardRef, useId } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id: customId,
      disabled,
      required,
      className = '',
      type = 'text',
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = customId || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const describedBy = error ? errorId : helperText ? helperId : undefined;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-forest-900 mb-1.5"
          >
            {label}
            {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
          </label>
        )}

        <div className="relative rounded-xl shadow-xs">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-forest-600">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            required={required}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={`
              block w-full rounded-xl border bg-white text-forest-950 placeholder-forest-700/50
              min-h-[44px] px-3.5 text-base transition-colors duration-150
              focus:outline-none focus:ring-2 focus:ring-offset-1
              disabled:bg-cream-200/50 disabled:text-forest-700/50 disabled:cursor-not-allowed
              ${leftIcon ? 'pl-11' : ''}
              ${rightIcon ? 'pr-11' : ''}
              ${
                error
                  ? 'border-red-500 text-red-900 focus:border-red-500 focus:ring-red-400'
                  : 'border-cream-300 focus:border-emerald focus:ring-emerald'
              }
              ${className}
            `.trim()}
            {...props}
          />

          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-forest-600">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p id={errorId} role="alert" className="mt-1.5 text-sm font-medium text-red-600 flex items-center gap-1">
            <svg
              className="w-4 h-4 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </p>
        )}

        {!error && helperText && (
          <p id={helperId} className="mt-1.5 text-xs text-forest-700">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
