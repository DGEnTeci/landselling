'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';

export interface CtaBannerProps {
  onExploreProperties?: () => void;
  onRequestContact?: () => void;
  className?: string;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({
  onExploreProperties,
  onRequestContact,
  className = '',
}) => {
  const handleExplore = () => {
    if (onExploreProperties) {
      onExploreProperties();
    } else {
      const section = document.getElementById('propiedades');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section aria-label="Llamado a la acción intermedio" className={`py-12 sm:py-16 ${className}`.trim()}>
      <Container size="xl">
        <div
          className="
            relative rounded-3xl bg-forest-900 overflow-hidden shadow-2xl
            border border-forest-800 text-cream-50 grid grid-cols-1 lg:grid-cols-12
          "
        >
          {/* Columna Izquierda: Mensaje Editorial y Acciones */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6 z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-800/80 border border-emerald/30 w-fit">
              <span className="h-2 w-2 rounded-full bg-emerald-accent animate-pulse" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-light">
                ¿LISTO PARA INVERTIR?
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              Tu Terreno Ideal Está a Solo un Clic
            </h2>

            <p className="text-base sm:text-lg text-cream-200/90 leading-relaxed max-w-xl">
              Nuestros asesores jurídicos e inmobiliarios te acompañan en cada paso: desde la
              selección del lote y el estudio de títulos, hasta la firma en notaría.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Botón Principal Claro */}
              <button
                type="button"
                onClick={handleExplore}
                className="
                  inline-flex items-center justify-center gap-2 px-6 py-3.5
                  rounded-xl font-bold text-base bg-white text-forest-950 hover:bg-cream-100
                  active:bg-cream-200 transition-all duration-200 shadow-md min-h-[48px]
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald cursor-pointer
                "
              >
                <span>Explorar Propiedades</span>
                <span aria-hidden="true">→</span>
              </button>

              {/* Botón Secundario Asesoría */}
              <button
                type="button"
                onClick={onRequestContact}
                className="
                  inline-flex items-center justify-center gap-2 px-6 py-3.5
                  rounded-xl font-bold text-base bg-transparent text-cream-100
                  border-2 border-forest-700 hover:bg-forest-850 hover:border-forest-600
                  transition-all duration-200 min-h-[48px] focus:outline-none
                  focus-visible:ring-2 focus-visible:ring-emerald cursor-pointer
                "
              >
                <span>Hablar con un Asesor</span>
              </button>
            </div>
          </div>

          {/* Columna Derecha: Composición Visual con Paisaje Colombiano y Marcador */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-auto overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop"
              alt="Lotes de terreno en paisaje campestre colombiano"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center"
            />

            {/* Gradiente de Superposición Suave para Fusión */}
            <div
              className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-forest-900 via-forest-900/30 to-transparent"
              aria-hidden="true"
            />

            {/* Marcador de Ubicación Flotante en la Imagen */}
            <div
              className="
                absolute bottom-6 right-6 lg:bottom-10 lg:right-10 z-10
                bg-forest-950/85 backdrop-blur-md border border-forest-700/80
                rounded-2xl p-3.5 shadow-xl flex items-center gap-3 text-cream-50 max-w-[220px]
              "
            >
              <div className="h-10 w-10 rounded-xl bg-emerald/20 text-emerald-accent flex items-center justify-center shrink-0 border border-emerald/40">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>

              <div className="text-xs">
                <p className="font-bold text-white tracking-wide truncate">
                  Lotes en Colombia
                </p>
                <p className="text-cream-300 text-[11px]">
                  Tradición 100% legal
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
