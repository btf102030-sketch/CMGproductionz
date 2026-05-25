import { Instagram } from 'lucide-react';
import Image from 'next/image';

export function SiteFooter() {
  return (
    <footer className="bg-black border-t border-red-900/20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image
                src="/logo.jpg"
                alt="CMG Productionz Logo"
                fill
                className="object-contain rounded"
              />
            </div>
            <div>
              <p className="font-display font-bold text-lg">CMG <span className="text-red-500">Productionz</span></p>
              <p className="text-xs text-gray-500">Northeast Alabama&apos;s Premier Truck Meets</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/cmg_productionz"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all"
              aria-label="Follow on Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.tiktok.com/@cmg_productionz"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all"
              aria-label="Follow on TikTok"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9a6.33 6.33 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.05a8.27 8.27 0 004.76 1.5V7.1a4.83 4.83 0 01-1-.41z" />
              </svg>
            </a>
          </div>

          <p className="text-xs text-gray-600">
            © 2026 CMG Productionz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
