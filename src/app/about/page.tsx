import { COMPANY, VALUES } from '@/lib/constants';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Target, Eye, ShieldCheck, Gem, Users, Zap, Award, Star } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | Sri Krishna Labels',
  description: 'Learn about Sri Krishna Labels, our history, mission, vision, and core values.',
};

const iconMap: Record<string, React.ElementType> = {
  Target,
  Eye,
  ShieldCheck,
  Gem,
  Users,
  Zap,
  Award,
  Star
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="bg-[#1B2A4A] text-white py-16 lg:py-24 h-[40vh] min-h-[300px] flex flex-col justify-center">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">About Us</h1>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
              <Link href="/" className="hover:text-[#C5961A] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#C5961A]">About Us</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <SectionHeader 
                title="Our Story" 
                subtitle="7+ Years of Excellence in Garment Labeling" 
              />
              <div className="prose prose-lg text-gray-600 mt-6 space-y-4">
                <p>
                  Established with a vision to revolutionize the garment labeling industry, Sri Krishna Labels has grown to become a trusted partner for apparel brands worldwide. With over 7 years of industry experience, we understand that a label is more than just a piece of fabric—it is the signature of your brand's identity and a mark of quality.
                </p>
                <p>
                  Our journey began with a simple commitment to uncompromising quality and customer satisfaction. Today, we leverage state-of-the-art manufacturing technology and skilled craftsmanship to deliver premium garment labels and branding solutions that meet the highest international standards.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" className="relative h-96 bg-gray-200 rounded-lg overflow-hidden shadow-lg flex items-center justify-center border border-gray-200">
              <span className="text-gray-500 font-medium text-lg">Company Facility Image Placeholder</span>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection direction="up" delay={0.1}>
              <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 h-full">
                <div className="w-14 h-14 bg-[#1B2A4A] rounded-full flex items-center justify-center mb-6 border-2 border-[#C5961A]">
                  <Target className="text-[#C5961A]" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-[#1B2A4A] mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To provide our clients with exceptional quality garment labels that enhance their brand value, delivered through sustainable practices, innovative technology, and unparalleled customer service.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.2}>
              <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 h-full">
                <div className="w-14 h-14 bg-[#1B2A4A] rounded-full flex items-center justify-center mb-6 border-2 border-[#C5961A]">
                  <Eye className="text-[#C5961A]" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-[#1B2A4A] mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To be the global leader in the garment accessories industry, recognized for our commitment to excellence, continuous innovation, and environmental responsibility in every product we manufacture.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Our Core Values" 
            subtitle="The principles that guide everything we do"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {VALUES?.map((value: any, index: number) => {
              const Icon = iconMap[value.icon] || ShieldCheck;
              return (
                <AnimatedSection key={value.title} direction="up" delay={index * 0.1}>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center h-full hover:shadow-md transition-all hover:-translate-y-1">
                    <div className="w-16 h-16 mx-auto bg-[#1B2A4A] rounded-full flex items-center justify-center mb-4 border-2 border-[#C5961A]">
                      <Icon className="text-[#C5961A]" size={28} />
                    </div>
                    <h4 className="text-xl font-bold text-[#1B2A4A] mb-3">{value.title}</h4>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
