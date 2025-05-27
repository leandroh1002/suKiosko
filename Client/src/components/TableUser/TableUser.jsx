import React, { useState } from 'react';
import styles from "./TableUser.module.scss";
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../../redux/actions';
import Swal from 'sweetalert2';

function TableUser(props) {
  // console.log(props, "props desde TableUser");

  const { productos, searchInput, onMailButtonClick, handleShowForm } = props
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();

  const [cantidades, setCantidades] = useState({}); // Estado para manejar las cantidades

  const handleCantidadChange = (id, value) => {
    const producto = productos.find((p) => p.id === id); // Encuentra el producto correspondiente
    if (value > producto.stock) {
      alert(`La cantidad no puede ser mayor al stock disponible (${producto.stock}).`);
      return; // No actualiza la cantidad si supera el stock
    }
  
    setCantidades({
      ...cantidades,
      [id]: value, // Actualiza la cantidad para el producto con el ID correspondiente
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.firstTh}>#</th>
              <th>Código</th>
              <th className={styles.centerTd}>Marca</th>
              <th className={styles.centerTd}>Stock</th>
              <th className={styles.centerTd}>Cantidad</th>
              <th className={styles.centerTd}>Precio Unitario</th>
              <th className={styles.centerTd}>descripcion</th>
              <th className={styles.centerTd}>Importe</th>
              <th className={styles.centerTd}>----</th>
              <th></th>
              <th></th>
              <th className={styles.lastTd}></th>
            </tr>
          </thead>
          <tbody>
          {productos && productos.map((producto) => {
            // console.log(producto);
            const cantidad = cantidades[producto.id] || 0; // Obtiene la cantidad ingresada o 0 por defecto
            const total = cantidad * producto.precio_unitario; // Calcula el total dinámicamente
            
          return (
            <tr key={producto.id}>
              <td className={styles.centerTd}>{producto.id}</td>
              <td className={styles.centerTd}>{producto.codigo_barra}</td>
              <td className={styles.centerTd}>{producto.nombre}</td>
              <td className={styles.centerTd}>{producto.stock}</td>
              <td >
                <input className={styles.centerTd}
                  type="number"
                  min="0"
                  value={cantidad}
                  onChange={(e) => handleCantidadChange(producto.id, parseFloat(e.target.value) || 0)} // Actualiza la cantidad
                />
              </td>
              <td className={styles.centerTd}>${parseFloat(producto.precio_unitario).toFixed(2)}</td>
              <td className={styles.centerTd}>{producto.descripcion}</td>
              <td className={styles.centerTd}>${total.toFixed(2)}</td>
              <td className={styles.mail}>
                <button
                  onClick={() => {
                    if (cantidad === 0) {
                      // alert("La cantidad no puede ser 0."); // Opcional: muestra un mensaje al usuario
                      return; // No hace nada si la cantidad es 0
                    }
                    dispatch(addProductToCart(producto, cantidad)); // Despacha la acción si la cantidad es válida
                  }}
                >
                  Agregar
                </button></td>
            </tr>
          );
        })}
          </tbody>
        </table>
      </div>
    </div >
  );
}

export default TableUser;

/*
const [agregados, setAgregados] = useState({});

const handleAgregar = (producto) => {
  setAgregados((prev) => ({ ...prev, [producto.id]: true }));
  handleShowForm();
  onMailButtonClick(producto.productos.email);
};


<button
  className={styles.mail}
  onClick={() => handleAgregar(producto)}
  disabled={agregados[producto.id]}
>
  {agregados[producto.id] ? "Agregado" : "Agregar al carrito"}
</button>

*/