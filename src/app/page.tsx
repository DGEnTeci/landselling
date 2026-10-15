'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { FeaturedProperties } from '@/components/sections/FeaturedProperties';
import { PropertyFilterState, INITIAL_FILTER_STATE } from '@/types/filter';
import { Property } from '@/types/property';

export default function HomePage() {
  const [filters, setFilters] = useState<PropertyFilterState>(INITIAL_FILTER_STATE);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const handleFilterChange = (newFilters: Partial<PropertyFilterState>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTER_STATE);
  };

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    // Task 8 abrirá la ficha técnica modal PropertyDetailModal
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-forest-950 font-sans selection:bg-emerald/20 selection:text-emerald-dark">
      {/* Header de Navegación Sticky con Drawer Móvil */}
      <Header />

      {/* Contenido Principal */}
      <main className="flex-1">
        {/* Sección Hero con Buscador Rápido Integrado (Fuente Única de Verdad) */}
        <Hero onSearch={handleFilterChange} />

        {/* Catálogo de Propiedades Destacadas con Filtros en Tiempo Real (Task 7) */}
        <FeaturedProperties
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          onSelectProperty={handleSelectProperty}
        />
      </main>

      {/* Footer Editorial con Newsletter y Normativas Colombianas */}
      <Footer />
    </div>
  );
}
