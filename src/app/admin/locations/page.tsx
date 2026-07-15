"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, MapPin, Sparkles, AlertCircle, Layers, Plane, Landmark, Hotel, Settings } from "lucide-react";

interface Location {
  id: string;
  name: string;
  category: string;
  active: boolean;
}

const CATEGORIES = ["Airports", "Landmarks", "Hotels", "Custom"];

// Category Styling Maps
const CATEGORY_THEMES: Record<string, { bg: string; border: string; iconBg: string; text: string; icon: any }> = {
  Airports: {
    bg: "bg-sky-50/70",
    border: "border-sky-100",
    iconBg: "bg-sky-500",
    text: "text-sky-950",
    icon: Plane
  },
  Landmarks: {
    bg: "bg-amber-50/70",
    border: "border-amber-100",
    iconBg: "bg-amber-500",
    text: "text-amber-950",
    icon: Landmark
  },
  Hotels: {
    bg: "bg-emerald-50/70",
    border: "border-emerald-100",
    iconBg: "bg-emerald-500",
    text: "text-emerald-950",
    icon: Hotel
  },
  Custom: {
    bg: "bg-purple-50/70",
    border: "border-purple-100",
    iconBg: "bg-purple-500",
    text: "text-purple-950",
    icon: Settings
  }
};

export default function LocationsAdmin() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Location | null>(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [active, setActive] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/locations");
    const data = await res.json();
    setLocations(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setName("");
    setCategory(CATEGORIES[0]);
    setActive(true);
    setShowModal(true);
  };

  const openEdit = (loc: Location) => {
    setEditing(loc);
    setName(loc.name);
    setCategory(loc.category);
    setActive(loc.active);
    setShowModal(true);
  };

  const save = async () => {
    if (!name.trim()) return alert("Name is required");
    const payload = { name, category, active };
    if (editing) {
      await fetch(`/api/admin/locations/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/admin/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    setShowModal(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this location? Any rates using it will also be removed.")) return;
    await fetch(`/api/admin/locations/${id}`, { method: "DELETE" });
    load();
  };

  const grouped = CATEGORIES.map((cat) => ({
    cat,
    items: locations.filter((l) => l.category === cat),
  }));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" /> System Locations
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Manage your master pickup and drop-off nodes mapped on the public checkout router.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-950 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-slate-950/10 active:scale-[0.98] self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-amber-400 stroke-[3]" /> Add Location Node
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-slate-400 animate-pulse">Syncing location catalog...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {grouped.map((g) => {
            const theme = CATEGORY_THEMES[g.cat] || CATEGORY_THEMES.Custom;
            const CategoryIcon = theme.icon;

            return (
              <div 
                key={g.cat} 
                className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col transition-all duration-200 hover:shadow-md"
              >
                {/* Dynamically Colored Category Subheader */}
                <div className={`px-6 py-4 ${theme.bg} border-b ${theme.border} flex items-center justify-between`}>
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg ${theme.iconBg} flex items-center justify-center text-white shadow-sm`}>
                      <CategoryIcon className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <h2 className={`font-bold tracking-tight ${theme.text}`}>{g.cat}</h2>
                  </div>
                  <span className="text-xs font-bold font-mono px-2.5 py-1 bg-white/80 backdrop-blur-sm rounded-lg text-slate-600 border border-slate-200/40 tabular-nums">
                    {g.items.length} mapped
                  </span>
                </div>

                {/* Items Panel */}
                <div className="divide-y divide-slate-100 flex-1 bg-white">
                  {g.items.length === 0 ? (
                    <div className="px-6 py-10 text-center flex flex-col items-center justify-center h-full">
                      <AlertCircle className="w-5 h-5 text-slate-300 mb-1" />
                      <p className="text-xs font-medium text-slate-400">No active operational endpoints.</p>
                    </div>
                  ) : (
                    g.items.map((loc) => (
                      <div 
                        key={loc.id} 
                        className="px-6 py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/40 transition-colors group"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                            {loc.name}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-4 flex-shrink-0">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase ${
                              loc.active 
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                                : "bg-slate-100 text-slate-400 border border-slate-200"
                            }`}
                          >
                            {loc.active ? "Live" : "Offline"}
                          </span>

                          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => openEdit(loc)} 
                              className="p-1.5 text-slate-500 hover:text-indigo-600 rounded-md hover:bg-white transition-all"
                              title="Modify attributes"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => remove(loc.id)} 
                              className="p-1.5 text-slate-500 hover:text-rose-600 rounded-md hover:bg-white transition-all"
                              title="Purge node"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modernized Glassmorphic Dialog Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200/60 animate-in zoom-in-95 duration-200">
            {/* Modal Topline */}
            <div className="px-6 py-5 bg-slate-950 text-white relative overflow-hidden flex justify-between items-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/20 to-transparent rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center gap-2.5 relative z-10">
                <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center text-amber-400">
                  <Sparkles className="w-4 h-4 stroke-[2.5]" />
                </div>
                <h2 className="text-base font-bold tracking-tight">
                  {editing ? "Modify Grid Endpoint" : "Register Location Node"}
                </h2>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors relative z-10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Canvas */}
            <div className="p-6 space-y-4 bg-white">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Location Endpoint Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Paris Charles de Gaulle (CDG)"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Category Type
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-sm font-semibold text-slate-800 outline-none transition-all cursor-pointer"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/50 transition-colors group">
                  <input 
                    type="checkbox" 
                    checked={active} 
                    onChange={(e) => setActive(e.target.checked)} 
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-0 accent-indigo-600"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-800 group-hover:text-slate-900">Active Operational Node</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Toggle visibility on the public booking engine matrix.</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
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