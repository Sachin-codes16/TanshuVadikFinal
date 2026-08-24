import React from 'react';
import heroImage from '../assets/images/heartbehind.jpg';
import teamHeroImage from '../assets/Our Team/our team hero image (2).png';
import businessHeroImage from '../assets/finalimages1/image2.jpg';

export type AboutTab = 'about' | 'business' | 'team';

interface Tab {
  key: AboutTab;
  label: string;
}

const tabs: Tab[] = [
  { key: 'about', label: 'ABOUT US' },
  { key: 'business', label: 'BUSINESS' },
  { key: 'team', label: 'OUR TEAM' },
];

interface HeroContent {
  image: string;
  eyebrow?: string;
  title: string;
  tagline?: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}

const heroContent: Record<AboutTab, HeroContent> = {
  about: {
    image: heroImage,
    eyebrow: 'Tanshu Vaidik India Pvt. Ltd.',
    title: 'About Us',
    description:
      'Delivering handcrafted home décor and lifestyle products from Panipat, India to buyers across the world.',
    ctaLabel: 'Explore Our Story',
    ctaHref: '#about-intro',
  },
  business: {
    image: businessHeroImage,
    eyebrow: 'Tanshu Vaidik India Pvt. Ltd.',
    title: 'How We Do Business',
    description:
      'A transparent, customer-first approach spanning sourcing, manufacturing, quality control, and global delivery.',
    ctaLabel: 'Explore Our Process',
    ctaHref: '#about-business',
  },
  team: {
    image: teamHeroImage,
    title: 'Our Team',
    tagline: 'Driven by passion. United by purpose. Creating handcrafted excellence for the world.',
    description:
      'Tanshu Vaidik is powered by a dedicated team of creators, innovators and craft champions.',
  },
};

interface AboutHeroProps {
  activeTab: AboutTab;
  onTabChange: (tab: AboutTab) => void;
}

export const AboutHero: React.FC<AboutHeroProps> = (props: AboutHeroProps) => {
  const { activeTab, onTabChange } = props;
  const content: HeroContent = heroContent[activeTab];

  return (
    <div>
      {/* Full width hero banner */}
      <div className="relative w-full h-[420px] sm:h-[480px] overflow-hidden bg-[#2C2623]">
        <img
          src={content.image}
          alt={content.title}
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(44,38,35,0.8)_0%,rgba(44,38,35,0.8)_18%,rgba(44,38,35,0)_32%)]" />

        <div className="relative z-10 h-full w-full px-[20px] flex flex-col justify-center gap-5 max-w-2xl">
          {content.eyebrow && (
            <span className="font-sans text-[11px] font-bold tracking-[0.3em] text-[#D8B88A] uppercase">
              {content.eyebrow}
            </span>
          )}
          <div>
            <h1 className="font-serif text-4xl sm:text-6xl text-white tracking-tight font-bold uppercase leading-none">
              {content.title}
            </h1>
            <span className="block h-[2px] w-14 bg-[#D8B88A] mt-4" />
          </div>
          {content.tagline && (
            <p
              className={`font-serif italic text-lg sm:text-xl text-[#F4EFEA] leading-snug ${
                activeTab === 'team' ? 'max-w-65' : 'max-w-lg'
              }`}
            >
              {content.tagline}
            </p>
          )}
          <p
            className={`font-sans text-sm sm:text-base text-[#F4EFEA] leading-relaxed ${
              activeTab === 'team' ? 'max-w-55' : 'max-w-lg'
            }`}
          >
            {content.description}
          </p>
          {content.ctaLabel && content.ctaHref && (
            <a
              href={content.ctaHref}
              className="mt-2 inline-block w-fit px-6 py-3 bg-[#8F533C] hover:bg-[#723F2B] text-white font-sans text-xs font-bold tracking-widest uppercase transition-colors"
            >
              {content.ctaLabel} &rarr;
            </a>
          )}
        </div>
      </div>

      {/* Tab navigation */}
      <div className="w-full bg-[#FAF8F5] border-b border-[#EBE4DC]">
        <div className="w-full px-[20px] flex items-center gap-8 sm:gap-12 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`relative py-5 font-sans text-xs sm:text-sm font-bold tracking-widest uppercase whitespace-nowrap transition-colors cursor-pointer bg-transparent ${
                activeTab === tab.key
                  ? 'text-[#8F533C]'
                  : 'text-[#2C2623] hover:text-[#8F533C]'
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-[#8F533C]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
