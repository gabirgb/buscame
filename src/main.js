// TO-DO 
// 2) agregar un listener para q a medida q va tipeando se muestren las busquedas previas
// 3) agregar un "borrar historial de busquedas"
// 4) mejorar el diseño q es un horrorrrrrrr
// 5) agregar fecha "desde - hasta" para la busqueda, seleccion de idioma y categoria
// 7) depurar noticias q vienen mal armadas, que les falta algun dato o imagen
// 8) poner el %20 para separar los terminos cuando tengo mas de una palabra en las busquedas

// PROBLEMA: la paginacion no funciona con historial-1 porque:
// a- se basa en tokens generados dinamicamente que no puedo consultar
// b- la navegacion se ejecuta sin recargar la página, por lo que history-1 me devuelve al index o queda colgado
// SOLUCION: Si tu paginación usa tokens (nextPageToken) y no modifica la URL, usar history.back() retrocederá en el historial de la pestaña; si necesitas que el historial guarde estados (para que back restaure un token/resultado), deberías usar history.pushState()/replaceState() al cambiar página y manejar popstate para reemitir la consulta a newsdata.io. Para eso revisá los recursos de la History API listados arriba (MDN y CSS-Tricks).
// Cómo manipular el historial: https://developer.mozilla.org/es/docs/Web/API/History_API
// Metodo PUSH State: https://developer.mozilla.org/es/docs/Web/API/History_API#M%C3%A9todos_de_history

// VARIABLES CONSTANTES ENTRE ARCHIVOS
// Como estoy usando import y export, cada archivo es un módulo independiente, y las variables const que declaro no son globales entre archivos. Solo puedo acceder a ellas si las exporto explícitamente.
// Constantes globales (API key, idioma, etc.)
// POR AHORA NO ES NECESARIO, PERO PARA TENER EN CUENTA Q PUEDO ARMAR UN ARCHIVO CONFIG.JS Y AHI GUARDAR LAS CONST

// API Noticias: NewsData.io
// URL = " https://newsdata.io/api/1/latest?apikey=pub_0dd1e5de885f4957a9053481e57d279b&q=pizza"

// CONVENCION DE ARCHIVOS Y QUÉ GUARDAN
// main.js               // Punto de entrada: inicializa todo
// apiNoticias.js        // Lógica de conexión con NewsData.io
// paginacion.js         // Lógica de paginación y navegación
// uiEventos.js          // Listeners y eventos del DOM
// renderNoticias.js     // Renderizado de cards y resultados
// helpers.js            // Funciones utilitarias (localStorage, validaciones, etc.)
// modalSobreMi.js       // Lógica del modal "Sobre mí"
// config.js             // Constantes globales (API key, idioma, etc.)
// controlers.js         // coordina la funcionalidad entre helpers y API.

// CONVENCION DE ESTRUCTURA DE CARPETAS
// Si el proyecto crece, puedo agrupar los archivos por tipo:
// js/
// ├─ api/
// │   └─ apiNoticias.js
// ├─ ui/
// │   ├─ uiEventos.js
// │   └─ renderNoticias.js
// ├─ utils/
// │   └─ helpers.js
// │   └─ controlers.js
// ├─ config.js
// └─ main.js


// MODULOS CONVENCIONALES QUE PODRÍA SUMAR A FUTURO
// └─ services/ — Servicios externos o internos
// Para encapsular lógica que interactúa con APIs, bases de datos, o almacenamiento.
// archivo             | rol
// noticiasService.js | Encapsula llamadas a la API de noticias, con funciones como buscarNoticias(), filtrarPorSentimiento()
// storageService.js | Abstrae el uso de localStorage o sessionStorage con funciones como guardarBusqueda()

// └─ components/ — Componentes visuales reutilizables
// Ideal si empiezo a generar HTML dinámico más complejo.
// archivo             | rol
// cardNoticia.js      | Devuelve el HTML de una card con una noticia, como función pura
// modalSobreMi.js     | Genera o controla el modal “Sobre mí”

// └─ state/ — Estado de la aplicación
// Si la app crece y necesito manejar estados (paginación, filtros, usuario, etc.)
// archivo      | rol
// appState.js  | Guarda y actualiza el estado actual (página, búsqueda activa, resultados)
// eventBus.js  | Sistema simple para comunicar módulos entre sí (pub/sub)

// └─ tests/ — Pruebas unitarias
// para validar q las funciones hacen lo que deben.
// archivo                  | rol
// helpers.test.js          | Prueba funciones como getParametrosBusqueda()
// renderNoticias.test.js   | Verifica que mostrarCards() renderice correctamente

//  └─ utils/ — Utilidades genérica
// Funciones que no pertenecen a un módulo específico pero se usan en varios
// archivo          | rol
// formatFecha.js   | Convierte fechas a formato legible
// limpiarTexto.js  | Sanitiza strings para evitar errores o inyecciones

//  └─ i18n/ — Internacionalización
// Si quiero que la app soporte varios idiomas.
// archivo              | rol
// es.js, en.js, ...    | Diccionarios de traducción
// i18n.js              | Función t(clave) para traducir textos dinámicamente

//  └─ router/ — Navegación interna
// Si la app tiene múltiples vistas o páginas internas.
// archivo      | rol
// router.js    | Si tu app tiene múltiples vistas o páginas internas.
// routes.js    | Define las rutas disponibles y sus componentes asociado

// ¿Cómo definir cuándo modularizar?
// - Cuando una función crece demasiado o tiene responsabilidades múltiples.
// - Cuando quiero reutilizar lógica en distintos lugares.
// - Cuando necesito testear o refactorizar sin romper todo.




import { obtenerNoticias } from './apiNoticias.js'
import { escucharSobreMi, escucharBusqueda, volverInicio } from './uiEventos.js'
import { inicializarModalSobreMi } from './modalSobreMi.js'

// capturo la ur desde donde realizo la busqueda
const pathname = window.location.pathname

if (pathname.endsWith('index.html') || pathname === '/' || pathname.endsWith('/')) {
    escucharBusqueda("index")
    volverInicio()
    escucharSobreMi()
    inicializarModalSobreMi()
}

if (pathname.endsWith('resultados.html')) {
    escucharBusqueda("resultados") // para búsquedas internas
    volverInicio()
    escucharSobreMi()
    obtenerNoticias()  // solo se ejecuta en resultados.html
    inicializarModalSobreMi()
}
