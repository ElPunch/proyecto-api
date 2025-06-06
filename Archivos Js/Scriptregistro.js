document.getElementById("registroform").addEventListener("submit", function(event){
    event.preventDefault();
    var nombre = document.getElementById("nombre").value;
    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById("contrasena").value;
    var confirmacion = document.getElementById("confirmacion").value;

    if(contrasena !== confirmacion){
        alert("La contraseña no concuerda");
        return;
    }

    const user = {
        nombre: nombre,
        usuario: usuario,
        contrasena: contrasena,
    };

    localStorage.setItem(usuario, JSON.stringify(user));
    alert("Registro exitoso. Porfavor logea");
    window.location.href = "login.html";
});