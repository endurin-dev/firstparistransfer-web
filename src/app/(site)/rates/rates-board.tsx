"use client";

import { useMemo, useState } from "react";

type Location = {
  name: string;
  category: string;
};

type RouteEntry = {
  fromLocation: Location;
  toLocation: Location;
  prices: Record<string, number>;
};

type Vehicle = {
  id: string;
  name: string;
  passengers: number;
  luggage: number;
};

type RatesBoardProps = {
  routes: RouteEntry[];
  vehicles: Vehicle[];
  lastUpdated: string | null;
};

const CURRENCY = "USD";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: CURRENCY,
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

function formatPrice(value: number | undefined) {
  if (value === undefined) return "—";
  return currencyFormatter.format(value);
}

function formatUpdated(iso: string | null) {
  if (!iso) return null;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export default function RatesBoard({ routes, vehicles, lastUpdated }: RatesBoardProps) {
  const safeRoutes = Array.isArray(routes) ? routes : [];
  const safeVehicles = Array.isArray(vehicles) ? vehicles : [];

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(() => {
    const set = new Set<string>();
    safeRoutes.forEach((r) => {
      set.add(r.fromLocation.category);
      set.add(r.toLocation.category);
    });
    return Array.from(set).sort();
  }, [safeRoutes]);

  const filteredRoutes = useMemo(() => {
    const q = query.trim().toLowerCase();
    return safeRoutes.filter((r) => {
      const matchesQuery =
        !q ||
        r.fromLocation.name.toLowerCase().includes(q) ||
        r.toLocation.name.toLowerCase().includes(q);
      const matchesCategory =
        category === "all" ||
        r.fromLocation.category === category ||
        r.toLocation.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [safeRoutes, query, category]);

  const updated = formatUpdated(lastUpdated);
  const hasFilters = query.trim() !== "" || category !== "all";

  function clearFilters() {
    setQuery("");
    setCategory("all");
  }

  return (
    <section className="font-[family-name:var(--font-body)] min-h-screen bg-[#FAFAF8] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-10 flex flex-col gap-3 border-b border-[#E7E3DC] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8B8577]">
              Fixed fares
            </p>
            <h1 className="font-[family-name:var(--font-display)] mt-1 text-4xl font-semibold uppercase tracking-wide text-[#1D1B18] sm:text-5xl">
              Transfer Rates
            </h1>
          </div>
          {updated && (
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[#8B8577]">
              Board updated {updated}
            </p>
          )}
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a location…"
            aria-label="Search a location"
            className="w-full rounded-sm border border-[#DEDACF] bg-white px-3 py-2 text-sm text-[#1D1B18] placeholder:text-[#B3AC9C] focus:border-[#1D1B18] focus:outline-none focus:ring-1 focus:ring-[#1D1B18] sm:max-w-xs"
          />
          {categories.length > 1 && (
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Filter by category"
              className="w-full rounded-sm border border-[#DEDACF] bg-white px-3 py-2 text-sm text-[#1D1B18] focus:border-[#1D1B18] focus:outline-none focus:ring-1 focus:ring-[#1D1B18] sm:w-56"
            >
              <option value="all">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}
          <p className="text-xs text-[#8B8577] sm:ml-auto">
            {filteredRoutes.length} route{filteredRoutes.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="overflow-hidden rounded-sm bg-[#14161B]">
          {safeRoutes.length === 0 ? (
            <p className="px-4 py-16 text-center text-sm text-[#6B6E78]">
              Rates haven&apos;t been published yet — check back soon.
            </p>
          ) : filteredRoutes.length === 0 ? (
            <div className="px-4 py-16 text-center">
              <p className="text-sm text-[#6B6E78]">
                {query.trim() ? (
                  <>No routes match &quot;{query}&quot;.</>
                ) : (
                  "No routes match this filter."
                )}
              </p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#F2B441] hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <>
              <table className="hidden w-full border-collapse md:table">
                <caption className="sr-only">Transfer rates by route and vehicle type</caption>
                <thead>
                  <tr className="border-b border-[#2A2D34]">
                    <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-widest text-[#6B6E78]">
                      Route
                    </th>
                    {safeVehicles.map((v) => (
                      <th key={v.id} className="px-5 py-4 text-right">
                        <span className="font-[family-name:var(--font-display)] block text-xs uppercase tracking-wide text-[#D9D5CA]">
                          {v.name}
                        </span>
                        <span className="mt-0.5 block text-[10px] font-normal text-[#6B6E78]">
                          {v.passengers} pax · {v.luggage} bags
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRoutes.map((route, i) => {
                    const values = safeVehicles
                      .map((v) => route.prices[v.id])
                      .filter((v): v is number => typeof v === "number");
                    const lowest = values.length ? Math.min(...values) : undefined;

                    return (
                      <tr
                        key={`${route.fromLocation.name}-${route.toLocation.name}-${i}`}
                        className="border-b border-[#2A2D34] last:border-0"
                      >
                        <td className="px-5 py-4 text-sm text-[#D9D5CA]">
                          {route.fromLocation.name}
                          <span className="mx-2 text-[#4A4D55]">→</span>
                          {route.toLocation.name}
                        </td>
                        {safeVehicles.map((v) => {
                          const price = route.prices[v.id];
                          const isLowest = values.length > 1 && price !== undefined && price === lowest;
                          return (
                            <td
                              key={v.id}
                              className={`font-[family-name:var(--font-mono)] px-5 py-4 text-right text-sm tabular-nums ${
                                isLowest ? "font-semibold text-[#F2B441]" : "text-[#B08A4E]"
                              }`}
                            >
                              {formatPrice(price)}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="divide-y divide-[#2A2D34] md:hidden">
                {filteredRoutes.map((route, i) => {
                  const values = safeVehicles
                    .map((v) => route.prices[v.id])
                    .filter((v): v is number => typeof v === "number");
                  const lowest = values.length ? Math.min(...values) : undefined;

                  return (
                    <div key={`${route.fromLocation.name}-${route.toLocation.name}-${i}`} className="px-4 py-4">
                      <p className="text-sm text-[#D9D5CA]">
                        {route.fromLocation.name}
                        <span className="mx-2 text-[#4A4D55]">→</span>
                        {route.toLocation.name}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5">
                        {safeVehicles.map((v) => {
                          const price = route.prices[v.id];
                          const isLowest = values.length > 1 && price !== undefined && price === lowest;
                          return (
                            <div key={v.id} className="flex items-baseline gap-1.5">
                              <span className="text-[10px] uppercase tracking-wide text-[#6B6E78]">
                                {v.name}
                              </span>
                              <span
                                className={`font-[family-name:var(--font-mono)] text-sm tabular-nums ${
                                  isLowest ? "font-semibold text-[#F2B441]" : "text-[#B08A4E]"
                                }`}
                              >
                                {formatPrice(price)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}