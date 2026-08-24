import React, { useEffect, useRef, useState } from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import heroImage from '../assets/collection/homedog.jpg';
import heroImage2 from '../assets/collection/ClickCollection2.jpg';
import heroImage3 from '../assets/collection/Clickcollection3.jpg';

const SLIDES = [heroImage, heroImage2, heroImage3];
const SLIDE_COUNT = SLIDES.length;
const AUTO_SLIDE_INTERVAL = 4000;

export const HeroBanner: React.FC<{ onExploreCollections: () => void }> = ({ onExploreCollections }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const previousSlideRef = useRef(0);

  const changeSlide = (updater: (prev: number) => number) => {
    setActiveSlide((prev) => {
      previousSlideRef.current = prev;
      return updater(prev);
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      changeSlide((prev) => (prev + 1) % SLIDE_COUNT);
    }, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const goToPrevSlide = () => changeSlide((prev) => (prev - 1 + SLIDE_COUNT) % SLIDE_COUNT);
  const goToNextSlide = () => changeSlide((prev) => (prev + 1) % SLIDE_COUNT);

  return (
    <section className="relative min-h-[520px] sm:min-h-[600px] flex items-center overflow-hidden bg-[#FAF8F5]">
      {/* A gentle left-side tint keeps the text readable without creating a card. */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, index) => {
          const isActive = index === activeSlide;
          const isPrevious = !isActive && index === previousSlideRef.current;
          const positionClass = isActive
            ? 'translate-x-0'
            : isPrevious
            ? '-translate-x-full'
            : 'translate-x-full';
          const transitionClass = isActive || isPrevious ? 'transition-transform duration-700 ease-in-out' : '';
          return (
            <img
              key={slide}
              src={slide}
              alt="Crafted collections for every lifestyle"
              className={`absolute inset-0 w-full h-full object-cover ${transitionClass} ${positionClass}`}
            />
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2C2623]/80 via-[#2C2623]/45 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-3 py-16 sm:py-20 w-full">
        <div className="flex flex-col gap-5 max-w-lg">
          <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-[#D99A78] uppercase">
            Handcrafted with Care
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-medium leading-[1.1]">
            Crafted Collections
            <br />
            for <em className="italic text-[#E9C2AF]">Every</em> Lifestyle
          </h1>
          <p className="font-sans text-sm sm:text-base text-white/85 leading-relaxed max-w-md">
            Thoughtfully designed home décor and pet essentials, inspired by nature and made for
            modern living.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={onExploreCollections}
              className="px-7 py-3 bg-[#A76043] hover:bg-[#8F533C] text-white font-button text-xs tracking-widest uppercase transition-colors cursor-pointer"
            >
              Explore Collections
            </button>
            <button className="flex items-center gap-2 font-sans text-xs font-bold tracking-widest uppercase text-white hover:text-[#E9C2AF] transition-colors cursor-pointer">
              <span className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center">
                <Play size={12} fill="currentColor" />
              </span>
              Watch Our Story
            </button>
          </div>

          {/* Slide indicator */}
          <div className="flex items-center gap-2 mt-6">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => changeSlide(() => index)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  index === activeSlide ? 'w-6 bg-white' : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Prev / next controls */}
      <button
        aria-label="Previous slide"
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-[#2C2623] hover:text-[#16294B] transition-colors cursor-pointer"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        aria-label="Next slide"
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/25 backdrop-blur-sm border border-white/50 shadow-md flex items-center justify-center text-white hover:bg-black/40 transition-colors cursor-pointer"
      >
        <ChevronRight size={18} />
      </button>
    </section>
  );
};
