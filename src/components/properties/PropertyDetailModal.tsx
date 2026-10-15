'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Property } from '@/types/property';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge, BadgeVariant } from '@/components/ui/Badge';
import { formatCOP, formatAreaSurface } from '@/lib/formatters';
import { generateWhatsAppPropertyUrl } from '@/lib/whatsapp';
import { SITE_CONFIG } from '@/config/site';

export interface PropertyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
  onRequestContact?: (property: Property) => void;
  whatsappPhone?: string;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  isOpen,
  onClose,
  property,
  onRequestContact,
  whatsappPhone = SITE_CONFIG.contact.whatsappNumber,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reiniciar índice de imagen activa cada vez que cambie la propiedad seleccionada
  useEffect(() => {
    setActiveImageIndex(0);
  }, [property?.id]);

  if (!property) return null;

  const images =
    property.galleryUrls && property.galleryUrls.length > 0
      ? property.galleryUrls
      : property.imageUrl
      ? [property.imageUrl]
      : [];

  const currentImage = images[activeImageIndex] || property.imageUrl || '';

  const getBadgeVariant = (status: Property['status']): BadgeVariant => {
    switch (status) {
      case 'en_venta':
        return 'available';
      case 'bajo_oferta':
        return 'reserved';
      case 'vendido':
        return 'sold';
      default:
        return 'available';
    }
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const pricePerM2 =
    property.areaSquareMeters && property.areaSquareMeters > 0
      ? Math.round(property.priceCOP / property.areaSquareMeters)
      : property.pricePerSquareMeterCOP || 0;

  const whatsappUrl = generateWhatsAppPropertyUrl(whatsappPhone, property);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={property.title}
      description={`Referencia: ${property.id.toUpperCase()} • ${property.location.municipality}, ${property.location.department}`}
      maxWidth="4xl"
    >
      <div className="space-y-8 text-forest-950">
        {/* 1. Galería Fotográfica Interactiva */}
        <div className="space-y-3">
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-forest-950 border border-cream-300 shadow-sm">
            {currentImage && (
              <Image
                src={currentImage}
                alt={`${property.title} - Vista ${activeImageIndex + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover object-center transition-all duration-300"
              />
            )}

            {/* Badges Flotantes sobre la Imagen */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <Badge variant={getBadgeVariant(property.status)} size="md" dot>
                {property.statusLabel || (property.status === 'en_venta' ? 'En Venta' : 'Bajo Oferta')}
              </Badge>
              <Badge variant="forest" size="md">
                {property.categoryName}
              </Badge>
            </div>

            {/* Controles de Navegación (si hay más de 1 imagen) */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  aria-label="Imagen anterior"
                  className="
                    absolute left-3 top-1/2 -translate-y-1/2 z-10
                    h-10 w-10 min-h-[44px] min-w-[44px] rounded-full bg-forest-950/70 text-white
                    hover:bg-forest-950 flex items-center justify-center
                    backdrop-blur-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald
                  "
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={handleNextImage}
                  aria-label="Imagen siguiente"
                  className="
                    absolute right-3 top-1/2 -translate-y-1/2 z-10
                    h-10 w-10 min-h-[44px] min-w-[44px] rounded-full bg-forest-950/70 text-white
                    hover:bg-forest-950 flex items-center justify-center
                    backdrop-blur-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald
                  "
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <div className="absolute bottom-3 right-3 z-10 bg-forest-950/80 backdrop-blur-xs text-cream-50 text-xs px-2.5 py-1 rounded-lg">
                  {activeImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          {/* Carrusel de Miniaturas (Thumbnails) */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Miniaturas de la galería">
              {images.map((img, idx) => {
                const isActive = activeImageIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Ver imagen ${idx + 1}`}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`
                      relative h-16 w-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald
                      ${isActive ? 'border-emerald scale-95 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'}
                    `}
                  >
                    <Image
                      src={img}
                      alt={`Miniatura ${idx + 1}`}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 2. Bloque Financiero y de Superficie */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-5 rounded-2xl border border-cream-200 shadow-xs">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-forest-700">
              Precio Total (COP)
            </span>
            <p className="text-2xl sm:text-3xl font-extrabold text-forest-900 mt-0.5">
              {formatCOP(property.priceCOP)}
            </p>
          </div>

          <div className="sm:border-l sm:border-cream-200 sm:pl-4">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-700">
              Superficie Total
            </span>
            <p className="text-lg font-bold text-forest-900 mt-1">
              {formatAreaSurface(property.areaHectares, property.areaSquareMeters)}
            </p>
          </div>

          <div className="sm:border-l sm:border-cream-200 sm:pl-4">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-700">
              Valor por Metro Cuadrado
            </span>
            <p className="text-lg font-bold text-emerald-dark mt-1">
              {formatCOP(pricePerM2)} / m²
            </p>
          </div>
        </div>

        {/* 3. Descripción del Terreno */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-forest-900">
            Descripción de la Propiedad
          </h3>
          <p className="text-sm sm:text-base text-forest-800 leading-relaxed">
            {property.fullDescription || property.shortDescription}
          </p>
        </div>

        {/* 4. Viabilidad Técnica y Servicios */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-forest-900">
            Viabilidad Técnica y Servicios Disponibles
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Topografía */}
            <div className="p-3.5 rounded-xl bg-cream-100/70 border border-cream-300">
              <span className="text-xs font-semibold text-forest-700 block">Topografía</span>
              <span className="text-sm font-bold text-forest-950 mt-0.5 block">
                {property.topographyLabel || property.topography}
              </span>
            </div>

            {/* Vías de Acceso */}
            <div className="p-3.5 rounded-xl bg-cream-100/70 border border-cream-300">
              <span className="text-xs font-semibold text-forest-700 block">Acceso Vial</span>
              <span className="text-sm font-bold text-forest-950 mt-0.5 block">
                {property.accessRoadLabel || property.accessRoad}
              </span>
            </div>

            {/* Agua y Acueducto */}
            <div className="p-3.5 rounded-xl bg-cream-100/70 border border-cream-300">
              <span className="text-xs font-semibold text-forest-700 block">Disponibilidad Hídrica</span>
              <span className="text-sm font-bold text-forest-950 mt-0.5 block">
                {property.utilities.waterSource || (property.utilities.hasWater ? 'Agua veredal' : 'Pendiente conexión')}
              </span>
            </div>

            {/* Energía y Conectividad */}
            <div className="p-3.5 rounded-xl bg-cream-100/70 border border-cream-300">
              <span className="text-xs font-semibold text-forest-700 block">Energía y Fibra</span>
              <span className="text-sm font-bold text-forest-950 mt-0.5 block">
                {property.utilities.hasElectricity ? 'Red Eléctrica' : 'Sin red'}{' '}
                {property.utilities.hasInternetFiber ? '• Fibra Óptica' : ''}
              </span>
            </div>
          </div>
        </div>

        {/* 5. Bloque de Seguridad Jurídica Colombiana */}
        <div className="bg-emerald-light/60 border border-emerald/30 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2.5 text-emerald-dark">
            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <h4 className="font-bold text-base text-forest-950 tracking-tight">
              Seguridad y Tradición Jurídica Verificada
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-forest-900">
            <div className="flex items-start gap-2">
              <span className="text-emerald font-bold">✓</span>
              <span><strong>Escrituración:</strong> {property.legal.deedStatus}</span>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-emerald font-bold">✓</span>
              <span>
                <strong>Matrícula Inmobiliaria:</strong>{' '}
                {property.legal.hasIndependentFolio ? 'Folio individual asignado' : 'En proceso'}
              </span>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-emerald font-bold">✓</span>
              <span>
                <strong>Estado de Gravámenes:</strong>{' '}
                {property.legal.freeOfEncumbrances ? 'Libre de hipotecas y embargos' : 'Con gravamen'}
              </span>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-emerald font-bold">✓</span>
              <span><strong>Uso de Suelo:</strong> {property.legal.potLandUse}</span>
            </div>
          </div>
        </div>

        {/* 6. Puntos Destacados (Highlights) */}
        {property.highlights && property.highlights.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-forest-700">
              Características Destacadas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {property.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-forest-800">
                  <span className="h-2 w-2 rounded-full bg-emerald shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. Barra de Conversión (Doble Canal) */}
        <div className="pt-4 border-t border-cream-200 flex flex-col sm:flex-row items-center justify-end gap-3.5">
          {/* CTA Secundario: WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              w-full sm:w-auto inline-flex items-center justify-center gap-2
              px-5 py-3 rounded-xl font-bold text-sm bg-white text-forest-900
              border-2 border-forest-800 hover:bg-forest-900 hover:text-white
              transition-colors duration-200 min-h-[44px] focus:outline-none
              focus-visible:ring-2 focus-visible:ring-forest-800 text-center
            "
          >
            <svg className="w-5 h-5 text-emerald shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.588 1.961.92 2.796.921 3.183 0 5.77-2.587 5.77-5.768 0-3.18-2.587-5.768-5.77-5.768zm0 10.364c-.753 0-1.637-.282-2.355-.708l-.169-.1-1.579.414.421-1.54-.111-.176c-.469-.747-.716-1.517-.716-2.488 0-2.483 2.02-4.503 4.508-4.503 2.484 0 4.505 2.02 4.505 4.504 0 2.484-2.02 4.505-4.504 4.505z" />
            </svg>
            <span>Hablar por WhatsApp</span>
          </a>

          {/* CTA Primario: Solicitar Asesoría / Visita */}
          <Button
            variant="primary"
            size="md"
            className="w-full sm:w-auto font-bold"
            onClick={() => {
              if (onRequestContact) {
                onRequestContact(property);
              }
            }}
          >
            Solicitar Visita / Asesoría
          </Button>
        </div>
      </div>
    </Modal>
  );
};
