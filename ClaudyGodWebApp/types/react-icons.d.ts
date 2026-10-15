declare module 'react-icons' {
  export type IconType = (
    props: React.ComponentPropsWithoutRef<'svg'> & {
      size?: string | number;
      color?: string;
      title?: string;
    }
  ) => React.ReactElement;
}

declare module 'react-icons/fa' {
  export const FaCreditCard: import('react-icons').IconType;
  export const FaUniversity: import('react-icons').IconType;
  export const FaGlobe: import('react-icons').IconType;
  export const FaMobileAlt: import('react-icons').IconType;
  export const FaBuilding: import('react-icons').IconType;
  export type IconType = import('react-icons').IconType;
}

declare module 'react-icons/fa6' {
  export const FaSpotify: import('react-icons').IconType;
  export const FaApple: import('react-icons').IconType;
  export const FaYoutube: import('react-icons').IconType;
  export const FaDeezer: import('react-icons').IconType;
  export const FaAmazon: import('react-icons').IconType;
  export const FaFacebookF: import('react-icons').IconType;
  export const FaXTwitter: import('react-icons').IconType;
  export const FaInstagram: import('react-icons').IconType;
  export const FaLinkedinIn: import('react-icons').IconType;
  export const FaTiktok: import('react-icons').IconType;
  export type IconType = import('react-icons').IconType;
}
