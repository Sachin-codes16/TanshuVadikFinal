import React from 'react';
import { Leaf, Hand, Recycle, Package } from 'lucide-react';
import sourcedImg from '../assets/Capablities/responsiblysourced.jpeg';
import handcraftedImg from '../assets/Capablities/handcrafted.jpeg';
import footprintImg from '../assets/images/basket_rope_twotone_1783702315626.jpeg';
import packagingImg from '../assets/images/tote_cork_bottom_1783702287513.jpg';

const tiles = [
  {
    icon: <Leaf size={22} strokeWidth={1.5} />,
    title: 'Responsibly Sourced',
    description: 'We select materials mindfully from responsible sources.',
    image: sourcedImg,
  },
  {
    icon: <Hand size={22} strokeWidth={1.5} />,
    title: 'Handcrafted by Artisans',
    description: 'Our products are handcrafted by skilled artisans with care and precision.',
    image: handcraftedImg,
  },
  {
    icon: <Recycle size={22} strokeWidth={1.5} />,
    title: 'Reducing Our Footprint',
    description: 'We continuously improve to reduce waste, conserve energy and protect our environment.',
    image: footprintImg,
  },
  {
    icon: <Package size={22} strokeWidth={1.5} />,
    title: 'Sustainable Packaging',
    description: 'Our packaging is made from recycled materials and is 100% recyclable.',
    image: packagingImg,
  },
];

export const SustainabilityApproach: React.FC = () => {
  return (
    <section className="bg-[#FAF8F5] py-10">
      <div className="w-full px-6 sm:px-[80px] grid grid-cols-1 lg:grid-cols-[0.7fr_2fr] gap-8 items-center">
        {/* Left Content */}
        <div>
          <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-[#4A5D3A] uppercase">
            Our Approach
          </h2>
          <div className="h-[2px] w-10 bg-[#4A5D3A] my-4" />
          <p className="font-sans text-base text-[#615751] leading-relaxed">
            Sustainability at Tanshu Vaidik is not a trend, it is a way of life. From design to
            delivery, we make conscious choices that reduce our environmental footprint and
            support the well-being of our people and planet.
          </p>
          <p className="font-serif italic text-lg text-[#4A5D3A] mt-8 leading-relaxed">
            Crafted with care.
            <br />
            Made with purpose.
          </p>
          <svg
            width="140"
            height="48"
            viewBox="0 0 140 48"
            fill="none"
            className="mt-4 text-[#4A5D3A]"
          >
            <path
              d="M2 20C30 40 60 4 90 18C100 23 96 32 104 30"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M104 24c-3-4 2-7 4.5-4 1-4 7-2 5 3-1.5 4-6 6-9 8-1-3-2-5-0.5-7z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Right Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {tiles.map((t) => (
            <div
              key={t.title}
              style={{ backgroundImage: `url(${t.image})` }}
              className="relative aspect-[3/5] bg-cover bg-center flex flex-col items-center justify-center text-center gap-3 px-4 rounded-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative w-12 h-12 rounded-full border border-white/70 flex items-center justify-center text-white shrink-0">
                {t.icon}
              </div>
              <h3 className="relative font-sans text-sm font-bold tracking-wider uppercase text-white leading-snug drop-shadow-sm">
                {t.title}
              </h3>
              <p className="relative font-sans text-xs text-white leading-relaxed font-light drop-shadow-sm">
                {t.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
