import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { EventsSection } from '@/components/sections/events-section';
import { GallerySection } from '@/components/sections/gallery-section';
import { MerchSection } from '@/components/sections/merch-section';
import { ContactSection } from '@/components/sections/contact-section';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[hsl(0,0%,5%)]">
      <SiteHeader />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <GallerySection />
      <MerchSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
