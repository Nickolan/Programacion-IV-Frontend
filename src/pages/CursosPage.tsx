import { useState } from 'react';
import CheckoutMP from '../components/CheckoutMP';
import MenuResponsive from '../components/MenuResponsive';

interface Curso {
    nombre: string;
    precio: number;
}

const CursosPage = () => {
    const [cursoSeleccionado, setCursoSeleccionado] = useState<Curso | null>(null);
    
    const cursos: Curso[] = [
        { nombre: "React", precio: 100 },
        { nombre: "Angular", precio: 120 },
        { nombre: "Vue", precio: 90 },
        { nombre: "Node.js", precio: 110 },
        { nombre: "Python", precio: 130 },
        { nombre: "Java", precio: 140 },
    ];

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <MenuResponsive/>
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                        Catálogo de Cursos
                    </h1>
                    <p className="mt-4 text-lg text-slate-600">
                        Selecciona la tecnología que quieres dominar hoy.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cursos.map((curso, index) => {
                        const isSelected = cursoSeleccionado?.nombre === curso.nombre;
                        
                        return (
                            <div 
                                key={index} 
                                className={`flex flex-col justify-between bg-white rounded-2xl shadow-sm border p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${
                                    isSelected ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-50' : 'border-slate-200'
                                }`}
                            >
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-2xl font-bold text-slate-800">
                                            {curso.nombre}
                                        </h2>
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                            ${curso.precio}
                                        </span>
                                    </div>
                                    <p className="text-slate-500 text-sm mb-6">
                                        Aprende a desarrollar aplicaciones escalables con {curso.nombre}.
                                    </p>
                                </div>
                                
                                <button 
                                    onClick={() => setCursoSeleccionado(curso)}
                                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-colors duration-200 ${
                                        isSelected 
                                            ? 'bg-blue-600 text-white shadow-md' 
                                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                                >
                                    {isSelected ? 'Seleccionado' : 'Comprar Curso'}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {cursoSeleccionado && (
                    <div className="mt-16 bg-white rounded-2xl shadow-lg border border-slate-200 p-8 max-w-2xl mx-auto animate-fade-in-up">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-slate-800">
                                Resumen de Compra
                            </h3>
                            <p className="text-slate-600 mt-2">
                                Estás a un paso de adquirir el curso de <span className="font-semibold">{cursoSeleccionado.nombre}</span>
                            </p>
                            <div className="text-4xl font-extrabold text-blue-600 mt-4 mb-6">
                                ${cursoSeleccionado.precio}
                            </div>
                        </div>
                        
                        <div className="flex justify-center">
                            <CheckoutMP total={cursoSeleccionado.precio} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CursosPage;
