import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteCliente, getClientes } from "../api/clientes";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { FaTrash, FaEdit } from 'react-icons/fa';


function Clientes() {
  const [clientes, setClientes] = useState(null);


  function carregarClientes() { // Aqui chegará os dados do back e serão exibidos
    getClientes().then((dados) => {
      setClientes(dados);
    });
  }

  function deletarCliente(id) {
    const deletar = confirm("Tem certeza que deseja excluir?");
    if (deletar) {
      deleteCliente(id)
      .then((resposta) => {
        toast.success(resposta.message);
        carregarClientes();
      })
    }
  }


  useEffect(() => { // Aqui faz com que chame apenas uma vez
    carregarClientes();
  }, []);


  return (
    <main className="mt-4 container">
      <h1>Clientes</h1>
      <Button as={Link} to="/clientes/novo">
        Adicionar Cliente
      </Button>
      <hr />
      {clientes ? <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => {
            return (
              <tr key={clientes.id}>
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>
                <td>
                    <Button className= "m-1" variant="outline-danger" size="sm" onClick={() => deletarCliente(cliente.id)}>
                      <FaTrash />
                    </Button>
                    <Button className= "m-1" variant="outline-primary" size="sm" as={Link} to={`/clientes/editar/${cliente.id}`}>
                      <FaEdit />
                    </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table> : <Loader/>}
    </main>
  );
}

export default Clientes;
