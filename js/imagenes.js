document.addEventListener("DOMContentLoaded", function () {
    // Cargar la fuente Chewy de Google Fonts
    const fontLink = document.createElement("link");
    fontLink.href = "https://fonts.googleapis.com/css?family=Chewy&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);

    // Cargar Font Awesome para el icono de descarga
    const faLink = document.createElement("link");
    faLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
    faLink.rel = "stylesheet";
    document.head.appendChild(faLink);

    const gallery = document.getElementById("tratados-gallery");

    // Crear el modal para mostrar la imagen en grande
    const modal = document.createElement("div");
    modal.id = "image-modal";
    modal.style.display = "none";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100vw";
    modal.style.height = "100vh";
    modal.style.background = "rgba(0,0,0,0.8)";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "9999";
    modal.style.cursor = "pointer";
    modal.innerHTML = `<img id="modal-img" style="max-height:90%; max-width:90%; border-radius:10px;" />`;
    document.body.appendChild(modal);

    modal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    for (let i = 1; i <= 30; i++) {
        const col = document.createElement("div");
        col.className = "col-6 col-md-4 col-lg-3 d-flex justify-content-center";

        // Contenedor para la imagen y el icono
        const imgContainer = document.createElement("div");
        imgContainer.style.position = "relative";
        imgContainer.style.display = "inline-block";

        const img = document.createElement("img");
        img.src = `src/images/tratados/${i}.jpg`;
        img.className = "img-fluid rounded shadow tratado-img";
        img.alt = `Tratado ${i}`;

        // Icono de descarga
        const downloadIcon = document.createElement("a");
        downloadIcon.href = img.src;
        downloadIcon.download = `Tratado_${i}.jpg`;
        downloadIcon.innerHTML = `<i class="fa-solid fa-download"></i>`;
        downloadIcon.style.position = "absolute";
        downloadIcon.style.top = "15px"; // Colocamos el icono en la parte superior
        downloadIcon.style.right = "15px"; // Y en la parte derecha
        downloadIcon.style.fontSize = "20px"; // Tamaño adecuado para que sea visible
        downloadIcon.style.color = "#192938"; // Blanco para que se vea bien en cualquier imagen
        downloadIcon.style.transition = "transform 0.2s, color 0.2s"; // Transición suave
        downloadIcon.style.zIndex = "3"; // Aseguramos que siempre esté encima de la imagen
        downloadIcon.style.textDecoration = "none"; // Quitamos el subrayado
        downloadIcon.style.pointerEvents = "auto"; // Permitir la interacción con el icono

        // Efecto visual cuando el cursor pasa sobre el icono
        downloadIcon.addEventListener("mouseenter", function () {
            downloadIcon.style.transform = "scale(1.2)"; // Ampliamos ligeramente el icono
        });

        downloadIcon.addEventListener("mouseleave", function () {
            downloadIcon.style.transform = "scale(1)"; // Volvemos al tamaño original
            downloadIcon.style.color = "#192938"; // Restauramos el color original
        });

        // Mostrar imagen en grande al hacer clic
        img.addEventListener("click", function () {
            const modalImg = document.getElementById("modal-img");
            modalImg.src = img.src;
            modal.style.display = "flex";
        });

        imgContainer.appendChild(img);
        imgContainer.appendChild(downloadIcon);
        col.appendChild(imgContainer);
        gallery.appendChild(col);
    }
});
