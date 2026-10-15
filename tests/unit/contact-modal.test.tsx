import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import {
  ContactLeadModal,
  normalizeColombianPhone,
  isValidColombianMobile,
} from '@/components/contact/ContactLeadModal';
import { WhatsAppFloatingButton } from '@/components/contact/WhatsAppFloatingButton';
import { Property } from '@/types/property';

const mockProperty: Property = {
  id: 'prop-01',
  slug: 'lote-campestre-reserva-el-roble',
  title: 'Lote Campestre Reserva El Roble',
  shortDescription: 'Lote campestre con vista al embalse.',
  fullDescription: 'Lote campestre con vista al embalse y vías pavimentadas.',
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
    potLandUse: 'Vivienda campestre individual',
  },
  featured: true,
  status: 'en_venta',
  statusLabel: 'En Venta',
  imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200',
  galleryUrls: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200'],
  highlights: ['Vista al embalse'],
  tags: ['Campestre'],
};

describe('Task 9: Modal de Captación de Leads y Botón Flotante de WhatsApp', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  /* ------------------------------------------------------------------
   * HELPERS DE VALIDACIÓN
   * ------------------------------------------------------------------ */
  describe('Utilidades de normalización telefónica colombiana', () => {
    it('normaliza números eliminando espacios, guiones y prefijos +57 / 57', () => {
      expect(normalizeColombianPhone('+57 300 123 4567')).toBe('3001234567');
      expect(normalizeColombianPhone('57-310-987-6543')).toBe('3109876543');
      expect(normalizeColombianPhone('320 111 2233')).toBe('3201112233');
    });

    it('valida números celulares colombianos legítimos (^3\\d{9}$)', () => {
      expect(isValidColombianMobile('3001234567')).toBe(true);
      expect(isValidColombianMobile('+57 315 888 9900')).toBe(true);
      expect(isValidColombianMobile('573205556677')).toBe(true);
      // Inválidos:
      expect(isValidColombianMobile('123456')).toBe(false);
      expect(isValidColombianMobile('2001234567')).toBe(false); // No empieza en 3
      expect(isValidColombianMobile('300123456789')).toBe(false); // Más de 10 dígitos
    });
  });

  /* ------------------------------------------------------------------
   * CONTACT LEAD MODAL
   * ------------------------------------------------------------------ */
  describe('<ContactLeadModal />', () => {
    it('no renderiza nada cuando isOpen es false', () => {
      render(<ContactLeadModal isOpen={false} onClose={vi.fn()} />);
      expect(screen.queryByRole('dialog')).toBeNull();
    });

    it('renderiza encabezado general cuando no se pasa propiedad asociada', () => {
      render(<ContactLeadModal isOpen={true} onClose={vi.fn()} />);
      expect(screen.getByText('Solicitud de Asesoría Inmobiliaria')).toBeDefined();
      expect(screen.getByLabelText(/nombre completo/i)).toBeDefined();
    });

    it('renderiza encabezado contextual con datos de la propiedad cuando se proporciona', () => {
      render(
        <ContactLeadModal isOpen={true} onClose={vi.fn()} property={mockProperty} />
      );

      expect(screen.getByText('Solicitar Visita / Asesoría del Terreno')).toBeDefined();
      expect(screen.getByText(/Ref: PROP-01/i)).toBeDefined();
      expect(screen.getByText('$ 620.000.000 COP')).toBeDefined();
    });

    it('muestra errores de validación si se envía el formulario vacío o inválido', () => {
      render(<ContactLeadModal isOpen={true} onClose={vi.fn()} />);

      const submitBtn = screen.getByRole('button', { name: /enviar solicitud/i });
      fireEvent.click(submitBtn);

      expect(screen.getByText(/ingresa tu nombre completo/i)).toBeDefined();
      expect(screen.getByText(/ingresa una dirección de correo electrónico válida/i)).toBeDefined();
      expect(screen.getByText(/ingresa un número celular colombiano válido/i)).toBeDefined();
      expect(screen.getByText(/debes autorizar el tratamiento de datos personales/i)).toBeDefined();
    });

    it('acepta teléfonos colombianos con prefijo +57 y espacios', () => {
      render(<ContactLeadModal isOpen={true} onClose={vi.fn()} />);

      const nameInput = screen.getByLabelText(/nombre completo/i);
      const emailInput = screen.getByLabelText(/correo electrónico/i);
      const phoneInput = screen.getByLabelText(/teléfono móvil/i);
      const habeasCheckbox = screen.getByRole('checkbox');
      const submitBtn = screen.getByRole('button', { name: /enviar solicitud/i });

      fireEvent.change(nameInput, { target: { value: 'Mateo Gómez' } });
      fireEvent.change(emailInput, { target: { value: 'mateo@ejemplo.co' } });
      fireEvent.change(phoneInput, { target: { value: '+57 312 456 7890' } });
      fireEvent.click(habeasCheckbox);

      fireEvent.click(submitBtn);

      // No debe haber error de teléfono
      expect(screen.queryByText(/ingresa un número celular colombiano válido/i)).toBeNull();
    });

    it('transiciona a la vista de éxito tras enviar un formulario válido y ofrece link de WhatsApp', async () => {
      vi.useFakeTimers();

      render(
        <ContactLeadModal
          isOpen={true}
          onClose={vi.fn()}
          property={mockProperty}
          whatsappPhone="573001112233"
        />
      );

      const nameInput = screen.getByLabelText(/nombre completo/i);
      const emailInput = screen.getByLabelText(/correo electrónico/i);
      const phoneInput = screen.getByLabelText(/teléfono móvil/i);
      const habeasCheckbox = screen.getByRole('checkbox');
      const submitBtn = screen.getByRole('button', { name: /enviar solicitud/i });

      fireEvent.change(nameInput, { target: { value: 'Laura Restrepo' } });
      fireEvent.change(emailInput, { target: { value: 'laura.restrepo@empresa.com' } });
      fireEvent.change(phoneInput, { target: { value: '3159998877' } });
      fireEvent.click(habeasCheckbox);

      fireEvent.click(submitBtn);

      // Avanzar temporizador del submit simulado
      act(() => {
        vi.advanceTimersByTime(500);
      });

      // Vista de éxito
      expect(screen.getByRole('status')).toBeDefined();
      expect(screen.getByText(/¡Gracias por tu interés, Laura!/i)).toBeDefined();

      // Botón de WhatsApp con los datos del lead
      const waButton = screen.getByRole('link', { name: /abrir en whatsapp con mis datos/i });
      expect(waButton.getAttribute('target')).toBe('_blank');
      expect(waButton.getAttribute('rel')).toBe('noopener noreferrer');
      expect(waButton.getAttribute('href')).toContain('https://wa.me/573001112233');
      expect(waButton.getAttribute('href')).toContain(encodeURIComponent('Laura Restrepo'));

      vi.useRealTimers();
    });

    it('mantiene el foco en el campo de texto al introducir datos letra por letra sin robar el foco hacia el botón de cerrar', () => {
      vi.useFakeTimers();
      render(<ContactLeadModal isOpen={true} onClose={vi.fn()} property={mockProperty} />);

      // Avanzar temporizador inicial de apertura
      act(() => {
        vi.advanceTimersByTime(100);
      });

      const nameInput = screen.getByLabelText(/nombre completo/i);
      nameInput.focus();
      expect(document.activeElement).toBe(nameInput);

      // Escribir letra por letra simulando la interacción real del usuario
      const textToType = 'Carlos';
      let currentVal = '';
      for (const char of textToType) {
        currentVal += char;
        fireEvent.change(nameInput, { target: { value: currentVal } });
        act(() => {
          vi.advanceTimersByTime(60);
        });
        expect(document.activeElement).toBe(nameInput);
      }

      vi.useRealTimers();
    });
  });

  /* ------------------------------------------------------------------
   * WHATSAPP FLOATING BUTTON
   * ------------------------------------------------------------------ */
  describe('<WhatsAppFloatingButton />', () => {
    it('renderiza con icono accesible, tooltip y atributos target="_blank" y rel="noopener noreferrer"', () => {
      render(<WhatsAppFloatingButton whatsappPhone="573005556666" />);

      const button = screen.getByRole('link', { name: /contactar a un asesor por whatsapp/i });
      expect(button).toBeDefined();
      expect(button.getAttribute('target')).toBe('_blank');
      expect(button.getAttribute('rel')).toBe('noopener noreferrer');
      expect(button.getAttribute('href')).toContain('https://wa.me/573005556666');

      expect(screen.getByText('¿Dudas? Habla con un experto')).toBeDefined();
    });
  });
});
