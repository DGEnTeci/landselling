import { describe, it, expect } from 'vitest';

describe('Task 1: Smoke Test de Configuración', () => {
  it('ejecuta pruebas con entorno Vitest correctamente', () => {
    expect(true).toBe(true);
  });

  it('valida que los alias de path @/ se resuelvan', async () => {
    const layout = await import('@/app/layout');
    expect(layout.metadata).toBeDefined();
    expect(layout.metadata.title).toBeDefined();
  });
});
