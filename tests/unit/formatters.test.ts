import { describe, it, expect } from 'vitest';
import {
  formatCOP,
  formatAreaSurface,
  sanitizeColombianPhone,
  formatPhoneDisplay,
} from '@/lib/formatters';

describe('formatCOP (Robustez y Validación Defensiva)', () => {
  it('formatea montos estándar en COP con separador de miles y sufijo', () => {
    expect(formatCOP(450000000)).toBe('$ 450.000.000 COP');
    expect(formatCOP(1800000000)).toBe('$ 1.800.000.000 COP');
    expect(formatCOP(620000000)).toBe('$ 620.000.000 COP');
  });

  it('formatea 0 correctamente', () => {
    expect(formatCOP(0)).toBe('$ 0 COP');
  });

  it('redondea valores con decimales a enteros antes de formatear', () => {
    expect(formatCOP(450000000.4)).toBe('$ 450.000.000 COP');
    expect(formatCOP(450000000.8)).toBe('$ 450.000.001 COP');
  });

  it('maneja valores negativos defensivamente ante ajustes o descuentos', () => {
    expect(formatCOP(-50000000)).toBe('-$ 50.000.000 COP');
  });

  it('maneja defensivamente valores nulos, indefinidos o NaN sin lanzar excepciones', () => {
    expect(formatCOP(null as unknown as number)).toBe('$ 0 COP');
    expect(formatCOP(undefined as unknown as number)).toBe('$ 0 COP');
    expect(formatCOP(NaN)).toBe('$ 0 COP');
  });
});

describe('formatAreaSurface', () => {
  it('formatea área dual con hectáreas y metros cuadrados', () => {
    expect(formatAreaSurface(1.5, 15000)).toBe('1.5 ha (15.000 m²)');
    expect(formatAreaSurface(0.5, 5000)).toBe('0.5 ha (5.000 m²)');
    expect(formatAreaSurface(45, 450000)).toBe('45 ha (450.000 m²)');
    expect(formatAreaSurface(0.35, 3500)).toBe('0.35 ha (3.500 m²)');
  });

  it('omite decimales innecesarios en hectáreas enteras', () => {
    expect(formatAreaSurface(12, 120000)).toBe('12 ha (120.000 m²)');
  });

  it('maneja defensivamente valores en cero o faltantes', () => {
    expect(formatAreaSurface(0, 0)).toBe('0 m²');
    expect(formatAreaSurface(null as any, undefined as any)).toBe('0 m²');
  });
});

describe('sanitizeColombianPhone', () => {
  it('elimina espacios, guiones y paréntesis y asegura prefijo 57', () => {
    expect(sanitizeColombianPhone('300 123 4567')).toBe('573001234567');
    expect(sanitizeColombianPhone('300-123-4567')).toBe('573001234567');
    expect(sanitizeColombianPhone('+57 (300) 123-4567')).toBe('573001234567');
    expect(sanitizeColombianPhone('573001234567')).toBe('573001234567');
  });

  it('retorna vacío para entradas nulas o vacías', () => {
    expect(sanitizeColombianPhone('')).toBe('');
    expect(sanitizeColombianPhone(null as any)).toBe('');
  });
});

describe('formatPhoneDisplay', () => {
  it('formatea números para visualización legible con espacios', () => {
    expect(formatPhoneDisplay('573000000000')).toBe('+57 300 000 0000');
    expect(formatPhoneDisplay('3001234567')).toBe('+57 300 123 4567');
  });

  it('retorna vacío para valores no válidos', () => {
    expect(formatPhoneDisplay('')).toBe('');
    expect(formatPhoneDisplay(null as any)).toBe('');
  });
});
