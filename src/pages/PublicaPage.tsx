import { Link } from 'react-router-dom'

const features = [
  {
    icon: '🎓',
    title: 'Gestión de participantes',
    description: 'Registrá, editá y consultá participantes de forma rápida y organizada.',
  },
  {
    icon: '📚',
    title: 'Cursos disponibles',
    description: 'Explorá la oferta de cursos y su información detallada en un solo lugar.',
  },
  {
    icon: '🔐',
    title: 'Acceso por roles',
    description: 'Sistema seguro con roles de Administrador y Consulta para cada perfil.',
  },
]

const PublicaPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">

      {/* Orbs decorativos de fondo */}
      <div className="absolute top-[-80px] left-[-80px] w-[420px] h-[420px] rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-60px] w-[380px] h-[380px] rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center max-w-3xl w-full text-center gap-6">

        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          Sistema de gestión académica — UTN
        </span>

        {/* Título */}
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight tracking-tight">
          Gestión de{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Participantes
          </span>
        </h1>

        {/* Descripción */}
        <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
          Plataforma centralizada para administrar participantes, consultar cursos
          y gestionar el acceso según el perfil de cada usuario.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 w-full justify-center">
          <Link
            to="/lista"
            id="btn-invitado"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-base backdrop-blur-sm transition duration-200 shadow-lg hover:shadow-white/5"
          >
            <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Acceder como invitado
          </Link>

          <Link
            to="/login"
            id="btn-login"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-base transition duration-200 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Iniciar sesión
          </Link>
        </div>

        {/* Divisor */}
        <div className="w-full border-t border-white/10 mt-6" />

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col items-start gap-3 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-left hover:bg-white/8 transition duration-200"
            >
              <span className="text-3xl">{f.icon}</span>
              <h2 className="text-white font-semibold text-base leading-snug">{f.title}</h2>
              <p className="text-slate-400 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

        {/* Footer mínimo */}
        <p className="text-slate-600 text-xs mt-6">
          Programación IV · UTN · 2025
        </p>
      </div>
    </div>
  )
}

export default PublicaPage
