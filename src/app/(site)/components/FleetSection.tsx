"use client";
import Image from "next/image";

export default function FleetSection() {
  const vehicles = [
    { name: "Mercedes S-Class", type: "Flagship Luxury", passengers: 3, luggage: 2, image: "/fleet/s-class.webp", desc: "The ultimate in luxury and comfort for your city transfers." },
    { name: "Mercedes E-Class", type: "Executive Sedan", passengers: 4, luggage: 3, image: "/fleet/sprinter.webp", desc: "Elegant and spacious sedan perfect for business and leisure." },
    { name: "Mercedes V-Class", type: "Luxury Minivan", passengers: 7, luggage: 7, image: "/fleet/s-class.webp", desc: "Ideal for family or group travel with ample luggage space." },
    { name: "Mercedes Sprinter VIP", type: "Executive Van", passengers: 12, luggage: 12, image: "/fleet/sprinter.webp", desc: "Executive van with premium features for large groups." },
    { name: "Range Rover Vogue", type: "Luxury SUV", passengers: 4, luggage: 4, image: "/fleet/s-class.webp", desc: "Stylish and powerful SUV for city and airport transfers." },
  ];

  const loop = [...vehicles, ...vehicles];

  return (
    <section className="py-16 sm:py-20 md:py-28 lg:py-32 bg-black w-full overflow-hidden">
      <div className="max-w-full mx-auto px-4 sm:px-6">

        <div className="text-center mb-10 sm:mb-14 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white">
            Luxury Fleet
          </h2>
          <p className="mt-3 sm:mt-4 text-yellow-500 text-sm sm:text-base md:text-lg px-4">
            Experience premium comfort, class &amp; performance
          </p>
        </div>

        <div className="relative h-[260px] sm:h-[300px] md:h-[330px] lg:h-[350px] overflow-hidden">
          <div className="absolute inset-0 flex animate-smoothSlideWide motion-reduce:animate-none hover:[animation-play-state:paused] gap-4 sm:gap-5 md:gap-6">
            {loop.map((car, i) => (
              <div
                key={i}
                className="relative w-[240px] sm:w-[320px] md:w-[420px] lg:w-[500px] h-full shrink-0 overflow-hidden rounded-2xl sm:rounded-3xl bg-white/5 backdrop-blur-[40px] border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  sizes="(max-width: 640px) 240px, (max-width: 768px) 320px, (max-width: 1024px) 420px, 500px"
                  className="object-cover rounded-2xl sm:rounded-3xl"
                  unoptimized
                />

                {/* Contrast scrim — keeps text legible regardless of photo brightness or card width */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10 rounded-2xl sm:rounded-3xl pointer-events-none" />

                <div className="relative h-full w-[78%] sm:w-3/5 md:w-1/2 p-4 sm:p-5 md:p-6 flex flex-col justify-center">
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-extrabold text-white leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                    {car.name}
                  </h3>
                  <p className="text-yellow-500 text-xs sm:text-sm md:text-base lg:text-lg font-medium mt-1">
                    {car.type}
                  </p>
                  <p className="text-white/70 text-[11px] sm:text-xs md:text-sm mt-1.5 sm:mt-2 leading-relaxed line-clamp-2 sm:line-clamp-3">
                    {car.desc}
                  </p>

                  <div className="flex gap-3 sm:gap-4 md:gap-6 mt-3 sm:mt-4 md:mt-6">
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-xl border border-white/30 shadow-md text-white text-sm sm:text-base md:text-2xl font-bold">
                        {car.passengers}
                      </div>
                      <div className="text-white/70 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wider mt-1 text-center">Passengers</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-xl border border-white/30 shadow-md text-white text-sm sm:text-base md:text-2xl font-bold">
                        {car.luggage}
                      </div>
                      <div className="text-white/70 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wider mt-1 text-center">Luggage</div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}