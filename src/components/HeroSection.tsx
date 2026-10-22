import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';

interface HeroSectionProps {
  language: Language;
  onOpenMenuPage?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section id="hero" className="relative overflow-hidden w-full h-[100dvh] min-h-[100dvh] flex items-center justify-center">
      
      {/* Background Video stretched across the entire viewport (behind header and bottom menu button) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          onEnded={(e) => {
            const v = e.currentTarget;
            v.currentTime = 0;
            v.play().catch(() => {});
          }}
          className="w-full h-full object-cover scale-105 opacity-85 sm:opacity-90 brightness-95 contrast-105 transition-opacity duration-700"
        >
          <source src="/assets/introvideo.webm" type="video/webm" />
        </video>

        {/* Warm Brown Espresso Tint Overlay */}
        <div className="absolute inset-0 bg-[#231a15]/25 mix-blend-multiply" />

        {/* Soft Vignette Gradients for Legibility behind top header & bottom menu button */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25" />
      </div>

      {/* Subtle radial ambient warmth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-[#d98236]/10 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Centered Content: Slogan Asset */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center justify-center text-center">
        
        {/* Centered Transparent Slogan Image */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm sm:max-w-md md:max-w-2xl mx-auto drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
        >
          <img
            src="/assets/slogan no bg.png"
            alt="La Kafeteria Slogan"
            className="w-full h-auto object-contain max-h-[250px] sm:max-h-[350px] mx-auto filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)] hover:scale-102 transition-transform duration-500"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/assets/slogan_no_bg.png';
            }}
          />
        </motion.div>

      </div>

    </section>
  );
};
