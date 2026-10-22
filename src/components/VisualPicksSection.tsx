import React from 'react';
import { motion } from 'motion/react';
import { MenuItem, Language } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { Plus } from 'lucide-react';

interface VisualPicksSectionProps {
  language: Language;
  onSelectItem: (item: MenuItem) => void;
  onOpenMenuPage: () => void;
}

interface HighlightDish {
  id: string;
  menuItemId: string;
  nameEs: string;
  nameEn: string;
  portion: string;
  priceDisplay: string;
  descEs: string;
  descEn: string;
  image: string;
}

const HIGHLIGHT_DISHES: HighlightDish[] = [
  {
    id: 'highlight-1',
    menuItemId: 'trad-aceite-tomate',
    nameEs: 'Tostada de Aceite y Tomate de la Huerta',
    nameEn: 'Andalusian Vine Tomato & EVOO Toast',
    portion: '300 gr.',
    priceDisplay: '3.80€',
    descEs: 'Tomate pera de huerta andaluza rallado al momento sobre pan rústico crujiente con aceite de oliva virgen extra de Jaén y flor de sal.',
    descEn: 'Freshly grated Andalusian vine tomato over artisan crusty toast drizzled with cold-pressed Jaén extra virgin olive oil and sea salt crystals.',
    image: '/assets/menu/tostada_aceite_tomate.webp',
  },
  {
    id: 'highlight-2',
    menuItemId: 'benedict-jamon-serrano',
    nameEs: 'Huevos Benedict con Jamón Serrano',
    nameEn: 'Serrano Ham Eggs Benedict Atelier',
    portion: '330 gr.',
    priceDisplay: '9.00€',
    descEs: 'Huevos de campo poché con yema cremosa, finas lonchas de jamón serrano reserva y salsa holandesa casera templada sobre brioche tostado.',
    descEn: 'Farm poached eggs with runny golden yolk, delicate Serrano ham ribbons, and scratch-made warm hollandaise over toasted artisan brioche.',
    image: '/assets/menu/benedict_jamon_serrano.webp',
  },
  {
    id: 'highlight-3',
    menuItemId: 'esp-huevo-revuelto-aguacate-brava',
    nameEs: 'Aguacate Hass & Huevo con Brava',
    nameEn: 'Hass Avocado & Scrambled Brava',
    portion: '350 gr.',
    priceDisplay: '5.50€',
    descEs: 'Aguacate maduro de la Axarquía malagueña, huevos revueltos cremosos, y reducción de salsa brava artesanal de la casa.',
    descEn: 'Ripe Malaga Hass avocado, creamy folded scrambled eggs, and secret homemade smoked brava reduction with de la Vera paprika.',
    image: '/assets/menu/huevo_revuelto_aguacate.webp',
  },
];

export const VisualPicksSection: React.FC<VisualPicksSectionProps> = ({
  language,
  onSelectItem,
  onOpenMenuPage,
}) => {
  const handleItemClick = (dish: HighlightDish) => {
    const fullItem = MENU_ITEMS.find((m) => m.id === dish.menuItemId);
    if (fullItem) {
      onSelectItem(fullItem);
    }
  };

  return (
    <section id="picks" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-b border-[#a66a38]/20">
      
      {/* SECTION TOP HEADER: Decorative glyph banner + Headline & Subtitle on left, [ VER MENÚ ] button on right */}
      <div className="space-y-4 mb-14 sm:mb-20">
        
        {/* Decorative Glyph Header (Matching the `>< НАШЕТО СПЕЦИАЛНО МЕНЮ ><` in image.png) */}
        <div className="flex items-center gap-3 text-[#d98236] font-mono text-xs uppercase tracking-[0.25em]">
          <span className="text-[#a66a38]">{'><'}</span>
          <span className="font-semibold">
            {language === 'es' ? 'NUESTRA SELECCIÓN ESPECIAL' : 'OUR SPECIAL SELECTION'}
          </span>
          <span className="text-[#a66a38]">{'><'}</span>
        </div>

        {/* Headline + Subhead Row with Right Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f7f1e5] tracking-tight">
              {language === 'es' ? 'Disfruta de cada momento' : 'Enjoy every single moment'}
            </h2>
            <p className="text-xs sm:text-sm text-[#dfcfbe]/80 leading-relaxed font-sans max-w-xl">
              {language === 'es'
                ? 'Nuestra selección de platos favoritos preparados al momento para cualquier instante del día. Desde desayunos tradicionales andaluces hasta brunch y tapas selectas.'
                : 'Our curated selection of signature dishes prepared fresh to order at any time of day. From traditional Andalusian toasts to artisanal brunch plates.'}
            </p>
          </div>

          {/* Bordered Button: [ VER MENÚ ] (Matching the exact rectangular outline button `[ ВИЖ МЕНЮТО ]` in image.png) */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={onOpenMenuPage}
            className="self-start md:self-auto shrink-0 px-6 py-3 border border-[#d98236]/70 hover:border-[#d98236] bg-transparent hover:bg-[#231a15] text-[#f7f1e5] font-mono text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer shadow-lg hover:shadow-[#d98236]/10"
          >
            {language === 'es' ? 'Ver Menú' : 'View Menu'}
          </motion.button>
        </div>

      </div>

      {/* 3-COLUMN CIRCULAR DISH GRID (Exact layout from image.png) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 lg:gap-14">
        {HIGHLIGHT_DISHES.map((dish) => (
          <div
            key={dish.id}
            className="flex flex-col justify-between group space-y-6"
          >
            {/* Centered Circular Plate Presentation */}
            <div className="flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                onClick={() => handleItemClick(dish)}
                className="w-56 h-56 sm:w-64 sm:h-64 rounded-full p-1.5 bg-gradient-to-tr from-[#3e2e25] via-[#a66a38]/40 to-[#d98236]/30 shadow-2xl shadow-black/80 cursor-pointer overflow-hidden relative"
              >
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#1b1411]">
                  <img
                    src={dish.image}
                    alt={language === 'es' ? dish.nameEs : dish.nameEn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-95"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </div>

            {/* Dish Metadata (Exact text layout: Title left, Weight right, Price below, Ingredients paragraph) */}
            <div className="space-y-2">
              
              {/* Row 1: Title and Portion */}
              <div className="flex items-baseline justify-between gap-3 border-b border-[#a66a38]/20 pb-2">
                <h3 
                  onClick={() => handleItemClick(dish)}
                  className="font-serif text-lg sm:text-xl font-bold text-[#f7f1e5] group-hover:text-[#d98236] transition-colors leading-snug cursor-pointer"
                >
                  {language === 'es' ? dish.nameEs : dish.nameEn}
                </h3>
                <span className="font-mono text-xs text-[#a66a38] shrink-0 font-medium">
                  {dish.portion}
                </span>
              </div>

              {/* Row 2: Price in Caramel Accent */}
              <div>
                <span className="font-mono text-base font-bold text-[#d98236]">
                  {dish.priceDisplay}
                </span>
              </div>

              {/* Row 3: Detailed Description */}
              <p className="text-xs text-[#dfcfbe]/80 leading-relaxed font-sans pt-1">
                {language === 'es' ? dish.descEs : dish.descEn}
              </p>

              {/* Row 4: Quick Order Action */}
              <div className="pt-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleItemClick(dish)}
                  className="w-full py-2 px-3 rounded-lg bg-[#231a15] hover:bg-[#2c211b] border border-[#a66a38]/30 hover:border-[#d98236] text-[#ede0d0] hover:text-[#f7f1e5] text-xs font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#d98236]" />
                  <span>{language === 'es' ? 'Añadir a la Comanda' : 'Add to Order'}</span>
                </motion.button>
              </div>

            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
