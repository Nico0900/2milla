function mostrarPantalla(id) {
  const pantallas = document.querySelectorAll(".pantalla");
  pantallas.forEach(p => p.classList.remove("active"));
  const activa = document.getElementById(id);
  if (activa) {
    activa.classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarPantalla("Dashboard");
});
