import React from 'react';
import heroImage from '../assets/Capablities/Sustaibility.jpg';

export const SustainabilityHero: React.FC = () => {
  return (
    <section className="relative w-full h-130 sm:h-150 overflow-hidden bg-[#FAF8F5]">
      <img
        src={heroImage}
        alt="Tanshu Vaidik sustainable craftsmanship"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{ background: 'linear-gradient(to top, #FAF8F5, rgba(250,248,245,0))' }}
      />
      <div className="relative z-10 h-full w-full px-6 sm:px-12 lg:px-[80px] flex flex-col justify-center max-w-xl">
        <span className="font-sans text-xs font-bold tracking-[3px] uppercase text-[#8F533C] mb-3">
          Sustainability
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-[#2C2623] font-medium leading-tight">
          Sustainability
          <br />
          is Our Responsibility.
          <br />
          Craftsmanship is
          <br />
          Our Promise.
        </h1>

        <p className="font-sans text-sm sm:text-base text-[#615751] leading-relaxed max-w-md mt-6">
          At Tanshu Vaidik, we believe true luxury lies in creating beautiful products
          without compromising the planet or the people who make them.
        </p>
        <p className="font-sans text-sm sm:text-base text-[#615751] leading-relaxed max-w-md mt-4">
          Our commitment to sustainability is woven into every fiber of our business.
        </p>
      </div>
    </section>
  );
};
