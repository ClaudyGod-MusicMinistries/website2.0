import { FaCreditCard, FaMobileAlt, FaBuilding, FaGlobe, FaUniversity } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import type { Product } from '@/types/store';

const CDN = 'https://cdn.jsdelivr.net/gh/ClaudyGod-MusicMinistries/CGM-Assets@latest';

export interface Category {
  id: string;
  name: string;
}

export const categories: Category[] = [
  { id: 'all', name: 'All' },
  { id: 'clothing', name: 'Clothing' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'music', name: 'Music' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'ClaudyGod Music & Ministries Mug',
    image: '/Product1.webp',
    images: ['/Product1.webp', '/Product2.webp'],
    price: 12,
    category: 'accessories',
    description:
      'Ceramic mug with the ClaudyGod Music & Ministries crest on one side and an inspirational message on the reverse — perfect for your daily coffee, tea, or devotional moments.',
    rating: 5.0,
  },
  {
    id: '3',
    name: 'ClaudyGod T-Shirt',
    image: '/Product3.webp',
    price: 10,
    category: 'clothing',
    description:
      'This ClaudyGod T-shirt is made from soft, breathable fabric, perfect for worship and casual wear.',
    rating: 4.8,
  },
  {
    id: '4',
    name: 'Premium T-Shirt',
    image: '/Product4.webp',
    price: 15,
    category: 'clothing',
    description:
      'Suitable for worship and casual wear, this premium t-shirt is made from high-quality materials for comfort and durability.',
    rating: 4.7,
  },
  {
    id: '5',
    name: 'ClaudyGod Music EP',
    image: '/CD1.png',
    price: 10,
    category: 'music',
    description: 'Digital EP: Pay. Stream. Download.',
    rating: 4.9,
  },
  {
    id: '6',
    name: 'Get our Latest Album',
    image: '/resize_abt.webp',
    price: 10,
    category: 'music',
    description: 'Full album digital download.',
    rating: 5.0,
  },
];

export interface PaymentOption {
  id: string;
  name: string;
  description: string;
  icon: IconType;
  color: string;
}

export const paymentOptions: PaymentOption[] = [
  {
    id: 'stripe',
    name: 'Credit/Debit Card',
    description: 'Visa, Mastercard, American Express',
    icon: FaCreditCard,
    color: '#3B82F6',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Pay with your PayPal account',
    icon: FaMobileAlt,
    color: '#003087',
  },
  {
    id: 'zelle',
    name: 'Zelle',
    description: 'Send money with Zelle',
    icon: FaBuilding,
    color: '#6D1ED4',
  },
  {
    id: 'paystack',
    name: 'Paystack',
    description: 'Nigerian payment gateway',
    icon: FaGlobe,
    color: '#00C3F7',
  },
  {
    id: 'nigerian-bank',
    name: 'Nigerian Bank Transfer',
    description: 'Direct bank transfer to Nigerian account',
    icon: FaUniversity,
    color: '#10B981',
  },
];
