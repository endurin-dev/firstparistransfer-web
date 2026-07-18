// src/app/booking/page.tsx
"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { motion } from "framer-motion";
import {
  Car,
  MapPin,
  Calendar,
  Clock,
  User,
  Flag,
  Mail,
  FileText,
  Phone,
  CheckCircle,
  ArrowRight,
  Users,
  Briefcase,
  Wifi,
  Baby,
  Snowflake,
  Plane,
} from "lucide-react";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

interface Vehicle {
  id: string;
  name: string;
  type: string;
  passengers: number;
  luggage: number;
  basePrice: number;
  image: string;
  active?: boolean;
}

interface LocationItem {
  id: string;
  name: string;
}

interface LocationGroup {
  category: string;
  items: LocationItem[];
}

interface RouteRate {
  vehicleId: string;
  price: number;
  isRoutePrice: boolean;
}

function BookingForm() {
  const searchParams = useSearchParams();
  const prefilledRef = useRef(false);

  const [step, setStep] = useState(1);

  // Master data (loaded from the admin panel via API)
  const [allLocations, setAllLocations] = useState<LocationGroup[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [routeRates, setRouteRates] = useState<RouteRate[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/locations").then((r) => r.json()),
      fetch("/api/admin/vehicles").then((r) => r.json()),
    ]).then(([locs, vehs]: [any[], Vehicle[]]) => {
      // Group the flat locations list into { category, items: [{id, name}] }
      const grouped: Record<string, LocationItem[]> = {};
      for (const loc of locs) {
        if (loc.active === false) continue;
        if (!grouped[loc.category]) grouped[loc.category] = [];
        grouped[loc.category].push({ id: loc.id, name: loc.name });
      }
      const groupedArray: LocationGroup[] = Object.entries(grouped).map(
        ([category, items]) => ({ category, items })
      );

      setAllLocations(groupedArray);
      setVehicles(vehs.filter((v: any) => v.active !== false));
      setLoadingData(false);
    });
  }, []);

  // Step 1 — from/to now store location IDs (not names)
  const [tripType, setTripType] = useState("One Way – Arrival");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Step 2
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Look up a display name from a location id
  const locationName = (id: string) => {
    for (const grp of allLocations) {
      const item = grp.items.find((i) => i.id === id);
      if (item) return item.name;
    }
    return "";
  };

  // Look up a location id from a display name (case-insensitive) — used to
  // resolve the plain-text from/to sent by the homepage quote widget.
  const locationIdByName = (rawName: string) => {
    const target = rawName.trim().toLowerCase();
    for (const grp of allLocations) {
      const item = grp.items.find((i) => i.name.trim().toLowerCase() === target);
      if (item) return item.id;
    }
    return "";
  };

  // Fetch route-specific pricing whenever From/To changes (set in the Rates admin page)
  useEffect(() => {
    if (!from || !to) {
      setRouteRates([]);
      return;
    }
    fetch(
      `/api/admin/rates?fromLocationId=${encodeURIComponent(from)}&toLocationId=${encodeURIComponent(to)}`
    )
      .then((r) => r.json())
      .then((data: any[]) => {
        setRouteRates(
          data.map((r) => ({
            vehicleId: r.vehicleId,
            price: r.price,
            isRoutePrice: true,
          }))
        );
      });
  }, [from, to]);

  const priceFor = (vehicleId: string, fallback: number) => {
    const rate = routeRates.find((r) => r.vehicleId === vehicleId);
    return rate ? rate.price : fallback;
  };

  // Step 3
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  // Prefill from the query params the homepage quote widget sends
  // (?tripType=&from=&to=&date=&time=&adults=&children=&infants=), once
  // locations have loaded so from/to names can be resolved to IDs. Runs once.
  useEffect(() => {
    if (prefilledRef.current || allLocations.length === 0) return;
    if (![...searchParams.keys()].length) return;

    const tripTypeParam = searchParams.get("tripType");
    const fromParam = searchParams.get("from");
    const toParam = searchParams.get("to");
    const dateParam = searchParams.get("date");
    const timeParam = searchParams.get("time");
    const adults = searchParams.get("adults");
    const children = searchParams.get("children");
    const infants = searchParams.get("infants");

    if (tripTypeParam && ["One Way – Arrival", "One Way – Departure", "Round Trip"].includes(tripTypeParam)) {
      setTripType(tripTypeParam);
    }
    if (dateParam) setDate(dateParam);
    if (timeParam) setTime(timeParam);

    let resolvedFrom = "";
    let resolvedTo = "";
    if (fromParam) {
      resolvedFrom = locationIdByName(fromParam);
      if (resolvedFrom) setFrom(resolvedFrom);
    }
    if (toParam) {
      resolvedTo = locationIdByName(toParam);
      if (resolvedTo) setTo(resolvedTo);
    }

    const passengerParts = [];
    if (adults && adults !== "0") passengerParts.push(`${adults} adult${adults === "1" ? "" : "s"}`);
    if (children && children !== "0") passengerParts.push(`${children} child${children === "1" ? "" : "ren"}`);
    if (infants && infants !== "0") passengerParts.push(`${infants} infant${infants === "1" ? "" : "s"}`);
    if (passengerParts.length) {
      setNote((prev) => (prev ? prev : `Passengers: ${passengerParts.join(", ")}`));
    }

    // If the quote widget already gave us a complete itinerary, skip straight
    // to vehicle selection instead of making the rider re-enter it.
    if (resolvedFrom && resolvedTo && dateParam && timeParam) {
      setStep(2);
    }

    prefilledRef.current = true;
  }, [allLocations, searchParams]);

  const isStep1Valid = from && to && date && time;
  const isStep3Valid = name && email && phone;

  const currentPrice = selectedVehicle ? priceFor(selectedVehicle.id, selectedVehicle.basePrice) : 0;

  const summary = {
    "Trip Type": tripType,
    From: locationName(from),
    To: locationName(to),
    Date: date ? new Date(date).toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" }) : "",
    Time: time,
    Vehicle: selectedVehicle?.name || "",
    Passengers: selectedVehicle ? `${selectedVehicle.passengers} passengers` : "",
    Luggage: selectedVehicle ? `${selectedVehicle.luggage} pieces` : "",
    Price: selectedVehicle ? `€${currentPrice}` : "",
    Name: name,
    Country: country,
    Phone: phone,
    Email: email,
    Note: note || "(None)",
  };

  const resetBooking = () => {
    setStep(1);
    setTripType("One Way – Arrival");
    setFrom("");
    setTo("");
    setDate("");
    setTime("");
    setSelectedVehicle(null);
    setName("");
    setCountry("");
    setPhone("");
    setEmail("");
    setNote("");
    setBookingSuccess(false);
  };

  const submitBooking = async () => {
    if (!selectedVehicle) return;
    setSubmitting(true);
    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripType,
          fromText: locationName(from),
          toText: locationName(to),
          date,
          time,
          vehicleId: selectedVehicle.id,
          vehicleName: selectedVehicle.name,
          price: currentPrice,
          name,
          country,
          phone,
          email,
          note,
        }),
      });
      setBookingSuccess(true);
    } catch (err) {
      alert("Something went wrong submitting your booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const steps = [
    { number: 1, label: "Itinerary" },
    { number: 2, label: "Vehicle" },
    { number: 3, label: "Passenger" },
  ];

  const vehicleBadges = (v: Vehicle) => [
    { icon: Users, label: `${v.passengers} Passengers` },
    { icon: Briefcase, label: `${v.luggage} Luggage` },
    { icon: Wifi, label: "Wi-Fi" },
    { icon: Baby, label: "Baby Seat" },
    { icon: Snowflake, label: "Climate Control" },
  ];

  return (
    <section
      className={`${inter.variable} ${cormorant.variable} font-[family-name:var(--font-body)] min-h-screen pt-40 pb-24 px-4 relative`}
      style={{
        background:
          "radial-gradient(1100px 500px at 50% -10%, rgba(201,166,103,0.08), transparent), #0a0a0a",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Masthead */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#C9A667] mb-4">
            Paris · Private Chauffeur
          </p>
          <h1 className="font-[family-name:var(--font-display)] italic text-5xl md:text-6xl text-[#F5F3EF] mb-3 tracking-tight">
            Reserve Your Transfer
          </h1>
          <p className="text-sm md:text-base text-[#8B8A8F]">
            A private car, a fixed fare, and a driver waiting for you — confirmed in three steps.
          </p>
        </motion.div>

        {loadingData ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-8 h-8 rounded-full border border-[#C9A667]/30 border-t-[#C9A667] animate-spin" />
            <p className="text-[#8B8A8F] text-sm tracking-wide">Preparing your booking options…</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
            {!bookingSuccess && (
              <>
                <div className="lg:col-span-2">
                  {/* Progress Tracker */}
                  <div className="mb-10 px-1">
                    <div className="flex items-center justify-between">
                      {steps.map((s, idx) => (
                        <div key={s.number} className="flex items-center flex-1 last:flex-none">
                          <div className="flex flex-col items-center gap-2">
                            <div
                              className={`w-9 h-9 rounded-full flex items-center justify-center border font-[family-name:var(--font-display)] text-base transition-colors duration-300 ${
                                step === s.number
                                  ? "border-[#C9A667] bg-[#C9A667] text-[#0a0a0a]"
                                  : step > s.number
                                  ? "border-[#C9A667]/60 text-[#C9A667] bg-transparent"
                                  : "border-white/15 text-[#8B8A8F]"
                              }`}
                            >
                              {step > s.number ? <CheckCircle className="w-4 h-4" /> : `0${s.number}`}
                            </div>
                            <span
                              className={`text-[10px] tracking-[0.2em] uppercase ${
                                step >= s.number ? "text-[#F5F3EF]" : "text-[#8B8A8F]"
                              }`}
                            >
                              {s.label}
                            </span>
                          </div>
                          {idx < steps.length - 1 && (
                            <div className="flex-1 h-px mx-3 bg-white/10 relative -mt-5">
                              <div
                                className="absolute inset-y-0 left-0 bg-[#C9A667] transition-all duration-500"
                                style={{ width: step > s.number ? "100%" : "0%" }}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="bg-[#131215] border border-white/[0.06] rounded-2xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] p-6 md:p-8"
                  >
                    {/* Step 1 */}
                    {step === 1 && (
                      <div className="space-y-7">
                        <div>
                          <h2 className="font-[family-name:var(--font-display)] italic text-2xl text-[#F5F3EF] mb-1">
                            Your Itinerary
                          </h2>
                          <p className="text-[#8B8A8F] text-sm">Where and when should your driver be ready?</p>
                        </div>

                        {/* Trip type — segmented control */}
                        <div>
                          <label className="text-[11px] tracking-[0.15em] uppercase text-[#8B8A8F] mb-2 flex items-center gap-2">
                            <Car className="w-3.5 h-3.5 text-[#C9A667]" /> Trip Type
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {["One Way – Arrival", "One Way – Departure", "Round Trip"].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setTripType(opt)}
                                className={`px-4 py-3 rounded-xl text-sm font-medium border transition-colors duration-200 ${
                                  tripType === opt
                                    ? "bg-[#C9A667] text-[#0a0a0a] border-[#C9A667]"
                                    : "bg-white/[0.03] text-[#D9D7D2] border-white/10 hover:border-[#C9A667]/40"
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[11px] tracking-[0.15em] uppercase text-[#8B8A8F] mb-2 flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5 text-[#C9A667]" /> From
                            </label>
                            <select
                              value={from}
                              onChange={(e) => setFrom(e.target.value)}
                              className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl focus:ring-1 focus:ring-[#C9A667] focus:border-[#C9A667] text-[#F5F3EF] text-sm outline-none appearance-none"
                            >
                              <option value="" className="bg-[#131215]">Select pickup location…</option>
                              {allLocations.map((cat, catIdx) => (
                                <optgroup key={`${cat.category}-${catIdx}`} label={cat.category} className="bg-[#131215]">
                                  {cat.items.map((loc, idx) => (
                                    <option key={loc.id ?? `${cat.category}-${idx}`} value={loc.id} className="bg-[#131215]">
                                      {loc.name}
                                    </option>
                                  ))}
                                </optgroup>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="text-[11px] tracking-[0.15em] uppercase text-[#8B8A8F] mb-2 flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5 text-[#C9A667]" /> To
                            </label>
                            <select
                              value={to}
                              onChange={(e) => setTo(e.target.value)}
                              className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl focus:ring-1 focus:ring-[#C9A667] focus:border-[#C9A667] text-[#F5F3EF] text-sm outline-none appearance-none"
                            >
                              <option value="" className="bg-[#131215]">Select destination…</option>
                              {allLocations.map((cat, catIdx) => (
                                <optgroup key={`${cat.category}-${catIdx}`} label={cat.category} className="bg-[#131215]">
                                  {cat.items.map((loc, idx) => (
                                    <option key={loc.id ?? `${cat.category}-${idx}`} value={loc.id} className="bg-[#131215]">
                                      {loc.name}
                                    </option>
                                  ))}
                                </optgroup>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[11px] tracking-[0.15em] uppercase text-[#8B8A8F] mb-2 flex items-center gap-2">
                              <Calendar className="w-3.5 h-3.5 text-[#C9A667]" /> Date
                            </label>
                            <input
                              type="date"
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                              className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl focus:ring-1 focus:ring-[#C9A667] focus:border-[#C9A667] text-[#F5F3EF] text-sm outline-none [color-scheme:dark]"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] tracking-[0.15em] uppercase text-[#8B8A8F] mb-2 flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5 text-[#C9A667]" /> Pickup Time
                            </label>
                            <input
                              type="time"
                              value={time}
                              onChange={(e) => setTime(e.target.value)}
                              className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl focus:ring-1 focus:ring-[#C9A667] focus:border-[#C9A667] text-[#F5F3EF] text-sm outline-none [color-scheme:dark]"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => setStep(2)}
                            disabled={!isStep1Valid}
                            className="w-full sm:w-auto px-8 py-3.5 bg-[#C9A667] hover:bg-[#E4C98F] text-[#0a0a0a] font-medium rounded-xl shadow-lg shadow-[#C9A667]/10 flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
                          >
                            Choose Vehicle <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                      <div className="space-y-7">
                        <div>
                          <h2 className="font-[family-name:var(--font-display)] italic text-2xl text-[#F5F3EF] mb-1">
                            Select Your Vehicle
                          </h2>
                          <p className="text-[#8B8A8F] text-sm">Every car is chauffeur-driven, insured, and immaculate</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {vehicles.map((v) => {
                            const price = priceFor(v.id, v.basePrice);
                            const selected = selectedVehicle?.id === v.id;
                            return (
                              <motion.div
                                key={v.id}
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => setSelectedVehicle(v)}
                                className={`cursor-pointer rounded-2xl overflow-hidden border transition-colors duration-200 ${
                                  selected
                                    ? "border-[#C9A667] shadow-[0_0_0_1px_rgba(201,166,103,0.4)]"
                                    : "border-white/10 hover:border-white/25"
                                }`}
                              >
                                <div className="relative h-36 w-full bg-black/40">
                                  <Image src={v.image} alt={v.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                                  {selected && (
                                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#C9A667] flex items-center justify-center">
                                      <CheckCircle className="w-4 h-4 text-[#0a0a0a]" />
                                    </div>
                                  )}
                                </div>
                                <div className="p-4 bg-[#16151A] space-y-3">
                                  <div>
                                    <h3 className="font-[family-name:var(--font-display)] text-xl text-[#F5F3EF]">{v.name}</h3>
                                    <p className="text-[#8B8A8F] text-xs tracking-wide">{v.type}</p>
                                  </div>

                                  <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                                    {vehicleBadges(v).map((b, i) => (
                                      <span key={i} className="flex items-center gap-1 text-[10px] tracking-wide text-[#B5B3AE]">
                                        <b.icon className="w-3 h-3 text-[#C9A667]" /> {b.label}
                                      </span>
                                    ))}
                                  </div>

                                  <div className="pt-2 border-t border-white/[0.06] flex justify-between items-baseline">
                                    <span className="text-[10px] uppercase tracking-[0.15em] text-[#8B8A8F]">Fixed fare</span>
                                    <span className="font-[family-name:var(--font-display)] text-2xl text-[#C9A667]">€{price}</span>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>

                        <div className="flex justify-between pt-2">
                          <button
                            onClick={() => setStep(1)}
                            className="px-6 py-3 bg-white/[0.04] hover:bg-white/[0.08] text-[#D9D7D2] font-medium rounded-xl border border-white/10 transition-colors duration-200"
                          >
                            ← Back
                          </button>
                          <button
                            onClick={() => setStep(3)}
                            disabled={!selectedVehicle}
                            className="px-8 py-3.5 bg-[#C9A667] hover:bg-[#E4C98F] text-[#0a0a0a] font-medium rounded-xl flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
                          >
                            Continue <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 3 */}
                    {step === 3 && !bookingSuccess && (
                      <div className="space-y-7">
                        <div>
                          <h2 className="font-[family-name:var(--font-display)] italic text-2xl text-[#F5F3EF] mb-1">
                            Passenger Details
                          </h2>
                          <p className="text-[#8B8A8F] text-sm">Your driver will have these on file for pickup</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[11px] tracking-[0.15em] uppercase text-[#8B8A8F] mb-2 flex items-center gap-2">
                              <User className="w-3.5 h-3.5 text-[#C9A667]" /> Full Name
                            </label>
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="John Doe"
                              className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl focus:ring-1 focus:ring-[#C9A667] focus:border-[#C9A667] text-[#F5F3EF] placeholder:text-[#6B6B6E] text-sm outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] tracking-[0.15em] uppercase text-[#8B8A8F] mb-2 flex items-center gap-2">
                              <Flag className="w-3.5 h-3.5 text-[#C9A667]" /> Country
                            </label>
                            <input
                              type="text"
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                              placeholder="France"
                              className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl focus:ring-1 focus:ring-[#C9A667] focus:border-[#C9A667] text-[#F5F3EF] placeholder:text-[#6B6B6E] text-sm outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] tracking-[0.15em] uppercase text-[#8B8A8F] mb-2 flex items-center gap-2">
                              <Mail className="w-3.5 h-3.5 text-[#C9A667]" /> Email
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="john@example.com"
                              className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl focus:ring-1 focus:ring-[#C9A667] focus:border-[#C9A667] text-[#F5F3EF] placeholder:text-[#6B6B6E] text-sm outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] tracking-[0.15em] uppercase text-[#8B8A8F] mb-2 flex items-center gap-2">
                              <Phone className="w-3.5 h-3.5 text-[#C9A667]" /> Phone Number
                            </label>
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="+33 6 12 34 56 78"
                              className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl focus:ring-1 focus:ring-[#C9A667] focus:border-[#C9A667] text-[#F5F3EF] placeholder:text-[#6B6B6E] text-sm outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] tracking-[0.15em] uppercase text-[#8B8A8F] mb-2 flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5 text-[#C9A667]" /> Special Requests (Optional)
                          </label>
                          <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            rows={3}
                            placeholder="Child seat needed • Flight number: AF123…"
                            className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl focus:ring-1 focus:ring-[#C9A667] focus:border-[#C9A667] resize-none text-[#F5F3EF] placeholder:text-[#6B6B6E] text-sm outline-none"
                          />
                        </div>

                        <div className="flex justify-between pt-2">
                          <button
                            onClick={() => setStep(2)}
                            className="px-6 py-3 bg-white/[0.04] hover:bg-white/[0.08] text-[#D9D7D2] font-medium rounded-xl border border-white/10 transition-colors duration-200"
                          >
                            ← Back
                          </button>
                          <button
                            onClick={submitBooking}
                            disabled={!isStep3Valid || submitting}
                            className="px-8 py-3.5 bg-[#C9A667] hover:bg-[#E4C98F] text-[#0a0a0a] font-medium rounded-xl flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
                          >
                            <CheckCircle className="w-4.5 h-4.5" /> {submitting ? "Confirming…" : "Confirm Booking"}
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Summary Sidebar — voyage dossier */}
                <div className="lg:sticky lg:top-24 h-fit">
                  <DossierCard summary={summary} currentPrice={currentPrice} selectedVehicle={selectedVehicle} />
                </div>
              </>
            )}

            {/* Success State */}
            {bookingSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-xl mx-auto lg:col-span-3"
              >
                <div className="text-center mb-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full border border-[#C9A667] flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-[#C9A667]" />
                  </div>
                  <h2 className="font-[family-name:var(--font-display)] italic text-3xl text-[#F5F3EF] mb-2">
                    Booking Confirmed
                  </h2>
                  <p className="text-[#8B8A8F] text-sm">A confirmation with your chauffeur's details will arrive by email shortly.</p>
                </div>

                <DossierCard summary={summary} currentPrice={currentPrice} selectedVehicle={selectedVehicle} />

                <div className="mt-8 text-center">
                  <button
                    onClick={resetBooking}
                    className="px-8 py-3.5 bg-[#C9A667] hover:bg-[#E4C98F] text-[#0a0a0a] font-medium rounded-xl transition-colors duration-200"
                  >
                    Book Another Transfer
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// Signature element: a boarding-pass style "voyage dossier" — used for both the
// live booking summary and the confirmation receipt, so the same object a rider
// builds during checkout becomes the document they keep.
function DossierCard({
  summary,
  currentPrice,
  selectedVehicle,
}: {
  summary: Record<string, string>;
  currentPrice: number;
  selectedVehicle: Vehicle | null;
}) {
  return (
    <div className="rounded-2xl overflow-hidden border border-[#C9A667]/20 bg-[#131215]">
      <div className="p-6 pb-5">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full border border-[#C9A667]/50 flex items-center justify-center">
              <Plane className="w-3.5 h-3.5 text-[#C9A667]" />
            </span>
            <span className="font-[family-name:var(--font-display)] italic text-lg text-[#F5F3EF]">
              Voyage Dossier
            </span>
          </div>
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6E]">Paris</span>
        </div>

        <div className="space-y-0">
          {Object.entries(summary).map(
            ([key, value]) =>
              value && (
                <div key={key} className="flex justify-between items-baseline py-2 border-b border-white/[0.05]">
                  <span className="text-[10px] tracking-[0.15em] uppercase text-[#6B6B6E]">{key}</span>
                  <span className="text-sm text-[#E8E6E1] font-medium text-right ml-4">{value}</span>
                </div>
              )
          )}
        </div>

        {selectedVehicle && (
          <div className="mt-5 flex justify-between items-center">
            <span className="text-xs tracking-wide text-[#8B8A8F]">Total Fare</span>
            <span className="font-[family-name:var(--font-display)] text-3xl text-[#C9A667]">€{currentPrice}</span>
          </div>
        )}
      </div>

      {/* Perforation */}
      <div
        className="h-0 border-t border-dashed border-[#C9A667]/25 relative"
        aria-hidden="true"
      >
        <span className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-[#0a0a0a]" />
        <span className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-[#0a0a0a]" />
      </div>

      <div className="px-6 py-4 flex items-center justify-between">
        <p className="text-[10px] tracking-[0.15em] uppercase text-[#6B6B6E]">
          Fixed fare · free cancellation
        </p>
        <div className="flex gap-[2px] items-end" aria-hidden="true">
          {[3, 5, 2, 6, 3, 4, 2, 5, 3, 6, 2, 4].map((h, i) => (
            <span key={i} className="w-[2px] bg-[#6B6B6E]/50" style={{ height: `${h * 2}px` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// useSearchParams requires a Suspense boundary in the app router.
export default function BookingPage() {
  return (
    <Suspense fallback={null}>
      <BookingForm />
    </Suspense>
  );
}