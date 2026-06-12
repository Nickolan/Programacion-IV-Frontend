import { useSearchParams, Link } from 'react-router-dom';

const SuccessPage = () => {
    const [searchParams] = useSearchParams();
    const paymentId = searchParams.get('payment_id') || searchParams.get('collection_id');
    const curso = searchParams.get("external_reference") || ''

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center animate-fade-in-up">
                
                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                    <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
                    ¡Pago Exitoso!
                </h2>
                <p className="text-slate-600 mb-6">
                    Tu compra se ha procesado correctamente. Ya tienes acceso a al curso de {curso}.
                </p>

                {paymentId && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-8 text-left">
                        <p className="text-sm text-slate-500 font-medium">Comprobante de transacción</p>
                        <p className="text-lg font-mono font-bold text-slate-800 mt-1">
                            #{paymentId}
                        </p>
                    </div>
                )}

                <Link 
                    to="/" 
                    className="inline-flex w-full justify-center items-center py-3.5 px-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                >
                    Ir a mis cursos
                </Link>
            </div>
        </div>
    );
};

export default SuccessPage;