import React from 'react';
import { Ruler, Cog, Layers, Warehouse, Workflow, ArrowRight } from 'lucide-react';
import warehouseImage from '../assets/collection/ChatGPT Image Jul 23, 2026, 12_19_43 AM.jpg';

const leftStats = [
  { icon: <Ruler size={22} strokeWidth={1.5} />, title: '50,000+ Sq.Ft.', description: 'Manufacturing Area' },
  { icon: <Cog size={22} strokeWidth={1.5} />, title: 'Advanced Machinery', description: 'For large-scale production & Dyeing' },
  { icon: <Warehouse size={22} strokeWidth={1.5} />, title: 'Large Warehouse', description: '& Finished Goods Storage' },
];

const rightStats = [
  { icon: <Layers size={22} strokeWidth={1.5} />, title: 'In-house Yarn Preparing', description: '& Finishing' },
  { icon: <Workflow size={22} strokeWidth={1.5} />, title: 'Efficient Production Planning', description: '& Workflow' },
];

export const CapabilitiesInfrastructure: React.FC = () => {
  return (
    <section className="bg-[#F4EFEA] py-10">
      <div className="w-full px-6 sm:px-[80px] grid grid-cols-1 lg:grid-cols-[1.3fr_1fr_1fr] gap-8 lg:gap-10 items-stretch">
        <div>
          <span className="font-sans text-sm sm:text-base font-bold tracking-widest uppercase text-[#2C2623] block">
            Our Infrastructure
          </span>
          <div className="h-[2px] w-10 bg-[#8F533C] mt-2 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
            <div className="flex flex-col gap-6">
              {leftStats.map((stat) => (
                <div key={stat.title} className="flex items-start gap-3">
                  <span className="text-[#8F533C] mt-0.5 shrink-0">{stat.icon}</span>
                  <div>
                    <h4 className="font-sans text-base font-bold text-[#2C2623] leading-tight">{stat.title}</h4>
                    <p className="font-sans text-sm text-[#615751] leading-tight">{stat.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-6 mt-6 sm:mt-0">
              {rightStats.map((stat) => (
                <div key={stat.title} className="flex items-start gap-3">
                  <span className="text-[#8F533C] mt-0.5 shrink-0">{stat.icon}</span>
                  <div>
                    <h4 className="font-sans text-base font-bold text-[#2C2623] leading-tight">{stat.title}</h4>
                    <p className="font-sans text-sm text-[#615751] leading-tight">{stat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:mt-14 lg:pl-10 lg:border-l lg:border-[#8F533C]/20">
          <p className="font-sans text-base text-[#615751] leading-relaxed">
            Our state-of-the-art facility is equipped with advanced machinery and traditional skills
            working in harmony to deliver large volume with consistent quality.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#8F533C] font-sans text-xs font-bold tracking-widest uppercase text-[#8F533C] hover:bg-[#8F533C] hover:text-white transition-colors w-fit"
          >
            View Our Facility <ArrowRight size={14} />
          </a>
        </div>

        <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto overflow-hidden bg-[#FAF8F5] lg:-my-10">
          <img src={warehouseImage} alt="Tanshu Vaidik facility" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
};
