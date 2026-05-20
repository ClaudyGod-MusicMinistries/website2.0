import { FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn, FaTiktok } from 'react-icons/fa6';
import type { IconType } from 'react-icons';

export interface SocialLink {
  icon: IconType;
  url: string;
  label: string;
  color: string;
  hover: string;
}

export const socialLinks: SocialLink[] = [
  {
    icon: FaFacebookF,
    url: 'https://www.facebook.com/ClaudyGod/',
    label: 'Facebook',
    color: 'bg-[#1877F2]',
    hover: 'hover:bg-[#166FE5]',
  },
  {
    icon: FaXTwitter,
    url: 'https://twitter.com/claudygod',
    label: 'Twitter',
    color: 'bg-black',
    hover: 'hover:bg-[#0D0D0D]',
  },
  {
    icon: FaInstagram,
    url: 'https://www.instagram.com/singerclaudygod/?hl=en',
    label: 'Instagram',
    color: 'bg-gradient-to-br from-[#833AB4] via-[#C13584] to-[#E1306C]',
    hover: 'hover:from-[#8F47B9] hover:via-[#C73E8C] hover:to-[#E63C74]',
  },
  {
    icon: FaLinkedinIn,
    url: 'https://www.linkedin.com/in/claudygod-music-and-ministries-b2887094',
    label: 'LinkedIn',
    color: 'bg-[#0A66C2]',
    hover: 'hover:bg-[#095DB9]',
  },
  {
    icon: FaTiktok,
    url: 'https://www.tiktok.com/@claudygod',
    label: 'TikTok',
    color: 'bg-[#000000]',
    hover: 'hover:bg-[#111111]',
  },
];
