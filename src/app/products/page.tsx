import { PRODUCTS } from '@/lib/constants';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Tag, Scissors, Printer, Package, ShieldCheck, Box, Gem, Palette, Layers } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Products & Services | Sri Krishna Labels',
  description: 'Explore our wide range of premium garment labels and branding solutions.',
};

const iconMap: Record<string, React.ElementType> = {
  Tag,
  Scissors,
  Printer,
  Package,
  ShieldCheck,
  Box,
  Gem,
  Palette,
  Layers
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Banner */}
      <section className="bg-[#1B2A4A] text-white py-16 lg:py-24 h-[40vh] min-h-[300px] flex flex-col justify-center">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Our Products & Services</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
              Premium quality garment labeling solutions tailored for the modern apparel industry.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
              <Link href="/" className="hover:text-[#C5961A] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#C5961A]">Products</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS?.map((product: any, index: number) => {
              const Icon = iconMap[product.icon] || Tag;
              return (
                <AnimatedSection key={product.id} direction="up" delay={index * 0.1}>
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col group hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                    <div className="w-16 h-16 bg-[#1B2A4A] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border-2 border-[#C5961A]">
                      <Icon className="text-[#C5961A]" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-[#1B2A4A] mb-3">{product.name}</h3>
                    <p className="text-gray-600 mb-6 flex-grow">{product.description}</p>
                    <div className="mt-auto">
                      <Button variant="outline" href="/contact" className="w-full justify-center group-hover:bg-[#1B2A4A] group-hover:text-white transition-colors group-hover:border-[#1B2A4A]">
                        Enquire Now
                      </Button>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container mx-auto px-4">
        <AnimatedSection direction="up">
          <div className="bg-[#1B2A4A] rounded-2xl p-10 lg:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5961A] rounded-full opacity-10 -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C5961A] rounded-full opacity-10 translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 relative z-10">Need a Custom Solution?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8 relative z-10 text-lg">
              We specialize in creating unique labeling solutions tailored specifically to your brand requirements. Let's discuss your project.
            </p>
            <div className="relative z-10">
              <Button variant="primary" size="lg" href="/contact">
                Contact Our Experts
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </main>
  );
}
