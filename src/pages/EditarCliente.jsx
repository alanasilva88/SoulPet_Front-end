import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { getCliente, updateCliente } from "../api/clientes";

function EditarCliente() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const { id } = useParams();

  function atualizarCliente(data) {
   updateCliente(id, data).then((resposta) => {
    toast.success(resposta.message);
    navigate("/clientes");
   }).catch((err) => {
    toast.error(err.response.data.message);
   });
  }

  function carregarCliente() {
    getCliente(id).then((dados) => {
      reset(dados);
    }).catch((err)=> {
      navigate("/clientes");
    });
  }

  useEffect(() => {
    carregarCliente();
  }, []);

  return (
    <main className="mt-4 container">
      <h1>Editar cliente</h1>
      <hr />
      <form onSubmit={handleSubmit(atualizarCliente)}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            className="form-control"
            {...register("nome", { required: true, maxLength: 200 })}
          />
          {errors.nome && (
            <small className="text-danger">O nome é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            {...register("email", { required: true, maxLength: 200 })}
          />
          {errors.email && (
            <small className="text-danger">O email é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="telefone">Telefone</label>
          <input
            type="tel"
            id="telefone"
            className="form-control"
            {...register("telefone", { required: true, maxLength: 200 })}
          />
          {errors.telefone && (
            <small className="text-danger">O telefone é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="cidade">Cidade</label>
          <input
            type="text"
            id="cidade"
            className="form-control"
            {...register("endereco.cidade", { required: true, maxLength: 200 })}
          />
          {errors.endereco?.cidade && (
            <small className="text-danger">A cidade é inválida!</small>
          )}
        </div>
        <div>
          <label htmlFor="uf">UF</label>
          <input
            type="text"
            id="uf"
            className="form-control"
            {...register("endereco.uf", { required: true, maxLength: 2 })}
          />
          {errors.endereco?.uf && (
            <small className="text-danger">A UF é inválida!</small>
          )}
        </div>
        <div>
          <label htmlFor="cep">CEP</label>
          <input
            type="text"
            id="cep"
            className="form-control"
            {...register("endereco.cep", { required: true, maxLength: 8 })}
          />
          {errors.endereco?.cep && (
            <small className="text-danger">O CEP é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="rua">Rua</label>
          <input
            type="text"
            id="rua"
            className="form-control"
            {...register("endereco.rua", { required: true })}
          />
          {errors.endereco?.rua && (
            <small className="text-danger">A rua é inválida!</small>
          )}
        </div>
        <div>
          <label htmlFor="numero">Número</label>
          <input
            type="text"
            id="numero"
            className="form-control"
            {...register("endereco.numero", { required: true })}
          />
          {errors.endereco?.numero && (
            <small className="text-danger">O número é inválido!</small>
          )}
        </div>
        <Button className="mt-3" type="submit" >
          Atualizar
        </Button>
      </form>
    </main>
  );
}

export default EditarCliente;