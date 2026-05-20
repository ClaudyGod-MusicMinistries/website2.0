export type CountryCode = 'US' | 'CA' | 'UK' | 'NG';

export type BookingFormData = {
  eventDate: any;
  address: any;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: CountryCode;
  organization: string;
  orgType: string;
  eventType: string;
  eventDetails: string;
  day: number;
  month: string;
  year: number;
  address1: string;
  address2?: string;
  country: CountryCode;
  state: string;
  city: string;
  zipCode: string;
  agreeTerms: boolean;
};
export interface EventInfoProps {
  states: string[];
  cities: string[];
  country: CountryCode;
}
