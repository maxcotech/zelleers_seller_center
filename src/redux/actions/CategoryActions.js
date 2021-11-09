import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "src/config/constants/app_constants";
import { handleAxiosError } from "src/config/helpers/http_helpers";
import { CATEGORY_ACTION_TYPES } from "../action_types/CategoryActionTypes";
import { setLoading } from "./AppActions"

export const setCategories = (data) => {
    return {
        type:CATEGORY_ACTION_TYPES.setCategories,
        payload:data
    }
}

export const fetchCategories = (url = null,options = null,onComplete = null) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        axios.get(url ?? `${BASE_URL}categories`,{
            params: options ?? {
                verbose:1
            }
        })
        .then((result) => {
            dispatch(setLoading(false));
            if(result.data?.status === "success"){
                dispatch(setCategories(result.data.data));
                if(onComplete) onComplete();
            } else {
                toast.error(result.data?.message ?? "An Error Occurred.");
            }
        })
        .catch((ex) => {
            handleAxiosError(ex);
            dispatch(setLoading(false));
        })
    }
}