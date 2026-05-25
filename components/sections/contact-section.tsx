'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, CheckCircle, AlertCircle, User, Mail, Phone, MessageSquare, FileText } from 'lucide-react';
import { toast } from 'sonner';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    eventType: 'GENERAL',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleChange = (e: any) => {
    const name = e?.target?.name ?? '';
    const value = e?.target?.value ?? '';
    setFormData((prev: any) => ({ ...(prev ?? {}), [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e?.preventDefault?.();
    if (!formData?.name || !formData?.email || !formData?.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res?.ok) {
        setSubmitted(true);
        toast.success('Message sent successfully!');
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="contact" className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,5%)] via-[hsl(0,0%,7%)] to-[hsl(0,0%,5%)]" />
        <div className="relative z-10 max-w-[600px] mx-auto px-4 text-center">
          <CheckCircle className="mx-auto mb-4 text-green-500" size={56} />
          <h3 className="font-display text-2xl font-bold text-white mb-3">Message Sent!</h3>
          <p className="text-gray-400 text-sm mb-6">
            Thanks for reaching out. We&apos;ll get back to you as soon as possible.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: '', email: '', phone: '', subject: '', eventType: 'GENERAL', message: '' });
            }}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded-md transition-all"
          >
            Send Another Message
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,0%,5%)] via-[hsl(0,0%,7%)] to-[hsl(0,0%,5%)]" />
      <div className="absolute inset-0 grunge-overlay pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-[700px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Get In <span className="text-red-500">Touch</span>
          </h2>
          <div className="red-line w-24 mx-auto mb-4" />
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Want to book CMG Productionz for an event? Have questions? Drop us a message.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white/[0.03] rounded-lg p-6 sm:p-8 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Name *</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  name="name"
                  value={formData?.name ?? ''}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-md text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Email *</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  name="email"
                  type="email"
                  value={formData?.email ?? ''}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-md text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Phone</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  name="phone"
                  value={formData?.phone ?? ''}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-md text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Inquiry Type</label>
              <select
                name="eventType"
                value={formData?.eventType ?? 'GENERAL'}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-md text-white text-sm focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all"
              >
                <option value="GENERAL" className="bg-gray-900">General Inquiry</option>
                <option value="BOOK_EVENT" className="bg-gray-900">Book an Event</option>
                <option value="VENDOR" className="bg-gray-900">Vendor Booth</option>
                <option value="SPONSORSHIP" className="bg-gray-900">Sponsorship</option>
                <option value="MERCH" className="bg-gray-900">Merchandise</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Subject</label>
            <div className="relative">
              <FileText size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                name="subject"
                value={formData?.subject ?? ''}
                onChange={handleChange}
                placeholder="What's this about?"
                className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-md text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Message *</label>
            <div className="relative">
              <MessageSquare size={16} className="absolute left-3 top-3 text-gray-500" />
              <textarea
                name="message"
                value={formData?.message ?? ''}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell us more about your inquiry..."
                className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-md text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm uppercase tracking-wider rounded-md transition-all shadow-lg shadow-red-900/30 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </span>
            ) : (
              <>
                <Send size={16} />
                Send Message
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-600">
            Your information is stored securely and will only be used to respond to your inquiry.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
