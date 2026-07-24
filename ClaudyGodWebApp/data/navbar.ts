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
  HeartHandshake,
  HelpCircle,
} from 'lucide-react';

export type NavIcon = ForwardRefExoticComponent<
  Omit<SVGProps<SVGSVGElement>, 'ref'> & {
    title?: string;
    titleId?: string;
  } & RefAttributes<SVGSVGElement>
>;

/**
 * Single source of truth for navigation — one array, filtered declaratively
 * by breakpoint instead of the old Navbar.tsx pattern of three separately
 * hand-maintained name arrays that had to be kept in sync by hand.
 *
 * `header` controls what shows in the header nav at each breakpoint:
 *   - 'tablet': shown from md upward — the 2 core items visible on tablet
 *     AND folded into the desktop set.
 *   - 'desktop': shown from lg upward only — the 3 additional items that
 *     bring desktop to 5 total.
 *   - 'none': never in the header nav (still reachable via the mobile
 *     overlay and the footer, grouped by `group`).
 * `priority`/`group` still drive the mobile overlay and footer grouping.
 */

export type NavGroup = 'explore' | 'connect' | 'support';
export type HeaderTier = 'tablet' | 'desktop' | 'none';

export interface NavItem {
  href: string;
  label: string;
  icon: NavIcon;
  priority: 'primary' | 'secondary';
  group: NavGroup;
  header: HeaderTier;
}

export const navigationItems: NavItem[] = [
  {
    href: '/music',
    label: 'Music',
    icon: Music2,
    priority: 'primary',
    group: 'explore',
    header: 'tablet',
  },
  {
    href: '/events',
    label: 'Events',
    icon: CalendarDays,
    priority: 'primary',
    group: 'explore',
    header: 'tablet',
  },
  {
    href: '/about',
    label: 'About',
    icon: User,
    priority: 'primary',
    group: 'explore',
    header: 'desktop',
  },
  {
    href: '/videos',
    label: 'Videos',
    icon: Film,
    priority: 'primary',
    group: 'explore',
    header: 'desktop',
  },
  {
    href: '/ministry',
    label: 'Ministry',
    icon: Heart,
    priority: 'primary',
    group: 'explore',
    header: 'desktop',
  },
  {
    href: '/store',
    label: 'Store',
    icon: ShoppingBag,
    priority: 'primary',
    group: 'support',
    header: 'none',
  },
  {
    href: '/contact',
    label: 'Contact',
    icon: Mail,
    priority: 'primary',
    group: 'connect',
    header: 'none',
  },
  {
    href: '/news',
    label: 'News',
    icon: Newspaper,
    priority: 'primary',
    group: 'connect',
    header: 'desktop',
  },
  {
    href: '/bookings',
    label: 'Bookings',
    icon: CalendarDays,
    priority: 'secondary',
    group: 'connect',
    header: 'none',
  },
  {
    href: '/volunteer',
    label: 'Volunteer',
    icon: HandHeart,
    priority: 'secondary',
    group: 'connect',
    header: 'none',
  },
  {
    href: '/prayer',
    label: 'Prayer',
    icon: HeartHandshake,
    priority: 'secondary',
    group: 'connect',
    header: 'none',
  },
  {
    href: '/donate',
    label: 'Donate',
    icon: HandCoins,
    priority: 'secondary',
    group: 'support',
    header: 'none',
  },
  {
    href: '/help',
    label: 'Help',
    icon: HelpCircle,
    priority: 'secondary',
    group: 'support',
    header: 'none',
  },
];
