import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Card from "../components/shared/Card";
import {
  fetchOddNumbers,
  postSueldos,
  postAlumno,
  SueldosResponse,
  AlumnoResponse,
} from "../api/oop";
import DifferenceForm from "../components/difference/DifferenceForm";

export default function OOPSection() {
  // Odd numbers
  const {
    data: oddData,
    refetch: runOdd,
    isFetching: loadingOdd,
  } = useQuery<number[], Error>({
    queryKey: ["odd"],
    queryFn: fetchOddNumbers,
    enabled: false,
  });

  // Sueldos
  const [inputs, setInputs] = useState<string[]>(["", "", "", "", ""]);
  const [sueldosError, setSueldosError] = useState<string | null>(null);
  const sueldosMutation = useMutation<SueldosResponse, Error, number[]>({
    mutationFn: postSueldos,
  });

  function validarSueldos(vals: string[]): number[] | null {
    if (vals.some((v) => v.trim() === "")) {
      setSueldosError("Debes completar los 5 sueldos");
      return null;
    }
    const nums = vals.map((v) => Number(v));
    if (nums.some((n) => isNaN(n) || n < 0)) {
      setSueldosError("Todos los sueldos deben ser números >= 0");
      return null;
    }
    setSueldosError(null);
    return nums;
  }

  // Alumno
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [errorNombre, setErrorNombre] = useState<string | null>(null);
  const [errorEdad, setErrorEdad] = useState<string | null>(null);
  const alumnoMutation = useMutation<
    AlumnoResponse,
    Error,
    { nombre: string; edad: number }
  >({
    mutationFn: ({ nombre, edad }) => postAlumno(nombre, edad),
  });

  function validarAlumno(): { nombre: string; edad: number } | null {
    if (!nombre.trim()) {
      setErrorNombre("El nombre es obligatorio");
      return null;
    }
    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nombre)) {
      setErrorNombre("Solo letras y espacios");
      return null;
    }
    setErrorNombre(null);

    if (edad.trim() === "") {
      setErrorEdad("La edad es obligatoria");
      return null;
    }
    const n = Number(edad);
    if (isNaN(n) || !Number.isInteger(n) || n < 0) {
      setErrorEdad("La edad debe ser un entero >= 0");
      return null;
    }
    setErrorEdad(null);
    return { nombre, edad: n };
  }

  return (
    <div>
      <Card title="Números impares entre 0 y 100">
        <button
          onClick={() => runOdd()}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Ejecutar
        </button>
        {loadingOdd && <p>Cargando...</p>}
        {oddData && <p className="mt-2">{oddData.join(", ")}</p>}
      </Card>

      <Card title="Sueldos de 5 operarios">
        <div className="grid grid-cols-5 gap-2 mb-2">
          {inputs.map((val, i) => (
            <input
              key={i}
              type="number"
              value={val}
              onChange={(e) => {
                const arr = [...inputs];
                arr[i] = e.target.value;
                setInputs(arr);
              }}
              className="border p-1 rounded"
              placeholder={`#${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => {
            const nums = validarSueldos(inputs);
            if (nums) sueldosMutation.mutate(nums);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Ejecutar
        </button>
        {sueldosError && <p className="text-red-500">{sueldosError}</p>}
        {sueldosMutation.isPending && <p>Cargando...</p>}
        {sueldosMutation.isError && (
          <p className="text-red-500">
            Error: {(sueldosMutation.error as Error).message}
          </p>
        )}
        {sueldosMutation.data && (
          <div className="mt-2">
            <p>Valores: {sueldosMutation.data.valores.join(", ")}</p>
            <ul className="list-disc ml-5">
              {sueldosMutation.data.lineas.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      <Card title="Crear y mostrar Alumno">
        <div className="flex space-x-2 mb-2">
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
            className="border p-1 rounded flex-1"
          />
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            placeholder="Edad"
            className="border p-1 rounded w-20"
          />
        </div>
        {errorNombre && <p className="text-red-500 mb-2">{errorNombre}</p>}
        {errorEdad && <p className="text-red-500 mb-2">{errorEdad}</p>}
        <button
          onClick={() => {
            const alumno = validarAlumno();
            if (alumno) alumnoMutation.mutate(alumno);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Ejecutar
        </button>
        {alumnoMutation.isPending && <p>Cargando...</p>}
        {alumnoMutation.isError && (
          <p className="text-red-500">
            Error: {(alumnoMutation.error as Error).message}
          </p>
        )}
        {alumnoMutation.data && (
          <div className="mt-2">
            <ul className="list-disc ml-5">
              {alumnoMutation.data.datos.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
            <ul className="list-disc ml-5">
              {alumnoMutation.data.mayoria.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>
        )}
      </Card>
      <Card title="Diferencia de arrays">
        <DifferenceForm />
      </Card>
    </div>
  );
}
