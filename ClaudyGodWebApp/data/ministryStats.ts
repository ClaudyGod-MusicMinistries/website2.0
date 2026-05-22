import { Music, Globe, Users, Heart } from 'lucide-react';

// ── Ministry impact stats ── used in DonateSection, DonateClient, About, etc.
export const ministryStats = [
  { stat: '20+', label: 'Years of Ministry', icon: Globe  },
  { stat: '7',   label: 'Albums Released',   icon: Music  },
  { stat: '50+', label: 'Nations Reached',   icon: Users  },
  { stat: '∞',   label: 'Lives Touched',     icon: Heart  },
] as const;

// ── Donation impact tiers ── shown in DonateSection + DonateClient
export const donationTiers = [
  { value: 10,  label: '$10',  note: 'Produces a worship session'    },
  { value: 25,  label: '$25',  note: 'Funds outreach event materials' },
  { value: 50,  label: '$50',  note: 'Sponsors a ministry tour stop'  },
  { value: 100, label: '$100', note: 'Supports full album production'  },
  { value: 250, label: '$250', note: 'Covers a live concert event'     },
  { value: 500, label: '$500', note: 'Funds a ministry campaign'       },
] as const;

export type DonationTier = (typeof donationTiers)[number];
