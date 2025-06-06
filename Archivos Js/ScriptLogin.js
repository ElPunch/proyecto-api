document.getElementById("login").addEventListener("submit", function(event){
    event.preventDefault();
    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById("contrasena").value;

    var user = localStorage.getItem(usuario);

    if (user){
        var parsedUser = JSON.parse(user);
        if(parsedUser.contrasena === contrasena){
            localStorage.setItem("usuario", JSON.stringify(parsedUser));
            window.location.href = "Index.html"
        }else {
            alert("Contraseña invalida");
        }
    } else {
        alert("Usuario no encontrado");
    }
});