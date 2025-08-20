import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearventas, removeProductFromCart, updateCartItem } from '../redux/actions';
import Checkout from './checkout';

// Componente para manejar la lógica de cada fila de producto
const ProductRow = ({ producto, subtotal }) => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState(producto.modo || 'unidad');
  const [value, setValue] = useState(producto.valor !== undefined ? producto.valor : producto.cantidad);

  const isWeightOrVolume = producto.unidadMedida && (producto.unidadMedida.nombre === 'Kilogramo' || producto.unidadMedida.nombre === 'Litro');

  useEffect(() => {
    const initialMode = producto.modo || (isWeightOrVolume ? 'peso' : 'unidad');
    setMode(initialMode);
    
    const initialValue = producto.valor !== undefined ? producto.valor : producto.cantidad;
    setValue(initialValue);
  }, [producto.id, isWeightOrVolume, producto.cantidad, producto.valor, producto.modo]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setValue(0);
    dispatch(updateCartItem(producto.id, { modo: newMode, valor: 0 }));
  };

  const handleValueChange = (e) => {
    const newValue = parseFloat(e.target.value) || 0;
    setValue(newValue);
    dispatch(updateCartItem(producto.id, { modo: mode, valor: newValue }));
  };

  const handleRemove = () => {
    dispatch(removeProductFromCart(producto.id));
  };

  return (
    <tr className="bg-white border-b">
      {/* <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{producto.id}</td> */}
      <td className="px-6 py-4">{producto.nombre}</td>
      <td className="px-6 py-4">
        {isWeightOrVolume && (
          <div className="flex items-center gap-2 mb-2">
            <button onClick={() => handleModeChange('peso')} className={`px-2 py-1 text-xs rounded ${mode === 'peso' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Cant.</button>
            <button onClick={() => handleModeChange('monto')} className={`px-2 py-1 text-xs rounded ${mode === 'monto' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Monto</button>
            <button onClick={() => handleModeChange('unidad')} className={`px-2 py-1 text-xs rounded ${mode === 'unidad' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Unidad</button>
          </div>
        )}
        <div className="flex items-center">
          <input
            className="w-12 px-2 py-1 border rounded"
            type="number"
            value={value}
            min="0"
            onChange={handleValueChange}
          />
          <span className="ml-1">{producto.descripcion}</span>
        </div>
      </td>
      <td className="px-6 py-4">${subtotal.toFixed(2)}</td>
      <td className="px-6 py-4">
        <button onClick={handleRemove} className="font-medium text-red-600 hover:underline">Eliminar</button>
      </td>
    </tr>
  );
};


function DetalleVenta() {
  const dispatch = useDispatch();
  const productos = useSelector(state => state.cart);

  const calculateSubtotal = (producto) => {
    const { modo, valor, cantidad, redondeo, unidadMedida } = producto;
    const isWeightOrVolume = unidadMedida && (unidadMedida.nombre === 'Kilogramo' || unidadMedida.nombre === 'Litro');
    const currentMode = modo || (isWeightOrVolume ? 'peso' : 'unidad');
    const currentValue = valor !== undefined ? valor : cantidad;

    let subtotal = 0;

    if (isWeightOrVolume) {
        const factor = unidadMedida.factor_conversion || 1;
        const basePrice = redondeo || 0;

        switch (currentMode) {
            case 'peso':
                subtotal = (basePrice / factor) * currentValue;
                break;
            case 'monto':
                subtotal = currentValue;
                break;
            case 'unidad':
            default:
                subtotal = basePrice * currentValue;
                break;
        }
    } else {
        subtotal = redondeo * currentValue;
    }
    return subtotal;
  };

  const [recibi, setRecibi] = useState(0); // Estado para almacenar el valor ingresado

  const totalGeneral = productos.reduce((acc, item) => acc + calculateSubtotal(item), 0);

  const handleInputChange = (e) => {
    setRecibi(parseFloat(e.target.value) || 0); // Actualiza el estado con el valor ingresado
  };

  useEffect(() => {
    if (totalGeneral === 0) {
      setRecibi(0);
    }
  }, [totalGeneral]);
  
  const vuelto = recibi - totalGeneral; // Calcula el vuelto

  return (
    <div className='flex flex-col h-full p-4 bg-white rounded-lg shadow'>
      <h1 className="text-lg font-semibold mb-4">Lista de Compras</h1>
      <div className="flex-grow overflow-y-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                {/* <th scope="col" className="px-6 py-3">#</th> */}
                <th scope="col" className="px-6 py-3">Nombre</th>
                <th scope="col" className="px-6 py-3">Venta</th>
                <th scope="col" className="px-6 py-3">SubTotal</th>
                <th scope="col" className="px-6 py-3">Acción</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => {
                const subtotal = calculateSubtotal(producto);
                return <ProductRow key={producto.id} producto={producto} subtotal={subtotal} />
              })}
            </tbody>
          </table>
      </div>
      <footer className="mt-4">
        <div className="flex flex-col justify-end items-end mb-4">
            <p className='text-xl font-bold'>
              Total: ${totalGeneral.toFixed(2)}
            </p>
            <p className='text-xl font-bold'>
              Recibi: $
              <input 
                className='text-xl font-bold text-right w-24'
                type='number'
                value={recibi}   // 👈 aquí
                onChange={handleInputChange} 
                placeholder='0.00'
              />
            </p>
            <p className='text-xl font-bold'>
              Su vuelto: ${vuelto.toFixed(2)}
            </p>
        </div>
        <div className='flex justify-between'>
          <button className='bg-red-600 text-white font-normal p-2 rounded-lg cursor-pointer px-5 py-2 hover:bg-red-700 transition' onClick={() => dispatch(clearventas())}>
            Cancelar
          </button>
          <Checkout totalGeneral={totalGeneral} />
        </div>
      </footer>
    </div>
  );
}

export default DetalleVenta;
