//Funcion para listar y mostrar todos los heroes 
const listaHeroes = document.querySelector("#listaHeroes");
const botonesHeader = document.querySelector(".btn-header")
let URL = "https://superheroapi.com/api.php/5cbbe2217a57e86e8968274677c361c0/";

for (let i = 1; i <= 731; i++){
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => MostrarHeroe(data))
}

function MostrarHeroe(data){

    const publisherClass = data.biography.publisher?.toLowerCase().replace(/[\s\.]/g, '');    

    let publisher = data.biography.publisher || "Desconocido";

    const div = document.createElement("div");
    div.classList.add("heroico")
    div.innerHTML = `
        <div class="Imagen_Heroe">
            <img src="${data.image.url}" alt="${data.name}">
        </div>
        <div class="heroe_info">
            <div class="Nombre_Contenedor">
                <p class="Heroeid">#${data.id}</p>
                <h2 class="Nombre_heroe">${data.name}</h2>
            </div>
            <div class="alianza_publicista">
                <p class="${data.biography.alignment}">${data.biography.alignment}</p>
                <p class="${publisherClass}">${data.biography.publisher}</p>
            </div>
            <div class="PowerStats">
                <p class="stats">inteligencia ${data.powerstats.intelligence}</p>
                <p class="stats">fuerza ${data.powerstats.strength}</p>
                <p class="stats">velocidad ${data.powerstats.speed}</p>
                <p class="stats">durabilidad ${data.powerstats.durability}</p>
                <p class="stats">poder ${data.powerstats.power}</p>
                <p class="stats">combate ${data.powerstats.combat}</p>
            </div>
        </div>
    `;
    listaHeroes.append(div);
}

//funcion del buscador
const btnBuscar = document.getElementById("btnBuscar");
const inputHeroe = document.getElementById("NombreHeroe");

btnBuscar.addEventListener("click", buscarHeroe);

inputHeroe.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        buscarHeroe();
    }
});

function limpiarResultado() {
    listaHeroes.innerHTML = "";
}

async function buscarHeroe() {
    const nombre = inputHeroe.value.trim().toLowerCase();
    if (!nombre) return;

    const url = `https://superheroapi.com/api.php/5cbbe2217a57e86e8968274677c361c0/search/${nombre}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        limpiarResultado();

        if (data.response === "success" && data.results.length > 0) {
            data.results.forEach(hero => MostrarHeroe(hero));
        } else {
            listaHeroes.innerHTML = "<p>No se encontró el héroe.</p>";
        }
    } catch (err) {
        console.error("Error al buscar el héroe:", err);
        listaHeroes.innerHTML = "<p>Error al buscar el héroe.</p>";
    }
}


function limpiarResultado() {
    listaHeroes.innerHTML = "";
}

function cargarHeroesFiltrados(filtroCallback) {
    limpiarResultado();
    for (let i = 1; i <= 731; i++) {
        fetch(`https://superheroapi.com/api.php/5cbbe2217a57e86e8968274677c361c0/${i}`)
            .then(res => res.json())
            .then(data => {
                if (filtroCallback(data)) {
                    MostrarHeroe(data);
                }
            })
            .catch(err => console.error("Error al cargar héroe:", err));
    }
}

// Ver todos
document.getElementById("ver-todos").addEventListener("click", () => {
    cargarHeroesFiltrados(() => true); // muestra todos
});

// Marvel
document.getElementById("Marvel Comics").addEventListener("click", () => {
    cargarHeroesFiltrados(data => data.biography.publisher === "Marvel Comics");
});

// DC
document.getElementById("dc").addEventListener("click", () => {
    cargarHeroesFiltrados(data => data.biography.publisher === "DC Comics");
});

// Image Comics
document.getElementById("image").addEventListener("click", () => {
    cargarHeroesFiltrados(data => data.biography.publisher === "Image Comics");
});

// Dark Horse Comics
document.getElementById("darkhorse").addEventListener("click", () => {
    cargarHeroesFiltrados(data => data.biography.publisher === "Dark Horse Comics");
});

// Héroes (alignment: good)
document.getElementById("good").addEventListener("click", () => {
    cargarHeroesFiltrados(data => data.biography.alignment === "good");
});

// Villanos (alignment: bad)
document.getElementById("bad").addEventListener("click", () => {
    cargarHeroesFiltrados(data => data.biography.alignment === "bad");
});

// Antihéroes (alignment: neutral)
document.getElementById("antihero").addEventListener("click", () => {
    cargarHeroesFiltrados(data => data.biography.alignment === "neutral");
});