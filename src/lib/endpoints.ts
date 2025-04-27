// For direct Django backend calls (if needed)
export const DJANGO_API_BASE = '';

// Auth endpoints (Next.js route handlers)
export const AUTH_ENDPOINTS = {
    login: `/api/token/`,
    register: `/api/auth/register/`,
    refresh: `/api/token/refresh/`
};

// Document-related endpoints (direct backend calls)
export const DOCUMENT_ENDPOINTS = {
    list: `${DJANGO_API_BASE}/api/documents/`,
    detail: (id: string | number) => `${DJANGO_API_BASE}/api/documents/${id}/`,
    create: `${DJANGO_API_BASE}/api/documents/`,
    update: (id: string | number) => `${DJANGO_API_BASE}/api/documents/${id}/`,
    partialUpdate: (id: string | number) => `${DJANGO_API_BASE}/api/documents/${id}/`,
    delete: (id: string | number) => `${DJANGO_API_BASE}/api/documents/${id}/`
};

// Category-related endpoints (direct backend calls)
export const CATEGORY_ENDPOINTS = {
    list: `${DJANGO_API_BASE}/api/categories/`,
    detail: (id: string | number) => `${DJANGO_API_BASE}/api/categories/${id}/`
};

// Aggregate all endpoints for easy import
export const ENDPOINTS = {
    auth: AUTH_ENDPOINTS,
    documents: DOCUMENT_ENDPOINTS,
    categories: CATEGORY_ENDPOINTS
};
