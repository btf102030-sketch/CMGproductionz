'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Flame, Trophy, Users, Truck } from 'lucide-react';
import Image from 'next/image';

const stats = [
  { icon: Truck, label: 'Truck Meets Hosted', value: '20+' },
  { icon: Trophy, label: 'Awards Given', value: '100+' },
  { icon: Users, label: 'Community Members', value: '500+' },
  { icon: Flame, label: 'Years Strong', value: '3+' },
];

export function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" className="relative py-20 sm:py-28 overflow-hidden">
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
            About <span className="text-red-500">CMG</span>
          </h2>
          <div className="red-line w-24 mx-auto mb-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-900">
              <Image
                src="/images/crowd-truck-show.jpg"
                alt="Crowd enjoying a CMG Productionz truck show event"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-5"
          >
            <p className="text-gray-300 text-base leading-relaxed">
              CMG Productionz was born from a passion for trucks and community. Based in Northeast Alabama, 
              we organize the region&apos;s most exciting truck meets and shows — bringing together truck enthusiasts 
              from all walks of life.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Whether you roll with a lifted Silverado, a classic Ford, a custom diesel build, or a stock daily driver — 
              all trucks are welcome at our events. We host award ceremonies, VIP parking, vendor booths, and 
              unforgettable nights under the lights.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Follow us on Instagram and TikTok for the latest event announcements, behind-the-scenes content, 
              and exclusive merchandise drops.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://www.instagram.com/cmg_productionz"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded-md transition-all shadow-md shadow-red-900/30"
              >
                Follow on Instagram
              </a>
              <a
                href="https://www.tiktok.com/@cmg_productionz"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-md border border-white/10 transition-all"
              >
                TikTok
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
        >
          {stats?.map?.((stat: any, i: number) => {
            const Icon = stat?.icon;
            return (
              <div
                key={i}
                className="bg-white/[0.03] rounded-lg p-5 text-center hover:bg-red-500/5 transition-all duration-300 group"
              >
                {Icon && <Icon className="mx-auto mb-2 text-red-500 group-hover:scale-110 transition-transform" size={24} />}
                <p className="font-display text-2xl sm:text-3xl font-black text-white">{stat?.value ?? '0'}</p>
                <p className="text-xs text-gray-500 mt-1">{stat?.label ?? ''}</p>
              </div>
            );
          }) ?? []}
        </motion.div>
      </div>
    </section>
  );
}
