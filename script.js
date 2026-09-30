const image = document.getElementById("item_image");
const nameBox = document.getElementById("item_name");
const typesSpan = document.getElementById("item_types");
const displayBox = document.getElementById("display_box");
const movesButton = document.getElementById("moves_button");
const infoButton = document.getElementById("info_button");

let currentId = 1;
let currentTab = "moves"
let currentPokemon = null;

async function loadPokemon(id) {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
        if(!response.ok) {
            throw new Error("Request failed: " + response.status);
        }
        currentPokemon = await response.json();
        showPokemon();
    } catch (error) {
        displayBox.textContent = "Could not load Pokemon. Check the Console.";
        console.error(error);
    }
}

function showPokemon() {
    if (currentPokemon === null) return;
    image.src = currentPokemon.sprites.front_default;
    nameBox.textContent = currentPokemon.name;

    typesSpan.innerHTML = "";
    currentPokemon.types.forEach(function (t) {
        const badge = document.createElement("span");
        badge.textContent = t.type.name;
        badge.classList.add("type_badge", "type_" + t.type.name);
        typesSpan.appendChild(badge);
    });

    if(currentTab === "moves") {
        const moveNames = currentPokemon.moves.map(function (m) {
            return m.move.name;
        });
    } else {
        displayBox.textContent = 
        "height: " + currentPokemon.height / 10 + " m\n" +
        "weight: " + currentPokemon.weight / 10 + " kg\n" +
        "hp: " + currentPokemon.hp + "\n" +
        "attack: " + currentPokemon.attack + "\n" +
        "defense: " + currentPokemon.defense + "\n" +
        "special-attack: " + currentPokemon.special-attack + "\n" +
        "special-defense: " + currentPokemon.special-defense + "\n" +
        "speed: " + currentPokemon.speed;
    }

    movesButton.classList.toggle("active", currentTab === "moves");
    infoButton.classList.toggle("active", currentTab === "info");
}

