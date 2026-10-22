import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_ITEMS } from '../data/menuData';
import { CategoryId, Language, MenuItem } from '../types';
import {
  ArrowLeft,
  Wheat,
  Plus,
  Sparkles,
  LayoutGrid,
  X,
} from 'lucide-react';

interface MenuPageProps {
  language: Language;
  onBackToHome: () => void;
  onSelectItem: (item: MenuItem) => void;
  onOpenCart: () => void;
  cartCount: number;
}

export interface MosaicCategory {
  id: string;
  nameEs: string;
  nameEn: string;
  symbol: string;
  taglineEs: string;
  taglineEn: string;
  image: string;
  categoryIds: CategoryId[];
}

export const MOSAIC_CATEGORIES: MosaicCategory[] = [
  {
    id: 'bread',
    nameEs: 'Pan & Tostas',
    nameEn: 'Bread & Toasts',
    symbol: '🥖',
    taglineEs: 'Tradición en pan andaluz y tostas gourmet con aguacate',
    taglineEn: 'Traditional toasts, pitufos & avocado creations',
    image: '/assets/menu/huevo_revuelto_aguacate.webp',
    categoryIds: ['tradicion-pan', 'pan-adiccion'],
  },
  {
    id: 'croissan-dulces',
    nameEs: 'Croissants & Dulces',
    nameEn: 'Croissants & Pastries',
    symbol: '🥐',
    taglineEs: 'Bollería hojaldrada recién horneada y toque caliente',
    taglineEn: 'Flaky baked pastries, chocolate rolls & sweets',
    image: '/assets/menu/croissant_mantequilla.webp',
    categoryIds: ['croissan-dulces'],
  },
  {
    id: 'huevos-benedict',
    nameEs: 'Huevos Benedict',
    nameEn: 'Eggs Benedict',
    symbol: '🍳',
    taglineEs: 'Brioche tostado, huevos de granja poché y holandesa casera',
    taglineEn: 'Poached farm eggs on brioche with silky hollandaise',
    image: '/assets/menu/benedict_jamon_serrano.webp',
    categoryIds: ['huevos-benedict'],
  },
  {
    id: 'jamon',
    nameEs: 'Jamón Ibérico',
    nameEn: 'Iberian Ham Selection',
    symbol: '🥩',
    taglineEs: 'Jamón ibérico de cebo cortado fino con tomate fresco y AOVE',
    taglineEn: 'Thinly sliced cured Iberian ham with tomato & olive oil',
    image: '/assets/menu/jamon_cebo_iberico.webp',
    categoryIds: ['jamon-cebo'],
  },
  {
    id: 'platos',
    nameEs: 'Platos & Combos',
    nameEn: 'Brunch Plates & Mains',
    symbol: '🥘',
    taglineEs: 'Nuestra mítica tortilla española casera y platos combinados',
    taglineEn: 'Signature homemade Spanish omelette & brunch plates',
    image: '/assets/menu/tortilla_patata.webp',
    categoryIds: ['plato-combo'],
  },
  {
    id: 'tapas',
    nameEs: 'Tapas de la Casa',
    nameEn: 'Artisan Tapas',
    symbol: '🫒',
    taglineEs: 'Pulpo a la gallega, patatas bravas y recetas de San Pedro',
    taglineEn: 'Galician octopus, patatas bravas & seasonal savory bites',
    image: '/assets/menu/pulpo_gallega.webp',
    categoryIds: ['tapas'],
  },
  {
    id: 'coffe',
    nameEs: 'Café de Especialidad',
    nameEn: 'Specialty Coffee',
    symbol: '☕',
    taglineEs: 'Tueste arábica seleccionado, capuchinos de autor e infusiones',
    taglineEn: 'Selected arabica roast, signature cappuccinos & organic teas',
    image: '/assets/menu/cappuccino_la_kafeteria.webp',
    categoryIds: ['cafe-infusiones'],
  },
  {
    id: 'zumos-refrescos',
    nameEs: 'Zumos & Refrescos',
    nameEn: 'Juices & Soft Drinks',
    symbol: '🍹',
    taglineEs: 'Zumo recién exprimido, smoothies naturales y refrescos fríos',
    taglineEn: 'Freshly squeezed juices, cold smoothies & refreshing sodas',
    image: '/assets/menu/smoothie_martinete.webp',
    categoryIds: ['frutas-smoothies', 'refrescos'],
  },
  {
    id: 'cerveza-vinos',
    nameEs: 'Cerveza, Vinos & Drinks',
    nameEn: 'Beer, Wine & Drinks',
    symbol: '🍺',
    taglineEs: 'Cervezas heladas de Málaga, vinos andaluces y sangría casera',
    taglineEn: 'Chilled Malaga craft beers, regional wines & sangria',
    image: '/assets/menu/sangria_artesanal.webp',
    categoryIds: ['cerveza-vinos'],
  },
];

interface DishCardProps {
  item: MenuItem;
  language: Language;
  onSelectItem: (item: MenuItem) => void;
}

const DishCard: React.FC<DishCardProps> = ({ item, language, onSelectItem }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="rounded-2xl bg-[#231a15] border border-[#a66a38]/25 p-3.5 sm:p-4 flex gap-3 sm:gap-4 hover:border-[#d98236]/60 transition-colors hover:shadow-lg group"
    >
      {/* Item Image */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-[#1b1411] shrink-0 relative border border-[#a66a38]/20">
        <img
          src={item.image || 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=300&q=80'}
          alt={language === 'es' ? item.nameEs : item.nameEn}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
          loading="lazy"
        />
        {item.popular && (
          <div className="absolute top-1 left-1 bg-[#d98236] text-[#1b1411] p-0.5 rounded text-[9px] font-bold shadow">
            <Sparkles className="w-2.5 h-2.5" />
          </div>
        )}
      </div>

      {/* Item Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <h4 className="font-serif text-sm sm:text-base font-bold text-[#f7f1e5] group-hover:text-[#d98236] transition-colors leading-snug line-clamp-1">
            {language === 'es' ? item.nameEs : item.nameEn}
          </h4>

          <p className="mt-1 text-[11px] sm:text-xs text-[#dfcfbe]/80 leading-relaxed font-sans line-clamp-2">
            {language === 'es' ? item.descriptionEs : item.descriptionEn}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 mt-1.5 text-[9px] sm:text-[10px] font-mono text-[#c89666]">
            {item.tags?.includes('gluten_option') && (
              <span>🌾 {language === 'es' ? 'Opción Sin Gluten' : 'GF Available'}</span>
            )}
            {item.tags?.includes('vegetarian') && (
              <span>🌱 {language === 'es' ? 'Vegetariano' : 'Vegetarian'}</span>
            )}
            {item.tags?.includes('iberico') && (
              <span className="text-[#d98236] font-bold">🥩 Ibérico</span>
            )}
            {item.tags?.includes('homemade') && (
              <span>⭐ {language === 'es' ? 'Casero' : 'Homemade'}</span>
            )}
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-2 border-t border-[#a66a38]/15 flex items-center justify-between gap-2 mt-2">
          <div>
            {item.pricing.type === 'single' ? (
              <span className="font-mono text-base font-bold text-[#d98236]">
                {item.pricing.price.toFixed(2)}€
              </span>
            ) : item.pricing.type === 'bread_tiers' ? (
              <div className="text-[11px] font-mono">
                <span className="text-[#a66a38] text-[9px] block leading-none">
                  {language === 'es' ? 'Desde' : 'From'}
                </span>
                <span className="font-bold text-[#d98236] text-sm">
                  {item.pricing.prices.blancoIntegral.toFixed(2)}€ – {item.pricing.prices.baguetina.toFixed(2)}€
                </span>
              </div>
            ) : (
              <div className="text-[11px] font-mono">
                <span className="text-[#a66a38] text-[9px] block leading-none">
                  {language === 'es' ? 'Desde' : 'From'}
                </span>
                <span className="font-bold text-[#d98236] text-sm">
                  {item.pricing.prices[0]?.price.toFixed(2)}€
                </span>
              </div>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => onSelectItem(item)}
            className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-[#d98236] hover:bg-[#e69045] text-[#1b1411] font-bold text-xs flex items-center gap-1 transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={2.8} />
            <span>
              {item.pricing.type === 'single'
                ? (language === 'es' ? 'Añadir' : 'Add')
                : (language === 'es' ? 'Elegir' : 'Options')}
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export const MenuPage: React.FC<MenuPageProps> = ({
  language,
  onBackToHome,
  onSelectItem,
  onOpenCart,
  cartCount,
}) => {
  // Category opened in modal overlay when clicked from mosaic
  const [openedCategory, setOpenedCategory] = useState<MosaicCategory | null>(null);

  const getCategoryItems = (cat: MosaicCategory): MenuItem[] => {
    return MENU_ITEMS.filter((item) => cat.categoryIds.includes(item.category));
  };

  return (
    <div className="min-h-screen bg-[#1b1411] text-[#ede0d0] pb-24">
      
      {/* Top Banner Navigation */}
      <div className="sticky top-16 sm:top-20 z-30 bg-[#1b1411]/95 backdrop-blur-xl border-b border-[#a66a38]/25 py-3 px-4 sm:px-6 lg:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Back to Home Button */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={onBackToHome}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#231a15] hover:bg-[#2c211b] border border-[#a66a38]/30 text-[#ede0d0] hover:text-[#f7f1e5] text-xs font-semibold transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-[#d98236] group-hover:-translate-x-1 transition-transform" />
            <span>{language === 'es' ? 'Volver al Inicio' : 'Back to Home'}</span>
          </motion.button>

          {/* Page Badge */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#d98236] font-semibold bg-[#231a15] px-2.5 py-1 rounded-lg border border-[#d98236]/30">
              {language === 'es' ? 'Carta Oficial San Pedro' : 'Official Menu'}
            </span>
          </div>

          {/* Quick Ticket Badge if items added */}
          {cartCount > 0 && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onOpenCart}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#d98236] text-[#1b1411] font-bold text-xs shadow-md cursor-pointer hover:bg-[#e69045]"
            >
              <span>{language === 'es' ? 'Comanda' : 'Ticket'}</span>
              <span className="w-5 h-5 rounded-full bg-[#1b1411] text-[#f7f1e5] flex items-center justify-center text-[10px] font-mono">
                {cartCount}
              </span>
            </motion.button>
          )}

        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-12">
        
        {/* Editorial Page Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          {/* Brand Logo Avatar */}
          <div className="flex justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-xl shadow-[#d98236]/20 border border-[#a66a38]/40 bg-[#16100c] p-1">
              <img
                src="/assets/logo.webp"
                alt="La Kafeteria Logo"
                className="w-full h-full object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-[#c89666] font-mono flex items-center justify-center gap-1.5">
            <span>✨</span>
            <span>{language === 'es' ? 'Atelier Gastronómico San Pedro' : 'San Pedro Culinary Atelier'}</span>
            <span>✨</span>
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#f7f1e5] tracking-tight">
            {language === 'es' ? 'Menú & Carta Completa' : 'Full Atelier Menu'}
          </h1>

          <p className="text-xs sm:text-sm text-[#dfcfbe] leading-relaxed">
            {language === 'es'
              ? 'Toca cualquier categoría para abrir directamente sus platos con opciones y personalización. La carta completa se encuentra disponible abajo.'
              : 'Tap any category below to open its dishes directly. The complete menu is always displayed below.'}
          </p>
        </div>

        {/* 1. CATEGORIES MOSAIC (TWO COLUMNS - SHOWS FIRST AS REQUESTED) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-4 h-4 text-[#d98236]" />
            <h2 className="text-xs uppercase font-mono tracking-[0.25em] text-[#d98236] font-bold">
              {language === 'es' ? 'Categorías de la Carta' : 'Menu Categories'}
            </h2>
          </div>

          {/* 2-COLUMN MOSAIC GRID */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            {MOSAIC_CATEGORIES.map((cat, idx) => {
              const count = getCategoryItems(cat).length;
              // 9th card spans full width for a balanced 2-column aesthetic
              const isFullWidth = idx === 8;

              return (
                <motion.button
                  key={cat.id}
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ y: -3 }}
                  onClick={() => setOpenedCategory(cat)}
                  className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden text-left border transition-all cursor-pointer shadow-lg ${
                    isFullWidth ? 'col-span-2 h-44 sm:h-52' : 'h-48 sm:h-64'
                  } border-[#a66a38]/30 hover:border-[#d98236]`}
                >
                  {/* Category Image */}
                  <img
                    src={cat.image}
                    alt={language === 'es' ? cat.nameEs : cat.nameEn}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-85 group-hover:brightness-95"
                    loading="lazy"
                  />

                  {/* Dark Roastery Vignette Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120c09] via-[#120c09]/75 to-transparent" />
                  <div className="absolute inset-0 bg-[#1b1411]/20 group-hover:bg-transparent transition-colors" />

                  {/* Card Content Top: Symbol & Item Counter */}
                  <div className="absolute top-3 inset-x-3 sm:top-4 sm:inset-x-4 flex items-center justify-between pointer-events-none">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#1b1411]/85 backdrop-blur-md border border-[#a66a38]/35 flex items-center justify-center text-lg sm:text-2xl shadow-md">
                      {cat.symbol}
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-[#1b1411]/85 backdrop-blur-md border border-[#a66a38]/30 text-[10px] sm:text-xs font-mono text-[#c89666] shadow">
                      {count} {language === 'es' ? 'platos' : 'items'}
                    </span>
                  </div>

                  {/* Card Content Bottom: Title, Tagline & Open Prompt */}
                  <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 pointer-events-none space-y-1">
                    <h3 className="font-serif text-base sm:text-xl font-bold text-[#f7f1e5] group-hover:text-[#d98236] transition-colors leading-tight drop-shadow-md line-clamp-1">
                      {language === 'es' ? cat.nameEs : cat.nameEn}
                    </h3>
                    
                    <p className="text-[10px] sm:text-xs text-[#dfcfbe]/85 line-clamp-2 leading-relaxed drop-shadow">
                      {language === 'es' ? cat.taglineEs : cat.taglineEn}
                    </p>

                    <div className="pt-1 flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-[#d98236] font-semibold">
                      <span>{language === 'es' ? 'Abrir categoría' : 'Open category'}</span>
                      <span>→</span>
                    </div>
                  </div>

                </motion.button>
              );
            })}
          </div>
        </div>

        {/* 2. THE WHOLE MENU (DISPLAYED ALL THE TIME AS REQUESTED) */}
        <div className="pt-6 space-y-12">
          
          <div className="flex items-center justify-between border-b border-[#a66a38]/25 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#d98236]" />
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f7f1e5] tracking-tight">
                {language === 'es' ? 'Toda la Carta y Especialidades' : 'Complete Menu & Dishes'}
              </h2>
            </div>
            <span className="text-xs font-mono text-[#c89666]">
              {MENU_ITEMS.length} {language === 'es' ? 'platos y bebidas' : 'dishes & drinks'}
            </span>
          </div>

          {/* ALL 9 CATEGORIES DISPLAYED CONTINUOUSLY */}
          {MOSAIC_CATEGORIES.map((cat) => {
            const items = getCategoryItems(cat);

            return (
              <section key={cat.id} id={`category-${cat.id}`} className="space-y-4">
                
                {/* Category Header */}
                <div className="flex items-center justify-between border-b border-[#a66a38]/20 pb-2.5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl">{cat.symbol}</span>
                    <div>
                      <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#f7f1e5]">
                        {language === 'es' ? cat.nameEs : cat.nameEn}
                      </h3>
                      <p className="text-xs text-[#dfcfbe]/80">
                        {language === 'es' ? cat.taglineEs : cat.taglineEn}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#c89666] shrink-0">
                    {items.length} {language === 'es' ? 'platos' : 'items'}
                  </span>
                </div>

                {/* Bread varieties info banner */}
                {cat.id === 'bread' && (
                  <div className="p-3 rounded-xl bg-[#231a15] border border-[#a66a38]/30 flex items-center gap-2 text-xs text-[#dfcfbe]">
                    <Wheat className="w-4 h-4 text-[#d98236] shrink-0" />
                    <span>
                      {language === 'es'
                        ? 'Variedades de pan: Pitufo Blanco / Integral, Pitufo Cereal, Baguetina Canteno y Espelta. Opción Pan Sin Gluten (+0.90€).'
                        : 'Bread varieties: White / Wholewheat Pitufo, Cereal Seeded Pitufo, Rye & Spelt Baguette. Gluten-Free Bread (+0.90€).'}
                    </span>
                  </div>
                )}

                {/* Dishes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map((item) => (
                    <DishCard
                      key={item.id}
                      item={item}
                      language={language}
                      onSelectItem={onSelectItem}
                    />
                  ))}
                </div>

              </section>
            );
          })}

        </div>

      </div>

      {/* 3. CATEGORY MODAL: OPENS DIRECTLY WHEN CLICKING A MOSAIC CATEGORY (NO SCROLLING DOWN) */}
      <AnimatePresence>
        {openedCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenedCategory(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className="relative w-full max-w-4xl max-h-[88vh] bg-[#1b1411] border border-[#a66a38]/40 rounded-3xl overflow-hidden flex flex-col shadow-2xl z-10"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-[#a66a38]/30 bg-[#231a15] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#1b1411] border border-[#a66a38]/40 flex items-center justify-center text-2xl shrink-0">
                    {openedCategory.symbol}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#f7f1e5] truncate">
                      {language === 'es' ? openedCategory.nameEs : openedCategory.nameEn}
                    </h3>
                    <p className="text-xs text-[#dfcfbe]/80 truncate">
                      {language === 'es' ? openedCategory.taglineEs : openedCategory.taglineEn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono text-[#c89666] hidden sm:inline">
                    {getCategoryItems(openedCategory).length} {language === 'es' ? 'platos' : 'items'}
                  </span>
                  <button
                    onClick={() => setOpenedCategory(null)}
                    aria-label="Cerrar categoría"
                    className="w-9 h-9 rounded-xl bg-[#1b1411] hover:bg-[#2c211b] border border-[#a66a38]/30 text-[#f7f1e5] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body: Dishes of this Category */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
                {openedCategory.id === 'bread' && (
                  <div className="p-3 rounded-xl bg-[#231a15] border border-[#a66a38]/30 flex items-center gap-2 text-xs text-[#dfcfbe]">
                    <Wheat className="w-4 h-4 text-[#d98236] shrink-0" />
                    <span>
                      {language === 'es'
                        ? 'Variedades de pan: Pitufo Blanco / Integral, Pitufo Cereal, Baguetina Canteno y Espelta. Pan Sin Gluten (+0.90€).'
                        : 'Bread varieties: White / Wholewheat Pitufo, Cereal Seeded Pitufo, Rye & Spelt Baguette. Gluten-Free (+0.90€).'}
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getCategoryItems(openedCategory).map((item) => (
                    <DishCard
                      key={item.id}
                      item={item}
                      language={language}
                      onSelectItem={onSelectItem}
                    />
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-3 sm:p-4 border-t border-[#a66a38]/20 bg-[#1b1411] flex items-center justify-between text-xs font-mono text-[#c89666]">
                <span>{language === 'es' ? 'Pulsa fuera o en ✕ para volver' : 'Click outside or ✕ to close'}</span>
                <button
                  onClick={() => setOpenedCategory(null)}
                  className="px-4 py-1.5 rounded-xl bg-[#d98236] hover:bg-[#e69045] text-[#1b1411] font-bold text-xs cursor-pointer transition-colors"
                >
                  {language === 'es' ? 'Listo' : 'Done'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
