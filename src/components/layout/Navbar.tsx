'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { COMPANY, NAV_LINKS } from '@/lib/constants';
import Button from '@/components/ui/Button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-[3px] border-[#C5961A] ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-bold text-[#1B2A4A] tracking-tight">
              {COMPANY.name}
            </span>
            <div className="w-2 h-2 bg-[#C5961A] group-hover:scale-150 transition-transform duration-300" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-[#C5961A] ${
                      isActive ? 'text-[#C5961A]' : 'text-gray-700'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            <Link href="/contact" tabIndex={-1}>
              <Button variant="primary">Get a Quote</Button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-[#1B2A4A] hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-xl md:hidden overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 bg-white">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`block px-3 py-3 rounded-md text-base font-medium ${
                      isActive
                        ? 'bg-blue-50 text-[#C5961A]'
                        : 'text-gray-900 hover:bg-gray-50 hover:text-[#C5961A]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 pb-2 px-3">
                <Link href="/contact" tabIndex={-1}>
                  <Button variant="primary" className="w-full justify-center">
                    Get a Quote
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
