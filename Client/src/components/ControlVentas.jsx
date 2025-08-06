import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVentas } from '../redux/actions';
import { getGastos, addGasto } from '../redux/actions/gastos.actions';
import PieChart from './AdminStatistics/Graphs/Chart.jsx';
import PATHROUTES from '../helpers/PathRoutes.helper';
import { Link } from 'react-router-dom';

import ListadoGastos from './ListadoGastos/ListadoGastos';

function ControlVentas() {
    const dispatch = useDispatch();
    const ventas = useSelector(state => state.ventas);
    
    const gastos = useSelector(state => state.gastos);

    const [nuevoGasto, setNuevoGasto] = useState({
        descripcion: '',
        monto: '',
        tipo: 'proveedores'
    });

    useEffect(() => {
        dispatch(getVentas());
        dispatch(getGastos());
    }, [dispatch]);

    const handleInputChange = (e) => {
        setNuevoGasto({
            ...nuevoGasto,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addGasto(nuevoGasto));
        setNuevoGasto({
            descripcion: '',
            monto: '',
            tipo: 'proveedores'
        });
    }
    // console.log(ventas); 
    // console.log(ventas.ganancia_total);
    // console.log(ventas.recompra);
    
    const totalRecompra = ventas
    ? ventas.reduce((acc, venta) => {
        const recompraValida = parseFloat(venta.recompra) || 0;
        //console.log('Procesando recompra:', venta.recompra, '->', recompraValida);
        return acc + recompraValida;
      }, 0)
    : 0;
    //console.log(totalRecompra);
    // const gananciaBruta = ventas ? ventas.reduce((acc, venta) => acc + parseFloat(venta.ganancia_total || 0), 0) : 0;
    const gananciaBruta = ventas
    ? ventas.reduce((acc, venta) => {
        const gananciaValida = parseFloat(venta.ganancia_total) || 0;
        //console.log('Procesando recompra:', venta.ganancia_total, '->', gananciaValida);
        return acc + gananciaValida;
      }, 0)
    : 0;
    //console.log(gananciaBruta);
    const totalGastos = gastos ? gastos.reduce((acc, gasto) => acc + parseFloat(gasto.monto), 0) : 0;
    //console.log(totalGastos);
    const gananciaNeta = gananciaBruta - totalGastos;

    const datosGrafico = [];

    // 1. Dinero para Recompra
    if (totalRecompra > 0) {
        datosGrafico.push({ name: 'Recompra de Productos', value: totalRecompra });
    }

    // 2. Gastos operativos (desglosados)
    const gastosPorTipo = gastos ? gastos.reduce((acc, gasto) => {
        const tipo = gasto.tipo;
        const monto = parseFloat(gasto.monto);
        acc[tipo] = (acc[tipo] || 0) + monto;
        return acc;
    }, {}) : {};

    for (const tipo in gastosPorTipo) {
        datosGrafico.push({ name: `Gasto ${tipo}`, value: gastosPorTipo[tipo] });
    }

    // 3. Ganancia Neta Real
    if (gananciaNeta > 0) {
        datosGrafico.push({ name: 'Ganancia Neta Real', value: gananciaNeta });
    }

    return (
        <div className='grid min-h-dvh grid-rows-[auto,1fr,auto]'>
            <header className='bg-gray-800 text-white p-4'>
                <h1 className='text-2xl'>Control de Ventas y Gastos</h1>
            </header>
            <main className='p-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <h2 className='text-xl font-bold mb-2'>Registrar Gasto</h2>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                            <input type='text' name='descripcion' placeholder='Descripción' value={nuevoGasto.descripcion} onChange={handleInputChange} className='p-2 border rounded' />
                            <input type='number' name='monto' placeholder='Monto' value={nuevoGasto.monto} onChange={handleInputChange} className='p-2 border rounded' />
                            <select name='tipo' value={nuevoGasto.tipo} onChange={handleInputChange} className='p-2 border rounded'>
                                <option value='proveedores'>Proveedores</option>
                                <option value='stock'>Stock</option>
                                <option value='empleados'>Empleados</option>
                                <option value='otros'>Otros</option>
                            </select>
                            <button type='submit' className='bg-blue-500 text-white p-2 rounded'>Agregar Gasto</button>
                        </form>
                    </div>
                    <div>
                        <h2 className='text-xl font-bold mb-2'>Resumen Financiero</h2>
                        <div className='bg-gray-100 p-4 rounded'>
                            <p>Dinero para Recompra: ${totalRecompra.toFixed(2)}</p>
                            <p>Ganancia Bruta (Ventas): ${gananciaBruta.toFixed(2)}</p>
                            <p>Total Gastos: ${totalGastos.toFixed(2)}</p>
                            <p className='font-bold'>Ganancia Neta Real: ${gananciaNeta.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                <div className='flex justify-around'>
                    <div className='mt-8 h-[400px] w-[400px]'>
                        <h2 className='text-xl font-bold mb-2'>Distribución de Ingresos y Gastos</h2>
                        <div className="h-full w-full">
                            {datosGrafico.length > 0 ? <PieChart data={datosGrafico} /> : <p>No hay datos de gastos para mostrar.</p>}
                        </div>
                    </div>
                    <ListadoGastos />
                </div>
            </main>
            <Link to={PATHROUTES.GESTIONAR}>
            <footer className='bg-gray-800 text-white p-4 text-center'>
                <p>SuKiosko &copy; 2025</p>
            </footer></Link>
        </div>
    )
}

export default ControlVentas;
