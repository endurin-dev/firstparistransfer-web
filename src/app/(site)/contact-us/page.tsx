// app/contact/page.tsx
'use client';

import { useState } from "react";
import { Fraunces, Work_Sans, IBM_Plex_Mono } from "next/font/google";
import {
  Phone,
  Mail,
  MessageCircle,
  Send,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Star,
  ShieldCheck,
  Plane,
  Plus,
  Minus,
} from "lucide-react";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const INK = "#14181B";
const PAPER = "#F6F2E9";
const CREAM = "#FBF7EE";
const BRASS = "#A9832E";
const BRASS_DEEP = "#7C5F1F";
const BRASS_LIGHT = "#D3B368";
const LINE = "#DED6C2";
const SLATE = "#55524A";

const faqs = [
  {
    question: "How fast will I get a response?",
    answer:
      "WhatsApp replies come back in minutes, day or night. Email is answered within five.",
  },
  {
    question: "Do you operate 24/7?",
    answer:
      "Yes. Dispatch runs around the clock, including holidays and red-eye landings.",
  },
  {
    question: "Are there hidden fees?",
    answer:
      "The fare we quote is the fare you pay. Tolls, waiting time, and luggage are included.",
  },
  {
    question: "Can I change my booking?",
    answer:
      "Message us any time before pickup and we'll adjust the time, route, or car at no charge.",
  },
];

const barWidths = [2, 1, 3, 1, 1, 4, 2, 1, 3, 1, 2, 1, 4, 1, 2, 3, 1, 1, 2, 4, 1, 3, 1, 2, 1, 1, 3];

export default function ContactPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  return (
    <div
      className={`${display.variable} ${body.variable} ${mono.variable} min-h-screen`}
      style={{ backgroundColor: PAPER, fontFamily: "var(--font-body)" }}
    >
      {/* HERO */}
      <section className="relative h-screen flex items-end overflow-hidden" style={{ backgroundColor: INK }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          poster="/images/contact.webp"
        >
          <source src="/videos/paris-night.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${INK}CC 0%, ${INK}55 45%, ${INK}F2 100%)`,
          }}
        />

        <div className="relative z-10 w-full px-6 md:px-12 pb-16 md:pb-20 max-w-6xl mx-auto">
          <p
            className="font-[family-name:var(--font-mono)] text-xs md:text-sm tracking-[0.28em] uppercase mb-6"
            style={{ color: BRASS_LIGHT }}
          >
            Paris &middot; Private Transfers &middot; 24/7 Dispatch
          </p>
          <h1
            className="font-[family-name:var(--font-display)] text-white text-4xl sm:text-5xl md:text-7xl leading-[1.05] mb-8 max-w-3xl"
            style={{ fontWeight: 500 }}
          >
            Your driver is already
            <br />
            <span style={{ fontStyle: "italic", fontWeight: 400 }}>watching your flight.</span>
          </h1>
          <p className="text-white/75 text-lg md:text-xl font-light mb-10 max-w-xl">
            Fixed prices. Real drivers. No surprises at the curb.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://wa.me/336767001122"
              className="px-10 py-4 rounded-sm font-medium flex items-center justify-center gap-3 transition-colors"
              style={{ backgroundColor: BRASS, color: INK }}
            >
              <MessageCircle className="w-5 h-5" />
              Message on WhatsApp
            </a>
            <a
              href="tel:+33767001122"
              className="px-10 py-4 rounded-sm font-medium flex items-center justify-center gap-3 border transition-colors text-white"
              style={{ borderColor: "rgba(255,255,255,0.35)" }}
            >
              <Phone className="w-5 h-5" />
              +33 7 67 00 11 22
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT STUBS */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto">
        <div
          className="grid md:grid-cols-3 -mt-px border-t md:border-t-0"
          style={{ borderColor: LINE }}
        >
          {[
            {
              icon: MessageCircle,
              eyebrow: "Fastest",
              title: "WhatsApp",
              detail: "+33 7 67 00 11 22",
              note: "Usually under 60 seconds",
              cta: "Start chat",
              href: "https://wa.me/336767001122",
            },
            {
              icon: Phone,
              eyebrow: "Direct",
              title: "Phone",
              detail: "+33 7 67 00 11 22",
              note: "Speak with our Paris team",
              cta: "Call now",
              href: "tel:+33767001122",
            },
            {
              icon: Mail,
              eyebrow: "Written",
              title: "Email",
              detail: "booking@paris-transfer.com",
              note: "We reply within 5 minutes",
              cta: "Send email",
              href: "mailto:booking@paris-transfer.com",
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className="p-10 border-b md:border-b-0 md:border-t-2"
              style={{
                borderColor: LINE,
                borderTopColor: BRASS,
                borderLeft: i > 0 ? `1px dashed ${LINE}` : undefined,
              }}
            >
              <p
                className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.24em] uppercase mb-6"
                style={{ color: BRASS_DEEP }}
              >
                {item.eyebrow}
              </p>
              <item.icon className="w-7 h-7 mb-5" style={{ color: INK }} strokeWidth={1.5} />
              <h3
                className="font-[family-name:var(--font-display)] text-2xl mb-1"
                style={{ color: INK }}
              >
                {item.title}
              </h3>
              <p className="text-base font-medium mb-1" style={{ color: INK }}>
                {item.detail}
              </p>
              <p className="text-sm mb-6" style={{ color: SLATE }}>
                {item.note}
              </p>
              <a
                href={item.href}
                className="inline-flex items-center gap-2 text-sm font-medium pb-1 border-b"
                style={{ color: BRASS_DEEP, borderColor: BRASS_DEEP }}
              >
                {item.cta} &rarr;
              </a>
            </div>
          ))}
        </div>

        {/* social row */}
        <div
          className="flex items-center justify-between flex-wrap gap-4 py-6 border-b"
          style={{ borderColor: LINE }}
        >
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] uppercase" style={{ color: SLATE }}>
            Follow the ride
          </p>
          <div className="flex gap-5">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
              <a href="#" key={i} style={{ color: SLATE }} className="hover:opacity-70 transition-opacity">
                <Icon className="w-5 h-5" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING TICKET + MAP */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto py-24 md:py-32">
        <p
          className="font-[family-name:var(--font-mono)] text-xs tracking-[0.28em] uppercase mb-4"
          style={{ color: BRASS_DEEP }}
        >
          Book your transfer
        </p>
        <h2
          className="font-[family-name:var(--font-display)] text-3xl md:text-5xl mb-12 max-w-xl"
          style={{ color: INK }}
        >
          One message. A price in <span style={{ fontStyle: "italic" }}>sixty seconds.</span>
        </h2>

        <div
          className="relative rounded-md overflow-visible shadow-sm"
          style={{ backgroundColor: CREAM, border: `1px solid ${LINE}` }}
        >
          <div className="grid md:grid-cols-[1fr_28px_300px]">
            {/* main ticket / form */}
            <div className="p-8 md:p-12">
              <div
                className="flex items-center justify-between pb-6 mb-8 border-b"
                style={{ borderColor: LINE }}
              >
                <div className="flex items-center gap-3">
                  <Plane className="w-5 h-5" style={{ color: BRASS_DEEP }} strokeWidth={1.5} />
                  <span
                    className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] uppercase"
                    style={{ color: SLATE }}
                  >
                    Carrier: Paris Transfer
                  </span>
                </div>
                <span
                  className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] uppercase"
                  style={{ color: BRASS_DEEP }}
                >
                  Class: Private
                </span>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <label className="block">
                    <span
                      className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.18em] uppercase block mb-2"
                      style={{ color: SLATE }}
                    >
                      Passenger name
                    </span>
                    <input
                      placeholder="Jane Dupont"
                      required
                      className="w-full px-0 py-3 border-0 border-b bg-transparent focus:outline-none"
                      style={{ borderColor: LINE, color: INK }}
                    />
                  </label>
                  <label className="block">
                    <span
                      className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.18em] uppercase block mb-2"
                      style={{ color: SLATE }}
                    >
                      Email
                    </span>
                    <input
                      placeholder="jane@email.com"
                      required
                      className="w-full px-0 py-3 border-0 border-b bg-transparent focus:outline-none"
                      style={{ borderColor: LINE, color: INK }}
                    />
                  </label>
                </div>
                <label className="block">
                  <span
                    className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.18em] uppercase block mb-2"
                    style={{ color: SLATE }}
                  >
                    WhatsApp / phone
                  </span>
                  <input
                    placeholder="+33 6 00 00 00 00"
                    required
                    className="w-full px-0 py-3 border-0 border-b bg-transparent focus:outline-none"
                    style={{ borderColor: LINE, color: INK }}
                  />
                </label>
                <label className="block">
                  <span
                    className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.18em] uppercase block mb-2"
                    style={{ color: SLATE }}
                  >
                    Journey details
                  </span>
                  <textarea
                    rows={4}
                    placeholder="Dates, pickup, destination, passengers..."
                    className="w-full px-0 py-3 border-0 border-b bg-transparent focus:outline-none resize-none"
                    style={{ borderColor: LINE, color: INK }}
                  />
                </label>
                <button
                  className="w-full font-medium text-base py-4 rounded-sm flex items-center justify-center gap-3 transition-colors mt-2"
                  style={{ backgroundColor: INK, color: PAPER }}
                >
                  <Send className="w-5 h-5" />
                  Request a quote
                </button>
              </form>
            </div>

            {/* perforation */}
            <div className="relative hidden md:block">
              <div
                className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l-2 border-dashed"
                style={{ borderColor: LINE }}
              />
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full"
                style={{ backgroundColor: PAPER }}
              />
              <div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full"
                style={{ backgroundColor: PAPER }}
              />
            </div>

            {/* stub */}
            <div
              className="p-8 md:p-10 flex flex-col justify-between border-t md:border-t-0"
              style={{ borderColor: LINE }}
            >
              <div>
                <p
                  className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] uppercase mb-5"
                  style={{ color: BRASS_DEEP }}
                >
                  Your journey
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Meet and greet included",
                    "Flight tracked automatically",
                    "Fixed fare confirmed by SMS",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-3 text-sm" style={{ color: SLATE }}>
                      <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0" style={{ color: BRASS_DEEP }} strokeWidth={1.5} />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-end gap-[2px] mb-3">
                  {barWidths.map((w, i) => (
                    <div
                      key={i}
                      style={{ width: `${w}px`, backgroundColor: INK }}
                      className="h-9"
                    />
                  ))}
                </div>
                <p
                  className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.14em] uppercase"
                  style={{ color: SLATE }}
                >
                  Valid for one journey &middot; Paris Transfer
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* map */}
        <div
          className="mt-8 rounded-md overflow-hidden h-[420px]"
          style={{ border: `1px solid ${LINE}` }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.991625977!2d2.2922926155095!3d48.8583700792875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34f4d%3A0x8ddca1ee9e2d8448!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(0.3) contrast(1.05)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-12 max-w-3xl mx-auto py-24 md:py-32">
        <p
          className="font-[family-name:var(--font-mono)] text-xs tracking-[0.28em] uppercase mb-4"
          style={{ color: BRASS_DEEP }}
        >
          Good to know
        </p>
        <h2
          className="font-[family-name:var(--font-display)] text-3xl md:text-5xl mb-12"
          style={{ color: INK }}
        >
          Questions, answered.
        </h2>
        <div className="border-t" style={{ borderColor: LINE }}>
          {faqs.map((faq, index) => {
            const open = openFAQ === index;
            return (
              <div key={index} className="border-b" style={{ borderColor: LINE }}>
                <button
                  className="w-full py-6 text-left flex justify-between items-center gap-6"
                  onClick={() => setOpenFAQ(open ? null : index)}
                >
                  <span
                    className="font-[family-name:var(--font-display)] text-xl md:text-2xl"
                    style={{ color: INK }}
                  >
                    {faq.question}
                  </span>
                  <span
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center border"
                    style={{ borderColor: BRASS_DEEP, color: BRASS_DEEP }}
                  >
                    {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                {open && (
                  <p className="pb-6 pr-14 text-base leading-relaxed" style={{ color: SLATE }}>
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* TRUST MANIFEST */}
      <section className="py-16 md:py-20" style={{ backgroundColor: INK }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
            {[
              { icon: Clock, label: "24/7 dispatch" },
              { icon: Star, label: "5.0 · Google & Trustpilot" },
              { icon: ShieldCheck, label: "10,000+ passengers carried" },
              { icon: Send, label: "Fixed fares, no surprises" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center gap-3">
                <item.icon className="w-6 h-6" style={{ color: BRASS_LIGHT }} strokeWidth={1.5} />
                <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.12em] uppercase text-white/80">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}