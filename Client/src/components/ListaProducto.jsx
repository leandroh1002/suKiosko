import React, { useState } from 'react';
import FindUserAdmin from './FindUserAdmin/FindUserAdmin';
import VentaFraccionadaModal from './VentaFraccionadaModal'; // Importar el nuevo componente

function ListaProducto() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  return (
    <div className="h-full flex flex-col">
      <FindUserAdmin />
      
      {/* Botón para abrir el modal de venta fraccionada */}
      <div className="mt-4">
        <button 
          onClick={() => setIsModalOpen(true)} 
          className='w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
        >
          Venta Fraccionada
        </button>
      </div>

      {/* Renderizar el modal condicionalmente */}
      {isModalOpen && <VentaFraccionadaModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default ListaProducto;