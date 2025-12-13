// app/destinations/page.tsx
import { MapPin, Clock, Users, Star, ArrowRight, Sparkles } from "lucide-react";

const destinations = [
  {
    name: "Disneyland® Paris",
    slug: "disneyland-paris",
    image: "https://images.unsplash.com/photo-1591289009723-aef0a1a8a211?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "The most magical place in Europe – just 35 minutes from Paris",
    highlights: ["2 Disney Parks", "Meet & Greet with characters", "Private door-to-door transfer"],
    priceFrom: "80€",
    time: "35–45 min",
    popular: true,
  },
  {
    name: "Palace of Versailles",
    slug: "versailles",
    image: "https://images.unsplash.com/photo-1591289009723-aef0a1a8a211?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Royal grandeur, Hall of Mirrors, and stunning gardens",
    highlights: ["Skip-the-line options", "Gardens & Fountains show", "Audio guide on request"],
    priceFrom: "100€",
    time: "45–60 min",
    popular: true,
  },
  {
    name: "Eiffel Tower Area",
    slug: "eiffel-tower",
    image: "https://images.unsplash.com/photo-1591289009723-aef0a1a8a211?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Champ de Mars, Trocadéro, Seine cruises – the heart of romantic Paris",
    highlights: ["Best photo spots", "Evening illumination", "Direct access to river cruises"],
    priceFrom: "60€",
    time: "From any hotel",
  },
  {
    name: "Louvre & Musée d'Orsay",
    slug: "louvre-orsay",
    image: "https://images.unsplash.com/photo-1591289009723-aef0a1a8a211?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "World's greatest art collections – Mona Lisa, Van Gogh, and more",
    highlights: ["Priority entrance available", "Private guide on request", "Evening visits possible"],
    priceFrom: "70€",
    time: "15–25 min",
  },
  {
    name: "Montmartre & Sacré-Cœur",
    slug: "montmartre",
    image: "https://images.unsplash.com/photo-1591289009723-aef0a1a8a211?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Artists’ village, stunning views, and bohemian charm",
    highlights: ["Place du Tertre", "Best panoramic view of Paris", "Cabaret district"],
    priceFrom: "75€",
    time: "25–35 min",
  },
  {
    name: "Normandy D-Day Beaches",
    slug: "normandy",
    image: "https://images.unsplash.com/photo-1591289009723-aef0a1a8a211?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Full-day private tour to Omaha Beach, American Cemetery & Pointe du Hoc",
    highlights: ["Private English-speaking guide", "Lunch included", "12-hour experience"],
    priceFrom: "890€",
    time: "Full day (12h)",
    dayTrip: true,
  },
  {
    name: "Champagne Region (Reims & Épernay)",
    slug: "champagne",
    image: "https://images.unsplash.com/photo-1591289009723-aef0a1a8a211?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Visit Moët & Chandon, Veuve Clicquot, cathedral of Reims",
    highlights: ["Cellar tours & tasting", "Luxury minivan", "10-hour journey"],
    priceFrom: "790€",
    time: "Full day (10h)",
    dayTrip: true,
  },
  {
    name: "Loire Valley Castles",
    slug: "loire-valley",
    image: "https://images.unsplash.com/photo-1591289009723-aef0a1a8a211?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Château de Chambord, Chenonceau, wine tasting",
    highlights: ["3 magnificent castles", "Wine cellar visit", "12-hour royal experience"],
    priceFrom: "950€",
    time: "Full day (12h)",
    dayTrip: true,
  },
] as const;

export default function SpecialDestinationsPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-slate-50">

        {/* Safe Areas */}
        <div className="fixed inset-x-0 top-0 z-50 h-[env(safe-area-inset-top)] bg-emerald-950" />
        <div className="fixed inset-x-0 top-[env(safe-area-inset-top)] z-40 h-40 bg-gradient-to-b from-emerald-950/90 to-transparent pointer-events-none" />
        <div className="fixed inset-x-0 bottom-0 z-50 h-[env(safe-area-inset-bottom)] bg-white" />

        <div className="pt-[max(5rem,env(safe-area-inset-top))]">

          {/* Hero */}
          <section className="relative bg-emerald-950 text-white py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 to-black/40" />
            <div className="relative max-w-7xl mx-auto px-6 text-center">
              <div className="inline-flex items-center gap-3 bg-emerald-600/20 backdrop-blur-sm px-6 py-3 rounded-full text-emerald-300 mb-8">
                <Sparkles className="w-5 h-5" />
                <span className="font-medium">Most Requested Experiences</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                Special Destinations
                <br />
                <span className="text-emerald-400">From Paris</span>
              </h1>
              <p className="text-xl md:text-2xl text-emerald-100 font-light max-w-4xl mx-auto">
                Private door-to-door transfers · Skip the line options · English-speaking drivers
              </p>
            </div>
          </section>

          {/* Day Trips Section */}
          <section className="py-20 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Most Popular Day Trips
              </h2>
              <p className="text-xl text-slate-600">Full-day private tours with professional guide</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {destinations
                .filter((d) => d.dayTrip)
                .map((dest) => (
                  <div
                    key={dest.slug}
                    className="group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-3xl font-bold">{dest.name}</h3>
                        <p className="text-emerald-300 flex items-center gap-2 mt-1">
                          <Clock className="w-5 h-5" /> {dest.time}
                        </p>
                      </div>
                    </div>

                    <div className="p-8">
                      <ul className="space-y-3 mb-6">
                        {dest.highlights.map((h, i) => (
                          <li key={i} className="flex items-center gap-3 text-slate-700">
                            <Star className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-slate-500">From</span>
                          <p className="text-4xl font-bold text-emerald-600">{dest.priceFrom}</p>
                        </div>
                        <a
                          href={`/book?dest=${dest.slug}`}
                          className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-emerald-700 transition flex items-center gap-3"
                        >
                          Book Now <ArrowRight className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          {/* Paris Highlights */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                  Iconic Paris Destinations
                </h2>
                <p className="text-xl text-slate-600">Fast & comfortable transfers from your hotel or airport</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {destinations
                  .filter((d) => !d.dayTrip)
                  .map((dest) => (
                    <div
                      key={dest.slug}
                      className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100"
                    >
                      {dest.popular && (
                        <div className="absolute top-4 right-4 z-10 bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                          Most Popular
                        </div>
                      )}

                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 text-white">
                          <h3 className="text-3xl font-bold drop-shadow-lg">{dest.name}</h3>
                          <p className="text-emerald-300 mt-2">{dest.description}</p>
                        </div>
                      </div>

                      <div className="p-7">
                        <div className="flex items-center gap-6 text-slate-600 mb-6">
                          <span className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-emerald-600" />
                            {dest.time}
                          </span>
                          <span className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-emerald-600" />
                            Up to 8 pax
                          </span>
                        </div>

                        <div className="flex items-end justify-between">
                          <div>
                            <div className="text-sm text-slate-500">One-way from</div>
                            <div className="text-4xl font-bold text-emerald-600">{dest.priceFrom}</div>
                            <div className="text-sm text-slate-500">per vehicle</div>
                          </div>
                          <a
                            href={`/book?dest=${dest.slug}`}
                            className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition shadow-lg flex items-center gap-3"
                          >
                            Book Transfer <ArrowRight className="w-5 h-5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-24 bg-emerald-950 text-white text-center">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready for Your Paris Adventure?
              </h2>
              <p className="text-xl text-emerald-200 mb-10">
                Private driver • Fixed prices • Instant confirmation
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="/book"
                  className="bg-white text-emerald-700 px-12 py-6 rounded-2xl text-xl font-bold hover:bg-emerald-50 transition shadow-xl"
                >
                  Book Your Transfer Now
                </a>
                <a
                  href="/contact"
                  className="border-2 border-white px-12 py-6 rounded-2xl text-xl font-bold hover:bg-white/10 transition"
                >
                  Get Custom Quote
                </a>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}