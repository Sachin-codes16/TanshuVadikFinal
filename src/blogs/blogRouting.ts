const BLOGS_BASE = '/blogs';

export function getBlogSlugFromPath(): string | null {
  const pathname = window.location.pathname;
  if (!pathname.startsWith(`${BLOGS_BASE}/`)) return null;
  const slug = pathname.slice(BLOGS_BASE.length + 1).split('/')[0];
  return slug || null;
}

export function pushBlogPath(slug?: string) {
  const path = slug ? `${BLOGS_BASE}/${slug}` : BLOGS_BASE;
  if (window.location.pathname !== path) {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
  window.scrollTo({ top: 0 });
}
