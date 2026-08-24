import React from 'react';
import iso1logo from '../assets/images/iso1.png';
import iso9001Logo from '../assets/images/ISO logo copy.png';
import grs from '../assets/images/Global+Recycled+Standard.webp';
import sedex from '../assets/images/sedex-logo_brandlogos.net_elidv-512x137.png';
import nongmo from '../assets/images/nongmo.webp';

const certs = [
  { id: 'iso-9001', logo: <img src={iso9001Logo} alt="ISO 9001:2015" className="max-w-16 max-h-16 object-contain" />, name: 'ISO 9001:2015', description: 'Quality Management System' },
  { id: 'iso-14001', logo: <img src={iso1logo} alt="ISO 14001:2015" className="max-w-16 max-h-16 object-contain" />, name: 'ISO 14001:2015', description: 'Environmental Management System' },
  {
    id: 'sedex',
    logo: <img src={sedex} alt="Sedex" className="max-w-20 max-h-20 object-contain" />,
    name: 'Sedex',
    description: 'Ethical Trade Member',
  },
  { id: 'grs', logo: <img src={grs} alt="Global Recycled Standard" className="max-w-20 max-h-20 object-contain" />, name: 'GRS', description: 'Global Recycled Standard' },
  {
    id: 'oeko-tex',
    logo: (
      <div className="w-20 h-20 flex flex-col items-center justify-center gap-1 px-1 translate-y-4">
        <span className="font-sans text-sm font-black text-[#2C2623] leading-none">OEKO-TEX®</span>
        <span className="font-sans text-[7px] text-[#615751] tracking-wide leading-none text-center">CONFIDENCE IN TEXTILES</span>
        <span className="font-sans text-xs font-bold text-[#C9871F] leading-none mt-1">STANDARD 100</span>
      </div>
    ),
    name: 'OEKO-TEX® STANDARD 100',
    description: 'Tested for harmful substances',
  },
  { id: 'nongmo', logo: <img src={nongmo} alt="NON-GMO" className="max-w-16 max-h-16 object-contain" />, name: 'NON-GMO', description: 'Verified' },
];

export const SustainabilityCertifications: React.FC = () => {
  return (
    <section className="bg-white border-t border-[#EBE4DC] py-10">
      <div className="w-full px-6 sm:px-[80px] grid grid-cols-1 lg:grid-cols-[0.7fr_2fr] gap-8 items-center">
        {/* Left Content */}
        <div>
          <span className="font-sans text-base font-bold tracking-[3px] uppercase text-[#8F533C]">
            Our Certifications &amp; Compliances
          </span>
          <div className="h-[2px] w-10 bg-[#8F533C] my-4" />
          <p className="font-sans text-lg text-[#615751] leading-relaxed max-w-xs">
            We are committed to international standards that ensure quality, environmental
            responsibility and ethical business practices.
          </p>
        </div>

        {/* Right Logos */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 items-start justify-items-center divide-x-0 lg:divide-x divide-[#EBE4DC]">
          {certs.map((c) => (
            <div key={c.id} className="flex flex-col items-center text-center gap-3 px-2">
              <div className="w-20 h-20 flex items-center justify-center shrink-0">{c.logo}</div>
              <span className="font-sans text-sm font-bold text-[#2C2623] leading-tight min-h-[2.25rem] flex items-center">
                {c.name}
              </span>
              <span className="font-sans text-sm text-[#615751] font-light leading-tight max-w-[120px]">
                {c.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
