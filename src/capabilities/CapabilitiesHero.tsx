import React, { useEffect, useState } from 'react';
import heroImage from '../assets/Capablities/capabilities hero image.jpeg';
import heroImage2 from '../assets/Capablities/capabilities hero image 2 (1).jpeg';

const slides = [heroImage, heroImage2];

export const CapabilitiesHero: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[70vh] min-h-[520px] overflow-hidden">
      <div
        className="absolute inset-0 flex h-full transition-transform duration-1000 ease-in-out"
        style={{ width: `${slides.length * 100}%`, transform: `translateX(-${activeIndex * (100 / slides.length)}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative h-full shrink-0" style={{ width: `${100 / slides.length}%` }}>
            <img
              src={slide}
              alt="Tanshu Vaidik manufacturing"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(44,38,35,0.85)_0%,rgba(44,38,35,0.75)_35%,rgba(44,38,35,0.2)_75%)]" />

      <div className="relative z-10 h-full w-full px-6 sm:px-12 lg:px-[80px] flex flex-col justify-center">
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] text-white font-medium leading-tight">
          Our Capabilities.
          <br />
          From Concept to
          <br />
          Global Delivery.
        </h1>
        <div className="h-[2px] w-12 bg-[#8F533C] my-5" />
        <p className="font-sans text-base sm:text-lg text-[#F4EFEA] leading-relaxed max-w-sm">
          Integrated craftsmanship. Scalable production. Ethical practices. Complete control from
          design to doorstep.
        </p>
      </div>
    </section>
  );
};
