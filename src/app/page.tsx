import Hero from '@/components/home/Hero';
import Highlights from '@/components/home/Highlights';
import ProductShowcase from '@/components/home/ProductShowcase';
import WhyChooseBrief from '@/components/home/WhyChooseBrief';
import CTABanner from '@/components/home/CTABanner';

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Highlights />
      <ProductShowcase />
      <WhyChooseBrief />
      <CTABanner />
    </main>
  );
}
