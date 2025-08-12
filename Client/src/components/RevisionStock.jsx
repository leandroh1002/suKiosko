import React, { useState, useCallback, useEffect } from 'react';
import TableStock from './TableStock/TableStock';
import PATHROUTES from '../helpers/PathRoutes.helper';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';

function RevisionStock() {
  const [filtroStockBajo, setFiltroStockBajo] = useState(false);
  const [productosData, setProductosData] = useState([]);
  const [productosPorVencer, setProductosPorVencer] = useState([]);
  const [isVencimientoModalOpen, setIsVencimientoModalOpen] = useState(false);

  const handleDataFetched = useCallback((data) => {
    setProductosData(data);
  }, []);

  useEffect(() => {
    if (productosData.length > 0) {
      const EXPIRATION_THRESHOLD_DAYS = 15;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const nearExpiration = productosData.filter(p => {
        if (!p.vencimiento) return false;
        
        const expirationDate = new Date(p.vencimiento);
        const diffTime = expirationDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays >= 0 && diffDays <= EXPIRATION_THRESHOLD_DAYS;
      });

      if (nearExpiration.length > 0) {
        setProductosPorVencer(nearExpiration);
        setIsVencimientoModalOpen(true);
      }
    }
  }, [productosData]);

  const exportToXLSX = () => {
    const filename = 'productos.xlsx';
    const ws = XLSX.utils.json_to_sheet(productosData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Productos');
    XLSX.writeFile(wb, filename);
  };

  return (
    <div className='flex flex-col min-h-screen bg-gray-100 p-4'>
      <h1 className='text-2xl font-bold text-center mb-4'>Revisión de Stock</h1>
      
      <div className='flex justify-between mb-4'>
        <button 
          onClick={() => setFiltroStockBajo(!filtroStockBajo)}
          className={`px-4 py-2 rounded text-white transition-colors ${filtroStockBajo ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}>
          {filtroStockBajo ? 'Mostrar Todos los Productos' : 'Filtrar Stock Bajo (< 5)'}
        </button>
        <Link to={PATHROUTES.PRODUCTOS}>
          <button className='ml-4 px-4 py-2 rounded bg-yellow-600 text-white hover:bg-yellow-700 transition-colors'>
            ACTUALIZAR STOCK
          </button>
        </Link>
        <button 
          onClick={exportToXLSX}
          className='ml-4 px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-600 transition-colors'>
          Exportar a XLSX
        </button>
      </div>

      <main className='flex-grow'>
        <TableStock filtroActivo={filtroStockBajo} onDataFetched={handleDataFetched} />
      </main>

      <footer className='flex justify-center mt-6'>
        <Link to={PATHROUTES.GESTIONAR} className='bg-[#A64208] m-8 text-white font-normal p-2 rounded-lg cursor-pointer px-5 py-2 hover:bg-[#b45d2b] transition duration-75 transform hover:scale-105 active:bg-[#F2B138] active:scale-90'>
          Volver
        </Link>
      </footer>

      {isVencimientoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-red-600">¡Atención! Productos Próximos a Vencer</h2>
            <p className="mb-4">Los siguientes productos vencerán en los próximos 15 días:</p>
            <ul className="list-disc list-inside mb-4 max-h-60 overflow-y-auto">
              {productosPorVencer.map(p => (
                <li key={p.id} className="mb-2">
                  <span className="font-semibold">{p.nombre}</span> - Vence el: 
                  <span className="font-bold text-red-500 ml-1">
                    {new Date(p.vencimiento).toLocaleDateString('es-AR', { timeZone: 'UTC' })}
                  </span>
                </li>
              ))}
            </ul>
            <button 
              onClick={() => setIsVencimientoModalOpen(false)}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default RevisionStock;