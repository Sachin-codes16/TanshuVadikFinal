import React, { useEffect, useRef, useState } from 'react';

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

interface StoryCard {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  accent: string;
}

const CARDS: StoryCard[] = [
  {
    eyebrow: 'TECHNIQUE',
    title: 'HAND WOVEN',
    description:
      'Every handwoven piece we manufacture begins with careful design thinking, blending traditional craftsmanship with modern functionality for global home and lifestyle markets.',
    image: wovenPhoto,
    accent: '#B4472F',
  },
  {
    eyebrow: 'TECHNIQUE',
    title: 'BRAIDED',
    description:
      'Crafted from natural, recycled & sustainable fibers including cotton, jute, wool and linen, chosen for durability, texture and a natural finish.',
    image: braidedPhoto,
    accent: '#C08A2E',
  },
  {
    eyebrow: 'TECHNIQUE',
    title: 'HAND TUFTED',
    description:
      'Hand-finished construction built for durability and consistent quality at scale, combining traditional technique with careful quality checks at every stage.',
    image: tuftedPhoto,
    accent: '#8C6A3F',
  },
  {
    eyebrow: 'PRODUCTION',
    title: 'HAND KNOTTED',
    description: 'Available in a wide range of standard and fully custom sizes to match buyer specifications.',
    image: knottedPhoto,
    accent: '#4A4038',
  },
  {
    eyebrow: 'CARE',
    title: 'MACRAME',
    description:
      'Spot clean with a damp cloth. Avoid harsh chemicals and prolonged direct sunlight to preserve colour and texture. Professional cleaning recommended for deep stains.',
    image: macramePhoto,
    accent: '#D8C3A0',
  },
  {
    eyebrow: 'PRODUCT',
    title: 'JUTE WEAVING',
    description:
      'Compression-packed in moisture-resistant wrapping with reinforced cartons, tested for safe, cost-efficient global shipping.',
    image: juteWeavingPhoto,
    accent: '#7A8B6F',
  },
  {
    eyebrow: 'PRODUCTION',
    title: 'STITCHED',
    description:
      'Minimum order quantities and lead times are tailored to each product category and order volume — get in touch for a tailored quote.',
    image: stitchedPhoto,
    accent: '#5B6670',
  },
  {
    eyebrow: 'PRODUCTION',
    title: 'PRINTED',
    description: 'Manufactured in a facility that follows ISO 9001:2015 quality management practices.',
    image: printedPhoto,
    accent: '#A99570',
  },
  {
    eyebrow: 'FINISHING',
    title: 'DYEING & FINISHING',
    description: 'Manufactured in a facility that follows ISO 9001:2015 quality management practices.',
    image: dyeingPhoto,
    accent: '#B0468A',
  },
  {
    eyebrow: 'PRODUCTION',
    title: 'CUSTOM CONSTRUCTION',
    description: 'Manufactured in a facility that follows ISO 9001:2015 quality management practices.',
    image: customPhoto,
    accent: '#6B5642',
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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf: number | null = null;

    const compute = () => {
      raf = null;
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const vh = window.innerHeight;
      const rect = wrapper.getBoundingClientRect();
      const total = count * vh;

      const beforePin = rect.top > 0;
      const afterPin = rect.bottom <= 0;

      if (beforePin || afterPin) {
        cardRefs.current.forEach((el) => {
          if (el) el.style.visibility = 'hidden';
        });
        setActive(beforePin ? 0 : count - 1);
        return;
      }

      const local = Math.min(total - 0.01, Math.max(0, -rect.top));
      const slot = Math.min(count - 1, Math.floor(local / vh));
      const progress = (local - slot * vh) / vh;

      setActive(slot);

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.visibility = 'visible';
        const inner = el.querySelector<HTMLDivElement>('[data-card-inner]');

        if (i === slot) {
          const enterProgress = slot === 0 ? 1 : progress;
          el.style.transform = `translateY(${(1 - enterProgress) * 100}%)`;
          if (inner) {
            inner.style.transform = 'scale(1)';
            inner.style.setProperty('--dim', '0');
          }
        } else if (i === slot - 1) {
          el.style.transform = 'translateY(0)';
          if (inner) {
            inner.style.transform = `scale(${1 - progress * 0.08})`;
            inner.style.setProperty('--dim', (progress * DIM_MAX).toFixed(3));
          }
        } else if (i < slot - 1) {
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

  return { wrapperRef, cardRefs, active };
}

export const CapabilitiesProductStory: React.FC = () => {
  const { wrapperRef, cardRefs, active } = useStackedScroll(CARDS.length);

  return (
    <div style={{ fontFamily: "'Work Sans', sans-serif", background: '#F4EEE3' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,600&family=Work+Sans:wght@400;500;600&display=swap');

        .stack-card {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 100vh;
          display: flex;
          align-items: flex-end;
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
        }

        .stack-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10,8,6,0.88) 0%,
            rgba(10,8,6,0.45) 32%,
            rgba(10,8,6,0.05) 60%,
            rgba(10,8,6,0) 100%
          );
        }

        .stack-content {
          position: relative;
          z-index: 2;
          padding: 0 7vw 9vh 7vw;
          max-width: 640px;
        }

        .rail {
          position: fixed;
          right: 28px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 50;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .rail-dot {
          width: 8px;
          height: 8px;
          border-radius: 2px;
          background: rgba(28,24,21,0.25);
          transition: all 0.25s ease;
        }

        .rail-dot.active {
          height: 22px;
          background: #B4472F;
        }

        @media (max-width: 720px) {
          .stack-content { padding: 0 6vw 7vh 6vw; max-width: 100%; }
          .rail { right: 14px; }
        }
      `}</style>

      <div
        style={{
          minHeight: '58vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 7vw',
        }}
      >
        <p
          style={{
            fontFamily: "'Work Sans', sans-serif",
            fontWeight: 600,
            letterSpacing: '0.16em',
            fontSize: '0.72rem',
            color: '#B4472F',
            marginBottom: '18px',
          }}
        >
          MADE BY HAND
        </p>
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 500,
            fontSize: 'clamp(2.2rem, 5.6vw, 4.4rem)',
            color: '#1C1815',
            lineHeight: 1.05,
            margin: 0,
            maxWidth: '18ch',
          }}
        >
          Ten techniques, one craft.
        </h1>
        <p
          style={{
            marginTop: '22px',
            fontSize: '1.02rem',
            color: '#5B5148',
            maxWidth: '46ch',
            lineHeight: 1.6,
          }}
        >
          Scroll to move through every construction method, material and finishing process our looms and hands
          produce.
        </p>
      </div>

      <div className="rail">
        {CARDS.map((_, i) => (
          <div key={i} className={`rail-dot ${i === active ? 'active' : ''}`} />
        ))}
      </div>

      <div ref={wrapperRef} style={{ position: 'relative', height: `${CARDS.length * 100}vh` }}>
      {CARDS.map((card, i) => (
        <div
          key={card.title}
          className="stack-card"
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          style={{ zIndex: i + 1 }}
        >
          <div className="stack-card-inner" data-card-inner>
            <img className="stack-img" src={card.image} alt={card.title} />
            <div className="stack-overlay" />
          </div>

          <div className="stack-content">
            <p
              style={{
                fontFamily: "'Work Sans', sans-serif",
                fontWeight: 600,
                letterSpacing: '0.16em',
                fontSize: '0.7rem',
                color: card.accent,
                marginBottom: '14px',
              }}
            >
              {card.eyebrow}
            </p>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 500,
                fontSize: 'clamp(1.8rem, 4vw, 2.9rem)',
                color: '#F4EEE3',
                margin: '0 0 16px 0',
                lineHeight: 1.05,
              }}
            >
              {card.title}
            </h2>
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.65,
                color: 'rgba(244,238,227,0.88)',
                margin: 0,
              }}
            >
              {card.description}
            </p>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};
