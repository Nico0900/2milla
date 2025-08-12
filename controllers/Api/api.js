fetch('http://127.0.0.1:8000/list/')
  .then(res => res.json())
  .then(data => {
    console.log("Respuesta API:", data); // 👈 Ver qué estructura trae
  })
  .catch(err => console.error("Error al consumir la API:", err));
