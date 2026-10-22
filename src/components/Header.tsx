import React from 'react';
import { Coffee, ShoppingBag, MapPin, Sparkles, Globe, Search } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenInfo: () => void;
  onOpenAiBarista: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenInfo,
  onOpenAiBarista,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#1b1411]/90 backdrop-blur-md border-b border-[#a66a38]/25 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-3">
          
          {/* Logo & Atelier Location */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#d98236] to-[#a66a38] flex items-center justify-center shadow-lg shadow-[#d98236]/20 border border-[#c89666]/30">
              <Coffee className="w-5 h-5 sm:w-6 sm:h-6 text-[#1b1411]" strokeWidth={2.2} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg sm:text-2xl font-bold tracking-wider text-[#f7f1e5] uppercase">
                  La Kafeteria
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider bg-[#d98236]/20 text-[#d98236] border border-[#d98236]/30">
                  {language === 'es' ? 'Abierto · 07:30 - 16:00' : 'Open · 07:30 - 16:00'}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#c89666] tracking-wide font-medium truncate max-w-[200px] sm:max-w-xs">
                San Pedro Alcántara · Specialty Coffee & Atelier
              </p>
            </div>
          </div>

          {/* Center search bar (desktop) */}
          <div className="hidden lg:flex items-center flex-1 max-w-sm mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c89666]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={language === 'es' ? 'Buscar tostadas, cafés, benedicts...' : 'Search toasts, coffee, benedicts...'}
                className="w-full bg-[#231a15] border border-[#a66a38]/30 rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#ede0d0] placeholder-[#a66a38] focus:outline-none focus:border-[#d98236] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#c89666] hover:text-[#ede0d0]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* AI Barista Recommendation Trigger */}
            <button
              onClick={onOpenAiBarista}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-[#2c211b] hover:bg-[#382b23] border border-[#d98236]/40 text-[#f7f1e5] transition-all text-xs font-medium shadow-sm hover:border-[#d98236] group"
              title="Barista Sommelier & Maridajes"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d98236] group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">
                {language === 'es' ? 'Maridaje AI' : 'AI Pairing'}
              </span>
            </button>

            {/* Atelier Info / Hours */}
            <button
              onClick={onOpenInfo}
              className="p-2 sm:px-3 sm:py-2 rounded-lg bg-[#231a15] hover:bg-[#2c211b] border border-[#a66a38]/30 text-[#ede0d0] transition-colors text-xs flex items-center gap-1.5"
              title="Horarios y Ubicación"
            >
              <MapPin className="w-3.5 h-3.5 text-[#c89666]" />
              <span className="hidden md:inline">San Pedro</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={onToggleLanguage}
              className="px-2.5 py-1.5 rounded-lg bg-[#231a15] hover:bg-[#2c211b] border border-[#a66a38]/30 text-[#ede0d0] transition-colors text-xs font-mono font-medium flex items-center gap-1"
              title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            >
              <Globe className="w-3 h-3 text-[#c89666]" />
              <span className="uppercase">{language}</span>
            </button>

            {/* Order / Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-[#d98236] hover:bg-[#e69045] text-[#1b1411] font-semibold text-xs sm:text-sm shadow-md shadow-[#d98236]/25 transition-all transform active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" strokeWidth={2.5} />
              <span className="hidden sm:inline">
                {language === 'es' ? 'Comanda' : 'Ticket'}
              </span>
              {cartCount > 0 && (
                <div className="flex items-center gap-1">
                  <span className="w-5 h-5 rounded-full bg-[#1b1411] text-[#f7f1e5] text-[11px] font-mono flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                  <span className="hidden md:inline font-mono text-xs">
                    {cartTotal.toFixed(2)}€
                  </span>
                </div>
              )}
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
