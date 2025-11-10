import { obtenerNoticias } from './apiNoticias.js'

export function getParametrosBusqueda(nextPage = null) {
    // Recupero término de búsqueda
    // const impide que la variable sea REASIGNADA.
    // pero NO IMPIDE QUE EL VALOR INTERNO CAMBIE, si ese valor es un objeto o array.

    const qBuscar = localStorage.getItem("q-buscar") || ""
    // Si bien No hay q guardar nextPgeString en LS, sí necesito pasarla de una página a otra para hacer la busqueda
    // si existe la tomo y la uso en la busqueda
    // si no existe se que estoy en una busqueda nueva
    const nextPageLastFetch = localStorage.getItem("nextPageString")
    const apiKey = "pub_0dd1e5de885f4957a9053481e57d279b"
    const sentimiento = "%20feliz"
    const idioma = "es"

    // URL base sin nextPageString
    const baseURL = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${qBuscar}${sentimiento}&language=${idioma}`
    // URL con nextPageString de la ultima peticion q se realizó
    const URL = nextPageLastFetch ? `${baseURL}&page=${nextPageLastFetch}` : baseURL

    console.log("URL actualizada: ", URL)

    return { qBuscar, URL }
}

// realizo una NUEVA busqueda, se ejecuta con enter en inputBuscar o clic en btBuscar 
// la llamo desde uiEventos.js desde los listeners del input+enter o boton+clic
// boton.addEventListener('click', e => {
//     e.preventDefault()
//     ejecutarBusqueda(input.value)
// })

// input.addEventListener('keydown', e => {
//     if (e.key === 'Enter') {
//         e.preventDefault()
//         ejecutarBusqueda(input.value)
//     }
// })
export function resetBusquedaNueva(texto) {
    if (texto.trim() !== "") {
        // si no está vacio, lo guardo en localstorage
        localStorage.setItem('q-buscar', texto.trim())
        // reinicio pagina
        localStorage.setItem("pagina", 1)
        // remuevo LS
        // limpiarLS({ borrarQuery: true, borrarPag: true })
        limpiarLS({ borrarNext: true, borrarRdos: true })
    }
}

// la llamo desde paginacion.js:
// const pagAnt = document.getElementById('pag-ant')
// const pagSig = document.getElementById('pag-sig')
// if (pagAnt) pagAnt.addEventListener('click', () => navegarPagina("anterior"))
// if (pagSig) pagSig.addEventListener('click', () => navegarPagina("siguiente"))

// recibo nuevoTokenNPS como "nextPageToken"
export function navegarPagina(direccion, nextPageToken = null) {
    console.log("5- Via D: nextPageToken recibido en navegacionPagina(): ", nextPageToken)
    console.log("6- comparar si sigue siendo el mismo que el LS: ", nextPageToken)
    // capturo el num de pagina
    let pagina = parseInt(localStorage.getItem("pagina")) || 1

    // sumo o resto 1 a página segun la direccion 
    if (direccion === "siguiente") pagina++
    if (direccion === "anterior" && pagina > 1) pagina--

    // guardo el nuevo num de pag
    localStorage.setItem("pagina", pagina)

    // Solo pasamos el token si vamos hacia adelante
    //! Ojo voy a tratar de ponerle "nuevoTokenNPS" de nombre a esta const (que antes se llamaba "const token") a ver si puedo mantenerme dentro de los mismos nombres, si no me matero con tantas vars q vanejan el mismo valor de dato...
    const nuevoTokenNPS = direccion === "siguiente" ? nextPageToken : null
    console.log("7- Via D: nuevoTokenNPS en navegarPagina() que le paso a obtenerBoticias() al hacer clic en siguienre: ", nextPageToken)

    if (direccion === "siguiente") {
        obtenerNoticias(nuevoTokenNPS);
    } else {
        window.history.back();
    }
}

// funcion para borrar el LS segun las claves q le indique
// clic en el logo borra todas
// clic en busqueda nueva en resultados.html borra next y rdos (a los otros 2 LS se les asigna nuevo val )
// para usarla la invoco asi:
// limpiarLS({ borrarQuery: true, borrarPag: true })
export function limpiarLS({ borrarQuery = false, borrarPag = false, borrarNext = false, borrarRdos = false } = {}) {
    if (borrarQuery) localStorage.removeItem('q-buscar');
    if (borrarPag) localStorage.removeItem('pagina');
    if (borrarNext) localStorage.removeItem('nextPageString');
    if (borrarRdos) localStorage.removeItem('totalResultados');
}