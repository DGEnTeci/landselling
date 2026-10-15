import { describe, it, expect } from 'vitest';
import { SITE_CONFIG } from '@/config/site';
import nextConfig from '../../next.config';

describe('Fase /review: Auditoría de Seguridad, Configuración y Pre-Ship', () => {
  it('conecta y expone las variables de entorno con fallbacks seguros en SITE_CONFIG', () => {
    expect(SITE_CONFIG.siteUrl).toBeDefined();
    expect(SITE_CONFIG.siteUrl).toMatch(/^https?:\/\//);
    expect(SITE_CONFIG.domain).toBeDefined();
    expect(SITE_CONFIG.contact.whatsappNumber).toBeDefined();
    expect(SITE_CONFIG.contact.whatsappNumber).toMatch(/^\d+$/);
  });

  it('configura cabeceras de seguridad HTTP requeridas en next.config.ts', async () => {
    expect(nextConfig.headers).toBeDefined();
    if (typeof nextConfig.headers === 'function') {
      const headerRules = await nextConfig.headers();
      expect(Array.isArray(headerRules)).toBe(true);

      const catchAllRule = headerRules.find((rule) => rule.source === '/(.*)');
      expect(catchAllRule).toBeDefined();

      const headersMap = new Map(
        catchAllRule?.headers.map((h) => [h.key, h.value])
      );

      expect(headersMap.get('X-Frame-Options')).toBe('DENY');
      expect(headersMap.get('X-Content-Type-Options')).toBe('nosniff');
      expect(headersMap.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
      expect(headersMap.get('Permissions-Policy')).toBe(
        'camera=(), microphone=(), geolocation=()'
      );
    }
  });
});
