import { NextResponse } from 'next/server';
import { FALLBACK_COUNTRIES, type CountryOption } from '@/lib/data/countries';

export const revalidate = 86400;

interface RestCountry {
  cca2?: string;
  name?: { common?: string };
  idd?: { root?: string; suffixes?: string[] };
}

export async function GET() {
  try {
    const response = await fetch(
      'https://restcountries.com/v3.1/all?fields=name,cca2,idd',
      { next: { revalidate } }
    );
    if (!response.ok) throw new Error(`Country service returned ${response.status}`);

    const source = (await response.json()) as RestCountry[];
    const countries = source
      .flatMap<CountryOption>((country) => {
        const root = country.idd?.root;
        const suffix = country.idd?.suffixes?.[0];
        if (!country.cca2 || !country.name?.common || !root) return [];
        return [{ code: country.cca2, name: country.name.common, dialCode: `${root}${suffix ?? ''}` }];
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    if (countries.length < 190) throw new Error('Country service returned an incomplete list');
    return NextResponse.json({ countries, source: 'live' });
  } catch (error) {
    console.warn('[countries] Using resilient fallback:', error);
    return NextResponse.json({ countries: FALLBACK_COUNTRIES, source: 'fallback' });
  }
}

