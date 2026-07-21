// store/storeTypes.ts
// src/types/storeTypes.ts
export interface Product {
  id: string;
  name: string;
  /** Cover image — always images[0]. Kept as its own field so cart/checkout/JSON-LD don't need to know about galleries. */
  image: string;
  /** Additional views (front/back, angles). Omit or single-entry for single-image products. */
  images?: string[];
  price: number;
  category: string;
  description: string;
  rating?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface StoreState {
  products: Product[];
  categories: Category[];
  cart: {
    items: CartItem[];
    isOpen: boolean;
  };
  ui: {
    activeCategory: string;
    currentSlide: number;
    slideDirection: 'left' | 'right';
    slideCount: number;
    dialogProduct: Product | null;
  };
}
