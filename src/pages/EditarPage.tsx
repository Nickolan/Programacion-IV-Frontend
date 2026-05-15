import { useEffect } from 'react'
import FormParticipante from '../components/FormParticipante'
import { useNavigate } from 'react-router-dom'
import { useParticipante } from '../context/ParticipantesContext'
import { useParams } from 'react-router-dom'
import MenuResponsive from '../components/MenuResponsive'

const EditarPage = () => {
  const navigate = useNavigate()
  const { setParticipanteEnEdicion, participantes } = useParticipante()
  const { id } = useParams()

  useEffect(() => {
    const participante = participantes.find(p => p.id ===
      Number(id));
    if (participante) {
      setParticipanteEnEdicion(participante);
    }
  }, [id]);
  return (
    <div className="flex flex-col items-center gap-5">
      <MenuResponsive />
      <FormParticipante
        onSuccess={() => navigate("/lista")}

      />
    </div>
  )
}

export default EditarPage
