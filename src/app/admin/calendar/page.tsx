"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Clock,
  Phone,
  Mail,
  User,
  Car,
  CalendarDays,
  ArrowRight,
  SlidersHorizontal,
  MapPin,
  CircleDot,
} from "lucide-react";

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

const STATUS_THEME: Record<string, { dot: string; text: string; bg: string; border: string }> = {
  pending: { dot: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50/60", border: "border-amber-200" },
  confirmed: { dot: "bg-indigo-500", text: "text-indigo-700", bg: "bg-indigo-50/60", border: "border-indigo-200" },
  completed: { dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50/60", border: "border-emerald-200" },
  cancelled: { dot: "bg-rose-500", text: "text-rose-700", bg: "bg-rose-50/60", border: "border-rose-200" },
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function dateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export default function CalendarPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });
  const [selectedDay, setSelectedDay] = useState<string | null>(() => dateKey(new Date()));
  const [statusFilter, setStatusFilter] = useState("all");

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/bookings");
      if (res.ok) setBookings(await res.json());
    } catch (err) {
      console.error("Failed to load bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      await load();
    } catch (err) {
      console.error(err);
      alert("Error updating status.");
    }
  };

  const filteredBookings = useMemo(
    () =>
      statusFilter === "all"
        ? bookings
        : bookings.filter((b) => b.status === statusFilter),
    [bookings, statusFilter]
  );

  const bookingsByDay = useMemo(() => {
    const map: Record<string, Booking[]> = {};
    for (const b of filteredBookings) {
      const key = dateKey(new Date(b.date));
      if (!map[key]) map[key] = [];
      map[key].push(b);
    }
    for (const key in map) {
      map[key].sort((a, b) => a.time.localeCompare(b.time));
    }
    return map;
  }, [filteredBookings]);

  const monthLabel = cursor.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  const cells = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const firstDay = new Date(year, month, 1);
    const startOffset = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;
    const result: { date: Date; inMonth: boolean }[] = [];

    for (let i = 0; i < totalCells; i++) {
      const dayNum = i - startOffset + 1;
      if (dayNum < 1) {
        result.push({
          date: new Date(year, month - 1, daysInPrevMonth + dayNum),
          inMonth: false,
        });
      } else if (dayNum > daysInMonth) {
        result.push({
          date: new Date(year, month + 1, dayNum - daysInMonth),
          inMonth: false,
        });
      } else {
        result.push({ date: new Date(year, month, dayNum), inMonth: true });
      }
    }
    return result;
  }, [cursor]);

  const today = dateKey(new Date());
  const selectedBookings = selectedDay ? bookingsByDay[selectedDay] ?? [] : [];

  const goToToday = () => {
    const d = new Date();
    setCursor(new Date(d.getFullYear(), d.getMonth(), 1));
    setSelectedDay(dateKey(d));
  };

  const changeMonth = (delta: number) => {
    setCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  };

  return (
    <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 bg-slate-50/50 min-h-screen font-sans antialiased">
      
      {/* Top Banner section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Operations Console</span>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mt-0.5">Fleet Dispatch Calendar</h1>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
            {["all", "pending", "confirmed", "completed", "cancelled"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  statusFilter === s
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Responsive Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Calendar System */}
        <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          
          {/* Calendar Controller Header */}
          <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-semibold min-w-[140px]">{monthLabel}</h2>
              <div className="flex bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                <button
                  onClick={() => changeMonth(-1)}
                  className="w-7 h-7 rounded-md flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => changeMonth(1)}
                  className="w-7 h-7 rounded-md flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              onClick={goToToday}
              className="text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-all border border-slate-700 flex items-center gap-1.5 shadow-inner"
            >
              <CalendarDays className="w-3.5 h-3.5 text-indigo-400" />
              Jump to Today
            </button>
          </div>

          {/* Weekday Strip */}
          <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/70">
            {WEEKDAYS.map((d) => (
              <div key={d} className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest py-3">
                {d}
              </div>
            ))}
          </div>

          {/* Day Grid Output */}
          {loading ? (
            <div className="py-32 text-center text-slate-400 text-sm animate-pulse flex flex-col items-center gap-2">
              <CircleDot className="w-5 h-5 animate-spin text-indigo-500" />
              Synchronizing schedule database...
            </div>
          ) : (
            <div className="grid grid-cols-7 bg-slate-100 gap-[1px]">
              {cells.map(({ date, inMonth }, i) => {
                const key = dateKey(date);
                const dayBookings = bookingsByDay[key] ?? [];
                const isToday = key === today;
                const isSelected = key === selectedDay;
                
                // Extract unique visual dots for statuses active on this day
                const uniqueStatuses = Array.from(new Set(dayBookings.map((b) => b.status)));

                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDay(key)}
                    className={`min-h-[100px] p-2.5 text-left transition-all flex flex-col justify-between group relative overflow-hidden bg-white ${
                      !inMonth ? "text-slate-300 bg-slate-50/50" : "text-slate-700"
                    } ${isSelected ? "ring-2 ring-indigo-600 z-10 shadow-md" : "hover:bg-slate-50/80"}`}
                  >
                    {/* Top Row: Date Label and Metrics */}
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-lg transition-colors ${
                          isToday
                            ? "bg-indigo-600 text-white shadow-sm"
                            : isSelected
                            ? "bg-slate-900 text-white"
                            : "group-hover:bg-slate-100"
                        }`}
                      >
                        {date.getDate()}
                      </span>
                      
                      {dayBookings.length > 0 && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          isSelected ? "bg-indigo-50 text-indigo-700" : "bg-slate-100 text-slate-600"
                        }`}>
                          {dayBookings.length}
                        </span>
                      )}
                    </div>

                    {/* Compact Stack Overview Layout */}
                    <div className="mt-2 space-y-1 w-full min-h-[36px] flex flex-col justify-end">
                      {dayBookings.length > 0 ? (
                        <div className="hidden sm:block space-y-0.5">
                          {dayBookings.slice(0, 2).map((b) => (
                            <div key={b.id} className="text-[10px] truncate px-1 py-0.5 bg-slate-50 rounded border border-slate-100 flex items-center gap-1">
                              <span className={`w-1 h-1 rounded-full ${STATUS_THEME[b.status]?.dot || "bg-slate-400"}`} />
                              <span className="font-medium text-slate-900">{b.time}</span>
                              <span className="text-slate-500 truncate">{b.name}</span>
                            </div>
                          ))}
                          {dayBookings.length > 2 && (
                            <div className="text-[9px] text-indigo-600 font-semibold pl-1">
                              +{dayBookings.length - 2} more shifts
                            </div>
                          )}
                        </div>
                      ) : null}

                      {/* Micro Mobile Dots Indicators */}
                      <div className="flex sm:hidden gap-1 mt-1">
                        {uniqueStatuses.map((status) => (
                          <span key={status} className={`w-1.5 h-1.5 rounded-full ${STATUS_THEME[status]?.dot}`} />
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Side: Elegant Sidebar Detail Dynamic Panel */}
        <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col sticky top-6">
          <div className="px-6 py-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Schedule Details</h3>
              <h2 className="text-base font-semibold text-slate-900 mt-0.5">
                {selectedDay ? new Date(selectedDay).toLocaleDateString(undefined, {
                  weekday: "short", month: "short", day: "numeric"
                }) : "Select a day"}
              </h2>
            </div>
            <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-2.5 py-1 rounded-full border border-indigo-100">
              {selectedBookings.length} Active Run{selectedBookings.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="p-6 overflow-y-auto max-h-[600px] space-y-4 bg-gradient-to-b from-white to-slate-50/30">
            {selectedBookings.length === 0 ? (
              <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <p className="text-sm font-medium">No manifests assigned for this date.</p>
              </div>
            ) : (
              selectedBookings.map((b) => {
                const theme = STATUS_THEME[b.status] || { dot: "bg-slate-400", text: "text-slate-700", bg: "bg-slate-50", border: "border-slate-200" };
                return (
                  <div key={b.id} className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl shadow-xs transition-all p-5 relative overflow-hidden group">
                    {/* Status Top Strip */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                        <Clock className="w-4 h-4 text-indigo-500" />
                        {b.time}
                      </div>

                      {/* Managed Selector status built cleanly */}
                      <select
                        value={b.status}
                        onChange={(e) => updateStatus(b.id, e.target.value)}
                        className={`text-[11px] font-bold rounded-lg px-2.5 py-1 border outline-none cursor-pointer capitalize transition-all ${theme.bg} ${theme.text} ${theme.border} focus:ring-2 focus:ring-slate-900`}
                      >
                        <option value="pending">⚠️ Pending</option>
                        <option value="confirmed">⚡ Confirmed</option>
                        <option value="completed">✅ Completed</option>
                        <option value="cancelled">❌ Cancelled</option>
                      </select>
                    </div>

                    {/* Routing Mapping Layout */}
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-4 text-xs">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                        <div className="space-y-3 w-full">
                          <div>
                            <span className="text-[10px] font-semibold text-slate-400 block uppercase">Pickup Location</span>
                            <span className="font-semibold text-slate-800">{b.fromText}</span>
                          </div>
                          <div className="border-t border-slate-200/60 pt-2">
                            <span className="text-[10px] font-semibold text-slate-400 block uppercase">Dropoff Destination</span>
                            <span className="font-semibold text-slate-800">{b.toText}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Customer Info Directory Grid */}
                    <div className="grid grid-cols-2 gap-x-2 gap-y-3 pt-2 border-t border-slate-100 text-xs text-slate-600">
                      <div className="flex items-center gap-2 truncate">
                        <User className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span className="font-medium truncate text-slate-800" title={b.name}>
                          {b.name} {b.country && `(${b.country})`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 truncate">
                        <Car className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span className="font-medium truncate text-slate-800">{b.vehicleName}</span>
                      </div>
                      <div className="flex items-center gap-2 truncate col-span-2 hover:text-indigo-600 transition-colors">
                        <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <a href={`tel:${b.phone}`} className="truncate font-mono">{b.phone}</a>
                      </div>
                      <div className="flex items-center gap-2 truncate col-span-2 hover:text-indigo-600 transition-colors">
                        <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <a href={`mailto:${b.email}`} className="truncate">{b.email}</a>
                      </div>
                    </div>

                    {/* Context Notes Block */}
                    {b.note && (
                      <div className="mt-4 text-[11px] text-slate-500 bg-amber-50/40 border border-amber-100/70 rounded-lg p-3 italic">
                        "{b.note}"
                      </div>
                    )}

                    {/* Pricing Ledger Anchor */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-dashed border-slate-200">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        {b.tripType}
                      </span>
                      <span className="text-base font-bold text-slate-900 tracking-tight">
                        €{b.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
}