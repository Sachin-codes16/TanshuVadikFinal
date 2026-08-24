import React from 'react';
import handmadeIcon from '../assets/Icons/Handmade.png';
import sustainableIcon from '../assets/Icons/Sustable.png';
import exportIcon from '../assets/Icons/Export.png';
import worldwideIcon from '../assets/Icons/Worldwide.png';
import customIcon from '../assets/Icons/Pencil.png';

const items = [
  {
    icon: handmadeIcon,
    title: 'Handmade Excellence',
    description: 'Skilled artisans crafting with passion and care.',
  },
  {
    icon: sustainableIcon,
    title: 'Sustainable Materials',
    description: 'Responsibly sourced for a better tomorrow.',
  },
  {
    icon: exportIcon,
    title: 'Export Quality',
    description: 'Manufactured to meet global quality standards.',
  },
  {
    icon: worldwideIcon,
    title: 'Worldwide Delivery',
    description: 'Reliable shipping and support across the globe.',
  },
  {
    icon: customIcon,
    title: 'Custom Solutions',
    description: 'Custom designs, private label and bulk production.',
  },
];

export const TrustStrip: React.FC = () => {
  return (
    <section className="bg-[#FAF8F5] pt-4 pb-10">
      <div className="w-full px-[20px]">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {items.map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <span className="shrink-0 w-10 h-10 rounded-full border border-[#8F533C]/40 flex items-center justify-center p-2">
                <img src={item.icon} alt="" className="w-full h-full object-contain" />
              </span>
              <div className="flex flex-col gap-0.5">
                <h3 className="font-sans text-xs font-bold text-[#2C2623]">{item.title}</h3>
                <p className="font-sans text-[11px] text-[#615751] leading-snug">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
