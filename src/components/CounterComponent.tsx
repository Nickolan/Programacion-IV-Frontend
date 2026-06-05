import { useReducer } from 'react';

// 1. Definir el tipo para el estado
interface CounterState {
  count: number;
}

// 2. Definir los tipos de las acciones usando uniones discriminadas
type CounterAction =

  | { type: 'INCREMENT'; payload: number }
  | { type: 'DECREMENT'; payload: number }
  | { type: 'RESET' }; // El reset no necesita payload

// 3. Estado inicial
const initialState: CounterState = { count: 0 };

// 4. Función Reducer tipada externamente
function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + action.payload };
    case 'DECREMENT':
      return { count: state.count - action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

// 5. Componente React
export default function CounterComponent() {
  // TypeScript infiere automáticamente los tipos de 'state' y 'dispatch'
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Contador: {state.count}</h2>
      
      {/* Despachar acciones con payload */}
      <button onClick={() => dispatch({ type: 'INCREMENT', payload: 1 })}>
        Sumar 1
      </button>
      
      <button onClick={() => dispatch({ type: 'DECREMENT', payload: 5 })}>
        Restar 5
      </button>

      {/* Despachar acción sin payload */}
      <button onClick={() => dispatch({ type: 'RESET' })}>
        Resetear
      </button>
    </div>
  );
}
