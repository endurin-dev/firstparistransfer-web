// app/components/Hero.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

const destinations = [
  { name: 'Paris Center', desc: 'Explore the heart of Paris like a local.' },
  { name: 'Disneyland® Paris', desc: 'Magical family adventures await.' },
  { name: 'Versailles Palace', desc: 'Experience royal luxury and history.' },
  { name: 'CDG Airport', desc: 'Convenient transfers to Charles de Gaulle.' },
  { name: 'Orly Airport', desc: 'Seamless rides to Orly Airport terminals.' },
  { name: 'Beauvais Airport', desc: 'Comfortable transfer from Beauvais.' },
];

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden">
      <Image
        src="/images/Hero-banner.png"
        alt="Luxury Mercedes S-Class at night in Paris - First Paris Transfer"
        fill
        priority
        quality={100}
        className="object-cover"
        sizes="100vw"
        placeholder="blur"
        blurDataURL="data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoQAAkAAIAASUERIYgB4KAAAAD+7pZOAAM="
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />

      <div className="absolute inset-x-0 top-0 h-64 sm:h-96 bg-gradient-to-b from-amber-400/12 via-amber-300/6 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-56 sm:h-80 bg-gradient-to-b from-amber-300/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-4 sm:top-20 sm:left-10 w-48 h-48 sm:w-80 sm:h-80 bg-amber-500/14 rounded-full blur-3xl animate-pulse opacity-70" />
        <div className="absolute bottom-24 right-4 sm:bottom-32 sm:right-10 w-40 h-40 sm:w-72 sm:h-72 bg-amber-600/14 rounded-full blur-3xl animate-pulse delay-700 opacity-70" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6 text-center overflow-y-auto py-20 sm:py-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight sm:tracking-tighter drop-shadow-2xl leading-[0.95] sm:leading-[0.92] md:leading-[0.90]">
          Paris<br />
          <span className="text-amber-400 drop-shadow-lg">Like a Local</span><br />
          <span className="text-xl sm:text-3xl md:text-4xl lg:text-5xl">Never Like a Tourist</span>
        </h1>

        <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 max-w-sm sm:max-w-3xl lg:max-w-5xl mx-auto">
          {destinations.map((dest) => (
            <div
              key={dest.name}
              className="group flex flex-col items-center gap-1 px-3 py-3 sm:px-5 bg-white/20 backdrop-blur-2xl border border-white/40 rounded-2xl sm:rounded-3xl active:scale-95 sm:hover:bg-white/30 sm:hover:border-white/50 sm:hover:scale-110 transition-all duration-300 cursor-default relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.15)] sm:hover:shadow-[0_12px_45px_rgba(0,0,0,0.2)]"
            >
              <div className="p-1.5 sm:p-2 bg-white/15 rounded-xl group-hover:bg-amber-400/20 transition-colors">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" />
              </div>
              <span className="text-white font-semibold text-xs sm:text-sm tracking-wide">{dest.name}</span>
              <span className="hidden sm:block text-white/60 text-xs mt-1 leading-relaxed">{dest.desc}</span>

              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 to-white/5 rounded-2xl sm:rounded-3xl" />
              <div className="absolute top-0 left-0 w-full h-[30px] bg-white/10 backdrop-blur-3xl rounded-t-2xl sm:rounded-t-3xl opacity-60" />
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10">
          <Link
            href="/booking"
            className={clsx(
              "group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg",
              "bg-black/20 backdrop-blur-xl border border-white/30",
              "rounded-2xl sm:rounded-3xl font-semibold tracking-wide text-white",
              "shadow-lg active:scale-95 sm:hover:bg-white/25 sm:hover:border-white/50",
              "sm:hover:scale-105 transition-all duration-300"
            )}
          >
            Book Your Transfer Now
            <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-y-1 transition-transform" />
          </Link>
        </div>

        <div
          className={clsx(
            "absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2",
            isMounted && "animate-bounce"
          )}
        >
          <p className="text-white/80 text-[10px] sm:text-xs tracking-widest uppercase mb-1 sm:mb-2 font-medium whitespace-nowrap">
            Scroll for instant quote
          </p>
          <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-white/70 mx-auto" />
        </div>
      </div>
    </section>
  );
}