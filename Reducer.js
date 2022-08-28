
import {
    SET_LOADING,
    SET_ERROR,
    FETCH_CITY,
} from "../Types";

const initialState = {
    loading: true,
    error: "",
    city_2: [],
};


export default function city_2Reducers(state = initialState, action) {
    switch(action.type){
        case SET_LOADING:
             return {
                ...state,
                loading: action.payload
            }
            case SET_ERROR:
               return { ...state, error: action.payload };

               case FETCH_CITY :
                return{
                    ...state,
                    city_2:action.payload
                }

            default:
                 return state
    }

}


 