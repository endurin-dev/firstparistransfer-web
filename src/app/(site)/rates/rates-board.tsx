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

// International transfer bookings are usually quoted in USD.
// Switch to "LKR" here if you're pricing in rupees.
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
    <section className="font-[family-name:var(--font-body)] min-h-screen bg-[#EFEBE1] px-4 py-14 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8A7A4E]">
              Paris chauffeur transfers
            </p>
            <h1 className="font-[family-name:var(--font-display)] mt-2 text-4xl font-semibold uppercase tracking-wide text-[#161A2C] sm:text-5xl">
              Fare Board
            </h1>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-[#5B5748]">
              Fixed door-to-door pricing by route and vehicle. No meter, no surge.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start rounded-full border border-[#D8CFAF] bg-white/60 px-3.5 py-1.5 sm:self-auto">
            <span className="board-pulse-dot relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C9A24B] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C9A24B]" />
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-widest text-[#5B5748]">
              {updated ? <>Refreshed {updated}</> : "Awaiting first refresh"}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-[#D8CFAF] bg-white/70 p-4 sm:flex-row sm:items-center sm:p-3">
          <div className="relative w-full sm:max-w-xs">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9C9376]"
            >
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
              <path d="M13.5 13.5L17.5 17.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a location…"
              aria-label="Search a location"
              className="w-full rounded-full border border-[#D8CFAF] bg-white py-2 pl-9 pr-3 text-sm text-[#161A2C] placeholder:text-[#9C9376] focus:border-[#161A2C] focus:outline-none focus:ring-1 focus:ring-[#161A2C]"
            />
          </div>

          {categories.length > 1 && (
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by area">
              <button
                type="button"
                onClick={() => setCategory("all")}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  category === "all"
                    ? "bg-[#161A2C] text-[#F1E9CE]"
                    : "bg-transparent text-[#5B5748] hover:bg-[#E7E0C8]"
                }`}
              >
                All areas
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                    category === c
                      ? "bg-[#161A2C] text-[#F1E9CE]"
                      : "bg-transparent text-[#5B5748] hover:bg-[#E7E0C8]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          <p className="font-[family-name:var(--font-mono)] text-xs text-[#8A7A4E] sm:ml-auto">
            {filteredRoutes.length} route{filteredRoutes.length === 1 ? "" : "s"}
          </p>
        </div>

        {/* Board */}
        <div className="board-panel overflow-hidden rounded-2xl bg-[#161A2C] shadow-[0_20px_50px_-25px_rgba(22,26,44,0.6)]">
          {safeRoutes.length === 0 ? (
            <p className="px-4 py-20 text-center text-sm text-[#8E93A8]">
              No fares published yet — check back soon.
            </p>
          ) : filteredRoutes.length === 0 ? (
            <div className="px-4 py-20 text-center">
              <p className="text-sm text-[#8E93A8]">
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
                  className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#C9A24B] hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Board header row — desktop only */}
              <div
                className="hidden border-b border-[#2A3050] px-6 py-4 md:grid md:items-end md:gap-4"
                style={{ gridTemplateColumns: `1.4fr repeat(${safeVehicles.length}, minmax(84px, 1fr))` }}
              >
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#5C6280]">
                  Route
                </span>
                {safeVehicles.map((v) => (
                  <div key={v.id} className="text-right">
                    <span className="font-[family-name:var(--font-display)] block text-xs uppercase tracking-wide text-[#D9DCEC]">
                      {v.name}
                    </span>
                    <span className="mt-0.5 block text-[10px] font-normal text-[#5C6280]">
                      {v.passengers} pax · {v.luggage} bags
                    </span>
                  </div>
                ))}
              </div>

              {/* Rows */}
              <div className="divide-y divide-[#232A48]">
                {filteredRoutes.map((route, i) => {
                  const values = safeVehicles
                    .map((v) => route.prices[v.id])
                    .filter((v): v is number => typeof v === "number");
                  const lowest = values.length > 1 ? Math.min(...values) : undefined;

                  return (
                    <div
                      key={`${route.fromLocation.name}-${route.toLocation.name}-${i}`}
                      className="board-row flex flex-col gap-3 px-5 py-4 md:grid md:items-center md:gap-4 md:px-6"
                      style={{
                        animationDelay: `${Math.min(i, 14) * 45}ms`,
                        gridTemplateColumns: `1.4fr repeat(${safeVehicles.length}, minmax(84px, 1fr))`,
                      }}
                    >
                      <p className="text-sm text-[#D9DCEC]">
                        <span>{route.fromLocation.name}</span>
                        <span className="mx-2 inline-block align-middle text-[#4A5078]">
                          <svg viewBox="0 0 16 10" width="16" height="10" fill="none">
                            <path
                              d="M0 5H14.5M10 1L14.5 5L10 9"
                              stroke="currentColor"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span>{route.toLocation.name}</span>
                      </p>

                      <div className="flex flex-wrap gap-2 md:contents">
                        {safeVehicles.map((v) => {
                          const price = route.prices[v.id];
                          const isLowest = lowest !== undefined && price === lowest;
                          return (
                            <div
                              key={v.id}
                              className={`flap-tile md:w-full ${isLowest ? "flap-tile--lowest" : ""}`}
                            >
                              <span className="flap-tile__label md:hidden">{v.name}</span>
                              <span className="flap-tile__value font-[family-name:var(--font-mono)]">
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

              {/* Legend */}
              <div className="flex items-center gap-2 border-t border-[#232A48] px-6 py-3">
                <span className="flap-tile flap-tile--lowest flap-tile--legend">
                  <span className="flap-tile__value font-[family-name:var(--font-mono)]">$0</span>
                </span>
                <span className="text-[11px] text-[#5C6280]">marks the lowest fare on that route</span>
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .flap-tile {
          position: relative;
          display: inline-flex;
          min-width: 4.4rem;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.1rem;
          border-radius: 0.4rem;
          background: linear-gradient(180deg, #1e2542 0%, #171d34 100%);
          padding: 0.4rem 0.65rem;
          overflow: hidden;
        }
        .flap-tile::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          height: 1px;
          background: rgba(0, 0, 0, 0.55);
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.05);
        }
        .flap-tile__label {
          font-size: 0.6rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #5c6280;
        }
        .flap-tile__value {
          font-size: 0.9rem;
          font-variant-numeric: tabular-nums;
          color: #9aa1c2;
        }
        .flap-tile--lowest {
          outline: 1px solid #c9a24b;
          outline-offset: 1px;
        }
        .flap-tile--lowest .flap-tile__value {
          color: #e4c878;
          font-weight: 600;
        }
        .flap-tile--legend {
          min-width: 2.75rem;
          padding: 0.25rem 0.5rem;
          transform: scale(0.85);
          transform-origin: left center;
        }
        .board-row {
          animation: board-row-in 420ms ease-out backwards;
        }
        @keyframes board-row-in {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .board-row {
            animation: none;
          }
          .board-pulse-dot .animate-ping {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}