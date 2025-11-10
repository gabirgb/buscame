export function mostrarCards(listaNoticias) {
    const container = document.getElementById('card-container')
    container.innerHTML = ""

    if (!listaNoticias || listaNoticias.length === 0) {
        container.innerHTML = `<p>No se encontraron noticias para mostrar.</p>`
        // acá return no devuelve ningún valor (es decir, devuelve undefined).
        // Su propósito es salir anticipadamente de la función MOSTRARCARDS() si no hay noticias para mostrar.
        // se usa asi porque queremos evitar que el resto de la función se ejecute si listaNoticias está vacía o no existe.
        // es una forma clara de decir "sali (retorná) porque no tenes nada más para ejecutar" (asi evito ejecutar el resto de la f MOSTRARCARDS() al pepe)
        // podría hacer "return false", "return null", "return []"", etc., pero en este caso no es necesario porque la función no necesita devolver nada. Solo actúa sobre el DOM.
        // ¿A DONDE VUELVE EL FLUJO?
        // Depende de quién llamó a la función:
        // - Si fue otra función → el flujo vuelve ahí.
        // - Si fue el navegador (por ejemplo, en un evento como click) → el flujo vuelve al manejador del evento.
        // - Si fue una promesa (.then(...)) → el flujo sigue dentro del .then
        return
    }

    //! esto no funciona
    listaNoticias.forEach(noticia => {
        const card = document.createElement('div')
        card.className = "card"
        card.innerHTML = `
            <img src="${noticia.image_url}" class="card-img-top" alt="${noticia.title}">
            <div class="card-body">
                <h5 class="card-title">${noticia.title}</h5>
                <p class="card-text">${noticia.description}</p>
                <a href="${noticia.link}" class="btn btn-primary">Ver más</a>
            </div>`
        container.appendChild(card)
    })
}


export function numResultados(cantidad) {
    const resultado = document.getElementById('resultados-container')
    // OPERADOR TERNARIO
    // forma resumida/ abreviada de if
    // se usa para asignar valores, no para ejecutar funciones (por una cuestion de legibilidad)
    // Usarlo cuando la logica es simple y la asignacion es directa, asi queda más compacto y legible
    // variable o propiedad que recibe el valor = condición ? valorSiVerdadero : valorSiFalso
    resultado.innerHTML = cantidad
        // si cantidad es truthy:
        ? `<h2>Hay ${cantidad} resultados de búsqueda.</h2>`
        // si es falsy:
        : `<h2>No hay resultados :(</h2>`
}
