import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

type Photoshoot = {
  _id: string;
  title: string;
  description?: string;
  images: {
    _key: string;
    alt: string;
    url: string;
  }[];
};

interface PhotoshootModalProps {
  photoshoot: Photoshoot | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoshootModal = ({
  photoshoot,
  isOpen,
  onClose,
}: PhotoshootModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setCurrentIndex(0);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !photoshoot) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, photoshoot, currentIndex]);

  if (!photoshoot) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? photoshoot.images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === photoshoot.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-3 text-foreground/60 hover:text-foreground transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
              <use href="/icons-sprite.svg#close-icon"></use>
            </svg>
          </button>

          {/* Content */}
          <div
            className="relative w-full h-full flex flex-col items-center justify-center px-4 md:px-20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="absolute top-6 left-6 md:left-20"
            >
              <h3 className="heading-display text-2xl md:text-3xl text-foreground">
                {photoshoot.title}
              </h3>
              {photoshoot.description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {photoshoot.description}
                </p>
              )}
            </motion.div>

            {/* Main Image */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative max-h-[70vh] max-w-full"
            >
              <img
                src={`${photoshoot.images[currentIndex].url}?w=1200&fit=crop&auto=format&q=80`}
                alt={`${photoshoot.title} - Image ${currentIndex + 1}`}
                className="max-h-[70vh] max-w-full object-contain rounded-sm shadow-2xl"
              />
            </motion.div>

            {/* Navigation */}
            <div className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2">
              <button
                onClick={handlePrev}
                className="p-3 text-foreground/40 hover:text-foreground transition-colors"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                  <use href="/icons-sprite.svg#chevron-left"></use>
                </svg>
              </button>
            </div>

            <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2">
              <button
                onClick={handleNext}
                className="p-3 text-foreground/40 hover:text-foreground transition-colors"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                  <use href="/icons-sprite.svg#chevron-right"></use>
                </svg>
              </button>
            </div>

            {/* Thumbnails */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="absolute bottom-8 flex gap-3"
            >
              {photoshoot.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative w-16 h-20 md:w-20 md:h-24 overflow-hidden rounded-sm transition-all duration-300 ${
                    index === currentIndex
                      ? "ring-2 ring-accent opacity-100"
                      : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <img
                    src={`${image.url}?w=120&fit=crop&auto=format&q=80`}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-8 right-6 md:right-20 text-sm text-muted-foreground">
              {currentIndex + 1} / {photoshoot.images.length}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
