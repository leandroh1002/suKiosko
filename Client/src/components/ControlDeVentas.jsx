import React from 'react'

function ControlDeVentas() {
  return (
    <div>
        <p className='text-center text-lg font-semibold'>Control de Ventas</p>
        <div className='flex justify-around h-14'>
            <button className='bg-[#A64208] text-white font-normal p-2 rounded-lg cursor-pointer px-5 py-2 hover:bg-[#b45d2b] transition duration-75 transform hover:scale-105 active:bg-[#F2B138] active:scale-90'>Ver Ventas</button>
            <button className='bg-[#A64208] text-white font-normal p-2 rounded-lg cursor-pointer px-5 py-2 hover:bg-[#b45d2b] transition duration-75 transform hover:scale-105 active:bg-[#F2B138] active:scale-90'>Generar Reporte</button>

            <button className='bg-[#A64208] text-white font-normal p-2 rounded-lg cursor-pointer px-5 py-2 hover:bg-[#b45d2b] transition duration-75 transform hover:scale-105 active:bg-[#F2B138] active:scale-90'>Exportar Datos</button>
        </div>
    </div>
  )
}

export default ControlDeVentas