import { products } from '../data';
import { Product } from '../types';

const localImages = import.meta.glob('../assets/images/*', { eager: true, import: 'default' }) as Record<string, string>;
const img = (filename: string): string => {
  const match = Object.entries(localImages).find(([path]) => path.endsWith(`/${filename}`));
  return match ? match[1] : `/src/assets/images/${filename}`;
};

export interface HomeCategory {
  name: string;
  image: string;
  description: string;
}

export const homeCategories: HomeCategory[] = [
  {
    name: 'Rugs',
    image: img('WhatsApp Image 2026-07-20 at 11.45.28.jpeg'),
    description: 'Handcrafted rugs in natural fibers and timeless designs.',
  },
  {
    name: 'Carpets',
    image: img('WhatsApp Image 2026-07-18 at 11.12.09.jpeg'),
    description: 'Luxury carpets crafted for comfort and long-lasting beauty.',
  },
  {
    name: 'Cushions',
    image: img('cushion.jpeg'),
    description: 'Decorative cushions to add style, comfort and character.',
  },
  {
    name: 'Throws',
    image: img('WhatsApp Image 2026-07-17 at 15.35.38.jpeg'),
    description: 'Soft, cozy throws to layer texture into any room.',
  },
  {
    name: 'Basket',
    image: img('WhatsApp Image 2026-07-17 at 18.18.39.jpeg'),
    description: 'Woven baskets for stylish, everyday storage.',
  },
  {
    name: 'Planters',
    image: img('WhatsApp Image 2026-07-17 at 15.35.57.jpeg'),
    description: 'Handwoven planters for indoor and outdoor greenery.',
  },
  {
    name: 'Bath Mats',
    image: img('WhatsApp Image 2026-07-17 at 15.35.01.jpeg'),
    description: 'Soft, absorbent and durable bath mats for everyday use.',
  },
  {
    name: 'Table Linen',
    image: img('WhatsApp Image 2026-07-17 at 15.40.03.jpeg'),
    description: 'Elegant table linen for everyday dining and hosting.',
  },
  {
    name: 'Kitchen Linen',
    image: img('WhatsApp Image 2026-07-17 at 15.40.18.jpeg'),
    description: 'Practical, beautifully made kitchen linen essentials.',
  },
  {
    name: 'Tote Bags',
    image: img('WhatsApp Image 2026-07-17 at 15.38.11.jpeg'),
    description: 'Durable tote bags crafted from natural materials.',
  },
  {
    name: 'Wall Décor',
    image: img('WhatsApp Image 2026-07-17 at 15.37.21.jpeg'),
    description: 'Handcrafted wall décor to complete every space.',
  },
  {
    name: 'Home Accessories',
    image: img('ChatGPT Image Jul 21, 2026, 11_56_04 AM.jpg'),
    description: 'Thoughtfully designed accessories for the modern home.',
  },
];

export const getProductsForHomeCategory = (categoryName: string): Product[] => {
  const lowerName = categoryName.toLowerCase();
  if (lowerName === 'kitchen linen') {
    return products.filter((p) => p.subcategory === 'Apron');
  }
  if (lowerName === 'throws') {
    return products.filter((p) => p.subcategory === 'Kitchen Towel');
  }
  if (lowerName === 'home accessories') {
    return products.filter((p) => p.subcategory === 'Table Placemat');
  }
  return products.filter((p) => p.subcategory.toLowerCase() === lowerName);
};
