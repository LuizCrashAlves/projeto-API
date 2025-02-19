const url = "https://pokeapi.co/api/v2/pokemon";
const header = {"Content-type": "application/json"};
const pokeSearch = document.getElementById("search");
const poke = document.getElementById("pokemon");
let pokemons = [];

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
    pokemons = data.results;
})
.catch(error => {
    console.error("Erro:", error);
});

function finding(result) {
    const results = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(result.toLowerCase()));
    console.log(result)

    poke.innerHTML = "";

    if (results.length > 0) {
        results.forEach(pokemon => {
            const create = document.createElement("div");
            create.textContent = pokemon.name;
            poke.appendChild(create);
        });
    } else {
        poke.textContent = "Nenhum Pokemon encontrado!!!";
    }
}

pokeSearch.addEventListener("input", function() {
    const result = pokeSearch.value;
    finding(result);
});