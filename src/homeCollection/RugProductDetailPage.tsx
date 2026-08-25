import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUp,
  BadgeCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Leaf,
  Globe,
  SlidersHorizontal,
  Truck,
} from 'lucide-react';
import { Product, ProductDetailData } from '../types';
import { useInquiry } from '../context/InquiryContext';
import { ProductStorySection } from './ProductStorySection';
import { CustomDesignBanner } from './CustomDesignBanner';
import { pushCollectionPath } from './collectionRouting';

// The API's field names for these arrays aren't confirmed yet, so accept
// whichever of these common keys shows up.
const extractLabelledImage = (item: Record<string, unknown>) => {
  const label = item.label ?? item.name ?? item.title;
  const image = item.image ?? item.img ?? item.icon ?? item.photo;
  if (typeof label !== 'string' || !label || typeof image !== 'string' || !image) return undefined;
  return { label, image };
};

const trustBadges = [
  { icon: <Globe size={32} strokeWidth={1.5} />, label: 'Exporting to 40+ Countries' },
  { icon: <BadgeCheck size={32} strokeWidth={1.5} />, label: 'ISO 9001:2015 Certified' },
  { icon: <Leaf size={32} strokeWidth={1.5} />, label: 'Ethical & Sustainable Manufacturing' },
  { icon: <SlidersHorizontal size={32} strokeWidth={1.5} />, label: 'Customisation Available' },
  { icon: <Truck size={32} strokeWidth={1.5} />, label: 'On-Time Delivery Assured' },
];

export interface RelatedProduct {
  productName: string;
  thumbnailImage: string;
  categorySlug: string;
  subCategorySlug: string;
  productSlug: string;
}

interface RugProductDetailPageProps {
  product: Product;
  detail: ProductDetailData | null;
  detailLoading: boolean;
  detailError: string | null;
  relatedProducts: RelatedProduct[];
  categoryName: string;
  subCategoryName: string;
  onBack: () => void;
  onSelectRelated: (product: Product) => void;
}



export const RugProductDetailPage: React.FC<RugProductDetailPageProps> = ({
  product,
  detail,
  detailLoading,
  detailError,
  relatedProducts,
  categoryName,
  subCategoryName,
  onBack,
  onSelectRelated,
}) => {
  const [activeImage, setActiveImage] = useState(product.image);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [navHeight, setNavHeight] = useState(80);
  const { addToCart, isInCart, removeFromCart, setIsPortalOpen } = useInquiry();
  const thumbScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const measureNav = () => {
      const nav = document.querySelector('nav');
      if (nav) setNavHeight(nav.getBoundingClientRect().height);
    };
    measureNav();
    window.addEventListener('resize', measureNav);
    return () => window.removeEventListener('resize', measureNav);
  }, []);
  const relatedScrollRef = useRef<HTMLDivElement | null>(null);

  const scrollRelated = (direction: 'left' | 'right') => {
    const el = relatedScrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild instanceof HTMLElement ? el.firstElementChild.offsetWidth : 280;
    el.scrollBy({ left: direction === 'left' ? -(cardWidth + 20) : cardWidth + 20, behavior: 'smooth' });
  };

  useEffect(() => {
    setActiveImage(product.image);
    window.scrollTo({ top: 0 });
  }, [product]);

  useEffect(() => {
    if (detail?.thumbnailImage) setActiveImage(detail.thumbnailImage);
  }, [detail]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 480);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const galleryImages = detail?.productGallery?.map((item) => item.image) ?? [];
  const mainImage = detail?.thumbnailImage ?? product.image;
  const gallery = [mainImage, ...galleryImages.filter((img) => img !== mainImage)];
  const inCart = isInCart(product.id);

  const productIcons = (detail?.productIcon ?? [])
    .map(extractLabelledImage)
    .filter((item): item is { label: string; image: string } => !!item);
  const customisationOptions = (detail?.customisationStudio ?? [])
    .map(extractLabelledImage)
    .filter((item): item is { label: string; image: string } => !!item);

  return (
    <div style={{ paddingTop: navHeight }} className="bg-[#FAF8F5]">
      {/* INTRO */}
      <section className="bg-white py-8">
        <div className="w-full px-6 sm:px-[80px]">
          {/* Breadcrumb */}
          <nav className="flex items-center flex-wrap gap-1.5 font-sans text-xs font-bold uppercase tracking-wide text-[#615751] mb-6">
            <span>Home</span>
            <span className="text-[#EBE4DC]">/</span>
            <span>Collections</span>
            <span className="text-[#EBE4DC]">/</span>
            <span>{categoryName}</span>
            <span className="text-[#EBE4DC]">/</span>
            <button onClick={onBack} className="hover:text-[#8F533C] transition-colors cursor-pointer">
              {subCategoryName}
            </button>
            <span className="text-[#EBE4DC]">/</span>
            <span className="text-[#2C2623]">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[96px_1fr_minmax(360px,1fr)] gap-6 lg:gap-10 items-start">
            {/* Thumbnails */}
            <div className="flex flex-col order-2 lg:order-1 lg:h-[460px]">
              <button
                type="button"
                aria-label="Scroll thumbnails up"
                onClick={() => thumbScrollRef.current?.scrollBy({ top: -108, behavior: 'smooth' })}
                className="hidden lg:flex w-24 h-8 shrink-0 items-center justify-center border border-[#EBE4DC] bg-white text-[#8F533C] hover:bg-[#F4EFEA] hover:text-[#2C2623] transition-colors cursor-pointer"
              >
                <ChevronUp size={18} />
              </button>

              <div
                ref={thumbScrollRef}
                className="flex lg:flex-col gap-3 lg:py-3 lg:overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                {gallery.map((img) => (
                  <button
                    key={img}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 lg:w-24 lg:h-24 shrink-0 overflow-hidden border-2 bg-white cursor-pointer transition-colors ${
                      activeImage === img ? 'border-[#8F533C]' : 'border-[#EBE4DC]'
                    }`}
                  >
                    <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <button
                type="button"
                aria-label="Scroll thumbnails down"
                onClick={() => thumbScrollRef.current?.scrollBy({ top: 108, behavior: 'smooth' })}
                className="hidden lg:flex w-24 h-8 shrink-0 items-center justify-center border border-[#EBE4DC] bg-white text-[#8F533C] hover:bg-[#F4EFEA] hover:text-[#2C2623] transition-colors cursor-pointer"
              >
                <ChevronDown size={18} />
              </button>
            </div>

            {/* Main image */}
            <div className="order-1 lg:order-2 relative bg-[#F4EFEA] border border-[#EBE4DC] aspect-[4/3] lg:aspect-auto lg:h-[460px]">
              <span className="absolute top-3 left-3 z-10 bg-[#8F533C] text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1">
                Premium
              </span>
              <img
                src={activeImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover aspect-[4/3] lg:aspect-auto"
              />
            </div>

            {/* Info panel */}
            <div className="order-3 min-w-0">
              <span className="font-sans text-xs font-bold tracking-widest uppercase text-[#8F533C]">
                {detail?.subCategoryName ? `${detail.subCategoryName} Collection` : `${subCategoryName} Collection`}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#2C2623] font-bold uppercase leading-tight mt-2">
                {product.name}
              </h1>
              <p className="font-sans text-sm font-bold text-[#8F533C] tracking-wide mt-2">
                Natural &middot; Handcrafted &middot; Timeless
              </p>

              <div className="h-px w-full bg-[#EBE4DC] my-5" />

              <p className="font-sans text-sm text-[#615751] leading-relaxed">
                {detail?.shortDescription || product.description}
              </p>

              {productIcons.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-7">
                  {productIcons.map((badge) => (
                    <div key={badge.label} className="flex flex-col items-center gap-2 text-center">
                      <span className="w-8 h-8 flex items-center justify-center">
                        <img src={badge.image} alt="" className="w-full h-full object-contain" />
                      </span>
                      <span className="font-sans text-[11px] font-bold text-[#2C2623] leading-snug">
                        {badge.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={() => {
                    addToCart(product);
                    setIsPortalOpen(true);
                  }}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#2C2623] hover:bg-[#8F533C] text-white font-button text-xs tracking-widest uppercase transition-colors cursor-pointer"
                >
                  Get Product Details
                  <ArrowRight size={14} />
                </button>
              </div>

              <p className="font-sans text-[11px] text-[#615751] mt-4">
                No price shown as we serve global B2B buyers with custom requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-white pt-2 pb-4">
        <div className="w-full px-6 sm:px-[80px]">
          <div className="mx-auto rounded-2xl bg-[#F4EFEA] px-6 sm:px-8 py-6 flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[#EBE4DC]">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex-1 flex items-center gap-3 py-4 sm:py-0 px-2 sm:px-5">
                <span className="text-[#8F533C] shrink-0">{badge.icon}</span>
                <span className="font-sans text-[11px] font-bold tracking-wide uppercase text-[#2C2623] leading-snug">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT DETAILS */}
      <section>
        {detailLoading && (
          <p className="text-center font-sans text-sm text-[#615751] py-6">Loading full product details...</p>
        )}
        {!detailLoading && detailError && (
          <p className="text-center font-sans text-sm text-[#C0392B] py-6">{detailError}</p>
        )}
        <ProductStorySection product={product} detail={detail} image={gallery[1] ?? mainImage} />
      </section>

      {/* CUSTOMISATION STUDIO */}
      <section className="bg-white pt-3 pb-10">
        <div className="w-full px-6 sm:px-[80px] text-center">
          <div className="relative flex items-center justify-center mb-8">
            <div className="absolute inset-x-0 top-1/2 h-px bg-[#EBE4DC]" />
            <h2 className="relative bg-white px-6 font-serif text-2xl text-[#2C2623] font-medium tracking-wide uppercase">
              Customisation Studio
            </h2>
          </div>

          {customisationOptions.length > 0 && (
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-x-4 gap-y-8">
              {customisationOptions.map(({ label, image }) => (
                <div key={label} className="flex flex-col items-center gap-3">
                  <span className="w-24 h-24 rounded-full overflow-hidden border border-[#EBE4DC]">
                    <img
                      src={image}
                      alt={label}
                      className="w-full h-full object-cover"
                    />
                  </span>
                  <span className="font-sans text-[11px] font-bold tracking-wide uppercase text-[#2C2623] leading-snug">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          )}

          <p className="font-sans text-sm text-[#615751] mt-8">
            We offer fully customised solutions to match your brand, market and quality standards.
          </p>

          <button
            onClick={() => setIsPortalOpen(true)}
            className="inline-flex items-center gap-2 px-7 py-3 mt-5 border border-[#8F533C] text-[#8F533C] hover:bg-[#8F533C] hover:text-white font-button text-xs tracking-widest uppercase transition-colors cursor-pointer"
          >
            Explore Custom Options
          </button>
        </div>
      </section>

      {/* CUSTOM DESIGN / PRIVATE LABEL BANNER */}
      <CustomDesignBanner onTalkToTeam={() => setIsPortalOpen(true)} />

      {/* YOU MAY ALSO LIKE */}
      <section className="bg-[#FAF8F5] pt-10 pb-10">
  <div className="w-full px-6 sm:px-[80px]">
    <div className="relative flex items-center justify-center mb-8">
      <div className="absolute inset-x-0 top-1/2 h-px bg-[#EBE4DC]" />
      <span className="relative bg-[#FAF8F5] px-6 font-sans text-base font-extrabold tracking-[0.2em] uppercase text-[#2C2623]">
        You May Also Like
      </span>
    </div>

    {!detail?.relatedProduct || detail.relatedProduct.length === 0 ? (
      <p className="font-sans text-sm text-[#615751] text-center">
        No related products found.
      </p>
    ) : (
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={() => scrollRelated('left')}
          aria-label="Scroll left"
          className="hidden sm:flex shrink-0 items-center justify-center text-[#2C2623] hover:text-[#8F533C] transition-colors cursor-pointer"
        >
          <ChevronLeft size={22} />
        </button>

        <div
          ref={relatedScrollRef}
          className="flex-1 flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {detail.relatedProduct.map((item) => (
            <div
              key={item.productSlug}
              onClick={() => pushCollectionPath([item.categorySlug, item.subCategorySlug, item.productSlug])}
              className="group shrink-0 snap-start w-[180px] sm:w-[220px] cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
                <img
                  src={item.thumbnailImage}
                  alt={item.productName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <p className="mt-3 font-sans text-sm text-[#2C2623] text-center">
                {item.productName}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => scrollRelated('right')}
          aria-label="Scroll right"
          className="hidden sm:flex shrink-0 items-center justify-center text-[#2C2623] hover:text-[#8F533C] transition-colors cursor-pointer"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    )}
  </div>
</section>

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 bg-[#8F533C] hover:bg-[#2C2623] text-white flex items-center justify-center shadow-lg transition-colors cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
};
