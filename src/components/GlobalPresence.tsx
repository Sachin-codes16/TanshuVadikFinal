import React from 'react';
import worldMapImage from '../assets/About/mapimage.jpg';

export const GlobalPresence: React.FC = () => {
  return (
    <section id="presence" className="pt-0 pb-0 bg-[#F8F4F0]">
      <div className="w-full px-6 sm:px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* LEFT: Heading & CTA */}
        <div className="lg:col-span-4 flex flex-col items-start gap-4 px-6 sm:px-12 lg:px-0">
          <span className="font-sans text-[11px] font-bold tracking-[0.3em] text-[#8F533C] uppercase">
            GLOBAL NETWORK
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C2623] tracking-tight font-bold leading-none uppercase">
            GLOBAL PRESENCE.<br />
            LOCAL COMMITMENT.
          </h2>
          <p className="font-sans text-base text-[#5C544F] max-w-xs">
            Proudly manufacturing in India and serving buyers across the world.
          </p>
          <a
            href="#footer-root"
            className="mt-2 inline-block px-6 py-3 border border-[#2C2623] text-[#2C2623] hover:bg-[#2C2623] hover:text-white font-sans text-xs font-bold tracking-widest uppercase transition-colors"
          >
            View Our Global Network &rarr;
          </a>
        </div>

        {/* RIGHT: Route Map */}
        <div className="lg:col-span-8 relative w-full aspect-[1600/1131] select-none overflow-hidden bg-[#F8F4F0]">
          <img
            src={worldMapImage}
            alt="World trade route map"
            className="absolute inset-0 w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

      </div>
    </section>
  );
};
