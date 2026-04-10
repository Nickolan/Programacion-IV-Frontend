import { Participante } from "../models/Participante";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface ContextType {
    participantes: Participante[];
    agregar: (p: Participante) => void;
    eliminar: (id: number) => void;
    resetear: () => void;
}

const ParticipantesContext = createContext<ContextType | null>(null);

export const ParticipanteProvider = ({children}: {children: ReactNode}) => {
    const [participantes, setParticipantes] = useState<Participante[]>(() => {
    const guardados = localStorage.getItem("participantes") || `[]`;
    const planos = JSON.parse(guardados);
    return planos.map((p: any) => new Participante(p));
  });

    useEffect(() => {
        localStorage.setItem("participantes", JSON.stringify(participantes));
    }, [participantes]);

    
    const agregar = (p:Participante) => {
        setParticipantes([...participantes, p])
    }

    const eliminar = (id : number) => {
        const nuevaLista = participantes.filter((e: Participante) => e.id !== id);
            
        setParticipantes(nuevaLista);
    }

    const resetear = () => {
        setParticipantes([])
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