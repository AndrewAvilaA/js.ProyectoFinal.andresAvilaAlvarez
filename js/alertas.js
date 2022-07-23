const mensajeLimpieza = ()=>{
    Swal.fire(
        '¡Listo!',
        'Se ha limpiado el historial',
        'success'
      )
}

const mensajeNoData = ()=>{
    Swal.fire(
        'No hay coincidencias',
        '¿Querés probar otra búsqueda?',
        'question'
      )
}

const cartelInvalido = ()=>{
    Swal.fire(
        '¡El campo está vacío!',
        'Probá escribiendo un nombre, apodo o mensaje',
        'error'
      )
}

const noSearch = ()=>{
  footerBusquedaDOM.innerHTML = `<h5 class="m-3">Lo sentimos, ¡no encontramos resultados!</h5>`
  Swal.fire(
      '¡El campo está vacío!',
      'Probá buscando por nombre o categoría',
      'error'
    )
}

const mensajeDespedida = ()=>{
  Swal.fire(
      '¡Muchas gracias por tu compra!',
      'El pedido de Deepika Tejidos te llegará en breve.',
      'success'
    )
}