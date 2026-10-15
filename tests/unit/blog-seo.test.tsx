import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BlogInsightsSection } from '@/components/sections/BlogInsightsSection';
import { StructuredData } from '@/components/seo/StructuredData';
import { Article } from '@/types/content';

const mockArticles: Article[] = [
  {
    id: 'art-01',
    slug: 'guia-certificado-tradicion-libertad-terrenos',
    title: 'Cómo leer el Certificado de Tradición y Libertad antes de comprar un lote',
    excerpt: 'Aprende a identificar falsas tradiciones, embargos e hipotecas.',
    category: 'Seguridad Jurídica',
    readTimeMinutes: 6,
    publishedAt: '12 de Octubre, 2026',
    authorName: 'Dr. Fernando Morales',
    authorRole: 'Especialista en Derecho Inmobiliario',
    coverImageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1000',
    tags: ['Legal', 'Títulos'],
  },
  {
    id: 'art-02',
    slug: 'topografia-servicios-publicos-parcelaciones-rurales',
    title: 'Topografía y servicios públicos: Qué evaluar en un lote campestre',
    excerpt: 'Diferencias clave entre agua de acueducto veredal vs. nacedero propio.',
    category: 'Guía Técnica',
    readTimeMinutes: 8,
    publishedAt: '28 de Septiembre, 2026',
    authorName: 'Ing. Camila Zuluaga',
    authorRole: 'Topógrafa y Consultora de Suelos',
    coverImageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000',
    tags: ['Topografía', 'Servicios'],
  },
  {
    id: 'art-03',
    slug: 'plusvalia-y-rentabilidad-tierras-colombia-2026',
    title: 'Por qué la tierra rural supera en rentabilidad al ladrillo urbano en 2026',
    excerpt: 'Análisis comparativo de valorización y plusvalía entre 15% y 22% anual.',
    category: 'Inversión y Finanzas',
    readTimeMinutes: 5,
    publishedAt: '15 de Septiembre, 2026',
    authorName: 'Sebastián Valderrama',
    authorRole: 'Analista de Mercados',
    coverImageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000',
    tags: ['Plusvalía', 'Finanzas'],
  },
];

describe('Task 12: Blog / Insights y Datos Estructurados SEO Schema.org', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  /* ------------------------------------------------------------------
   * BLOG INSIGHTS SECTION
   * ------------------------------------------------------------------ */
  describe('<BlogInsightsSection />', () => {
    it('renderiza el título, subtítulo y las 3 tarjetas de artículos', () => {
      render(<BlogInsightsSection articles={mockArticles} />);

      expect(screen.getByText('Últimas Noticias y Consejos')).toBeDefined();
      expect(
        screen.getByText(/Mantente informado con las últimas noticias/i)
      ).toBeDefined();

      // 3 artículos
      expect(
        screen.getByText('Cómo leer el Certificado de Tradición y Libertad antes de comprar un lote')
      ).toBeDefined();
      expect(
        screen.getByText('Topografía y servicios públicos: Qué evaluar en un lote campestre')
      ).toBeDefined();
      expect(
        screen.getByText('Por qué la tierra rural supera en rentabilidad al ladrillo urbano en 2026')
      ).toBeDefined();

      // Categorías
      expect(screen.getByText('Seguridad Jurídica')).toBeDefined();
      expect(screen.getByText('Guía Técnica')).toBeDefined();
      expect(screen.getByText('Inversión y Finanzas')).toBeDefined();
    });

    it('abre el modal de lectura completa al hacer clic en una tarjeta y dispara CTA de asesoría', () => {
      const handleContact = vi.fn();
      render(<BlogInsightsSection articles={mockArticles} onRequestContact={handleContact} />);

      const articleCard = screen.getByRole('button', {
        name: /leer artículo: cómo leer el certificado/i,
      });
      fireEvent.click(articleCard);

      // Modal de lectura
      expect(screen.getByRole('dialog')).toBeDefined();
      expect(screen.getByText(/Por Dr. Fernando Morales/i)).toBeDefined();
      expect(screen.getByText(/6 minutos de lectura estimada/i)).toBeDefined();

      // Botón CTA dentro del modal
      const ctaBtn = screen.getByRole('button', { name: /hablar con un experto/i });
      fireEvent.click(ctaBtn);

      expect(handleContact).toHaveBeenCalledTimes(1);
      expect(screen.queryByRole('dialog')).toBeNull();
    });
  });

  /* ------------------------------------------------------------------
   * STRUCTURED DATA (SEO JSON-LD)
   * ------------------------------------------------------------------ */
  describe('<StructuredData />', () => {
    it('renderiza un script application/ld+json válido, parseable y con entidades requeridas', () => {
      const { container } = render(<StructuredData />);

      const script = container.querySelector('script[type="application/ld+json"]');
      expect(script).not.toBeNull();

      const rawJson = script?.innerHTML || '';
      expect(rawJson.length).toBeGreaterThan(0);

      // Debe ser parseable con JSON.parse
      const parsed = JSON.parse(rawJson);
      expect(Array.isArray(parsed)).toBe(true);

      // Entidad RealEstateAgent
      const agent = parsed.find((item: any) => item['@type'] === 'RealEstateAgent');
      expect(agent).toBeDefined();
      expect(agent.name).toBe('LandSelling');
      expect(agent.currenciesAccepted).toBe('COP');
      expect(agent.areaServed.name).toBe('Colombia');

      // Entidad ItemList
      const catalog = parsed.find((item: any) => item['@type'] === 'ItemList');
      expect(catalog).toBeDefined();
      expect(catalog.itemListElement.length).toBeGreaterThan(0);
      expect(catalog.itemListElement[0].item.offers.priceCurrency).toBe('COP');

      // Entidad Blog
      const blog = parsed.find((item: any) => item['@type'] === 'Blog');
      expect(blog).toBeDefined();
      expect(blog.blogPost.length).toBeGreaterThan(0);
    });

    it('sanitiza caracteres "<" reemplazándolos por "\\u003c" para protección contra XSS', () => {
      const { container } = render(<StructuredData />);
      const script = container.querySelector('script[type="application/ld+json"]');
      const innerContent = script?.innerHTML || '';

      // No debe contener "<" sin escapar dentro del JSON
      expect(innerContent.includes('<script')).toBe(false);
      expect(innerContent.includes('</')).toBe(false);
    });
  });
});
