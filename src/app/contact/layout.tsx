import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partner With Us | Sri Krishna Labels',
  description: 'Connect directly with Mr. Manimaran and Mr. Chiranjeevi for dependable garment label manufacturing, 100% on-time delivery, and custom sample requests.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
