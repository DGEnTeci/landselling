import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InvestmentValueSection } from '@/components/sections/InvestmentValueSection';
import { PurchaseSteps } from '@/components/sections/PurchaseSteps';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { Testimonial } from '@/types/content';

const mockTestimonials: Testimonial[] = [
  {
    id: 'test-01',
    authorName: 'Carlos Eduardo Restrepo',
    role: 'Inversionista Particular',
    location: 'Medellín, Antioquia',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
    rating: 5,
    quote: 'En 2 años el lote se ha valorizado más del 30%.',
    propertyPurchased: 'Parcela Altos de Llanogrande',
    propertyArea: '3.500 m²',
    year: 2024,
  },
  {
    id: 'test-02',
    authorName: 'Dra. María Fernanda Gómez',
    role: 'Compradora Residencial',
    location: 'Bogotá D.C.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200',
    rating: 5,
    quote: 'Construir nuestra casa campestre era el sueño de mi familia.',
    propertyPurchased: 'Lote Campestre Reserva El Roble',
    propertyArea: '5.000 m²',
    year: 2025,
  },
  {
    id: 'test-03',
    authorName: 'Ing. Gustavo Adolfo Silva',
    role: 'Gerente Agropecuario',
    location: 'Villavicencio, Meta',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200',
    rating: 5,
    quote: 'Adquirimos 45 hectáreas para ganadería sostenible en Puerto López.',
    propertyPurchased: 'Hacienda Agrícola La Esperanza',
    propertyArea: '45 Hectáreas',
    year: 2024,
  },
  {
    id: 'test-04',
    authorName: 'Valentina Casasbuenas',
    role: 'Emprendedora Turística',
    location: 'Armenia, Quindío',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200',
    rating: 5,
    quote: 'Tienen los mejores lotes con vocación turística del Eje Cafetero.',
    propertyPurchased: 'Finca Cafetera Los Samanes',
    propertyArea: '4.2 Hectáreas',
    year: 2025,
  },
];

describe('Task 11: Sección de Inversión, Pasos de Adquisición y Testimonios', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* ------------------------------------------------------------------
   * INVESTMENT VALUE SECTION
   * ------------------------------------------------------------------ */
  describe('<InvestmentValueSection />', () => {
    it('renderiza el eyebrow, titular de inversión y las 3 métricas patrimoniales', () => {
      render(<InvestmentValueSection />);

      expect(screen.getByText('MÁS QUE UNA PROPIEDAD')).toBeDefined();
      expect(screen.getByText('Una Inversión Inteligente para tu Futuro')).toBeDefined();

      // Métricas clave
      expect(screen.getByText('+18.4%')).toBeDefined();
      expect(screen.getByText('Plusvalía Anual Estimada')).toBeDefined();
      expect(screen.getByText('100%')).toBeDefined();
      expect(screen.getByText('Títulos con Tradición Legal')).toBeDefined();
      expect(screen.getByText('+45.000')).toBeDefined();

      // Tarjeta flotante derecha
      expect(
        screen.getByText('La inversión en tierra hace crecer tu patrimonio')
      ).toBeDefined();
    });

    it('llama a onExploreProperties o desplaza a #propiedades al hacer clic en el botón dorado', () => {
      const handleExplore = vi.fn();
      render(<InvestmentValueSection onExploreProperties={handleExplore} />);

      const exploreBtn = screen.getByRole('button', { name: /explorar propiedades/i });
      fireEvent.click(exploreBtn);

      expect(handleExplore).toHaveBeenCalledTimes(1);
    });
  });

  /* ------------------------------------------------------------------
   * PURCHASE STEPS
   * ------------------------------------------------------------------ */
  describe('<PurchaseSteps />', () => {
    it('renderiza los 3 pasos numerados secuenciales con sus descripciones', () => {
      render(<PurchaseSteps />);

      expect(
        screen.getByText('Pasos Sencillos para ser Dueño de tu Terreno')
      ).toBeDefined();

      // Pasos
      expect(screen.getByText('Buscar Propiedades')).toBeDefined();
      expect(screen.getByText('Contactar a Nuestros Expertos')).toBeDefined();
      expect(screen.getByText('Completar la Compra')).toBeDefined();

      // Tarjeta flotante de satisfacción
      expect(screen.getByText('Tu satisfacción es nuestra prioridad')).toBeDefined();
      expect(screen.getByText('+10.000 Familias')).toBeDefined();
    });

    it('dispara onRequestContact al hacer clic en "Empezar Ahora"', () => {
      const handleContact = vi.fn();
      render(<PurchaseSteps onRequestContact={handleContact} />);

      const startBtn = screen.getByRole('button', { name: /empezar ahora/i });
      fireEvent.click(startBtn);

      expect(handleContact).toHaveBeenCalledTimes(1);
    });
  });

  /* ------------------------------------------------------------------
   * TESTIMONIALS SECTION
   * ------------------------------------------------------------------ */
  describe('<TestimonialsSection />', () => {
    it('renderiza encabezado, calificaciones de 5 estrellas y 3 testimonios por defecto', () => {
      render(<TestimonialsSection testimonials={mockTestimonials} />);

      expect(screen.getByText('Lo que Dicen Nuestros Clientes')).toBeDefined();
      expect(screen.getByText('Carlos Eduardo Restrepo')).toBeDefined();
      expect(screen.getByText('Dra. María Fernanda Gómez')).toBeDefined();
      expect(screen.getByText('Ing. Gustavo Adolfo Silva')).toBeDefined();

      // El cuarto no se muestra inicialmente (limitado a 3)
      expect(screen.queryByText('Valentina Casasbuenas')).toBeNull();
    });

    it('alterna para mostrar todas las reseñas al hacer clic en "Ver Más Reseñas"', () => {
      render(<TestimonialsSection testimonials={mockTestimonials} />);

      const toggleBtn = screen.getByRole('button', { name: /ver más reseñas/i });
      fireEvent.click(toggleBtn);

      // Ahora se visualizan las 4 reseñas
      expect(screen.getByText('Valentina Casasbuenas')).toBeDefined();
      expect(screen.getByRole('button', { name: /mostrar menos reseñas/i })).toBeDefined();

      // Regresar a 3 reseñas
      fireEvent.click(toggleBtn);
      expect(screen.queryByText('Valentina Casasbuenas')).toBeNull();
    });
  });
});
