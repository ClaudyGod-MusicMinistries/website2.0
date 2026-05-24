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
    name: 'ClaudyGod Premium T-Shirt',
    image: '/Product1.webp',
    price: 25,
    category: 'clothing',
    description: 'Premium Cotton T-Shirt with iconic branding',
    rating: 5.0,
  },
  {
    id: '2',
    name: 'ClaudyGod Exclusive Hoodie',
    image: '/Product2.webp',
    price: 45,
    category: 'clothing',
    description: 'Comfortable and stylish worship hoodie',
    rating: 4.9,
  },
  {
    id: '3',
    name: 'ClaudyGod Cap Collection',
    image: '/Product3.webp',
    price: 18,
    category: 'accessories',
    description: 'Classic embroidered baseball cap',
    rating: 4.8,
  },
  {
    id: '4',
    name: 'ClaudyGod Worship Tote Bag',
    image: '/Product4.webp',
    price: 20,
    category: 'accessories',
    description: 'Eco-friendly cotton tote bag for ministry events',
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
