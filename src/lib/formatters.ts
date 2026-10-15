/**
 * Formateador de moneda colombiana (COP) para LandSelling.com
 * Incluye validación defensiva estricta ante valores nulos, indefinidos o NaN.
 */
export function formatCOP(value: number): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '$ 0 COP';
  }

  const rounded = Math.round(value);
  const isNegative = rounded < 0;
  const absValue = Math.abs(rounded);
  const formatted = absValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return isNegative ? `-$ ${formatted} COP` : `$ ${formatted} COP`;
}

/**
 * Formateador de superficies duales (Hectáreas y Metros cuadrados)
 * Estándar comercial e inmobiliario en Colombia.
 */
export function formatAreaSurface(
  hectares?: number | null,
  squareMeters?: number | null
): string {
  const safeHectares = typeof hectares === 'number' && !isNaN(hectares) ? hectares : 0;
  const safeSquareMeters =
    typeof squareMeters === 'number' && !isNaN(squareMeters)
      ? squareMeters
      : safeHectares * 10000;

  if (safeHectares <= 0 && safeSquareMeters <= 0) {
    return '0 m²';
  }

  const formattedM2 = Math.round(safeSquareMeters)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  if (safeHectares <= 0) {
    return `${formattedM2} m²`;
  }

  // Quitar ceros innecesarios en hectáreas (ej. 12.0 -> 12)
  const formattedHa = parseFloat(safeHectares.toFixed(2)).toString();

  return `${formattedHa} ha (${formattedM2} m²)`;
}

/**
 * Sanitiza números de teléfono móviles colombianos asegurando el prefijo 57
 * y eliminando caracteres no numéricos.
 */
export function sanitizeColombianPhone(raw?: string | null): string {
  if (!raw) return '';
  const digits = raw.replace(/\D/g, '');

  if (digits.length === 10 && digits.startsWith('3')) {
    return `57${digits}`;
  }

  if (digits.length === 12 && digits.startsWith('57')) {
    return digits;
  }

  return digits;
}

/**
 * Formatea un número telefónico para visualización amigable en la interfaz
 * Ej: '573000000000' -> '+57 300 000 0000'
 */
export function formatPhoneDisplay(raw?: string | null): string {
  if (!raw) return '';
  const digits = raw.replace(/\D/g, '');

  if (digits.startsWith('57') && digits.length === 12) {
    const area = digits.slice(2, 5);
    const mid = digits.slice(5, 8);
    const end = digits.slice(8);
    return `+57 ${area} ${mid} ${end}`;
  }

  if (digits.length === 10 && digits.startsWith('3')) {
    const area = digits.slice(0, 3);
    const mid = digits.slice(3, 6);
    const end = digits.slice(6);
    return `+57 ${area} ${mid} ${end}`;
  }

  return digits.length > 0 ? `+${digits}` : '';
}
