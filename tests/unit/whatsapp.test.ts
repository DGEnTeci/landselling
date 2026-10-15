import { describe, it, expect } from 'vitest';
import { generateWhatsAppPropertyUrl } from '@/lib/whatsapp';
import { Property } from '@/types/property';

const sampleProperty: Property = {
  id: 'prop-01',
  slug: 'reserva-el-roble-la-calera',
  title: 'Lote Campestre Reserva El Roble',
  shortDescription: 'Espectacular lote con vista al embalse',
  fullDescription: 'Descripción extendida del lote...',
  categorySlug: 'residencial',
  categoryName: 'Terreno Residencial',
  location: {
    department: 'Cundinamarca',
    municipality: 'La Calera',
    veredaOrSector: 'Vereda El Salitre',
  },
  areaHectares: 0.5,
  areaSquareMeters: 5000,
  priceCOP: 620000000,
  pricePerSquareMeterCOP: 124000,
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
    potLandUse: 'Vivienda campestre',
  },
  featured: true,
  status: 'en_venta',
  statusLabel: 'En Venta',
  imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
  galleryUrls: [],
  highlights: ['Vista al embalse', 'Portería 24h'],
  tags: ['Campestre'],
};

describe('generateWhatsAppPropertyUrl (Sanitización y Codificación de URLs)', () => {
  it('genera una URL válida de WhatsApp wa.me con número limpio', () => {
    const url = generateWhatsAppPropertyUrl('300 000 0000', sampleProperty);
    expect(url.startsWith('https://wa.me/573000000000?text=')).toBe(true);
  });

  it('codifica correctamente caracteres especiales, tildes y saltos de línea con encodeURIComponent', () => {
    const url = generateWhatsAppPropertyUrl('573000000000', sampleProperty);
    
    // La URL debe estar codificada (%20 o %0A en lugar de espacios crudos o enters)
    expect(url).not.toContain('\n');
    expect(url).not.toContain(' ');

    // El mensaje decodificado debe contener los datos clave del lote
    const encodedText = url.split('text=')[1];
    const decoded = decodeURIComponent(encodedText);

    expect(decoded).toContain('Lote Campestre Reserva El Roble');
    expect(decoded).toContain('La Calera, Cundinamarca');
    expect(decoded).toContain('$ 620.000.000 COP');
    expect(decoded).toContain('0.5 ha (5.000 m²)');
  });

  it('incorpora nota personalizada del usuario si se proporciona', () => {
    const customNote = 'Quisiera programar una visita este sábado en la mañana.';
    const url = generateWhatsAppPropertyUrl('573000000000', sampleProperty, customNote);
    
    const encodedText = url.split('text=')[1];
    const decoded = decodeURIComponent(encodedText);

    expect(decoded).toContain(customNote);
  });

  it('maneja propiedades con campos parciales defensivamente sin fallar', () => {
    const partialProperty: Partial<Property> = {
      title: 'Lote Básico',
      priceCOP: 150000000,
    };

    const url = generateWhatsAppPropertyUrl('573000000000', partialProperty as Property);
    expect(url.startsWith('https://wa.me/573000000000?text=')).toBe(true);

    const decoded = decodeURIComponent(url.split('text=')[1]);
    expect(decoded).toContain('Lote Básico');
    expect(decoded).toContain('$ 150.000.000 COP');
  });
});
