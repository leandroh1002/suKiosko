import axios from 'axios';
export const GET_GASTOS = 'GET_GASTOS';
export const ADD_GASTO = 'ADD_GASTO';

const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;

export const getGastos = () => {
    return async (dispatch) => {
        const { data } = await axios.get(`${REACT_APP_API_URL}/gastos`);
        return dispatch({
            type: GET_GASTOS,
            payload: data
        });
    }
}

export const addGasto = (gasto) => {
    return async (dispatch) => {
        const { data } = await axios.post(`${REACT_APP_API_URL}/gastos`, gasto);
        return dispatch({
            type: ADD_GASTO,
            payload: data
        });
    }
}
