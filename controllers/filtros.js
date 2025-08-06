document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("toggleFiltrosBtn");
    const filtrosContent = document.getElementById("filtrosContent");

    toggleBtn.addEventListener("click", function () {
        const isVisible = filtrosContent.style.display === "block";
        filtrosContent.style.display = isVisible ? "none" : "block";
        toggleBtn.innerHTML = isVisible ? "Filtros ▾" : "Filtros ▴";
    });
});
