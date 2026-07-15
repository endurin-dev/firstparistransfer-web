// src/app/components/ReviewsLoop6Cards.tsx
"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";

interface Review {
  source: "Google" | "TripAdvisor";
  author: string;
  rating: number;
  text: string;
  date: string;
}

const sampleReviews: Review[] = [
  {
    source: "Google",
    author: "Sophie L.",
    rating: 5,
    text: "Amazing service! The chauffeur was punctual, friendly, and the car was immaculate. Highly recommend for airport transfers in Paris.",
    date: "2025-10-12",
  },
  {
    source: "TripAdvisor",
    author: "James K.",
    rating: 5,
    text: "Our private tour with First Paris Transfer was exceptional. Knowledgeable driver and luxurious car made our trip unforgettable.",
    date: "2025-09-05",
  },
  {
    source: "Google",
    author: "Clara M.",
    rating: 4,
    text: "Very professional service. Smooth ride, comfortable vehicles, and easy booking process. Will use again!",
    date: "2025-08-20",
  },
  {
    source: "TripAdvisor",
    author: "Marc T.",
    rating: 5,
    text: "Excellent experience! Driver was friendly and on time. The car was clean and very comfortable.",
    date: "2025-07-15",
  },
  {
    source: "Google",
    author: "Emma R.",
    rating: 5,
    text: "Luxury service at its best! Highly recommend for anyone visiting Paris.",
    date: "2025-06-30",
  },
  {
    source: "TripAdvisor",
    author: "Oliver P.",
    rating: 5,
    text: "Perfect airport transfer. Smooth, safe, and comfortable. A must-try chauffeur service in Paris.",
    date: "2025-05-21",
  },
  {
    source: "Google",
    author: "Lena S.",
    rating: 4,
    text: "Very comfortable and reliable service. The car was spotless and driver courteous.",
    date: "2025-04-18",
  },
];

export default function ReviewsLoop6Cards() {
  const [startIndex, setStartIndex] = useState(0);
  const displayCount = 6; // show 6 cards at a time

  // Loop through reviews every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + displayCount) % sampleReviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Get visible reviews
  const visibleReviews = Array.from({ length: displayCount }, (_, i) => {
    return sampleReviews[(startIndex + i) % sampleReviews.length];
  });

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background blurred shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold text-black">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-black/70">
            Trusted by travelers worldwide on Google and TripAdvisor
          </p>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {visibleReviews.map((review, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl bg-white/20 backdrop-blur-3xl border border-black/10 shadow-2xl flex flex-col justify-between transition-transform duration-700 hover:scale-105 animate-popup`}
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-black font-bold">{review.author}</span>
                    <span className="text-black/60 text-sm">({review.source})</span>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }, (_, starIdx) => (
                      <Star
                        key={starIdx}
                        className={`w-5 h-5 ${
                          starIdx < review.rating ? "text-yellow-500" : "text-black/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-black/90 text-sm leading-relaxed">{review.text}</p>
              </div>
              <p className="text-black/50 text-xs mt-4 text-right">{review.date}</p>
            </div>
          ))}
        </div>
      </div>

 
    </section>
  );
}
