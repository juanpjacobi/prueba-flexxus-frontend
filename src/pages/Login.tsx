// src/pages/Login.tsx
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login, LoginResponse } from '../api/auth';

type Credentials = { username: string; password: string };

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const mutation = useMutation<
    LoginResponse,  
    Error,            
    Credentials        
  >({
    mutationFn: ({ username, password }) => login(username, password),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      navigate('/oop');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ username, password });
  };

  return (
    <div className="max-w-sm mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Usuario</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded"
        >
          {mutation.isPending ? 'Cargando...' : 'Entrar'}
        </button>
        {mutation.isError && (
          <p className="text-red-500 mt-2">Error: {mutation.error.message}</p>
        )}
      </form>
    </div>
  );
}
