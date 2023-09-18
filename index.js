const dbProductos = [
  {
    id: 1,
    nombre: "Aro NEW YORK",
    precio: 3000,
    imagen: "https://via.placeholder.com/150",
    tipo: "aritos"
},
{
    id: 2,
    nombre: "Aro ITALIA",
    precio: 5000,
    imagen: "https://via.placeholder.com/150",
    tipo: "aritos"
},
{
    id: 3,
    nombre: "Aro VENECIA",
    precio: 600,
    imagen: "https://via.placeholder.com/150",
    tipo: "aritos"
},
{
    id: 4,
    nombre: "Aro FRANCIA",
    precio: 5000,
    imagen: "https://via.placeholder.com/150",
    tipo: "aritos"
},
{
  id: 5,
  nombre: "Aro ARGENTINA",
  precio: 7000,
  imagen: "https://via.placeholder.com/150",
  tipo: "aritos"
},
{
  id: 6,
  nombre: "Aro GRECIA",
  precio: 7000,
  imagen: "https://via.placeholder.com/150",
  tipo: "collares"
},
{
  id: 7,
  nombre: "Aro ROMA",
  precio: 6000,
  imagen: "https://via.placeholder.com/150",
  tipo: "collares"
},
{
  id: 8,
  nombre: "Aro PRAGA",
  precio: 3000,
  imagen: "https://via.placeholder.com/150",
  tipo: "collares"
},
{
id: 9,
nombre: "Aro INDONESIA",
precio: 6000,
imagen:"https://via.placeholder.com/150",
tipo: "collares"
},

]
const carrito = []

const productos = document.querySelectorAll(".productos")
const carritoSelector = document.querySelector("#carrito")

function crearTemplate() {
  productos.forEach((producto) => {
      producto.innerHTML = ""

      dbProductos.forEach((productoItem) => {
          const { id, nombre, precio, imagen } = productoItem
          const productoTarjeta = `
          <div class="producto">
          <img src="${imagen}" alt="" />
          <h2>${nombre}</h2>
          <p>Precio: $${precio}</p>
          <button class="botAgregar" id="${id}">Añadir al Carrito</button>
        </div>
          `
          if (producto.id == "aritos" && productoItem.tipo == "aritos") {
            producto.innerHTML += productoTarjeta
        } else if (producto.id == "collares" && productoItem.tipo == "collares") {
            producto.innerHTML += productoTarjeta
        }
      })
  })
}


crearTemplate()

document.addEventListener("click", (e) => {
       const botAgregar = document.querySelectorAll(".botAgregar")
       const botEliminar = document.querySelectorAll(".botEliminar")
       botAgregar.forEach((bot) => {
           if (e.target == bot) {
               const id = parseInt(e.target.id)
               const producto = dbProductos.find((producto) => producto.id === id)
               agregarCarrito(producto)
           }
      
       })
       botEliminar.forEach((botBorrar) => {
           if (e.target == botBorrar) {
               const id = e.target.id
               const idSinEliminar = id.replace("Eliminar", "")
               const productoBusqueda = carrito.map((producto) => producto.id).indexOf(parseInt(idSinEliminar))
               eliminarDelCarrito(prodbuscado)
           }
       })
  
        , { once: true }
   })
   
function agregarCarrito(producto){
  const prodbuscado= carrito.find((prodCarrito) => prodCarrito.id === producto.id)
  if(prodbuscado){
    prodbuscado.cantidad++
  }
  else{
    carrito.push(
      {
        ...producto,
        cantidad:1
      }
    )
  }
  console.log(carrito)
  localStorage.setItem("carrito", JSON.stringify(carrito))
  rendCarrito()
}
document.addEventListener("DOMContentLoaded", ()=> {
  const carritosSP = localStorage.getItem("carrito" ||[])
  const carritoP = JSON.parsecarritosSP
}
)