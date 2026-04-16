import { Participante } from "../models/Participante";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import axios from 'axios'

interface ContextType {
    participantes: Participante[];
    agregar: (p: Participante) => void;
    eliminar: (id: number) => void;
    resetear: () => void;
}

const ParticipantesContext = createContext<ContextType | null>(null);

export const ParticipanteProvider = ({children}: {children: ReactNode}) => {

    const [participantes, setParticipantes] = useState<Participante[]>([]);

  // Obtener todos los participantes del servidor al cargar el componente
  useEffect(() => {
    const fetchParticipantes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/participantes');
        console.log(response.data);
        
        setParticipantes(response.data);
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
            setParticipantes([...participantes, response.data]);
        }
    }

    const eliminar = async (id : number) => {
        
        // Llamar a servidor /participantes/{id} con DELETE usando axios
        const response = await axios.delete(`http://localhost:8000/participantes/${id}`);
        
        if (response.status == 204) {
            setParticipantes(participantes.filter((e: Participante) => e.id !== id));
        }
    }

    const resetear = async () => {
        // Eliminar todos los participantes del servidor usando axios
        const response = await axios.delete('http://localhost:8000/participantes');
        if (response.status == 204) {
            setParticipantes([]);
        }
    }

    return <ParticipantesContext.Provider value={{agregar, participantes, eliminar, resetear}}>
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