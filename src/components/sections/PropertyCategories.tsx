'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { PropertyCategory } from '@/types/content';
import { PropertyCategorySlug } from '@/types/property';
import { getCategories } from '@/lib/data';

export interface PropertyCategoriesProps {
  categories?: PropertyCategory[];
  onSelectCategory?: (categorySlug: PropertyCategorySlug) => void;
  className?: string;
}

export const PropertyCategories: React.FC<PropertyCategoriesProps> = ({
  categories: customCategories,
  onSelectCategory,
  className = '',
}) => {
  const categoriesList = customCategories || getCategories();

  const handleCategoryClick = (slug: string) => {
    if (onSelectCategory) {
      onSelectCategory(slug as PropertyCategorySlug);
    }

    const catalogSection = document.getElementById('propiedades');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'residencial':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        );
      case 'comercial':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        );
      case 'agricola':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
        );
      case 'inversion':
      default:
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        );
    }
  };

  return (
    <section
      id="categorias"
      aria-label="Categorías de propiedades"
      className={`py-16 sm:py-24 bg-cream-50/70 border-b border-cream-200/80 ${className}`.trim()}
    >
      <Container size="xl">
        {/* Encabezado Centrado */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-light text-emerald-dark border border-emerald/20">
            Variedad y Enfoque
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-950 tracking-tight">
            Categorías de Propiedades
          </h2>
          <p className="text-base sm:text-lg text-forest-700 leading-relaxed font-normal">
            Desde lotes residenciales hasta tierras agrícolas, tenemos el terreno perfecto para ti.
          </p>
        </div>

        {/* Cuadrícula de 4 Tarjetas de Categoría */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {categoriesList.map((category) => (
            <article
              key={category.slug}
              role="button"
              tabIndex={0}
              aria-label={`Ver terrenos en categoría ${category.name}`}
              onClick={() => handleCategoryClick(category.slug)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCategoryClick(category.slug);
                }
              }}
              className="
                group relative bg-white rounded-2xl overflow-hidden border border-cream-200/90
                shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300
                flex flex-col h-full cursor-pointer focus:outline-none focus-visible:ring-2
                focus-visible:ring-emerald
              "
            >
              {/* Imagen Superior con Zoom en Hover */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream-200">
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Badge de Conteo sobre la imagen */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-forest-900/90 backdrop-blur-xs text-cream-50 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-forest-700 shadow-xs">
                    {category.count} Lotes
                  </span>
                </div>
              </div>

              {/* Contenido de la Tarjeta */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald">
                    {renderCategoryIcon(category.slug)}
                    <h3 className="text-lg font-bold text-forest-950 group-hover:text-emerald transition-colors tracking-tight">
                      {category.name}
                    </h3>
                  </div>

                  <p className="text-xs text-forest-700 leading-relaxed line-clamp-3">
                    {category.description}
                  </p>
                </div>

                {/* Pie con indicador y botón circular */}
                <div className="pt-3 border-t border-cream-200/80 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-dark">
                    Explorar Lotes
                  </span>

                  <button
                    type="button"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="
                      h-10 w-10 min-h-[40px] min-w-[40px] rounded-full bg-forest-900 text-white
                      group-hover:bg-emerald flex items-center justify-center transition-colors
                      duration-200 shadow-xs
                    "
                  >
                    <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};
