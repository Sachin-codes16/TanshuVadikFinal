import React, { useLayoutEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import storyImage from '../assets/images/Carpet.jpeg';
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

const styleIcon = (src: string, alt: string) => (
  <img src={src} alt={alt} className="w-[22px] h-[22px] object-contain" />
);

// Pulls the image up on desktop so its top lines up with the "Our Manufacturing" heading
// instead of the content box below it; height grows by the same amount to keep the bottom aligned.
const IMAGE_LIFT_PX = 48;

interface StorySection {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  highlights?: string[];
  pdfUrl?: string;
}

const sections: StorySection[] = [
  {
    id: 'story',
    icon: styleIcon(wovenIcon, 'Hand Woven'),
    label: 'Hand Woven',
    description:
      'Every Handwoven we manufacture begins with careful design thinking, blending traditional craftsmanship with modern functionality for global home and lifestyle markets.',
    highlights: [
      'Premium quality',
      'Soft texture for superior comfort',
      'Strong & durable for long-lasting use',
      'Neutral design fits every interior',
      'Sustainable & eco-friendly materials',
    ],
  },
  {
    id: 'Braided',
    icon: styleIcon(braidedIcon, 'Braided'),
    label: 'Braided',
    description:
      'Crafted from natural, recycled & sustainable fibers including cotton, jute, wool and linen, chosen for durability, texture and a natural finish.',
  },
  {
    id: 'Hand tufted',
    icon: styleIcon(tuftedIcon, 'Hand tufted'),
    label: 'Hand tufted',
    description:
      'Hand-finished construction built for durability and consistent quality at scale, combining traditional technique with careful quality checks at every stage.',
  },
  {
    id: 'Hand Knotted',
    icon: styleIcon(knottedIcon, 'Hand Knotted'),
    label: 'Hand Knotted',
    description: 'Available in a wide range of standard and fully custom sizes to match buyer specifications.',
  },
  {
    id: 'Macrame',
    icon: styleIcon(macrameIcon, 'Macrame'),
    label: 'Macrame',
    description:
      'Spot clean with a damp cloth. Avoid harsh chemicals and prolonged direct sunlight to preserve colour and texture. Professional cleaning recommended for deep stains.',
  },
  {
    id: 'Jute Weaving',
    icon: styleIcon(juteWeavingIcon, 'Jute Weaving'),
    label: 'Jute Weaving',
    description:
      'Compression-packed in moisture-resistant wrapping with reinforced cartons, tested for safe, cost-efficient global shipping.',
    pdfUrl: '/documents/sample-spec-sheet.pdf',
  },
  {
    id: 'Stitched',
    icon: styleIcon(stitchedIcon, 'Stitched'),
    label: 'Stitched',
    description:
      'Minimum order quantities and lead times are tailored to each product category and order volume — get in touch for a tailored quote.',
  },
  {
    id: 'Printed',
    icon: styleIcon(printedIcon, 'Printed'),
    label: 'Printed',
    description: 'Manufactured in a facility that follows ISO 9001:2015 quality management practices.',
  },
   {
    id: 'Dyeing & Finishing',
    icon: styleIcon(dyeingIcon, 'Dyeing & Finishing'),
    label: 'Dyeing & Finishing',
    description: 'Manufactured in a facility that follows ISO 9001:2015 quality management practices.',
  },
   {
    id: 'Custom Construction',
    icon: styleIcon(customIcon, 'Custom Construction'),
    label: 'Custom Construction',
    description: 'Manufactured in a facility that follows ISO 9001:2015 quality management practices.',
  },
];

export const CapabilitiesProductStory: React.FC = () => {
  const [activeId, setActiveId] = useState(sections[0].id);
  const active = sections.find((section) => section.id === activeId) ?? sections[0];
  const contentRef = useRef<HTMLDivElement | null>(null);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    const measure = () => {
      if (window.innerWidth >= 1024 && contentRef.current && sidebarRef.current) {
        const measured = Math.max(
          contentRef.current.getBoundingClientRect().height,
          sidebarRef.current.getBoundingClientRect().height,
        );
        setContentHeight(measured);
      } else {
        setContentHeight(undefined);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [activeId]);

  return (
    <section className="bg-white pt-8 pb-6">
      <div className="w-full px-6 sm:px-[80px]">
        <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#2C2623] font-medium whitespace-nowrap mb-8">
          Our Manufacturing Styles &amp; Techniques
        </h2>
      </div>
      <div className="w-full px-5 sm:px-[80px] grid grid-cols-1 lg:grid-cols-[220px_1fr_1.1fr] gap-8 items-start">
        {/* Sidebar */}
        <div ref={sidebarRef} className="flex flex-col gap-0.5 bg-[#FAF8F5] rounded-2xl shadow-lg p-3">
          {sections.map((section, index) => (
            <React.Fragment key={section.id}>
              {index > 0 && <div className="mx-3 border-t border-[#DCD3C7]" />}
              <button
                onClick={() => setActiveId(section.id)}
                className={`flex items-center gap-3 px-3 py-3 text-left font-sans text-sm transition-colors cursor-pointer border-l-2 ${
                  active.id === section.id
                    ? 'bg-[#F4EFEA] text-[#2C2623] font-bold border-[#8F533C]'
                    : 'text-[#615751] hover:bg-[#FAF8F5] border-transparent'
                }`}
              >
                <span className="text-[#8F533C] shrink-0">{section.icon}</span>
                {section.label}
              </button>
            </React.Fragment>
          ))}
        </div>

        {/* Content */}
        <div ref={contentRef} className="min-w-0 bg-[#FAF8F5] rounded-2xl shadow-lg px-15 pt-6 pb-15 lg:min-h-[200px]">
          <h3 className="font-sans text-sm font-bold tracking-widest uppercase text-[#2C2623] mb-4">
            {active.label}
          </h3>
          <p className="font-sans text-sm text-[#615751] leading-relaxed">{active.description}</p>

          {active.pdfUrl && (
            <a
              href={active.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 border border-[#8F533C] text-[#8F533C] hover:bg-[#8F533C] hover:text-white font-button text-xs tracking-widest uppercase transition-colors cursor-pointer"
            >
              View More <ExternalLink size={16} />
            </a>
          )}
        </div>

        {/* Image */}
        <div
          className="relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-[#F4EFEA] lg:-mt-12"
          style={contentHeight ? { height: contentHeight + IMAGE_LIFT_PX } : undefined}
        >
          <img
            src={storyImage}
            alt="Tanshu Vaidik craftsmanship"
            className="w-full h-full object-cover scale-[1.8] object-center"
          />
        </div>
      </div>
    </section>
  );
};
