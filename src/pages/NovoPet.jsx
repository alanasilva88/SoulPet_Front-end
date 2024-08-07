import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getClientes } from "../api/clientes";
import { useEffect, useState } from "react";
import { addPets } from "../api/pets";
import toast from "react-hot-toast";



function NovoPet() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [clientes, setClientes] = useState([]);

  function salvarPet(data) {
    if(data.dataNasc === "") data.dataNasc = null;

   addPets(data).then((resposta) => {
    toast.success(resposta.message);
    navigate("/pets");
   }).catch((err) => {
    toast.error(err.response.data.message);;
   })
  }

  function carregarClientes() {
    getClientes().then((dados) => {
      setClientes(dados);
    })
  }

  useEffect(() => {
    carregarClientes();
  }, []);

  return (
    <main className="mt-4 container">
      <h1>Novo pet</h1>
      <hr />
      <form onSubmit={handleSubmit(salvarPet)}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            className="form-control"
            {...register("nome", { required: true, maxLength: 90 })}
          />
          {errors.nome && (
            <small className="text-danger">O nome é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="tipo">Tipo</label>
          <input
            type="text"
            id="tipo"
            className="form-control"
            {...register("tipo", { required: true, maxLength: 100 })}
          />
          {errors.tipo && (
            <small className="text-danger">O tipo é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="porte">Porte</label>
          <input
            type="text"
            id="porte"
            className="form-control"
            {...register("porte", { required: true, maxLength: 100 })}
          />
          {errors.porte && (
            <small className="text-danger">O porte é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="dataNasc">Data Nascimento</label>
          <input
            type="date"
            id="dataNasc"
            className="form-control"
            {...register("dataNasc")}
          />
          {errors.dataNasc && (
            <small className="text-danger">A data é inválida!</small>
          )}
        </div>
        <div>
          <label htmlFor="clienteId">Cliente</label>
          <select
            className="form-select"
            {...register("clienteId", { required: true, valueAsNumber: true })}
          >
            <option value="" >Selecione um cliente</option>
            {clientes.map((cliente) => {
              return(
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome} - {cliente.telefone}
                </option>
              );
            })}
          </select>
          {errors.clienteId && (
            <small className="text-danger">Selecione um cliente!</small>
          )}
        </div>
        <Button className="mt-3" type="submit">
          Cadastrar
        </Button>
      </form>
    </main>
  );
}

export default NovoPet;