import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BenefitsSection } from '@/components/sections/BenefitsSection';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { PropertyCategories } from '@/components/sections/PropertyCategories';
import { PropertyCategory } from '@/types/content';

const mockCategories: PropertyCategory[] = [
  {
    slug: 'residencial',
    name: 'Terreno Residencial',
    description: 'Lotes campestres para vivienda.',
    count: 18,
    iconName: 'Home',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000',
    idealFor: 'Vivienda campestre',
  },
  {
    slug: 'comercial',
    name: 'Terreno Comercial',
    description: 'Lotes para bodegas o centros comerciales.',
    count: 9,
    iconName: 'Building2',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000',
    idealFor: 'Comercio',
  },
  {
    slug: 'agricola',
    name: 'Terreno Agrícola',
    description: 'Fincas para cultivos.',
    count: 14,
    iconName: 'Trees',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1000',
    idealFor: 'Agricultura',
  },
  {
    slug: 'inversion',
    name: 'Terreno de Inversión',
    description: 'Macrolotes de alta valorización.',
    count: 12,
    iconName: 'TrendingUp',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000',
    idealFor: 'Plusvalía',
  },
];

describe('Task 10: Beneficios, Categorías y Banner de Conversión Intermedio', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* ------------------------------------------------------------------
   * BENEFITS SECTION
   * ------------------------------------------------------------------ */
  describe('<BenefitsSection />', () => {
    it('renderiza el título, subtítulo y los 4 pilares de beneficios con sus descripciones', () => {
      render(<BenefitsSection />);

      expect(screen.getByText('¿Por qué elegir LandSelling.com?')).toBeDefined();
      expect(
        screen.getByText(/Hacemos que la compra de terrenos en Colombia sea simple/i)
      ).toBeDefined();

      // 4 Pilares
      expect(screen.getByText('Listados Verificados')).toBeDefined();
      expect(screen.getByText(/Tradición jurídica, folio de matrícula inmobiliaria/i)).toBeDefined();

      expect(screen.getByText('Ubicaciones Privilegiadas')).toBeDefined();
      expect(screen.getByText(/Terrenos en corredores de alta plusvalía/i)).toBeDefined();

      expect(screen.getByText('Transacciones Seguras')).toBeDefined();
      expect(screen.getByText(/Proceso notarial, promesas de compraventa/i)).toBeDefined();

      expect(screen.getByText('Soporte de Expertos')).toBeDefined();
      expect(screen.getByText(/Acompañamiento personalizado con especialistas/i)).toBeDefined();
    });
  });

  /* ------------------------------------------------------------------
   * CTA BANNER
   * ------------------------------------------------------------------ */
  describe('<CtaBanner />', () => {
    it('renderiza el eyebrow, titular persuasivo e imagen de paisaje con marcador', () => {
      render(<CtaBanner />);

      expect(screen.getByText('¿LISTO PARA INVERTIR?')).toBeDefined();
      expect(screen.getByText('Tu Terreno Ideal Está a Solo un Clic')).toBeDefined();
      expect(screen.getByText(/Lotes en Colombia/i)).toBeDefined();
      expect(screen.getByText(/Tradición 100% legal/i)).toBeDefined();
      expect(
        screen.getByAltText(/Lotes de terreno en paisaje campestre colombiano/i)
      ).toBeDefined();
    });

    it('llama a onExploreProperties al hacer clic en "Explorar Propiedades"', () => {
      const handleExplore = vi.fn();
      render(<CtaBanner onExploreProperties={handleExplore} />);

      const exploreBtn = screen.getByRole('button', { name: /explorar propiedades/i });
      fireEvent.click(exploreBtn);

      expect(handleExplore).toHaveBeenCalledTimes(1);
    });

    it('realiza scroll a #propiedades si no se pasa onExploreProperties', () => {
      const scrollMock = vi.fn();
      const dummyPropiedades = document.createElement('div');
      dummyPropiedades.id = 'propiedades';
      dummyPropiedades.scrollIntoView = scrollMock;
      document.body.appendChild(dummyPropiedades);

      render(<CtaBanner />);

      const exploreBtn = screen.getByRole('button', { name: /explorar propiedades/i });
      fireEvent.click(exploreBtn);

      expect(scrollMock).toHaveBeenCalledWith({ behavior: 'smooth' });
      document.body.removeChild(dummyPropiedades);
    });

    it('llama a onRequestContact al hacer clic en "Hablar con un Asesor"', () => {
      const handleContact = vi.fn();
      render(<CtaBanner onRequestContact={handleContact} />);

      const contactBtn = screen.getByRole('button', { name: /hablar con un asesor/i });
      fireEvent.click(contactBtn);

      expect(handleContact).toHaveBeenCalledTimes(1);
    });
  });

  /* ------------------------------------------------------------------
   * PROPERTY CATEGORIES
   * ------------------------------------------------------------------ */
  describe('<PropertyCategories />', () => {
    it('renderiza el encabezado y las 4 tarjetas de categoría con conteos y descripciones', () => {
      render(<PropertyCategories categories={mockCategories} />);

      expect(screen.getByText('Categorías de Propiedades')).toBeDefined();
      expect(
        screen.getByText(/Desde lotes residenciales hasta tierras agrícolas/i)
      ).toBeDefined();

      expect(screen.getByText('Terreno Residencial')).toBeDefined();
      expect(screen.getByText('18 Lotes')).toBeDefined();

      expect(screen.getByText('Terreno Comercial')).toBeDefined();
      expect(screen.getByText('9 Lotes')).toBeDefined();

      expect(screen.getByText('Terreno Agrícola')).toBeDefined();
      expect(screen.getByText('14 Lotes')).toBeDefined();

      expect(screen.getByText('Terreno de Inversión')).toBeDefined();
      expect(screen.getByText('12 Lotes')).toBeDefined();
    });

    it('dispara onSelectCategory y hace scroll a #propiedades al hacer clic en una tarjeta', () => {
      const handleSelect = vi.fn();
      const scrollMock = vi.fn();
      const dummyPropiedades = document.createElement('div');
      dummyPropiedades.id = 'propiedades';
      dummyPropiedades.scrollIntoView = scrollMock;
      document.body.appendChild(dummyPropiedades);

      render(<PropertyCategories categories={mockCategories} onSelectCategory={handleSelect} />);

      const agricolaCard = screen.getByRole('button', {
        name: /ver terrenos en categoría terreno agrícola/i,
      });
      fireEvent.click(agricolaCard);

      expect(handleSelect).toHaveBeenCalledWith('agricola');
      expect(scrollMock).toHaveBeenCalledWith({ behavior: 'smooth' });

      document.body.removeChild(dummyPropiedades);
    });
  });
});
