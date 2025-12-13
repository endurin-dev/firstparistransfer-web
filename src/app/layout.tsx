// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'First Paris Transfer – Luxury Private Chauffeur Service',
  description: 'Premium airport transfers, Disneyland, Versailles & Paris hotel transfers with Mercedes fleet',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased overflow-x-hidden`}>
        {/* Full viewport layout */}
        <div className="relative min-h-screen">

          {/* Header – floats over hero */}
          <Header />

          {/* Main content (Hero + rest of pages) */}
          <main className="relative">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
}