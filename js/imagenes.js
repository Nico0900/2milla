document.addEventListener("DOMContentLoaded", function () {
    // Cargar la fuente Chewy de Google Fonts
    const fontLink = document.createElement("link");
    fontLink.href = "https://fonts.googleapis.com/css?family=Chewy&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);

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
    modal.innerHTML = `<img id="modal-img" style="max-width:90vw;max-height:90vh;border-radius:10px;box-shadow:0 0 20px #000;" />`;
    document.body.appendChild(modal);

    modal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    for (let i = 1; i <= 8; i++) {
        const col = document.createElement("div");
        col.className = "col-6 col-md-4 col-lg-3 d-flex justify-content-center";

        // Contenedor para la imagen y el texto
        const imgContainer = document.createElement("div");
        imgContainer.style.position = "relative";
        imgContainer.style.display = "inline-block";

        const img = document.createElement("img");
        img.src = `src/images/tratados/${i}.jpg`;
        img.className = "img-fluid rounded shadow tratado-img";
        img.alt = `Tratado ${i}`;

        // Texto centrado
        const overlayText = document.createElement("div");
        overlayText.innerText = "Ver Tratado";
        overlayText.style.position = "absolute";
        overlayText.style.top = "50%";
        overlayText.style.left = "50%";
        overlayText.style.transform = "translate(-50%, -50%)";
        overlayText.style.fontFamily = "'Chewy', cursive";
        overlayText.style.fontSize = "2rem";
        overlayText.style.color = "#fff";
        overlayText.style.textShadow = "2px 2px 8px #000";
        overlayText.style.pointerEvents = "none";
        overlayText.style.userSelect = "none";
        overlayText.style.opacity = "0"; // Oculto por defecto
        overlayText.style.transition = "opacity 0.3s";

        // Blur y mostrar texto al pasar el mouse
        img.addEventListener("mouseenter", function () {
            img.style.filter = "blur(3px)";
            img.style.transition = "filter 0.3s";
            overlayText.style.opacity = "1";
        });
        img.addEventListener("mouseleave", function () {
            img.style.filter = "none";
            overlayText.style.opacity = "0";
        });

        // Mostrar imagen en grande al hacer clic
        img.addEventListener("click", function () {
            const modalImg = document.getElementById("modal-img");
            modalImg.src = img.src;
            modal.style.display = "flex";
        });

        imgContainer.appendChild(img);
        imgContainer.appendChild(overlayText);
        col.appendChild(imgContainer);
        gallery.appendChild(col);
    }

    // Blur y mostrar texto al pasar el mouse
    img.addEventListener("mouseenter", function () {
        img.style.filter = "blur(3px)";
        img.style.transition = "filter 0.3s, transform 0.3s";
        img.style.transform = "perspective(600px) rotateY(15deg) scale(1.05)";
        overlayText.style.opacity = "1";
    });
    img.addEventListener("mouseleave", function () {
        img.style.filter = "none";
        img.style.transform = "none";
        overlayText.style.opacity = "0";
    });
});
