import { Link } from 'react-router-dom';

const FailurePage = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center animate-fade-in-up">
                
                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-6">
                    <svg className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
                    El pago no pudo procesarse
                </h2>
                <p className="text-slate-600 mb-8">
                    Hubo un problema al intentar procesar tu pago. Puede deberse a fondos insuficientes o un rechazo del banco. <span className="font-semibold text-slate-800">No se te ha cobrado nada.</span>
                </p>

                <div className="flex flex-col gap-3">
                    <Link 
                        to="/" 
                        className="inline-flex w-full justify-center items-center py-3.5 px-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md"
                    >
                        Intentar nuevamente
                    </Link>
                    
                    <button 
                        onClick={() => alert("Acá puedes abrir un modal o redirigir a contacto de soporte")}
                        className="inline-flex w-full justify-center items-center py-3.5 px-4 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                        Contactar soporte
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FailurePage;