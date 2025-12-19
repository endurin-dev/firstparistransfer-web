// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.firstparistransfer.com'),

  title: {
    default: 'First Paris Transfer – Luxury Private Chauffeur Service',
    template: '%s | First Paris Transfer',
  },

  description:
    'Luxury private chauffeur service in Paris. Airport transfers from CDG, Orly & Beauvais, Disneyland shuttles, Versailles palace transfers and premium hotel transportation with Mercedes vehicles.',

  keywords: [
    'Paris airport transfer',
    'Luxury chauffeur service Paris',
    'Paris prestige transfer',
    'Private transfer Paris',
    'CDG to Paris transfer',
    'Orly to Paris transfer',
    'Beauvais to Paris transfer',
    'Disneyland Paris transfer',
    'Disneyland shuttle Paris',
    'Versailles palace transfer',
    'Paris airport shuttle',
    'Private chauffeur Paris',
    'VIP transfer Paris',
    'Executive car service Paris',
    'Mercedes chauffeur Paris',
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  alternates: {
    canonical: '/',
  },

  openGraph: {
    title: 'First Paris Transfer – Luxury Chauffeur & Airport Transfers',
    description:
      'Premium chauffeur-driven transfers in Paris. CDG, Orly, Beauvais airport transfers, Disneyland shuttles & Versailles palace travel.',
    url: 'https://www.firstparistransfer.com',
    siteName: 'First Paris Transfer',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxury Chauffeur Service in Paris',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'First Paris Transfer – Luxury Chauffeur Service',
    description:
      'Book premium private chauffeur & airport transfers in Paris. Mercedes fleet, professional drivers, 24/7 service.',
    images: ['/og-image.jpg'],
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-black text-white antialiased overflow-x-hidden`}
      >
        <div className="relative min-h-screen">
          <Header />
          <main className="relative">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
