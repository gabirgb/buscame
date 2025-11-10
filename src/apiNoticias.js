import { mostrarCards, numResultados } from './renderNoticias.js'
import { paginar } from './paginacion.js'
import { getParametrosBusqueda } from './helpers.js'

//via C 1ra busqueda viniendo desde index - no hay nextPageString en LS 
//via D, haciendo clic en siguiente en la 1ra pagina
// "nextPageLastFetch = null" es el valor por defecto de ese parametro. si to paso otro sobreescribe el param x defecto 
export async function obtenerNoticias(nextPageLastFetch = null) {
    console.log("1- Via D: nuevoTokenNPS recibido para pbtener noticias: ", nextPageLastFetch)
    try {
        // DESESTRUCTURACION DE OBJETOS:
        // cuando uso el nombre de la variable entre llaves, significa: “extraé la propiedad URL del objeto que devuelve la función y guardala en una variable llamada URL”.
        // recordar que getParametrosBusqueda() tiene "return { qBuscar, URL }", o sea un objeto.
        // lo mismo si tuviese estas 3 lineas:
        // const resultado = getParametrosBusqueda()
        // const qBuscar = resultado.qBuscar
        // const URL = resultado.URL
        // puedo escribir todo eso mismo en una sola linea para que quede más compacto:
        // const { qBuscar, URL } = getParametrosBusqueda()

        // paso de param null xq no hay NPS (porque es una busqueda nueva)
        const { URL } = getParametrosBusqueda(nextPageLastFetch)

        const response = await fetch(URL)
        const data = await response.json()

        const noticias = data.results || []

        // Guardamos en VARS el nuevo token nextPageString (nuevoTokenNPS) y rdos totales para la próxima página
        const nuevoTokenNPS = data.nextPage || null
        console.log("2- Via D: nuevoTokenNPS recibido despues del nuevo fetch: ", nuevoTokenNPS, " = ", data.nextPage)
        console.log("3- revisar si el q se guarda en LS es: ", nuevoTokenNPS, " = ", data.nextPage)

        const noticiasTotales = data.totalResults || null

        // Guardamos en LS el nuevo token y rdos totales para la próxima página
        localStorage.setItem("nextPageString", nuevoTokenNPS)
        localStorage.setItem("totalResultados", noticiasTotales)

        // muestro en qué pag estoy y btn ant/sig
        // le paso el nuevoTokenNPS para que pueda armar el link "siguiente"
        paginar(noticiasTotales, nuevoTokenNPS)
        mostrarCards(noticias)
        numResultados(noticiasTotales)

    } catch (error) {
        console.error("Error al obtener noticias:", error)
    } finally {
        console.log("Finalizó la peticion")
    }
}
