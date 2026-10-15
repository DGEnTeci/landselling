'use client';

import React from 'react';
import { SITE_CONFIG } from '@/config/site';
import { sanitizeColombianPhone } from '@/lib/formatters';

export interface WhatsAppFloatingButtonProps {
  whatsappPhone?: string;
  defaultMessage?: string;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  whatsappPhone = SITE_CONFIG.contact.whatsappNumber,
  defaultMessage = '👋 ¡Hola, equipo de LandSelling! Me gustaría recibir información y asesoría sobre lotes y terrenos disponibles en Colombia.',
}) => {
  const cleanPhone = sanitizeColombianPhone(whatsappPhone) || '573000000000';
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <aside
      aria-label="Canal de contacto directo por WhatsApp"
      className="fixed bottom-6 right-6 z-30 flex items-center gap-3 pointer-events-auto"
    >
      {/* Pill / Tooltip persuasivo visible en desktop y hover en móvil */}
      <div
        className="
          hidden sm:flex items-center gap-2 bg-white/95 text-forest-900 font-bold
          text-xs px-3.5 py-2 rounded-full shadow-lg border border-cream-200/90
          backdrop-blur-xs transition-transform duration-200 hover:scale-105
        "
      >
        <span className="h-2 w-2 rounded-full bg-emerald-accent animate-pulse" aria-hidden="true" />
        <span>¿Dudas? Habla con un experto</span>
      </div>

      {/* Botón flotante accesible */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar a un asesor por WhatsApp"
        className="
          relative h-14 w-14 min-h-[48px] min-w-[48px] rounded-full bg-emerald text-white
          hover:bg-emerald-hover flex items-center justify-center shadow-xl
          transition-all duration-300 hover:scale-110 active:scale-95
          focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald/40
        "
      >
        {/* Efecto de onda sutil */}
        <span
          className="absolute inset-0 rounded-full bg-emerald opacity-30 animate-ping -z-10"
          aria-hidden="true"
        />

        <svg
          className="w-7 h-7 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.588 1.961.92 2.796.921 3.183 0 5.77-2.587 5.77-5.768 0-3.18-2.587-5.768-5.77-5.768zm0 10.364c-.753 0-1.637-.282-2.355-.708l-.169-.1-1.579.414.421-1.54-.111-.176c-.469-.747-.716-1.517-.716-2.488 0-2.483 2.02-4.503 4.508-4.503 2.484 0 4.505 2.02 4.505 4.504 0 2.484-2.02 4.505-4.504 4.505z" />
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.05 21.65a.75.75 0 00.912.913l4.526-1.373A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 01-4.248-1.218.75.75 0 00-.518-.094l-3.328 1.01.996-3.265a.75.75 0 00-.097-.532A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
        </svg>
      </a>
    </aside>
  );
};
