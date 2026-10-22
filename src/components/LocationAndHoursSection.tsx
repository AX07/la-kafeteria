import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, MessageCircle, MapPin, Navigation, ExternalLink, Wifi, Check, Copy } from 'lucide-react';
import { Language } from '../types';

interface LocationAndHoursSectionProps {
  language: Language;
}

export const LocationAndHoursSection: React.FC<LocationAndHoursSectionProps> = ({
  language,
}) => {
  const [wifiCopied, setWifiCopied] = useState(false);

  const handleCopyWifi = () => {
    navigator.clipboard.writeText('specialtycoffee2026');
    setWifiCopied(true);
    setTimeout(() => setWifiCopied(false), 2000);
  };

  const whatsappUrl = `https://wa.me/34614124159?text=${encodeURIComponent(
    language === 'es'
      ? '¡Hola! Me gustaría reservar mesa en la terraza de La Kafeteria en San Pedro Alcántara.'
      : 'Hello! I would like to reserve a terrace table at La Kafeteria in San Pedro Alcántara.'
  )}`;

  return (
    <section id="location" className="relative bg-[#1b1411] py-16 sm:py-24 border-b border-[#a66a38]/20 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-COLUMN ARCHED PHOTO + WORKING HOURS & LOCATION (Exact layout from image.png) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Architectural Arched Frame with Organic Contour Waves */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[3/4]">
              
              {/* Outer Decorative Contour Wave Lines (Exact decorative line styling from image.png) */}
              <div className="absolute -inset-4 sm:-inset-6 pointer-events-none opacity-40 z-0">
                <svg
                  className="w-full h-full text-[#a66a38]"
                  viewBox="0 0 400 520"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 50 190 C 50 80, 120 20, 200 20 C 280 20, 350 80, 350 190 L 350 490 C 350 510, 330 510, 200 510 C 70 510, 50 510, 50 490 Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="4 6"
                  />
                  <path
                    d="M 30 190 C 30 65, 105 5, 200 5 C 295 5, 370 65, 370 190 L 370 505 C 370 525, 350 525, 200 525 C 50 525, 30 525, 30 505 Z"
                    stroke="#d98236"
                    strokeWidth="1"
                    strokeOpacity="0.3"
                  />
                </svg>
              </div>

              {/* Main Arched Window Photo */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                className="w-full h-full rounded-t-[14rem] rounded-b-2xl overflow-hidden border border-[#a66a38]/40 shadow-2xl shadow-black relative z-10 bg-[#231a15]"
              >
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80"
                  alt="Interior y terraza de La Kafeteria San Pedro"
                  className="w-full h-full object-cover brightness-90 contrast-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1411]/80 via-transparent to-black/20" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 inset-x-4 p-3 rounded-xl bg-[#1b1411]/85 backdrop-blur-md border border-[#a66a38]/30 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-[#f7f1e5]">
                    <MapPin className="w-3.5 h-3.5 text-[#d98236]" />
                    <span>San Pedro Alcántara</span>
                  </div>
                  <span className="text-[#c89666] text-[11px]">Marbella</span>
                </div>
              </motion.div>

            </div>
          </div>

          {/* RIGHT: Editorial Headline, Experience Paragraph, Schedule, Action Buttons */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Main Editorial Headline (Exact wording & tone from image.png) */}
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#f7f1e5] leading-[1.18] tracking-tight">
              {language === 'es' ? (
                <>
                  Sabor exquisito y una experiencia inolvidable, donde la elegancia se une al sabor.
                </>
              ) : (
                <>
                  Exquisite taste and an unforgettable experience, where elegance meets authentic craft.
                </>
              )}
            </h2>

            {/* Explanatory Paragraph */}
            <p className="text-xs sm:text-sm text-[#dfcfbe]/85 leading-relaxed font-sans max-w-xl">
              {language === 'es'
                ? 'Disfruta de la armonía perfecta entre el café de especialidad de finca y los sabores mediterráneos más auténticos. Un ambiente acogedor diseñado para desconectar con tranquilidad, terraza al sol y hospitalidad que te hace sentir en casa en San Pedro Alcántara.'
                : 'Enjoy the perfect balance between freshly roasted single-origin coffee and genuine Mediterranean daytime dining. A calm ambiance designed for relaxed terrace mornings and welcoming Andalusian hospitality.'}
            </p>

            {/* WORKING HOURS SUBHEADER & SCHEDULE (Exact layout: "Работно време" in image.png) */}
            <div className="pt-2 space-y-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#f7f1e5] border-b border-[#a66a38]/20 pb-2">
                {language === 'es' ? 'Horario de apertura' : 'Opening Hours'}
              </h3>

              <div className="space-y-1.5 font-mono text-xs sm:text-sm">
                <div className="flex items-center gap-3 text-[#dfcfbe]">
                  <span className="font-bold text-[#f7f1e5] w-28 shrink-0">
                    {language === 'es' ? 'LUN - SÁB' : 'MON - SAT'}
                  </span>
                  <span className="text-[#c89666]">(07:30 - 16:00)</span>
                </div>

                <div className="flex items-center gap-3 text-[#dfcfbe]">
                  <span className="font-bold text-[#f7f1e5] w-28 shrink-0">
                    {language === 'es' ? 'DOM - FEST' : 'SUN - HOLIDAYS'}
                  </span>
                  <span className="text-[#c89666]">(08:30 - 15:00)</span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS (Exact row layout: [ RESERVAR MESA ] and Phone with icon) */}
            <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6">
              
              {/* Bordered Button: [ RESERVAR MESA ] */}
              <motion.a
                whileTap={{ scale: 0.96 }}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 sm:px-8 py-3.5 border border-[#d98236]/80 hover:border-[#d98236] bg-transparent hover:bg-[#231a15] text-[#f7f1e5] font-mono text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer shadow-lg hover:shadow-[#d98236]/10"
              >
                {language === 'es' ? 'Reservar Mesa' : 'Book Table'}
              </motion.a>

              {/* Direct Phone Action Link */}
              <a
                href="tel:+34951234567"
                className="flex items-center gap-2 text-xs sm:text-sm font-mono text-[#f7f1e5] hover:text-[#d98236] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#d98236]" />
                <span className="font-semibold">+34 951 234 567</span>
              </a>

              {/* Google Maps Shortcut */}
              <a
                href="https://maps.google.com/?q=San+Pedro+Alcantara+Marbella"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-[#a66a38] hover:text-[#c89666] flex items-center gap-1 transition-colors ml-auto sm:ml-0"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Google Maps</span>
              </a>

            </div>

            {/* Guest Wi-Fi credential strip */}
            <div className="pt-4 border-t border-[#a66a38]/15 flex items-center justify-between max-w-md text-xs font-mono text-[#a66a38]">
              <div className="flex items-center gap-2">
                <Wifi className="w-3.5 h-3.5 text-[#d98236]" />
                <span>Wi-Fi: <strong className="text-[#f7f1e5]">LaKafeteria_Guest</strong></span>
              </div>
              <button
                onClick={handleCopyWifi}
                className="text-[11px] text-[#c89666] hover:text-[#f7f1e5] transition-colors cursor-pointer"
              >
                {wifiCopied ? '✓ Copiado' : 'Copiar clave'}
              </button>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
