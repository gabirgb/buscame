// modalSobreMi.js

export function inicializarModalSobreMi() {
    const sobreMi = document.getElementById('sobre-mi')
    const btSobreMi = document.getElementById('bt-sobre-mi')
    const btOk = document.getElementById('bt-ok')

    if (!sobreMi || !btSobreMi || !btOk) return //? que retorna?

    const modal = new bootstrap.Modal(sobreMi)

    btSobreMi.addEventListener('click', (e) => {
        e.preventDefault()
        modal.show()
    })

    btOk.addEventListener('click', () => {
        modal.hide()
    })
}
