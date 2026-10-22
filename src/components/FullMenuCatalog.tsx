import React, { useState, useMemo } from 'react';
import { CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { CategoryId, Language, MenuItem } from '../types';
import { MenuItemCard } from './MenuItemCard';
import { Search, Wheat, Coffee, Sparkles } from 'lucide-react';

interface FullMenuCatalogProps {
  language: Language;
  onSelectItem: (item: MenuItem) => void;
}

export const FullMenuCatalog: React.FC<FullMenuCatalogProps> = ({
  language,
  onSelectItem,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [catalogFilter, setCatalogFilter] = useState<'all' | 'food' | 'drinks'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Food / Drinks filter
      if (catalogFilter !== 'all') {
        const cat = CATEGORIES.find((c) => c.id === item.category);
        if (catalogFilter === 'food' && !cat?.isFood) return false;
        if (catalogFilter === 'drinks' && cat?.isFood) return false;
      }

      // Search match
      if (q) {
        const matchesName =
          item.nameEs.toLowerCase().includes(q) || item.nameEn.toLowerCase().includes(q);
        const matchesDesc =
          item.descriptionEs.toLowerCase().includes(q) ||
          item.descriptionEn.toLowerCase().includes(q);
        const matchesTags = item.tags?.some((t) => t.toLowerCase().includes(q));
        return matchesName || matchesDesc || matchesTags;
      }

      return true;
    });
  }, [selectedCategory, catalogFilter, searchQuery]);

  const activeCategories = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const items = filteredItems.filter((i) => i.category === cat.id);
      return { category: cat, items };
    }).filter((g) => g.items.length > 0);
  }, [filteredItems]);

  return (
    <section id="menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 scroll-mt-24 border-t border-[#a66a38]/20 bg-[#1b1411]/50">
      
      {/* Title & Search Bar */}
      <div className="space-y-4 mb-8">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d98236] font-mono block mb-1">
            {language === 'es' ? 'Carta Completa' : 'Full Menu Catalog'}
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#f7f1e5]">
            {language === 'es' ? 'Explora Toda la Oferta de La Kafeteria' : 'Explore All Categories & Specialties'}
          </h2>
          <p className="text-xs sm:text-sm text-[#dfcfbe] mt-1">
            {language === 'es'
              ? 'Todos nuestros precios incluyen IVA. Tostadas disponibles en pitufo blanco, integral, cereal y baguetina, con opción sin gluten (+0.90€).'
              : 'All taxes included. Toasts available in white, wholewheat, cereal seeds, and rye/spelt baguette with gluten-free option (+0.90€).'}
          </p>
        </div>

        {/* Filters and search line */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2">
          
          {/* Quick Filter: All / Food / Drinks */}
          <div className="flex items-center gap-1 p-1 bg-[#231a15] rounded-xl border border-[#a66a38]/30 shrink-0">
            <button
              onClick={() => {
                setCatalogFilter('all');
                setSelectedCategory('all');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                catalogFilter === 'all' && selectedCategory === 'all'
                  ? 'bg-[#d98236] text-[#1b1411] font-bold shadow-sm'
                  : 'text-[#dfcfbe] hover:text-[#f7f1e5]'
              }`}
            >
              {language === 'es' ? 'Todo' : 'All'}
            </button>
            <button
              onClick={() => setCatalogFilter('food')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                catalogFilter === 'food'
                  ? 'bg-[#d98236] text-[#1b1411] font-bold shadow-sm'
                  : 'text-[#dfcfbe] hover:text-[#f7f1e5]'
              }`}
            >
              🥐 {language === 'es' ? 'Comida' : 'Food'}
            </button>
            <button
              onClick={() => setCatalogFilter('drinks')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                catalogFilter === 'drinks'
                  ? 'bg-[#d98236] text-[#1b1411] font-bold shadow-sm'
                  : 'text-[#dfcfbe] hover:text-[#f7f1e5]'
              }`}
            >
              ☕ {language === 'es' ? 'Bebidas' : 'Drinks'}
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c89666]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'es'
                  ? 'Buscar por nombre, ingrediente o alérgeno...'
                  : 'Search by dish name, ingredient, or allergen...'
              }
              className="w-full bg-[#231a15] border border-[#a66a38]/30 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-[#ede0d0] placeholder-[#a66a38] focus:outline-none focus:border-[#d98236] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#c89666] hover:text-[#ede0d0]"
              >
                ✕
              </button>
            )}
          </div>

        </div>

        {/* Category Horizontal Buttons */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
              selectedCategory === 'all'
                ? 'bg-[#c89666]/25 border-[#d98236] text-[#f7f1e5] font-bold'
                : 'bg-[#231a15] border-[#a66a38]/20 text-[#c89666] hover:border-[#a66a38]/50'
            }`}
          >
            {language === 'es' ? 'Todas las Categorías' : 'All Categories'}
          </button>

          {CATEGORIES.filter((c) => {
            if (catalogFilter === 'food') return c.isFood;
            if (catalogFilter === 'drinks') return !c.isFood;
            return true;
          }).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-[#d98236] border-[#d98236] text-[#1b1411] font-bold shadow-sm'
                  : 'bg-[#231a15] border-[#a66a38]/20 text-[#ede0d0] hover:border-[#a66a38]/50'
              }`}
            >
              {language === 'es' ? cat.nameEs : cat.nameEn}
            </button>
          ))}
        </div>

      </div>

      {/* Rendered Categories and Cards */}
      <div className="space-y-12">
        {activeCategories.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#a66a38]">
            {language === 'es' ? 'No se encontraron resultados para tu búsqueda.' : 'No items found matching your search.'}
          </div>
        ) : (
          activeCategories.map(({ category, items }) => (
            <div key={category.id} className="space-y-4">
              <div className="border-b border-[#a66a38]/20 pb-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#f7f1e5]">
                    {language === 'es' ? category.nameEs : category.nameEn}
                  </h3>
                  <span className="text-xs font-mono text-[#c89666]">
                    {items.length} {language === 'es' ? 'opciones' : 'items'}
                  </span>
                </div>
                <p className="text-xs text-[#dfcfbe]/80 mt-0.5">
                  {language === 'es' ? category.taglineEs : category.taglineEn}
                </p>
                {category.id === 'tradicion-pan' && (
                  <div className="mt-2 text-[11px] text-[#c89666] font-mono flex items-center gap-1.5">
                    <Wheat className="w-3.5 h-3.5 text-[#d98236]" />
                    <span>
                      {language === 'es'
                        ? 'Opciones de pan: Pitufo Blanco / Integral, Pitufo Cereal, Baguetina Canteno y Espelta. Sin Gluten +0.90€'
                        : 'Bread choices: White/Wholewheat Pitufo, Cereal Pitufo, Rye & Spelt Baguette. Gluten-Free +0.90€'}
                    </span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    language={language}
                    onSelectItem={onSelectItem}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

    </section>
  );
};
