import { NewsletterBanner } from '@/components/home/NewsletterBanner';
import { AppDownload } from '@/components/home/AppDownload';

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NewsletterBanner />
      <AppDownload />
    </>
  );
}
