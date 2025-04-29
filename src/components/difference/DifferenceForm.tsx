import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { DifferenceResponse, postDifference } from '../../api/difference';

export default function DifferenceForm() {
  const [aX, setAX] = useState('');
  const [aY, setAY] = useState('');
  const [error, setError] = useState<string | null>(null);

  const diffMutation = useMutation<DifferenceResponse, Error, { x: any[]; y: any[] }>({
    mutationFn: ({ x, y }) => postDifference(x, y),
  });

  const onSubmit = () => {
    setError(null);
    const xArr = aX.split(',').map(s => s.trim()).filter(Boolean);
    const yArr = aY.split(',').map(s => s.trim()).filter(Boolean);
    if (xArr.length === 0 || yArr.length === 0) {
      setError('Ambos arrays deben tener al menos un elemento');
      return;
    }
    diffMutation.mutate({ x: xArr, y: yArr });
  };

  return (
    <div className="space-y-2">
      <textarea
        rows={2}
        value={aX}
        onChange={e => setAX(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="Array X (coma-separado)"
      />
      <textarea
        rows={2}
        value={aY}
        onChange={e => setAY(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="Array Y (coma-separado)"
      />
      <button
        onClick={onSubmit}
        className="px-4 py-2 bg-purple-600 text-white rounded"
      >
        Calcular Diferencia
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {diffMutation.isPending && <p>Cargando…</p>}
      {diffMutation.isError && (
        <p className="text-red-500">Error: {diffMutation.error?.message}</p>
      )}
      {diffMutation.data && (
        <div className="mt-2">
          <p><strong>Resultado:</strong> {diffMutation.data.result.join(', ')}</p>
        </div>
      )}
    </div>
  );
}
