const loading = document.getElementById("loading");
const contenedor = document.getElementById("galeria");

const modal = document.getElementById("modalImagen");
const modalImg = document.getElementById("imgModal");
const btnCerrar = document.getElementById("cerrarModal");

loading.style.display = "block";  // Mostrar spinner

fetch('http://127.0.0.1:8000/list/')
  .then(res => {
    if (!res.ok) throw new Error("Error en la respuesta de la API");
    return res.json();
  })
  .then(data => {
    contenedor.innerHTML = "";

    data.images.forEach(item => {
      const divItem = document.createElement("div");
      divItem.classList.add("galeria-item");

      const img = document.createElement("img");
      img.src = item.url; // sigue mostrando la imagen original
      img.alt = item.name || "Imagen de galería";

      // Abrir modal con imagen al click
      img.addEventListener("click", () => abrirModal(item.url));

      // Construir la URL con la nueva ruta de descarga con CORS
      const relativePath = item.url.replace("http://localhost:8000/images/", "");
      const downloadUrl = `http://127.0.0.1:8000/list/serve/${relativePath}`;

      // Enlace de descarga (manteniendo diseño)
      const aDescargar = document.createElement("a");
      aDescargar.href = downloadUrl;
      aDescargar.download = item.name || "imagen";
      aDescargar.classList.add("descargar-icon");
      aDescargar.title = "Descargar imagen";
      aDescargar.innerHTML = '<i class="fas fa-download"></i>';

      // Forzar descarga con fetch + blob (sin CORS error)
      aDescargar.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        fetch(downloadUrl)
          .then(response => {
            if (!response.ok) throw new Error("Error al descargar la imagen");
            return response.blob();
          })
          .then(blob => {
            const urlBlob = URL.createObjectURL(blob);
            const enlaceTemp = document.createElement("a");
            enlaceTemp.href = urlBlob;
            enlaceTemp.download = item.name || "imagen";
            document.body.appendChild(enlaceTemp);
            enlaceTemp.click();
            enlaceTemp.remove();
            URL.revokeObjectURL(urlBlob);
          })
          .catch(err => console.error("Error al descargar:", err));
      });

      divItem.appendChild(img);
      divItem.appendChild(aDescargar);

      contenedor.appendChild(divItem);
    });
  })
  .catch(err => console.error("Error al consumir la API:", err))
  .finally(() => {
    loading.style.display = "none";
  });

// Funciones modal
function abrirModal(url) {
  modal.style.display = "flex";
  modalImg.src = url;
  document.body.style.overflow = "hidden";
}

function cerrarModal() {
  modal.style.display = "none";
  modalImg.src = "";
  document.body.style.overflow = "";
}

btnCerrar.addEventListener("click", cerrarModal);
modal.addEventListener("click", e => {
  if (e.target === modal) cerrarModal();
});
