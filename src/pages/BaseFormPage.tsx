import { useForm } from '@tanstack/react-form'
import { useNavigate } from 'react-router-dom'
import { useState, useId, useEffect, useRef } from 'react'

const BaseFormPage = () => {
    const navigate = useNavigate()
    const [globalError, setGlobalError] = useState<string | null>(null)

    const nombreId = useId();
    const descripcionId = useId();

    const inputRef = useRef<HTMLInputElement>(null);

    // 2. Configura el formulario
    const form = useForm({
        defaultValues: { 
            nombre: "", 
            descripcion: "" 
        },
        onSubmit: async ({ value }) => {
            setGlobalError(null)
            try {
                // Aquí va tu lógica: ej. await addItem(value)
                console.log("Datos a guardar:", value)
                
                // Simulamos un guardado exitoso
                await new Promise(resolve => setTimeout(resolve, 500))
                
                // Redirigir al terminar (ej. volver a la lista)
                navigate('/lista')
            } catch (error) {
                setGlobalError("Ocurrió un error al guardar los datos.")
                console.error("Error al enviar el formulario:", error)
            }
        }
    })

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                
                <h1 className="text-3xl font-black text-[#1D3557] text-center mb-8">
                    Nuevo Registro
                </h1>

                <form onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}>
                    
                    {/* CAMPO DE EJEMPLO: INPUT DE TEXTO */}
                    <div className="mb-6">
                        <form.Field 
                            name="nombre"
                            validators={{
                                onChange: ({ value }) => !value ? 'El nombre es obligatorio' : undefined,
                            }}
                        >
                            {(f) => (
                                <>
                                    <label htmlFor={nombreId} className="text-sm font-bold text-[#1D3557] mb-3 block">
                                        Nombre del Ítem
                                    </label>
                                    <input
                                        id={nombreId}
                                        type="text"
                                        placeholder="Ej. Producto A"
                                        className={`w-full h-14 bg-gray-50/50 border rounded-xl text-[#1D3557] text-lg focus:ring-1 outline-none px-5 transition-all
                                            ${f.state.meta.errors.length ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#E63946] focus:ring-[#E63946]'}`}
                                        value={f.state.value}
                                        onChange={(e) => f.handleChange(e.target.value)}
                                        onBlur={f.handleBlur}
                                        ref={inputRef}
                                    />
                                    {/* Mostrar errores de validación del campo */}
                                    {f.state.meta.errors ? (
                                        <p className="text-red-500 text-xs font-semibold mt-2">
                                            {f.state.meta.errors.join(', ')}
                                        </p>
                                    ) : null}
                                </>
                            )}
                        </form.Field>
                    </div>
                    
                    {/* CAMPO DE EJEMPLO: TEXTAREA */}
                    <div className="mb-6">
                        <form.Field name="descripcion">
                            {(f) => (
                                <>
                                    <label htmlFor={descripcionId} className="text-sm font-bold text-[#1D3557] mb-3 block">
                                        Descripción
                                    </label>
                                    <textarea
                                        id={descripcionId}
                                        placeholder="Detalles adicionales..."
                                        rows={4}
                                        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl text-[#1D3557] text-base focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] outline-none p-5 transition-all resize-none"
                                        value={f.state.value}
                                        onChange={(e) => f.handleChange(e.target.value)}
                                        onBlur={f.handleBlur}
                                    />
                                </>
                            )}
                        </form.Field>
                    </div>

                    {/* Mensaje de error global */}
                    {globalError && (
                        <div className="bg-red-50 text-[#E63946] text-sm font-semibold p-4 rounded-xl mb-6 text-center border border-red-100">
                            {globalError}
                        </div>
                    )}
                    
                    <button 
                        type="submit"
                        disabled={form.state.isSubmitting}
                        className="w-full h-14 mt-2 bg-[#E63946] hover:bg-[#d62828] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white font-bold text-lg rounded-xl shadow-lg shadow-[#E63946]/30 flex justify-center items-center"
                    >
                        {form.state.isSubmitting ? 'Guardando...' : 'Guardar'}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default BaseFormPage