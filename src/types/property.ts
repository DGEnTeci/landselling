export type PropertyCategorySlug =
  | 'residencial'
  | 'comercial'
  | 'agricola'
  | 'inversion';

export type PropertyStatus = 'en_venta' | 'bajo_oferta' | 'vendido';

export type TopographyType =
  | 'plana'
  | 'ondulada_suave'
  | 'mixta'
  | 'quebrada';

export type AccessRoadType =
  | 'pavimentada'
  | 'placa_huella'
  | 'carreteable_afirmado'
  | 'doble_calzada';

export interface PropertyLocation {
  department: string;
  municipality: string;
  veredaOrSector: string;
  distanceFromMainCity?: string;
  altitudeMeters?: number;
}

export interface PropertyUtilities {
  waterSource: string;
  hasElectricity: boolean;
  hasWater: boolean;
  hasInternetFiber: boolean;
  gasType?: string;
}

export interface PropertyLegal {
  deedStatus: string; // e.g. "Escritura pública 100%"
  hasIndependentFolio: boolean; // Matrícula inmobiliaria individual
  freeOfEncumbrances: boolean; // Libre de embargos o hipotecas
  potLandUse: string; // Uso de suelo según POT (ej. "Rural suburbano / Residencial campestre")
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  categorySlug: PropertyCategorySlug;
  categoryName: string;
  location: PropertyLocation;
  areaHectares: number;
  areaSquareMeters: number;
  priceCOP: number;
  pricePerSquareMeterCOP: number;
  pricePerHectareCOP?: number;
  topography: TopographyType;
  topographyLabel: string;
  accessRoad: AccessRoadType;
  accessRoadLabel: string;
  utilities: PropertyUtilities;
  legal: PropertyLegal;
  featured: boolean;
  status: PropertyStatus;
  statusLabel: string;
  imageUrl: string;
  galleryUrls: string[];
  highlights: string[];
  tags: string[];
}
