import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  Globe,
  Gift,
  Sun,
  Coffee,
  TreePine,
  Egg,
  Ghost,
  Flame,
  Palette,
  Award,
  PenLine,
  Package,
} from 'lucide-react';
import { RugsDetailsPage } from './RugsDetailsPage';
import { getSubCategoryList } from '../api';
import { getCollectionPathSegments, pushCollectionPath } from './collectionRouting';
// Static fallback banner — commented out so the hero always reflects the
// category image the API/admin panel provides, with no hardcoded fallback.
// import heroImageDefault from '../assets/collection/SessonalCollectiondetails.jpg';

interface SeasonalCollectionDetailPageProps {
  categorySlug: string;
  categoryName?: string;
  heroImage?: string;
  heroDescription?: string;
  onBack: () => void;
}

interface ApiSubCategory {
  subCatID: string;
  subCategoryName: string;
  subCatImg: string;
  subCatIcon: string;
  shortDescription: string;
  subCategorySlug: string;
}

interface SubCategoryCard {
  slug: string;
  name: string;
  image: string;
  description: string;
}

const features = [
  { icon: <Sparkles size={14} />, label: 'Timeless Designs' },
  { icon: <Globe size={14} />, label: 'Global Inspiration' },
  { icon: <Gift size={14} />, label: 'Limited Editions' },
];

// Named-season icon lookup for the categories the reference design anticipated;
// any sub-category name the API returns outside this set still gets a sensible icon.
const categoryIcons: Record<string, React.ReactNode> = {
  'Spring Summer': <Sun size={18} />,
  'Autumn Winter': <Coffee size={18} />,
  Christmas: <TreePine size={18} />,
  Easter: <Egg size={18} />,
  Halloween: <Ghost size={18} />,
  'Festival Collection': <Flame size={18} />,
};

const trustItems = [
  {
    icon: <Palette size={22} />,
    title: 'Trending Designs',
    description: 'Stay ahead with our latest seasonal trends.',
  },
  {
    icon: <Award size={22} />,
    title: 'Limited Editions',
    description: 'Exclusive collections in limited quantities.',
  },
  {
    icon: <PenLine size={22} />,
    title: 'Custom Seasonal Designs',
    description: 'OEM & custom development as per your brand needs.',
  },
  {
    icon: <Package size={22} />,
    title: 'Bulk & Export Ready',
    description: 'High-quality production with global delivery support.',
  },
];

export const SeasonalCollectionDetailPage: React.FC<SeasonalCollectionDetailPageProps> = ({
  categorySlug,
  categoryName = 'Seasonal Collection',
  heroImage,
  heroDescription = 'Exclusive handcrafted collections inspired by every season and celebration around the world.',
  onBack,
}) => {
  const [subCategories, setSubCategories] = useState<SubCategoryCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategoryCard | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getSubCategoryList(categorySlug)
      .then((res: { data?: { data?: ApiSubCategory[] } }) => {
        if (cancelled) return;
        const list = res?.data?.data ?? [];
        setSubCategories(
          list.map((item) => ({
            slug: item.subCategorySlug,
            name: item.subCategoryName,
            image: item.subCatImg,
            description: item.shortDescription,
          }))
        );
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Failed to load seasonal sub-categories.', err);
        setError('Could not load seasonal collections right now. Please try again shortly.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [categorySlug]);

  // Apply a sub-category deep link (e.g. /collections/seasonal-collection/christmas) once the list has loaded.
  useEffect(() => {
    const subSlug = getCollectionPathSegments()[1];
    if (!subSlug || subCategories.length === 0) return;
    const match = subCategories.find((item) => item.slug === subSlug);
    if (match) setSelectedSubCategory(match);
  }, [subCategories]);

  useEffect(() => {
    const onPopState = () => {
      const subSlug = getCollectionPathSegments()[1];
      if (!subSlug) {
        setSelectedSubCategory(null);
        return;
      }
      const match = subCategories.find((item) => item.slug === subSlug);
      setSelectedSubCategory(match ?? null);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [subCategories]);

  const handleCategoryClick = (category: SubCategoryCard) => {
    setSelectedSubCategory(category);
    pushCollectionPath([categorySlug, category.slug]);
  };

  if (selectedSubCategory) {
    return (
      <RugsDetailsPage
        categorySlug={categorySlug}
        subCategorySlug={selectedSubCategory.slug}
        categoryName={categoryName}
        subCategoryName={selectedSubCategory.name}
        subCategoryImage={selectedSubCategory.image}
        subCategoryDescription={selectedSubCategory.description}
        onBack={() => {
          setSelectedSubCategory(null);
          pushCollectionPath([categorySlug]);
        }}
      />
    );
  }

  return (
    <div className="pt-16 sm:pt-[76px] bg-[#FAF8F5]">
      {/* Hero */}
      <section className="relative min-h-[280px] sm:min-h-[320px] flex items-end overflow-hidden bg-[#2C2623]">
        {/* No static fallback image here on purpose — renders automatically
            once the API/admin panel provides a category image. */}
        {heroImage && (
          <img
            src={heroImage}
            alt={categoryName}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_75%_at_0%_100%,_rgba(44,38,35,0.88)_0%,_rgba(44,38,35,0.5)_40%,_transparent_75%)]" />

        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-20 pb-14">
          {/* Breadcrumb */}
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm sm:text-base font-sans font-bold text-white/70 hover:text-white transition-colors cursor-pointer mb-4"
          >
            <span className="hover:underline">Home</span>
            <span>&gt;</span>
            <span className="hover:underline">Collections</span>
            <span>&gt;</span>
            <span className="text-white">{categoryName}</span>
          </button>

          <h1 className="font-serif text-3xl sm:text-4xl text-white font-medium">{categoryName}</h1>
          <div className="h-[2px] w-12 bg-[#8F533C] my-2.5" />
          <p className="font-sans text-sm text-white/80 max-w-md leading-relaxed">
            {heroDescription}
          </p>

          {/* Feature badges */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5">
            {features.map((feature) => (
              <div key={feature.label} className="flex items-center gap-2 text-white/85">
                <span className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center">
                  {feature.icon}
                </span>
                <span className="font-sans text-xs font-medium">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category grid */}
      <section className="pt-6 pb-6">
        <div className="w-full px-6 sm:px-10 lg:px-20">
          <div className="flex flex-col items-center text-center gap-1 mb-6">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#2C2623] font-medium tracking-tight">
              Explore Our <span className="relative">
                Seasonal
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#8F533C]" />
              </span> Collections
            </h2>
          </div>

          {loading && (
            <p className="text-center font-sans text-sm text-[#615751] py-10">Loading seasonal collections...</p>
          )}

          {!loading && error && (
            <p className="text-center font-sans text-sm text-[#C0392B] py-10">{error}</p>
          )}

          {!loading && !error && subCategories.length === 0 && (
            <p className="text-center font-sans text-sm text-[#615751] py-10">
              No seasonal collections available right now — check back soon.
            </p>
          )}

          {!loading && !error && subCategories.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
              {subCategories.map((category, index) => (
                <motion.div
                  key={category.slug}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => handleCategoryClick(category)}
                  className="group cursor-pointer flex flex-col bg-white border border-[#EBE4DC] shadow-xs hover:border-[#8F533C]/40 hover:shadow-md transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#F4EFEA]">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div className="relative flex justify-center">
                    <div className="absolute -top-5 w-10 h-10 rounded-full bg-white border border-[#EBE4DC] shadow-sm flex items-center justify-center text-[#8F533C]">
                      {categoryIcons[category.name] ?? <Sparkles size={18} />}
                    </div>
                  </div>

                  <div className="flex flex-col items-center text-center gap-1 px-3 pt-7 pb-5">
                    <h3 className="font-serif text-sm text-[#2C2623] font-bold line-clamp-1">{category.name}</h3>
                    <p className="font-sans text-[11px] text-[#615751] leading-snug line-clamp-2 min-h-[2.1em] font-medium">
                      {category.description}
                    </p>
                    <span className="mt-1 inline-flex items-center gap-1 font-sans text-[9px] font-bold tracking-widest uppercase text-[#8F533C]">
                      View Collection
                      <ArrowRight size={11} />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trust strip */}
      <div className="w-full pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-10 bg-[#F4EFEA] border border-[#EBE4DC] px-8 py-6">
          {trustItems.map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <span className="text-[#8F533C] shrink-0 mt-0.5">{item.icon}</span>
              <div className="flex flex-col gap-0.5">
                <h5 className="font-serif text-sm text-[#2C2623] font-medium">{item.title}</h5>
                <p className="font-sans text-[11px] text-[#615751] leading-snug">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
