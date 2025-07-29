document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.getElementById("tratados-gallery");
    const btnJovenes = document.getElementById("btn-jovenes");
    const btnSenoritas = document.getElementById("btn-senoritas");
    const allButtons = [btnJovenes, btnSenoritas];

    const loadAssets = () => {
        const fontLink = document.createElement("link");
        fontLink.href = "https://fonts.googleapis.com/css?family=Chewy&display=swap";
        fontLink.rel = "stylesheet";
        document.head.appendChild(fontLink);

        const faLink = document.createElement("link");
        faLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
        faLink.rel = "stylesheet";
        document.head.appendChild(faLink);

        const style = document.createElement("style");
        style.innerHTML = `
            #image-modal {
                animation: fadeIn 0.3s ease;
            }
            #modal-img {
                opacity: 0;
                transform: scale(0.8);
                animation: zoomIn 0.3s ease forwards;
                border-radius: 15px;
                max-width: 80%;
                max-height: 80%;
                box-shadow: 0 4px 15px rgba(0,0,0,0.4);
            }
            @keyframes fadeIn {
                from { background: rgba(0, 0, 0, 0); }
                to { background: rgba(0, 0, 0, 0.8); }
            }
            @keyframes zoomIn {
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            @keyframes fadeUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            .fade-up {
                animation: fadeUp 0.5s ease forwards;
            }
            #close-modal-btn {
                position: absolute;
                top: 20px;
                right: 30px;
                background: transparent;
                border: none;
                font-size: 30px;
                color: white;
                cursor: pointer;
                z-index: 10000;
            }
            #download-modal-btn {
                position: absolute;
                top: 20px;
                right: 60px;
                size: 18px;
                color: white;
                border-radius: 6px;
                padding: 18px 10px;
                cursor: pointer;
                z-index: 10000;
                text-decoration: none;
                display: flex;
                align-items: center;
                gap: 6px;
                transition: background-color 0.3s;
            }
            #download-modal-btn:hover {
                background: rgba(255,255,255,0.2);
            }
        `;
        document.head.appendChild(style);
    };

    const createModal = () => {
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
        modal.style.flexDirection = "column";
        modal.style.userSelect = "none";

        modal.innerHTML = `
            <button id="close-modal-btn" aria-label="Cerrar modal">&times;</button>
            <img id="modal-img" alt="Imagen ampliada" />
            <a id="download-modal-btn" href="#" download="" aria-label="Descargar imagen">
                <i class="fa-solid fa-download"></i>
            </a>
        `;

        document.body.appendChild(modal);

        const closeModal = () => {
            modal.style.display = "none";
            document.body.style.overflow = ""; // Restablecer scroll
        };

        modal.addEventListener("click", (e) => {
            // Cierra modal si haces click fuera de la imagen o los botones (en el fondo)
            if (e.target === modal) {
                closeModal();
            }
        });

        const closeBtn = modal.querySelector("#close-modal-btn");
        closeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            closeModal();
        });
    };

    const setActiveButton = (activeBtn) => {
        allButtons.forEach(btn => btn.classList.remove("active"));
        activeBtn.classList.add("active");
    };

    const loadImages = (folder, count) => {
        gallery.innerHTML = "";

        for (let i = 1; i <= count; i++) {
            const col = document.createElement("div");
            col.className = "col-6 col-md-3 col-lg-2 d-flex justify-content-center fade-up";
            col.style.animationDelay = `${(i - 1) * 50}ms`;

            const imgContainer = document.createElement("div");
            imgContainer.style.position = "relative";
            imgContainer.style.display = "inline-block";

            const img = document.createElement("img");
            img.src = `src/images/tratados/${folder}/${i}.jpg`;
            img.className = "img-fluid rounded shadow tratado-img";
            img.alt = `Tratado ${i}`;
            img.style.transition = "transform 0.2s";

            const downloadIcon = document.createElement("a");
            downloadIcon.href = img.src;
            downloadIcon.download = `Tratado_${folder}_${i}.jpg`;
            downloadIcon.innerHTML = `<i class="fa-solid fa-download"></i>`;
            Object.assign(downloadIcon.style, {
                position: "absolute",
                top: "15px",
                right: "15px",
                fontSize: "20px",
                color: "#192938",
                transition: "transform 0.2s, color 0.2s",
                zIndex: "3",
                textDecoration: "none",
                pointerEvents: "auto"
            });

            downloadIcon.addEventListener("mouseenter", () => {
                downloadIcon.style.transform = "scale(1.2)";
            });

            downloadIcon.addEventListener("mouseleave", () => {
                downloadIcon.style.transform = "scale(1)";
                downloadIcon.style.color = "#192938";
            });

            img.addEventListener("mouseenter", () => {
                img.style.transform = "scale(1.05)";
            });

            img.addEventListener("mouseleave", () => {
                img.style.transform = "scale(1)";
            });

            img.addEventListener("click", () => {
                const modalImg = document.getElementById("modal-img");
                modalImg.src = img.src;
                modalImg.alt = img.alt;

                const modal = document.getElementById("image-modal");
                modal.style.display = "flex";
                document.body.style.overflow = "hidden"; // Bloquea scroll del body

                // Actualizar botón descarga del modal
                const downloadModalBtn = document.getElementById("download-modal-btn");
                downloadModalBtn.href = img.src;
                downloadModalBtn.download = `Tratado_${folder}_${i}.jpg`;

                modalImg.style.animation = "none";
                void modalImg.offsetWidth;
                modalImg.style.animation = "zoomIn 0.3s ease forwards";
            });

            imgContainer.appendChild(img);
            imgContainer.appendChild(downloadIcon);
            col.appendChild(imgContainer);
            gallery.appendChild(col);
        }
    };

    // Inicializar
    loadAssets();
    createModal();
    loadImages("jovenes", 15); // Por defecto jóvenes
    setActiveButton(btnJovenes);

    // Botones de cambio de categoría
    btnJovenes.addEventListener("click", () => {
        loadImages("jovenes", 15);
        setActiveButton(btnJovenes);
    });

    btnSenoritas.addEventListener("click", () => {
        loadImages("senoritas", 15);
        setActiveButton(btnSenoritas);
    });
});
