export type RarityLevel = 'common' | 'premium' | 'treasure-hunt' | 'super-treasure-hunt';

export interface Product {
  id: string;
  name: string;
  toyNumber: string;
  price: number;
  category: string;
  rarity: RarityLevel;
  image: string;
  series?: string;
  year?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartSummary {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
}

export type PaymentMethod = 'cash' | 'card' | 'digital-wallet';
