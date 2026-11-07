import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { MENU_ITEMS } from '../data/menuData';
import { CategoryId, Language, MenuItem } from '../types';
import { LiveMedia, LiveKind } from '../components/LiveMedia';
import { scrollToTarget, clamp } from '../lib/scroll';
import { ArrowDown, Plus, Wheat } from 'lucide-react';

interface MenuPageProps {
  language: Language;
  onBackToHome: () => void;
  onSelectItem: (item: MenuItem) => void;
  onOpenCart: () => void;
  cartCount: number;
}

export interface MosaicCategory {
  id: string;
  nameEs: string;
  nameEn: string;
  taglineEs: string;
  taglineEn: string;
  image: string;
  categoryIds: CategoryId[];
}

export const MOSAIC_CATEGORIES: MosaicCategory[] = [
  {
    id: 'bread',
    nameEs: 'Pan & Tostas',
    nameEn: 'Bread & Toasts',
    taglineEs: 'Tradición en pan andaluz y tostas gourmet con aguacate',
    taglineEn: 'Traditional toasts, pitufos & avocado creations',
    image: '/assets/menu/huevo_revuelto_aguacate.webp',
    categoryIds: ['tradicion-pan', 'pan-adiccion'],
  },
  {
    id: 'croissan-dulces',
    nameEs: 'Croissants & Dulces',
    nameEn: 'Croissants & Pastries',
    taglineEs: 'Bollería hojaldrada recién horneada y toque caliente',
    taglineEn: 'Flaky baked pastries, chocolate rolls & sweets',
    image: '/assets/menu/croissant_mantequilla.webp',
    categoryIds: ['croissan-dulces'],
  },
  {
    id: 'huevos-benedict',
    nameEs: 'Huevos Benedict',
    nameEn: 'Eggs Benedict',
    taglineEs: 'Brioche tostado, huevos de granja poché y holandesa casera',
    taglineEn: 'Poached farm eggs on brioche with silky hollandaise',
    image: '/assets/menu/benedict_jamon_serrano.webp',
    categoryIds: ['huevos-benedict'],
  },
  {
    id: 'jamon',
    nameEs: 'Jamón Ibérico',
    nameEn: 'Iberian Ham Selection',
    taglineEs: 'Jamón ibérico de cebo cortado fino con tomate fresco y AOVE',
    taglineEn: 'Thinly sliced cured Iberian ham with tomato & olive oil',
    image: '/assets/menu/jamon_cebo_iberico.webp',
    categoryIds: ['jamon-cebo'],
  },
  {
    id: 'platos',
    nameEs: 'Platos & Combos',
    nameEn: 'Brunch Plates & Mains',
    taglineEs: 'Nuestra mítica tortilla española casera y platos combinados',
    taglineEn: 'Signature homemade Spanish omelette & brunch plates',
    image: '/assets/menu/tortilla_patata.webp',
    categoryIds: ['plato-combo'],
  },
  {
    id: 'tapas',
    nameEs: 'Tapas de la Casa',
    nameEn: 'Artisan Tapas',
    taglineEs: 'Pulpo a la gallega, patatas bravas y recetas de San Pedro',
    taglineEn: 'Galician octopus, patatas bravas & seasonal savory bites',
    image: '/assets/menu/pulpo_gallega.webp',
    categoryIds: ['tapas'],
  },
  {
    id: 'coffe',
    nameEs: 'Café de Especialidad',
    nameEn: 'Specialty Coffee',
    taglineEs: 'Tueste arábica seleccionado, capuchinos de autor e infusiones',
    taglineEn: 'Selected arabica roast, signature cappuccinos & organic teas',
    image: '/assets/menu/cappuccino_la_kafeteria.webp',
    categoryIds: ['cafe-infusiones'],
  },
  {
    id: 'zumos-refrescos',
    nameEs: 'Zumos & Refrescos',
    nameEn: 'Juices & Soft Drinks',
    taglineEs: 'Zumo recién exprimido, smoothies naturales y refrescos fríos',
    taglineEn: 'Freshly squeezed juices, cold smoothies & refreshing sodas',
    image: '/assets/menu/smoothie_martinete.webp',
    categoryIds: ['frutas-smoothies', 'refrescos'],
  },
  {
    id: 'cerveza-vinos',
    nameEs: 'Cerveza, Vinos & Drinks',
    nameEn: 'Beer, Wine & Drinks',
    taglineEs: 'Cervezas heladas de Málaga, vinos andaluces y sangría casera',
    taglineEn: 'Chilled Malaga craft beers, regional wines & sangria',
    image: '/assets/menu/sangria_artesanal.webp',
    categoryIds: ['cerveza-vinos'],
  },
];

const HOT_CATEGORIES: CategoryId[] = [
  'tradicion-pan', 'pan-adiccion', 'croissan-dulces', 'huevos-benedict', 'plato-combo', 'tapas', 'cafe-infusiones',
];

const kindFor = (cat: CategoryId): LiveKind => (HOT_CATEGORIES.includes(cat) ? 'hot' : 'cold');
const FALLBACK_IMG = '/assets/site/1525351484163-7529414344d8.webp';
const pad = (n: number) => String(n).padStart(2, '0');
const delay = (ms: number) => ({ ['--reveal-delay' as any]: `${ms}ms` });

const TAG_LABELS: Record<string, { es: string; en: string }> = {
  gluten_option: { es: 'Opción sin gluten', en: 'GF available' },
  vegetarian: { es: 'Vegetariano', en: 'Vegetarian' },
  iberico: { es: 'Ibérico', en: 'Iberian' },
  homemade: { es: 'Casero', en: 'Homemade' },
  specialty: { es: 'Especialidad', en: 'Specialty' },
  seasonal: { es: 'De temporada', en: 'Seasonal' },
};

const Price: React.FC<{ item: MenuItem; language: Language; large?: boolean; small?: boolean }> = ({ item, language, large, small }) => {
  const num = `tabular-nums text-[#e8b27a] ${large ? 'text-xl' : small ? 'text-[13px]' : 'text-base'} font-medium`;
  const from = (
    <span className="block text-[9px] uppercase tracking-[0.24em] text-[#a66a38] leading-none mb-1">
      {language === 'es' ? 'Desde' : 'From'}
    </span>
  );
  if (item.pricing.type === 'single') return <span className={num}>{item.pricing.price.toFixed(2)}€</span>;
  if (item.pricing.type === 'bread_tiers')
    return (
      <span>
        {from}
        <span className={num}>
          {item.pricing.prices.blancoIntegral.toFixed(2)}€ – {item.pricing.prices.baguetina.toFixed(2)}€
        </span>
      </span>
    );
  return (
    <span>
      {from}
      <span className={num}>{item.pricing.prices[0]?.price.toFixed(2)}€</span>
    </span>
  );
};

const Tags: React.FC<{ item: MenuItem; language: Language }> = ({ item, language }) => {
  if (!item.tags?.length) return null;
  return (
    <p className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-[9.5px] uppercase tracking-[0.2em] text-[#c89666]">
      {item.tags.map((t) => (
        <span key={t} className="inline-flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-[#d98236]" />
          {TAG_LABELS[t]?.[language]}
        </span>
      ))}
    </p>
  );
};

const AddButton: React.FC<{ item: MenuItem; language: Language; onSelect: (i: MenuItem) => void; wide?: boolean; icon?: boolean }> = ({
  item, language, onSelect, wide, icon,
}) => {
  const label =
    item.pricing.type === 'single' ? (language === 'es' ? 'Añadir' : 'Add') : language === 'es' ? 'Elegir' : 'Options';
  return (
    <button
      onClick={() => onSelect(item)}
      aria-label={`${label}: ${language === 'es' ? item.nameEs : item.nameEn}`}
      className={`inline-flex items-center justify-center gap-2 rounded-full transition-colors duration-300 cursor-pointer active:scale-90 ${
        icon
          ? 'h-9 w-9 bg-[#d98236] text-[#1b1411] shadow-lg shadow-black/50'
          : wide
          ? 'border border-[#d98236]/60 text-[#f7f1e5] hover:bg-[#d98236] hover:text-[#1b1411] px-6 py-3 text-[11px] uppercase tracking-[0.24em]'
          : 'border border-[#d98236]/60 text-[#f7f1e5] hover:bg-[#d98236] hover:text-[#1b1411] pl-3 pr-3.5 py-2 text-[10px] uppercase tracking-[0.2em]'
      }`}
    >
      <Plus className={icon ? 'w-4 h-4' : 'w-3.5 h-3.5'} strokeWidth={2.2} />
      {!icon && label}
    </button>
  );
};

const isHouseShot = (item: MenuItem) => !!item.image && !item.image.includes('/ph_');

/** Wide bento tile for dishes that have a real house photograph. */
const FeatureTile: React.FC<{ item: MenuItem; language: Language; onSelect: (i: MenuItem) => void }> = ({
  item, language, onSelect,
}) => {
  const es = language === 'es';
  return (
    <article className="col-span-2">
      <div className="relative">
        <LiveMedia
          src={item.image!}
          alt={es ? item.nameEs : item.nameEn}
          clipKey={item.id}
          kind={kindFor(item.category)}
          parallax={0}
          className="aspect-[16/11] sm:aspect-[16/10] rounded-3xl border border-[#a66a38]/25"
        />
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-[#120c09]/90 via-[#120c09]/10 to-transparent pointer-events-none" />
        <div className="absolute left-4 right-4 bottom-4 flex items-end justify-between gap-3">
          <div className="min-w-0 pointer-events-none">
            <h4 className="font-serif text-xl sm:text-2xl leading-tight text-[#f7f1e5] text-balance">
              {es ? item.nameEs : item.nameEn}
            </h4>
            <div className="mt-1.5">
              <Price item={item} language={language} />
            </div>
          </div>
          <AddButton item={item} language={language} onSelect={onSelect} icon />
        </div>
      </div>
      <p className="mt-3 px-1 text-[12.5px] leading-relaxed text-[#dfcfbe]/70 line-clamp-2">
        {es ? item.descriptionEs : item.descriptionEn}
      </p>
    </article>
  );
};

/** Small square tile: two per row on phones. */
const Tile: React.FC<{ item: MenuItem; language: Language; onSelect: (i: MenuItem) => void }> = ({
  item, language, onSelect,
}) => {
  const es = language === 'es';
  return (
    <article className="min-w-0">
      <div className="relative">
        <LiveMedia
          src={item.image || FALLBACK_IMG}
          alt={es ? item.nameEs : item.nameEn}
          clipKey={item.id}
          kind={kindFor(item.category)}
          parallax={0}
          size="sm"
          lite
          className="aspect-square rounded-2xl border border-[#a66a38]/25"
        />
        <div className="absolute right-2 bottom-2">
          <AddButton item={item} language={language} onSelect={onSelect} icon />
        </div>
      </div>
      <h4 className="mt-2.5 font-serif text-[15px] sm:text-base leading-snug text-[#f7f1e5] line-clamp-2 min-h-[2.5em]">
        {es ? item.nameEs : item.nameEn}
      </h4>
      <div className="mt-1">
        <Price item={item} language={language} small />
      </div>
    </article>
  );
};

export const MenuPage: React.FC<MenuPageProps> = ({ language, onSelectItem }) => {
  const es = language === 'es';
  const [activeId, setActiveId] = useState<string>(MOSAIC_CATEGORIES[0].id);
  const [railOn, setRailOn] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLElement>(null);
  const chapterRefs = useRef<Record<string, HTMLElement | null>>({});

  const chapters = useMemo(
    () =>
      MOSAIC_CATEGORIES.map((cat) => ({
        cat,
        items: MENU_ITEMS.filter((i) => cat.categoryIds.includes(i.category)),
      })),
    []
  );

  // Scroll spy and rail visibility via observers; --cp is only computed for chapters on screen
  useEffect(() => {
    const visible = new Set<string>();
    let raf = 0;

    const updateCover = () => {
      raf = 0;
      if (window.innerWidth >= 1024) return;
      visible.forEach((id) => {
        const el = chapterRefs.current[id];
        if (!el) return;
        const list = el.querySelector<HTMLElement>('[data-chapter-list]');
        const stage = el.querySelector<HTMLElement>('[data-chapter-stage]');
        if (!list || !stage) return;
        const cp = clamp(1 - list.getBoundingClientRect().top / stage.offsetHeight);
        el.style.setProperty('--cp', cp.toFixed(2));
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(updateCover);
    };

    const spy = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId((e.target as HTMLElement).dataset.chapter || MOSAIC_CATEGORIES[0].id);
        }),
      { rootMargin: '-45% 0px -54% 0px' }
    );
    const vis = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const id = (e.target as HTMLElement).dataset.chapter!;
          if (e.isIntersecting) visible.add(id);
          else visible.delete(id);
        });
        onScroll();
      },
      { rootMargin: '0px' }
    );
    MOSAIC_CATEGORIES.forEach((cat) => {
      const el = chapterRefs.current[cat.id];
      if (el) {
        spy.observe(el);
        vis.observe(el);
      }
    });

    const railIO = new IntersectionObserver(
      ([e]) => setRailOn(!e.isIntersecting && e.boundingClientRect.bottom < 90),
      { rootMargin: '-90px 0px 0px 0px' }
    );
    if (indexRef.current) railIO.observe(indexRef.current);

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      spy.disconnect();
      vis.disconnect();
      railIO.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Keep the active chip centered in the rail
  useEffect(() => {
    const rail = railRef.current;
    const chip = rail?.querySelector<HTMLElement>(`[data-chip="${activeId}"]`);
    if (rail && chip) {
      rail.scrollTo({ left: chip.offsetLeft - rail.clientWidth / 2 + chip.clientWidth / 2, behavior: 'smooth' });
    }
  }, [activeId]);

  const goTo = (id: string) => {
    const el = chapterRefs.current[id];
    if (el) scrollToTarget(el, 0);
  };

  const activeIndex = MOSAIC_CATEGORIES.findIndex((c) => c.id === activeId);

  return (
    <div className="bg-[#1b1411] text-[#ede0d0] pb-28">
      {/* Cover */}
      <header className="relative px-6 pt-28 sm:pt-36 pb-10 text-center overflow-hidden">
        <div className="absolute left-1/2 top-16 w-[34rem] h-[34rem] -translate-x-1/2 pointer-events-none" style={{ background: 'radial-gradient(closest-side, rgba(217,130,54,0.14), transparent)' }} />
        <p data-reveal="fade" className="eyebrow eyebrow-rule relative">
          {es ? 'Atelier Gastronómico San Pedro' : 'San Pedro Culinary Atelier'}
        </p>
        <h1
          data-split
          className="relative mt-6 font-serif text-[3.2rem] sm:text-7xl lg:text-8xl leading-[1.02] text-[#f7f1e5] font-medium"
        >
          <span className="line">
            <span>{es ? 'La Carta' : 'The Menu'}</span>
          </span>
        </h1>
        <p
          data-reveal
          className="relative mt-6 mx-auto max-w-md text-sm leading-relaxed text-[#dfcfbe]/75 text-balance"
          style={delay(200)}
        >
          {es
            ? 'Elige un capítulo para ir directo a sus platos, o desliza para recorrer toda la carta.'
            : 'Choose a chapter to jump straight to its dishes, or simply scroll through the full menu.'}
        </p>
        <div data-reveal="fade" className="relative mt-8 flex justify-center text-[#d98236]" style={delay(400)}>
          <ArrowDown className="w-4 h-4 animate-bounce" strokeWidth={1.5} />
        </div>
      </header>

      {/* Index */}
      <section ref={indexRef} className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="hairline" />
        {chapters.map(({ cat, items }, idx) => (
          <button
            key={cat.id}
            onClick={() => goTo(cat.id)}
            data-reveal
            className="group w-full flex items-center gap-4 sm:gap-6 py-5 sm:py-6 text-left border-b border-[#a66a38]/15 cursor-pointer"
          >
            <span className="w-8 shrink-0 font-serif italic text-lg text-[#a66a38] tabular-nums">{pad(idx + 1)}</span>
            <span className="flex-1 min-w-0">
              <span className="block font-serif text-[1.45rem] sm:text-3xl leading-tight text-[#f7f1e5] transition-colors duration-500 group-hover:text-[#e8b27a]">
                {es ? cat.nameEs : cat.nameEn}
              </span>
              <span className="mt-1.5 block text-[10px] uppercase tracking-[0.24em] text-[#c89666]">
                {items.length} {es ? 'platos' : 'items'}
              </span>
            </span>
            <LiveMedia
              src={cat.image}
              alt=""
              kind={kindFor(cat.categoryIds[0])}
              parallax={0}
              size="sm"
              lite
              className="w-[68px] h-[86px] sm:w-20 sm:h-[104px] shrink-0 rounded-t-full rounded-b-xl border border-[#a66a38]/30 transition-transform duration-700 group-hover:-translate-y-1"
            />
          </button>
        ))}
      </section>

      {/* Chapter rail */}
      <div
        className="sticky top-16 sm:top-20 z-30 transition-all duration-500"
        style={{
          opacity: railOn ? 1 : 0,
          transform: railOn ? 'none' : 'translateY(-12px)',
          pointerEvents: railOn ? 'auto' : 'none',
        }}
      >
        <div className="bg-[#1b1411]/97 border-b border-[#a66a38]/20">
          <div ref={railRef} className="no-scrollbar overflow-x-auto flex gap-2 px-4 sm:px-8 py-3 max-w-7xl mx-auto">
            {MOSAIC_CATEGORIES.map((cat, i) => (
              <button
                key={cat.id}
                data-chip={cat.id}
                onClick={() => goTo(cat.id)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[10.5px] uppercase tracking-[0.2em] transition-all duration-500 cursor-pointer ${
                  activeId === cat.id
                    ? 'bg-[#d98236] border-[#d98236] text-[#1b1411] font-semibold'
                    : 'border-[#a66a38]/35 text-[#dfcfbe] hover:border-[#d98236]'
                }`}
              >
                <span className="opacity-60 mr-2 tabular-nums">{pad(i + 1)}</span>
                {es ? cat.nameEs : cat.nameEn}
              </button>
            ))}
          </div>
          <div className="h-px bg-[#a66a38]/15">
            <div
              className="h-full bg-[#d98236] origin-left transition-transform duration-700"
              style={{ transform: `scaleX(${(activeIndex + 1) / MOSAIC_CATEGORIES.length})` }}
            />
          </div>
        </div>
      </div>

      {/* Chapters */}
      <div>
        {chapters.map(({ cat, items }, idx) => {
          return (
            <section
              key={cat.id}
              id={`category-${cat.id}`}
              data-chapter={cat.id}
              ref={(el) => {
                chapterRefs.current[cat.id] = el;
              }}
              className="relative lg:flex"
              style={{ scrollMarginTop: '7rem' }}
            >
              {/* Stage: pinned while the dishes slide over it */}
              <div
                data-chapter-stage
                className="sticky top-0 h-[64dvh] lg:h-[100dvh] lg:w-1/2 lg:self-start overflow-hidden"
              >
                <LiveMedia
                  src={cat.image}
                  alt={es ? cat.nameEs : cat.nameEn}
                  clipKey={`chapter:${cat.id}`}
                  kind={kindFor(cat.categoryIds[0])}
                  parallax={0}
                  fill
                  className=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120c09] via-[#120c09]/35 to-[#120c09]/55" />
                <div
                  className="absolute inset-0 bg-[#120c09] pointer-events-none"
                  style={{ opacity: 'calc(var(--cp, 0) * 0.8)' }}
                />
                <div
                  className="absolute inset-x-0 bottom-0 px-6 sm:px-10 pb-16 lg:pb-20"
                  style={{
                    opacity: 'calc(1 - var(--cp, 0) * 1.5)',
                    transform: 'translate3d(0, calc(var(--cp, 0) * -28px), 0)',
                  }}
                >
                  <p data-reveal="fade" className="eyebrow eyebrow-rule">
                    {es ? 'Capítulo' : 'Chapter'} {pad(idx + 1)}
                  </p>
                  <h2
                    data-split
                    className="mt-5 font-serif text-[2.6rem] sm:text-6xl leading-[1.04] text-[#f7f1e5] font-medium text-balance"
                  >
                    <span className="line">
                      <span>{es ? cat.nameEs : cat.nameEn}</span>
                    </span>
                  </h2>
                  <p
                    data-reveal
                    className="mt-4 max-w-sm text-sm leading-relaxed text-[#dfcfbe]/80"
                    style={delay(250)}
                  >
                    {es ? cat.taglineEs : cat.taglineEn}
                  </p>
                </div>
              </div>

              {/* Dish list: slides over the stage as a sheet */}
              <div
                data-chapter-list
                className="relative z-10 -mt-9 lg:mt-0 lg:w-1/2 rounded-t-[2rem] lg:rounded-none bg-[#1b1411] border-t border-[#c89666]/25 lg:border-t-0 lg:border-l lg:border-[#a66a38]/15 shadow-[0_-24px_50px_-10px_rgba(0,0,0,0.6)] lg:shadow-none"
              >
                <div className="max-w-xl mx-auto px-5 sm:px-8 pt-8 pb-12 lg:py-24">
                  <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-[#a66a38]/40 lg:hidden" />
                  <div className="flex items-baseline justify-between pb-2">
                    <span className="eyebrow">
                      {items.length} {es ? 'platos' : 'items'}
                    </span>
                    <span className="font-serif italic text-[#a66a38] tabular-nums">
                      {pad(idx + 1)} / {pad(MOSAIC_CATEGORIES.length)}
                    </span>
                  </div>

                  {cat.id === 'bread' && (
                    <div
                      data-reveal
                      className="my-4 p-4 rounded-2xl bg-[#231a15] border border-[#a66a38]/25 flex items-start gap-3 text-xs leading-relaxed text-[#dfcfbe]"
                    >
                      <Wheat className="w-4 h-4 text-[#d98236] shrink-0 mt-0.5" strokeWidth={1.6} />
                      <span>
                        {es
                          ? 'Variedades de pan: Pitufo Blanco / Integral, Pitufo Cereal, Baguetina Canteno y Espelta. Opción Pan Sin Gluten (+0.90€).'
                          : 'Bread varieties: White / Wholewheat Pitufo, Cereal Seeded Pitufo, Rye & Spelt Baguette. Gluten-Free Bread (+0.90€).'}
                      </span>
                    </div>
                  )}

                  <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-8 grid-flow-dense">
                    {items.map((item) =>
                      isHouseShot(item) ? (
                        <FeatureTile key={item.id} item={item} language={language} onSelect={onSelectItem} />
                      ) : (
                        <Tile key={item.id} item={item} language={language} onSelect={onSelectItem} />
                      )
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <p className="mt-16 text-center eyebrow !text-[#a66a38]">
        {MENU_ITEMS.length} {es ? 'platos y bebidas' : 'dishes & drinks'} · {es ? 'IVA incluido' : 'VAT included'}
      </p>
    </div>
  );
};
