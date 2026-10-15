import React from 'react';
import { SITE_CONFIG } from '@/config/site';
import { getProperties, getArticles } from '@/lib/data';

export const StructuredData: React.FC = () => {
  const properties = getProperties();
  const articles = getArticles();

  const realEstateAgentSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: SITE_CONFIG.name,
    legalName: 'LandSelling.com S.A.S.',
    url: `https://${SITE_CONFIG.domain}`,
    logo: `https://${SITE_CONFIG.domain}/icon.svg`,
    description: SITE_CONFIG.description,
    telephone: SITE_CONFIG.contact.phoneDisplay,
    email: SITE_CONFIG.contact.email,
    currenciesAccepted: 'COP',
    paymentAccepted: 'Transferencia bancaria, Crédito hipotecario, Efectivo',
    areaServed: {
      '@type': 'Country',
      name: 'Colombia',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.contact.address,
      addressLocality: 'Bogotá D.C.',
      addressRegion: 'Cundinamarca',
      addressCountry: 'CO',
    },
    openingHours: 'Mo,Tu,We,Th,Fr,Sa 08:00-18:00',
  };

  const catalogItemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Catálogo de Terrenos y Lotes en Colombia - LandSelling.com',
    itemListElement: properties.map((prop, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Product',
        name: prop.title,
        description: prop.shortDescription,
        image: prop.imageUrl,
        sku: prop.id,
        category: prop.categoryName,
        offers: {
          '@type': 'Offer',
          price: prop.priceCOP,
          priceCurrency: 'COP',
          availability:
            prop.status === 'en_venta'
              ? 'https://schema.org/InStock'
              : 'https://schema.org/LimitedAvailability',
          itemCondition: 'https://schema.org/NewCondition',
          url: `https://${SITE_CONFIG.domain}#propiedades`,
        },
      },
    })),
  };

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog e Insights de Inversión en Tierras - LandSelling.com',
    blogPost: articles.map((art) => ({
      '@type': 'BlogPosting',
      headline: art.title,
      description: art.excerpt,
      image: art.coverImageUrl,
      datePublished: '2026-10-12',
      author: {
        '@type': 'Person',
        name: art.authorName,
        jobTitle: art.authorRole,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
      },
    })),
  };

  const fullSchema = [realEstateAgentSchema, catalogItemListSchema, blogSchema];

  // Sanitización de seguridad contra inyecciones XSS en JSON embebido en script
  const jsonLdString = JSON.stringify(fullSchema).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString }}
    />
  );
};
