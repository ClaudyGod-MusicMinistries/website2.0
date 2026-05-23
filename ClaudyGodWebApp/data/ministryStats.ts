// Donation preset tiers — amounts in each currency's base unit (not subunits)
export const currencyPresets: Record<string, { symbol: string; code: string; amounts: number[] }> = {
  NGN: { symbol: '₦', code: 'NGN', amounts: [2000, 5000, 10000, 25000, 50000, 100000] },
  USD: { symbol: '$', code: 'USD', amounts: [5, 10, 25, 50, 100, 250] },
  GBP: { symbol: '£', code: 'GBP', amounts: [5, 10, 25, 50, 100, 200] },
  EUR: { symbol: '€', code: 'EUR', amounts: [5, 10, 25, 50, 100, 200] },
  GHS: { symbol: 'GH₵', code: 'GHS', amounts: [50, 100, 200, 500, 1000, 2000] },
  ZAR: { symbol: 'R',  code: 'ZAR', amounts: [50, 100, 200, 500, 1000, 2000] },
};

export const defaultCurrency = 'NGN';

export type SupportedCurrency = keyof typeof currencyPresets;
