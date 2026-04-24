import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Bienvenido</h1>
        <div className="flex gap-4">
          <Link 
            to="/nuevo"
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-200"
          >
            Nuevo Participante
          </Link>
          <Link 
            to="/lista"
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition duration-200"
          >
            Ver Lista
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
