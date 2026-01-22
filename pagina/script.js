document.addEventListener("DOMContentLoaded", () => {

//formulario adopcion
  const form = document.getElementById("formAdopcion");

  if (form) {
    form.addEventListener("submit", function (event) {

      const confirmar = confirm("¿Estás seguro de que deseas enviar el formulario de adopción?");
      if (!confirmar) {
        event.preventDefault();
        return;
      }

      const telefono = document.getElementById("telefono").value;
      const motivo = document.getElementById("motivo").value;

      if (!/^\d{10}$/.test(telefono)) { //REGEX para 10 dígitos
        alert("Por favor, ingresa un número de teléfono válido de 10 dígitos.");
        event.preventDefault();
        return;
      }

      if (motivo.length < 20) {
        alert("Por favor, proporciona un motivo más detallado (al menos 20 caracteres).");
        event.preventDefault();
        return;
      }
    });
  }


 // mascotas
  const botonesInfo = document.querySelectorAll(".btnInfo");

  botonesInfo.forEach(boton => {
    boton.addEventListener("click", () => {
      const info = boton.nextElementSibling;

      if (info.style.display === "block") {
        info.style.display = "none";
        boton.textContent = "Ver información";
      } else {
        info.style.display = "block";
        boton.textContent = "Ocultar información";
      }
    });
  });

  
  //carrito
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const contador = document.getElementById("contador");
  if (contador) {
    contador.textContent = carrito.length;
  }

  const botonesCarrito = document.querySelectorAll(".btnCarrito");

  botonesCarrito.forEach(boton => {
    boton.addEventListener("click", () => {

      const animal = {
        nombre: boton.dataset.nombre,
        raza: boton.dataset.raza,
        edad: boton.dataset.edad,
        imagen: boton.dataset.imagen   
      };

      if (!animal.nombre || !animal.imagen) {
        alert("Error al agregar el animal. Datos incompletos.");
        return;
      }

      carrito.push(animal);
      localStorage.setItem("carrito", JSON.stringify(carrito));

      if (contador) {
        contador.textContent = carrito.length;
      }

      alert(animal.nombre + " ha sido agregado al carrito de adopción.");
    });
  });


  
  //carrito vaciar
  const btnVaciar = document.getElementById("vaciarCarrito");
  const itemsCarrito = document.getElementById("itemsCarrito");

  if (btnVaciar && itemsCarrito) {
    btnVaciar.addEventListener("click", () => {
      carrito = [];
      localStorage.removeItem("carrito");
      itemsCarrito.innerHTML = "";

      if (contador) {
        contador.textContent = "0";
      }
    });
  }

});
