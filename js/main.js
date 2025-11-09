// TO-DO 
// 2) agregar un listener para q a medida q va tipeando se muestren las busquedas previas
// 3) agregar un "borrar historial de busquedas"
// 4) mejorar el diseño q es un horrorrrrrrr
// 5) agregar fecha "desde - hasta" para la busqueda, seleccion de idioma y categoria
// 6) paginacion
// 7) depurar noticias q vienen mal armadas, que les falta algun dato o imagen
// 8) poner el %20 para separar los terminos cuando tengo mas de una palabra en las busquedas
// PROBLEMA: no logro que funcione la paginacion, al hacer clic en pag sig "q-buscar" se esta guardando mal en localstorage, y no logro aumentar el indice de pagina con ++, resta ademas armar la f para pag anterior haciendo "historial-1" 

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

const inputBuscar = document.getElementById('input-buscar')
const btBuscar = document.getElementById('bt-buscar')



//*************************************************************
// DEFINO FUNCIONES
//*************************************************************

// voy a probar si se puede eliminar la creacion de texto - FUNCIONA!
function ejecutarBusqueda() {
    // tomo el valor del input del buscador
    inputBuscar.value.trim()
    // si no está vacio, lo guardo en localstorage
    localStorage.setItem('q-buscar', inputBuscar.value)
    // reinicio pagina
    localStorage.setItem("pagina", 1)
    // remuevo el pageString de la busqueda actual para evitar residuos
    localStorage.removeItem("nextPageString")
    // recargo la pagina
    window.location.href = "./pages/resultados.html"
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


