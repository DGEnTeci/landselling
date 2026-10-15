'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export interface InvestmentValueSectionProps {
  onExploreProperties?: () => void;
  className?: string;
}

export const InvestmentValueSection: React.FC<InvestmentValueSectionProps> = ({
  onExploreProperties,
  className = '',
}) => {
  const handleExplore = () => {
    if (onExploreProperties) {
      onExploreProperties();
    } else {
      const target = document.getElementById('propiedades');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="inversion"
      aria-label="Beneficios de inversión en tierras"
      className={`relative py-20 sm:py-28 bg-forest-950 text-cream-50 overflow-hidden ${className}`.trim()}
    >
      {/* Imagen de fondo panorámica con overlay oscuro */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop"
          alt="Cordillera y montañas verdes de Colombia"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/90 to-forest-950" />
      </div>

      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Columna Izquierda: Mensaje Editorial y Métricas */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900 border border-gold/30">
              <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-widest text-gold-light">
                MÁS QUE UNA PROPIEDAD
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              Una Inversión Inteligente para tu Futuro
            </h2>

            <p className="text-base sm:text-lg text-cream-200/90 leading-relaxed max-w-2xl font-normal">
              La tierra es un activo tangible de oferta limitada y demanda creciente. En Colombia,
              las nuevas vías de cuarta generación (4G) y el auge del turismo rural impulsan una
              valorización sostenida por encima de la inflación, blindando tu patrimonio familiar.
            </p>

            {/* Métricas Clave */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-forest-900/80 border border-forest-800">
                <span className="text-2xl sm:text-3xl font-extrabold text-gold block">
                  +18.4%
                </span>
                <span className="text-xs text-cream-300 font-medium mt-1 block">
                  Plusvalía Anual Estimada
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-forest-900/80 border border-forest-800">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-accent block">
                  100%
                </span>
                <span className="text-xs text-cream-300 font-medium mt-1 block">
                  Títulos con Tradición Legal
                </span>
              </div>

              <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-forest-900/80 border border-forest-800">
                <span className="text-2xl sm:text-3xl font-extrabold text-white block">
                  +45.000
                </span>
                <span className="text-xs text-cream-300 font-medium mt-1 block">
                  Hectáreas Gestionadas
                </span>
              </div>
            </div>

            {/* Botón CTA Dorado */}
            <div className="pt-2">
              <Button
                variant="gold"
                size="lg"
                onClick={handleExplore}
                rightIcon={<span aria-hidden="true">→</span>}
              >
                Explorar Propiedades
              </Button>
            </div>
          </div>

          {/* Columna Derecha: Tarjeta Blanca Flotante con Vista Aérea */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl text-forest-950 border border-cream-200">
              {/* Vista aérea / Fotografía del lote */}
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-forest-900">
                <Image
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800&auto=format&fit=crop"
                  alt="Vista aérea de terreno delimitado en Colombia"
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover"
                />

                {/* Badge de delimitación */}
                <div className="absolute top-3 left-3 bg-forest-950/85 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full border border-forest-700">
                  Topografía Verificada
                </div>
              </div>

              {/* Pie de tarjeta con Icono TrendingUp */}
              <div className="mt-4 pt-4 border-t border-cream-200 flex items-center gap-3.5">
                <div className="h-11 w-11 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100 shadow-xs">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>

                <div className="text-xs leading-snug">
                  <p className="font-extrabold text-forest-950">
                    La inversión en tierra hace crecer tu patrimonio
                  </p>
                  <p className="text-forest-700 text-[11px] mt-0.5">
                    Activo real libre de volatilidad especulativa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
