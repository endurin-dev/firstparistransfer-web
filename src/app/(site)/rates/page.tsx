// app/rates/page.tsx
"use client";

import { useState } from "react";
import { Car, MapPin, Users } from "lucide-react";

const ratesData = [
  { from: "CDG", to: "Paris", "1-3eco": 80, "1-3pax": 90, "4-6eco": 95, "4-6pax": 100, "7-8eco": 110, "7-8pax": 130, "9-10eco": 190, "9-10pax": 220, "10-12eco": 210, "10-12pax": 230, "12-14eco": 210, "12-14pax": 240 },
  { from: "CDG", to: "Disneyland", "1-3eco": 80, "1-3pax": 85, "4-6eco": 90, "4-6pax": 95, "7-8eco": 100, "7-8pax": 115, "9-10eco": 160, "9-10pax": 170, "10-12eco": 190, "10-12pax": 190, "12-14eco": 190, "12-14pax": 200 },
  { from: "CDG", to: "Orly", "1-3eco": 100, "1-3pax": 110, "4-6eco": 115, "4-6pax": 120, "7-8eco": 125, "7-8pax": 140, "9-10eco": 210, "9-10pax": 230, "10-12eco": 230, "10-12pax": 240, "12-14eco": 230, "12-14pax": 250 },
  { from: "CDG", to: "Beauvais", "1-3eco": 170, "1-3pax": 180, "4-6eco": 175, "4-6pax": 180, "7-8eco": 190, "7-8pax": 200, "9-10eco": 330, "9-10pax": 350, "10-12eco": 340, "10-12pax": 370, "12-14eco": 350, "12-14pax": 390 },
  { from: "CDG", to: "Versailles", "1-3eco": 100, "1-3pax": 115, "4-6eco": 120, "4-6pax": 130, "7-8eco": 130, "7-8pax": 140, "9-10eco": 230, "9-10pax": 240, "10-12eco": 260, "10-12pax": 270, "12-14eco": 270, "12-14pax": 290 },
  { from: "CDG", to: "CDG", "1-3eco": 60, "1-3pax": 70, "4-6eco": 75, "4-6pax": 80, "7-8eco": 80, "7-8pax": 90, "9-10eco": 140, "9-10pax": 160, "10-12eco": 150, "10-12pax": 170, "12-14eco": 160, "12-14pax": 180 },
  { from: "CDG", to: "Le Bourget", "1-3eco": 70, "1-3pax": 80, "4-6eco": 85, "4-6pax": 90, "7-8eco": 100, "7-8pax": 120, "9-10eco": 180, "9-10pax": 210, "10-12eco": 190, "10-12pax": 220, "12-14eco": 200, "12-14pax": 230 },
  { from: "ORLY", to: "Paris", "1-3eco": 80, "1-3pax": 90, "4-6eco": 95, "4-6pax": 100, "7-8eco": 100, "7-8pax": 120, "9-10eco": 180, "9-10pax": 200, "10-12eco": 190, "10-12pax": 210, "12-14eco": 200, "12-14pax": 220 },
  { from: "ORLY", to: "CDG", "1-3eco": 100, "1-3pax": 110, "4-6eco": 110, "4-6pax": 120, "7-8eco": 125, "7-8pax": 140, "9-10eco": 210, "9-10pax": 230, "10-12eco": 220, "10-12pax": 240, "12-14eco": 230, "12-14pax": 250 },
  { from: "ORLY", to: "Disneyland", "1-3eco": 85, "1-3pax": 90, "4-6eco": 95, "4-6pax": 100, "7-8eco": 110, "7-8pax": 120, "9-10eco": 190, "9-10pax": 220, "10-12eco": 200, "10-12pax": 230, "12-14eco": 210, "12-14pax": 240 },
  { from: "ORLY", to: "Beauvais", "1-3eco": 180, "1-3pax": 190, "4-6eco": 195, "4-6pax": 200, "7-8eco": 210, "7-8pax": 230, "9-10eco": 300, "9-10pax": 330, "10-12eco": 310, "10-12pax": 340, "12-14eco": 320, "12-14pax": 350 },
  { from: "ORLY", to: "Versailles", "1-3eco": 90, "1-3pax": 100, "4-6eco": 105, "4-6pax": 110, "7-8eco": 115, "7-8pax": 130, "9-10eco": 190, "9-10pax": 220, "10-12eco": 200, "10-12pax": 230, "12-14eco": 210, "12-14pax": 240 },
  { from: "Paris", to: "Paris", "1-3eco": 60, "1-3pax": 70, "4-6eco": 75, "4-6pax": 80, "7-8eco": 80, "7-8pax": 90, "9-10eco": 140, "9-10pax": 160, "10-12eco": 150, "10-12pax": 170, "12-14eco": 160, "12-14pax": 180 },
  { from: "Paris", to: "CDG", "1-3eco": 80, "1-3pax": 90, "4-6eco": 95, "4-6pax": 100, "7-8eco": 110, "7-8pax": 130, "9-10eco": 190, "9-10pax": 220, "10-12eco": 200, "10-12pax": 230, "12-14eco": 210, "12-14pax": 240 },
  { from: "Paris", to: "ORLY", "1-3eco": 80, "1-3pax": 90, "4-6eco": 95, "4-6pax": 100, "7-8eco": 100, "7-8pax": 120, "9-10eco": 180, "9-10pax": 200, "10-12eco": 190, "10-12pax": 210, "12-14eco": 200, "12-14pax": 220 },
  { from: "Paris", to: "Disneyland", "1-3eco": 90, "1-3pax": 100, "4-6eco": 105, "4-6pax": 110, "7-8eco": 120, "7-8pax": 130, "9-10eco": 190, "9-10pax": 220, "10-12eco": 200, "10-12pax": 230, "12-14eco": 210, "12-14pax": 240 },
  { from: "Paris", to: "Versailles", "1-3eco": 90, "1-3pax": 100, "4-6eco": 105, "4-6pax": 110, "7-8eco": 120, "7-8pax": 140, "9-10eco": 200, "9-10pax": 230, "10-12eco": 210, "10-12pax": 240, "12-14eco": 220, "12-14pax": 250 },
  { from: "Paris", to: "Beauvais", "1-3eco": 160, "1-3pax": 170, "4-6eco": 175, "4-6pax": 180, "7-8eco": 190, "7-8pax": 200, "9-10eco": 330, "9-10pax": 350, "10-12eco": 340, "10-12pax": 370, "12-14eco": 350, "12-14pax": 390 },
  { from: "Paris", to: "Le Bourget", "1-3eco": 80, "1-3pax": 90, "4-6eco": 95, "4-6pax": 100, "7-8eco": 110, "7-8pax": 130, "9-10eco": 190, "9-10pax": 220, "10-12eco": 200, "10-12pax": 230, "12-14eco": 210, "12-14pax": 240 },
  { from: "Le Bourget", to: "Paris", "1-3eco": 80, "1-3pax": 90, "4-6eco": 95, "4-6pax": 100, "7-8eco": 110, "7-8pax": 130, "9-10eco": 190, "9-10pax": 220, "10-12eco": 200, "10-12pax": 230, "12-14eco": 210, "12-14pax": 240 },
  { from: "Le Bourget", to: "Beauvais", "1-3eco": 160, "1-3pax": 170, "4-6eco": 175, "4-6pax": 180, "7-8eco": 190, "7-8pax": 200, "9-10eco": 330, "9-10pax": 350, "10-12eco": 340, "10-12pax": 370, "12-14eco": 350, "12-14pax": 390 },
  { from: "Le Bourget", to: "CDG", "1-3eco": 70, "1-3pax": 80, "4-6eco": 85, "4-6pax": 90, "7-8eco": 100, "7-8pax": 120, "9-10eco": 180, "9-10pax": 210, "10-12eco": 190, "10-12pax": 220, "12-14eco": 200, "12-14pax": 230 },
  { from: "Le Bourget", to: "Orly", "1-3eco": 100, "1-3pax": 110, "4-6eco": 115, "4-6pax": 120, "7-8eco": 125, "7-8pax": 140, "9-10eco": 210, "9-10pax": 230, "10-12eco": 220, "10-12pax": 240, "12-14eco": 230, "12-14pax": 250 },
  { from: "Le Bourget", to: "Versailles", "1-3eco": 100, "1-3pax": 115, "4-6eco": 120, "4-6pax": 130, "7-8eco": 130, "7-8pax": 140, "9-10eco": 230, "9-10pax": 240, "10-12eco": 260, "10-12pax": 270, "12-14eco": 270, "12-14pax": 290 },
  { from: "Le Bourget", to: "Disneyland", "1-3eco": 90, "1-3pax": 100, "4-6eco": 105, "4-6pax": 110, "7-8eco": 120, "7-8pax": 130, "9-10eco": 190, "9-10pax": 220, "10-12eco": 200, "10-12pax": 230, "12-14eco": 210, "12-14pax": 240 },
  { from: "Le Bourget", to: "Le Bourget", "1-3eco": 60, "1-3pax": 70, "4-6eco": 75, "4-6pax": 80, "7-8eco": 80, "7-8pax": 90, "9-10eco": 140, "9-10pax": 160, "10-12eco": 150, "10-12pax": 170, "12-14eco": 160, "12-14pax": 180 },
  { from: "Versailles", to: "CDG", "1-3eco": 100, "1-3pax": 115, "4-6eco": 120, "4-6pax": 130, "7-8eco": 130, "7-8pax": 140, "9-10eco": 230, "9-10pax": 240, "10-12eco": 260, "10-12pax": 270, "12-14eco": 270, "12-14pax": 290 },
  { from: "Versailles", to: "Orly", "1-3eco": 90, "1-3pax": 100, "4-6eco": 105, "4-6pax": 110, "7-8eco": 115, "7-8pax": 130, "9-10eco": 190, "9-10pax": 220, "10-12eco": 200, "10-12pax": 230, "12-14eco": 210, "12-14pax": 240 },
  { from: "Versailles", to: "Paris", "1-3eco": 80, "1-3pax": 90, "4-6eco": 95, "4-6pax": 100, "7-8eco": 110, "7-8pax": 130, "9-10eco": 190, "9-10pax": 220, "10-12eco": 200, "10-12pax": 230, "12-14eco": 210, "12-14pax": 240 },
  { from: "Versailles", to: "Le Bourget", "1-3eco": 100, "1-3pax": 115, "4-6eco": 120, "4-6pax": 130, "7-8eco": 130, "7-8pax": 140, "9-10eco": 230, "9-10pax": 240, "10-12eco": 260, "10-12pax": 270, "12-14eco": 270, "12-14pax": 290 },
  { from: "Versailles", to: "Versailles", "1-3eco": 60, "1-3pax": 70, "4-6eco": 75, "4-6pax": 80, "7-8eco": 80, "7-8pax": 90, "9-10eco": 140, "9-10pax": 160, "10-12eco": 150, "10-12pax": 170, "12-14eco": 160, "12-14pax": 180 },
  { from: "Versailles", to: "Disneyland", "1-3eco": 140, "1-3pax": 150, "4-6eco": 155, "4-6pax": 160, "7-8eco": 170, "7-8pax": 180, "9-10eco": 280, "9-10pax": 300, "10-12eco": 300, "10-12pax": 320, "12-14eco": 310, "12-14pax": 340 },
  { from: "Disneyland", to: "CDG", "1-3eco": 80, "1-3pax": 85, "4-6eco": 90, "4-6pax": 95, "7-8eco": 100, "7-8pax": 115, "9-10eco": 160, "9-10pax": 170, "10-12eco": 190, "10-12pax": 190, "12-14eco": 190, "12-14pax": 200 },
  { from: "Disneyland", to: "ORLY", "1-3eco": 85, "1-3pax": 90, "4-6eco": 95, "4-6pax": 100, "7-8eco": 110, "7-8pax": 120, "9-10eco": 190, "9-10pax": 220, "10-12eco": 200, "10-12pax": 230, "12-14eco": 210, "12-14pax": 240 },
  { from: "Disneyland", to: "Versailles", "1-3eco": 140, "1-3pax": 150, "4-6eco": 155, "4-6pax": 160, "7-8eco": 170, "7-8pax": 180, "9-10eco": 280, "9-10pax": 300, "10-12eco": 300, "10-12pax": 320, "12-14eco": 310, "12-14pax": 340 },
  { from: "Disneyland", to: "Disneyland", "1-3eco": 60, "1-3pax": 70, "4-6eco": 75, "4-6pax": 80, "7-8eco": 80, "7-8pax": 90, "9-10eco": 140, "9-10pax": 160, "10-12eco": 150, "10-12pax": 170, "12-14eco": 160, "12-14pax": 180 },
  { from: "Disneyland", to: "Le Bourget", "1-3eco": 90, "1-3pax": 100, "4-6eco": 105, "4-6pax": 110, "7-8eco": 120, "7-8pax": 130, "9-10eco": 190, "9-10pax": 220, "10-12eco": 200, "10-12pax": 230, "12-14eco": 210, "12-14pax": 240 },
  { from: "Disneyland", to: "Beauvais", "1-3eco": 180, "1-3pax": 190, "4-6eco": 195, "4-6pax": 200, "7-8eco": 210, "7-8pax": 220, "9-10eco": 350, "9-10pax": 370, "10-12eco": 360, "10-12pax": 390, "12-14eco": 370, "12-14pax": 410 },
];


export default function RatesPage() {
  const [search, setSearch] = useState('');
  const filteredData = ratesData.filter(row => 
    row.from.toLowerCase().includes(search.toLowerCase()) ||
    row.to.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50 relative overflow-hidden">
        <div className="absolute -top-40 -left-20 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-0 w-80 h-80 bg-yellow-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-white/20 rounded-full blur-[110px]" />

        <div className="fixed inset-x-0 top-0 z-50 h-[env(safe-area-inset-top)] bg-white/50 backdrop-blur-xl" />
        <div className="fixed inset-x-0 bottom-0 z-50 h-[env(safe-area-inset-bottom)] bg-white/50 backdrop-blur-xl" />

        <div className="pt-[max(5rem,env(safe-area-inset-top))] relative z-10">

          <div className="px-6 py-24 text-center backdrop-blur-xl bg-white/70 border-b border-gray-200 shadow-lg rounded-b-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight drop-shadow-sm">
              Paris Private Transfer Rates
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-light mt-4">
              Fixed Prices · 2025 · All Taxes Included
            </p>
            <div className="mt-8 h-1 w-32 bg-yellow-500 mx-auto rounded-full shadow" />
          </div>

          <div className="relative -mt-12 px-4 max-w-7xl mx-auto pb-24">
            <div className="backdrop-blur-3xl bg-white/30 border border-white/30 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] overflow-hidden">

              <div className="bg-white/50 p-8 text-gray-900 border-b border-white/30 backdrop-blur-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 max-w-6xl mx-auto">
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-yellow-500 rounded-2xl shadow">
                      <Car className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold">Official Transfer Rates</h2>
                      <p className="text-gray-500 mt-1 text-lg">One-way private service – Paris & airports</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Users className="w-8 h-8 text-yellow-500" />
                    <span className="text-2xl font-medium text-gray-900">1 – 14 passengers</span>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="mt-6 flex justify-center">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by From or To"
                    className="w-full max-w-md px-4 py-3 rounded-xl border border-gray-300 bg-white/70 backdrop-blur-md text-gray-900 shadow focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>

              <div className="overflow-x-auto p-4">
                <table className="w-full rounded-2xl overflow-hidden backdrop-blur-xl bg-white/30 border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
                  <thead className="bg-white/40 backdrop-blur-xl">
                    <tr>
                      <th className="text-left py-6 px-8 font-semibold text-lg text-gray-900">Route</th>
                      <th colSpan={2} className="text-center py-5 px-4 text-gray-900">1–3 pax</th>
                      <th colSpan={2} className="text-center py-5 px-4 text-gray-900">4–6 pax</th>
                      <th colSpan={2} className="text-center py-5 px-4 text-gray-900">7–8 pax</th>
                      <th colSpan={2} className="text-center py-5 px-4 text-gray-900">9–10 pax</th>
                      <th colSpan={2} className="text-center py-5 px-4 text-gray-900">10–12 pax</th>
                      <th colSpan={2} className="text-center py-5 px-4 text-gray-900">12–14 pax</th>
                    </tr>
                    <tr className="bg-white/30 text-gray-500">                      
                      <th className="py-4 px-8"></th>
                      {[
                        "Economy", "Business",
                        "Economy", "Business",
                        "Economy", "Business",
                        "Van", "Van",
                        "Van", "Van",
                        "Minibus", "Minibus"
                      ].map((label, i) => (
                        <th key={i} className="text-center text-xs font-medium uppercase tracking-wider py-3">
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/20">
                    {filteredData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/20 transition-colors backdrop-blur-xl">
                        <td className="py-6 px-8 font-medium text-gray-900 flex items-center gap-4">
                          <MapPin className="w-5 h-5 text-yellow-500" />
                          <div>
                            <span className="font-bold text-lg">{row.from}</span>
                            <span className="text-gray-400 mx-2">→</span>
                            <span className="font-bold text-lg">{row.to}</span>
                          </div>
                        </td>
                        <td className="text-center font-bold text-gray-900">{row["1-3eco"]}€</td>
                        <td className="text-center font-bold text-gray-900">{row["1-3pax"]}€</td>
                        <td className="text-center font-bold text-gray-900">{row["4-6eco"]}€</td>
                        <td className="text-center font-bold text-gray-900">{row["4-6pax"]}€</td>
                        <td className="text-center font-bold text-gray-900">{row["7-8eco"]}€</td>
                        <td className="text-center font-bold text-gray-900">{row["7-8pax"]}€</td>
                        <td className="text-center font-bold text-gray-900">{row["9-10eco"]}€</td>
                        <td className="text-center font-bold text-gray-900">{row["9-10pax"]}€</td>
                        <td className="text-center font-bold text-gray-900">{row["10-12eco"]}€</td>
                        <td className="text-center font-bold text-gray-900">{row["10-12pax"]}€</td>
                        <td className="text-center font-bold text-gray-900">{row["12-14eco"]}€</td>
                        <td className="text-center font-bold text-gray-900">{row["12-14pax"]}€</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-white/50 text-gray-700 px-8 py-8 text-center border-t border-white/20 backdrop-blur-xl rounded-b-3xl">
                <p className="text-lg font-light">
                  Meet & Greet included · Flight monitoring · Free waiting time · 24/7 service · Free cancellation up to 1h before
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
