import { Article } from '../types/Article';
import { authFetch } from '../utils/authFetch';

async function handleResponse<T>(res: Response): Promise<T> {
  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message || 'Error en API');
  return json;
}

export interface ArticleQueryFilters {
  name?: string;
  brand?: string;
  active?: boolean;
  updatedFrom?: string; 
  updatedTo?: string;
}

export const getArticles = (
  filters: ArticleQueryFilters = {}
): Promise<Article[]> => {
  const params = new URLSearchParams();
  if (filters.name) params.set('name', filters.name);
  if (filters.brand) params.set('brand', filters.brand);
  if (filters.active !== undefined) params.set('active', String(filters.active));
  if (filters.updatedFrom) params.set('updatedFrom', filters.updatedFrom);
  if (filters.updatedTo) params.set('updatedTo', filters.updatedTo);

  const query = params.toString() ? `?${params.toString()}` : '';
  return authFetch(`/api/articles${query}`)
    .then(res => handleResponse<Article[]>(res));
};



export const createArticle = (
  data: Pick<Article, 'name' | 'brand'>
): Promise<Article> =>
  authFetch('/api/articles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => handleResponse<Article>(res));

export const updateArticle = (
  id: number,
  data: Partial<Omit<Article, 'id'>>
): Promise<Article> =>
  authFetch(`/api/articles/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => handleResponse<Article>(res));

export const deleteArticle = (id: number): Promise<Article> =>
  authFetch(`/api/articles/${id}`, {
    method: 'DELETE',
  }).then(res => handleResponse<Article>(res));
