// src/app/components/FAQ.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What types of Paris tours do you offer?",
    answer:
      "We offer private chauffeur-driven tours across Paris including iconic landmarks like the Eiffel Tower, Louvre Museum, Notre-Dame, Montmartre, and custom luxury city tours tailored to your schedule.",
  },
  {
    question: "Can I book a tour from Paris airports?",
    answer:
      "Yes! We provide premium airport transfers from CDG, Orly, and Beauvais airports directly to your hotel or starting point of your Paris tour with comfort and punctuality.",
  },
  {
    question: "Are your chauffeurs experienced and licensed?",
    answer:
      "Absolutely. All our drivers are fully licensed, insured, and highly experienced in providing luxury transportation throughout Paris and surrounding regions.",
  },
  {
    question: "Do you provide tours for Disneyland Paris?",
    answer:
      "Yes, we offer private tours and transfers to Disneyland® Paris, ensuring you enjoy a hassle-free day with punctual pick-ups and drop-offs.",
  },
  {
    question: "Can I customize my Paris city tour?",
    answer:
      "Certainly! You can choose the landmarks you want to visit, the duration of the tour, and even request multiple stops. Our chauffeurs will ensure your tour is seamless and luxurious.",
  },
  {
    question: "Are child seats available for families?",
    answer:
      "Yes, we provide free child seats on request to ensure your children are safe and comfortable throughout the tour.",
  },
  {
    question: "Is there free cancellation?",
    answer:
      "Yes, you can cancel free of charge up to 24 hours before your scheduled tour or transfer.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background glassy shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-black">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-black/70">
            Get answers to common questions about our Paris tours and luxury chauffeur services
          </p>
        </div>

        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white/20 backdrop-blur-3xl border border-black/10 rounded-3xl p-6 shadow-2xl cursor-pointer transition-all hover:shadow-xl"
              onClick={() => toggle(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-black font-bold text-lg">{faq.question}</h3>
                <ChevronDown
                  className={`w-6 h-6 text-yellow-500 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>
              <div
                className={`mt-4 text-black/90 text-sm overflow-hidden transition-all duration-500 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
