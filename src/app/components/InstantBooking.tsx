// src/app/components/InstantBooking.tsx
"use client";

import { useState } from "react";
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

export default function InstantBooking() {
  const [activeTab, setActiveTab] = useState<"distance" | "hourly">("distance");
  const [tripType, setTripType] = useState("arrival");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromHourly, setFromHourly] = useState("");
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [infants, setInfants] = useState("0");
  const [hours, setHours] = useState("4");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const basePrices: Record<string, number> = {
    "CDG Airport to Paris City": 85,
    "Paris City to CDG Airport": 85,
    "Orly Airport to Paris City": 75,
    "Paris City to Orly Airport": 75,
    "CDG Airport to Disneyland": 140,
    "Disneyland to CDG Airport": 140,
    "Paris City to Disneyland": 130,
    "Disneyland to Paris City": 130,
    "Beauvais Airport to Paris City": 170,
    "CDG Airport to Versailles": 110,
  };

  const hourlyRate = 95;

  const calculatePrice = () => {
    if (activeTab === "hourly") return hourlyRate * Number(hours);

    const routeKey = `${from} to ${to}`;
    const reverseKey = `${to} to ${from}`;
    let price = basePrices[routeKey] || basePrices[reverseKey] || 0;

    if (tripType === "round") price *= 2;
    if (Number(adults) + Number(children) > 4) price += 50;

    return price || 0;
  };

  const price = calculatePrice();

  const allLocations = [
    "CDG Airport",
    "Orly Airport",
    "Beauvais Airport",
    "Gare du Nord",
    "Gare de Lyon",
    "Gare Montparnasse",
    "Gare de l'Est",
    "Paris City Center",
    "Eiffel Tower",
    "Louvre",
    "Notre-Dame",
    "Champs-Élysées",
    "Montmartre",
    "Le Marais",
    "Latin Quarter",
    "Disneyland Paris",
    "Versailles Palace",
    "Fontainebleau Castle",
    "Hotel (specify name)",
    "Shangri-La",
    "Ritz Paris",
    "Four Seasons George V",
    "Le Meurice",
  ];

  const cardClass =
    "bg-white border border-gray-300 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300";
  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-black font-semibold focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-300 transition";
  const buttonClass =
    "w-full bg-black text-white font-bold py-3.5 rounded-lg border border-gray-700 shadow-md hover:shadow-lg hover:bg-gray-900 transition flex items-center justify-center gap-3";

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-black mb-3">
            Instant Quotation & Booking
          </h2>
          <p className="text-black text-lg font-semibold">
            Book now • Pay on arrival • Free cancellation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* LEFT SIDE */}
          <div className="space-y-10">
            {/* How It Works */}
            <div className={cardClass}>
              <h3 className="text-2xl font-black text-black mb-6">How It Works</h3>
              <div className="space-y-4">
                {[
                  { step: 1, title: "Choose Your Service", desc: "Airport transfer or hourly chauffeur for tours & shopping" },
                  { step: 2, title: "Select Locations", desc: "Any airport, hotel, station or landmark in Paris" },
                  { step: 3, title: "Date, Time & Passengers", desc: "Exact pickup + free child seats on request" },
                  { step: 4, title: "Instant Fixed Price", desc: "All taxes, tolls & 60 min waiting included" },
                  { step: 5, title: "Book & Relax", desc: "No payment now • Cancel free up to 24h before" },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500 text-black flex items-center justify-center text-lg font-black shadow">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-black text-black text-base">{item.title}</h4>
                      <p className="text-black text-sm mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Book With Us */}
            <div className={cardClass}>
              <h3 className="text-xl font-black text-black mb-4">Why Book With Us?</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, text: "Fully Licensed & Insured" },
                  { icon: CreditCard, text: "Pay on the Day" },
                  { icon: Star, text: "5-Star Reviews" },
                  { icon: Clock3, text: "60 min Free Waiting" },
                  { icon: Phone, text: "24/7 WhatsApp Support" },
                  { icon: CheckCircle, text: "Free Child Seats" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-black">
                    <item.icon className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE – FORM */}
          <div className={cardClass}>
            {/* Tabs */}
            <div className="flex justify-center mb-8 gap-2">
              <button
                onClick={() => setActiveTab("distance")}
                className={`px-4 py-2.5 rounded-lg font-bold border border-gray-300 transition ${
                  activeTab === "distance" ? "bg-black text-white border-black" : "bg-gray-100 text-black hover:bg-gray-200"
                }`}
              >
                <MapPin className="w-4 h-4 inline mr-1.5 text-yellow-500" /> Distance Transfer
              </button>
              <button
                onClick={() => setActiveTab("hourly")}
                className={`px-4 py-2.5 rounded-lg font-bold border border-gray-300 transition ${
                  activeTab === "hourly" ? "bg-black text-white border-black" : "bg-gray-100 text-black hover:bg-gray-200"
                }`}
              >
                <Clock className="w-4 h-4 inline mr-1.5 text-yellow-500" /> Hourly Chauffeur
              </button>
            </div>

            {/* Form content */}
            <div className="space-y-4">
              {activeTab === "distance" ? (
                <>
                  <div>
                    <label className="block text-black font-bold mb-2 flex items-center gap-2">
                      <Car className="w-5 h-5 text-yellow-500" /> Trip Type
                    </label>
                    <select value={tripType} onChange={(e) => setTripType(e.target.value)} className={inputClass}>
                      <option value="arrival">One Way – Arrival</option>
                      <option value="departure">One Way – Departure</option>
                      <option value="round">Round Trip</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-black font-bold mb-2 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-yellow-500" /> From
                      </label>
                      <select value={from} onChange={(e) => setFrom(e.target.value)} className={inputClass}>
                        <option value="">From...</option>
                        {allLocations.map((loc) => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-black font-bold mb-2 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-yellow-500" /> To
                      </label>
                      <select value={to} onChange={(e) => setTo(e.target.value)} className={inputClass}>
                        <option value="">To...</option>
                        {allLocations.map((loc) => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-black font-bold mb-2 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-yellow-500" /> Date
                      </label>
                      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-black font-bold mb-2 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-yellow-500" /> Time
                      </label>
                      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={inputClass} />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-black font-bold mb-2 flex items-center gap-2">
                        <User className="w-5 h-5 text-yellow-500" /> Adults
                      </label>
                      <input type="number" min="1" value={adults} onChange={(e) => setAdults(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-black font-bold mb-2 flex items-center gap-2">
                        <Users className="w-5 h-5 text-yellow-500" /> Children
                      </label>
                      <input type="number" min="0" value={children} onChange={(e) => setChildren(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-black font-bold mb-2 flex items-center gap-2">
                        <Baby className="w-5 h-5 text-yellow-500" /> Infants
                      </label>
                      <input type="number" min="0" value={infants} onChange={(e) => setInfants(e.target.value)} className={inputClass} />
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-black font-bold mb-2 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-yellow-500" /> Pickup Location
                  </label>
                  <select value={fromHourly} onChange={(e) => setFromHourly(e.target.value)} className={inputClass}>
                    <option value="">Select pickup...</option>
                    {allLocations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-black font-bold mb-2 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-yellow-500" /> Date
                      </label>
                      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-black font-bold mb-2 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-yellow-500" /> Time
                      </label>
                      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={inputClass} />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-black font-bold mb-2 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-yellow-500" /> Duration
                    </label>
                    <select value={hours} onChange={(e) => setHours(e.target.value)} className={inputClass}>
                      {[4, 6, 8, 10, 12].map((h) => (
                        <option key={h} value={h}>{h} Hours</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Price & CTA */}
              <div className="pt-6 border-t border-gray-300 text-center">
                <div className="text-4xl font-black text-black mb-4">
                  €{price} {activeTab === "hourly" && <span className="text-xl text-black/70 ml-2">/{hours}h</span>}
                </div>

                <button className={buttonClass}>
                  Book Now – Pay Later
                  <ArrowRight className="w-6 h-6 text-yellow-500 ml-2" />
                </button>

                <p className="text-black font-medium mt-2">
                  No card needed • Free cancellation 24h before
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
