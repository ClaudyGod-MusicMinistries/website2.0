import { z } from 'zod';

// ─── Reusable field definitions ───────────────────────────────────────────

const name = z
  .string({ required_error: 'Name is required' })
  .min(2, 'Name must be at least 2 characters')
  .max(80, 'Name must be under 80 characters')
  .trim();

const email = z
  .string({ required_error: 'Email is required' })
  .email('Please enter a valid email address')
  .toLowerCase()
  .trim();

const phone = z
  .string()
  .regex(/^\+?[0-9\s\-().]{7,20}$/, 'Please enter a valid phone number')
  .optional();

const message = z
  .string({ required_error: 'Message is required' })
  .min(10, 'Message must be at least 10 characters')
  .max(2000, 'Message must be under 2000 characters')
  .trim();

// ─── Contact form ─────────────────────────────────────────────────────────

export const contactSchema = z.object({
  name,
  email,
  subject: z
    .string()
    .min(3, 'Subject must be at least 3 characters')
    .max(120, 'Subject must be under 120 characters')
    .trim()
    .optional(),
  message,
  phone: phone,
});

export type ContactInput = z.infer<typeof contactSchema>;

// ─── Newsletter subscription ──────────────────────────────────────────────

export const newsletterSchema = z.object({
  email,
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50)
    .trim()
    .optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

// ─── Booking form ─────────────────────────────────────────────────────────

const CountryCode = z.enum(['US', 'CA', 'UK', 'NG', 'GH'], {
  errorMap: () => ({ message: 'Please select a valid country' }),
});

const OrgType = z.enum([
  'church',
  'university',
  'conference',
  'concert',
  'private',
  'other',
]);

export const bookingSchema = z.object({
  // Personal
  firstName: z
    .string({ required_error: 'First name is required' })
    .min(2, 'First name must be at least 2 characters')
    .max(50)
    .trim(),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .min(2, 'Last name must be at least 2 characters')
    .max(50)
    .trim(),
  email,
  phone: z
    .string({ required_error: 'Phone number is required' })
    .regex(/^\+?[0-9\s\-().]{7,20}$/, 'Please enter a valid phone number'),

  // Organization
  organization: z
    .string({ required_error: 'Organization name is required' })
    .min(2, 'Organization name is required')
    .max(120)
    .trim(),
  orgType: OrgType,

  // Event
  eventType: z
    .string({ required_error: 'Event type is required' })
    .min(2, 'Event type is required')
    .max(100)
    .trim(),
  eventDetails: z
    .string()
    .max(2000, 'Event details must be under 2000 characters')
    .trim()
    .optional(),
  eventDate: z
    .string({ required_error: 'Event date is required' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),

  // Location
  address1: z
    .string({ required_error: 'Address is required' })
    .min(5, 'Please enter a valid address')
    .max(200)
    .trim(),
  address2: z.string().max(200).trim().optional(),
  city: z
    .string({ required_error: 'City is required' })
    .min(2)
    .max(100)
    .trim(),
  state: z
    .string({ required_error: 'State / Province is required' })
    .min(2)
    .max(100)
    .trim(),
  zipCode: z
    .string({ required_error: 'Zip / Postal code is required' })
    .min(3)
    .max(20)
    .trim(),
  country: CountryCode,

  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the terms and conditions' }),
  }),
});

export type BookingInput = z.infer<typeof bookingSchema>;

// ─── Volunteer form ───────────────────────────────────────────────────────

export const volunteerSchema = z.object({
  firstName: z
    .string({ required_error: 'First name is required' })
    .min(2)
    .max(50)
    .trim(),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .min(2)
    .max(50)
    .trim(),
  email,
  phone,
  city: z.string().min(2).max(100).trim().optional(),
  country: z.string().min(2).max(100).trim().optional(),
  skills: z
    .array(z.string())
    .min(1, 'Please select at least one area of interest')
    .max(10),
  availability: z.enum(['weekdays', 'weekends', 'both', 'flexible']).optional(),
  message: z
    .string()
    .max(1000, 'Message must be under 1000 characters')
    .trim()
    .optional(),
});

export type VolunteerInput = z.infer<typeof volunteerSchema>;

// ─── Store order ──────────────────────────────────────────────────────────

const OrderItem = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  name:      z.string().min(1, 'Product name is required').max(200),
  quantity: z
    .number({ required_error: 'Quantity is required' })
    .int()
    .min(1, 'Quantity must be at least 1')
    .max(99, 'Quantity cannot exceed 99'),
  price: z.number().positive('Price must be positive'),
});

const PaymentMethod = z.enum([
  'stripe',
  'paypal',
  'zelle',
  'paystack',
  'nigerian-bank',
]);

export const orderSchema = z.object({
  items: z
    .array(OrderItem)
    .min(1, 'Order must contain at least one item')
    .max(20, 'Order cannot exceed 20 items'),

  shipping: z.object({
    firstName: z.string().min(1).max(50).trim(),
    lastName:  z.string().min(1).max(50).trim(),
    email,
    phone,
    address1:  z.string().min(5).max(200).trim(),
    address2:  z.string().max(200).trim().optional(),
    city:      z.string().min(2).max(100).trim(),
    state:     z.string().min(2).max(100).trim(),
    zipCode:   z.string().min(3).max(20).trim(),
    country:   z.string().min(2).max(100).trim(),
  }),

  payment: z.object({
    method: PaymentMethod,
    currency: z.enum(['USD', 'NGN', 'GBP', 'CAD']).default('USD'),
  }),

  notes: z.string().max(500).trim().optional(),
});

export type OrderInput   = z.infer<typeof orderSchema>;
export type OrderItem    = z.infer<typeof OrderItem>;
export type PaymentMethod = z.infer<typeof PaymentMethod>;
