const inputBuscar = document.querySelector("#inputBuscar")
const botonBuscar = document.getElementById("botonBuscar")
const footerBusquedaDOM = document.getElementById('footerBusquedaDOM')
const busquedaDOM = document.querySelector("#busquedaDOM")

function calcular (Cantidad, Valor){
    let precio = parseFloat(Cantidad * Valor)
    return precio
}

botonBuscar.addEventListener("click", busqueda)

inputBuscar.addEventListener("keyup", (e)=>{e.keyCode === 13 && busqueda()}) //Permite ejecutar la búsqueda apretando 'Enter' dentro del input.

function busqueda(){ // Filtra las búsquedas previendo el caso de que el input esté vacío
    inputBuscar.value.trim() === "" ? noSearch() : motorBusqueda()   
}

//Busca productos del catálogo en el array 'Productos' (por nombre y tipo) y los muestra en el DOM
function motorBusqueda(){ 
    let plantilla = ``
    let aBuscar = (inputBuscar.value).toUpperCase()
    let arrayResultados = productos.filter(l => l.nombre.includes(aBuscar) || l.tipo.includes(aBuscar))
    for (elemento of arrayResultados){
        plantilla += retornoElContenido(elemento)
        busquedaDOM.innerHTML = plantilla
    }
    footerBusquedaDOM.innerHTML = ''
    arrayResultados.length === 0 && noResults()
}

function noResults(){
    footerBusquedaDOM.innerHTML = `<h5 class="m-3">Lo sentimos, ¡no encontramos resultados!</h5>`
    mensajeNoData()
}