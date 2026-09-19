"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Wrench, X, Sparkles, ZoomIn } from "lucide-react";
import { GALLERY_ITEMS, GalleryItem } from "@/lib/constants";

type CategoryFilter = "All" | "AC" | "Refrigerator" | "Washing Machine" | "RO" | "Geyser" | "TV";

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories: CategoryFilter[] = [
    "All",
    "AC",
    "Refrigerator",
    "Washing Machine",
    "RO",
    "Geyser",
    "TV",
  ];

  const filteredItems =
    selectedCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#0F2C59] text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" /> Verified Workmanship
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2C59] tracking-tight">
            Our Recent Work
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            Take a look at genuine photos from our recent on-site diagnostic, maintenance,
            and repair assignments across residential communities.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              type="button"
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#0F2C59] text-white shadow-md shadow-blue-900/20 scale-105"
                  : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative h-60 w-full overflow-hidden bg-slate-200">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-[#0F2C59] flex items-center justify-center shadow-lg">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>

                {/* Category Badge */}
                <span className="absolute top-3 left-3 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white border border-white/20">
                  {item.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#0F2C59] group-hover:text-[#EA580C] transition-colors mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-600">
                    <Wrench className="w-3.5 h-3.5" /> Doorstep Servicing
                  </span>
                  <span className="group-hover:text-[#EA580C] transition-colors">
                    Click to enlarge →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxItem && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxItem(null)}
          >
            <div
              className="relative bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-80 sm:h-96 w-full">
                <Image
                  src={lightboxItem.image}
                  alt={lightboxItem.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <div className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-orange-100 text-orange-800 mb-2">
                  {lightboxItem.category} Repair
                </div>
                <h3 className="text-xl font-bold text-[#0F2C59] mb-2">{lightboxItem.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {lightboxItem.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
