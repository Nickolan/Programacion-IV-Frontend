import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

const MenuResponsive = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { usuario, logout } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setIsOpen(false)

  // Cierra el dropdown si se hace click afuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    setIsOpen(false);
    logout();
  };

  // Obtiene las iniciales del username para el avatar
  const getInitials = (username: string) =>
    username.slice(0, 2).toUpperCase();

  return (
    <nav className="w-full max-w-4xl mx-auto px-4 py-4">
      <div className="flex items-center justify-between rounded-2xl bg-white/80 backdrop-blur border border-gray-200 shadow-sm px-4 py-3">
        <Link to="/" className="text-xl font-bold text-gray-800">
          Participantes
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-3">
          {usuario?.rol === "ADMIN" && (
            <Link
              to="/nuevo"
              className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-200"
            >
              Nuevo Participante
            </Link>
          )}

          <Link
            to="/lista"
            className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition duration-200"
          >
            Ver Lista
          </Link>

          {usuario?.id && (
            <Link
              to="/cursos"
              onClick={closeMenu}
              className="px-5 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition duration-200"
            >
              Cursos
            </Link>
          )}

          {usuario?.id ? (
            /* Dropdown de usuario */
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(prev => !prev)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 shadow-sm transition duration-200 group"
                aria-haspopup="true"
                aria-expanded={isUserMenuOpen}
              >
                {/* Avatar con iniciales */}
                <span className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                  {getInitials(usuario.username)}
                </span>
                <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">
                  {usuario.username}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Menú desplegable */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white border border-gray-100 shadow-lg py-1 z-50 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Sesión activa</p>
                    <p className="text-sm font-semibold text-gray-800 truncate">{usuario.username}</p>
                    {usuario.rol && (
                      <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium">
                        {usuario.rol}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition duration-150 font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="px-5 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition duration-200 text-center"
            >
              Iniciar Sesión
            </Link>
          )}
        </div>

        {/* Hamburger (mobile) */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-lg border border-gray-300 p-2 text-gray-700 hover:bg-gray-100 transition"
          onClick={() => setIsOpen(prev => !prev)}
          aria-expanded={isOpen}
          aria-label="Abrir menú"
        >
          <span className="sr-only">Abrir menú</span>
          <span className="text-2xl leading-none">☰</span>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden mt-3 rounded-2xl bg-white border border-gray-200 shadow-lg p-3`}>
        <div className="flex flex-col gap-2">
          {/* Header de usuario en mobile */}
          {usuario?.id && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 mb-1">
              <span className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                {getInitials(usuario.username)}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{usuario.username}</p>
                {usuario.rol && (
                  <span className="text-xs text-indigo-600 font-medium">{usuario.rol}</span>
                )}
              </div>
            </div>
          )}

          {usuario?.rol === "ADMIN" && (
            <Link
              to="/nuevo"
              onClick={closeMenu}
              className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-200 text-center"
            >
              Nuevo Participante
            </Link>
          )}

          <Link
            to="/lista"
            onClick={closeMenu}
            className="px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition duration-200 text-center"
          >
            Ver Lista
          </Link>

          <Link
            to="/cursos"
            onClick={closeMenu}
            className="px-5 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition duration-200"
          >
            Cursos
          </Link>

          {usuario?.id ? (
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg transition duration-200 border border-red-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Cerrar sesión
            </button>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition duration-200 text-center"
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default MenuResponsive
