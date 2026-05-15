import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function PrivateRoute({children, rolesHabilitados}: any) {

    const {getUsuarioFromToken} = useAuth();
    
      useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          getUsuarioFromToken(token).then((usuario) => {
            if (!usuario) {
              localStorage.removeItem('token');
              return <Navigate to="/login" />;
            }

            if (rolesHabilitados && !rolesHabilitados.includes(usuario.rol)) {
              localStorage.removeItem('token');
              return <Navigate to="/login" />;
            }
          })
          
        } else {
          console.log("No token found in localStorage.");
        }
      }, [])
    

    return children;
}