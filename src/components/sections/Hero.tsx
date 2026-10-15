'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { QuickSearchBox } from '@/components/properties/QuickSearchBox';
import { PropertyFilterState } from '@/types/filter';

export interface HeroProps {
  onSearch?: (filters: Partial<PropertyFilterState>) => void;
  departments?: string[];
}

export const Hero: React.FC<HeroProps> = ({ onSearch, departments }) => {
  return (
    <section
      id="inicio"
      aria-label="Presentación principal"
      className="relative min-h-[620px] lg:min-h-[720px] flex flex-col justify-between overflow-hidden"
    >
      {/* Imagen de fondo de alta calidad optimizada (LCP con priority) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop"
          alt="Paisaje de terrenos y colinas verdes en Colombia"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Capa de contraste y gradiente de respaldo (Garantía de contraste WCAG AA) */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-b from-forest-950/85 via-forest-950/70 to-forest-950/90
          "
          aria-hidden="true"
        />
      </div>

      {/* Contenido Editorial del Hero */}
      <div className="relative z-10 pt-16 sm:pt-20 lg:pt-28 pb-12 flex-1 flex flex-col justify-center">
        <Container size="xl">
          <div className="max-w-3xl space-y-6">
            {/* Eyebrow con tracking amplio */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900/90 border border-emerald/30 backdrop-blur-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-accent animate-pulse" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-light">
                SOLUCIONES PREMIUM EN TERRENOS Y PROPIEDADES
              </span>
            </div>

            {/* Titular Principal H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Encuentra tu Inversión en Terrenos Perfecta
            </h1>

            {/* Subtítulo Persuasivo */}
            <p className="text-lg sm:text-xl text-cream-100 font-normal leading-relaxed max-w-2xl">
              Explora parcelas campestres, fincas productivas y lotes comerciales con tradición legal
              100% verificada, escrituración al día y acompañamiento integral en las regiones con mayor
              plusvalía de Colombia.
            </p>

            {/* Sello / Insignia de Prueba Social Flotante */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <div
                className="
                  inline-flex items-center gap-3.5 bg-forest-900/90 text-cream-50
                  border border-forest-700/80 px-4 py-2.5 rounded-2xl backdrop-blur-md shadow-lg
                "
              >
                {/* Estrellas Doradas */}
                <div className="flex items-center text-amber-400 gap-0.5" aria-label="Calificación de 5 estrellas">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <div className="text-xs">
                  <p className="font-bold text-white tracking-wide">
                    Con la confianza de +10.000 clientes felices
                  </p>
                  <p className="text-cream-300 text-[11px]">
                    4.9 / 5.0 en satisfacción patrimonial
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Buscador Rápido Integrado (Barra blanca flotante) */}
      <div className="relative z-20 pb-8 sm:pb-12 -mt-4">
        <Container size="xl">
          <QuickSearchBox onSearch={onSearch} departments={departments} />
        </Container>
      </div>
    </section>
  );
};
