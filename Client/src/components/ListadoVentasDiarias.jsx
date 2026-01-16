
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ListadoVentasDiarias.module.scss';
import PATHROUTES from '../helpers/PathRoutes.helper';
import { Link } from 'react-router-dom';

const ListadoVentasDiarias = () => {
    const [ventas, setVentas] = useState([]);
    const [fechasUnicas, setFechasUnicas] = useState([]);
    const [fechaSeleccionada, setFechaSeleccionada] = useState('');
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const PRODUCTOS_POR_PAGINA = 30;
    const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const resVentas = await axios.get(`${REACT_APP_API_URL}/ventas`);
                const ventasData = resVentas.data;
                setVentas(ventasData);
                // Elimina duplicados y ordena las fechas cronológicamente
                const fechas = [...new Set(ventasData.map(venta => {
                    const fecha = new Date(venta.fecha);
                    return fecha.toLocaleDateString('es-ES'); // Usa la zona horaria local
                }))]
                    .sort((a, b) => {
                        const fechaA = new Date(a.split('/').reverse().join('-')); // Convierte DD/MM/YYYY a YYYY-MM-DD
                        const fechaB = new Date(b.split('/').reverse().join('-'));
                        return fechaB - fechaA; // Ordena de más reciente a más antiguo
                    });
    
                setFechasUnicas(fechas);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar los datos de ventas. Por favor, inténtalo de nuevo más tarde.');
                setLoading(false);
                console.error(err);
            }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        if (fechaSeleccionada) {
            const ventasDelDia = ventas.filter(venta => 
                new Date(venta.fecha).toLocaleDateString('es-ES') === fechaSeleccionada
            );
            
            const todosLosDetalles = ventasDelDia.flatMap(venta => {
                const hora = new Date(venta.fecha).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                const empleadoNombre = venta.Empleado ? venta.Empleado.nombre : (venta.empleado_id || 'N/A');

                return venta.DetalleVenta.map(detalle => ({
                    ...detalle,
                    ventaId: venta.id,
                    hora: hora,
                    empleadoNombre: empleadoNombre,
                    nombreProducto: detalle.Producto ? detalle.Producto.nombre : 'Producto no encontrado',
                }));
            });

            setProductosFiltrados(todosLosDetalles);
            setPaginaActual(1);
        }
    }, [fechaSeleccionada, ventas]);

    const indiceUltimoProducto = paginaActual * PRODUCTOS_POR_PAGINA;
    const indicePrimerProducto = indiceUltimoProducto - PRODUCTOS_POR_PAGINA;
    const productosPaginaActual = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);

    const totalPaginas = Math.ceil(productosFiltrados.length / PRODUCTOS_POR_PAGINA);

    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
    };

    if (loading) {
        return <div className={styles.loading}>Cargando datos...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.listadoContainer}>
            <h2>Listado de Productos Vendidos por Día</h2>
            
            <div className={styles.controles}>
                <label htmlFor="fecha-select">Selecciona una fecha:</label>
                <select 
                    id="fecha-select"
                    value={fechaSeleccionada} 
                    onChange={(e) => setFechaSeleccionada(e.target.value)}
                    className={styles.selectFecha}
                >
                    <option value="">-- Elige un día --</option>
                    {fechasUnicas.map(fecha => (
                        <option key={fecha} value={fecha}>{fecha}</option>
                    ))}
                </select>
            </div>

            {fechaSeleccionada && (
                <>
                    {productosFiltrados.length > 0 ? (
                        <table className={styles.tablaVentas}>
                            <thead>
                                <tr>
                                    <th>Venta ID</th>
                                    <th>Hora</th>
                                    <th>Empleado</th>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio de Venta</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productosPaginaActual.map((producto, index) => (
                                    <tr key={`${producto.ventaId}-${producto.id}-${index}`}>
                                        <td>{producto.ventaId}</td>
                                        <td>{producto.hora}</td>
                                        <td>{producto.empleadoNombre}</td>
                                        <td>{producto.nombreProducto || 'Nombre no disponible'}</td>
                                        <td>{producto.cantidad}</td>
                                        <td>${parseFloat(producto.redondeo).toFixed(2)}</td>
                                        <td>${(producto.cantidad * producto.redondeo).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No se encontraron ventas para la fecha seleccionada.</p>
                    )}

                    {totalPaginas > 1 && (
                        <div className={styles.paginacion}>
                            <button 
                                onClick={() => cambiarPagina(paginaActual - 1)} 
                                disabled={paginaActual === 1}
                            >
                                Anterior
                            </button>
                            <span>Página {paginaActual} de {totalPaginas}</span>
                            <button 
                                onClick={() => cambiarPagina(paginaActual + 1)} 
                                disabled={paginaActual === totalPaginas}
                            >
                                Siguiente
                            </button>
                        </div>
                    )}
                </>
            )}

            <footer className={styles.footer}>
                <Link to={PATHROUTES.GESTIONAR}><button className='bg-[#A64208] m-8 text-white font-normal p-2 rounded-lg cursor-pointer px-5 py-2 hover:bg-[#b45d2b] transition duration-75 transform hover:scale-105 active:bg-[#F2B138] active:scale-90'>Volver</button></Link>
            </footer>
        </div>
    );
};

export default ListadoVentasDiarias;
