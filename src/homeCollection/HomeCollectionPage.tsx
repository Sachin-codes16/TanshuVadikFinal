import React, { useEffect, useRef, useState } from 'react';
import { HeroBanner } from './HeroBanner';
import { CollectionCardsSection } from './CollectionCardsSection';
import { TrustStrip } from './TrustStrip';
import { HomeCollectionDetailPage } from './homecollection1';
import { SeasonalCollectionDetailPage } from './SeasonalCollectionDetailPage';
import { getCollectionPathSegments, pushCollectionPath } from './collectionRouting';

interface OpenCategory {
  slug: string;
  name: string;
  image: string;
  description: string;
}

interface HomeCollectionPageProps {
  // Seeds the category name/image/description when a caller (e.g. the home page's
  // "OUR COLLECTIONS" section) navigates straight into a subcategory's URL instead
  // of going through the CollectionCardsSection click that normally supplies this.
  initialCategory?: OpenCategory;
  // "Watch Our Story" on the banner needs to hop back to the home page's video
  // section, which doesn't exist on this page.
  onNavigateOurStory?: () => void;
}

export const HomeCollectionPage: React.FC<HomeCollectionPageProps> = ({ initialCategory, onNavigateOurStory }) => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState<OpenCategory | null>(() => {
    if (initialCategory) return initialCategory;
    const slug = getCollectionPathSegments()[0];
    return slug ? { slug, name: '', image: '', description: '' } : null;
  });

  useEffect(() => {
    // pushCollectionPath dispatches this synchronously right after openCategory's own
    // setCategory call, so skip when the slug hasn't actually changed — otherwise this
    // clobbers the rich name/image/description just set by the click with a blank one.
    const onPopState = () => {
      const slug = getCollectionPathSegments()[0];
      setCategory((prev) => {
        if (!slug) return null;
        if (prev?.slug === slug) return prev;
        return { slug, name: '', image: '', description: '' };
      });
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const scrollToCards = () => {
    cardsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const openCategory = (slug: string, name: string, image: string, description: string) => {
    setCategory({ slug, name, image, description });
    pushCollectionPath([slug]);
  };

  const closeCategory = () => {
    setCategory(null);
    pushCollectionPath([]);
  };

  if (category) {
    if (category.slug.toLowerCase().includes('season')) {
      return (
        <SeasonalCollectionDetailPage
          categorySlug={category.slug}
          categoryName={category.name || undefined}
          heroImage={category.image || undefined}
          heroDescription={category.description || undefined}
          onBack={closeCategory}
        />
      );
    }
    return (
      <HomeCollectionDetailPage
        categorySlug={category.slug}
        categoryName={category.name || undefined}
        heroImage={category.image || undefined}
        heroDescription={category.description || undefined}
        onBack={closeCategory}
      />
    );
  }

  return (
    <div className="pt-16 sm:pt-[76px]">
      <HeroBanner onExploreCollections={scrollToCards} onWatchOurStory={onNavigateOurStory} />
      <div ref={cardsRef}>
        <CollectionCardsSection
          onOpenHomeCollection={openCategory}
          onOpenSeasonalCollection={openCategory}
        />
      </div>
      <TrustStrip />
    </div>
  );
};
