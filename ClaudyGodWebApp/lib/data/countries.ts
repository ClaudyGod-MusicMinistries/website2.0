export interface CountryOption {
  code: string;
  name: string;
  dialCode: string;
}

// Kept intentionally compact: the server refreshes the complete list from
// REST Countries. These cover the ministry's primary markets if that service
// is temporarily unavailable.
export const FALLBACK_COUNTRIES: CountryOption[] = [
  { code: 'NG', name: 'Nigeria', dialCode: '+234' },
  { code: 'GH', name: 'Ghana', dialCode: '+233' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44' },
  { code: 'US', name: 'United States', dialCode: '+1' },
  { code: 'CA', name: 'Canada', dialCode: '+1' },
  { code: 'ZA', name: 'South Africa', dialCode: '+27' },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971' },
  { code: 'AU', name: 'Australia', dialCode: '+61' },
  { code: 'BJ', name: 'Benin', dialCode: '+229' },
  { code: 'BR', name: 'Brazil', dialCode: '+55' },
  { code: 'CM', name: 'Cameroon', dialCode: '+237' },
  { code: 'CI', name: "Côte d'Ivoire", dialCode: '+225' },
  { code: 'DE', name: 'Germany', dialCode: '+49' },
  { code: 'ES', name: 'Spain', dialCode: '+34' },
  { code: 'FR', name: 'France', dialCode: '+33' },
  { code: 'IE', name: 'Ireland', dialCode: '+353' },
  { code: 'IN', name: 'India', dialCode: '+91' },
  { code: 'IT', name: 'Italy', dialCode: '+39' },
  { code: 'KE', name: 'Kenya', dialCode: '+254' },
  { code: 'LR', name: 'Liberia', dialCode: '+231' },
  { code: 'NL', name: 'Netherlands', dialCode: '+31' },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64' },
  { code: 'RW', name: 'Rwanda', dialCode: '+250' },
  { code: 'SL', name: 'Sierra Leone', dialCode: '+232' },
  { code: 'SN', name: 'Senegal', dialCode: '+221' },
  { code: 'TZ', name: 'Tanzania', dialCode: '+255' },
  { code: 'UG', name: 'Uganda', dialCode: '+256' },
  { code: 'ZM', name: 'Zambia', dialCode: '+260' },
  { code: 'ZW', name: 'Zimbabwe', dialCode: '+263' },
];

export function flagEmoji(code: string) {
  return code
    .toUpperCase()
    .replace(/./g, (character) => String.fromCodePoint(character.charCodeAt(0) + 127397));
}

