import React from 'react'
import FormParticipante from '../components/FormParticipante'
import { useParticipante } from '../context/ParticipantesContext'

const FormularioPage = () => {
    const {participantes} = useParticipante()
  return (
    <div className="flex flex-col items-center gap-5">
        <FormParticipante
          participantes={participantes}
        />
      </div>
  )
}

export default FormularioPage
