'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { COMPANY } from '@/lib/constants';

function Counter({ target, suffix = "+", label }: { target: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = count.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [count]);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, { duration: 2 });
      return controls.stop;
    }
  }, [isInView, target, count]);

  return (
    <div ref={ref} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border-t-4 border-[#C5961A] flex flex-col items-center justify-center text-center h-full">
      <h3 className="text-4xl md:text-5xl font-bold text-[#1B2A4A] mb-2 flex items-center">
        {displayValue}
        <span className="text-[#C5961A] ml-1">{suffix}</span>
      </h3>
      <p className="text-gray-600 font-medium uppercase tracking-wider text-sm">{label}</p>
    </div>
  );
}

export default function Highlights() {
  return (
    <section className="py-20 bg-[#F8F9FA]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMPANY.stats.map((stat, index) => {
            const numeric = parseInt(String(stat.value).replace(/[^0-9]/g, '')) || 0;
            const suffix = stat.suffix || String(stat.value).replace(/[0-9]/g, '') || '+';
            return (
              <AnimatedSection key={index} delay={index * 0.1}>
                <Counter target={numeric} suffix={suffix} label={stat.label} />
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
