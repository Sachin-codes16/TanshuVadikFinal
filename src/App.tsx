import React, { useEffect, useState } from 'react';
import { InquiryProvider } from './context/InquiryContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Collections } from './components/Collections';
import { VideoBanner } from './components/VideoBanner';
import { About } from './components/About';
import { GlobalPresence } from './components/GlobalPresence';
import { Footer } from './components/Footer';
import { motion } from 'motion/react';
import { HomeCollectionPage } from './homeCollection/HomeCollectionPage';
import { AboutPage } from './about/AboutPage';
import { B2BPortal } from './components/B2BPortal';
import { BlogsPage } from './blogs/BlogsPage';
import { CapabilitiesPage } from './capabilities/CapabilitiesPage';
import { ContactPage } from './contact/ContactPage';
import { SustainabilityPage } from './sustainability/SustainabilityPage';
import { pushCollectionPath } from './homeCollection/collectionRouting';

type PageKey = 'home' | 'about' | 'collections' | 'blogs' | 'capabilities' | 'sustainability' | 'contact';

const PAGE_ROUTES: Record<PageKey, { path: string; title: string }> = {
  home: { path: '/', title: 'TANSHU VAIDIK | Ethical Artistry in Textiles' },
  about: { path: '/about', title: 'About Us | Tanshu Vaidik' },
  collections: { path: '/collections', title: 'Collections | Tanshu Vaidik' },
  blogs: { path: '/blogs', title: 'Blogs | Tanshu Vaidik' },
  capabilities: { path: '/capabilities', title: 'Capabilities | Tanshu Vaidik' },
  sustainability: { path: '/sustainability', title: 'Sustainability | Tanshu Vaidik' },
  contact: { path: '/contact', title: 'Contact Us | Tanshu Vaidik' },
};

function getPageFromPath(pathname: string): PageKey {
  if (pathname === '/collections' || pathname.startsWith('/collections/')) return 'collections';
  if (pathname === '/blogs' || pathname.startsWith('/blogs/')) return 'blogs';
  const match = (Object.keys(PAGE_ROUTES) as PageKey[]).find((key) => PAGE_ROUTES[key].path === pathname);
  return match ?? 'home';
}

export default function App() {
  const [page, setPage] = useState<PageKey>(() => getPageFromPath(window.location.pathname));
  const [pendingScrollTarget, setPendingScrollTarget] = useState<string | null>(null);

  const navigate = (key: PageKey) => {
    setPage(key);
    if (window.location.pathname !== PAGE_ROUTES[key].path) {
      window.history.pushState({}, '', PAGE_ROUTES[key].path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    document.title = PAGE_ROUTES[page].title;
  }, [page]);

  // Footer's "Certifications" link points at a section that only lives inline
  // on the home page — hop home first, then scroll once it's mounted.
  useEffect(() => {
    if (page !== 'home' || !pendingScrollTarget) return;
    const id = pendingScrollTarget;
    setPendingScrollTarget(null);

    // Sections above the target (e.g. Collections) fetch their content
    // async and grow taller after the first scroll fires, which pushes the
    // target out from under the viewport. Keep re-aligning for a bit so the
    // scroll lands correctly once that layout shift has settled.
    let attempts = 0;
    const maxAttempts = 15;
    const alignToTarget = () => {
      document.getElementById(id)?.scrollIntoView({ behavior: attempts === 0 ? 'smooth' : 'auto' });
      attempts += 1;
      if (attempts < maxAttempts) {
        setTimeout(alignToTarget, 200);
      }
    };
    requestAnimationFrame(alignToTarget);
  }, [page, pendingScrollTarget]);

  useEffect(() => {
    const onPopState = () => setPage(getPageFromPath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleNavigateCollections = () => navigate('collections');
  const handleNavigateAbout = () => navigate('about');
  const handleNavigateBlogs = () => navigate('blogs');
  const handleNavigateCapabilities = () => navigate('capabilities');
  const handleNavigateSustainability = () => navigate('sustainability');
  const handleNavigateContact = () => navigate('contact');
  const handleBackToHome = () => navigate('home');

  // Home page's "OUR COLLECTIONS" grid opens the same deep-linked collection
  // detail URL that clicking a sub-category inside /collections itself uses,
  // instead of the old showcase modal.
  const handleOpenCollectionSubCategory = (categorySlug: string, subCategorySlug: string) => {
    setPage('collections');
    pushCollectionPath([categorySlug, subCategorySlug]);
  };

  const handleNavigateCertifications = () => {
    if (page === 'home') {
      document.getElementById('certifications')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setPendingScrollTarget('certifications');
      navigate('home');
    }
  };

  // "Watch Our Story" on the Collections page banner points at the video
  // section, which only lives inline on the home page — same hop-then-scroll
  // pattern as handleNavigateCertifications above.
  const handleNavigateOurStory = () => {
    if (page === 'home') {
      document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setPendingScrollTarget('our-story');
      navigate('home');
    }
  };

  return (
    <InquiryProvider>
      <div id="app-root" className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2C2623] font-sans overflow-x-hidden overflow-y-visible selection:bg-[#8F533C] selection:text-white">

        {/* Navigation bar with floating RFQ badge */}
        <Navbar
          onNavigateCollections={handleNavigateCollections}
          onNavigateAbout={handleNavigateAbout}
          onNavigateHome={handleBackToHome}
          onNavigateCapabilities={handleNavigateCapabilities}
          onNavigateSustainability={handleNavigateSustainability}
          onNavigateContact={handleNavigateContact}
        />

        <div className="flex-1">
          {page === 'contact' ? (
            <ContactPage />
          ) : page === 'about' ? (
            <AboutPage />
          ) : page === 'collections' ? (
            <HomeCollectionPage onNavigateOurStory={handleNavigateOurStory} />
          ) : page === 'blogs' ? (
            <BlogsPage onNavigateHome={handleBackToHome} />
          ) : page === 'capabilities' ? (
            <CapabilitiesPage />
          ) : page === 'sustainability' ? (
            <SustainabilityPage />
          ) : (
            /* Master visual sections */
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Editorial Loom Banner Section */}
              <Hero />

              {/* Why Global Buyers Choose TanshU */}
              <WhyChooseUs />

              {/* Interactive Catalog and Bespoke Thread Visualizer */}
              <Collections onOpenSubCategory={handleOpenCollectionSubCategory} />

              {/* High Fidelity Video / Story Banner */}
              <VideoBanner youtubeId="N8M9PQCyIRs" />

              {/* Core Handloom & Weaver Narrative (The Heart Behind Every Piece) */}
              <About />

              {/* Interactive World Map Trade Logistics Pins */}
              <GlobalPresence />
            </motion.main>
          )}
        </div>

        {/* Editorial Footnotes and Contacts */}
        <Footer
          onNavigateAbout={handleNavigateAbout}
          onNavigateCollections={handleNavigateCollections}
          onNavigateBlogs={handleNavigateBlogs}
          onNavigateCapabilities={handleNavigateCapabilities}
          onNavigateSustainability={handleNavigateSustainability}
          onNavigateContact={handleNavigateContact}
          onNavigateCertifications={handleNavigateCertifications}
        />

        {/* Selected-products drawer, opened from the navbar's Request Catalogue button */}
        <B2BPortal />

      </div>
    </InquiryProvider>
  );
}
