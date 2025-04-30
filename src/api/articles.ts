import { Article } from '../types/Article';
import { authFetch } from '../utils/authFetch';

async function handleResponse<T>(res: Response): Promise<T> {
  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message || 'Error en API');
  return json;
}

export const getArticles = (): Promise<Article[]> =>
  authFetch('/api/articles')
    .then(res => handleResponse<Article[]>(res));

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
