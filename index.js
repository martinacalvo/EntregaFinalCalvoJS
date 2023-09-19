const dbProductos = [
  {
    id: 1,
    nombre: "Aro NEW YORK",
    precio: 3000,
    imagen: "images/arito1.jpg",
    tipo: "aritos"
},
{
    id: 2,
    nombre: "Aro ITALIA",
    precio: 5000,
    imagen: "images/arito2.jpg",
    tipo: "aritos"
},
{
    id: 3,
    nombre: "Aro VENECIA",
    precio: 600,
    imagen: "images/arito3.jpg",
    tipo: "aritos"
},
{
    id: 4,
    nombre: "Aro FRANCIA",
    precio: 5000,
    imagen: "images/arito4.jpg",
    tipo: "aritos"
},
{
  id: 5,
  nombre: "Aro ARGENTINA",
  precio: 7000,
  imagen: "images/arito5.jpg",
  tipo: "aritos"
},
{
  id: 6,
  nombre: "Aro GRECIA",
  precio: 7000,
  imagen: "images/arito6.jpg",
  tipo: "aritos"
},
{
  id: 7,
  nombre: "Aro ROMA",
  precio: 6000,
  imagen: "images/arito7.jpg",
  tipo: "aritos"
},
{
  id: 8,
  nombre: "Aro PRAGA",
  precio: 6000,
  imagen: "images/arito8.jpg",
  tipo: "aritos"
},
{
id: 9,
nombre: "Aro INDONESIA",
precio: 6000,
imagen:"images/arito9.jpg",
tipo: "aritos"
},
{
  id: 10,
  nombre: "Aro TULUM",
  precio: 7000,
  imagen: "images/arito13.jpg",
  tipo: "aritos"
},
{
  id: 11,
  nombre: "Aro BALI",
  precio: 6000,
  imagen: "images/aritos14.jpg",
  tipo: "aritos"
},
{
  id: 12,
  nombre: "Aro MALAGA",
  precio: 3000,
  imagen: "images/aritos15.jpg",
  tipo: "aritos"
},
{
id: 13,
nombre: "Collar VIENA",
precio: 6000,
imagen:"images/collar.jpg",
tipo: "collares"
},
{
id: 14,
nombre: "Collar SUIZA",
precio: 6000,
imagen:"images/collar1.jpg",
tipo: "collares"
},
{
id: 15,
nombre: "Collar PANTERA",
precio: 6000,
imagen:"images/collar2.jpg",
tipo: "collares"
},
{
id: 16,
nombre: "Collar COLONIA",
precio: 6000,
imagen:"images/collar4.jpg",
tipo: "collares"
},
{
id: 17,
nombre: "Collar BAIL",
precio: 6000,
imagen:"images/collar5.jpg",
tipo: "collares"
},
{
id: 18,
nombre: "Collar PREIN",
precio: 6000,
imagen:"images/collar6.jpg",
tipo: "collares"
},
{
id: 19,
nombre: "Collar COLONIA",
precio: 6000,
imagen:"images/collar7.jpg",
tipo: "collares"
}
]

let carrito = [];


const productos = document.querySelectorAll(".productos")
const carritoSelector = document.querySelector("#carrito")

function crearTemplate() {
  productos.forEach((producto) => {
    producto.innerHTML = "";

    dbProductos.forEach((productoItem) => {
      const { id, nombre, precio, imagen } = productoItem;
      const productoTarjeta = `
        <div class="producto">
          <img src="${imagen}" alt="" />
          <h2>${nombre}</h2>
          <p>Precio: $${precio}</p>
          <button class="botAgregar" id="${id}">Añadir al Carrito</button>
        </div>
      `;
      if (producto.id == "aritos" && productoItem.tipo == "aritos") {
        producto.innerHTML += productoTarjeta;
      } else if (producto.id == "collares" && productoItem.tipo == "collares") {
        producto.innerHTML += productoTarjeta;
      }
    });
  });
}
crearTemplate();
document.addEventListener("click", (e) => {
  const botAgregar = document.querySelectorAll(".botAgregar");
  const botEliminar = document.querySelectorAll(".botEliminar");

  botAgregar.forEach((bot) => {
    if (e.target == bot) {
      const id = parseInt(e.target.id);
      const producto = dbProductos.find((producto) => producto.id === id);
      agregarCarrito(producto);
    }
  });

  botEliminar.forEach((botBorrar) => {
    if (e.target == botBorrar) {
      const id = e.target.id;
      const idSinEliminar = id.replace("Eliminar", "");
      const productoBusqueda = carrito.findIndex(
        (producto) => producto.id === parseInt(idSinEliminar)
      );
      if (productoBusqueda !== -1) {
        eliminarDelCarrito(productoBusqueda);
      }
    }
  });
});
   
function agregarCarrito(producto) {
  const prodbuscado = carrito.find((prodCarrito) => prodCarrito.id === producto.id);
  if (prodbuscado) {
    prodbuscado.cantidad++;
  } else {
    carrito.push({
      ...producto,
      cantidad: 1,
    });
  }
  actualizarCarrito();
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function actualizarCarrito() {
  // Actualizar la lista de productos en el carrito en el DOM
  const carritoSelector = document.querySelector("#carrito");
  carritoSelector.innerHTML = "";

  carrito.forEach((producto) => {
    const { id, nombre, precio, cantidad } = producto;
    const productoCarrito = document.createElement("li");
    productoCarrito.className = "producto-carrito";
    productoCarrito.innerHTML = `${nombre} - $${precio} - Cantidad: ${cantidad}`;
    const botonEliminar = document.createElement("button");
    botonEliminar.className = "botEliminar";
    botonEliminar.id = `Eliminar${id}`;
    botonEliminar.textContent = "Eliminar";
    productoCarrito.appendChild(botonEliminar);
    carritoSelector.appendChild(productoCarrito);
  });

  // Actualizar el almacenamiento local
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
document.addEventListener("DOMContentLoaded", () => {
  const carritosSP = localStorage.getItem("carrito");
  if (carritosSP) {
    carrito = JSON.parse(carritosSP);
    actualizarCarrito();
  }
});