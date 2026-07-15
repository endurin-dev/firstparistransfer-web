// app/destinations/page.tsx
import { Clock, Users, Star, ArrowRight, Sparkles } from "lucide-react";

/* =======================
   Destination Type
======================= */
type Destination = {
  name: string;
  slug: string;
  image: string;
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
    image:
      "https://images.unsplash.com/photo-1591289009723-aef0a1a8a211?q=80&w=1170&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1591289009723-aef0a1a8a211?q=80&w=1170&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1591289009723-aef0a1a8a211?q=80&w=1170&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1591289009723-aef0a1a8a211?q=80&w=1170&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1591289009723-aef0a1a8a211?q=80&w=1170&auto=format&fit=crop",
    description: "Artists’ village, stunning views, and bohemian charm",
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
    image:
      "https://images.unsplash.com/photo-1591289009723-aef0a1a8a211?q=80&w=1170&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1591289009723-aef0a1a8a211?q=80&w=1170&auto=format&fit=crop",
    description:
      "Visit Moët & Chandon, Veuve Clicquot, cathedral of Reims",
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
    image:
      "https://images.unsplash.com/photo-1591289009723-aef0a1a8a211?q=80&w=1170&auto=format&fit=crop",
    description:
      "Château de Chambord, Chenonceau, wine tasting",
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
   Page
======================= */
export default function SpecialDestinationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-slate-50">
      {/* HERO */}
      <section className="relative bg-emerald-950 text-white py-32 text-center">
        <div className="inline-flex items-center gap-3 bg-emerald-600/20 px-6 py-3 rounded-full text-emerald-300 mb-8">
          <Sparkles className="w-5 h-5" />
          Most Requested Experiences
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Special Destinations
          <br />
          <span className="text-emerald-400">From Paris</span>
        </h1>
        <p className="text-xl text-emerald-100">
          Private door-to-door transfers · English-speaking drivers
        </p>
      </section>

      {/* DAY TRIPS */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Most Popular Day Trips
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {destinations
            .filter((d) => d.dayTrip)
            .map((dest) => (
              <div key={dest.slug} className="bg-white rounded-3xl shadow-xl">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="rounded-t-3xl"
                />
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{dest.name}</h3>
                  <p className="text-emerald-600 flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5" /> {dest.time}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {dest.highlights.map((h, i) => (
                      <li key={i} className="flex gap-2">
                        <Star className="w-4 h-4 text-emerald-600" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold text-emerald-600">
                      {dest.priceFrom}
                    </span>
                    <a
                      href={`/book?dest=${dest.slug}`}
                      className="bg-emerald-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
                    >
                      Book <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
