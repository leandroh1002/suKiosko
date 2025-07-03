import React from 'react'
import TableStock from './TableStock/TableStock'
import PATHROUTES from '../helpers/PathRoutes.helper'
import { Link } from 'react-router-dom'

function RevisionStock() {
  return (
    <div className='grid min-h-dvh grid-rows-[1fr_auto]'>
        <content className='flex flex-wrap content-center'>
            <TableStock />
        </content>
        <footer>
            <Link to={PATHROUTES.GESTIONAR}><button className='bg-[#A64208] m-8 text-white font-normal p-2 rounded-lg cursor-pointer px-5 py-2 hover:bg-[#b45d2b] transition duration-75 transform hover:scale-105 active:bg-[#F2B138] active:scale-90'>Volver</button></Link>
        </footer>
    </div>
  )
}

export default RevisionStock