import { NewsletterBanner } from '@/components/home/NewsletterBanner';

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NewsletterBanner />
    </>
  );
}
