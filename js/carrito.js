function obtenerCarritoPeliculas() {
    let carritoPeliculas = localStorage.getItem('cine-peliculas');
    if(carritoPeliculas) {
        carritoPeliculas = JSON.parse(carritoPeliculas);
    };
    return carritoPeliculas;
}


function obtenerCarritoProductos() {
    let carritoProductos = localStorage.getItem('cine-productos');
    
    if(carritoProductos) {
        carritoProductos = JSON.parse(carritoProductos);
    };
    return carritoProductos;
};

function guardarCarrito(nombre, carrito) {
    localStorage.setItem(nombre, JSON.stringify(carrito));    
};

function mostrarCarrito() {
    let productos = obtenerCarritoProductos();
    let peliculas = obtenerCarritoPeliculas();
    let htmlCarrito = "";
    
    peliculas.forEach(elemento => {
        htmlCarrito += `<div class="card-elemento-carrito">
                <h4>${elemento.nombre}</h4>
                <p class="precio">$${elemento.precio}</p>
                <p class="cantidad">${elemento.cantidad}</p>
                <button onclick="sacarPeliDelCarrito(${elemento.id})">-</button>
            </div>`
    })

    productos.forEach(elemento => {
        htmlCarrito += `<div class="card-elemento-carrito">
                <h4>${elemento.nombre}</h4>
                <p class="precio">$${elemento.precio}</p>
                <p class="cantidad">${elemento.cantidad}</p>
                <button onclick="sacarProdDelCarrito(${elemento.id})">-</button>
            </div>`
    })

    document.getElementById('carrito').innerHTML = htmlCarrito;
    calcularTotalCarrito();
}

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

mostrarCarrito();