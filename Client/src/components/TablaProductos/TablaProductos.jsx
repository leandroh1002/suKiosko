
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allProduct, updateProduct } from '../../redux/actions';
import styles from './TablaProductos.module.scss';
import PATHROUTES from '../../helpers/PathRoutes.helper';
import { Link } from 'react-router-dom';

const TablaProductos = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.productForAdmin);
  const [searchTerm, setSearchTerm] = useState('');
  const [editableData, setEditableData] = useState({});

  useEffect(() => {
    dispatch(allProduct(''));
  }, [dispatch]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputChange = (productId, field, value) => {
    setEditableData(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }));
  };

  const handleSaveChanges = (productId) => {
    const product = products.find(p => p.id === productId);
    const editedData = editableData[productId] || {};

    // Correctly parse decimal numbers, replacing comma with dot, and ensure parseFloat is used.
    const stockToAdd = editedData.nuevoStock ? parseFloat(String(editedData.nuevoStock).replace(',', '.')) : 0;
    const newStock = editedData.nuevoStock !== undefined ? parseFloat(product.stock) + stockToAdd : product.stock;

    const newPrecioCompra = editedData.precioCompraNuevo !== undefined 
      ? parseFloat(String(editedData.precioCompraNuevo).replace(',', '.')) 
      : product.precio_compra;

    const newPrecioVenta = editedData.precioVentaNuevo !== undefined 
      ? parseFloat(String(editedData.precioVentaNuevo).replace(',', '.')) 
      : product.redondeo;

    const productData = {
      ...product,
      stock: newStock,
      precio_compra: newPrecioCompra,
      redondeo: newPrecioVenta,
    };

    dispatch(updateProduct(productId, productData));
    // Clear the editable data for the specific product to reset inputs
    setEditableData(prev => ({
      ...prev,
      [productId]: undefined,
    }));
  };

  const filteredProducts = products.filter(product => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      product.nombre.toLowerCase().includes(searchTermLower) ||
      product.codigo_barra?.toLowerCase().includes(searchTermLower)    );
  });

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Buscar por nombre o código de barras"
        value={searchTerm}
        onChange={handleSearch}
        className={styles.searchInput}
      />
      <Link to={PATHROUTES.REVISIONSTOCK} className='bg-[#a64208] text-white font-normal mb-7 p-2 rounded-lg cursor-pointer px-5 py-2 hover:bg-[#b45d2b] transition duration-75 transform hover:scale-105 active:bg-[#F2B138] active:scale-90 '>
      <button className='mb-4' >Volver</button></Link>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Rubro</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Vencimiento</th>
            <th>Código de Barras</th>
            <th>Stock</th>
            <th>Nuevo Stock</th>
            <th>Precio Compra</th>
            <th>Precio Compra Nuevo</th>
            <th>Precio Venta</th>
            <th>Precio Venta Nuevo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td>{product.Rubro ? product.Rubro.nombre : 'N/A'}</td>
              <td>{product.nombre}</td>
              <td>{product.descripcion}</td>
              <td>{new Date(product.vencimiento).toLocaleDateString()}</td>
              <td>{product.codigo_barra ? product.codigo_barra.padStart(13, '0') : 'N/A'}</td>
              <td>{product.stock}</td>
              <td>
                <input
                  type="number"
                  onChange={(e) => handleInputChange(product.id, 'nuevoStock', e.target.value)}
                />
              </td>
              <td>{product.precio_compra}</td>
              <td>
                <input
                  type="number"
                  onChange={(e) => handleInputChange(product.id, 'precioCompraNuevo', e.target.value)}
                />
              </td>
              <td>{product.redondeo}</td>
              <td>
                <input
                  type="number"
                  onChange={(e) => handleInputChange(product.id, 'precioVentaNuevo', e.target.value)}
                />
              </td>
              <td>
                <button className='bg-[#3aa608] text-white font-normal mb-0 p-2 rounded-lg cursor-pointer px-5 py-2 hover:bg-[#699b52] transition duration-75 transform hover:scale-105 active:bg-[#9eed86] active:scale-90' onClick={() => handleSaveChanges(product.id)}>
                  Guardar Cambios
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaProductos;
