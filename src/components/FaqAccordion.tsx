"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.id || index}
            className={`glass-card transition-all duration-200 overflow-hidden ${
              isOpen ? "border-brand-blue/30 shadow-glowSm" : "hover:border-white/20"
            }`}
          >
            <button
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className="w-full px-6 py-5 flex items-center justify-between text-left font-heading font-semibold text-base sm:text-lg text-foreground gap-4"
            >
              <span>{item.question}</span>
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-brand-blue transition-transform">
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-6 pt-1 text-muted text-sm sm:text-base leading-relaxed border-t border-white/5">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
