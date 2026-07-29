import { NextResponse } from 'next/server';
import { FALLBACK_COUNTRIES, type CountryOption } from '@/lib/data/countries';

export const revalidate = 86400;

interface RestCountry {
  alpha2Code?: string;
  name?: string;
  callingCodes?: string[];
}

export async function GET() {
  try {
    const response = await fetch('https://countries.dev/countries', {
      next: { revalidate },
    });
    if (!response.ok) throw new Error(`Country service returned ${response.status}`);

    const source = (await response.json()) as RestCountry[];
    const countries = source
      .flatMap<CountryOption>((country) => {
        const callingCode = country.callingCodes?.[0];
        if (!country.alpha2Code || !country.name || !callingCode) return [];
        return [{ code: country.alpha2Code, name: country.name, dialCode: `+${callingCode}` }];
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    if (countries.length < 190) throw new Error('Country service returned an incomplete list');
    return NextResponse.json({ countries, source: 'live' });
  } catch (error) {
    console.warn('[countries] Using resilient fallback:', error);
    return NextResponse.json({ countries: FALLBACK_COUNTRIES, source: 'fallback' });
  }
}
