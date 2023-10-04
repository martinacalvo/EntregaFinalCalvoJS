let carrito = [];
let dbProductos = [];
const baseUrl = "https://651ab79d340309952f0dbe05.mockapi.io"

const productos = document.querySelectorAll(".productos")
const carritoSelector = document.querySelector("#carrito")

function crearTemplate() {
  productos.forEach((producto) => {
    producto.innerHTML = "";

    dbProductos.forEach((productoItem) => {
      const { id, nombre, precio, img, tipo } = productoItem;
      const productoTarjeta = `
        <div class="producto">
          <img src="${img}" alt="" />
          <h2>${nombre}</h2>
          <p>Precio: $${precio}</p>
          <button class="botAgregar" id="${id}">Añadir al Carrito</button>
        </div>
      `;
      if (productoItem.tipo === "aritos" && producto.classList.contains("aritos")) {
        producto.innerHTML += productoTarjeta;
      } else if (productoItem.tipo === "collares" && producto.classList.contains("collares")) {
        producto.innerHTML += productoTarjeta;
      }
    });
  });
}

document.addEventListener("click", (e) => {
  const botAgregar = document.querySelectorAll(".botAgregar");
  const botEliminar = document.querySelectorAll(".botEliminar");

  botAgregar.forEach((bot) => {
    if (e.target == bot) {
      const id = parseInt(e.target.id);
      const producto = dbProductos.find((producto) => producto.id === id);
      agregarCarrito(producto);
      Toastify({
        text: "Agregaste un producto al carrito",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () { } // Callback after click
      }).showToast();
    }
  });

  botEliminar.forEach((botBorrar) => {
    if (e.target == botBorrar) {
      const id = e.target.id;
      const idSinEliminar = id.replace("Eliminar", "");
      const productoBusqueda = carrito.findIndex(
        (producto) => producto.id === parseInt(idSinEliminar)
      );
      Toastify({
        text: "Eliminaste producto al carrito",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () { } // Callback after click
      }).showToast();
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
/*
async function cargarProductosDesdeJSON() {
  fetch("./aritos.json").then((respuesta) => {
    if (!respuesta.ok) {
      throw new Error('No se pudo cargar el archivo JSON');

    }
    return respuesta.json();
  }).then((data) => {
    dbProductos = data;
    crearTemplate();
  })
    .catch((error) => {
      console.error('Error al cargar los productos desde el JSON:', error);
    })
}
cargarProductosDesdeJSON();*/

const obtenerDatosDeJSON = async () => {
  try {
    // Ruta al archivo JSON en la carpeta del proyecto
    const url = `${baseUrl}/aritos`;

    // Realiza la solicitud para obtener el archivo JSON
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Error al obtener datos del archivo JSON');
    }

 
    const data = await response.json();

    // Aquí guardamos los datos en un array
    const dbProductos = Array.isArray(data) ? data : [data];

    return dbProductos;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  try {
    dbProductos = await obtenerDatosDeJSON();
    
    crearTemplate();

    console.log(dbProductos)
  } catch (error) {
    console.error('Error:', error.message);
  }
});