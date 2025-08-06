import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGastos } from '../../redux/actions/gastos.actions';
import styles from './ListadoGastos.module.scss';

const ListadoGastos = () => {
    const dispatch = useDispatch();
    const gastos = useSelector(state => state.gastos);

    useEffect(() => {
        dispatch(getGastos());
    }, [dispatch]);

    return (
        <div className={styles.listadoGastosContainer}>
            <h3>Listado de Gastos</h3>
            <ul className={styles.gastosList}>
                {gastos.map(gasto => (
                    <li key={gasto.id} className={styles.gastoItem}>
                        <span>{gasto.descripcion}</span>
                        <span>${gasto.monto}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListadoGastos;
