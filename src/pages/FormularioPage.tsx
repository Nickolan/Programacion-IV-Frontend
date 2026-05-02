import FormParticipante from '../components/FormParticipante'
import { useNavigate } from 'react-router-dom'

const FormularioPage = () => {
    const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center gap-5">
        <FormParticipante
          onSuccess={() => navigate("/lista")}
        />
      </div>
  )
}

export default FormularioPage
