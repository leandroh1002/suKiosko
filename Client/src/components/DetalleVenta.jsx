import React from 'react'

function DetalleVenta() {
  return (
    <div className='w-[530px] h-[850px] bg-slate-500 flex flex-col items-center'>
      <button>Canastito</button>
      <div className='w-[160px] h-[160px] rounded-full bg-yellow-200'>
        <img src="" alt="imagendelproducto" />
      </div>
      <h3>NombreProducto</h3>
      <p>Precio</p>
      <input type="number" />
      <button>Agregar</button>
      <button>Pagar</button>
    </div>
  )
}

export default DetalleVenta