import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';
import {
  Home,
  User,
  Music2,
  Film,
  CalendarDays,
  BookOpen,
  Heart,
  Newspaper,
  ShoppingBag,
  Mail,
  HandCoins,
} from 'lucide-react';

export type NavIcon = ForwardRefExoticComponent<
  Omit<SVGProps<SVGSVGElement>, 'ref'> & { title?: string; titleId?: string } & RefAttributes<SVGSVGElement>
>;

export interface NavItem {
  href:  string;
  label: string;
  icon:  NavIcon;
}

export const navigationItems: NavItem[] = [
  { href: '/',         label: 'Home',      icon: Home         },
  { href: '/about',    label: 'About',     icon: User         },
  { href: '/music',    label: 'Music',     icon: Music2       },
  { href: '/videos',   label: 'Videos',    icon: Film         },
  { href: '/bookings', label: 'Bookings',  icon: CalendarDays },
  { href: '/events',   label: 'Events',    icon: CalendarDays },
  { href: '/blog',     label: 'Blog',      icon: BookOpen     },
  { href: '/ministry', label: 'Ministry',  icon: Heart        },
  { href: '/news',     label: 'News',      icon: Newspaper    },
  { href: '/store',    label: 'Store',     icon: ShoppingBag  },
  { href: '/contact',  label: 'Contact',   icon: Mail         },
  { href: '/donate',   label: 'Donate',    icon: HandCoins    },
];
