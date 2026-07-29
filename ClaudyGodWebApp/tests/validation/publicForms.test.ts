import assert from 'node:assert/strict';
import test from 'node:test';
import {
  contactSchema,
  prayerRequestSchema,
  subscriberSchema,
  ticketReservationSchema,
  volunteerSchema,
} from '../../lib/validation/publicForms';

test('contact validation normalizes valid input and rejects dead-end fields', () => {
  const valid = contactSchema.safeParse({
    name: ' Ada Lovelace ',
    email: 'ADA@example.com',
    message: 'A complete contact message.',
  });
  assert.equal(valid.success, true);
  if (valid.success) assert.equal(valid.data.email, 'ada@example.com');
  assert.equal(
    contactSchema.safeParse({
      name: 'Ada',
      email: 'ada@example.com',
      message: 'A complete message.',
      subject: 'discarded',
    }).success,
    false
  );
});

test('prayer request validation enforces the public API contract', () => {
  assert.equal(
    prayerRequestSchema.safeParse({
      name: 'Ada',
      email: 'ada@example.com',
      subject: 'Guidance',
      requestText: 'Please pray with me.',
      isConfidential: true,
    }).success,
    true
  );
  assert.equal(
    prayerRequestSchema.safeParse({
      name: 'Ada',
      email: 'invalid',
      subject: 'Guidance',
      requestText: 'Please pray with me.',
      isConfidential: true,
    }).success,
    false
  );
});

test('volunteer validation accepts only supported backend roles', () => {
  const base = {
    firstName: 'Ada',
    lastName: 'Lovelace',
    email: 'ada@example.com',
    reason: 'I have relevant experience and availability.',
  };
  assert.equal(volunteerSchema.safeParse({ ...base, role: 'Media' }).success, true);
  assert.equal(volunteerSchema.safeParse({ ...base, role: 'Unrecognized' }).success, false);
});

test('subscriber validation requires a usable name and email', () => {
  assert.equal(subscriberSchema.safeParse({ name: 'Ada', email: 'ADA@example.com' }).success, true);
  assert.equal(subscriberSchema.safeParse({ name: '', email: 'ada@example.com' }).success, false);
});

test('ticket reservation validation enforces quantity and international phone format', () => {
  const valid = {
    eventId: 'event-1',
    firstName: 'Ada',
    lastName: 'Lovelace',
    email: 'ada@example.com',
    phone: '+2348000000000',
    quantity: 2,
  };
  assert.equal(ticketReservationSchema.safeParse(valid).success, true);
  assert.equal(ticketReservationSchema.safeParse({ ...valid, quantity: 11 }).success, false);
});
