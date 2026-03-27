import React, {useState} from 'react'
import { Participante } from '../models/Participante'

function FormParticipante({participantes, setParticipantes}:any) {

  const [maxId, setMaxId] = useState<number>(3);

  const [newParticipante, setNewParticipante] = useState<Participante>({
    id: maxId,
    nombre: "",
    email: "",
    edad: 0,
    pais: "Argentina",
    modalidad: "Presencial",
    tecnologias: [],
    nivel: "Principiante",
    aceptaTerminos: false
  })


  function handleChange(
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) {
  const { name, value, type } = e.target

  if (!name) return

  // tecnologias (array)
  if (name === "tecnologias") {
    setNewParticipante(prev => {
      const existe = prev.tecnologias.includes(value)

      return {
        ...prev,
        tecnologias: existe
          ? prev.tecnologias.filter(t => t !== value)
          : [...prev.tecnologias, value]
      }
    })
    return
  }

  // checkbox normal
  if (type === "checkbox") {
    const checked = (e.target as HTMLInputElement).checked
    setNewParticipante(prev => ({
      ...prev,
      [name]: checked
    }))
    return
  }

  // default
  setNewParticipante(prev => ({
    ...prev,
    [name]: name === "edad" ? Number(value) : value
  }))
}

  async function submit(e: any) {
    e.preventDefault();
    console.log(newParticipante);
    setParticipantes([...participantes, newParticipante])
    const newMaxId = maxId + 1;
    setMaxId(newMaxId)
    setNewParticipante({
      id: newMaxId,
      nombre: "",
      email: "",
      edad: 0,
      pais: "Argentina",
      modalidad: "Presencial",
      tecnologias: [],
      nivel: "Principiante",
      aceptaTerminos: false
  })
  }


  return (
    <form onSubmit={submit} className='w-full shadow-md py-4 px-2 gap-5'>
      <nav className='flex bg-green-500 p-2'>
        <span className='text-white'>Registro de Participantes</span>
      </nav>

      <div className='flex mb-5'><span>Participantes registrados: {participantes.length}</span></div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <input className="border p-2 rounded" onChange={handleChange} required name='nombre' placeholder="Nombre" type="text" value={newParticipante.nombre} />
        <input className="border p-2 rounded" onChange={handleChange} required name='email' placeholder="Email" type="email" value={newParticipante.email} />
        <input className="border p-2 rounded" onChange={handleChange} name='edad' placeholder="Edad" type="number" value={newParticipante.edad} />
        <select className="border p-2 rounded" onChange={(e) => handleChange(e)} required name="pais" value={newParticipante.pais} id="">
            <option value="Argentina">Argentina</option>
            <option value="Chile">Chile</option>
            <option value="Uruguay">Uruguay</option>
            <option value="Mexico">Mexico</option>
            <option value="España">España</option>
        </select>
      </div>

      <div className="flex flex-col items-start mb-2">

        <h2 className='text-base'>Modalidad</h2>

        <div className='flex gap-3'>
          <div>
            <input onChange={handleChange} value="Presencial" checked={newParticipante.modalidad == "Presencial"} type="radio" name="modalidad" id="" /><label htmlFor="">Presencial</label>
          </div>

          <div>
            <input onChange={handleChange} value="Hibrido" checked={newParticipante.modalidad == "Hibrido"} type="radio" name="modalidad" id="" /><label htmlFor="">Hibrido</label>
          </div>

          <div>
            <input onChange={handleChange} value="Virtual" checked={newParticipante.modalidad == "Virtual"} type="radio" name="modalidad" id="" /><label htmlFor="">Virtual</label>
          </div>
        </div>

      </div>

      <div className='flex flex-col items-start mb-2'>
        <h2 className='text-base' >Tecnologias</h2>
        <div className='grid grid-cols-3 w-full items-start'>

          <div className='flex items-start flex-row'><label htmlFor=""><input onChange={handleChange} value="React" type="checkbox" name="tecnologias" id="" /> React</label></div>
          <div className='flex items-start flex-row'><label htmlFor=""><input onChange={handleChange} value="Angular" type="checkbox" name="tecnologias" id="" /> Angular</label></div>
          <div className='flex items-start flex-row'><label htmlFor=""><input onChange={handleChange} value="Vue" type="checkbox" name="tecnologias" id="" /> Vue</label></div>
          <div className='flex items-start flex-row'><label htmlFor=""><input onChange={handleChange} value="Node" type="checkbox" name="tecnologias" id="" /> Node</label></div>
          <div className='flex items-start flex-row'><label htmlFor=""><input onChange={handleChange} value="Python" type="checkbox" name="tecnologias" id="" /> Python</label></div>
          <div className='flex items-start flex-row'><label htmlFor=""><input onChange={handleChange} value="Java" type="checkbox" name="tecnologias" id="" /> Java</label></div>
        </div>
      </div>
      

      <div className='border my-4'>
        <select className='w-full p-1' onChange={(e) => handleChange(e)} required value={newParticipante.nivel} name="nivel" id="">
          <option value="Principiante">Principiante</option>
          <option value="Intermedio">Intermedio</option>
          <option value="Avanzado">Avanzado</option>
        </select>
      </div>

      <div className='flex flex-col items-start gap-2'>
        <label htmlFor=""><input onChange={handleChange} checked={newParticipante.aceptaTerminos} type="checkbox" name="aceptaTerminos" required id="" /> Acepto Terminos</label>
        <input className="bg-blue-500 py-1 px-2 text-white" type="submit" value="Registrar" />
      </div>

    </form>
  )
}

export default FormParticipante
