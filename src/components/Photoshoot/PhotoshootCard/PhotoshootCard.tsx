import type { Dispatch, SetStateAction } from "react";
import type { Photoshoot } from "../types";

type Props = {
  photoshoot: Photoshoot;
  setSelectedPhotoshoot: Dispatch<SetStateAction<Photoshoot | null>>;
};
const PhotoshootCard = ({ photoshoot, setSelectedPhotoshoot }: Props) => {
  return (
    <div className="animate-slide-down animate-delay-1" key={photoshoot._id}>
      <button
        onClick={() => setSelectedPhotoshoot(photoshoot)}
        className="group relative w-full aspect-3/4 overflow-hidden rounded-sm cursor-pointer text-left"
      >
        {/* Image */}
        <img
          src={`${photoshoot.images[0].url}?w=720&fit=crop&auto=format&q=80`}
          alt={photoshoot.images[0].alt}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h3 className="heading-display text-2xl md:text-3xl text-foreground group-hover:text-accent transition-colors duration-300">
            {photoshoot.title}
          </h3>
          {photoshoot.description && (
            <p className="mt-2 text-sm text-muted-foreground">
              {photoshoot.description}
            </p>
          )}
          <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/60 group-hover:text-accent/80 transition-colors">
            <span>{photoshoot.images.length} fotos</span>
            <span className="w-4 h-px bg-current" />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Ver galería
            </span>
          </div>
        </div>

        {/* Hover Border Effect */}
        <div className="absolute inset-0 border border-foreground/0 group-hover:border-foreground/20 transition-colors duration-500 rounded-sm" />
      </button>
    </div>
  );
};

export default PhotoshootCard;
