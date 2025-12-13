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
    <section className="py-32 bg-black w-full overflow-hidden">
      <div className="max-w-full mx-auto px-6">

        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-extrabold text-white">
            Luxury Fleet
          </h2>
          <p className="mt-4 text-yellow-500 text-lg">
            Experience premium comfort, class & performance
          </p>
        </div>

        <div className="relative h-[350px] overflow-hidden">
          <div className="absolute inset-0 flex animate-smoothSlideWide gap-6">
            {loop.map((car, i) => (
              <div
                key={i}
                className="relative w-[500px] h-full shrink-0 overflow-hidden rounded-3xl bg-gradient-to-tl from-white/15 via-white/10 to-white/5 backdrop-blur-[40px] border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-cover rounded-3xl"
                  unoptimized
                />

                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-3xl pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-20 bg-white/5 backdrop-blur-xl rounded-t-3xl opacity-60" />

                <div className="absolute inset-y-0 left-0 w-1/2 p-6 flex flex-col justify-center">
                  <h3 className="text-4xl font-extrabold text-black drop-shadow-lg relative">
                    {car.name}
                    <span className="absolute inset-0 text-black/10 blur-[2px] -z-10">{car.name}</span>
                  </h3>
                  <p className="text-yellow-500 text-lg font-medium mt-1 relative drop-shadow-[0_0_6px_black]">
                    {car.type}
                    <span className="absolute inset-0 text-yellow-500/20 blur-[1px] -z-10">{car.type}</span>
                  </p>
                  <p className="text-black/70 text-sm mt-2 leading-relaxed drop-shadow-[0_0_6px_black]">
                    {car.desc}
                  </p>

                  <div className="flex gap-6 mt-6">
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-xl border border-white/30 shadow-md text-black text-2xl font-bold">
                        {car.passengers}
                      </div>
                      <div className="text-black/70 text-xs uppercase tracking-wider mt-1">Passengers</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-xl border border-white/30 shadow-md text-black text-2xl font-bold">
                        {car.luggage}
                      </div>
                      <div className="text-black/70 text-xs uppercase tracking-wider mt-1">Luggage</div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
