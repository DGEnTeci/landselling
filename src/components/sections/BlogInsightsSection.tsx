'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { Article } from '@/types/content';
import { getArticles } from '@/lib/data';

export interface BlogInsightsSectionProps {
  articles?: Article[];
  onRequestContact?: () => void;
  className?: string;
}

export const articleFullContentMap: Record<string, string[]> = {
  'art-01': [
    'El Certificado de Tradición y Libertad es la radiografía jurídica de cualquier inmueble en Colombia. Antes de entregar arras o firmar una promesa de compraventa, es mandatorio solicitar una copia expedida con no más de 30 días de antigüedad ante la Superintendencia de Notariado y Registro.',
    '1. Identificación del Inmueble y Matrícula Individual: Revisa que el número de matrícula inmobiliaria corresponda exactamente a la cédula catastral y al lote que estás negociando. Si aparece la anotación de "falsa tradición" o "posesión inscrita", significa que el vendedor no tiene el dominio pleno del terreno.',
    '2. Gravámenes y Medidas Cautelares: Las anotaciones deben estar libres de embargos judiciales, hipotecas abiertas a favor de bancos no canceladas, demandas en curso o afectaciones a vivienda familiar. Si existe alguna medida cautelar, el notario no podrá autorizar la escritura pública.',
    '3. Desenglobes y Reglamento de Propiedad Horizontal: En parcelaciones campestres, cerciórate de que el lote cuente con desenglobe formal aprobado por curaduría urbana o planeación municipal, y no sea una cuota proindiviso que limite tu libre disposición del suelo.',
  ],
  'art-02': [
    'La topografía y la disponibilidad efectiva de servicios públicos representan más del 40% del costo real de habitabilidad de un terreno campestre. Durante tu visita técnica preliminar, no te limites a contemplar el paisaje: audita cada aspecto de infraestructura.',
    '1. Tipo de Agua y Fuentes Hídricas: Es vital distinguir entre agua de acueducto veredal formalmente constituido (con contador y bocatoma legal ante la CAR o Corporación Autónoma Regional) vs. concesión de aguas superficiales de nacedero. Las fuentes hídricas nativas requieren rondas de protección ambiental mínimas de 30 metros donde está prohibido edificar.',
    '2. Pendiente y Explanación: Terrenos planos o con pendiente suave (menor al 15%) reducen drásticamente los costos de muros de contención y movimiento de tierras. Exige siempre un levantamiento topográfico georreferenciado con curvas de nivel.',
    '3. Energía Eléctrica y Conectividad: Comprueba si el punto de conexión eléctrica está al pie del lote o requiere postería privada adicional. Hoy en día, la disponibilidad de fibra óptica veredal es indispensable para el trabajo remoto en parcelaciones de alta plusvalía.',
  ],
  'art-03': [
    'En el ciclo inmobiliario actual, los terrenos rurales y lotes en municipios intermedios de Colombia han mostrado una valorización neta anual de entre el 15% y el 22%, superando el rendimiento promedio de los apartamentos urbanos afectados por altas tasas de interés y sobreoferta.',
    '1. El Efecto Multiplicador de las Vías 4G: Proyectos como las autopistas Mar 1 y Mar 2 en Antioquia, o la doble calzada Bogotá-Girardot y Perimetral de Oriente en Cundinamarca, han reducido los tiempos de traslado en más del 45%, detonando el interés de compradores e inversionistas particulares.',
    '2. Menores Costos de Mantenimiento e Impuesto Predial: Mientras que una propiedad urbana genera costos fijos elevados de administración y mantenimiento estructural, la tierra no se deteriora físicamente, requiere costos mínimos de conservación y se beneficia de la plusvalía natural generada por el desarrollo de la zona.',
    '3. Cobertura Natural frente a la Devaluación: La tierra es un activo refugio por excelencia. Con una oferta estrictamente limitada por la geografía y una demanda acelerada por familias que buscan calidad de vida campestre, invertir en lotes con tradición verificada constituye la mejor decisión patrimonial de la década.',
  ],
};

export const BlogInsightsSection: React.FC<BlogInsightsSectionProps> = ({
  articles: customArticles,
  onRequestContact,
  className = '',
}) => {
  const articlesList = customArticles || getArticles();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleOpenArticle = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
  };

  const handleCtaContact = () => {
    handleCloseArticle();
    if (onRequestContact) {
      onRequestContact();
    } else {
      const contactSection = document.getElementById('contacto');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="blog"
      aria-label="Artículos y noticias sobre inversión en terrenos"
      className={`py-16 sm:py-24 bg-white border-b border-cream-200/80 ${className}`.trim()}
    >
      <Container size="xl">
        {/* Encabezado Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-light text-emerald-dark border border-emerald/20">
              Educación y Mercado
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-950 tracking-tight">
              Últimas Noticias y Consejos
            </h2>
            <p className="text-base sm:text-lg text-forest-700 font-normal leading-relaxed">
              Mantente informado con las últimas noticias, guías legales y actualizaciones del mercado
              inmobiliario en Colombia.
            </p>
          </div>

          <a
            href="#blog"
            className="
              inline-flex items-center gap-2 text-sm font-bold text-emerald-dark
              hover:text-emerald transition-colors self-start md:self-end
              focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded-lg py-1 px-2
            "
          >
            <span>Ver Todos los Artículos</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Cuadrícula de 3 Tarjetas de Blog */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articlesList.map((article) => (
            <article
              key={article.id}
              role="button"
              tabIndex={0}
              aria-label={`Leer artículo: ${article.title}`}
              onClick={() => handleOpenArticle(article)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenArticle(article);
                }
              }}
              className="
                group relative bg-white rounded-2xl overflow-hidden border border-cream-200/90
                shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300
                flex flex-col h-full cursor-pointer focus:outline-none focus-visible:ring-2
                focus-visible:ring-emerald
              "
            >
              {/* Imagen Superior */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream-200">
                <Image
                  src={article.coverImageUrl}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              {/* Contenido del Artículo */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Badge de Categoría */}
                  <Badge variant="emerald" size="sm">
                    {article.category}
                  </Badge>

                  {/* Título en Negrita */}
                  <h3 className="text-lg font-bold text-forest-950 group-hover:text-emerald transition-colors line-clamp-2 leading-snug tracking-tight">
                    {article.title}
                  </h3>

                  {/* Extracto Breve */}
                  <p className="text-xs text-forest-700 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                {/* Fila Inferior con Fecha, Tiempo y Botón Circular */}
                <div className="pt-4 border-t border-cream-200/80 flex items-center justify-between text-xs text-forest-600">
                  <div className="flex items-center gap-1.5 font-medium">
                    <span>{article.publishedAt}</span>
                    <span aria-hidden="true">•</span>
                    <span>{article.readTimeMinutes} min de lectura</span>
                  </div>

                  <button
                    type="button"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="
                      h-9 w-9 min-h-[36px] min-w-[36px] rounded-full bg-forest-900 text-white
                      group-hover:bg-emerald flex items-center justify-center transition-colors
                      duration-200 shadow-xs shrink-0
                    "
                  >
                    <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>

      {/* Modal de Lectura Completa (Cero Callejones Sin Salida) */}
      {selectedArticle && (
        <Modal
          isOpen={!!selectedArticle}
          onClose={handleCloseArticle}
          title={selectedArticle.title}
          description={`${selectedArticle.category} • ${selectedArticle.publishedAt} • Por ${selectedArticle.authorName}`}
          maxWidth="4xl"
        >
          <div className="space-y-6 text-forest-950">
            {/* Imagen de Cabecera */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-forest-900 shadow-sm border border-cream-300">
              <Image
                src={selectedArticle.coverImageUrl}
                alt={selectedArticle.title}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
              />
            </div>

            {/* Metadatos del Autor y Tiempo */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-cream-100/70 border border-cream-300 text-xs">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-forest-900 text-white font-bold flex items-center justify-center shrink-0">
                  {selectedArticle.authorName.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-forest-950">{selectedArticle.authorName}</p>
                  <p className="text-forest-700">{selectedArticle.authorRole}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-forest-700 font-semibold">
                <svg className="w-4 h-4 text-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{selectedArticle.readTimeMinutes} minutos de lectura estimada</span>
              </div>
            </div>

            {/* Párrafos del Contenido Completo */}
            <div className="space-y-4 text-sm sm:text-base text-forest-800 leading-relaxed">
              {(articleFullContentMap[selectedArticle.id] || [selectedArticle.excerpt]).map(
                (paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                )
              )}
            </div>

            {/* CTA Final Integrado de Asesoría */}
            <div className="mt-8 p-6 rounded-2xl bg-forest-900 text-cream-50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <p className="font-bold text-base text-white">
                  ¿Quieres invertir con respaldo legal y seguridad?
                </p>
                <p className="text-xs text-cream-300">
                  Nuestros abogados y topógrafos verifican cada terreno antes de que tomes una decisión.
                </p>
              </div>

              <Button
                variant="gold"
                size="md"
                onClick={handleCtaContact}
                className="shrink-0 w-full sm:w-auto"
              >
                Hablar con un Experto
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
