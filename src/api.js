
// api.tanshuvaidik.com does not accept HTTPS connections (port 443 is
// unreachable); the backend only serves over plain HTTP.
export const BASE_URL = import.meta.env.DEV ? '' : 'http://api.tanshuvaidik.com';

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
        return response.json();
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

export const getSizeList = () => apiGet('/api/size-list');

export const getColorList = () => apiGet('/api/color-list');

export const getCollectionFilterList = () => apiGet('/api/collection-list');

export const getShapeList = () => apiGet('/api/shape-list');

export const getWeaveList = () => apiGet('/api/weave-list');

export const getMaterialList = () => apiGet('/api/material-list');

export const getBlogList = () => apiGet('/api/blog-list');

export const submitProductEnquiry = (payload) => apiPost('/api/product-enquiry', payload);
export async function getTeamList() {
  return apiRequest('/api/team-list');
}