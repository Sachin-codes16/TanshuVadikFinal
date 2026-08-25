export interface Product {
  id: string;
  name: string;
  collection: 'home-decor' | 'pet-living' | 'seasonal';
  subcategory: string;
  image: string;
  description: string;
  material: string;
  dimensions: string;
  leadTime: string;
  minOrderQuantity: string;
  slug?: string;
  colors?: string[];
}

export interface RelatedProduct {
  productName: string;
  thumbnailImage: string;
  categorySlug: string;
  subCategorySlug: string;
  productSlug: string;
}

export interface ProductDetailData {
  categoryName: string;
  categorySlug: string;
  subCategoryName: string;
  subCategorySlug: string;
  productID: string;
  productName: string;
  thumbnailImage: string;
  shortDescription: string;
  productStory: string;
  material: string;
  construction: string;
  sizes: string;
  careInstructions: string;
  packaging: string;
  packagingCataloguePDF: string;
  moqLeadTime: string;
  certifications: string;
  productSlug: string;
  productGallery: { image: string }[];
  productIcon: Record<string, unknown>[];
  customisationStudio: Record<string, unknown>[];

  relatedProduct: RelatedProduct[];
}

export interface Artisan {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  quote: string;
}

export interface Certification {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
}

export interface Office {
  id: string;
  name: string;
  country: string;
  coords: { top: string; left: string };
  address: string;
  email: string;
  phone: string;
  highlight: string;
}

export interface Inquiry {
  id: string;
  type: 'catalog' | 'meeting' | 'product';
  productName?: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  date?: string;
  time?: string;
  timestamp: number;
}
