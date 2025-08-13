import React, { useState, useEffect } from 'react';
import styles from "./DetalleVentas.module.scss";
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
    <tr key={producto.id}>
      <td className={styles.centerTd}>{producto.id}</td>
      <td className={styles.centerTd}>{producto.nombre}</td>
      <td className={styles.centerTd}>
        {isWeightOrVolume && (
          <div className={styles.modeSelector}>
            <button onClick={() => handleModeChange('peso')} className={mode === 'peso' ? styles.active : ''}>Cant.</button>
            <button onClick={() => handleModeChange('monto')} className={mode === 'monto' ? styles.active : ''}>Monto</button>
            <button onClick={() => handleModeChange('unidad')} className={mode === 'unidad' ? styles.active : ''}>Unidad</button>
          </div>
        )}
        <input
          className={styles.centerTd}
          type="number"
          value={value}
          min="0"
          onChange={handleValueChange}
        />
        {producto.unidadMedida.simbolo} {/* ESTE PARAMETRO MODIFICA EL SIMBOLO */}
      </td>
      <td className={styles.centerTd}>${subtotal.toFixed(2)}</td>
      <td className={styles.mail}>
        <button onClick={handleRemove}>Eliminar</button>
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

  const totalGeneral = productos.reduce((acc, item) => acc + calculateSubtotal(item), 0);

  return (
    <div className='grid min-h-[90dvh] grid-rows-[auto_1fr_auto] m-5'>
      <h1>Lista de Compras</h1>
      <div className={styles.wrapper}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.firstTh}>#</th>
                <th className={styles.centerTd}>Nombre</th>
                <th className={styles.centerTd}>Venta</th>
                <th className={styles.centerTd}>SubTotal</th>
                <th className={styles.centerTd}>---</th>
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
      </div>
      <footer>
        <p className='bg-[#485c9d] text-white font-normal p-2 rounded-lg cursor-pointer px-5 py-2  transition duration-75 transform hover:scale-100 active:bg-[#5f7ad0] active:scale-100'>
          Total: ${totalGeneral.toFixed(2)}
        </p>
        <div className='flex justify-between'>
          <button className='bg-[#A64208] text-white font-normal mt-3 p-2 rounded-lg cursor-pointer px-5 py-2 hover:bg-[#b45d2b] transition duration-75 transform hover:scale-105 active:bg-[#F2B138] active:scale-90' onClick={() => dispatch(clearventas())}>
            Cancelar
          </button>
          <Checkout totalGeneral={totalGeneral} />
        </div>
      </footer>
    </div>
  );
}

export default DetalleVenta;
