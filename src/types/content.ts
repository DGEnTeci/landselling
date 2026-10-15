import { PropertyCategorySlug } from './property';

export interface PropertyCategory {
  slug: PropertyCategorySlug;
  name: string;
  description: string;
  count: number;
  iconName: string;
  imageUrl: string;
  idealFor: string;
}

export interface Testimonial {
  id: string;
  authorName: string;
  role: string;
  location: string;
  avatarUrl: string;
  rating: number; // 1 to 5
  quote: string;
  propertyPurchased: string;
  propertyArea: string;
  year: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTimeMinutes: number;
  publishedAt: string;
  authorName: string;
  authorRole: string;
  coverImageUrl: string;
  tags: string[];
}
