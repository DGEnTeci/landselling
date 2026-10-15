import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PropertyDetailModal } from '@/components/properties/PropertyDetailModal';
import { Property } from '@/types/property';

const mockProperty1: Property = {
  id: 'prop-01',
  slug: 'lote-campestre-reserva-el-roble',
  title: 'Lote Campestre Reserva El Roble',
  shortDescription: 'Espectacular lote con vista panorámica al embalse San Rafael.',
  fullDescription: 'Lote campestre con vías internas pavimentadas y senderos ecológicos.',
  categorySlug: 'residencial',
  categoryName: 'Terreno Residencial',
  location: {
    department: 'Cundinamarca',
    municipality: 'La Calera',
    veredaOrSector: 'Vereda El Salitre',
    distanceFromMainCity: '25 min de Bogotá',
    altitudeMeters: 2750,
  },
  areaHectares: 0.5,
  areaSquareMeters: 5000,
  priceCOP: 620000000,
  pricePerSquareMeterCOP: 124000,
  pricePerHectareCOP: 1240000000,
  topography: 'ondulada_suave',
  topographyLabel: 'Ondulada Suave con Explanación',
  accessRoad: 'pavimentada',
  accessRoadLabel: 'Vía Pavimentada',
  utilities: {
    waterSource: 'Acueducto veredal con contador instalado',
    hasElectricity: true,
    hasWater: true,
    hasInternetFiber: true,
    gasType: 'Gas propano',
  },
  legal: {
    deedStatus: 'Escritura pública 100%',
    hasIndependentFolio: true,
    freeOfEncumbrances: true,
    potLandUse: 'Vivienda campestre individual (POT La Calera)',
  },
  featured: true,
  status: 'en_venta',
  statusLabel: 'En Venta',
  imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200',
  galleryUrls: [
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200',
    'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1200',
    'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=80&w=1200',
  ],
  highlights: ['Vista despejada al embalse', 'Explanación de 600 m² lista'],
  tags: ['Campestre', 'Alta Seguridad'],
};

const mockProperty2: Property = {
  ...mockProperty1,
  id: 'prop-02',
  slug: 'finca-agricola-antioquia',
  title: 'Finca Agrícola Llanogrande',
  galleryUrls: [
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200',
  ],
};

describe('Task 8: Modal de Ficha Técnica Completa (PropertyDetailModal)', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('no renderiza nada cuando isOpen es false o property es null', () => {
    const { rerender } = render(
      <PropertyDetailModal isOpen={false} onClose={vi.fn()} property={mockProperty1} />
    );
    expect(screen.queryByRole('dialog')).toBeNull();

    rerender(<PropertyDetailModal isOpen={true} onClose={vi.fn()} property={null} />);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renderiza encabezado, referencia, ubicación y bloque financiero en COP con precio por m²', () => {
    render(
      <PropertyDetailModal
        isOpen={true}
        onClose={vi.fn()}
        property={mockProperty1}
      />
    );

    // Título y referencia
    expect(screen.getByRole('dialog')).toBeDefined();
    expect(screen.getByText('Lote Campestre Reserva El Roble')).toBeDefined();
    expect(screen.getByText(/Referencia: PROP-01/i)).toBeDefined();

    // Bloque financiero
    expect(screen.getByText('$ 620.000.000 COP')).toBeDefined();
    expect(screen.getByText(/0\.5 ha \(5\.000 m²\)/i)).toBeDefined();
    expect(screen.getByText(/\$ 124\.000 COP \/ m²/i)).toBeDefined();
  });

  it('renderiza la viabilidad técnica, servicios y el bloque de seguridad jurídica colombiana', () => {
    render(
      <PropertyDetailModal
        isOpen={true}
        onClose={vi.fn()}
        property={mockProperty1}
      />
    );

    // Viabilidad técnica
    expect(screen.getByText('Ondulada Suave con Explanación')).toBeDefined();
    expect(screen.getByText('Vía Pavimentada')).toBeDefined();
    expect(screen.getByText('Acueducto veredal con contador instalado')).toBeDefined();
    expect(screen.getByText(/Red Eléctrica • Fibra Óptica/i)).toBeDefined();

    // Seguridad Jurídica
    expect(screen.getByText('Seguridad y Tradición Jurídica Verificada')).toBeDefined();
    expect(screen.getByText(/Escritura pública 100%/i)).toBeDefined();
    expect(screen.getByText(/Folio individual asignado/i)).toBeDefined();
    expect(screen.getByText(/Libre de hipotecas y embargos/i)).toBeDefined();
    expect(screen.getByText(/Vivienda campestre individual \(POT La Calera\)/i)).toBeDefined();
  });

  it('permite navegar entre imágenes de la galería y hacer clic en miniaturas', () => {
    render(
      <PropertyDetailModal
        isOpen={true}
        onClose={vi.fn()}
        property={mockProperty1}
      />
    );

    expect(screen.getByText('1 / 3')).toBeDefined();

    const nextBtn = screen.getByRole('button', { name: /imagen siguiente/i });
    fireEvent.click(nextBtn);
    expect(screen.getByText('2 / 3')).toBeDefined();

    const prevBtn = screen.getByRole('button', { name: /imagen anterior/i });
    fireEvent.click(prevBtn);
    expect(screen.getByText('1 / 3')).toBeDefined();

    const thumbnail3 = screen.getByRole('tab', { name: /ver imagen 3/i });
    fireEvent.click(thumbnail3);
    expect(screen.getByText('3 / 3')).toBeDefined();
  });

  it('reinicia el índice de la galería a 0 al cambiar de propiedad', () => {
    const { rerender } = render(
      <PropertyDetailModal
        isOpen={true}
        onClose={vi.fn()}
        property={mockProperty1}
      />
    );

    const nextBtn = screen.getByRole('button', { name: /imagen siguiente/i });
    fireEvent.click(nextBtn);
    expect(screen.getByText('2 / 3')).toBeDefined();

    // Cambiar a otra propiedad
    rerender(
      <PropertyDetailModal
        isOpen={true}
        onClose={vi.fn()}
        property={mockProperty2}
      />
    );

    // Debe haberse reiniciado al índice 0 (1 de 2)
    expect(screen.getByText('1 / 2')).toBeDefined();
  });

  it('configura el enlace de WhatsApp con atributos seguros target="_blank" y rel="noopener noreferrer"', () => {
    render(
      <PropertyDetailModal
        isOpen={true}
        onClose={vi.fn()}
        property={mockProperty1}
        whatsappPhone="573105559999"
      />
    );

    const whatsappLink = screen.getByRole('link', { name: /hablar por whatsapp/i });
    expect(whatsappLink).toBeDefined();
    expect(whatsappLink.getAttribute('target')).toBe('_blank');
    expect(whatsappLink.getAttribute('rel')).toBe('noopener noreferrer');
    expect(whatsappLink.getAttribute('href')).toContain('https://wa.me/573105559999');
    expect(whatsappLink.getAttribute('href')).toContain(encodeURIComponent('Lote Campestre Reserva El Roble'));
  });

  it('dispara onRequestContact al hacer clic en "Solicitar Visita / Asesoría"', () => {
    const handleRequestContact = vi.fn();
    render(
      <PropertyDetailModal
        isOpen={true}
        onClose={vi.fn()}
        property={mockProperty1}
        onRequestContact={handleRequestContact}
      />
    );

    const contactBtn = screen.getByRole('button', { name: /solicitar visita \/ asesoría/i });
    fireEvent.click(contactBtn);

    expect(handleRequestContact).toHaveBeenCalledTimes(1);
    expect(handleRequestContact).toHaveBeenCalledWith(mockProperty1);
  });

  it('cierra el modal al hacer clic en el botón de cerrar', () => {
    const handleClose = vi.fn();
    render(
      <PropertyDetailModal
        isOpen={true}
        onClose={handleClose}
        property={mockProperty1}
      />
    );

    const closeBtn = screen.getByRole('button', { name: /cerrar modal/i });
    fireEvent.click(closeBtn);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
