import { z } from 'zod';

const email = z
  .string()
  .trim()
  .email()
  .max(254)
  .transform((value) => value.toLowerCase());

export const contactSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email,
    message: z.string().trim().min(10).max(2000),
  })
  .strict();

export const prayerRequestSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email,
    subject: z.string().trim().min(2).max(300),
    requestText: z.string().trim().min(5).max(5000),
    isConfidential: z.boolean(),
  })
  .strict();

export const volunteerSchema = z
  .object({
    firstName: z.string().trim().min(2).max(60),
    lastName: z.string().trim().min(2).max(60),
    email,
    role: z.enum(['BackupSinger', 'Protocol', 'Media', 'Security', 'Vocalist', 'Others']),
    reason: z.string().trim().min(20).max(2000),
  })
  .strict();

export const subscriberSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email,
  })
  .strict();

export const ticketReservationSchema = z
  .object({
    eventId: z.string().trim().min(1).max(100),
    firstName: z.string().trim().min(2).max(60),
    lastName: z.string().trim().min(2).max(60),
    email,
    phone: z.string().regex(/^\+[1-9]\d{6,14}$/),
    quantity: z.number().int().min(1).max(10),
  })
  .strict();
