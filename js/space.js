document.getElementById('btnBuscar').addEventListener('click', () => {
    const query = document.getElementById('inputBuscar').value.trim();
    
    if (query === "") {
        alert("Escriba un término de búsqueda.");
        return;
    }
    
    const url = `https://images-api.nasa.gov/search?q=${query}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            mostrarResultados(data.collection.items);
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
        });
    });
    
    function mostrarResultados(imagenes) {
        const contenedor = document.getElementById('contenedor');
        contenedor.innerHTML = ""; 
    
        if (imagenes.length === 0) {
            contenedor.innerHTML = "<p>No se encontraron resultados.</p>";
            return;
        }
    
        imagenes.forEach(imagen => {
            const { title, description, date_created } = imagen.data[0];
            const imageUrl = imagen.links ? imagen.links[0].href : '';
    
        // Crear una tarjeta con Bootstrap
        const tarjeta = `
            <div class="col">
                <div class="card h-100">
                    <img src="${imageUrl}" class="card-img-top img-fluid" alt="${title}">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${description || 'Sin descripción disponible'}</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Fecha: ${date_created}</small>
                    </div>
                </div>
            </div>
        `;
    
        contenedor.innerHTML += tarjeta;
    });
}


