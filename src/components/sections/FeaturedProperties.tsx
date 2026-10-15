'use client';

import React from 'react';
import { Property, PropertyCategorySlug } from '@/types/property';
import { PropertyFilterState, SortOption } from '@/types/filter';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { filterProperties } from '@/lib/filters';
import { getProperties, getAvailableDepartments, getCategories } from '@/lib/data';

export interface FeaturedPropertiesProps {
  filters: PropertyFilterState;
  onFilterChange: (filters: Partial<PropertyFilterState>) => void;
  onResetFilters: () => void;
  onSelectProperty?: (property: Property) => void;
  properties?: Property[];
  departments?: string[];
  className?: string;
}

export const CATEGORY_TABS: Array<{ slug: PropertyCategorySlug | 'todas'; label: string }> = [
  { slug: 'todas', label: 'Todos' },
  { slug: 'residencial', label: 'Residencial' },
  { slug: 'comercial', label: 'Comercial' },
  { slug: 'agricola', label: 'Agrícola' },
  { slug: 'inversion', label: 'Inversión' },
];

export const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: 'relevancia', label: 'Relevancia y Destacados' },
  { value: 'precio_menor', label: 'Precio: Menor a Mayor' },
  { value: 'precio_mayor', label: 'Precio: Mayor a Menor' },
  { value: 'area_menor', label: 'Área: Menor a Mayor' },
  { value: 'area_mayor', label: 'Área: Mayor a Menor' },
];

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  onSelectProperty,
  properties: customProperties,
  departments: customDepartments,
  className = '',
}) => {
  const allProperties = customProperties || getProperties();
  const availableDepartments = customDepartments || getAvailableDepartments();
  const availableCategories = getCategories();

  // Filtrado reactivo en tiempo real utilizando el motor de filtros puro (Task 3)
  const filteredProperties = filterProperties(allProperties, filters);

  const handleCategorySelect = (categorySlug: PropertyCategorySlug | 'todas') => {
    onFilterChange({ categorySlug });
  };

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ searchQuery: e.target.value });
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ department: e.target.value });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ sortBy: e.target.value as SortOption });
  };

  return (
    <section
      id="propiedades"
      aria-label="Catálogo de propiedades destacadas"
      className={`py-16 sm:py-24 bg-cream-50 ${className}`.trim()}
    >
      <Container size="xl">
        {/* Encabezado Editorial de Sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-light text-emerald-dark border border-emerald/20">
              Catálogo Exclusivo
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-950 tracking-tight">
              Terrenos y Propiedades Destacadas
            </h2>
            <p className="text-base sm:text-lg text-forest-700 font-normal leading-relaxed">
              Oportunidades seleccionadas cuidadosamente para tu próxima gran inversión.
            </p>
          </div>

          <button
            type="button"
            onClick={onResetFilters}
            className="
              inline-flex items-center gap-2 text-sm font-bold text-emerald-dark
              hover:text-emerald transition-colors self-start md:self-end
              focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded-lg py-1 px-2
            "
          >
            <span>Ver Todas las Propiedades</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>

        {/* Pestañas de Categorías (Tabs) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none" role="tablist" aria-label="Categorías de propiedades">
          {CATEGORY_TABS.map((tab) => {
            const isActive = filters.categorySlug === tab.slug;
            return (
              <button
                key={tab.slug}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => handleCategorySelect(tab.slug)}
                className={`
                  px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200
                  whitespace-nowrap shrink-0 min-h-[44px] flex items-center justify-center
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald
                  ${
                    isActive
                      ? 'bg-forest-900 text-white shadow-sm'
                      : 'bg-white text-forest-800 border border-cream-200 hover:bg-cream-100 hover:text-forest-950'
                  }
                `.trim()}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Barra de Filtros y Ordenamiento */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-cream-200/90 shadow-card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Buscador de texto */}
            <div className="md:col-span-5 relative">
              <label htmlFor="catalog-search" className="sr-only">
                Buscar por palabra clave, municipio o vereda
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-forest-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  id="catalog-search"
                  type="text"
                  value={filters.searchQuery}
                  onChange={handleSearchQueryChange}
                  placeholder="Buscar por nombre, municipio o vereda..."
                  className="
                    w-full pl-11 pr-4 py-2.5 bg-cream-50/60 border border-cream-300
                    rounded-xl text-sm text-forest-950 placeholder-forest-700/50
                    min-h-[44px] focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald
                  "
                />
              </div>
            </div>

            {/* Selector de Departamento */}
            <div className="md:col-span-4 relative">
              <label htmlFor="catalog-department" className="sr-only">
                Filtrar por departamento
              </label>
              <div className="relative">
                <select
                  id="catalog-department"
                  value={filters.department}
                  onChange={handleDepartmentChange}
                  className="
                    w-full px-3.5 pr-8 py-2.5 bg-cream-50/60 border border-cream-300
                    rounded-xl text-sm font-medium text-forest-950 appearance-none
                    min-h-[44px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald
                  "
                >
                  <option value="todos">Todos los departamentos</option>
                  {availableDepartments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-forest-600">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Selector de Orden */}
            <div className="md:col-span-3 relative">
              <label htmlFor="catalog-sort" className="sr-only">
                Ordenar propiedades
              </label>
              <div className="relative">
                <select
                  id="catalog-sort"
                  value={filters.sortBy}
                  onChange={handleSortChange}
                  className="
                    w-full px-3.5 pr-8 py-2.5 bg-cream-50/60 border border-cream-300
                    rounded-xl text-sm font-medium text-forest-950 appearance-none
                    min-h-[44px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald
                  "
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-forest-600">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* Contador Dinámico de Resultados */}
          <div className="mt-4 pt-4 border-t border-cream-200/60 flex items-center justify-between text-xs font-semibold text-forest-700">
            <span data-testid="properties-counter">
              Mostrando <strong className="text-forest-950 font-bold">{filteredProperties.length}</strong> de{' '}
              {allProperties.length} propiedades
            </span>

            {(filters.department !== 'todos' ||
              filters.categorySlug !== 'todas' ||
              filters.searchQuery ||
              filters.maxPriceCOP > 0) && (
              <button
                type="button"
                onClick={onResetFilters}
                className="text-emerald hover:text-emerald-hover underline focus:outline-none"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {/* Grilla de Propiedades o Estado Vacío */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelectProperty={onSelectProperty}
              />
            ))}
          </div>
        ) : (
          /* Estado Vacío Accesible */
          <div
            role="status"
            className="
              text-center py-16 px-6 bg-white rounded-3xl border border-cream-200/90
              shadow-card max-w-xl mx-auto space-y-4 my-8
            "
          >
            <div className="w-16 h-16 rounded-2xl bg-cream-200 flex items-center justify-center mx-auto text-forest-600">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-forest-950 tracking-tight">
                No se encontraron terrenos con estos criterios
              </h3>
              <p className="text-sm text-forest-700 leading-relaxed max-w-md mx-auto">
                Intenta ajustar tus filtros de búsqueda, categoría o ubicación para ver más resultados
                disponibles en nuestro catálogo.
              </p>
            </div>

            <div className="pt-2">
              <Button variant="primary" size="md" onClick={onResetFilters}>
                Restablecer filtros
              </Button>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};
