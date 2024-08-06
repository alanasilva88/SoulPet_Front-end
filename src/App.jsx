import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Clientes from "./pages/Clientes";
import NovoCliente from "./pages/NovoCliente";
import EditarCliente from "./pages/EditarCliente";
import Pets from "./pages/Pets";
import NovoPet from "./pages/NovoPet";
import EditarPet from "./pages/EditarPet";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/novo" element={<NovoCliente />} />
          <Route path="/clientes/editar/:id" element={<EditarCliente />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/pets/novo" element={<NovoPet />} />
          <Route path="/pets/editar/:id" element={<EditarPet />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
