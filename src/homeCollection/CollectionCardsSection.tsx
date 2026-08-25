import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

import { getCategoryList } from '../api';
// Static fallback assets — only used by the commented-out FALLBACK_CARDS below.
// import homeCollectionImage from '../assets/collection/HomeCollection.jpg';
// import petUtilityImage from '../assets/collection/Petutility.jpg';
// import seasonalCollectionImage from '../assets/collection/SesonalCollection.jpg';
// import homeIcon from '../assets/Icons/HomeCollection.png';
// import petIcon from '../assets/Icons/Petutility.png';
// import seasonalIcon from '../assets/Icons/Sesonal.png';


interface CardConfig {
  key: string;
  categorySlug: string;
  title: string;
  description: string;
  cta: string;
  image: string;
  icon: React.ReactNode;
}

interface ApiCategory {
  catID: string;
  categoryName: string;
  catImage: string;
  catIcon: string;
  shortDescription: string;
  categorySlug: string;
}

// Static fallback cards — commented out so the section never shows hardcoded
// content that then gets visibly replaced by the API response. A loading
// state is shown instead until the real category-list data arrives.
// const FALLBACK_CARDS: CardConfig[] = [
//   {
//     key: 'home-decor',
//     categorySlug: 'home-collection-1',
//     title: 'Home Collection',
//     description: 'Beautiful handcrafted home décor designed for comfort, style, and everyday living.',
//     cta: 'Explore Home Collection',
//     image: homeCollectionImage,
//     icon: <img src={homeIcon} alt="" className="w-7 h-7 object-contain" />,
//   },
//   {
//     key: 'pet-living',
//     categorySlug: 'pet-utility-1',
//     title: 'Pet Utility',
//     description: 'Premium handmade pet essentials combining comfort, durability and elegant design.',
//     cta: 'Explore Pet Utility',
//     image: petUtilityImage,
//     icon: <img src={petIcon} alt="" className="w-7 h-7 object-contain" />,
//   },
//   {
//     key: 'seasonal',
//     categorySlug: 'seasonal-collection-1',
//     title: 'Seasonal Collection',
//     description: 'Fresh collections inspired by every season and celebration around the world.',
//     cta: 'Explore Seasonal Collection',
//     image: seasonalCollectionImage,
//     icon: <img src={seasonalIcon} alt="" className="w-7 h-7 object-contain" />,
//   },
// ];

interface CollectionCardsSectionProps {
  onOpenHomeCollection: (categorySlug: string, categoryName: string, categoryImage: string, categoryDescription: string) => void;
  onOpenSeasonalCollection: (categorySlug: string, categoryName: string, categoryImage: string, categoryDescription: string) => void;
}

// Maps the API's free-form categorySlug/categoryName to the fixed collection
// keys used to route to the dedicated Seasonal page. Categories that don't
// match a known keyword still render as a card, just keyed by their own
// categorySlug, and route through the generic collection detail page.
const resolveCollectionKey = (categorySlug: string, categoryName: string): 'pet-living' | 'seasonal' | 'home-decor' | null => {
  const text = `${categorySlug} ${categoryName}`.toLowerCase();
  if (text.includes('pet')) return 'pet-living';
  if (text.includes('season')) return 'seasonal';
  if (text.includes('home')) return 'home-decor';
  return null;
};

export const CollectionCardsSection: React.FC<CollectionCardsSectionProps> = ({
  onOpenHomeCollection,
  onOpenSeasonalCollection,
}) => {
  const [cards, setCards] = useState<CardConfig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getCategoryList()
      .then((res: { data?: { data?: ApiCategory[] } }) => {
        if (cancelled) return;
        const categories = res?.data?.data ?? [];
        const mapped = categories.map((item): CardConfig => ({
          key: resolveCollectionKey(item.categorySlug, item.categoryName) ?? item.categorySlug,
          categorySlug: item.categorySlug,
          title: item.categoryName,
          description: item.shortDescription,
          cta: `Explore ${item.categoryName}`,
          image: item.catImage,
          icon: <img src={item.catIcon} alt="" className="w-7 h-7 object-contain" />,
        }));
        setCards(mapped);
      })
      .catch((err) => {
        console.error('Failed to load product categories.', err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleCardClick = (card: CardConfig) => {
    if (card.key === 'seasonal') {
      onOpenSeasonalCollection(card.categorySlug, card.title, card.image, card.description);
    } else {
      onOpenHomeCollection(card.categorySlug, card.title, card.image, card.description);
    }
  };

  return (
    <section className="bg-[#FAF8F5] pb-2">
      <div className="w-full px-6 sm:px-10 lg:px-20 pt-8">
        {loading && (
          <p className="text-center font-sans text-sm text-[#615751] py-10">Loading collections...</p>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {!loading && cards.map((card, index) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              onClick={() => handleCardClick(card)}
              className="group cursor-pointer flex flex-col bg-[#FAF8F5] border border-[#EBE4DC] shadow-xs hover:border-[#16294B]/30 hover:shadow-md rounded-xl overflow-hidden transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[16/8] overflow-hidden bg-[#F4EFEA]">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Icon badge straddling the image / body seam */}
              <div className="relative flex justify-center">
                <div className="absolute -top-6 w-12 h-12 rounded-full bg-white shadow-sm border border-[#EBE4DC] flex items-center justify-center text-[#16294B]">
                  {card.icon}
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col items-center text-center gap-2 px-6 pt-8 pb-6">
                <h3 className="font-serif text-lg text-black font-semibold">{card.title}</h3>
                <p className="font-sans text-xs text-black leading-relaxed font-normal">
                  {card.description}
                </p>
                <span className="mt-1 inline-flex items-center gap-1.5 font-sans text-xs font-bold tracking-widest uppercase text-[#A76043] group-hover:gap-2.5 transition-all">
                  {card.cta}
                  <ArrowRight size={13} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
