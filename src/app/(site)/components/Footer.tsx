// src/app/components/Footer.tsx
"use client";

import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin, FaCar } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-white/10 backdrop-blur-3xl border-t border-black/20 text-white py-16 px-6 overflow-hidden">
      {/* Glassy background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo & About Us */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-yellow-500/20">
              <FaCar className="w-6 h-6 text-yellow-500" />
            </div>
            <h2 className="text-white font-extrabold text-2xl">First Paris Transfer</h2>
          </div>
          <p className="text-white/70 text-sm mb-4">
            Premium chauffeur services in Paris. Luxury airport transfers, private city tours, and event transportation with professional, experienced drivers.
          </p>

          {/* Social Media Icons */}
          <div className="flex gap-4 mb-4">
            <a href="#" className="text-yellow-500 hover:text-yellow-400 transition">
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a href="#" className="text-yellow-500 hover:text-yellow-400 transition">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-yellow-500 hover:text-yellow-400 transition">
              <FaTwitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-yellow-500 hover:text-yellow-400 transition">
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>

          {/* Registered Company Image */}
          <div className="mt-4 flex flex-col items-start gap-2">
            <div className="w-40 h-20 rounded-2xl overflow-hidden relative">
  <Image
    src="/images/register.webp"
    alt="Registered Company"
    width={160} // compact width
    height={80} // compact height
    className="object-contain"
  />
</div>
<span className="text-white font-bold text-sm mt-1">Registered Company</span>

          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-extrabold text-lg mb-4">Quick Links</h3>
          <ul className="flex flex-col gap-0">
            {[
              { name: "Home", href: "/" },
              { name: "Book Transfer", href: "/booking" },
              { name: "Our Fleet", href: "/fleet" },
              { name: "Services", href: "/services" },
              { name: "Contact Us", href: "/contact" },
            ].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block px-4 py-2 rounded-xl text-white/80 hover:text-yellow-500 hover:bg-white/10 transition-all duration-300"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-extrabold text-lg mb-4">Services</h3>
          <ul className="space-y-2 text-white/70 text-sm">
            <li><a href="#" className="hover:text-yellow-500 transition">Airport Transfers</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition">City Tours</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition">Hourly Chauffeur</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition">Event Transfers</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition">Disneyland Transfers</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition">Experienced Drivers</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition">Safe & Hassle-Free Rides</a></li>
          </ul>
        </div>

        {/* Newsletter & Contact */}
        <div>
          <h3 className="text-white font-extrabold text-lg mb-4">Newsletter</h3>
          <p className="text-white/70 text-sm mb-4">
            Subscribe for latest offers, exclusive discounts, and updates from First Paris Transfer.
          </p>
          <form className="flex gap-2 mb-6">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 rounded-xl border border-black/20 bg-white/10 text-white/80 placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-500 transition"
            />
            <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl transition">
              Subscribe
            </button>
          </form>
          <h3 className="text-white font-extrabold text-lg mb-4">Contact</h3>
          <p className="text-white/70 text-sm leading-relaxed">
            Phone: +33 1 23 45 67 89<br />
            Email: info@firstparistransfer.com<br />
            Address: Paris, France
          </p>
        </div>
      </div>

      <div className="mt-12 text-center text-white/50 text-sm">
        © 2025 First Paris Transfer. All rights reserved.
      </div>
    </footer>
  );
}
