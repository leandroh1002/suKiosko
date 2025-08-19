import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import PATHROUTES from '../helpers/PathRoutes.helper';

function FormAddProducts() {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;

  const [productData, setProductData] = useState({
    nombre: '',
    redondeo: '',
    precio_compra: '',
    stock: '',
    rubro_id: '',
    unidad_medida_id: '',
    codigo_barra: '',
    // marca: '',
    fecha_de_vencimiento: '',
    descripcion: '',
  });

  const [rubros, setRubros] = useState([]);
  const [unidadesMedida, setUnidadesMedida] = useState([]);

  useEffect(() => {
    const fetchDependencies = async () => {
      try {
        const rubrosResponse = await axios.get(`${REACT_APP_API_URL}/rubros`);
        setRubros(rubrosResponse.data);

        const unidadesResponse = await axios.get(`${REACT_APP_API_URL}/unidades`); // Asumiendo un endpoint para unidades de medida
        setUnidadesMedida(unidadesResponse.data);
      } catch (error) {
        console.error('Error fetching dependencies:', error);
        Swal.fire('Error', 'No se pudieron cargar los datos necesarios para el formulario.', 'error');
      }
    };
    fetchDependencies();
  }, [REACT_APP_API_URL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convertir valores numéricos a tipo Number
      const dataToSend = {
        ...productData,
        redondeo: parseFloat(productData.redondeo),
        precio_compra: parseFloat(productData.precio_compra),
        stock: parseFloat(productData.stock),
        rubro_id: parseInt(productData.rubro_id),
        unidad_medida_id: parseInt(productData.unidad_medida_id),
      };

      const response = await axios.post(`${REACT_APP_API_URL}/productos`, [dataToSend]); // El backend espera un array
      Swal.fire('Éxito', 'Producto agregado correctamente!', 'success');
      // Opcional: Limpiar el formulario después de un envío exitoso
      setProductData({
        nombre: '',
        redondeo: '',
        precio_compra: '',
        stock: '',
        rubro_id: '',
        unidad_medida_id: '',
        codigo_barra: '',
        // marca: '',
        fecha_de_vencimiento: '',
        descripcion: '',
      });
    } catch (error) {
      console.error('Error al agregar producto:', error);
      Swal.fire('Error', error.response?.data?.error || 'No se pudo agregar el producto.', 'error');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Agregar Nuevo Producto</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
              Nombre:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nombre"
              type="text"
              name="nombre"
              value={productData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="redondeo">
              Precio de Venta:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="redondeo"
              type="number"
              name="redondeo"
              value={productData.redondeo}
              onChange={handleChange}
              step="0.01"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio_compra">
              Precio Compra:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="precio_compra"
              type="number"
              name="precio_compra"
              value={productData.precio_compra}
              onChange={handleChange}
              step="0.01"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
              Stock:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="stock"
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              step="0.01"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rubro_id">
              Rubro:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="rubro_id"
              name="rubro_id"
              value={productData.rubro_id}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un rubro</option>
              {rubros.map((rubro) => (
                <option key={rubro.id} value={rubro.id}>
                  {rubro.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unidad_medida_id">
              Unidad de Medida:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="unidad_medida_id"
              name="unidad_medida_id"
              value={productData.unidad_medida_id}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una unidad</option>
              {unidadesMedida.map((unidad) => (
                <option key={unidad.id} value={unidad.id}>
                  {unidad.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="codigo_barra">
              Código de Barra:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="codigo_barra"
              type="text"
              name="codigo_barra"
              value={productData.codigo_barra}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); // <-- Previene que se envíe el formulario
                }
              }}
              required
            />

          </div>

          {/* <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="marca">
              Marca:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="marca"
              type="text"
              name="marca"
              value={productData.marca}
              onChange={handleChange}
            />
          </div> */}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_de_vencimiento">
              Fecha de Vencimiento:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fecha_de_vencimiento"
              type="date"
              name="fecha_de_vencimiento"
              value={productData.fecha_de_vencimiento}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
              Descripción:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="descripcion"
              name="descripcion"
              value={productData.descripcion}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Link to={PATHROUTES.GESTIONAR}><button className='bg-[#A64208] m-8 text-white font-normal p-2 rounded-lg cursor-pointer px-5 py-2 hover:bg-[#b45d2b] transition duration-75 transform hover:scale-105 active:bg-[#F2B138] active:scale-90'>Volver</button></Link>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Agregar Producto
          </button>
          

        </div>
      </form>
    </div>
  );
}

export default FormAddProducts;