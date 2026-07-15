"use client";

import { useEffect, useState } from "react";
import { Save, Trash2, DollarSign, ArrowRight, Layers, HelpCircle, Route, Car, Sparkles } from "lucide-react";

interface Location {
  id: string;
  name: string;
  category: string;
}
interface Vehicle {
  id: string;
  name: string;
  basePrice: number;
}
interface RateRow {
  id: string;
  fromLocationId: string;
  toLocationId: string;
  vehicleId: string;
  price: number;
  fromLocation: Location;
  toLocation: Location;
  vehicle: Vehicle;
}

export default function RatesAdmin() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [allRates, setAllRates] = useState<RateRow[]>([]);

  const [fromId, setFromId] = useState("");
  const [toId, setToId] = useState("");
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState(false);

  const loadAll = async () => {
    const [locRes, vehRes, rateRes] = await Promise.all([
      fetch("/api/admin/locations").then((r) => r.json()),
      fetch("/api/admin/vehicles").then((r) => r.json()),
      fetch("/api/admin/rates").then((r) => r.json()),
    ]);
    setLocations(locRes);
    setVehicles(vehRes);
    setAllRates(rateRes);
  };

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    if (!fromId || !toId || vehicles.length === 0) return;
    const next: Record<string, number> = {};
    for (const v of vehicles) {
      const existing = allRates.find(
        (r) => r.fromLocationId === fromId && r.toLocationId === toId && r.vehicleId === v.id
      );
      next[v.id] = existing ? existing.price : v.basePrice;
    }
    setPrices(next);
  }, [fromId, toId, vehicles, allRates]);

  const saveRoute = async () => {
    if (!fromId || !toId) return alert("Select both From and To locations");
    if (fromId === toId) return alert("From and To must be different locations");
    setSaving(true);
    const payload = {
      fromLocationId: fromId,
      toLocationId: toId,
      prices: vehicles.map((v) => ({ vehicleId: v.id, price: prices[v.id] ?? v.basePrice })),
    };
    await fetch("/api/admin/rates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    loadAll();
  };

  const removeRate = async (id: string) => {
    if (!confirm("Remove this route rate? It will fall back to the vehicle's base price.")) return;
    await fetch(`/api/admin/rates/${id}`, { method: "DELETE" });
    loadAll();
  };

  const routeMap = new Map<string, RateRow[]>();
  for (const r of allRates) {
    const key = `${r.fromLocationId}__${r.toLocationId}`;
    if (!routeMap.has(key)) routeMap.set(key, []);
    routeMap.get(key)!.push(r);
  }

  return (
    <div className="space-y-6">
      {/* Dynamic Header Block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-indigo-600" /> Tariff Matrix
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Intercept baseline fleet tariffs with premium route-specific override configurations.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 bg-indigo-50/60 border border-indigo-100 rounded-xl px-4 py-2.5 self-start sm:self-auto">
          <HelpCircle className="w-3.5 h-3.5 flex-shrink-0" /> Empty links fall back to standard fleet base price
        </div>
      </div>

      {/* Grid Configuration Deck */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        
        {/* Left Interactive Configurator Panel */}
        <div className="xl:col-span-1 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col sticky top-6">
          <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
              <Route className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h2 className="font-bold text-slate-800 tracking-tight">Set Corridor Override</h2>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Origin / Pickup Node
              </label>
              <select
                value={fromId}
                onChange={(e) => setFromId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-sm font-semibold text-slate-800 outline-none transition-all cursor-pointer"
              >
                <option value="" className="text-slate-400">Select pickup origin...</option>
                {locations.map((l) => (
                  <option key={l.id} value={l.id}>{l.name} [{l.category}]</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Destination Node
              </label>
              <select
                value={toId}
                onChange={(e) => setToId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-sm font-semibold text-slate-800 outline-none transition-all cursor-pointer"
              >
                <option value="" className="text-slate-400">Select drop-off target...</option>
                {locations.map((l) => (
                  <option key={l.id} value={l.id}>{l.name} [{l.category}]</option>
                ))}
              </select>
            </div>

            {/* Fleet Class Differential Fields */}
            {fromId && toId ? (
              <div className="pt-4 border-t border-slate-100 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Fleet Category Differentials
                </label>
                
                <div className="space-y-2 bg-slate-50/50 border border-slate-100 p-3 rounded-2xl">
                  {vehicles.map((v) => (
                    <div key={v.id} className="flex items-center justify-between gap-3 bg-white border border-slate-200/60 p-2.5 rounded-xl shadow-2xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <Car className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span className="text-xs font-bold text-slate-700 truncate">{v.name}</span>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <span className="text-xs font-bold text-slate-400 font-mono">$</span>
                        <input
                          type="number"
                          value={prices[v.id] ?? v.basePrice}
                          onChange={(e) => setPrices({ ...prices, [v.id]: Number(e.target.value) })}
                          className="w-20 px-2 py-1 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg text-xs font-bold text-slate-900 outline-none text-right font-mono"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={saveRoute}
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-md disabled:opacity-40 active:scale-[0.98] pt-3"
                >
                  <Save className="w-3.5 h-3.5 text-amber-400" /> 
                  {saving ? "Updating Core Matrix..." : "Commit Route Pricing"}
                </button>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-center text-xs text-slate-400 font-medium">
                Select both coordinate nodes above to mount the pricing engine variables canvas.
              </div>
            )}
          </div>
        </div>

        {/* Right Tabular Catalog Overrides Summary */}
        <div className="xl:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
                <Layers className="w-4 h-4 stroke-[2.5]" />
              </div>
              <h2 className="font-bold text-slate-800 tracking-tight">Active Overrides Catalog</h2>
            </div>
            <span className="text-xs font-bold font-mono px-2.5 py-1 bg-white border border-slate-200/80 rounded-lg text-slate-600 tabular-nums">
              {routeMap.size} unique paths
            </span>
          </div>

          {routeMap.size === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center h-full">
              <Sparkles className="w-8 h-8 text-slate-300 mb-2 stroke-[1.5]" />
              <p className="text-sm font-semibold text-slate-800">Clean Operational Canvas</p>
              <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed">
                No custom routes set. Checkout system routing is operating flawlessly on standard vehicle fallback bases.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-400 text-[11px] font-bold uppercase tracking-wider bg-slate-50/30 border-b border-slate-100">
                    <th className="px-6 py-3.5 font-bold">Configured Segment Corridor</th>
                    <th className="px-6 py-3.5 font-bold">Active Class Tariffs Override Matrix</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {Array.from(routeMap.entries()).map(([key, rows]) => (
                    <tr key={key} className="hover:bg-slate-50/30 transition-colors align-top group">
                      {/* Segment Description Meta Block */}
                      <td className="px-6 py-4 min-w-[260px]">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            <span className="truncate">{rows[0].fromLocation.name}</span>
                            <ArrowRight className="w-3 h-3 text-slate-300 flex-shrink-0 stroke-[2.5]" />
                            <span className="truncate">{rows[0].toLocation.name}</span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-[10px] font-bold font-mono px-2 py-0.5 bg-slate-100 text-slate-500 rounded border border-slate-200/50">
                              {rows[0].fromLocation.category}
                            </span>
                            <span className="text-[10px] text-slate-300">➔</span>
                            <span className="text-[10px] font-bold font-mono px-2 py-0.5 bg-slate-100 text-slate-500 rounded border border-slate-200/50">
                              {rows[0].toLocation.category}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Pill Clustered Rates Block */}
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5 max-w-xl">
                          {rows.map((r) => (
                            <span 
                              key={r.id} 
                              className="inline-flex items-center gap-2 pl-2.5 pr-1.5 py-1 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium group/pill transition-colors shadow-2xs"
                            >
                              <span className="text-slate-400 font-semibold">{r.vehicle.name}</span>
                              <strong className="text-slate-900 font-mono bg-white px-1.5 py-0.5 rounded-md border border-slate-100 shadow-3xs">${r.price}</strong>
                              <button 
                                onClick={() => removeRate(r.id)} 
                                className="p-1 text-slate-400 hover:text-rose-600 rounded-md hover:bg-white transition-all border border-transparent hover:border-slate-200"
                                title="Purge Override Variable"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}