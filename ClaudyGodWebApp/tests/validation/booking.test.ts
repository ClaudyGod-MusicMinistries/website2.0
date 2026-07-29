import assert from 'node:assert/strict';
import test from 'node:test';
import { bookingSchema } from '../../lib/validation/booking';

const validBooking = {
  firstName: 'Production',
  lastName: 'Audit',
  email: 'AUDIT@example.com',
  phone: '+12025550123',
  countryCode: 'US',
  organization: 'ClaudyGod Ministry',
  orgType: 'Ministry',
  eventType: 'Worship service',
  eventDetails: 'A sufficiently detailed description of the proposed worship service.',
  eventDate: '2099-12-20T12:00:00.000Z',
  addressLine1: '1 Test Avenue',
  addressLine2: '',
  city: 'Test City',
  state: 'Test State',
  zipCode: '00000',
  country: 'United States',
  agreeTerms: true,
} as const;

test('accepts the exact payload produced by BookingForm, including zipCode', () => {
  const result = bookingSchema.safeParse(validBooking);
  assert.equal(result.success, true);
  if (result.success) assert.equal(result.data.email, 'audit@example.com');
});

test('returns a zipCode field error when the postal code is missing', () => {
  const result = bookingSchema.safeParse({ ...validBooking, zipCode: '' });
  assert.equal(result.success, false);
  if (!result.success) assert.equal(result.error.issues[0]?.path[0], 'zipCode');
});

test('rejects unknown fields so the frontend and backend contract cannot drift silently', () => {
  const result = bookingSchema.safeParse({ ...validBooking, unexpected: true });
  assert.equal(result.success, false);
});

test('requires resolved values instead of a bare Other selection', () => {
  const organizationResult = bookingSchema.safeParse({ ...validBooking, orgType: 'Other' });
  const eventResult = bookingSchema.safeParse({ ...validBooking, eventType: 'Other' });

  assert.equal(organizationResult.success, false);
  assert.equal(eventResult.success, false);
  if (!organizationResult.success) {
    assert.equal(organizationResult.error.issues[0]?.path[0], 'orgType');
  }
  if (!eventResult.success) assert.equal(eventResult.error.issues[0]?.path[0], 'eventType');
});
