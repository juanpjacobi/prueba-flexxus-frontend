const BASE = import.meta.env.VITE_API_BASE_URL ?? '';

export async function authFetch(input: string, init: RequestInit = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    ...init.headers,
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${BASE}${input}`, {
    ...init,
    headers,
    credentials: 'include', 
  });
  return res;
}
