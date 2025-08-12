
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../redux/actions';
import Swal from 'sweetalert2';

const VentaFraccionadaModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [cantidades, setCantidades] = useState({});
  const [montos, setMontos] = useState({});

  useEffect(() => {
    axios.get('/productos')
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        console.error("Error al cargar los productos:", error);
      });
  }, []);

  const handleCantidadChange = (id, cantidad) => {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    const precioVenta = parseFloat(producto.redondeo);
    const montoCalculado = (cantidad * precioVenta).toFixed(2);

    setCantidades({ ...cantidades, [id]: cantidad });
    setMontos({ ...montos, [id]: montoCalculado });
  };

  const handleMontoChange = (id, monto) => {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    const precioVenta = parseFloat(producto.redondeo);
    if (precioVenta === 0) return;

    const cantidadCalculada = (monto / precioVenta).toFixed(3);

    setMontos({ ...montos, [id]: monto });
    setCantidades({ ...cantidades, [id]: cantidadCalculada });
  };

  const handleVenderClick = (id) => {
    const producto = productos.find(p => p.id === id);
    const cantidadVendida = parseFloat(cantidades[id] || 0);
    const montoVendido = parseFloat(montos[id] || 0);

    if (!producto || isNaN(cantidadVendida) || cantidadVendida <= 0) {
      Swal.fire('Error', 'Por favor, ingrese una cantidad o monto válido.', 'error');
      return;
    }

    if (parseFloat(producto.stock) < cantidadVendida) {
      Swal.fire('Error', 'No hay suficiente stock para realizar esta venta.', 'error');
      return;
    }

    const productoParaCarrito = {
      ...producto,
      precioVenta: montoVendido, // El precio de venta para el carrito es el monto calculado
      precio_unitario: montoVendido // Aseguramos que el precio_unitario sea el correcto
    };

    dispatch(addProductToCart(productoParaCarrito, cantidadVendida));

    Swal.fire({
      title: '¡Agregado!',
      text: `${producto.nombre} ha sido agregado al carrito.`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });

    onClose(); // Cierra el modal después de agregar al carrito
  };


  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  console.log(productos, "algo");
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Venta Fraccionada</h2>
          <button onClick={onClose} className="text-red-500 hover:text-red-700 text-2xl">&times;</button>
        </div>
        <input
          type="text"
          placeholder="Buscar producto..."
          className="w-full p-2 mb-4 border rounded"
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
        />
        <div className="overflow-auto max-h-[60vh]">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Producto</th>
                <th scope="col" className="px-6 py-3">Stock Actual</th>
                <th scope="col" className="px-6 py-3">Precio Venta (x Unidad)</th>
                <th scope="col" className="px-6 py-3">Vender Cantidad</th>
                <th scope="col" className="px-6 py-3">Vender por Dinero ($)</th>
                <th scope="col" className="px-6 py-3">Acción</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map(producto => (
                <tr key={producto.id} className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-gray-900">{producto.nombre}</td>
                  <td className="px-6 py-4">{`${producto.stock} ${producto.unidadMedida?.simbolo || ''}`}</td>
                  <td className="px-6 py-4">${producto.redondeo}</td>


                  <td className="px-6 py-4">
                    <input
                      type="number"
                      className="w-24 p-1 border rounded"
                      placeholder="Ej: 0.100"
                      value={cantidades[producto.id] || ''}
                      onChange={e => handleCantidadChange(producto.id, e.target.value)}
                    />
                    <span> = ${montos[producto.id] || '0.00'}</span>
                  </td>



                  <td className="px-6 py-4">
                    <input
                      type="number"
                      className="w-24 p-1 border rounded"
                      placeholder="Ej: 500"
                      value={montos[producto.id] || ''}
                      onChange={e => handleMontoChange(producto.id, e.target.value)}
                    />
                     <span> = {cantidades[producto.id] || '0.000'} {producto.unidadMedida?.simbolo || ''}</span>
                  </td>




                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleVenderClick(producto.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Vender
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VentaFraccionadaModal;
