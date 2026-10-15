import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://landselling.com'),
  title: {
    default: 'LandSelling — Venta de Terrenos y Lotes Exclusivos en Colombia',
    template: '%s | LandSelling',
  },
  description:
    'Encuentra tu inversión de terreno perfecta en Colombia. Lotes campestres, residenciales, comerciales y agrícolas con escrituración y servicios verificados.',
  keywords: [
    'venta de terrenos',
    'lotes campestres',
    'terrenos colombia',
    'fincas',
    'inversión en tierra',
    'parcelaciones',
    'lotes residenciales',
    'terrenos comerciales',
  ],
  authors: [{ name: 'LandSelling.com' }],
  robots: {
    index: true,
    follow: true,
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
      <body className="min-h-screen flex flex-col font-sans bg-cream-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
