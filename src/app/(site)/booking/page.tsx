// src/app/booking/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
  Star,
} from "lucide-react";

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

export default function BookingPage() {
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
    Price: selectedVehicle ? `$${currentPrice}` : "",
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

  return (
    <section className="min-h-screen bg-gray-50 pt-40 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-4xl font-semibold text-gray-900 mb-2">Book Your Private Transfer</h1>
          <p className="text-lg text-gray-600">Premium chauffeur service in Paris • Instant confirmation</p>
        </motion.div>

        {loadingData ? (
          <p className="text-center text-gray-500">Loading booking options...</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {!bookingSuccess && (
              <>
                <div className="lg:col-span-2">
                  {/* Progress Bar */}
                  <div className="flex items-center justify-between mb-8 px-6 py-4 bg-gray-200/20 backdrop-blur-lg border border-white/20 rounded-3xl shadow-lg relative">
                    {[
                      { number: 1, label: "Trip Details" },
                      { number: 2, label: "Select Vehicle" },
                      { number: 3, label: "Passenger Info" },
                    ].map((s, idx) => (
                      <div key={s.number} className="flex-1 flex flex-col items-center relative">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-500
                            ${step === s.number ? "bg-yellow-400 text-black shadow-xl" : step > s.number ? "bg-yellow-300 text-black" : "bg-white/50 text-gray-700"}`}
                        >
                          {step > s.number ? <CheckCircle className="w-5 h-5" /> : s.number}
                        </div>
                        <span className="mt-2 text-xs text-gray-900 font-bold">{s.label}</span>
                        {idx < 2 && (
                          <div
                            className={`absolute top-4 left-1/2 w-full h-1 -translate-x-1/2 bg-white/40 rounded-full ${step > s.number ? "bg-yellow-400" : "bg-gray-300"}`}
                            style={{ zIndex: -1 }}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-lg p-6"
                  >
                    {/* Step 1 */}
                    {step === 1 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-semibold text-black mb-1">Trip Details</h2>
                          <p className="text-black text-sm">Where and when do you need a ride?</p>
                        </div>
                        <div className="grid gap-4">
                          <div>
                            <label className="text-sm font-medium text-black mb-1 flex items-center gap-1">
                              <Car className="w-4 h-4 text-yellow-600" /> Trip Type
                            </label>
                            <select
                              value={tripType}
                              onChange={(e) => setTripType(e.target.value)}
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-300 text-black"
                            >
                              <option>One Way – Arrival</option>
                              <option>One Way – Departure</option>
                              <option>Round Trip</option>
                            </select>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-black mb-1 flex items-center gap-1">
                                <MapPin className="w-4 h-4 text-yellow-600" /> From
                              </label>
                              <select
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-300 text-black"
                              >
                                <option value="">Select pickup location...</option>
                              {allLocations.map((cat, catIdx) => (
  <optgroup key={`${cat.category}-${catIdx}`} label={cat.category}>
    {cat.items.map((loc, idx) => (
      <option key={loc.id ?? `${cat.category}-${idx}`} value={loc.id}>
        {loc.name}
      </option>
    ))}
  </optgroup>
))}
                              </select>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-black mb-1 flex items-center gap-1">
                                <MapPin className="w-4 h-4 text-yellow-600" /> To
                              </label>
                              <select
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-300 text-black"
                              >
                                <option value="">Select destination...</option>
   {allLocations.map((cat, catIdx) => (
  <optgroup key={`${cat.category}-${catIdx}`} label={cat.category}>
    {cat.items.map((loc, idx) => (
      <option key={loc.id ?? `${cat.category}-${idx}`} value={loc.id}>
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
                              <label className="text-sm font-medium text-black mb-1 flex items-center gap-1">
                                <Calendar className="w-4 h-4 text-yellow-600" /> Date
                              </label>
                              <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-300 text-black"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium text-black mb-1 flex items-center gap-1">
                                <Clock className="w-4 h-4 text-yellow-600" /> Pickup Time
                              </label>
                              <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-300 text-black"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end pt-4">
                          <button
                            onClick={() => setStep(2)}
                            disabled={!isStep1Valid}
                            className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg shadow-md flex items-center gap-2 disabled:opacity-50"
                          >
                            Choose Vehicle <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-semibold text-black mb-1">Select Your Vehicle</h2>
                          <p className="text-black/70 text-sm">Choose the perfect car for your journey</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {vehicles.map((v) => {
                            const price = priceFor(v.id, v.basePrice);
                            return (
                              <motion.div
                                key={v.id}
                                whileHover={{ y: -6 }}
                                onClick={() => setSelectedVehicle(v)}
                                className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                                  selectedVehicle?.id === v.id
                                    ? "border-yellow-500 shadow-lg ring-2 ring-yellow-200"
                                    : "border-gray-200 shadow-sm hover:shadow-md"
                                }`}
                              >
                                <div className="relative h-36 w-full">
                                  <Image src={v.image} alt={v.name} fill className="object-cover" />
                                  {selectedVehicle?.id === v.id && (
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                      <CheckCircle className="w-12 h-12 text-white" />
                                    </div>
                                  )}
                                </div>
                                <div className="p-4 bg-gradient-to-b from-white to-gray-50 space-y-2">
                                  <h3 className="text-lg font-semibold text-black">{v.name}</h3>
                                  <p className="text-black/70 text-sm">{v.type}</p>

                                  <div className="flex flex-wrap gap-2 mt-1 text-xs">
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-black flex items-center gap-1">
                                      <User className="w-3 h-3" /> {v.passengers} Passengers
                                    </span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-black flex items-center gap-1">
                                      <Flag className="w-3 h-3" /> {v.luggage} Luggage
                                    </span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-black flex items-center gap-1">
                                      <Star className="w-3 h-3" /> Wi-Fi
                                    </span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-black flex items-center gap-1">
                                      <CheckCircle className="w-3 h-3" /> Baby Seat
                                    </span>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-black flex items-center gap-1">
                                      <Clock className="w-3 h-3" /> AC
                                    </span>
                                  </div>

                                  <div className="mt-2 flex justify-between items-center">
                                    <span className="font-extrabold text-3xl text-yellow-500">${price}</span>
                                    {selectedVehicle?.id === v.id && <CheckCircle className="w-5 h-5 text-green-600" />}
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>

                        <div className="flex justify-between pt-4">
                          <button onClick={() => setStep(1)} className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-black font-semibold rounded-lg">
                            ← Back
                          </button>
                          <button
                            onClick={() => setStep(3)}
                            disabled={!selectedVehicle}
                            className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg flex items-center gap-2 disabled:opacity-50"
                          >
                            Continue <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 3 */}
                    {step === 3 && !bookingSuccess && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-semibold text-gray-900 mb-1">Passenger Information</h2>
                          <p className="text-gray-600 text-sm">Almost there! Just a few details</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-900 mb-1 flex items-center gap-1">
                              <User className="w-4 h-4 text-yellow-600" /> Full Name
                            </label>
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="John Doe"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-300 text-black"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-900 mb-1 flex items-center gap-1">
                              <Flag className="w-4 h-4 text-yellow-600" /> Country
                            </label>
                            <input
                              type="text"
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                              placeholder="France"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-300 text-black"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-900 mb-1 flex items-center gap-1">
                              <Mail className="w-4 h-4 text-yellow-600" /> Email
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="john@example.com"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-300 text-black"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-900 mb-1 flex items-center gap-1">
                              <Phone className="w-4 h-4 text-yellow-600" /> Phone Number
                            </label>
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="+33 6 12 34 56 78"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-300 text-black"
                            />
                          </div>
                        </div>

                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-900 mb-1 flex items-center gap-1">
                            <FileText className="w-4 h-4 text-yellow-600" /> Special Requests (Optional)
                          </label>
                          <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            rows={3}
                            placeholder="Child seat needed • Flight number: AF123..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-300 resize-none text-black"
                          />
                        </div>

                        <div className="flex justify-between pt-4">
                          <button onClick={() => setStep(2)} className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg">
                            ← Back
                          </button>
                          <button
                            onClick={submitBooking}
                            disabled={!isStep3Valid || submitting}
                            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg flex items-center gap-2 disabled:opacity-50"
                          >
                            <CheckCircle className="w-5 h-5" /> {submitting ? "Booking..." : "Complete Booking"}
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Summary Sidebar */}
                <div className="lg:sticky lg:top-20 h-fit">
                  <div className="bg-gray-900 text-white rounded-xl shadow-lg overflow-hidden border border-yellow-600/20">
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-400" /> Booking Summary
                      </h3>
                      <div className="space-y-1 text-xs">
                        {Object.entries(summary).map(
                          ([key, value]) =>
                            value && (
                              <div key={key} className="flex justify-between border-b border-gray-700 py-1">
                                <span className="text-gray-400">{key}</span>
                                <span className="font-medium">{value}</span>
                              </div>
                            )
                        )}
                      </div>
                      {selectedVehicle && (
                        <div className="mt-2 pt-2 border-t border-gray-700">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold">Total Price</span>
                            <span className="text-xl font-bold text-yellow-400">${currentPrice}</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">Includes all taxes & fees • Free cancellation</p>
                        </div>
                      )}
                    </div>
                    <div className="bg-yellow-500 px-4 py-2 text-center">
                      <p className="font-semibold text-black text-xs">Trusted by 50,000+ travelers</p>
                      <p className="text-black/80 text-[10px]">5.0 ★★★★★ on Trustpilot</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Success Message */}
            {bookingSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl mx-auto bg-white/70 backdrop-blur-lg border border-green-400 text-green-900 p-8 rounded-2xl shadow-lg lg:col-span-3"
              >
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-2 justify-center">
                  <CheckCircle className="w-6 h-6" /> Booking Confirmed!
                </h2>
                <p className="mb-6 text-center">Your private transfer has been successfully booked. Here are your booking details:</p>
                <div className="space-y-2 text-sm">
                  {Object.entries(summary).map(
                    ([key, value]) =>
                      value && (
                        <div key={key} className="flex justify-between border-b border-green-200 py-1">
                          <span className="font-semibold">{key}</span>
                          <span>{value}</span>
                        </div>
                      )
                  )}
                </div>
                <p className="mt-6 font-semibold text-center">You will receive a confirmation email shortly.</p>

                <div className="mt-6 text-center">
                  <button onClick={resetBooking} className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg">
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