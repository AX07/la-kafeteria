import React, { useState } from 'react';
import { Language, MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { Sparkles, X, Coffee, Check, Plus, ArrowRight, Compass } from 'lucide-react';

interface AiBaristaModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onQuickAddItem: (item: MenuItem) => void;
}

interface CuratedPairing {
  id: string;
  titleEs: string;
  titleEn: string;
  badgeEs: string;
  badgeEn: string;
  descEs: string;
  descEn: string;
  itemIds: string[];
}

const CURATED_PAIRINGS: CuratedPairing[] = [
  {
    id: 'malagueno-castizo',
    titleEs: 'El Clásico Malagueño Castizo',
    titleEn: 'The Classic Malaga Tradition',
    badgeEs: 'Tradición Pura',
    badgeEn: 'Pure Tradition',
    descEs: 'Pitufo blanco crujiente con tomate pera fresco y AOVE, café con leche equilibrado y zumo de naranja natural recién exprimido.',
    descEn: 'Traditional crusty white pitufo with grated tomato & EVOO, creamy café con leche and cold-pressed orange juice.',
    itemIds: ['trad-aceite-tomate', 'cafe-con-leche', 'refresco-zumo-naranja-natural'],
  },
  {
    id: 'power-brunch',
    titleEs: 'San Pedro Power Brunch',
    titleEn: 'San Pedro Power Brunch Royale',
    badgeEs: 'Gourmet Atelier',
    badgeEn: 'Atelier Gourmet',
    descEs: 'Huevos Benedict con salmón ahumado nórdico y holandesa casera, acompañado del smoothie verde alcalino Green Goblin.',
    descEn: 'Smoked salmon eggs benedict with warm homemade hollandaise paired with our alkalizing Green Goblin detox smoothie.',
    itemIds: ['benedict-salmon', 'smoothie-green-goblin', 'dulce-roll-canela'],
  },
  {
    id: 'fitness-avocado',
    titleEs: 'Proteico & Aguacate Especial',
    titleEn: 'Protein & Fresh Avocado Vitality',
    badgeEs: 'Saludable & Vital',
    badgeEn: 'Healthy & Vital',
    descEs: 'Tostada de huevo revuelto con aguacate y salsa brava artesana, combinada con smoothie antioxidante Martinete y café cortado.',
    descEn: 'Scrambled eggs toast with fresh avocado and artisan brava sauce, berry antioxidant smoothie and rich cortado.',
    itemIds: ['esp-huevo-revuelto-aguacate-brava', 'smoothie-martinete', 'cafe-cortado'],
  },
  {
    id: 'iberico-lujo',
    titleEs: 'Homenaje Ibérico de Cebo',
    titleEn: 'Iberian Cebo Ham Feast',
    badgeEs: 'Selección Bodega',
    badgeEn: 'Cellar Selection',
    descEs: 'Baguetina de centeno y espelta con jamón de cebo al estilo andaluz, café espresso arábica y copa de sangría artesanal.',
    descEn: 'Artisan rye & spelt baguette with sliced Iberian cebo ham, single espresso and freshly crafted fruit sangria.',
    itemIds: ['jamon-tostada-estilo-andaluz', 'cafe-solo', 'vino-copa-sangria'],
  },
  {
    id: 'tapeo-sol',
    titleEs: 'Tapeo Mediodía al Sol',
    titleEn: 'Sunshine Tapas Hour',
    badgeEs: 'Aperitivo Andaluz',
    badgeEn: 'Andalusian Aperitif',
    descEs: 'Patatas bravas caseras con pimentón de la Vera, albóndigas en salsa y tercio de cerveza Victoria bien helado.',
    descEn: 'Signature spicy patatas bravas, slow-cooked meatballs and an ice-cold bottle of Malaga’s own Victoria lager.',
    itemIds: ['tapa-patatas-bravas', 'tapa-albondigas-salsa', 'cerveza-victoria'],
  },
];

export const AiBaristaModal: React.FC<AiBaristaModalProps> = ({
  isOpen,
  onClose,
  language,
  onQuickAddItem,
}) => {
  const [selectedPairing, setSelectedPairing] = useState<CuratedPairing>(CURATED_PAIRINGS[0]);
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [aiRecommendedItems, setAiRecommendedItems] = useState<MenuItem[]>([]);

  if (!isOpen) return null;

  const handleAskAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;

    const q = customQuestion.toLowerCase();
    let recs: MenuItem[] = [];
    let responseText = '';

    if (q.includes('gluten') || q.includes('celiac')) {
      recs = MENU_ITEMS.filter((i) => i.tags?.includes('gluten_option')).slice(0, 3);
      responseText =
        language === 'es'
          ? 'Para opción sin gluten, te recomendamos pedir cualquiera de nuestras tostadas en pan sin gluten certificado (+0.90€), como la de Salmón Ahumado con Philadelphia o Jamón de Cebo, acompañado de un Zumo Natural o Latte.'
          : 'For gluten-free options, we prepare all our signature toasts on certified gluten-free artisan bread (+0.90€). Try Smoked Salmon with Philadelphia or Iberian Ham, paired with fresh OJ or Latte.';
    } else if (q.includes('dulce') || q.includes('sweet') || q.includes('chocolate') || q.includes('canela')) {
      recs = MENU_ITEMS.filter((i) => i.category === 'croissan-dulces' || i.id === 'cafe-bombon').slice(0, 3);
      responseText =
        language === 'es'
          ? 'Para una pausa dulce y reconfortante: nuestro Roll de Canela aromático o Croissant Mixto templado con un Café Bombón cremoso con leche condensada.'
          : 'For sweet cravings: our warm Ceylon Cinnamon Roll or flaky chocolate napolitana paired with a layered Café Bombón.';
    } else if (q.includes('resaca') || q.includes('fuerte') || q.includes('energia') || q.includes('salud') || q.includes('verde')) {
      recs = [
        MENU_ITEMS.find((i) => i.id === 'smoothie-green-goblin')!,
        MENU_ITEMS.find((i) => i.id === 'esp-huevo-revuelto-aguacate-brava')!,
        MENU_ITEMS.find((i) => i.id === 'cafe-americano')!,
      ].filter(Boolean);
      responseText =
        language === 'es'
          ? 'Para reponer energía al 100%: el smoothie Green Goblin (espinaca, jengibre, pepino, limón) junto a la tostada de huevo revuelto con aguacate y salsa brava casera.'
          : 'For maximum revitalization: the Green Goblin alkalizing smoothie (ginger, spinach, lemon) with scrambled egg & avocado brava toast and double Americano.';
    } else if (q.includes('tarde') || q.includes('cerveza') || q.includes('tapa') || q.includes('vino')) {
      recs = [
        MENU_ITEMS.find((i) => i.id === 'jamon-plato-cebo')!,
        MENU_ITEMS.find((i) => i.id === 'tapa-patatas-bravas')!,
        MENU_ITEMS.find((i) => i.id === 'cerveza-victoria')!,
      ].filter(Boolean);
      responseText =
        language === 'es'
          ? 'Para el tapeo de la tarde en la terraza: un plato de Jamón de Cebo cortado al momento con patatas bravas caseras y cerveza Victoria de Málaga en copa helada.'
          : 'For sunny afternoon tapas: a platter of hand-sliced Iberian Cebo ham, signature bravas and ice-cold Victoria Malaga lager.';
    } else {
      recs = [
        MENU_ITEMS.find((i) => i.id === 'benedict-salmon')!,
        MENU_ITEMS.find((i) => i.id === 'smoothie-martinete')!,
        MENU_ITEMS.find((i) => i.id === 'cafe-cappuccino')!,
      ].filter(Boolean);
      responseText =
        language === 'es'
          ? `Basado en tu preferencia ("${customQuestion}"): nuestro Barista te recomienda probar los Huevos Benedict con Salmón Ahumado y salsa holandesa casera, maridado con un Smoothie Martinete de frutos del bosque.`
          : `Based on your request ("${customQuestion}"): our atelier barista recommends Eggs Benedict Royale with smoked salmon, paired with the antioxidant Martinete berry smoothie.`;
    }

    setAiAnswer(responseText);
    setAiRecommendedItems(recs);
  };

  const getPairingItems = (pairing: CuratedPairing) => {
    return pairing.itemIds.map((id) => MENU_ITEMS.find((m) => m.id === id)).filter(Boolean) as MenuItem[];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Surface */}
      <div 
        className="w-full max-w-2xl bg-[#231a15] border border-[#a66a38]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#a66a38]/25 bg-[#1b1411] flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d98236] to-[#a66a38] flex items-center justify-center text-[#1b1411] shadow-lg shadow-[#d98236]/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#d98236] block">
                Atelier Barista Sommelier
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#f7f1e5]">
                {language === 'es' ? 'Maridajes & Recomendaciones' : 'Pairings & Taste Advisor'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#231a15] hover:bg-[#2c211b] text-[#c89666] hover:text-[#f7f1e5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto">
          
          {/* Natural Language Prompt Query */}
          <div>
            <form onSubmit={handleAskAI} className="relative">
              <input
                type="text"
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                placeholder={
                  language === 'es'
                    ? '¿Qué te apetece hoy? Ej: "Desayuno sin gluten revitalizante", "Dulce con café"...'
                    : 'What are you craving? e.g. "Gluten-free energizing breakfast", "Sweet pastry with coffee"...'
                }
                className="w-full bg-[#1b1411] border border-[#a66a38]/40 rounded-xl pl-4 pr-24 py-3 text-xs sm:text-sm text-[#ede0d0] placeholder-[#a66a38] focus:outline-none focus:border-[#d98236] transition-colors"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-[#d98236] text-[#1b1411] font-bold text-xs flex items-center gap-1.5 hover:bg-[#e69045] transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === 'es' ? 'Asesorar' : 'Advise'}</span>
              </button>
            </form>
          </div>

          {/* AI Custom Answer if generated */}
          {aiAnswer && (
            <div className="p-4 rounded-xl bg-[#2c211b] border border-[#d98236]/40 animate-in fade-in">
              <div className="flex items-center gap-2 text-xs font-mono text-[#d98236] mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === 'es' ? 'Recomendación Personalizada:' : 'Custom Recommendation:'}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#ede0d0] leading-relaxed">
                {aiAnswer}
              </p>

              {aiRecommendedItems.length > 0 && (
                <div className="mt-3 pt-3 border-t border-[#a66a38]/20 space-y-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#c89666] block">
                    {language === 'es' ? 'Platos recomendados:' : 'Recommended items:'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {aiRecommendedItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-2.5 rounded-lg bg-[#1b1411] border border-[#a66a38]/25 flex items-center justify-between text-xs"
                      >
                        <span className="font-medium text-[#f7f1e5] truncate pr-2">
                          {language === 'es' ? item.nameEs : item.nameEn}
                        </span>
                        <button
                          onClick={() => {
                            onQuickAddItem(item);
                            onClose();
                          }}
                          className="shrink-0 px-2 py-1 rounded bg-[#d98236] text-[#1b1411] font-bold text-[11px] hover:bg-[#e69045]"
                        >
                          + Añadir
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Curated Pairings Carousel / Tabs */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#c89666] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#d98236]" />
                {language === 'es' ? 'Maridajes Maestros de la Casa:' : 'Signature House Pairings:'}
              </span>
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {CURATED_PAIRINGS.map((pairing) => {
                const isSelected = selectedPairing.id === pairing.id;
                return (
                  <button
                    key={pairing.id}
                    onClick={() => setSelectedPairing(pairing)}
                    className={`shrink-0 px-3 py-2 rounded-xl text-xs text-left transition-all border ${
                      isSelected
                        ? 'bg-[#d98236]/20 border-[#d98236] text-[#f7f1e5]'
                        : 'bg-[#1b1411] border-[#a66a38]/25 text-[#dfcfbe] hover:border-[#a66a38]/60'
                    }`}
                  >
                    <span className="block text-[10px] font-mono text-[#c89666]">
                      {language === 'es' ? pairing.badgeEs : pairing.badgeEn}
                    </span>
                    <span className="font-serif font-bold truncate block">
                      {language === 'es' ? pairing.titleEs : pairing.titleEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Pairing Showcase Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#1b1411] border border-[#a66a38]/30 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#d98236]/20 text-[#d98236] border border-[#d98236]/30">
                  {language === 'es' ? selectedPairing.badgeEs : selectedPairing.badgeEn}
                </span>
                <span className="font-serif text-lg font-bold text-[#f7f1e5]">
                  {language === 'es' ? selectedPairing.titleEs : selectedPairing.titleEn}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#dfcfbe] leading-relaxed">
                {language === 'es' ? selectedPairing.descEs : selectedPairing.descEn}
              </p>
            </div>

            {/* Included Items */}
            <div className="space-y-2 pt-2 border-t border-[#a66a38]/20">
              <span className="text-[11px] uppercase font-mono tracking-wider text-[#c89666] block">
                {language === 'es' ? 'Elementos del maridaje:' : 'Pairing components:'}
              </span>
              
              <div className="space-y-2">
                {getPairingItems(selectedPairing).map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-[#231a15] border border-[#a66a38]/20 flex items-center justify-between gap-3"
                  >
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#f7f1e5]">
                        {language === 'es' ? item.nameEs : item.nameEn}
                      </h4>
                      <p className="text-[11px] text-[#a66a38] font-sans line-clamp-1">
                        {language === 'es' ? item.descriptionEs : item.descriptionEn}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        onQuickAddItem(item);
                        onClose();
                      }}
                      className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#d98236] hover:bg-[#e69045] text-[#1b1411] font-bold text-xs transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{language === 'es' ? 'Añadir' : 'Add'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Add Full Combo Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  getPairingItems(selectedPairing).forEach((item) => onQuickAddItem(item));
                  onClose();
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#d98236] to-[#c89666] text-[#1b1411] font-bold text-xs sm:text-sm shadow-lg shadow-[#d98236]/25 hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Plus className="w-4 h-4" strokeWidth={3} />
                <span>
                  {language === 'es' ? 'Añadir Maridaje Completo a la Comanda' : 'Add Full Pairing to Ticket'}
                </span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
