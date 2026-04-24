import React from 'react'
import { useParticipante } from '../context/ParticipantesContext'
import FormParticipante from '../components/FormParticipante'

const EditarPage = () => {
    const {participantes} = useParticipante()
  return (
    <div className="flex flex-col items-center gap-5">
        <FormParticipante
          participantes={participantes}
        />
      </div>
  )
}

export default EditarPage
