import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { RugsDetailsPage } from './RugsDetailsPage';
import { getSubCategoryList } from '../api';
import { getCollectionPathSegments, pushCollectionPath } from './collectionRouting';
import defaultHeroImage from '../assets/collection/homecollection1.jpg';

interface HomeCollectionDetailPageProps {
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
  icon: string;
  description: string;
}

export const HomeCollectionDetailPage: React.FC<HomeCollectionDetailPageProps> = ({
  categorySlug,
  categoryName = 'Home Collection',
  heroImage = defaultHeroImage,
  heroDescription = 'Timeless handcrafted home décor designed to elevate modern interiors worldwide.',
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
            icon: item.subCatIcon,
            description: item.shortDescription,
          }))
        );
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Failed to load sub-categories.', err);
        setError('Could not load categories right now. Please try again shortly.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [categorySlug]);

  // Apply a sub-category deep link (e.g. /collections/home-collection-1/rugs) once the list has loaded.
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
      <section className="relative min-h-[380px] sm:min-h-[440px] flex items-end overflow-hidden bg-[#2C2623]">
        <img
          src={heroImage}
          alt={categoryName}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_75%_at_0%_100%,_rgba(44,38,35,0.88)_0%,_rgba(44,38,35,0.5)_40%,_transparent_75%)]" />

        <button
          onClick={onBack}
          className="absolute top-6 left-6 z-20 flex items-center gap-2 text-sm sm:text-base font-bold tracking-widest uppercase text-white/90 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={18} />
          Back to Collections
        </button>

        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-20 pb-10 sm:pb-14">
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-medium">{categoryName}</h1>
          <div className="h-[2px] w-14 bg-[#8F533C] my-3" />
          <p className="font-sans text-sm sm:text-base text-white/80 max-w-xl leading-relaxed">
            {heroDescription}
          </p>
        </div>
      </section>

      {/* Category grid */}
      <section className="pt-6 pb-16">
        <div className="w-full px-6 sm:px-10 lg:px-20">
          <div className="flex flex-col items-center text-center gap-1 mb-6">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#2C2623] font-medium tracking-tight">
              Explore Our {categoryName} Categories
            </h2>
            <p className="font-sans text-sm text-[#615751]">
              Discover thoughtfully crafted products for every corner of your home.
            </p>
          </div>

          {loading && (
            <p className="text-center font-sans text-sm text-[#615751] py-10">Loading categories...</p>
          )}

          {!loading && error && (
            <p className="text-center font-sans text-sm text-[#C0392B] py-10">{error}</p>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {subCategories.map((category, index) => (
                <motion.div
                  key={category.slug}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  onClick={() => handleCategoryClick(category)}
                  className="group cursor-pointer flex flex-col bg-[#FAF8F5] border border-[#EBE4DC] shadow-xs hover:border-[#8F533C]/40 hover:shadow-md transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#F4EFEA]">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Icon badge straddling the image / body seam */}
                  <div className="relative flex justify-center">
                    <div className="absolute -top-6 w-12 h-12 rounded-full bg-white border border-[#EBE4DC] shadow-sm flex items-center justify-center text-[#8F533C] overflow-hidden">
                      <img src={category.icon} alt="" className="w-full h-full object-contain p-2" />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col items-center text-center gap-1 px-4 pt-8 pb-5">
                    <h3 className="font-serif text-lg text-[#2C2623] font-bold">{category.name}</h3>
                    <p className="font-sans text-xs text-[#615751] leading-relaxed font-medium line-clamp-2 min-h-[2.2em]">
                      {category.description}
                    </p>
                    <ArrowRight
                      size={14}
                      className="mt-1 text-[#8F533C] group-hover:translate-x-0.5 transition-transform"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
