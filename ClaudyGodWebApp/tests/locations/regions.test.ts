import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeRegions } from '../../lib/data/regions';

test('normalizes, sorts, and deduplicates subdivision records', () => {
  assert.deepEqual(
    normalizeRegions([
      { name: ' Rivers State ', state_code: ' NG-RI ' },
      { name: 'Abia State', state_code: 'NG-AB' },
      { name: 'rivers state', state_code: 'duplicate' },
      { state_code: 'invalid' },
      { name: 'Federal Capital Territory' },
    ]),
    [
      { name: 'Abia State', code: 'NG-AB' },
      { name: 'Federal Capital Territory', code: 'Federal Capital Territory' },
      { name: 'Rivers State', code: 'NG-RI' },
    ]
  );
});

test('returns an empty collection when the provider has no usable regions', () => {
  assert.deepEqual(normalizeRegions([]), []);
  assert.deepEqual(normalizeRegions([{ name: ' ' }, {}]), []);
});
