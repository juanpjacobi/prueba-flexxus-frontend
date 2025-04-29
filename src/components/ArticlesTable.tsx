import { CiEdit } from 'react-icons/ci';
import { Article } from '../types/Article';
import { MdDelete } from 'react-icons/md';

interface ArticlesTableProps {
  articles: Article[];
  onEdit: (article: Article) => void;
  onDelete: (id: number) => void;
}

export default function ArticlesTable({ articles, onEdit, onDelete }: ArticlesTableProps) {
  return (
    <table className="min-w-full bg-white border">
      <thead>
        <tr>
          <th className="px-4 py-2 border">ID</th>
          <th className="px-4 py-2 border">Nombre</th>
          <th className="px-4 py-2 border">Marca</th>
          <th className="px-4 py-2 border">Fecha Mod.</th>
          <th className="px-4 py-2 border">Activo</th>
          <th className="px-4 py-2 border">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {articles.map(a => (
          <tr key={a.id} className="hover:bg-gray-100">
            <td className="px-4 py-2 border">{a.id}</td>
            <td className="px-4 py-2 border">{a.name}</td>
            <td className="px-4 py-2 border">{a.brand}</td>
            <td className="px-4 py-2 border">{new Date(a.dateMod).toLocaleString()}</td>
            <td className="px-4 py-2 border">{a.active ? 'Activo' : 'Inactivo'}</td>
            <td className="px-4 py-2 border space-x-2 ">
                <div className='flex justify-around'>

              <button onClick={() => onEdit(a)} className="text-blue-600 hover:underline"><CiEdit size={25}/></button>
              <button onClick={() => onDelete(a.id)} className="text-red-600 hover:underline"><MdDelete size={25}/></button>
                </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}