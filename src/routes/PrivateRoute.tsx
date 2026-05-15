import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({children, rol}: any) {
    const {usuario} = useAuth();
    
    if (!usuario) {
        return <Navigate to="/login" />;
    }

    if (rol && usuario.rol !== rol) {
        return <Navigate to="/login" />;
    }

    return children;
}