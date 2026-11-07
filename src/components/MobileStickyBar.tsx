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
            className="w-full py-4 px-6 rounded-full bg-[#d98236] text-[#1b1411] font-semibold text-[11px] uppercase tracking-[0.26em] flex items-center justify-center gap-3 shadow-[0_18px_40px_-8px_rgba(0,0,0,0.8)] active:scale-[0.97] transition-transform cursor-pointer"
          >
            <UtensilsCrossed className="w-4 h-4 shrink-0" strokeWidth={1.8} />
            <span>{language === 'es' ? 'Ver la carta' : 'Explore Menu'}</span>
          </button>
        ) : (
          <button
            onClick={onNavigateHome}
            className="w-full py-4 px-6 rounded-full bg-[#1b1411]/70 border border-[#c89666]/30 text-[#f7f1e5] font-medium text-[11px] uppercase tracking-[0.26em] flex items-center justify-center gap-3 shadow-[0_18px_40px_-8px_rgba(0,0,0,0.8)] active:scale-[0.97] transition-transform cursor-pointer backdrop-blur-xl"
          >
            <Home className="w-4 h-4 text-[#d98236] shrink-0" strokeWidth={1.8} />
            <span>{language === 'es' ? 'Volver al Inicio' : 'Back to Home'}</span>
          </button>
        )}
      </div>
    </aside>
  );
};
