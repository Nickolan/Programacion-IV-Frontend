import React, { useEffect, useId, useRef, useState } from 'react'
import { Participante } from '../models/Participante'
import { useParticipante } from '../context/ParticipantesContext'
import { useNotification } from '../hooks/useNotification'
import { useLocalStorage } from '../hooks/useLocalStorage'


const initialState = {
  id: 0,
  nombre: "",
  email: "",
  edad: 0,
  pais: "Argentina",
  modalidad: "Presencial",
  tecnologias: [] as string[],
  nivel: "Principiante",
  aceptaTerminos: false
};


function FormParticipante({ onSuccess }: any) {

  // Usamos useLocalStorage en lugar de useState para guardar como borrador por si el usuario recarga
  const [formData, setFormData] = useLocalStorage('participante_draft', initialState);
  const { agregar, actualizar, participanteEnEdicion, setParticipanteEnEdicion, participantes } = useParticipante();
  const { showNotification } = useNotification();

  const inputRef = useRef<HTMLInputElement>(null);
  const nombreId = useId();
  const emailId = useId();
  const edadId = useId();
  const paisId = useId();
  const modalidadId = useId();
  const tecnologiasId = useId();
  const nivelId = useId();
  const terminosId = useId();

  // EFECTO: Si el context dice que hay alguien para editar, llenamos el formulario
  useEffect(() => {
    if (participanteEnEdicion) {
      setFormData({ ...participanteEnEdicion });
    } else {
      setFormData(initialState);
    }
  }, [participanteEnEdicion]);

  // Función específica para manejar el array de tecnologías
  const handleTecnologiasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      tecnologias: checked 
        ? [...prev.tecnologias, value] 
        : prev.tecnologias.filter(t => t !== value)
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const participanteFinal = new Participante(formData);

    try {
      if (participanteEnEdicion) {
        // Si estamos editando, usamos la acción de actualizar
        await actualizar(participanteFinal);
        showNotification(`¡Participante ${participanteFinal.nombre} editado con éxito!`, 'success');
      } else {
        // Si es nuevo, generamos un ID (o dejamos que el server lo haga) y agregamos
        const nuevoConId = { ...participanteFinal, id: Date.now() }; 
        await agregar(nuevoConId);
        showNotification(`¡Participante ${participanteFinal.nombre} registrado con éxito!`, 'success');
      }
      
      setFormData(initialState);
      onSuccess();
    } catch (error) {
      showNotification('Ocurrió un error al intentar guardar.', 'error');
      console.error(error);
    }
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, []);


  return (
    <form onSubmit={submit} className='w-full shadow-md py-4 px-2 gap-5'>
      <nav className={`flex p-2 ${participanteEnEdicion ? 'bg-orange-500' : 'bg-green-500'}`}>
        <span className='text-white'>
            {participanteEnEdicion ? `Editando a: ${participanteEnEdicion.nombre}` : 'Registro de Participantes'}
        </span>
      </nav>

      <div className='flex mb-5'><span>Participantes registrados: {participantes.length}</span></div>
      
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <input className="border p-2 rounded" ref={inputRef} id={nombreId} name='nombre' value={formData.nombre} onChange={handleChange} placeholder="Nombre" type="text" required />
        <input className="border p-2 rounded" id={emailId} name='email' value={formData.email} onChange={handleChange} placeholder="Email" type="email" required />
        <input className="border p-2 rounded" id={edadId} name='edad' value={formData.edad} onChange={handleChange} placeholder="Edad" type="number" />
        
        <select className="border p-2 rounded" id={paisId} name="pais" value={formData.pais} onChange={handleChange}>
            <option value="Argentina">Argentina</option>
            <option value="Chile">Chile</option>
            <option value="Uruguay">Uruguay</option>
            <option value="Mexico">Mexico</option>
            <option value="España">España</option>
        </select>
      </div>

      {/* Modalidad (Radio) */}
      <div className="flex flex-col items-start mb-2">
        <h2 className='text-base'>Modalidad</h2>
        <div className='flex gap-3'>
          {["Presencial", "Hibrido", "Virtual"].map(mod => (
            <div key={mod}>
              <input type="radio" id={modalidadId} name="modalidad" value={mod} checked={formData.modalidad === mod} onChange={handleChange} />
              <label htmlFor={modalidadId}>{mod}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Tecnologias (Checkbox) */}
      <div className='flex flex-col items-start mb-2'>
        <h2 className='text-base'>Tecnologias</h2>
        <div className='grid grid-cols-3 w-full'>
          {["React", "Angular", "Vue", "Node", "Python", "Java"].map(tech => (
            <label key={tech}>
              <input type="checkbox" id={tecnologiasId} value={tech} checked={formData.tecnologias.includes(tech)} onChange={handleTecnologiasChange} /> {tech}
            </label>
          ))}
        </div>
      </div>

      <div className='border my-4'>
        <select className='w-full p-1' onChange={handleChange} required value={formData.nivel} name="nivel" id={nivelId}>
          <option value="Principiante">Principiante</option>
          <option value="Intermedio">Intermedio</option>
          <option value="Avanzado">Avanzado</option>
        </select>
      </div>

      <div className='flex flex-col items-start gap-2'>
        <label>
            <input type="checkbox" id={terminosId} name="aceptaTerminos" checked={formData.aceptaTerminos} onChange={(e) => setFormData({...formData, aceptaTerminos: e.target.checked})} required /> 
            Acepto Terminos
        </label>
        
        <div className='flex gap-2'>
            <button className={`${participanteEnEdicion ? 'bg-orange-500' : 'bg-blue-500'} py-1 px-4 text-white`} type="submit">
                {participanteEnEdicion ? 'Actualizar' : 'Registrar'}
            </button>
            
            {participanteEnEdicion && (
                <button type="button" onClick={() => setParticipanteEnEdicion(null)} className="bg-gray-400 py-1 px-4 text-white">
                    Cancelar
                </button>
            )}
        </div>
      </div>
    </form>
  )
}

export default FormParticipante
