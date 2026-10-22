import React from 'react';
import { Coffee, Award, Sparkles, Clock, MapPin, Wheat } from 'lucide-react';
import { Language } from '../types';

interface HeroProps {
  language: Language;
  onSelectCategory: (id: string) => void;
  onOpenAiBarista: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onSelectCategory,
  onOpenAiBarista,
}) => {
  return (
    <div className="relative overflow-hidden border-b border-[#a66a38]/20 bg-gradient-to-b from-[#231a15] to-[#1b1411]">
      {/* Subtle warm glow background circles */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#d98236]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-72 h-72 bg-[#c89666]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10">
        
        {/* Micro-header */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#c89666] font-mono flex items-center gap-1.5 bg-[#2c211b] px-2.5 py-1 rounded-md border border-[#a66a38]/30">
            <MapPin className="w-3 h-3 text-[#d98236]" />
            San Pedro Alcántara · Marbella
          </span>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#a66a38] font-mono flex items-center gap-1.5 bg-[#2c211b]/60 px-2.5 py-1 rounded-md border border-[#a66a38]/20">
            <Clock className="w-3 h-3 text-[#c89666]" />
            07:30 – 16:00
          </span>
        </div>

        {/* High-impact serif headline */}
        <div className="max-w-3xl">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#f7f1e5] leading-[1.15] tracking-tight">
            {language === 'es' ? (
              <>
                El Arte del Desayuno & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d98236] to-[#c89666]">Café de Especialidad</span>
              </>
            ) : (
              <>
                The Art of Breakfast & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d98236] to-[#c89666]">Specialty Coffee</span>
              </>
            )}
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[#dfcfbe] max-w-2xl leading-relaxed">
            {language === 'es'
              ? 'Tostadas en auténtico pitufo malagueño o baguetina de centeno y espelta, huevos benedict poché con holandesa casera, jamón ibérico de cebo al corte y zumos energéticos exprimidos al momento en la Costa del Sol.'
              : 'Authentic Andalusian pitufo toasts, rye & spelt baguettes, artisan poached eggs benedict with homemade hollandaise, hand-sliced Iberian cured ham and fresh cold-pressed smoothies.'}
          </p>
        </div>

        {/* Feature Badges & Specs Bar */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[#231a15]/90 border border-[#a66a38]/25 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-[#c89666] font-medium mb-1">
              <Wheat className="w-4 h-4 text-[#d98236]" />
              <span>{language === 'es' ? 'Variedad de Panes' : 'Artisan Breads'}</span>
            </div>
            <p className="text-[11px] text-[#dfcfbe]/80 leading-snug">
              {language === 'es' ? 'Pitufo blanco, integral, cereal y baguetina centeno/espelta' : 'White, wholewheat, cereal & rye spelt baguettes'}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#231a15]/90 border border-[#a66a38]/25 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-[#c89666] font-medium mb-1">
              <Sparkles className="w-4 h-4 text-[#d98236]" />
              <span>{language === 'es' ? 'Sin Gluten' : 'Gluten-Free'}</span>
            </div>
            <p className="text-[11px] text-[#dfcfbe]/80 leading-snug">
              {language === 'es' ? 'Opción sin gluten disponible en todas las tostadas (+0.90€)' : 'Gluten-free bread option available across all toasts (+0.90€)'}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#231a15]/90 border border-[#a66a38]/25 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-[#c89666] font-medium mb-1">
              <Coffee className="w-4 h-4 text-[#d98236]" />
              <span>{language === 'es' ? 'Café Arábica' : 'Arabica Coffee'}</span>
            </div>
            <p className="text-[11px] text-[#dfcfbe]/80 leading-snug">
              {language === 'es' ? 'Leche fresca o vegetal: avena, soja o almendra (+0.30€)' : 'Fresh dairy or plant milk: oat, soy, almond (+0.30€)'}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#231a15]/90 border border-[#a66a38]/25 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-[#c89666] font-medium mb-1">
              <Award className="w-4 h-4 text-[#d98236]" />
              <span>{language === 'es' ? 'Jamón Ibérico' : 'Iberian Cured Ham'}</span>
            </div>
            <p className="text-[11px] text-[#dfcfbe]/80 leading-snug">
              {language === 'es' ? 'Jamón de Cebo cortado fino con tomate fresco y AOVE' : 'Hand-cut Iberian Cebo ham with fresh crushed tomato & EVOO'}
            </p>
          </div>
        </div>

        {/* Quick Discovery CTA row */}
        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          <span className="text-[11px] uppercase tracking-wider text-[#a66a38] font-mono mr-1">
            {language === 'es' ? 'Acceso rápido:' : 'Quick view:'}
          </span>
          <button
            onClick={() => onSelectCategory('tradicion-pan')}
            className="px-3 py-1.5 rounded-lg bg-[#2c211b] hover:bg-[#382b23] border border-[#a66a38]/30 text-xs text-[#ede0d0] hover:text-[#f7f1e5] hover:border-[#d98236] transition-all"
          >
            🥖 {language === 'es' ? 'Tradición en Pan' : 'Traditional Toasts'}
          </button>
          <button
            onClick={() => onSelectCategory('huevos-benedict')}
            className="px-3 py-1.5 rounded-lg bg-[#2c211b] hover:bg-[#382b23] border border-[#a66a38]/30 text-xs text-[#ede0d0] hover:text-[#f7f1e5] hover:border-[#d98236] transition-all"
          >
            🍳 {language === 'es' ? 'Huevos Benedict' : 'Eggs Benedict'}
          </button>
          <button
            onClick={() => onSelectCategory('frutas-smoothies')}
            className="px-3 py-1.5 rounded-lg bg-[#2c211b] hover:bg-[#382b23] border border-[#a66a38]/30 text-xs text-[#ede0d0] hover:text-[#f7f1e5] hover:border-[#d98236] transition-all"
          >
            🍹 {language === 'es' ? 'Smoothies & Zumos' : 'Smoothies & Juices'}
          </button>
          <button
            onClick={() => onSelectCategory('tapas')}
            className="px-3 py-1.5 rounded-lg bg-[#2c211b] hover:bg-[#382b23] border border-[#a66a38]/30 text-xs text-[#ede0d0] hover:text-[#f7f1e5] hover:border-[#d98236] transition-all"
          >
            🥘 {language === 'es' ? 'Tapas del Día' : 'Tapas'}
          </button>
          <button
            onClick={onOpenAiBarista}
            className="px-3 py-1.5 rounded-lg bg-[#d98236]/15 hover:bg-[#d98236]/25 border border-[#d98236]/40 text-xs text-[#d98236] font-medium transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {language === 'es' ? 'Recomendación Barista' : 'Barista Pick'}
          </button>
        </div>

      </div>
    </div>
  );
};
