import { z } from 'zod';

// ─── Store checkout (only remaining Zod schema — used in checkout flow) ────

const OrderItem = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  name:      z.string().min(1, 'Product name is required').max(200),
  quantity:  z.number().int().min(1).max(99),
  price:     z.number().positive(),
});

const PaymentMethod = z.enum(['stripe', 'paypal', 'zelle', 'paystack', 'nigerian-bank']);

export const orderSchema = z.object({
  items: z.array(OrderItem).min(1).max(20),

  shipping: z.object({
    firstName: z.string().min(1).max(50).trim(),
    lastName:  z.string().min(1).max(50).trim(),
    email:     z.string().email().toLowerCase().trim(),
    phone:     z.string().regex(/^\+?[0-9\s\-().]{7,20}$/).optional(),
    address1:  z.string().min(5).max(200).trim(),
    address2:  z.string().max(200).trim().optional(),
    city:      z.string().min(2).max(100).trim(),
    state:     z.string().min(2).max(100).trim(),
    zipCode:   z.string().min(3).max(20).trim(),
    country:   z.string().min(2).max(100).trim(),
  }),

  payment: z.object({
    method:   PaymentMethod,
    currency: z.enum(['USD', 'NGN', 'GBP', 'CAD']).default('USD'),
  }),

  notes: z.string().max(500).trim().optional(),
});

export type OrderInput    = z.infer<typeof orderSchema>;
export type OrderItem     = z.infer<typeof OrderItem>;
export type PaymentMethod = z.infer<typeof PaymentMethod>;
