
// api.tanshuvaidik.com does not accept HTTPS connections (port 443 is
// unreachable), so the browser can never call it directly from an HTTPS
// page (mixed-content blocked). Always call same-origin '/api/...' instead —
// the dev server (vite.config.ts) and production (vercel.json) both proxy
// that path server-side to the plain-HTTP backend.
export const BASE_URL = '';

// Every image/media URL the backend returns is also plain-HTTP-only
// (http://admin.tanshuvaidik.com/... or http://api.tanshuvaidik.com/...),
// so it hits the same mixed-content block as the API itself when the page
// is served over HTTPS (production). Rewrite those absolute URLs to
// same-origin paths that vercel.json proxies server-side. Dev is untouched
// since the page itself is HTTP there and the direct URLs already work.
const MEDIA_HOST_PROXIES = {
  'http://admin.tanshuvaidik.com': '/media-proxy/admin',
  'http://api.tanshuvaidik.com': '/media-proxy/api',
};

function rewriteMediaUrls(value) {
  if (typeof value === 'string') {
    for (const [host, proxyPrefix] of Object.entries(MEDIA_HOST_PROXIES)) {
      if (value.startsWith(`${host}/`)) {
        return `${proxyPrefix}${value.slice(host.length)}`;
      }
    }
    return value;
  }
  if (Array.isArray(value)) return value.map(rewriteMediaUrls);
  if (value && typeof value === 'object') {
    const out = {};
    for (const key of Object.keys(value)) out[key] = rewriteMediaUrls(value[key]);
    return out;
  }
  return value;
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function apiRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const fetchOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  };

  const maxAttempts = 3;
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(url, fetchOptions);

      if (response.ok) {
        const data = await response.json();
        return import.meta.env.DEV ? data : rewriteMediaUrls(data);
      }

      lastError = new Error(`API request failed: ${response.status} ${response.statusText}`);

      // A transient upstream/WAF block (e.g. intermittent 403) is worth a retry;
      // a real client/auth error is not.
      if (response.status !== 403 || attempt === maxAttempts) {
        throw lastError;
      }
    } catch (err) {
      lastError = err;
      if (attempt === maxAttempts) throw lastError;
    }

    await wait(attempt * 500);
  }

  throw lastError;
}

export const apiGet = (endpoint) => apiRequest(endpoint, { method: 'GET' });

export const apiPost = (endpoint, body) =>
  apiRequest(endpoint, { method: 'POST', body: JSON.stringify(body) });

export const getCategoryList = () => apiGet('/api/product/category-list');

export const getHomeCollections = () => apiGet('/api/home');

export const getSubCategoryList = (categorySlug) =>
  apiGet(`/api/product/sub-category-list/${categorySlug}`);

export const submitContactUs = (payload) => apiPost('/api/contactus/insert', payload);

export const getProductList = (categorySlug, subCategorySlug) =>
  apiGet(`/api/product-list/${categorySlug}/${subCategorySlug}`);


export const getProductDetail = (categorySlug, subCategorySlug, productSlug) =>
  apiGet(`/api/product-detail/${categorySlug}/${subCategorySlug}/${productSlug}`);

export const filterProductList = (categorySlug, subCategorySlug, payload) =>
  apiPost(`/api/product/filter/${categorySlug}/${subCategorySlug}`, payload);

export const getSizeList = (subCategoryID) => apiGet(`/api/size-list/${subCategoryID}`);

export const getColorList = (subCategoryID) => apiGet(`/api/color-list/${subCategoryID}`);

export const getCollectionFilterList = (subCategoryID) => apiGet(`/api/collection-list/${subCategoryID}`);

export const getCollectionBanner = () => apiGet('/api/collection/banner');

export const getShapeList = (subCategoryID) => apiGet(`/api/shape-list/${subCategoryID}`);

export const getWeaveList = (subCategoryID) => apiGet(`/api/weave-list/${subCategoryID}`);

export const getMaterialList = (subCategoryID) => apiGet(`/api/material-list/${subCategoryID}`);

export const getBlogList = () => apiGet('/api/blog-list');

export const submitProductEnquiry = (payload) => apiPost('/api/product-enquiry', payload);
export async function getTeamList() {
  return apiRequest('/api/team-list');
}