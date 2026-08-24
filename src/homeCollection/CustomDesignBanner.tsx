import React from 'react';
import { FileEdit, FileText, Package, ClipboardList, Settings2, Percent } from 'lucide-react';
import bannerImage from '../assets/collection/rugsdetailspage.png';

const getInTouchItems = [
  { icon: <FileText size={16} strokeWidth={1.5} />, label: 'Technical Specification Sheet' },
  { icon: <Package size={16} strokeWidth={1.5} />, label: 'Sample Request' },
  { icon: <ClipboardList size={16} strokeWidth={1.5} />, label: 'MOQ & Lead Time' },
  { icon: <Settings2 size={16} strokeWidth={1.5} />, label: 'Custom Development' },
  { icon: <Percent size={16} strokeWidth={1.5} />, label: 'Bulk Pricing & Quotation' },
];

interface CustomDesignBannerProps {
  onTalkToTeam: () => void;
}

export const CustomDesignBanner: React.FC<CustomDesignBannerProps> = ({ onTalkToTeam }) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[0.9fr_0.9fr_1.3fr] lg:h-[260px]">
      {/* Dark CTA panel */}
      <div className="bg-[#2C2623] px-6 sm:px-10 py-6 sm:py-8 flex flex-col items-start justify-center gap-3">
        <span className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center text-white shrink-0">
          <FileEdit size={20} strokeWidth={1.5} />
        </span>
        <h3 className="font-serif text-xl text-white font-medium leading-tight">
          Looking for a custom design or private label?
        </h3>
        <p className="font-sans text-sm text-white/70 leading-relaxed">
          Our team is ready to help you create products that your customers will love.
        </p>
        <button
          onClick={onTalkToTeam}
          className="mt-1 px-6 py-2.5 bg-[#8F533C] hover:bg-[#A76043] text-white font-button text-xs tracking-widest uppercase transition-colors cursor-pointer"
        >
          Talk to Our Team
        </button>
      </div>

      {/* Get in touch checklist */}
      <div className="bg-[#F4EFEA] px-6 sm:px-10 py-6 sm:py-8 flex flex-col justify-center gap-3 lg:border-l lg:border-[#EBE4DC]">
        <span className="font-sans text-xs font-bold tracking-widest uppercase text-[#2C2623]">
          Get in Touch For
        </span>
        <ul className="flex flex-col gap-2.5">
          {getInTouchItems.map((item) => (
            <li key={item.label} className="flex items-center gap-3 font-sans text-sm text-[#2C2623]">
              <span className="text-[#8F533C] shrink-0">{item.icon}</span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Image */}
      <div className="relative min-h-[160px] lg:min-h-0 overflow-hidden bg-[#F4EFEA]">
        <img src={bannerImage} alt="" className="w-full h-full object-cover" />
      </div>
    </section>
  );
};
