import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, MapPin, Globe, UtensilsCrossed, Home, MessageCircle } from 'lucide-react';
import { Language } from '../types';

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
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isPastHero, setIsPastHero] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 30);

      // Track whether the hero section has been scrolled past
      const hero = document.getElementById('hero');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        // When the bottom of the hero is within 45% of the viewport height,
        // the hero's center slogan has scrolled off-screen.
        setIsPastHero(rect.bottom <= window.innerHeight * 0.45);
      } else {
        setIsPastHero(scrollY > window.innerHeight * 0.55);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 w-full transition-all duration-300 ${
        currentPage === 'home' && !isScrolled
          ? 'bg-transparent border-b border-transparent'
          : 'bg-[#1b1411]/92 backdrop-blur-md border-b border-[#a66a38]/20 shadow-lg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Brand Mark: Square Logo in Hero, transforms to Slogan Image after Hero */}
          <button
            onClick={onNavigateHome}
            className="flex items-center group cursor-pointer focus:outline-none"
            aria-label="La Kafeteria - Volver al inicio"
            title={language === 'es' ? 'La Kafeteria · Inicio' : 'La Kafeteria · Home'}
          >
            <AnimatePresence mode="wait">
              {!isPastHero && currentPage === 'home' ? (
                <motion.div
                  key="badge-logo"
                  initial={{ opacity: 0, scale: 0.88, x: -6 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.88, x: -6 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shadow-lg shadow-[#d98236]/20 border border-[#c89666]/30 group-hover:scale-105 transition-transform bg-[#16100c] shrink-0 flex items-center justify-center"
                >
                  <img
                    src="/assets/logo.webp"
                    alt="La Kafeteria Logo"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="slogan-logo"
                  initial={{ opacity: 0, scale: 0.92, x: -8 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.92, x: -8 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="flex items-center h-10 sm:h-12 py-0.5 group-hover:scale-105 transition-transform duration-300"
                >
                  <div className="h-9 sm:h-11 rounded-xl overflow-hidden border border-[#a66a38]/30 shadow-md shadow-[#d98236]/15 bg-[#16100c] flex items-center">
                    <img
                      src="/assets/slogan.webp"
                      alt="La Kafeteria Slogan"
                      className="h-full w-auto max-h-9 sm:max-h-11 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-mono text-[#dfcfbe]">
            <button
              onClick={onNavigateHome}
              className={`hover:text-[#d98236] transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'home' ? 'text-[#d98236] font-bold' : ''
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Inicio' : 'Home'}</span>
            </button>

            <button
              onClick={onNavigateMenu}
              className={`hover:text-[#d98236] transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'menu' ? 'text-[#d98236] font-bold' : ''
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Carta & Menú' : 'Menu'}</span>
            </button>

            {currentPage === 'home' && (
              <>
                <a href="#picks" className="hover:text-[#d98236] transition-colors">
                  {language === 'es' ? 'Destacados' : 'Picks'}
                </a>
                <a href="#atmosphere" className="hover:text-[#d98236] transition-colors">
                  {language === 'es' ? 'Terraza' : 'Patio'}
                </a>
                <a href="#location" className="hover:text-[#d98236] transition-colors">
                  {language === 'es' ? 'Horario' : 'Hours'}
                </a>
              </>
            )}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Top Action: WhatsApp with just the icon */}
            <a
              href={`https://wa.me/34614124159?text=${encodeURIComponent(
                language === 'es'
                  ? '¡Hola La Kafeteria! Me gustaría reservar mesa en la terraza en San Pedro Alcántara.'
                  : 'Hello La Kafeteria! I would like to reserve a terrace table in San Pedro Alcántara.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp La Kafeteria"
              title={language === 'es' ? 'WhatsApp · Reservar Mesa' : 'WhatsApp · Book Table'}
              className="p-2.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] transition-all transform active:scale-95 flex items-center justify-center cursor-pointer shadow-sm shadow-[#25D366]/20"
            >
              <MessageCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current" />
            </a>

            {/* Location / Hours Button */}
            <button
              onClick={onOpenHours}
              className="p-2 sm:px-3 sm:py-2 rounded-lg bg-[#231a15] hover:bg-[#2c211b] border border-[#a66a38]/30 text-[#ede0d0] text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Horario y Ubicación"
            >
              <MapPin className="w-3.5 h-3.5 text-[#c89666]" />
              <span className="hidden sm:inline">San Pedro</span>
            </button>

            {/* Language Switch */}
            <button
              onClick={onToggleLanguage}
              className="px-2.5 py-1.5 rounded-lg bg-[#231a15] hover:bg-[#2c211b] border border-[#a66a38]/30 text-[#ede0d0] text-xs font-mono font-medium flex items-center gap-1 transition-colors cursor-pointer"
              title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            >
              <Globe className="w-3 h-3 text-[#c89666]" />
              <span className="uppercase">{language}</span>
            </button>

            {/* Ticket / Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-lg bg-[#231a15] hover:bg-[#2c211b] border border-[#a66a38]/40 text-[#f7f1e5] font-semibold text-xs sm:text-sm shadow-md transition-all transform active:scale-95 cursor-pointer"
              title="Ver comanda"
            >
              <ShoppingBag className="w-4 h-4 text-[#d98236]" strokeWidth={2.5} />
              {cartCount > 0 ? (
                <div className="flex items-center gap-1">
                  <span className="w-5 h-5 rounded-full bg-[#d98236] text-[#1b1411] text-[11px] font-mono flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                  <span className="hidden md:inline font-mono text-xs text-[#d98236]">
                    {cartTotal.toFixed(2)}€
                  </span>
                </div>
              ) : (
                <span className="hidden sm:inline text-xs text-[#c89666]">
                  {language === 'es' ? 'Ticket' : 'Ticket'}
                </span>
              )}
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
