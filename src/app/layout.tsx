import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';


export const metadata: Metadata = {
  title: 'Sri Krishna Labels | Premium Garment Labels & Branding Solutions',
  description: 'Leading manufacturers of premium garment labels and custom branding solutions. Elevate your brand with Sri Krishna Labels.',
};

export const viewport: Viewport = {
  themeColor: '#1B2A4A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-gray-50 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
