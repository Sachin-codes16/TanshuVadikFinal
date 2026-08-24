import React, { useEffect, useState } from 'react';
import { Leaf, Hand, Globe } from 'lucide-react';
import { RugsProductListing } from './RugsProductListing';
import { RugProductDetailPage } from './RugProductDetailPage';
import { getProductList, getProductDetail } from '../api';
import { getCollectionPathSegments, pushCollectionPath } from './collectionRouting';
import { ApiProduct, mapApiProduct } from './productMapper';
import { Product, ProductDetailData } from '../types';
import rugsHeroImage from '../assets/collection/ChatGPT Image Jul 23, 2026, 12_59_04 AM.jpg';

interface RugsDetailsPageProps {
  categorySlug: string;
  subCategorySlug: string;
  categoryName: string;
  subCategoryName: string;
  subCategoryImage?: string;
  subCategoryDescription?: string;
  onBack: () => void;
}

interface ApiProductDetailResponse {
  data?: {
    data?: ProductDetailData;
  };
}

const features = [
  { icon: <Leaf size={14} />, label: 'Natural Materials' },
  { icon: <Hand size={14} />, label: 'Handmade' },
  { icon: <Globe size={14} />, label: 'Export Quality' },
];

export const RugsDetailsPage: React.FC<RugsDetailsPageProps> = ({
  categorySlug,
  subCategorySlug,
  categoryName,
  subCategoryName,
  subCategoryImage,
  subCategoryDescription,
  onBack,
}) => {
  const [rugsProducts, setRugsProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productDetail, setProductDetail] = useState<ProductDetailData | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
// rugsdetals page ki hai ye api 

    getProductList(categorySlug, subCategorySlug)
      .then((res: { data?: { data?: ApiProduct[] } }) => {
        if (cancelled) return;
        const list = res?.data?.data ?? [];
        setRugsProducts(list.map(mapApiProduct));
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Failed to load rug products.', err);
        setError('Could not load products right now. Please try again shortly.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [categorySlug, subCategorySlug]);

  // Apply a product deep link (e.g. /collections/home-collection-1/rugs/some-rug) once the list has loaded.
  useEffect(() => {
    const productSlug = getCollectionPathSegments()[2];
    if (!productSlug || rugsProducts.length === 0) return;
    const match = rugsProducts.find((item) => item.slug === productSlug);
    if (match) setSelectedProduct(match);
  }, [rugsProducts]);

  useEffect(() => {
    const onPopState = () => {
      const productSlug = getCollectionPathSegments()[2];
      if (!productSlug) {
        setSelectedProduct(null);
        return;
      }
      const match = rugsProducts.find((item) => item.slug === productSlug);
      setSelectedProduct(match ?? null);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [rugsProducts]);

  useEffect(() => {
    if (!selectedProduct?.slug) {
      setProductDetail(null);
      setDetailError(null);
      return;
    }

    let cancelled = false;
    setDetailLoading(true);
    setDetailError(null);
    setProductDetail(null);
// Product details ki api hai ye 
    getProductDetail(categorySlug, subCategorySlug, selectedProduct.slug)
      .then((res: ApiProductDetailResponse) => {
        if (cancelled) return;
        const data = res?.data?.data;
        if (data) {
          setProductDetail(data);
        } else {
          setDetailError('Could not load full product details right now.');
        }
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Failed to load product detail.', err);
        setDetailError('Could not load full product details right now.');
      })
      .finally(() => {
        if (!cancelled) setDetailLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedProduct?.slug, categorySlug, subCategorySlug]);

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    pushCollectionPath([categorySlug, subCategorySlug, product.slug]);
  };

  if (selectedProduct) {
    return (
      <RugProductDetailPage
        product={selectedProduct}
        detail={productDetail}
        detailLoading={detailLoading}
        detailError={detailError}
        relatedProducts={rugsProducts.filter((item) => item.id !== selectedProduct.id)}
        categoryName={categoryName}
        subCategoryName={subCategoryName}
        onBack={() => {
          setSelectedProduct(null);
          pushCollectionPath([categorySlug, subCategorySlug]);
        }}
        onSelectRelated={openProduct}
      />
    );
  }

  return (
    <div className="pt-16 sm:pt-[76px] bg-[#FAF8F5]">
      {/* Hero */}
      <section className="relative min-h-[280px] sm:min-h-[320px] flex items-end overflow-hidden bg-[#2C2623]">
        <img
          src={subCategoryImage || rugsHeroImage}
          alt={subCategoryName}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_75%_at_0%_100%,_rgba(44,38,35,0.88)_0%,_rgba(44,38,35,0.5)_40%,_transparent_75%)]" />

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 pb-14 w-full">
          {/* Breadcrumb */}
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm sm:text-base font-sans font-bold text-[#D99A78] hover:text-white transition-colors cursor-pointer mb-4"
          >
            <span className="hover:underline">Home</span>
            <span>&gt;</span>
            <span className="hover:underline">{categoryName}</span>
            <span>&gt;</span>
            <span className="text-white">{subCategoryName}</span>
          </button>

          <h1 className="font-serif text-3xl sm:text-4xl text-white font-medium">Handcrafted {subCategoryName}</h1>
          <div className="h-[2px] w-12 bg-[#8F533C] my-2.5" />
          <p className="font-sans text-sm text-white/80 max-w-md leading-relaxed">
            {subCategoryDescription || 'Premium quality products made with natural fibers and timeless designs.'}
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

      {/* Rugs product listing */}
      {loading && (
        <p className="text-center font-sans text-sm text-[#615751] py-16">Loading products...</p>
      )}
      {!loading && error && (
        <p className="text-center font-sans text-sm text-[#C0392B] py-16">{error}</p>
      )}
      {!loading && !error && (
        <RugsProductListing
          products={rugsProducts}
          onSelectProduct={openProduct}
          categorySlug={categorySlug}
          subCategorySlug={subCategorySlug}
        />
      )}
    </div>
  );
};
