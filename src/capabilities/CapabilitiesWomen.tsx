import React from 'react';
import { Home, GraduationCap, Coins, Users, ArrowRight } from 'lucide-react';
import artisanImage1 from '../assets/Heart of Tasnhu/work from home.jpeg';
import artisanImage2 from '../assets/Heart of Tasnhu/skill development.jpg';
import artisanImage3 from '../assets/Heart of Tasnhu/fair income (1).jpg';
import artisanImage4 from '../assets/Heart of Tasnhu/women empowerment.jpg';

const values = [
  { icon: <Home size={20} strokeWidth={1.5} />, title: 'Work From Home', description: 'Flexible & safe working environment' },
  { icon: <GraduationCap size={20} strokeWidth={1.5} />, title: 'Skill Development', description: 'Training, guidance & continuous support' },
  { icon: <Coins size={20} strokeWidth={1.5} />, title: 'Fair Income', description: 'Timely payments & ethical practices' },
  { icon: <Users size={20} strokeWidth={1.5} />, title: 'Women Empowerment', description: 'Building confidence & better livelihoods' },
];

const artisanImages = [artisanImage1, artisanImage2, artisanImage3, artisanImage4];

export const CapabilitiesWomen: React.FC = () => {
  return (
    <section className="bg-[#FAF8F5] pt-14 pb-4">
      <div className="w-full px-6 sm:px-[80px] grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-10">
        <div>
          <span className="font-sans text-xs sm:text-sm font-bold tracking-widest uppercase text-[#8F533C] block mb-2">
            The Heart of Tanshu
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#2C2623] font-medium mb-4">
            Empowering Women. Crafting Futures.
          </h2>
          <p className="font-sans text-sm text-[#615751] leading-relaxed mb-6">
            A large part of our macramé & handcrafted collections are made by skilled women artisans
            working from the comfort of their homes. We provide training, materials & fair wages, helping
            them achieve financial independence while keeping our traditional crafts alive.
          </p>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-6 py-3 border border-[#8F533C] text-[#8F533C] hover:bg-[#8F533C] hover:text-white transition-all duration-300 font-sans text-xs font-bold tracking-widest uppercase w-fit"
          >
            Meet Our Artisans <ArrowRight size={14} />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6">
          {values.map((item, index) => (
            <div key={item.title} className="flex flex-col">
              <div className="relative aspect-3/4 overflow-hidden bg-[#F4EFEA] mb-4">
                <img
                  src={artisanImages[index]}
                  alt="Tanshu Vaidik women artisans at work"
                  className={`w-full h-full object-cover ${
                    index === 2 ? 'scale-125 origin-top' : ''
                  }`}
                />
              </div>
              <div className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-full border border-[#8F533C] flex items-center justify-center text-[#8F533C] shrink-0">
                  {item.icon}
                </span>
                <div>
                  <h4 className="font-sans text-xs font-bold text-[#2C2623] leading-tight">{item.title}</h4>
                  <p className="font-sans text-[11px] text-[#615751] leading-snug mt-0.5">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
