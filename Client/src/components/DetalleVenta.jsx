import React, { useState, useEffect } from 'react';
import styles from "./DetalleVentas.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { clearventas, removeProductFromCart, updateCartItem } from '../redux/actions';
import Checkout from './checkout';

// Componente para manejar la lógica de cada fila de producto
const ProductRow = ({ producto }) => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState(producto.modo || 'unidad'); // 'unidad', 'peso', 'monto'
  const [value, setValue] = useState(producto.valor || producto.cantidad);

  const isWeightOrVolume = producto.unidadMedida && (producto.unidadMedida.nombre === 'Kilogramo' || producto.unidadMedida.nombre === 'Litro');

  useEffect(() => {
    // Inicializa el modo y valor cuando el producto se carga
    const initialMode = producto.modo || (isWeightOrVolume ? 'peso' : 'unidad');
    const initialValue = producto.valor || producto.cantidad;
    setMode(initialMode);
    setValue(initialValue);
  }, [producto.id, isWeightOrVolume]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    // Reset value when mode changes, or set a sensible default
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

  // --- Cálculos para mostrar el subtotal ---
  let subtotal = 0;
  let displayQuantity = '';

  if (isWeightOrVolume) {
    const factor = producto.unidadMedida.factor_conversion || 1;
    const basePrice = producto.redondeo || 0; // Precio por Kg o Litro

    switch (mode) {
      case 'peso': // El usuario introduce gramos/ml
        subtotal = (basePrice / factor) * value;
        displayQuantity = `${value} ${producto.unidadMedida.simbolo === 'L' ? 'ml' : 'gr'}`;
        break;
      case 'monto': // El usuario introduce un monto en $
        subtotal = value;
        const calculatedQty = (value / basePrice) * factor;
        displayQuantity = `${calculatedQty.toFixed(2)} ${producto.unidadMedida.simbolo === 'L' ? 'ml' : 'gr'}`;
        break;
      case 'unidad': // El usuario introduce unidades (Kg/L)
      default:
        subtotal = basePrice * value;
        displayQuantity = `${value} ${producto.unidadMedida.nombre}`;
        break;
    }
  } else { // Venta por unidad estándar
    subtotal = producto.redondeo * value;
    displayQuantity = `${value} Unidades`;
  }
  
  // Actualizamos el total en el producto para que el reduce funcione
  producto.total = subtotal;

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
        {/* <span className={styles.displayQuantity}>{displayQuantity}</span> */}
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

  const totalGeneral = productos.reduce((acc, item) => acc + (item.total || 0), 0);

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
              {productos.map((producto) => (
                <ProductRow key={producto.id} producto={producto} />
              ))}
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
