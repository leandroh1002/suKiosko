import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../../redux/actions';

function TableUser(props) {
  const { productos } = props
  const dispatch = useDispatch();

  const [cantidades, setCantidades] = useState({});

  const handleCantidadChange = (id, value) => {
    const producto = productos.find((p) => p.id === id);
    if (value > producto.stock) {
      alert(`La cantidad no puede ser mayor al stock disponible (${producto.stock}).`);
      return;
    }
  
    setCantidades({
      ...cantidades,
      [id]: value,
    });
  };

  return (
    <div className="overflow-y-auto max-h-[42rem]">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">#</th>
            <th scope="col" className="px-6 py-3">Código</th>
            <th scope="col" className="px-6 py-3">Nombre</th>
            <th scope="col" className="px-6 py-3">Descripción</th>
            <th scope="col" className="px-6 py-3">Stock</th>
            <th scope="col" className="px-6 py-3">Cantidad</th>
            <th scope="col" className="px-6 py-3">Precio</th>
            <th scope="col" className="px-6 py-3">SubTotal</th>
            <th scope="col" className="px-6 py-3">Acción</th>
          </tr>
        </thead>
        <tbody>
        {productos && productos.map((producto) => {
          const cantidad = cantidades[producto.id] || 0;
          const total = cantidad * producto.redondeo;
            
          return (
            <tr key={producto.id} className="bg-white border-b">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{producto.id}</td>
              <td className="px-6 py-4">{producto.codigo_barra ? producto.codigo_barra.padStart(13, '0') : 'N/A'}</td>
              <td className="px-6 py-4">{producto.nombre}</td>
              <td className="px-6 py-4">{producto.descripcion}</td>
              <td className="px-6 py-4">{producto.stock}</td>
              <td className="px-6 py-4">
                <input className="w-20 px-2 py-1 border rounded"
                  type="number"
                  min="0"
                  value={cantidad}
                  onChange={(e) => handleCantidadChange(producto.id, parseFloat(e.target.value) || 0)}
                />
              </td>
              <td className="px-6 py-4">${parseFloat(producto.redondeo).toFixed(2)}</td>
              <td className="px-6 py-4">${total.toFixed(2)}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => {
                    if (cantidad === 0) {
                      return;
                    }
                    dispatch(addProductToCart(producto, cantidad));
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={cantidad === 0}
                >
                  Agregar
                </button></td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </div >
  );
}

export default TableUser;