import React from 'react';
import { motion } from 'motion/react';
import { MenuItem, Language } from '../types';
import { Plus, Sparkles, Wheat } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  language: Language;
  onSelectItem: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  language,
  onSelectItem,
}) => {
  const isBreadTier = item.pricing.type === 'bread_tiers';
  const isSizes = item.pricing.type === 'sizes';

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group relative rounded-2xl bg-[#231a15] border border-[#a66a38]/25 p-4 sm:p-5 flex flex-col justify-between hover:border-[#d98236]/60 transition-colors hover:shadow-xl hover:shadow-[#d98236]/5"
    >
      {/* Top Details with Thumbnail Image */}
      <div>
        {/* Item Image Preview Thumbnail */}
        {item.image && (
          <div className="w-full h-36 rounded-xl overflow-hidden bg-[#1b1411] mb-3 relative border border-[#a66a38]/20">
            <img
              src={item.image}
              alt={language === 'es' ? item.nameEs : item.nameEn}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            {item.popular && (
              <div className="absolute top-2 left-2 bg-[#d98236] text-[#1b1411] px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1 shadow">
                <Sparkles className="w-3 h-3" />
                <span>{language === 'es' ? 'Favorito' : 'Popular'}</span>
              </div>
            )}
          </div>
        )}

        {/* Unboxed Metadata & Dietary Indicators (Zero-Pill Discipline) */}
        <div className="flex flex-wrap items-center gap-1.5 text-[10px] sm:text-[11px] text-[#c89666] font-mono mb-1.5">
          {item.tags?.includes('gluten_option') && (
            <span className="flex items-center gap-1 text-[#c89666]">
              <Wheat className="w-3 h-3 text-[#d98236]" />
              {language === 'es' ? 'Opción Sin Gluten' : 'Gluten-Free Opt.'}
            </span>
          )}
          {item.tags?.includes('gluten_option') && item.tags?.includes('vegetarian') && <span>·</span>}
          {item.tags?.includes('vegetarian') && (
            <span>🌱 {language === 'es' ? 'Vegetariano' : 'Vegetarian'}</span>
          )}
          {item.tags?.includes('iberico') && (
            <span className="text-[#d98236] font-semibold">🥩 {language === 'es' ? 'Ibérico' : 'Iberian'}</span>
          )}
          {item.tags?.includes('homemade') && (
            <span>⭐ {language === 'es' ? 'Casero' : 'Homemade'}</span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#f7f1e5] tracking-tight group-hover:text-[#d98236] transition-colors leading-snug">
          {language === 'es' ? item.nameEs : item.nameEn}
        </h3>

        {/* Description */}
        <p className="mt-1.5 text-xs sm:text-sm text-[#dfcfbe]/90 leading-relaxed font-sans line-clamp-2">
          {language === 'es' ? item.descriptionEs : item.descriptionEn}
        </p>
      </div>

      {/* Bottom Pricing & Action Section */}
      <div className="mt-4 pt-3 border-t border-[#a66a38]/15">
        
        {/* If Bread Tiers */}
        {isBreadTier && item.pricing.type === 'bread_tiers' && (
          <div className="mb-3">
            <span className="text-[10px] uppercase tracking-wider text-[#a66a38] font-mono block mb-1.5">
              {language === 'es' ? 'Opciones de pan:' : 'Available breads:'}
            </span>
            <div className="grid grid-cols-3 gap-1.5 text-center text-[11px] font-mono">
              <div className="bg-[#1b1411]/70 border border-[#a66a38]/20 rounded-md p-1.5">
                <span className="block text-[9px] text-[#c89666] truncate">Pitufo</span>
                <span className="font-bold text-[#f7f1e5]">
                  {item.pricing.prices.blancoIntegral.toFixed(2)}€
                </span>
              </div>
              <div className="bg-[#1b1411]/70 border border-[#a66a38]/20 rounded-md p-1.5">
                <span className="block text-[9px] text-[#c89666] truncate">Cereal</span>
                <span className="font-bold text-[#f7f1e5]">
                  {item.pricing.prices.cereal.toFixed(2)}€
                </span>
              </div>
              <div className="bg-[#1b1411]/70 border border-[#a66a38]/20 rounded-md p-1.5">
                <span className="block text-[9px] text-[#c89666] truncate">Baguetina</span>
                <span className="font-bold text-[#f7f1e5]">
                  {item.pricing.prices.baguetina.toFixed(2)}€
                </span>
              </div>
            </div>
          </div>
        )}

        {/* If Multi-Sizes */}
        {isSizes && item.pricing.type === 'sizes' && (
          <div className="mb-3">
            <span className="text-[10px] uppercase tracking-wider text-[#a66a38] font-mono block mb-1.5">
              {language === 'es' ? 'Tamaños / Opciones:' : 'Sizes / Options:'}
            </span>
            <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
              {item.pricing.prices.map((sp, idx) => (
                <div
                  key={idx}
                  className="bg-[#1b1411]/70 border border-[#a66a38]/20 rounded-md px-2 py-1 flex items-center justify-between gap-2"
                >
                  <span className="text-[10px] text-[#c89666]">
                    {language === 'es' ? sp.labelEs : sp.labelEn}
                  </span>
                  <span className="font-bold text-[#f7f1e5]">
                    {sp.price.toFixed(2)}€
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Price Line and Add Button */}
        <div className="flex items-center justify-between gap-2">
          <div>
            {item.pricing.type === 'single' ? (
              <div className="flex items-baseline gap-1">
                <span className="text-xl sm:text-2xl font-bold font-mono text-[#d98236]">
                  {item.pricing.price.toFixed(2)}€
                </span>
                <span className="text-[10px] text-[#a66a38] font-mono">IVA incl.</span>
              </div>
            ) : (
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-[#a66a38] font-mono">
                  {language === 'es' ? 'Desde' : 'From'}
                </span>
                <span className="text-lg sm:text-xl font-bold font-mono text-[#d98236]">
                  {isBreadTier && item.pricing.type === 'bread_tiers'
                    ? item.pricing.prices.blancoIntegral.toFixed(2)
                    : isSizes && item.pricing.type === 'sizes'
                    ? Math.min(...item.pricing.prices.map((p) => p.price)).toFixed(2)
                    : ''}
                  €
                </span>
              </div>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => onSelectItem(item)}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-[#d98236] hover:bg-[#e69045] text-[#1b1411] font-semibold text-xs sm:text-sm transition-colors shadow-md shadow-[#d98236]/20 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={3} />
            <span>
              {isBreadTier || isSizes
                ? (language === 'es' ? 'Elegir' : 'Options')
                : (language === 'es' ? 'Añadir' : 'Add')}
            </span>
          </motion.button>
        </div>

      </div>

    </motion.div>
  );
};
