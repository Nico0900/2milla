fetch('http://13.59.52.164:8000/archivos-imagenes/')
  .then(res => res.json())
  .then(data => {
    console.log("Respuesta API:", data); // 👈 Ver qué estructura trae
  })
  .catch(err => console.error("Error al consumir la API:", err));
