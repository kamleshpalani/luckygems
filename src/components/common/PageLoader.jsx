import React from "react";
import { Star } from "lucide-react";

export default function PageLoader() {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "#090112" }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-maroon-200" />
          <div className="absolute inset-0 rounded-full border-2 border-t-maroon-500 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Star size={16} className="text-gold-400" fill="currentColor" />
          </div>
        </div>
        <p className="text-stone-400 text-sm font-medium tracking-wide">
          Loading…
        </p>
      </div>
    </div>
  );
}
