import React, { useEffect, useRef } from 'react';

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

import wovenIcon from '../assets/Cpablities icon/woven.png';
import braidedIcon from '../assets/Cpablities icon/braided.png';
import tuftedIcon from '../assets/Cpablities icon/Tufting Gun.png';
import knottedIcon from '../assets/Cpablities icon/hand knotted.png';
import macrameIcon from '../assets/Cpablities icon/macrame.png';
import juteWeavingIcon from '../assets/Cpablities icon/jute weave.png';
import stitchedIcon from '../assets/Cpablities icon/stitched.png';
import printedIcon from '../assets/Cpablities icon/printed.png';
import dyeingIcon from '../assets/Cpablities icon/image.png';
import customIcon from '../assets/Cpablities icon/custom.png';

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

// Stacking-cards scroll effect built on `position: fixed` (not `sticky`) so it
// pins reliably regardless of ancestor overflow containers. `wrapperRef` is a
// tall spacer (`count * 100vh`); scrolling through it drives a `slot` +
// `progress` pair via `getBoundingClientRect()`, and each card's translateY
// (the actual cover motion) is written directly off that scroll position —
// no timers, no auto-playing transition, movement is 1:1 with scroll input.
const DIM_MAX = 0.55;

function useStackedScroll(count: number) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf: number | null = null;

    const compute = () => {
      raf = null;
      const wrapper = wrapperRef.current;
      const layer = layerRef.current;
      const heading = headingRef.current;
      if (!wrapper || !layer) return;

      const vh = window.innerHeight;
      const rect = wrapper.getBoundingClientRect();
      // Derive the total scroll distance from the wrapper's own rendered
      // height (not a separately recomputed count*vh) so it exactly matches
      // whatever triggers afterPin (rect.bottom <= 0) below — any mismatch
      // between the two used to leave a stale frame where the last card was
      // still pinned while Infrastructure had already started scrolling in
      // underneath it, i.e. it looked "dragged along".
      const total = rect.height;

      const beforePin = rect.top > 0;
      const afterPin = rect.bottom <= 0;

      if (beforePin || afterPin) {
        layer.style.visibility = 'hidden';
        if (heading) heading.style.visibility = 'hidden';
        return;
      }

      layer.style.visibility = 'visible';

      const local = Math.min(total - 0.01, Math.max(0, -rect.top));
      const transitionIndex = Math.min(count - 2, Math.floor(local / vh));
      const progress = Math.min(1, Math.max(0, (local - transitionIndex * vh) / vh));

      // The heading is a zero-height fixed overlay (not normal flow) so it
      // never pushes the wrapper down — that flow-height was exactly what
      // caused a dead scroll gap before the pin engaged. Only show it while
      // the first card is still the one being covered.
      if (heading) heading.style.visibility = transitionIndex === 0 ? 'visible' : 'hidden';

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const inner = el.querySelector<HTMLDivElement>('[data-card-inner]');

        if (i === transitionIndex + 1) {
          el.style.transform = `translateY(${(1 - progress) * 100}%)`;
          if (inner) {
            inner.style.transform = 'scale(1)';
            inner.style.setProperty('--dim', '0');
          }
        } else if (i === transitionIndex) {
          el.style.transform = 'translateY(0)';
          if (inner) {
            inner.style.transform = `scale(${1 - progress * 0.08})`;
            inner.style.setProperty('--dim', (progress * DIM_MAX).toFixed(3));
          }
        } else if (i < transitionIndex) {
          el.style.transform = 'translateY(0)';
          if (inner) {
            inner.style.transform = 'scale(0.92)';
            inner.style.setProperty('--dim', DIM_MAX.toFixed(3));
          }
        } else {
          el.style.transform = 'translateY(100%)';
        }
      });
    };

    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [count]);

  return { wrapperRef, layerRef, headingRef, cardRefs };
}

export const CapabilitiesProductStory: React.FC = () => {
  const { wrapperRef, layerRef, headingRef, cardRefs } = useStackedScroll(sections.length);

  return (
    <section className="bg-white" style={{ paddingBottom: '5px' }}>
      <style>{`
        .stack-fixed-layer {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          height: 100vh;
          z-index: 40;
        }

        .stack-card {
          position: absolute;
          top: 16px;
          left: 0;
          right: 0;
          bottom: 16px;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .stack-card-inner {
          position: absolute;
          inset: 0;
          transform-origin: center top;
          transition: transform 0.05s linear;
        }

        .stack-card-inner::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0, var(--dim, 0));
          transition: background 0.05s linear;
          pointer-events: none;
        }

        .stack-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          animation: stackImgZoom 14s ease-in-out infinite;
        }

        @keyframes stackImgZoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .stack-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(10,8,6,0.78) 0%,
            rgba(10,8,6,0.42) 38%,
            rgba(10,8,6,0.05) 62%,
            rgba(10,8,6,0) 100%
          );
        }

        .stack-content {
          position: relative;
          z-index: 2;
          padding: 0 7vw;
          max-width: 520px;
        }

        @media (max-width: 720px) {
          .stack-content { padding: 0 6vw; max-width: 100%; }
        }
      `}</style>

      <div
        ref={headingRef}
        className="fixed top-0 left-0 right-0 z-60 w-full bg-white px-6 sm:px-20 pt-8 pb-4"
        style={{ visibility: 'hidden' }}
      >
        <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#2C2623] font-medium whitespace-nowrap">
          Our Manufacturing Styles &amp; Techniques
        </h2>
      </div>

      <div ref={wrapperRef} style={{ position: 'relative', height: `${(sections.length - 1) * 100}vh` }}>
      <div ref={layerRef} className="stack-fixed-layer">
      {sections.map((section, i) => (
        <div
          key={section.id}
          className="stack-card"
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          style={{ zIndex: i + 1 }}
        >
          <div className="stack-card-inner" data-card-inner>
            <img className="stack-img" src={section.image} alt={section.label} />
            <div className="stack-overlay" />
          </div>

          <div className="stack-content">
            <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold text-[#C9962C] uppercase tracking-wide mb-4">
              {section.label}
            </h2>
            <p className="font-sans text-[18px] sm:text-[20px] text-white/90 leading-relaxed">
              {section.description}
            </p>
          </div>
        </div>
      ))}
      </div>
      </div>
    </section>
  );
};
