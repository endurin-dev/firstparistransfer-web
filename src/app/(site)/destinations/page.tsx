// app/destinations/page.tsx
import Link from "next/link";
import { Oswald, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Clock, Star, ArrowRight, Sparkles } from "lucide-react";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-mono",
});

/* =======================
   Destination Type
======================= */
type Destination = {
  name: string;
  slug: string;
  code: string; // three-letter station code, shown on the ticket plaque
  description: string;
  highlights: string[];
  priceFrom: string;
  time: string;
  popular?: boolean;
  dayTrip?: boolean;
};

/* =======================
   Data
======================= */
const destinations: Destination[] = [
  {
    name: "Disneyland® Paris",
    slug: "disneyland-paris",
    code: "DLP",
    description: "The most magical place in Europe – just 35 minutes from Paris",
    highlights: [
      "2 Disney Parks",
      "Meet & Greet with characters",
      "Private door-to-door transfer",
    ],
    priceFrom: "80€",
    time: "35–45 min",
    popular: true,
  },
  {
    name: "Palace of Versailles",
    slug: "versailles",
    code: "VER",
    description: "Royal grandeur, Hall of Mirrors, and stunning gardens",
    highlights: [
      "Skip-the-line options",
      "Gardens & Fountains show",
      "Audio guide on request",
    ],
    priceFrom: "100€",
    time: "45–60 min",
    popular: true,
  },
  {
    name: "Eiffel Tower Area",
    slug: "eiffel-tower",
    code: "EIF",
    description:
      "Champ de Mars, Trocadéro, Seine cruises – the heart of romantic Paris",
    highlights: [
      "Best photo spots",
      "Evening illumination",
      "Direct access to river cruises",
    ],
    priceFrom: "60€",
    time: "From any hotel",
  },
  {
    name: "Louvre & Musée d'Orsay",
    slug: "louvre-orsay",
    code: "LOU",
    description:
      "World's greatest art collections – Mona Lisa, Van Gogh, and more",
    highlights: [
      "Priority entrance available",
      "Private guide on request",
      "Evening visits possible",
    ],
    priceFrom: "70€",
    time: "15–25 min",
  },
  {
    name: "Montmartre & Sacré-Cœur",
    slug: "montmartre",
    code: "MTM",
    description: "Artists' village, stunning views, and bohemian charm",
    highlights: [
      "Place du Tertre",
      "Best panoramic view of Paris",
      "Cabaret district",
    ],
    priceFrom: "75€",
    time: "25–35 min",
  },
  {
    name: "Normandy D-Day Beaches",
    slug: "normandy",
    code: "NOR",
    description:
      "Full-day private tour to Omaha Beach, American Cemetery & Pointe du Hoc",
    highlights: [
      "Private English-speaking guide",
      "Lunch included",
      "12-hour experience",
    ],
    priceFrom: "890€",
    time: "Full day (12h)",
    dayTrip: true,
  },
  {
    name: "Champagne Region (Reims & Épernay)",
    slug: "champagne",
    code: "CHA",
    description: "Visit Moët & Chandon, Veuve Clicquot, cathedral of Reims",
    highlights: [
      "Cellar tours & tasting",
      "Luxury minivan",
      "10-hour journey",
    ],
    priceFrom: "790€",
    time: "Full day (10h)",
    dayTrip: true,
  },
  {
    name: "Loire Valley Castles",
    slug: "loire-valley",
    code: "LOI",
    description: "Château de Chambord, Chenonceau, wine tasting",
    highlights: [
      "3 magnificent castles",
      "Wine cellar visit",
      "12-hour royal experience",
    ],
    priceFrom: "950€",
    time: "Full day (12h)",
    dayTrip: true,
  },
];

/* =======================
   Ticket-stub card
======================= */
function DestinationCard({
  dest,
  size = "compact",
}: {
  dest: Destination;
  size?: "compact" | "large";
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_16px_40px_-24px_rgba(22,26,44,0.45)]">
      {/* Plaque panel */}
      <div
        className={`relative flex flex-col justify-between bg-[#161A2C] px-6 ${
          size === "large" ? "pb-8 pt-6" : "pb-6 pt-5"
        }`}
      >
        {dest.popular && (
          <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-[#C9A24B]/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#E4C878]">
            <Sparkles className="h-3 w-3" /> Most requested
          </span>
        )}
        <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.25em] text-[#5C6280]">
          {dest.dayTrip ? "Full-day excursion" : "Short transfer"}
        </span>
        <span
          className={`font-[family-name:var(--font-display)] mt-3 font-semibold tracking-wide text-[#C9A24B] ${
            size === "large" ? "text-6xl" : "text-5xl"
          }`}
        >
          {dest.code}
        </span>
        <h3 className="font-[family-name:var(--font-display)] mt-2 text-lg uppercase tracking-wide text-[#F1E9CE]">
          {dest.name}
        </h3>
      </div>

      {/* Perforation seam */}
      <div className="relative border-t border-dashed border-[#D8CFAF]">
        <span className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-[#EFEBE1]" />
        <span className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-[#EFEBE1]" />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col justify-between px-6 py-6">
        <div>
          <p className="text-sm leading-relaxed text-[#5B5748]">{dest.description}</p>
          <ul className="mt-4 space-y-1.5">
            {dest.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#3A3629]">
                <Star className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C9A24B]" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex items-end justify-between border-t border-[#EFEBE1] pt-4">
          <div>
            <p className="flex items-center gap-1.5 text-xs text-[#8A7A4E]">
              <Clock className="h-3.5 w-3.5" /> {dest.time}
            </p>
            <p className="font-[family-name:var(--font-mono)] mt-1 text-2xl font-semibold text-[#161A2C]">
              from {dest.priceFrom}
            </p>
          </div>
          <Link
            href={`/booking?dest=${dest.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#161A2C] px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-[#F1E9CE] transition-colors hover:bg-[#C9A24B] hover:text-[#161A2C]"
          >
            Book <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* =======================
   Page
======================= */
export default function SpecialDestinationsPage() {
  const shortTransfers = destinations.filter((d) => !d.dayTrip);
  const dayTrips = destinations.filter((d) => d.dayTrip);

  return (
    <div
      className={`${oswald.variable} ${plexSans.variable} ${plexMono.variable} font-[family-name:var(--font-body)] min-h-screen bg-[#EFEBE1]`}
    >
      {/* HERO */}
      <section className="bg-[#161A2C] px-4 py-24 text-center sm:px-6">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#2A3050] bg-[#1E2542] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#E4C878]">
          <Sparkles className="h-3.5 w-3.5" /> Most requested experiences
        </div>
        <h1 className="font-[family-name:var(--font-display)] mt-6 text-5xl font-semibold uppercase tracking-wide text-[#F1E9CE] sm:text-7xl">
          Special Destinations
        </h1>
        <p className="mt-4 text-lg text-[#9AA1C2]">
          Private door-to-door transfers · English-speaking drivers
        </p>
      </section>

      {/* SHORT TRANSFERS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 className="font-[family-name:var(--font-display)] mb-10 text-center text-3xl font-semibold uppercase tracking-wide text-[#161A2C] sm:text-4xl">
          Short Transfers in Paris
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shortTransfers.map((dest) => (
            <DestinationCard key={dest.slug} dest={dest} />
          ))}
        </div>
      </section>

      {/* DAY TRIPS */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <h2 className="font-[family-name:var(--font-display)] mb-10 text-center text-3xl font-semibold uppercase tracking-wide text-[#161A2C] sm:text-4xl">
          Full-Day Excursions
        </h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {dayTrips.map((dest) => (
            <DestinationCard key={dest.slug} dest={dest} size="large" />
          ))}
        </div>
      </section>
    </div>
  );
}