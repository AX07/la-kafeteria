import React, { useEffect, useRef, useState } from 'react';
import { MOTION_CLIPS } from '../data/motionClips';
import { prefersReducedMotion } from '../lib/scroll';

export type LiveKind = 'hot' | 'cold' | 'plain';

interface LiveMediaProps {
  src: string;
  alt: string;
  /** Key into MOTION_CLIPS (menu item id, or "chapter:<id>"). */
  clipKey?: string;
  kind?: LiveKind;
  /** Scroll parallax strength, 0 disables. Percent of height. */
  parallax?: number;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  /** Which pre-sized variant of /assets/menu/* to load. */
  size?: 'sm' | 'md';
  /** Fill the nearest positioned ancestor instead of sizing itself. */
  fill?: boolean;
  /** Cheap mode for small tiles: no breathing, steam, sheen or parallax. */
  lite?: boolean;
}

/**
 * A photograph that feels alive. While on screen it plays the dish's motion
 * clip when one exists; otherwise it breathes (slow push-in), drifts with
 * scroll, catches a pass of light, and hot dishes release steam.
 * `lite` keeps only lazy loading (and clip playback when a clip exists).
 */
export const LiveMedia: React.FC<LiveMediaProps> = ({
  src,
  alt,
  clipKey,
  kind = 'plain',
  parallax = 7,
  className = '',
  imgClassName = '',
  eager = false,
  size = 'md',
  fill = false,
  lite = false,
}) => {
  const resolved = src.startsWith('/assets/menu/') ? src.replace('/assets/menu/', `/assets/menu/${size}/`) : src;
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [near, setNear] = useState(eager);
  const [videoReady, setVideoReady] = useState(false);
  const clip = clipKey ? MOTION_CLIPS[clipKey] : undefined;
  const reduced = prefersReducedMotion();
  const animate = !lite && !reduced;
  const wantsActive = animate || !!clip;

  // Load the photo once it is within ~one screen of the viewport
  useEffect(() => {
    if (near) return;
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '700px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  // Visibility drives animation, clip playback and parallax
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !wantsActive) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting && entry.intersectionRatio > 0.25),
      { threshold: [0, 0.25] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [wantsActive]);

  // Parallax: only while active, one rAF per scroll tick
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !active || !parallax || !animate) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const t = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      el.style.setProperty('--py', Math.max(-1, Math.min(1, t)).toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [active, parallax, animate]);

  // Clip playback
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active) v.play().catch(() => {});
    else v.pause();
  }, [active, clip]);

  return (
    <div
      ref={wrapRef}
      data-live-active={active}
      className={`${fill ? 'absolute inset-0' : 'relative'} overflow-hidden bg-[#16100c] ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{
          transform: animate && parallax ? `translate3d(0, calc(var(--py, 0) * -${parallax}%), 0)` : undefined,
          willChange: animate && parallax && active ? 'transform' : undefined,
        }}
      >
        <div className={`absolute inset-0 ${lite ? '' : 'scale-[1.18]'}`}>
          <img
            src={near ? resolved : undefined}
            alt={alt}
            decoding="async"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover ${animate ? 'live-breathe' : ''} ${imgClassName}`}
            style={animate ? { animationPlayState: active ? 'running' : 'paused' } : undefined}
          />
          {clip && (
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="none"
              poster={resolved}
              onLoadedData={() => setVideoReady(true)}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
              style={{ opacity: videoReady ? 1 : 0 }}
            >
              {clip.webm && <source src={clip.webm} type="video/webm" />}
              {clip.mp4 && <source src={clip.mp4} type="video/mp4" />}
            </video>
          )}
        </div>
      </div>

      {!clip && animate && active && kind === 'hot' && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <span className="live-steam" style={{ left: '18%', top: '10%', ['--drift' as any]: '9%', animationDelay: '0s' }} />
          <span className="live-steam" style={{ left: '38%', top: '4%', ['--drift' as any]: '-6%', animationDelay: '1.7s', width: '38%', height: '38%' }} />
        </div>
      )}
      {!clip && animate && active && <div className="live-sheen" aria-hidden="true" />}
    </div>
  );
};
