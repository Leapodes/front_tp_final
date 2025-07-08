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

mostrarCarrito();

