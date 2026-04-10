import { useEffect, useState } from "react";
import "./App.css";
import FormParticipante from "./components/FormParticipante";
import SearchControl from "./components/SearchControl";
import { Participante } from "./models/Participante";
import ParticipanteCard from "./components/ParticipanteCard";

function App() {
  const [participantes, setParticipantes] = useState<Participante[]>(() => {
    const guardados = localStorage.getItem("participantes") || `[]`;
    const planos = JSON.parse(guardados);
    return planos.map((p: any) => new Participante(p));
  });

  const [participantesFiltrados, setParticipantesFiltrados] = useState(participantes);

  const [filter, setFilter] = useState({
    nombre: "",
    modalidad: "",
    nivel: "", 
  }); 


  const colores = [
    { card: "bg-red-100 border-red-400", text: "text-red-500" },
    { card: "bg-green-100 border-green-400", text: "text-green-500" },
    { card: "bg-yellow-100 border-yellow-400", text: "text-yellow-500" },
    { card: "bg-blue-100 border-blue-400", text: "text-blue-500" },
    { card: "bg-purple-100 border-purple-400", text: "text-purple-500" },
    { card: "bg-orange-100 border-orange-400", text: "text-orange-500" },
  ];

  function changeFilter(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    let filtrados = participantes;

    if (filter.nombre.length > 0) {
      filtrados = filtrados.filter((e: Participante) =>
        e.nombre.toLowerCase().includes(filter.nombre.toLowerCase())
      );
    }

    if (filter.modalidad.length > 0) {
      filtrados = filtrados.filter(
        (e: Participante) => e.modalidad === filter.modalidad
      );
    }

    if (filter.nivel.length > 0) {
      filtrados = filtrados.filter(
        (e: Participante) => e.nivel === filter.nivel
      );
    }

    setParticipantesFiltrados(filtrados);
  }, [filter, participantes]);

  function deleteParticipante(id: number) {
    const nuevaLista = participantes.filter((e: Participante) => e.id !== id);
    
    setParticipantes(nuevaLista);
  }

  function resetearDatos() {
    localStorage.removeItem("participantes");
    setParticipantes([]) 
  }

  function limpiarFiltros() {
    setFilter({
    nombre: "",
    modalidad: "",
    nivel: "", 
  })
  }

  useEffect(() => {
    localStorage.setItem("participantes", JSON.stringify(participantes));
  }, [participantes]);


  return (
    <div className="flex flex-col items-center gap-5">
      <FormParticipante
        setParticipantes={setParticipantes}
        participantes={participantes}
      />

      <SearchControl filter={filter} changeFilter={changeFilter} limpiarFiltros={limpiarFiltros} />

        <div className="flex flex-col mb-5 w-full gap-5">
          {
            participantesFiltrados.length > 0 ? (
                <span>Mostrando {participantesFiltrados.length} de {participantes.length} Participantes</span>

) : (
  <span>No hay participantes</span>
)
}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {participantesFiltrados.map((participante: Participante, i: number) => {
                    const color = colores[participante.id % colores.length];
                    
                    return (
                      <ParticipanteCard
                      key={i}
                      participante={participante}
                      onEliminar={deleteParticipante}
                      color={color}
                      />
                    );
                  })}
              </div>
              {
                participantes.length > 0 && <button className="bg-blue-400 text-white p-2" onClick={resetearDatos}>Resetear Datos</button>
              }
              
            </div>

        </div>
  );
}

export default App;