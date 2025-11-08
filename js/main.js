// TO-DO 
// 1) pasar la busqueda con local storage a resultados.html
// 2) agregar un listener para q a medida q va tipeando se muestren las busquedas previas
// 3) agregar un "borrar historial de busquedas"
// 4) mejorar el diseño q es un horrorrrrrrr

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

const inputBuscar = document.getElementById('terminos')
const btBuscar = document.getElementById('bt-buscar')



//*************************************************************
// DEFINO FUNCIONES
//*************************************************************

// Capturar términos ------------------------------------------------

// Función que ejecuta la búsqueda
function ejecutarBusqueda() {
    const texto = inputBuscar.value.trim()
    if (texto !== "") {
        console.log("Buscando:", texto)
        // (1)
    }
}


// Mostrar "Sobre mi" ------------------------------------------------
// Crear instancia del modal
const modalSobreMi = new bootstrap.Modal(sobreMi)


// Escucha de botones ------------------------------------------------

btSobreMi.addEventListener('click', (e) => {
    // e.preventDefault() -> evita que se ejecute el comportamiento por defecto del evento que se está manejando (el de <a>). En los enlaces el comportamiento por defecto es navegar o recargar la página, si no lo pongo capaz que la pagina hace un salto o pierdo datos al intentear recargar.
    e.preventDefault()
    modalSobreMi.show()
    btOk.addEventListener('click', (e) => {
        modalSobreMi.hide()
    })
})

btBuscar.addEventListener('click', (e) => {
    e.preventDefault()
    ejecutarBusqueda()
})

inputBuscar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        ejecutarBusqueda()
    }
})

// (2)

//*************************************************************
// LLAMO LAS FUNCIONES
//*************************************************************


