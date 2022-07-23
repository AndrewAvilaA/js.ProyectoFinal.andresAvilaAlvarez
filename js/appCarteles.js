let cartelesValuados = [] 

const precioLetra = 500
const botonCartel = document.getElementById("botonCartel")
const cartelPersonal = document.getElementById("cartelPersonal")
const inputCartel = document.querySelector("#inputCartel")
const botonClearStorage = document.querySelector("#botonClearStorage")
const botonListarCarteles = document.querySelector("#botonListarCarteles")
const botonOcultarCarteles = document.querySelector("#botonOcultarCarteles")

class CartelValuado { // Crea objetos a partir de los carteles cotizados por el usuario
    constructor(nombre, precio, id, cantidad){
        this.nombre = nombre
        this.precio = precio
        this.id = id
        this.cantidad = cantidad
    }
}

inputCartel.addEventListener("keyup", (e)=>{e.keyCode === 13 && evaluarCartel()}) //Permite evaluar un cartel apretando 'Enter' dentro del input.

botonCartel.addEventListener("click", evaluarCartel)

function evaluarCartel(){ // Evalúa si el input está vacío
    inputCartel.value.trim() === "" ? cartelInvalido() : presupuestarCartel()   
}

function presupuestarCartel(){ // Crea un objeto con nombre y precio a partir del valor ingresado por el usuario y lo muestra en el DOM
    cartelPersonalDOM.innerHTML = ""
    let cartel = inputCartel.value
    let letras = cartel.length
    let precio = calcular (letras, precioLetra)
    let id = parseInt(Math.random()*10000)
    let cantidad = 1
    cartelPersonalDOM.innerHTML += "<h3>"+cartel.toUpperCase()+"</h3><p> ¡Gracias por tu consulta! 😊 Este cartel tiene un valor de "+precio+" pesos.</p>"
    inputCartel.value = ""
        cartelesValuados.push(new CartelValuado(cartel.toUpperCase(), precio, id, cantidad))
        localStorage.setItem("cartelesValuados", JSON.stringify (cartelesValuados))
        listarCarteles()
}

const recuperarCartelesValuados = () => { //Recupera todos los carteles que el usuario presupuestó
    if (localStorage.getItem("cartelesValuados")){
        let cart = JSON.parse(localStorage.getItem("cartelesValuados"))
            for (elemento of cart){
                cartelesValuados.push(elemento)
            }
    }
}

recuperarCartelesValuados()

const ul = document.getElementById("listaDeCarteles")

const listarCarteles = () => { //Muestra en el DOM todos los carteles que el usuario presupuestó
    ul.innerHTML = ``
    if (localStorage.getItem("cartelesValuados")){
        let cart = JSON.parse(localStorage.getItem("cartelesValuados"))
            for (elemento of cart){
                ul.innerHTML += `<li class="p-2"><p>${elemento.nombre}</p> <span>${elemento.precio}</span> $<button type="button" class="btn btn-outline-secondary ms-4 btn-cartel" data-id="${elemento.id}">Agregar al carrito</button></li>`
            }
    }else{
        ul.innerHTML = `<p>No hay ningún cartel presupuestado.</p>`
    }
}

const ocultarCarteles = () => { //Oculta en el DOM los carteles presupuestados
    ul.innerHTML = ""
}

botonOcultarCarteles.addEventListener ("click", ocultarCarteles)

botonListarCarteles.addEventListener ("click", listarCarteles)

//Borrar el historial de carteles tasados. Este elemento del storage no se elimina al finalizar una compra. La idea es que el usuario pueda almacenar sus propias cotizaciones a lo largo del tiempo, intependientemente de la compra que realiza en el momento --->
botonClearStorage.addEventListener ("click", ()=>{ 
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Todas las búsquedas y presupuestos van a ser borrados",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            ul.innerHTML = ``
            cartelPersonalDOM.innerHTML = `<h5>Escribí el nombre o mensaje que querés en tu cartel. Vamos a decirte cuánto cuesta 😊</h5>`
            cartelesValuados = []
            localStorage.removeItem('cartelesValuados')
            mensajeLimpieza()
        }
      })
})

ul.addEventListener('click', (e)=>{
    agregaCarrito(e)
})