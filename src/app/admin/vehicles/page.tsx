"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, X, Car, Users, Briefcase, Sparkles, Sliders, ShieldCheck } from "lucide-react";

interface Vehicle {
  id: string;
  name: string;
  type: string;
  passengers: number;
  luggage: number;
  basePrice: number;
  image: string;
  active: boolean;
}

const empty = { name: "", type: "", passengers: 4, luggage: 2, basePrice: 100, image: "/fleet/", active: true };

export default function VehiclesAdmin() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Vehicle | null>(null);
  const [form, setForm] = useState(empty);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/vehicles");
    setVehicles(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm(empty);
    setShowModal(true);
  };

  const openEdit = (v: Vehicle) => {
    setEditing(v);
    setForm({ ...v });
    setShowModal(true);
  };

  const save = async () => {
    if (!form.name.trim() || !form.type.trim()) return alert("Name and type are required");
    if (editing) {
      await fetch(`/api/admin/vehicles/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/admin/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setShowModal(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this vehicle? Any route rates for it will also be removed.")) return;
    await fetch(`/api/admin/vehicles/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="space-y-6">
      {/* Top Deck Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Car className="w-5 h-5 text-indigo-600" /> Fleet Management
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Configure vehicle categories, luggage caps, and global pricing baselines for Step 2.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-950 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-slate-950/10 active:scale-[0.98] self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-amber-400 stroke-[3]" /> Add Fleet Class
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-slate-400 animate-pulse">Syncing fleet matrix...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((v) => (
            <div key={v.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all duration-200">
              {/* Image Frame Container */}
              <div className="relative h-44 w-full bg-slate-50 border-b border-slate-100 flex items-center justify-center overflow-hidden">
                {v.image && !v.image.endsWith("/fleet/") ? (
                  <Image 
                    src={v.image} 
                    alt={v.name} 
                    fill 
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300" 
                    onError={() => {}} 
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-300 group-hover:text-slate-400 transition-colors">
                    <Car className="w-12 h-12 stroke-[1.5]" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">No Image Link</span>
                  </div>
                )}
                
                <span
                  className={`absolute top-4 right-4 inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase ${
                    v.active 
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                      : "bg-slate-100 text-slate-400 border border-slate-200"
                  }`}
                >
                  {v.active ? "Live" : "Offline"}
                </span>
              </div>

              {/* Data Panel */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-slate-900 tracking-tight text-base">{v.name}</h3>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">{v.type}</p>
                    </div>
                  </div>

                  {/* Operational Threshold Badges */}
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-semibold">{v.passengers} Capacity</span>
                    </div>
                    <div className="w-1 h-1 bg-slate-300 rounded-full" />
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Briefcase className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-semibold">{v.luggage} Bags</span>
                    </div>
                  </div>
                </div>

                {/* Subdeck Pricing & Action Clusters */}
                <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Base Tariff</span>
                    <span className="text-xl font-extrabold text-slate-900 tracking-tight flex items-baseline">
                      ${v.basePrice}<span className="text-xs font-medium text-slate-400">/start</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-0.5">
                    <button 
                      onClick={() => openEdit(v)} 
                      className="p-2 text-slate-500 hover:text-indigo-600 rounded-md hover:bg-white transition-all"
                      title="Edit Fleet Specs"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => remove(v.id)} 
                      className="p-2 text-slate-500 hover:text-rose-600 rounded-md hover:bg-white transition-all"
                      title="Purge Vehicle Class"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Immersive Glassmorphic Form Dialog */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden border border-slate-200/60 animate-in zoom-in-95 duration-200 max-h-[95vh] flex flex-col">
            
            {/* Modal Topline Header */}
            <div className="px-6 py-5 bg-slate-950 text-white relative overflow-hidden flex justify-between items-center flex-shrink-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/20 to-transparent rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center gap-2.5 relative z-10">
                <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center text-amber-400">
                  <Sparkles className="w-4 h-4 stroke-[2.5]" />
                </div>
                <h2 className="text-base font-bold tracking-tight">
                  {editing ? "Modify Fleet Class Attributes" : "Register Fleet Vehicle Class"}
                </h2>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors relative z-10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Scroll Context Core */}
            <div className="p-6 space-y-4 bg-white overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Vehicle Model Name
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Mercedes-Benz S-Class"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Fleet Class / Type
                  </label>
                  <input
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    placeholder="e.g. First Class Business Sedan"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" /> Max Passengers
                  </label>
                  <input
                    type="number"
                    value={form.passengers}
                    onChange={(e) => setForm({ ...form, passengers: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-sm font-semibold text-slate-900 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" /> Luggage Limit
                  </label>
                  <input
                    type="number"
                    value={form.luggage}
                    onChange={(e) => setForm({ ...form, luggage: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-sm font-semibold text-slate-900 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Default Fallback Price ($)
                  </label>
                  <input
                    type="number"
                    value={form.basePrice}
                    onChange={(e) => setForm({ ...form, basePrice: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-sm font-semibold text-slate-900 outline-none transition-all"
                  />
                  <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed flex items-start gap-1">
                    <Sliders className="w-3 h-3 text-slate-400 flex-shrink-0 mt-0.5" />
                    Served when route-specific localized billing entries are absent.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Static Asset Asset Path (Image)
                  </label>
                  <input
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="/fleet/s-class.webp"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 font-mono text-xs"
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/50 transition-colors group">
                    <input 
                      type="checkbox" 
                      checked={form.active} 
                      onChange={(e) => setForm({ ...form, active: e.target.checked })} 
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-0 accent-indigo-600"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-800 group-hover:text-slate-900 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Operational Availability
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Allow public consumers to book this fleet class on active corridors.</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Actions Panel Layout Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2 flex-shrink-0">
              <button 
                onClick={() => setShowModal(false)} 
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
              >
                Dismiss
              </button>
              <button 
                onClick={save} 
                className="px-5 py-2 bg-slate-950 hover:bg-slate-800 text-white font-bold rounded-xl text-xs shadow-md transition-all active:scale-[0.97]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}