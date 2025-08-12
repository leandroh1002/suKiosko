import React, { useState } from 'react';
import FindUserAdmin from './FindUserAdmin/FindUserAdmin';
import VentaFraccionadaModal from './VentaFraccionadaModal'; // Importar el nuevo componente

function ListaProducto() {
  const [searchInput, setSearchInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  return (
    <div>
      {/* <div className='grid min-h-[90dvh] grid-rows-[1fr_auto] m-5'> */}
      <content><FindUserAdmin searchInput={searchInput} /></content>
      
      {/* Botón para abrir el modal de venta fraccionada */}
      <button 
        onClick={() => setIsModalOpen(true)} 
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4'
      >
        Venta Fraccionada
      </button>

      {/* Renderizar el modal condicionalmente */}
      {isModalOpen && <VentaFraccionadaModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default ListaProducto;