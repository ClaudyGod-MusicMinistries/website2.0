import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';
import {
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
  HandHeart,
  HelpCircle,
} from 'lucide-react';

export type NavIcon = ForwardRefExoticComponent<
  Omit<SVGProps<SVGSVGElement>, 'ref'> & { title?: string; titleId?: string } & RefAttributes<SVGSVGElement>
>;

/**
 * Single source of truth for navigation — replaces the old Navbar.tsx
 * pattern of three separately hand-maintained arrays (PRIMARY_NAV,
 * TABLET_NAV, and an implicit "everything except Donate" mobile list) that
 * had to be kept in sync by hand. Desktop/tablet render `primary` items
 * inline; the mobile overlay and the footer render everything, grouped by
 * `group`. `/volunteer` previously appeared in none of the three — it's
 * back in the one list now.
 */

export type NavGroup = 'explore' | 'connect' | 'support';

export interface NavItem {
  href: string;
  label: string;
  icon: NavIcon;
  priority: 'primary' | 'secondary';
  group: NavGroup;
}

export const navigationItems: NavItem[] = [
  { href: '/about',     label: 'About',     icon: User,         priority: 'primary',   group: 'explore' },
  { href: '/music',     label: 'Music',     icon: Music2,       priority: 'primary',   group: 'explore' },
  { href: '/videos',    label: 'Videos',    icon: Film,         priority: 'primary',   group: 'explore' },
  { href: '/events',    label: 'Events',    icon: CalendarDays, priority: 'primary',   group: 'explore' },
  { href: '/ministry',  label: 'Ministry',  icon: Heart,        priority: 'primary',   group: 'explore' },
  { href: '/store',     label: 'Store',     icon: ShoppingBag,  priority: 'primary',   group: 'support' },
  { href: '/contact',   label: 'Contact',   icon: Mail,         priority: 'primary',   group: 'connect' },
  { href: '/blog',      label: 'Blog',      icon: BookOpen,     priority: 'secondary', group: 'explore' },
  { href: '/news',      label: 'News',      icon: Newspaper,    priority: 'secondary', group: 'connect' },
  { href: '/bookings',  label: 'Bookings',  icon: CalendarDays, priority: 'secondary', group: 'connect' },
  { href: '/volunteer', label: 'Volunteer', icon: HandHeart,    priority: 'secondary', group: 'connect' },
  { href: '/donate',    label: 'Donate',    icon: HandCoins,    priority: 'secondary', group: 'support' },
  { href: '/help',      label: 'Help',      icon: HelpCircle,   priority: 'secondary', group: 'support' },
];
