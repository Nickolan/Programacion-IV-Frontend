import MenuResponsive from '../components/MenuResponsive'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <MenuResponsive />

      <div className="flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Bienvenido</h1>
          <p className="text-gray-600 mb-8">
            Crea, edita y visualiza tus participantes de manera fácil y rápida. Usa el menú para navegar entre las opciones disponibles.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
