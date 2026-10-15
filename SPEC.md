# Especificación Técnica: LandSelling.com

> **Estado:** Pendiente de Aprobación del Usuario  
> **Versión:** 1.0.0  
> **Fecha:** 15 de Octubre de 2026  
> **Ubicación:** `C:\Users\juand\Downloads\Poyectos\landselling`

---

## 1. Suposiciones y Decisiones Aprobadas
1. **Pila Tecnológica:** Aplicación web moderna construida con **Next.js 15 (App Router)**, **React 19**, **TypeScript 5.7 (estricto)** y **Tailwind CSS 3.4**, garantizando renderizado estático/SSR ultra rápido y óptima optimización para buscadores (SEO).
2. **Estilo Visual:** Paleta sobria y distinguida inspirada en bienes raíces de alta gama: blancos puros (`#FFFFFF`), grises neutros suaves (`#F8FAFC`, `#F1F5F9`), fondos de alto contraste verde bosque profundo (`#0A2619`, `#143826`) y acentos esmeralda/dorado suave (`#10B981`, `#059669`, `#D97706`).
3. **Tipografía:** Sans-serif contemporánea, limpia y geométrica mediante `next/font/google` (*Plus Jakarta Sans* o *Inter*) para máxima legibilidad en cifras numéricas, hectáreas y precios.
4. **Moneda Oficial:** **Pesos colombianos (COP)** con formateo local completo (ej. `$450.000.000 COP`), sin decimales y con puntos como separador de miles.
5. **Unidades de Superficie:** **Hectáreas (ha)** y **Metros cuadrados (m²)** como estándar legal y comercial en Colombia (ej. `1.5 ha` / `5.000 m²`), mostrando ambas de forma complementaria para facilitar el entendimiento del comprador.
6. **Doble Canal de Conversión:**
   - **Formulario Modal Web:** Captación directa de prospectos con validación de nombre, teléfono colombiano (`^3\d{9}$`), correo electrónico y preguntas de interés.
   - **WhatsApp Business Inmediato:** Enlace preconfigurado que arma el mensaje con la referencia, nombre del lote, ubicación y precio para iniciar chat en 1 clic.
7. **Catálogo de Datos Tipados:** Datos estructurados en `src/data/` (`properties.json`, `categories.json`, `testimonials.json`, `articles.json`) con modelos extensibles y TypeScript estricto.

---

## 2. Objetivo del Proyecto
Desarrollar la plataforma web inmobiliaria de alta gama **LandSelling.com** completamente en español, orientada a compradores, inversionistas y desarrolladores interesados en adquirir terrenos residenciales, comerciales, agrícolas y de inversión patrimonial en Colombia.

### Casos de Uso del Usuario
- **Explorador / Comprador:** Busca terrenos filtrando por ubicación (ej. Cundinamarca, Antioquia, Llanos, Eje Cafetero), categoría (residencial, comercial, agrícola, inversión) y presupuesto; consulta ficha técnica (superficie en ha y m², topografía, servicios públicos, vías de acceso, escrituración y precio).
- **Inversionista:** Analiza la plusvalía estimada, ventajas de invertir en tierra versus otros activos y revisa testimonios de compradores previos.
- **Lead / Prospecto:** Solicita información de un lote específico con 1 clic a través del formulario modal o directo al WhatsApp del asesor asignado.

---

## 3. Stack Tecnológico & Comandos

### Dependencias Principales
- **Framework:** Next.js 15 (App Router, Turbopack)
- **Biblioteca UI:** React 19 + React DOM 19
- **Lenguaje:** TypeScript 5.7+
- **Estilos:** Tailwind CSS 3.4 + Autoprefixer + PostCSS
- **Iconos:** Lucide React
- **Testing:** Vitest 2.1 + React Testing Library + JSDOM

### Comandos de Ejecución
```bash
# Desarrollo local con Turbopack
npm run dev

# Verificación estricta de tipos TypeScript
npx tsc --noEmit

# Ejecución de pruebas unitarias y de componentes
npm test

# Ejecución de pruebas con cobertura
npm test -- --coverage

# Compilación de producción
npm run build

# Servidor de producción local
npm run start
```

---

## 4. Estructura del Proyecto

```
landselling/
├── public/                     → Activos estáticos, favicon, robots.txt, sitemap
│   └── icon.svg                → Logo vectorial de LandSelling
├── src/
│   ├── app/
│   │   ├── globals.css         → Tokens globales, utilidades Tailwind y variables
│   │   ├── layout.tsx          → RootLayout con fuentes, metadatos SEO y OpenGraph
│   │   └── page.tsx            → Landing page principal modular
│   ├── components/
│   │   ├── layout/             → Header (Navbar responsive) y Footer editorial
│   │   ├── sections/           → Hero con buscador rápido
│   │   │                       → Benefits ("¿Por qué elegir LandSelling?")
│   │   │                       → FeaturedProperties (Grid de terrenos destacados)
│   │   │                       → CtaBanner ("Tu terreno ideal a un clic")
│   │   │                       → PropertyCategories (Tarjetas de tipos de terreno)
│   │   │                       → InvestmentValue ("Una Inversión Inteligente")
│   │   │                       → PurchaseSteps ("Pasos sencillos para poseer tu terreno")
│   │   │                       → Testimonials (Historias de satisfacción)
│   │   │                       → BlogInsights ("Noticias y consejos del sector")
│   │   ├── properties/         → PropertyCard, PropertyFilterBar, PropertyDetailModal
│   │   ├── contact/            → ContactLeadModal, WhatsAppDirectButton
│   │   ├── ui/                 → Button, Badge, Modal, Input, Select, Container
│   │   └── seo/                → JSON-LD Schema.org (RealEstateAgent / Product)
│   ├── config/
│   │   └── site.ts             → Configuración de marca, contacto y navegación
│   ├── data/
│   │   ├── properties.json     → Catálogo de lotes y terrenos con datos colombianos
│   │   ├── categories.json     → Categorías (Residencial, Comercial, Agrícola, Inversión)
│   │   ├── articles.json       → Guías y artículos del mercado de tierras
│   │   └── testimonials.json   → Casos de éxito y opiniones verificadas
│   ├── lib/
│   │   ├── formatters.ts       → Formateadores de moneda COP ($ 450.000.000) y área (ha / m²)
│   │   ├── filters.ts          → Lógica pura de filtrado y búsqueda de propiedades
│   │   └── whatsapp.ts         → Generador de URL de WhatsApp estructurada por propiedad
│   └── types/
│       ├── property.ts         → Modelos de datos para terrenos, ubicaciones y precios
│       └── filter.ts           → Estado del buscador y parámetros de consulta
├── tests/
│   └── unit/                   → Pruebas unitarias de filtros, formateadores y componentes
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
└── SPEC.md
```

---

## 5. Convenciones de Código y Estilo

### Ejemplo de Componente TypeScript Accesible
```tsx
import React from 'react';
import Image from 'next/image';
import { Property } from '@/types/property';
import { formatCOP, formatAreaSurface } from '@/lib/formatters';
import { MapPin, Maximize2, ArrowRight, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  onContactWhatsApp: (property: Property) => void;
}

export function PropertyCard({ property, onSelect, onContactWhatsApp }: PropertyCardProps) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={property.imageUrl}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="success">En Venta</Badge>
          <Badge variant="neutral">{property.categoryName}</Badge>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{property.location.municipality}, {property.location.department}</span>
          </div>
          <h3 className="font-semibold text-slate-900 text-lg group-hover:text-emerald-700 transition-colors line-clamp-1">
            {property.title}
          </h3>
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {property.shortDescription}
          </p>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700 pt-1">
            <Maximize2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{formatAreaSurface(property.areaHectares, property.areaSquareMeters)}</span>
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block uppercase font-medium">Precio</span>
            <span className="text-lg font-bold text-slate-900">
              {formatCOP(property.priceCOP)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onContactWhatsApp(property)}
              aria-label={`Preguntar por WhatsApp sobre ${property.title}`}
              className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelect(property)}
              aria-label={`Ver ficha completa de ${property.title}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
            >
              <span>Ver ficha</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
```

---

## 6. Estrategia de Pruebas (Testing Strategy)
- **Framework:** Vitest + React Testing Library + JSDOM.
- **Pruebas Unitarias de Lógica Pura:**
  - `formatters.test.ts`: Formateo de moneda colombiana COP (`formatCOP(450000000)` -> `"$ 450.000.000 COP"`), formateo de áreas (`formatAreaSurface(1.5, 15000)` -> `"1.5 ha (15.000 m²)"`).
  - `filters.test.ts`: Búsqueda por palabra clave (municipio, título), filtrado por tipo de lote, rango de precio mínimo/máximo y ordenamiento.
  - `whatsapp.test.ts`: Generación adecuada de URLs de WhatsApp con mensaje estructurado y número oficial colombiano.
- **Pruebas de Componentes:**
  - Renderizado e interacción del Navbar, menús y cajón responsive.
  - Buscador rápido del Hero con sincronización de estado.
  - Modales accesibles (detalle de lote y formulario de contacto) con foco atrapado, tecla Escape y roles ARIA.
- **Meta de Calidad:** 100% de pruebas unitarias en verde.

---

## 7. Límites y Reglas de Trabajo (Boundaries)

- **Hacer Siempre:**
  - Desarrollar la interfaz con accesibilidad semántica WCAG AA.
  - Utilizar imágenes responsivas con `next/image` y dimensiones reservadas para CLS = 0.
  - Ejecutar verificación de tipos (`npx tsc --noEmit`) y suite de pruebas (`npm test`) antes de confirmar cualquier tarea.
- **Preguntar Antes:**
  - Agregar librerías de mapas interactivos pesados o frameworks pesados no justificados.
- **Nunca Hacer:**
  - Textos en inglés sin traducir o mezclas inconsistentes.
  - Suprimir errores de TypeScript sin justificación técnica.
  - Dejar enlaces o botones sin retroalimentación visual ni soporte de teclado accesible.

---

## 8. Criterios de Éxito (Success Criteria)
1. **Completitud de Secciones:** Las 9 secciones principales descritas en el wireframe conceptual están implementadas y operativas.
2. **Buscador y Filtrado Funcional:** El usuario puede seleccionar ubicación, tipo de terreno y ver el catálogo actualizarse de inmediato con conteo de resultados.
3. **Ficha de Propiedad & Doble Canal de Contacto:** Al hacer clic en un lote, se abre la ficha completa con galería, especificaciones (ha, m², topografía, servicios, escrituración) y botones claros para formulario modal o chat directo de WhatsApp.
4. **Diseño Visual de Alta Fidelidad:** Estética premium con verde bosque profundo, blancos limpios, tipografía sans-serif elegante y microinteracciones suaves.
5. **Rendimiento:** Carga veloz, sin saltos de maquetación (CLS < 0.05) y 100% adaptado a móviles.

---

## 9. Decisiones Cerradas con el Usuario
1. **Moneda:** Pesos colombianos (COP) con formato local `$ 450.000.000 COP`.
2. **Superficie:** Hectáreas (ha) y metros cuadrados (m²) como estándar comercial colombiano.
3. **Contacto:** Doble canal (Formulario modal web de captación + botón directo a WhatsApp Business con mensaje predefinido del lote).

