document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("toggleFiltrosBtn");
  const filtrosContent = document.getElementById("filtrosContent");

  toggleBtn.addEventListener("click", function () {
    filtrosContent.classList.toggle("active");
    const isVisible = filtrosContent.classList.contains("active");
    toggleBtn.innerHTML = isVisible ? "Filtros ▴" : "Filtros ▾";
    toggleBtn.setAttribute("aria-expanded", isVisible);
  });
});
