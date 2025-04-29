import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Card from '../components/Card';
import Modal from '../components/Modal';
import ArticleForm from '../components/ArticleForm';
import { Article } from '../types/Article';
import { getArticles, createArticle, updateArticle, deleteArticle } from '../api/articles';
import ArticlesTable from '../components/ArticlesTable';

export default function CRUDSection() {
  const qc = useQueryClient();

  // Fetch articles list
  const { data: articles, isFetching } = useQuery<Article[]>({
    queryKey: ['articles'],
    queryFn: getArticles,
  });

  // CREATE mutation
  const createM = useMutation<Article, Error, Pick<Article, 'name' | 'brand'>>({
    mutationFn: createArticle,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['articles'] }),
  });

  // UPDATE mutation
  const updateM = useMutation<Article, Error, { id: number; data: Partial<Omit<Article, 'id'>> }>({
    mutationFn: ({ id, data }) => updateArticle(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['articles'] }),
  });

  // DELETE mutation
  const deleteM = useMutation<Article, Error, number>({
    mutationFn: deleteArticle,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['articles'] }),
  });

  const [isFormOpen, setFormOpen] = useState(false);
  const [editArticle, setEditArticle] = useState<Article | null>(null);

  return (
    <div>
      <Card title="CRUD de Artículos">
        <button
          onClick={() => { setEditArticle(null); setFormOpen(true); }}
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
        >
          Nuevo Artículo
        </button>

        {isFetching ? (
          <p>Cargando artículos…</p>
        ) : (
          <ArticlesTable
            articles={articles || []}
            onEdit={a => { setEditArticle(a); setFormOpen(true); }}
            onDelete={id => deleteM.mutate(id)}
          />
        )}

        {isFormOpen && (
          <Modal isOpen onClose={() => setFormOpen(false)} title={editArticle ? 'Editar Artículo' : 'Crear Artículo'}>
            <ArticleForm
              defaultValues={editArticle || undefined}
              onSubmit={data => {
                if (editArticle) updateM.mutate({ id: editArticle.id, data });
                else createM.mutate(data);
                setFormOpen(false);
              }}
              onCancel={() => setFormOpen(false)}
            />
          </Modal>
        )}
      </Card>
    </div>
  );
}
