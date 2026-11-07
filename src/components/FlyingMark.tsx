import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { MARK_ASPECT } from '../lib/scroll';

interface FlyingMarkProps {
  page: 'home' | 'menu';
}

/**
 * The brand mark lives in ONE fixed element. Centered over the hero at p=0,
 * it travels and scales into the header slot (#nav-mark-slot) as the --e
 * variable (set by useHeroProgress) moves from 0 to 1. Pure CSS from there:
 * no React renders while scrolling.
 */
export const FlyingMark: React.FC<FlyingMarkProps> = ({ page }) => {
  const ref = useRef<HTMLDivElement>(null);

  const measure = () => {
    const el = ref.current;
    const slot = document.getElementById('nav-mark-slot');
    if (!el || !slot) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const markW = Math.min(vw * 0.74, 500);
    const markH = markW / MARK_ASPECT;
    const r = slot.getBoundingClientRect();
    const dx = r.left + r.width / 2 - vw / 2;
    const dy = r.top + r.height / 2 - vh / 2;
    const s = r.height / markH;
    el.style.setProperty('--mw', `${markW}px`);
    el.style.setProperty('--mh', `${markH}px`);
    el.style.setProperty('--dx', `${dx}px`);
    el.style.setProperty('--dy', `${dy}px`);
    el.style.setProperty('--s', s.toFixed(5));
  };

  useLayoutEffect(() => {
    measure();
    const t = window.setTimeout(measure, 60);
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('resize', measure);
    };
  }, []);

  // Glide (instead of snap) when the page changes
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    measure();
    el.dataset.glide = 'true';
    const t = window.setTimeout(() => {
      delete el.dataset.glide;
    }, 1000);
    return () => window.clearTimeout(t);
  }, [page]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-flying-mark
      className="fixed left-1/2 top-1/2 z-[45] pointer-events-none"
      style={{
        width: 'var(--mw, 300px)',
        height: 'var(--mh, 146px)',
        marginLeft: 'calc(var(--mw, 300px) / -2)',
        marginTop: 'calc(var(--mh, 146px) / -2)',
        transformOrigin: 'center center',
        transform:
          'translate3d(calc(var(--dx, 0px) * var(--e)), calc(var(--dy, 0px) * var(--e)), 0) scale(calc(1 + (var(--s, 0.2) - 1) * var(--e)))',
        willChange: 'transform',
      }}
    >
      <img
        src="/assets/brand-mark.webp"
        alt=""
        width={1200}
        height={649}
        onLoad={measure}
        draggable={false}
        className="w-full h-full object-contain select-none"
        style={{
          filter: 'drop-shadow(0 10px 28px rgba(0,0,0,0.85))',
          opacity: 'calc(0.96 + var(--e) * 0.04)',
        }}
      />
    </div>
  );
};
