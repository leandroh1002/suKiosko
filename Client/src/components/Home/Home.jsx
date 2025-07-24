import React from 'react';
import { Link } from 'react-router-dom';
import PATHROUTES from '../../helpers/PathRoutes.helper';
import GestionarImage from '../../assets/LandingImages/BusinessStrategy.png';
import VenderImage from '../../assets/LandingImages/Taskmanagement.png';


function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-4 pt-20">
      <h1 className="text-5xl font-bold text-gray-800 mb-16">Bienvenido a Su Almacen!</h1>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
        <Link to={PATHROUTES.GESTIONAR} className="flex-1 group block relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105 group-hover:brightness-75"
            style={{ backgroundImage: `url(${GestionarImage})` }}
          ></div>
          <div className="relative p-8 flex items-center justify-center h-64 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-colors duration-300">
            <h2 className="text-white text-4xl font-bold z-10">Gestionar</h2>
          </div>
        </Link>
        <Link to={PATHROUTES.VENDER} className="flex-1 group block relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105 group-hover:brightness-75"
            style={{ backgroundImage: `url(${VenderImage})` }}
          ></div>
          <div className="relative p-8 flex items-center justify-center h-64 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-colors duration-300">
            <h2 className="text-white text-4xl font-bold z-10">Vender</h2>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Home;