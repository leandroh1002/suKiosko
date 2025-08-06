import axios from "axios";
import Swal from "sweetalert2";

import { 
  SOME_PUBLISH,
  GET_CARRER,
  GET_COMPANIES,
  GET_PUBLISH,
  USERLOGOUT,
  GET_USERLOGUED,
  FILTERED_PUBLISH,
  CLEAR_ALL_PUBLISH,
  CLEAR_FILTERED_PUBLISH,
  GET_PRODUCTS,
  ADD_PRODUCT_TO_CART,
  CLEAR_VENTAS,
  REMOVE_PRODUCT_FROM_CART,
  VENTA_EXITOSA,
  VENTA_ERROR,
  UPDATE_PRODUCT_QUANTITY,
  GET_VENTAS,
  EMPLEADO_LOGIN_SUCCESS
} from "../actions/action-types";


const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;

const getAllPublish = () => {
    return async (dispatch) => {
      try {
        dispatch({
          type: CLEAR_FILTERED_PUBLISH,
        });
  
        const response = await axios.get(`${REACT_APP_API_URL}/publish`);
        return dispatch({
          type: GET_PUBLISH,
          payload: response.data,
        });
      } catch (error) {
        Swal.fire({
          title: `${error}`,
          text: "Error al obtener Publicaciones",
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
      }
    };
  };
const empleadoLoginSuccess = (empleado) => {
    return {
      type: EMPLEADO_LOGIN_SUCCESS,
      payload: empleado,
    };
  };
const getFilteredPublish = (idCarrer) => {
    return async (dispatch) => {
      try {
        dispatch({
          type: CLEAR_ALL_PUBLISH,
        });
        const response = await axios.get(`${REACT_APP_API_URL}/publishes/filtered/${idCarrer}`);
        return dispatch({
          type: FILTERED_PUBLISH,
          payload: response.data,
        });
      } catch (error) {
        Swal.fire({
          title: `${error}`,
          text: "Error al obtener Publicaciones",
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
      }
    };
  };
const allProduct = (query) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${REACT_APP_API_URL}/productos${query}`);
        return dispatch({
          type: GET_PRODUCTS,
          payload: response.data,
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: `${error}`,
          text: "Error al obtener los productos",
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
      }
    };
  };
const getAllCompanies = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${REACT_APP_API_URL}/companies`);
        return dispatch({
          type: GET_COMPANIES,
          payload: response.data,
        });
      } catch (error) {
        Swal.fire({
          title: `${error}`,
          text: "Error al obtener las empresas",
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
      }
    };
  };
  

  const addProductToCart = (producto, cantidad) => {
    return {
      type: ADD_PRODUCT_TO_CART,
      payload: {
        ...producto,
        cantidad,
      },
    };
  };

  const removeProductFromCart = (id) => {
    return {
      type: REMOVE_PRODUCT_FROM_CART,
      payload: id,
    };
  };

  const postVenta = (data) => async (dispatch) => {
    console.log("data de la venta", data);
    try {
      const response = await axios.post('/ventas', data); // Ajustá la URL según tu backend
      dispatch({ type: 'VENTA_EXITOSA', payload: response.data });
    } catch (error) {
      console.error(error);
      dispatch({ type: 'VENTA_ERROR', payload: error.response?.data?.error || 'Error desconocido' });
    }
  };

const getUser = (userData) => {
  return async (dispatch) => {
    try {
      const idPeople = userData;
      const response = await axios.get(`${REACT_APP_API_URL}/people/${idPeople}`);
      // console.log("respuesta url", `${REACT_APP_API_URL}/people/${idPeople}`)
      // console.log("respuesta del id action", response.data)
      dispatch({
        type: GET_USERLOGUED,
        payload: response.data,
      });
    } catch (error) {
      // console.log(error);
    }
  };
};

const logOutUser = () => {
  return async (dispatch) => {
    try {
      console.log("ese es el log del vaciado del global");
      await dispatch({
        type: USERLOGOUT,
        payload: [],
      });
    } catch (error) {
      console.log(error);
    }
  };
};


const clear = () => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: GET_PRODUCTS,
        payload: "",
      });
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        text: "Error al limpiar: Clear",
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  };
};


const clearventas = () => {
  console.log("ese es el log del vaciado del global");
  return async (dispatch) => {
    try {
      return dispatch({
        type: CLEAR_VENTAS,
        payload: "",
      });
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        text: "Error al limpiar: Clear",
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  };
};

export const updateProductQuantity = (productId, cantidad) => ({
  type: UPDATE_PRODUCT_QUANTITY,
  payload: { productId, cantidad },
});

export const updateCartItem = (productId, updatedData) => ({
    type: 'UPDATE_CART_ITEM',
    payload: { productId, updatedData },
});

const getSomePublish = (idPeople) => {
  console.log(idPeople);
  
  return async (dispatch) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/people/publish/${idPeople}`);
      console.log(response.data.Publishes);
      const asd = response.data.Publishes
      if(Array.isArray(asd)){
        const publishIds = asd.map(publish => publish.idPublish);
        console.log(publishIds);
        return dispatch({
          type: SOME_PUBLISH,
          payload: publishIds,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const getVentas = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/ventas`);
      console.log(response.data);
      return dispatch({
        type: GET_VENTAS,
        payload: response.data,
      });
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        text: "Error al obtener las ventas",
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  };
};

const allPeople = (query) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/people?typeOfPerson=customer&typeOfPerson=provider&state=Inactive&state=Active&state=Deleted&state=Unverified${query}&pageSize=100`);
      return dispatch({
        type: GET_PEOPLE,
        payload: response.data.people,
      });
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        text: "Error al obtener allPeople",
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  };
};

  export {
    getSomePublish,
    getAllPublish,
    allPeople,
    allProduct,
    getAllCompanies,
    logOutUser,
    getFilteredPublish,
    getUser,
    clear,
    addProductToCart,
    clearventas,
    removeProductFromCart,
    postVenta,
    empleadoLoginSuccess,
    getVentas
  };
  