import React, { forwardRef } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'gold' | 'ghost' | 'forest';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-emerald text-white hover:bg-emerald-hover active:bg-emerald-dark focus-visible:ring-emerald shadow-sm',
  forest:
    'bg-forest-900 text-cream-50 hover:bg-forest-800 active:bg-forest-950 focus-visible:ring-forest-700 shadow-sm',
  secondary:
    'bg-cream-200 text-forest-900 hover:bg-cream-300 active:bg-cream-300 focus-visible:ring-forest-800',
  outline:
    'border-2 border-forest-800 text-forest-900 hover:bg-forest-900 hover:text-white active:bg-forest-950 focus-visible:ring-forest-800',
  gold:
    'bg-gold text-white hover:bg-gold-dark active:bg-gold-dark focus-visible:ring-gold shadow-sm',
  ghost:
    'bg-transparent text-forest-800 hover:bg-cream-100 active:bg-cream-200 focus-visible:ring-forest-800',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-sm px-3.5 py-2 min-h-[44px] min-w-[44px] gap-1.5',
  md: 'text-base px-5 py-2.5 min-h-[44px] min-w-[44px] gap-2',
  lg: 'text-lg px-6 py-3 min-h-[48px] min-w-[48px] gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className = '',
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={isLoading}
        className={`
          inline-flex items-center justify-center font-semibold rounded-xl
          transition-all duration-200 ease-in-out cursor-pointer
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `.trim()}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
            data-testid="loading-spinner"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
