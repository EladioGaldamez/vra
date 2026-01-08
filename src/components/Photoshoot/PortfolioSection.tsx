import { useRef, useState } from "react";
import { PhotoshootModal } from "./PhotoshootModal";
import PhotoshootCard from "./PhotoshootCard";
import type { Photoshoot } from "./types";

type Props = {
  title: string;
  heading: string;
  photoshoots: Photoshoot[];
};

const PortfolioSection = ({ title, heading, photoshoots }: Props) => {
  const ref = useRef(null);
  const [selectedPhotoshoot, setSelectedPhotoshoot] =
    useState<Photoshoot | null>(null);

  return (
    <>
      <section id="book" className="py-32 bg-secondary/30" ref={ref}>
        <div className="container mx-auto px-6">
          <div className="animate-slide-down text-center mb-20">
            <span className="text-xs uppercase tracking-[0.3em] text-accent">
              {heading}
            </span>
            <h2 className="mt-4 heading-display text-5xl md:text-6xl lg:text-7xl text-foreground">
              {title}
            </h2>
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {photoshoots
              .filter((photoshoot) => photoshoot.images.length > 0)
              .map((photoshoot, index) => (
                <PhotoshootCard
                  key={index}
                  photoshoot={photoshoot}
                  setSelectedPhotoshoot={setSelectedPhotoshoot}
                />
              ))}
          </div>
        </div>
      </section>

      {selectedPhotoshoot && (
        <PhotoshootModal
          photoshoot={selectedPhotoshoot}
          isOpen={!!selectedPhotoshoot}
          onClose={() => setSelectedPhotoshoot(null)}
        />
      )}
    </>
  );
};

export default PortfolioSection;
