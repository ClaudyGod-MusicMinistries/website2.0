import assert from 'node:assert/strict';
import test from 'node:test';
import { canShowWelcome, CONSENT_VERSION, parseConsent } from '../../lib/utils/cookieConsent';

test('accepts the current consent record', () => {
  const consent = parseConsent(
    JSON.stringify({
      version: CONSENT_VERSION,
      necessary: true,
      preferences: false,
      decidedAt: Date.now(),
    })
  );
  assert.equal(consent?.preferences, false);
});

test('rejects malformed and outdated consent records', () => {
  assert.equal(parseConsent('not-json'), null);
  assert.equal(
    parseConsent(
      JSON.stringify({
        version: 1,
        necessary: true,
        preferences: true,
        decidedAt: Date.now(),
      })
    ),
    null
  );
  assert.equal(
    parseConsent(
      JSON.stringify({
        version: CONSENT_VERSION,
        necessary: false,
        preferences: true,
        decidedAt: Date.now(),
      })
    ),
    null
  );
});

test('shows the welcome experience after any privacy choice until dismissed', () => {
  const necessaryOnly = parseConsent(
    JSON.stringify({
      version: CONSENT_VERSION,
      necessary: true,
      preferences: false,
      decidedAt: Date.now(),
    })
  );

  assert.equal(canShowWelcome(null, false), false);
  assert.equal(canShowWelcome(necessaryOnly, false), true);
  assert.equal(canShowWelcome(necessaryOnly, true), false);
});
