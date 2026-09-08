import { DIFFERENTIATORS, PROCESS_STEPS } from '@/lib/constants';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Award, Clock, Leaf, ThumbsUp, TrendingUp, Settings, Zap, CheckCircle } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Why Choose Us | Sri Krishna Labels',
  description: 'Discover what sets Sri Krishna Labels apart from the competition.',
};

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  Award,
  Clock,
  Leaf,
  ThumbsUp,
  TrendingUp,
  Settings,
  Zap,
  CheckCircle,
};

export default function WhyUsPage() {
  return (
    <main className="min-h-screen bg-white pb-20">
      {/* Hero Banner */}
      <section className="bg-[#1B2A4A] text-white py-16 lg:py-24 h-[40vh] min-h-[300px] flex flex-col justify-center">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Why Choose Us</h1>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
              <Link href="/" className="hover:text-[#C5961A] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#C5961A]">Why Choose Us</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Differentiators Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="What Sets Us Apart" 
            subtitle="The Sri Krishna Labels Advantage"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {DIFFERENTIATORS?.map((diff: any, index: number) => {
              const Icon = iconMap[diff.icon] || ShieldCheck;
              const isEven = index % 2 === 0;
              return (
                <AnimatedSection key={diff.title} direction="up" delay={index * 0.1}>
                  <div className={`p-8 rounded-xl h-full shadow-sm border border-gray-100 transition-all hover:shadow-md ${isEven ? 'bg-white' : 'bg-gray-100'}`}>
                    <div className="w-12 h-12 bg-[#1B2A4A] text-[#C5961A] rounded-lg flex items-center justify-center mb-6">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-[#1B2A4A] mb-3">{diff.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{diff.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Our Process" 
            subtitle="How we bring your brand vision to life"
            centered
          />
          <div className="mt-16 relative max-w-5xl mx-auto">
            {/* Horizontal Line for Desktop */}
            <div className="hidden md:block absolute top-10 left-0 w-full h-1 bg-gray-200 z-0"></div>
            
            {/* Vertical Line for Mobile */}
            <div className="block md:hidden absolute top-0 left-8 w-1 h-full bg-gray-200 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {PROCESS_STEPS?.map((step: any, index: number) => (
                <AnimatedSection key={step.step} direction="up" delay={index * 0.15}>
                  <div className="flex flex-row md:flex-col items-start md:items-center relative">
                    <div className="w-16 h-16 min-w-16 bg-[#1B2A4A] text-[#C5961A] rounded-full border-4 border-white shadow-md flex items-center justify-center text-xl font-bold z-10">
                      {step.step}
                    </div>
                    <div className="ml-6 md:ml-0 md:mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1 md:w-full md:text-center">
                      <h4 className="text-lg font-bold text-[#1B2A4A] mb-2">{step.title}</h4>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-[#1B2A4A] border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection direction="up">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Partner With Us?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied brands who trust Sri Krishna Labels for their garment accessories.
            </p>
            <Button variant="primary" size="lg" href="/contact">
              Get Started Today
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
