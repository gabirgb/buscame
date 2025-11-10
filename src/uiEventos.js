import { resetBusquedaNueva, limpiarLS } from './helpers.js'

export function escucharSobreMi() {
    const modal = new bootstrap.Modal(document.getElementById('sobre-mi'))
    document.getElementById('bt-sobre-mi').addEventListener('click', e => {
        e.preventDefault()
        modal.show()
        document.getElementById('bt-ok').addEventListener('click', () => modal.hide())
    })
}

//via A- vengo desde index a escucharBusqueda(), funciona todo bien y termino en resultados.html
//via B- vengo desde resultados.html a escucharBusqueda(),
export function escucharBusqueda(origen) {
    const input = document.getElementById('input-buscar')
    const boton = document.getElementById('bt-buscar')

    const manejarBusqueda = (e) => {
        e.preventDefault()
        const termino = input.value.trim()
        if (!termino) return

        localStorage.setItem('q-buscar', termino)
        localStorage.setItem("pagina", "1") // inicializo en 1 para q sea pag 1 en resultados.html
        resetBusquedaNueva(termino)

        // CONDICIONAL TERNARIO
        // variable o propiedad que recibe el valor = condición ? valorSiVerdadero : valorSiFalso
        window.Location.href = (origen === "index")
            ? window.location.href = './pages/resultados.html'
            : window.location.href = './resultados.html'
    }

    boton.addEventListener('click', manejarBusqueda)
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') manejarBusqueda(e)
    })
}

export function volverInicio() {
    const logo = document.getElementById('logo')

    const manejarBusqueda = (e) => {
        limpiarLS({ borrarQuery: true, borrarPag: true, borrarNext: true, borrarRdos: true })
        window.Location.href = "./index.html"
    }
    logo.addEventListener('click', manejarBusqueda)
}
