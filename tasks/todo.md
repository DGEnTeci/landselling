# Lista de Tareas (Task Tracker): LandSelling.com

> **Convención:** Seguimiento paso a paso según `spec-driven-development` y `planning-and-task-breakdown`.  
> **Comandos de Verificación:** `npm test`, `npx tsc --noEmit`, `npm run build`.

---

## Fase 1: Cimientos, Datos y Lógica Pura (TDD)

- [x] **Task 1: Scaffolding inicial del proyecto**
  - **Descripción:** Configurar `package.json`, Next.js 15 App Router, React 19, TypeScript estricto, Tailwind CSS con paleta forest/emerald/cream, Vitest y React Testing Library.
  - **Criterios de Aceptación:**
    - Repositorio compila sin errores.
    - Tailwind compila utilidades personalizadas de color y fuentes.
    - Vitest ejecuta suites con entorno `jsdom`.
  - **Archivos:** `package.json`, `tsconfig.json`, `tailwind.config.ts`, `vitest.config.ts`, `postcss.config.mjs`, `src/app/globals.css`.
  - **Verificación:** `npm run build` y `npm test`.


- [x] **Task 2: Modelos de datos y catálogo de propiedades**
  - **Descripción:** Crear interfaces TypeScript en `src/types/` y datos estructurados en `src/data/` para lotes, categorías, artículos y testimonios colombianos.
  - **Criterios de Aceptación:**
    - Tipos estrictos para `Property`, `Location`, `Features`, `Category`, `Testimonial`, `Article`.
    - Al menos 8 propiedades de catálogo con precios en COP, áreas en ha y m², topografía, servicios y estados.
  - **Archivos:** `src/types/property.ts`, `src/types/filter.ts`, `src/data/properties.json`, `src/data/categories.json`, `src/data/testimonials.json`, `src/data/articles.json`.
  - **Verificación:** `npx tsc --noEmit`.

- [x] **Task 3: Formateadores y utilidades de filtrado (TDD)**
  - **Descripción:** Implementar con pruebas unitarias TDD los formateadores de COP, áreas ($ha$ / $m^2$), desinfección de teléfonos colombianos, generador de URLs de WhatsApp y motor de filtros.
  - **Criterios de Aceptación:**
    - `formatCOP` formatea números como `$ 450.000.000 COP`.
    - `formatAreaSurface` formatea `1.5 ha (15.000 m²)`.
    - `generateWhatsAppPropertyUrl` genera enlaces válidos de wa.me con mensaje pre-rellenado.
    - Motor de filtros filtra por palabra clave, categoría, rango de precio y ordenamiento.
  - **Archivos:** `src/lib/formatters.ts`, `src/lib/filters.ts`, `src/lib/whatsapp.ts`, `tests/unit/formatters.test.ts`, `tests/unit/filters.test.ts`, `tests/unit/whatsapp.test.ts`.
  - **Verificación:** `npm test`.

### 🚩 Checkpoint 1: Cimientos Verificados
- [x] Pruebas unitarias de formateadores y filtros al 100% en verde.
- [x] TypeScript estricto sin errores.


---

## Fase 2: Componentes UI Base, Header y Hero

- [x] **Task 4: Componentes UI Base y Sistema de Diseño**
  - **Descripción:** Crear componentes primitivos accesibles y reutilizables: `Button`, `Badge`, `Modal`, `Input`, `Select`, `Container`.
  - **Criterios de Aceptación:**
    - Botones con objetivos táctiles mínimos de 44px.
    - Modal accesible con `aria-modal="true"`, foco atrapado y cierre con `Escape`.
    - Pruebas unitarias de interacción en `tests/unit/components.test.tsx`.
  - **Archivos:** `src/components/ui/Button.tsx`, `Badge.tsx`, `Modal.tsx`, `Input.tsx`, `Select.tsx`, `Container.tsx`, `tests/unit/components.test.tsx`.
  - **Verificación:** `npm test tests/unit/components.test.tsx`.

- [x] **Task 5: Header de Navegación y Footer Editorial**
  - **Descripción:** Construir la barra de navegación responsive (logo `LandSelling.com`, enlaces a secciones, botón "Empezar", drawer móvil) y el Footer con categorías, newsletter y avisos legales.
  - **Criterios de Aceptación:**
    - Header sticky con efecto de vidrio (backdrop-blur) al hacer scroll.
    - Menú móvil accesible con botón hamburguesa y bloqueo de scroll al abrir.
    - Footer con 4 columnas, avisos legales y enlaces institucionales.
  - **Archivos:** `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`, `tests/unit/layout.test.tsx`.
  - **Verificación:** `npm test tests/unit/layout.test.tsx`.

- [ ] **Task 6: Sección Hero con Buscador Rápido Integrado**
  - **Descripción:** Diseñar el Hero principal con titular de alto impacto, subtítulo descriptivo, métrica social (+10.000 clientes felices) y componente `QuickSearchBox` reactivo.
  - **Criterios de Aceptación:**
    - Imagen de fondo de alta calidad optimizada con `priority`.
    - Selector rápido de ubicación y tipo de propiedad con botón "Buscar Terrenos".
    - Al buscar, hace scroll suave a la sección de catálogo aplicando los filtros.
  - **Archivos:** `src/components/sections/Hero.tsx`, `src/components/properties/QuickSearchBox.tsx`, `tests/unit/hero.test.tsx`.
  - **Verificación:** `npm test tests/unit/hero.test.tsx`.

### 🚩 Checkpoint 2: Navegación y Hero Verificados
- [ ] Header, Hero y Footer navegables y responsivos.
- [ ] Buscador integrado interactivo.

---

## Fase 3: Catálogo de Terrenos, Filtros y Modales de Conversión

- [ ] **Task 7: Catálogo de Propiedades Destacadas con Filtros en Tiempo Real**
  - **Descripción:** Implementar `PropertyCard` y la sección `FeaturedProperties` con tabs de categorías y filtros por precio/orden.
  - **Criterios de Aceptación:**
    - Tarjetas con imagen optimizada, badges de estado, ubicación, superficie (ha / m²) y precio destacado.
    - Contador dinámico de propiedades encontradas y estado vacío amigable si no hay coincidencias.
  - **Archivos:** `src/components/properties/PropertyCard.tsx`, `src/components/sections/FeaturedProperties.tsx`, `tests/unit/property-card.test.tsx`.
  - **Verificación:** `npm test tests/unit/property-card.test.tsx`.

- [ ] **Task 8: Modal de Ficha Técnica Completa (`PropertyDetailModal`)**
  - **Descripción:** Modal interactivo para ver la ficha detallada del lote seleccionado: galería, topografía, servicios disponibles (agua, luz, vías), escrituración y descripción completa.
  - **Criterios de Aceptación:**
    - Ficha técnica exhaustiva y visualmente estructurada.
    - Botones de conversión directos: "Solicitar Visita / Información" y "Hablar por WhatsApp".
  - **Archivos:** `src/components/properties/PropertyDetailModal.tsx`, `tests/unit/property-detail-modal.test.tsx`.
  - **Verificación:** `npm test tests/unit/property-detail-modal.test.tsx`.

- [ ] **Task 9: Modal de Captación de Leads y Enlace Directo a WhatsApp**
  - **Descripción:** Modal de formulario web para prospectos interesados (`ContactLeadModal`) con validación de teléfono colombiano (`^3\d{9}$`), nombre y correo, más botón flotante persistente de WhatsApp.
  - **Criterios de Aceptación:**
    - Validación accesible en tiempo real de campos obligatorios.
    - Confirmación visual de solicitud enviada.
    - Enlace a WhatsApp genera la conversación personalizada con el lote exacto.
  - **Archivos:** `src/components/contact/ContactLeadModal.tsx`, `src/components/contact/WhatsAppFloatingButton.tsx`, `tests/unit/contact-modal.test.tsx`.
  - **Verificación:** `npm test tests/unit/contact-modal.test.tsx`.

### 🚩 Checkpoint 3: Catálogo y Conversión Verificados
- [ ] Flujo completo de búsqueda, inspección de lote y captación de contacto operativo.

---

## Fase 4: Secciones de Confianza, Educación y Valor

- [ ] **Task 10: Beneficios, Categorías y Banner de Conversión Intermedio**
  - **Descripción:** Implementar `BenefitsSection` (4 pilares), `PropertyCategories` (tarjetas visuales de tipos de lote) y `CtaBanner` ("Tu terreno ideal está a solo un clic").
  - **Criterios de Aceptación:**
    - Iconografía minimalista en beneficios.
    - Categorías conducen a filtrar automáticamente el catálogo.
    - Banner de alto contraste con botón de llamada a la acción.
  - **Archivos:** `src/components/sections/BenefitsSection.tsx`, `PropertyCategories.tsx`, `CtaBanner.tsx`.
  - **Verificación:** `npm test` y renderizado visual.

- [ ] **Task 11: Sección de Inversión y Pasos de Compra con Testimonios**
  - **Descripción:** Implementar `InvestmentValueSection` (beneficios financieros de la tierra), `PurchaseSteps` (3 pasos simples) y carrusel/grid de `Testimonials`.
  - **Criterios de Aceptación:**
    - Métricas de plusvalía y comparativa de inversión.
    - Pasos numerados del 1 al 3 con descripciones claras.
    - Testimonios con calificación en estrellas, ubicación y fotografía del cliente.
  - **Archivos:** `src/components/sections/InvestmentValueSection.tsx`, `PurchaseSteps.tsx`, `TestimonialsSection.tsx`.
  - **Verificación:** `npm test`.

- [ ] **Task 12: Blog / Insights y Datos Estructurados SEO**
  - **Descripción:** Implementar `BlogInsightsSection` con 3 artículos clave sobre compra de tierras en Colombia, y componentes SEO JSON-LD (`RealEstateAgent` y `Product`).
  - **Criterios de Aceptación:**
    - Artículos con tiempo de lectura, fecha, categoría y vista previa.
    - JSON-LD válido generado en el HTML para indexación rica en Google.
  - **Archivos:** `src/components/sections/BlogInsightsSection.tsx`, `src/components/seo/RealEstateJsonLd.tsx`.
  - **Verificación:** `npm test`.

### 🚩 Checkpoint 4: Landing Page Completa
- [ ] Todas las 9 secciones conceptuales renderizadas y sincronizadas en `page.tsx`.

---

## Fase 5: Rendimiento, Accesibilidad y Documentación

- [ ] **Task 13: Auditoría de Accesibilidad, Rendimiento y Pruebas Globales**
  - **Descripción:** Revisión de contrastes, atributos aria, SkipLink ("saltar al contenido"), optimización de imágenes (`next/image`) y suite global de pruebas.
  - **Criterios de Aceptación:**
    - 100% de suites de pruebas pasando en Vitest.
    - Cero advertencias de TypeScript.
    - Compilación de producción limpia con `npm run build`.
  - **Archivos:** `src/app/page.tsx`, `src/app/layout.tsx`, `src/components/layout/SkipLink.tsx`.
  - **Verificación:** `npm run build` y `npm test`.

- [ ] **Task 14: Documentación y Guía de Despliegue (`README.md`)**
  - **Descripción:** Redactar un `README.md` completo con descripción de arquitectura, guía de instalación local, scripts y guía de despliegue en Vercel.
  - **Criterios de Aceptación:**
    - Instrucciones claras paso a paso.
    - Variables de entorno documentadas de forma segura.
  - **Archivos:** `README.md`.
  - **Verificación:** Revisión de markdown y formato.
