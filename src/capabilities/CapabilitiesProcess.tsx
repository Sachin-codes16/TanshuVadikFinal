import React from 'react';
import icon1 from '../assets/Icons/14.png';
import icon2 from '../assets/Icons/15.png';
import icon3 from '../assets/Icons/16.png';
import icon4 from '../assets/Icons/17.png';
import icon5 from '../assets/Icons/18.png';
import icon6 from '../assets/Icons/19.png';

const steps = [
  {
    number: '01',
    icon: <img src={icon1} className="w-16 h-16 object-contain mix-blend-multiply contrast-125 saturate-150 brightness-90" />,
    title: 'Design & Concept',
    description: 'Trend research, sketches, CADs & mood boards as per buyer needs.',
  },
  {
    number: '02',
    icon: <img src={icon2} className="w-16 h-16 object-contain mix-blend-multiply contrast-125 saturate-150 brightness-90" />,
    title: 'Material Sourcing',
    description: 'Carefully selected natural, recycled & sustainable yarns from trusted sources.',
  },
  {
    number: '03',
    icon: <img src={icon3} className="w-16 h-16 object-contain mix-blend-multiply contrast-125 saturate-150 brightness-90" />,
    title: 'Sampling & Prototyping',
    description: 'Rapid sampling, custom sizes, colours construction for perfect evaluation.',
  },
  {
    number: '04',
    icon: <img src={icon4} className="w-16 h-16 object-contain mix-blend-multiply contrast-125 saturate-150 brightness-90" />,
    title: 'Production',
    description: 'Skilled artisans & advanced machines work together for consistent quality at scale.',
  },
  {
    number: '05',
    icon: <img src={icon5} className="w-16 h-16 object-contain mix-blend-multiply contrast-125 saturate-150 brightness-90" />,
    title: 'Quality Control',
    description: 'In-line & final inspection at multiple stages as per AQL & buyer standards.',
  },
  {
    number: '06',
    icon: <img src={icon6} className="w-16 h-16 object-contain mix-blend-multiply contrast-125 saturate-150 brightness-90" />,
    title: 'Packing & Logistics',
    description: 'Careful packing, labelling & reliable shipping to global destinations.',
  },
];

export const CapabilitiesProcess: React.FC = () => {
  return (
    <section className="bg-[#F4EFEA] py-14">
      <div className="w-full px-6 sm:px-[80px] flex flex-col items-center text-center gap-1 mb-10">
        <span className="font-sans text-sm sm:text-base font-bold tracking-widest uppercase text-[#2C2623]">
          Our End-to-End Process
        </span>
        <div className="h-[2px] w-10 bg-[#8F533C] mt-2" />
      </div>

      <div className="w-full px-6 sm:px-[80px] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-4">
        {steps.map((step, index) => (
          <div key={step.title} className="relative flex flex-col items-center text-center gap-3 px-2">
            <span className="text-[#8F533C]">{step.icon}</span>
            <span className="font-serif text-lg font-bold text-[#8F533C]">{step.number}</span>
            <h4 className="font-sans text-sm font-bold tracking-wide uppercase text-[#2C2623]">
              {step.title}
            </h4>
            <p className="font-sans text-sm text-[#615751] leading-relaxed">{step.description}</p>

            {index < steps.length - 1 && (
              <div className="hidden lg:flex absolute inset-y-0 -right-2 w-px items-center justify-center">
                <span className="absolute inset-y-0 w-px border-l border-dashed border-[#8F533C]/40" />
                <span className="relative bg-[#F4EFEA] px-0.5 text-[#8F533C]/60">›</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
