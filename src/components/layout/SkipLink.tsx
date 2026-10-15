import React from 'react';

export interface SkipLinkProps {
  targetId?: string;
  label?: string;
}

export const SkipLink: React.FC<SkipLinkProps> = ({
  targetId = 'main-content',
  label = 'Saltar al contenido principal',
}) => {
  return (
    <a
      href={`#${targetId}`}
      className="
        sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]
        px-5 py-3 rounded-xl bg-forest-900 text-white font-extrabold text-sm
        shadow-2xl border-2 border-emerald transition-transform duration-150
        focus:outline-none focus:ring-4 focus:ring-emerald/40
      "
    >
      {label}
    </a>
  );
};
