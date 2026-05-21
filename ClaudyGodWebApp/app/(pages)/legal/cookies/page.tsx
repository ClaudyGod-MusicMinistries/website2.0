import type { Metadata } from 'next';
import { LegalPage } from '@/components/shared/LegalPage';

export const metadata: Metadata = {
  title: 'Cookie Policy — ClaudyGod Music Ministries',
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      lastUpdated="May 2025"
      intro="This Cookie Policy explains how ClaudyGod Music Ministries uses cookies and similar tracking technologies on our website. By continuing to use our website, you consent to our use of cookies as described in this policy."
      sections={[
        {
          heading: 'What Are Cookies',
          body: 'Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the website owners.',
        },
        {
          heading: 'How We Use Cookies',
          body: 'We use cookies to remember your preferences, understand how you use our website, and improve your overall experience. We also use cookies to analyze traffic and usage patterns to help us improve our content and services.',
        },
        {
          heading: 'Essential Cookies',
          body: 'These cookies are necessary for the website to function properly. They enable core functionality such as remembering your cart items in our store. The website cannot function properly without these cookies.',
        },
        {
          heading: 'Analytics Cookies',
          body: 'We may use analytics cookies to understand how visitors interact with our website. These cookies help us improve our website by collecting and reporting information on an anonymous basis.',
        },
        {
          heading: 'Third-Party Cookies',
          body: 'Embedded content from YouTube, Spotify, and other platforms may set their own cookies. We have no control over these third-party cookies and encourage you to review the cookie policies of those services.',
        },
        {
          heading: 'Managing Cookies',
          body: 'You can control and manage cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website. To learn more about managing cookies, visit your browser\'s help section.',
        },
        {
          heading: 'Contact Us',
          body: 'If you have any questions about our use of cookies, please contact us at info@claudygod.com.',
        },
      ]}
    />
  );
}
