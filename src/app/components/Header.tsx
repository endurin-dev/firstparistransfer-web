// app/components/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaCar, FaFacebookF, FaInstagram, FaEnvelope, FaGlobe } from 'react-icons/fa';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function Header() {
  const [lang, setLang] = useState('EN');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);

  const navItems = ['Home', 'Rates', 'Destinations', 'Blog', 'Contact Us'];

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'FR', name: 'Français' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'ES', name: 'Español' },
    { code: 'IT', name: 'Italiano' },
    { code: 'AR', name: 'العربية' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScrollY && current > 100) setIsVisible(false);
      else if (current < lastScrollY) setIsVisible(true);
      setLastScrollY(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeAll = () => {
    setMobileMenuOpen(false);
    setLangOpen(false);
  };

  return (
    <>
      {(mobileMenuOpen || langOpen) && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998]" onClick={closeAll} />
      )}

      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[9999] w-[95%] max-w-7xl transition-all duration-500 ease-out
          ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-40 opacity-0 pointer-events-none'}`}
      >
        <div className="relative bg-white/20 backdrop-blur-3xl border border-white/40 rounded-3xl shadow-2xl overflow-visible">
          <div className="flex items-center justify-between px-6 py-5 lg:px-10 lg:py-6">

            <Link href="/" className="flex items-center gap-3 lg:gap-4">
              <div className="relative w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-white/30 border border-white/40 overflow-hidden">
  <Image
    src="/images/logo-fpt-glaasy.webp"
    alt="First Paris Transfer – Luxury Chauffeur Service Paris"
    fill
    className="object-contain p-1"
    priority
  />
</div>

              <div>
                <h1 className="text-black font-semibold text-base lg:text-xl tracking-tight">First Paris Transfer</h1>
                <p className="text-black/70 text-xs tracking-widest uppercase hidden lg:block">Luxury Chauffeur</p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-12">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                  className="text-black/70 font-medium text-sm tracking-wide transition-all duration-300 hover:text-black hover:font-bold hover:scale-105"
                >
                  {item}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-6">
              <div className="flex gap-5 border-l border-white/40 pl-6">
                <a href="#" className="text-black/50 hover:text-black transition"><FaFacebookF className="w-4 h-4" /></a>
                <a href="#" className="text-black/50 hover:text-black transition"><FaInstagram className="w-4 h-4" /></a>
                <a href="mailto:contact@firstparistransfer.com" className="text-black/50 hover:text-black transition"><FaEnvelope className="w-4 h-4" /></a>
              </div>

              <div ref={langRef} className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-2 px-5 py-3 bg-white/30 border border-white/40 rounded-full text-black text-xs font-medium hover:bg-white/40 transition"
                >
                  <FaGlobe className="w-3.5 h-3.5" />
                  <span>{lang}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                </button>

                <div
                  className={`absolute right-0 top-full mt-3 w-64 origin-top-right transition-all duration-300 z-[9999]
                    ${langOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                >
                  <div className="bg-white/30 backdrop-blur-3xl border border-white/40 rounded-3xl shadow-2xl overflow-hidden">
                    {languages.map((l, i) => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setLangOpen(false); }}
                        className={`w-full text-left px-7 py-5 text-black/80 font-medium text-sm transition-all hover:text-black hover:bg-white/30
                          ${lang === l.code ? 'text-black font-bold bg-white/40' : ''}
                          ${i === 0 ? 'rounded-t-3xl' : ''}
                          ${i === languages.length - 1 ? 'rounded-b-3xl' : ''}`}
                      >
                        {l.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex lg:hidden items-center gap-3">
              <div ref={langRef} className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="p-2.5 bg-white/30 rounded-xl border border-white/40"
                >
                  <FaGlobe className="w-4 h-4 text-black" />
                </button>

                <div
                  className={`absolute right-0 top-full mt-2 w-56 origin-top-right transition-all duration-300 z-[9999]
                    ${langOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                >
                  <div className="bg-white/30 backdrop-blur-3xl border border-white/40 rounded-3xl shadow-2xl overflow-hidden">
                    {languages.map((l, i) => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setLangOpen(false); }}
                        className={`w-full text-left px-6 py-4 text-black/80 font-medium text-sm transition-all hover:text-black hover:bg-white/30
                          ${lang === l.code ? 'text-black font-bold' : ''}
                          ${i === 0 ? 'rounded-t-3xl' : ''}
                          ${i === languages.length - 1 ? 'rounded-b-3xl' : ''}`}
                      >
                        {l.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 bg-white/30 rounded-xl border border-white/40"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-black" /> : <Menu className="w-5 h-5 text-black" />}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`fixed inset-x-4 top-24 z-[9999] transition-all duration-500 ease-out
            ${mobileMenuOpen 
              ? 'translate-y-0 opacity-100 pointer-events-auto' 
              : '-translate-y-full opacity-0 pointer-events-none'
            }`}
        >
          <div className="bg-white/20 backdrop-blur-3xl border border-white/40 rounded-3xl shadow-2xl overflow-hidden">
            <nav className="py-8 px-10">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-5 text-black/80 font-medium text-lg tracking-wide transition-all hover:text-black hover:font-bold"
                >
                  {item}
                </Link>
              ))}

              <div className="flex justify-center gap-8 mt-10">
                <a href="#" className="text-black/50 hover:text-black transition"><FaFacebookF className="w-6 h-6" /></a>
                <a href="#" className="text-black/50 hover:text-black transition"><FaInstagram className="w-6 h-6" /></a>
                <a href="mailto:contact@firstparistransfer.com" className="text-black/50 hover:text-black transition"><FaEnvelope className="w-6 h-6" /></a>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
