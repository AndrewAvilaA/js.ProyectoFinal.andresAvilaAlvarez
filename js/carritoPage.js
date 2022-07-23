document.addEventListener("DOMContentLoaded", ()=> { // Llena el carrito en carrito.html
    if (localStorage.getItem('carrito')){
         carrito = JSON.parse(localStorage.getItem('carrito'))
         llenarCarrito()
     }
})