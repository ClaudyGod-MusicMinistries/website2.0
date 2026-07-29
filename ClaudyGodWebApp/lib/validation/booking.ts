import { z } from 'zod';

const optionalTrimmed = (maximum: number) => z.string().trim().max(maximum).optional();

export const bookingSchema = z
  .object({
    firstName: z.string().trim().min(2).max(60),
    lastName: z.string().trim().min(2).max(60),
    email: z
      .string()
      .trim()
      .email()
      .max(254)
      .transform((value) => value.toLowerCase()),
    phone: z.string().regex(/^\+[1-9]\d{6,14}$/, 'Use a valid international phone number.'),
    countryCode: z.string().regex(/^[A-Z]{2}$/, 'Choose a valid country.'),
    organization: z.string().trim().min(2).max(150),
    orgType: z
      .string()
      .trim()
      .min(2)
      .max(100)
      .refine((value) => value.toLowerCase() !== 'other', 'Specify the organisation category.'),
    eventType: z
      .string()
      .trim()
      .min(2)
      .max(100)
      .refine((value) => value.toLowerCase() !== 'other', 'Specify the event type.'),
    eventDetails: z.string().trim().min(30).max(2000),
    eventDate: z
      .string()
      .datetime()
      .refine((value) => new Date(value) > new Date(), 'Choose a future event date.'),
    addressLine1: z.string().trim().min(3).max(200),
    addressLine2: optionalTrimmed(200),
    city: z.string().trim().min(2).max(100),
    state: z.string().trim().min(2).max(100),
    country: z.string().trim().min(2).max(100),
    agreeTerms: z.literal(true, {
      errorMap: () => ({ message: 'Booking terms must be accepted.' }),
    }),
  })
  .strict();

export type BookingRequest = z.infer<typeof bookingSchema>;
