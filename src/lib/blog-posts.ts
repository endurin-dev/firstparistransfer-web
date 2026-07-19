// lib/blog-posts.ts

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  authorBio: string;
  date: string;
  readTime: string;
  category: string;
  featured?: boolean;
  quickFacts: string[];
  content: ContentBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "best-viewpoints-paris",
    title: "The 7 Best Viewpoints in Paris (That Aren't Just the Eiffel Tower)",
    excerpt:
      "From secret rooftops to panoramic terraces – discover where real Parisians go for breathtaking views.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=800&fit=crop",
    author: "Marie Dubois",
    authorBio: "Marie has lived in the 11th arrondissement for over a decade and writes about the city's quieter corners.",
    date: "December 10, 2025",
    readTime: "6 min",
    category: "Hidden Gems",
    featured: true,
    quickFacts: [
      "Arrive at least 30 minutes before sunset for the best light",
      "Most terraces on this list are free to enter",
      "Weekday mornings are far quieter than weekends",
    ],
    content: [
      {
        type: "p",
        text: "Everyone queues for the Eiffel Tower's summit, and it's a fair trade for the view — but it's not the only rooftop worth your time, and it's rarely the most memorable one. Paris rewards a bit of elevation almost everywhere you find it, and some of the best vantage points cost nothing at all.",
      },
      { type: "h2", text: "Start high, then go quiet" },
      {
        type: "p",
        text: "The obvious stops — the Arc de Triomphe roof, the Tour Montparnasse observation deck — earn their reputation because they're genuinely good. But once you've ticked those off, the more rewarding views are the ones locals actually return to: a church steps from home, a park bench at the right hour, a bridge nobody photographs from the middle.",
      },
      {
        type: "ul",
        items: [
          "The steps of Sacré-Cœur, early before the crowds arrive",
          "Parc de Belleville, which quietly out-views Montmartre",
          "The Institut du Monde Arabe's rooftop terrace, often overlooked entirely",
          "Pont Alexandre III at dusk, looking toward Les Invalides",
        ],
      },
      {
        type: "quote",
        text: "The view you remember is rarely the one you planned for — it's the one you stumbled into on the walk back.",
      },
      { type: "h2", text: "Timing matters more than location" },
      {
        type: "p",
        text: "The same viewpoint can feel completely different an hour apart. Blue hour — the thirty minutes after sunset — is when the city's lights and the last daylight balance each other, and it's worth planning your evening around rather than treating as a bonus.",
      },
      {
        type: "p",
        text: "If you're staying near one of our pickup points, ask your driver — most have a personal favorite they'll happily point you toward.",
      },
    ],
  },
  {
    slug: "disneyland-paris-2025-guide",
    title: "Disneyland Paris 2025: New Rides, Best Tips & How to Skip Lines",
    excerpt:
      "Everything you need to know before your magical day – including the new Frozen land opening soon.",
    image:
      "https://images.unsplash.com/photo-1585488322438-211f7b8766c4?q=80&w=1176&auto=format&fit=crop",
    author: "Lucas Martin",
    authorBio: "Lucas covers family travel and has taken more Disneyland Paris day trips than he can count.",
    date: "December 5, 2025",
    readTime: "8 min",
    category: "Family Travel",
    featured: true,
    quickFacts: [
      "Two parks share one ticket entrance — plan your order the night before",
      "Rope-drop (arriving at opening) saves the most time of any single tip",
      "Character meet-and-greets get busiest right after lunch",
    ],
    content: [
      {
        type: "p",
        text: "Disneyland Paris rewards a little planning far more than most theme parks. The layout, the crowd patterns, and the sheer size of the resort mean a well-timed day feels completely different from an unplanned one — even with the same ticket.",
      },
      { type: "h2", text: "Before you go" },
      {
        type: "p",
        text: "Decide which park — Disneyland Park or Walt Disney Studios — matters more to your group, and start there. Families with younger children usually lean toward the classic park's fairy-tale attractions; older kids and thrill-seekers often prefer the Studios side.",
      },
      { type: "h2", text: "Getting the most from your day" },
      {
        type: "ul",
        items: [
          "Arrive 30–45 minutes before official opening",
          "Ride the busiest attractions first, save gentle rides for the afternoon lull",
          "Book a lunch slot rather than queuing at peak hours",
          "Keep an eye on parade and fireworks times — they reshuffle crowds citywide",
        ],
      },
      {
        type: "p",
        text: "A private transfer removes one of the day's biggest variables: getting an early, tired group there and back without navigating public transport with strollers and souvenirs in tow.",
      },
    ],
  },
  {
    slug: "versailles-secret-gardens",
    title: "Beyond the Hall of Mirrors: Secret Gardens & Hidden Groves of Versailles",
    excerpt:
      "Explore the lesser-known corners of the palace gardens where even Marie Antoinette loved to escape.",
    image:
      "https://plus.unsplash.com/premium_photo-1658527202479-07030551e2d2?q=80&w=1171&auto=format&fit=crop",
    author: "Sophie Laurent",
    authorBio: "Sophie studied art history and specializes in the Île-de-France's royal estates.",
    date: "November 28, 2025",
    readTime: "5 min",
    category: "History & Culture",
    quickFacts: [
      "The gardens are free to enter on most days outside fountain-show dates",
      "The Grand Trianon and Petit Trianon require separate tickets",
      "Renting a bike is the easiest way to cover the full estate",
    ],
    content: [
      {
        type: "p",
        text: "Most visitors spend their entire Versailles trip indoors, shuffling past the Hall of Mirrors with a hundred other people. It's worth seeing — but the gardens, which most people treat as a photo backdrop on the way out, are where the estate actually breathes.",
      },
      { type: "h2", text: "Where the crowds thin out" },
      {
        type: "p",
        text: "Past the main parterres, the paths fan out into groves that were designed as private retreats for the royal family, and they're still quiet today simply because most visitors run out of time before they reach them.",
      },
      {
        type: "ul",
        items: [
          "The Queen's Grove, a maze of hedges that once hid intimate gatherings",
          "The Petit Trianon's English garden, deliberately informal by design",
          "The Hamlet, Marie Antoinette's rustic retreat, complete with a working farm",
        ],
      },
      {
        type: "p",
        text: "If your schedule allows it, give yourself a full day rather than a half-day — the estate is large enough that rushing it defeats the point of coming at all.",
      },
    ],
  },
  {
    slug: "montmartre-like-a-local",
    title: "How to Visit Montmartre Like a Local (And Avoid Tourist Traps)",
    excerpt:
      "Best bakeries, secret vineyards, quiet streets, and where artists actually live today.",
    image:
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=1200&h=800&fit=crop",
    author: "Camille Renaud",
    authorBio: "Camille grew up near Montmartre and still lives a few streets from Place du Tertre.",
    date: "November 20, 2025",
    readTime: "7 min",
    category: "Local Life",
    quickFacts: [
      "Place du Tertre is worth a look, but not worth eating at",
      "The neighborhood's steepest streets are its quietest",
      "Weekday mornings before 10am feel like a different neighborhood entirely",
    ],
    content: [
      {
        type: "p",
        text: "Montmartre has two identities running side by side: the one built for tour groups around Place du Tertre, and the one that's still, genuinely, a village on a hill. Telling them apart takes about ten minutes of walking in the right direction.",
      },
      { type: "h2", text: "Skip the square, take the side streets" },
      {
        type: "p",
        text: "The caricature artists and overpriced cafés around Place du Tertre exist because that's where the buses stop. A few streets over, the neighborhood looks almost untouched — narrow lanes, working artist studios, and bakeries with no English menu.",
      },
      {
        type: "ul",
        items: [
          "Rue de l'Abreuvoir for the neighborhood's prettiest corner",
          "The Montmartre vineyard, one of the last working vineyards in Paris",
          "Rue des Trois Frères for genuinely local shops and cafés",
        ],
      },
      {
        type: "quote",
        text: "Go up to Sacré-Cœur for the view. Stay for the streets nobody photographs on the way there.",
      },
    ],
  },
  {
    slug: "paris-airport-guide-2025",
    title: "CDG vs Orly vs Beauvais: The Ultimate Airport Transfer Guide 2025",
    excerpt:
      "Which airport should you choose? Real transfer times, prices, and insider tips.",
    image:
      "https://images.unsplash.com/photo-1591289009723-aef0a1a8a211?q=80&w=1170&auto=format&fit=crop",
    author: "Alexandre Dupont",
    authorBio: "Alexandre has spent years coordinating airport transfers across all three of the city's airports.",
    date: "November 15, 2025",
    readTime: "10 min",
    category: "Travel Tips",
    quickFacts: [
      "CDG is the busiest but has the most direct routes into central Paris",
      "Orly is closer to the south of the city and generally quieter",
      "Beauvais mainly serves budget carriers and sits well outside the city",
    ],
    content: [
      {
        type: "p",
        text: "Which airport you land at shapes your entire first hour in France, and the three options couldn't be more different from one another in terms of distance, traffic patterns, and transfer options.",
      },
      { type: "h2", text: "Charles de Gaulle (CDG)" },
      {
        type: "p",
        text: "The largest of the three and the most likely landing spot for long-haul flights. It's roughly 40–60 minutes from central Paris depending on traffic, with the widest range of transfer options of any of the airports.",
      },
      { type: "h2", text: "Orly (ORY)" },
      {
        type: "p",
        text: "Closer to the city and generally calmer than CDG, Orly mainly handles domestic and European routes. Transfers tend to run a little shorter and a little smoother.",
      },
      { type: "h2", text: "Beauvais (BVA)" },
      {
        type: "p",
        text: "Popular with budget airlines, Beauvais sits well outside Paris — closer to an hour and a half by road. It's worth checking your transfer time before booking a flight that lands late at night.",
      },
      {
        type: "p",
        text: "Whichever airport you land at, a pre-booked private transfer means no queuing for a taxi rank after a long flight — your driver tracks your flight and adjusts for delays automatically.",
      },
    ],
  },
  {
    slug: "paris-christmas-markets-2025",
    title: "Paris Christmas Markets 2025: Dates, Locations & Best Stalls",
    excerpt:
      "The complete guide to magical chalets, vin chaud, and where to find the giant Christmas tree.",
    image:
      "https://images.unsplash.com/photo-1765395087684-55b2552f204d?q=80&w=1171&auto=format&fit=crop",
    author: "Élise Moreau",
    authorBio: "Élise covers Paris's seasonal events and has a running list of the city's best vin chaud stalls.",
    date: "November 10, 2025",
    readTime: "6 min",
    category: "Seasonal",
    quickFacts: [
      "Markets typically run from late November through late December",
      "The Tuileries and Champs-Élysées markets draw the biggest crowds",
      "Smaller neighborhood markets are often the better food option",
    ],
    content: [
      {
        type: "p",
        text: "Paris doesn't do Christmas markets on the scale of Strasbourg or Vienna, but what it lacks in size it makes up for in atmosphere — and in spreading them across enough neighborhoods that you can build an entire evening around wandering between them.",
      },
      { type: "h2", text: "Where to go" },
      {
        type: "ul",
        items: [
          "Jardin des Tuileries, for the classic postcard version with a ferris wheel",
          "Champs-Élysées, for scale and sheer festive density",
          "Smaller neighborhood markets in the outer arrondissements, for better food and shorter queues",
        ],
      },
      {
        type: "p",
        text: "If you only have one evening, pick one large market and one small one rather than trying to see everything — the smaller markets are where the actual charm tends to live.",
      },
    ],
  },
  {
    slug: "best-rooftop-bars-paris",
    title: "Top 10 Rooftop Bars in Paris with Stunning Views 2025",
    excerpt:
      "From hidden gems to iconic terraces – the best places for sunset cocktails above the rooftops.",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=1200&h=800&fit=crop",
    author: "Julien Bernard",
    authorBio: "Julien writes about Paris nightlife and has a soft spot for anywhere with a good view and a quiet corner.",
    date: "November 5, 2025",
    readTime: "7 min",
    category: "Nightlife",
    quickFacts: [
      "Most rooftop bars take reservations — walk-ins risk a long wait",
      "Sunset slots book up fastest, especially in summer",
      "Several of the best views come with no cover charge at all",
    ],
    content: [
      {
        type: "p",
        text: "A good rooftop bar in Paris is less about the drinks list and more about the fifteen minutes right around sunset, when the whole city turns the same shade of gold.",
      },
      { type: "h2", text: "What actually makes a great rooftop" },
      {
        type: "p",
        text: "Height alone doesn't guarantee a good view — some of the best terraces in the city sit just a few floors up but face the right direction. Before booking anywhere, it's worth checking which way the terrace actually faces at sunset.",
      },
      {
        type: "ul",
        items: [
          "Reserve ahead for anything with a view of the Eiffel Tower",
          "Arrive before sunset — the best tables go first",
          "Ask for anything facing west if you want the golden hour light",
        ],
      },
      {
        type: "quote",
        text: "Book the table before you pick the cocktail. The view is the reason you're there.",
      },
    ],
  },
  {
    slug: "one-day-in-paris-itinerary",
    title: "The Perfect One Day in Paris Itinerary (Written by a Local)",
    excerpt:
      "How to see the real Paris in 24 hours – including breakfast spots, secret passages, and sunset views.",
    image:
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=1200&h=800&fit=crop",
    author: "Chloé Lambert",
    authorBio: "Chloé has spent years helping first-time visitors plan their one perfect day in the city.",
    date: "October 30, 2025",
    readTime: "9 min",
    category: "Itineraries",
    featured: true,
    quickFacts: [
      "Start early — Paris in the first two hours of daylight is a different city",
      "Pick one museum, not three — you'll enjoy it more",
      "Save the river for last; it's the best way to end the day",
    ],
    content: [
      {
        type: "p",
        text: "One day in Paris is never enough, but it's enough to come away with a real feel for the city — as long as you resist the urge to cram in everything at once.",
      },
      { type: "h2", text: "Morning: walk before you plan" },
      {
        type: "p",
        text: "Start with breakfast somewhere quiet, then walk without much of an agenda for the first hour. The city looks completely different before the crowds arrive, and it's the best way to get your bearings without a map.",
      },
      { type: "h2", text: "Afternoon: pick one thing and do it properly" },
      {
        type: "p",
        text: "Whether it's the Louvre, Musée d'Orsay, or simply a long walk through the Marais, choose one anchor for your afternoon rather than trying to see three neighborhoods at once.",
      },
      { type: "h2", text: "Evening: end on the water" },
      {
        type: "p",
        text: "A walk along the Seine as the lights come on is, more often than not, what people remember most about their one day in the city — simple, free, and impossible to rush.",
      },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, count = 3) {
  return blogPosts.filter((p) => p.slug !== slug).slice(0, count);
}