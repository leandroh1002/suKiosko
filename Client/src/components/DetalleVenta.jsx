import React, { useState } from 'react';
import styles from "./DetalleVentas.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { clearventas, removeProductFromCart, updateProductQuantity } from '../redux/actions';
import Checkout from './checkout';

function DetalleVenta() {
  const dispatch = useDispatch();
  const productos = useSelector(state => state.cart);
console.log(productos, "productos desde DetalleVenta");

  // Calcula el total para cada producto
  const productosConTotales = productos.map(producto => ({
    ...producto,
    total: producto.cantidad * parseFloat(producto.precio_unitario), // Calcula el total para cada producto
  }));
  console.log(productosConTotales);
  

  const handleRemove = (id) => {
    dispatch(removeProductFromCart(id));
  };
  
  const handleCantidadChange = (id, cantidad) => {
    if (cantidad < 0) return; // Evita cantidades negativas
    dispatch(updateProductQuantity(id, cantidad));
  };

  const listadecompras = useSelector(state => state.cart);
  
  // Sumar todos los totales
  const totalGeneral = listadecompras.reduce((acc, item) => acc + (item.total || 0), 0);

  return (
    <div className='grid min-h-[90dvh] grid-rows-[auto_1fr_auto] m-5'>
      <h1>Lista de Compras</h1>
    <div className={styles.wrapper}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.firstTh}>#</th>
              <th className={styles.centerTd}>Marca</th>
              <th className={styles.centerTd}>Cantidad</th>
              <th className={styles.centerTd}>Importe</th>
              <th className={styles.centerTd}>---</th>
            </tr>
          </thead>
          <tbody>
          {productos.map((producto) => {
            // console.log(producto.precio_unitario);
            const total = producto.cantidad * producto.precio_unitario;
          return (
            <tr key={producto.id}>
              <td className={styles.centerTd}>{producto.id}</td>
              <td className={styles.centerTd}>{producto.nombre}</td>
              <td>
                <input
                  className={styles.centerTd}
                  type="number"
                  value={producto.cantidad}
                  min="0"
                  onChange={(e) =>
                    handleCantidadChange(producto.id, parseInt(e.target.value) || 0)
                  }
                />
              </td>
              <td className={styles.centerTd}>${total.toFixed(2)}</td>
              <td className={styles.mail}>
                <button onClick={() => handleRemove(producto.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          );
        })}
          </tbody>
        </table>
      </div>
    </div >
      <footer>
        <p className='bg-[#485c9d] text-white font-normal p-2 rounded-lg cursor-pointer px-5 py-2  transition duration-75 transform hover:scale-100 active:bg-[#5f7ad0] active:scale-100' >Total: ${totalGeneral.toFixed(2)}</p>
        <div className='flex justify-between'>
          <button className='bg-[#A64208] text-white font-normal mt-3 p-2 rounded-lg cursor-pointer px-5 py-2 hover:bg-[#b45d2b] transition duration-75 transform hover:scale-105 active:bg-[#F2B138] active:scale-90' onClick={() => dispatch(clearventas())}>
            Cancelar
          </button>
          <Checkout totalGeneral={totalGeneral}></Checkout>
        </div>
      </footer>
    </div>
  );
}

export default DetalleVenta;