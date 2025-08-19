
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allProduct, updateProduct, getRubros } from '../../redux/actions';
import styles from './TablaProductos.module.scss';
import PATHROUTES from '../../helpers/PathRoutes.helper';
import { Link } from 'react-router-dom';

const TablaProductos = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.productForAdmin);
  const rubros = useSelector(state => state.allRubros);
  const [searchTerm, setSearchTerm] = useState('');
  const [editableData, setEditableData] = useState({});

  useEffect(() => {
    dispatch(allProduct(''));
    dispatch(getRubros());
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

    const productData = {
      ...product,
      nombre: editedData.nombre !== undefined ? editedData.nombre : product.nombre,
      descripcion: editedData.descripcion !== undefined ? editedData.descripcion : product.descripcion,
      codigo_barra: editedData.codigo_barra !== undefined ? editedData.codigo_barra : product.codigo_barra,
      fecha_vencimiento: editedData.fecha_vencimiento !== undefined ? editedData.fecha_vencimiento : (product.Vencimientos && product.Vencimientos.length > 0 ? product.Vencimientos[0].fechaVencimiento : null),
      // rubro_id: editedData.rubro_id !== undefined ? editedData.rubro_id : product.rubro_id,
      stock: editedData.nuevoStock !== undefined ? parseFloat(product.stock) + parseFloat(String(editedData.nuevoStock).replace(',', '.')) : product.stock,
      precio_compra: editedData.precioCompraNuevo !== undefined ? parseFloat(String(editedData.precioCompraNuevo).replace(',', '.')) : product.precio_compra,
      redondeo: editedData.precioVentaNuevo !== undefined ? parseFloat(String(editedData.precioVentaNuevo).replace(',', '.')) : product.redondeo,
    };

    dispatch(updateProduct(productId, productData));
    setEditableData(prev => ({
      ...prev,
      [productId]: undefined,
    }));
  };

  const filteredProducts = products.filter(product => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      product.nombre.toLowerCase().includes(searchTermLower) ||
      product.codigo_barra?.toLowerCase().includes(searchTermLower)
    );
  });

  console.log(filteredProducts, "Filtered Products");
  
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
        <button className='mb-4' >Volver</button>
      </Link>
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
              <td>
                <input
                  type="text"
                  value={editableData[product.id]?.nombre || product.nombre}
                  onChange={(e) => handleInputChange(product.id, 'nombre', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={editableData[product.id]?.descripcion || product.descripcion}
                  onChange={(e) => handleInputChange(product.id, 'descripcion', e.target.value)}
                />
              </td>
              <td>
                {product.vencimiento && product.vencimiento.length > 0
                  ? new Date(product.vencimiento).toLocaleDateString()
                  : 'Sin vencimiento'}
              </td>
              {/* <td>
                <input
                  type="date"
                  value={editableData[product.id]?.fecha_vencimiento || (product.Vencimientos && product.Vencimientos.length > 0 ? new Date(product.Vencimientos[0].fechaVencimiento).toISOString().split('T')[0] : '')}
                  onChange={(e) => handleInputChange(product.id, 'fecha_vencimiento', e.target.value)}
                />
              </td> */}
              <td>
                <input
                  type="text"
                  value={editableData[product.id]?.codigo_barra || (product.codigo_barra ? product.codigo_barra.padStart(13, '0') : '')}
                  onChange={(e) => handleInputChange(product.id, 'codigo_barra', e.target.value)}
                />
              </td>
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
''
