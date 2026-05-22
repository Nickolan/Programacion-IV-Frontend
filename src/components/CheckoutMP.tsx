import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';
import { useState } from 'react'

const CheckoutMP = ({total}: {total: number}) => {

    const [preferenceId, setPreferenceId] = useState("");

    // Obtener preferencia de pago desde el backend

    async function getPreference() {
        try {
            const response = await axios.post('http://localhost:8080/create_preference', {
                total
            }
            );
            setPreferenceId(response.data.preferenceId);
        } catch (error) {
            console.log("Error encontrado", error);
            
        }
    }

    initMercadoPago("TEST-1b9c8e5c-7a0d-4f1b-9a3e-8c2e5f6a7b8c", {
        locale: 'es-AR'
    });
  return (
    <div>
        <div style={{ width: '300px' }}>
            {
                preferenceId.length === 0 ? (
                    <button onClick={() => getPreference()}>Iniciar Pago</button>
                ) : <Wallet initialization={{ preferenceId }} />
            }
            
        </div>
      
    </div>
  )
}

export default CheckoutMP
