import propertiesData from '@/data/properties.json';
import categoriesData from '@/data/categories.json';
import testimonialsData from '@/data/testimonials.json';
import articlesData from '@/data/articles.json';
import { Property, PropertyCategorySlug } from '@/types/property';
import { PropertyCategory, Testimonial, Article } from '@/types/content';

export const properties: Property[] = propertiesData as Property[];
export const categories: PropertyCategory[] = categoriesData as PropertyCategory[];
export const testimonials: Testimonial[] = testimonialsData as Testimonial[];
export const articles: Article[] = articlesData as Article[];

export function getProperties(): Property[] {
  return properties;
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((p) => p.featured);
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}

export function getPropertiesByCategory(categorySlug: PropertyCategorySlug): Property[] {
  return properties.filter((p) => p.categorySlug === categorySlug);
}

export function getCategories(): PropertyCategory[] {
  return categories;
}

export function getTestimonials(): Testimonial[] {
  return testimonials;
}

export function getArticles(): Article[] {
  return articles;
}

export function getAvailableDepartments(): string[] {
  const departments = properties.map((p) => p.location.department);
  return Array.from(new Set(departments)).sort();
}
