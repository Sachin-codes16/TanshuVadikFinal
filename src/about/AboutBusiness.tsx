import React from 'react';
import { Handshake, ShieldCheck, Truck } from 'lucide-react';

const workshopImage =
  'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80';

const values = [
  {
    icon: <Handshake size={24} className="text-[#8F533C]" strokeWidth={1.5} />,
    title: 'Client-First Approach',
    description:
      "We start by understanding each buyer's product specifications, budget, and timelines before proposing a sourcing plan.",
  },
  {
    icon: <ShieldCheck size={24} className="text-[#8F533C]" strokeWidth={1.5} />,
    title: 'Quality At Every Stage',
    description:
      'Raw materials, in-process work, and finished goods are inspected against buyer standards before any shipment leaves our facility.',
  },
  {
    icon: <Truck size={24} className="text-[#8F533C]" strokeWidth={1.5} />,
    title: 'Reliable Delivery',
    description:
      'Dedicated production planning and logistics coordination keep orders on schedule from Panipat to ports worldwide.',
  },
];

export const AboutBusiness: React.FC = () => {
  return (
    <>
      <section id="about-business" className="py-14 sm:py-16 bg-[#FAF8F5]">
        <div className="w-full px-[20px] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="flex flex-col gap-4" style={{ textAlign: 'justify' }}>
            <span className="font-sans text-[11px] font-bold tracking-[0.3em] text-[#8F533C] uppercase">
              OUR PROCESS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2C2623] font-medium tracking-tight uppercase">
              How We Do Business
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#615751] leading-relaxed">
              At Tanshu Vaidik, we follow a structured, customer-focused approach to every order. We begin
              by understanding each buyer's product requirements, target markets, and quality expectations,
              then translate those into a clear production and delivery plan.
            </p>
            <p className="font-sans text-sm sm:text-base text-[#615751] leading-relaxed">
              From raw material sourcing and sampling to manufacturing, quality inspection, and packaging,
              our team manages every stage in-house at our Panipat facility. We work closely with buyers
              throughout the process to ensure the final product matches their specifications and standards.
            </p>
            <p className="font-sans text-sm sm:text-base text-[#615751] leading-relaxed">
              Once production is complete, we coordinate documentation, freight, and on-time shipping to
              destinations worldwide, backed by responsive support for reorders and after-sales queries.
            </p>
          </div>

          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <img
              src={workshopImage}
              alt="Tanshu Vaidik production and quality process"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      <section className="pb-14 sm:pb-16 bg-[#FAF8F5]">
        <div className="w-full px-[20px] grid grid-cols-1 sm:grid-cols-3 gap-6">
          {values.map((v) => (
            <div key={v.title} className="flex flex-col gap-3 bg-[#EBE4DC]/40 border border-[#EBE4DC] p-6 sm:p-8">
              {v.icon}
              <h3 className="font-serif text-lg text-[#2C2623] font-bold uppercase tracking-tight">
                {v.title}
              </h3>
              <p className="font-sans text-sm text-[#615751] leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
