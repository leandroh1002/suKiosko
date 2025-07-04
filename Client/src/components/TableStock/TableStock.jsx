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
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProductos(); // Llama a la función para obtener los productos
  }, []); // Solo se ejecuta una vez al montar el componente

  console.log(productos, "productos desde TableStock");
    

  
  // const { productos, searchInput, onMailButtonClick, handleShowForm } = props
  console.log("productos desde TableStock", productos);
  
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.firstTh}>Producto</th>
              <th className={styles.centerTd}>Marca</th>
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
          {productos && productos.map((producto) => {
            // console.log(producto);
            const cantidad = cantidades[producto.id] || 0; // Obtiene la cantidad ingresada o 0 por defecto
            const total = cantidad * producto.precio_unitario; // Calcula el total dinámicamente
            
          return (
              <tr key={producto.id}>
                <td className={styles.centerTd}>{producto.nombre}</td>
                <td className={styles.centerTd}>marca</td>
                <td className={styles.centerTd}>{producto.descripcion}</td>
                <td className={styles.centerTd}>Vencimiento</td>
                <td className={styles.centerTd}>{producto.codigo_barra}</td>
                <td className={styles.centerTd}>{producto.stock}</td>
                <td className={styles.centerTd}>${producto.precio_compra}</td>
                <td className={styles.centerTd}>${producto.precio_unitario}</td>
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