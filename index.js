const url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
const header = {"Content-type": "application/json"};
const pokeSelect = document.getElementById("pokeSelect");
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
    pokemons.forEach(pokemon => {
        const create = document.createElement("option");
        create.value = pokemon.url;
        create.textContent = pokemon.name;
        pokeSelect.appendChild(create);
    })
})
.catch(error => {
    console.error("Erro:", error);
});


pokeSelect.addEventListener("input", function() {
    const pokeUrl = pokeSelect.value;
    
    if(pokeUrl) {
        fetch(pokeUrl, {
            method: "GET",
            headers: header
        })
        .then(response => {
            if(!response.ok) {
                throw new Error("Erro para encontrar os detalhes do Pokemon " + response.status);
            }
            return response.json();
        })
        .then(pokemonData => {
            const types = pokemonData.types.map(typeInfo => typeInfo.type.name).join(", ");
            const habilities = pokemonData.abilities.map(habilityInfo => habilityInfo.ability.name).join(", ");
            poke.innerHTML = `
                <h2>${pokemonData.name}</h2>
                <p><strong>Tipos:</strong> ${types}</p>
                <p><strong>Habilidades:</strong> ${habilities}</p>
                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
            `;
        })
        .catch(error => {
            console.error("Erro:", error);
        });
    } else {
        poke.innerHTML = "";
    }
});