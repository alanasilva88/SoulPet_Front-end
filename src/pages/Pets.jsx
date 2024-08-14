import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { getPets, deletePets } from "../api/pets";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';



function Pets() {
  const [pets, setPets] = useState(null); // null representa que hainda não há pets adicionados

  function carregarPets() { // Aqui chegará os "dados" ou a "resposta" do back e serão exibidos
    getPets().then((dados) => {
      setPets(dados);
    });
  }

  function deletarPet(id) {
    const deletar = confirm("Tem certeza que deseja excluir?");
    if (deletar) {
      deletePets(id)
      .then((resposta) => {
        toast.success(resposta.message);
        carregarPets();
      })
    }
  }

  useEffect(() => { // Aqui faz com que chame apenas uma vez
    carregarPets();
  }, []);

  return (
    <main className="mt-4 container">
      <h1>Pets</h1>
      <Button as={Link} to="/pets/novo">
        <FaPlus />
      </Button>
      <hr />
      {pets ? <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Porte</th>
            <th>Data Nascimento</th>
            <th>Tutor(a)</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => {
            return (
              <tr key={pet.id}>
                <td>{pet.nome}</td>
                <td>{pet.tipo}</td>
                <td>{pet.porte}</td>
                <td>{pet.dataNasc ? new Date(pet.dataNasc+"T00:00:00").toLocaleDateString() : "-"}</td> 
                <td>{pet.cliente.nome}</td>
                 {/* por conta do fuso-horário é necessário incluir as horas em T00:00:00 para assim ficar a data correta */}
                <td>
                    <Button className= "m-1" variant="outline-danger" size="sm" onClick={() => deletarPet(pet.id)}> 
                      <FaTrash />                
                    </Button>
                    <Button className= "m-1" variant="outline-primary" size="sm" as={Link} to={`/pets/editar/${pet.id}`}>
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

export default Pets;
