import { useForm } from '@tanstack/react-form'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const LoginPage = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const form = useForm({
        defaultValues: { email: "", password: "" },
        onSubmit: async ({ value }) => {
            const ok = await auth?.login(value.email, value.password)
            if (ok) navigate('/')
        }
    })

    return (
        // Contenedor principal: Ocupa toda la pantalla, centra el contenido y tiene un fondo gris claro
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                
                <h1 className="text-3xl font-black text-[#1D3557] text-center mb-8">
                    Iniciar Sesión
                </h1>

                <form onSubmit={(e) => {
                    e.preventDefault()
                    form.handleSubmit()
                }}>
                    <div className="mb-6">
                        <form.Field name="email">
                            {(f) => (
                                <>
                                    <label htmlFor="login-email" className="text-sm font-bold text-[#1D3557] mb-3 block">
                                        Correo Electrónico
                                    </label>
                                    <input
                                        id="login-email"
                                        type="email"
                                        placeholder="ejemplo@correo.com"
                                        className="w-full h-14 bg-gray-50/50 border border-gray-200 rounded-xl text-[#1D3557] text-lg focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] outline-none px-5 transition-all"
                                        value={f.state.value}
                                        onChange={(e) => f.handleChange(e.target.value)}
                                    />
                                </>
                            )}
                        </form.Field>
                    </div>
                    
                    <div className="mb-6">
                        <form.Field name="password">
                            {(f) => (
                                <>
                                    <label htmlFor="login-password" className="text-sm font-bold text-[#1D3557] mb-3 block">
                                        Contraseña
                                    </label>
                                    <input
                                        id="login-password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full h-14 bg-gray-50/50 border border-gray-200 rounded-xl text-[#1D3557] text-lg focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] outline-none px-5 transition-all"
                                        value={f.state.value}
                                        onChange={(e) => f.handleChange(e.target.value)}
                                    />
                                </>
                            )}
                        </form.Field>
                        
                        <a href="#" className="text-sm font-medium text-[#1D3557]/60 hover:text-[#E63946] transition-colors block mt-3 text-right">
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>

                    {auth?.error && (
                        <div className="bg-red-50 text-[#E63946] text-sm font-semibold p-4 rounded-xl mb-6 text-center border border-red-100">
                            {auth.error}
                        </div>
                    )}
                    
                    <button 
                        type="submit"
                        className="w-full h-14 mt-2 bg-[#E63946] hover:bg-[#d62828] active:scale-[0.98] transition-all text-white font-bold text-lg rounded-xl shadow-lg shadow-[#E63946]/30"
                    >
                        Ingresar
                    </button>

                </form>
            </div>
        </div>
    )
}

export default LoginPage