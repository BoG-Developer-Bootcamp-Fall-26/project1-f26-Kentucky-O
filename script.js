const image = document.getElementById("item_image");
const nameBox = document.getElementById("item_name");
const typesSpan = document.getElementById("item_types");
const displayBox = document.getElementById("display_box");
const movesButton = document.getElementById("moves_button");
const infoButton = document.getElementById("info_button");
const panelTitle = document.getElementById("panel_title");

let currentId = 1;
let currentTab = "info"
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
        const lines = ["height: " + (currentPokemon.height / 10).toFixed(1) + " m", 
            "weight: " + (currentPokemon.weight / 10).toFixed(1) + " kg"];
        currentPokemon.stats.forEach(function (s) {
            lines.push(s.stat.name + ": " + s.base_stat);
        });
        displayBox.textContent = lines.join("\n");
    }

    movesButton.classList.toggle("active", currentTab === "moves");
    infoButton.classList.toggle("active", currentTab === "info");
}

document.getElementById("next").addEventListener("click", function () {
    currentId = currentId + 1;
    if(currentId > MAX_ID) {
        currentId = 1;
    }
    loadPokemon(currentId);
});

document.getElementById("previous").addEventListener("click", function () {
    currentId = currentId - 1;
    if(currentId < 1) {
        currentId = MAX_ID;
    }
    loadPokemon(currentId);
});

movesButton.addEventListener("click", function () {
    currentTab = "moves";
    showPokemon();
});

infoButton.addEventListener("click", function () {
    currentTab = "info";
    showPokemon();
});

loadPokemon(currentId);