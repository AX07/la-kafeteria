import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem, SelectedItemOption, Language } from '../types';
import { BREAD_OPTIONS_INFO } from '../data/menuData';
import { X, Plus, Minus, Check, Wheat, Coffee } from 'lucide-react';

interface ItemCustomizerModalProps {
  item: MenuItem | null;
  language: Language;
  onClose: () => void;
  onAddToCart: (item: MenuItem, option: SelectedItemOption, unitPrice: number, quantity: number) => void;
}

export const ItemCustomizerModal: React.FC<ItemCustomizerModalProps> = ({
  item,
  language,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const isBreadTier = item.pricing.type === 'bread_tiers';
  const isSizes = item.pricing.type === 'sizes';
  const isCoffeeOrTea = item.category === 'cafe-infusiones';

  // State
  const [breadType, setBreadType] = useState<'blanco_integral' | 'cereal' | 'baguetina'>('blanco_integral');
  const [isGlutenFree, setIsGlutenFree] = useState<boolean>(false);
  const [sizeIndex, setSizeIndex] = useState<number>(0);
  const [milkType, setMilkType] = useState<string>('Entera');
  const [drinkTemperature, setDrinkTemperature] = useState<string>('Caliente');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  // Compute Unit Price
  let basePrice = 0;
  if (item.pricing.type === 'single') {
    basePrice = item.pricing.price;
  } else if (item.pricing.type === 'bread_tiers') {
    if (breadType === 'blanco_integral') basePrice = item.pricing.prices.blancoIntegral;
    else if (breadType === 'cereal') basePrice = item.pricing.prices.cereal;
    else if (breadType === 'baguetina') basePrice = item.pricing.prices.baguetina;
  } else if (item.pricing.type === 'sizes') {
    basePrice = item.pricing.prices[sizeIndex]?.price || 0;
  }

  // Addons
  let extras = 0;
  if (isGlutenFree) extras += 0.90;
  if (isCoffeeOrTea && ['Avena (+0.30€)', 'Soja (+0.30€)', 'Almendra (+0.30€)'].includes(milkType)) {
    extras += 0.30;
  }

  const finalUnitPrice = basePrice + extras;
  const totalPrice = finalUnitPrice * quantity;

  const handleConfirm = () => {
    const selectedOption: SelectedItemOption = {
      breadType: isBreadTier ? breadType : undefined,
      isGlutenFree: isGlutenFree ? true : undefined,
      sizeIndex: isSizes ? sizeIndex : undefined,
      milkType: isCoffeeOrTea ? milkType : undefined,
      drinkTemperature: isCoffeeOrTea ? drinkTemperature : undefined,
      specialInstructions: specialInstructions.trim() ? specialInstructions.trim() : undefined,
    };

    onAddToCart(item, selectedOption, finalUnitPrice, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal Surface with Spring Physics */}
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 15 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        className="w-full max-w-lg bg-[#2c211b] border border-[#a66a38]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#a66a38]/25 flex items-start justify-between bg-[#231a15]">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#c89666] block mb-1">
              {language === 'es' ? 'Personalizar Elección' : 'Customize Item'}
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#f7f1e5]">
              {language === 'es' ? item.nameEs : item.nameEn}
            </h2>
            <p className="mt-1 text-xs text-[#dfcfbe]">
              {language === 'es' ? item.descriptionEs : item.descriptionEn}
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1b1411] hover:bg-[#382b23] text-[#c89666] hover:text-[#f7f1e5] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Modal Body / Scrollable Controls */}
        <div className="p-4 sm:p-5 space-y-5 overflow-y-auto">
          {/* Bread Tiers Selector */}
          {isBreadTier && item.pricing.type === 'bread_tiers' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-[#f7f1e5] uppercase font-mono tracking-wider flex items-center gap-1.5">
                  <Wheat className="w-3.5 h-3.5 text-[#d98236]" />
                  {language === 'es' ? 'Selecciona Tipo de Pan:' : 'Select Bread Variety:'}
                </label>
                <span className="text-[11px] text-[#c89666] font-mono">
                  {language === 'es' ? 'Obligatorio' : 'Required'}
                </span>
              </div>

              <div className="space-y-2">
                {BREAD_OPTIONS_INFO.map((bread) => {
                  const bPrice =
                    bread.id === 'blanco_integral'
                      ? item.pricing.type === 'bread_tiers' && item.pricing.prices.blancoIntegral
                      : bread.id === 'cereal'
                      ? item.pricing.type === 'bread_tiers' && item.pricing.prices.cereal
                      : item.pricing.type === 'bread_tiers' && item.pricing.prices.baguetina;

                  const isSelected = breadType === bread.id;

                  return (
                    <motion.button
                      key={bread.id}
                      type="button"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setBreadType(bread.id as any)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-[#d98236]/15 border-[#d98236] text-[#f7f1e5]'
                          : 'bg-[#231a15] border-[#a66a38]/25 text-[#dfcfbe] hover:border-[#a66a38]/60'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-[#d98236] bg-[#d98236]' : 'border-[#a66a38]'
                            }`}
                          >
                            {isSelected && <Check className="w-2.5 h-2.5 text-[#1b1411]" strokeWidth={3} />}
                          </span>
                          <span className="font-semibold text-sm">
                            {language === 'es' ? bread.nameEs : bread.nameEn}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#a66a38] mt-1 pl-6">
                          {language === 'es' ? bread.descEs : bread.descEn}
                        </p>
                      </div>

                      <span className="font-mono text-sm font-bold text-[#d98236] shrink-0 pl-2">
                        {Number(bPrice).toFixed(2)}€
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Gluten Free Checkbox */}
              <div className="mt-3">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsGlutenFree(!isGlutenFree)}
                  className={`w-full p-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    isGlutenFree
                      ? 'bg-[#d98236]/20 border-[#d98236] text-[#f7f1e5]'
                      : 'bg-[#231a15] border-[#a66a38]/25 text-[#dfcfbe] hover:border-[#a66a38]/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-4 h-4 rounded border flex items-center justify-center ${
                        isGlutenFree ? 'border-[#d98236] bg-[#d98236]' : 'border-[#a66a38]'
                      }`}
                    >
                      {isGlutenFree && <Check className="w-2.5 h-2.5 text-[#1b1411]" strokeWidth={3} />}
                    </span>
                    <span className="text-xs font-medium">
                      🌾 {language === 'es' ? 'Elaborar con Pan Sin Gluten Certificado' : 'Make with Certified Gluten-Free Bread'}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#c89666]">+0.90€</span>
                </motion.button>
              </div>
            </div>
          )}

          {/* Multi Size Selector */}
          {isSizes && item.pricing.type === 'sizes' && (
            <div>
              <label className="text-xs font-semibold text-[#f7f1e5] uppercase font-mono tracking-wider block mb-2">
                {language === 'es' ? 'Selecciona Tamaño / Formato:' : 'Select Size / Format:'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {item.pricing.prices.map((sz, idx) => {
                  const isSelected = sizeIndex === idx;
                  return (
                    <motion.button
                      key={idx}
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSizeIndex(idx)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#d98236]/20 border-[#d98236] text-[#f7f1e5]'
                          : 'bg-[#231a15] border-[#a66a38]/25 text-[#dfcfbe] hover:border-[#a66a38]/60'
                      }`}
                    >
                      <span className="block text-xs font-semibold">
                        {language === 'es' ? sz.labelEs : sz.labelEn}
                      </span>
                      <span className="block font-mono text-sm font-bold text-[#d98236] mt-1">
                        {sz.price.toFixed(2)}€
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Coffee Options (Milk, Temperature) */}
          {isCoffeeOrTea && (
            <div className="space-y-4 pt-2 border-t border-[#a66a38]/20">
              <div>
                <label className="text-xs font-semibold text-[#f7f1e5] uppercase font-mono tracking-wider flex items-center gap-1.5 mb-2">
                  <Coffee className="w-3.5 h-3.5 text-[#d98236]" />
                  {language === 'es' ? 'Tipo de Leche:' : 'Choice of Milk:'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {['Entera', 'Desnatada', 'Sin Lactosa', 'Avena (+0.30€)', 'Soja (+0.30€)', 'Almendra (+0.30€)'].map((m) => (
                    <motion.button
                      key={m}
                      type="button"
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setMilkType(m)}
                      className={`py-2 px-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                        milkType === m
                          ? 'bg-[#d98236] text-[#1b1411] font-semibold border-[#d98236]'
                          : 'bg-[#231a15] border-[#a66a38]/25 text-[#ede0d0] hover:border-[#a66a38]/60'
                      }`}
                    >
                      {m}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#f7f1e5] uppercase font-mono tracking-wider block mb-2">
                  {language === 'es' ? 'Temperatura & Hielo:' : 'Temperature:'}
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {['Caliente', 'Templado', 'Con Hielo (Ice)'].map((t) => (
                    <motion.button
                      key={t}
                      type="button"
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setDrinkTemperature(t)}
                      className={`py-2 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                        drinkTemperature === t
                          ? 'bg-[#c89666] text-[#1b1411] font-semibold border-[#c89666]'
                          : 'bg-[#231a15] border-[#a66a38]/25 text-[#ede0d0] hover:border-[#a66a38]/60'
                      }`}
                    >
                      {t}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Special Instructions Input */}
          <div>
            <label className="text-xs font-semibold text-[#f7f1e5] uppercase font-mono tracking-wider block mb-1.5">
              {language === 'es' ? 'Peticiones Especiales (Opcional):' : 'Special Notes (Optional):'}
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder={language === 'es' ? 'Ej: poco tostado, sin sal, sacarina aparte...' : 'e.g., lightly toasted, no salt, sweetener on side...'}
              className="w-full bg-[#231a15] border border-[#a66a38]/30 rounded-lg px-3 py-2 text-xs text-[#ede0d0] placeholder-[#a66a38] focus:outline-none focus:border-[#d98236]"
              maxLength={120}
            />
          </div>

          {/* Quantity Selector */}
          <div className="pt-2 border-t border-[#a66a38]/20 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#f7f1e5] uppercase font-mono tracking-wider">
              {language === 'es' ? 'Cantidad:' : 'Quantity:'}
            </span>
            <div className="flex items-center gap-3 bg-[#231a15] border border-[#a66a38]/30 rounded-lg p-1">
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-md bg-[#1b1411] text-[#ede0d0] flex items-center justify-center hover:bg-[#382b23] transition-colors cursor-pointer"
                disabled={quantity <= 1}
              >
                <Minus className="w-3.5 h-3.5" />
              </motion.button>
              <span className="font-mono font-bold text-base text-[#f7f1e5] w-6 text-center">
                {quantity}
              </span>
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-md bg-[#1b1411] text-[#ede0d0] flex items-center justify-center hover:bg-[#382b23] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Modal Footer / Add to Order CTA */}
        <div className="p-4 sm:p-5 border-t border-[#a66a38]/25 bg-[#231a15] flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#a66a38] block">
              {language === 'es' ? 'Total selección:' : 'Selection Total:'}
            </span>
            <span className="font-mono text-2xl font-bold text-[#d98236]">
              {totalPrice.toFixed(2)}€
            </span>
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={handleConfirm}
            className="flex-1 max-w-xs py-3 px-5 rounded-xl bg-[#d98236] hover:bg-[#e69045] text-[#1b1411] font-bold text-sm shadow-lg shadow-[#d98236]/25 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" strokeWidth={3} />
            <span>{language === 'es' ? 'Añadir a la Comanda' : 'Add to Order'}</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
