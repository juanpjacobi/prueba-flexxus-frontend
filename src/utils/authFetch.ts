export const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export function authFetch(input: RequestInfo, init?: RequestInit) {
  const url = typeof input === 'string' && input.startsWith('/api')
    ? `${API_BASE}${input}`
    : String(input);
  return fetch(url, init);
}
