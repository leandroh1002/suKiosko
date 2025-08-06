import React from 'react'
import PATHROUTES from '../helpers/PathRoutes.helper'
import { Link } from 'react-router-dom'
import AdminStatistics from './AdminStatistics/AdminStatistics'

function Gestionar() {

  return (
    <div className='grid min-h-dvh grid-rows-[auto_1fr_auto]'>
      <h2>Gestionar</h2>
      <div className='flex justify-around h-14'>
        <Link to={PATHROUTES.REVISIONSTOCK}>
        <button className='bg-[#A64208] text-white font-normal p-2 rounded-lg cursor-pointer px-5 py-2 hover:bg-[#b45d2b] transition duration-75 transform hover:scale-105 active:bg-[#F2B138] active:scale-90'>Revision de Stock</button></Link>
        <Link to={PATHROUTES.AGREGAR_PRODUCTOS}>
        <button className='bg-[#A64208] text-white font-normal p-2 rounded-lg cursor-pointer px-5 py-2 hover:bg-[#b45d2b] transition duration-75 transform hover:scale-105 active:bg-[#F2B138] active:scale-90'>Agregar Productos</button>
        </Link>
        <Link to={PATHROUTES.CONTROLDEVENTAS}>
        <button className='bg-[#a64208] text-white font-normal p-2 rounded-lg cursor-pointer px-5 py-2 hover:bg-[#b45d2b] transition duration-75 transform hover:scale-105 active:bg-[#F2B138] active:scale-90'>Control de Ventas</button>
        </Link>
        <Link to={PATHROUTES.RUBROS}>
        <button className='bg-[#a64208] text-white font-normal p-2 rounded-lg cursor-pointer px-5 py-2 hover:bg-[#b45d2b] transition duration-75 transform hover:scale-105 active:bg-[#F2B138] active:scale-90'>Rubros</button>
        </Link>
        <Link to={PATHROUTES.LISTAVENTAS}>
        <button className='bg-[#a64208] text-white font-normal p-2 rounded-lg cursor-pointer px-5 py-2 hover:bg-[#b45d2b] transition duration-75 transform hover:scale-105 active:bg-[#F2B138] active:scale-90'>Lista de Ventas</button>
        </Link>
      </div>

      <content>
       <AdminStatistics /> 
        {/* <ControlDeVentas /> */}
      </content>
      <footer>
      <Link to={PATHROUTES.HOME}><button className='bg-[#A64208] m-8 text-white font-normal p-2 rounded-lg cursor-pointer px-5 py-2 hover:bg-[#b45d2b] transition duration-75 transform hover:scale-105 active:bg-[#F2B138] active:scale-90'>Volver</button></Link>
      </footer>
    </div>
  )
}

export default Gestionar