'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className,
  ...rest
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-md cursor-pointer';

  const variants = {
    primary:
      'bg-[#1B2A4A] text-white hover:bg-[#121c32] focus:ring-[#1B2A4A] hover:shadow-[0_0_15px_rgba(197,150,26,0.3)]',
    secondary:
      'bg-[#C5961A] text-[#1B2A4A] hover:bg-[#d6a524] focus:ring-[#C5961A]',
    outline:
      'border-2 border-[#1B2A4A] text-[#1B2A4A] hover:bg-slate-50 focus:ring-[#1B2A4A] bg-transparent',
  };

  const sizes = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-6 text-base',
    lg: 'h-14 px-8 text-lg',
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  };

  if (href) {
    return (
      <Link href={href} passHref legacyBehavior>
        <motion.a className={classes} {...motionProps}>
          {children}
        </motion.a>
      </Link>
    );
  }

  return (
    <motion.button className={classes} {...motionProps} {...(rest as any)}>
      {children}
    </motion.button>
  );
}

export default Button;
