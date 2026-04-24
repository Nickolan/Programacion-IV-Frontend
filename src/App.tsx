import "./App.css";
import {Routes, Route} from 'react-router-dom'

import Home from "./pages/Home";
import ListaPage from "./pages/ListaPage";
import FormularioPage from "./pages/FormularioPage";
import EditarPage from "./pages/EditarPage";

function App() {

  return (

    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/lista" element={<ListaPage/>} /> 
      <Route path="/nuevo" element={<FormularioPage/>} /> 
      <Route path="/editar/:id" element={<EditarPage/>} /> 
    </Routes>


  );
}

export default App;