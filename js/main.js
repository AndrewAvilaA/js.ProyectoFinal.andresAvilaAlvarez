// Trae los productos desde la API hacia el DOM (en index.html)
const mostrarCatalogo = (URL)=> { 
    let visualizacion = ""
        fetch(URL)
            .then((response)=> response.json())
            .then((data)=>{
                for (contenido of data) {
                    visualizacion += retornoElContenido(contenido)
                    catalogoDOM.innerHTML = visualizacion
                }
            })
}

document.addEventListener("DOMContentLoaded", ()=> {
    mostrarCatalogo(URL)
    traerCatalogo(URL)
    if (localStorage.getItem('carrito')){
         carrito = JSON.parse(localStorage.getItem('carrito'))
         llenarCarrito()
     }
})

busquedaDOM.addEventListener('click', (e)=> {
    agregaCarrito(e)
})

catalogoDOM.addEventListener('click', (e)=> {
    agregaCarrito(e)
})