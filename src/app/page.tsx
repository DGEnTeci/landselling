'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  Hero,
  BenefitsSection,
  FeaturedProperties,
  CtaBanner,
  PropertyCategories,
  InvestmentValueSection,
  PurchaseSteps,
  TestimonialsSection,
  BlogInsightsSection,
} from '@/components/sections';
import { PropertyDetailModal } from '@/components/properties/PropertyDetailModal';
import { ContactLeadModal, WhatsAppFloatingButton } from '@/components/contact';
import { StructuredData } from '@/components/seo/StructuredData';
import { PropertyFilterState, INITIAL_FILTER_STATE } from '@/types/filter';
import { Property, PropertyCategorySlug } from '@/types/property';

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

  // Apertura general desde el botón CTA "Empezar", CtaBanner, PurchaseSteps o Blog
  const handleOpenGeneralContact = () => {
    setContactProperty(null);
    setIsContactModalOpen(true);
  };

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
    setContactProperty(null);
  };

  // Conexión funcional desde PropertyCategories hacia FeaturedProperties
  const handleSelectCategory = (categorySlug: PropertyCategorySlug) => {
    handleFilterChange({ categorySlug });
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-forest-950 font-sans selection:bg-emerald/20 selection:text-emerald-dark">
      {/* Datos Estructurados SEO Schema.org (RealEstateAgent, ItemList, Blog) */}
      <StructuredData />

      {/* Header de Navegación Sticky con Drawer Móvil */}
      <Header onGetStartedClick={handleOpenGeneralContact} />

      {/* Contenido Principal con las 9 Secciones Conceptuales Completas */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {/* 1. Sección Hero con Buscador Rápido Integrado */}
        <Hero onSearch={handleFilterChange} />

        {/* 2. Sección de Beneficios / ¿Por qué elegir LandSelling.com? */}
        <BenefitsSection />

        {/* 3. Catálogo de Propiedades Destacadas con Filtros en Tiempo Real */}
        <FeaturedProperties
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          onSelectProperty={handleSelectProperty}
        />

        {/* 4. Banner Intermedio de Conversión */}
        <CtaBanner onRequestContact={handleOpenGeneralContact} />

        {/* 5. Categorías de Propiedades con Filtrado Directo */}
        <PropertyCategories onSelectCategory={handleSelectCategory} />

        {/* 6. Sección de Inversión y Plusvalía Patrimonial */}
        <InvestmentValueSection />

        {/* 7. Pasos de Compra y Acompañamiento Notarial */}
        <PurchaseSteps onRequestContact={handleOpenGeneralContact} />

        {/* 8. Testimonios de Clientes e Inversionistas Verificados */}
        <TestimonialsSection />

        {/* 9. Blog e Insights con Modal de Lectura Completa (Task 12) */}
        <BlogInsightsSection onRequestContact={handleOpenGeneralContact} />
      </main>

      {/* Modal de Ficha Técnica Completa (Task 8) */}
      <PropertyDetailModal
        isOpen={!!selectedProperty}
        onClose={handleCloseDetailModal}
        property={selectedProperty}
        onRequestContact={handleRequestContact}
      />

      {/* Modal de Captación de Leads y Asesoría (Task 9) */}
      <ContactLeadModal
        isOpen={isContactModalOpen}
        onClose={handleCloseContactModal}
        property={contactProperty}
      />

      {/* Botón Flotante Persistente de WhatsApp */}
      <WhatsAppFloatingButton />

      {/* Footer Editorial con Newsletter y Normativas Colombianas */}
      <Footer />
    </div>
  );
}
