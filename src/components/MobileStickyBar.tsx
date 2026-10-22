import React from 'react';
import { UtensilsCrossed, Home } from 'lucide-react';
import { Language } from '../types';

interface MobileStickyBarProps {
  language: Language;
  currentPage?: 'home' | 'menu';
  onNavigateHome?: () => void;
  onNavigateMenu?: () => void;
  cartCount?: number;
  cartTotal?: number;
  onOpenCart?: () => void;
  onOpenHours?: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  language,
  currentPage = 'home',
  onNavigateHome,
  onNavigateMenu,
}) => {
  return (
    <aside
      aria-label="Mobile Menu Action"
      className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-transparent border-none px-4 pb-6 pt-2 pointer-events-none"
    >
      <div className="max-w-md mx-auto pointer-events-auto">
        {currentPage === 'home' ? (
          <button
            onClick={onNavigateMenu}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#d98236] hover:bg-[#e69045] text-[#1b1411] font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-2xl shadow-black/80 border border-[#f7f1e5]/25 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
          >
            <UtensilsCrossed className="w-5 h-5 shrink-0" />
            <span>{language === 'es' ? 'Ver Menú / Carta' : 'Explore Menu'}</span>
          </button>
        ) : (
          <button
            onClick={onNavigateHome}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#1b1411]/90 hover:bg-[#231a15] border border-[#a66a38]/40 text-[#f7f1e5] font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-2xl active:scale-95 transition-all cursor-pointer backdrop-blur-md"
          >
            <Home className="w-5 h-5 text-[#d98236] shrink-0" />
            <span>{language === 'es' ? 'Volver al Inicio' : 'Back to Home'}</span>
          </button>
        )}
      </div>
    </aside>
  );
};
