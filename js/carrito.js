// Obtengo desde la funcion el carrito para poder operar con las peliculas
function obtenerCarritoPeliculas() {
    let carritoPeliculas = localStorage.getItem('cine-peliculas');
    if(carritoPeliculas) {
        carritoPeliculas = JSON.parse(carritoPeliculas);
    } else {
        carritoPeliculas = [];
    }
    return carritoPeliculas;
};

// Obtengo desde la funcion el carrito para poder operar con los productos
function obtenerCarritoProductos() {
    let carritoProductos = localStorage.getItem('cine-productos');
    
    if(carritoProductos) {
        carritoProductos = JSON.parse(carritoProductos);
    } else {
        carritoProductos = [];
    }
    return carritoProductos;
};

// Se guarda desde el nombre en el parametro y carrito donde uso el stringify para poner por string el carrito
function guardarCarrito(nombre, carrito) {
    localStorage.setItem(nombre, JSON.stringify(carrito));    
};

// Desde las funciones ya hechas las guardamos en una variable para despues recorrerlas por cada elemento (tanto en peliculas como productos)
function mostrarCarrito() {
    let productos = obtenerCarritoProductos();
    let peliculas = obtenerCarritoPeliculas();
    let htmlCarrito = "";
    
    peliculas.forEach(elemento => {
        htmlCarrito += `<div class="card-elemento-carrito">
                <h4>${elemento.cantidad}x ${elemento.nombre}</h4>
                <p class="precio">$${elemento.precio * elemento.cantidad}</p>
                <button onclick="sacarPeliDelCarrito(${elemento.id})" class="btn-eliminar">-</button>
                <button onclick="sumarPeliAlCarrito(${elemento.id})" class="btn-sumar">+</button>
            </div>`
    })

    productos.forEach(elemento => {
        htmlCarrito += `<div class="card-elemento-carrito">
                <h4>${elemento.cantidad}x ${elemento.nombre}</h4>
                <p class="precio">$${elemento.precio * elemento.cantidad}</p>
                <button onclick="sacarProdDelCarrito(${elemento.id})" class="btn-eliminar">-</button>
                <button onclick="sumarProdAlCarrito(${elemento.id})" class="btn-sumar">+</button>
            </div>`
    })

    document.getElementById('carrito').innerHTML = htmlCarrito;
    calcularTotalCarrito();
};

// Borrar pelicula desde la funcion ya guardada anteriormente poniendola en una variable. Si es mayor a una unidad como dato minimo se descuenta una
function sacarPeliDelCarrito(id_pelicula) {
    let carrito = obtenerCarritoPeliculas();

    let peliculaEnCarrito = carrito.find(peli => peli.id == id_pelicula);
    if (peliculaEnCarrito.cantidad > 1) {
        peliculaEnCarrito.cantidad -= 1
    }
    else {
        carrito = carrito.filter(peli => peli.id != id_pelicula);
    }
    guardarCarrito("cine-peliculas", carrito);
    mostrarCarrito();
}

// Sumar una pelicula al carrito
function sumarPeliAlCarrito(id_pelicula) {
    let carrito = obtenerCarritoPeliculas();

    let peliculaEnCarrito = carrito.find(peli => peli.id == id_pelicula);
    if (peliculaEnCarrito) {
        peliculaEnCarrito.cantidad += 1
    }
    guardarCarrito("cine-peliculas", carrito);
    mostrarCarrito();
}

// Sacar un producto del carrito
function sacarProdDelCarrito(id_producto) {
    let carrito = obtenerCarritoProductos();
    
    let elementoEnCarrito = carrito.find(prod => prod.id == id_producto);
    if (elementoEnCarrito.cantidad > 1) {
        elementoEnCarrito.cantidad -= 1
    }
    else {
        carrito = carrito.filter(prod => prod.id != id_producto);
    }
    guardarCarrito("cine-productos", carrito);
    mostrarCarrito();
}

// Sumar un producto al carrito
function sumarProdAlCarrito(id_producto) {
    let carrito = obtenerCarritoProductos();

    let elementoEnCarrito = carrito.find(prod => prod.id == id_producto);
    if (elementoEnCarrito) {
        elementoEnCarrito.cantidad += 1
    }
    guardarCarrito("cine-productos", carrito);
    mostrarCarrito();
}

// Calcula el total del carrito (suma todos los productos * su cantidad)
function calcularTotalCarrito() {
    let peliculas = obtenerCarritoPeliculas();
    let productos = obtenerCarritoProductos();
    let carrito = peliculas.concat(productos);
    let total = 0;
    carrito.forEach(elemento => {
        total += elemento.precio * elemento.cantidad;
    })
    document.getElementById('total-carrito').innerText = total;
}

function vaciarCarritoYMostrar() {
    localStorage.removeItem("cine-productos");
    localStorage.removeItem("cine-peliculas");
    mostrarCarrito();
}

// Muestra el pop up de confirmacion y despues reinicia el sistema
function popUpPagar() {

    let carritoPeliculas = JSON.parse(localStorage.getItem('cine-peliculas') || "[]");
    let carritoProductos = JSON.parse(localStorage.getItem('cine-productos') || "[]");

    if (carritoPeliculas.length === 0 && carritoProductos.length === 0) {
        alert("El carrito está vacío. Agregue productos o películas antes de pagar.");
        return;
    }

    if (document.getElementById('popup-confirmacion')) return;

    const popup = document.createElement('div');
    popup.id = 'popup-confirmacion';
    popup.className = 'popup-confirmacion';

    popup.innerHTML = `
        <div class="popup-contenido">
            <p>¿Desea confirmar su compra?</p>
            <div class="popup-botones">
                <button id="btn-no">No</button>
                <button id="btn-comprar">Comprar</button>
            </div>
        </div>
    `;

    document.body.appendChild(popup);

    document.getElementById('btn-no').onclick = () => {
        popup.remove();
    };

    document.getElementById('btn-comprar').onclick = () => {
        alert("¡Gracias por su compra!");
        popup.remove();
        volverAEmpezar();
    };
}

// Funciones chiquitas de ayuda
function volverAEmpezar() {
    borrarNombre();
    borrarCarrito();
    window.location.href = "index.html";
}

function borrarCarrito() {
    localStorage.removeItem("cine-productos");
    localStorage.removeItem("cine-peliculas");
}

function borrarNombre() {
    localStorage.removeItem("usuarioNombre");
}

// Cambiar el tema
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
function init() {
    mostrarTema(localStorage.getItem("tema"));
    mostrarCarrito();
}

init();