'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Merch', href: '#merch' },
  { label: 'Contact', href: '#contact' },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView?.({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md shadow-lg shadow-red-900/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">
        <button onClick={() => scrollTo('#home')} className="flex items-center gap-2">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12">
            <Image
              src="/logo.jpg"
              alt="CMG Productionz Logo"
              fill
              className="object-contain rounded"
              priority
            />
          </div>
          <span className="font-display font-bold text-lg sm:text-xl tracking-tight">
            CMG <span className="text-red-500">Productionz</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks?.map?.((link: any) => (
            <button
              key={link?.href}
              onClick={() => scrollTo(link?.href)}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-red-500/10 rounded-md transition-all duration-200"
            >
              {link?.label}
            </button>
          )) ?? []}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-gray-300 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-t border-red-900/30"
          >
            <nav className="flex flex-col p-4 gap-1">
              {navLinks?.map?.((link: any) => (
                <button
                  key={link?.href}
                  onClick={() => scrollTo(link?.href)}
                  className="px-4 py-3 text-left text-sm font-medium text-gray-300 hover:text-white hover:bg-red-500/10 rounded-md transition-all"
                >
                  {link?.label}
                </button>
              )) ?? []}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
