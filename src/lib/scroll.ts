import { useEffect } from 'react';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Scroll to an element or a Y offset, through Lenis when it is active. */
export function scrollToTarget(target: HTMLElement | number, offset = 0) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target as any, { offset, duration: 1.4 });
    return;
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target + offset, behavior: 'smooth' });
  } else {
    const y = target.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

export function scrollToTopInstant() {
  if (lenisInstance) lenisInstance.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
}

/** Lenis smooth scrolling on desktop pointers only. Touch keeps native momentum. */
export function useSmoothScroll() {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine || prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9,
    });
    lenisInstance = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}

/**
 * Drives the hero choreography. Writes --p (linear) and --e (eased) on :root,
 * plus the measured geometry the flying logo needs. On any page that is not
 * home the header is permanently in its "docked" state (p = e = 1).
 */
export const MARK_ASPECT = 1200 / 649;

export function useHeroProgress(page: 'home' | 'menu') {
  useEffect(() => {
    const root = document.documentElement;

    if (page !== 'home') {
      root.style.setProperty('--p', '1');
      root.style.setProperty('--e', '1');
      return;
    }

    let raf = 0;
    let range = 1;

    const measure = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      range = Math.max(vh * 0.62, 260);
      root.style.setProperty('--hero-range', `${Math.round(range)}px`);
    };

    const write = () => {
      raf = 0;
      const p = clamp(window.scrollY / range);
      root.style.setProperty('--p', p.toFixed(4));
      root.style.setProperty('--e', easeInOut(p).toFixed(4));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(write);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    write();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [page]);
}

/**
 * Reveals any [data-reveal], [data-curtain] or [data-split] node once, as it
 * enters the viewport. Curtain nodes start fully clipped (clip-path), which
 * IntersectionObserver treats as invisible, so their parent is observed instead.
 */
export function useRevealOnScroll(dep: unknown) {
  useEffect(() => {
    const sel = '[data-reveal],[data-curtain],[data-split]';
    const seen = new WeakSet<Element>();
    const targets = new WeakMap<Element, HTMLElement[]>();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const mapped = targets.get(entry.target);
          if (mapped) mapped.forEach((n) => (n.dataset.in = 'true'));
          else (entry.target as HTMLElement).dataset.in = 'true';
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );

    const watch = (el: HTMLElement) => {
      if (seen.has(el)) return;
      seen.add(el);
      if (el.hasAttribute('data-curtain') && el.parentElement) {
        const host = el.parentElement;
        const list = targets.get(host) || [];
        list.push(el);
        targets.set(host, list);
        io.observe(host);
      } else {
        io.observe(el);
      }
    };

    const scan = (root: ParentNode) => root.querySelectorAll<HTMLElement>(sel).forEach(watch);

    scan(document);
    const mo = new MutationObserver((muts) => {
      muts.forEach((m) =>
        m.addedNodes.forEach((n) => {
          if (n instanceof HTMLElement) {
            if (n.matches(sel)) watch(n);
            scan(n);
          }
        })
      );
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [dep]);
}
