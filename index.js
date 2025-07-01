//inicio de js donde pongo para que se muestren los productos sacandoles los de id para que se vea en el menu
//y ya tenga la conexion
const url = 'http://localhost:3000';

async function obtenerProductos() {
    try {
        const traerProductos = await fetch(`${url}/productos`);
        const productoJson = await traerProductos.json();

        mostrarProductos(productoJson.busqueda);
    } catch (error) {
        console.log(error)
    }
};

function mostrarProductos(productos) {
    let htmlProductos = "";
    let htmlEncabezados = "";
    let encabezados = document.getElementById('encabezadoProductos');
    let lista = document.getElementById('listaProductos');
    Object.keys(productos[0]).forEach(encabezado => {
        if(!encabezado.includes('id')) {
            htmlEncabezados += `<th>${encabezado}</th>`
        };
    })
    encabezados.innerHTML = htmlEncabezados;
    productos.forEach(producto =>{
        htmlProductos += `<tr>
                    <td>${producto.nombre}</td>
                    <td>${producto.stock}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.imagen}</td>
                </tr>`
    })
    lista.innerHTML = htmlProductos;
}

function init(){
    obtenerProductos();
};

init();