import React from 'react';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  size?: ContainerSize;
}

const sizeClasses: Record<ContainerSize, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
};

export const Container: React.FC<ContainerProps> = ({
  as: Component = 'div',
  size = 'xl',
  className = '',
  children,
  ...props
}) => {
  return (
    <Component
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizeClasses[size]} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
};
