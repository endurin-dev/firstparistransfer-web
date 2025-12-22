// app/blog/page.tsx
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  featured?: boolean;
};

const blogPosts: BlogPost[] = [
  {
    slug: "best-viewpoints-paris",
    title: "The 7 Best Viewpoints in Paris (That Aren’t Just the Eiffel Tower)",
    excerpt:
      "From secret rooftops to panoramic terraces – discover where real Parisians go for breathtaking views.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=800&fit=crop",
    author: "Marie Dubois",
    date: "December 10, 2025",
    readTime: "6 min",
    category: "Hidden Gems",
    featured: true,
  },
  {
    slug: "disneyland-paris-2025-guide",
    title:
      "Disneyland Paris 2025: New Rides, Best Tips & How to Skip Lines",
    excerpt:
      "Everything you need to know before your magical day – including the new Frozen land opening soon.",
    image:
      "https://images.unsplash.com/photo-1585488322438-211f7b8766c4?q=80&w=1176&auto=format&fit=crop",
    author: "Lucas Martin",
    date: "December 5, 2025",
    readTime: "8 min",
    category: "Family Travel",
    featured: true,
  },
  {
    slug: "versailles-secret-gardens",
    title:
      "Beyond the Hall of Mirrors: Secret Gardens & Hidden Groves of Versailles",
    excerpt:
      "Explore the lesser-known corners of the palace gardens where even Marie Antoinette loved to escape.",
    image:
      "https://plus.unsplash.com/premium_photo-1658527202479-07030551e2d2?q=80&w=1171&auto=format&fit=crop",
    author: "Sophie Laurent",
    date: "November 28, 2025",
    readTime: "5 min",
    category: "History & Culture",
  },
  {
    slug: "montmartre-like-a-local",
    title:
      "How to Visit Montmartre Like a Local (And Avoid Tourist Traps)",
    excerpt:
      "Best bakeries, secret vineyards, quiet streets, and where artists actually live today.",
    image:
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=1200&h=800&fit=crop",
    author: "Camille Renaud",
    date: "November 20, 2025",
    readTime: "7 min",
    category: "Local Life",
  },
  {
    slug: "paris-airport-guide-2025",
    title:
      "CDG vs Orly vs Beauvais: The Ultimate Airport Transfer Guide 2025",
    excerpt:
      "Which airport should you choose? Real transfer times, prices, and insider tips.",
    image:
      "https://images.unsplash.com/photo-1591289009723-aef0a1a8a211?q=80&w=1170&auto=format&fit=crop",
    author: "Alexandre Dupont",
    date: "November 15, 2025",
    readTime: "10 min",
    category: "Travel Tips",
  },
  {
    slug: "paris-christmas-markets-2025",
    title:
      "Paris Christmas Markets 2025: Dates, Locations & Best Stalls",
    excerpt:
      "The complete guide to magical chalets, vin chaud, and where to find the giant Christmas tree.",
    image:
      "https://images.unsplash.com/photo-1765395087684-55b2552f204d?q=80&w=1171&auto=format&fit=crop",
    author: "Élise Moreau",
    date: "November 10, 2025",
    readTime: "6 min",
    category: "Seasonal",
  },
  {
    slug: "best-rooftop-bars-paris",
    title:
      "Top 10 Rooftop Bars in Paris with Stunning Views 2025",
    excerpt:
      "From hidden gems to iconic terraces – the best places for sunset cocktails above the rooftops.",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=1200&h=800&fit=crop",
    author: "Julien Bernard",
    date: "November 5, 2025",
    readTime: "7 min",
    category: "Nightlife",
  },
  {
    slug: "one-day-in-paris-itinerary",
    title:
      "The Perfect One Day in Paris Itinerary (Written by a Local)",
    excerpt:
      "How to see the real Paris in 24 hours – including breakfast spots, secret passages, and sunset views.",
    image:
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=1200&h=800&fit=crop",
    author: "Chloé Lambert",
    date: "October 30, 2025",
    readTime: "9 min",
    category: "Itineraries",
    featured: true,
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1591289009723-aef0a1a8a211?q=80&w=1170&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative text-center text-white px-6 max-w-5xl mx-auto z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Paris Insider Blog
          </h1>
          <p className="text-xl md:text-2xl text-gray-200">
            Hidden gems • Local secrets • Expert tips from real Parisians
          </p>
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto -mt-32 relative z-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute top-4 left-4 bg-black/80 text-white px-4 py-2 rounded-full text-sm">
                  {post.category}
                </div>

                {post.featured && (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-bold">
                    Featured
                  </div>
                )}
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex gap-4">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                  <span className="font-medium text-black">
                    {post.author}
                  </span>
                </div>

                <div className="flex items-center gap-3 font-semibold">
                  Read Article
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
