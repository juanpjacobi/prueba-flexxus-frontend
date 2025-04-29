import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Article } from '../types/Article';

const articleSchema = z.object({
  name: z.string().min(1, 'Nombre es obligatorio'),
  brand: z.string().min(1, 'Marca es obligatoria'),
  active: z.boolean(),
});

type ArticleFormValues = z.infer<typeof articleSchema>;

interface ArticleFormProps {
  defaultValues?: Partial<ArticleFormValues>;
  onSubmit: (data: ArticleFormValues) => void;
  onCancel: () => void;
}

export default function ArticleForm({ defaultValues, onSubmit, onCancel }: ArticleFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      brand: defaultValues?.brand || '',
      active: defaultValues?.active ?? true,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1">Nombre</label>
        <input {...register('name')} className="w-full border p-2 rounded" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block mb-1">Marca</label>
        <input {...register('brand')} className="w-full border p-2 rounded" />
        {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}
      </div>
      <div className="flex items-center space-x-2">
        <input type="checkbox" {...register('active')} id="active" />
        <label htmlFor="active">Activo</label>
      </div>
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Guardar</button>
      </div>
    </form>
  );
}