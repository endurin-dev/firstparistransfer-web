// app/components/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Cormorant_Garamond } from 'next/font/google';
import { FaFacebookF, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['italic'],
  variable: '--font-display',
});

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 'Reservation' sits in the middle of the set so it reads as the nav's
  // center of gravity rather than a trailing afterthought.
  const navItems = [
    'Home',
    'Rates',
    'Destinations',
    'Reservation',
    'Blog',
    'Contact Us',
  ];

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScrollY && current > 100) {
        setIsVisible(false);
      } else if (current < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const closeMenu = () => setMobileMenuOpen(false);

  const getHref = (item: string) => {
    if (item === 'Home') return '/';
    if (item === 'Reservation') return '/booking';
    return `/${item.toLowerCase().replace(' ', '-')}`;
  };

  return (
    <div className={cormorant.variable}>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998]"
          onClick={closeMenu}
        />
      )}

      <header
        className={`fixed top-2 left-1/2 -translate-x-1/2 z-[9999] w-[95%] max-w-7xl transition-all duration-500 ease-out
        ${
          isVisible
            ? 'translate-y-0 opacity-100'
            : '-translate-y-40 opacity-0 pointer-events-none'
        }`}
      >
        <div className="relative bg-white/20 backdrop-blur-3xl border border-white/40 rounded-3xl shadow-2xl overflow-visible">

          <div className="flex items-center justify-between px-5 py-3 lg:px-8 lg:py-3">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 lg:gap-3 shrink-0">
              <div className="relative w-9 h-9 lg:w-11 lg:h-11 rounded-xl bg-white/30 border border-white/40 overflow-hidden">
                <Image
                  src="/images/logo-fpt-glaasy.webp"
                  alt="First Paris Transfer"
                  fill
                  className="object-contain p-1"
                  priority
                />
              </div>

              <div>
                <h1 className="font-[family-name:var(--font-display)] italic font-semibold text-black text-lg lg:text-2xl tracking-tight leading-tight [text-shadow:0_0_1px_rgba(0,0,0,0.3)]">
                  First Paris Transfer
                </h1>
                <p className="text-black/60 text-[9px] tracking-[0.25em] uppercase hidden lg:block">
                  Luxury Chauffeur
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) =>
                item === 'Reservation' ? (
                  <Link
                    key={item}
                    href={getHref(item)}
                    className="group mx-3 flex items-center gap-1.5 bg-[#C9A667] hover:bg-[#B8935A] text-black text-[13px] font-semibold tracking-wide px-5 py-2.5 rounded-full shadow-md shadow-[#C9A667]/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-px"
                  >
                    {item}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                ) : (
                  <Link
                    key={item}
                    href={getHref(item)}
                    className="px-4 py-2 text-black/70 font-medium text-[12px] tracking-[0.12em] uppercase transition-all duration-300 hover:text-black"
                  >
                    {item}
                  </Link>
                )
              )}
            </nav>

            {/* Right Side */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex gap-4 border-l border-white/40 pl-4">
                <a href="#" className="text-black/50 hover:text-black transition">
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a href="#" className="text-black/50 hover:text-black transition">
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a
                  href="mailto:contact@firstparistransfer.com"
                  className="text-black/50 hover:text-black transition"
                >
                  <FaEnvelope className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Mobile */}
            <div className="flex lg:hidden items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 bg-white/30 rounded-lg border border-white/40"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-black" />
                ) : (
                  <Menu className="w-5 h-5 text-black" />
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-x-4 top-20 z-[9999] transition-all duration-500
          ${
            mobileMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-full pointer-events-none'
          }`}
        >
          <div className="bg-white/20 backdrop-blur-3xl border border-white/40 rounded-3xl shadow-2xl overflow-hidden">
            <nav className="py-8 px-8">
              {navItems.map((item) =>
                item === 'Reservation' ? (
                  <Link
                    key={item}
                    href={getHref(item)}
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 my-3 bg-[#C9A667] hover:bg-[#B8935A] text-black text-base font-semibold tracking-wide py-3.5 rounded-2xl shadow-md shadow-[#C9A667]/30 transition-colors duration-300"
                  >
                    {item}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <Link
                    key={item}
                    href={getHref(item)}
                    onClick={closeMenu}
                    className="block py-4 text-black/80 text-lg font-[family-name:var(--font-display)] italic hover:text-black"
                  >
                    {item}
                  </Link>
                )
              )}

              <div className="flex justify-center gap-6 mt-6">
                <a href="#" className="text-black/50 hover:text-black">
                  <FaFacebookF className="w-5 h-5" />
                </a>
                <a href="#" className="text-black/50 hover:text-black">
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a
                  href="mailto:contact@firstparistransfer.com"
                  className="text-black/50 hover:text-black"
                >
                  <FaEnvelope className="w-5 h-5" />
                </a>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
}