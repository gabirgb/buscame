import { navegarPagina } from './helpers.js'

//via C 1ra busqueda viniendo desde index - no hay nextPageString en LS pero SI HAY GUARDADO nuevoTokenNPS EN LS
export function paginar(total, nextPageToken) {
    console.log("4- Via D: nextPageToken recibido en paginar(): ", nextPageToken)
    // FORMA RESUMIDA/ ABREVIADA DE FALLBACKS EN CASCADA
    // a "const pagina" se le asigna el valor "parseInt(localStorage.getItem("pagina"))", que en el caso que sea "falsy" (es decir: null, undefined, NaN, 0, "", etc.) toma el siguiente valor indicado, en este caso "1"
    // se pueden concatenar varios valores posibles, el primer "truthy" que encuentra es el que se asigna.
    // siempre se evalua de izq a der. Por ej:
    // const pagina = parseInt(localStorage.getItem("pagina")) || parseInt(localStorage.getItem("otroElemento")) || 1

    // traigo el número de página, si no está guardado le asigno valor 1 porque significa q es busqueda nueva
    const pagina = parseInt(localStorage.getItem("pagina")) || 1

    // calculo cantidad de paginas, 10 es la cantidad de articulos que vienen en cada peti en el plan free
    const cantPaginas = Math.ceil(total / 10)
    const container = document.getElementById('paginacion-container')
    if (!container) return // Evita el error si no existe el contenedor

    let textoPaginador = `<p>Página ${pagina} de ${cantPaginas}</p><p>`
    if (pagina > 1) textoPaginador += `<a href="#" id="pag-ant">&lt;&lt; Anterior</a> `

    // condicion inicial:                                                   if (pagina < cantPaginas)
    // concatenar contenido al final de la variable "textoPaginador":       textoPaginador +=
    // template literal `${...} -> todo el resto de la sentencia:
    // `${pagina > 1 ? '-' : ''} <a href="#" id="pag-sig">Siguiente &gt;&gt;</a>`
    // OJO LO IMPORTANTE ES EL OPERADOR TERNARIO Q CONSTRUIMOS DENTRO DE LA VAR ${}:
    // Operador ternario:                                                   pagina > 1 ? '-' : ''
    // ESTO es lo que nos separa la logica para mostrar el separador:
    // - Si pagina > 1, se agrega un guion '-'.
    // - Si no, se agrega una cadena vacía ''.
    // el testo es puro html para hacer el link: <a href="#" id="pag-sig">Siguiente &gt;&gt;</a>
    if (pagina < cantPaginas) textoPaginador += `${pagina > 1 ? '-' : ''} <a href="#" id="pag-sig">Siguiente &gt;&gt;</a>`
    textoPaginador += `</p>`
    container.innerHTML = textoPaginador

    const pagAnt = document.getElementById('pag-ant')
    const pagSig = document.getElementById('pag-sig')

    //si existen los elementos, escucho sus eventos
    if (pagAnt) pagAnt.addEventListener('click', () => navegarPagina("anterior"))
    if (pagSig) pagSig.addEventListener('click', () => navegarPagina("siguiente", nextPageToken))
}