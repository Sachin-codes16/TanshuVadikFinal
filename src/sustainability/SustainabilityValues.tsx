import React from 'react';
import { Leaf, Users, Recycle, Droplet, Globe, Sprout } from 'lucide-react';

const values = [
  {
    icon: <Leaf size={40} strokeWidth={1.25} />,
    title: 'Natural & Renewable Materials',
    description: 'We use natural, renewable and responsibly sourced materials that are better for the planet.',
  },
  {
    icon: <Users size={40} strokeWidth={1.25} />,
    title: 'Empowering Communities',
    description: 'We empower artisans through fair wages, skill development and safe working conditions.',
  },
  {
    icon: <Recycle size={40} strokeWidth={1.25} />,
    title: 'Reduce. Reuse. Recycle.',
    description: 'We minimize waste through thoughtful design, responsible production and recyclable packaging.',
  },
  {
    icon: <Droplet size={40} strokeWidth={1.25} />,
    title: 'Low Impact Processes',
    description: 'We adopt low-impact processes that conserve water, energy and natural resources.',
  },
  {
    icon: <Globe size={40} strokeWidth={1.25} />,
    title: 'Ethical & Transparent',
    description: 'We believe in honesty, transparency and building long-term relationships with our partners.',
  },
  {
    icon: <Sprout size={40} strokeWidth={1.25} />,
    title: 'Designed for a Better Future',
    description: 'We create timeless products that last longer and support a more sustainable tomorrow.',
  },
];

export const SustainabilityValues: React.FC = () => {
  return (
    <section className="bg-[#F4EFEA] border-y border-[#EBE4DC] py-10">
      <div className="w-full px-6 sm:px-[80px]">
        <div className="flex items-center gap-4 sm:gap-6 mb-8">
          <div className="h-px bg-[#8F533C]/30 flex-1" />
          <h2 className="font-sans text-xs sm:text-sm font-bold tracking-[3px] uppercase text-[#2C2623] whitespace-nowrap shrink-0">
            Our Sustainability Values
          </h2>
          <div className="h-px bg-[#8F533C]/30 flex-1" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x-0 lg:divide-x divide-[#DCD3C7] gap-y-8">
          {values.map((v) => (
            <div key={v.title} className="flex flex-col items-center text-center gap-3 px-4">
              <div className="w-14 h-14 rounded-full border border-[#8F533C] flex items-center justify-center text-[#8F533C] shrink-0">
                {v.icon}
              </div>
              <h3 className="font-sans text-[13px] font-bold tracking-wider uppercase text-[#2C2623] leading-snug">
                {v.title}
              </h3>
              <p className="font-sans text-sm text-[#615751] leading-relaxed font-light max-w-[160px]">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
