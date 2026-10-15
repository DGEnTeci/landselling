'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Propiedades', href: '#propiedades' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
];

export interface HeaderProps {
  onSearchClick?: () => void;
  onGetStartedClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearchClick,
  onGetStartedClick,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Manejo de scroll para efecto visual sutil
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Control del drawer móvil: Escape, bloqueo de scroll y resize a desktop
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false);
    // Manejo de ancla suave si el elemento existe
    if (href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleQuickSearch = () => {
    setIsMobileMenuOpen(false);
    if (onSearchClick) {
      onSearchClick();
    } else {
      const searchBox = document.getElementById('buscador') || document.getElementById('propiedades');
      if (searchBox) {
        searchBox.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleGetStarted = () => {
    setIsMobileMenuOpen(false);
    if (onGetStartedClick) {
      onGetStartedClick();
    } else {
      const target = document.getElementById('propiedades') || document.getElementById('contacto');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`
        sticky top-0 z-40 w-full transition-all duration-200
        bg-cream-50/90 backdrop-blur-md border-b
        ${isScrolled ? 'border-cream-300 shadow-xs py-3' : 'border-cream-200/80 py-4'}
      `}
    >
      <Container size="xl">
        <div className="flex items-center justify-between">
          {/* Logo Corporativo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded-lg"
          >
            <div className="h-10 w-10 rounded-xl bg-forest-900 flex items-center justify-center text-emerald shadow-xs transition-transform duration-200 group-hover:scale-105">
              {/* Icono de Terreno / Montañas estilizado */}
              <svg
                className="w-5 h-5 text-emerald-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 17l6-6 4 4 8-8M3 17h18"
                />
              </svg>
            </div>
            <span className="text-xl font-extrabold text-forest-950 tracking-tight">
              LandSelling<span className="text-emerald">.com</span>
            </span>
          </Link>

          {/* Navegación Desktop Central */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navegación principal">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavLinkClick(e, item.href)}
                className="
                  text-sm font-semibold text-forest-800 hover:text-emerald
                  transition-colors py-1.5 focus:outline-none focus-visible:ring-2
                  focus-visible:ring-emerald rounded-md
                "
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Acciones de la Derecha (Desktop) */}
          <div className="hidden lg:flex items-center gap-3.5">
            <button
              type="button"
              onClick={handleQuickSearch}
              aria-label="Buscar propiedades"
              className="
                inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-3.5
                rounded-xl text-forest-700 hover:text-forest-900 hover:bg-cream-200/60
                transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald
              "
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <Button
              variant="forest"
              size="md"
              onClick={handleGetStarted}
              rightIcon={<span aria-hidden="true">→</span>}
            >
              Empezar
            </Button>
          </div>

          {/* Botón Hamburguesa Móvil */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={handleQuickSearch}
              aria-label="Buscar propiedades"
              className="
                p-2 rounded-xl text-forest-800 hover:bg-cream-200/70
                min-h-[44px] min-w-[44px] flex items-center justify-center
                focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald
              "
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              className="
                p-2 rounded-xl text-forest-900 hover:bg-cream-200/70
                min-h-[44px] min-w-[44px] flex items-center justify-center
                focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald
              "
            >
              <span className="sr-only">
                {isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              </span>
              <svg
                className="w-6 h-6 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* Drawer / Menú Móvil */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden">
          {/* Backdrop con desenfoque */}
          <div
            className="fixed inset-0 top-[73px] bg-forest-950/60 backdrop-blur-xs z-30 transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
            data-testid="mobile-menu-backdrop"
          />

          {/* Panel de navegación móvil */}
          <div
            className="
              relative z-40 bg-cream-50 border-b border-cream-300 shadow-xl
              px-6 py-6 transition-all duration-200
            "
          >
            <nav className="flex flex-col gap-3" aria-label="Menú móvil">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavLinkClick(e, item.href)}
                  className="
                    px-4 py-3 rounded-xl text-base font-semibold text-forest-900
                    hover:bg-cream-200/70 hover:text-emerald transition-colors
                    min-h-[44px] flex items-center
                  "
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-cream-200 flex flex-col gap-3">
              <Button
                variant="forest"
                size="md"
                fullWidth
                onClick={handleGetStarted}
                rightIcon={<span aria-hidden="true">→</span>}
              >
                Empezar
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
