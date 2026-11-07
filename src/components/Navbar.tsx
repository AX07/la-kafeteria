import React from 'react';
import { ShoppingBag, MapPin, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { MARK_ASPECT } from '../lib/scroll';

interface NavbarProps {
  language: Language;
  currentPage: 'home' | 'menu';
  onNavigateHome: () => void;
  onNavigateMenu: () => void;
  onToggleLanguage: () => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenHours: () => void;
}

const iconBtn =
  'relative h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-[#c89666]/30 bg-[#1b1411]/55 text-[#ede0d0] flex items-center justify-center transition-all duration-300 hover:border-[#d98236] hover:text-[#d98236] active:scale-90 cursor-pointer';

export const Navbar: React.FC<NavbarProps> = ({
  language,
  currentPage,
  onNavigateHome,
  onNavigateMenu,
  onToggleLanguage,
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenHours,
}) => {
  const es = language === 'es';

  const linkCls = (active: boolean) =>
    `relative py-2 text-[11px] uppercase tracking-[0.26em] font-medium transition-colors duration-300 cursor-pointer after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-left after:bg-[#d98236] after:transition-transform after:duration-500 ${
      active
        ? 'text-[#d98236] after:scale-x-100'
        : 'text-[#dfcfbe] hover:text-[#f7f1e5] after:scale-x-0 hover:after:scale-x-100'
    }`;

  return (
    <header className="fixed top-0 inset-x-0 z-40 w-full">
      {/* Backdrop layer: fades in as the logo docks (driven by --e) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 border-b border-[#a66a38]/20 bg-[#1b1411]/96"
        style={{ opacity: 'var(--e)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          {/* Dock for the flying logo */}
          <button
            id="nav-mark-slot"
            onClick={onNavigateHome}
            aria-label={es ? 'La Kafeteria · Inicio' : 'La Kafeteria · Home'}
            title={es ? 'La Kafeteria · Inicio' : 'La Kafeteria · Home'}
            className="shrink-0 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#d98236] rounded"
            style={{
              height: 'clamp(40px, 11vw, 50px)',
              width: `calc(clamp(40px, 11vw, 50px) * ${MARK_ASPECT.toFixed(4)})`,
            }}
          />

          <nav className="hidden md:flex items-center gap-9">
            <button onClick={onNavigateHome} className={linkCls(currentPage === 'home')}>
              {es ? 'Inicio' : 'Home'}
            </button>
            <button onClick={onNavigateMenu} className={linkCls(currentPage === 'menu')}>
              {es ? 'Carta' : 'Menu'}
            </button>
            {currentPage === 'home' && (
              <>
                <a href="#picks" className={linkCls(false)}>
                  {es ? 'Destacados' : 'Picks'}
                </a>
                <a href="#atmosphere" className={linkCls(false)}>
                  {es ? 'Terraza' : 'Patio'}
                </a>
                <a href="#location" className={linkCls(false)}>
                  {es ? 'Horario' : 'Hours'}
                </a>
              </>
            )}
          </nav>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <a
              href={`https://wa.me/34614124159?text=${encodeURIComponent(
                es
                  ? '¡Hola La Kafeteria! Me gustaría reservar mesa en la terraza en San Pedro Alcántara.'
                  : 'Hello La Kafeteria! I would like to reserve a terrace table in San Pedro Alcántara.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp La Kafeteria"
              title={es ? 'WhatsApp · Reservar Mesa' : 'WhatsApp · Book Table'}
              className={`${iconBtn} !border-[#25D366]/35 !text-[#4fd98a] hover:!border-[#25D366] hover:!text-[#25D366]`}
            >
              <MessageCircle className="w-[17px] h-[17px]" strokeWidth={1.8} />
            </a>

            <button
              onClick={onOpenHours}
              className={iconBtn}
              aria-label={es ? 'Horario y ubicación' : 'Hours and location'}
              title={es ? 'Horario y ubicación' : 'Hours and location'}
            >
              <MapPin className="w-[17px] h-[17px]" strokeWidth={1.8} />
            </button>

            <button
              onClick={onToggleLanguage}
              className={`${iconBtn} text-[11px] font-medium tracking-[0.12em] uppercase`}
              title={es ? 'Switch to English' : 'Cambiar a Español'}
              aria-label={es ? 'Switch to English' : 'Cambiar a Español'}
            >
              {language}
            </button>

            <button
              onClick={onOpenCart}
              className={`${iconBtn} !border-[#d98236]/50`}
              title={es ? 'Ver comanda' : 'View order'}
              aria-label={es ? 'Ver comanda' : 'View order'}
            >
              <ShoppingBag className="w-[17px] h-[17px] text-[#d98236]" strokeWidth={1.8} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#d98236] text-[#1b1411] text-[10px] font-semibold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            {cartCount > 0 && (
              <span className="hidden lg:inline text-xs text-[#d98236] tabular-nums tracking-wide pl-1">
                {cartTotal.toFixed(2)}€
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
