import React, { useEffect, useRef } from 'react';
import { MenuItem, Language } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { LiveMedia } from './LiveMedia';
import { Plus, ArrowRight } from 'lucide-react';

interface VisualPicksSectionProps {
  language: Language;
  onSelectItem: (item: MenuItem) => void;
  onOpenMenuPage: () => void;
}

interface HighlightDish {
  id: string;
  menuItemId: string;
  nameEs: string;
  nameEn: string;
  portion: string;
  priceDisplay: string;
  descEs: string;
  descEn: string;
  image: string;
}

const HIGHLIGHT_DISHES: HighlightDish[] = [
  {
    id: 'highlight-1',
    menuItemId: 'trad-aceite-tomate',
    nameEs: 'Tostada de Aceite y Tomate de la Huerta',
    nameEn: 'Andalusian Vine Tomato & EVOO Toast',
    portion: '300 gr.',
    priceDisplay: '3.80€',
    descEs: 'Tomate pera de huerta andaluza rallado al momento sobre pan rústico crujiente con aceite de oliva virgen extra de Jaén y flor de sal.',
    descEn: 'Freshly grated Andalusian vine tomato over artisan crusty toast drizzled with cold-pressed Jaén extra virgin olive oil and sea salt crystals.',
    image: '/assets/menu/tostada_aceite_tomate.webp',
  },
  {
    id: 'highlight-2',
    menuItemId: 'benedict-jamon-serrano',
    nameEs: 'Huevos Benedict con Jamón Serrano',
    nameEn: 'Serrano Ham Eggs Benedict Atelier',
    portion: '330 gr.',
    priceDisplay: '9.00€',
    descEs: 'Huevos de campo poché con yema cremosa, finas lonchas de jamón serrano reserva y salsa holandesa casera templada sobre brioche tostado.',
    descEn: 'Farm poached eggs with runny golden yolk, delicate Serrano ham ribbons, and scratch-made warm hollandaise over toasted artisan brioche.',
    image: '/assets/menu/benedict_jamon_serrano.webp',
  },
  {
    id: 'highlight-3',
    menuItemId: 'esp-huevo-revuelto-aguacate-brava',
    nameEs: 'Aguacate Hass & Huevo con Brava',
    nameEn: 'Hass Avocado & Scrambled Brava',
    portion: '350 gr.',
    priceDisplay: '5.50€',
    descEs: 'Aguacate maduro de la Axarquía malagueña, huevos revueltos cremosos, y reducción de salsa brava artesanal de la casa.',
    descEn: 'Ripe Malaga Hass avocado, creamy folded scrambled eggs, and secret homemade smoked brava reduction with de la Vera paprika.',
    image: '/assets/menu/huevo_revuelto_aguacate.webp',
  },
];

const PickCard: React.FC<{ dish: HighlightDish; es: boolean; onPick: (d: HighlightDish) => void }> = ({ dish, es, onPick }) => (
  <article className="group">
    <button onClick={() => onPick(dish)} className="block w-full cursor-pointer" aria-label={es ? dish.nameEs : dish.nameEn}>
      <LiveMedia
        src={dish.image}
        alt={es ? dish.nameEs : dish.nameEn}
        clipKey={dish.menuItemId}
        kind="hot"
        parallax={0}
        className="aspect-[4/5] rounded-t-[999px] rounded-b-[1.6rem] border border-[#a66a38]/30 shadow-2xl shadow-black/60"
      />
    </button>
    <div className="pt-6">
      <div className="flex items-baseline justify-between gap-3">
        <span className="tabular-nums text-lg text-[#e8b27a] font-medium">{dish.priceDisplay}</span>
        <span className="text-[10px] uppercase tracking-[0.24em] text-[#a66a38]">{dish.portion}</span>
      </div>
      <h3 className="mt-3 font-serif text-2xl leading-snug text-[#f7f1e5]">{es ? dish.nameEs : dish.nameEn}</h3>
      <p className="mt-3 text-[13px] leading-relaxed text-[#dfcfbe]/70 line-clamp-4">{es ? dish.descEs : dish.descEn}</p>
      <button
        onClick={() => onPick(dish)}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#d98236]/60 pl-3.5 pr-4 py-2.5 text-[10px] uppercase tracking-[0.22em] text-[#f7f1e5] transition-colors duration-300 hover:bg-[#d98236] hover:text-[#1b1411] active:scale-95 cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" strokeWidth={2} />
        {es ? 'Añadir a la comanda' : 'Add to order'}
      </button>
    </div>
  </article>
);

export const VisualPicksSection: React.FC<VisualPicksSectionProps> = ({
  language,
  onSelectItem,
  onOpenMenuPage,
}) => {
  const es = language === 'es';
  const pinRef = useRef<HTMLDivElement>(null);

  // Pinned horizontal travel on phones: --pp runs 0..1 while the stage is stuck
  useEffect(() => {
    const el = pinRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const travel = r.height - window.innerHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 0;
      el.style.setProperty('--pp', p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const handleItemClick = (dish: HighlightDish) => {
    const fullItem = MENU_ITEMS.find((m) => m.id === dish.menuItemId);
    if (fullItem) onSelectItem(fullItem);
  };

  return (
    <section id="picks" className="relative pt-24 sm:py-32 overflow-x-clip">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p data-reveal="fade" className="eyebrow eyebrow-rule">
              {es ? 'Nuestra selección especial' : 'Our special selection'}
            </p>
            <h2
              data-split
              className="mt-6 font-serif text-[2.4rem] sm:text-5xl lg:text-6xl leading-[1.08] text-[#f7f1e5] font-medium text-balance"
            >
              <span className="line">
                <span>{es ? 'Disfruta de cada momento' : 'Enjoy every single moment'}</span>
              </span>
            </h2>
            <p
              data-reveal
              className="mt-5 text-sm leading-relaxed text-[#dfcfbe]/75 max-w-xl"
              style={{ ['--reveal-delay' as any]: '200ms' }}
            >
              {es
                ? 'Nuestra selección de platos favoritos preparados al momento para cualquier instante del día. Desde desayunos tradicionales andaluces hasta brunch y tapas selectas.'
                : 'Our curated selection of signature dishes prepared fresh to order at any time of day. From traditional Andalusian toasts to artisanal brunch plates.'}
            </p>
          </div>

          <button
            data-reveal
            onClick={onOpenMenuPage}
            className="group self-start md:self-auto shrink-0 inline-flex items-center gap-3 rounded-full border border-[#d98236]/70 px-7 py-3.5 text-[11px] uppercase tracking-[0.28em] text-[#f7f1e5] transition-all duration-500 hover:bg-[#d98236] hover:text-[#1b1411] hover:border-[#d98236] cursor-pointer"
          >
            {es ? 'Ver menú' : 'View menu'}
            <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Phones: the section pins and the cards travel sideways as you scroll */}
      <div ref={pinRef} className="md:hidden relative" style={{ height: 'calc(100dvh + 160vw)' }}>
        <div className="sticky top-0 h-[100dvh] overflow-hidden flex flex-col justify-center">
          <div
            className="flex gap-4 will-change-transform"
            style={{
              paddingLeft: '11vw',
              transform: 'translate3d(calc(var(--pp, 0) * -2 * (78vw + 16px)), 0, 0)',
            }}
          >
            {HIGHLIGHT_DISHES.map((dish) => (
              <div key={dish.id} className="shrink-0 w-[78vw]">
                <PickCard dish={dish} es={es} onPick={handleItemClick} />
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center gap-2" aria-hidden="true">
            {HIGHLIGHT_DISHES.map((d, i) => (
              <span
                key={d.id}
                className="h-1 rounded-full bg-[#d98236] transition-all"
                style={{
                  width: `calc(8px + 20px * max(0, 1 - abs(var(--pp, 0) * 2 - ${i})))`,
                  opacity: `calc(0.3 + 0.7 * max(0, 1 - abs(var(--pp, 0) * 2 - ${i})))`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tablet and desktop: three columns */}
      <div data-reveal className="hidden md:grid grid-cols-3 gap-10 max-w-7xl mx-auto px-6 lg:px-10">
        {HIGHLIGHT_DISHES.map((dish) => (
          <PickCard key={dish.id} dish={dish} es={es} onPick={handleItemClick} />
        ))}
      </div>
    </section>
  );
};
