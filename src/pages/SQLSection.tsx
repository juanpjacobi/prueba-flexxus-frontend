import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Card from '../components/shared/Card';
import { reports, fetchReport, ReportKey, ReportMeta } from '../api/reports';

export default function SQLSection() {
  const [selected, setSelected] = useState<ReportKey | ''>('');
  const { data, refetch, isFetching, isError, error } = useQuery<any[], Error>({
    queryKey: ['report', selected],
    queryFn: () => fetchReport(selected as ReportKey),
    enabled: false,
  });


  return (
    <div>
      <Card title="Reportes SQL">
        <div className="flex items-center space-x-4 mb-4">
          <select
            value={selected}
            onChange={e => setSelected(e.target.value as ReportKey)}
            className="border p-2 rounded flex-1"
          >
            <option value="">Seleccione un reporte</option>
            {reports.map(r => (
              <option key={r.key} value={r.key}>{r.title}</option>
            ))}
          </select>
          <button
            onClick={() => selected && refetch()}
            disabled={!selected}
            className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
          >
            Ejecutar
          </button>
        </div>

        {isFetching && <p>Cargando reporte...</p>}
        {isError && <p className="text-red-500">Error: {error?.message}</p>}

        {data && (
          <div className="overflow-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  {Object.keys(data[0]).map(col => (
                    <th key={col} className="px-4 py-2 border">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-100">
                    {Object.values(row).map((val, j) => (
                      <td key={j} className="px-4 py-2 border">{String(val)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!data && !isFetching && !isError && (
          <p>Selecciona un reporte y haz clic en Ejecutar.</p>
        )}
      </Card>
    </div>
  );
}