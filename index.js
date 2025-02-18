const url = "https://pokeapi.co/api/v2/pokemon/";
const header = {"constenttype": "aplication/json"};

fetch( url, {
    method: "GET",
    headers: header
})

.then(response => {
    if (!response>ok) {
        throw new Error("Erro na requisição" + response.status);
    }
    return response.json();
})
.then(data => {
    console.log("Dados recebidos:", data);
})
.catch(error => {
    console.error("Erro:", error);
});