const url = "http://localhost:3000";

// Carrusel
let peliculasPage = 0;
let productosPage = 0;
const ITEMS_PER_PAGE = 6;
let peliculasData = [];
let productosData = [];

// Obtengo peliculas desde la url de peliculas para que me de la informacion 
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

// Obtengo productos desde la url de productos para que me de la informacion
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
    document.querySelector("nav").style.display = "flex";
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
    borrarCarrito();
    window.location.href = "index.html";
}

// Muestra las peliculas en relacion a la bdd y las obtiene
function mostrarPeliculas(peliculas, page = 0) {
    peliculasData = peliculas;
    peliculasPage = page;
    let start = page * ITEMS_PER_PAGE;
    let end = start + ITEMS_PER_PAGE;
    let peliculasToShow = peliculas.slice(start, end);
    let htmlpeliculas = "";
    peliculasToShow.forEach(pelicula => {
        if (pelicula.activo) {
            htmlpeliculas += `<div class="card-pelicula-obra">
                    <img src="${pelicula.imagen}" alt="">
                    <h4>${pelicula.nombre}</h4>
                    <p class="precio">$${pelicula.precio}</p>
                    <p>${pelicula.genero} | ${pelicula.duracion} MINS</p>
                    <p>${pelicula.director}, ${pelicula.anio}</p>
                    <button onclick="agregarPeliculaAlCarrito(${pelicula.id})">AGREGAR TICKET</button>
                </div>`
        }   
    });
    document.querySelector('.contenedor-peliculas-obras').innerHTML = htmlpeliculas;
    actualizarBotonesPeliculas();
};

// Muestra los productos en relacion a la bdd y los obtiene
function mostrarProductos(productos, page = 0) {
    productosData = productos;
    productosPage = page;
    let start = page * ITEMS_PER_PAGE;
    let end = start + ITEMS_PER_PAGE;
    let productosToShow = productos.slice(start, end);
    let htmlproductos = "";
    productosToShow.forEach(producto => {
        if (producto.activo) {
            htmlproductos += `<div class="card-producto">
                    <img src="${producto.imagen}" alt="">
                    <h4>${producto.nombre}</h4>
                    <p class="precio">$${producto.precio}</p>
                    <p class="categoria">${producto.categoria}</p>
                    <button onclick="agregarProductoAlCarrito(${producto.id})">AGREGAR PRODUCTO</button>
                </div>`
        }
    });
    document.querySelector('.contenedor-productos').innerHTML = htmlproductos;
    actualizarBotonesProductos();
};

// Funciones del carrusel 🙏🙏🙏
function actualizarBotonesPeliculas() {
    const prev = document.getElementById('peliculas-prev');
    const next = document.getElementById('peliculas-next');
    prev.disabled = peliculasPage === 0;
    next.disabled = (peliculasPage + 1) * ITEMS_PER_PAGE >= peliculasData.length;
}

function actualizarBotonesProductos() {
    const prev = document.getElementById('productos-prev');
    const next = document.getElementById('productos-next');
    prev.disabled = productosPage === 0;
    next.disabled = (productosPage + 1) * ITEMS_PER_PAGE >= productosData.length;
}

function setupCarouselListeners() {
    document.getElementById('peliculas-prev').addEventListener('click', () => {
        if (peliculasPage > 0) {
            mostrarPeliculas(peliculasData, peliculasPage - 1);
        }
    });
    document.getElementById('peliculas-next').addEventListener('click', () => {
        if ((peliculasPage + 1) * ITEMS_PER_PAGE < peliculasData.length) {
            mostrarPeliculas(peliculasData, peliculasPage + 1);
        }
    });
    document.getElementById('productos-prev').addEventListener('click', () => {
        if (productosPage > 0) {
            mostrarProductos(productosData, productosPage - 1);
        }
    });
    document.getElementById('productos-next').addEventListener('click', () => {
        if ((productosPage + 1) * ITEMS_PER_PAGE < productosData.length) {
            mostrarProductos(productosData, productosPage + 1);
        }
    });
}

// Se consigue el carrito parseando para empezar a utilizarlo y contar las peliculas y productos
function obtenerCarrito(nombre) {
    let carrito = localStorage.getItem(nombre);
    if(carrito) {
        carrito = JSON.parse(carrito);
        return carrito
    };
    return [];
};

// Opcion de guardado desde el nombre y carrito en la funcion anterior con funcion de stringify para pasar de Json a variable 
function guardarCarrito(nombre, carrito) {
    localStorage.setItem(nombre, JSON.stringify(carrito));    
};

// Agregar al carrito ya construido los productos desde el id (productos) e igualarlos para que lo cuente cuando lo sumemos
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

// Agregar al carrito ya construido los productos desde el id (peliculas) e igualarlos para que lo cuente cuando lo sumemos
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


function borrarCarrito() {
    localStorage.removeItem("cine-productos");
    localStorage.removeItem("cine-peliculas");
}

// Muestra nuestros datos por consola
function imprimirDatosAlumno() {
    console.log("TP hecho por Leandro Podestá y Lucas Iusef 😄");
}


// Funcion para inicializar todas las funciones
async function init() {
    mostrarTema(localStorage.getItem("tema") || "oscuro");
    chequearUsuarioLogueado();
    imprimirDatosAlumno();

    // Pelis y productos
    let productos = await obtenerProductos();
    let peliculas = await obtenerPeliculas();
    
    mostrarPeliculas(peliculas);
    mostrarProductos(productos);
    setupCarouselListeners();
}

// Funciones para cambiar el tema
function cambiarTema() {
    cambiarTemaLocalStorage();
    mostrarTema(localStorage.getItem("tema"));
};

function cambiarTemaLocalStorage() {
    temaActual = localStorage.getItem("tema");
    if (!temaActual || temaActual === "oscuro") {
        localStorage.setItem("tema", "claro");
    } else {
        localStorage.setItem("tema", "oscuro");
    }
}

function mostrarTema(tema) {
    const body = document.body;
    const logo = document.querySelector('header .logo');
    const iconoTema = document.getElementById("icono-tema");
    if (tema === "claro") {
        body.classList.add("light-theme");
        if (logo) logo.src = "assets/img/logo_gris.png";
        if (iconoTema) iconoTema.src = "assets/img/tema_claro2.png";
    } else {
        body.classList.remove("light-theme");
        if (logo) logo.src = "assets/img/logo.png";
        if (iconoTema) iconoTema.src = "assets/img/tema_oscuro2.png";
    }
}

// INIT
init()