import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { FeaturedProperties } from '@/components/sections/FeaturedProperties';
import { Property } from '@/types/property';
import { PropertyFilterState, INITIAL_FILTER_STATE } from '@/types/filter';

const mockProperty: Property = {
  id: 'prop-test-01',
  slug: 'lote-campestre-el-salitre',
  title: 'Lote Campestre El Salitre',
  shortDescription: 'Hermoso lote campestre en parcelación con alta seguridad.',
  fullDescription: 'Descripción extendida del lote con tradición legal al 100%.',
  categorySlug: 'residencial',
  categoryName: 'Terreno Residencial',
  location: {
    department: 'Cundinamarca',
    municipality: 'La Calera',
    veredaOrSector: 'El Salitre',
    distanceFromMainCity: '30 min de Bogotá',
    altitudeMeters: 2700,
  },
  areaHectares: 1.5,
  areaSquareMeters: 15000,
  priceCOP: 450000000,
  pricePerSquareMeterCOP: 30000,
  pricePerHectareCOP: 300000000,
  topography: 'ondulada_suave',
  topographyLabel: 'Ondulada Suave',
  accessRoad: 'pavimentada',
  accessRoadLabel: 'Vía Pavimentada',
  utilities: {
    waterSource: 'Acueducto veredal',
    hasElectricity: true,
    hasWater: true,
    hasInternetFiber: true,
  },
  legal: {
    deedStatus: 'Escritura pública 100%',
    hasIndependentFolio: true,
    freeOfEncumbrances: true,
    potLandUse: 'Vivienda campestre individual',
  },
  featured: true,
  status: 'en_venta',
  statusLabel: 'En Venta',
  imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000',
  galleryUrls: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000'],
  highlights: ['Vista panorámica', 'Agua de nacimiento'],
  tags: ['Campestre', 'Cundinamarca'],
};

const mockCommercialProperty: Property = {
  ...mockProperty,
  id: 'prop-test-02',
  slug: 'lote-comercial-rionegro',
  title: 'Lote Comercial Autopista Rionegro',
  categorySlug: 'comercial',
  categoryName: 'Terreno Comercial',
  location: {
    department: 'Antioquia',
    municipality: 'Rionegro',
    veredaOrSector: 'Sector Aeropuerto',
  },
  priceCOP: 950000000,
  status: 'bajo_oferta',
  statusLabel: 'Bajo Oferta',
};

describe('Task 7: Catálogo de Propiedades Destacadas con Filtros en Tiempo Real', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* ------------------------------------------------------------------
   * PROPERTY CARD
   * ------------------------------------------------------------------ */
  describe('<PropertyCard />', () => {
    it('renderiza título, ubicación con MapPin, superficie dual y precio COP formateado', () => {
      render(<PropertyCard property={mockProperty} />);

      expect(screen.getByText('Lote Campestre El Salitre')).toBeDefined();
      expect(screen.getByText(/La Calera, Cundinamarca/i)).toBeDefined();
      expect(screen.getByText(/1\.5 ha \(15\.000 m²\) • Terreno Residencial/i)).toBeDefined();
      expect(screen.getByText('$ 450.000.000 COP')).toBeDefined();
      expect(screen.getByText('En Venta')).toBeDefined();
      expect(screen.getByText('Destacado')).toBeDefined();
    });

    it('renderiza badge de estado "Bajo Oferta" correctamente', () => {
      render(<PropertyCard property={mockCommercialProperty} />);
      expect(screen.getByText('Bajo Oferta')).toBeDefined();
    });

    it('ejecuta onSelectProperty al hacer clic en la tarjeta o presionar Enter', () => {
      const handleSelect = vi.fn();
      render(<PropertyCard property={mockProperty} onSelectProperty={handleSelect} />);

      const card = screen.getByRole('button', { name: /ver ficha de lote campestre el salitre/i });
      fireEvent.click(card);
      expect(handleSelect).toHaveBeenCalledWith(mockProperty);

      fireEvent.keyDown(card, { key: 'Enter' });
      expect(handleSelect).toHaveBeenCalledTimes(2);
    });

    it('ejecuta onSelectProperty al hacer clic en el botón circular de acción', () => {
      const handleSelect = vi.fn();
      render(<PropertyCard property={mockProperty} onSelectProperty={handleSelect} />);

      const actionButton = screen.getByRole('button', {
        name: /ver detalles de lote campestre el salitre/i,
      });
      fireEvent.click(actionButton);
      expect(handleSelect).toHaveBeenCalledWith(mockProperty);
    });
  });

  /* ------------------------------------------------------------------
   * FEATURED PROPERTIES SECTION
   * ------------------------------------------------------------------ */
  describe('<FeaturedProperties />', () => {
    const mockList = [mockProperty, mockCommercialProperty];

    it('renderiza el encabezado de sección, pestañas de categorías y contador', () => {
      render(
        <FeaturedProperties
          filters={INITIAL_FILTER_STATE}
          onFilterChange={vi.fn()}
          onResetFilters={vi.fn()}
          properties={mockList}
        />
      );

      expect(screen.getByText('Terrenos y Propiedades Destacadas')).toBeDefined();
      expect(screen.getByRole('tab', { name: 'Todos' })).toBeDefined();
      expect(screen.getByRole('tab', { name: 'Residencial' })).toBeDefined();
      expect(screen.getByRole('tab', { name: 'Comercial' })).toBeDefined();
      const counter = screen.getByTestId('properties-counter');
      expect(counter.textContent).toContain('Mostrando 2 de 2 propiedades');
    });

    it('llama a onFilterChange al seleccionar una pestaña de categoría', () => {
      const handleFilterChange = vi.fn();
      render(
        <FeaturedProperties
          filters={INITIAL_FILTER_STATE}
          onFilterChange={handleFilterChange}
          onResetFilters={vi.fn()}
          properties={mockList}
        />
      );

      const commercialTab = screen.getByRole('tab', { name: 'Comercial' });
      fireEvent.click(commercialTab);

      expect(handleFilterChange).toHaveBeenCalledWith({ categorySlug: 'comercial' });
    });

    it('llama a onFilterChange al escribir en el buscador de texto', () => {
      const handleFilterChange = vi.fn();
      render(
        <FeaturedProperties
          filters={INITIAL_FILTER_STATE}
          onFilterChange={handleFilterChange}
          onResetFilters={vi.fn()}
          properties={mockList}
        />
      );

      const input = screen.getByPlaceholderText(/buscar por nombre, municipio o vereda/i);
      fireEvent.change(input, { target: { value: 'Rionegro' } });

      expect(handleFilterChange).toHaveBeenCalledWith({ searchQuery: 'Rionegro' });
    });

    it('llama a onFilterChange al seleccionar un departamento del dropdown', () => {
      const handleFilterChange = vi.fn();
      render(
        <FeaturedProperties
          filters={INITIAL_FILTER_STATE}
          onFilterChange={handleFilterChange}
          onResetFilters={vi.fn()}
          properties={mockList}
          departments={['Antioquia', 'Cundinamarca']}
        />
      );

      const select = screen.getByLabelText(/filtrar por departamento/i);
      fireEvent.change(select, { target: { value: 'Antioquia' } });

      expect(handleFilterChange).toHaveBeenCalledWith({ department: 'Antioquia' });
    });

    it('muestra el estado vacío cuando no hay propiedades coincidentes y permite restablecer filtros', () => {
      const handleReset = vi.fn();
      const emptyFilters: PropertyFilterState = {
        ...INITIAL_FILTER_STATE,
        searchQuery: 'inmueble inexistente xyz 999',
      };

      render(
        <FeaturedProperties
          filters={emptyFilters}
          onFilterChange={vi.fn()}
          onResetFilters={handleReset}
          properties={mockList}
        />
      );

      expect(
        screen.getByText('No se encontraron terrenos con estos criterios')
      ).toBeDefined();

      const resetBtn = screen.getByRole('button', { name: /restablecer filtros/i });
      fireEvent.click(resetBtn);

      expect(handleReset).toHaveBeenCalledTimes(1);
    });

    it('muestra el botón "Ver Todas las Propiedades" que invoca onResetFilters', () => {
      const handleReset = vi.fn();
      render(
        <FeaturedProperties
          filters={{ ...INITIAL_FILTER_STATE, categorySlug: 'comercial' }}
          onFilterChange={vi.fn()}
          onResetFilters={handleReset}
          properties={mockList}
        />
      );

      const viewAllBtn = screen.getByRole('button', { name: /ver todas las propiedades/i });
      fireEvent.click(viewAllBtn);

      expect(handleReset).toHaveBeenCalledTimes(1);
    });
  });
});
