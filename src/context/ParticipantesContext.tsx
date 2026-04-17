import { Participante } from "../models/Participante";
import { createContext, useContext, useReducer, useEffect, useState, type ReactNode } from "react";
import axios from 'axios'
import { reducer } from "../reducers/ParticipantesReducer";

interface ContextType {
    participantes: Participante[];
    participanteEnEdicion: Participante | null; // Nuevo
    setParticipanteEnEdicion: (p: Participante | null) => void; // Nuevo
    agregar: (p: Participante) => Promise<void>;
    actualizar: (p: Participante) => Promise<void>; // Acción SET/Actualizar
    eliminar: (id: number) => Promise<void>;
    resetear: () => Promise<void>;
}

const ParticipantesContext = createContext<ContextType | null>(null);

export const ParticipanteProvider = ({children}: {children: ReactNode}) => {

    const [participantes, dispatch] = useReducer(reducer, [])
    const [participanteEnEdicion, setParticipanteEnEdicion] = useState<Participante | null>(null);

    

  // Obtener todos los participantes del servidor al cargar el componente
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

        // Llamar a servidor /participantes con POST y enviar el nuevo participante usando axios

        const response = await axios.post('http://localhost:8000/participantes', p)

        if (response.status == 201) {
            dispatch({type: "AGREGAR", payload: response.data})
        }
    }

    const eliminar = async (id : number) => {
        
        // Llamar a servidor /participantes/{id} con DELETE usando axios
        const response = await axios.delete(`http://localhost:8000/participantes/${id}`);
        
        if (response.status == 204) {
            dispatch({type: "ELIMINAR", payload: id})
        }
    }

    const resetear = async () => {
        // Eliminar todos los participantes del servidor usando axios
        const response = await axios.delete('http://localhost:8000/participantes');
        if (response.status == 204) {
            dispatch({type: "RESET", payload: []})
        }
    }

    const actualizar = async (p: Participante) => {
        const response = await axios.put(`http://localhost:8000/participantes/${p.id}`, p);
        if (response.status === 200) {
            dispatch({ type: "EDITAR", payload: response.data });
            setParticipanteEnEdicion(null); // Limpiamos la edición tras éxito
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