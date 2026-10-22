export type Language = 'es' | 'en';

export type CategoryId = 
  | 'tradicion-pan'
  | 'pan-adiccion'
  | 'croissan-dulces'
  | 'huevos-benedict'
  | 'plato-combo'
  | 'jamon-cebo'
  | 'tapas'
  | 'cafe-infusiones'
  | 'refrescos'
  | 'frutas-smoothies'
  | 'cerveza-vinos';

export interface BreadTierPrices {
  blancoIntegral: number;
  cereal: number;
  baguetina: number;
}

export type PricingType = 
  | { type: 'single'; price: number }
  | { type: 'bread_tiers'; prices: BreadTierPrices }
  | { type: 'sizes'; prices: { labelEs: string; labelEn: string; price: number }[] };

export interface MenuItem {
  id: string;
  nameEs: string;
  nameEn: string;
  category: CategoryId;
  descriptionEs: string;
  descriptionEn: string;
  pricing: PricingType;
  tags?: ('gluten_option' | 'vegetarian' | 'iberico' | 'specialty' | 'homemade' | 'seasonal')[];
  image?: string;
  popular?: boolean;
}

export interface SelectedItemOption {
  breadType?: 'blanco_integral' | 'cereal' | 'baguetina';
  isGlutenFree?: boolean; // +0.90€
  sizeIndex?: number;
  milkType?: string;
  drinkTemperature?: string;
  specialInstructions?: string;
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  selectedOption: SelectedItemOption;
  unitPrice: number;
  quantity: number;
}
