import React, { useEffect, useState } from 'react';
import styles from "./TableStock.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart, allProduct } from '../../redux/actions';
import Swal from 'sweetalert2';
import axios, { all } from 'axios';
import { Link } from 'react-router-dom';
import PATHROUTES from '../../helpers/PathRoutes.helper';

function TableStock(props) {
  const dispatch = useDispatch();
  // console.log(props, "props desde TableUser");
  const [productos, setProductos] = useState([]); // Estado para almacenar los productos

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API_URL}/productos`);
        setProductos(response.data); // Guarda los productos en el estado
        if (props.onDataFetched) {
          props.onDataFetched(response.data); // Envía los datos al componente padre
        }
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProductos(); // Llama a la función para obtener los productos
  }, [props.onDataFetched]); // Se ejecuta una vez y cuando onDataFetched cambie
 
  // const { productos, searchInput, onMailButtonClick, handleShowForm } = props
  
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
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

  const productosFiltrados = props.filtroActivo
  ? productos.filter(p => parseFloat(p.stock) < 5)
  : productos;


  return (
    <div className={styles.wrapper}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.firstTh}>Rubro</th>
              <th className={styles.centerTd}>Nombre</th>
              <th className={styles.centerTd}>descripcion</th>
              <th className={styles.centerTd}>Fecha de vencimiento</th>
              <th className={styles.centerTd}>Código</th>
              <th className={styles.centerTd}>Stock</th>
              <th className={styles.centerTd}>Precio Compra</th>
              <th className={styles.centerTd}>Precio Venta</th>
              <th></th>
              <th></th>
              <th className={styles.lastTd}></th>
            </tr>
          </thead>
          <tbody>
          {productosFiltrados && productosFiltrados.map((producto) => {
            // console.log(producto);
            const cantidad = cantidades[producto.id] || 0; // Obtiene la cantidad ingresada o 0 por defecto
            const total = cantidad * producto.redondeo; // Calcula el total dinámicamente
            
          return (
              <tr key={producto.id}>
                <td className={styles.centerTd}>{producto.Rubro ? producto.Rubro.nombre : 'N/A'}</td>
                <td className={styles.centerTd}>{producto.nombre}</td>
                <td className={styles.centerTd}>{producto.descripcion}</td>
                <td className={styles.centerTd}>{producto.vencimiento}</td>
                <td className={styles.centerTd}>
                  {producto.codigo_barra ? producto.codigo_barra.padStart(13, '0') : 'N/A'}
                </td>                <td className={styles.centerTd}>{producto.stock}</td>
                <td className={styles.centerTd}>${producto.precio_compra}</td>
                <td className={styles.centerTd}>${producto.redondeo}</td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    </div >
  );
}

export default TableStock;