const url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
const header = {"Content-type": "application/json"};

fetch( url, {
    method: "GET",
    headers: header
})

.then(response => {
    if (!response.ok) {
        throw new Error("Erro na requisição" + response.status);
    }
    return response.json();
})
.then(data => {
    console.log(data);
    const pokemon = document.getElementById("pokemon");
    pokemon.innerHTML = "";

    data.results.forEach(pokemon => {
        const pokeList = document.createElement("p");
        pokeList.textContent = pokemon.name;
        pokemon.appendChild(pokeList);
    });
})
.catch(error => {
    console.error("Erro:", error);
});