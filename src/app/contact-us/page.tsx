// app/contact/page.tsx
'use client';

import { Phone, Mail, MessageCircle, Send, Clock, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How fast will I get a response?",
    answer: "We reply instantly on WhatsApp and usually respond within 5 minutes via email."
  },
  {
    question: "Do you operate 24/7?",
    answer: "Yes! Our team is available around the clock to help with bookings and inquiries."
  },
  {
    question: "Are there hidden fees?",
    answer: "No hidden fees. The price you see is the price you pay."
  },
  {
    question: "Can I change my booking?",
    answer: "Yes! You can modify your booking at any time by contacting us directly."
  },
];

export default function ContactPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/contact.webp"
        >
          <source src="/videos/paris-night.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        <div className="relative text-center text-white px-6 max-w-6xl mx-auto z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">We’re Here 24/7</h1>
          <p className="text-xl md:text-2xl font-light mb-10 text-white-800">Instant reply • Real humans • Same-minute quotes</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="https://wa.me/336767001122"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-5 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-3 transition-all hover:scale-105"
            >
              <MessageCircle className="w-8 h-8" />
              WhatsApp Now
            </a>
            <a
              href="tel:+33767001122"
              className="bg-gray-100 hover:bg-gray-200 text-black px-12 py-5 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-3 transition-all hover:scale-105"
            >
              <Phone className="w-8 h-8" />
              Call +33 7 67 00 11 22
            </a>
          </div>
        </div>
      </section>

      {/* Floating Glass Contact Cards */}
      <section className="relative -mt-32 px-6 max-w-7xl mx-auto mb-32">
        <div className="backdrop-blur-2xl bg-white/90 border border-gray-200 rounded-3xl shadow-xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-emerald-500 via-emerald-400 to-yellow-500" />
          <div className="grid lg:grid-cols-3">
            <div className="p-12 text-center border-r border-gray-200">
              <div className="w-24 h-24 bg-emerald-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-md">
                <MessageCircle className="w-14 h-14 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-black">WhatsApp</h3>
              <p className="text-3xl font-extrabold text-emerald-600 mb-2">+33 7 67 00 11 22</p>
              <p className="text-gray-700 mb-6">Fastest response — usually under 60 seconds</p>
              <a
                href="https://wa.me/336767001122"
                className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-emerald-700 transition shadow-md inline-block"
              >
                Start Chat
              </a>
            </div>

            <div className="p-12 text-center border-r border-gray-200 bg-gradient-to-br from-emerald-50 to-transparent">
              <div className="w-24 h-24 bg-black rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-md">
                <Phone className="w-14 h-14 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-black">Phone</h3>
              <p className="text-3xl font-extrabold mb-2 text-black">+33 7 67 00 11 22</p>
              <p className="text-gray-700 mb-6">Speak directly with our Paris team</p>
              <a
                href="tel:+33767001122"
                className="bg-black text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-gray-900 transition shadow-md inline-block"
              >
                Call Now
              </a>
            </div>

            <div className="p-12 text-center">
              <div className="w-24 h-24 bg-emerald-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-md">
                <Mail className="w-14 h-14 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-black">Email</h3>
              <p className="text-lg font-medium mb-2 text-black">booking@paris-transfer.com</p>
              <p className="text-gray-700 mb-4">We reply in under 5 minutes</p>

              {/* Social Media */}
            <div className="flex justify-center gap-6 mt-4">
  <a href="#" className="text-blue-600 hover:text-blue-800">
    <Facebook className="w-8 h-8" />
  </a>
  <a href="#" className="text-pink-500 hover:text-pink-700">
    <Instagram className="w-8 h-8" />
  </a>
  <a href="#" className="text-blue-400 hover:text-blue-600">
    <Twitter className="w-8 h-8" />
  </a>
  <a href="#" className="text-blue-700 hover:text-blue-900">
    <Linkedin className="w-8 h-8" />
  </a>
  <a href="https://wa.me/336767001122" className="text-green-600 hover:text-green-800">
    <MessageCircle className="w-8 h-8" />
  </a>
</div>

            </div>
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="px-6 max-w-7xl mx-auto mb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="backdrop-blur-2xl bg-white/90 border border-gray-200 rounded-3xl p-12 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">Get Your Quote in 60 Seconds</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input placeholder="Name*" className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-emerald-600 focus:outline-none text-black" required />
                <input placeholder="Email*" className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-emerald-600 focus:outline-none text-black" required />
              </div>
              <input placeholder="Phone / WhatsApp*" className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-emerald-600 focus:outline-none text-black" required />
              <textarea
                rows={5}
                placeholder="Tell us your dates, pickup, destination, passengers..."
                className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-emerald-600 focus:outline-none text-black resize-none"
              />
              <button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold text-lg py-4 rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition shadow-lg flex items-center justify-center gap-3">
                <Send className="w-6 h-6" />
                Get Instant Quote
              </button>
            </form>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl h-[520px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.991625977!2d2.2922926155095!3d48.8583700792875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34f4d%3A0x8ddca1ee9e2d8448!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 max-w-5xl mx-auto mb-32">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-10 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <button
                className="w-full px-6 py-4 text-left text-black font-semibold flex justify-between items-center"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                {faq.question}
                <span className="text-2xl">{openFAQ === index ? "−" : "+"}</span>
              </button>
              {openFAQ === index && (
                <div className="px-6 py-4 text-gray-700 bg-gray-50">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            <div>
              <Clock className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
              <p className="text-sm font-semibold text-black">24/7 Support</p>
            </div>
            <div>
              <p className="text-lg font-bold text-black">5.0 stars</p>
              <p className="text-xs text-gray-700 mt-1">Google & Trustpilot</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-600">10,000+</p>
              <p className="text-sm font-semibold text-black mt-1">Happy Clients</p>
            </div>
            <div>
              <Send className="w-8 h-8 mx-auto mb-2 text-emerald-600 -rotate-12" />
              <p className="text-sm font-semibold text-black">Instant Booking</p>
            </div>
            <div>
              <span className="text-2xl font-bold text-black">€</span>
              <p className="text-sm font-semibold text-black mt-1">No Hidden Fees</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
