let nombrePro = document.querySelector(".nombre-pro");
let precioPro = document.querySelector(".precio-pro");
let descipcionPro = document.querySelector(".presentacion-pro");
let imagenPro = document.querySelector(".imagen-pro");
let btnGuardar = document.querySelector(".btn-guardar");
let tabla = document.querySelector(".table tbody");
let buscador = document.getElementById("buscador");
let productoEnEdicion = null;

btnGuardar.addEventListener("click", () => {
    validarFormulario();
    guardarEnLocalStorage();
    limpiarFormulario();
    mostrarProductos(); 
});

buscador.addEventListener("input", () => {
    mostrarProductos(buscador.value);
});

function validarFormulario() {
    if (nombrePro.value && precioPro.value && descipcionPro.value && imagenPro.value) {
        alert("Datos guardados correctamente ");
    } else {
        alert("Todos los campos son obligatorios ");
    }
}

function limpiarFormulario() {
    nombrePro.value = "";
    precioPro.value = "";
    descipcionPro.value = "";
    imagenPro.value = "";
    productoEnEdicion = null;
    btnGuardar.textContent = "Guardar Producto";
}

function guardarEnLocalStorage() {
    if (nombrePro.value && precioPro.value && descipcionPro.value && imagenPro.value) {
        let producto = {
            nombre: nombrePro.value,
            precio: precioPro.value,
            descripcion: descipcionPro.value,
            imagen: imagenPro.value
        };
        let productos = JSON.parse(localStorage.getItem("productos")) || [];

        if (productoEnEdicion !== null) {
            productos[productoEnEdicion] = producto;
        } else {
            productos.push(producto); 
        }

        localStorage.setItem("productos", JSON.stringify(productos));
    }
}

function mostrarProductos(busqueda = "") { 
    tabla.innerHTML = ""; 
    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    let productosFiltrados = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    productosFiltrados.forEach((producto, index) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.descripcion}</td>
            <td><img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px;"></td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="editarProducto(${index})">📄</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index}, '${producto.nombre}')">✖️</button>
            </td>
        `
        tabla.appendChild(fila);
    });
}

function eliminarProducto(index, nombre) {
    if (confirm(`¿Estás seguro de que deseas eliminar el producto "${nombre}"?`)) {
        let productos = JSON.parse(localStorage.getItem("productos")) || [];
        productos.splice(index, 1);
        localStorage.setItem("productos", JSON.stringify(productos));
        mostrarProductos(); 
    }
}

function editarProducto(index) {
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    let producto = productos[index];
    nombrePro.value = producto.nombre;
    precioPro.value = producto.precio;
    descipcionPro.value = producto.descripcion;
    imagenPro.value = producto.imagen;

    productoEnEdicion = index; 
    btnGuardar.textContent = "Actualizar Producto";
}


mostrarProductos();

//Mostrar los datos localStorage al recargar pagina
document.addEventListener("DOMContentLoaded", function(){
    borrarTabla();
    mostrarDatos()
})

