const url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
const header = {"Content-type": "application/json"};
const pokeSelect = document.getElementById("pokeSelect");
const poke = document.getElementById("pokemon");
const myBag = document.getElementById("myBag");
// const selection = document.querySelector("button");
let pokemons = [];
let myPokemon = [];
let storagePokemons = [];

// Fetch para pegar as informações dos pokemons
fetch( url, {
    method: "GET",
    headers: header
})
// Recebe a resposta e retorna o .json ou passa o status do erro
.then(response => {
    if (!response.ok) {
        throw new Error("Erro na requisição" + response.status);
    }
    return response.json();
})
// Com o .json cria um select no DOM com os names
.then(data => {
    pokemons = data.results;
    pokemons.forEach(pokemon => {
        const create = document.createElement("option");
        create.value = pokemon.url;
        create.textContent = pokemon.name;
        pokeSelect.appendChild(create);
    })
})
// trata o erro
.catch(error => {
    console.error("Erro:", error);
});

// Evento para inserir as informações na tela
pokeSelect.addEventListener("input", function() {
    const pokeUrl = pokeSelect.value;
    
    if(pokeUrl) {
        fetch(pokeUrl, {
            method: "GET",
            headers: header
        })
        .then(response => {
            if(!response.ok) {
                throw new Error("Erro para encontrar os detalhes do seu Pokemon " + response.status);
            }
            return response.json();
        })
        .then(pokemonData => {
            const types = pokemonData.types.map(typeInfo => typeInfo.type.name).join(", ");
            const habilities = pokemonData.abilities.map(habilityInfo => habilityInfo.ability.name).join(", ");
            poke.innerHTML = `
            <div>    
                <h2 class"object2">${pokemonData.name}</h2>
                <p class"object2"><strong>Tipos:</strong> ${types}</p>
                <p class"object2"><strong>Habilidades:</strong> ${habilities}</p>
                <img class"object2" src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
            </div>
            `;

            if (myPokemon.length > 6) {
                myBag.insertAdjacentHTML('beforeend', "Sua Bolsa está cheia")//Conferencia se foi selecionado a quantidade de pokemons
                storagePokemons.push([pokemonData.name, pokemonData.sprites.front_default, types, habilities])
            } else {
                myPokemon.push([pokemonData.name, pokemonData.sprites.front_default, types, habilities]); //Selecionando o pokemon
                console.log(myPokemon);
                myBag.insertAdjacentHTML('beforeend', `
                <div>    
                    <h2 class"object2">${pokemonData.name}</h2>
                    <p class"object2"><strong>Tipos:</strong> ${types}</p>
                    <p class"object2"><strong>Habilidades:</strong> ${habilities}</p>
                    <img class"object2" src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                </div>`);
            }
        })
        .catch(error => {
            console.error("Erro:", error);
        });
    } else {
        poke.innerHTML = "";
    }
});