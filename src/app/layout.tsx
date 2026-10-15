import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { SkipLink } from '@/components/layout/SkipLink';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://landselling.com'),
  title: {
    default: 'LandSelling.com — Terrenos y Lotes Exclusivos en Colombia | Inversión Segura',
    template: '%s | LandSelling.com',
  },
  description:
    'Plataforma líder en comercialización de lotes campestres, terrenos residenciales, agrícolas e industriales en Colombia. Verificación de títulos, tradición jurídica garantizada y acompañamiento experto.',
  keywords: [
    'venta de terrenos colombia',
    'lotes campestres cundinamarca',
    'lotes antioquia',
    'fincas en venta colombia',
    'inversión en tierra rural',
    'parcelaciones privadas',
    'lotes residenciales',
    'terrenos comerciales 4G',
    'estudio de titulos inmobiliarios',
  ],
  authors: [{ name: 'LandSelling.com S.A.S.' }],
  creator: 'LandSelling.com',
  publisher: 'LandSelling.com',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    title: 'LandSelling.com — Terrenos y Lotes Exclusivos en Colombia',
    description:
      'Descubre parcelas campestres, fincas y terrenos comerciales con títulos verificados al 100% en las regiones de mayor plusvalía de Colombia.',
    url: 'https://landselling.com',
    siteName: 'LandSelling.com',
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LandSelling.com — Terrenos y Lotes Exclusivos en Colombia',
    description:
      'Plataforma líder en comercialización de terrenos con tradición legal 100% verificada.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#0A2619',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={jakarta.variable}>
      <body className="min-h-screen flex flex-col font-sans bg-cream-50 text-forest-950">
        {/* SkipLink accesible para usuarios de lectores de pantalla y navegación por teclado */}
        <SkipLink targetId="main-content" />
        {children}
      </body>
    </html>
  );
}
