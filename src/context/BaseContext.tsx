import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
// 1. Importas tu JSON local directamente
import datosMock from "../data/productos.json"; 

// 2. Defines la interfaz de tu entidad
export interface ItemData {
    id: number;
    nombre: string;
    descripcion?: string;
    // Agrega aquí las propiedades correspondientes a tu JSON
}

// 3. Defines qué datos y funciones estarán disponibles en el contexto
interface BaseContextType {
    items: ItemData[];
    loading: boolean;
    error: string | null;
    fetchItems: () => Promise<void>;
    getItemById: (id: number) => ItemData | undefined;
    addItem: (newItem: Omit<ItemData, 'id'>) => Promise<boolean>;
}

// 4. Creas el Contexto
const BaseContext = createContext<BaseContextType | null>(null);

// 5. Creas el Provider
export const BaseProvider = ({ children }: { children: ReactNode }) => {
    // Estados básicos recomendados para cualquier contexto de datos
    const [items, setItems] = useState<ItemData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Función para "obtener" los datos simulando una petición HTTP
    const fetchItems = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            // Simulamos un delay de red de 500ms para probar tus estados de carga en la UI
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Asignamos el JSON local al estado
            // Aseguramos el tipado usando 'as ItemData[]' en caso de que el JSON no esté tipado
            setItems(datosMock as ItemData[]);
        } catch (err) {
            setError("Error al cargar los datos locales.");
            console.error("Error fetching local data:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Funciones de utilidad sincrónicas (ya que los datos están en memoria)
    const getItemById = (id: number) => {
        return items.find(item => item.id === id);
    };

    // Función para "crear" un nuevo dato localmente (solo en memoria)
    const addItem = async (newItem: Omit<ItemData, 'id'>) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // Simulamos la creación de un ID autoincremental
            const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
            const itemCreado = { ...newItem, id: newId } as ItemData;
            
            setItems(prevItems => [...prevItems, itemCreado]);
            return true;
        } catch (err) {
            setError("Error al guardar el nuevo ítem.");
            return false;
        }
    };

    return (
        <BaseContext.Provider value={{ 
            items, 
            loading, 
            error, 
            fetchItems, 
            getItemById, 
            addItem 
        }}>
            {children}
        </BaseContext.Provider>
    );
};

// 6. Hook personalizado para consumir el contexto fácilmente
export const useBase = () => {
    const context = useContext(BaseContext);
    if (!context) {
        throw new Error("useBase must be used within a BaseProvider");
    }
    return context;
};