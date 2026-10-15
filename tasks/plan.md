# Plan de Implementación: LandSelling.com

> **Documento:** Plan de Arquitectura y Desglose de Tareas  
> **Proyecto:** LandSelling.com — Plataforma de Terrenos e Inmuebles en Colombia  
> **Ubicación:** `C:\Users\juand\Downloads\Poyectos\landselling`

---

## 1. Visión General y Objetivos
Construir una plataforma web moderna, rápida y accesible para la comercialización y visualización de terrenos en Colombia, con diseño premium en tonos verde bosque profundo (`#0A2619`, `#143826`), blancos limpios y acentos esmeralda/dorado. Diseñada para convertir visitantes en prospectos calificados a través de un buscador reactivo, fichas de lotes con especificaciones claras (Hectáreas, $m^2$, servicios, escrituración) y doble canal de contacto (Formulario web + WhatsApp Business estructurado).

---

## 2. Decisiones de Arquitectura

1. **Next.js 15 App Router & Server Components:**
   - La página principal (`page.tsx`) carga de manera estática y modular las secciones informativas.
   - Los componentes con interactividad en el cliente (buscador en tiempo real, modales de detalle y contacto, carrusel de testimonios) se aíslan como componentes `'use client'` livianos para optimizar el First Load JS.
2. **Formateo Monetario y Superficies Colombianas:**
   - Precios estandarizados en **Pesos colombianos (COP)** con separador de miles (`$ 450.000.000 COP`).
   - Superficies expresadas de forma dual: Hectáreas (`ha`) y Metros cuadrados ($m^2$) para transparencia total del comprador.
3. **Doble Canal de Conversión:**
   - Cada propiedad ofrece acción para abrir el formulario modal de captación de datos (con validación de teléfono colombiano `^3\d{9}$`) o abrir de inmediato WhatsApp con mensaje pre-rellenado indicando el ID y título del lote.
4. **Accesibilidad WCAG AA:**
   - Navegación por teclado completa, focus management en modales, botones táctiles mínimos de 44x44px y contraste de color superior a 4.5:1 (texto normal) y 7:1 (encabezados).

---

## 3. Fases de Implementación y Tareas

### Fase 1: Cimientos, Datos y Lógica Pura (TDD)
- **Task 1:** Scaffolding inicial del proyecto (Next.js 15, React 19, TypeScript, Tailwind CSS con paleta forest/emerald/cream, Vitest, Testing Library).
- **Task 2:** Modelos de datos TypeScript y catálogo estructurado en JSON (`properties.json`, `categories.json`, `testimonials.json`, `articles.json`).
- **Task 3:** Utilidades y funciones de formateo (`formatCOP`, `formatAreaSurface`, `generateWhatsAppPropertyUrl`, filtros) con suite de pruebas TDD en Vitest.

#### 🚩 Checkpoint 1: Cimientos
- `npm test` ejecuta y pasa las pruebas de formateadores y filtros con 100% de éxito.
- `npx tsc --noEmit` sin errores de tipos.

---

### Fase 2: Componentes UI Base, Header y Hero
- **Task 4:** Componentes UI accesibles y reutilizables (`Button`, `Badge`, `Modal`, `Input`, `Select`, `Container`).
- **Task 5:** Barra de navegación `Header` responsive (logo LandSelling, menú de anclaje, drawer móvil, botón "Empezar") y `Footer` editorial.
- **Task 6:** Sección `Hero` de alto impacto con titular, subtítulo, social proof (+10.000 clientes felices) y `QuickSearchBox` reactivo integrado.

#### 🚩 Checkpoint 2: Navegación y Hero
- Navegación fluida en móvil y escritorio.
- El buscador rápido actualiza los filtros seleccionados.

---

### Fase 3: Catálogo de Terrenos, Filtros y Modales de Conversión
- **Task 7:** `PropertyCard` y `FeaturedProperties` grid con selector de categorías y filtrado en tiempo real.
- **Task 8:** `PropertyDetailModal` accesible con galería fotográfica, ficha de servicios (agua, luz, vías, topografía, escrituración) y precio.
- **Task 9:** `ContactLeadModal` (formulario accesible para solicitar visita/asesoría) y botón directo de WhatsApp estructurado.

#### 🚩 Checkpoint 3: Catálogo y Conversión
- Búsqueda y filtrado interactivo instantáneo.
- Modales atrapan el foco, responden a `Escape` y no generan saltos de maquetación.

---

### Fase 4: Secciones de Confianza, Educación y Valor
- **Task 10:** Sección de Beneficios (`BenefitsSection`), cuadrícula visual de Categorías (`PropertyCategories`) y Banner CTA intermedio.
- **Task 11:** Sección de Valor e Inversión (`InvestmentValueSection`) y Pasos de Adquisición (`PurchaseSteps`) con `TestimonialsSlider`.
- **Task 12:** Sección de Artículos (`BlogInsights`) y datos estructurados SEO JSON-LD Schema.org (`RealEstateAgent` y `Product`).

#### 🚩 Checkpoint 4: Experiencia Integral de Landing Page
- Todas las 9 secciones conceptuales integradas y visualmente equilibradas.
- Flujo de usuario claro y continuo.

---

### Fase 5: Rendimiento, Accesibilidad y Documentación
- **Task 13:** Optimización de imágenes (`next/image`), contraste de color, landmarks semánticos y suite de pruebas integral.
- **Task 14:** `README.md` exhaustivo con arquitectura, guía de ejecución local y despliegue en Vercel.

---

## 4. Matriz de Riesgos y Mitigaciones
| Riesgo | Impacto | Mitigación |
| :--- | :---: | :--- |
| Carga lenta por imágenes pesadas de lotes | Medio | Uso de `next/image` con formatos WebP/AVIF y tamaños responsivos (`sizes`). |
| Inconsistencia en áreas de terrenos | Bajo | Formateador unificado que siempre exhibe `ha` y `m²` complementarios. |
| Fricción en móviles para contactar asesor | Medio | Botón flotante y CTA persistente directo a WhatsApp Business. |
