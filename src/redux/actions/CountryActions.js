import axios from "axios"
import { toast } from "react-toastify"
import { BASE_URL } from "src/config/constants/app_constants"
import { handleAxiosError } from "src/config/helpers/http_helpers"
import { COUNTRY_ACTION_TYPES } from "../action_types/CountryActionTypes"
import { setLoading } from "./AppActions"
import { getService } from './ActionServices';

export const setCountries = (countries) => {
    return {
        type:COUNTRY_ACTION_TYPES.setCountries,
        payload:countries
    }
}

export const setCurrencies = (currencies) => {
    return {
        type:COUNTRY_ACTION_TYPES.setCurrencies,
        payload:currencies
    }
}

export const fetchCurrencies = (params = {},iloader = null,onComplete = null) => {
    return (dispatch) => {
        dispatch(getService(`${BASE_URL}currencies`,{params,iloader,onComplete:(data) => {
            dispatch(setCurrencies(data));
            onComplete(data);
        }}))
    }
}

export const fetchCountries = () => {
    return (dispatch) => {
        dispatch(setLoading(true));
        axios.get(`${BASE_URL}countries`)
        .then((result) => {
            dispatch(setLoading(false));
            if(result.data?.status === "success"){
                dispatch(setCountries(result.data.data))
            } else {
                toast.error(result.data?.message ?? "An Error occurred");
            }
        })
        .catch((ex) => {
            dispatch(setLoading(false));
            handleAxiosError(ex);
        })
    }
}