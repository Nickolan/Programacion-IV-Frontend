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
import CursosPage from "./pages/CursosPage";
import FailurePage from "./pages/FailurePage";
import SuccessPage from "./pages/SuccessPage";

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

  /**
    const numbers = [1, 2, 3, 4];
    const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log(sum); // Output: 10 
   

    array.sort((a, b) => a.posicion.localeCompare(b.posicion));
   */

  return (
    
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/publica" element={<PublicaPage/>} />
      <Route path="/lista" element={<PrivateRoute rolesHabilitados={["CONSULTA", "ADMIN"]}><ListaPage/></PrivateRoute>} />
      <Route path="/nuevo" element={<PrivateRoute rolesHabilitados={["ADMIN"]}><FormularioPage/></PrivateRoute>} />
      <Route path="/editar/:id" element={<PrivateRoute rolesHabilitados={["ADMIN"]}><EditarPage/></PrivateRoute>} />
      <Route path="/cursos" element={<PrivateRoute rolesHabilitados={["CONSULTA", "ADMIN"]}><CursosPage/></PrivateRoute>} />
      <Route path="/success" element={<SuccessPage/>} />
      <Route path="/failure" element={<FailurePage/>} />
    </Routes>


  );
}

export default App;