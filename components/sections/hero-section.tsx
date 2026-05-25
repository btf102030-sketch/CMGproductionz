'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown, Calendar, MapPin } from 'lucide-react';

export function HeroSection() {
  const scrollToEvents = () => {
    document.querySelector('#events')?.scrollIntoView?.({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-truck-meet-night.jpg"
          alt="Truck meet at night with dramatic lighting"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[hsl(0,0%,5%)]" />
        {/* Red glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-red-900/20 via-transparent to-transparent" />
      </div>

      {/* Grunge texture */}
      <div className="absolute inset-0 grunge-overlay pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Logo */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto mb-6">
            <Image
              src="/logo.jpg"
              alt="CMG Productionz official logo"
              fill
              className="object-contain rounded-lg"
              priority
            />
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-4">
            <span className="text-white">CMG</span>{' '}
            <span className="text-red-500 text-glow-red">PRODUCTIONZ</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-3">
            Northeast Alabama&apos;s Premier Truck Meets & Shows
          </p>
          <p className="text-sm text-gray-500 max-w-lg mx-auto mb-8">
            Lifted • Stock • Classic • Custom • Diesel • 4x4 & More
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToEvents}
              className="px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-sm uppercase tracking-wider rounded-md transition-all duration-200 shadow-lg shadow-red-900/40 hover:shadow-red-800/60 flex items-center gap-2"
            >
              <Calendar size={18} />
              Upcoming Events
            </button>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView?.({ behavior: 'smooth' })}
              className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white font-bold text-sm uppercase tracking-wider rounded-md border border-white/10 hover:border-red-500/30 transition-all duration-200 flex items-center gap-2"
            >
              <MapPin size={18} />
              Book an Event
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-red-500/60" size={28} />
      </motion.div>
    </section>
  );
}
