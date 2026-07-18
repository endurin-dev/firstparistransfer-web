// src/app/components/InstantBooking.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Cormorant_Garamond, Inter } from "next/font/google";
import {
  ArrowRight,
  Clock,
  MapPin,
  Calendar,
  User,
  Users,
  Baby,
  Car,
  Shield,
  CreditCard,
  Star,
  Clock3,
  Phone,
  CheckCircle,
} from "lucide-react";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["italic"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

// Maps this widget's internal trip-type values to the label format the
// main booking page's `tripType` state uses, so the two stay in sync
// once /booking is wired up to read these query params.
const TRIP_TYPE_LABELS: Record<string, string> = {
  arrival: "One Way – Arrival",
  departure: "One Way – Departure",
  round: "Round Trip",
};

interface LocationGroup {
  category: string;
  items: string[];
}

export default function InstantBooking() {
  const router = useRouter();

  const [tripType, setTripType] = useState("arrival");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [infants, setInfants] = useState("0");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [locationGroups, setLocationGroups] = useState<LocationGroup[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(true);

  useEffect(() => {
    fetch("/api/locations")
      .then((r) => r.json())
      .then((data: LocationGroup[]) => setLocationGroups(data))
      .catch(() => setLocationGroups([]))
      .finally(() => setLoadingLocations(false));
  }, []);

  const canContinue = Boolean(from && to && date && time);

  const handleBookNow = () => {
    const params = new URLSearchParams({
      tripType: TRIP_TYPE_LABELS[tripType] ?? tripType,
      from,
      to,
      date,
      time,
      adults,
      children,
      infants,
    });
    router.push(`/booking?${params.toString()}`);
  };

  const labelClass = "text-[11px] tracking-[0.15em] uppercase text-[#8B8A8F] mb-2 flex items-center gap-2";
  const inputClass =
    "w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl focus:ring-1 focus:ring-[#C9A667] focus:border-[#C9A667] text-[#F5F3EF] text-sm outline-none appearance-none [color-scheme:dark]";

  return (
    <section
      className={`${inter.variable} ${cormorant.variable} font-[family-name:var(--font-body)] py-20 px-6 relative`}
      style={{
        background:
          "radial-gradient(1100px 500px at 50% -10%, rgba(201,166,103,0.08), transparent), #0a0a0a",
      }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#C9A667] mb-4">
            Instant Quote
          </p>
          <h2 className="font-[family-name:var(--font-display)] italic text-4xl md:text-5xl text-[#F5F3EF] mb-3">
            Plan Your Transfer
          </h2>
          <p className="text-[#8B8A8F] text-sm md:text-base">
            Fixed pricing on the next step • Pay on arrival • Free cancellation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* LEFT SIDE */}
          <div className="space-y-8">

            {/* How It Works */}
            <div className="bg-[#131215] border border-white/[0.06] rounded-2xl p-7">
              <h3 className="font-[family-name:var(--font-display)] italic text-2xl text-[#F5F3EF] mb-6">
                How It Works
              </h3>
              <div className="space-y-5">
                {[
                  { step: 1, title: "Choose Your Service", desc: "Airport transfer or private chauffeur for tours & shopping" },
                  { step: 2, title: "Select Locations", desc: "Any airport, hotel, station or landmark in Paris" },
                  { step: 3, title: "Date, Time & Passengers", desc: "Exact pickup + free child seats on request" },
                  { step: 4, title: "Instant Fixed Price", desc: "All taxes, tolls & 60 min waiting included" },
                  { step: 5, title: "Book & Relax", desc: "No payment now • Cancel free up to 24h before" },
                ].map((item, idx, arr) => (
                  <div key={item.step} className="flex gap-4 relative">
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 shrink-0 rounded-full border border-[#C9A667]/50 text-[#C9A667] flex items-center justify-center font-[family-name:var(--font-display)] text-sm">
                        0{item.step}
                      </div>
                      {idx < arr.length - 1 && <div className="w-px flex-1 bg-white/10 mt-1" />}
                    </div>
                    <div className="pb-1">
                      <h4 className="font-semibold text-[#F5F3EF] text-sm">{item.title}</h4>
                      <p className="text-[#8B8A8F] text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Book With Us */}
            <div className="bg-[#131215] border border-white/[0.06] rounded-2xl p-7">
              <h3 className="font-[family-name:var(--font-display)] italic text-2xl text-[#F5F3EF] mb-5">
                Why Book With Us
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, text: "Fully Licensed & Insured" },
                  { icon: CreditCard, text: "Pay on the Day" },
                  { icon: Star, text: "5-Star Reviews" },
                  { icon: Clock3, text: "60 min Free Waiting" },
                  { icon: Phone, text: "24/7 WhatsApp Support" },
                  { icon: CheckCircle, text: "Free Child Seats" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <item.icon className="w-4 h-4 text-[#C9A667] shrink-0" />
                    <span className="text-xs text-[#D9D7D2]">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE – FORM */}
          <div className="bg-[#131215] border border-white/[0.06] rounded-2xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] p-7">
            <div className="space-y-5">

              {/* Trip Type */}
              <div>
                <label className={labelClass}>
                  <Car className="w-3.5 h-3.5 text-[#C9A667]" /> Trip Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "arrival", label: "Arrival" },
                    { value: "departure", label: "Departure" },
                    { value: "round", label: "Round Trip" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setTripType(opt.value)}
                      className={`px-3 py-3 rounded-xl text-xs font-medium border transition-colors duration-200 ${
                        tripType === opt.value
                          ? "bg-[#C9A667] text-[#0a0a0a] border-[#C9A667]"
                          : "bg-white/[0.03] text-[#D9D7D2] border-white/10 hover:border-[#C9A667]/40"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* From / To */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    <MapPin className="w-3.5 h-3.5 text-[#C9A667]" /> From
                  </label>
                  <select
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    disabled={loadingLocations}
                    className={inputClass}
                  >
                    <option value="" className="bg-[#131215]">
                      {loadingLocations ? "Loading…" : "From…"}
                    </option>
                    {locationGroups.map((group) => (
                      <optgroup key={group.category} label={group.category} className="bg-[#131215]">
                        {group.items.map((loc) => (
                          <option key={loc} value={loc} className="bg-[#131215]">{loc}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>
                    <MapPin className="w-3.5 h-3.5 text-[#C9A667]" /> To
                  </label>
                  <select
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    disabled={loadingLocations}
                    className={inputClass}
                  >
                    <option value="" className="bg-[#131215]">
                      {loadingLocations ? "Loading…" : "To…"}
                    </option>
                    {locationGroups.map((group) => (
                      <optgroup key={group.category} label={group.category} className="bg-[#131215]">
                        {group.items.map((loc) => (
                          <option key={loc} value={loc} className="bg-[#131215]">{loc}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date / Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    <Calendar className="w-3.5 h-3.5 text-[#C9A667]" /> Date
                  </label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>
                    <Clock className="w-3.5 h-3.5 text-[#C9A667]" /> Time
                  </label>
                  <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={inputClass} />
                </div>
              </div>

              {/* Passengers */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className={labelClass}>
                    <User className="w-3.5 h-3.5 text-[#C9A667]" /> Adults
                  </label>
                  <input type="number" min="1" value={adults} onChange={(e) => setAdults(e.target.value)} className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>
                    <Users className="w-3.5 h-3.5 text-[#C9A667]" /> Children
                  </label>
                  <input type="number" min="0" value={children} onChange={(e) => setChildren(e.target.value)} className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>
                    <Baby className="w-3.5 h-3.5 text-[#C9A667]" /> Infants
                  </label>
                  <input type="number" min="0" value={infants} onChange={(e) => setInfants(e.target.value)} className={inputClass} />
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4 border-t border-white/[0.06] text-center">
                <button
                  onClick={handleBookNow}
                  disabled={!canContinue}
                  className="w-full bg-[#C9A667] hover:bg-[#E4C98F] text-[#0a0a0a] font-semibold py-4 rounded-xl shadow-lg shadow-[#C9A667]/10 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Continue to Booking
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-[#6B6B6E] text-xs mt-3 tracking-wide">
                  No card needed · Free cancellation 24h before
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}