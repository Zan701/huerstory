"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

interface GalleryItem {
  src: string;
  alt: string;
  tag: string;
  span: "tall" | "wide" | "normal";
}

const galleryItems: GalleryItem[] = [
  {
    src: "/gallery/wedding.jpg",
    alt: "Wedding reception first dance",
    tag: "Wedding",
    span: "tall",
  },
  {
    src: "/gallery/birthday.jpg",
    alt: "Birthday celebration with friends",
    tag: "Birthday",
    span: "wide",
  },
  {
    src: "/gallery/engagement.jpg",
    alt: "Engagement portrait in garden",
    tag: "Engagement",
    span: "tall",
  },
  {
    src: "/gallery/corporate.jpg",
    alt: "Corporate conference event",
    tag: "Corporate",
    span: "wide",
  },
  {
    src: "/gallery/party.jpg",
    alt: "Outdoor garden party celebration",
    tag: "Party",
    span: "tall",
  },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  return (
    <>
      <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <p className="text-brand-navy/60 font-medium tracking-wide uppercase text-sm">
            Our work speaks louder
          </p>
          <h2 className="font-accent text-5xl md:text-6xl text-brand-pink">
            Captured Moments
          </h2>
          <p className="max-w-lg mx-auto text-sm text-brand-navy/60">
            Every event is a unique story. Here are some moments we&apos;ve had the
            privilege of documenting.
          </p>
        </motion.div>

        {/* Masonry-style Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="break-inside-avoid group cursor-pointer relative rounded-2xl overflow-hidden"
              onClick={() => setLightbox(item)}
            >
              <div
                className={`relative w-full ${
                  item.span === "tall"
                    ? "aspect-[3/4]"
                    : item.span === "wide"
                    ? "aspect-[4/3]"
                    : "aspect-square"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/40 transition-all duration-300 flex items-end">
                  <div className="p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="inline-block px-3 py-1 rounded-full bg-brand-pink/90 text-white text-xs font-medium backdrop-blur-sm">
                      {item.tag}
                    </span>
                    <p className="text-white/90 text-sm mt-2 font-medium">
                      {item.alt}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setLightbox(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-4xl w-full max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full h-[75vh] rounded-2xl overflow-hidden">
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            <div className="text-center mt-4">
              <span className="inline-block px-3 py-1 rounded-full bg-brand-pink/90 text-white text-xs font-medium">
                {lightbox.tag}
              </span>
              <p className="text-white/70 text-sm mt-2">{lightbox.alt}</p>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
