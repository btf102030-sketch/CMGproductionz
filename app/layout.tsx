import { DM_Sans, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler';

export const dynamic = 'force-dynamic';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' });
const jakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata = {
  title: 'CMG Productionz | Truck Meets & Shows - Northeast Alabama',
  description: 'CMG Productionz brings you the best truck meets, shows, and events in Northeast Alabama. Lifted, stock, classic, custom, diesel, 4x4 and more!',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'CMG Productionz | Truck Meets & Shows',
    description: 'The best truck meets and shows in Northeast Alabama.',
    images: ['/og-image.png'],
  },
  metadataBase: new URL('https://www.cmgproductionz.org'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${dmSans.variable} ${jakartaSans.variable} ${jetbrainsMono.variable} font-sans bg-[hsl(0,0%,5%)] text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <ChunkLoadErrorHandler />
        </ThemeProvider>
      </body>
    </html>
  );
}
