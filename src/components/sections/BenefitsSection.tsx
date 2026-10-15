import React from 'react';
import { Container } from '@/components/ui/Container';

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const benefitsData: BenefitItem[] = [
  {
    id: 'verified',
    title: 'Listados Verificados',
    description:
      'Tradición jurídica, folio de matrícula inmobiliaria y títulos 100% validados antes de su publicación.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    id: 'locations',
    title: 'Ubicaciones Privilegiadas',
    description:
      'Terrenos en corredores de alta plusvalía, vías 4G y zonas con excelente proyección de valorización en Colombia.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 'security',
    title: 'Transacciones Seguras',
    description:
      'Proceso notarial, promesas de compraventa y escrituración pública estructurados con total transparencia.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
  },
  {
    id: 'support',
    title: 'Soporte de Expertos',
    description:
      'Acompañamiento personalizado con especialistas en derecho inmobiliario, topografía y agrimensura rural.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
];

export interface BenefitsSectionProps {
  className?: string;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ className = '' }) => {
  return (
    <section
      id="beneficios"
      aria-label="Beneficios de comprar con LandSelling.com"
      className={`py-16 sm:py-24 bg-white border-b border-cream-200/80 ${className}`.trim()}
    >
      <Container size="xl">
        {/* Encabezado Centrado */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-light text-emerald-dark border border-emerald/20">
            Nuestra Garantía
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-950 tracking-tight">
            ¿Por qué elegir LandSelling.com?
          </h2>
          <p className="text-base sm:text-lg text-forest-700 leading-relaxed font-normal">
            Hacemos que la compra de terrenos en Colombia sea simple, segura y libre de estrés.
          </p>
        </div>

        {/* Cuadrícula de 4 Columnas con Divisores Sutiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-forest-900/10 gap-8 lg:gap-0">
          {benefitsData.map((benefit, idx) => (
            <div
              key={benefit.id}
              className={`flex flex-col items-center text-center px-4 sm:px-6 space-y-4 ${
                idx > 0 ? 'lg:pl-8' : ''
              }`}
            >
              {/* Contenedor Circular Suave para el Icono */}
              <div className="h-14 w-14 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 shadow-xs border border-emerald-100">
                {benefit.icon}
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-forest-950 tracking-tight">
                  {benefit.title}
                </h3>
                <p className="text-sm text-forest-700 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
