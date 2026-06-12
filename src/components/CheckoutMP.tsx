import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';
import { useState } from 'react';

initMercadoPago("APP_USR-5982f75d-4edd-4de7-b08e-c9cfada000f7", {
    locale: 'es-AR'
});

interface CheckoutMPProps {
    total: number;
    curso: string
}

const CheckoutMP = ({ total, curso }: CheckoutMPProps) => {
    const [preferenceId, setPreferenceId] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function getPreference() {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await axios.post(`http://localhost:8000/create_preference`, { total, curso });
            console.log(response.data.id);
            
            setPreferenceId(response.data.id);
        } catch (error) {
            console.error("Error al obtener la preferencia:", error);
            setError("Hubo un error al conectar con el procesador de pagos. Por favor, intenta de nuevo.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full max-w-sm">
                {preferenceId.length === 0 ? (
                    <div className="flex flex-col gap-3">
                        <button 
                            onClick={getPreference}
                            disabled={isLoading}
                            className={`w-full flex items-center justify-center py-3.5 px-4 rounded-xl font-bold text-white transition-all duration-200 
                                ${isLoading 
                                    ? 'bg-blue-400 cursor-not-allowed' 
                                    : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                                }`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generando pago...
                                </>
                            ) : (
                                'Pagar de forma segura'
                            )}
                        </button>

                        {error && (
                            <div className="p-3 mt-2 bg-red-50 border border-red-200 rounded-lg text-center animate-fade-in">
                                <p className="text-red-600 text-sm font-medium">
                                    {error}
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="animate-fade-in w-full">
                        <Wallet 
                            initialization={{ preferenceId }} 
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default CheckoutMP;