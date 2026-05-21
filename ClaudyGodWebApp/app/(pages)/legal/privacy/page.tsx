import type { Metadata } from 'next';
import { LegalPage } from '@/components/shared/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy — ClaudyGod Music Ministries',
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="May 2025"
      intro="ClaudyGod Music Ministries ('we', 'us', or 'our') is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or interact with our services."
      sections={[
        {
          heading: 'Information We Collect',
          body: 'We collect information you provide directly to us, such as when you subscribe to our newsletter, submit a contact form, or make a booking request. This may include your name, email address, phone number, and any other information you choose to provide.',
        },
        {
          heading: 'How We Use Your Information',
          body: 'We use the information we collect to respond to your inquiries, send ministry updates and newsletters (with your consent), process booking requests, and improve our website and services. We do not sell your personal information to third parties.',
        },
        {
          heading: 'Cookies',
          body: 'Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on your device that help us understand how visitors use our site. You can control cookies through your browser settings.',
        },
        {
          heading: 'Data Security',
          body: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is 100% secure.',
        },
        {
          heading: 'Third-Party Services',
          body: 'Our website may contain links to third-party websites and we use third-party services such as YouTube, Spotify, and Apple Music. We are not responsible for the privacy practices of these external services. We encourage you to review their privacy policies.',
        },
        {
          heading: 'Your Rights',
          body: 'You have the right to access, correct, or delete your personal information. To exercise these rights or if you have any questions about this Privacy Policy, please contact us at info@claudygod.com.',
        },
        {
          heading: 'Changes to This Policy',
          body: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated revision date.',
        },
      ]}
    />
  );
}
