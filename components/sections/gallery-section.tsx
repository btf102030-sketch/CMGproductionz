'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  eventName: string;
  category: string;
}

export function GallerySection() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    fetch('/api/gallery')
      .then((res: any) => res?.json?.())
      .then((data: any) => {
        setImages(data?.images ?? data ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  const goNext = () => {
    if (selectedIndex !== null && (images?.length ?? 0) > 0) {
      setSelectedIndex((selectedIndex + 1) % (images?.length ?? 1));
    }
  };
  const goPrev = () => {
    if (selectedIndex !== null && (images?.length ?? 0) > 0) {
      setSelectedIndex((selectedIndex - 1 + (images?.length ?? 1)) % (images?.length ?? 1));
    }
  };

  const selectedImage = selectedIndex !== null ? images?.[selectedIndex] : null;

  return (
    <section id="gallery" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,5%)] via-[hsl(0,0%,7%)] to-[hsl(0,0%,5%)]" />
      <div className="absolute inset-0 grunge-overlay pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Event <span className="text-red-500">Gallery</span>
          </h2>
          <div className="red-line w-24 mx-auto mb-4" />
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Highlights from past CMG Productionz truck meets.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[1, 2, 3, 4, 5, 6]?.map?.((i: number) => (
              <div key={i} className="aspect-square bg-gray-800 rounded-lg animate-pulse" />
            )) ?? []}
          </div>
        ) : (images?.length ?? 0) === 0 ? (
          <div className="text-center py-16">
            <Camera className="mx-auto mb-4 text-red-500/40" size={48} />
            <p className="text-gray-500">Gallery coming soon! Check back after our next event.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {images?.map?.((img: GalleryItem, i: number) => (
              <motion.button
                key={img?.id ?? i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                onClick={() => openLightbox(i)}
                className="group relative aspect-square bg-gray-900 rounded-lg overflow-hidden"
              >
                <Image
                  src={img?.imageUrl ?? '/images/hero-truck-meet-night.jpg'}
                  alt={img?.title ?? 'Gallery image from truck show'}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
                <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-xs font-bold">{img?.title ?? ''}</p>
                </div>
              </motion.button>
            )) ?? []}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 text-white/60 hover:text-white"
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <button
              onClick={(e: any) => { e?.stopPropagation?.(); goPrev(); }}
              className="absolute left-4 p-2 text-white/60 hover:text-white"
              aria-label="Previous"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={(e: any) => { e?.stopPropagation?.(); goNext(); }}
              className="absolute right-4 p-2 text-white/60 hover:text-white"
              aria-label="Next"
            >
              <ChevronRight size={32} />
            </button>
            <div
              className="relative w-full max-w-4xl aspect-[4/3] rounded-lg overflow-hidden"
              onClick={(e: any) => e?.stopPropagation?.()}
            >
              <Image
                src={selectedImage?.imageUrl ?? '/images/hero-truck-meet-night.jpg'}
                alt={selectedImage?.title ?? 'Gallery image'}
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute bottom-6 text-center">
              <p className="text-white font-bold">{selectedImage?.title ?? ''}</p>
              <p className="text-gray-400 text-sm">{selectedImage?.eventName ?? ''}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
