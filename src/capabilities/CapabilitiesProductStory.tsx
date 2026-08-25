import React from 'react';
import wovenIcon from '../assets/Cpablities icon/woven.png';
import dyeingIcon from '../assets/Cpablities icon/image.png';
import braidedIcon from '../assets/Cpablities icon/braided.png';
import tuftedIcon from '../assets/Cpablities icon/Tufting Gun.png';
import knottedIcon from '../assets/Cpablities icon/hand knotted.png';
import macrameIcon from '../assets/Cpablities icon/macrame.png';
import juteWeavingIcon from '../assets/Cpablities icon/jute weave.png';
import stitchedIcon from '../assets/Cpablities icon/stitched.png';
import printedIcon from '../assets/Cpablities icon/printed.png';
import customIcon from '../assets/Cpablities icon/custom.png';

import wovenPhoto from '../assets/Cpablities icon/handowvenimage .jpg';
import braidedPhoto from '../assets/Manufacturing/braided (1).jpg';
import stitchedPhoto from '../assets/Manufacturing/image copy.jpg';
import tuftedPhoto from '../assets/Capablities/handcrafted.jpeg';
import knottedPhoto from '../assets/Capablities/cpapiblitieshero.jpg';
import macramePhoto from '../assets/Capablities/Sustaibility.jpg';
import juteWeavingPhoto from '../assets/Customisation-Studio/labeling.jpg';
import printedPhoto from '../assets/Customisation-Studio/Materals.jpg';
import dyeingPhoto from '../assets/finalimages1/wool.jpg';
import customPhoto from '../assets/Capablities/ChatGPT Image Aug 1, 2026, 01_27_13 PM.jpg';

interface StorySection {
  id: string;
  icon: string;
  label: string;
  image: string;
  description: string;
}

const sections: StorySection[] = [
  {
    id: 'story',
    icon: wovenIcon,
    label: 'Hand Woven',
    image: wovenPhoto,
    description:
      'Every Handwoven we manufacture begins with careful design thinking, blending traditional craftsmanship with modern functionality for global home and lifestyle markets.',
  },
  {
    id: 'Braided',
    icon: braidedIcon,
    label: 'Braided',
    image: braidedPhoto,
    description:
      'Crafted from natural, recycled & sustainable fibers including cotton, jute, wool and linen, chosen for durability, texture and a natural finish.',
  },
  {
    id: 'Hand tufted',
    icon: tuftedIcon,
    label: 'Hand tufted',
    image: tuftedPhoto,
    description:
      'Hand-finished construction built for durability and consistent quality at scale, combining traditional technique with careful quality checks at every stage.',
  },
  {
    id: 'Hand Knotted',
    icon: knottedIcon,
    label: 'Hand Knotted',
    image: knottedPhoto,
    description: 'Available in a wide range of standard and fully custom sizes to match buyer specifications.',
  },
  {
    id: 'Macrame',
    icon: macrameIcon,
    label: 'Macrame',
    image: macramePhoto,
    description:
      'Spot clean with a damp cloth. Avoid harsh chemicals and prolonged direct sunlight to preserve colour and texture. Professional cleaning recommended for deep stains.',
  },
  {
    id: 'Jute Weaving',
    icon: juteWeavingIcon,
    label: 'Jute Weaving',
    image: juteWeavingPhoto,
    description:
      'Compression-packed in moisture-resistant wrapping with reinforced cartons, tested for safe, cost-efficient global shipping.',
  },
  {
    id: 'Stitched',
    icon: stitchedIcon,
    label: 'Stitched',
    image: stitchedPhoto,
    description:
      'Minimum order quantities and lead times are tailored to each product category and order volume — get in touch for a tailored quote.',
  },
  {
    id: 'Printed',
    icon: printedIcon,
    label: 'Printed',
    image: printedPhoto,
    description: 'Manufactured in a facility that follows ISO 9001:2015 quality management practices.',
  },
  {
    id: 'Dyeing & Finishing',
    icon: dyeingIcon,
    label: 'Dyeing & Finishing',
    image: dyeingPhoto,
    description: 'Manufactured in a facility that follows ISO 9001:2015 quality management practices.',
  },
  {
    id: 'Custom Construction',
    icon: customIcon,
    label: 'Custom Construction',
    image: customPhoto,
    description: 'Manufactured in a facility that follows ISO 9001:2015 quality management practices.',
  },
];

export const CapabilitiesProductStory: React.FC = () => {
  return (
    <section className="bg-white pt-8 pb-6">
      <div className="w-full px-6 sm:px-[80px]">
        <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#2C2623] font-medium whitespace-nowrap mb-8">
          Our Manufacturing Styles &amp; Techniques
        </h2>
      </div>
      <div className="w-full px-5 sm:px-[80px] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
        {sections.map((section) => (
          <div key={section.id} className="group relative aspect-3/4 overflow-hidden rounded-xl bg-[#F4EFEA] border border-[#EBE4DC] cursor-pointer">
            <img
              src={section.image}
              alt={section.label}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 transition-transform duration-500 ease-out group-hover:-translate-y-2">
              <h4 className="font-sans text-sm sm:text-base font-bold text-white uppercase tracking-wide">
                {section.label}
              </h4>
              <p className="mt-1 font-sans text-[11px] sm:text-xs font-bold text-white leading-snug">
                {section.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
