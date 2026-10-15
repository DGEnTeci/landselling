import { PropertyCategorySlug } from './property';

export type SortOption =
  | 'relevancia'
  | 'precio_menor'
  | 'precio_mayor'
  | 'area_menor'
  | 'area_mayor';

export interface PropertyFilterState {
  searchQuery: string;
  department: string;
  categorySlug: PropertyCategorySlug | 'todas';
  minPriceCOP: number;
  maxPriceCOP: number;
  minAreaHectares: number;
  maxAreaHectares: number;
  sortBy: SortOption;
}

export const INITIAL_FILTER_STATE: PropertyFilterState = {
  searchQuery: '',
  department: 'todos',
  categorySlug: 'todas',
  minPriceCOP: 0,
  maxPriceCOP: 0,
  minAreaHectares: 0,
  maxAreaHectares: 0,
  sortBy: 'relevancia',
};
