import React, { useState, useCallback } from 'react';
import TableStock from './TableStock/TableStock';
import PATHROUTES from '../helpers/PathRoutes.helper';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';

function RevisionStock() {
  const [filtroStockBajo, setFiltroStockBajo] = useState(false);
  const [productosData, setProductosData] = useState([]);

  const handleDataFetched = useCallback((data) => {
    setProductosData(data);
  }, []);

  const exportToJson = () => {
    const filename = 'productos.json';
    const jsonStr = JSON.stringify(productosData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
      
      <div className='flex justify-center mb-4'>
        <button 
          onClick={() => setFiltroStockBajo(!filtroStockBajo)}
          className={`px-4 py-2 rounded text-white transition-colors ${filtroStockBajo ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}>
          {filtroStockBajo ? 'Mostrar Todos los Productos' : 'Filtrar Stock Bajo (< 5)'}
        </button>
        <button 
          onClick={exportToJson}
          className='ml-4 px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition-colors'>
          Exportar a JSON
        </button>
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
    </div>
  );
}
export default RevisionStock;