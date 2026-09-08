'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#1B2A4A] to-[#0F1B33]">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[20%] left-[10%] w-72 h-72 bg-[#C5961A] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-[#1B2A4A] rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl flex flex-col items-center"
        >
          {/* Decorative Gold Accent */}
          <motion.div variants={itemVariants} className="w-16 h-1 bg-[#C5961A] mb-8 rounded-full" />

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4"
          >
            Crafting Premium Labels <br />
            <span className="text-[#C5961A]">for the Garment Industry</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl font-light"
          >
            Elevate your brand with high-quality garment labels and specialized branding solutions tailored to your unique identity.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button href="/products" variant="secondary" size="lg" className="w-full sm:w-auto">
              Explore Our Products
            </Button>
            <Button href="/contact" variant="outline" size="lg" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-[#1B2A4A]">
              Contact Us
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-gray-400 text-sm mb-2 uppercase tracking-widest font-semibold">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6 text-[#C5961A]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
