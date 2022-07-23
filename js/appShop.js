let carrito = {}
const productos = [] //Se carga con el JSON vía URL

const URL = `js/api.json`
const catalogoDOM = document.querySelector("#catalogoDOM")
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
const spanCarrito = document.getElementById('spanCarrito')
const botonConfirma = document.getElementById('botonConfirma')

items.addEventListener('click', (e) => {
    botonValor(e)
})

const retornoElContenido = (contenido)=> {
    const {nombre, tipo, precio, descripcion, id} = contenido
    return `<div class="col-sm-6">
                <div class="card text-center m-2 text-bg-light">
                    <div class="card-body texto-card">
                        <h5 class="m-3">${nombre}</h5>
                        <p class="fs-6">${tipo}</p>
                        <p class="fs-6">${descripcion}</p>
                        <p class="fs-5">Precio: <p class="fs-5">${precio}</p></p>
                        <button type="button" class="btn btn-outline-secondary btn-items" data-id="${id}">Agregar al carrito</button>
                    </div>
                </div>
            </div>
            `
}


// Construye productos desde el fetch para trabajar con un array de objetos
class Producto {
    constructor(nombre, tipo, precio, descripcion, id) {
        this.nombre = nombre
        this.tipo = tipo
        this.precio = precio
        this.descripcion = descripcion
        this.id = id
    }
}

// Trae los productos desde la API hacia un array de objetos local, para usar la función de búsqueda
const traerCatalogo = (URL)=> { 
    fetch(URL)
        .then((response)=> response.json())
        .then((data)=>{
            for (contenido of data) {
                constructorProductos(contenido)
            }
        })
}

const constructorProductos = (producto) => {
    const {nombre, tipo, precio, descripcion, id} = producto
    productos.push(new Producto(`${nombre}`, `${tipo}`, `${precio}`, `${descripcion}`, `${id}`)) 
}

const hayCarrito = () => { // Pregunta si hay un carrito en el Local Storage, para adecuar el DOM
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
            if(Object.values(carrito).length === 0){
            spanCarrito.innerHTML = ''
            botonConfirma.innerHTML = ''
            }else{
                spanCarrito.innerHTML = '<span>Artículos en carrito!</span>'
                botonConfirma.innerHTML = `<button type="button" class="btn btn-outline-secondary btn-confirma">¡Comprar!</button>`
            }
    }
}

//Agrega elementos al carrito, que pueden ser productos del catálogo o carteles cotizados por el usuario
const agregaCarrito = (e)=>{
    if (e.target.classList.contains('btn-items')){ // Coloca productos del catálogo
        setCarrito(e.target.parentElement)
    }
    if (e.target.classList.contains('btn-cartel')){ // Coloca carteles del usuario
        setCartel(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCartel = objeto => { // Coloca carteles creados por el usuario en el carrito
    const producto = {
        id: objeto.querySelector('.btn-cartel').dataset.id,
        nombre: "Cartel "+(objeto.querySelector('p').textContent),
        precio: objeto.querySelector('span').textContent,
        cantidad: 1
    }

    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {...producto}
    llenarCarrito()
}

const setCarrito = objeto => { // Coloca productos del catálogo en el carrito
    const producto = {
        id: objeto.querySelector('.btn-items').dataset.id,
        nombre: objeto.querySelector('h5').textContent,
        precio: objeto.querySelectorAll('.fs-5')[1].textContent,
        cantidad: 1
    }

    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {...producto}
    llenarCarrito()
}

const llenarCarrito = () => { // Muestra el carrito en el DOM y setea el objeto 'carrito' en Local Storage
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    llenarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
    hayCarrito()
}

const llenarFooter = ()=> { // Arma, en el DOM, el footer del carrito
    footer.innerHTML = ''
    if(Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Tu carrito está vacío.</th>
        `
        return
    }

    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad,0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio,0)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const botonVaciar = document.getElementById('vaciar-carrito')

    botonVaciar.addEventListener('click', ()=> {
        carrito = {}
        llenarCarrito()
    })
}

const botonValor = (e) => { // Botonera para modificar cantidades de items en el carrito
    if (e.target.classList.contains('btn-info')){
        carrito[e.target.dataset.id]
        const producto = carrito[e.target.dataset.id]
        producto.cantidad = carrito[e.target.dataset.id].cantidad +1
        llenarCarrito()
    } else if (e.target.classList.contains('btn-danger')){
        carrito[e.target.dataset.id]
        const producto = carrito[e.target.dataset.id]
        producto.cantidad = carrito[e.target.dataset.id].cantidad -1
        if (producto.cantidad === 0){
            delete carrito[e.target.dataset.id]
        }
        llenarCarrito()
    }
}


// Confirmación final de compra --->
botonConfirma.addEventListener('click', (e) => {
    confirmacion(e)
})

const confirmacion = (e) => {
    if (e.target.classList.contains('btn-confirma')){
        Swal.fire({
            title: '¡Todo listo!',
            text: " ¿Confirmar la compra?",
            icon: 'info',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('carrito')
                footer.innerHTML = `<th scope="row" colspan="5">Tu carrito está vacío.</th>`
                items.innerHTML = ""
                botonConfirma.innerHTML = ""
                spanCarrito.innerHTML = ""
                carrito = {}
                mensajeDespedida()
            }
          })
    }
}