'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim());
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('Por favor ingresa tu correo electrónico.');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Ingresa una dirección de correo electrónico válida.');
      return;
    }

    // Éxito simulado sin recarga
    setStatus('success');
    setErrorMessage('');
    setEmail('');
  };

  return (
    <footer className="bg-forest-950 text-cream-100 border-t border-forest-800" aria-label="Pie de página">
      <Container size="xl" className="py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-forest-800/80">
          {/* Columna 1: Marca y Propuesta de Valor (4 cols en lg) */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded-lg"
            >
              <div className="h-9 w-9 rounded-xl bg-forest-850 flex items-center justify-center text-emerald-accent border border-forest-700">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8M3 17h18" />
                </svg>
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                LandSelling<span className="text-emerald-accent">.com</span>
              </span>
            </Link>

            <p className="text-sm text-cream-300 leading-relaxed pr-4">
              La plataforma líder en Colombia para la compra, venta e inversión en terrenos, fincas
              y lotes campestres. Asesoría jurídica, tradición legal garantizada y acompañamiento directo.
            </p>

            {/* Redes Sociales */}
            <div className="pt-2">
              <span className="sr-only">Redes sociales</span>
              <div className="flex items-center gap-3">
                {[
                  {
                    name: 'Instagram',
                    href: 'https://instagram.com',
                    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
                  },
                  {
                    name: 'Facebook',
                    href: 'https://facebook.com',
                    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
                  },
                  {
                    name: 'LinkedIn',
                    href: 'https://linkedin.com',
                    path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
                  },
                  {
                    name: 'YouTube',
                    href: 'https://youtube.com',
                    path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Síguenos en ${social.name}`}
                    className="
                      h-9 w-9 rounded-lg bg-forest-900 border border-forest-800
                      flex items-center justify-center text-cream-300 hover:text-emerald-accent
                      hover:border-forest-700 transition-colors focus:outline-none
                      focus-visible:ring-2 focus-visible:ring-emerald
                    "
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos (2 cols en lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-accent">
              Navegación
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Inicio', href: '#inicio' },
                { label: 'Catálogo de Lotes', href: '#propiedades' },
                { label: 'Por qué LandSelling', href: '#beneficios' },
                { label: 'Cómo Comprar', href: '#pasos' },
                { label: 'Contacto Directo', href: '#contacto' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-cream-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald rounded"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Tipos de Propiedad (2 cols en lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-accent">
              Categorías
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                'Lotes Campestres',
                'Fincas Agrícolas',
                'Terrenos Comerciales',
                'Lotes Industriales',
                'Proyectos de Inversión',
              ].map((category) => (
                <li key={category}>
                  <a
                    href="#propiedades"
                    className="text-cream-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald rounded"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Newsletter y Oportunidades (4 cols en lg) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-accent">
              Oportunidades Inmobiliarias
            </h3>
            <p className="text-sm text-cream-300 leading-relaxed">
              Suscríbete para recibir alertas tempranas de lotes con precio de oportunidad y
              estudios de valorización en Colombia.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-1" noValidate>
              <div className="flex flex-col sm:flex-row gap-2">
                <label htmlFor="newsletter-email" className="sr-only">
                  Correo electrónico para boletín
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="tu@correo.com"
                  aria-invalid={status === 'error'}
                  aria-describedby={
                    status === 'error' ? 'newsletter-error' : status === 'success' ? 'newsletter-success' : undefined
                  }
                  className="
                    flex-1 bg-forest-900 border border-forest-800 text-white placeholder-forest-500
                    rounded-xl px-4 py-2.5 text-sm min-h-[44px]
                    focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald
                  "
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="shrink-0"
                >
                  Suscribirme
                </Button>
              </div>

              {/* Mensajes de Estado Accesibles */}
              <div aria-live="polite" className="min-h-[22px]">
                {status === 'error' && (
                  <p id="newsletter-error" className="text-xs font-medium text-red-400 flex items-center gap-1.5 pt-1">
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{errorMessage}</span>
                  </p>
                )}

                {status === 'success' && (
                  <p id="newsletter-success" className="text-xs font-medium text-emerald-accent flex items-center gap-1.5 pt-1">
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>¡Gracias por suscribirte! Te notificaremos de nuevos lotes.</span>
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Sección Inferior: Legal, NIT y Derechos Reservados */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream-300/80">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© {new Date().getFullYear()} LandSelling.com S.A.S.</span>
            <span className="hidden sm:inline" aria-hidden="true">•</span>
            <span>NIT: 901.845.210-4</span>
            <span className="hidden sm:inline" aria-hidden="true">•</span>
            <span>Vigilado Superintendencia de Notariado y Registro</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#terminos"
              className="hover:text-emerald-accent transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald rounded"
            >
              Términos del Servicio
            </a>
            <span aria-hidden="true">•</span>
            <a
              href="#privacidad"
              className="hover:text-emerald-accent transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald rounded"
            >
              Habeas Data (Ley 1581)
            </a>
            <span aria-hidden="true">•</span>
            <a
              href="#mapa"
              className="hover:text-emerald-accent transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald rounded"
            >
              Mapa del Sitio
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
