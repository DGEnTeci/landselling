import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';
import { SkipLink } from '@/components/layout/SkipLink';

describe('Task 13: Auditoría de Accesibilidad WCAG AA, SkipLink y Rendimiento', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  /* ------------------------------------------------------------------
   * SKIP LINK Y LANDMARKS
   * ------------------------------------------------------------------ */
  describe('SkipLink y Navegación por Teclado', () => {
    it('renderiza SkipLink con enlace hacia #main-content y texto accesible', () => {
      render(<SkipLink targetId="main-content" />);

      const skipLink = screen.getByRole('link', { name: /saltar al contenido principal/i });
      expect(skipLink).toBeDefined();
      expect(skipLink.getAttribute('href')).toBe('#main-content');
      expect(skipLink.className).toContain('sr-only');
      expect(skipLink.className).toContain('focus:not-sr-only');
    });

    it('la página principal incluye el landmark main con id="main-content" y tabIndex={-1}', () => {
      const { container } = render(<HomePage />);

      const main = container.querySelector('main#main-content');
      expect(main).not.toBeNull();
      expect(main?.getAttribute('tabindex')).toBe('-1');
    });

    it('la página incluye landmarks semánticos header, main y footer', () => {
      const { container } = render(<HomePage />);

      expect(container.querySelector('header')).not.toBeNull();
      expect(container.querySelector('main')).not.toBeNull();
      expect(container.querySelector('footer')).not.toBeNull();
    });
  });

  /* ------------------------------------------------------------------
   * JERARQUÍA DE ENCABEZADOS (HEADING HIERARCHY)
   * ------------------------------------------------------------------ */
  describe('Jerarquía de Encabezados Semánticos', () => {
    it('contiene exactamente un encabezado de nivel <h1> en toda la página', () => {
      render(<HomePage />);

      const h1Headings = screen.getAllByRole('heading', { level: 1 });
      expect(h1Headings.length).toBe(1);
      expect(h1Headings[0].textContent).toContain('Encuentra tu Inversión en Terrenos Perfecta');
    });

    it('contiene encabezados semánticos <h2> para cada una de las secciones principales', () => {
      render(<HomePage />);

      const h2Headings = screen.getAllByRole('heading', { level: 2 });
      expect(h2Headings.length).toBeGreaterThanOrEqual(6);

      const h2Texts = h2Headings.map((h) => h.textContent?.trim());
      expect(h2Texts).toContain('¿Por qué elegir LandSelling.com?');
      expect(h2Texts).toContain('Terrenos y Propiedades Destacadas');
      expect(h2Texts).toContain('Tu Terreno Ideal Está a Solo un Clic');
      expect(h2Texts).toContain('Categorías de Propiedades');
      expect(h2Texts).toContain('Una Inversión Inteligente para tu Futuro');
      expect(h2Texts).toContain('Pasos Sencillos para ser Dueño de tu Terreno');
      expect(h2Texts).toContain('Lo que Dicen Nuestros Clientes');
      expect(h2Texts).toContain('Últimas Noticias y Consejos');
    });
  });

  /* ------------------------------------------------------------------
   * ACCESIBILIDAD DE IMÁGENES (ALT TEXT)
   * ------------------------------------------------------------------ */
  describe('Auditoría de Imágenes y Texto Alternativo', () => {
    it('el 100% de las imágenes renderizadas tienen un atributo alt no vacío', () => {
      const { container } = render(<HomePage />);

      const images = container.querySelectorAll('img');
      expect(images.length).toBeGreaterThan(0);

      images.forEach((img) => {
        const alt = img.getAttribute('alt');
        expect(alt).not.toBeNull();
        expect(alt?.trim().length).toBeGreaterThan(0);
      });
    });
  });

  /* ------------------------------------------------------------------
   * ACCESIBILIDAD DE ELEMENTOS INTERACTIVOS (BUTTONS Y LINKS)
   * ------------------------------------------------------------------ */
  describe('Auditoría de Botones y Enlaces Accesibles', () => {
    it('ningún botón carece de texto discernible o etiqueta accesible (aria-label)', () => {
      const { container } = render(<HomePage />);

      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBeGreaterThan(0);

      buttons.forEach((btn) => {
        const hasAriaLabel = !!btn.getAttribute('aria-label');
        const hasTextContent = (btn.textContent || '').trim().length > 0;
        const isHidden = btn.getAttribute('aria-hidden') === 'true';

        expect(hasAriaLabel || hasTextContent || isHidden).toBe(true);
      });
    });

    it('ningún enlace carece de href, texto o aria-label accesible', () => {
      const { container } = render(<HomePage />);

      const links = container.querySelectorAll('a');
      expect(links.length).toBeGreaterThan(0);

      links.forEach((a) => {
        const href = a.getAttribute('href');
        const hasAriaLabel = !!a.getAttribute('aria-label');
        const hasText = (a.textContent || '').trim().length > 0;

        expect(href).not.toBeNull();
        expect(hasAriaLabel || hasText).toBe(true);
      });
    });
  });
});
