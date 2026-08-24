import React from 'react';
import { motion } from 'motion/react';
import { Award, ShieldAlert, CheckCircle } from 'lucide-react';
import iso1logo  from "../assets/images/iso1.png";
import iso9001Logo from "../assets/images/ISO logo copy.png";
import grs from "../assets/images/Global+Recycled+Standard.webp";
import gmp from "../assets/images/gmp.webp";
import sedex from "../assets/images/sedex-logo_brandlogos.net_elidv-512x137.png";
import nongmo from "../assets/images/nongmo.webp";

export const Certifications: React.FC = () => {
  const certs = [
    {
      id: 'iso-9001',
      name: 'ISO 9001:2015',
      logo: (
        // <svg className="w-12 h-12 text-[#2C2623]" viewBox="0 0 100 100" fill="none" xmlns="../images/Global+Recycled+Standard.webp">
        //   <circle cx="50" cy="50" r="44" stroke="#8F533C" strokeWidth="2" strokeDasharray="4 2" />
        //   <circle cx="50" cy="50" r="38" stroke="#2C2623" strokeWidth="1" />
        //   <text x="50" y="45" textAnchor="middle" fill="#2C2623" fontSize="18" fontWeight="bold" fontFamily="serif">ISO</text>
        //   <text x="50" y="62" textAnchor="middle" fill="#8F533C" fontSize="10" fontWeight="bold" fontFamily="sans-serif">9001:2015</text>
        //   <text x="50" y="74" textAnchor="middle" fill="#615751" fontSize="7" tracking-wider fontFamily="sans-serif">CERTIFIED</text>
        // </svg>
        <img src={iso9001Logo} alt="ISO 9001:2015 logo" className="w-16 h-16 object-contain" />
      ),
      description: '9001:2015',
    },
    {
      id: 'iso-14001',
      name: 'ISO 14001:2015',
      logo: (
        // <svg className="w-12 h-12 text-[#2C2623]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        //   <circle cx="50" cy="50" r="44" stroke="#8F533C" strokeWidth="2" strokeDasharray="4 2" />
        //   <circle cx="50" cy="50" r="38" stroke="#2C2623" strokeWidth="1" />
        //   <path d="M50 24C45 32 42 38 48 44C52 48 54 52 49 58" stroke="#8F533C" strokeWidth="1.5" strokeLinecap="round" />
        //   <text x="50" y="42" textAnchor="middle" fill="#2C2623" fontSize="16" fontWeight="bold" fontFamily="serif">ISO</text>
        //   <text x="50" y="62" textAnchor="middle" fill="#8F533C" fontSize="10" fontWeight="bold" fontFamily="sans-serif">14001:2015</text>
        //   <text x="50" y="74" textAnchor="middle" fill="#615751" fontSize="7" tracking-wider fontFamily="sans-serif">ENVIRONMENTAL</text>
        // </svg>

        <img src={iso1logo} alt="ISO 9001:2015 logo" className="w-16 h-16 object-contain" />
      ),
      description: '14001:2015',
    },
    {
      id: 'sedex',
      name: 'Sedex Member',
      logo: (
        // <svg className="w-12 h-12 text-[#2C2623]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        //   <circle cx="50" cy="50" r="44" stroke="#EBE4DC" strokeWidth="2" />
        //   <path d="M30 40C35 30 65 30 70 40C65 55 35 55 30 40Z" fill="#8F533C" opacity="0.15" />
        //   <path d="M42 38C45 35 55 35 58 38C55 45 45 45 42 38Z" fill="#8F533C" />
        //   <circle cx="50" cy="55" r="14" stroke="#2C2623" strokeWidth="1.5" />
        //   <text x="50" y="80" textAnchor="middle" fill="#2C2623" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Sedex</text>
        //   <text x="50" y="90" textAnchor="middle" fill="#615751" fontSize="8" fontFamily="sans-serif">Member</text>
        // </svg>

        <img src={sedex} alt="ISO 9001:2015 logo" className="w-16 h-16 object-contain" />
      ),
      description: 'Member',
    },
    {
      id: 'grs',
      name: 'Global Recycled Standard',
      logo: (
        // <svg className="w-12 h-12 text-[#2C2623]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        //   <circle cx="50" cy="50" r="44" stroke="#8F533C" strokeWidth="1.5" />
        //   <path d="M50 20C63.8 20 75 31.2 75 45C75 52.5 71.7 59.2 66.4 63.8L58 58" stroke="#8F533C" strokeWidth="2" strokeLinecap="round" />
        //   <path d="M50 70C36.2 70 25 58.8 25 45C25 37.5 28.3 30.8 33.6 26.2L42 32" stroke="#2C2623" strokeWidth="2" strokeLinecap="round" />
        //   <path d="M58 58L68 58L64 68Z" fill="#8F533C" />
        //   <path d="M42 32L32 32L36 22Z" fill="#2C2623" />
        //   <text x="50" y="48" textAnchor="middle" fill="#2C2623" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Global Recycled</text>
        //   <text x="50" y="58" textAnchor="middle" fill="#615751" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Standard</text>
        // </svg>

           <img src={grs} alt="GRS logo" className="w-20 h-20 object-cover" />
        
      ),
      description: 'Standard',
    },
    {
      id: 'nongmo',
      name: 'NON GMO',
      logo: (
        // <svg className="w-12 h-12 text-[#2C2623]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        //   <circle cx="50" cy="50" r="44" stroke="#EBE4DC" strokeWidth="2" />
        //   <path d="M40 35C45 30 55 30 60 35C55 55 45 55 40 35Z" stroke="#8F533C" strokeWidth="2" fill="#8F533C" fillOpacity="0.1" />
        //   <path d="M46 45L40 35L50 38" stroke="#8F533C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        //   <text x="50" y="65" textAnchor="middle" fill="#2C2623" fontSize="14" fontWeight="bold" fontFamily="sans-serif">NON</text>
        //   <text x="50" y="78" textAnchor="middle" fill="#8F533C" fontSize="14" fontWeight="bold" fontFamily="sans-serif">GMO</text>
        // </svg>

        <img src={nongmo} alt="ISO 9001:2015 logo" className="w-16 h-16 object-contain opacity-50" />
      ),
      description: 'Project Verified',
    },
    {
      id: 'gmp',
      name: 'GMP Certified',
      logo: (
        // <svg className="w-12 h-12 text-[#2C2623]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        //   <circle cx="50" cy="50" r="44" stroke="#8F533C" strokeWidth="2" />
        //   <path d="M35 50L45 60L65 40" stroke="#8F533C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        //   <text x="50" y="32" textAnchor="middle" fill="#2C2623" fontSize="12" fontWeight="bold" fontFamily="sans-serif">GMP</text>
        //   <text x="50" y="78" textAnchor="middle" fill="#615751" fontSize="7" tracking-widest fontFamily="sans-serif">GOODS MANUFACTURE</text>
        //   <text x="50" y="87" textAnchor="middle" fill="#615751" fontSize="7" tracking-widest fontFamily="sans-serif">PRACTICE CERTIFICATE</text>
        // </svg>

          <img src={gmp} alt="gmp logo" className="w-16 h-16 object-contain" />
      ),
      description: 'Practice Certificate',
    },
  ];

  return (
    <section id="certifications" className="py-6 bg-[#FAF8F5]">
      <div className="w-full px-6 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Editorial Text */}
          <div className="lg:col-span-4 flex flex-col items-start gap-4 bg-[#EBE4DC] p-8">
            <span className="font-sans text-[11px] font-bold tracking-[0.25em] text-[#8F533C] uppercase">
              CERTIFIED. ETHICAL. RESPONSIBLE.
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#2C2623] font-medium leading-tight">
              We follow international standards to ensure quality, safety and sustainable manufacturing.
            </h3>
            <button className="mt-2 px-6 py-3 border border-[#8F533C] text-[#8F533C] hover:bg-[#8F533C] hover:text-white transition-all duration-300 font-sans text-xs tracking-widest uppercase rounded-none font-semibold">
              VIEW CERTIFICATIONS &rarr;
            </button>
          </div>

          {/* Right Column - Certifications Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center items-start">
              {certs.map((c, index) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex flex-col items-center text-center gap-3 p-5 w-full max-w-40 transition-all duration-300"
                >
                  {/* Circle SVG */}
                  <div className="w-16 h-16 flex items-center justify-center">
                    {c.logo}
                  </div>

                  {/* Labels */}
                  <div className="flex flex-col items-center gap-0.5 mt-1 w-full">
                    <span className="font-sans text-[10px] font-bold text-[#2C2623] uppercase tracking-wider leading-tight min-h-6 flex items-center justify-center text-center">
                      {c.name.split(' ')[0]} {c.name.split(' ')[1] || ''}
                    </span>
                    <span className="font-sans text-[9px] text-[#615751] font-light tracking-wide whitespace-normal sm:whitespace-nowrap">
                      {c.description}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
