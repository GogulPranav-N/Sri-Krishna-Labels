import React from 'react';
import { AnimatedSection } from './AnimatedSection';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <AnimatedSection
      direction="up"
      className={cn(
        'mb-12',
        centered ? 'text-center' : 'text-left',
        className
      )}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-[#1B2A4A] mb-4">
        {title}
      </h2>
      <div
        className={cn(
          'h-1 w-20 bg-[#C5961A] rounded-full mb-6',
          centered ? 'mx-auto' : ''
        )}
      />
      {subtitle && (
        <p className="text-slate-500 max-w-2xl text-lg mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  );
}

export default SectionHeader;
