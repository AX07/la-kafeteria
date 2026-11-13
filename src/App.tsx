/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VisualPicksSection } from './components/VisualPicksSection';
import { AtmosphereAndReviews } from './components/AtmosphereAndReviews';
import { LocationAndHoursSection } from './components/LocationAndHoursSection';
import { MobileStickyBar } from './components/MobileStickyBar';
const MenuPage = lazy(() => import('./pages/MenuPage').then((m) => ({ default: m.MenuPage })));
const ItemCustomizerModal = lazy(() =>
  import('./components/ItemCustomizerModal').then((m) => ({ default: m.ItemCustomizerModal }))
);
const OrderDrawer = lazy(() => import('./components/OrderDrawer').then((m) => ({ default: m.OrderDrawer })));
const AtelierInfoModal = lazy(() =>
  import('./components/AtelierInfoModal').then((m) => ({ default: m.AtelierInfoModal }))
);
import { Language, MenuItem, CartItem, SelectedItemOption } from './types';
import { ChevronUp, Heart, UtensilsCrossed } from 'lucide-react';
import { FlyingMark } from './components/FlyingMark';
import { safeStorage } from './lib/storage';
import {
  useSmoothScroll,
  useHeroProgress,
  useRevealOnScroll,
  scrollToTarget,
  scrollToTopInstant,
} from './lib/scroll';

export default function App() {
  // Page navigation with real URLs: '/' (home) and '/carta' (menu). Old '#menu' links still work.
  const pageFromLocation = (): 'home' | 'menu' =>
    window.location.pathname.replace(/\/+$/, '') === '/carta' || window.location.hash === '#menu' ? 'menu' : 'home';
  const [currentPage, setCurrentPage] = useState<'home' | 'menu'>(pageFromLocation);

  useEffect(() => {
    // Normalise legacy #menu to /carta
    if (window.location.hash === '#menu') window.history.replaceState(null, '', '/carta');
    const onPop = () => setCurrentPage(pageFromLocation());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useSmoothScroll();
  useHeroProgress(currentPage);
  useRevealOnScroll(currentPage);

  const navigateToMenu = () => {
    window.history.pushState(null, '', '/carta');
    setCurrentPage('menu');
    scrollToTopInstant();
  };

  const navigateToHome = () => {
    window.history.pushState(null, '', '/');
    setCurrentPage('home');
    scrollToTopInstant();
  };

  // Language
  const [language, setLanguage] = useState<Language>(() => {
    const saved = safeStorage.get('la_kafeteria_lang');
    return saved === 'en' || saved === 'es' ? saved : 'es';
  });

  const toggleLanguage = () => {
    const next = language === 'es' ? 'en' : 'es';
    setLanguage(next);
    safeStorage.set('la_kafeteria_lang', next);
  };

  // Cart / Order State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = safeStorage.get('la_kafeteria_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      safeStorage.set('la_kafeteria_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  // Cart Handlers
  const handleAddToCart = (
    item: MenuItem,
    selectedOption: SelectedItemOption,
    unitPrice: number,
    quantity: number
  ) => {
    const optionKey = JSON.stringify(selectedOption);
    setCart((prev) => {
      const existing = prev.findIndex(
        (ci) => ci.item.id === item.id && JSON.stringify(ci.selectedOption) === optionKey
      );

      if (existing > -1) {
        const copy = [...prev];
        copy[existing].quantity += quantity;
        return copy;
      }

      return [
        ...prev,
        {
          cartItemId: `${item.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          item,
          selectedOption,
          unitPrice,
          quantity,
        },
      ];
    });
  };

  const handleSelectItem = (item: MenuItem) => {
    if (item.pricing.type === 'single') {
      handleAddToCart(item, {}, item.pricing.price, 1);
      setIsCartOpen(true);
    } else {
      setCustomizingItem(item);
    }
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((c) => (c.cartItemId === cartItemId ? { ...c, quantity: newQty } : c))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((c) => c.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Per-page title, description and language (kept in sync for crawlers that run JS and for sharing)
  useEffect(() => {
    const es = language === 'es';
    const meta =
      currentPage === 'menu'
        ? {
            title: es
              ? 'Carta | La Kafeteria · Café de especialidad y brunch en San Pedro Alcántara'
              : 'Menu | La Kafeteria · Specialty coffee & brunch in San Pedro Alcántara',
            desc: es
              ? 'Carta completa de La Kafeteria: pitufos y tostas andaluzas, huevos benedict, tortilla casera, tapas, café de especialidad, zumos y más en San Pedro Alcántara, Marbella.'
              : 'Full La Kafeteria menu: Andalusian pitufo toasts, eggs benedict, homemade tortilla, tapas, specialty coffee and juices in San Pedro Alcántara, Marbella.',
          }
        : {
            title: es
              ? 'La Kafeteria · Café de especialidad y brunch en San Pedro Alcántara, Marbella'
              : 'La Kafeteria · Specialty coffee & brunch in San Pedro Alcántara, Marbella',
            desc: es
              ? 'Café de especialidad, desayunos andaluces, huevos benedict y tapas en una terraza luminosa de San Pedro Alcántara. Abierto de 07:30 a 16:00.'
              : 'Specialty coffee, Andalusian breakfast, eggs benedict and tapas on a sunny terrace in San Pedro Alcántara. Open 07:30 to 16:00.',
          };
    document.title = meta.title;
    document.documentElement.lang = language;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.desc);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.desc);
    const canon = document.querySelector('link[rel="canonical"]');
    if (canon) canon.setAttribute('href', window.location.origin + (currentPage === 'menu' ? '/carta' : '/'));
  }, [currentPage, language]);

  const totalCartCount = useMemo(() => {
    return cart.reduce((sum, i) => sum + i.quantity, 0);
  }, [cart]);

  const totalCartAmount = useMemo(() => {
    return cart.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  }, [cart]);

  const scrollToSection = (id: string) => {
    if (currentPage !== 'home') {
      navigateToHome();
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) scrollToTarget(el);
      }, 250);
    } else {
      const el = document.getElementById(id);
      if (el) scrollToTarget(el);
    }
  };

  const scrollToTop = () => {
    scrollToTarget(0);
  };

  return (
    <div className="grain min-h-screen bg-[#1b1411] text-[#ede0d0] flex flex-col selection:bg-[#d98236] selection:text-[#1b1411] pb-16 md:pb-0">
      
      {/* 1. Header / Navbar with Prominent Menu CTA */}
      <Navbar
        language={language}
        currentPage={currentPage}
        onNavigateHome={navigateToHome}
        onNavigateMenu={navigateToMenu}
        onToggleLanguage={toggleLanguage}
        cartCount={totalCartCount}
        cartTotal={totalCartAmount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenHours={() => scrollToSection('location')}
      />

      <FlyingMark page={currentPage} />

      {/* Main View Router: Dedicated Menu Page vs Home Page */}
      {currentPage === 'menu' ? (
        <div>
          <Suspense fallback={<div className="min-h-[100dvh]" />}>
          <MenuPage
            language={language}
            onBackToHome={navigateToHome}
            onSelectItem={handleSelectItem}
            onOpenCart={() => setIsCartOpen(true)}
            cartCount={totalCartCount}
          />
          </Suspense>
        </div>
      ) : (
        <main className="flex-1">
          {/* 2. Hero Section (Menu Button as Primary CTA replacing WhatsApp) */}
          <HeroSection
            language={language}
            onOpenMenuPage={navigateToMenu}
          />

          {/* 3. Highlighted Menu Picks (Visual Feed linking to Menu) */}
          <VisualPicksSection
            language={language}
            onSelectItem={handleSelectItem}
            onOpenMenuPage={navigateToMenu}
          />

          {/* 4. Local Vibe, Atmosphere & Google Reviews */}
          <AtmosphereAndReviews
            language={language}
          />

          {/* 5. Opening Hours & Location (Cards & Google Maps link) */}
          <LocationAndHoursSection
            language={language}
          />
        </main>
      )}

      {/* Footer */}
      <footer className="relative bg-[#120c09] pt-20 pb-14 px-5 sm:px-8 lg:px-10 text-[#dfcfbe]">
        <div className="hairline absolute top-0 inset-x-0" />
        <div className="max-w-7xl mx-auto">
          <div data-reveal className="flex flex-col items-center text-center">
            <img
              src="/assets/brand-mark.webp"
              alt="La Kafeteria"
              className="w-56 sm:w-72 h-auto"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <p className="eyebrow mt-8 !text-[#c89666]">
              Specialty Coffee &amp; Mediterranean Brunch Atelier
            </p>
            <p className="mt-3 text-sm text-[#dfcfbe]/70 max-w-md leading-relaxed">
              Calle Marqués del Duero, San Pedro Alcántara, Marbella.
            </p>

            <button
              onClick={currentPage === 'home' ? navigateToMenu : navigateToHome}
              className="group mt-10 inline-flex items-center gap-3 rounded-full border border-[#d98236]/60 px-7 py-3.5 text-[11px] uppercase tracking-[0.28em] text-[#f7f1e5] transition-all duration-500 hover:bg-[#d98236] hover:text-[#1b1411] hover:border-[#d98236] cursor-pointer"
            >
              <UtensilsCrossed className="w-4 h-4" strokeWidth={1.6} />
              <span>
                {currentPage === 'home'
                  ? language === 'es' ? 'Ver la carta' : 'View the menu'
                  : language === 'es' ? 'Inicio' : 'Home'}
              </span>
            </button>
          </div>

          <div className="hairline mt-16" />

          <div className="mt-8 grid gap-6 sm:grid-cols-3 text-center sm:text-left text-xs tracking-wide">
            <button
              onClick={() => scrollToSection('location')}
              className="hover:text-[#f7f1e5] transition-colors cursor-pointer sm:text-left"
            >
              San Pedro Alcántara
            </button>
            <span className="sm:text-center">07:30 – 16:00</span>
            <a href="tel:+34951234567" className="hover:text-[#f7f1e5] transition-colors sm:text-right">
              +34 951 234 567
            </a>
          </div>

          <div className="mt-10 pt-6 border-t border-[#a66a38]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#a66a38]">
            <p className="text-center sm:text-left">
              © 2026 La Kafeteria San Pedro Alcántara. Todos los derechos reservados. Precios con IVA incluido.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <span>{language === 'es' ? 'Sitio web desarrollado por' : 'Website developed by'}</span>
              <a
                href="https://ax07.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d98236] hover:text-[#f7f1e5] font-medium transition-colors underline decoration-[#d98236]/40 underline-offset-2"
              >
                ax07.dev
              </a>
              <Heart className="w-3 h-3 text-[#d98236] fill-current inline ml-1" />
              <button
                onClick={scrollToTop}
                className="ml-3 inline-flex items-center gap-1 text-[#c89666] hover:text-[#f7f1e5] transition-colors cursor-pointer"
                aria-label="Volver arriba"
              >
                Top <ChevronUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Action Bar (Mobile Viewports with Menu CTA replacing WhatsApp) */}
      <MobileStickyBar
        language={language}
        currentPage={currentPage}
        onNavigateHome={navigateToHome}
        onNavigateMenu={navigateToMenu}
        cartCount={totalCartCount}
        cartTotal={totalCartAmount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenHours={() => scrollToSection('location')}
      />

      <Suspense fallback={null}>
      {/* Item Customizer Modal (Bread options, Milks, Gluten-Free) */}
      <ItemCustomizerModal
        item={customizingItem}
        language={language}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={(item, opt, price, qty) => {
          handleAddToCart(item, opt, price, qty);
          setIsCartOpen(true);
        }}
      />

      {/* Order / Ticket Drawer */}
      <OrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        language={language}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Atelier Info Modal */}
      <AtelierInfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        language={language}
      />

      </Suspense>

      <Analytics />
      <SpeedInsights />

    </div>
  );
}
