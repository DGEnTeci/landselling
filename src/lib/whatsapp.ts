import { Property } from '@/types/property';
import { formatCOP, formatAreaSurface, sanitizeColombianPhone } from './formatters';

/**
 * Genera un enlace directo a WhatsApp Business con mensaje preconfigurado y
 * codificación estricta mediante encodeURIComponent para caracteres especiales y tildes.
 */
export function generateWhatsAppPropertyUrl(
  rawPhone: string,
  property: Property,
  customNote?: string
): string {
  const cleanPhone = sanitizeColombianPhone(rawPhone) || '573000000000';

  const title = property?.title || 'Terreno en Venta';
  const municipality = property?.location?.municipality || 'Colombia';
  const department = property?.location?.department || '';
  const locationText = department ? `${municipality}, ${department}` : municipality;
  const priceText = formatCOP(property?.priceCOP || 0);
  const areaText = formatAreaSurface(property?.areaHectares, property?.areaSquareMeters);
  const refCode = property?.id || property?.slug || 'REF-GENERAL';

  const lines: string[] = [
    '👋 ¡Hola, equipo de LandSelling!',
    '',
    'Me interesa recibir asesoría y ficha técnica detallada del siguiente terreno:',
    `📌 *Propiedad:* ${title}`,
    `📍 *Ubicación:* ${locationText}`,
    `📐 *Superficie:* ${areaText}`,
    `💰 *Precio:* ${priceText}`,
    `🔖 *Referencia:* ${refCode}`,
  ];

  if (customNote && customNote.trim().length > 0) {
    lines.push('', `📝 *Mensaje adicional:* ${customNote.trim()}`);
  }

  lines.push('', '¿Podrían compartirme disponibilidad y coordinar una visita técnica? Muchas gracias.');

  const messageText = lines.join('\n');
  const encodedMessage = encodeURIComponent(messageText);

  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
