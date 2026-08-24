import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  FileText,
  Layers,
  Hammer,
  Ruler,
  Droplets,
  PackageCheck,
  ClipboardList,
  BadgeCheck,
  Check,
  ExternalLink,
} from 'lucide-react';
import { Product, ProductDetailData } from '../types';
import defaultStoryImage from '../assets/collection/rugs2.jpg';

interface StorySection {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  isHtml?: boolean;
  highlights?: string[];
  pdfUrl?: string;
}

interface ProductStorySectionProps {
  product: Product;
  detail: ProductDetailData | null;
  image?: string;
}

export const ProductStorySection: React.FC<ProductStorySectionProps> = ({ product, detail, image }) => {
  const [activeId, setActiveId] = useState('story');
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);

  const sections: StorySection[] = [
    {
      id: 'story',
      icon: <FileText size={22} strokeWidth={1.5} />,
      label: 'Product Story',
      description: detail?.productStory ?? product.description,
      isHtml: Boolean(detail?.productStory),
      highlights: detail?.productStory
        ? undefined
        : [
            'Premium handwoven quality',
            'Soft texture for superior comfort',
            'Strong & durable for long-lasting use',
            'Neutral design fits every interior',
            'Sustainable & eco-friendly materials',
          ],
    },
    {
      id: 'materials',
      icon: <Layers size={22} strokeWidth={1.5} />,
      label: 'Materials',
      description: detail?.material ?? `Crafted from ${product.material}, chosen for durability, texture and a natural finish.`,
    },
    {
      id: 'construction',
      icon: <Hammer size={22} strokeWidth={1.5} />,
      label: 'Construction',
      description:
        detail?.construction ??
        'Hand-finished construction built for durability and consistent quality at scale, combining traditional technique with careful quality checks at every stage.',
    },
    {
      id: 'sizes',
      icon: <Ruler size={22} strokeWidth={1.5} />,
      label: 'Sizes',
      description: detail?.sizes ?? `Available in ${product.dimensions}.`,
    },
    {
      id: 'care',
      icon: <Droplets size={22} strokeWidth={1.5} />,
      label: 'Care Instructions',
      description:
        detail?.careInstructions ??
        'Spot clean with a damp cloth. Avoid harsh chemicals and prolonged direct sunlight to preserve colour and texture. Professional cleaning recommended for deep stains.',
    },
    {
      id: 'packaging',
      icon: <PackageCheck size={22} strokeWidth={1.5} />,
      label: 'Packaging',
      description:
        detail?.packaging ??
        'Compression-packed in moisture-resistant wrapping with reinforced cartons, tested for safe, cost-efficient global shipping.',
      pdfUrl: detail?.packagingCataloguePDF ?? '/documents/sample-spec-sheet.pdf',
    },
    {
      id: 'moq',
      icon: <ClipboardList size={22} strokeWidth={1.5} />,
      label: 'MOQ & Lead Time',
      description:
        detail?.moqLeadTime ??
        `Minimum order quantity: ${product.minOrderQuantity}. Standard lead time: ${product.leadTime}.`,
    },
    {
      id: 'certifications',
      icon: <BadgeCheck size={22} strokeWidth={1.5} />,
      label: 'Certifications',
      description:
        detail?.certifications ??
        'Manufactured in a facility that follows ISO 9001:2015 quality management practices.',
    },
  ];

  const active = sections.find((section) => section.id === activeId) ?? sections[0];

  useLayoutEffect(() => {
    const measure = () => {
      if (window.innerWidth >= 1024 && contentRef.current) {
        const measured = contentRef.current.getBoundingClientRect().height;
        setContentHeight((prev) => (prev ? Math.max(prev, measured) : measured));
      } else {
        setContentHeight(undefined);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [activeId]);

  return (
    <section className="bg-white py-8">
      <div className="w-full px-6 sm:px-[80px] grid grid-cols-1 lg:grid-cols-[220px_1fr_1.1fr] gap-8 items-start">
        {/* Sidebar */}
        <div className="flex flex-col bg-[#FAF8F5] rounded-2xl shadow-sm p-3">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveId(section.id)}
              style={{ transform: 'translateZ(0)' }}
              className={`flex items-center gap-3 px-3 py-2.5 text-left font-sans text-sm transition-colors cursor-pointer border-l-2 ${
                active.id === section.id
                  ? 'bg-[#F4EFEA] text-[#2C2623] font-bold border-[#8F533C]'
                  : 'text-[#615751] hover:bg-[#FAF8F5] border-transparent'
              }`}
            >
              <span className="text-[#8F533C] shrink-0">{section.icon}</span>
              {section.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div ref={contentRef} className="min-w-0 bg-[#FAF8F5] rounded-2xl shadow-sm p-6">
          <h3 className="font-sans text-sm font-bold tracking-widest uppercase text-[#2C2623] mb-4">
            {active.label}
          </h3>
          {active.isHtml ? (
            <div
              className="font-sans text-sm text-[#615751] leading-relaxed [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:text-[#2C2623] [&_strong]:font-bold [&_ul]:mt-3 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_li]:list-disc [&_li]:ml-4"
              dangerouslySetInnerHTML={{ __html: active.description }}
            />
          ) : (
            <p className="font-sans text-sm text-[#615751] leading-relaxed">{active.description}</p>
          )}

          {active.highlights && (
            <div className="bg-[#F4EFEA] border border-[#EBE4DC] p-5 mt-6">
              <span className="font-sans text-xs font-bold tracking-widest uppercase text-[#8F533C] block mb-3">
                Why Buyers Love It
              </span>
              <ul className="flex flex-col gap-2">
                {active.highlights.map((point) => (
                  <li key={point} className="flex items-start gap-2 font-sans text-sm text-[#615751]">
                    <Check size={18} className="text-[#8F533C] shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

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
          className="relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-[#F4EFEA] -my-8 lg:-mr-[80px]"
          style={contentHeight ? { height: contentHeight + 64 } : undefined}
        >
          <img
            src={image ?? defaultStoryImage}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
