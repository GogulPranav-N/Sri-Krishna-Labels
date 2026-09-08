import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import { COMPANY, NAV_LINKS, PRODUCTS } from '@/lib/constants';
import AnimatedSection from '@/components/ui/AnimatedSection';
import CopyButton from '@/components/ui/CopyButton';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1B2A4A] text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              {COMPANY.name}
              <div className="w-2 h-2 bg-[#C5961A]" />
            </h3>
            <p className="text-[#C5961A] font-medium">{COMPANY.tagline}</p>
            <p className="text-sm leading-relaxed text-gray-400">
              Leading manufacturers of premium garment labels and custom branding solutions. We help brands stand out with high-quality, custom-designed branding materials.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-[#C5961A] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Products */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">Products</h4>
            <ul className="space-y-3">
              {PRODUCTS.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/products#${product.id}`}
                    className="text-sm hover:text-[#C5961A] transition-colors"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-[#C5961A] shrink-0 mt-1" size={18} />
                <span className="text-sm leading-relaxed text-gray-300">
                  {COMPANY.addressLines ? (
                    COMPANY.addressLines.map((line, idx) => (
                      <span key={idx} className="block">{line}</span>
                    ))
                  ) : (
                    COMPANY.address
                  )}
                  <a
                    href={COMPANY.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#C5961A] hover:underline mt-2 font-medium"
                  >
                    Get Directions on Maps ↗
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-[#C5961A] shrink-0 mt-1" size={18} />
                <div className="flex flex-col space-y-2 w-full">
                  {COMPANY.phones.map((item) => (
                    <div key={item.number} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-[#C5961A] font-semibold">{item.name}:</span>
                        <a
                          href={`tel:${item.number.replace(/[^0-9+]/g, '')}`}
                          className="text-sm hover:text-[#C5961A] transition-colors"
                        >
                          {item.number}
                        </a>
                      </div>
                      <CopyButton text={item.number} size={13} title={`Copy ${item.name}'s phone number`} />
                    </div>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-[#C5961A] shrink-0" size={18} />
                <div className="flex items-center justify-between gap-2 w-full">
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-sm hover:text-[#C5961A] transition-colors break-all"
                  >
                    {COMPANY.email}
                  </a>
                  <CopyButton text={COMPANY.email} size={13} title="Copy email address" />
                </div>
              </li>
            </ul>
          </div>
        </AnimatedSection>

        {/* Bottom Bar */}
        <AnimatedSection 
          delay={0.2}
          className="pt-8 border-t border-[#C5961A]/30 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400"
        >
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
            <p>&copy; {currentYear} {COMPANY.name}. All rights reserved.</p>
            {COMPANY.gstin && (
              <span className="text-xs px-2.5 py-1 rounded bg-white/5 border border-[#C5961A]/40 text-[#C5961A]">
                GSTIN: {COMPANY.gstin}
              </span>
            )}
          </div>
          <p>
            Designed with <span className="text-red-500">❤️</span> for great brands
          </p>
        </AnimatedSection>
      </div>
    </footer>
  );
}
