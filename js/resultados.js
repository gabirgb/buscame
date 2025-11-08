// API Noticias: NewsData.io
// URL = " https://newsdata.io/api/1/latest?apikey=pub_0dd1e5de885f4957a9053481e57d279b&q=pizza"

//*************************************************************
// DEFINO VARS
//*************************************************************

// Peticion a la API
const URL = "https://newsdata.io/api/1/archive?apikey=pub_0dd1e5de885f4957a9053481e57d279b"

// Vinculo HTML
const sobreMi = document.getElementById('sobre-mi')
const btSobreMi = document.getElementById('bt-sobre-mi')
const btOk = document.getElementById('bt-ok')



//*************************************************************
// DEFINO FUNCIONES
//*************************************************************

// Consulta API -------------------------------------------------------
function obtenerNoticias(query) {
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            mostrarResultados(data)
        })
        .catch(error =>
            console.log("Hubo un error: ", error)
        ) // si hay un error en la peticion lo capturo y q lo informe
        .finally(
            () => console.log("Finalizó la peticion")
        )
}

function mostrarResultados(listaNoticias) {
    listaNoticias.forEach(noticia => {
        const card = document.createElement("div")
        card.innerHTML = `<h2>Nombre: ${noticia.nombre}</h2>
                            <h3>Precio: ${noticia.precio}</h3>`
        noticiasContainer.appendChild(card)
    })
}


// Mostrar "Sobre mi" ------------------------------------------------
// Crear instancia del modal
const modalSobreMi = new bootstrap.Modal(sobreMi)

// Mostrar el modal al hacer clic
function escucharSobreMi() {
    btSobreMi.addEventListener('click', (e) => {
        // e.preventDefault() -> evita que se ejecute el comportamiento por defecto del evento que se está manejando (el de <a>). En los enlaces el comportamiento por defecto es navegar o recargar la página, si no lo pongo capaz que la pagina hace un salto o pierdo datos al intentear recargar.
        e.preventDefault()
        modalSobreMi.show()
        escucharOk()
    })
}

function escucharOk() {
    btOk.addEventListener('click', (e) => {
        modalSobreMi.hide()
    })
}

// LLAMO LAS FUNCIONES
escucharSobreMi()
