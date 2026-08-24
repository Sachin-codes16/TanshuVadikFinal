import React from 'react';
import { Leaf, HeartHandshake, Recycle, Heart } from 'lucide-react';
import forestBg from '../assets/collection/image.jpg';

const promises = [
  {
    icon: <Leaf size={22} strokeWidth={1.5} />,
    title: 'Sustainable Materials',
    description: 'Prioritizing natural, renewable and recycled materials.',
  },
  {
    icon: <HeartHandshake size={22} strokeWidth={1.5} />,
    title: 'Supporting Artisans',
    description: 'Empowering livelihoods and preserving traditional craftsmanship.',
  },
  {
    icon: <Recycle size={22} strokeWidth={1.5} />,
    title: 'Responsible Production',
    description: 'Minimizing waste and conserving resources in every step.',
  },
  {
    icon: <Heart size={22} strokeWidth={1.5} />,
    title: 'Better Planet Better Future',
    description: 'Creating products that contribute to a sustainable tomorrow.',
  },
];

export const SustainabilityPromise: React.FC = () => {
  return (
    <section
      style={{ backgroundImage: `url(${forestBg})` }}
      className="relative w-full bg-cover bg-center"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A2313]/10 via-[#1A2313]/20 to-[#1A2313]/30" />
      <div className="relative px-6 sm:px-[80px] py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-[0.8fr_2fr] gap-10 items-center">
        {/* Left Content */}
        <div>
          <h2 className="font-serif text-3xl sm:text-4xl text-white">
            Our Promise for a Better Tomorrow
          </h2>
          <div className="h-[2px] w-10 bg-white/70 my-4" />
          <p className="font-sans text-base sm:text-lg text-white/85 leading-relaxed max-w-md">
            We will continue to innovate responsibly, support our communities and protect the
            planet for future generations.
          </p>
        </div>

        {/* Right Icons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/25">
          {promises.map((p) => (
            <div key={p.title} className="flex flex-col items-center text-center gap-3 px-4">
              <div className="w-14 h-14 rounded-full border border-white/70 flex items-center justify-center text-white shrink-0">
                {p.icon}
              </div>
              <h3 className="font-sans text-sm font-bold tracking-wider uppercase text-white leading-snug">
                {p.title}
              </h3>
              <p className="font-sans text-xs text-white/80 leading-relaxed font-light max-w-[160px]">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
