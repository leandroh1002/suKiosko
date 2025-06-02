import { ACCESS_BACK_SAVE_DATA, GET_CARRER, GET_COMPANIES, GET_PUBLISH, GET_USERLOGUED, USERLOGOUT, FILTERED_PUBLISH, CLEAR_FILTERED_PUBLISH, CLEAR_ALL_PUBLISH, SOME_PUBLISH} from "../actions/action-types";

const initialState = {
    allPublish: [],
    FilteredPublish: [],
    allCarrer: [],
    somePublish: [],
    allCompanies: [],
    UserLogued: [],//hay que ver porque capaz que puedo usar el token para los cambios
};

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {


        case GET_PUBLISH:
            return {...state,
            allPublish: payload,
        }
        case FILTERED_PUBLISH:
            return {...state,
            FilteredPublish: payload,
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
        default:
            return {
                ...state,
            };
    }
};

export default rootReducer;
