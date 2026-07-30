import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { normalizeRegions } from '@/lib/data/regions';

export const revalidate = 86400;

const querySchema = z.string().trim().min(2).max(100);

interface CountriesNowResponse {
  error?: boolean;
  data?: {
    states?: Array<{ name?: string; state_code?: string }>;
  };
}

export async function GET(request: NextRequest) {
  const parsed = querySchema.safeParse(request.nextUrl.searchParams.get('country'));
  if (!parsed.success) {
    return NextResponse.json({ regions: [], source: 'invalid' }, { status: 400 });
  }

  try {
    const endpoint = new URL('https://countriesnow.space/api/v0.1/countries/states/q');
    endpoint.searchParams.set('country', parsed.data);
    const response = await fetch(endpoint, { next: { revalidate } });
    if (!response.ok) throw new Error(`Region service returned ${response.status}`);

    const payload = (await response.json()) as CountriesNowResponse;
    if (payload.error) throw new Error('Region service could not resolve the country');

    const regions = normalizeRegions(payload.data?.states ?? []);

    return NextResponse.json({ regions, source: 'live' });
  } catch (error) {
    console.warn('[regions] Live subdivision lookup unavailable:', error);
    return NextResponse.json({ regions: [], source: 'unavailable' });
  }
}
