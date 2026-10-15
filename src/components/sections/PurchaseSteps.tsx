'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export interface PurchaseStepsProps {
  onRequestContact?: () => void;
  className?: string;
}

export const stepsData = [
  {
    step: 1,
    title: 'Buscar Propiedades',
    description:
      'Explora y filtra nuestro catálogo con lotes clasificados por departamento, uso de suelo y presupuesto.',
  },
  {
    step: 2,
    title: 'Contactar a Nuestros Expertos',
    description:
      'Recibe el estudio de títulos, planos topográficos y coordina una visita presencial con nuestro equipo.',
  },
  {
    step: 3,
    title: 'Completar la Compra',
    description:
      'Firma de promesa de compraventa y escrituración en notaría con tradición jurídica garantizada al 100%.',
  },
];

export const PurchaseSteps: React.FC<PurchaseStepsProps> = ({
  onRequestContact,
  className = '',
}) => {
  return (
    <section
      id="pasos"
      aria-label="Pasos para comprar terreno en Colombia"
      className={`py-16 sm:py-24 bg-white border-b border-cream-200/80 ${className}`.trim()}
    >
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Bloque Izquierdo: Lista Ordenada de Pasos (bg-forest-900) */}
          <div className="lg:col-span-7 bg-forest-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-forest-800 text-emerald-light border border-forest-700">
                PROCESO TRANSPARENTE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Pasos Sencillos para ser Dueño de tu Terreno
              </h2>
              <p className="text-sm sm:text-base text-cream-200/90 leading-relaxed max-w-xl font-normal">
                Un proceso simple y transparente, desde la búsqueda hasta la escrituración.
              </p>
            </div>

            {/* Lista Ordenada Semántica */}
            <ol className="my-8 space-y-6 relative border-l-2 border-forest-700/80 ml-5 pl-6">
              {stepsData.map((item) => (
                <li key={item.step} className="relative group">
                  {/* Círculo Blanco Numerado */}
                  <div
                    className="
                      absolute -left-[45px] top-0 h-10 w-10 rounded-full bg-white
                      text-forest-950 font-extrabold flex items-center justify-center
                      shadow-md text-base ring-4 ring-forest-900
                    "
                    aria-hidden="true"
                  >
                    {item.step}
                  </div>

                  <div className="space-y-1 pt-0.5">
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-cream-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Botón Dorado CTA */}
            <div className="pt-2">
              <Button
                variant="gold"
                size="lg"
                onClick={onRequestContact}
                rightIcon={<span aria-hidden="true">→</span>}
              >
                Empezar Ahora
              </Button>
            </div>
          </div>

          {/* Bloque Derecho: Fotografía + Tarjeta Flotante de Confianza */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden min-h-[460px] shadow-xl border border-cream-200">
            <Image
              src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1200&auto=format&fit=crop"
              alt="Paisaje de parcelación y terrenos campestres en Colombia"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-center"
            />

            {/* Overlay sutil */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" />

            {/* Tarjeta Flotante de Satisfacción y Confianza */}
            <div
              className="
                absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md
                rounded-2xl p-6 shadow-2xl border border-cream-200/90 text-forest-950
              "
            >
              {/* Comillas Doradas */}
              <div className="text-gold font-serif text-4xl leading-none -mt-2 mb-1" aria-hidden="true">
                “
              </div>

              <h3 className="text-base font-bold text-forest-950 tracking-tight">
                Tu satisfacción es nuestra prioridad
              </h3>
              <p className="text-xs text-forest-700 leading-relaxed mt-1">
                Garantizamos que cada metro cuadrado esté respaldado por un estudio legal exhaustivo
                ante notarías y oficinas de registro.
              </p>

              {/* Fila de Avatares Circulares */}
              <div className="mt-4 pt-4 border-t border-cream-200 flex items-center justify-between">
                <div className="flex -space-x-2 overflow-hidden">
                  {[
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=120&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=120&auto=format&fit=crop',
                  ].map((src, idx) => (
                    <div
                      key={idx}
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden relative bg-forest-800"
                    >
                      <Image src={src} alt="Cliente satisfecho" fill sizes="32px" className="object-cover" />
                    </div>
                  ))}
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-extrabold text-forest-900 block">
                    +10.000 Familias
                  </span>
                  <span className="text-[10px] text-emerald-dark font-semibold block">
                    Propietarios Verificados
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
