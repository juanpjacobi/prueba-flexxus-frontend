export async function fetchOddNumbers(): Promise<number[]> {
  const res = await fetch('/api/odd-numbers');
  if (!res.ok) throw new Error('Error al obtener números impares');
  const json = await res.json();
  return json.oddNumbers;
}

export interface SueldosResponse {
  valores: number[];
  lineas: string[];
}
export async function postSueldos(sueldos: number[]): Promise<SueldosResponse> {
  const res = await fetch('/api/sueldos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sueldos }),
  });
  const payload = await res.json();
  if (!res.ok) {
    const errors = payload.error;
    const messages: string[] = [];
    for (const key in errors) {
      messages.push(...errors[key]._errors);
    }
    throw new Error(messages.join(' · '));
  }
  return payload;
}

export interface AlumnoResponse {
  datos: string[];
  mayoria: string[];
}
export async function postAlumno(
  nombre: string,
  edad: number
): Promise<AlumnoResponse> {
  const res = await fetch('/api/alumnos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, edad }),
  });
  const payload = await res.json();
  if (!res.ok) {
    const errors = payload.error;
    const messages: string[] = [];
    for (const key in errors) {
      messages.push(...errors[key]._errors);
    }
    throw new Error(messages.join(' · '));
  }
  return payload;
}