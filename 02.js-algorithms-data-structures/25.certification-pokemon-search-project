// Exercise permalink: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/build-a-pokemon-search-app-project/build-a-pokemon-search-app

script.js

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonTypes = document.getElementById("types");
const pokemonHp = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSpAttack = document.getElementById("special-attack");
const pokemonSpDefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");
const imgSprite = document.getElementById("sprite")

let globalResults = [];
let joinPokemonTypes = "";

const fetchAllData = async () => {			
  try {															
    const res = await fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon");
    const data = await res.json();
    const { results } = data;
    return globalResults = results;
    // console.log("Global Results: ",globalResults);
  } catch (err) {
    console.log(err);
  }
};

const fetchSpecificData = async (idInput) => {		
  try {															
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${idInput}/`);
    const specificData = await res.json();
    // console.log("Within async function - specificData: ",specificData);
    return specificData;
  } catch (err) {
    console.log(err);
  }
};

function loadPokemon(){
  clearScreen();
  //console.log("Global Results: ",globalResults);
  const searchValue = searchInput.value;
  //console.log(searchValue);
  const foundItem = globalResults.find(pokemon => pokemon.id === Number(searchValue) || pokemon.name === searchValue.toLowerCase());
  //console.log("Found Item: ",foundItem);
  if (!foundItem) {
    alert("Pokémon not found");
    return;
  } else {
    //console.log("Found Item ID: ",foundItem.id);
    populateScreen(foundItem.id);
    return;
    }
  };

async function populateScreen(id){
  const specificData = await fetchSpecificData(id);
  //console.log("Within return function - specific data: ",specificData);
  const { height, name, stats, types, sprites, weight } = specificData;
  //console.log("ID: ",id);
  pokemonName.textContent = name.toUpperCase();
  pokemonId.textContent = `#${id}`;
  pokemonWeight.textContent = `Weight: ${weight}`;
  pokemonHeight.textContent = `Height: ${height}`;
  //console.log(stats)
  pokemonHp.textContent = `HP: ${stats[0].base_stat}`;
  pokemonAttack.textContent = `Attack: ${stats[1].base_stat}`;
  pokemonDefense.textContent = `Defense: ${stats[2].base_stat}`;
  pokemonSpAttack.textContent = `Special Attack: ${stats[3].base_stat}`;
  pokemonSpDefense.textContent = `Special Defense: ${stats[4].base_stat}`;
  pokemonSpeed.textContent = `Speed: ${stats[5].base_stat}`;
  imgSprite.src = sprites.front_default;
  types.forEach(type => {
    const typeElement = document.createElement('p');
    typeElement.textContent = type.type.name.toUpperCase();
    pokemonTypes.appendChild(typeElement);
  });
}

function clearScreen(){
  pokemonName.textContent = "";
  pokemonId.textContent = "";
  pokemonWeight.textContent = "";
  pokemonHeight.textContent = "";
  pokemonHp.textContent = "";
  pokemonAttack.textContent = "";
  pokemonDefense.textContent = "";
  pokemonSpAttack.textContent = "";
  pokemonSpDefense.textContent = "";
  pokemonSpeed.textContent = "";
  imgSprite.src = "";
  pokemonTypes.textContent = "";
  joinPokemonTypes = "";
  return;
}

fetchAllData();

searchButton.addEventListener("click",loadPokemon);





index.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cash Register</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <main>
      <form action="/submit" method="post">
  <label for="search-input">Search for Pokémon Name or ID:</label>
  <input type="text" name="search-input" id="search-input" placeholder="Pokemon ID" required>
  <button type="button" id="search-button">Find Pokemon</button>
</form>
      <p id="pokemon-name"><p>
      <p id="pokemon-id"><p>
      <p id="weight"><p>
      <p id="height"><p>
      <p id="hp"><p>
      <p id="attack"><p>
      <p id="defense"><p>
      <p id="special-attack"><p>
      <p id="special-defense"><p>
      <p id="speed"><p>
      <p id="types"><p>
    </main>
      <img id="sprite">     
    <script src="./script.js"></script>
  </body>
</html>

