// API Noticias: NewsData.io
// URL = " https://newsdata.io/api/1/latest?apikey=pub_0dd1e5de885f4957a9053481e57d279b&q=pizza"

//*************************************************************
// DEFINO VARS
//*************************************************************
const apiKey = "pub_0dd1e5de885f4957a9053481e57d279b"
const sentimiento = "%20feliz"
let qBuscar
let idioma = "es"

// Vinculo HTML
const sobreMi = document.getElementById('sobre-mi')
const btSobreMi = document.getElementById('bt-sobre-mi')
const btOk = document.getElementById('bt-ok')
const noticiasContainer = document.getElementById('card-container')
const inputBuscar = document.getElementById('input-buscar')
const btBuscar = document.getElementById('bt-buscar')
//la primera vez q visito resultados.html no está definido el nextPageString
let nextPageString = ""

// al guardar la f dentro de la var, la var toma el valor de retorno: la pagina actual
let pagina = inicializarPagina()

// Recupero término de búsqueda
qBuscar = localStorage.getItem("q-buscar")
console.log("qBuscar que viene de la pag anterior: ", qBuscar)
inputBuscar.value = qBuscar

// Armo URL base
let URL = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${qBuscar}${sentimiento}&language=${idioma}`

// Si hay una pag sig guardada, la uso
// ESTO NO SIRVE PORQUE PAGINA A PAGINA EL STRING CAMBIA
const nextPageStored = localStorage.getItem("nextPageString")
if (nextPageStored) {
    URL += `&page=${nextPageStored}`
}


//*************************************************************
// DEFINO FUNCIONES
//*************************************************************

// PAGINACION
// Al cargar resultados.html checkeo si ya hay una pag en localStorage o si es la pag 1 
function inicializarPagina() {
    let pagina

    if (!localStorage.getItem("pagina")) {
        pagina = 1
        localStorage.setItem("pagina", pagina)
    } else {
        pagina = parseInt(localStorage.getItem("pagina"))
    }

    return pagina
}


// realizo una NUEVA busqueda, se ejecuta con enter en inputBuscar o clic en btBuscar 
function ejecutarBusqueda() {
    // tomo el valor del input del buscador
    inputBuscar.value.trim()
    if (inputBuscar !== "") {
        // si no está vacio, lo guardo en localstorage
        localStorage.setItem('q-buscar', inputBuscar.value)
        // reinicio pagina
        localStorage.setItem("pagina", 1)
        // remuevo el pageString de la busqueda actual para evitar residuos
        localStorage.removeItem("nextPageString")
        // recargo la pagina
        window.location.href = "./resultados.html"
    }
}

// Consulta API -------------------------------------------------------
function obtenerNoticias() {
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            // muestro los rdos totales o aviso q no hay rdos 
            numResultados(data.totalResults)
            // muestro las cards con los rdos
            mostrarCards(data.results)
            // guardo la string para pag sig
            nextPageString = data.nextPage
            localStorage.setItem("nextPageString", nextPageString)
            // muestro en qué pag estoy y btn ant/sig
            paginar(data.totalResults)
        })
        .catch(error =>
            console.log("Hubo un error: ", error)
        ) // si hay un error en la peticion lo capturo y q lo informe
        .finally(
            () => console.log("Finalizó la peticion")
        )
}


// muestro las cards con los rdos
function mostrarCards(listaNoticias) {
    listaNoticias.forEach(noticia => {
        const card = document.createElement('div')
        card.className = "card"
        card.innerHTML = `<img src="${noticia.image_url}" class="card-img-top" alt="${noticia.title}">
        <div class="card-body">
        <h5 class="card-title">${noticia.title}</h5>
                            <p class="card-text">${noticia.description}</p>
                            <a href="${noticia.link}" class="btn btn-primary">Ver más</a>
                        </div>`
        noticiasContainer.appendChild(card)
    })
}

// muestro los rdos totales o aviso q no hay rdos 
function numResultados(cantidad) {
    const resultado = document.getElementById('resultados-container')
    if (cantidad !== 0) {
        resultado.innerHTML = `<h2>Hay ${cantidad} resultados de búsqueda.</h2>`
    } else {
        resultado.innerHTML = `<h2>No hay resultados :(</h2>`
    }
}

// Paginacion
function paginar(cantidad) {
    // calculo cantidad de paginas, 10 es la cantidad de articulos que vienen en cada peti en el plan free
    let cantPaginas = Math.ceil(cantidad / 10)
    // vinculo la var con html
    const paginasContainer = document.getElementById('paginas-container')

    // defino qué mostrar si es 1ra, ultima o alguna de las pags intermedias
    if (pagina == 1) {
        // creo los elementos
        paginasContainer.innerHTML = `<p>Página ${pagina} de ${cantPaginas}</p>
        <p><a href="#" target="_self" id="pag-sig">Página siguiente &gt;&gt;</a></p>`
        // vinculo var con html
        pagSig = document.getElementById('pag-sig')
        escucharPagSig()
    } else if (pagina > 1 && pagina < cantPaginas) {
        // creo los elementos
        paginasContainer.innerHTML = `<p>Página ${pagina} de ${cantPaginas}</p>
        <p><a href="#" target="_self" id="pag-ant">&lt; &lt; Página anterior</a> - 
        <a href="#" target="_self" id="pag-sig">Página siguiente &gt;&gt;</a></p>`
        // vinculo var con html
        pagAnt = document.getElementById('pag-ant')
        pagSig = document.getElementById('pag-sig')
        escucharPagAnt()
        escucharPagSig()
    } else {
        // creo los elementos
        paginasContainer.innerHTML = `<p>Página ${pagina} de ${cantPaginas}</p>
        <p><a href="#" target="_self" id="pag-ant">&lt; &lt; Página anterior</a></p>`
        // vinculo var con html
        pagAnt = document.getElementById('pag-ant')
        escucharPagAnt()
    }
    // despues de crear y vincular los elementos, aplico la captura de eventos
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


function escucharPagSig() {
    pagSig.addEventListener('click', (e) => {
        e.preventDefault()
        // cambio la pagina
        let paginaActual = parseInt(localStorage.getItem("pagina"))
        localStorage.setItem("pagina", paginaActual + 1)
        window.location.href = "./resultados.html"
    })
}

function escucharPagAnt() {
    pagAnt.addEventListener('click', (e) => {
        e.preventDefault()
        // cambio la pagina
        let paginaActual = parseInt(localStorage.getItem("pagina"))
        if (paginaActual > 1) {
            localStorage.setItem("pagina", paginaActual - 1)
            localStorage.removeItem("nextPageString") // opcional, si querés forzar nueva consulta
            window.location.href = "./resultados.html"
        }
    })
}


//*************************************************************
// LLAMO LAS FUNCIONES
//*************************************************************
escucharSobreMi()
obtenerNoticias()