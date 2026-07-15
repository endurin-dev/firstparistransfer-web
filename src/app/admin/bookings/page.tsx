"use client";

import { useEffect, useMemo, useState } from "react";
import { Trash2, Eye, X, Briefcase, Calendar, Clock, MapPin, Mail, Phone, Globe, MessageSquare, ArrowRight, Shield, Layers } from "lucide-react";

interface Booking {
  id: string;
  tripType: string;
  fromText: string;
  toText: string;
  date: string;
  time: string;
  vehicleName: string;
  price: number;
  name: string;
  country?: string;
  phone: string;
  email: string;
  note?: string;
  status: string;
  createdAt: string;
}

const STATUS_CONFIG: Record<string, { bg: string; dot: string; text: string }> = {
  pending: { bg: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500", text: "Pending" },
  confirmed: { bg: "bg-blue-50 text-blue-700 border-blue-200", dot: "bg-blue-500", text: "Confirmed" },
  completed: { bg: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500", text: "Completed" },
  cancelled: { bg: "bg-rose-50 text-rose-700 border-rose-200", dot: "bg-rose-500", text: "Cancelled" },
};

export default function BookingsAdmin() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [viewing, setViewing] = useState<Booking | null>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/bookings");
    setBookings(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this booking permanently?")) return;
    await fetch(`/api/admin/bookings/${id}`, { method: "DELETE" });
    load();
  };

  const filtered = useMemo(
    () => (filter === "all" ? bookings : bookings.filter((b) => b.status === filter)),
    [bookings, filter]
  );

  return (
    <div className="space-y-6">
      {/* Top Deck Banner Context */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-600" /> Ground Manifest
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Audit, track, and modify statuses for transport orders placed globally.
          </p>
        </div>
        
        {/* Modern Segmented Filters Deck */}
        <div className="flex flex-wrap gap-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200/50 self-start xl:self-auto">
          {["all", "pending", "confirmed", "completed", "cancelled"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all duration-150 ${
                filter === s 
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200/30" 
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-slate-400 animate-pulse">Syncing logistics table...</p>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-xl mx-auto shadow-sm">
          <Layers className="w-8 h-8 text-slate-300 mx-auto mb-2 stroke-[1.5]" />
          <h3 className="text-sm font-bold text-slate-800">No Manifest Records</h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            There are no booking entries that match the selected state criteria inside your live system context.
          </p>
        </div>
      ) : (
        /* Immersive Tabular Terminal Grid */
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="text-slate-400 text-[11px] font-bold uppercase tracking-wider bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 font-bold">Passenger Identity</th>
                  <th className="px-6 py-4 font-bold">Corridor Path Segment</th>
                  <th className="px-6 py-4 font-bold">Schedule</th>
                  <th className="px-6 py-4 font-bold">Asset Class</th>
                  <th className="px-6 py-4 font-bold">Gross Price</th>
                  <th className="px-6 py-4 font-bold">Status Action</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/30 transition-colors group align-middle">
                    <td className="px-6 py-4 max-w-[220px]">
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 truncate">{b.name}</p>
                        <p className="text-xs text-slate-400 font-medium truncate mt-0.5">{b.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                          <span className="truncate">{b.fromText}</span>
                          <ArrowRight className="w-3 h-3 text-slate-300 flex-shrink-0 stroke-[2.5]" />
                          <span className="truncate">{b.toText}</span>
                        </div>
                        <span className="text-[10px] font-bold tracking-wide uppercase text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded w-max mt-1 font-mono">
                          {b.tripType}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col text-xs font-semibold text-slate-700 gap-1">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {new Date(b.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
                        <span className="flex items-center gap-1.5 text-slate-400"><Clock className="w-3.5 h-3.5 text-slate-300" /> {b.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-600">
                      {b.vehicleName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-base font-extrabold text-slate-900 font-mono tracking-tight">${b.price}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative inline-block">
                        <span className={`absolute left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full pointer-events-none z-10 ${STATUS_CONFIG[b.status]?.dot || "bg-slate-400"}`} />
                        <select
                          value={b.status}
                          onChange={(e) => updateStatus(b.id, e.target.value)}
                          className={`pl-6 pr-8 py-1 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold text-slate-800 outline-none transition-all cursor-pointer appearance-none shadow-2xs`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => setViewing(b)} 
                          className="p-2 text-slate-400 hover:text-indigo-600 bg-slate-50 border border-slate-200 hover:border-indigo-100 rounded-xl transition-all"
                          title="Inspect Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => remove(b.id)} 
                          className="p-2 text-slate-400 hover:text-rose-600 bg-slate-50 border border-slate-200 hover:border-rose-100 rounded-xl transition-all"
                          title="Purge Document"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Immersive Slide-over Detail Blueprint Dialog */}
      {viewing && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200/60 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            
            {/* Modal Top Banner Title */}
            <div className="px-6 py-5 bg-slate-950 text-white relative overflow-hidden flex justify-between items-center flex-shrink-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/20 to-transparent rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center gap-2.5 relative z-10">
                <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center text-indigo-400">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold tracking-tight">Manifest Record Detail</h2>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {viewing.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setViewing(null)}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors relative z-10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Structured Card Grid Content Scroll Workspace */}
            <div className="p-6 overflow-y-auto space-y-5 bg-white flex-1">
              {/* Status & Price Highlight Badge Block */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Settlement Value</span>
                  <span className="text-xl font-extrabold font-mono text-slate-900 mt-0.5">${viewing.price}</span>
                </div>
                <div className="flex flex-col justify-center items-end">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border ${STATUS_CONFIG[viewing.status]?.bg || "bg-slate-100 text-slate-600"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${STATUS_CONFIG[viewing.status]?.dot || "bg-slate-400"}`} />
                    {STATUS_CONFIG[viewing.status]?.text || viewing.status}
                  </span>
                </div>
              </div>

              {/* Transit Profile Parameters */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Transfer Route Parameters
                </h4>
                <div className="border border-slate-100 rounded-2xl p-4 bg-white shadow-2xs space-y-3 text-xs font-semibold text-slate-800">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold font-mono text-slate-400 flex-shrink-0 mt-0.5">A</div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Pickup Point</p>
                      <p className="mt-0.5 text-slate-800 leading-relaxed">{viewing.fromText}</p>
                    </div>
                  </div>
                  <div className="h-4 border-l-2 border-dashed border-slate-200 ml-2.5" />
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-slate-950 flex items-center justify-center text-[10px] font-bold font-mono text-white flex-shrink-0 mt-0.5">B</div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Drop-off Target</p>
                      <p className="mt-0.5 text-slate-800 leading-relaxed">{viewing.toText}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking & Logistics Metas */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"><Calendar className="w-3 h-3" /> Date</span>
                  <p className="text-xs font-bold text-slate-800">{new Date(viewing.date).toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"><Clock className="w-3 h-3" /> Pickup Time</span>
                  <p className="text-xs font-bold text-slate-800">{viewing.time}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Trip Modality</span>
                  <p className="text-xs font-bold text-slate-800 capitalize">{viewing.tripType} Booking</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Assigned Vehicle</span>
                  <p className="text-xs font-bold text-slate-800">{viewing.vehicleName}</p>
                </div>
              </div>

              {/* Rider Identity Context Profile */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  Client Identity Contact Matrix
                </h4>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-2.5 text-xs font-medium text-slate-700">
                  <div className="flex justify-between items-center py-1 border-b border-slate-200/40">
                    <span className="text-slate-400 font-semibold">Legal Full Name</span>
                    <span className="font-bold text-slate-900">{viewing.name}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-200/40">
                    <span className="text-slate-400 font-semibold flex items-center gap-1"><Mail className="w-3 h-3" /> Email Address</span>
                    <a href={`mailto:${viewing.email}`} className="font-semibold text-indigo-600 hover:underline">{viewing.email}</a>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-200/40">
                    <span className="text-slate-400 font-semibold flex items-center gap-1"><Phone className="w-3 h-3" /> Mobile Line</span>
                    <a href={`tel:${viewing.phone}`} className="font-bold text-slate-900 font-mono hover:text-indigo-600 transition-colors">{viewing.phone}</a>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400 font-semibold flex items-center gap-1"><Globe className="w-3 h-3" /> Region Origin</span>
                    <span className="font-bold text-slate-800">{viewing.country || "Not Reported"}</span>
                  </div>
                </div>
              </div>

              {/* Operator Dispatch Comm Note */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"><MessageSquare className="w-3 h-3" /> Dispatcher / Client Direct Note</span>
                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 text-xs font-medium text-slate-600 leading-relaxed italic">
                  {viewing.note || "No client remarks appended to this manifest ledger."}
                </div>
              </div>
            </div>

            {/* Modal Layout Action Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end flex-shrink-0">
              <button 
                onClick={() => setViewing(null)} 
                className="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-bold rounded-xl text-xs shadow-md transition-all active:scale-[0.97]"
              >
                Dismiss Ledger
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}