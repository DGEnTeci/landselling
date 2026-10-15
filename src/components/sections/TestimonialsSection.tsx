'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Testimonial } from '@/types/content';
import { getTestimonials } from '@/lib/data';

export interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
  className?: string;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials: customTestimonials,
  className = '',
}) => {
  const allTestimonials = customTestimonials || getTestimonials();
  const [showAll, setShowAll] = useState(false);

  // Mostrar los primeros 3 testimonios por defecto o todos si se solicita
  const displayed = showAll ? allTestimonials : allTestimonials.slice(0, 3);

  return (
    <section
      id="testimonios"
      aria-label="Testimonios de clientes e inversionistas"
      className={`py-16 sm:py-24 bg-cream-100/50 border-b border-cream-200/80 ${className}`.trim()}
    >
      <Container size="xl">
        {/* Encabezado con Botón a la Derecha */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-light text-emerald-dark border border-emerald/20">
              Experiencias Reales
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-950 tracking-tight">
              Lo que Dicen Nuestros Clientes
            </h2>
            <p className="text-base sm:text-lg text-forest-700 font-normal leading-relaxed">
              Personas reales. Historias reales. Inversiones reales.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="
              inline-flex items-center gap-2 text-sm font-bold text-emerald-dark
              hover:text-emerald transition-colors self-start md:self-end
              focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded-lg py-1 px-2
            "
          >
            <span>{showAll ? 'Mostrar Menos Reseñas' : 'Ver Más Reseñas'}</span>
            <span aria-hidden="true">{showAll ? '↑' : '→'}</span>
          </button>
        </div>

        {/* Cuadrícula de Tarjetas de Testimonio */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayed.map((item) => (
            <article
              key={item.id}
              className="
                bg-white rounded-2xl p-6 sm:p-7 border border-cream-200/90
                shadow-card hover:shadow-card-hover transition-all duration-300
                flex flex-col justify-between space-y-5
              "
            >
              <div className="space-y-4">
                {/* Cabecera del Testimonio: Avatar + Datos del Inversionista */}
                <div className="flex items-center gap-3.5">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden shrink-0 border-2 border-cream-300 bg-cream-200">
                    <Image
                      src={item.avatarUrl}
                      alt={item.authorName}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-forest-950 leading-snug">
                      {item.authorName}
                    </h3>
                    <p className="text-xs text-forest-600 leading-tight">
                      {item.role}
                    </p>
                    <p className="text-[11px] text-emerald-dark font-semibold mt-0.5 flex items-center gap-1">
                      <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{item.location}</span>
                    </p>
                  </div>
                </div>

                {/* Cita Textual */}
                <p className="text-xs sm:text-sm text-forest-800 leading-relaxed italic">
                  “{item.quote}”
                </p>
              </div>

              {/* Pie de la Tarjeta: Propiedad Adquirida y 5 Estrellas Doradas */}
              <div className="pt-4 border-t border-cream-200/70 flex items-center justify-between gap-2">
                <div className="text-[11px] text-forest-600 truncate max-w-[160px]">
                  <span className="font-bold text-forest-800 block truncate">
                    {item.propertyPurchased}
                  </span>
                  <span>{item.propertyArea}</span>
                </div>

                {/* 5 Estrellas Doradas */}
                <div className="flex items-center text-amber-400 gap-0.5 shrink-0" aria-label={`Calificación de ${item.rating} estrellas`}>
                  {[...Array(item.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};
