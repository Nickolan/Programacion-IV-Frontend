import React, { useEffect, useState } from "react";
import { Participante } from "../models/Participante";



function SearchControl({
    participantes,
    deleteFunc,
}: {
    participantes: Participante[];
    deleteFunc: Function;
}) {
    const [participantesFiltrados, setParticipantesFiltrados] =
        useState(participantes);

    const [filter, setFilter] = useState({
        nombre: "",
        modalidad: "",
        nivel: "",
    });

    const colores = [
        {
            card: "bg-red-100 border-red-400",
            text: "text-red-500",
        },
        {
            card: "bg-green-100 border-green-400",
            text: "text-green-500",
        },
        {
            card: "bg-yellow-100 border-yellow-400",
            text: "text-yellow-500",
        },
        {
            card: "bg-blue-100 border-blue-400",
            text: "text-blue-500",
        },
        {
            card: "bg-purple-100 border-purple-400",
            text: "text-purple-500",
        },
        {
            card: "bg-orange-100 border-orange-400",
            text: "text-orange-500",
        },
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

    return (
        <div className="flex flex-col mb-5 w-full gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 shadow-md p-3">
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
                >
                    <option value="">Todos</option>
                    <option value="Principiante">Principiante</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {participantesFiltrados.map(
                    (participante: Participante) => {
                        const color =
                            colores[
                                participante.id % colores.length
                            ];

                        return (
                            <div
                                key={participante.id}
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
                                        deleteFunc(
                                            participante.id
                                        )
                                    }
                                    className="mt-2 bg-red-500 hover:bg-red-600 transition text-white py-1 px-3 rounded-lg self-start"
                                >
                                    Eliminar
                                </button>
                            </div>
                        );
                    }
                )}
            </div>
        </div>
    );
}

export default SearchControl;