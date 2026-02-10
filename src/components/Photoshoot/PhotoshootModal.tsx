import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Swiper,
  SwiperSlide,
  type SwiperClass as SwiperType,
} from "swiper/react";
import SwiperCore from "swiper";
import { Mousewheel, Navigation, FreeMode } from "swiper/modules";
import type { Photoshoot } from "./types";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/mousewheel";

interface PhotoshootModalProps {
  photoshoot: Photoshoot | null;
  isOpen: boolean;
  onClose: () => void;
}

SwiperCore.use([Mousewheel, Navigation, FreeMode]);

export const PhotoshootModal = ({
  photoshoot,
  isOpen,
  onClose,
}: PhotoshootModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [isNavLoaded, setNavLoaded] = useState(false);

  // Refs
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !photoshoot) return;
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, photoshoot]);

  useEffect(() => {
    if (prevRef.current && nextRef.current) {
      setNavLoaded(true);
    }
  }, [prevRef, nextRef]);

  if (!photoshoot) return null;

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
              className="w-full p-6"
            >
              <h3 className="heading-display text-2xl md:text-3xl text-foreground">
                {photoshoot.title} - {isNavLoaded ? "true" : "false"}
              </h3>
              {photoshoot.description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {photoshoot.description}
                </p>
              )}
            </motion.div>

            {/* Main Image */}
            <div className="flex-1 w-full lg:w-1/3 h-[70vh] mx-auto">
              {isNavLoaded && (
                <Swiper
                  onSwiper={setSwiper}
                  loop={true}
                  slidesPerView={1}
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                  onRealIndexChange={(swiper) =>
                    setCurrentIndex(swiper.realIndex)
                  }
                  thumbs={{ swiper: thumbsSwiper ?? undefined }}
                  className="h-[70vh]"
                >
                  {photoshoot.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={`${image.url}?w=1200&fit=crop&auto=format&q=80`}
                        alt={image.alt || ""}
                        className="w-full h-full object-contain rounded-sm shadow-2xl"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>

            {/* Navigation */}
            <div className="absolute left-4 md:left-10 top-1/2 z-20 -translate-y-1/2">
              <button
                className="p-3 text-foreground/40 hover:text-foreground transition-colors"
                aria-label="Previous image"
                ref={prevRef}
              >
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                  <use href="/icons-sprite.svg#chevron-left"></use>
                </svg>
              </button>
            </div>

            <div className="absolute right-4 md:right-10 top-1/2 z-20 -translate-y-1/2">
              <button
                className="p-3 text-foreground/40 hover:text-foreground transition-colors"
                aria-label="Next image"
                ref={nextRef}
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
              className="flex gap-3 w-2/3 lg:w-1/3 mx-auto"
            >
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={false}
                slidesPerView={
                  photoshoot.images.length > 3 ? 3 : photoshoot.images.length
                }
                spaceBetween={2}
                breakpoints={{
                  768: {
                    slidesPerView:
                      photoshoot.images.length > 4
                        ? 4
                        : photoshoot.images.length,
                    spaceBetween: 5,
                  },
                  1024: {
                    slidesPerView:
                      photoshoot.images.length > 6
                        ? 6
                        : photoshoot.images.length,
                    spaceBetween: 10,
                  },
                }}
              >
                {photoshoot.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <button
                      className={`relative w-16 h-20 md:w-20 md:h-24 overflow-hidden rounded-sm transition-all duration-300 ${
                        index === currentIndex
                          ? "ring-2 ring-accent opacity-100"
                          : "opacity-40 hover:opacity-70"
                      }`}
                      onClick={() => swiper?.slideToLoop(index)}
                    >
                      <img
                        src={`${image.url}?w=120&fit=crop&auto=format&q=80`}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
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
