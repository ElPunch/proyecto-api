/*fetchData();

async function fetchData(){
    try{

        const NombreHeroe = document.getElementById("NombreHeroe").value.toLowerCase();
        
        const response = await fetch (`https://superheroapi.com/api.php/5cbbe2217a57e86e8968274677c361c0/search/${NombreHeroe}`);

        if(!response.ok){
            throw new Error("No se pudo consumir el recurso");
        }

        const data = await response.json();
       
        const imagenHeroe = data.results[0].image.url;
        const imagen = document.getElementById("ImagenHeroe");

        imagen.src = imagenHeroe;
        imagen.style.display = "block";
        console.log(data);
    
    }
    catch(error){
        console.error(error);
    }
}
*/

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
    listaheroe.append(div);
}

botonesHeader.forEach(boton => 
    boton.addEventListener("click", (event) => {
        const editorialSeleccionada = event.currentTarget.id; // Ej: "Marvel Comics"

        for (let i = 1; i <= 731; i++) {
            fetch(URL + i)
                .then((response) => response.json())
                .then(data => {
                    // Validamos que el campo publisher exista
                    if (data.biography && data.biography.publisher === editorialSeleccionada) {
                        // Aquí puedes mostrar los héroes en pantalla o hacer console.log
                        console.log(data.name); // Muestra el nombre del héroe
                        // Llama a tu función para mostrar el héroe en el HTML
                        // mostrarHeroe(data);
                    }
                })
                .catch(error => console.error("Error al cargar héroe: ", error));
        }
    })
);