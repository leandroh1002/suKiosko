import React from 'react'
import { Link } from 'react-router-dom'
import PATHROUTES from '../helpers/PathRoutes.helper'
import DetalleVenta from './DetalleVenta'
import ListaProducto from './ListaProducto'

function Vender() {
  return (
    <div>
        <div className='flex justify-center'>
        <ListaProducto/>
        <DetalleVenta/>
        </div>
        <Link to={PATHROUTES.LANDING}><button className='bg-[#A64208] text-white font-normal p-2 rounded-lg cursor-pointer px-5 py-2 hover:bg-[#b45d2b] transition duration-75 transform hover:scale-105 active:bg-[#F2B138] active:scale-90'>Volver</button></Link>
    </div>
  )
}

export default Vender