import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface HeroSectionProps {
  language: Language;
  onOpenMenuPage?: () => void;
}

/**
 * Scroll-driven hero. The section is taller than the viewport; an inner stage
 * is pinned (sticky) while --p runs 0 to 1. Everything below reads --p / --e:
 *  - the centered logo (FlyingMark) travels into the header
 *  - the film pushes in and darkens
 *  - the standfirst rises into the space the logo leaves
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ language, onOpenMenuPage }) => {
  const es = language === 'es';

  return (
    <section
      id="hero"
      className="relative w-full"
      style={{ height: 'calc(100dvh + var(--hero-range, 62dvh))' }}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[#120c09]">
        {/* Film */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/assets/intro-poster.webp"
            className="absolute inset-0 w-full h-full object-cover opacity-90 contrast-105"
            style={{
              transform:
                'scale(calc(1.06 + var(--p) * 0.12)) translate3d(0, calc(var(--p) * -3%), 0)',
              willChange: 'transform',
            }}
          >
            <source src="/assets/intro.webm" type="video/webm" />
            <source src="/assets/intro.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-[#231a15]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/55" />
          {/* Deepens as the logo leaves */}
          <div
            className="absolute inset-0 bg-[#120c09]"
            style={{ opacity: 'calc(var(--e) * 0.68)' }}
          />
          {/* Radial pool of warmth behind the logo */}
          <div
            className="absolute left-1/2 top-1/2 w-[34rem] h-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d98236]/12 blur-3xl"
            style={{ opacity: 'calc(1 - var(--e))' }}
          />
        </div>

        {/* Standfirst: rises into the logo's old position */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 text-center">
          <div
            style={{
              opacity: 'clamp(0, calc((var(--p) - 0.42) * 2.6), 1)',
              transform: 'translate3d(0, calc((1 - var(--e)) * 42px), 0)',
            }}
          >
            <p className="eyebrow eyebrow-rule mb-6 sm:mb-8">San Pedro Alcántara</p>
            <h1 className="font-serif text-[2rem] leading-[1.12] sm:text-5xl lg:text-6xl text-[#f7f1e5] font-medium text-balance max-w-3xl mx-auto">
              <span className="italic text-[#e8b27a]">Specialty Coffee</span>
              <br />
              &amp; Mediterranean Brunch Atelier
            </h1>
            <div className="mt-9 sm:mt-11 pointer-events-auto">
              <button
                onClick={onOpenMenuPage}
                className="group inline-flex items-center gap-3 rounded-full border border-[#d98236]/70 px-7 py-3.5 text-[11px] uppercase tracking-[0.28em] text-[#f7f1e5] backdrop-blur-sm transition-all duration-500 hover:bg-[#d98236] hover:text-[#1b1411] hover:border-[#d98236] cursor-pointer"
              >
                {es ? 'Ver la carta' : 'View the menu'}
                <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Hero footer meta, dissolves on first scroll */}
        <div
          className="absolute inset-x-0 bottom-0 z-10 px-6 sm:px-10 pb-28 sm:pb-9 flex items-end justify-between eyebrow !tracking-[0.3em] !text-[#c89666]/90"
          style={{ opacity: 'clamp(0, calc(1 - var(--p) * 4), 1)' }}
        >
          <span>Coffee &amp; Breakfast</span>
          <span className="hidden sm:inline">07:30 – 16:00</span>
          <span>San Pedro Alcántara</span>
        </div>
      </div>
    </section>
  );
};
