
import API from "../../utilities/API";
import { toast } from "react-toastify";

import {
    SET_LOADING,
    SET_ERROR,
    FETCH_CITY,
} from "../Types";

export const fetchCity_2 = () => (dispatch) => {
    API("Coding/GeneralCoding/City/GetAllCity")
        .then(({data, status}) => {
            dispatch({
                type: SET_LOADING,
                payload: false,
            });
            if (status === 200) {
                dispatch({
                    type: FETCH_CITY,
                    payload: data,
                });

                dispatch({
                    type: SET_ERROR,
                    payload: null,
                });

            } else {
                 toast.error("حدث خطأ ما")
            }
})
}

 
  