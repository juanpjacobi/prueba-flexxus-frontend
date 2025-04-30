import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Card from '../components/shared/Card';
import Modal from '../components/articles/Modal';
import ArticleForm from '../components/articles/ArticleForm';
import { Article } from '../types/Article';
import { getArticles, createArticle, updateArticle, deleteArticle, ArticleQueryFilters } from '../api/articles';
import ArticlesTable from '../components/articles/ArticlesTable';

export default function CRUDSection() {
  const qc = useQueryClient();

  // State for input filters
  const [inputFilters, setInputFilters] = useState<ArticleQueryFilters>({});
  // State for applied filters (used for fetching)
  const [appliedFilters, setAppliedFilters] = useState<ArticleQueryFilters>({});

  // Determine when inputs or applied filters have values
  const inputFiltersApplied = Object.values(inputFilters).some(v => v !== undefined && v !== '');
  const appliedFiltersApplied = Object.values(appliedFilters).some(v => v !== undefined && v !== '');

  // Single useQuery reading appliedFilters
  const { data: articles = [], isFetching, refetch } = useQuery<Article[], Error>({
    queryKey: ['articles', appliedFilters],
    queryFn: () => getArticles(appliedFilters),
    enabled: false,
  });

  // Initial load
  useEffect(() => {
    setAppliedFilters({}); // explicitly set to empty
    refetch();
  }, [refetch]);

  // Refetch when appliedFilters changes
  useEffect(() => {
    if (appliedFiltersApplied) {
      refetch();
    }
  }, [appliedFilters, refetch, appliedFiltersApplied]);

  // Mutations unchanged
  const createM = useMutation<Article, Error, Pick<Article, 'name' | 'brand'>>({
    mutationFn: createArticle,
    onSuccess: () => refetch(),
  });
  const updateM = useMutation<Article, Error, { id: number; data: Partial<Omit<Article, 'id'>> }>({
    mutationFn: ({ id, data }) => updateArticle(id, data),
    onSuccess: () => refetch(),
  });
  const deleteM = useMutation<Article, Error, number>({
    mutationFn: deleteArticle,
    onSuccess: () => refetch(),
  });

  const [isFormOpen, setFormOpen] = useState(false);
  const [editArticle, setEditArticle] = useState<Article | null>(null);

  // Handlers for inputs
  const handleInputChange = <K extends keyof ArticleQueryFilters>(
    key: K,
    value: ArticleQueryFilters[K]
  ) => setInputFilters(prev => ({ ...prev, [key]: value }));

  // Apply filters on button click
  const applyFilters = () => {
    setAppliedFilters(inputFilters);
  };

  // Reset both input and applied filters
  const resetFilters = () => {
    setInputFilters({});
    setAppliedFilters({});
  };

  return (
    <div>
      <Card title="CRUD de Artículos">
        {/* Filter inputs */}
        <div className="flex flex-wrap gap-2 mb-4">
          <input
            type="text"
            placeholder="Nombre"
            value={inputFilters.name || ''}
            onChange={e => handleInputChange('name', e.target.value)}
            className="border p-2 rounded min-w-[120px]"
          />
          <input
            type="text"
            placeholder="Marca"
            value={inputFilters.brand || ''}
            onChange={e => handleInputChange('brand', e.target.value)}
            className="border p-2 rounded min-w-[120px]"
          />
          <select
            value={inputFilters.active == null ? '' : String(inputFilters.active)}
            onChange={e => handleInputChange(
              'active',
              e.target.value === '' ? undefined : e.target.value === 'true'
            )}
            className="border p-2 rounded"
          >
            <option value="">Todos</option>
            <option value="true">Activos</option>
            <option value="false">Inactivos</option>
          </select>
          <input
            type="date"
            value={inputFilters.updatedFrom || ''}
            onChange={e => handleInputChange('updatedFrom', e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={inputFilters.updatedTo || ''}
            onChange={e => handleInputChange('updatedTo', e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={applyFilters}
            disabled={!inputFiltersApplied}
            className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
          >Filtrar</button>
          <button
            onClick={resetFilters}
            disabled={!appliedFiltersApplied}
            className="px-4 py-2 bg-gray-400 text-white rounded disabled:opacity-50"
          >Limpiar</button>
        </div>

        {/* New Article button */}
        <button
          onClick={() => { setEditArticle(null); setFormOpen(true); }}
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
        >Nuevo Artículo</button>

        {/* Table or loader */}
        {isFetching ? (
          <p>Cargando artículos…</p>
        ) : (
          <ArticlesTable
            articles={articles}
            onEdit={a => { setEditArticle(a); setFormOpen(true); }}
            onDelete={id => deleteM.mutate(id)}
          />
        )}

        {/* Modal/Form */}
        {isFormOpen && (
          <Modal
            isOpen
            onClose={() => setFormOpen(false)}
            title={editArticle ? 'Editar Artículo' : 'Crear Artículo'}
          >
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
