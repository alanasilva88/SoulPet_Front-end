import axios from "axios";


export async function getPets() {
    const response = await axios.get("http://localhost:3000/pets");
    return response.data; // Dentro do 'data' que é do axios, está o JSON de resposta do back-end
};


export async function addPets(data) {
    // O segundo parâmetro do post é o corpo da requisição
    if(data.dataNasc === "") data.dataNasc = null
    const response = await axios.post("http://localhost:3000/pets", data);
    return response.data;
}


export async function deletePets(id) {
    const response = await axios.delete(`http://localhost:3000/pets/${id}`);
    return response.data;
}



// Buscar cliente com id / detalhe para o método editar
export async function getPet(id) {
    const response = await axios.get(`http://localhost:3000/pets/${id}`);
    return response.data;
}

export async function updatePet(id, data) {
    const response = await axios.put(`http://localhost:3000/pets/${id}`, data);
    return response.data;
}