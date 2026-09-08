'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';

export default function CTABanner() {
  return (
    <section className="py-0">
      <AnimatedSection direction="up" className="container mx-auto px-6 md:px-12 pb-24">
        <div className="relative rounded-3xl overflow-hidden bg-[#1B2A4A] px-8 py-16 md:py-20 text-center shadow-2xl">
          {/* Subtle gold gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B2A4A] via-[#1B2A4A] to-[#C5961A]/20 pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Elevate Your Brand?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl font-light">
              Let's create the perfect labels for your garments. Reach out today for a custom quote and consultation.
            </p>
            <Button href="/contact" variant="secondary" size="lg" className="px-10 py-4 shadow-lg shadow-[#C5961A]/30">
              Get a Quote
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
