import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Container } from '@/components/ui/Container';

describe('Task 4: Componentes UI Base y Sistema de Diseño', () => {
  /* ------------------------------------------------------------------
   * BUTTON
   * ------------------------------------------------------------------ */
  describe('<Button />', () => {
    it('renderiza texto y maneja clics', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Ver Lotes</Button>);

      const button = screen.getByRole('button', { name: /ver lotes/i });
      expect(button).toBeDefined();

      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('cumple con el objetivo táctil mínimo de 44px (WCAG)', () => {
      render(<Button size="md">Cotizar Terreno</Button>);
      const button = screen.getByRole('button', { name: /cotizar terreno/i });
      expect(button.className).toContain('min-h-[44px]');
      expect(button.className).toContain('min-w-[44px]');
    });

    it('aplica las clases correctas según la variante', () => {
      const { rerender } = render(<Button variant="primary">Primario</Button>);
      let button = screen.getByRole('button');
      expect(button.className).toContain('bg-emerald');

      rerender(<Button variant="secondary">Secundario</Button>);
      button = screen.getByRole('button');
      expect(button.className).toContain('bg-cream-200');

      rerender(<Button variant="outline">Borde</Button>);
      button = screen.getByRole('button');
      expect(button.className).toContain('border-forest-800');

      rerender(<Button variant="gold">Dorado</Button>);
      button = screen.getByRole('button');
      expect(button.className).toContain('bg-gold');

      rerender(<Button variant="ghost">Fantasma</Button>);
      button = screen.getByRole('button');
      expect(button.className).toContain('bg-transparent');
    });

    it('muestra el spinner de carga y deshabilita la interacción cuando isLoading es true', () => {
      const handleClick = vi.fn();
      render(
        <Button isLoading onClick={handleClick}>
          Cargando datos
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button.getAttribute('aria-busy')).toBe('true');
      expect((button as HTMLButtonElement).disabled).toBe(true);
      expect(screen.getByTestId('loading-spinner')).toBeDefined();

      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('renderiza iconos a la izquierda y a la derecha', () => {
      render(
        <Button
          leftIcon={<span data-testid="left-icon">←</span>}
          rightIcon={<span data-testid="right-icon">→</span>}
        >
          Siguiente
        </Button>
      );

      expect(screen.getByTestId('left-icon')).toBeDefined();
      expect(screen.getByTestId('right-icon')).toBeDefined();
    });
  });

  /* ------------------------------------------------------------------
   * BADGE
   * ------------------------------------------------------------------ */
  describe('<Badge />', () => {
    it('renderiza el contenido y variantes de estado de lotes', () => {
      const { rerender } = render(<Badge variant="available">Disponible</Badge>);
      let badge = screen.getByText('Disponible');
      expect(badge).toBeDefined();
      expect(badge.parentElement?.className || badge.className).toContain('text-emerald-dark');

      rerender(<Badge variant="reserved">Reservado</Badge>);
      badge = screen.getByText('Reservado');
      expect(badge.parentElement?.className || badge.className).toContain('text-gold-dark');

      rerender(<Badge variant="sold">Vendido</Badge>);
      badge = screen.getByText('Vendido');
      expect(badge.parentElement?.className || badge.className).toContain('text-gray-700');
    });

    it('renderiza el indicador de punto cuando dot es true', () => {
      render(
        <Badge variant="available" dot>
          En Venta
        </Badge>
      );
      expect(screen.getByTestId('badge-dot')).toBeDefined();
    });
  });

  /* ------------------------------------------------------------------
   * MODAL
   * ------------------------------------------------------------------ */
  describe('<Modal />', () => {
    beforeEach(() => {
      document.body.style.overflow = '';
    });

    afterEach(() => {
      document.body.style.overflow = '';
    });

    it('no renderiza nada cuando isOpen es false', () => {
      render(
        <Modal isOpen={false} onClose={() => {}} title="Ficha del Lote">
          <p>Detalles del lote</p>
        </Modal>
      );

      expect(screen.queryByRole('dialog')).toBeNull();
      expect(screen.queryByText('Ficha del Lote')).toBeNull();
    });

    it('renderiza con aria-modal="true", título y bloquea el scroll del body', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Ficha del Lote" description="Lote campestre">
          <p>Detalles del lote</p>
        </Modal>
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeDefined();
      expect(dialog.getAttribute('aria-modal')).toBe('true');
      expect(screen.getByText('Ficha del Lote')).toBeDefined();
      expect(screen.getByText('Lote campestre')).toBeDefined();
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('llama a onClose al presionar la tecla Escape', () => {
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose} title="Ficha del Lote">
          <p>Contenido</p>
        </Modal>
      );

      fireEvent.keyDown(window, { key: 'Escape' });
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('llama a onClose al hacer clic en el botón de cerrar', () => {
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose} title="Ficha del Lote">
          <p>Contenido</p>
        </Modal>
      );

      const closeButton = screen.getByRole('button', { name: /cerrar modal/i });
      fireEvent.click(closeButton);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('llama a onClose al hacer clic en el backdrop oscuro', () => {
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose} title="Ficha del Lote">
          <p>Contenido</p>
        </Modal>
      );

      const backdrop = screen.getByTestId('modal-backdrop');
      fireEvent.click(backdrop);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  /* ------------------------------------------------------------------
   * INPUT
   * ------------------------------------------------------------------ */
  describe('<Input />', () => {
    it('renderiza input con su etiqueta vinculada', () => {
      render(<Input label="Nombre Completo" placeholder="Ej. Juan Pérez" />);

      const label = screen.getByText('Nombre Completo');
      const input = screen.getByPlaceholderText('Ej. Juan Pérez');

      expect(label.getAttribute('for')).toBe(input.getAttribute('id'));
      expect(input.className).toContain('min-h-[44px]');
    });

    it('muestra mensaje de error y activa aria-invalid', () => {
      render(
        <Input
          label="Teléfono Celular"
          error="Debe ser un número móvil colombiano válido de 10 dígitos"
        />
      );

      const input = screen.getByLabelText(/teléfono celular/i);
      expect(input.getAttribute('aria-invalid')).toBe('true');

      const alert = screen.getByRole('alert');
      expect(alert.textContent).toContain(
        'Debe ser un número móvil colombiano válido de 10 dígitos'
      );
      expect(input.getAttribute('aria-describedby')).toBe(alert.id);
    });

    it('muestra helperText cuando no hay error', () => {
      render(
        <Input
          label="Presupuesto"
          helperText="Indica tu presupuesto estimado en pesos colombianos"
        />
      );

      const helper = screen.getByText(
        'Indica tu presupuesto estimado en pesos colombianos'
      );
      expect(helper).toBeDefined();
    });

    it('permite cambiar el valor mediante eventos de cambio', () => {
      const handleChange = vi.fn();
      render(<Input label="Correo" onChange={handleChange} />);

      const input = screen.getByLabelText('Correo');
      fireEvent.change(input, { target: { value: 'contacto@land.co' } });

      expect(handleChange).toHaveBeenCalled();
    });
  });

  /* ------------------------------------------------------------------
   * SELECT
   * ------------------------------------------------------------------ */
  describe('<Select />', () => {
    const mockOptions = [
      { value: 'all', label: 'Todos los tipos' },
      { value: 'campestre', label: 'Lotes Campestres' },
      { value: 'agricola', label: 'Fincas Agrícolas' },
    ];

    it('renderiza las opciones y vincula la etiqueta accesible', () => {
      render(<Select label="Tipo de Terreno" options={mockOptions} defaultValue="all" />);

      const select = screen.getByLabelText('Tipo de Terreno') as HTMLSelectElement;
      expect(select).toBeDefined();
      expect(select.options.length).toBe(3);
      expect(select.className).toContain('min-h-[44px]');
    });

    it('muestra mensaje de error cuando se le pasa error prop', () => {
      render(
        <Select
          label="Departamento"
          options={mockOptions}
          error="Debes seleccionar un departamento"
        />
      );

      const select = screen.getByLabelText(/departamento/i);
      expect(select.getAttribute('aria-invalid')).toBe('true');
      expect(screen.getByText('Debes seleccionar un departamento')).toBeDefined();
    });

    it('dispara el evento de cambio al seleccionar otra opción', () => {
      const handleChange = vi.fn();
      render(
        <Select label="Tipo" options={mockOptions} onChange={handleChange} defaultValue="all" />
      );

      const select = screen.getByLabelText('Tipo');
      fireEvent.change(select, { target: { value: 'agricola' } });

      expect(handleChange).toHaveBeenCalled();
    });
  });

  /* ------------------------------------------------------------------
   * CONTAINER
   * ------------------------------------------------------------------ */
  describe('<Container />', () => {
    it('renderiza sus hijos dentro de un contenedor responsive centrado', () => {
      render(
        <Container size="xl">
          <h1>Título de Sección</h1>
        </Container>
      );

      const heading = screen.getByRole('heading', { name: /título de sección/i });
      const container = heading.parentElement;

      expect(container?.className).toContain('mx-auto');
      expect(container?.className).toContain('max-w-7xl');
      expect(container?.className).toContain('px-4');
    });

    it('permite renderizar como otro elemento HTML semántico (polimorfismo)', () => {
      render(
        <Container as="section" data-testid="custom-section">
          <p>Contenido semántico</p>
        </Container>
      );

      const section = screen.getByTestId('custom-section');
      expect(section.tagName.toLowerCase()).toBe('section');
    });
  });
});
