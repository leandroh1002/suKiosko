import React from 'react'
import { Link } from 'react-router-dom'
import PATHROUTES from '../helpers/PathRoutes.helper'
import DetalleVenta from './DetalleVenta'
import ListaProducto from './ListaProducto'

function Vender() {
  return (
    <div className="p-4 h-screen flex flex-col">
        <div className='flex flex-col lg:flex-row justify-center gap-4 flex-grow'>
            <div className="lg:w-[63%] lg:h-full">
                <ListaProducto/>
            </div>
            <div className="lg:w-[37%] lg:h-full">
                <DetalleVenta/>
            </div>
        </div>
        <Link to={PATHROUTES.HOME}>
            <button className='bg-[#A64208] text-white font-normal p-2 rounded-lg cursor-pointer px-5 py-2 hover:bg-[#b45d2b] transition duration-75 transform hover:scale-105 active:bg-[#F2B138] active:scale-90 mt-4'>
                Volver
            </button>
        </Link>
    </div>
  )
}

export default Vender