export type ReportKey =
  | 'ordenDesc'
  | 'soporte'
  | 'terminanConO'
  | 'carlosPaz'
  | 'sueldoEntre'
  | 'deptMasDe5'
  | 'cordobaAnalistaProg'
  | 'sueldoMedio'
  | 'sueldoMaxDept10'
  | 'sueldoMinSoporte'
  | 'sumaSueldosPuesto';

export interface ReportMeta {
  key: ReportKey;
  title: string;
  path: string;
}

export const reports: ReportMeta[] = [
  { key: 'ordenDesc', title: 'Empleados ordenados Z→A', path: '/api/reports/empleados/orden-desc' },
  { key: 'soporte', title: 'Empleados con puesto Soporte', path: '/api/reports/empleados/soporte' },
  { key: 'terminanConO', title: "Empleados cuyo nombre termina en 'o'", path: '/api/reports/empleados/terminan-con-o' },
  { key: 'carlosPaz', title: 'Empleados en Carlos Paz', path: '/api/reports/empleados/carlos-paz' },
  { key: 'sueldoEntre', title: 'Empleados con sueldo 10000–13000', path: '/api/reports/empleados/sueldo-entre' },
  { key: 'deptMasDe5', title: 'Departamentos con más de 5 empleados', path: '/api/reports/departamentos/mas-de-5' },
  { key: 'cordobaAnalistaProg', title: 'Analistas/Programadores en Córdoba', path: '/api/reports/empleados/cordoba-analista-prog' },
  { key: 'sueldoMedio', title: 'Sueldo medio de empleados', path: '/api/reports/sueldo/medio' },
  { key: 'sueldoMaxDept10', title: 'Máximo sueldo dept 10', path: '/api/reports/sueldo/max-dept-10' },
  { key: 'sueldoMinSoporte', title: 'Mínimo sueldo Soporte', path: '/api/reports/sueldo/min-soporte' },
  { key: 'sumaSueldosPuesto', title: 'Suma de sueldos por puesto', path: '/api/reports/suma-sueldos/por-puesto' },
];

/**
 * Fetch any report by key.
 */
export async function fetchReport(key: ReportKey): Promise<any[]> {
  const meta = reports.find(r => r.key === key);
  if (!meta) throw new Error('Reporte desconocido');
  const res = await fetch(meta.path);
  if (!res.ok) throw new Error(`Error al obtener reporte: ${res.status}`);
  const json = await res.json();
  // asumimos que es un array de objetos
  return json;
}
