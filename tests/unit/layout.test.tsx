import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

describe('Task 5: Header de Navegación y Footer Editorial', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
    window.innerWidth = 1200;
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  /* ------------------------------------------------------------------
   * HEADER
   * ------------------------------------------------------------------ */
  describe('<Header />', () => {
    it('renderiza el logo de la marca y enlaces de navegación principales', () => {
      render(<Header />);

      expect(screen.getByText(/LandSelling/i)).toBeDefined();
      expect(screen.getByRole('link', { name: /inicio/i })).toBeDefined();
      expect(screen.getByRole('link', { name: /propiedades/i })).toBeDefined();
      expect(screen.getByRole('link', { name: /nosotros/i })).toBeDefined();
      expect(screen.getByRole('link', { name: /contacto/i })).toBeDefined();
      expect(screen.getAllByRole('button', { name: /empezar/i }).length).toBeGreaterThan(0);
    });

    it('gestiona correctamente aria-expanded y aria-controls en el botón hamburguesa', () => {
      render(<Header />);

      const toggleButton = screen.getByRole('button', { name: /abrir menú/i });
      expect(toggleButton.getAttribute('aria-expanded')).toBe('false');
      expect(toggleButton.getAttribute('aria-controls')).toBe('mobile-menu');

      fireEvent.click(toggleButton);
      expect(toggleButton.getAttribute('aria-expanded')).toBe('true');
      expect(screen.getByRole('button', { name: /cerrar menú/i })).toBeDefined();
    });

    it('bloquea el scroll del body al abrir el drawer móvil y lo restaura al cerrarlo', () => {
      render(<Header />);

      const toggleButton = screen.getByRole('button', { name: /abrir menú/i });
      fireEvent.click(toggleButton);
      expect(document.body.style.overflow).toBe('hidden');

      fireEvent.click(toggleButton);
      expect(document.body.style.overflow).toBe('');
    });

    it('cierra el menú móvil al presionar la tecla Escape', () => {
      render(<Header />);

      const toggleButton = screen.getByRole('button', { name: /abrir menú/i });
      fireEvent.click(toggleButton);
      expect(toggleButton.getAttribute('aria-expanded')).toBe('true');

      fireEvent.keyDown(window, { key: 'Escape' });
      expect(toggleButton.getAttribute('aria-expanded')).toBe('false');
    });

    it('cierra el menú móvil al hacer clic en el backdrop', () => {
      render(<Header />);

      const toggleButton = screen.getByRole('button', { name: /abrir menú/i });
      fireEvent.click(toggleButton);

      const backdrop = screen.getByTestId('mobile-menu-backdrop');
      fireEvent.click(backdrop);

      expect(toggleButton.getAttribute('aria-expanded')).toBe('false');
    });

    it('cierra el menú móvil al hacer clic en un enlace de navegación', () => {
      render(<Header />);

      const toggleButton = screen.getByRole('button', { name: /abrir menú/i });
      fireEvent.click(toggleButton);

      const mobileMenu = screen.getByRole('navigation', { name: /menú móvil/i });
      const mobileLink = mobileMenu.querySelector('a');
      expect(mobileLink).not.toBeNull();

      fireEvent.click(mobileLink!);
      expect(toggleButton.getAttribute('aria-expanded')).toBe('false');
    });

    it('cierra el menú móvil al redimensionar a pantalla de escritorio (lg)', () => {
      render(<Header />);

      const toggleButton = screen.getByRole('button', { name: /abrir menú/i });
      fireEvent.click(toggleButton);
      expect(toggleButton.getAttribute('aria-expanded')).toBe('true');

      act(() => {
        window.innerWidth = 1024;
        window.dispatchEvent(new Event('resize'));
      });

      expect(toggleButton.getAttribute('aria-expanded')).toBe('false');
    });

    it('llama a onSearchClick y onGetStartedClick cuando se proporcionan', () => {
      const handleSearch = vi.fn();
      const handleGetStarted = vi.fn();

      render(<Header onSearchClick={handleSearch} onGetStartedClick={handleGetStarted} />);

      const searchButtons = screen.getAllByRole('button', { name: /buscar propiedades/i });
      fireEvent.click(searchButtons[0]);
      expect(handleSearch).toHaveBeenCalledTimes(1);

      const getStartedButton = screen.getAllByRole('button', { name: /empezar/i })[0];
      fireEvent.click(getStartedButton);
      expect(handleGetStarted).toHaveBeenCalledTimes(1);
    });
  });

  /* ------------------------------------------------------------------
   * FOOTER
   * ------------------------------------------------------------------ */
  describe('<Footer />', () => {
    it('renderiza información institucional, legal colombiana y NIT', () => {
      render(<Footer />);

      expect(screen.getByText(/NIT: 901.845.210-4/i)).toBeDefined();
      expect(screen.getByText(/Vigilado Superintendencia de Notariado y Registro/i)).toBeDefined();
      expect(screen.getByText(/Habeas Data \(Ley 1581\)/i)).toBeDefined();
      expect(screen.getByText(/Términos del Servicio/i)).toBeDefined();
    });

    it('renderiza enlaces a categorías inmobiliarias y navegación', () => {
      render(<Footer />);

      expect(screen.getByText('Lotes Campestres')).toBeDefined();
      expect(screen.getByText('Fincas Agrícolas')).toBeDefined();
      expect(screen.getByText('Terrenos Comerciales')).toBeDefined();
      expect(screen.getByText('Lotes Industriales')).toBeDefined();
      expect(screen.getByText('Catálogo de Lotes')).toBeDefined();
    });

    it('renderiza enlaces a redes sociales con etiquetas accesibles', () => {
      render(<Footer />);

      expect(screen.getByLabelText(/síguenos en instagram/i)).toBeDefined();
      expect(screen.getByLabelText(/síguenos en facebook/i)).toBeDefined();
      expect(screen.getByLabelText(/síguenos en linkedin/i)).toBeDefined();
      expect(screen.getByLabelText(/síguenos en youtube/i)).toBeDefined();
    });

    it('muestra error cuando se intenta enviar el boletín con campo vacío', () => {
      render(<Footer />);

      const submitButton = screen.getByRole('button', { name: /suscribirme/i });
      fireEvent.click(submitButton);

      expect(screen.getByText(/por favor ingresa tu correo electrónico/i)).toBeDefined();
    });

    it('muestra error cuando se ingresa un correo con formato inválido', () => {
      render(<Footer />);

      const input = screen.getByPlaceholderText('tu@correo.com');
      const submitButton = screen.getByRole('button', { name: /suscribirme/i });

      fireEvent.change(input, { target: { value: 'correoinvalido' } });
      fireEvent.click(submitButton);

      expect(screen.getByText(/ingresa una dirección de correo electrónico válida/i)).toBeDefined();
    });

    it('muestra confirmación exitosa con aria-live al ingresar un correo válido sin recargar', () => {
      render(<Footer />);

      const input = screen.getByPlaceholderText('tu@correo.com') as HTMLInputElement;
      const submitButton = screen.getByRole('button', { name: /suscribirme/i });

      fireEvent.change(input, { target: { value: 'cliente.potencial@empresa.co' } });
      fireEvent.click(submitButton);

      expect(screen.getByText(/¡gracias por suscribirte!/i)).toBeDefined();
      expect(input.value).toBe('');
    });
  });
});
