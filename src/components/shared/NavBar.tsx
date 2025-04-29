import { NavLink } from "react-router-dom"

export const NavBar = () => {
  return (
    <header className="bg-indigo-600 text-white p-4">
    <nav className="container mx-auto flex space-x-6">
      <NavLink
        to="/oop"
        className={({ isActive }) =>
          isActive ? 'font-semibold underline' : 'opacity-75 hover:opacity-100'
        }
      >
        OOP
      </NavLink>
      <NavLink
        to="/sql"
        className={({ isActive }) =>
          isActive ? 'font-semibold underline' : 'opacity-75 hover:opacity-100'
        }
      >
        SQL
      </NavLink>
      <NavLink
        to="/crud"
        className={({ isActive }) =>
          isActive ? 'font-semibold underline' : 'opacity-75 hover:opacity-100'
        }
      >
        CRUD
      </NavLink>
    </nav>
  </header>
  )
}
