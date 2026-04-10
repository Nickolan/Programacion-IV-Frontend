import type { Participante } from '../models/Participante'
import { useParticipante } from '../context/ParticipantesContext'

interface Props {
  participante: Participante,
  // onEliminar: (id: number) => void,
  color: {card: string, text:string}

}

const ParticipanteCard = ({
  participante,
  // onEliminar,
  color
}

  : Props) => {

    const {eliminar} = useParticipante()

  return (
    <div
      className={`items-start p-4 flex flex-col gap-2 ${color.card}`}
    >
      <span className="text-lg font-bold text-black">
        {participante.nombre}
      </span>

      <span className="text-sm text-black">
        {participante.pais}
      </span>

      <span className="text-sm text-black">
        Modalidad: {participante.modalidad}
      </span>

      <span className={`text-xs ${color.text}`}>
        Nivel: {participante.nivel}
      </span>

      <span className="text-sm text-black">
        {" "}
        {participante.tecnologias.join(
          " - "
        )}
      </span>

      {participante.nivel ===
        "Avanzado" && (
          <span
            className={`text-sm font-bold ${color.text}`}
          >
            Perfil Avanzado
          </span>
        )}

      <button
        onClick={() =>
          eliminar(
            participante.id
          )
        }
        className="mt-2 bg-red-500 hover:bg-red-600 transition text-white py-1 px-3 rounded-lg self-start"
      >
        Eliminar
      </button>
    </div>
  )
}

export default ParticipanteCard
