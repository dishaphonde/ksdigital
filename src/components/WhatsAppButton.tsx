"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export default function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 group flex items-center">
      {/* Tooltip */}
      <span className="hidden sm:inline-block pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900 text-white text-xs font-medium py-1.5 px-3 rounded-lg mr-3 shadow-xl border border-white/10 whitespace-nowrap">
        Chat with Ketan Sawant
      </span>

      <a
        href="https://wa.me/917276503159"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat directly on WhatsApp with Ketan Sawant"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>
    </div>
  );
}
