import React, { useEffect, useState } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import heroImage from '../assets/images/heartbehind.jpg';
import { getBlogList } from '../api';
import { BlogDetailPage } from './BlogDetailPage';
import { getBlogSlugFromPath, pushBlogPath } from './blogRouting';

interface ApiBlog {
  catName: string;
  blogName: string;
  thumbnail: string;
  banner: string;
  description: string;
  blogDate: string;
  blogSlug: string;
}

interface BlogPost {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  slug: string;
}

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '').trim();

interface BlogsPageProps {
  onNavigateHome?: () => void;
}

export const BlogsPage: React.FC<BlogsPageProps> = ({ onNavigateHome }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(() => getBlogSlugFromPath());

  useEffect(() => {
    const onPopState = () => setSelectedSlug(getBlogSlugFromPath());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const openBlog = (slug: string) => {
    setSelectedSlug(slug);
    pushBlogPath(slug);
  };

  const closeBlog = () => {
    setSelectedSlug(null);
    pushBlogPath();
  };

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getBlogList()
      .then((res: { data?: { data?: ApiBlog[] } }) => {
        if (cancelled) return;
        const list = res?.data?.data ?? [];
        setPosts(
          list.map(
            (item): BlogPost => ({
              category: item.catName,
              title: item.blogName,
              excerpt: stripHtml(item.description || ''),
              date: item.blogDate,
              image: item.thumbnail,
              slug: item.blogSlug,
            })
          )
        );
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Failed to load blogs.', err);
        setError('Could not load blogs right now. Please try again shortly.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (selectedSlug) {
    return (
      <BlogDetailPage
        slug={selectedSlug}
        onBack={closeBlog}
        onSelectRelated={openBlog}
        onNavigateHome={onNavigateHome}
      />
    );
  }

  return (
    <div className="pt-16 sm:pt-[76px] bg-[#FAF8F5]">
      {/* Hero */}
      <section className="relative min-h-[320px] sm:min-h-[380px] flex items-end overflow-hidden bg-[#2C2623]">
        <img
          src={heroImage}
          alt="Tanshu Vaidik journal"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2C2623]/90 via-[#2C2623]/60 to-[#2C2623]/20" />

        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-20 pb-10 sm:pb-14">
          <span className="font-sans text-[11px] font-bold tracking-[0.3em] text-[#D8B88A] uppercase">
            Tanshu Vaidik India Pvt. Ltd.
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-medium mt-2">Journal</h1>
          <p className="font-sans text-sm sm:text-base text-white/80 max-w-lg leading-relaxed mt-3">
            Stories from our workshop, sourcing notes, and ideas for buyers building their next
            home décor collection.
          </p>
        </div>
      </section>

      {/* Post grid */}
      <section className="py-14 sm:py-16">
        <div className="w-full px-6 sm:px-10 lg:px-20">
          {loading && (
            <p className="text-center font-sans text-sm text-[#615751] py-16">Loading blogs...</p>
          )}
          {!loading && error && (
            <p className="text-center font-sans text-sm text-[#C0392B] py-16">{error}</p>
          )}
          {!loading && !error && posts.length === 0 && (
            <p className="text-center font-sans text-sm text-[#615751] py-16">No blogs found.</p>
          )}
          {!loading && !error && posts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  onClick={() => openBlog(post.slug)}
                  className="group flex flex-col bg-white border border-[#EBE4DC] hover:border-[#8F533C]/40 hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#F4EFEA]">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-[#FAF8F5] text-[#8F533C] font-sans text-[10px] font-bold uppercase tracking-widest">
                      {post.category}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 p-5">
                    <div className="flex items-center gap-4 font-sans text-[11px] text-[#615751]">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {post.date}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg text-[#2C2623] font-bold leading-snug">{post.title}</h3>
                    <p className="font-sans text-sm text-[#615751] leading-relaxed line-clamp-3">{post.excerpt}</p>
                    <span className="mt-1 inline-flex items-center gap-1.5 font-sans text-xs font-bold tracking-widest uppercase text-[#8F533C] group-hover:gap-2.5 transition-all w-fit">
                      Read More
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
