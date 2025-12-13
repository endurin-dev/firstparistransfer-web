// src/app/components/OurServices.tsx
"use client";

import { Car, Clock, MapPin, User, Users, Star, Shield, CheckCircle, Smile } from "lucide-react";

const services = [
  {
    title: "Airport Transfers",
    description: "Enjoy seamless airport transfers to and from CDG, Orly, and Beauvais airports with real-time flight tracking, punctual pickup, and luxury comfort.",
    icon: MapPin,
  },
  {
    title: "Hourly Chauffeur",
    description: "Flexible hourly chauffeur service for sightseeing, business meetings, and shopping tours, offering privacy, comfort, and professional drivers.",
    icon: Clock,
  },
  {
    title: "City Tours",
    description: "Discover Paris like a local with curated private city tours, visiting iconic landmarks such as the Eiffel Tower, Louvre, and hidden gems off the beaten path.",
    icon: Star,
  },
  {
    title: "Business Travel",
    description: "Professional and punctual service for corporate meetings, events, and VIP transfers, ensuring a stress-free and productive travel experience.",
    icon: Users,
  },
  {
    title: "Private Shuttle",
    description: "Comfortable door-to-door shuttle service for groups, hotels, and events, combining convenience, safety, and luxury for all passengers.",
    icon: Car,
  },
  {
    title: "Personalized Service",
    description: "Tailor-made trips with personalized preferences, multilingual drivers, child seats on request, and itinerary flexibility for ultimate comfort.",
    icon: User,
  },
  {
    title: "Safety First",
    description: "Your safety is our priority. All vehicles are sanitized, inspected regularly, and driven by professional chauffeurs adhering to strict safety protocols.",
    icon: Shield,
  },
  {
    title: "Hassle-Free Experience",
    description: "From booking to arrival, enjoy a smooth, stress-free journey with instant confirmation, transparent pricing, and friendly customer support.",
    icon: CheckCircle,
  },
  {
    title: "Experienced Drivers",
    description: "Our drivers are highly trained, licensed, and knowledgeable about Paris streets, ensuring timely arrivals, comfort, and insider tips for tourists.",
    icon: Smile,
  },
];

export default function OurServices() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold text-black">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-black/70">
            Premium chauffeur and shuttle services across Paris – Luxury, Safety & Comfort Guaranteed
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className="relative p-8 rounded-2xl border border-black/10 bg-white/90 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-500 text-black mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-8 h-8" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-black mb-3">{service.title}</h3>

              {/* Description */}
              <p className="text-black/80 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
