const COLLECTIONS_BASE = '/collections';

export function getCollectionPathSegments(): string[] {
  const pathname = window.location.pathname;
  if (pathname !== COLLECTIONS_BASE && !pathname.startsWith(`${COLLECTIONS_BASE}/`)) return [];
  return pathname.slice(COLLECTIONS_BASE.length).split('/').filter(Boolean);
}

export function pushCollectionPath(segments: (string | undefined)[]) {
  const clean = segments.filter((segment): segment is string => Boolean(segment));
  const path = clean.length ? `${COLLECTIONS_BASE}/${clean.join('/')}` : COLLECTIONS_BASE;
  if (window.location.pathname !== path) {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
  window.scrollTo({ top: 0 });
}
