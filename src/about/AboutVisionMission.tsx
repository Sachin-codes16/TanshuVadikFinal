import React from 'react';
import { Eye, Target } from 'lucide-react';

export const AboutVisionMission: React.FC = () => {
  return (
    <section className="py-14 sm:py-16 bg-[#FAF8F5]">
      <div className="w-full px-[20px] grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Vision */}
        <div className="flex flex-col gap-4 bg-[#EBE4DC]/40 border border-[#EBE4DC] p-8 sm:p-10">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl text-[#2C2623] font-bold uppercase tracking-tight">Vision</h3>
            <Eye size={26} className="text-[#8F533C]" strokeWidth={1.5} />
          </div>
          <p className="font-sans text-sm sm:text-base text-[#615751] leading-relaxed" style={{ textAlign: 'justify' }}>
            Our vision is to become a globally trusted partner in handcrafted home décor and lifestyle products by delivering exceptional quality, innovative designs, and sustainable manufacturing practices. We aim to connect Indian craftsmanship with international markets while creating long-term value for our customers, artisans, and business partners.
          </p>
        </div>

        {/* Mission */}
        <div className="flex flex-col gap-4 bg-[#2C2623] p-8 sm:p-10">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl text-white font-bold uppercase tracking-tight">Mission</h3>
            <Target size={26} className="text-[#D8B88A]" strokeWidth={1.5} />
          </div>
          <p className="font-sans text-sm sm:text-base text-[#E0D7CD] leading-relaxed" style={{ textAlign: 'justify' }}>
            Our mission is to provide high-quality handcrafted products through ethical manufacturing, reliable sourcing, and efficient global logistics. We are committed to offering customized solutions, maintaining consistent quality standards, and building lasting relationships by ensuring timely delivery, competitive pricing, and outstanding customer service.
          </p>
        </div>
      </div>
    </section>
  );
};
