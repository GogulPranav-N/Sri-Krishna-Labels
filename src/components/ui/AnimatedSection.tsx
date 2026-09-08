'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = 'up',
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const getDirectionOffset = () => {
    switch (direction) {
      case 'up':
        return { y: 40, x: 0 };
      case 'left':
        return { x: -40, y: 0 };
      case 'right':
        return { x: 40, y: 0 };
      default:
        return { y: 40, x: 0 };
    }
  };

  const initialOffset = getDirectionOffset();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...initialOffset }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, ...initialOffset }
      }
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 100,
        delay: delay,
        duration: 0.8,
      }}
      className={cn('', className)}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedSection;
