import { Participante } from "../models/Participante";
import { createContext, useContext, useReducer, useEffect, useState, type ReactNode } from "react";
import axios from 'axios'
import { reducer } from "../reducers/ParticipantesReducer";

interface ContextType {
    participantes: Participante[];
    participanteEnEdicion: Participante | null;
    setParticipanteEnEdicion: (p: Participante | null) => void; 
    agregar: (p: Participante) => Promise<void>;
    actualizar: (p: Participante) => Promise<void>;
    eliminar: (id: number) => Promise<void>;
    resetear: () => Promise<void>;
}

const ParticipantesContext = createContext<ContextType | null>(null);

export const ParticipanteProvider = ({children}: {children: ReactNode}) => {

    // TypeScript infiere automáticamente los tipos de 'state' y 'dispatch'
    const [participantes, dispatch] = useReducer(reducer, []) // (Reducer, initialState)
    const [participanteEnEdicion, setParticipanteEnEdicion] = useState<Participante | null>(null);

    

  useEffect(() => {
    const fetchParticipantes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/participantes');
        console.log(response.data);
        
        dispatch({type: "GET_PARTICIPANTES", payload: response.data})
      } catch (error) {
        console.error('Error fetching participantes:', error);
      }
    };

    fetchParticipantes();
  }, []);

    
    const agregar = async (p:Participante) => {


        const response = await axios.post('http://localhost:8000/participantes', p)

        if (response.status == 201) {
            dispatch({type: "AGREGAR", payload: response.data})
        }
    }

    const eliminar = async (id : number) => {
        
        const response = await axios.delete(`http://localhost:8000/participantes/${id}`);
        
        if (response.status == 204) {
            dispatch({type: "ELIMINAR", payload: id})
        }
    }

    const resetear = async () => {
        const response = await axios.delete('http://localhost:8000/participantes');
        if (response.status == 204) {
            dispatch({type: "RESET", payload: []})
        }
    }

    const actualizar = async (p: Participante) => {
        const response = await axios.put(`http://localhost:8000/participantes/${p.id}`, p);
        if (response.status === 200) {
            dispatch({ type: "EDITAR", payload: response.data });
            setParticipanteEnEdicion(null);
        }
    }

    return <ParticipantesContext.Provider value={{agregar, participantes, eliminar, resetear, actualizar, participanteEnEdicion, setParticipanteEnEdicion}}>
        {children}
    </ParticipantesContext.Provider>


}

export const useParticipante = () => {
    const context = useContext(ParticipantesContext);
    if (!context) {
        throw new Error("useContext debe ser usado dentro de un provider");
    }

    return context;
}