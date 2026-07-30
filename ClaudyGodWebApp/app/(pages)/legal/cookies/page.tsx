import type { Metadata } from 'next';
import { LegalPage } from '@/components/shared/LegalPage';

export const metadata: Metadata = {
  title: 'Cookie Policy — ClaudyGod Music Ministries',
};

export default function CookiesPage() {
  return (
    <LegalPage
      active="cookies"
      title="Cookie Policy"
      lastUpdated="July 2026"
      intro="This policy explains the small amount of browser storage used by this website. Optional storage is used only after you make a choice."
      sections={[
        {
          heading: 'What We Store',
          body: 'Cookies and browser storage are small records saved on your device. We use them only where they support a feature described below.',
        },
        {
          heading: 'Your Consent Choice',
          body: 'We save your privacy choice for 180 days so we do not ask on every visit. You can change or withdraw that choice at any time using Cookie settings in the website footer.',
        },
        {
          heading: 'Necessary Storage',
          body: 'Necessary storage supports security, checkout, the shopping cart, your privacy choice, and whether a welcome message was recently dismissed. It is not used for advertising and cannot be disabled through the consent panel because the requested features depend on it.',
        },
        {
          heading: 'Preference Storage',
          body: 'If you allow preferences, we may remember optional choices such as an anonymous reaction identifier and cached media settings. Refusing preferences does not prevent you from browsing the website.',
        },
        {
          heading: 'External Media',
          body: 'Videos use YouTube’s privacy-enhanced domain. Playing embedded media or following links to YouTube, Spotify, Apple Music, or another service may connect you to that provider, whose own privacy terms then apply.',
        },
        {
          heading: 'Changing Your Choice',
          body: 'Use Cookie settings in the footer to review or change optional storage. You can also remove stored data through your browser settings. Withdrawing preference consent clears the optional storage managed by this website.',
        },
        {
          heading: 'Contact Us',
          body: 'If you have any questions about our use of cookies, please contact us at info@claudygod.org.',
        },
      ]}
    />
  );
}
