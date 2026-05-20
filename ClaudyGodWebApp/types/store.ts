// store/storeTypes.ts
// src/types/storeTypes.ts
export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  description: string;
  rating?: number; // ✅ Add this line
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
