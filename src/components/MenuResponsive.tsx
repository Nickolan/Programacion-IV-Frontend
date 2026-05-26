import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

const MenuResponsive = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {usuario, logout} = useAuth();

  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="w-full max-w-4xl mx-auto px-4 py-4">
      <div className="flex items-center justify-between rounded-2xl bg-white/80 backdrop-blur border border-gray-200 shadow-sm px-4 py-3">
        <Link to="/" className="text-xl font-bold text-gray-800">
          Participantes
        </Link>

        <div className="hidden md:flex items-center gap-3">
          {usuario?.rol === "ADMIN" &&
            <Link
              to="/nuevo"
              className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-200"
            >
              Nuevo Participante
            </Link>
          
          }
          <Link
            to="/lista"
            className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition duration-200"
          >
            Ver Lista
          </Link>

          {
            usuario?.id ? (
              <button
                onClick={() => {
                  logout();
                }}
                className='className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition duration-200 text-center"'
              >
                Cerrar Sesion
              </button>
            ) :
            (
              <Link
                to="/login"
                onClick={closeMenu}
                className="px-5 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition duration-200 text-center"
              >
                Iniciar Sesión
              </Link>
            )
          }
          {
            usuario?.id && (
              <Link
                to="/cursos"
                onClick={closeMenu}
                className="px-5 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition duration-200"
              >
                Cursos
              </Link>
            )
          }
        </div>

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-lg border border-gray-300 p-2 text-gray-700 hover:bg-gray-100 transition"
          onClick={() => setIsOpen((currentValue) => !currentValue)}
          aria-expanded={isOpen}
          aria-label="Abrir menú"
        >
          <span className="sr-only">Abrir menú</span>
          <span className="text-2xl leading-none">☰</span>
        </button>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden mt-3 rounded-2xl bg-white border border-gray-200 shadow-lg p-3`}>
        <div className="flex flex-col gap-2">
          {usuario?.rol === "ADMIN" &&
            <Link
              to="/nuevo"
              className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-200"
            >
              Nuevo Participante
            </Link>
          
          }
          <Link
            to="/lista"
            onClick={closeMenu}
            className="px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition duration-200 text-center"
          >
            Ver Lista
          </Link>

          {
            usuario?.id ? (
              <button
                onClick={() => {
                  logout();
                }}
                className='className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition duration-200 text-center"'
              >
                Cerrar Sesion
              </button>
            ) :
            (
              <Link
                to="/login"
                onClick={closeMenu}
                className="px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition duration-200 text-center"
              >
                Iniciar Sesión
              </Link>
            )
          }
          
        </div>
      </div>
    </nav>
  )
}

export default MenuResponsive
