'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Container } from '@/components/ui/Container';
import { PropertyFilterState, INITIAL_FILTER_STATE } from '@/types/filter';

export default function HomePage() {
  const [filters, setFilters] = useState<PropertyFilterState>(INITIAL_FILTER_STATE);

  const handleSearch = (newFilters: Partial<PropertyFilterState>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-forest-950 font-sans selection:bg-emerald/20 selection:text-emerald-dark">
      {/* Header Sticky */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        {/* Sección Hero con Buscador Rápido Integrado */}
        <Hero onSearch={handleSearch} />

        {/* Sección Ancla para Catálogo de Propiedades (Fase 3: Task 7) */}
        <section id="propiedades" className="py-16 sm:py-20 border-b border-cream-200" aria-label="Catálogo de propiedades">
          <Container size="xl">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-light text-emerald-dark border border-emerald/20">
                Catálogo Exclusivo
              </span>
              <h2 className="text-3xl font-extrabold text-forest-900 tracking-tight">
                Terrenos y Lotes Destacados
              </h2>
              <p className="text-base text-forest-700">
                Propiedades con título legal transparente y listas para escrituración en Colombia.
              </p>
              {filters.department !== 'todos' || filters.categorySlug !== 'todas' ? (
                <div className="pt-2 text-sm text-forest-800 bg-white inline-block px-4 py-2 rounded-xl border border-cream-300 shadow-xs">
                  Filtros activos desde el buscador: <strong>{filters.department}</strong> |{' '}
                  <strong>{filters.categorySlug}</strong>
                </div>
              ) : null}
            </div>
          </Container>
        </section>
      </main>

      {/* Footer Editorial */}
      <Footer />
    </div>
  );
}
