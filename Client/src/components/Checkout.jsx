import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearventas, postVenta } from '../redux/actions';

export default function Checkout({ totalGeneral = 0 }) {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart); // Array de productos
  const empleado = useSelector(state => state.empleado_login); // Array de productos
  const [mostrarModal, setMostrarModal] = useState(false);
  const [medioPago, setMedioPago] = useState(null);

  const handlePagar = () => {
    setMostrarModal(true);
  };

  //console.log(empleado);
  
  const handleConfirmarPago = () => {
    const payload = {
      fecha: new Date().toISOString(),
      medio_pago: medioPago,
      empleado_id: empleado.id, // puedes poner un valor fijo temporal o sacarlo de auth
      cliente_id: null,
      subtotal: totalGeneral,
      items: cart.map(prod => ({
        producto_id: prod.id,
        cantidad: prod.cantidad,
        precio_unitario: prod.precio_unitario,
        precio_compra: prod.precio_compra,
        redondeo: prod.redondeo
      }))
    };
    dispatch(postVenta(payload));
    setMostrarModal(false);
    dispatch(clearventas());
    setMedioPago(null);
  };
  console.log(totalGeneral, "totalGeneral desde Checkout");
  
  return (
    <div>
      <button onClick={handlePagar} disabled={totalGeneral === 0} // Deshabilita el botón si totalGeneral es 0
        className={`${totalGeneral === 0 ? 'bg-gray-400 cursor-not-allowed py-2 px-5 rounded-lg mt-3 text-white' : 'bg-[#195b10] text-white font-normal mt-3 p-2 rounded-lg cursor-pointer px-5 py-2 hover:bg-[#2da733] transition duration-75 transform hover:scale-105 active:bg-[#83e971] active:scale-90'}`} >Pagar</button>
      {mostrarModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full relative">
            <button   className="bg-icon-cross bg-no-repeat bg-center w-8 h-8 absolute top-3 right-2"
              onClick={() => {setMostrarModal(false);setMedioPago(null);}}></button>
            <h2 className="text-xl font-semibold mt-1 mb-3 text-center">Seleccioná el medio de pago</h2>
          <div className="flex justify-around mb-4">
            <button
              className={`px-4 py-2 rounded-lg border ${medioPago === 'efectivo' ? 'bg-green-500 text-white' : 'bg-white text-black border-gray-300'} hover:bg-green-300 hover:text-black`}
              onClick={() => setMedioPago('efectivo')}
            >
              Efectivo
            </button>
            <button
              className={`px-4 py-2 rounded-lg border ${medioPago === 'transferencia' ? 'bg-blue-500 text-white' : 'bg-white text-black border-gray-300'} hover:bg-blue-300 hover:text-black`}
              onClick={() => setMedioPago('transferencia')}
            >
              Transferencia
            </button>
          </div>

          {medioPago && (
            <div className="text-center">
              <p className="mb-4 text-gray-700">
                ¿Confirmar venta con medio de pago: <br></br><strong>{medioPago}</strong>?
              </p>
              <div className="flex justify-between">
                <button
                  onClick={handleConfirmarPago}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Confirmar
                </button>
                <button
                  onClick={() => {
                    setMostrarModal(false);
                    setMedioPago(null);
                  }}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )}
    </div>
  );
}
