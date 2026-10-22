import React, { useState } from 'react';
import { Star, MessageSquareQuote, CheckCircle2, Sparkles, Coffee, Heart, Box, Eye, RotateCw } from 'lucide-react';
import { Language } from '../types';
import { ThreeCoffeeCanvas } from './ThreeCoffeeCanvas';

interface AtmosphereAndReviewsProps {
  language: Language;
}

interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  quoteEs: string;
  quoteEn: string;
  highlightEs: string;
  highlightEn: string;
}

const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Elena R. Fernández',
    location: 'San Pedro Alcántara',
    rating: 5,
    date: 'Hace 2 semanas',
    quoteEs: 'El mejor pitufo de San Pedro sin discusión. El café con leche está en otro nivel y los huevos benedict con salmón son espectaculares. La terraza al sol por la mañana es gloria bendita.',
    quoteEn: 'Hands down the best pitufo toast in San Pedro. The specialty latte is next level and the eggs benedict royale with salmon are sublime. Sitting on the morning sunny terrace is absolute bliss.',
    highlightEs: 'Huevos Benedict & Terraza al Sol',
    highlightEn: 'Eggs Benedict & Sunny Patio',
  },
  {
    id: 'rev-2',
    author: 'Marcus & Sophie Van Dijk',
    location: 'Marbella / Amsterdam',
    rating: 5,
    date: 'Hace 1 mes',
    quoteEs: 'Encontramos La Kafeteria por casualidad buscando café de especialidad real. El café arábica tiene un sabor redondo, y el smoothie Green Goblin con jengibre te recarga el día entero. El equipo es encantador.',
    quoteEn: 'Stumbled upon La Kafeteria searching for real specialty coffee in Costa del Sol. Balanced arabica roast, plus the Green Goblin ginger smoothie recharges you completely. Warm and welcoming staff.',
    highlightEs: 'Café de Especialidad & Smoothies',
    highlightEn: 'Specialty Coffee & Green Smoothies',
  },
  {
    id: 'rev-3',
    author: 'Javier Morales M.',
    location: 'Guadalmina Alta',
    rating: 5,
    date: 'Hace 3 semanas',
    quoteEs: 'Desayuno aquí tres veces por semana. La tostada de jamón de cebo con tomate rallado y AOVE en baguetina de centeno y espelta no tiene rival en Marbella. Rápido, auténtico y con producto de calidad.',
    quoteEn: 'I have breakfast here 3 times a week. The Iberian cebo ham toast on rye and spelt baguette with fresh tomato is unmatched in Marbella. Fast, authentic, and superb ingredients.',
    highlightEs: 'Jamón de Cebo & Pan Artesano',
    highlightEn: 'Iberian Cebo Ham & Artisan Baguette',
  },
];

const ATMOSPHERE_CARDS = [
  {
    id: 'atmo-patio',
    titleEs: 'Nuestra Terraza al Sol',
    titleEn: 'Sunny Outdoor Patio',
    subtitleEs: 'Mornings en San Pedro',
    subtitleEn: 'San Pedro Morning Sun',
    descEs: 'Espacio al aire libre con sombrillas y luz natural mediterránea todo el año.',
    descEn: 'Open-air al fresco dining with shaded umbrellas and warm coastal breeze.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'atmo-extraction',
    titleEs: 'Extracción de Precisión',
    titleEn: 'Specialty Espresso Bar',
    subtitleEs: 'Granos 100% Arábica',
    subtitleEn: '100% Arabica Beans',
    descEs: 'Molido al momento con leche fresca emulsionada a la temperatura óptima.',
    descEn: 'Freshly ground to order with velvety microfoam milk at the exact sweet spot.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'atmo-brunch',
    titleEs: 'Brunch Fresco de Autor',
    titleEn: 'Mediterranean Brunch Craft',
    subtitleEs: 'Huevos de Granja & Aguacates',
    subtitleEn: 'Farm Eggs & Fresh Produce',
    descEs: 'Salsas holandesa y brava caseras preparadas a diario sin ultraprocesados.',
    descEn: 'Signature homemade hollandaise and spicy brava reduction cooked fresh daily.',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'atmo-bakery',
    titleEs: 'Panes & Bollería Diaria',
    titleEn: 'Fresh Artisan Baking',
    subtitleEs: 'Pitufos, Centeno & Croissants',
    subtitleEn: 'Pitufos & Warm Croissants',
    descEs: 'Tradición malagueña en pan crujiente y bollería hojaldrada con mantequilla pura.',
    descEn: 'Authentic Andalusian rolls, ancient spelt baguettes and flaky warm pastries.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
  },
];

export const AtmosphereAndReviews: React.FC<AtmosphereAndReviewsProps> = ({
  language,
}) => {
  const [show3dExtraction, setShow3dExtraction] = useState(false);

  return (
    <section id="atmosphere" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 scroll-mt-24">
      
      {/* Atmosphere Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#d98236] font-mono block mb-1">
          {language === 'es' ? 'La Experiencia' : 'The Vibe'}
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#f7f1e5]">
          {language === 'es' ? 'Ambiente, Terraza & Pasión Barista' : 'Atmosphere, Patio & Craft'}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#dfcfbe]">
          {language === 'es'
            ? 'Un rincón luminoso en San Pedro Alcántara donde la calma del café se une a la energía del brunch mediterráneo.'
            : 'A sun-drenched sanctuary in San Pedro Alcántara where calm specialty coffee meets vibrant daytime dining.'}
        </p>
      </div>

      {/* Atmosphere Visual Grid (3-4 Visual Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
        {ATMOSPHERE_CARDS.map((card) => {
          const isExtractionCard = card.id === 'atmo-extraction';

          return (
            <div
              key={card.id}
              className="group rounded-2xl bg-[#231a15] border border-[#a66a38]/25 overflow-hidden flex flex-col hover:border-[#d98236]/60 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#1b1411]">
                {isExtractionCard && show3dExtraction ? (
                  <ThreeCoffeeCanvas className="w-full h-full min-h-[220px]" />
                ) : (
                  <>
                    <img
                      src={card.image}
                      alt={card.titleEs}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#231a15] via-transparent to-transparent opacity-70" />
                  </>
                )}

                {/* 3D Interactive Mode Toggle for Extraction Card */}
                {isExtractionCard && (
                  <button
                    onClick={() => setShow3dExtraction((prev) => !prev)}
                    className="absolute top-2.5 right-2.5 z-20 px-2.5 py-1 rounded-lg bg-[#1b1411]/90 backdrop-blur-md border border-[#d98236]/60 text-[10px] font-mono font-bold text-[#d98236] hover:bg-[#d98236] hover:text-[#1b1411] transition-all flex items-center gap-1 shadow-md cursor-pointer"
                    title={language === 'es' ? 'Ver modelo 3D interactivo' : 'View interactive 3D model'}
                  >
                    {show3dExtraction ? (
                      <>
                        <Eye className="w-3 h-3" />
                        <span>{language === 'es' ? 'Ver Foto' : 'Photo'}</span>
                      </>
                    ) : (
                      <>
                        <Box className="w-3 h-3" />
                        <span>{language === 'es' ? '3D Barista' : '3D View'}</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#c89666] block">
                      {language === 'es' ? card.subtitleEs : card.subtitleEn}
                    </span>
                    {isExtractionCard && (
                      <span className="text-[9px] font-mono text-[#d98236] uppercase tracking-wider">
                        {show3dExtraction ? 'WebGL 60FPS' : 'Three.js 3D'}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#f7f1e5] mt-0.5">
                    {language === 'es' ? card.titleEs : card.titleEn}
                  </h3>
                  <p className="text-xs text-[#dfcfbe]/80 mt-1 leading-relaxed">
                    {isExtractionCard && show3dExtraction
                      ? (language === 'es'
                          ? 'Taza 3D interactiva en tiempo real con vapor caliente y granos arábica en órbita. Arrastra para girar 360°.'
                          : 'Real-time 3D interactive cup with rising steam particles and orbiting arabica beans. Drag to rotate 360°.')
                      : (language === 'es' ? card.descEs : card.descEn)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Social Proof / Google Reviews Card */}
      <div className="rounded-3xl bg-gradient-to-b from-[#231a15] to-[#1e1612] border border-[#a66a38]/30 p-6 sm:p-10 shadow-2xl space-y-8">
        
        {/* Google Badge Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#a66a38]/20 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1b1411] border border-[#d98236]/40 flex items-center justify-center text-[#d98236] shadow-lg">
              <span className="font-bold text-xl">G</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#f7f1e5]">
                  4.8
                </span>
                <div className="flex items-center text-[#d98236]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-mono text-[#c89666]">
                  (280+ {language === 'es' ? 'reseñas' : 'reviews'})
                </span>
              </div>
              <p className="text-xs text-[#dfcfbe] mt-0.5 font-medium">
                {language === 'es' ? 'Google Reviews Verificadas · San Pedro Alcántara' : 'Verified Google Reviews · San Pedro Alcántara'}
              </p>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=San+Pedro+Alcantara+Marbella"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-[#2c211b] hover:bg-[#382b23] border border-[#a66a38]/40 text-[#f7f1e5] text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{language === 'es' ? 'Ver en Google Maps' : 'View on Google Maps'}</span>
          </a>
        </div>

        {/* 3 Authentic Customer Quotes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-[#1b1411]/80 border border-[#a66a38]/20 flex flex-col justify-between space-y-4 hover:border-[#d98236]/40 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-[#d98236]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#a66a38] font-mono">{rev.date}</span>
                </div>

                <p className="text-xs text-[#dfcfbe] leading-relaxed font-sans italic">
                  "{language === 'es' ? rev.quoteEs : rev.quoteEn}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#a66a38]/15 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#f7f1e5] block">{rev.author}</span>
                  <span className="text-[11px] text-[#c89666] font-mono">{rev.location}</span>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#d98236] px-2 py-0.5 rounded bg-[#d98236]/10">
                  {language === 'es' ? rev.highlightEs : rev.highlightEn}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};
