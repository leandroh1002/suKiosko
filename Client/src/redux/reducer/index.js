import { ACCESS_BACK_SAVE_DATA,CLEAR_VENTAS, VENTA_ERROR, VENTA_EXITOSA ,REMOVE_PRODUCT_FROM_CART , GET_PRODUCTS, GET_CARRER, ADD_PRODUCT_TO_CART, GET_COMPANIES, GET_PUBLISH, GET_USERLOGUED, USERLOGOUT, FILTERED_PUBLISH, CLEAR_FILTERED_PUBLISH, CLEAR_ALL_PUBLISH, SOME_PUBLISH, UPDATE_PRODUCT_QUANTITY, GET_VENTAS} from "../actions/action-types";
import { GET_GASTOS, ADD_GASTO } from "../actions/gastos.actions";

const initialState = {
    allPublish: [],
    FilteredPublish: [],
    allCarrer: [],
    somePublish: [],
    allCompanies: [],
    productForAdmin: [],
    UserLogued: [],//hay que ver porque capaz que puedo usar el token para los cambios
    cart: [],
    gastos: []
};

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case GET_PUBLISH:
            return {...state,
            allPublish: payload,
        }
        case GET_PRODUCTS:
            return {...state,
            productForAdmin: payload,
        }

        case ADD_PRODUCT_TO_CART: {
            const existingProductIndex = state.cart.findIndex(
              (item) => item.id === payload.id
            );
          
            if (existingProductIndex !== -1) {
              // Si el producto ya existe en el carrito, actualiza la cantidad y el total
              const updatedCart = state.cart.map((item, index) => {
                if (index === existingProductIndex) {
                  const nuevaCantidad = item.cantidad + payload.cantidad;
                  const nuevoTotal = nuevaCantidad * item.redondeo;
                  return {
                    ...item,
                    cantidad: nuevaCantidad,
                    total: nuevoTotal,
                  };
                }
                return item;
              });
          
              return {
                ...state,
                cart: updatedCart,
              };
            } else {
              // Si el producto no existe en el carrito, agrégalo con su total inicial
              return {
                ...state,
                cart: [
                  ...state.cart,
                  {
                    ...payload,
                    total: payload.cantidad * payload.redondeo,
                  },
                ],
              };
            }
          }
        case VENTA_EXITOSA:
            return { ...state, venta: payload, error: null };
        case VENTA_ERROR:
            return { ...state, error: payload };
        case REMOVE_PRODUCT_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(producto => producto.id !== payload),
            };
        case FILTERED_PUBLISH:
            return {...state,
            FilteredPublish: payload,
        }
        case UPDATE_PRODUCT_QUANTITY: {
          const updatedCart = state.cart.map((producto) => {
            if (producto.id === payload.id) {
              const nuevaCantidad = payload.cantidad;
              const nuevoTotal = nuevaCantidad * parseFloat(producto.redondeo);
              return {
                ...producto,
                cantidad: nuevaCantidad,
                total: nuevoTotal,
              };
            }
            return producto;
          });
          return {
            ...state,
            cart: updatedCart,
          };
        }
        case SOME_PUBLISH:
            return {...state,
            somePublish: payload,
        }
        case CLEAR_ALL_PUBLISH:
            return {
              ...state,
              allPublish: [],
            };
        case CLEAR_VENTAS:
            return {
              ...state,
              cart: [],
            };
          case CLEAR_FILTERED_PUBLISH:
            return {
              ...state,
              FilteredPublish: [],
            };
        case GET_CARRER:
            return {...state,
            allCarrer: payload,
        }
        case GET_USERLOGUED:
            return {...state,
            UserLogued: payload,
        }
        case USERLOGOUT:
            return {...state,
            UserLogued: payload,
        }
        case GET_COMPANIES:
            return {...state,
            allCompanies: payload,
        }
        case ACCESS_BACK_SAVE_DATA:
            return {...state,
            UserLogued: payload,
        }
        case GET_GASTOS:
            return {
                ...state,
                gastos: payload
            }
        case GET_VENTAS:
            return {
                ...state,
                ventas: payload
            }
        case ADD_GASTO:
            return {
                ...state,
                gastos: [...state.gastos, payload]
            }
        default:
            return {
                ...state,
            };
    }
};

export default rootReducer;