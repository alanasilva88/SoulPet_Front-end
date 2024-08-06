import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { getPets, deletePets } from "../api/pets";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";



function Pets() {
  const [pets, setPets] = useState(null);

  function carregarPets() { // Aqui chegará os dados do back e serão exibidos
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
        Adicionar Pet
      </Button>
      <hr />
      {pets ? <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Porte</th>
            <th>Data Nascimento</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => {
            return (
              <tr key={pet.id}>
                <td>{pet.nome}</td>
                <td>{pet.tipo}</td>
                <td>{pet.porte}</td>
                <td>{pet.dataNasc}</td>
                <td>
                    <Button className= "m-1" variant="danger" size="sm" onClick={() => deletarPet(pet.id)}>
                      Excluir
                    </Button>
                    <Button className= "m-1" size="sm" as={Link} to={`/pets/editar/${pet.id}`}>
                      Editar
                    </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>: <Loader/>}
    </main>
  );
}

export default Pets;
