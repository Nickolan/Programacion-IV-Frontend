import React from "react";

interface Promp {
    changeFilter: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    filter: {nombre: string, modalidad:string, nivel:string},
    limpiarFiltros: () => void
}

function SearchControl({
    changeFilter,
    filter,
    limpiarFiltros

}: Promp) {
    

    return (
        <div className="flex flex-col mb-5 w-full gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 shadow-md p-3">
                <input
                    className="border rounded px-3 py-1 outline-none focus:ring-2 focus:ring-blue-300 w-full"
                    placeholder="Buscar"
                    onChange={changeFilter}
                    value={filter.nombre}
                    type="text"
                    name="nombre"
                />

                <select
                    className="border rounded px-3 py-1 w-full"
                    onChange={changeFilter}
                    name="modalidad"
                    value={filter.modalidad}
                >
                    <option value="">Todas</option>
                    <option value="Presencial">Presencial</option>
                    <option value="Hibrido">Hibrido</option>
                    <option value="Virtual">Virtual</option>
                </select>

                <select
                    className="border rounded px-3 py-1 w-full"
                    onChange={changeFilter}
                    name="nivel"
                    value={filter.nivel}
                >
                    <option value="">Todos</option>
                    <option value="Principiante">Principiante</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                </select>

                {
                    (filter.modalidad !== "" || filter.nivel !== "" || filter.nombre !== "") && <button className="bg-blue-400 text-white p-2" onClick={limpiarFiltros}>Limpiar Filtros</button>
                }
                
            </div>           
        </div>
    );
}

export default SearchControl;