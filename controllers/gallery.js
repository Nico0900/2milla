const loading = document.getElementById("loading");
const contenedor = document.getElementById("galeria");
const paginationTop = document.querySelectorAll("#material .pagination")[0];
const paginationBottom = document.querySelectorAll("#material .pagination")[1];

const modal = document.getElementById("modalImagen");
const modalImg = document.getElementById("imgModal");
const btnCerrar = document.getElementById("cerrarModal");

let currentPage = 1;
const limit = 12; // imágenes por página
let allImages = [];

// --- CONFIGURACIÓN DE IMÁGENES ---
const carpetas = [
    { nombre: 'jpg', total: 24 },
    { nombre: 'png', total: 12 }
];

loading.style.display = "block";
let intents = 0;

// Función para mezclar array
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

carpetas.forEach(carpeta => {
    for (let i = 1; i <= carpeta.total; i++) {
        intents++;
        const url = `src/${carpeta.nombre}/${i}.${carpeta.nombre}`;
        const img = new Image();
        img.src = url;

        img.onload = () => {
            allImages.push({ url, name: `${i}.${carpeta.nombre}` });
            intents--;
            if (intents === 0) {
                loading.style.display = "none";
                allImages = mezclarArray(allImages); // mezclamos las imágenes
                renderPage(1);
            }
        };

        img.onerror = () => {
            intents--;
            if (intents === 0) {
                loading.style.display = "none";
                allImages = mezclarArray(allImages); // mezclamos aunque falten algunas
                renderPage(1);
            }
        };
    }
});

// --- FUNCIONES EXISTENTES: renderPage, renderPagination, modal ---
function renderPage(page = 1) {
    currentPage = page;
    contenedor.innerHTML = "";
    const start = (page - 1) * limit;
    const end = start + limit;
    const pageImages = allImages.slice(start, end);

    pageImages.forEach(item => {
        const divItem = document.createElement("div");
        divItem.classList.add("galeria-item");

        const img = document.createElement("img");
        img.src = item.url;
        img.alt = item.name || "Imagen de galería";
        img.addEventListener("click", () => abrirModal(item.url));

        const aDescargar = document.createElement("a");
        aDescargar.href = item.url;
        aDescargar.download = item.name || "imagen";
        aDescargar.classList.add("descargar-icon");
        aDescargar.title = "Descargar imagen";
        aDescargar.innerHTML = '<i class="fas fa-download"></i>';

        aDescargar.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation();
            fetch(item.url)
                .then(res => res.blob())
                .then(blob => {
                    const urlBlob = URL.createObjectURL(blob);
                    const enlaceTemp = document.createElement("a");
                    enlaceTemp.href = urlBlob;
                    enlaceTemp.download = item.name || "imagen";
                    document.body.appendChild(enlaceTemp);
                    enlaceTemp.click();
                    enlaceTemp.remove();
                    URL.revokeObjectURL(urlBlob);
                });
        });

        divItem.appendChild(img);
        divItem.appendChild(aDescargar);
        contenedor.appendChild(divItem);
    });

    renderPagination();
}

function renderPagination() {
    const totalPages = Math.ceil(allImages.length / limit);
    const paginations = [paginationTop, paginationBottom];

    paginations.forEach(pagination => {
        pagination.innerHTML = "";

        const prevLi = document.createElement("li");
        prevLi.classList.add("page-item");
        if (currentPage === 1) prevLi.classList.add("disabled");
        prevLi.innerHTML = `<a class="page-link" href="#">Anterior</a>`;
        prevLi.addEventListener("click", e => {
            e.preventDefault();
            if (currentPage > 1) renderPage(currentPage - 1);
        });
        pagination.appendChild(prevLi);

        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement("li");
            li.classList.add("page-item");
            if (i === currentPage) li.classList.add("active");
            li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            li.addEventListener("click", e => {
                e.preventDefault();
                renderPage(i);
            });
            pagination.appendChild(li);
        }

        const nextLi = document.createElement("li");
        nextLi.classList.add("page-item");
        if (currentPage === totalPages) nextLi.classList.add("disabled");
        nextLi.innerHTML = `<a class="page-link" href="#">Siguiente</a>`;
        nextLi.addEventListener("click", e => {
            e.preventDefault();
            if (currentPage < totalPages) renderPage(currentPage + 1);
        });
        pagination.appendChild(nextLi);
    });
}

// Modal
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
