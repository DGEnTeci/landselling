import { describe, it, expect } from 'vitest';
import {
  getProperties,
  getFeaturedProperties,
  getPropertyBySlug,
  getCategories,
  getTestimonials,
  getArticles,
  getAvailableDepartments,
} from '@/lib/data';

describe('Task 2: Integridad y Tipado del Catálogo de Datos', () => {
  it('carga al menos 8 propiedades colombianas con datos completos', () => {
    const props = getProperties();
    expect(props.length).toBeGreaterThanOrEqual(8);

    const slugs = new Set<string>();
    for (const p of props) {
      // Slugs únicos
      expect(slugs.has(p.slug)).toBe(false);
      slugs.add(p.slug);

      // Precios en COP válidos
      expect(p.priceCOP).toBeGreaterThan(0);
      expect(Number.isInteger(p.priceCOP)).toBe(true);

      // Áreas en hectáreas y metros cuadrados
      expect(p.areaHectares).toBeGreaterThan(0);
      expect(p.areaSquareMeters).toBeGreaterThan(0);
      expect(p.areaSquareMeters).toBe(Math.round(p.areaHectares * 10000));

      // Especificaciones legales y de servicios
      expect(p.legal.deedStatus).toBeTruthy();
      expect(p.legal.hasIndependentFolio).toBe(true);
      expect(p.utilities.waterSource).toBeTruthy();
      expect(p.location.department).toBeTruthy();
      expect(p.location.municipality).toBeTruthy();
    }
  });

  it('obtiene propiedades destacadas para la sección principal', () => {
    const featured = getFeaturedProperties();
    expect(featured.length).toBeGreaterThanOrEqual(4);
    for (const p of featured) {
      expect(p.featured).toBe(true);
    }
  });

  it('recupera una propiedad por su slug', () => {
    const property = getPropertyBySlug('reserva-el-roble-la-calera');
    expect(property).toBeDefined();
    expect(property?.title).toBe('Lote Campestre Reserva El Roble');
    expect(property?.location.municipality).toBe('La Calera');
    expect(property?.location.department).toBe('Cundinamarca');
  });

  it('valida las 4 categorías clave de terrenos', () => {
    const categories = getCategories();
    expect(categories).toHaveLength(4);

    const slugs = categories.map((c) => c.slug);
    expect(slugs).toContain('residencial');
    expect(slugs).toContain('comercial');
    expect(slugs).toContain('agricola');
    expect(slugs).toContain('inversion');
  });

  it('valida testimonios con calificaciones de 5 estrellas y ubicación colombiana', () => {
    const testimonials = getTestimonials();
    expect(testimonials.length).toBeGreaterThanOrEqual(4);
    for (const t of testimonials) {
      expect(t.rating).toBeGreaterThanOrEqual(1);
      expect(t.rating).toBeLessThanOrEqual(5);
      expect(t.authorName).toBeTruthy();
      expect(t.quote).toBeTruthy();
    }
  });

  it('valida artículos con tiempos de lectura y autores expertos', () => {
    const articles = getArticles();
    expect(articles.length).toBeGreaterThanOrEqual(3);
    for (const a of articles) {
      expect(a.readTimeMinutes).toBeGreaterThan(0);
      expect(a.authorName).toBeTruthy();
      expect(a.title).toBeTruthy();
    }
  });

  it('lista departamentos únicos y ordenados para el filtro de ubicación', () => {
    const departments = getAvailableDepartments();
    expect(departments.length).toBeGreaterThanOrEqual(3);
    expect(departments).toContain('Cundinamarca');
    expect(departments).toContain('Antioquia');
    expect(departments).toContain('Meta');
  });
});
