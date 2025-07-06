const url = "http://localhost:3000";

async function obtenerPeliculas() {
    try {

        let respuesta = await fetch (`${url}/peliculas`);
        let datos = await respuesta.json();

        console.log(datos)
        console.table(datos.payload)

    } catch (error) {
        console.error("Error:", error)
    } 
}

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
    document.querySelector("nav").style.display = "block";
    document.querySelector("footer").style.display = "block";
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

// Borra el nombre y carrito y vuelve al inicio
function volverAEmpezar() {
    borrarNombre();
    // DESPUES AGREGAR FUNCION PARA BORRAR CARRITO
    window.location.href = "index.html";
}

// Muestra nuestros datos por consola
function imprimirDatosAlumno() {
    console.log("TP hecho por Leandro Podestá y Lucas Iusef 😄");
}



function init() {
    chequearUsuarioLogueado();
    obtenerPeliculas();
    imprimirDatosAlumno();
}

init()