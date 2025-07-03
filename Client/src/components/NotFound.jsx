import React from 'react'
import { Link } from 'react-router-dom'
import PATHROUTES from '../helpers/PathRoutes.helper'

function NotFound() {
  return (
    <div>Error 404

      <h4>Pagina en construccion</h4>
      <Link to={PATHROUTES.LANDING}><button>Home</button></Link>
    </div>
  )
}

export default NotFound