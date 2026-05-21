import { useState } from "react";
import { Car, ChevronLeft, ChevronRight } from "lucide-react";

type CarImageGalleryProps = {
  carName: string;
  images: string[];
};

export function CarImageGallery({ carName, images }: CarImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const count = images.length;

  if (count === 0) {
    return (
      <div className="relative aspect-[5/3] max-h-48 rounded-xl overflow-hidden bg-gradient-to-br from-muted via-gold-soft/40 to-accent border border-border">
        <div className="absolute inset-0 grid place-items-center text-navy/20">
          <Car className="h-16 w-16" strokeWidth={1} />
        </div>
        <span className="absolute bottom-2 left-0 right-0 text-center text-xs font-semibold text-navy/50">
          Photos coming soon
        </span>
      </div>
    );
  }

  const goPrev = () => setActiveIndex((i) => (i === 0 ? count - 1 : i - 1));
  const goNext = () => setActiveIndex((i) => (i === count - 1 ? 0 : i + 1));

  return (
    <div className="space-y-2">
      <div className="relative aspect-[5/3] max-h-52 rounded-xl overflow-hidden bg-muted border border-border">
        <img
          src={images[activeIndex]}
          alt={`${carName} — photo ${activeIndex + 1}`}
          className="h-full w-full object-cover"
        />

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/90 border border-border shadow-premium grid place-items-center text-navy hover:bg-white transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/90 border border-border shadow-premium grid place-items-center text-navy hover:bg-white transition-all"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="flex gap-1.5 overflow-x-auto pb-0.5">
          {images.map((src, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={src}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`${carName} image ${index + 1}`}
                aria-current={active}
                className={`relative shrink-0 h-11 w-16 rounded-md overflow-hidden border-2 transition-all ${
                  active ? "border-gold ring-1 ring-gold/30" : "border-border hover:border-gold/50"
                }`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
