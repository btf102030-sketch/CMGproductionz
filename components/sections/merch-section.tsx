'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { ShoppingBag, Tag, MessageCircle } from 'lucide-react';

interface MerchItemData {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
}

export function MerchSection() {
  const [items, setItems] = useState<MerchItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    fetch('/api/merch')
      .then((res: any) => res?.json?.())
      .then((data: any) => {
        setItems(data?.items ?? data ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="merch" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[hsl(0,0%,5%)]" />
      <div className="absolute inset-0 grunge-overlay pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Official <span className="text-red-500">Merch</span>
          </h2>
          <div className="red-line w-24 mx-auto mb-4" />
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Rep CMG Productionz with our exclusive merchandise. Stickers, shirts, hoodies and more.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4]?.map?.((i: number) => (
              <div key={i} className="bg-white/[0.03] rounded-lg overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-800" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-800 rounded w-3/4" />
                  <div className="h-4 bg-gray-800 rounded w-1/3" />
                </div>
              </div>
            )) ?? []}
          </div>
        ) : (items?.length ?? 0) === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto mb-4 text-red-500/40" size={48} />
            <p className="text-gray-500">Merch store coming soon! Stay tuned.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items?.map?.((item: MerchItemData, i: number) => (
              <motion.div
                key={item?.id ?? i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="group bg-white/[0.03] rounded-lg overflow-hidden hover:bg-white/[0.05] transition-all duration-300 hover:shadow-lg hover:shadow-red-900/10"
              >
                <div className="relative aspect-square bg-gray-900">
                  <Image
                    src={item?.imageUrl ?? '/images/black-tshirt-mockup.jpg'}
                    alt={item?.name ?? 'CMG Productionz merchandise'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {!item?.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-bold text-sm uppercase tracking-wider">Sold Out</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-black/60 text-gray-300 text-xs font-medium rounded">
                      {item?.category ?? 'MERCH'}
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-display text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                    {item?.name ?? 'Item'}
                  </h3>
                  <p className="text-gray-500 text-xs line-clamp-2">{item?.description ?? ''}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-red-400 font-bold flex items-center gap-1">
                      <Tag size={14} />
                      ${item?.price?.toFixed?.(2) ?? '0.00'}
                    </span>
                    <a
                      href={`#contact`}
                      onClick={(e: any) => {
                        e?.preventDefault?.();
                        const contactSection = document.querySelector('#contact');
                        contactSection?.scrollIntoView?.({ behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <MessageCircle size={12} />
                      Inquire
                    </a>
                  </div>
                </div>
              </motion.div>
            )) ?? []}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-10"
        >
          <p className="text-gray-500 text-sm">
            DM us on{' '}
            <a
              href="https://www.instagram.com/cmg_productionz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 underline"
            >
              Instagram
            </a>{' '}
            to order merchandise.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
