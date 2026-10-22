/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VisualPicksSection } from './components/VisualPicksSection';
import { AtmosphereAndReviews } from './components/AtmosphereAndReviews';
import { LocationAndHoursSection } from './components/LocationAndHoursSection';
import { MobileStickyBar } from './components/MobileStickyBar';
import { MenuPage } from './pages/MenuPage';
import { ItemCustomizerModal } from './components/ItemCustomizerModal';
import { OrderDrawer } from './components/OrderDrawer';
import { AtelierInfoModal } from './components/AtelierInfoModal';
import { Language, MenuItem, CartItem, SelectedItemOption } from './types';
import { Coffee, ChevronUp, Heart, UtensilsCrossed } from 'lucide-react';

export default function App() {
  // Page Navigation: 'home' | 'menu'
  const [currentPage, setCurrentPage] = useState<'home' | 'menu'>(() => {
    return window.location.hash === '#menu' ? 'menu' : 'home';
  });

  // Sync hash with browser history
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#menu') {
        setCurrentPage('menu');
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToMenu = () => {
    setCurrentPage('menu');
    window.location.hash = 'menu';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Language
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('la_kafeteria_lang');
    return saved === 'en' || saved === 'es' ? saved : 'es';
  });

  const toggleLanguage = () => {
    const next = language === 'es' ? 'en' : 'es';
    setLanguage(next);
    localStorage.setItem('la_kafeteria_lang', next);
  };

  // Cart / Order State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('la_kafeteria_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('la_kafeteria_cart', JSON.stringify(cart));
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
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#1b1411] text-[#ede0d0] flex flex-col selection:bg-[#d98236] selection:text-[#1b1411] pb-16 md:pb-0">
      
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

      {/* Main View Router: Dedicated Menu Page vs Home Page */}
      {currentPage === 'menu' ? (
        <div className="pt-16 sm:pt-20">
          <MenuPage
            language={language}
            onBackToHome={navigateToHome}
            onSelectItem={handleSelectItem}
            onOpenCart={() => setIsCartOpen(true)}
            cartCount={totalCartCount}
          />
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
      <footer className="border-t border-[#a66a38]/25 bg-[#17110e] py-12 px-4 sm:px-6 lg:px-8 text-xs text-[#dfcfbe]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Logo with Slogan */}
            <div className="w-44 sm:w-52 rounded-xl overflow-hidden border border-[#a66a38]/30 shrink-0 shadow-lg bg-[#0e0a08]">
              <img
                src="/assets/slogan.webp"
                alt="La Kafeteria Slogan"
                className="w-full h-auto object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="font-serif text-xl font-bold text-[#f7f1e5] tracking-wider uppercase">
                  La Kafeteria
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#231a15] text-[#d98236] border border-[#a66a38]/30">
                  San Pedro
                </span>
              </div>
              <p className="text-xs text-[#c89666] max-w-sm">
                Specialty Coffee & Mediterranean Brunch Atelier · Calle Marqués del Duero, San Pedro Alcántara, Marbella.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#c89666]">
            <button
              onClick={currentPage === 'home' ? navigateToMenu : navigateToHome}
              className="text-[#d98236] font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>{currentPage === 'home' ? (language === 'es' ? 'Ver Menú' : 'View Menu') : (language === 'es' ? 'Inicio' : 'Home')}</span>
            </button>
            <span>·</span>
            <button
              onClick={() => scrollToSection('location')}
              className="hover:text-[#f7f1e5] transition-colors cursor-pointer"
            >
              📍 San Pedro Alcántara
            </button>
            <span>·</span>
            <span>🕒 07:30 – 16:00</span>
            <span>·</span>
            <a href="tel:+34951234567" className="hover:text-[#f7f1e5] transition-colors">
              📞 +34 951 234 567
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-[#231a15] hover:bg-[#2c211b] border border-[#a66a38]/30 text-[#d98236] transition-colors self-start md:self-auto flex items-center gap-1.5 cursor-pointer"
            title="Volver arriba"
          >
            <span>Top</span>
            <ChevronUp className="w-4 h-4" />
          </button>

        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-[#a66a38]/15 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#a66a38]">
          <p>© 2026 La Kafeteria San Pedro Alcántara. Todos los derechos reservados. Precios con IVA incluido.</p>
          <p className="font-mono flex items-center gap-1">
            <span>Crafted for sunny mornings & specialty coffee lovers</span>
            <Heart className="w-3 h-3 text-[#d98236] fill-current inline" />
          </p>
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

    </div>
  );
}
