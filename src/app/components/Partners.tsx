// app/components/PartnersSlider.tsx
import Image from 'next/image';

const logos = [
  '/partners/bluenote-logo.jpg',
  '/partners/tripadvisor-logo.png',
  '/partners/GetYourGuide_Logo.jpg',
  '/partners/Booking-logo.png',
  '/partners/Agoda_logo.png',
  '/partners/avawia_logo.png',
  '/partners/chenda_logo.jpeg',
] as const;

const allLogos = [...logos, ...logos];

export default function PartnersSlider() {
  return (
    <section className="py-16 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <p className="text-center text-gray-950 font-extrabold text-sm md:text-base tracking-widest mb-12 uppercase">
  Trusted by Leading Brands Worldwide
</p>

        {/* Infinite Scroll */}
        <div className="overflow-hidden">
          <div className="flex items-center gap-16 md:gap-24 animate-slide">
            {allLogos.map((src, i) => (
              <div key={i} className="flex-shrink-0">
                <Image
                  src={src}
                  alt="Partner logo"
                  width={180}
                  height={90}
                  className="h-14 md:h-16 w-auto object-contain 
                             opacity-70 hover:opacity-100 
                             grayscale hover:grayscale-0 
                             transition-all duration-700"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}