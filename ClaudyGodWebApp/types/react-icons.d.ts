import type { ComponentPropsWithoutRef, ReactElement } from 'react';

declare module 'react-icons' {
  export type IconType = (
    props: ComponentPropsWithoutRef<'svg'> & {
      size?: string | number;
      color?: string;
      title?: string;
    }
  ) => ReactElement;
}

declare module 'react-icons/fa' {
  import type { IconType } from 'react-icons';
  export const FaCreditCard: IconType;
  export const FaUniversity: IconType;
  export const FaGlobe: IconType;
  export const FaMobileAlt: IconType;
  export const FaBuilding: IconType;
  export type { IconType };
}

declare module 'react-icons/fa6' {
  import type { IconType } from 'react-icons';
  export const FaSpotify: IconType;
  export const FaApple: IconType;
  export const FaYoutube: IconType;
  export const FaDeezer: IconType;
  export const FaAmazon: IconType;
  export const FaFacebookF: IconType;
  export const FaXTwitter: IconType;
  export const FaInstagram: IconType;
  export const FaLinkedinIn: IconType;
  export const FaTiktok: IconType;
  export type { IconType };
}
