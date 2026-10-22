export interface SignaturePick {
  id: string;
  menuItemId: string;
  titleEs: string;
  titleEn: string;
  badgeEs: string;
  badgeEn: string;
  priceDisplay: string;
  priceNum: number;
  ingredientsEs: string;
  ingredientsEn: string;
  image: string;
  categoryNameEs: string;
  categoryNameEn: string;
}

export const SIGNATURE_PICKS: SignaturePick[] = [
  {
    id: 'pick-benedict-salmon',
    menuItemId: 'benedict-jamon-serrano',
    titleEs: 'Huevos Benedict con Jamón Serrano',
    titleEn: 'Eggs Benedict with Iberian Serrano Ham',
    badgeEs: 'Plato Insigne',
    badgeEn: 'House Signature',
    priceDisplay: '9.00€',
    priceNum: 9.00,
    ingredientsEs: 'Huevo de campo poché, finas lonchas de jamón serrano reserva y salsa holandesa casera templada sobre brioche.',
    ingredientsEn: 'Poached free-range farm egg, delicate Serrano ham ribbons & warm homemade hollandaise over toasted brioche.',
    image: '/assets/menu/benedict_jamon_serrano.webp',
    categoryNameEs: 'Huevos Benedict',
    categoryNameEn: 'Eggs Benedict Atelier',
  },
  {
    id: 'pick-pan-adiccion',
    menuItemId: 'esp-huevo-revuelto-aguacate-brava',
    titleEs: 'Especial Pan-Adicción Brava',
    titleEn: 'Scrambled Egg & Avocado Brava Toast',
    badgeEs: 'Favorito Local',
    badgeEn: 'Local Favorite',
    priceDisplay: 'Desde 3.80€',
    priceNum: 3.80,
    ingredientsEs: 'Huevos revueltos cremosos, aguacate hass maduro de la Axarquía y nuestra salsa brava casera con pimentón de la Vera.',
    ingredientsEn: 'Creamy scrambled eggs, ripe local avocado slices and signature smoked brava reduction on artisan pitufo.',
    image: '/assets/menu/huevo_revuelto_aguacate.webp',
    categoryNameEs: 'Pan-Adicción Especial',
    categoryNameEn: 'Specialty Breads',
  },
  {
    id: 'pick-jamon-andaluz',
    menuItemId: 'jamon-tostada-estilo-andaluz',
    titleEs: 'Jamón de Cebo al Estilo Andaluz',
    titleEn: 'Iberian Cebo Ham Andalusian Toast',
    badgeEs: '100% Ibérico',
    badgeEn: '100% Iberian',
    priceDisplay: 'Desde 4.70€',
    priceNum: 4.70,
    ingredientsEs: 'Lonchas templadas de auténtico jamón ibérico de cebo, tomate pera rallado al momento y aceite de oliva virgen extra de Jaén.',
    ingredientsEn: 'Tender slices of Iberian cebo cured ham, freshly grated vine tomato and Jaén extra virgin olive oil.',
    image: '/assets/menu/jamon_cebo_iberico.webp',
    categoryNameEs: 'Selección Jamón de Cebo',
    categoryNameEn: 'Iberian Selection',
  },
  {
    id: 'pick-green-goblin',
    menuItemId: 'smoothie-martinete',
    titleEs: 'Smoothie Martinete & Frutas',
    titleEn: 'Martinete Berry Blitz Smoothie',
    badgeEs: '100% Natural',
    badgeEn: '100% Cold-Pressed',
    priceDisplay: '5.00€',
    priceNum: 5.00,
    ingredientsEs: 'Fresas de Huelva, frutos silvestres del bosque y zumo de naranja recién exprimido.',
    ingredientsEn: 'Fresh strawberries, antioxidant forest berries, and freshly squeezed orange juice.',
    image: '/assets/menu/smoothie_martinete.webp',
    categoryNameEs: 'Explosión de Frutas',
    categoryNameEn: 'Juices & Smoothies',
  },
  {
    id: 'pick-specialty-coffee',
    menuItemId: 'cafe-cappuccino',
    titleEs: 'Cappuccino La Kafeteria',
    titleEn: 'Signature Cappuccino La Kafeteria',
    badgeEs: 'Arábica Finca',
    badgeEn: 'Single Origin',
    priceDisplay: '2.50€',
    priceNum: 2.50,
    ingredientsEs: 'Extracción de precisión de tueste arábica natural con densa crema avellana y plantilla de cacao "K".',
    ingredientsEn: 'Precision arabica extraction with golden crema, silky micro-textured milk, and "K" cocoa stencil.',
    image: '/assets/menu/cappuccino_la_kafeteria.webp',
    categoryNameEs: 'Café & Infusiones',
    categoryNameEn: 'Specialty Coffee',
  },
  {
    id: 'pick-tortilla-espanola',
    menuItemId: 'combo-tortilla-espanola',
    titleEs: 'Tortilla Española Casera',
    titleEn: 'Signature Spanish Potato Omelette',
    badgeEs: 'Receta Tradicional',
    badgeEn: 'Traditional Recipe',
    priceDisplay: '4.00€',
    priceNum: 4.00,
    ingredientsEs: 'Tortilla de patatas recién cuajada al estilo casero, tierna y jugosa al corte, acompañada de pan tostado con tomate.',
    ingredientsEn: 'Freshly folded tender Spanish potato omelette served warm with toasted Andalusian tomato bread.',
    image: '/assets/menu/tortilla_patata.webp',
    categoryNameEs: 'Plato - Combo',
    categoryNameEn: 'Brunch Combos',
  },
];
