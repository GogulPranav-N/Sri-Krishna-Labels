'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import { ShieldCheck, Clock, Palette, DollarSign } from 'lucide-react';

const features = [
  {
    title: 'Quality Assurance',
    description: 'Rigorous quality checks ensuring perfect labels every single time.',
    icon: ShieldCheck,
  },
  {
    title: 'Timely Delivery',
    description: 'Streamlined production process to meet your strict deadlines.',
    icon: Clock,
  },
  {
    title: 'Custom Designs',
    description: 'Tailored solutions that perfectly match your brand identity.',
    icon: Palette,
  },
  {
    title: 'Competitive Pricing',
    description: 'Premium quality at prices that fit your production budget.',
    icon: DollarSign,
  },
];

export default function WhyChooseBrief() {
  return (
    <section className="py-24 bg-[#F8F9FA]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="lg:w-1/3">
            <SectionHeader 
              title="Why Sri Krishna Labels?" 
              subtitle="Decades of expertise in crafting the finest garment accessories." 
            />
            <p className="text-gray-600 mb-8 mt-4 leading-relaxed">
              We understand that a label is more than just a tag—it's the signature of your brand. Our commitment to excellence, modern machinery, and skilled craftsmanship makes us the preferred choice for leading apparel brands.
            </p>
            <Button href="/why-us" variant="outline" className="border-[#1B2A4A] text-[#1B2A4A] hover:bg-[#1B2A4A] hover:text-white">
              Learn More About Us
            </Button>
          </div>

          <div className="lg:w-2/3 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <AnimatedSection key={index} delay={index * 0.15}>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#C5961A]/10 rounded-full flex items-center justify-center border border-[#C5961A]/20">
                      <feature.icon className="w-6 h-6 text-[#C5961A]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#1B2A4A] mb-1">{feature.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
