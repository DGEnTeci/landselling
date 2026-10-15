import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Hero } from '@/components/sections/Hero';
import { QuickSearchBox } from '@/components/properties/QuickSearchBox';

describe('Task 6: Sección Hero con Buscador Rápido Integrado', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* ------------------------------------------------------------------
   * HERO SECTION
   * ------------------------------------------------------------------ */
  describe('<Hero />', () => {
    it('renderiza el eyebrow corporativo en mayúsculas', () => {
      render(<Hero />);
      expect(
        screen.getByText('SOLUCIONES PREMIUM EN TERRENOS Y PROPIEDADES')
      ).toBeDefined();
    });

    it('renderiza el titular h1 de alto impacto y el subtítulo persuasivo', () => {
      render(<Hero />);

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.textContent).toContain('Encuentra tu Inversión en Terrenos Perfecta');

      expect(
        screen.getByText(/Explora parcelas campestres, fincas productivas y lotes comerciales/i)
      ).toBeDefined();
    });

    it('renderiza el sello flotante de prueba social (+10.000 clientes felices)', () => {
      render(<Hero />);

      expect(
        screen.getByText('Con la confianza de +10.000 clientes felices')
      ).toBeDefined();
      expect(
        screen.getByText(/4\.9 \/ 5\.0 en satisfacción patrimonial/i)
      ).toBeDefined();
    });

    it('renderiza la imagen de fondo con texto alternativo para accesibilidad', () => {
      render(<Hero />);

      const bgImage = screen.getByAltText(/Paisaje de terrenos y colinas verdes en Colombia/i);
      expect(bgImage).toBeDefined();
    });

    it('integra el componente QuickSearchBox en la parte inferior', () => {
      render(<Hero />);

      const searchForm = screen.getByRole('search');
      expect(searchForm).toBeDefined();
    });
  });

  /* ------------------------------------------------------------------
   * QUICK SEARCH BOX
   * ------------------------------------------------------------------ */
  describe('<QuickSearchBox />', () => {
    const mockDepartments = ['Antioquia', 'Cundinamarca', 'Boyacá', 'Meta'];

    it('renderiza los controles accesibles de departamento, tipo y presupuesto', () => {
      render(<QuickSearchBox departments={mockDepartments} />);

      expect(screen.getByLabelText(/ubicación/i)).toBeDefined();
      expect(screen.getByLabelText(/tipo de terreno/i)).toBeDefined();
      expect(screen.getByLabelText(/presupuesto/i)).toBeDefined();
      expect(screen.getByRole('button', { name: /buscar terrenos/i })).toBeDefined();
    });

    it('puebla dinámicamente las opciones de departamentos pasadas por prop o catálogo', () => {
      render(<QuickSearchBox departments={mockDepartments} />);

      const deptSelect = screen.getByLabelText(/ubicación/i) as HTMLSelectElement;
      expect(deptSelect.options.length).toBe(mockDepartments.length + 1); // +1 por 'Todos'
      expect(screen.getByRole('option', { name: 'Antioquia' })).toBeDefined();
      expect(screen.getByRole('option', { name: 'Cundinamarca' })).toBeDefined();
    });

    it('dispara onSearch con el payload exacto al cambiar los selectores y hacer submit', () => {
      const handleSearch = vi.fn();
      render(<QuickSearchBox departments={mockDepartments} onSearch={handleSearch} />);

      const deptSelect = screen.getByLabelText(/ubicación/i);
      const categorySelect = screen.getByLabelText(/tipo de terreno/i);
      const budgetSelect = screen.getByLabelText(/presupuesto/i);
      const submitBtn = screen.getByRole('button', { name: /buscar terrenos/i });

      // Cambiar filtros
      fireEvent.change(deptSelect, { target: { value: 'Antioquia' } });
      fireEvent.change(categorySelect, { target: { value: 'residencial' } });
      fireEvent.change(budgetSelect, { target: { value: 'up_to_600m' } });

      // Enviar formulario
      fireEvent.click(submitBtn);

      expect(handleSearch).toHaveBeenCalledTimes(1);
      expect(handleSearch).toHaveBeenCalledWith({
        department: 'Antioquia',
        categorySlug: 'residencial',
        maxPriceCOP: 600000000,
      });
    });

    it('realiza scroll hacia la sección de propiedades si existe en el DOM', () => {
      const scrollMock = vi.fn();
      const dummySection = document.createElement('div');
      dummySection.id = 'propiedades';
      dummySection.scrollIntoView = scrollMock;
      document.body.appendChild(dummySection);

      render(<QuickSearchBox departments={mockDepartments} />);

      const submitBtn = screen.getByRole('button', { name: /buscar terrenos/i });
      fireEvent.click(submitBtn);

      expect(scrollMock).toHaveBeenCalledWith({ behavior: 'smooth' });

      document.body.removeChild(dummySection);
    });
  });
});
