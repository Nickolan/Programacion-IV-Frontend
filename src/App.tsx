//import { useState } from 'react'
import { useEffect, useState } from "react";
import "./App.css";
import FormParticipante from "./components/FormParticipante";
import SearchControl from "./components/SearchControl";
import type { Participante } from "./models/Participante";

function App() {
  
  const [participantes, setParticipantes] = useState<Participante[]>([
    {
      id: 1,
      nombre: "Juan Perez",
      email: "juan@mail.com", 
      edad: 25,
      pais: "Argentina",
      modalidad: "Virtual",
      tecnologias: ["React", "Node"],
      nivel: "Intermedio",
      aceptaTerminos: true,
    },
    {
      id: 2,
      nombre: "Nicolas",
      aceptaTerminos: true,
      edad: 22,
      email: "nicolassantiagonavarrete.nsn@gmail.com",
      modalidad: "Presencial",
      nivel: "Avanzado",
      pais: "Argentina",
      tecnologias: ["React", "Python", "Node", "Java"],
    },
  ]);

  function deleteParticipante(id: number) {
    
    setParticipantes(
      participantes.filter((e: Participante) => e.id !== id)
    )
  }



  useEffect(() => {
    console.log(participantes);
  }, [participantes]);

  return (
    <div className="flex flex-col items-center gap-5">
      <FormParticipante
        setParticipantes={setParticipantes}
        participantes={participantes}
      />

      <SearchControl deleteFunc={deleteParticipante} participantes={participantes} />
    </div>
  );
}

export default App;
