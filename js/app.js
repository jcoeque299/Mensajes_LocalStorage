const submit = document.querySelector("#submit")
const eliminar = document.querySelector("#delete")
const mensaje = document.querySelector("#mensaje")
const listaMensajes = document.querySelector("#lista-mensajes")

let mensajes = []

document.addEventListener("DOMContentLoaded", recuperarMensajes)
submit.addEventListener("click", añadirMensaje)
eliminar.addEventListener("click", borrarMensajes)

function recuperarMensajes() {
    //Si se borra el almacenamiento interno, o nunca ha existido un almacenamiento interno, dará error por ser null
    if (localStorage.getItem("Mensajes") === null) {
        localStorage.setItem("Mensajes", "")
    }
    else {
        mensajes = JSON.parse(localStorage.getItem("Mensajes"))
    }
    crearMensajeHTML()
}

function añadirMensaje(e) {
    e.preventDefault()
    mensajes = [...mensajes, mensaje.value]
    localStorage.setItem("Mensajes", JSON.stringify(mensajes))
    crearMensajeHTML()
}

function borrarMensajes(e) {
    e.preventDefault()
    mensajes = []
    localStorage.setItem("Mensajes", JSON.stringify(mensajes))
    crearMensajeHTML()
}

function crearMensajeHTML() {
    limpiarHTML()
    mensajes.forEach((mensaje) => {
        const mensajeHTML = document.createElement("p")
        mensajeHTML.textContent = mensaje
        listaMensajes.appendChild(mensajeHTML)
    })
}

function limpiarHTML() {
    while (listaMensajes.firstChild) {
        listaMensajes.removeChild(listaMensajes.firstChild)
    }
}