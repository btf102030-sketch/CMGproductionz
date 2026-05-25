'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Calendar, MapPin, Clock, Star, Ticket } from 'lucide-react';

interface EventData {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  address: string;
  imageUrl: string;
  price: string;
  featured: boolean;
  category: string;
  status: string;
}

export function EventsSection() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    fetch('/api/events')
      .then((res: any) => res?.json?.())
      .then((data: any) => {
        setEvents(data?.events ?? data ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d?.toLocaleDateString?.('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) ?? '';
    } catch {
      return '';
    }
  };

  return (
    <section id="events" className="relative py-20 sm:py-28 overflow-hidden">
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
            Upcoming <span className="text-red-500">Events</span>
          </h2>
          <div className="red-line w-24 mx-auto mb-4" />
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Check out our upcoming truck meets and shows across Northeast Alabama.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3]?.map?.((i: number) => (
              <div key={i} className="bg-white/[0.03] rounded-lg overflow-hidden animate-pulse">
                <div className="aspect-[16/10] bg-gray-800" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-800 rounded w-3/4" />
                  <div className="h-4 bg-gray-800 rounded w-1/2" />
                </div>
              </div>
            )) ?? []}
          </div>
        ) : (events?.length ?? 0) === 0 ? (
          <div className="text-center py-16">
            <Calendar className="mx-auto mb-4 text-red-500/40" size={48} />
            <p className="text-gray-500">No upcoming events. Follow us on social media for announcements!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events?.map?.((event: EventData, i: number) => (
              <motion.div
                key={event?.id ?? i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="group bg-white/[0.03] rounded-lg overflow-hidden hover:bg-white/[0.05] transition-all duration-300 hover:shadow-lg hover:shadow-red-900/10"
              >
                <div className="relative aspect-[16/10] bg-gray-900">
                  <Image
                    src={event?.imageUrl ?? '/images/hero-truck-meet-night.jpg'}
                    alt={event?.title ?? 'Truck meet event'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  {event?.featured && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-red-600 text-white text-xs font-bold rounded flex items-center gap-1">
                      <Star size={12} /> Featured
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-1 bg-black/60 text-red-400 text-xs font-bold rounded">
                      {event?.category?.replace?.('_', ' ') ?? 'EVENT'}
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                    {event?.title ?? 'Event'}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">{event?.description ?? ''}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar size={14} className="text-red-500" />
                      <span>{formatDate(event?.date ?? '')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock size={14} className="text-red-500" />
                      <span>{event?.time ?? ''}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin size={14} className="text-red-500" />
                      <span>{event?.location ?? ''}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="flex items-center gap-1.5 text-red-400 font-bold text-sm">
                      <Ticket size={14} />
                      <span>{event?.price ?? 'FREE'}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )) ?? []}
          </div>
        )}
      </div>
    </section>
  );
}
