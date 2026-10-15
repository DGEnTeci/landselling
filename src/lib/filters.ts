import { Property } from '@/types/property';
import { PropertyFilterState } from '@/types/filter';

/**
 * Normaliza una cadena de texto eliminando tildes y diacríticos, y convirtiendo a minúsculas
 * para búsquedas insensibles a mayúsculas y acentos.
 */
export function normalizeText(text?: string | null): string {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Motor puro de filtrado y búsqueda de propiedades para LandSelling.com.
 * Maneja de forma defensiva parámetros nulos, indefinidos o vacíos sin fallar en tiempo de ejecución.
 */
export function filterProperties(
  properties: Property[],
  filter?: Partial<PropertyFilterState> | null
): Property[] {
  if (!Array.isArray(properties)) {
    return [];
  }

  if (!filter) {
    return [...properties];
  }

  const query = normalizeText(filter.searchQuery);
  const targetDepartment = filter.department && filter.department !== 'todos' ? filter.department : null;
  const targetCategory =
    filter.categorySlug && filter.categorySlug !== 'todas' ? filter.categorySlug : null;

  const minPrice = typeof filter.minPriceCOP === 'number' && filter.minPriceCOP > 0 ? filter.minPriceCOP : null;
  const maxPrice = typeof filter.maxPriceCOP === 'number' && filter.maxPriceCOP > 0 ? filter.maxPriceCOP : null;

  const minArea =
    typeof filter.minAreaHectares === 'number' && filter.minAreaHectares > 0
      ? filter.minAreaHectares
      : null;
  const maxArea =
    typeof filter.maxAreaHectares === 'number' && filter.maxAreaHectares > 0
      ? filter.maxAreaHectares
      : null;

  const filtered = properties.filter((property) => {
    if (!property) return false;

    // 1. Filtro por búsqueda textual (título, descripción, municipio, departamento, vereda, etiquetas)
    if (query) {
      const titleMatch = normalizeText(property.title).includes(query);
      const descMatch = normalizeText(property.shortDescription).includes(query);
      const municipalityMatch = normalizeText(property.location?.municipality).includes(query);
      const departmentMatch = normalizeText(property.location?.department).includes(query);
      const sectorMatch = normalizeText(property.location?.veredaOrSector).includes(query);
      const tagsMatch = Array.isArray(property.tags) && property.tags.some((t) => normalizeText(t).includes(query));

      if (!titleMatch && !descMatch && !municipalityMatch && !departmentMatch && !sectorMatch && !tagsMatch) {
        return false;
      }
    }

    // 2. Filtro por departamento
    if (targetDepartment) {
      const propDept = normalizeText(property.location?.department);
      if (propDept !== normalizeText(targetDepartment)) {
        return false;
      }
    }

    // 3. Filtro por categoría de terreno
    if (targetCategory) {
      if (property.categorySlug !== targetCategory) {
        return false;
      }
    }

    // 4. Filtro por rango de precio (COP)
    if (minPrice !== null && property.priceCOP < minPrice) {
      return false;
    }
    if (maxPrice !== null && property.priceCOP > maxPrice) {
      return false;
    }

    // 5. Filtro por área en hectáreas
    if (minArea !== null && property.areaHectares < minArea) {
      return false;
    }
    if (maxArea !== null && property.areaHectares > maxArea) {
      return false;
    }

    return true;
  });

  // 6. Ordenamiento
  const sortBy = filter.sortBy || 'relevancia';

  return filtered.sort((a, b) => {
    switch (sortBy) {
      case 'precio_menor':
        return a.priceCOP - b.priceCOP;
      case 'precio_mayor':
        return b.priceCOP - a.priceCOP;
      case 'area_menor':
        return a.areaHectares - b.areaHectares;
      case 'area_mayor':
        return b.areaHectares - a.areaHectares;
      case 'relevancia':
      default:
        // Priorizar propiedades destacadas ('featured'), luego mantener orden natural
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
    }
  });
}
