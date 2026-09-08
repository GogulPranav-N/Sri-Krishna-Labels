'use client';

import { PRODUCTS } from '@/lib/constants';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

// Dynamic Icon Component
const IconComponent = ({ iconName, className }: { iconName: string; className?: string }) => {
  // @ts-ignore
  const Icon = LucideIcons[iconName] || LucideIcons.Tag;
  return <Icon className={className} />;
};

export default function ProductShowcase() {
  // Display only first 6 products
  const displayedProducts = PRODUCTS.slice(0, 6);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeader 
          title="Our Products" 
          subtitle="Premium quality labels for every need" 
          centered 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {displayedProducts.map((product, index) => (
            <AnimatedSection key={product.id} delay={index * 0.1} direction="up">
              <motion.div
                whileHover={{ y: -8, boxShadow: '0 10px 25px -5px rgba(197, 150, 26, 0.3)' }}
                className="bg-gradient-to-br from-[#1B2A4A] to-[#121c33] rounded-2xl p-8 h-full flex flex-col relative overflow-hidden group border border-[#1B2A4A] hover:border-[#C5961A]/50 transition-colors"
              >
                {/* Subtle background glow on hover */}
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-[#C5961A]/20 rounded-full blur-3xl group-hover:bg-[#C5961A]/30 transition-colors" />

                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6 text-[#C5961A]">
                  <IconComponent iconName={product.icon} className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{product.name}</h3>
                <p className="text-gray-400 flex-grow leading-relaxed">
                  {product.description}
                </p>
                
                <div className="mt-6 pt-6 border-t border-white/10 flex items-center text-[#C5961A] font-medium text-sm group-hover:text-white transition-colors">
                  Learn more
                  <LucideIcons.ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button href="/products" variant="primary" size="lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
