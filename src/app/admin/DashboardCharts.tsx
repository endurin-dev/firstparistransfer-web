"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const ACCENT = "#d4a017"; // muted gold, matches sidebar brand
const TRACK = "#f1f5f9"; // slate-100

type CountryData = { country: string; count: number };
type RouteData = { route: string; count: number };
type VehicleData = { vehicle: string; count: number };

function ChartCard({
  title,
  subtitle,
  children,
  empty,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  empty: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
      </div>
      {empty ? (
        <div className="h-[220px] flex items-center justify-center">
          <p className="text-sm text-slate-300">No data yet</p>
        </div>
      ) : (
        children
      )}
    </div>
  );
}

const tooltipStyle = {
  fontSize: 12,
  borderRadius: 8,
  border: "1px solid #e2e8f0",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
};

export default function DashboardCharts({
  countries,
  routes,
  vehicles,
}: {
  countries: CountryData[];
  routes: RouteData[];
  vehicles: VehicleData[];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
      <ChartCard
        title="Top Countries"
        subtitle="Where your customers are booking from"
        empty={countries.length === 0}
      >
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={countries} layout="vertical" margin={{ left: 0, right: 12 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={TRACK} />
            <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="country" width={78} tick={{ fontSize: 11, fill: "#475569" }} axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: TRACK }} contentStyle={tooltipStyle} />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} fill={ACCENT} maxBarSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        title="Popular Routes"
        subtitle="Most frequently booked transfers"
        empty={routes.length === 0}
      >
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={routes} layout="vertical" margin={{ left: 0, right: 12 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={TRACK} />
            <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="route" width={96} tick={{ fontSize: 10.5, fill: "#475569" }} axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: TRACK }} contentStyle={tooltipStyle} />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} fill="#1e293b" maxBarSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        title="Most Booked Vehicles"
        subtitle="Fleet demand by vehicle type"
        empty={vehicles.length === 0}
      >
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={vehicles} layout="vertical" margin={{ left: 0, right: 12 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={TRACK} />
            <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="vehicle" width={88} tick={{ fontSize: 10.5, fill: "#475569" }} axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: TRACK }} contentStyle={tooltipStyle} />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} fill="#64748b" maxBarSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}