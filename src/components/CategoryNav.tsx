import React from 'react';
import { CATEGORIES } from '../data/menuData';
import { CategoryId, Language } from '../types';
import {
  Flame,
  Sparkles,
  Cookie,
  Egg,
  UtensilsCrossed,
  Award,
  Soup,
  Coffee,
  Citrus,
  GlassWater,
  Wine,
} from 'lucide-react';

interface CategoryNavProps {
  language: Language;
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (id: CategoryId | 'all') => void;
  filterSection: 'all' | 'food' | 'drinks';
  onFilterSectionChange: (sec: 'all' | 'food' | 'drinks') => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Flame: <Flame className="w-3.5 h-3.5" />,
  Sparkles: <Sparkles className="w-3.5 h-3.5" />,
  Cookie: <Cookie className="w-3.5 h-3.5" />,
  Egg: <Egg className="w-3.5 h-3.5" />,
  UtensilsCrossed: <UtensilsCrossed className="w-3.5 h-3.5" />,
  Award: <Award className="w-3.5 h-3.5" />,
  Soup: <Soup className="w-3.5 h-3.5" />,
  Coffee: <Coffee className="w-3.5 h-3.5" />,
  Citrus: <Citrus className="w-3.5 h-3.5" />,
  GlassWater: <GlassWater className="w-3.5 h-3.5" />,
  Wine: <Wine className="w-3.5 h-3.5" />,
};

export const CategoryNav: React.FC<CategoryNavProps> = ({
  language,
  selectedCategory,
  onSelectCategory,
  filterSection,
  onFilterSectionChange,
}) => {
  const visibleCategories = CATEGORIES.filter((cat) => {
    if (filterSection === 'food') return cat.isFood;
    if (filterSection === 'drinks') return !cat.isFood;
    return true;
  });

  return (
    <div className="sticky top-18 sm:top-20 z-30 bg-[#1b1411]/95 backdrop-blur-md border-b border-[#a66a38]/20 py-2.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        
        {/* Section Filter (All / Food / Drinks) */}
        <div className="flex items-center gap-1 p-1 bg-[#231a15] rounded-lg border border-[#a66a38]/25 self-start shrink-0">
          <button
            onClick={() => {
              onFilterSectionChange('all');
              onSelectCategory('all');
            }}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              filterSection === 'all' && selectedCategory === 'all'
                ? 'bg-[#d98236] text-[#1b1411] font-semibold shadow-sm'
                : 'text-[#ede0d0] hover:text-[#f7f1e5]'
            }`}
          >
            {language === 'es' ? 'Carta Completa' : 'Full Menu'}
          </button>
          <button
            onClick={() => {
              onFilterSectionChange('food');
              if (selectedCategory !== 'all') {
                const target = CATEGORIES.find(c => c.id === selectedCategory);
                if (target && !target.isFood) onSelectCategory('all');
              }
            }}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              filterSection === 'food'
                ? 'bg-[#d98236] text-[#1b1411] font-semibold shadow-sm'
                : 'text-[#ede0d0] hover:text-[#f7f1e5]'
            }`}
          >
            🥐 {language === 'es' ? 'Comida' : 'Food'}
          </button>
          <button
            onClick={() => {
              onFilterSectionChange('drinks');
              if (selectedCategory !== 'all') {
                const target = CATEGORIES.find(c => c.id === selectedCategory);
                if (target && target.isFood) onSelectCategory('all');
              }
            }}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              filterSection === 'drinks'
                ? 'bg-[#d98236] text-[#1b1411] font-semibold shadow-sm'
                : 'text-[#ede0d0] hover:text-[#f7f1e5]'
            }`}
          >
            ☕ {language === 'es' ? 'Bebidas' : 'Drinks'}
          </button>
        </div>

        {/* Horizontal Category Scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-full">
          <button
            onClick={() => onSelectCategory('all')}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#c89666]/20 border-[#d98236] text-[#f7f1e5]'
                : 'bg-[#231a15] border-[#a66a38]/20 text-[#c89666] hover:border-[#a66a38]/50 hover:text-[#ede0d0]'
            }`}
          >
            {language === 'es' ? 'Todas las Categorías' : 'All Categories'}
          </button>

          {visibleCategories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  isActive
                    ? 'bg-[#d98236] border-[#d98236] text-[#1b1411] font-semibold shadow-sm shadow-[#d98236]/20'
                    : 'bg-[#231a15] border-[#a66a38]/20 text-[#ede0d0] hover:border-[#a66a38]/50 hover:text-[#f7f1e5]'
                }`}
              >
                <span className={isActive ? 'text-[#1b1411]' : 'text-[#d98236]'}>
                  {ICON_MAP[cat.iconName]}
                </span>
                <span>{language === 'es' ? cat.nameEs : cat.nameEn}</span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
