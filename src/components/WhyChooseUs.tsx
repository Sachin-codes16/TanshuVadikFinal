import React from 'react';
import { Palette, Landmark, ShieldCheck, Leaf, Tag, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import icon1 from '../assets/images/design_product_development.webp';
import icon3 from '../assets/images/manufacturing_excellence.png';
import icon4 from '../assets/images/sustainable_materials.png';
import icon5 from '../assets/images/private_label_solutions.png';
import icon6 from '../assets/images/export_expertise.png';
import headOfficeFlag from '../assets/Capablities/headoffice.jpeg';

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      icon: <img src = {icon1} className="w-16 h-16 text-[#8F533C] object-contain mix-blend-multiply"  />,
      title: 'DESIGN & PRODUCT DEVELOPMENT',
      description: 'Trend-driven designs and custom collections tailored to your brand.',
    },
    {
      icon: <img src = {headOfficeFlag} className="w-16 h-16 object-contain mix-blend-multiply"  />,
      title: 'AUSTRALIAN     HEAD OFFICE',
      description: 'Seamless communication and dedicated support for global buyers.',
    },
    {
      icon:  <img src = {icon3} className="w-12 h-12 text-[#8F533C] object-contain mix-blend-multiply"  />,
      title: 'MANUFACTURING EXCELLENCE',
      description: 'Skilled craftsmanship with scalable production capabilities.',
    },
    {
      icon:  <img src = {icon4} className="w-12 h-12 text-[#8F533C] object-contain mix-blend-multiply"  />,
      title: 'SUSTAINABLE MATERIALS',
      description: 'Natural, eco-friendly fibers and responsible manufacturing.',
    },
    {
      icon: <img src = {icon5} className="w-12 h-12 text-[#8F533C] object-contain mix-blend-multiply"  />,
      title: 'PRIVATE LABEL SOLUTIONS',
      description: 'End-to-end private label services from concept to shelf.',
    },
    {
      icon:  <img src = {icon6} className="w-12 h-12 text-[#8F533C] object-contain mix-blend-multiply"  />,
      title: 'EXPORT EXPERTISE',
      description: 'Documentation, compliance and logistics support for smooth exports.',
    },
  ];

  return (
    <section className="py-8 ">
      <div className="w-full px-6 sm:px-10 lg:px-20">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-1 flex flex-col items-center gap-2">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C2623] font-medium tracking-tight">
            Why Global Buyers Choose Tanshu
          </h2>
          <div className="h-[1px]  w-16 my-1" />
          <p className="font-sans text-sm sm:text-base text-[#615751] italic">
            Partner with a manufacturer that understands your market and grows with your brand.
          </p>
        </div>

        {/* 6-Column Grid in a straight left-to-right row */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 md:gap-4 lg:gap-6 text-center justify-center items-start">
          {benefits.map((b, index) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex flex-col items-center gap-3.5 group"
            >
              {/* Icon */}
              <div className="w-16 h-16 flex items-center justify-center shrink-0">
                {b.icon}
              </div>
              
              {/* Content */}
              <div className="flex flex-col gap-1.5">
                <h3 className="font-sans text-[10px] lg:text-xs font-bold tracking-[0.10em] text-[#2C2623] leading-snug">
                  {b.title}
                </h3>
                <p className="font-sans text-[10px] lg:text-xs text-[#615751] leading-relaxed max-w-[150px] mx-auto font-light">
                  {b.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
