'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { PropertyFilterState } from '@/types/filter';
import { PropertyCategorySlug } from '@/types/property';
import { getAvailableDepartments, getCategories } from '@/lib/data';

export interface QuickSearchBoxProps {
  onSearch?: (filters: Partial<PropertyFilterState>) => void;
  departments?: string[];
  className?: string;
}

export const BUDGET_OPTIONS = [
  { value: 'all', label: 'Cualquier presupuesto', maxPrice: 0 },
  { value: 'up_to_300m', label: 'Hasta $ 300 Millones COP', maxPrice: 300000000 },
  { value: 'up_to_600m', label: 'Hasta $ 600 Millones COP', maxPrice: 600000000 },
  { value: 'up_to_1000m', label: 'Hasta $ 1.000 Millones COP', maxPrice: 1000000000 },
  { value: 'above_1000m', label: 'Más de $ 1.000 Millones COP', maxPrice: 5000000000 },
];

export const QuickSearchBox: React.FC<QuickSearchBoxProps> = ({
  onSearch,
  departments: customDepartments,
  className = '',
}) => {
  const availableDepartments = customDepartments || getAvailableDepartments();
  const availableCategories = getCategories();

  const [department, setDepartment] = useState('todos');
  const [categorySlug, setCategorySlug] = useState<PropertyCategorySlug | 'todas'>('todas');
  const [budgetTier, setBudgetTier] = useState('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedBudget = BUDGET_OPTIONS.find((b) => b.value === budgetTier);
    const maxPriceCOP = selectedBudget ? selectedBudget.maxPrice : 0;

    const payload: Partial<PropertyFilterState> = {
      department,
      categorySlug,
      maxPriceCOP,
    };

    if (onSearch) {
      onSearch(payload);
    }

    // Desplazamiento suave hacia la sección del catálogo
    const targetSection = document.getElementById('propiedades') || document.getElementById('catalogo');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <form
      role="search"
      aria-label="Buscador rápido de terrenos"
      onSubmit={handleSubmit}
      className={`
        bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl
        border border-cream-200/90 text-forest-900 transition-all duration-200
        ${className}
      `.trim()}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
        {/* Control 1: Ubicación / Departamento */}
        <div className="relative">
          <label
            htmlFor="hero-search-department"
            className="block text-xs font-bold uppercase tracking-wider text-forest-700 mb-1"
          >
            Ubicación
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
            <select
              id="hero-search-department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="
                w-full pl-10 pr-8 py-2.5 bg-cream-50/70 border border-cream-300
                rounded-xl text-sm font-medium text-forest-950 appearance-none
                min-h-[44px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald
              "
            >
              <option value="todos">Todos los departamentos</option>
              {availableDepartments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-forest-600">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </div>

        {/* Control 2: Tipo de Propiedad / Categoría */}
        <div className="relative">
          <label
            htmlFor="hero-search-category"
            className="block text-xs font-bold uppercase tracking-wider text-forest-700 mb-1"
          >
            Tipo de Terreno
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </span>
            <select
              id="hero-search-category"
              value={categorySlug}
              onChange={(e) => setCategorySlug(e.target.value as PropertyCategorySlug | 'todas')}
              className="
                w-full pl-10 pr-8 py-2.5 bg-cream-50/70 border border-cream-300
                rounded-xl text-sm font-medium text-forest-950 appearance-none
                min-h-[44px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald
              "
            >
              <option value="todas">Todos los tipos</option>
              {availableCategories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-forest-600">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </div>

        {/* Control 3: Rango de Presupuesto (COP) */}
        <div className="relative">
          <label
            htmlFor="hero-search-budget"
            className="block text-xs font-bold uppercase tracking-wider text-forest-700 mb-1"
          >
            Presupuesto (COP)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <select
              id="hero-search-budget"
              value={budgetTier}
              onChange={(e) => setBudgetTier(e.target.value)}
              className="
                w-full pl-10 pr-8 py-2.5 bg-cream-50/70 border border-cream-300
                rounded-xl text-sm font-medium text-forest-950 appearance-none
                min-h-[44px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald
              "
            >
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-forest-600">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </div>

        {/* Botón de Búsqueda */}
        <div className="pt-2 md:pt-5 lg:pt-5">
          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            leftIcon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          >
            Buscar Terrenos
          </Button>
        </div>
      </div>
    </form>
  );
};
