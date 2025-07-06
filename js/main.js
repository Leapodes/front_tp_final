// Recibe el nombre de la primera pantalla y lo guarda en el localStorage
function guardarNombre() {
    const nombre = document.getElementById("nombreInput").value.trim();
    if (nombre == '') {
        document.getElementById("advertencia-nombre").style.display = "block";
        document.getElementById("advertencia-nombre").innerHTML = "SIN TU NOMBRE, NO VAMOS<br>A SABER A QUIEN DARLE LOS TICKETS :(";
    } else if (nombre.length > 20) {
        document.getElementById("advertencia-nombre").style.display = "block";
        document.getElementById("advertencia-nombre").innerHTML = "TU NOMBRE ES MUY LARGO :(<br>Y SI PONÉS UN APODO?";
    } else {
        localStorage.setItem("usuarioNombre", nombre.toLowerCase());
        mostrarNombre(nombre);
    }
}

// Muestra el nombre en la pantalla principal y oculta el input del nombre
function mostrarNombre(nombre) {
    document.querySelector(".seccion-input-nombre").style.display = "none";
    document.querySelector(".contenedor-principal").style.display = "block";
    document.querySelector(".imagen-inicio h1").textContent = `HOLA, ${nombre.toUpperCase()}!`;
}

// Borra el nombre del localStorage
function borrarNombre() {
    localStorage.removeItem("usuarioNombre");
}

// Chequea si ya hay un nombre en el localStorage
function chequearUsuarioLogueado() {
    const nombreGuardado = localStorage.getItem("usuarioNombre");
    if (nombreGuardado && nombreGuardado.trim() !== '') {
        mostrarNombre(nombreGuardado);
    }
}

// Muestra nuestros datos por consola
function imprimirDatosAlumno() {
    console.log();
}

function init() {
    // borrarNombre();
    chequearUsuarioLogueado()
}

init()