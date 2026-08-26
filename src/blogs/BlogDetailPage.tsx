import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { getBlogList } from '../api';

interface ApiBlog {
  catName: string;
  blogName: string;
  thumbnail: string;
  banner: string;
  description: string;
  blogDate: string;
  blogSlug: string;
}

interface BlogDetail {
  category: string;
  title: string;
  descriptionHtml: string;
  date: string;
  image: string;
}

interface RelatedBlog {
  slug: string;
  title: string;
  image: string;
}

interface BlogDetailPageProps {
  slug: string;
  onBack: () => void;
  onSelectRelated: (slug: string) => void;
  onNavigateHome?: () => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ slug, onBack, onSelectRelated, onNavigateHome }) => {
  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [related, setRelated] = useState<RelatedBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const relatedScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setBlog(null);
    window.scrollTo({ top: 0 });

    getBlogList()
      .then((res: { data?: { data?: ApiBlog[] } }) => {
        if (cancelled) return;
        const list = res?.data?.data ?? [];
        const match = list.find((item) => item.blogSlug === slug);
        if (!match) {
          setError('This blog post could not be found.');
          return;
        }
        setBlog({
          category: match.catName,
          title: match.blogName,
          descriptionHtml: match.description || '',
          date: match.blogDate,
          image: match.banner || match.thumbnail,
        });
        setRelated(
          list
            .filter((item) => item.blogSlug !== slug)
            .map((item) => ({
              slug: item.blogSlug,
              title: item.blogName,
              image: item.thumbnail,
            }))
        );
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Failed to load blog detail.', err);
        setError('Could not load this blog post right now. Please try again shortly.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 480);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollRelated = (direction: 'left' | 'right') => {
    const el = relatedScrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild instanceof HTMLElement ? el.firstElementChild.offsetWidth : 220;
    el.scrollBy({ left: direction === 'left' ? -(cardWidth + 20) : cardWidth + 20, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="pt-16 sm:pt-[76px] bg-[#FAF8F5]">
        <p className="text-center font-sans text-sm text-[#615751] py-24">Loading blog...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="pt-16 sm:pt-[76px] bg-[#FAF8F5]">
        <p className="text-center font-sans text-sm text-[#C0392B] py-24">{error}</p>
      </div>
    );
  }

  return (
    <div className="pt-16 sm:pt-[76px] bg-[#FAF8F5]">
      {/* INTRO */}
      <section className="relative min-h-[280px] sm:min-h-[320px] flex items-end overflow-hidden bg-[#2C2623]">
        <img
          src={blog.image}
          alt={blog.title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_75%_at_0%_100%,_rgba(44,38,35,0.88)_0%,_rgba(44,38,35,0.5)_40%,_transparent_75%)]" />

        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-20 pb-10 sm:pb-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm sm:text-base font-sans font-bold text-[#D99A78] mb-4">
            <button onClick={onNavigateHome} className="hover:underline hover:text-white transition-colors cursor-pointer">
              Home
            </button>
            <span>&gt;</span>
            <button onClick={onBack} className="hover:underline hover:text-white transition-colors cursor-pointer">
              Journal
            </button>
            <span>&gt;</span>
            <span className="text-white">{blog.title}</span>
          </nav>

          <span className="inline-block px-3 py-1 bg-[#8F533C] text-white font-sans text-[10px] font-bold uppercase tracking-widest mb-3">
            {blog.category}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-white font-medium">{blog.title}</h1>
          <div className="h-[2px] w-12 bg-[#8F533C] my-2.5" />
          <span className="flex items-center gap-1.5 font-sans text-sm text-white/80">
            <Calendar size={14} /> {blog.date}
          </span>
        </div>
      </section>

      {/* ARTICLE */}
      <section className="pt-4 sm:pt-8 pb-4">
        <div className="w-full px-4 sm:px-8">
          <div className="bg-white border border-[#EBE4DC] p-3 sm:p-5">
            <h2 className="font-serif text-xl text-[#2C2623] font-bold uppercase tracking-wide mb-4">
              The Story
            </h2>
            <div
              className="prose prose-sm sm:prose-base max-w-none font-sans text-[#615751] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.descriptionHtml }}
            />
          </div>
        </div>
      </section>

      {/* MORE FROM THE JOURNAL */}
      <section className="bg-[#FAF8F5] pt-6 pb-10">
        <div className="w-full px-6 sm:px-[80px]">
          <div className="relative flex items-center justify-center mb-8">
            <div className="absolute inset-x-0 top-1/2 h-px bg-[#EBE4DC]" />
            <span className="relative bg-[#FAF8F5] px-6 font-sans text-base font-extrabold tracking-[0.2em] uppercase text-[#2C2623]">
              More From The Journal
            </span>
          </div>

          {related.length === 0 ? (
            <p className="font-sans text-sm text-[#615751] text-center">No other posts found.</p>
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
                {related.map((item) => (
                  <div
                    key={item.slug}
                    onClick={() => onSelectRelated(item.slug)}
                    className="group shrink-0 snap-start w-[220px] sm:w-[260px] cursor-pointer"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-white border border-[#EBE4DC]">
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-3 font-sans text-sm text-[#2C2623] leading-snug">{item.title}</p>
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
