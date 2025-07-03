import React from 'react'
import { Link } from 'react-router-dom'
import PATHROUTES from '../helpers/PathRoutes.helper'

function ControlVentas() {
  return (
    <div className='grid min-h-dvh grid-rows-[1fr]'>
        <content className='flex flex-wrap content-center justify-center flex-col'>
            <h4>Pagina en construccion</h4>
            <h3>Error 404</h3>
            <Link to={PATHROUTES.LANDING}><button className='bg-[#A64208] m-8 text-white font-normal p-2 rounded-lg cursor-pointer px-5 py-2 hover:bg-[#b45d2b] transition duration-75 transform hover:scale-105 active:bg-[#F2B138] active:scale-90'>Home</button></Link>
        </content>
        <footer>
        </footer>
  </div>
  )
}

export default ControlVentas