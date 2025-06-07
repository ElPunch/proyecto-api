fetchData();

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