import {  Outlet } from 'react-router-dom';
import { NavBar } from './NavBar';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />

      <main className="flex-1 container mx-auto p-6">
        <Outlet />
      </main>

      <footer className="bg-gray-200 text-gray-600 p-4 text-center">
        &copy; 2025 Prueba Flexxus. Todos los derechos reservados.
      </footer>
    </div>
  );
}
