'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { FeaturedProperties } from '@/components/sections/FeaturedProperties';
import { PropertyDetailModal } from '@/components/properties/PropertyDetailModal';
import { ContactLeadModal, WhatsAppFloatingButton } from '@/components/contact';
import { PropertyFilterState, INITIAL_FILTER_STATE } from '@/types/filter';
import { Property } from '@/types/property';

export default function HomePage() {
  const [filters, setFilters] = useState<PropertyFilterState>(INITIAL_FILTER_STATE);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [contactProperty, setContactProperty] = useState<Property | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

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
  };

  const handleCloseDetailModal = () => {
    setSelectedProperty(null);
  };

  // Transición limpia sin superposición entre el modal de detalle y el modal de captación de leads
  const handleRequestContact = (property: Property) => {
    setSelectedProperty(null);
    setContactProperty(property);
    setIsContactModalOpen(true);
  };

  // Apertura general desde el botón CTA "Empezar" del Header
  const handleOpenGeneralContact = () => {
    setContactProperty(null);
    setIsContactModalOpen(true);
  };

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
    setContactProperty(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-forest-950 font-sans selection:bg-emerald/20 selection:text-emerald-dark">
      {/* Header de Navegación Sticky con Drawer Móvil y callback de CTA Empezar */}
      <Header onGetStartedClick={handleOpenGeneralContact} />

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

      {/* Modal de Ficha Técnica Completa (Task 8) */}
      <PropertyDetailModal
        isOpen={!!selectedProperty}
        onClose={handleCloseDetailModal}
        property={selectedProperty}
        onRequestContact={handleRequestContact}
      />

      {/* Modal de Captación de Leads y Asesoría (Task 9 - Checkpoint 3) */}
      <ContactLeadModal
        isOpen={isContactModalOpen}
        onClose={handleCloseContactModal}
        property={contactProperty}
      />

      {/* Botón Flotante Persistente de WhatsApp (Task 9) */}
      <WhatsAppFloatingButton />

      {/* Footer Editorial con Newsletter y Normativas Colombianas */}
      <Footer />
    </div>
  );
}
