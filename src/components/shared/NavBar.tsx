import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token and any user data
    localStorage.removeItem("token");
    // Redirect to login
    navigate("/login", { replace: true });
  };

  return (
    <header className="bg-indigo-600 text-white p-4">
      <nav className="container mx-auto flex items-center justify-between">
        <div className="flex space-x-6">
          <NavLink
            to="/oop"
            className={({ isActive }) =>
              isActive
                ? "font-semibold underline"
                : "opacity-75 hover:opacity-100"
            }
          >
            OOP
          </NavLink>
          <NavLink
            to="/sql"
            className={({ isActive }) =>
              isActive
                ? "font-semibold underline"
                : "opacity-75 hover:opacity-100"
            }
          >
            SQL
          </NavLink>
          <NavLink
            to="/crud"
            className={({ isActive }) =>
              isActive
                ? "font-semibold underline"
                : "opacity-75 hover:opacity-100"
            }
          >
            CRUD
          </NavLink>
        </div>
        <button
          onClick={handleLogout}
          className="ml-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Cerrar sesión
        </button>
      </nav>
    </header>
  );
};
