"use client";

import { useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type InvestorCarouselSlide = {
  src: string;
  alt: string;
};

type InvestorGalleryCarouselProps = {
  slides: InvestorCarouselSlide[];
  className?: string;
};

export function InvestorGalleryCarousel({
  slides,
  className,
}: InvestorGalleryCarouselProps) {
  const [index, setIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length);
  }, [slides.length]);

  const count = slides.length;
  const current = slides[index];

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const endX = e.changedTouches[0].clientX;
    const diff = touchStartX - endX;
    if (Math.abs(diff) > 48) {
      if (diff > 0) goNext();
      else goPrev();
    }
    setTouchStartX(null);
  };

  if (!count || !current) return null;

  return (
    <div
      className={cn("mt-6 flex w-full justify-center", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Photo gallery"
    >
      <p className="sr-only">
        Slide {index + 1} of {count}
      </p>

      <div className="flex w-full max-w-md flex-col items-center">
        <div
          className="relative w-full"
          onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
          onTouchEnd={onTouchEnd}
        >
          <div className="flex min-h-[320px] max-h-[440px] w-full items-center justify-center overflow-hidden rounded-lg shadow-md sm:min-h-[360px]">
            <img
              key={current.src}
              src={current.src}
              alt={current.alt}
              className="max-h-[440px] w-full max-w-full object-contain"
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          </div>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/95 p-1.5 text-gray-800 shadow-md ring-1 ring-black/5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                aria-label="Previous image"
              >
                <ChevronLeft className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/95 p-1.5 text-gray-800 shadow-md ring-1 ring-black/5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                aria-label="Next image"
              >
                <ChevronRight className="size-4" aria-hidden />
              </button>
            </>
          )}
        </div>

        {count > 1 && (
          <div
            className="mt-3 flex flex-wrap justify-center gap-2"
            role="tablist"
            aria-label="Select slide"
          >
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                  i === index
                    ? "w-7 bg-blue-600"
                    : "w-2.5 bg-gray-300 hover:bg-gray-400"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
