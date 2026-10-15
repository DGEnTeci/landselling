'use client';

import React from 'react';
import Image from 'next/image';
import { Property } from '@/types/property';
import { Badge, BadgeVariant } from '@/components/ui/Badge';
import { formatCOP, formatAreaSurface } from '@/lib/formatters';

export interface PropertyCardProps {
  property: Property;
  onSelectProperty?: (property: Property) => void;
  className?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelectProperty,
  className = '',
}) => {
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

  const handleClick = () => {
    if (onSelectProperty) {
      onSelectProperty(property);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <article
      tabIndex={0}
      role="button"
      aria-label={`Ver ficha de ${property.title}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`
        group relative bg-white rounded-2xl overflow-hidden border border-cream-200/90
        shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300
        flex flex-col h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald
        ${className}
      `.trim()}
    >
      {/* Contenedor de Imagen Superior con Aspect Ratio */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream-200">
        <Image
          src={property.imageUrl}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Badge de Estado en la esquina superior izquierda */}
        <div className="absolute top-3 left-3 z-10">
          <Badge variant={getBadgeVariant(property.status)} size="sm" dot>
            {property.statusLabel || (property.status === 'en_venta' ? 'En Venta' : property.status === 'bajo_oferta' ? 'Bajo Oferta' : 'Vendido')}
          </Badge>
        </div>

        {/* Badge de Destacado opcional */}
        {property.featured && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-forest-900/90 backdrop-blur-xs text-cream-50 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-forest-700 shadow-xs">
              Destacado
            </span>
          </div>
        )}
      </div>

      {/* Cuerpo de la Tarjeta */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Ubicación con Icono MapPin */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-forest-700 mb-1.5">
            <svg
              className="w-4 h-4 text-emerald shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">
              {property.location.municipality}, {property.location.department}
            </span>
          </div>

          {/* Título de la Propiedad */}
          <h3 className="text-lg font-bold text-forest-950 group-hover:text-emerald transition-colors line-clamp-1 tracking-tight">
            {property.title}
          </h3>

          {/* Línea de Metadatos: Superficie dual (ha / m²) • Categoría */}
          <p className="mt-2 text-xs font-semibold text-forest-700/90 tracking-wide">
            {formatAreaSurface(property.areaHectares, property.areaSquareMeters)} • {property.categoryName}
          </p>
        </div>

        {/* Pie de Tarjeta Alineado Horizontalmente */}
        <div className="mt-4 pt-4 border-t border-cream-200/80 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase font-bold text-forest-600 tracking-wider">
              Precio
            </span>
            <span className="text-xl font-extrabold text-forest-900 tracking-tight">
              {formatCOP(property.priceCOP)}
            </span>
          </div>

          {/* Botón de Acción Circular con Flecha */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            aria-label={`Ver detalles de ${property.title}`}
            className="
              h-11 w-11 min-h-[44px] min-w-[44px] rounded-full bg-forest-900 text-white
              hover:bg-emerald group-hover:bg-emerald flex items-center justify-center
              transition-colors duration-200 shadow-sm focus:outline-none
              focus-visible:ring-2 focus-visible:ring-emerald shrink-0
            "
          >
            <svg
              className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
};
