import { describe, it, expect } from 'vitest';
import { filterProperties } from '@/lib/filters';
import { getProperties } from '@/lib/data';
import { INITIAL_FILTER_STATE, PropertyFilterState } from '@/types/filter';

const allProperties = getProperties();

describe('filterProperties (Motor de Búsqueda y Casos Borde)', () => {
  it('retorna todas las propiedades cuando el filtro está en su estado inicial', () => {
    const results = filterProperties(allProperties, INITIAL_FILTER_STATE);
    expect(results.length).toBe(allProperties.length);
  });

  it('busca por palabra clave sin distinguir mayúsculas ni tildes (accent & case insensitive)', () => {
    // Buscar "chia" debe encontrar "Chía"
    const resultsChia = filterProperties(allProperties, {
      ...INITIAL_FILTER_STATE,
      searchQuery: 'chia',
    });
    expect(resultsChia.length).toBeGreaterThan(0);
    expect(resultsChia.some((p) => p.location.municipality === 'Chía')).toBe(true);

    // Buscar "CAFE" debe encontrar "café" / "Los Samanes"
    const resultsCafe = filterProperties(allProperties, {
      ...INITIAL_FILTER_STATE,
      searchQuery: 'CAFE',
    });
    expect(resultsCafe.length).toBeGreaterThan(0);
    expect(resultsCafe.some((p) => p.title.includes('Cafetera'))).toBe(true);
  });

  it('filtra por departamento geográfico', () => {
    const results = filterProperties(allProperties, {
      ...INITIAL_FILTER_STATE,
      department: 'Antioquia',
    });
    expect(results.length).toBeGreaterThan(0);
    for (const p of results) {
      expect(p.location.department).toBe('Antioquia');
    }
  });

  it('filtra por categoría de terreno', () => {
    const results = filterProperties(allProperties, {
      ...INITIAL_FILTER_STATE,
      categorySlug: 'agricola',
    });
    expect(results.length).toBeGreaterThan(0);
    for (const p of results) {
      expect(p.categorySlug).toBe('agricola');
    }
  });

  it('filtra por rango de precio mínimo y máximo', () => {
    const min = 500000000;
    const max = 1500000000;
    const results = filterProperties(allProperties, {
      ...INITIAL_FILTER_STATE,
      minPriceCOP: min,
      maxPriceCOP: max,
    });

    expect(results.length).toBeGreaterThan(0);
    for (const p of results) {
      expect(p.priceCOP).toBeGreaterThanOrEqual(min);
      expect(p.priceCOP).toBeLessThanOrEqual(max);
    }
  });

  it('ordena por precio ascendente y descendente', () => {
    const asc = filterProperties(allProperties, {
      ...INITIAL_FILTER_STATE,
      sortBy: 'precio_menor',
    });
    for (let i = 0; i < asc.length - 1; i++) {
      expect(asc[i].priceCOP).toBeLessThanOrEqual(asc[i + 1].priceCOP);
    }

    const desc = filterProperties(allProperties, {
      ...INITIAL_FILTER_STATE,
      sortBy: 'precio_mayor',
    });
    for (let i = 0; i < desc.length - 1; i++) {
      expect(desc[i].priceCOP).toBeGreaterThanOrEqual(desc[i + 1].priceCOP);
    }
  });

  it('ordena por área superficial', () => {
    const ascArea = filterProperties(allProperties, {
      ...INITIAL_FILTER_STATE,
      sortBy: 'area_menor',
    });
    for (let i = 0; i < ascArea.length - 1; i++) {
      expect(ascArea[i].areaHectares).toBeLessThanOrEqual(ascArea[i + 1].areaHectares);
    }
  });

  it('maneja casos borde defensivamente (listas nulas, filtros indefinidos)', () => {
    expect(filterProperties(null as any, INITIAL_FILTER_STATE)).toEqual([]);
    expect(filterProperties(undefined as any, INITIAL_FILTER_STATE)).toEqual([]);
    
    // Filtro con campos nulos o vacíos
    const brokenFilter: Partial<PropertyFilterState> = {
      searchQuery: '   ',
      department: undefined,
    };
    const results = filterProperties(allProperties, brokenFilter as PropertyFilterState);
    expect(results.length).toBe(allProperties.length);
  });
});
