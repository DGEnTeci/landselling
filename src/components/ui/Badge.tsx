import React from 'react';

export type BadgeVariant =
  | 'available'
  | 'reserved'
  | 'sold'
  | 'forest'
  | 'emerald'
  | 'gold'
  | 'neutral'
  | 'outline';

export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, { container: string; dot: string }> = {
  available: {
    container: 'bg-emerald-light text-emerald-dark border border-emerald/20',
    dot: 'bg-emerald',
  },
  reserved: {
    container: 'bg-gold-light text-gold-dark border border-gold/30',
    dot: 'bg-gold',
  },
  sold: {
    container: 'bg-gray-100 text-gray-700 border border-gray-200',
    dot: 'bg-gray-500',
  },
  forest: {
    container: 'bg-forest-900 text-cream-50 border border-forest-800',
    dot: 'bg-emerald-accent',
  },
  emerald: {
    container: 'bg-emerald text-white border border-emerald-dark',
    dot: 'bg-white',
  },
  gold: {
    container: 'bg-gold text-white border border-gold-dark',
    dot: 'bg-white',
  },
  neutral: {
    container: 'bg-cream-200 text-forest-800 border border-cream-300',
    dot: 'bg-forest-600',
  },
  outline: {
    container: 'bg-transparent text-forest-900 border border-forest-800/30',
    dot: 'bg-forest-800',
  },
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'text-xs px-2.5 py-0.5 font-medium rounded-full gap-1.5',
  md: 'text-sm px-3 py-1 font-semibold rounded-full gap-2',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'available',
  size = 'sm',
  dot = false,
  className = '',
  ...props
}) => {
  const styles = variantStyles[variant];

  return (
    <span
      className={`
        inline-flex items-center tracking-wide
        ${styles.container}
        ${sizeStyles[size]}
        ${className}
      `.trim()}
      {...props}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full shrink-0 ${styles.dot}`}
          aria-hidden="true"
          data-testid="badge-dot"
        />
      )}
      <span>{children}</span>
    </span>
  );
};
