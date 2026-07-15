import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  MapPin,
  Car,
  DollarSign,
  ClipboardList,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Wallet,
  Sparkles,
  Calendar,
} from "lucide-react";
import DashboardCharts from "./DashboardCharts";

export default async function AdminDashboard() {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const startOfLastMonth = new Date(startOfMonth);
  startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1);

  const [
    locationCount,
    vehicleCount,
    rateCount,
    bookingCount,
    pendingCount,
    confirmedCount,
    completedCount,
    cancelledCount,
    thisMonthBookings,
    lastMonthBookings,
    revenueAgg,
    recentBookings,
    countryGroups,
    routeGroups,
    vehicleGroups,
  ] = await Promise.all([
    prisma.location.count(),
    prisma.vehicle.count(),
    prisma.rate.count(),
    prisma.booking.count(),
    prisma.booking.count({ where: { status: "pending" } }),
    prisma.booking.count({ where: { status: "confirmed" } }),
    prisma.booking.count({ where: { status: "completed" } }),
    prisma.booking.count({ where: { status: "cancelled" } }),
    prisma.booking.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.booking.count({
      where: { createdAt: { gte: startOfLastMonth, lt: startOfMonth } },
    }),
    prisma.booking.aggregate({
      _sum: { price: true },
      where: { status: { in: ["confirmed", "completed"] } },
    }),
    prisma.booking.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        fromText: true,
        toText: true,
        vehicleName: true,
        price: true,
        status: true,
        date: true,
        time: true,
        createdAt: true,
      },
    }),
    prisma.booking.groupBy({
      by: ["country"],
      _count: { _all: true },
      where: { country: { not: null } },
      orderBy: { _count: { country: "desc" } },
      take: 6,
    }),
    prisma.booking.groupBy({
      by: ["fromText", "toText"],
      _count: { _all: true },
      orderBy: { _count: { fromText: "desc" } },
      take: 6,
    }),
    prisma.booking.groupBy({
      by: ["vehicleName"],
      _count: { _all: true },
      orderBy: { _count: { vehicleName: "desc" } },
      take: 6,
    }),
  ]);

  const totalRevenue = revenueAgg._sum.price ?? 0;
  const momChange =
    lastMonthBookings === 0
      ? thisMonthBookings > 0
        ? 100
        : 0
      : Math.round(
          ((thisMonthBookings - lastMonthBookings) / lastMonthBookings) * 100
        );
  const momPositive = momChange >= 0;

  const cards = [
    { label: "Locations Hub", value: locationCount, href: "/admin/locations", icon: MapPin, color: "from-blue-500 to-indigo-600" },
    { label: "Active Fleet", value: vehicleCount, href: "/admin/vehicles", icon: Car, color: "from-amber-400 to-orange-500" },
    { label: "Mapped Rates", value: rateCount, href: "/admin/rates", icon: DollarSign, color: "from-emerald-400 to-teal-600" },
    { label: "All Bookings", value: bookingCount, href: "/admin/bookings", icon: ClipboardList, color: "from-purple-500 to-pink-600" },
  ];

  const statusBreakdown = [
    { label: "Pending", value: pendingCount, icon: Clock, text: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100", barColor: "bg-amber-400" },
    { label: "Confirmed", value: confirmedCount, icon: CheckCircle2, text: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", barColor: "bg-blue-500" },
    { label: "Completed", value: completedCount, icon: CheckCircle2, text: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", barColor: "bg-emerald-500" },
    { label: "Cancelled", value: cancelledCount, icon: XCircle, text: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100", barColor: "bg-rose-400" },
  ];

  const statusStyles: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    confirmed: "bg-blue-50 text-blue-700 border-blue-200",
    completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cancelled: "bg-rose-50 text-rose-700 border-rose-200",
  };

  const countryData = countryGroups.map((c) => ({
    country: c.country ?? "Unknown",
    count: c._count._all,
  }));
  const routeData = routeGroups.map((r) => ({
    route: `${r.fromText} → ${r.toText}`,
    count: r._count._all,
  }));
  const vehicleData = vehicleGroups.map((v) => ({
    vehicle: v.vehicleName,
    count: v._count._all,
  }));

  const totalStatusCount = pendingCount + confirmedCount + completedCount + cancelledCount || 1;

  const initials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-6 space-y-6 bg-slate-50/50 min-h-screen font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Dynamic Immersive Header Section */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-6 md:p-8 shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-600/30 via-purple-600/10 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 z-10">
          <div>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full w-fit text-xs font-semibold text-amber-300 tracking-wide mb-3 border border-white/5">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Command Center Active
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              System Operations
            </h1>
            <p className="text-slate-400 text-sm mt-1.5 max-w-xl">
              Real-time synchronization and analytical metrics pipeline for your global booking grid.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 shadow-inner">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-semibold tracking-wide uppercase text-slate-200">
                {new Date().toLocaleDateString(undefined, { month: "long", year: "numeric" })}
              </span>
            </div>
          </div>
        </div>

        {/* Inline Smart Notification if Action Needed */}
        {pendingCount > 0 && (
          <div className="relative mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-500/30 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center animate-pulse shadow-lg shadow-amber-500/20">
                <Clock className="w-4 h-4 text-slate-900 stroke-[2.5]" />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-200">Attention Required</p>
                <p className="text-xs text-slate-300 mt-0.5">
                  You have <strong className="text-amber-400 font-semibold">{pendingCount}</strong> booking{pendingCount !== 1 ? "s" : ""} awaiting system clearance.
                </p>
              </div>
            </div>
            <Link href="/admin/bookings" className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 transition-colors rounded-xl text-xs font-bold text-slate-950 shadow-md whitespace-nowrap">
              Review Pipeline <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>

      {/* Asymmetric Core Analytics & Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left/Middle: Core Controls & Master Data */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Master Data Metrics Hub */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {cards.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="group relative bg-white/70 backdrop-blur-md rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${c.color}`} />
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} p-2.5 text-white shadow-md flex items-center justify-center`}>
                    <c.icon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <span className="text-xs font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                    Manage →
                  </span>
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-900 tracking-tight tabular-nums">{c.value}</p>
                  <p className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">{c.label}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Revenue & Volumetric Performance Engine */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative overflow-hidden group">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Total Gross Volume</p>
                  <p className="text-3.5xl font-extrabold text-slate-900 tracking-tight tabular-nums">
                    €{totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-emerald-600 font-medium mt-2 flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Sourced from active operations
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center shadow-lg shadow-slate-900/10">
                  <Wallet className="w-5 h-5 stroke-[2]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Velocity Profile</p>
                  <div className="flex items-baseline gap-2.5">
                    <p className="text-3.5xl font-extrabold text-slate-900 tracking-tight tabular-nums">{thisMonthBookings}</p>
                    <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-lg text-xs font-bold ${momPositive ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"}`}>
                      {momPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {momPositive ? "+" : ""}{momChange}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Compared to <span className="font-semibold text-slate-600">{lastMonthBookings}</span> in target previous window
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Deep Data Charts Integration Component */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-2 overflow-hidden">
            <DashboardCharts countries={countryData} routes={routeData} vehicles={vehicleData} />
          </div>

        </div>

        {/* Right Sidebar: Dynamic Status Allocation & Setups */}
        <div className="space-y-6">
          
          {/* Status Breakdown Terminal */}
          <div className="bg-slate-950 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden border border-slate-800">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.12),transparent_60%)] pointer-events-none" />
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-sm font-bold tracking-wider uppercase text-slate-400">System Distribution</h2>
                <p className="text-xs text-indigo-400 mt-0.5">Real-time status allocation matrix</p>
              </div>
              <span className="text-xs font-bold bg-white/10 px-2.5 py-1 rounded-full text-slate-300 tabular-nums">
                {bookingCount} Flights/Trips
              </span>
            </div>

            {/* Micro Segmented Visualization Line */}
            <div className="flex h-3 rounded-full overflow-hidden bg-slate-800 mb-6 border border-slate-900 shadow-inner">
              {statusBreakdown.map((s) => (
                <div
                  key={s.label}
                  className={`${s.barColor} transition-all duration-500`}
                  style={{ width: `${(s.value / totalStatusCount) * 100}%` }}
                  title={`${s.label}: ${s.value}`}
                />
              ))}
            </div>

            {/* Vertical Flow Grid */}
            <div className="space-y-3">
              {statusBreakdown.map((s) => {
                const percentage = Math.round((s.value / totalStatusCount) * 100);
                return (
                  <div key={s.label} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${s.barColor}`} />
                      <p className="text-sm font-medium text-slate-300">{s.label}</p>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-base font-bold text-white tabular-nums">{s.value}</span>
                      <span className="text-[10px] font-mono text-slate-500 w-8 text-right">{percentage}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Setup Progress Roadmap */}
          <div className="bg-gradient-to-b from-white to-slate-50 rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 tracking-wider uppercase mb-5">Deployment Checklist</h2>
            <div className="relative border-l-2 border-slate-200 ml-3 space-y-6">
              {[
                <>Add your pickup/drop-off <strong className="font-semibold text-indigo-600">Locations</strong> (Airports, Landmarks, Hotels)</>,
                <>Add your structural <strong className="font-semibold text-indigo-600">Vehicles</strong> — capacities, base metrics, fleet assets</>,
                <>Map specific <strong className="font-semibold text-indigo-600">Rates</strong> variables per vehicle for all matched nodes</>,
                <>Live incoming routes auto-populate into the system <strong className="font-semibold text-indigo-600">Bookings Ledger</strong></>,
              ].map((text, i) => (
                <div key={i} className="relative pl-6 group">
                  <div className="absolute -left-[11px] top-0.5 w-5 h-5 rounded-full bg-white border-2 border-slate-300 text-slate-400 text-[10px] font-bold flex items-center justify-center group-hover:border-indigo-500 group-hover:text-indigo-600 transition-colors">
                    {i + 1}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Recent Activity Transaction Grid Terminal */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-5 border-b border-slate-100 gap-4 bg-slate-50/50">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Stream Activity</h2>
            <p className="text-xs text-slate-400 mt-0.5">Microsecond updates over global transactional records</p>
          </div>
          <Link
            href="/admin/bookings"
            className="text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 self-start sm:self-auto shadow-sm"
          >
            Open Ledger Terminal <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        
        {recentBookings.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
              <ClipboardList className="w-6 h-6 text-slate-300" />
            </div>
            <p className="text-sm font-medium text-slate-400">Zero structural operations logged yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-slate-400 text-[11px] font-bold uppercase tracking-wider bg-slate-50/20 border-b border-slate-100">
                  <th className="text-left px-6 py-4">Consumer Entity</th>
                  <th className="text-left px-6 py-4">Routing Node Architecture</th>
                  <th className="text-left px-6 py-4">Class Asset</th>
                  <th className="text-left px-6 py-4">Price Matrix</th>
                  <th className="text-left px-6 py-4">Operational Status</th>
                  <th className="text-right px-6 py-4">Dispatch Execution Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/70">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/60 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-slate-900 text-amber-300 flex items-center justify-center text-xs font-bold shadow-sm tracking-tighter">
                          {initials(b.name)}
                        </div>
                        <span className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{b.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="bg-slate-100 px-2 py-1 rounded-lg text-xs font-medium text-slate-800 max-w-[140px] truncate">{b.fromText}</span>
                        <span className="text-slate-300 font-mono">→</span>
                        <span className="bg-slate-100 px-2 py-1 rounded-lg text-xs font-medium text-slate-800 max-w-[140px] truncate">{b.toText}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium whitespace-nowrap">{b.vehicleName}</td>
                    <td className="px-6 py-4 text-slate-900 font-bold tabular-nums whitespace-nowrap">
                      €{Number(b.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold border capitalize tracking-wide shadow-sm ${
                          statusStyles[b.status] ?? "bg-slate-50 text-slate-700 border-slate-200"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-500 font-medium whitespace-nowrap tabular-nums">
                      {new Date(b.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })} · <span className="text-slate-400 font-normal">{b.time}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}