import React, { useState } from 'react';
import { Language } from '../types';
import { X, MapPin, Clock, Phone, Wifi, ShieldCheck, ExternalLink, Check, Copy } from 'lucide-react';

interface AtelierInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const AtelierInfoModal: React.FC<AtelierInfoModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [copiedWifi, setCopiedWifi] = useState(false);

  if (!isOpen) return null;

  const handleCopyWifi = () => {
    navigator.clipboard.writeText('specialtycoffee2026');
    setCopiedWifi(true);
    setTimeout(() => setCopiedWifi(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Surface */}
      <div 
        className="w-full max-w-lg bg-[#231a15] border border-[#a66a38]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#a66a38]/25 bg-[#1b1411] flex items-start justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#d98236] block mb-1">
              San Pedro Alcántara · Costa del Sol
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#f7f1e5]">
              {language === 'es' ? 'La Kafeteria Atelier' : 'La Kafeteria Atelier'}
            </h2>
            <p className="text-xs text-[#c89666] font-medium">
              Specialty Coffee & Breakfast Atelier
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#231a15] hover:bg-[#2c211b] text-[#c89666] hover:text-[#f7f1e5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto text-xs sm:text-sm">
          
          {/* Official Brand Identity Banner (Logo with Slogan) */}
          <div className="rounded-xl overflow-hidden border border-[#a66a38]/30 shadow-lg bg-[#16100c]">
            <img
              src="/assets/slogan.webp"
              alt="La Kafeteria - Logo y Eslogan Oficial"
              className="w-full h-auto object-cover max-h-40"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Location & Directions */}
          <div className="p-3.5 rounded-xl bg-[#1b1411] border border-[#a66a38]/25">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d98236] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#f7f1e5]">
                    {language === 'es' ? 'Dirección & Terraza' : 'Address & Terrace'}
                  </h4>
                  <p className="text-[#dfcfbe] text-xs mt-0.5">
                    Calle Marqués del Duero, San Pedro Alcántara, 29670 Marbella (Málaga)
                  </p>
                  <p className="text-[11px] text-[#a66a38] mt-1">
                    {language === 'es' ? 'Terraza exterior con sol y sombra todo el año.' : 'Sunlit outdoor terrace with awning all year round.'}
                  </p>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=San+Pedro+Alcantara+Marbella"
                target="_blank"
                rel="noreferrer"
                className="shrink-0 p-2 rounded-lg bg-[#2c211b] hover:bg-[#382b23] border border-[#a66a38]/30 text-[#d98236] text-xs flex items-center gap-1 transition-colors"
              >
                <span>Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="p-3.5 rounded-xl bg-[#1b1411] border border-[#a66a38]/25">
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#d98236] shrink-0 mt-0.5" />
              <div className="w-full">
                <h4 className="font-semibold text-[#f7f1e5] mb-1.5">
                  {language === 'es' ? 'Horario de Apertura' : 'Opening Hours'}
                </h4>
                <div className="space-y-1 font-mono text-xs">
                  <div className="flex justify-between text-[#dfcfbe]">
                    <span>{language === 'es' ? 'Lunes – Sábado:' : 'Monday – Saturday:'}</span>
                    <span className="font-bold text-[#f7f1e5]">07:30 – 16:00</span>
                  </div>
                  <div className="flex justify-between text-[#dfcfbe]">
                    <span>{language === 'es' ? 'Domingos & Festivos:' : 'Sunday & Holidays:'}</span>
                    <span className="font-bold text-[#f7f1e5]">08:30 – 15:00</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#c89666] mt-2">
                  {language === 'es' ? '• Cocina ininterrumpida para desayunos, brunch y tapas.' : '• Continuous kitchen service for breakfasts, brunch & tapas.'}
                </p>
              </div>
            </div>
          </div>

          {/* Wi-Fi Details */}
          <div className="p-3.5 rounded-xl bg-[#1b1411] border border-[#a66a38]/25 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Wifi className="w-4 h-4 text-[#d98236]" />
              <div>
                <h4 className="font-semibold text-xs text-[#f7f1e5]">
                  Wi-Fi Clientes: <span className="font-mono text-[#c89666]">LaKafeteria_Guest</span>
                </h4>
                <p className="text-[11px] font-mono text-[#a66a38]">
                  Clave: <span className="text-[#dfcfbe]">specialtycoffee2026</span>
                </p>
              </div>
            </div>

            <button
              onClick={handleCopyWifi}
              className="px-2.5 py-1.5 rounded-lg bg-[#2c211b] hover:bg-[#382b23] border border-[#a66a38]/30 text-xs font-mono text-[#ede0d0] flex items-center gap-1 transition-colors"
            >
              {copiedWifi ? (
                <>
                  <Check className="w-3 h-3 text-[#25D366]" />
                  <span className="text-[#25D366]">OK</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-[#c89666]" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>

          {/* Allergens & Commitment */}
          <div className="p-3.5 rounded-xl bg-[#1b1411] border border-[#a66a38]/25 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#d98236] shrink-0 mt-0.5" />
            <div className="text-xs text-[#dfcfbe]">
              <h4 className="font-semibold text-[#f7f1e5] mb-1">
                {language === 'es' ? 'Compromiso & Alérgenos' : 'Dietary & Allergen Commitment'}
              </h4>
              <p className="leading-relaxed">
                {language === 'es'
                  ? 'Contamos con protocolo de tostadora exclusiva para pan sin gluten (+0.90€). Informa a nuestro personal sobre cualquier intolerancia o celiaquía antes de ordenar.'
                  : 'We maintain dedicated gluten-free toasters for all toasts (+0.90€). Please advise our team of any severe allergies or celiac requirements before ordering.'}
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-[#a66a38]/25 bg-[#1b1411] flex items-center justify-between gap-3">
          <a
            href="tel:+34951234567"
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#2c211b] hover:bg-[#382b23] border border-[#a66a38]/30 text-[#f7f1e5] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#d98236]" />
            <span>+34 951 234 567</span>
          </a>

          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#d98236] hover:bg-[#e69045] text-[#1b1411] font-bold text-xs text-center transition-colors cursor-pointer"
          >
            {language === 'es' ? 'Entendido' : 'Close'}
          </button>
        </div>

      </div>

    </div>
  );
};
