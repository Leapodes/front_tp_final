const url = "http://localhost:3000";

async function obtenerPeliculas() {
    try {

        let respuesta = await fetch (`${url}/api/peliculas`);
        let datos = await respuesta.json();

        return datos.busqueda;

    } catch (error) {
        console.error("Error:", error)
        return [];
    }
};

async function obtenerProductos() {
    try {

        let respuesta = await fetch (`${url}/api/productos`);
        let datos = await respuesta.json();
        
        return datos.busqueda;

    } catch (error) {
        console.error("Error:", error)
        return [];
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


// Muestra las peliculas en relacion a la bdd y las obtiene
function mostrarPeliculas(peliculas) {
    let htmlpeliculas = "";
    peliculas.forEach(pelicula => {
        htmlpeliculas += `<div class="card-pelicula-obra">
                <img src="${pelicula.imagen}" alt="">
                <h4>${pelicula.nombre}</h4>
                <p class="precio">$${pelicula.precio}</p>
                <p>${pelicula.genero} | ${pelicula.duracion} MINS</p>
                <p>${pelicula.director}, ${pelicula.anio}</p>
                <button onclick="agregarPeliculaAlCarrito(${pelicula.id})">AGREGAR TICKET</button>
            </div>`     
    });

    document.querySelector('.contenedor-peliculas-obras').innerHTML = htmlpeliculas;
};


// Muestra los productos en relacion a la bdd y los obtiene
function mostrarProductos(productos) {
    let htmlproductos = "";
    productos.forEach(producto => {
        htmlproductos += `<div class="card-producto">
                <img src="${producto.imagen}" alt="">
                <h4>${producto.nombre}</h4>
                <p class="precio">$${producto.precio}</p>
                <p class="categoria">${producto.categoria}</p>
                <button onclick="agregarProductoAlCarrito(${producto.id})">AGREGAR PRODUCTO</button>
            </div>`     
    });

    document.querySelector('.contenedor-productos').innerHTML = htmlproductos;
};


function obtenerCarrito(nombre) {
    let carrito = localStorage.getItem(nombre);
    if(carrito) {
        carrito = JSON.parse(carrito);
        return carrito
    };
    return [];
};

function guardarCarrito(nombre, carrito) {
    localStorage.setItem(nombre, JSON.stringify(carrito));    
};

async function agregarProductoAlCarrito(id_producto) {
    let carrito = obtenerCarrito("cine-productos");
    let productos = await obtenerProductos();
    let producto = productos.find(prod => prod.id == id_producto);
    let productoEnCarrito = carrito.find(prod => prod.id == id_producto);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1
    }
    else {
        producto.cantidad = 1
        carrito.push(producto)
    }
    
    guardarCarrito("cine-productos", carrito);
};

async function agregarPeliculaAlCarrito(id_pelicula) {
    let carrito = obtenerCarrito("cine-peliculas");
    let peliculas = await obtenerPeliculas();
    let pelicula = peliculas.find(peli => peli.id == id_pelicula);
    let peliculaEnCarrito = carrito.find(peli => peli.id == id_pelicula);
    if (peliculaEnCarrito) {
        peliculaEnCarrito.cantidad += 1
    }
    else {
        pelicula.cantidad = 1
        carrito.push(pelicula)
    }
    
    guardarCarrito("cine-peliculas", carrito);
}


// Muestra nuestros datos por consola
function imprimirDatosAlumno() {
    console.log("TP hecho por Leandro Podestá y Lucas Iusef 😄");
}


//funcion para inicializar todas las funciones
async function init() {
    chequearUsuarioLogueado();
    imprimirDatosAlumno();

    let productos = await obtenerProductos();
    let peliculas = await obtenerPeliculas();
    mostrarPeliculas(peliculas)    
    mostrarProductos(productos);
}

init()