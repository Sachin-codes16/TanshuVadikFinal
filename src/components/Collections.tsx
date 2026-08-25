import React, { useState, useMemo, useEffect } from 'react';
import { products } from '../data';
import { Product } from '../types';
import { useInquiry } from '../context/InquiryContext';
import { TrustStats } from './TrustStats';
import { Certifications } from './Certifications';
import { ProductShowcaseModal } from './ProductShowcaseModal';
import { getHomeCollections, getProductList } from '../api';
import { mapApiProduct } from '../homeCollection/productMapper';
import springCollection from "../assets/collection/Spring.jpg"
import fallCollection from "../assets/collection/Spring2.jpg"

import { motion, AnimatePresence } from 'motion/react';

interface CategoryCard {
  name: string;
  image: string;
  itemCount: number;
  subtitle?: string;
}

interface ApiHomeSubCategory {
  subCatID: string;
  subCategoryName: string;
  subCatImg: string;
  hoverImage: string | null;
  subCategorySlug: string;

}

interface ApiHomeCategory {
  categoryName: string;
  categorySlug: string;
  subCategories: ApiHomeSubCategory[];
}

// API-driven category order doesn't match the intended layout, so pin the
// Home Décor sub-categories to this exact sequence (mirrors homeDecorCategories below).
const HOME_DECOR_ORDER = [
  'rugs',
  'carpets',
  'bath mat',
  'cushion',
  'cusion',
  'throw',
  'basket',
  'planter',
  'table linen',
  'kitchen linen',
  'tote bag',
  'wall décor',
  'wall decor',
  'home accessories',
];

const reorderHomeDecor = (categories: ApiHomeCategory[]): ApiHomeCategory[] =>
  categories.map((category) => {
    const isHomeDecor = `${category.categorySlug} ${category.categoryName}`.toLowerCase().includes('home');
    if (!isHomeDecor) return category;

    const rank = (name: string) => {
      const lower = name.toLowerCase();
      const idx = HOME_DECOR_ORDER.findIndex((key) => lower.includes(key));
      return idx === -1 ? HOME_DECOR_ORDER.length : idx;
    };

    const subs = [...category.subCategories].sort((a, b) => rank(a.subCategoryName) - rank(b.subCategoryName));
    return { ...category, subCategories: subs };
  });

interface CollectionsProps {
  // Navigates to the same deep-linked /collections/:categorySlug/:subCategorySlug
  // detail page that clicking a sub-category inside /collections itself opens.
  onOpenSubCategory: (categorySlug: string, subCategorySlug: string) => void;
}

export const Collections: React.FC<CollectionsProps> = ({ onOpenSubCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [homeCategories, setHomeCategories] = useState<ApiHomeCategory[]>([]);
  const [homeCategoriesLoading, setHomeCategoriesLoading] = useState(true);

  // Nested loop straight from /api/home: categories -> subCategories.
  useEffect(() => {
    let cancelled = false;

    getHomeCollections()
      .then((res: { data?: { data?: ApiHomeCategory[] } }) => {
        if (cancelled) return;
        const list = res?.data?.data ?? [];
        setHomeCategories(reorderHomeDecor(list));
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Failed to load home collections.', err);
        setHomeCategories([]);
      })
      .finally(() => {
        if (!cancelled) setHomeCategoriesLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Custom Swatch Visualizer State
  const [weftColor, setWeftColor] = useState('#8F533C'); // Terracotta copper
  const [warpColor, setWarpColor] = useState('#2C2623'); // Earth charcoal
  const [patternType, setPatternType] = useState<'herringbone' | 'plaid' | 'waffle'>('herringbone');
  const [weaveDensity, setWeaveDensity] = useState<'standard' | 'double-tension'>('double-tension');
  const [customSize, setCustomSize] = useState('Medium Dining (160x230cm)');
  const [swatchInquired, setSwatchInquired] = useState(false);

  const { addToCart, setIsPortalOpen } = useInquiry();

  // Define Seasonal categories with counts and newly generated collection images
  const seasonalCategories: CategoryCard[] = useMemo(() => [
    {
      name: 'SPRING / SUMMER COLLECTION',
      image: springCollection,
      itemCount: products.filter(p => p.subcategory === 'Christmas Collection').length,
      subtitle: 'Bright, Breezy, Beautiful.'
    },
    {
      name: 'FALL / WINTER COLLECTION',
      image: fallCollection,
      itemCount: products.filter(p => p.subcategory === 'Fall Collection').length,
      subtitle: 'Warm, Cozy, Timeless.'
    }
  ], []);

  // Both the sub-category grid and the seasonal banners open the same showcase
  // modal with real products fetched from /api/product-list — the home page
  // teaser never navigates away, matching the reference's popup-based design.
  const [modalProducts, setModalProducts] = useState<Product[]>([]);
  const [loadingModalKey, setLoadingModalKey] = useState<string | null>(null);

  const handleSubCategoryClick = (category: ApiHomeCategory, sub: ApiHomeSubCategory) => {
    onOpenSubCategory(category.categorySlug, sub.subCategorySlug);
  };

  const handleSeasonalBannerClick = async (category: { name: string }) => {
    const lower = category.name.toLowerCase();
    const isSpringSummer = lower.includes('spring') || lower.includes('summer');

    const seasonalApiCategory = homeCategories.find((c) =>
      `${c.categorySlug} ${c.categoryName}`.toLowerCase().includes('season')
    );
    const matchedSub = seasonalApiCategory?.subCategories.find((sub) => {
      const subText = `${sub.subCategorySlug} ${sub.subCategoryName}`.toLowerCase();
      return isSpringSummer
        ? subText.includes('spring') || subText.includes('summer')
        : subText.includes('fall') || subText.includes('winter') || subText.includes('autumn');
    });

    if (!seasonalApiCategory || !matchedSub) {
      setModalProducts([]);
      setSelectedCategory(category.name);
      return;
    }

    setLoadingModalKey(category.name);
    try {
      const res = await getProductList(seasonalApiCategory.categorySlug, matchedSub.subCategorySlug);
      const list = res?.data?.data ?? [];
      setModalProducts(list.map(mapApiProduct));
    } catch (err) {
      console.error('Failed to load seasonal products.', err);
      setModalProducts([]);
    } finally {
      setLoadingModalKey(null);
      setSelectedCategory(category.name);
    }
  };

  const handleRequestCustomSwatch = (e: React.FormEvent) => {
    e.preventDefault();
    setSwatchInquired(true);

    const swatchProduct: Product = {
      id: `custom-swatch-${Date.now()}`,
      name: `Bespoke Swatch (${patternType.toUpperCase()} - ${weftColor === '#8F533C' ? 'Terracotta' : 'Deep Ink'} / ${warpColor === '#2C2623' ? 'Charcoal' : 'Sand'})`,
      collection: 'home-decor',
      subcategory: 'Custom Swatch Request',
      image: '/input_file_15.png',
      description: `Bespoke organic swatch sample. Pattern: ${patternType}. Density: ${weaveDensity}. Base warp color: ${warpColor}. Primary weft color: ${weftColor}. Intended showroom dimensions: ${customSize}`,
      material: '80% Recycled Cotton, 20% Jute & Botanical Dye',
      dimensions: '30x30 cm Sample Swatch',
      leadTime: '14 Days Express Looming',
      minOrderQuantity: '1 Unit (Sample)'
    };

    addToCart(swatchProduct);
    setTimeout(() => {
      setSwatchInquired(false);
      setIsPortalOpen(true);
    }, 1200);
  };

  return (
    <section id="collections" className="py-0 bg-[#FAF8F5]">
      <div className="w-full px-6 sm:px-10 lg:px-20">

        {/* Editorial Heading Section exactly styled like the mockup */}
        <div className="flex flex-col items-center text-center gap-3 mb-3">

          <div className="flex items-center gap-3 sm:gap-6 w-full">
            <div className="h-px bg-[#8F533C]/20 flex-1" />
            <h2 className="font-serif text-2xl sm:text-5xl lg:text-6xl text-[#2C2623] tracking-tight font-medium leading-tight whitespace-nowrap shrink-0">
              OUR COLLECTIONS
            </h2>
            <div className="h-px bg-[#8F533C]/20 flex-1" />
          </div>


          {/* Mockup Ornament divider (brown line with diamond) */}
          <div className="flex items-center gap-4 w-full justify-center my-3">

            <div className="h-[1px] bg-[#8F533C]/30 w-24 sm:w-40" />
            <div className="w-2.5 h-2.5 rotate-45 bg-[#8F533C]" />
            <div className="h-[1px] bg-[#8F533C]/30 w-24 sm:w-40" />

          </div>
          
        </div>

        {/* Categories -> subcategories, straight from /api/home */}
        {homeCategoriesLoading && (
          <p className="text-center font-sans text-sm text-[#615751] py-10">Loading collections...</p>
        )}
        {!homeCategoriesLoading && homeCategories.length === 0 && (
          <p className="text-center font-sans text-sm text-[#615751] py-10">No collections available right now.</p>
        )}
        {homeCategories.map((category) => {
          const isPetCategory = `${category.categorySlug} ${category.categoryName}`.toLowerCase().includes('pet');
          const sectionSubtitle = isPetCategory
            ? 'Comfort, care and style for pets.'
            : 'Timeless designs for every space.';

          return (
            <div key={category.categorySlug} className={isPetCategory ? 'mb-6 sm:mb-8' : 'mb-10 sm:mb-12'}>
              <div className="flex flex-col items-start mb-6 border-b border-[#EBE4DC] pb-4">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#2C2623] font-medium tracking-wide">
                  {category.categoryName}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#615751] italic mt-1">
                  {sectionSubtitle}
                </p>
              </div>

              <div
                className={
                  isPetCategory
                    ? 'grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 sm:gap-x-10 sm:gap-y-20'
                    : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8'
                }
              >
                {category.subCategories.map((sub, index) => (
                  <motion.div
                    key={sub.subCatID}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    onClick={() => handleSubCategoryClick(category, sub)}
                    className="group cursor-pointer flex flex-col"
                  >
                    {/* Image Container with high contrast and hover zooms */}
                    <div
                      className={
                        isPetCategory
                          ? 'relative aspect-video overflow-hidden bg-[#F4EFEA] border border-[#EBE4DC] shadow-xs group-hover:border-[#8F533C]/40 group-hover:shadow-md transition-all duration-300'
                          : 'relative overflow-hidden bg-[#F4EFEA] border border-[#EBE4DC] shadow-xs group-hover:border-[#8F533C]/40 group-hover:shadow-md transition-all duration-300'
                      }
                      style={!isPetCategory ? { aspectRatio: sub.subCategoryName === 'Basket' ? '568 / 316' : '16 / 9' } : undefined}
                    >
                      <img
                        src={sub.subCatImg}
                        alt={sub.subCategoryName}
                        className={
                          sub.hoverImage
                            ? 'w-full h-full object-cover transition-opacity duration-500 ease-out group-hover:opacity-0'
                            : 'w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105'
                        }
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      {sub.hoverImage && (
                        <img
                          src={sub.hoverImage}
                          alt={sub.subCategoryName}
                          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                      )}
                    </div>

                    {/* Subcategory Label below card */}
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-sans text-[13px] font-bold tracking-[0.12em] text-[#2C2623] uppercase group-hover:text-[#8F533C] transition-colors">
                        {sub.subCategoryName}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Seasonal & Holiday images, fixed directly below Pet Living (heading removed) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          {seasonalCategories.map((category) => (
            <div
              key={category.name}
              className="relative group overflow-hidden cursor-pointer w-full aspect-[2/1]"
              onClick={() => handleSeasonalBannerClick(category)}
            >
              {/* 1. Image Background */}
              <img
                src={category.image}
                alt={category.name}
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  category.name.includes('FALL') ? 'brightness-125 contrast-105' : ''
                }`}
              />

              {/* 2. Light Tint for Balance */}
              <div className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/35" />

              {/* 3. Content Box: Spring/Summer stays centered, Fall/Winter sits to the side */}
              <div
                className={`absolute inset-0 flex flex-col justify-center p-6 sm:p-10 text-white items-center text-center`}
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.75), 0 1px 3px rgba(0,0,0,0.9)' }}
              >
                <h3
                  className={`font-serif font-bold text-lg sm:text-2xl md:text-3xl tracking-wide sm:tracking-widest uppercase mb-2 leading-snug w-full`}
                >
                  {category.name.replace(' COLLECTION', '')}
                  <br />
                  COLLECTION
                </h3>

                {category.subtitle && (
                  <p className="font-serif italic font-bold text-sm md:text-base mb-6 tracking-wide">
                    {category.subtitle}
                  </p>
                )}

                {/* Bordered Button Element */}
                <button
                  className="px-6 py-2.5 border border-white text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-white hover:text-black bg-black/25 backdrop-blur-[2px]"
                  style={{ textShadow: 'none' }}
                >
                  {loadingModalKey === category.name ? 'Loading...' : <>Explore Now &rarr;</>}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Trust & Certification badges, fixed directly below Pet Living */}
      <TrustStats />
      <Certifications />

      {/* Product listing + detail modals for the selected category */}
      <AnimatePresence>
        {selectedCategory && (
          <ProductShowcaseModal
            heading={`${selectedCategory} Collection`}
            products={modalProducts}
            onClose={() => {
              setSelectedCategory(null);
              setModalProducts([]);
            }}
          />
        )}
      </AnimatePresence>

    </section>
  );
};
