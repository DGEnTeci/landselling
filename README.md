# LandSelling.com — Plataforma Premium de Terrenos en Colombia

[![Next.js](https://img.shields.io/badge/Next.js-15.1.0-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.16-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-2.1.8-6E9F18?logo=vitest)](https://vitest.dev/)
[![Tests](https://img.shields.io/badge/Tests-129%20passed-brightgreen)](#estrategia-de-pruebas-y-calidad)
[![WCAG AA](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-059669)](#accesibilidad-wcag-21-aa)
[![Licencia](https://img.shields.io/badge/Licencia-Privada-forest)](LICENSE)

Plataforma web de última generación especializada en la **búsqueda, comercialización e inversión en terrenos, parcelas y lotes campestres, residenciales, agrícolas y comerciales** en Colombia. 

Diseñada bajo una arquitectura moderna con **Next.js 15 App Router** y **React 19**, implementa una experiencia de usuario de alto impacto inspirada en la naturaleza colombiana (tonos verde bosque profundo, blanco puro, esmeralda y acentos dorados), con verificación jurídica de tradición y libertad ante la Superintendencia de Notariado y Registro (SNR), estricto cumplimiento de Habeas Data (Ley 1581 de 2012) y doble canal de captación de prospectos (formulario web accesible y atención directa por WhatsApp Business).

---

## Tabla de Contenidos

1. [Características Principales](#características-principales)
2. [Stack Tecnológico y Arquitectura](#stack-tecnológico-y-arquitectura)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Diseño y Sistema de Tokens](#diseño-y-sistema-de-tokens)
5. [Localización y Normativa Colombiana](#localización-y-normativa-colombiana)
6. [Catálogo de Componentes y Secciones](#catálogo-de-componentes-y-secciones)
7. [Requisitos Previos e Instalación Local](#requisitos-previos-e-instalación-local)
8. [Scripts Disponibles](#scripts-disponibles)
9. [Estrategia de Pruebas y Calidad](#estrategia-de-pruebas-y-calidad)
10. [Accesibilidad (WCAG 2.1 AA)](#accesibilidad-wcag-21-aa)
11. [Datos Estructurados y SEO (Schema.org)](#datos-estructurados-y-seo-schemaorg)
12. [Guía de Despliegue en Vercel](#guía-de-despliegue-en-vercel)
13. [Variables de Entorno](#variables-de-entorno)

---

## Características Principales

- **Buscador Reactivo Integrado:** Filtrado instantáneo por departamento, tipo de lote (campestre, agrícola, residencial, comercial), rango de inversión en COP y búsqueda de texto insensible a mayúsculas y acentos (normalización Unicode NFD).
- **Catálogo Interactivo con Sincronización:** Tabs de categorías, ordenamiento por precio o superficie, contador dinámico de resultados y estado vacío amigable con restablecimiento de filtros en un clic.
- **Ficha Técnica Detallada (`PropertyDetailModal`):**
  - Galería interactiva con selector de miniaturas (*thumbnails*) y reinicio defensivo de índice.
  - Especificaciones de topografía, vías de acceso, altitud y servicios públicos garantizados (agua, energía eléctrica, gas).
  - Verificación de tradición jurídica (Certificado de Tradición y Matrícula Inmobiliaria SNR).
  - Cálculo automático de valor por metro cuadrado ($COP / m^2$).
- **Doble Canal de Conversión:**
  - Formulario de captación de prospectos (`ContactLeadModal`) con validación de teléfono móvil colombiano (`^3\d{9}$`), validación de correo y casilla obligatoria de Habeas Data (Ley 1581 de 2012).
  - Botón flotante y enlaces contextuales a WhatsApp Business (`WhatsAppFloatingButton`) con generación de enlaces pre-rellenados con ID, nombre y precio del terreno.
- **Métricas de Inversión y Confianza:** Sección de valor financiero (+18.4% de plusvalía anual promedio estimada, +45.000 ha comercializadas, 100% títulos verificados) y guía didáctica en 3 pasos semánticos (`<ol>`).
- **Prueba Social y Artículos Educativos:** Testimonios reales con calificación de 5 estrellas y blog inmobiliario con modal de lectura completa y llamada a asesoría.
- **Rendimiento y LCP:** Imagen hero prioritaria (`priority={true}`), optimización de formatos WebP/AVIF con `next/image` y atributos `sizes` responsivos en todas las imágenes.

---

## Stack Tecnológico y Arquitectura

| Capa / Herramienta | Versión | Propósito |
| :--- | :--- | :--- |
| **Framework** | Next.js 15.1.0 | App Router, Server Components y compilación estática optimizada. |
| **Librería UI** | React 19.0.0 | Manejo eficiente de estado y componentes modernos. |
| **Lenguaje** | TypeScript 5.7.2 | Tipado estricto con comprobación estricta de nulos (`strict: true`). |
| **Estilos** | Tailwind CSS 3.4.16 | Utility-first CSS, tokens de color personalizados y diseño responsivo. |
| **Iconografía** | Lucide React 0.468.0 | Iconos SVG optimizados y accesibles para UI. |
| **Testing** | Vitest 2.1.8 | Runner de pruebas unitarias ultrarrápido con soporte ESM. |
| **DOM Testing** | Testing Library 16.3.3 | Pruebas de integración centradas en accesibilidad y usuario. |
| **Entorno DOM** | JSDOM 30.1.2 | Emulación del navegador para suite de pruebas en Vitest. |

---

## Estructura del Proyecto

```text
landselling/
├── .env.example                     # Variables de entorno documentadas de forma segura
├── next.config.ts                   # Configuración de Next.js (imágenes remotas de Unsplash)
├── package.json                     # Scripts y dependencias del proyecto
├── postcss.config.mjs               # Configuración de PostCSS para Tailwind
├── tailwind.config.ts               # Paleta de colores (forest, emerald, cream, gold)
├── tsconfig.json                    # Configuración estricta de TypeScript
├── vitest.config.ts                 # Configuración de pruebas Vitest con alias `@/`
│
├── src/
│   ├── app/
│   │   ├── globals.css              # Estilos base, reset y prefers-reduced-motion
│   │   ├── layout.tsx               # Root Layout con metadata es_CO, OpenGraph y SkipLink
│   │   └── page.tsx                 # Landing page principal (orquestación de las 9 secciones)
│   │
│   ├── components/
│   │   ├── contact/                 # Modales y botones de captación de leads
│   │   │   ├── ContactLeadModal.tsx
│   │   │   ├── WhatsAppFloatingButton.tsx
│   │   │   └── index.ts
│   │   ├── layout/                  # Estructura visual de navegación
│   │   │   ├── Header.tsx           # Barra superior con drawer móvil accesible
│   │   │   ├── Footer.tsx           # Pie editorial con avisos legales de Colombia
│   │   │   ├── SkipLink.tsx         # Enlace accesible de salto al contenido principal
│   │   │   └── index.ts
│   │   ├── properties/              # Componentes del catálogo inmobiliario
│   │   │   ├── PropertyCard.tsx     # Tarjeta de terreno con precio COP y doble superficie
│   │   │   ├── PropertyDetailModal.tsx # Ficha técnica completa con galería y ficha jurídica
│   │   │   └── index.ts
│   │   ├── sections/                # Secciones modulares de la landing page
│   │   │   ├── Hero.tsx             # Sección principal con buscador rápido integrado
│   │   │   ├── BenefitsSection.tsx  # Cuadrícula de 4 pilares de propuesta de valor
│   │   │   ├── FeaturedProperties.tsx # Catálogo con filtros y ordenamiento en tiempo real
│   │   │   ├── PropertyCategories.tsx # Explorador visual de categorías
│   │   │   ├── CtaBanner.tsx        # Banner de conversión intermedio de alto contraste
│   │   │   ├── InvestmentValueSection.tsx # Métricas de plusvalía y comparativa financiera
│   │   │   ├── PurchaseSteps.tsx    # Proceso de adquisición guiado en 3 pasos
│   │   │   ├── TestimonialsSection.tsx # Testimonios de inversionistas con 5 estrellas
│   │   │   ├── BlogInsightsSection.tsx # Artículos educativos con modal de lectura
│   │   │   └── index.ts
│   │   ├── seo/
│   │   │   └── StructuredData.tsx   # JSON-LD Schema.org sanitizado contra XSS
│   │   └── ui/                      # Primitivas accesibles de interfaz
│   │       ├── Badge.tsx            # Etiquetas de estado y categorías
│   │       ├── Button.tsx           # Botones accesibles (variantes forest, emerald, gold, outline)
│   │       ├── Container.tsx        # Contenedor responsivo centrado
│   │       ├── Input.tsx            # Campo de texto accesible con labels y errores
│   │       ├── Modal.tsx            # Primitiva de modal accesible (focus trap y scroll lock)
│   │       ├── Select.tsx           # Selector accesible nativo
│   │       └── index.ts
│   │
│   ├── config/
│   │   └── site.ts                  # Metadatos del sitio, enlaces de navegación y redes
│   ├── data/                        # Catálogo estructurado en formato JSON
│   │   ├── articles.json            # 3 guías legales y noticias de mercado
│   │   ├── categories.json          # 4 categorías con descripciones y conteos
│   │   ├── properties.json          # 8 terrenos detallados en Colombia
│   │   └── testimonials.json        # 4 testimonios de compradores e inversionistas
│   ├── lib/                         # Funciones puras y lógica de negocio (TDD)
│   │   ├── data.ts                  # Métodos de acceso al catálogo
│   │   ├── filters.ts               # Motor de filtrado y ordenamiento NFD
│   │   ├── formatters.ts            # Formateador COP, superficie dual y teléfonos
│   │   └── whatsapp.ts              # Generador de enlaces pre-rellenados a WhatsApp
│   └── types/                       # Definiciones de tipos TypeScript
│       ├── content.ts               # Tipos de artículos, testimonios y categorías
│       ├── filter.ts                # Filtros de catálogo y ordenamiento
│       └── property.ts              # Entidad Property, servicios y categorías
│
├── tasks/
│   ├── plan.md                      # Plan de arquitectura y fases del proyecto
│   └── todo.md                      # Registro de seguimiento de las 14 tareas
│
└── tests/
    ├── setup.ts                     # Configuración global de Vitest y JSDOM
    └── unit/                        # 15 suites de pruebas unitarias (129 tests)
```

---

## Diseño y Sistema de Tokens

La interfaz implementa una paleta de colores personalizada en `tailwind.config.ts`, balanceando la seriedad de los bienes raíces y la naturaleza de las tierras colombianas:

| Token | Tono Base | HEX | Uso Principal |
| :--- | :--- | :--- | :--- |
| **`forest`** | `forest-900` / `950` | `#0A2619` / `#03140C` | Fondos de Header/Hero/Footer, tipografía principal y botones oscuros. |
| **`emerald`** | `emerald-600` / `700` | `#059669` / `#047857` | Botones de acción principal (CTA), insignias de éxito y enlaces interactivos. |
| **`cream`** | `cream-50` / `100` | `#FAF8F5` / `#F3EFEA` | Fondos cálidos secundarios de secciones y contenedores suaves. |
| **`gold`** | `gold-600` / `700` | `#D97706` / `#B45309` | Botones de inversión y oportunidades premium. |

---

## Localización y Normativa Colombiana

1. **Moneda Oficial (COP):** Precios formateados en pesos colombianos con separador de miles por punto (`$ 450.000.000 COP`).
2. **Superficie Dual:** Expresión complementaria en hectáreas ($ha$) y metros cuadrados ($m^2$): `1.5 ha (15.000 m²)`.
3. **Validación de Telefonía Móvil:** Validación y normalización de números móviles colombianos mediante la expresión regular `^3\d{9}$`, admitiendo números directos (`3001234567`) o con prefijo internacional (`+57 300 123 4567`).
4. **Habeas Data (Ley 1581 de 2012):** Casilla obligatoria de autorización para el tratamiento de datos personales en el formulario de contacto con enlace a la política de privacidad.
5. **Seguridad Jurídica SNR:** Ficha de verificación con estado del Certificado de Tradición y Libertad expedido por la Superintendencia de Notariado y Registro (SNR) y Paz y Salvo predial municipal.

---

## Catálogo de Componentes y Secciones

1. **`SkipLink` & `Header`:** Navegación accesible con salto al contenido, navegación responsive con drawer móvil y botón de inicio rápido.
2. **`Hero` & `QuickSearchBox`:** Titular persuasivo, sello de confianza (+10.000 clientes satisfechos) y buscador inmediato de terrenos.
3. **`BenefitsSection`:** 4 pilares: *Listados Verificados*, *Ubicaciones Estratégicas*, *Acompañamiento Legal* y *Financiación Directa*.
4. **`FeaturedProperties` & `PropertyCard`:** Catálogo interactivo con selector de categorías, ordenamiento por precio y superficie, contador de resultados y vista de lote.
5. **`PropertyDetailModal`:** Ficha técnica ampliada con galería fotográfica interactiva, servicios públicos y bloque financiero.
6. **`PropertyCategories`:** 4 tarjetas visuales de terrenos (*Campestres*, *Agrícolas*, *Residenciales*, *Comerciales*) vinculadas directamente al filtro del catálogo.
7. **`CtaBanner`:** Banner de conversión de alto contraste con llamada a asesoría personalizada.
8. **`InvestmentValueSection`:** Argumentación financiera de la tierra frente a la inflación con métricas de plusvalía.
9. **`PurchaseSteps`:** Guía en 3 pasos semánticos (*Explora*, *Inspecciona* y *Titula*).
10. **`TestimonialsSection`:** Reseñas reales de compradores e inversionistas con calificación de 5 estrellas.
11. **`BlogInsightsSection`:** Artículos educativos con modal de lectura completa y llamada a la acción.
12. **`ContactLeadModal` & `WhatsAppFloatingButton`:** Formulario accesible de captación de prospectos y botón flotante con WhatsApp pre-rellenado.
13. **`Footer`:** Enlaces rápidos, suscripción al boletín y avisos legales conforme a la normativa colombiana.

---

## Requisitos Previos e Instalación Local

### Requisitos del Sistema
- **Node.js:** Versión 18.18.0 o superior (recomendado Node 20.x o Node 22.x LTS).
- **npm:** Versión 9.x o superior.

### Pasos de Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/landselling.git
   cd landselling
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env.local
   ```

4. **Ejecutar en modo de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación en funcionamiento.

---

## Scripts Disponibles

En el archivo `package.json` se encuentran definidos los siguientes comandos:

| Comando | Acción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo en `http://localhost:3000`. |
| `npm run build` | Compila la aplicación para producción generando Server Components estáticos. |
| `npm start` | Inicia el servidor de producción local con el build compilado. |
| `npm test` | Ejecuta la suite completa de 129 pruebas unitarias con Vitest. |
| `npm run test:watch` | Ejecuta las pruebas en modo observador interactivo (*watch mode*). |
| `npm run lint` | Ejecuta el linter oficial de Next.js para validar estándares de código. |
| `npx tsc --noEmit` | Valida el 100% de tipos TypeScript sin emitir archivos. |

---

## Estrategia de Pruebas y Calidad

El proyecto fue desarrollado bajo una estricta metodología **Test-Driven Development (TDD)** y cuenta con **15 suites de pruebas y 129 tests unitarios e integrados** en verde:

```bash
$ npm test

 ✓ tests/unit/filters.test.ts (8 tests)
 ✓ tests/unit/components.test.tsx (21 tests)
 ✓ tests/unit/blog-seo.test.tsx (4 tests)
 ✓ tests/unit/sections-phase4.test.tsx (7 tests)
 ✓ tests/unit/hero.test.tsx (9 tests)
 ✓ tests/unit/investment-testimonials.test.tsx (6 tests)
 ✓ tests/unit/catalog.test.tsx (10 tests)
 ✓ tests/unit/contact-modal.test.tsx (9 tests)
 ✓ tests/unit/layout.test.tsx (14 tests)
 ✓ tests/unit/property-detail-modal.test.tsx (8 tests)
 ✓ tests/unit/whatsapp.test.ts (4 tests)
 ✓ tests/unit/accessibility-audit.test.tsx (8 tests)
 ✓ tests/unit/formatters.test.ts (12 tests)
 ✓ tests/unit/data.test.ts (7 tests)
 ✓ tests/unit/smoke.test.ts (2 tests)

 Test Files  15 passed (15)
      Tests  129 passed (129)
```

### Cobertura de Pruebas Clave:
- **Lógica Pura:** Formateo monetario en COP, conversión de áreas a hectáreas/$m^2$, desinfección de números telefónicos y generación de URLs de WhatsApp.
- **Filtrado y Búsqueda:** Búsqueda NFD (ignora acentos en "Quindío", "Boyacá"), filtros combinados por departamento, precio mínimo/máximo y tipo de propiedad.
- **Componentes UI Base:** Comportamiento de `Button`, `Badge`, `Modal` (focus trap, tecla Escape, bloqueo de scroll en el body), `Input` y `Select`.
- **Accesibilidad y Landmarks:** SkipLink funcional hacia `#main-content`, un único encabezado `<h1>`, jerarquía semántica en `<h2>` y media queries para reducción de movimiento.

---

## Accesibilidad (WCAG 2.1 AA)

- **SkipLink:** Enlace al inicio del DOM visible al presionar `Tab` que enfoca el elemento `<main id="main-content" tabIndex={-1}>`.
- **Navegación por Teclado:** Todos los componentes interactivos (botones, pestañas, modales, drawers) son completamente navegables con `Tab`, `Shift+Tab`, `Enter`, `Espacio` y `Escape`.
- **Gestión de Foco:** Atrapamiento de foco (*focus trap*) dentro de los modales y retorno automático del foco al elemento detonador al cerrarlos.
- **Áreas Táctiles:** Cumplimiento estricto del tamaño táctil mínimo de $44 \times 44$ px en botones móviles y controles interactivos.
- **Preferencia de Movimiento Reducido:** Soporte completo para `@media (prefers-reduced-motion: reduce)` desactivando animaciones y transiciones para usuarios sensibles.
- **Contraste de Color:** Ratios superiores a 4.5:1 para texto regular y 7:1 para encabezados de alto impacto.

---

## Datos Estructurados y SEO (Schema.org)

La landing page inyecta metadatos JSON-LD estructurados en el `<head>` mediante `StructuredData.tsx`, sanitizados contra inyecciones XSS (reemplazo de `<` por `\u003c`):

1. **`RealEstateAgent`:** Identidad corporativa, teléfono oficial, correo y dirección en Bogotá D.C.
2. **`ItemList`:** Catálogo de propiedades indexable por Googlebot con nombre, descripción, precio en COP, imágenes y ubicación geográfica.
3. **`BlogPosting`:** Artículos y guías legales con fecha de publicación, autor y titulares para fragmentos enriquecidos (*rich snippets*).

---

## Guía de Despliegue en Vercel

La arquitectura basada en Next.js 15 App Router está completamente optimizada para despliegue en [Vercel](https://vercel.com):

### Opción 1: Despliegue desde la Interfaz de Vercel (Recomendado)

1. Sube tu código a un repositorio en **GitHub**, **GitLab** o **Bitbucket**.
2. Inicia sesión en [Vercel Dashboard](https://vercel.com) y haz clic en **"Add New Project"**.
3. Importa el repositorio `landselling`.
4. Vercel detectará automáticamente Next.js. Verifica los siguientes parámetros:
   - **Framework Preset:** `Next.js`
   - **Root Directory:** `./`
   - **Build Command:** `next build` (o `npm run build`)
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
5. En la sección **Environment Variables**, añade:
   - `NEXT_PUBLIC_SITE_URL`: `https://tu-dominio.vercel.app` (o tu dominio personalizado).
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: Número internacional de tu línea de atención comercial (ej. `573000000000`).
6. Haz clic en **"Deploy"**. En menos de 2 minutos tu sitio estará en producción con certificado SSL automático y CDN global.

### Opción 2: Despliegue mediante Vercel CLI

```bash
# 1. Instalar Vercel CLI globalmente
npm i -g vercel

# 2. Iniciar sesión en Vercel
vercel login

# 3. Desplegar en entorno de previsualización
vercel

# 4. Desplegar directamente a producción
vercel --prod
```

---

## Variables de Entorno

Copia el archivo `.env.example` como `.env.local` para entornos locales o configúralas en el panel de tu proveedor de hosting:

```env
# URL canónica del sitio web en producción
NEXT_PUBLIC_SITE_URL=https://landselling.com

# Número de WhatsApp Business (código de país sin '+' ni espacios: 57 + 10 dígitos)
NEXT_PUBLIC_WHATSAPP_NUMBER=573000000000
```

---

## Licencia y Créditos

Desarrollado con altos estándares de ingeniería de software para el sector inmobiliario y de tierras en Colombia.  
© 2026 **LandSelling.com**. Todos los derechos reservados.
