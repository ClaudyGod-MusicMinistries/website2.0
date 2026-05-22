import type { Metadata } from 'next';
import { LegalPage } from '@/components/shared/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Service — ClaudyGod Music Ministries',
};

export default function TermsPage() {
  return (
    <LegalPage
      active="terms"
      title="Terms of Service"
      lastUpdated="May 2025"
      intro="By accessing and using the ClaudyGod Music Ministries website, you accept and agree to be bound by the terms and conditions outlined below. Please read these terms carefully before using our services."
      sections={[
        {
          heading: 'Use of the Website',
          body: 'You may use this website for lawful purposes only. You agree not to use the site in any way that violates applicable laws or regulations, or that harms or could harm the website, its users, or our ministry.',
        },
        {
          heading: 'Intellectual Property',
          body: 'All content on this website — including music, images, text, and videos — is the property of ClaudyGod Music Ministries and is protected by copyright law. You may not reproduce, distribute, or create derivative works without our express written permission.',
        },
        {
          heading: 'Booking Requests',
          body: 'Submitting a booking request through our website does not constitute a confirmed booking. All booking arrangements are subject to availability and must be confirmed in writing by our ministry team before they are considered official.',
        },
        {
          heading: 'Store & Purchases',
          body: 'All sales through our online store are final unless the item arrives damaged or defective. We reserve the right to cancel any order at our discretion. Pricing is subject to change without notice.',
        },
        {
          heading: 'Disclaimer of Warranties',
          body: 'This website is provided "as is" without any warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.',
        },
        {
          heading: 'Limitation of Liability',
          body: 'ClaudyGod Music Ministries shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the website or our services.',
        },
        {
          heading: 'Changes to Terms',
          body: 'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the site constitutes acceptance of the updated terms.',
        },
        {
          heading: 'Contact',
          body: 'If you have any questions about these Terms of Service, please contact us at info@claudygod.com.',
        },
      ]}
    />
  );
}
