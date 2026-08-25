import React, { useEffect, useState } from 'react';
import {
  SlidersHorizontal,
  Minus,
  Plus,
  Heart,
  ArrowRight,
  Hand,
  Leaf,
  ShieldCheck,
  Globe,
} from 'lucide-react';
import { Product } from '../types';
import {
  getMaterialList,
  getSizeList,
  getColorList,
  getCollectionFilterList,
  getShapeList,
  getWeaveList,
  filterProductList,
} from '../api';
import { ApiProduct, mapApiProduct } from './productMapper';

interface RugsProductListingProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  categorySlug: string;
  subCategorySlug: string;
  subCategoryID: string | null;
}

interface FilterOption {
  id: string;
  label: string;
}

interface FilterOptionsState {
  material: FilterOption[];
  size: FilterOption[];
  color: FilterOption[];
  collection: FilterOption[];
  shape: FilterOption[];
  weave: FilterOption[];
}

type SelectedFilters = Record<keyof FilterOptionsState, string[]>;

const EMPTY_FILTER_OPTIONS: FilterOptionsState = {
  material: [],
  size: [],
  color: [],
  collection: [],
  shape: [],
  weave: [],
};

const EMPTY_SELECTED_FILTERS: SelectedFilters = {
  material: [],
  size: [],
  color: [],
  collection: [],
  shape: [],
  weave: [],
};

// Groups shown collapsed by default; "Material" always stays expanded.
const collapsibleFilterGroups: { key: keyof FilterOptionsState; title: string }[] = [
  { key: 'size', title: 'Size' },
  { key: 'color', title: 'Color' },
  { key: 'collection', title: 'Collection' },
  { key: 'shape', title: 'Shape' },
  { key: 'weave', title: 'Weave' },
];

const trustItems = [
  {
    icon: <Hand size={22} />,
    title: 'Crafted with Care',
    description: 'Skilled artisans create each rug with precision and passion.',
  },
  {
    icon: <Leaf size={22} />,
    title: 'Sustainable Choice',
    description: 'Eco-friendly materials for a better tomorrow.',
  },
  {
    icon: <ShieldCheck size={22} />,
    title: 'Built to Last',
    description: 'Durable, high-quality rugs made for everyday living.',
  },
  {
    icon: <Globe size={22} />,
    title: 'Global Standards',
    description: 'Manufactured to meet international quality standards.',
  },
];

export const RugsProductListing: React.FC<RugsProductListingProps> = ({
  products,
  onSelectProduct,
  categorySlug,
  subCategorySlug,
  subCategoryID,
}) => {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptionsState>(EMPTY_FILTER_OPTIONS);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(EMPTY_SELECTED_FILTERS);
  const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(null);
  const [filterLoading, setFilterLoading] = useState(false);

  useEffect(() => {
    if (!subCategoryID) return;
    let cancelled = false;

    Promise.all([
      getMaterialList(subCategoryID),
      getSizeList(subCategoryID),
      getColorList(subCategoryID),
      getCollectionFilterList(subCategoryID),
      getShapeList(subCategoryID),
      getWeaveList(subCategoryID),
    ])
      .then(([materialRes, sizeRes, colorRes, collectionRes, shapeRes, weaveRes]) => {
        if (cancelled) return;
        setFilterOptions({
          material: (materialRes?.data?.data ?? []).map((i: any) => ({ label: i.materialName, id: i.materialID })),
          size: (sizeRes?.data?.data ?? []).map((i: any) => ({ label: i.sizeName, id: i.sizeID })),
          color: (colorRes?.data?.data ?? []).map((i: any) => ({ label: i.colorName, id: i.colorID })),
          collection: (collectionRes?.data?.data ?? []).map((i: any) => ({ label: i.collectionName, id: i.collectionID })),
          shape: (shapeRes?.data?.data ?? []).map((i: any) => ({ label: i.shapeName, id: i.shapeID })),
          weave: (weaveRes?.data?.data ?? []).map((i: any) => ({ label: i.weaveName, id: i.weaveID })),
        });
      })
      .catch((err) => {
        console.error('Failed to load filter options.', err);
      });

    return () => {
      cancelled = true;
    };
  }, [subCategoryID]);

  const hasActiveFilters = Object.values(selectedFilters).some((ids) => ids.length > 0);

  useEffect(() => {
    if (!hasActiveFilters) {
      setFilteredProducts(null);
      return;
    }

    let cancelled = false;
    setFilterLoading(true);

    filterProductList(categorySlug, subCategorySlug, {
      materialIds: selectedFilters.material,
      sizeIds: selectedFilters.size,
      colorIds: selectedFilters.color,
      collectionIds: selectedFilters.collection,
      shapeIds: selectedFilters.shape,
      weaveIds: selectedFilters.weave,
    })
      .then((res: { data?: { data?: ApiProduct[] | null } }) => {
        if (cancelled) return;
        const list = res?.data?.data ?? [];
        setFilteredProducts(list.map(mapApiProduct));
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Failed to load filtered products.', err);
        setFilteredProducts([]);
      })
      .finally(() => {
        if (!cancelled) setFilterLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedFilters, categorySlug, subCategorySlug, hasActiveFilters]);

  const toggleFilter = (group: keyof FilterOptionsState, id: string) => {
    setSelectedFilters((prev) => {
      const current = prev[group];
      const next = current.includes(id) ? current.filter((v) => v !== id) : [...current, id];
      return { ...prev, [group]: next };
    });
  };

  const clearAllFilters = () => setSelectedFilters(EMPTY_SELECTED_FILTERS);

  const displayedProducts = filteredProducts ?? products;

  return (
    <section className="pt-6 pb-0">
      <div className="w-full px-6 sm:px-10 lg:px-20 relative flex flex-col lg:flex-row lg:items-start gap-10 lg:pb-4">
        {/* Filter sidebar (visual only) */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="flex items-center justify-between pb-4 border-b border-[#EBE4DC]">
            <h3 className="font-sans text-sm font-bold text-[#2C2623] uppercase tracking-wide">Filter By</h3>
            <SlidersHorizontal size={16} className="text-[#615751]" />
          </div>

          <div className="py-3 border-b border-[#EBE4DC]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-sans text-sm font-bold text-[#2C2623]">Material</span>
              <Minus size={14} className="text-[#615751]" />
            </div>
            <div className="flex flex-col gap-1.5">
              {filterOptions.material.map((material) => (
                <label
                  key={material.id}
                  className="flex items-center gap-2 font-sans text-xs text-[#615751] cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="accent-[#8F533C]"
                    checked={selectedFilters.material.includes(material.id)}
                    onChange={() => toggleFilter('material', material.id)}
                  />
                  {material.label}
                </label>
              ))}
            </div>
          </div>

          {collapsibleFilterGroups.map(({ key, title }) => (
            <div key={key} className="py-3 border-b border-[#EBE4DC]">
              <button
                onClick={() => setExpandedGroup(expandedGroup === title ? null : title)}
                className="w-full flex items-center justify-between mb-2 cursor-pointer"
              >
                <span className="font-sans text-sm font-bold text-[#2C2623]">{title}</span>
                {expandedGroup === title ? (
                  <Minus size={14} className="text-[#615751]" />
                ) : (
                  <Plus size={14} className="text-[#615751]" />
                )}
              </button>
              {expandedGroup === title && (
                <div className="flex flex-col gap-1.5">
                  {filterOptions[key].map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center gap-2 font-sans text-xs text-[#615751] cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="accent-[#8F533C]"
                        checked={selectedFilters[key].includes(option.id)}
                        onChange={() => toggleFilter(key, option.id)}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button
            onClick={clearAllFilters}
            className="w-full mt-4 py-2 border border-[#8F533C] text-[#8F533C] font-button text-xs tracking-widest uppercase hover:bg-[#8F533C] hover:text-white transition-colors cursor-pointer"
          >
            Clear All Filters
          </button>
        </aside>

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <span className="font-sans text-xs text-[#615751]">
              {filterLoading
                ? 'Filtering...'
                : `Showing ${displayedProducts.length} of ${displayedProducts.length} results`}
            </span>
            <div className="flex items-center gap-2 font-sans text-xs text-[#615751]">
              Sort by:
              <span className="font-bold text-[#2C2623]">Newest</span>
            </div>
          </div>

          {!filterLoading && displayedProducts.length === 0 && (
            <p className="text-center font-sans text-sm text-[#615751] py-16">
              No products match the selected filters.
            </p>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {displayedProducts.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer bg-[#FAF8F5] border border-[#EBE4DC] hover:border-[#8F533C]/40 hover:shadow-md transition-all duration-300"
                onClick={() => onSelectProduct(item)}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F4EFEA]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-[#2C2623]">
                    <Heart size={14} />
                  </span>
                </div>

                <div className="p-4">
                  {item.colors && item.colors.length > 0 && (
                    <div className="flex items-center gap-2 mb-2.5">
                      {item.colors.map((colorImage, index) => (
                        <span
                          key={`${colorImage}-${index}`}
                          className="w-3.5 h-3.5 rounded-full border border-[#EBE4DC] overflow-hidden shrink-0"
                        >
                          <img
                            src={colorImage}
                            alt=""
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </span>
                      ))}
                    </div>
                  )}
                  <h4 className="font-serif text-base text-[#2C2623] font-medium line-clamp-1">{item.name}</h4>
                  <p className="font-sans text-xs text-[#615751] mt-1.5 line-clamp-1">{item.material}</p>
                  <p className="font-sans text-xs text-[#615751] mt-0.5 line-clamp-1">{item.dimensions}</p>

                  <div className="flex items-center justify-between mt-4">
                    <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-[#8F533C]">
                      Quick View&nbsp;&nbsp;|&nbsp;&nbsp;Spec Sheet
                    </span>
                    <span className="w-7 h-7 shrink-0 flex items-center justify-center bg-[#8F533C] text-white group-hover:bg-[#2C2623] transition-colors">
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="w-full mt-6">
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
    </section>
  );
};
