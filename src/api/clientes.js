// Este arquivo possue funções para realizar as operações do CRUD de clientes
import axios from "axios";


// Funções crud abaixo:
export async function getClientes() {
    const response = await axios.get("http://localhost:3000/clientes");
    return response.data; // Dentro do 'data' que é do axios, está o JSON de resposta do back-end
};


export async function addCliente(data) {
    // O segundo parâmetro do post é o corpo da requisição
    const response = await axios.post("http://localhost:3000/clientes", data);
    return response.data;
}


export async function deleteCliente(id) {
    const response = await axios.delete(`http://localhost:3000/clientes/${id}`);
    return response.data;
}

// Buscar cliente com id / detalhe para o método editar
export async function getCliente(id) {
    const response = await axios.get(`http://localhost:3000/clientes/${id}`);
    return response.data;
}

export async function updateCliente(id, data) {
    const response = await axios.put(`http://localhost:3000/clientes/${id}`, data);
    return response.data;
}