const submit = document.querySelector("#submit")
const eliminarTodo = document.querySelector("#deleteAll")
const mensaje = document.querySelector("#mensaje")
const listaMensajes = document.querySelector("#lista-mensajes")

let mensajes = []

document.addEventListener("DOMContentLoaded", recuperarMensajes)
submit.addEventListener("click", añadirMensaje)
eliminarTodo.addEventListener("click", borrarMensajes)

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
    mensajes = [...mensajes, {"id": "A"+new Date().getTime(), "message": mensaje.value}] //Las IDs en HTML no pueden empezar por numeros
    localStorage.setItem("Mensajes", JSON.stringify(mensajes))
    crearMensajeHTML()
}

function borrarMensaje(id) {
    mensajes = mensajes.filter((mensaje) => mensaje.id !== id)
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
        mensajeHTML.setAttribute("id", mensaje.id)
        mensajeHTML.textContent = mensaje.message
        listaMensajes.appendChild(mensajeHTML)

        const botonBorrarHTML = document.createElement("button")
        botonBorrarHTML.setAttribute("id", mensaje.id)
        botonBorrarHTML.textContent = "Borrar"
        listaMensajes.appendChild(botonBorrarHTML)
        botonBorrarHTML.querySelector = (mensaje.id)
        botonBorrarHTML.addEventListener("click", function() {
            borrarMensaje(botonBorrarHTML.getAttribute("id"))
        })
    })
}

function limpiarHTML() {
    while (listaMensajes.firstChild) {
        listaMensajes.removeChild(listaMensajes.firstChild)
    }
}