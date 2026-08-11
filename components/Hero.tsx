"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Hero() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const splitterRef = useRef<any>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Dynamic import to avoid SSR issues (animejs needs DOM)
    const initAnimation = async () => {
      const { splitText, createTimeline, stagger } = await import('animejs');

      // Use addEffect pattern - this is the idiomatic animejs v4 way
      // The effect function receives the splitter instance and runs after each split/re-split
      const splitter = splitText(textRef.current!, {
        words: { wrap: 'clip' },
        chars: true,
      });

      splitter.addEffect((self: any) => {
        const tl = createTimeline({
          defaults: { ease: 'inOut(1)', duration: 450 }
        });

        tl.add(self.words, {
          y: [($el: any) => +$el.dataset.line % 2 ? '100%' : '-100%', '0%'],
        }, stagger(125));

        return tl;
      });

      splitterRef.current = splitter;
    };

    initAnimation();

    return () => {
      // revert() disconnects ResizeObserver, reverts DOM, and cleans up effect animations
      if (splitterRef.current) {
        splitterRef.current.revert();
        splitterRef.current = null;
      }
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-white">
      {/* Decorative background circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-pink/10 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <h2 className="font-accent text-4xl md:text-6xl text-brand-navy mb-3">
            You Live The Moment,
          </h2>
          
          <h1 ref={textRef} className="text-4xl md:text-6xl font-bold text-brand-pink tracking-tight leading-tight">
            We Capture The Story.
          </h1>
          
          <p className="max-w-2xl mx-auto text-base md:text-lg text-brand-navy/80 mt-5">
            Elevate your special moments with professional event content creation. 
            We deliver raw, authentic, and ready-to-post memories for your social media.
          </p>
          
          <div className="pt-8">
            <Link 
              href="#booking"
              className="inline-block bg-brand-pink text-brand-navy px-6 py-3 rounded-full text-base font-semibold hover:bg-brand-pink/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Your Booking
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

