import { Product } from '../types';

export interface ApiProduct {
  productID: string;
  productName: string;
  thumbnailImage: string;
  shortDescription: string;
  material: string;
  sizes: string;
  productSlug: string;
  productColor?: { image: string }[];
  categoryName?: string;
  categorySlug?: string;
  subCategoryName?: string;
}

// Same category -> collection keyword matching as CollectionCardsSection's
// resolveCollectionKey, applied here since the product-list/filter endpoints
// carry categoryName/categorySlug per product rather than a collection enum.
const resolveCollection = (categorySlug: string, categoryName: string): Product['collection'] => {
  const text = `${categorySlug} ${categoryName}`.toLowerCase();
  if (text.includes('pet')) return 'pet-living';
  if (text.includes('season')) return 'seasonal';
  return 'home-decor';
};

export function mapApiProduct(item: ApiProduct): Product {
  return {
    id: item.productID,
    name: item.productName,
    collection: resolveCollection(item.categorySlug ?? '', item.categoryName ?? ''),
    subcategory: item.subCategoryName ?? '',
    image: item.thumbnailImage,
    description: item.shortDescription,
    material: item.material,
    dimensions: item.sizes,
    leadTime: '',
    minOrderQuantity: '',
    slug: item.productSlug,
    colors: (item.productColor ?? []).map((c) => c.image),
  };
}
