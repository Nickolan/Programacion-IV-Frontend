import React, { useState } from 'react'
import { Participante } from '../models/Participante'

interface Props {
  participantes: Participante[],
  setParticipantes: (participantes: Participante[] | []) => void,
}


function FormParticipante({ participantes, setParticipantes }: Props) {
  const [maxId, setMaxId] = useState<number>(3);

  // Estados separados para cada propiedad del participante
  const [nombre, setNombre] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [edad, setEdad] = useState<number>(0);
  const [pais, setPais] = useState<string>("Argentina");
  const [modalidad, setModalidad] = useState<string>("Presencial");
  const [tecnologias, setTecnologias] = useState<string[]>([]);
  const [nivel, setNivel] = useState<string>("Principiante");
  const [aceptaTerminos, setAceptaTerminos] = useState<boolean>(false);

  // Función específica para manejar el array de tecnologías
  const handleTecnologiasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTecnologias(prev => 
      prev.includes(value) 
        ? prev.filter(t => t !== value) 
        : [...prev, value]
    );
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    
    // Armamos el objeto con los datos actuales de todos los estados
    const datosParticipante = {
      id: maxId,
      nombre,
      email,
      edad,
      pais,
      modalidad,
      tecnologias,
      nivel,
      aceptaTerminos
    };

    // Instanciamos el objeto Participante
    const nuevoParticipante = new Participante(datosParticipante);
    
    //setParticipantes([...participantes, nuevoParticipante]);\

    var nuevaListaParticipantes: Participante[] = [...participantes, nuevoParticipante]
    setParticipantes(nuevaListaParticipantes)
    //localStorage.setItem("participantes", JSON.stringify(nuevaListaParticipantes))
    setMaxId(maxId + 1);

    // Reseteamos los estados a sus valores iniciales
    setNombre("");
    setEmail("");
    setEdad(0);
    setPais("Argentina");
    setModalidad("Presencial");
    setTecnologias([]);
    setNivel("Principiante");
    setAceptaTerminos(false);
  }

  return (
    <form onSubmit={submit} className='w-full shadow-md py-4 px-2 gap-5'>
      <nav className='flex bg-green-500 p-2'>
        <span className='text-white'>Registro de Participantes</span>
      </nav>

      <div className='flex mb-5'><span>Participantes registrados: {participantes.length}</span></div>
      
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <input className="border p-2 rounded" onChange={(e) => setNombre(e.target.value)} required name='nombre' placeholder="Nombre" type="text" value={nombre} />
        <input className="border p-2 rounded" onChange={(e) => setEmail(e.target.value)} required name='email' placeholder="Email" type="email" value={email} />
        <input className="border p-2 rounded" onChange={(e) => setEdad(Number(e.target.value))} name='edad' placeholder="Edad" type="number" value={edad} />
        <select className="border p-2 rounded" onChange={(e) => setPais(e.target.value)} required name="pais" value={pais} id="">
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
            <input onChange={(e) => setModalidad(e.target.value)} value="Presencial" checked={modalidad === "Presencial"} type="radio" name="modalidad" id="" /><label htmlFor="">Presencial</label>
          </div>
          <div>
            <input onChange={(e) => setModalidad(e.target.value)} value="Hibrido" checked={modalidad === "Hibrido"} type="radio" name="modalidad" id="" /><label htmlFor="">Hibrido</label>
          </div>
          <div>
            <input onChange={(e) => setModalidad(e.target.value)} value="Virtual" checked={modalidad === "Virtual"} type="radio" name="modalidad" id="" /><label htmlFor="">Virtual</label>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-start mb-2'>
        <h2 className='text-base' >Tecnologias</h2>
        <div className='grid grid-cols-3 w-full items-start'>
          {/* Agregué la propiedad 'checked' a los checkboxes para que sean completamente controlados por React */}
          <div className='flex items-start flex-row'><label htmlFor=""><input onChange={handleTecnologiasChange} checked={tecnologias.includes("React")} value="React" type="checkbox" name="tecnologias" id="" /> React</label></div>
          <div className='flex items-start flex-row'><label htmlFor=""><input onChange={handleTecnologiasChange} checked={tecnologias.includes("Angular")} value="Angular" type="checkbox" name="tecnologias" id="" /> Angular</label></div>
          <div className='flex items-start flex-row'><label htmlFor=""><input onChange={handleTecnologiasChange} checked={tecnologias.includes("Vue")} value="Vue" type="checkbox" name="tecnologias" id="" /> Vue</label></div>
          <div className='flex items-start flex-row'><label htmlFor=""><input onChange={handleTecnologiasChange} checked={tecnologias.includes("Node")} value="Node" type="checkbox" name="tecnologias" id="" /> Node</label></div>
          <div className='flex items-start flex-row'><label htmlFor=""><input onChange={handleTecnologiasChange} checked={tecnologias.includes("Python")} value="Python" type="checkbox" name="tecnologias" id="" /> Python</label></div>
          <div className='flex items-start flex-row'><label htmlFor=""><input onChange={handleTecnologiasChange} checked={tecnologias.includes("Java")} value="Java" type="checkbox" name="tecnologias" id="" /> Java</label></div>
        </div>
      </div>
      
      <div className='border my-4'>
        <select className='w-full p-1' onChange={(e) => setNivel(e.target.value)} required value={nivel} name="nivel" id="">
          <option value="Principiante">Principiante</option>
          <option value="Intermedio">Intermedio</option>
          <option value="Avanzado">Avanzado</option>
        </select>
      </div>

      <div className='flex flex-col items-start gap-2'>
        <label htmlFor=""><input onChange={(e) => setAceptaTerminos(e.target.checked)} checked={aceptaTerminos} type="checkbox" name="aceptaTerminos" required id="" /> Acepto Terminos</label>
        <input className="bg-blue-500 py-1 px-2 text-white" type="submit" value="Registrar" />
      </div>

    </form>
  )
}

export default FormParticipante
