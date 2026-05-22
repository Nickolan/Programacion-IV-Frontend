import "./App.css";
import {Routes, Route} from 'react-router-dom'

import Home from "./pages/Home";
import ListaPage from "./pages/ListaPage";
import FormularioPage from "./pages/FormularioPage";
import EditarPage from "./pages/EditarPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./routes/PrivateRoute";
import PublicaPage from "./pages/PublicaPage";
import { useEffect } from "react";

import { useAuth } from "./context/AuthContext";

function App() {
  const {getUsuarioFromToken} = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("ejecutando");
    
    if (token) {
      getUsuarioFromToken(token);
      
    } else {
      console.log("No token found in localStorage.");
    }
  }, [])

  return (
    
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/publica" element={<PublicaPage/>} />
      <Route path="/lista" element={<PrivateRoute rolesHabilitados={["CONSULTA", "ADMIN"]}><ListaPage/></PrivateRoute>} />
      <Route path="/nuevo" element={<PrivateRoute rolesHabilitados={["ADMIN"]}><FormularioPage/></PrivateRoute>} />
      <Route path="/editar/:id" element={<PrivateRoute rolesHabilitados={["ADMIN"]}><EditarPage/></PrivateRoute>} />
    </Routes>


  );
}

export default App;